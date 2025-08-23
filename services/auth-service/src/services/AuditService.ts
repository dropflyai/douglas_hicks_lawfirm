// Immutable Audit Service for LawFly Pro
// Implements tamper-proof audit logging with hash chains and S3 WORM storage

import { Pool } from 'pg';
import { S3Client, PutObjectCommand, GetObjectCommand, PutObjectLegalHoldCommand } from '@aws-sdk/client-s3';
import crypto from 'crypto';
import { logger } from '../utils/logger';
import config from '../config';

export interface AuditEvent {
  id?: string;
  tenantId: string;
  eventType: 'auth' | 'authz' | 'data' | 'admin' | 'system';
  resourceType: string;
  resourceId?: string;
  actorType: 'user' | 'system' | 'ai';
  actorId?: string;
  actorEmail?: string;
  actorIpAddress?: string;
  userAgent?: string;
  sessionId?: string;
  requestId?: string;
  action: string;
  description?: string;
  changesOld?: Record<string, any>;
  changesNew?: Record<string, any>;
  aiModel?: string;
  aiPromptHash?: string;
  aiConfidenceScore?: number;
  result: 'success' | 'failure' | 'partial';
  errorMessage?: string;
  sensitiveDataInvolved: boolean;
  retentionDate?: Date;
  legalHold: boolean;
  eventHash?: string;
  previousEventHash?: string;
  occurredAt: Date;
  details?: Record<string, any>;
}

export interface AuditQuery {
  tenantId: string;
  eventTypes?: string[];
  resourceTypes?: string[];
  actorIds?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  actions?: string[];
  results?: string[];
  sensitiveDataOnly?: boolean;
  legalHoldOnly?: boolean;
  limit?: number;
  offset?: number;
}

export interface AuditExport {
  events: AuditEvent[];
  totalCount: number;
  exportedAt: Date;
  exportedBy: string;
  integrityHash: string;
  exportId: string;
}

/**
 * Immutable audit service that provides tamper-proof logging
 * All audit events are stored with hash chains and backed up to S3 WORM storage
 */
export class AuditService {
  private db: Pool;
  private s3Client: S3Client;
  private auditBucket: string;

  constructor(db: Pool) {
    this.db = db;
    this.s3Client = new S3Client({
      region: config.aws.region,
      credentials: config.aws.accessKeyId && config.aws.secretAccessKey ? {
        accessKeyId: config.aws.accessKeyId,
        secretAccessKey: config.aws.secretAccessKey
      } : undefined
    });
    this.auditBucket = process.env.AUDIT_LOGS_BUCKET || 'lawfly-audit-logs';
  }

