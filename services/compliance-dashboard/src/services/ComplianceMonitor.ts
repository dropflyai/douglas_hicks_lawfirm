/**
 * LawFly Pro Compliance Monitoring Service
 * Real-time compliance monitoring and automated evidence collection
 */

import { EventEmitter } from 'events';
import * as cron from 'node-cron';
import { Logger } from 'winston';
import {
  ComplianceFramework,
  ComplianceControl,
  TestResult,
  TestResultStatus,
  EvidenceRequirement,
  CollectionFrequency,
  TestingFrequency,
  RemediationPlan,
  Priority,
  RiskLevel
} from '../models/ComplianceFramework';

export interface ComplianceScore {
  frameworkId: string;
  overall: number;
  byCategory: { [category: string]: number };
  trend: ComplianceTrend[];
  riskScore: number;
  criticalFindings: number;
  lastUpdated: Date;
}

export interface ComplianceTrend {
  date: Date;
  score: number;
  changes: ComplianceChange[];
}

export interface ComplianceChange {
  controlId: string;
  previousStatus: TestResultStatus;
  currentStatus: TestResultStatus;
  impact: number;
}

export interface ComplianceAlert {
  id: string;
  type: AlertType;
  severity: AlertSeverity;
  title: string;
  description: string;
  controlId?: string;
  frameworkId: string;
  triggeredAt: Date;
  acknowledged: boolean;
  acknowledgedBy?: string;
  acknowledgedAt?: Date;
  resolved: boolean;
  resolvedAt?: Date;
}

export enum AlertType {
  CONTROL_FAILURE = 'control_failure',
  EVIDENCE_MISSING = 'evidence_missing',
  TEST_OVERDUE = 'test_overdue',
  REMEDIATION_OVERDUE = 'remediation_overdue',
  COMPLIANCE_DEGRADATION = 'compliance_degradation',
  AUDIT_PREPARATION = 'audit_preparation'
}

export enum AlertSeverity {
  CRITICAL = 'critical',
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
  INFO = 'info'
}

export class ComplianceMonitor extends EventEmitter {
  private logger: Logger;
  private monitoringJobs: Map<string, cron.ScheduledTask> = new Map();
  private complianceScores: Map<string, ComplianceScore> = new Map();
  private activeAlerts: Map<string, ComplianceAlert> = new Map();

  constructor(logger: Logger) {
    super();
    this.logger = logger;
    this.initializeMonitoring();
  }

  private initializeMonitoring(): void {
    // Real-time monitoring tasks
    this.scheduleTask('evidence-collection', '*/15 * * * *', this.collectEvidence.bind(this));
    this.scheduleTask('control-testing', '0 */6 * * *', this.runAutomatedTests.bind(this));
    this.scheduleTask('compliance-scoring', '0 * * * *', this.calculateComplianceScores.bind(this));
    this.scheduleTask('alert-processing', '*/5 * * * *', this.processAlerts.bind(this));
    this.scheduleTask('trend-analysis', '0 0 * * *', this.analyzeTrends.bind(this));

    this.logger.info('Compliance monitoring initialized with scheduled tasks');
  }

  private scheduleTask(name: string, schedule: string, task: () => Promise<void>): void {
    const scheduledTask = cron.schedule(schedule, async () => {
      try {
        await task();
      } catch (error) {
        this.logger.error(`Compliance monitoring task '${name}' failed:`, error);
        this.emit('taskError', { name, error });
      }
    }, {
      scheduled: false
    });

    this.monitoringJobs.set(name, scheduledTask);
    scheduledTask.start();
    this.logger.info(`Scheduled compliance monitoring task: ${name}`);
  }

  /**
   * Calculate real-time compliance scores for all frameworks
   */
  async calculateComplianceScores(): Promise<void> {
    this.logger.info('Calculating compliance scores...');

    const frameworks = await this.getActiveFrameworks();
    
    for (const framework of frameworks) {
      const score = await this.calculateFrameworkScore(framework);
      this.complianceScores.set(framework.id, score);
      
      // Check for compliance degradation
      await this.checkComplianceDegradation(framework.id, score);
      
      this.emit('scoreUpdated', { frameworkId: framework.id, score });
    }
  }

