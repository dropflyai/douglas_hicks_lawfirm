-- LawFly Pro Database Schema
-- Security-first multi-tenant schema with row-level security

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "vector";  -- For AI embeddings

-- Enable Row Level Security globally
ALTER DATABASE postgres SET row_security = on;

-- Core tenant table (root of all isolation)
CREATE TABLE tenants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(63) UNIQUE NOT NULL,  -- DNS-safe tenant identifier
    name VARCHAR(255) NOT NULL,
    domain VARCHAR(255),
    
    -- Security configuration
    kms_key_id VARCHAR(255),  -- For BYOK
    encryption_enabled BOOLEAN DEFAULT true,
    data_residency VARCHAR(10) DEFAULT 'US',  -- US, EU, etc.
    
    -- Compliance settings
    compliance_frameworks TEXT[] DEFAULT ARRAY['SOC2'],  -- SOC2, HIPAA, GDPR
    retention_years INTEGER DEFAULT 7,
    legal_hold_enabled BOOLEAN DEFAULT false,
    
    -- Tenant status and limits
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'terminated')),
    max_users INTEGER DEFAULT 100,
    max_storage_gb INTEGER DEFAULT 1000,
    
    -- Audit fields
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by UUID,
    
    -- Metadata
    settings JSONB DEFAULT '{}',
    
    CONSTRAINT valid_slug CHECK (slug ~ '^[a-z0-9]([a-z0-9-]*[a-z0-9])?$')
);

-- Index for performance
CREATE UNIQUE INDEX idx_tenants_slug ON tenants(slug);
CREATE INDEX idx_tenants_status ON tenants(status);
CREATE INDEX idx_tenants_domain ON tenants(domain);

-- Users table with tenant isolation
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    
    -- Identity information
    email VARCHAR(255) NOT NULL,
    email_verified BOOLEAN DEFAULT false,
    external_id VARCHAR(255),  -- From SSO provider
    
    -- Profile information
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    title VARCHAR(100),
    phone VARCHAR(20),
    
    -- Security settings
    mfa_enabled BOOLEAN DEFAULT false,
    mfa_backup_codes TEXT[],
    password_hash VARCHAR(255),  -- For local accounts only
    password_changed_at TIMESTAMP WITH TIME ZONE,
    failed_login_attempts INTEGER DEFAULT 0,
    locked_until TIMESTAMP WITH TIME ZONE,
    
    -- Access control
    roles TEXT[] DEFAULT ARRAY['user'],  -- user, admin, partner, associate, paralegal
    permissions JSONB DEFAULT '{}',
    attributes JSONB DEFAULT '{}',  -- For ABAC (device_trusted, location, etc.)
    
    -- Session management
    last_login_at TIMESTAMP WITH TIME ZONE,
    last_login_ip INET,
    session_timeout_minutes INTEGER DEFAULT 480,  -- 8 hours
    
    -- Audit fields
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by UUID,
    
    CONSTRAINT unique_tenant_email UNIQUE (tenant_id, email)
);

-- Row Level Security for users
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see users from their tenant
CREATE POLICY tenant_isolation_users ON users
    USING (tenant_id = current_setting('app.current_tenant_id')::uuid);

-- Indexes for users
CREATE INDEX idx_users_tenant_id ON users(tenant_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_external_id ON users(external_id);
CREATE INDEX idx_users_roles ON users USING gin(roles);

-- Legal matters (core entity)
CREATE TABLE matters (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    
    -- Matter identification
    matter_number VARCHAR(50),  -- Client's internal matter number
    title VARCHAR(500) NOT NULL,
    description TEXT,
    
    -- Classification
    practice_area VARCHAR(100),  -- litigation, corporate, real-estate, etc.
    matter_type VARCHAR(100),    -- contract, lawsuit, transaction, etc.
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'closed', 'archived', 'on-hold')),
    
    -- Security classification
    sensitivity_level VARCHAR(20) DEFAULT 'confidential' CHECK (
        sensitivity_level IN ('public', 'internal', 'confidential', 'restricted')
    ),
    security_flags TEXT[] DEFAULT ARRAY[]::TEXT[],  -- pii, phi, attorney-client, etc.
    
    -- Client information
    client_name VARCHAR(255) NOT NULL,
    client_contact JSONB,  -- Structured client contact info
    
    -- Matter team
    responsible_attorney UUID REFERENCES users(id),
    assigned_users UUID[] DEFAULT ARRAY[]::UUID[],
    
    -- Financial
    billing_rate_default DECIMAL(10,2),
    budget_amount DECIMAL(12,2),
    
    -- Dates
    opened_date DATE NOT NULL DEFAULT CURRENT_DATE,
    closed_date DATE,
    statute_of_limitations DATE,
    
    -- Legal hold
    legal_hold BOOLEAN DEFAULT false,
    legal_hold_date TIMESTAMP WITH TIME ZONE,
    legal_hold_reason TEXT,
    
    -- Audit fields
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by UUID REFERENCES users(id),
    
    -- Metadata and custom fields
    custom_fields JSONB DEFAULT '{}',
    
    CONSTRAINT unique_tenant_matter_number UNIQUE (tenant_id, matter_number)
);

