// Core Authentication Service for LawFly Pro
// Security-first implementation with zero-trust principles

import { Pool } from 'pg';
import { Redis } from 'redis';
import bcrypt from 'bcrypt';
import { authenticator } from 'otplib';
import crypto from 'crypto';
import { 
  User, 
  UserSession, 
  LoginRequest, 
  LoginResponse, 
  JWTPayload, 
  AuthAuditEvent,
  ZeroTrustContext,
  ZeroTrustDecision 
} from '../types/auth';
import config from '../config';
import { AuditService } from './AuditService';
import { EncryptionService } from './EncryptionService';
import { ZeroTrustService } from './ZeroTrustService';
import { logger } from '../utils/logger';

export class AuthService {
  constructor(
    private db: Pool,
    private redis: Redis,
    private auditService: AuditService,
    private encryptionService: EncryptionService,
    private zeroTrustService: ZeroTrustService
  ) {}

  /**
   * Authenticate user with email/password and optional MFA
   * Implements zero-trust verification at every step
   */
  async authenticateUser(loginRequest: LoginRequest, clientInfo: {
    ipAddress: string;
    userAgent: string;
    deviceFingerprint?: string;
  }): Promise<LoginResponse> {
    const startTime = Date.now();
    let user: User | null = null;
    let auditResult: 'success' | 'failure' | 'partial' = 'failure';

    try {
      // 1. Input validation and sanitization
      if (!loginRequest.email || !loginRequest.password) {
        await this.auditAuthEvent({
          eventType: 'auth',
          action: 'login_attempt',
          result: 'failure',
          errorMessage: 'Missing credentials',
          ipAddress: clientInfo.ipAddress,
          userAgent: clientInfo.userAgent,
          details: { reason: 'missing_credentials' }
        });
        
        return { 
          success: false, 
          error: 'Invalid credentials'  // Generic message for security
        };
      }

      // 2. Rate limiting check
      const rateLimitKey = `auth_attempts:${clientInfo.ipAddress}:${loginRequest.email}`;
      const attempts = await this.redis.incr(rateLimitKey);
      
      if (attempts === 1) {
        await this.redis.expire(rateLimitKey, 300); // 5 minutes
      }
      
      if (attempts > config.auth.lockout.maxAttempts) {
        await this.auditAuthEvent({
          eventType: 'auth',
          action: 'rate_limit_exceeded',
          result: 'failure',
          ipAddress: clientInfo.ipAddress,
          details: { attempts, limit: config.auth.lockout.maxAttempts }
        });
        
        return { 
          success: false, 
          error: 'Too many attempts. Please try again later.' 
        };
      }

      // 3. Find user and validate tenant context
      user = await this.findUserByEmail(loginRequest.email, loginRequest.tenantSlug);
      
      if (!user) {
        // Add delay to prevent timing attacks
        await this.addSecurityDelay();
        
        await this.auditAuthEvent({
          eventType: 'auth',
          action: 'login_attempt',
          result: 'failure',
          errorMessage: 'User not found',
          ipAddress: clientInfo.ipAddress,
          details: { email: loginRequest.email }
        });
        
        return { success: false, error: 'Invalid credentials' };
      }

      // 4. Check if account is locked
      if (user.lockedUntil && user.lockedUntil > new Date()) {
        await this.auditAuthEvent({
          eventType: 'auth',
          action: 'login_attempt',
          tenantId: user.tenantId,
          actorId: user.id,
          actorEmail: user.email,
          result: 'failure',
          errorMessage: 'Account locked',
          ipAddress: clientInfo.ipAddress,
          details: { lockedUntil: user.lockedUntil }
        });
        
        return { 
          success: false, 
          error: 'Account is temporarily locked. Please try again later.' 
        };
      }

      // 5. Verify password
      const passwordValid = await this.verifyPassword(loginRequest.password, user.passwordHash);
      
      if (!passwordValid) {
        // Increment failed attempts
        await this.handleFailedLogin(user);
        
        await this.auditAuthEvent({
          eventType: 'auth',
          action: 'login_attempt',
          tenantId: user.tenantId,
          actorId: user.id,
          actorEmail: user.email,
          result: 'failure',
          errorMessage: 'Invalid password',
          ipAddress: clientInfo.ipAddress,
          details: { failedAttempts: user.failedLoginAttempts + 1 }
        });
        
        return { success: false, error: 'Invalid credentials' };
      }

      // 6. Zero-trust policy evaluation
      const zeroTrustContext: ZeroTrustContext = await this.buildZeroTrustContext(
        user, 
        clientInfo,
        { resource: 'authentication', action: 'login', sensitivity: 'internal', piiInvolved: false, phiInvolved: false }
      );
      
      const zeroTrustDecision = await this.zeroTrustService.evaluateAccess(zeroTrustContext);
      
      if (!zeroTrustDecision.allow) {
        await this.auditAuthEvent({
          eventType: 'authz',
          action: 'zero_trust_deny',
          tenantId: user.tenantId,
          actorId: user.id,
          actorEmail: user.email,
          result: 'failure',
          errorMessage: zeroTrustDecision.reason,
          ipAddress: clientInfo.ipAddress,
          details: { 
            riskScore: zeroTrustDecision.riskScore,
            reason: zeroTrustDecision.reason 
          }
        });
        
        return { 
          success: false, 
          error: 'Access denied due to security policy' 
        };
      }

      // 7. Check if MFA is required
      const mfaRequired = user.mfaEnabled || 
        zeroTrustDecision.requireMFA || 
        (config.auth.compliance.requireMFAForAdmins && user.roles.includes('admin'));

      if (mfaRequired && !loginRequest.mfaCode) {
        auditResult = 'partial'; // Authentication partially successful, MFA pending
        
        await this.auditAuthEvent({
          eventType: 'auth',
          action: 'mfa_required',
          tenantId: user.tenantId,
          actorId: user.id,
          actorEmail: user.email,
          result: 'partial',
          ipAddress: clientInfo.ipAddress,
          details: { reason: 'mfa_required' }
        });
        
        return { 
          success: false, 
          mfaRequired: true,
          error: 'MFA verification required'
        };
      }

      // 8. Verify MFA if provided
      if (mfaRequired && loginRequest.mfaCode) {
        const mfaValid = await this.verifyMFA(user, loginRequest.mfaCode);
        
        if (!mfaValid) {
          await this.auditAuthEvent({
            eventType: 'auth',
            action: 'mfa_verification',
            tenantId: user.tenantId,
            actorId: user.id,
            actorEmail: user.email,
            result: 'failure',
            errorMessage: 'Invalid MFA code',
            ipAddress: clientInfo.ipAddress,
            mfaUsed: true
          });
          
          return { success: false, error: 'Invalid MFA code' };
        }
      }

      // 9. Create secure session
      const session = await this.createSession(user, clientInfo, zeroTrustDecision);
      
      // 10. Generate JWT tokens
      const tokens = await this.generateTokens(user, session, zeroTrustDecision);
      
      // 11. Update user login information
      await this.updateLastLogin(user, clientInfo.ipAddress);
      
      // 12. Clear rate limiting on successful login
      await this.redis.del(rateLimitKey);
      
      auditResult = 'success';
      
      // 13. Audit successful authentication
      await this.auditAuthEvent({
        eventType: 'auth',
        action: 'login_success',
        tenantId: user.tenantId,
        actorId: user.id,
        actorEmail: user.email,
        result: 'success',
        ipAddress: clientInfo.ipAddress,
        sessionId: session.id,
        mfaUsed: mfaRequired,
        details: { 
          loginDuration: Date.now() - startTime,
          deviceTrusted: zeroTrustContext.device.trusted,
          riskScore: zeroTrustDecision.riskScore
        }
      });

      return {
        success: true,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        expiresIn: config.auth.jwt.accessTokenTTL,
        user: this.sanitizeUserForResponse(user)
      };

    } catch (error) {
      logger.error('Authentication error:', error);
      
      await this.auditAuthEvent({
        eventType: 'auth',
        action: 'login_error',
        tenantId: user?.tenantId,
        actorId: user?.id,
        actorEmail: user?.email,
        result: 'failure',
        errorMessage: error instanceof Error ? error.message : 'Unknown error',
        ipAddress: clientInfo.ipAddress,
        details: { error: error instanceof Error ? error.stack : error }
      });
      
      return { 
        success: false, 
        error: 'Authentication failed due to system error' 
      };
    }
  }

