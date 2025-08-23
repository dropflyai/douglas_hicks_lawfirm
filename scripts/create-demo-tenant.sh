#!/bin/bash

# LawFly Pro Demo Tenant Creation Script
# Creates a pre-configured demo tenant for security-focused sales demonstrations

set -e

# Color codes
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

print_header() {
    echo -e "${PURPLE}═══════════════════════════════════════════════════════${NC}"
    echo -e "${PURPLE}  $1${NC}"
    echo -e "${PURPLE}═══════════════════════════════════════════════════════${NC}"
    echo
}

print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Demo tenant configuration
DEMO_TENANT_ID="demo-$(date +%s)"
DEMO_FIRM_NAME="BigLaw Demo Corporation"
DEMO_ADMIN_EMAIL="admin@biglawdemo.com"
DEMO_PASSWORD="SecureDemo123!"
DEMO_DOMAIN="biglawdemo.lawfly.dev"

create_demo_tenant() {
    print_header "Creating Security Demo Tenant"
    
    print_info "Creating demo tenant: $DEMO_FIRM_NAME"
    echo "Tenant ID: $DEMO_TENANT_ID"
    echo "Domain: $DEMO_DOMAIN"
    echo "Demo Admin: $DEMO_ADMIN_EMAIL"
    echo
    
    # Create demo-specific KMS key
    print_info "Creating customer-controlled KMS key for BYOK demo..."
    
    aws kms create-key \
        --description "LawFly Pro Demo - BigLaw Corp BYOK Key" \
        --key-usage ENCRYPT_DECRYPT \
        --key-spec SYMMETRIC_DEFAULT \
        --policy '{
            "Version": "2012-10-17",
            "Statement": [
                {
                    "Sid": "Enable IAM policies",
                    "Effect": "Allow",
                    "Principal": {
                        "AWS": "arn:aws:iam::'$(aws sts get-caller-identity --query Account --output text)':root"
                    },
                    "Action": "kms:*",
                    "Resource": "*"
                },
                {
                    "Sid": "Allow LawFly Pro service access",
                    "Effect": "Allow",
                    "Principal": {
                        "AWS": "arn:aws:iam::'$(aws sts get-caller-identity --query Account --output text)':role/lawfly-pro-service-role"
                    },
                    "Action": [
                        "kms:Decrypt",
                        "kms:DescribeKey",
                        "kms:Encrypt",
                        "kms:GenerateDataKey",
                        "kms:GenerateDataKeyWithoutPlaintext",
                        "kms:ReEncrypt*"
                    ],
                    "Resource": "*"
                }
            ]
        }' \
        --tags TagKey=Purpose,TagValue=LawFlyPro-Demo \
               TagKey=Customer,TagValue=BigLaw-Demo \
               TagKey=Environment,TagValue=demo > demo_kms_key.json

    DEMO_KMS_KEY_ARN=$(jq -r '.KeyMetadata.Arn' demo_kms_key.json)
    DEMO_KMS_KEY_ID=$(jq -r '.KeyMetadata.KeyId' demo_kms_key.json)
    
    print_status "Created demo KMS key: $DEMO_KMS_KEY_ARN"
    
    # Create alias for easy identification
    aws kms create-alias \
        --alias-name "alias/lawfly-pro-demo-biglaw" \
        --target-key-id "$DEMO_KMS_KEY_ID"
    
    print_status "Created KMS alias: alias/lawfly-pro-demo-biglaw"
}

setup_demo_database() {
    print_header "Setting Up Demo Database with Sample Data"
    
    # Create tenant in database
    PGPASSWORD="$DB_PASSWORD" psql -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" << EOF
-- Create demo tenant
INSERT INTO tenants (
    id, 
    name, 
    domain, 
    subscription_tier, 
    kms_key_arn,
    security_settings,
    created_at
) VALUES (
    '$DEMO_TENANT_ID',
    '$DEMO_FIRM_NAME',
    '$DEMO_DOMAIN',
    'professional',
    '$DEMO_KMS_KEY_ARN',
    '{
        "byok_enabled": true,
        "zero_trust_mode": true,
        "audit_retention_years": 7,
        "require_mfa": true,
        "allowed_ip_ranges": ["0.0.0.0/0"],
        "session_timeout_minutes": 30,
        "password_policy": {
            "min_length": 12,
            "require_symbols": true,
            "require_numbers": true,
            "require_uppercase": true
        }
    }'::jsonb,
    NOW()
);

