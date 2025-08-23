# LawFly Pro - Secure Infrastructure Foundation
# Security-first Terraform configuration for legal tech platform

terraform {
  required_version = ">= 1.5"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.23"
    }
  }
}

# Local variables for environment configuration
locals {
  environment = var.environment
  project     = "lawfly-pro"
  
  # Security-focused tagging strategy
  common_tags = {
    Project          = local.project
    Environment      = local.environment
    SecurityLevel    = "confidential"
    ComplianceScope  = "SOC2-HIPAA-GDPR"
    DataClassification = "legal-confidential"
    ManagedBy       = "terraform"
    CostCenter      = "legal-ops"
    BackupRequired  = "true"
    AuditRequired   = "true"
  }
}

# Data sources for existing AWS resources
data "aws_caller_identity" "current" {}
data "aws_region" "current" {}

# KMS Key for tenant-specific encryption (BYOK support)
resource "aws_kms_key" "tenant_encryption" {
  description = "LawFly Pro tenant encryption key"
  
  key_usage               = "ENCRYPT_DECRYPT"
  customer_master_key_spec = "SYMMETRIC_DEFAULT"
  
  # Enable key rotation for compliance
  enable_key_rotation = true
  
  # Deletion protection for production
  deletion_window_in_days = var.environment == "prod" ? 30 : 7
  
  # Security policy for key access
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "EnableIAMUserPermissions"
        Effect = "Allow"
        Principal = {
          AWS = "arn:aws:iam::${data.aws_caller_identity.current.account_id}:root"
        }
        Action   = "kms:*"
        Resource = "*"
      },
      {
        Sid    = "AllowLawFlyProServices"
        Effect = "Allow"
        Principal = {
          AWS = [
            aws_iam_role.lawfly_app_role.arn,
            aws_iam_role.lawfly_audit_role.arn
          ]
        }
        Action = [
          "kms:Encrypt",
          "kms:Decrypt", 
          "kms:ReEncrypt*",
          "kms:GenerateDataKey*",
          "kms:DescribeKey"
        ]
        Resource = "*"
      }
    ]
  })
  
  tags = merge(local.common_tags, {
    Name = "${local.project}-${local.environment}-tenant-key"
    Purpose = "tenant-data-encryption"
  })
}

# KMS Key Alias for easier reference
resource "aws_kms_alias" "tenant_encryption" {
  name          = "alias/${local.project}-${local.environment}-tenant-key"
  target_key_id = aws_kms_key.tenant_encryption.key_id
}

# S3 Bucket for audit logs (immutable, WORM)
resource "aws_s3_bucket" "audit_logs" {
  bucket        = "${local.project}-${local.environment}-audit-logs-${random_id.bucket_suffix.hex}"
  force_destroy = var.environment != "prod"
  
  tags = merge(local.common_tags, {
    Name = "${local.project}-${local.environment}-audit-logs"
    Purpose = "immutable-audit-storage"
    RetentionYears = "7"
  })
}

# Generate random suffix for S3 bucket uniqueness
resource "random_id" "bucket_suffix" {
  byte_length = 4
}

# S3 Bucket versioning (required for object lock)
resource "aws_s3_bucket_versioning" "audit_logs" {
  bucket = aws_s3_bucket.audit_logs.id
  versioning_configuration {
    status = "Enabled"
  }
}

# S3 Bucket encryption
resource "aws_s3_bucket_server_side_encryption_configuration" "audit_logs" {
  bucket = aws_s3_bucket.audit_logs.id

  rule {
    apply_server_side_encryption_by_default {
      kms_master_key_id = aws_kms_key.tenant_encryption.arn
      sse_algorithm     = "aws:kms"
    }
    bucket_key_enabled = true
  }
}

# S3 Object Lock for immutable audit trail
resource "aws_s3_bucket_object_lock_configuration" "audit_logs" {
  bucket = aws_s3_bucket.audit_logs.id
  
  rule {
    default_retention {
      mode  = "COMPLIANCE"
      years = 7  # Legal requirement for document retention
    }
  }
  
  # Enable object lock for WORM compliance
  object_lock_enabled = "Enabled"
}