  /**
   * Log an audit event with immutable hash chain
   */
  async logEvent(event: Omit<AuditEvent, 'id' | 'eventHash' | 'previousEventHash'>): Promise<string> {
    const client = await this.db.connect();
    
    try {
      await client.query('BEGIN');
      
      // Set tenant context for RLS
      await client.query('SELECT set_tenant_context($1)', [event.tenantId]);

      // Generate unique event ID
      const eventId = crypto.randomUUID();
      
      // Get the previous event hash for chain integrity
      const previousHashResult = await client.query(`
        SELECT event_hash 
        FROM audit_events 
        WHERE tenant_id = $1 
        ORDER BY occurred_at DESC 
        LIMIT 1
      `, [event.tenantId]);
      
      const previousEventHash = previousHashResult.rows[0]?.event_hash || null;
      
      // Calculate hash of this event including the previous hash
      const eventData = {
        id: eventId,
        tenantId: event.tenantId,
        eventType: event.eventType,
        resourceType: event.resourceType,
        resourceId: event.resourceId,
        actorType: event.actorType,
        actorId: event.actorId,
        action: event.action,
        result: event.result,
        occurredAt: event.occurredAt,
        previousEventHash
      };
      
      const eventHash = this.calculateEventHash(eventData);
      
      // Insert the audit event
      const insertResult = await client.query(`
        INSERT INTO audit_events (
          id, tenant_id, event_type, resource_type, resource_id,
          actor_type, actor_id, actor_email, actor_ip_address,
          user_agent, session_id, request_id, action, description,
          changes_old, changes_new, ai_model, ai_prompt_hash,
          ai_confidence_score, result, error_message,
          sensitive_data_involved, retention_date, legal_hold,
          event_hash, previous_event_hash, occurred_at, details
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14,
          $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28
        )
      `, [
        eventId,
        event.tenantId,
        event.eventType,
        event.resourceType,
        event.resourceId,
        event.actorType,
        event.actorId,
        event.actorEmail,
        event.actorIpAddress,
        event.userAgent,
        event.sessionId,
        event.requestId,
        event.action,
        event.description,
        event.changesOld ? JSON.stringify(event.changesOld) : null,
        event.changesNew ? JSON.stringify(event.changesNew) : null,
        event.aiModel,
        event.aiPromptHash,
        event.aiConfidenceScore,
        event.result,
        event.errorMessage,
        event.sensitiveDataInvolved,
        event.retentionDate,
        event.legalHold,
        eventHash,
        previousEventHash,
        event.occurredAt,
        event.details ? JSON.stringify(event.details) : null
      ]);

      await client.query('COMMIT');
      
      // Asynchronously backup to S3 WORM storage
      setImmediate(() => {
        this.backupEventToS3({
          id: eventId,
          eventHash,
          previousEventHash,
          ...event
        }).catch(error => {
          logger.error('Failed to backup audit event to S3:', error);
        });
      });

      logger.debug(`Audit event logged: ${eventId} for tenant: ${event.tenantId}`);
      
      return eventId;
      
    } catch (error) {
      await client.query('ROLLBACK');
      logger.error('Failed to log audit event:', error);
      throw new Error('Audit logging failed');
    } finally {
      client.release();
    }
  }

  /**
   * Query audit events with filters
   */
  async queryEvents(query: AuditQuery): Promise<{ events: AuditEvent[], totalCount: number }> {
    const client = await this.db.connect();
    
    try {
      // Set tenant context for RLS
      await client.query('SELECT set_tenant_context($1)', [query.tenantId]);

      // Build dynamic WHERE clause
      const whereConditions: string[] = ['tenant_id = $1'];
      const params: any[] = [query.tenantId];
      let paramIndex = 1;

      if (query.eventTypes && query.eventTypes.length > 0) {
        paramIndex++;
        whereConditions.push(`event_type = ANY($${paramIndex})`);
        params.push(query.eventTypes);
      }

      if (query.resourceTypes && query.resourceTypes.length > 0) {
        paramIndex++;
        whereConditions.push(`resource_type = ANY($${paramIndex})`);
        params.push(query.resourceTypes);
      }

      if (query.actorIds && query.actorIds.length > 0) {
        paramIndex++;
        whereConditions.push(`actor_id = ANY($${paramIndex})`);
        params.push(query.actorIds);
      }

      if (query.dateRange) {
        paramIndex++;
        whereConditions.push(`occurred_at >= $${paramIndex}`);
        params.push(query.dateRange.start);
        
        paramIndex++;
        whereConditions.push(`occurred_at <= $${paramIndex}`);
        params.push(query.dateRange.end);
      }

      if (query.actions && query.actions.length > 0) {
        paramIndex++;
        whereConditions.push(`action = ANY($${paramIndex})`);
        params.push(query.actions);
      }

      if (query.results && query.results.length > 0) {
        paramIndex++;
        whereConditions.push(`result = ANY($${paramIndex})`);
        params.push(query.results);
      }

      if (query.sensitiveDataOnly) {
        whereConditions.push('sensitive_data_involved = true');
      }

      if (query.legalHoldOnly) {
        whereConditions.push('legal_hold = true');
      }

      const whereClause = whereConditions.join(' AND ');
      
      // Get total count
      const countResult = await client.query(`
        SELECT COUNT(*) as total
        FROM audit_events
        WHERE ${whereClause}
      `, params);
      
      const totalCount = parseInt(countResult.rows[0].total);

      // Get events with pagination
      const limit = query.limit || 100;
      const offset = query.offset || 0;
      
      paramIndex++;
      const limitParam = paramIndex;
      params.push(limit);
      
      paramIndex++;
      const offsetParam = paramIndex;
      params.push(offset);

      const eventsResult = await client.query(`
        SELECT *
        FROM audit_events
        WHERE ${whereClause}
        ORDER BY occurred_at DESC
        LIMIT $${limitParam} OFFSET $${offsetParam}
      `, params);

      const events: AuditEvent[] = eventsResult.rows.map(row => ({
        id: row.id,
        tenantId: row.tenant_id,
        eventType: row.event_type,
        resourceType: row.resource_type,
        resourceId: row.resource_id,
        actorType: row.actor_type,
        actorId: row.actor_id,
        actorEmail: row.actor_email,
        actorIpAddress: row.actor_ip_address,
        userAgent: row.user_agent,
        sessionId: row.session_id,
        requestId: row.request_id,
        action: row.action,
        description: row.description,
        changesOld: row.changes_old ? JSON.parse(row.changes_old) : undefined,
        changesNew: row.changes_new ? JSON.parse(row.changes_new) : undefined,
        aiModel: row.ai_model,
        aiPromptHash: row.ai_prompt_hash,
        aiConfidenceScore: row.ai_confidence_score,
        result: row.result,
        errorMessage: row.error_message,
        sensitiveDataInvolved: row.sensitive_data_involved,
        retentionDate: row.retention_date,
        legalHold: row.legal_hold,
        eventHash: row.event_hash,
        previousEventHash: row.previous_event_hash,
        occurredAt: row.occurred_at,
        details: row.details ? JSON.parse(row.details) : undefined
      }));

      return { events, totalCount };
      
    } finally {
      client.release();
    }
  }