-- Create demo admin user
INSERT INTO users (
    id,
    tenant_id,
    email,
    password_hash,
    full_name,
    role,
    mfa_enabled,
    security_clearance,
    created_at
) VALUES (
    gen_random_uuid(),
    '$DEMO_TENANT_ID',
    '$DEMO_ADMIN_EMAIL',
    crypt('$DEMO_PASSWORD', gen_salt('bf')),
    'Demo Administrator',
    'admin',
    true,
    'confidential',
    NOW()
);

-- Create sample attorneys
INSERT INTO users (tenant_id, email, password_hash, full_name, role, security_clearance) VALUES
('$DEMO_TENANT_ID', 'john.attorney@biglawdemo.com', crypt('Demo123!', gen_salt('bf')), 'John Attorney', 'attorney', 'confidential'),
('$DEMO_TENANT_ID', 'jane.partner@biglawdemo.com', crypt('Demo123!', gen_salt('bf')), 'Jane Partner', 'partner', 'top_secret'),
('$DEMO_TENANT_ID', 'bob.paralegal@biglawdemo.com', crypt('Demo123!', gen_salt('bf')), 'Bob Paralegal', 'paralegal', 'restricted');

-- Create sample clients
INSERT INTO clients (tenant_id, name, type, contact_email, security_classification) VALUES
('$DEMO_TENANT_ID', 'Fortune 500 Tech Corp', 'corporate', 'legal@fortune500tech.com', 'top_secret'),
('$DEMO_TENANT_ID', 'Healthcare Startup Inc', 'corporate', 'legal@healthstartup.com', 'confidential'),
('$DEMO_TENANT_ID', 'John Smith (Personal)', 'individual', 'jsmith@email.com', 'restricted');

-- Create sample cases with different security levels
INSERT INTO cases (tenant_id, client_id, title, case_type, status, security_classification, assigned_attorney) VALUES
('$DEMO_TENANT_ID', (SELECT id FROM clients WHERE name = 'Fortune 500 Tech Corp' AND tenant_id = '$DEMO_TENANT_ID'), 'IP Patent Dispute', 'intellectual_property', 'active', 'top_secret', (SELECT id FROM users WHERE email = 'jane.partner@biglawdemo.com')),
('$DEMO_TENANT_ID', (SELECT id FROM clients WHERE name = 'Healthcare Startup Inc' AND tenant_id = '$DEMO_TENANT_ID'), 'HIPAA Compliance Review', 'regulatory', 'active', 'confidential', (SELECT id FROM users WHERE email = 'john.attorney@biglawdemo.com')),
('$DEMO_TENANT_ID', (SELECT id FROM clients WHERE name = 'John Smith (Personal)' AND tenant_id = '$DEMO_TENANT_ID'), 'Personal Injury Settlement', 'personal_injury', 'active', 'restricted', (SELECT id FROM users WHERE email = 'bob.paralegal@biglawdemo.com'));

-- Create sample documents with encryption metadata
INSERT INTO documents (tenant_id, case_id, title, file_path, security_classification, encryption_metadata) VALUES
('$DEMO_TENANT_ID', (SELECT id FROM cases WHERE title = 'IP Patent Dispute' AND tenant_id = '$DEMO_TENANT_ID'), 'Confidential Settlement Agreement', '/secure/docs/settlement_agreement.pdf', 'top_secret', '{"kms_key_id": "$DEMO_KMS_KEY_ID", "encrypted": true, "algorithm": "AES-256-GCM"}'),
('$DEMO_TENANT_ID', (SELECT id FROM cases WHERE title = 'HIPAA Compliance Review' AND tenant_id = '$DEMO_TENANT_ID'), 'PHI Data Analysis Report', '/secure/docs/phi_analysis.docx', 'confidential', '{"kms_key_id": "$DEMO_KMS_KEY_ID", "encrypted": true, "algorithm": "AES-256-GCM"}'),
('$DEMO_TENANT_ID', (SELECT id FROM cases WHERE title = 'Personal Injury Settlement' AND tenant_id = '$DEMO_TENANT_ID'), 'Medical Records Summary', '/secure/docs/medical_summary.pdf', 'restricted', '{"kms_key_id": "$DEMO_KMS_KEY_ID", "encrypted": true, "algorithm": "AES-256-GCM"}');