-- Row Level Security for matters
ALTER TABLE matters ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation_matters ON matters
    USING (tenant_id = current_setting('app.current_tenant_id')::uuid);

-- Indexes for matters
CREATE INDEX idx_matters_tenant_id ON matters(tenant_id);
CREATE INDEX idx_matters_status ON matters(status);
CREATE INDEX idx_matters_practice_area ON matters(practice_area);
CREATE INDEX idx_matters_responsible_attorney ON matters(responsible_attorney);
CREATE INDEX idx_matters_client_name ON matters(client_name);
CREATE INDEX idx_matters_opened_date ON matters(opened_date);
CREATE INDEX idx_matters_legal_hold ON matters(legal_hold);

-- Documents table with encryption and versioning
CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    matter_id UUID REFERENCES matters(id) ON DELETE CASCADE,
    
    -- File information
    filename VARCHAR(255) NOT NULL,
    original_filename VARCHAR(255) NOT NULL,
    file_extension VARCHAR(10),
    mime_type VARCHAR(100),
    file_size_bytes BIGINT NOT NULL,
    
    -- Storage information
    storage_provider VARCHAR(20) DEFAULT 'aws-s3',
    storage_path TEXT NOT NULL,  -- S3 key or file path
    storage_bucket VARCHAR(255),
    
    -- Security
    encryption_key_id VARCHAR(255),  -- KMS key ID used for encryption
    file_hash_sha256 VARCHAR(64) NOT NULL,  -- For integrity verification
    encrypted BOOLEAN DEFAULT true,
    
    -- Classification
    sensitivity_level VARCHAR(20) DEFAULT 'confidential' CHECK (
        sensitivity_level IN ('public', 'internal', 'confidential', 'restricted')
    ),
    document_type VARCHAR(50),  -- contract, pleading, correspondence, etc.
    tags TEXT[] DEFAULT ARRAY[]::TEXT[],
    
    -- Versioning
    version INTEGER DEFAULT 1,
    is_latest_version BOOLEAN DEFAULT true,
    parent_document_id UUID REFERENCES documents(id),
    
    -- Access control
    require_remote_view BOOLEAN DEFAULT false,  -- Force remote rendering
    download_allowed BOOLEAN DEFAULT true,
    print_allowed BOOLEAN DEFAULT true,
    
    -- Legal hold
    legal_hold BOOLEAN DEFAULT false,
    legal_hold_date TIMESTAMP WITH TIME ZONE,
    legal_hold_reason TEXT,
    
    -- Processing status
    virus_scan_status VARCHAR(20) DEFAULT 'pending',
    virus_scan_result VARCHAR(50),
    ocr_processed BOOLEAN DEFAULT false,
    ai_processed BOOLEAN DEFAULT false,
    
    -- Audit fields
    uploaded_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Metadata and search
    metadata JSONB DEFAULT '{}',
    search_vector tsvector,  -- For full-text search
    
    CONSTRAINT valid_file_size CHECK (file_size_bytes > 0),
    CONSTRAINT valid_version CHECK (version > 0)
);

-- Row Level Security for documents
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation_documents ON documents
    USING (tenant_id = current_setting('app.current_tenant_id')::uuid);

-- Indexes for documents
CREATE INDEX idx_documents_tenant_id ON documents(tenant_id);
CREATE INDEX idx_documents_matter_id ON documents(matter_id);
CREATE INDEX idx_documents_filename ON documents(filename);
CREATE INDEX idx_documents_file_hash ON documents(file_hash_sha256);
CREATE INDEX idx_documents_document_type ON documents(document_type);
CREATE INDEX idx_documents_tags ON documents USING gin(tags);
CREATE INDEX idx_documents_legal_hold ON documents(legal_hold);
CREATE INDEX idx_documents_search_vector ON documents USING gin(search_vector);

-- AI document embeddings for RAG
CREATE TABLE document_embeddings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
    
    -- Content information
    chunk_index INTEGER NOT NULL,
    chunk_text TEXT NOT NULL,
    chunk_tokens INTEGER,
    
    -- AI embedding
    embedding VECTOR(1536),  -- OpenAI ada-002 dimensions
    embedding_model VARCHAR(50) DEFAULT 'text-embedding-ada-002',
    
    -- Security - embeddings are encrypted at rest
    embedding_encrypted BYTEA,  -- Encrypted version of embedding
    encryption_key_id VARCHAR(255),
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT unique_document_chunk UNIQUE (document_id, chunk_index)
);

