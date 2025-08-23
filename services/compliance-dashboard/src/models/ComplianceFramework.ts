/**
 * LawFly Pro Compliance Framework Models
 * Defines compliance frameworks, controls, and monitoring structures
 */

export interface ComplianceFramework {
  id: string;
  name: string;
  version: string;
  description: string;
  applicableRegions: string[];
  mandatoryForIndustries: string[];
  controls: ComplianceControl[];
  testingFrequency: TestingFrequency;
  certificationRequirements?: CertificationRequirement;
  created_at: Date;
  updated_at: Date;
}

export interface ComplianceControl {
  id: string;
  frameworkId: string;
  controlNumber: string;
  title: string;
  description: string;
  category: ControlCategory;
  riskLevel: RiskLevel;
  implementationStatus: ImplementationStatus;
  testingFrequency: TestingFrequency;
  owner: string;
  evidence: EvidenceRequirement[];
  automatedTesting: boolean;
  manualTesting: boolean;
  lastTested?: Date;
  nextTestDue: Date;
  testResults: TestResult[];
  exceptions: ControlException[];
  created_at: Date;
  updated_at: Date;
}

export interface EvidenceRequirement {
  id: string;
  controlId: string;
  type: EvidenceType;
  description: string;
  collectionMethod: CollectionMethod;
  frequency: CollectionFrequency;
  retentionPeriod: number; // days
  location: string;
  automated: boolean;
  lastCollected?: Date;
  nextCollectionDue: Date;
}

export interface TestResult {
  id: string;
  controlId: string;
  testDate: Date;
  tester: string;
  testType: TestType;
  result: TestResultStatus;
  score?: number;
  findings: string[];
  recommendations: string[];
  evidence: string[];
  remediation?: RemediationPlan;
  created_at: Date;
}

export interface ControlException {
  id: string;
  controlId: string;
  type: ExceptionType;
  description: string;
  justification: string;
  riskAssessment: string;
  mitigatingControls: string[];
  approvedBy: string;
  approvedDate: Date;
  reviewDate: Date;
  status: ExceptionStatus;
  created_at: Date;
}

export interface RemediationPlan {
  id: string;
  controlId: string;
  description: string;
  priority: Priority;
  assignedTo: string;
  dueDate: Date;
  estimatedEffort: number; // hours
  status: RemediationStatus;
  progress: number; // percentage
  updates: RemediationUpdate[];
  completedDate?: Date;
}

export interface RemediationUpdate {
  id: string;
  planId: string;
  date: Date;
  author: string;
  description: string;
  progress: number;
  blockers?: string[];
}

export interface CertificationRequirement {
  certifyingBody: string;
  validityPeriod: number; // months
  renewalProcess: string;
  auditRequirements: AuditRequirement;
  costs: CertificationCosts;
}

export interface AuditRequirement {
  frequency: AuditFrequency;
  duration: number; // days
  auditorRequirements: string[];
  preparationTime: number; // days
  reportDelivery: number; // days after completion
}

export interface CertificationCosts {
  initialCertification: number;
  annualMaintenance: number;
  auditFees: number;
  consultingCosts?: number;
}

// Enums
export enum ControlCategory {
  ACCESS_CONTROL = 'access_control',
  ENCRYPTION = 'encryption',
  MONITORING = 'monitoring',
  INCIDENT_RESPONSE = 'incident_response',
  RISK_MANAGEMENT = 'risk_management',
  BUSINESS_CONTINUITY = 'business_continuity',
  VENDOR_MANAGEMENT = 'vendor_management',
  DATA_GOVERNANCE = 'data_governance',
  PHYSICAL_SECURITY = 'physical_security',
  PERSONNEL_SECURITY = 'personnel_security'
}

export enum RiskLevel {
  CRITICAL = 'critical',
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low'
}

export enum ImplementationStatus {
  NOT_IMPLEMENTED = 'not_implemented',
  IN_PROGRESS = 'in_progress',
  IMPLEMENTED = 'implemented',
  NEEDS_IMPROVEMENT = 'needs_improvement',
  EXCEEDS_REQUIREMENTS = 'exceeds_requirements'
}

export enum TestingFrequency {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  SEMI_ANNUALLY = 'semi_annually',
  ANNUALLY = 'annually',
  AD_HOC = 'ad_hoc'
}

export enum EvidenceType {
  SYSTEM_LOG = 'system_log',
  CONFIGURATION = 'configuration',
  POLICY_DOCUMENT = 'policy_document',
  TRAINING_RECORD = 'training_record',
  AUDIT_REPORT = 'audit_report',
  SCREENSHOT = 'screenshot',
  CERTIFICATE = 'certificate',
  CONTRACT = 'contract',
  INCIDENT_REPORT = 'incident_report',
  RISK_ASSESSMENT = 'risk_assessment'
}

export enum CollectionMethod {
  AUTOMATED = 'automated',
  MANUAL = 'manual',
  HYBRID = 'hybrid'
}

export enum CollectionFrequency {
  REAL_TIME = 'real_time',
  HOURLY = 'hourly',
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  ANNUALLY = 'annually',
  ON_DEMAND = 'on_demand'
}

export enum TestType {
  AUTOMATED = 'automated',
  MANUAL = 'manual',
  PENETRATION_TEST = 'penetration_test',
  VULNERABILITY_SCAN = 'vulnerability_scan',
  CONFIGURATION_REVIEW = 'configuration_review',
  PROCESS_WALKTHROUGH = 'process_walkthrough',
  SAMPLE_TESTING = 'sample_testing'
}

export enum TestResultStatus {
  PASSED = 'passed',
  FAILED = 'failed',
  PARTIAL = 'partial',
  NOT_TESTED = 'not_tested',
  NOT_APPLICABLE = 'not_applicable'
}

export enum ExceptionType {
  RISK_ACCEPTED = 'risk_accepted',
  COMPENSATING_CONTROL = 'compensating_control',
  TEMPORARY_DEVIATION = 'temporary_deviation',
  NOT_APPLICABLE = 'not_applicable'
}

export enum ExceptionStatus {
  ACTIVE = 'active',
  EXPIRED = 'expired',
  REVOKED = 'revoked',
  UNDER_REVIEW = 'under_review'
}

export enum Priority {
  CRITICAL = 'critical',
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low'
}

export enum RemediationStatus {
  NOT_STARTED = 'not_started',
  IN_PROGRESS = 'in_progress',
  BLOCKED = 'blocked',
  COMPLETED = 'completed',
  DEFERRED = 'deferred'
}

export enum AuditFrequency {
  ANNUALLY = 'annually',
  SEMI_ANNUALLY = 'semi_annually',
  QUARTERLY = 'quarterly'
}

// Standard Compliance Frameworks
export const COMPLIANCE_FRAMEWORKS = {
  SOC2_TYPE_II: 'soc2_type_ii',
  ISO_27001: 'iso_27001',
  GDPR: 'gdpr',
  HIPAA: 'hipaa',
  PCI_DSS: 'pci_dss',
  NIST_CSF: 'nist_csf',
  ABA_MODEL_RULES: 'aba_model_rules',
  CCPA: 'ccpa',
  FISMA: 'fisma',
  FEDRAMP: 'fedramp'
} as const;

export type ComplianceFrameworkType = typeof COMPLIANCE_FRAMEWORKS[keyof typeof COMPLIANCE_FRAMEWORKS];