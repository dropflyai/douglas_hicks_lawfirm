// BYOK Encryption Service for LawFly Pro
// Implements customer-controlled encryption with AWS KMS integration

import { KMSClient, EncryptCommand, DecryptCommand, GenerateDataKeyCommand, CreateKeyCommand } from '@aws-sdk/client-kms';
import crypto from 'crypto';
import { logger } from '../utils/logger';
import config from '../config';

export interface EncryptionResult {
  encryptedData: string;
  keyId: string;
  algorithm: string;
  iv?: string;
  authTag?: string;
}

export interface DecryptionResult {
  decryptedData: string;
  verified: boolean;
}

export interface DataKey {
  plaintextKey: Buffer;
  encryptedKey: string;
  keyId: string;
}

/**
 * Encryption service that supports both AWS KMS (BYOK) and local encryption
 * Implements field-level encryption for sensitive data like PHI/PII
 */
export class EncryptionService {
  private kmsClient: KMSClient;
  private localKey: Buffer;

  constructor() {
    // Initialize AWS KMS client
    this.kmsClient = new KMSClient({
      region: config.aws.region,
      credentials: config.aws.accessKeyId && config.aws.secretAccessKey ? {
        accessKeyId: config.aws.accessKeyId,
        secretAccessKey: config.aws.secretAccessKey
      } : undefined // Use default credential chain if not specified
    });

    // Initialize local encryption key (fallback)
    const localKeyString = process.env.ENCRYPTION_KEY;
    if (!localKeyString) {
      throw new Error('ENCRYPTION_KEY environment variable is required');
    }
    
    this.localKey = Buffer.from(localKeyString, 'hex');
    if (this.localKey.length !== 32) {
      throw new Error('ENCRYPTION_KEY must be 32 bytes (64 hex characters)');
    }
  }

  /**
   * Encrypt data using customer's KMS key (BYOK) or local key
   */
  async encrypt(
    data: string | Buffer,
    keyId?: string,
    context?: Record<string, string>
  ): Promise<EncryptionResult> {
    try {
      const dataBuffer = typeof data === 'string' ? Buffer.from(data, 'utf8') : data;

      if (keyId && keyId.startsWith('arn:aws:kms:')) {
        // Use AWS KMS for encryption (BYOK)
        return await this.encryptWithKMS(dataBuffer, keyId, context);
      } else {
        // Use local encryption
        return await this.encryptLocally(dataBuffer, keyId || 'local');
      }
    } catch (error) {
      logger.error('Encryption failed:', error);
      throw new Error('Encryption operation failed');
    }
  }

  /**
   * Decrypt data using the specified key
   */
  async decrypt(
    encryptionResult: EncryptionResult,
    context?: Record<string, string>
  ): Promise<DecryptionResult> {
    try {
      if (encryptionResult.keyId.startsWith('arn:aws:kms:')) {
        // Use AWS KMS for decryption
        return await this.decryptWithKMS(encryptionResult, context);
      } else {
        // Use local decryption
        return await this.decryptLocally(encryptionResult);
      }
    } catch (error) {
      logger.error('Decryption failed:', error);
      throw new Error('Decryption operation failed');
    }
  }

  /**
   * Encrypt using AWS KMS (for BYOK customers)
   */
  private async encryptWithKMS(
    data: Buffer,
    keyId: string,
    context?: Record<string, string>
  ): Promise<EncryptionResult> {
    try {
      // Generate a data key for envelope encryption
      const dataKey = await this.generateDataKey(keyId, context);
      
      // Encrypt the data with the plaintext data key using AES-256-GCM
      const iv = crypto.randomBytes(16);
      const cipher = crypto.createCipherGCM('aes-256-gcm', dataKey.plaintextKey);
      cipher.setAAD(Buffer.from(JSON.stringify(context || {})));
      
      let encryptedData = cipher.update(data);
      encryptedData = Buffer.concat([encryptedData, cipher.final()]);
      
      const authTag = cipher.getAuthTag();
      
      // Combine encrypted data key + IV + auth tag + encrypted data
      const combinedBuffer = Buffer.concat([
        Buffer.from(dataKey.encryptedKey, 'base64'),
        iv,
        authTag,
        encryptedData
      ]);
      
      return {
        encryptedData: combinedBuffer.toString('base64'),
        keyId: keyId,
        algorithm: 'AWS_KMS_AES_256_GCM',
        iv: iv.toString('base64'),
        authTag: authTag.toString('base64')
      };
      
    } catch (error) {
      logger.error('KMS encryption failed:', error);
      throw error;
    }
  }