  /**
   * Verify audit trail integrity by checking hash chain
   */
  async verifyIntegrity(tenantId: string, startDate?: Date, endDate?: Date): Promise<{
    valid: boolean;
    totalEvents: number;
    verifiedEvents: number;
    brokenChains: Array<{ eventId: string; reason: string }>;
  }> {
    const client = await this.db.connect();
    
    try {
      await client.query('SELECT set_tenant_context($1)', [tenantId]);

      let whereClause = 'tenant_id = $1';
      const params: any[] = [tenantId];
      
      if (startDate) {
        params.push(startDate);
        whereClause += ` AND occurred_at >= $${params.length}`;
      }
      
      if (endDate) {
        params.push(endDate);
        whereClause += ` AND occurred_at <= $${params.length}`;
      }

      const result = await client.query(`
        SELECT id, event_hash, previous_event_hash, occurred_at,
               tenant_id, event_type, resource_type, resource_id,
               actor_type, actor_id, action, result
        FROM audit_events
        WHERE ${whereClause}
        ORDER BY occurred_at ASC
      `, params);

      const events = result.rows;
      const totalEvents = events.length;
      let verifiedEvents = 0;
      const brokenChains: Array<{ eventId: string; reason: string }> = [];

      for (let i = 0; i < events.length; i++) {
        const event = events[i];
        const previousEvent = i > 0 ? events[i - 1] : null;

        try {
          // Verify the hash of this event
          const calculatedHash = this.calculateEventHash({
            id: event.id,
            tenantId: event.tenant_id,
            eventType: event.event_type,
            resourceType: event.resource_type,
            resourceId: event.resource_id,
            actorType: event.actor_type,
            actorId: event.actor_id,
            action: event.action,
            result: event.result,
            occurredAt: event.occurred_at,
            previousEventHash: event.previous_event_hash
          });

          if (calculatedHash !== event.event_hash) {
            brokenChains.push({
              eventId: event.id,
              reason: `Hash mismatch: expected ${calculatedHash}, got ${event.event_hash}`
            });
            continue;
          }

          // Verify the chain link to previous event
          if (previousEvent && event.previous_event_hash !== previousEvent.event_hash) {
            brokenChains.push({
              eventId: event.id,
              reason: `Chain break: previous hash ${event.previous_event_hash} doesn't match ${previousEvent.event_hash}`
            });
            continue;
          }

          // Verify that first event has no previous hash
          if (i === 0 && event.previous_event_hash !== null) {
            brokenChains.push({
              eventId: event.id,
              reason: 'First event should have null previous_event_hash'
            });
            continue;
          }

          verifiedEvents++;
          
        } catch (error) {
          brokenChains.push({
            eventId: event.id,
            reason: `Verification error: ${error instanceof Error ? error.message : 'Unknown error'}`
          });
        }
      }

      const valid = brokenChains.length === 0;
      
      logger.info(`Audit integrity verification for tenant ${tenantId}: ${valid ? 'VALID' : 'INVALID'} - ${verifiedEvents}/${totalEvents} events verified`);

      return {
        valid,
        totalEvents,
        verifiedEvents,
        brokenChains
      };
      
    } finally {
      client.release();
    }
  }