-- Row Level Security for embeddings
ALTER TABLE document_embeddings ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation_embeddings ON document_embeddings
    USING (tenant_id = current_setting('app.current_tenant_id')::uuid);

-- Indexes for embeddings (vector similarity search)
CREATE INDEX idx_embeddings_tenant_id ON document_embeddings(tenant_id);
CREATE INDEX idx_embeddings_document_id ON document_embeddings(document_id);
CREATE INDEX idx_embeddings_vector ON document_embeddings USING ivfflat (embedding vector_cosine_ops);

-- Immutable audit log
CREATE TABLE audit_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    
    -- Event identification
    event_type VARCHAR(50) NOT NULL,  -- create, read, update, delete, login, etc.
    resource_type VARCHAR(50) NOT NULL,  -- user, matter, document, etc.
    resource_id UUID,
    
    -- Actor information
    actor_type VARCHAR(20) NOT NULL CHECK (actor_type IN ('user', 'system', 'ai')),
    actor_id UUID,  -- User ID or system identifier
    actor_email VARCHAR(255),
    actor_ip_address INET,
    
    -- Context
    user_agent TEXT,
    session_id UUID,
    request_id UUID,
    
    -- Event details
    action VARCHAR(100) NOT NULL,  -- specific action taken
    description TEXT,
    
    -- Changes (for update events)
    changes_old JSONB,
    changes_new JSONB,
    
    -- AI context (if AI was involved)
    ai_model VARCHAR(50),
    ai_prompt_hash VARCHAR(64),
    ai_confidence_score DECIMAL(3,2),
    
    -- Result
    result VARCHAR(20) NOT NULL CHECK (result IN ('success', 'failure', 'partial')),
    error_message TEXT,
    
    -- Compliance and legal
    sensitive_data_involved BOOLEAN DEFAULT false,
    retention_date DATE,  -- When this event can be purged
    legal_hold BOOLEAN DEFAULT false,
    
    -- Immutability - these fields cannot be updated
    event_hash VARCHAR(64) NOT NULL,  -- SHA-256 hash of event data
    previous_event_hash VARCHAR(64),  -- Hash chain for tamper detection
    
    -- Timestamp (immutable)
    occurred_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT valid_confidence_score CHECK (ai_confidence_score IS NULL OR (ai_confidence_score >= 0 AND ai_confidence_score <= 1))
);

-- Make audit_events table append-only (no updates/deletes allowed)
CREATE RULE no_audit_update AS ON UPDATE TO audit_events DO INSTEAD NOTHING;
CREATE RULE no_audit_delete AS ON DELETE TO audit_events DO INSTEAD NOTHING;

-- Row Level Security for audit events
ALTER TABLE audit_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation_audit ON audit_events
    USING (tenant_id = current_setting('app.current_tenant_id')::uuid);

-- Indexes for audit events
CREATE INDEX idx_audit_tenant_id ON audit_events(tenant_id);
CREATE INDEX idx_audit_event_type ON audit_events(event_type);
CREATE INDEX idx_audit_resource_type ON audit_events(resource_type);
CREATE INDEX idx_audit_resource_id ON audit_events(resource_id);
CREATE INDEX idx_audit_actor_id ON audit_events(actor_id);
CREATE INDEX idx_audit_occurred_at ON audit_events(occurred_at);
CREATE INDEX idx_audit_legal_hold ON audit_events(legal_hold);

-- Time entries for billing
CREATE TABLE time_entries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    matter_id UUID NOT NULL REFERENCES matters(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Time information
    entry_date DATE NOT NULL DEFAULT CURRENT_DATE,
    start_time TIMESTAMP WITH TIME ZONE,
    end_time TIMESTAMP WITH TIME ZONE,
    duration_minutes INTEGER NOT NULL,
    
    -- Work description
    description TEXT NOT NULL,
    activity_type VARCHAR(50),  -- research, drafting, court, client-comm, etc.
    
    -- Billing
    billable BOOLEAN DEFAULT true,
    hourly_rate DECIMAL(10,2),
    amount DECIMAL(10,2) GENERATED ALWAYS AS (duration_minutes * hourly_rate / 60) STORED,
    
    -- Status
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'approved', 'billed')),
    
    -- Approval workflow
    submitted_at TIMESTAMP WITH TIME ZONE,
    approved_by UUID REFERENCES users(id),
    approved_at TIMESTAMP WITH TIME ZONE,
    
    -- Audit fields
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT valid_duration CHECK (duration_minutes > 0),
    CONSTRAINT valid_time_range CHECK (end_time IS NULL OR end_time > start_time)
);