-- Log tenant creation in audit trail
INSERT INTO audit_events (
    id,
    tenant_id,
    event_type,
    user_id,
    resource_type,
    resource_id,
    action,
    details,
    security_classification,
    created_at,
    previous_event_hash
) VALUES (
    gen_random_uuid(),
    '$DEMO_TENANT_ID',
    'tenant_created',
    (SELECT id FROM users WHERE email = '$DEMO_ADMIN_EMAIL' AND tenant_id = '$DEMO_TENANT_ID'),
    'tenant',
    '$DEMO_TENANT_ID',
    'create',
    '{"tenant_name": "$DEMO_FIRM_NAME", "subscription_tier": "professional", "byok_enabled": true}',
    'confidential',
    NOW(),
    NULL
);

EOF

    print_status "Demo database setup completed with sample data"
}

create_demo_scenarios() {
    print_header "Creating Demo Scenarios for Security Features"
    
    mkdir -p /tmp/demo-scenarios
    
    # Scenario 1: Zero-Trust Demo
    cat > /tmp/demo-scenarios/zero-trust-demo.json << 'EOF'
{
  "scenario": "zero_trust_authentication",
  "title": "Zero-Trust Authentication Demo",
  "description": "Demonstrates adaptive authentication based on risk scoring",
  "demo_users": [
    {
      "email": "john.attorney@biglawdemo.com",
      "name": "John Attorney",
      "normal_location": "New York Office",
      "managed_device": true,
      "typical_risk_score": 0.1
    },
    {
      "email": "bob.paralegal@biglawdemo.com", 
      "name": "Bob Paralegal",
      "risky_scenario": {
        "location": "Coffee Shop WiFi",
        "device": "Personal Phone",
        "unusual_time": "3:00 AM",
        "risk_score": 0.9
      }
    }
  ],
  "demo_flow": [
    "1. Show normal login from office - standard authentication",
    "2. Show risky login attempt - require MFA + limited session",
    "3. Demonstrate real-time risk assessment dashboard",
    "4. Show automatic session termination on policy violation"
  ]
}
EOF

    # Scenario 2: BYOK Encryption Demo
    cat > /tmp/demo-scenarios/byok-encryption-demo.json << 'EOF'
{
  "scenario": "byok_encryption",
  "title": "Customer-Controlled Encryption Demo", 
  "description": "Shows how customers control their own encryption keys",
  "kms_key_arn": "'"$DEMO_KMS_KEY_ARN"'",
  "demo_documents": [
    {
      "title": "Confidential Settlement Agreement",
      "classification": "top_secret",
      "shows": "Customer can revoke access by disabling KMS key"
    },
    {
      "title": "Attorney-Client Privileged Communication",
      "classification": "confidential", 
      "shows": "LawFly Pro cannot decrypt without customer permission"
    }
  ],
  "demo_flow": [
    "1. Show document upload with automatic encryption",
    "2. Display KMS key ownership in customer AWS account",
    "3. Demonstrate key rotation with zero downtime",
    "4. Show what happens when customer revokes key access"
  ]
}
EOF

    # Scenario 3: Audit Trail Demo
    cat > /tmp/demo-scenarios/audit-trail-demo.json << 'EOF'
{
  "scenario": "immutable_audit_trail",
  "title": "Tamper-Proof Audit Trail Demo",
  "description": "Demonstrates hash-chained audit events for legal compliance",
  "sample_events": [
    {
      "event_type": "document_accessed",
      "user": "john.attorney@biglawdemo.com",
      "document": "Confidential Settlement Agreement",
      "timestamp": "2024-01-15T14:30:00Z",
      "hash_verification": "verified"
    },
    {
      "event_type": "document_modified",
      "user": "jane.partner@biglawdemo.com", 
      "document": "Settlement Agreement",
      "changes": "Added signature page",
      "timestamp": "2024-01-15T15:45:00Z",
      "hash_verification": "verified"
    }
  ],
  "demo_flow": [
    "1. Show real-time audit event creation",
    "2. Demonstrate hash chain integrity verification",
    "3. Display S3 WORM backup with Object Lock",
    "4. Show compliance report generation"
  ]
}
EOF

    # Scenario 4: Tenant Isolation Demo
    cat > /tmp/demo-scenarios/tenant-isolation-demo.json << 'EOF'
{
  "scenario": "tenant_isolation",
  "title": "Provable Multi-Tenant Isolation Demo",
  "description": "Shows cryptographic proof that tenant data is completely isolated",
  "tenants": [
    {
      "name": "BigLaw Demo Corporation",
      "tenant_id": "'"$DEMO_TENANT_ID"'",
      "kms_key": "'"$DEMO_KMS_KEY_ARN"'",
      "isolation_level": "namespace + encryption"
    },
    {
      "name": "Competing Law Firm",
      "tenant_id": "competitor-firm-123",
      "kms_key": "different-customer-key",
      "isolation_level": "VPC + namespace + encryption"
    }
  ],
  "demo_flow": [
    "1. Show database RLS preventing cross-tenant queries",
    "2. Demonstrate separate encryption keys per tenant",
    "3. Show network isolation in enterprise tier",
    "4. Display automated cross-tenant leakage testing results"
  ]
}
EOF

    print_status "Created demo scenarios for security features"
}

