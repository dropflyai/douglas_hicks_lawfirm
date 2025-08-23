#!/bin/bash

# LawFly Pro Development Environment Setup
# Security-first development environment with tenant isolation

set -e

echo "🔐 Setting up LawFly Pro secure development environment..."

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Check if Docker and Docker Compose are installed
check_prerequisites() {
    print_info "Checking prerequisites..."
    
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed. Please install Docker first."
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose is not installed. Please install Docker Compose first."
        exit 1
    fi
    
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 18+ first."
        exit 1
    fi
    
    # Check Node.js version
    NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 18 ]; then
        print_error "Node.js version 18 or higher is required. Current version: $(node -v)"
        exit 1
    fi
    
    print_status "Prerequisites check passed"
}

# Generate secure environment variables
generate_env_vars() {
    print_info "Generating secure environment variables..."
    
    # Generate secure keys
    JWT_SECRET=$(openssl rand -hex 32)
    ENCRYPTION_KEY=$(openssl rand -hex 32)
    SEARCH_SALT=$(openssl rand -hex 16)
    DB_PASSWORD=$(openssl rand -base64 32 | tr -d "=+/" | cut -c1-25)
    REDIS_PASSWORD=$(openssl rand -base64 32 | tr -d "=+/" | cut -c1-25)
    
    # Create .env file for development
    cat > .env << EOF
# LawFly Pro Development Environment
NODE_ENV=development
LOG_LEVEL=debug

# Server Configuration
PORT=3000
HOST=0.0.0.0

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=lawfly_pro_dev
DB_USER=lawfly_app
DB_PASSWORD=${DB_PASSWORD}
DB_SSL=false
DB_MAX_CONNECTIONS=20

# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=${REDIS_PASSWORD}
REDIS_DB=0
REDIS_KEY_PREFIX=lawfly:dev:

# JWT Configuration
JWT_SECRET=${JWT_SECRET}
JWT_ALGORITHM=HS256
JWT_ACCESS_TOKEN_TTL=900
JWT_REFRESH_TOKEN_TTL=86400
JWT_ISSUER=lawfly-pro-dev
JWT_AUDIENCE=lawfly-pro-api

# Encryption Configuration
ENCRYPTION_KEY=${ENCRYPTION_KEY}
SEARCH_SALT=${SEARCH_SALT}
ENCRYPTION_ALGORITHM=aes-256-gcm

# AWS Configuration (for development)
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_KMS_KEY_ID=
AUDIT_LOGS_BUCKET=lawfly-dev-audit-logs

# Security Configuration
PASSWORD_MIN_LENGTH=12
PASSWORD_REQUIRE_UPPERCASE=true
PASSWORD_REQUIRE_LOWERCASE=true
PASSWORD_REQUIRE_NUMBERS=true
PASSWORD_REQUIRE_SPECIAL=true
PASSWORD_MAX_AGE_DAYS=90

# MFA Configuration
MFA_ISSUER=LawFly Pro Dev
MFA_WINDOW=2
MFA_STEP=30
MFA_BACKUP_CODE_COUNT=10

# Session Configuration
SESSION_TIMEOUT_MINUTES=480
MAX_SESSIONS_PER_USER=5
EXTEND_SESSION_ON_ACTIVITY=true

# Rate Limiting
RATE_LIMIT_MAX=100
RATE_LIMIT_WINDOW=60000
AUTH_RATE_LIMIT_MAX=10
AUTH_RATE_LIMIT_WINDOW=300000

# CORS Configuration
CORS_ORIGINS=http://localhost:3000,http://localhost:3001,http://localhost:8080

# Feature Flags
WEBAUTHN_ENABLED=true
BIOMETRIC_AUTH_ENABLED=false
SSO_AUTO_PROVISION=true
SCIM_ENABLED=true
API_KEY_AUTH_ENABLED=true
ADAPTIVE_AUTH_ENABLED=true
DEVICE_TRUST_ENABLED=true

# Zero Trust Configuration
ZERO_TRUST_DEVICE_REQUIRED=false
ZERO_TRUST_RISK_THRESHOLD=0.7
ZERO_TRUST_CONTINUOUS_MONITORING=true
ZERO_TRUST_ADAPTIVE_AUTH=true

# Development Flags
ENABLE_DEBUG_ROUTES=true
ENABLE_TEST_DATA=true
SKIP_EMAIL_VERIFICATION=true
EOF

    print_status "Environment variables generated and saved to .env"
    print_warning "Please review and update AWS credentials in .env file if needed"
}