  /**
   * Decrypt using AWS KMS
   */
  private async decryptWithKMS(
    encryptionResult: EncryptionResult,
    context?: Record<string, string>
  ): Promise<DecryptionResult> {
    try {
      const combinedBuffer = Buffer.from(encryptionResult.encryptedData, 'base64');
      
      // Extract components (this is a simplified version - real implementation needs proper length handling)
      const encryptedKeyLength = 512; // Approximate - should be calculated properly
      const encryptedKeyBuffer = combinedBuffer.subarray(0, encryptedKeyLength);
      const iv = combinedBuffer.subarray(encryptedKeyLength, encryptedKeyLength + 16);
      const authTag = combinedBuffer.subarray(encryptedKeyLength + 16, encryptedKeyLength + 32);
      const encryptedData = combinedBuffer.subarray(encryptedKeyLength + 32);
      
      // Decrypt the data key using KMS
      const decryptCommand = new DecryptCommand({
        CiphertextBlob: encryptedKeyBuffer,
        EncryptionContext: context
      });
      
      const decryptResult = await this.kmsClient.send(decryptCommand);
      
      if (!decryptResult.Plaintext) {
        throw new Error('Failed to decrypt data key');
      }
      
      // Decrypt the data using the plaintext data key
      const decipher = crypto.createDecipherGCM('aes-256-gcm', decryptResult.Plaintext);
      decipher.setAAD(Buffer.from(JSON.stringify(context || {})));
      decipher.setAuthTag(authTag);
      
      let decryptedData = decipher.update(encryptedData);
      decryptedData = Buffer.concat([decryptedData, decipher.final()]);
      
      return {
        decryptedData: decryptedData.toString('utf8'),
        verified: true
      };
      
    } catch (error) {
      logger.error('KMS decryption failed:', error);
      return {
        decryptedData: '',
        verified: false
      };
    }
  }

  /**
   * Local encryption using AES-256-GCM (fallback when BYOK not available)
   */
  private async encryptLocally(
    data: Buffer,
    keyId: string
  ): Promise<EncryptionResult> {
    try {
      const iv = crypto.randomBytes(16);
      const cipher = crypto.createCipherGCM('aes-256-gcm', this.localKey);
      
      let encryptedData = cipher.update(data);
      encryptedData = Buffer.concat([encryptedData, cipher.final()]);
      
      const authTag = cipher.getAuthTag();
      
      // Combine IV + auth tag + encrypted data
      const combinedBuffer = Buffer.concat([iv, authTag, encryptedData]);
      
      return {
        encryptedData: combinedBuffer.toString('base64'),
        keyId: keyId,
        algorithm: 'AES_256_GCM',
        iv: iv.toString('base64'),
        authTag: authTag.toString('base64')
      };
      
    } catch (error) {
      logger.error('Local encryption failed:', error);
      throw error;
    }
  }

  /**
   * Local decryption using AES-256-GCM
   */
  private async decryptLocally(
    encryptionResult: EncryptionResult
  ): Promise<DecryptionResult> {
    try {
      const combinedBuffer = Buffer.from(encryptionResult.encryptedData, 'base64');
      
      // Extract IV, auth tag, and encrypted data
      const iv = combinedBuffer.subarray(0, 16);
      const authTag = combinedBuffer.subarray(16, 32);
      const encryptedData = combinedBuffer.subarray(32);
      
      const decipher = crypto.createDecipherGCM('aes-256-gcm', this.localKey);
      decipher.setAuthTag(authTag);
      
      let decryptedData = decipher.update(encryptedData);
      decryptedData = Buffer.concat([decryptedData, decipher.final()]);
      
      return {
        decryptedData: decryptedData.toString('utf8'),
        verified: true
      };
      
    } catch (error) {
      logger.error('Local decryption failed:', error);
      return {
        decryptedData: '',
        verified: false
      };
    }
  }

  /**
   * Generate a data key for envelope encryption
   */
  private async generateDataKey(
    keyId: string,
    context?: Record<string, string>
  ): Promise<DataKey> {
    try {
      const command = new GenerateDataKeyCommand({
        KeyId: keyId,
        KeySpec: 'AES_256',
        EncryptionContext: context
      });
      
      const result = await this.kmsClient.send(command);
      
      if (!result.Plaintext || !result.CiphertextBlob) {
        throw new Error('Failed to generate data key');
      }
      
      return {
        plaintextKey: Buffer.from(result.Plaintext),
        encryptedKey: Buffer.from(result.CiphertextBlob).toString('base64'),
        keyId: keyId
      };
      
    } catch (error) {
      logger.error('Data key generation failed:', error);
      throw error;
    }
  }

  /**
   * Encrypt field-level data (for PII/PHI)
   */
  async encryptField(
    value: string,
    fieldType: 'email' | 'ssn' | 'phone' | 'medical' | 'financial' | 'general',
    tenantId: string,
    keyId?: string
  ): Promise<string> {
    const context = {
      fieldType,
      tenantId,
      timestamp: new Date().toISOString()
    };

    const encryptionResult = await this.encrypt(value, keyId, context);
    
    // Return a structured encrypted field that includes metadata
    const encryptedField = {
      v: 1, // Version
      d: encryptionResult.encryptedData,
      k: encryptionResult.keyId,
      a: encryptionResult.algorithm,
      t: fieldType,
      iv: encryptionResult.iv,
      at: encryptionResult.authTag
    };
    
    return Buffer.from(JSON.stringify(encryptedField)).toString('base64');
  }