-- Row Level Security for time entries
ALTER TABLE time_entries ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation_time_entries ON time_entries
    USING (tenant_id = current_setting('app.current_tenant_id')::uuid);

-- Indexes for time entries
CREATE INDEX idx_time_entries_tenant_id ON time_entries(tenant_id);
CREATE INDEX idx_time_entries_matter_id ON time_entries(matter_id);
CREATE INDEX idx_time_entries_user_id ON time_entries(user_id);
CREATE INDEX idx_time_entries_entry_date ON time_entries(entry_date);
CREATE INDEX idx_time_entries_status ON time_entries(status);

-- Sessions table for authentication
CREATE TABLE user_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Session information
    session_token VARCHAR(255) NOT NULL UNIQUE,
    refresh_token VARCHAR(255) UNIQUE,
    device_id VARCHAR(255),
    
    -- Security context
    ip_address INET,
    user_agent TEXT,
    device_fingerprint VARCHAR(255),
    
    -- Device posture (for zero-trust)
    device_trusted BOOLEAN DEFAULT false,
    device_managed BOOLEAN DEFAULT false,
    device_compliance_score DECIMAL(3,2),
    
    -- Session lifecycle
    issued_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    last_accessed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Revocation
    revoked BOOLEAN DEFAULT false,
    revoked_at TIMESTAMP WITH TIME ZONE,
    revoked_reason VARCHAR(100),
    
    CONSTRAINT valid_expiry CHECK (expires_at > issued_at)
);

-- Row Level Security for sessions
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation_sessions ON user_sessions
    USING (tenant_id = current_setting('app.current_tenant_id')::uuid);

-- Indexes for sessions
CREATE INDEX idx_sessions_tenant_id ON user_sessions(tenant_id);
CREATE INDEX idx_sessions_user_id ON user_sessions(user_id);
CREATE INDEX idx_sessions_token ON user_sessions(session_token);
CREATE INDEX idx_sessions_expires_at ON user_sessions(expires_at);
CREATE INDEX idx_sessions_device_id ON user_sessions(device_id);

-- Function to set tenant context
CREATE OR REPLACE FUNCTION set_tenant_context(tenant_uuid UUID)
RETURNS VOID AS $$
BEGIN
    PERFORM set_config('app.current_tenant_id', tenant_uuid::text, true);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to hash event data for audit integrity
CREATE OR REPLACE FUNCTION hash_audit_event()
RETURNS TRIGGER AS $$
DECLARE
    event_data TEXT;
    prev_hash TEXT;
BEGIN
    -- Get the previous event hash for chaining
    SELECT event_hash INTO prev_hash 
    FROM audit_events 
    WHERE tenant_id = NEW.tenant_id 
    ORDER BY occurred_at DESC 
    LIMIT 1;
    
    -- Create hash of event data
    event_data := concat(
        NEW.tenant_id, NEW.event_type, NEW.resource_type, NEW.resource_id,
        NEW.actor_type, NEW.actor_id, NEW.action, NEW.occurred_at,
        COALESCE(prev_hash, '')
    );
    
    NEW.event_hash := encode(digest(event_data, 'sha256'), 'hex');
    NEW.previous_event_hash := prev_hash;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically hash audit events
CREATE TRIGGER trigger_hash_audit_event
    BEFORE INSERT ON audit_events
    FOR EACH ROW EXECUTE FUNCTION hash_audit_event();

-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers to relevant tables
CREATE TRIGGER trigger_tenants_updated_at BEFORE UPDATE ON tenants FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trigger_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trigger_matters_updated_at BEFORE UPDATE ON matters FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trigger_documents_updated_at BEFORE UPDATE ON documents FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trigger_time_entries_updated_at BEFORE UPDATE ON time_entries FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Create initial tenant for development
INSERT INTO tenants (id, slug, name, domain, kms_key_id, settings)
VALUES (
    '00000000-0000-0000-0000-000000000001',
    'demo-firm',
    'Demo Law Firm',
    'demo.lawfly.pro',
    NULL,
    '{"features": ["ai_drafting", "remote_render", "advanced_billing"]}'
);

-- Create system user for automated actions
INSERT INTO users (id, tenant_id, email, first_name, last_name, roles, status)
VALUES (
    '00000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000001',
    'system@lawfly.pro',
    'System',
    'Account',
    ARRAY['system'],
    'active'
);

-- Grant permissions for application role
-- Note: In production, create specific database roles with minimal permissions
GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA public TO lawfly_app;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO lawfly_app;

-- Read-only role for reporting
CREATE ROLE lawfly_readonly;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO lawfly_readonly;

COMMIT;