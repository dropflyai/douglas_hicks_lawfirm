// Configuration for LawFly Pro Authentication Service

import { AuthConfig } from '../types/auth';

export const config = {
  // Server configuration
  server: {
    port: parseInt(process.env.PORT || '3000'),
    host: process.env.HOST || '0.0.0.0',
    environment: process.env.NODE_ENV || 'development',
    logLevel: process.env.LOG_LEVEL || 'info',
  },

  // Database configuration
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME || 'lawfly_pro',
    username: process.env.DB_USER || 'lawfly_app',
    password: process.env.DB_PASSWORD || '',
    ssl: process.env.DB_SSL === 'true',
    maxConnections: parseInt(process.env.DB_MAX_CONNECTIONS || '20'),
    connectionTimeoutMillis: parseInt(process.env.DB_CONNECTION_TIMEOUT || '5000'),
    idleTimeoutMillis: parseInt(process.env.DB_IDLE_TIMEOUT || '10000'),
  },

  // Redis configuration (for sessions and caching)
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379'),
    password: process.env.REDIS_PASSWORD || '',
    db: parseInt(process.env.REDIS_DB || '0'),
    keyPrefix: process.env.REDIS_KEY_PREFIX || 'lawfly:auth:',
    maxRetries: 3,
    retryDelayOnFailover: 100,
  },

  // Authentication configuration
  auth: {
    jwt: {
      algorithm: (process.env.JWT_ALGORITHM as any) || 'HS256',
      accessTokenTTL: parseInt(process.env.JWT_ACCESS_TOKEN_TTL || '900'), // 15 minutes
      refreshTokenTTL: parseInt(process.env.JWT_REFRESH_TOKEN_TTL || '86400'), // 24 hours
      issuer: process.env.JWT_ISSUER || 'lawfly-pro',
      audience: process.env.JWT_AUDIENCE || 'lawfly-pro-api',
    },
    
    password: {
      minLength: parseInt(process.env.PASSWORD_MIN_LENGTH || '12'),
      requireUppercase: process.env.PASSWORD_REQUIRE_UPPERCASE !== 'false',
      requireLowercase: process.env.PASSWORD_REQUIRE_LOWERCASE !== 'false', 
      requireNumbers: process.env.PASSWORD_REQUIRE_NUMBERS !== 'false',
      requireSpecialChars: process.env.PASSWORD_REQUIRE_SPECIAL !== 'false',
      maxAge: parseInt(process.env.PASSWORD_MAX_AGE_DAYS || '90'), // 90 days
      preventReuse: parseInt(process.env.PASSWORD_PREVENT_REUSE || '12'), // Last 12 passwords
    },
    
    mfa: {
      issuer: process.env.MFA_ISSUER || 'LawFly Pro',
      window: parseInt(process.env.MFA_WINDOW || '2'), // TOTP time window
      step: parseInt(process.env.MFA_STEP || '30'), // TOTP step in seconds
      backupCodeCount: parseInt(process.env.MFA_BACKUP_CODE_COUNT || '10'),
    },
    
    session: {
      defaultTimeout: parseInt(process.env.SESSION_TIMEOUT_MINUTES || '480'), // 8 hours
      maxSessions: parseInt(process.env.MAX_SESSIONS_PER_USER || '5'),
      extendOnActivity: process.env.EXTEND_SESSION_ON_ACTIVITY !== 'false',
      requireDeviceAuth: process.env.REQUIRE_DEVICE_AUTH === 'true',
    },
    
    lockout: {
      maxAttempts: parseInt(process.env.LOCKOUT_MAX_ATTEMPTS || '5'),
      lockoutDuration: parseInt(process.env.LOCKOUT_DURATION_MINUTES || '30'),
      resetOnSuccess: process.env.LOCKOUT_RESET_ON_SUCCESS !== 'false',
    },
    
    compliance: {
      auditRetentionDays: parseInt(process.env.AUDIT_RETENTION_DAYS || '2555'), // 7 years
      requireMFAForAdmins: process.env.REQUIRE_MFA_ADMINS !== 'false',
      requireMFAForSensitiveData: process.env.REQUIRE_MFA_SENSITIVE !== 'false',
      passwordChangeFrequency: parseInt(process.env.PASSWORD_CHANGE_FREQUENCY || '90'),
    },
  } as AuthConfig,

  // AWS/Cloud configuration
  aws: {
    region: process.env.AWS_REGION || 'us-east-1',
    kmsKeyId: process.env.AWS_KMS_KEY_ID,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },

  // Security headers and CORS
  security: {
    cors: {
      origin: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:3000'],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Tenant-ID', 'X-Request-ID'],
      credentials: true,
    },
    
    helmet: {
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", "data:", "https:"],
          connectSrc: ["'self'"],
          fontSrc: ["'self'"],
          objectSrc: ["'none'"],
          mediaSrc: ["'self'"],
          frameSrc: ["'none'"],
        },
      },
      hsts: {
        maxAge: 31536000, // 1 year
        includeSubDomains: true,
        preload: true,
      },
    },
    
    rateLimit: {
      max: parseInt(process.env.RATE_LIMIT_MAX || '100'), // requests per window
      timeWindow: parseInt(process.env.RATE_LIMIT_WINDOW || '60000'), // 1 minute
      skipSuccessfulRequests: true,
      skipFailedRequests: false,
    },
    
    // Rate limiting for authentication endpoints (stricter)
    authRateLimit: {
      max: parseInt(process.env.AUTH_RATE_LIMIT_MAX || '10'), // login attempts per window
      timeWindow: parseInt(process.env.AUTH_RATE_LIMIT_WINDOW || '300000'), // 5 minutes
      skipSuccessfulRequests: false,
      skipFailedRequests: false,
    },
  },

  // Zero-trust configuration
  zeroTrust: {
    deviceTrustRequired: process.env.ZERO_TRUST_DEVICE_REQUIRED === 'true',
    riskThreshold: parseFloat(process.env.ZERO_TRUST_RISK_THRESHOLD || '0.7'),
    continuousMonitoring: process.env.ZERO_TRUST_CONTINUOUS_MONITORING !== 'false',
    adaptiveAuth: process.env.ZERO_TRUST_ADAPTIVE_AUTH !== 'false',
    
    // Device posture requirements
    devicePosture: {
      requireEncryption: process.env.DEVICE_REQUIRE_ENCRYPTION !== 'false',
      requireScreenLock: process.env.DEVICE_REQUIRE_SCREEN_LOCK !== 'false',
      requireUpdatedOS: process.env.DEVICE_REQUIRE_UPDATED_OS !== 'false',
      allowJailbroken: process.env.DEVICE_ALLOW_JAILBROKEN === 'true',
      maxDeviceAge: parseInt(process.env.DEVICE_MAX_AGE_DAYS || '365'), // 1 year
    },
  },

  // Encryption and key management
  encryption: {
    algorithm: process.env.ENCRYPTION_ALGORITHM || 'aes-256-gcm',
    keyDerivation: process.env.KEY_DERIVATION || 'pbkdf2',
    iterations: parseInt(process.env.KEY_ITERATIONS || '100000'),
    saltLength: parseInt(process.env.SALT_LENGTH || '32'),
    tagLength: parseInt(process.env.TAG_LENGTH || '16'),
  },

  // External services
  services: {
    // SSO providers
    sso: {
      samlCallbackUrl: process.env.SAML_CALLBACK_URL || 'https://api.lawfly.pro/auth/saml/callback',
      oidcCallbackUrl: process.env.OIDC_CALLBACK_URL || 'https://api.lawfly.pro/auth/oidc/callback',
    },
    
    // Email service (for notifications)
    email: {
      provider: process.env.EMAIL_PROVIDER || 'aws-ses',
      fromAddress: process.env.EMAIL_FROM || 'noreply@lawfly.pro',
      region: process.env.EMAIL_REGION || 'us-east-1',
    },
    
    // SMS service (for MFA)
    sms: {
      provider: process.env.SMS_PROVIDER || 'aws-sns',
      region: process.env.SMS_REGION || 'us-east-1',
    },
  },

  // Monitoring and observability
  monitoring: {
    metricsEnabled: process.env.METRICS_ENABLED !== 'false',
    metricsPort: parseInt(process.env.METRICS_PORT || '9090'),
    healthCheckPath: process.env.HEALTH_CHECK_PATH || '/health',
    tracingEnabled: process.env.TRACING_ENABLED === 'true',
    tracingEndpoint: process.env.TRACING_ENDPOINT,
  },

  // Feature flags
  features: {
    webauthnEnabled: process.env.WEBAUTHN_ENABLED === 'true',
    biometricAuthEnabled: process.env.BIOMETRIC_AUTH_ENABLED === 'true',
    ssoAutoProvision: process.env.SSO_AUTO_PROVISION !== 'false',
    scimEnabled: process.env.SCIM_ENABLED === 'true',
    apiKeyAuth: process.env.API_KEY_AUTH_ENABLED === 'true',
    adaptiveAuth: process.env.ADAPTIVE_AUTH_ENABLED === 'true',
    deviceTrust: process.env.DEVICE_TRUST_ENABLED === 'true',
  },
};

// Validate required environment variables
export function validateConfig() {
  const required = [
    'DB_PASSWORD',
    'JWT_SECRET',
    'ENCRYPTION_KEY',
  ];

  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  // Validate JWT algorithm
  const validAlgorithms = ['HS256', 'HS384', 'HS512', 'RS256', 'RS384', 'RS512'];
  if (!validAlgorithms.includes(config.auth.jwt.algorithm)) {
    throw new Error(`Invalid JWT algorithm: ${config.auth.jwt.algorithm}`);
  }

  // Validate password requirements
  if (config.auth.password.minLength < 8) {
    throw new Error('Password minimum length must be at least 8 characters');
  }

  console.log('✅ Configuration validated successfully');
}

export default config;