  /**
   * Decrypt field-level data
   */
  async decryptField(encryptedField: string): Promise<string | null> {
    try {
      const fieldData = JSON.parse(Buffer.from(encryptedField, 'base64').toString('utf8'));
      
      const encryptionResult: EncryptionResult = {
        encryptedData: fieldData.d,
        keyId: fieldData.k,
        algorithm: fieldData.a,
        iv: fieldData.iv,
        authTag: fieldData.at
      };
      
      const context = {
        fieldType: fieldData.t,
        tenantId: fieldData.tenantId, // Note: This should be validated against current tenant
        timestamp: fieldData.timestamp
      };
      
      const decryptionResult = await this.decrypt(encryptionResult, context);
      
      return decryptionResult.verified ? decryptionResult.decryptedData : null;
      
    } catch (error) {
      logger.error('Field decryption failed:', error);
      return null;
    }
  }

  /**
   * Create a tenant-specific KMS key (for enterprise customers)
   */
  async createTenantKey(
    tenantId: string,
    keyUsage: 'ENCRYPT_DECRYPT' | 'SIGN_VERIFY' = 'ENCRYPT_DECRYPT'
  ): Promise<string> {
    try {
      const keyPolicy = {
        Version: '2012-10-17',
        Statement: [
          {
            Sid: 'EnableRootAccess',
            Effect: 'Allow',
            Principal: {
              AWS: `arn:aws:iam::${process.env.AWS_ACCOUNT_ID}:root`
            },
            Action: 'kms:*',
            Resource: '*'
          },
          {
            Sid: 'AllowTenantAccess',
            Effect: 'Allow',
            Principal: {
              AWS: `arn:aws:iam::${process.env.AWS_ACCOUNT_ID}:role/lawfly-tenant-${tenantId}`
            },
            Action: [
              'kms:Encrypt',
              'kms:Decrypt',
              'kms:ReEncrypt*',
              'kms:GenerateDataKey*',
              'kms:DescribeKey'
            ],
            Resource: '*',
            Condition: {
              StringEquals: {
                'kms:EncryptionContext:tenantId': tenantId
              }
            }
          }
        ]
      };

      const command = new CreateKeyCommand({
        KeyUsage: keyUsage,
        KeySpec: 'SYMMETRIC_DEFAULT',
        Origin: 'AWS_KMS',
        Description: `LawFly Pro tenant key for ${tenantId}`,
        Policy: JSON.stringify(keyPolicy),
        Tags: [
          { TagKey: 'Project', TagValue: 'lawfly-pro' },
          { TagKey: 'TenantId', TagValue: tenantId },
          { TagKey: 'Environment', TagValue: config.server.environment },
          { TagKey: 'Purpose', TagValue: 'tenant-data-encryption' }
        ]
      });

      const result = await this.kmsClient.send(command);
      
      if (!result.KeyMetadata?.KeyId) {
        throw new Error('Failed to create tenant key');
      }

      logger.info(`Created tenant KMS key: ${result.KeyMetadata.KeyId} for tenant: ${tenantId}`);
      
      return result.KeyMetadata.KeyId;
      
    } catch (error) {
      logger.error('Tenant key creation failed:', error);
      throw error;
    }
  }

  /**
   * Rotate encryption key (compliance requirement)
   */
  async rotateKey(keyId: string): Promise<void> {
    // TODO: Implement key rotation logic
    // This would involve:
    // 1. Creating a new key version
    // 2. Re-encrypting data with new key
    // 3. Updating key references
    // 4. Archiving old key version
    
    logger.info(`Key rotation initiated for key: ${keyId}`);
  }

  /**
   * Hash sensitive data for deterministic encryption (searchable)
   */
  hashForSearch(value: string, salt?: string): string {
    const actualSalt = salt || process.env.SEARCH_SALT || 'default-salt';
    return crypto.pbkdf2Sync(value.toLowerCase(), actualSalt, 100000, 32, 'sha256').toString('hex');
  }

  /**
   * Generate a secure random token
   */
  generateSecureToken(length: number = 32): string {
    return crypto.randomBytes(length).toString('hex');
  }

  /**
   * Verify data integrity using HMAC
   */
  generateIntegrityHash(data: string, key?: string): string {
    const hmacKey = key || this.localKey;
    return crypto.createHmac('sha256', hmacKey).update(data).digest('hex');
  }

  /**
   * Verify data integrity
   */
  verifyIntegrity(data: string, hash: string, key?: string): boolean {
    const expectedHash = this.generateIntegrityHash(data, key);
    return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(expectedHash));
  }
}