# Create Docker Compose configuration
create_docker_compose() {
    print_info "Creating Docker Compose configuration..."
    
    cat > docker-compose.yml << EOF
version: '3.8'

services:
  # PostgreSQL with security hardening
  postgres:
    image: postgres:15-alpine
    container_name: lawfly-postgres-dev
    environment:
      POSTGRES_DB: lawfly_pro_dev
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres_admin_pass
      LAWFLY_DB_USER: lawfly_app
      LAWFLY_DB_PASSWORD: \${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./shared/database/init-dev.sql:/docker-entrypoint-initdb.d/01-init.sql
      - ./shared/database/schema.sql:/docker-entrypoint-initdb.d/02-schema.sql
      - ./shared/database/seed-dev.sql:/docker-entrypoint-initdb.d/03-seed.sql
    ports:
      - "5432:5432"
    command: >
      postgres
      -c log_statement=all
      -c log_min_duration_statement=0
      -c log_connections=on
      -c log_disconnections=on
      -c shared_preload_libraries=pg_stat_statements
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 30s
      timeout: 10s
      retries: 5
    networks:
      - lawfly-network

  # Redis for sessions and caching
  redis:
    image: redis:7-alpine
    container_name: lawfly-redis-dev
    command: >
      redis-server
      --requirepass \${REDIS_PASSWORD}
      --appendonly yes
      --appendfsync everysec
      --maxmemory 512mb
      --maxmemory-policy allkeys-lru
    volumes:
      - redis_data:/data
    ports:
      - "6379:6379"
    healthcheck:
      test: ["CMD", "redis-cli", "--raw", "incr", "ping"]
      interval: 30s
      timeout: 10s
      retries: 5
    networks:
      - lawfly-network

  # LocalStack for AWS services simulation
  localstack:
    image: localstack/localstack:latest
    container_name: lawfly-localstack-dev
    environment:
      SERVICES: s3,kms,iam,sts
      DEBUG: 1
      DATA_DIR: /tmp/localstack/data
      DOCKER_HOST: unix:///var/run/docker.sock
    volumes:
      - localstack_data:/tmp/localstack
      - /var/run/docker.sock:/var/run/docker.sock
    ports:
      - "4566:4566"
      - "4571:4571"
    networks:
      - lawfly-network

  # pgAdmin for database management
  pgadmin:
    image: dpage/pgadmin4:latest
    container_name: lawfly-pgadmin-dev
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@lawfly.dev
      PGADMIN_DEFAULT_PASSWORD: admin123
      PGADMIN_CONFIG_SERVER_MODE: 'False'
    volumes:
      - pgadmin_data:/var/lib/pgadmin
    ports:
      - "5050:80"
    depends_on:
      - postgres
    networks:
      - lawfly-network

  # Redis Commander for Redis management
  redis-commander:
    image: rediscommander/redis-commander:latest
    container_name: lawfly-redis-commander-dev
    environment:
      REDIS_HOSTS: redis:redis:6379:0:\${REDIS_PASSWORD}
    ports:
      - "8081:8081"
    depends_on:
      - redis
    networks:
      - lawfly-network

volumes:
  postgres_data:
    driver: local
  redis_data:
    driver: local
  localstack_data:
    driver: local
  pgadmin_data:
    driver: local

networks:
  lawfly-network:
    driver: bridge
    ipam:
      config:
        - subnet: 172.20.0.0/16
EOF

    print_status "Docker Compose configuration created"
}

# Create database initialization scripts
create_db_scripts() {
    print_info "Creating database initialization scripts..."
    
    mkdir -p shared/database
    
    # Create init script for development user
    cat > shared/database/init-dev.sql << 'EOF'
-- Development database initialization
-- Create application user with limited privileges

-- Create application user
CREATE USER lawfly_app WITH PASSWORD :'LAWFLY_DB_PASSWORD';

-- Create readonly user for reporting
CREATE USER lawfly_readonly WITH PASSWORD 'readonly_dev_pass';

-- Grant connection to database
GRANT CONNECT ON DATABASE lawfly_pro_dev TO lawfly_app;
GRANT CONNECT ON DATABASE lawfly_pro_dev TO lawfly_readonly;

-- Enable required extensions (must be done as superuser)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Note: vector extension would be installed here if needed
-- CREATE EXTENSION IF NOT EXISTS "vector";
EOF

    # Create development seed data
    cat > shared/database/seed-dev.sql << 'EOF'
-- Development seed data

-- Insert development tenant
INSERT INTO tenants (id, slug, name, domain, settings) VALUES
    ('11111111-1111-1111-1111-111111111111', 'dev-firm', 'Development Law Firm', 'dev.lawfly.local', 
     '{"features": ["ai_drafting", "remote_render", "advanced_billing"], "environment": "development"}')
ON CONFLICT (id) DO NOTHING;

-- Insert development users
INSERT INTO users (id, tenant_id, email, email_verified, first_name, last_name, roles, status, password_hash) VALUES
    ('11111111-1111-1111-1111-111111111112', '11111111-1111-1111-1111-111111111111', 'admin@dev.lawfly.local', true, 'Admin', 'User', ARRAY['admin'], 'active', '$2b$10$8K1p/a0dclsgv3OJMXDm5.UrJmnyGZ2g16DyQUEgdZAhFj/w7DwzC'), -- password: admin123
    ('11111111-1111-1111-1111-111111111113', '11111111-1111-1111-1111-111111111111', 'attorney@dev.lawfly.local', true, 'John', 'Doe', ARRAY['attorney'], 'active', '$2b$10$8K1p/a0dclsgv3OJMXDm5.UrJmnyGZ2g16DyQUEgdZAhFj/w7DwzC'), -- password: admin123
    ('11111111-1111-1111-1111-111111111114', '11111111-1111-1111-1111-111111111111', 'paralegal@dev.lawfly.local', true, 'Jane', 'Smith', ARRAY['paralegal'], 'active', '$2b$10$8K1p/a0dclsgv3OJMXDm5.UrJmnyGZ2g16DyQUEgdZAhFj/w7DwzC') -- password: admin123
ON CONFLICT (id) DO NOTHING;

-- Insert sample matter
INSERT INTO matters (id, tenant_id, matter_number, title, practice_area, client_name, responsible_attorney, status) VALUES
    ('11111111-1111-1111-1111-111111111115', '11111111-1111-1111-1111-111111111111', 'DEV-001', 'Sample Contract Review', 'corporate', 'Acme Corporation', '11111111-1111-1111-1111-111111111113', 'active')
ON CONFLICT (id) DO NOTHING;

-- Grant permissions to application user (after tables are created)
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO lawfly_app;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO lawfly_app;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO lawfly_app;

-- Grant read-only permissions to readonly user
GRANT SELECT ON ALL TABLES IN SCHEMA public TO lawfly_readonly;
EOF

    print_status "Database initialization scripts created"
}

# Install dependencies for all services
install_dependencies() {
    print_info "Installing dependencies..."
    
    # Install root dependencies if package.json exists
    if [ -f "package.json" ]; then
        npm install
    fi
    
    # Install auth service dependencies
    if [ -d "services/auth-service" ]; then
        print_info "Installing auth service dependencies..."
        cd services/auth-service
        npm install
        cd ../..
    fi
    
    # Install other service dependencies (add as needed)
    
    print_status "Dependencies installed"
}

# Start development environment
start_environment() {
    print_info "Starting development environment..."
    
    # Start database and supporting services
    docker-compose up -d postgres redis localstack
    
    # Wait for services to be healthy
    print_info "Waiting for services to start..."
    sleep 10
    
    # Check if services are healthy
    if ! docker-compose ps | grep -q "postgres.*healthy"; then
        print_warning "PostgreSQL may not be fully ready yet. Waiting longer..."
        sleep 20
    fi
    
    if ! docker-compose ps | grep -q "redis.*healthy"; then
        print_warning "Redis may not be fully ready yet. Waiting longer..."
        sleep 10
    fi
    
    print_status "Core services started successfully"
    
    # Optionally start management tools
    read -p "Start pgAdmin and Redis Commander? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        docker-compose up -d pgadmin redis-commander
        print_status "Management tools started"
        print_info "pgAdmin available at: http://localhost:5050 (admin@lawfly.dev / admin123)"
        print_info "Redis Commander available at: http://localhost:8081"
    fi
}

# Setup LocalStack AWS services
setup_localstack() {
    print_info "Setting up LocalStack AWS services..."
    
    # Wait for LocalStack to be ready
    sleep 5
    
    # Create S3 buckets
    aws --endpoint-url=http://localhost:4566 s3 mb s3://lawfly-dev-audit-logs --region us-east-1 || true
    aws --endpoint-url=http://localhost:4566 s3 mb s3://lawfly-dev-documents --region us-east-1 || true
    
    # Create KMS key for development
    KMS_KEY=$(aws --endpoint-url=http://localhost:4566 kms create-key --region us-east-1 --description "LawFly Pro Dev Key" --query 'KeyMetadata.KeyId' --output text 2>/dev/null || echo "")
    
    if [ -n "$KMS_KEY" ]; then
        print_status "LocalStack KMS key created: $KMS_KEY"
        # Update .env with the key ID
        sed -i.bak "s/AWS_KMS_KEY_ID=/AWS_KMS_KEY_ID=$KMS_KEY/" .env
    else
        print_warning "Could not create LocalStack KMS key - AWS CLI may not be available"
    fi
    
    print_status "LocalStack setup complete"
}

# Display connection information
show_connection_info() {
    print_info "Development environment is ready!"
    echo
    echo "🔗 Connection Information:"
    echo "  PostgreSQL: localhost:5432"
    echo "  Database: lawfly_pro_dev"
    echo "  Username: lawfly_app"
    echo "  Redis: localhost:6379"
    echo "  LocalStack: localhost:4566"
    echo
    echo "👤 Test Users:"
    echo "  Admin: admin@dev.lawfly.local / admin123"
    echo "  Attorney: attorney@dev.lawfly.local / admin123"  
    echo "  Paralegal: paralegal@dev.lawfly.local / admin123"
    echo
    echo "🛠️  Management Tools:"
    echo "  pgAdmin: http://localhost:5050"
    echo "  Redis Commander: http://localhost:8081"
    echo
    echo "🔐 Security:"
    echo "  All passwords are for development only"
    echo "  Environment variables saved to .env"
    echo "  Review .env file before proceeding"
    echo
    echo "🚀 Next Steps:"
    echo "  1. Review and update .env file"
    echo "  2. Run 'npm run dev' in services/auth-service"
    echo "  3. Test authentication endpoints"
    echo "  4. Begin frontend development"
    echo
}

# Cleanup function
cleanup() {
    print_info "Cleaning up on exit..."
    # Add any cleanup tasks here
}

# Trap cleanup on script exit
trap cleanup EXIT

# Main execution
main() {
    echo "🔐 LawFly Pro - Security-First Legal Platform"
    echo "=============================================="
    echo
    
    check_prerequisites
    generate_env_vars
    create_docker_compose
    create_db_scripts
    install_dependencies
    start_environment
    setup_localstack
    show_connection_info
    
    print_status "Development environment setup complete!"
}

# Run main function
main "$@"