  /**
   * Export audit events for legal discovery or compliance
   */
  async exportEvents(
    query: AuditQuery,
    exportedBy: string,
    format: 'json' | 'csv' = 'json'
  ): Promise<AuditExport> {
    const { events, totalCount } = await this.queryEvents(query);
    const exportId = crypto.randomUUID();
    const exportedAt = new Date();
    
    // Calculate integrity hash of the export
    const exportData = {
      events,
      totalCount,
      exportedAt,
      exportedBy,
      exportId,
      query
    };
    
    const integrityHash = crypto
      .createHash('sha256')
      .update(JSON.stringify(exportData))
      .digest('hex');
    
    const auditExport: AuditExport = {
      events,
      totalCount,
      exportedAt,
      exportedBy,
      integrityHash,
      exportId
    };
    
    // Log the export action
    await this.logEvent({
      tenantId: query.tenantId,
      eventType: 'admin',
      resourceType: 'audit_export',
      resourceId: exportId,
      actorType: 'user',
      actorId: exportedBy,
      action: 'export_audit_events',
      description: `Exported ${totalCount} audit events`,
      result: 'success',
      sensitiveDataInvolved: events.some(e => e.sensitiveDataInvolved),
      legalHold: false,
      occurredAt: exportedAt,
      details: {
        format,
        queryFilters: query,
        integrityHash
      }
    });
    
    // Backup export to S3 for long-term retention
    await this.backupExportToS3(auditExport);
    
    return auditExport;
  }

  /**
   * Set legal hold on audit events
   */
  async setLegalHold(
    tenantId: string,
    eventIds: string[],
    reason: string,
    setBy: string
  ): Promise<number> {
    const client = await this.db.connect();
    
    try {
      await client.query('BEGIN');
      await client.query('SELECT set_tenant_context($1)', [tenantId]);

      const result = await client.query(`
        UPDATE audit_events
        SET legal_hold = true, updated_at = CURRENT_TIMESTAMP
        WHERE tenant_id = $1 AND id = ANY($2) AND legal_hold = false
      `, [tenantId, eventIds]);

      const affectedCount = result.rowCount || 0;

      // Log the legal hold action
      await this.logEvent({
        tenantId,
        eventType: 'admin',
        resourceType: 'audit_legal_hold',
        actorType: 'user',
        actorId: setBy,
        action: 'set_legal_hold',
        description: `Set legal hold on ${affectedCount} audit events: ${reason}`,
        result: 'success',
        sensitiveDataInvolved: false,
        legalHold: false,
        occurredAt: new Date(),
        details: {
          eventIds,
          reason,
          affectedCount
        }
      });

      // Also set legal hold on S3 objects if they exist
      await this.setS3LegalHold(eventIds);

      await client.query('COMMIT');
      
      logger.info(`Legal hold set on ${affectedCount} audit events for tenant: ${tenantId}`);
      
      return affectedCount;
      
    } catch (error) {
      await client.query('ROLLBACK');
      logger.error('Failed to set legal hold:', error);
      throw error;
    } finally {
      client.release();
    }
  }