  private async calculateFrameworkScore(framework: ComplianceFramework): Promise<ComplianceScore> {
    const controls = framework.controls;
    const totalControls = controls.length;
    const categoryScores: { [category: string]: number } = {};
    
    let totalScore = 0;
    let criticalFindings = 0;
    let riskScore = 0;

    // Calculate scores by category
    const categories = new Set(controls.map(c => c.category));
    
    for (const category of categories) {
      const categoryControls = controls.filter(c => c.category === category);
      const categoryScore = await this.calculateCategoryScore(categoryControls);
      categoryScores[category] = categoryScore;
    }

    // Calculate overall score
    for (const control of controls) {
      const controlScore = await this.calculateControlScore(control);
      totalScore += controlScore;
      
      // Count critical findings
      if (control.riskLevel === RiskLevel.CRITICAL && controlScore < 0.8) {
        criticalFindings++;
      }
      
      // Calculate risk score
      const riskWeight = this.getRiskWeight(control.riskLevel);
      riskScore += (1 - controlScore) * riskWeight;
    }

    const overallScore = totalScore / totalControls;
    
    // Get trend data
    const trend = await this.getComplianceTrend(framework.id);

    return {
      frameworkId: framework.id,
      overall: Math.round(overallScore * 1000) / 1000, // Round to 3 decimal places
      byCategory: Object.fromEntries(
        Object.entries(categoryScores).map(([cat, score]) => [cat, Math.round(score * 1000) / 1000])
      ),
      trend,
      riskScore: Math.round(riskScore * 100) / 100,
      criticalFindings,
      lastUpdated: new Date()
    };
  }

  private async calculateCategoryScore(controls: ComplianceControl[]): Promise<number> {
    let totalScore = 0;
    
    for (const control of controls) {
      const controlScore = await this.calculateControlScore(control);
      totalScore += controlScore;
    }
    
    return totalScore / controls.length;
  }