generate_demo_credentials() {
    print_header "Generating Demo Access Credentials"
    
    cat > /tmp/demo-tenant-credentials.md << EOF
# LawFly Pro Security Demo - Access Credentials

**Generated:** $(date)
**Demo Environment:** https://$DEMO_DOMAIN

## Demo Tenant Information
- **Firm Name:** $DEMO_FIRM_NAME
- **Tenant ID:** $DEMO_TENANT_ID
- **Domain:** $DEMO_DOMAIN
- **Subscription Tier:** Professional (BYOK Enabled)

## Customer-Controlled Encryption
- **KMS Key ARN:** $DEMO_KMS_KEY_ARN
- **KMS Key Alias:** alias/lawfly-pro-demo-biglaw
- **Encryption:** AES-256-GCM with customer-controlled keys
- **Key Rotation:** Enabled (90-day cycle)

## Demo User Accounts

### Administrator Access
- **Email:** $DEMO_ADMIN_EMAIL
- **Password:** $DEMO_PASSWORD
- **Role:** Admin
- **MFA:** Required
- **Security Clearance:** Confidential

### Sample Attorney Accounts
- **john.attorney@biglawdemo.com** / Demo123! (Attorney, Confidential)
- **jane.partner@biglawdemo.com** / Demo123! (Partner, Top Secret)
- **bob.paralegal@biglawdemo.com** / Demo123! (Paralegal, Restricted)

## Demo Scenarios Available

### 🔍 Zero-Trust Authentication
- Login with different risk profiles
- Adaptive MFA requirements
- Real-time risk assessment
- Session management controls

### 🔑 Customer-Controlled Encryption (BYOK)
- Document encryption with customer KMS keys
- Key ownership verification
- Key rotation demonstration
- Access revocation scenarios

### 🔒 Immutable Audit Trail
- Hash-chained event logging
- Tamper-proof verification
- S3 WORM backup demonstration
- Legal hold capabilities

### 🏢 Multi-Tenant Isolation  
- Database row-level security
- Cryptographic tenant separation
- Cross-tenant leakage testing
- VPC isolation (enterprise tier)

## Sample Data Loaded
- 3 Clients (Fortune 500 Tech Corp, Healthcare Startup, Individual)
- 3 Cases (IP Patent, HIPAA Compliance, Personal Injury)
- 3 Encrypted Documents (Settlement, PHI Analysis, Medical Records)
- Complete audit trail with hash verification

## Security Features Demonstrated
- ✅ BYOK encryption with AWS KMS
- ✅ Zero-trust continuous verification
- ✅ Immutable audit logging
- ✅ Multi-tenant isolation
- ✅ Field-level encryption
- ✅ Role-based access control
- ✅ Real-time compliance monitoring
- ✅ Secure document handling

## Demo Script Location
- Interactive demo: \`./scripts/security-demo.sh\`
- Scenario files: \`/tmp/demo-scenarios/\`

---
**Ready to showcase the most secure legal platform ever built! 🛡️**

For technical questions: security@lawfly.pro
EOF

    print_status "Generated demo credentials and documentation"
}

setup_monitoring_dashboard() {
    print_header "Setting Up Demo Monitoring Dashboard"
    
    print_info "Creating Grafana dashboard for security metrics..."
    
    cat > /tmp/demo-security-dashboard.json << 'EOF'
{
  "dashboard": {
    "title": "LawFly Pro Security Demo - Real-time Monitoring",
    "panels": [
      {
        "title": "Zero-Trust Risk Scores",
        "type": "stat",
        "targets": [
          {
            "expr": "avg(lawfly_risk_score) by (user_email)",
            "legendFormat": "{{user_email}} Risk Score"
          }
        ]
      },
      {
        "title": "BYOK Key Usage",
        "type": "graph", 
        "targets": [
          {
            "expr": "rate(lawfly_encryption_operations_total[5m])",
            "legendFormat": "Encryption Operations/sec"
          }
        ]
      },
      {
        "title": "Audit Events (Hash-Chained)",
        "type": "table",
        "targets": [
          {
            "expr": "increase(lawfly_audit_events_total[1h])",
            "legendFormat": "Events/Hour"
          }
        ]
      },
      {
        "title": "Tenant Isolation Health",
        "type": "singlestat",
        "targets": [
          {
            "expr": "lawfly_tenant_isolation_test_pass_rate",
            "legendFormat": "Isolation Test Pass Rate"
          }
        ]
      }
    ]
  }
}
EOF

    print_status "Security monitoring dashboard configuration created"
}

main() {
    echo -e "${PURPLE}"
    cat << "EOF"
╔═══════════════════════════════════════════════════════════╗
║               LawFly Pro Demo Tenant Setup                ║
║                                                           ║
║    🎯 Security-First Demo Environment                     ║
║    🔐 Customer-Controlled Encryption                      ║
║    🛡️  Zero-Trust Architecture                            ║
║    🔒 Immutable Audit Trail                              ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
EOF
    echo -e "${NC}"
    
    echo
    print_info "Creating security-focused demo tenant for sales demonstrations..."
    echo
    
    # Check prerequisites
    if ! command -v aws &> /dev/null; then
        echo "❌ AWS CLI required but not installed"
        exit 1
    fi
    
    if ! command -v psql &> /dev/null; then
        echo "❌ PostgreSQL client required but not installed" 
        exit 1
    fi
    
    create_demo_tenant
    setup_demo_database
    create_demo_scenarios
    generate_demo_credentials
    setup_monitoring_dashboard
    
    echo
    print_status "🎉 Demo tenant created successfully!"
    echo
    echo -e "${GREEN}Your security-first demo environment is ready for prospect demonstrations.${NC}"
    echo -e "${GREEN}Review /tmp/demo-tenant-credentials.md for access details.${NC}"
    echo
    echo -e "${CYAN}Demo Features Ready:${NC}"
    echo "  🔍 Zero-Trust Authentication with Risk Scoring"
    echo "  🔑 Customer-Controlled Encryption (BYOK) with AWS KMS"
    echo "  🔒 Tamper-Proof Audit Trail with Hash Verification"
    echo "  🏢 Cryptographically Provable Multi-Tenant Isolation"
    echo
    echo -e "${YELLOW}Next Steps:${NC}"
    echo "  1. Run './scripts/security-demo.sh' for interactive demonstration"
    echo "  2. Access demo environment at https://$DEMO_DOMAIN"
    echo "  3. Login as $DEMO_ADMIN_EMAIL with provided credentials"
    echo "  4. Showcase security differentiators to prospects"
    echo
    echo -e "${BLUE}Ready to win deals with superior security! 🏆${NC}"
}

# Run demo tenant creation
main "$@"