  /**
   * Find user by email with tenant context
   */
  private async findUserByEmail(email: string, tenantSlug?: string): Promise<User | null> {
    let query: string;
    let params: any[];

    if (tenantSlug) {
      query = `
        SELECT u.*, t.slug as tenant_slug
        FROM users u
        JOIN tenants t ON u.tenant_id = t.id
        WHERE u.email = $1 AND t.slug = $2 AND u.status = 'active' AND t.status = 'active'
      `;
      params = [email.toLowerCase().trim(), tenantSlug];
    } else {
      // If no tenant specified, look for user across all tenants
      query = `
        SELECT u.*, t.slug as tenant_slug
        FROM users u
        JOIN tenants t ON u.tenant_id = t.id
        WHERE u.email = $1 AND u.status = 'active' AND t.status = 'active'
        ORDER BY u.last_login_at DESC NULLS LAST
        LIMIT 1
      `;
      params = [email.toLowerCase().trim()];
    }

    const result = await this.db.query(query, params);
    
    if (result.rows.length === 0) {
      return null;
    }

    const row = result.rows[0];
    return this.mapRowToUser(row);
  }

  /**
   * Verify password against hash
   */
  private async verifyPassword(password: string, hash?: string): Promise<boolean> {
    if (!hash) {
      // Add delay to prevent timing attacks even when no hash exists
      await this.addSecurityDelay();
      return false;
    }

    try {
      return await bcrypt.compare(password, hash);
    } catch (error) {
      logger.error('Password verification error:', error);
      return false;
    }
  }

