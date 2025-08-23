// Authentication & Authorization Types for LawFly Pro

export interface Tenant {
  id: string;
  slug: string;
  name: string;
  domain?: string;
  kmsKeyId?: string;
  encryptionEnabled: boolean;
  dataResidency: string;
  complianceFrameworks: string[];
  retentionYears: number;
  legalHoldEnabled: boolean;
  status: 'active' | 'suspended' | 'terminated';
  maxUsers: number;
  maxStorageGb: number;
  settings: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  tenantId: string;
  email: string;
  emailVerified: boolean;
  externalId?: string; // From SSO provider
  firstName?: string;
  lastName?: string;
  title?: string;
  phone?: string;
  mfaEnabled: boolean;
  mfaBackupCodes?: string[];
  passwordHash?: string;
  passwordChangedAt?: Date;
  failedLoginAttempts: number;
  lockedUntil?: Date;
  roles: string[];
  permissions: Record<string, any>;
  attributes: Record<string, any>; // For ABAC
  lastLoginAt?: Date;
  lastLoginIp?: string;
  sessionTimeoutMinutes: number;
  status: 'active' | 'inactive' | 'suspended';
  createdAt: Date;
  updatedAt: Date;
}

export interface UserSession {
  id: string;
  tenantId: string;
  userId: string;
  sessionToken: string;
  refreshToken?: string;
  deviceId?: string;
  ipAddress?: string;
  userAgent?: string;
  deviceFingerprint?: string;
  deviceTrusted: boolean;
  deviceManaged: boolean;
  deviceComplianceScore?: number;
  issuedAt: Date;
  expiresAt: Date;
  lastAccessedAt: Date;
  revoked: boolean;
  revokedAt?: Date;
  revokedReason?: string;
}

// JWT payload structure
export interface JWTPayload {
  sub: string; // User ID
  tenantId: string;
  email: string;
  roles: string[];
  permissions: Record<string, any>;
  attributes: Record<string, any>;
  sessionId: string;
  deviceTrusted: boolean;
  iat: number;
  exp: number;
  aud: string;
  iss: string;
}

// Authentication request/response types
export interface LoginRequest {
  email: string;
  password?: string;
  tenantSlug?: string;
  mfaCode?: string;
  deviceFingerprint?: string;
  rememberDevice?: boolean;
}

export interface LoginResponse {
  success: boolean;
  accessToken?: string;
  refreshToken?: string;
  expiresIn?: number;
  mfaRequired?: boolean;
  mfaQrCode?: string;
  user?: Partial<User>;
  error?: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
  deviceFingerprint?: string;
}

export interface MFASetupRequest {
  userId: string;
  secret?: string;
  code: string;
}

export interface MFASetupResponse {
  success: boolean;
  secret?: string;
  qrCodeUrl?: string;
  backupCodes?: string[];
}

// SSO Configuration
export interface SSOConfig {
  tenantId: string;
  provider: 'saml' | 'oidc';
  enabled: boolean;
  
  // SAML configuration
  saml?: {
    entryPoint: string;
    cert: string;
    issuer: string;
    callbackUrl: string;
    signatureAlgorithm: string;
    digestAlgorithm: string;
  };
  
  // OIDC configuration  
  oidc?: {
    issuer: string;
    clientId: string;
    clientSecret: string;
    redirectUri: string;
    scopes: string[];
    responseType: string;
    grantType: string;
  };
  
  // User attribute mapping
  attributeMapping: {
    email: string;
    firstName: string;
    lastName: string;
    roles: string;
    groups: string;
  };
  
  // Provisioning settings
  autoProvision: boolean;
  defaultRoles: string[];
  
  createdAt: Date;
  updatedAt: Date;
}

// SCIM User representation
export interface SCIMUser {
  schemas: string[];
  id?: string;
  externalId?: string;
  userName: string;
  name?: {
    formatted?: string;
    familyName?: string;
    givenName?: string;
  };
  displayName?: string;
  emails: Array<{
    value: string;
    type?: string;
    primary?: boolean;
  }>;
  phoneNumbers?: Array<{
    value: string;
    type?: string;
    primary?: boolean;
  }>;
  active: boolean;
  roles?: string[];
  groups?: Array<{
    value: string;
    display?: string;
    type?: string;
  }>;
  meta?: {
    resourceType: string;
    created?: Date;
    lastModified?: Date;
    location?: string;
    version?: string;
  };
}