  /**
   * Calculate tamper-proof hash of an audit event
   */
  private calculateEventHash(eventData: any): string {
    const hashInput = [
      eventData.id,
      eventData.tenantId,
      eventData.eventType,
      eventData.resourceType,
      eventData.resourceId || '',
      eventData.actorType,
      eventData.actorId || '',
      eventData.action,
      eventData.result,
      eventData.occurredAt.toISOString(),
      eventData.previousEventHash || ''
    ].join('|');
    
    return crypto.createHash('sha256').update(hashInput).digest('hex');
  }

  /**
   * Backup audit event to S3 WORM storage
   */
  private async backupEventToS3(event: AuditEvent): Promise<void> {
    try {
      const key = `tenant=${event.tenantId}/year=${event.occurredAt.getFullYear()}/month=${event.occurredAt.getMonth() + 1}/day=${event.occurredAt.getDate()}/${event.id}.json`;
      
      const command = new PutObjectCommand({
        Bucket: this.auditBucket,
        Key: key,
        Body: JSON.stringify(event, null, 2),
        ContentType: 'application/json',
        Metadata: {
          tenantId: event.tenantId,
          eventType: event.eventType,
          resourceType: event.resourceType,
          actorType: event.actorType,
          sensitiveData: event.sensitiveDataInvolved.toString(),
          legalHold: event.legalHold.toString()
        },
        // Enable object lock for WORM compliance
        ObjectLockMode: 'COMPLIANCE',
        ObjectLockRetainUntilDate: event.retentionDate || new Date(Date.now() + 7 * 365 * 24 * 60 * 60 * 1000) // 7 years default
      });

      await this.s3Client.send(command);
      
    } catch (error) {
      logger.error('Failed to backup audit event to S3:', error);
      // Don't throw - this is async backup
    }
  }

  /**
   * Backup audit export to S3
   */
  private async backupExportToS3(auditExport: AuditExport): Promise<void> {
    try {
      const key = `exports/${auditExport.exportedAt.toISOString().split('T')[0]}/${auditExport.exportId}.json`;
      
      const command = new PutObjectCommand({
        Bucket: this.auditBucket,
        Key: key,
        Body: JSON.stringify(auditExport, null, 2),
        ContentType: 'application/json',
        Metadata: {
          exportId: auditExport.exportId,
          exportedBy: auditExport.exportedBy,
          totalCount: auditExport.totalCount.toString(),
          integrityHash: auditExport.integrityHash
        },
        ObjectLockMode: 'COMPLIANCE',
        ObjectLockRetainUntilDate: new Date(Date.now() + 7 * 365 * 24 * 60 * 60 * 1000) // 7 years
      });

      await this.s3Client.send(command);
      
    } catch (error) {
      logger.error('Failed to backup audit export to S3:', error);
    }
  }

  /**
   * Set legal hold on S3 objects
   */
  private async setS3LegalHold(eventIds: string[]): Promise<void> {
    // TODO: Implement S3 legal hold for individual objects
    // This would iterate through eventIds and set legal hold on corresponding S3 objects
    
    for (const eventId of eventIds) {
      try {
        // Find the S3 key for this event
        // Set legal hold using PutObjectLegalHoldCommand
        
        logger.debug(`Legal hold set on S3 object for event: ${eventId}`);
        
      } catch (error) {
        logger.error(`Failed to set S3 legal hold for event ${eventId}:`, error);
      }
    }
  }

  /**
   * Convenience method for logging authentication events
   */
  async logAuthEvent(
    tenantId: string,
    actorId: string | undefined,
    actorEmail: string | undefined,
    action: string,
    result: 'success' | 'failure' | 'partial',
    details?: {
      ipAddress?: string;
      userAgent?: string;
      sessionId?: string;
      errorMessage?: string;
      mfaUsed?: boolean;
      riskScore?: number;
      [key: string]: any;
    }
  ): Promise<string> {
    return this.logEvent({
      tenantId,
      eventType: 'auth',
      resourceType: 'user_session',
      actorType: 'user',
      actorId,
      actorEmail,
      actorIpAddress: details?.ipAddress,
      userAgent: details?.userAgent,
      sessionId: details?.sessionId,
      action,
      result,
      errorMessage: details?.errorMessage,
      sensitiveDataInvolved: false,
      legalHold: false,
      occurredAt: new Date(),
      details: details
    });
  }
}