  /**
   * Verify MFA TOTP code
   */
  private async verifyMFA(user: User, code: string): Promise<boolean> {
    if (!user.mfaEnabled) {
      return true; // MFA not enabled for this user
    }

    try {
      // Get user's MFA secret (encrypted)
      const mfaSecret = await this.getUserMFASecret(user.id);
      
      if (!mfaSecret) {
        return false;
      }

      // Verify TOTP
      const isValid = authenticator.verify({
        token: code,
        secret: mfaSecret,
        window: config.auth.mfa.window,
      });

      // Also check backup codes if TOTP fails
      if (!isValid && user.mfaBackupCodes) {
        return await this.verifyBackupCode(user, code);
      }

      return isValid;
      
    } catch (error) {
      logger.error('MFA verification error:', error);
      return false;
    }
  }

  /**
   * Verify MFA backup code
   */
  private async verifyBackupCode(user: User, code: string): Promise<boolean> {
    if (!user.mfaBackupCodes || user.mfaBackupCodes.length === 0) {
      return false;
    }

    // Hash the provided code and check against stored hashes
    for (const backupCodeHash of user.mfaBackupCodes) {
      try {
        const isValid = await bcrypt.compare(code, backupCodeHash);
        
        if (isValid) {
          // Remove used backup code
          await this.removeUsedBackupCode(user.id, backupCodeHash);
          return true;
        }
      } catch (error) {
        logger.error('Backup code verification error:', error);
        continue;
      }
    }

    return false;
  }