// SCIM Group representation
export interface SCIMGroup {
  schemas: string[];
  id?: string;
  externalId?: string;
  displayName: string;
  members?: Array<{
    value: string;
    display?: string;
    type?: 'User' | 'Group';
  }>;
  meta?: {
    resourceType: string;
    created?: Date;
    lastModified?: Date;
    location?: string;
    version?: string;
  };
}

// Authorization types
export interface Permission {
  resource: string;
  action: string;
  conditions?: Record<string, any>;
}

export interface Role {
  name: string;
  description?: string;
  permissions: Permission[];
  tenantId: string;
  system: boolean; // System roles cannot be modified
}

// Policy evaluation context
export interface PolicyContext {
  user: User;
  tenant: Tenant;
  resource?: string;
  action: string;
  environment: {
    time: Date;
    ipAddress?: string;
    deviceTrusted: boolean;
    sessionAge: number;
  };
  resourceAttributes?: Record<string, any>;
}

export interface PolicyDecision {
  decision: 'permit' | 'deny' | 'indeterminate';
  obligations?: string[];
  advice?: string[];
  reason?: string;
}

// Audit event for authentication/authorization
export interface AuthAuditEvent {
  tenantId: string;
  eventType: 'auth' | 'authz';
  action: string;
  actorId?: string;
  actorEmail?: string;
  actorType: 'user' | 'system';
  ipAddress?: string;
  userAgent?: string;
  sessionId?: string;
  resource?: string;
  result: 'success' | 'failure' | 'partial';
  errorMessage?: string;
  sensitiveDataInvolved: boolean;
  deviceFingerprint?: string;
  mfaUsed?: boolean;
  ssoProvider?: string;
  riskScore?: number;
  details: Record<string, any>;
  occurredAt: Date;
}

// Device trust and posture types
export interface DeviceInfo {
  deviceId: string;
  fingerprint: string;
  platform: string;
  browser: string;
  version: string;
  trusted: boolean;
  managed: boolean;
  complianceScore: number;
  lastSeen: Date;
  riskFactors: string[];
}

// Zero-trust policy evaluation
export interface ZeroTrustContext {
  user: User;
  device: DeviceInfo;
  network: {
    ipAddress: string;
    location?: {
      country: string;
      region: string;
      city: string;
    };
    vpn: boolean;
    tor: boolean;
    riskScore: number;
  };
  session: {
    age: number;
    lastActivity: Date;
    sessionRisk: number;
  };
  request: {
    resource: string;
    action: string;
    sensitivity: 'public' | 'internal' | 'confidential' | 'restricted';
    piiInvolved: boolean;
    phiInvolved: boolean;
  };
}

export interface ZeroTrustDecision {
  allow: boolean;
  requireMFA: boolean;
  requireDeviceAuth: boolean;
  requireApproval: boolean;
  maxSessionTime?: number;
  restrictedActions?: string[];
  monitoringLevel: 'standard' | 'elevated' | 'high';
  reason: string;
  riskScore: number;
}

// API Key management
export interface APIKey {
  id: string;
  tenantId: string;
  name: string;
  description?: string;
  keyHash: string;
  permissions: Permission[];
  scopes: string[];
  active: boolean;
  expiresAt?: Date;
  lastUsedAt?: Date;
  createdBy: string;
  createdAt: Date;
  rateLimit: {
    requestsPerMinute: number;
    requestsPerHour: number;
    requestsPerDay: number;
  };
}

// Configuration types
export interface AuthConfig {
  jwt: {
    algorithm: 'HS256' | 'HS384' | 'HS512' | 'RS256' | 'RS384' | 'RS512';
    accessTokenTTL: number; // seconds
    refreshTokenTTL: number; // seconds
    issuer: string;
    audience: string;
  };
  password: {
    minLength: number;
    requireUppercase: boolean;
    requireLowercase: boolean;
    requireNumbers: boolean;
    requireSpecialChars: boolean;
    maxAge: number; // days
    preventReuse: number; // number of previous passwords
  };
  mfa: {
    issuer: string;
    window: number;
    step: number;
    backupCodeCount: number;
  };
  session: {
    defaultTimeout: number; // minutes
    maxSessions: number;
    extendOnActivity: boolean;
    requireDeviceAuth: boolean;
  };
  lockout: {
    maxAttempts: number;
    lockoutDuration: number; // minutes
    resetOnSuccess: boolean;
  };
  compliance: {
    auditRetentionDays: number;
    requireMFAForAdmins: boolean;
    requireMFAForSensitiveData: boolean;
    passwordChangeFrequency: number; // days
  };
}