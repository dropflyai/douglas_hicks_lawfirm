# Variables for LawFly Pro Infrastructure

variable "environment" {
  description = "Environment name (dev, staging, prod)"
  type        = string
  default     = "dev"
  
  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "Environment must be one of: dev, staging, prod"
  }
}

variable "aws_region" {
  description = "AWS region for resources"
  type        = string
  default     = "us-east-1"
}

variable "vpc_cidr" {
  description = "CIDR block for VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "private_subnet_cidrs" {
  description = "CIDR blocks for private subnets"
  type        = list(string)
  default     = [
    "10.0.1.0/24",
    "10.0.2.0/24", 
    "10.0.3.0/24"
  ]
}

variable "public_subnet_cidrs" {
  description = "CIDR blocks for public subnets"
  type        = list(string)
  default     = [
    "10.0.101.0/24",
    "10.0.102.0/24",
    "10.0.103.0/24"
  ]
}

variable "enable_nat_gateway" {
  description = "Enable NAT Gateway for private subnets"
  type        = bool
  default     = true
}

variable "enable_vpn_gateway" {
  description = "Enable VPN Gateway for hybrid connectivity"
  type        = bool
  default     = false
}

variable "postgres_instance_class" {
  description = "RDS PostgreSQL instance class"
  type        = string
  default     = "db.r6g.large"
}

variable "postgres_allocated_storage" {
  description = "RDS PostgreSQL allocated storage (GB)"
  type        = number
  default     = 100
}

variable "postgres_backup_retention_period" {
  description = "PostgreSQL backup retention period (days)"
  type        = number
  default     = 7
}

variable "redis_node_type" {
  description = "ElastiCache Redis node type"
  type        = string
  default     = "cache.r7g.large"
}

variable "eks_cluster_version" {
  description = "EKS cluster Kubernetes version"
  type        = string
  default     = "1.28"
}

variable "eks_node_group_instance_types" {
  description = "EKS node group instance types"
  type        = list(string)
  default     = ["m6i.large", "m6i.xlarge"]
}

variable "eks_node_group_capacity" {
  description = "EKS node group capacity"
  type = object({
    desired_size = number
    max_size     = number
    min_size     = number
  })
  default = {
    desired_size = 3
    max_size     = 10
    min_size     = 1
  }
}

variable "enable_container_insights" {
  description = "Enable CloudWatch Container Insights"
  type        = bool
  default     = true
}

variable "enable_waf" {
  description = "Enable AWS WAF for application protection"
  type        = bool
  default     = true
}

variable "enable_guard_duty" {
  description = "Enable AWS GuardDuty for threat detection"
  type        = bool
  default     = true
}

variable "enable_security_hub" {
  description = "Enable AWS Security Hub for compliance"
  type        = bool
  default     = true
}

variable "allowed_cidr_blocks" {
  description = "CIDR blocks allowed to access the infrastructure"
  type        = list(string)
  default     = []
}

variable "ssl_certificate_arn" {
  description = "ARN of SSL certificate for HTTPS endpoints"
  type        = string
  default     = ""
}

variable "domain_name" {
  description = "Domain name for LawFly Pro"
  type        = string
  default     = ""
}

variable "enable_backup" {
  description = "Enable AWS Backup for automated backups"
  type        = bool
  default     = true
}

variable "backup_retention_days" {
  description = "Backup retention period in days"
  type        = number
  default     = 90
}

variable "compliance_framework" {
  description = "Compliance framework (SOC2, HIPAA, GDPR)"
  type        = list(string)
  default     = ["SOC2", "HIPAA", "GDPR"]
}

variable "data_classification" {
  description = "Data classification level"
  type        = string
  default     = "confidential"
  
  validation {
    condition     = contains(["public", "internal", "confidential", "restricted"], var.data_classification)
    error_message = "Data classification must be one of: public, internal, confidential, restricted"
  }
}

variable "log_retention_days" {
  description = "CloudWatch log retention period (days)"
  type        = number
  default     = 90
}

variable "enable_encryption_at_rest" {
  description = "Enable encryption at rest for all storage"
  type        = bool
  default     = true
}

variable "enable_encryption_in_transit" {
  description = "Enable encryption in transit (TLS 1.3)"
  type        = bool
  default     = true
}

variable "tenant_isolation_strategy" {
  description = "Tenant isolation strategy (namespace, vpc, account)"
  type        = string
  default     = "namespace"
  
  validation {
    condition     = contains(["namespace", "vpc", "account"], var.tenant_isolation_strategy)
    error_message = "Tenant isolation strategy must be one of: namespace, vpc, account"
  }
}

variable "byok_enabled" {
  description = "Enable Bring Your Own Key (BYOK) support"
  type        = bool
  default     = true
}

variable "hsm_enabled" {
  description = "Enable Hardware Security Module (HSM) for key management"
  type        = bool
  default     = false
}

variable "remote_render_enabled" {
  description = "Enable remote rendering for sensitive documents"
  type        = bool
  default     = true
}

variable "dlp_enabled" {
  description = "Enable Data Loss Prevention (DLP)"
  type        = bool
  default     = true
}

variable "siem_integration_enabled" {
  description = "Enable SIEM integration for security monitoring"
  type        = bool
  default     = true
}

variable "zero_trust_enabled" {
  description = "Enable zero-trust networking"
  type        = bool
  default     = true
}