  /**
   * Create secure session with zero-trust context
   */
  private async createSession(
    user: User, 
    clientInfo: { ipAddress: string; userAgent: string; deviceFingerprint?: string },
    zeroTrustDecision: ZeroTrustDecision
  ): Promise<UserSession> {
    const sessionId = crypto.randomUUID();
    const sessionToken = crypto.randomBytes(32).toString('hex');
    const refreshToken = crypto.randomBytes(32).toString('hex');
    
    const now = new Date();
    const sessionTimeout = zeroTrustDecision.maxSessionTime || config.auth.session.defaultTimeout;
    const expiresAt = new Date(now.getTime() + sessionTimeout * 60 * 1000);

    const session: UserSession = {
      id: sessionId,
      tenantId: user.tenantId,
      userId: user.id,
      sessionToken: await bcrypt.hash(sessionToken, 10), // Hash session token
      refreshToken: await bcrypt.hash(refreshToken, 10), // Hash refresh token
      deviceId: clientInfo.deviceFingerprint,
      ipAddress: clientInfo.ipAddress,
      userAgent: clientInfo.userAgent,
      deviceFingerprint: clientInfo.deviceFingerprint,
      deviceTrusted: zeroTrustDecision.allow && !zeroTrustDecision.requireMFA,
      deviceManaged: false, // TODO: Implement device management detection
      deviceComplianceScore: undefined, // TODO: Implement compliance scoring
      issuedAt: now,
      expiresAt: expiresAt,
      lastAccessedAt: now,
      revoked: false
    };

    // Store session in database
    await this.storeSession(session);
    
    // Store session token mapping in Redis for fast lookup
    await this.redis.setex(
      `session:${sessionToken}`,
      sessionTimeout * 60,
      sessionId
    );

    return {
      ...session,
      sessionToken, // Return unhashed token for JWT
      refreshToken  // Return unhashed token for client
    };
  }

  /**
   * Generate JWT access and refresh tokens
   */
  private async generateTokens(
    user: User, 
    session: UserSession,
    zeroTrustDecision: ZeroTrustDecision
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const now = Math.floor(Date.now() / 1000);
    
    const payload: JWTPayload = {
      sub: user.id,
      tenantId: user.tenantId,
      email: user.email,
      roles: user.roles,
      permissions: user.permissions,
      attributes: {
        ...user.attributes,
        deviceTrusted: session.deviceTrusted,
        riskScore: zeroTrustDecision.riskScore,
        monitoringLevel: zeroTrustDecision.monitoringLevel
      },
      sessionId: session.id,
      deviceTrusted: session.deviceTrusted,
      iat: now,
      exp: now + config.auth.jwt.accessTokenTTL,
      aud: config.auth.jwt.audience,
      iss: config.auth.jwt.issuer
    };

    // Sign JWT with tenant-specific key if available
    const jwtSecret = await this.getTenantJWTSecret(user.tenantId);
    
    // TODO: Implement JWT signing (using library like jsonwebtoken)
    const accessToken = await this.signJWT(payload, jwtSecret);
    
    return {
      accessToken,
      refreshToken: session.refreshToken!
    };
  }

  /**
   * Build zero-trust context for policy evaluation
   */
  private async buildZeroTrustContext(
    user: User,
    clientInfo: { ipAddress: string; userAgent: string; deviceFingerprint?: string },
    request: { resource: string; action: string; sensitivity: string; piiInvolved: boolean; phiInvolved: boolean }
  ): Promise<ZeroTrustContext> {
    // TODO: Implement full zero-trust context building
    return {
      user,
      device: {
        deviceId: clientInfo.deviceFingerprint || 'unknown',
        fingerprint: clientInfo.deviceFingerprint || 'unknown',
        platform: 'web', // Parse from user agent
        browser: 'unknown', // Parse from user agent
        version: 'unknown', // Parse from user agent
        trusted: false, // Default to untrusted
        managed: false,
        complianceScore: 0.5,
        lastSeen: new Date(),
        riskFactors: []
      },
      network: {
        ipAddress: clientInfo.ipAddress,
        vpn: false, // TODO: Detect VPN usage
        tor: false, // TODO: Detect Tor usage
        riskScore: 0.3 // TODO: Calculate network risk
      },
      session: {
        age: 0, // New session
        lastActivity: new Date(),
        sessionRisk: 0.2
      },
      request
    };
  }