  private async calculateControlScore(control: ComplianceControl): Promise<number> {
    // Get latest test result
    const latestTest = control.testResults
      .sort((a, b) => b.testDate.getTime() - a.testDate.getTime())[0];

    if (!latestTest) {
      return 0; // No testing = 0 score
    }

    let baseScore = 0;
    switch (latestTest.result) {
      case TestResultStatus.PASSED:
        baseScore = 1.0;
        break;
      case TestResultStatus.PARTIAL:
        baseScore = latestTest.score || 0.5;
        break;
      case TestResultStatus.FAILED:
        baseScore = 0;
        break;
      case TestResultStatus.NOT_APPLICABLE:
        baseScore = 1.0;
        break;
      default:
        baseScore = 0;
    }

    // Apply penalties for overdue testing
    const daysSinceTest = Math.floor(
      (Date.now() - latestTest.testDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    const testingInterval = this.getTestingIntervalDays(control.testingFrequency);
    
    if (daysSinceTest > testingInterval) {
      const overduePenalty = Math.min(0.5, (daysSinceTest - testingInterval) / testingInterval * 0.1);
      baseScore = Math.max(0, baseScore - overduePenalty);
    }

    // Apply bonuses for exceeding requirements
    if (control.implementationStatus === 'exceeds_requirements') {
      baseScore = Math.min(1.0, baseScore + 0.1);
    }

    return baseScore;
  }

  private getRiskWeight(riskLevel: RiskLevel): number {
    switch (riskLevel) {
      case RiskLevel.CRITICAL: return 4.0;
      case RiskLevel.HIGH: return 3.0;
      case RiskLevel.MEDIUM: return 2.0;
      case RiskLevel.LOW: return 1.0;
      default: return 1.0;
    }
  }

  private getTestingIntervalDays(frequency: TestingFrequency): number {
    switch (frequency) {
      case TestingFrequency.DAILY: return 1;
      case TestingFrequency.WEEKLY: return 7;
      case TestingFrequency.MONTHLY: return 30;
      case TestingFrequency.QUARTERLY: return 90;
      case TestingFrequency.SEMI_ANNUALLY: return 180;
      case TestingFrequency.ANNUALLY: return 365;
      default: return 30;
    }
  }

  /**
   * Collect evidence automatically based on requirements
   */
  async collectEvidence(): Promise<void> {
    this.logger.info('Starting automated evidence collection...');

    const evidenceRequirements = await this.getPendingEvidenceCollection();
    
    for (const requirement of evidenceRequirements) {
      try {
        if (requirement.automated) {
          await this.collectAutomatedEvidence(requirement);
        } else {
          await this.scheduleManualEvidenceCollection(requirement);
        }
      } catch (error) {
        this.logger.error(`Failed to collect evidence for ${requirement.id}:`, error);
        await this.createAlert({
          type: AlertType.EVIDENCE_MISSING,
          severity: AlertSeverity.HIGH,
          title: 'Evidence Collection Failed',
          description: `Failed to collect evidence: ${requirement.description}`,
          controlId: requirement.controlId,
          frameworkId: await this.getFrameworkIdByControlId(requirement.controlId)
        });
      }
    }
  }

  private async collectAutomatedEvidence(requirement: EvidenceRequirement): Promise<void> {
    switch (requirement.type) {
      case 'system_log':
        await this.collectSystemLogs(requirement);
        break;
      case 'configuration':
        await this.collectConfigurationEvidence(requirement);
        break;
      case 'audit_report':
        await this.collectAuditReports(requirement);
        break;
      default:
        this.logger.warn(`No automated collection method for evidence type: ${requirement.type}`);
    }
  }

  private async collectSystemLogs(requirement: EvidenceRequirement): Promise<void> {
    // Implementation would integrate with AWS CloudWatch, application logs, etc.
    this.logger.info(`Collecting system logs for evidence requirement: ${requirement.id}`);
    
    // Simulate evidence collection
    const evidenceData = {
      requirementId: requirement.id,
      collectionTime: new Date(),
      source: 'cloudwatch',
      data: {
        logEvents: [], // Would contain actual log entries
        summary: 'System logs collected successfully'
      }
    };
    
    await this.storeEvidence(evidenceData);
  }

  private async collectConfigurationEvidence(requirement: EvidenceRequirement): Promise<void> {
    this.logger.info(`Collecting configuration evidence for requirement: ${requirement.id}`);
    
    // Implementation would collect system configurations, security settings, etc.
    const evidenceData = {
      requirementId: requirement.id,
      collectionTime: new Date(),
      source: 'configuration_management',
      data: {
        configurations: [], // Would contain actual config data
        summary: 'Configuration evidence collected successfully'
      }
    };
    
    await this.storeEvidence(evidenceData);
  }

  /**
   * Run automated compliance tests
   */
  async runAutomatedTests(): Promise<void> {
    this.logger.info('Running automated compliance tests...');

    const controls = await this.getControlsForAutomatedTesting();
    
    for (const control of controls) {
      try {
        const testResult = await this.executeAutomatedTest(control);
        await this.recordTestResult(testResult);
        
        if (testResult.result === TestResultStatus.FAILED) {
          await this.createAlert({
            type: AlertType.CONTROL_FAILURE,
            severity: this.mapRiskLevelToSeverity(control.riskLevel),
            title: `Control Test Failed: ${control.title}`,
            description: `Automated test failed for control ${control.controlNumber}`,
            controlId: control.id,
            frameworkId: control.frameworkId
          });
        }
      } catch (error) {
        this.logger.error(`Failed to run automated test for control ${control.id}:`, error);
      }
    }
  }

  private async executeAutomatedTest(control: ComplianceControl): Promise<TestResult> {
    // Implementation would vary based on control type
    this.logger.info(`Executing automated test for control: ${control.controlNumber}`);
    
    // Simulate test execution
    const testResult: TestResult = {
      id: `test_${Date.now()}`,
      controlId: control.id,
      testDate: new Date(),
      tester: 'automated_system',
      testType: 'automated',
      result: Math.random() > 0.1 ? TestResultStatus.PASSED : TestResultStatus.FAILED,
      score: Math.random(),
      findings: [],
      recommendations: [],
      evidence: [],
      created_at: new Date()
    };
    
    return testResult;
  }

  private mapRiskLevelToSeverity(riskLevel: RiskLevel): AlertSeverity {
    switch (riskLevel) {
      case RiskLevel.CRITICAL: return AlertSeverity.CRITICAL;
      case RiskLevel.HIGH: return AlertSeverity.HIGH;
      case RiskLevel.MEDIUM: return AlertSeverity.MEDIUM;
      case RiskLevel.LOW: return AlertSeverity.LOW;
      default: return AlertSeverity.MEDIUM;
    }
  }

  /**
   * Process and manage compliance alerts
   */
  async processAlerts(): Promise<void> {
    // Check for overdue tests
    await this.checkOverdueTests();
    
    // Check for missing evidence
    await this.checkMissingEvidence();
    
    // Check for overdue remediations
    await this.checkOverdueRemediations();
    
    // Process escalations
    await this.processAlertEscalations();
  }

  private async checkOverdueTests(): Promise<void> {
    const overdueControls = await this.getOverdueTestControls();
    
    for (const control of overdueControls) {
      const existingAlert = Array.from(this.activeAlerts.values())
        .find(a => a.controlId === control.id && a.type === AlertType.TEST_OVERDUE);
      
      if (!existingAlert) {
        await this.createAlert({
          type: AlertType.TEST_OVERDUE,
          severity: this.mapRiskLevelToSeverity(control.riskLevel),
          title: `Test Overdue: ${control.title}`,
          description: `Control ${control.controlNumber} testing is overdue`,
          controlId: control.id,
          frameworkId: control.frameworkId
        });
      }
    }
  }

  private async createAlert(alertData: {
    type: AlertType;
    severity: AlertSeverity;
    title: string;
    description: string;
    controlId?: string;
    frameworkId: string;
  }): Promise<ComplianceAlert> {
    const alert: ComplianceAlert = {
      id: `alert_${Date.now()}`,
      ...alertData,
      triggeredAt: new Date(),
      acknowledged: false,
      resolved: false
    };

    this.activeAlerts.set(alert.id, alert);
    
    // Emit alert event
    this.emit('alertCreated', alert);
    
    this.logger.warn(`Compliance alert created: ${alert.title}`);
    
    return alert;
  }

  /**
   * Get current compliance scores
   */
  getComplianceScores(): Map<string, ComplianceScore> {
    return new Map(this.complianceScores);
  }

  /**
   * Get active alerts
   */
  getActiveAlerts(): ComplianceAlert[] {
    return Array.from(this.activeAlerts.values()).filter(a => !a.resolved);
  }

  /**
   * Generate compliance report
   */
  async generateComplianceReport(frameworkId: string): Promise<any> {
    const score = this.complianceScores.get(frameworkId);
    if (!score) {
      throw new Error(`No compliance score found for framework: ${frameworkId}`);
    }

    const framework = await this.getFrameworkById(frameworkId);
    const alerts = this.getActiveAlerts().filter(a => a.frameworkId === frameworkId);
    
    return {
      framework: {
        id: framework.id,
        name: framework.name,
        version: framework.version
      },
      score: score,
      alerts: alerts,
      controlSummary: await this.getControlSummary(frameworkId),
      recommendedActions: await this.getRecommendedActions(frameworkId),
      auditReadiness: await this.assessAuditReadiness(frameworkId),
      generatedAt: new Date()
    };
  }

  /**
   * Stop all monitoring tasks
   */
  stopMonitoring(): void {
    this.monitoringJobs.forEach((task, name) => {
      task.stop();
      this.logger.info(`Stopped compliance monitoring task: ${name}`);
    });
    this.monitoringJobs.clear();
  }

  // Placeholder methods - would be implemented with actual database queries
  private async getActiveFrameworks(): Promise<ComplianceFramework[]> {
    // Implementation would query database for active frameworks
    return [];
  }

  private async getPendingEvidenceCollection(): Promise<EvidenceRequirement[]> {
    // Implementation would query for evidence that needs collection
    return [];
  }

  private async getControlsForAutomatedTesting(): Promise<ComplianceControl[]> {
    // Implementation would query for controls due for automated testing
    return [];
  }

  private async getOverdueTestControls(): Promise<ComplianceControl[]> {
    // Implementation would query for controls with overdue tests
    return [];
  }

  private async getFrameworkById(frameworkId: string): Promise<ComplianceFramework> {
    // Implementation would query database for framework
    throw new Error('Not implemented');
  }

  private async getFrameworkIdByControlId(controlId: string): Promise<string> {
    // Implementation would query database
    return 'framework_id';
  }

  private async getComplianceTrend(frameworkId: string): Promise<ComplianceTrend[]> {
    // Implementation would query historical compliance scores
    return [];
  }

  private async checkComplianceDegradation(frameworkId: string, score: ComplianceScore): Promise<void> {
    // Implementation would check for significant score decreases
  }

  private async scheduleManualEvidenceCollection(requirement: EvidenceRequirement): Promise<void> {
    // Implementation would create task for manual evidence collection
  }

  private async storeEvidence(evidenceData: any): Promise<void> {
    // Implementation would store evidence in database
  }

  private async recordTestResult(testResult: TestResult): Promise<void> {
    // Implementation would store test result in database
  }

  private async checkMissingEvidence(): Promise<void> {
    // Implementation would check for missing evidence
  }

  private async checkOverdueRemediations(): Promise<void> {
    // Implementation would check for overdue remediation plans
  }

  private async processAlertEscalations(): Promise<void> {
    // Implementation would handle alert escalations
  }

  private async getControlSummary(frameworkId: string): Promise<any> {
    // Implementation would generate control summary
    return {};
  }

  private async getRecommendedActions(frameworkId: string): Promise<any[]> {
    // Implementation would generate recommended actions
    return [];
  }

  private async assessAuditReadiness(frameworkId: string): Promise<any> {
    // Implementation would assess audit readiness
    return {};
  }

  private async collectAuditReports(requirement: EvidenceRequirement): Promise<void> {
    // Implementation would collect audit reports
  }
}