# S3 Bucket public access blocking (security hardening)
resource "aws_s3_bucket_public_access_block" "audit_logs" {
  bucket = aws_s3_bucket.audit_logs.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# S3 Bucket for document storage (tenant-isolated)
resource "aws_s3_bucket" "documents" {
  bucket        = "${local.project}-${local.environment}-documents-${random_id.bucket_suffix.hex}"
  force_destroy = var.environment != "prod"
  
  tags = merge(local.common_tags, {
    Name = "${local.project}-${local.environment}-documents"
    Purpose = "tenant-document-storage"
    ContainsPII = "true"
    RetentionYears = "7"
  })
}

# Document bucket versioning
resource "aws_s3_bucket_versioning" "documents" {
  bucket = aws_s3_bucket.documents.id
  versioning_configuration {
    status = "Enabled"
  }
}

# Document bucket encryption
resource "aws_s3_bucket_server_side_encryption_configuration" "documents" {
  bucket = aws_s3_bucket.documents.id

  rule {
    apply_server_side_encryption_by_default {
      kms_master_key_id = aws_kms_key.tenant_encryption.arn
      sse_algorithm     = "aws:kms"
    }
    bucket_key_enabled = true
  }
}

# Document bucket public access blocking
resource "aws_s3_bucket_public_access_block" "documents" {
  bucket = aws_s3_bucket.documents.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# IAM Role for LawFly Pro application services
resource "aws_iam_role" "lawfly_app_role" {
  name = "${local.project}-${local.environment}-app-role"
  
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = [
            "ec2.amazonaws.com",
            "eks.amazonaws.com"
          ]
        }
      }
    ]
  })
  
  tags = local.common_tags
}

# IAM Role for audit service (elevated permissions)
resource "aws_iam_role" "lawfly_audit_role" {
  name = "${local.project}-${local.environment}-audit-role"
  
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = [
            "ec2.amazonaws.com",
            "eks.amazonaws.com"
          ]
        }
      }
    ]
  })
  
  tags = local.common_tags
}

# IAM Policy for S3 access (tenant-scoped)
resource "aws_iam_policy" "s3_access" {
  name = "${local.project}-${local.environment}-s3-access"
  
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "s3:GetObject",
          "s3:PutObject", 
          "s3:DeleteObject",
          "s3:ListBucket"
        ]
        Resource = [
          aws_s3_bucket.documents.arn,
          "${aws_s3_bucket.documents.arn}/*",
          aws_s3_bucket.audit_logs.arn,
          "${aws_s3_bucket.audit_logs.arn}/*"
        ]
        Condition = {
          StringEquals = {
            "s3:x-amz-server-side-encryption" = "aws:kms"
          }
        }
      }
    ]
  })
  
  tags = local.common_tags
}

# Attach S3 policy to app role
resource "aws_iam_role_policy_attachment" "app_s3_access" {
  role       = aws_iam_role.lawfly_app_role.name
  policy_arn = aws_iam_policy.s3_access.arn
}

# VPC for secure networking
resource "aws_vpc" "main" {
  cidr_block           = var.vpc_cidr
  enable_dns_hostnames = true
  enable_dns_support   = true
  
  tags = merge(local.common_tags, {
    Name = "${local.project}-${local.environment}-vpc"
  })
}

# Private subnets for application services
resource "aws_subnet" "private" {
  count = length(var.private_subnet_cidrs)
  
  vpc_id            = aws_vpc.main.id
  cidr_block        = var.private_subnet_cidrs[count.index]
  availability_zone = data.aws_availability_zones.available.names[count.index]
  
  tags = merge(local.common_tags, {
    Name = "${local.project}-${local.environment}-private-${count.index + 1}"
    Tier = "private"
  })
}

# Public subnets for load balancers
resource "aws_subnet" "public" {
  count = length(var.public_subnet_cidrs)
  
  vpc_id                  = aws_vpc.main.id
  cidr_block              = var.public_subnet_cidrs[count.index]
  availability_zone       = data.aws_availability_zones.available.names[count.index]
  map_public_ip_on_launch = true
  
  tags = merge(local.common_tags, {
    Name = "${local.project}-${local.environment}-public-${count.index + 1}"
    Tier = "public"
  })
}

# Internet Gateway
resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id
  
  tags = merge(local.common_tags, {
    Name = "${local.project}-${local.environment}-igw"
  })
}

# Data source for availability zones
data "aws_availability_zones" "available" {
  state = "available"
}

# Outputs for other modules
output "vpc_id" {
  value = aws_vpc.main.id
  description = "VPC ID for LawFly Pro"
}

output "private_subnet_ids" {
  value = aws_subnet.private[*].id
  description = "Private subnet IDs"
}

output "public_subnet_ids" {
  value = aws_subnet.public[*].id
  description = "Public subnet IDs"
}

output "tenant_kms_key_id" {
  value = aws_kms_key.tenant_encryption.key_id
  description = "KMS key ID for tenant encryption"
}

output "tenant_kms_key_arn" {
  value = aws_kms_key.tenant_encryption.arn
  description = "KMS key ARN for tenant encryption"
}

output "audit_logs_bucket" {
  value = aws_s3_bucket.audit_logs.bucket
  description = "S3 bucket for audit logs"
}

output "documents_bucket" {
  value = aws_s3_bucket.documents.bucket
  description = "S3 bucket for documents"
}