  /**
   * Handle failed login attempt
   */
  private async handleFailedLogin(user: User): Promise<void> {
    const newFailedAttempts = user.failedLoginAttempts + 1;
    
    let lockedUntil: Date | undefined;
    if (newFailedAttempts >= config.auth.lockout.maxAttempts) {
      lockedUntil = new Date(Date.now() + config.auth.lockout.lockoutDuration * 60 * 1000);
    }

    await this.db.query(`
      UPDATE users 
      SET failed_login_attempts = $1, locked_until = $2, updated_at = CURRENT_TIMESTAMP
      WHERE id = $3
    `, [newFailedAttempts, lockedUntil, user.id]);
  }

  /**
   * Update user's last login information
   */
  private async updateLastLogin(user: User, ipAddress: string): Promise<void> {
    await this.db.query(`
      UPDATE users 
      SET 
        last_login_at = CURRENT_TIMESTAMP,
        last_login_ip = $1,
        failed_login_attempts = 0,
        locked_until = NULL,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
    `, [ipAddress, user.id]);
  }

  /**
   * Add security delay to prevent timing attacks
   */
  private async addSecurityDelay(): Promise<void> {
    // Random delay between 100-300ms to prevent timing attacks
    const delay = Math.floor(Math.random() * 200) + 100;
    await new Promise(resolve => setTimeout(resolve, delay));
  }

  /**
   * Sanitize user object for API response
   */
  private sanitizeUserForResponse(user: User): Partial<User> {
    const { passwordHash, mfaBackupCodes, ...sanitized } = user;
    return sanitized;
  }

  // Placeholder methods - TODO: Implement these
  private async getUserMFASecret(userId: string): Promise<string | null> {
    // TODO: Implement encrypted MFA secret retrieval
    return null;
  }

  private async removeUsedBackupCode(userId: string, backupCodeHash: string): Promise<void> {
    // TODO: Implement backup code removal
  }

  private async storeSession(session: UserSession): Promise<void> {
    // TODO: Implement session storage in database
  }

  private async getTenantJWTSecret(tenantId: string): Promise<string> {
    // TODO: Implement tenant-specific JWT secret retrieval
    return process.env.JWT_SECRET || 'default-secret';
  }

  private async signJWT(payload: JWTPayload, secret: string): Promise<string> {
    // TODO: Implement JWT signing
    return 'signed-jwt-token';
  }

  private mapRowToUser(row: any): User {
    return {
      id: row.id,
      tenantId: row.tenant_id,
      email: row.email,
      emailVerified: row.email_verified,
      externalId: row.external_id,
      firstName: row.first_name,
      lastName: row.last_name,
      title: row.title,
      phone: row.phone,
      mfaEnabled: row.mfa_enabled,
      mfaBackupCodes: row.mfa_backup_codes,
      passwordHash: row.password_hash,
      passwordChangedAt: row.password_changed_at,
      failedLoginAttempts: row.failed_login_attempts,
      lockedUntil: row.locked_until,
      roles: row.roles,
      permissions: row.permissions || {},
      attributes: row.attributes || {},
      lastLoginAt: row.last_login_at,
      lastLoginIp: row.last_login_ip,
      sessionTimeoutMinutes: row.session_timeout_minutes,
      status: row.status,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }

  private async auditAuthEvent(event: Partial<AuthAuditEvent>): Promise<void> {
    // TODO: Implement audit event logging
    logger.info('Auth audit event:', event);
  }
}