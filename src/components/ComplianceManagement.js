'use client';

import { useState, useEffect } from 'react';
import { 
  Shield, AlertTriangle, CheckCircle, Clock, Calendar, FileText,
  Scale, Book, Flag, Users, Building, Globe, DollarSign, Heart,
  Award, Target, TrendingUp, TrendingDown, Activity, BarChart3,
  Plus, Edit3, Eye, Download, Search, Filter, X, ChevronRight,
  ChevronDown, ArrowUpRight, RefreshCw, Settings, Info, User,
  Mail, Phone, MapPin, Briefcase, Star, Bookmark, Tag, Share2,
  Copy, ExternalLink, Trash2, Brain, Zap, PieChart, Calculator,
  CreditCard, Wallet, Banknote, Receipt, Umbrella, Baby,
  GraduationCap, Home, Car, Plane, Sun, Moon, Coffee, TreePine,
  Database, Monitor, Smartphone, Tablet, Trophy, Lock, Unlock,
  Bell, MessageSquare, Video, Mic, Upload, FileCheck, ClipboardCheck
} from 'lucide-react';

export default function ComplianceManagement() {
  const [activeView, setActiveView] = useState('dashboard');
  const [selectedCompliance, setSelectedCompliance] = useState(null);
  const [showComplianceDetail, setShowComplianceDetail] = useState(false);
  const [showAuditModal, setShowAuditModal] = useState(false);
  const [selectedAudit, setSelectedAudit] = useState(null);

  // Comprehensive compliance data
  const complianceOverview = {
    overallScore: 94,
    criticalIssues: 2,
    pendingActions: 8,
    completedAudits: 15,
    upcomingDeadlines: 5,
    complianceTraining: 92, // percentage completion
    policiesUpToDate: 96, // percentage
    lastAuditDate: '2025-11-15',
    nextAuditDate: '2025-05-15'
  };

  const federalLaws = [
    {
      id: 1,
      name: 'Fair Labor Standards Act (FLSA)',
      category: 'wage_hour',
      authority: 'Department of Labor',
      lastUpdate: '2025-07-01',
      nextReview: '2025-01-15',
      status: 'compliant',
      riskLevel: 'medium',
      applicableEmployees: 47,
      requirements: [
        'Minimum wage compliance ($7.25/hour federal)',
        'Overtime pay for non-exempt employees',
        'Child labor protections',
        'Record keeping requirements',
        'Break and meal period compliance'
      ],
      currentCompliance: {
        minimumWage: { status: 'compliant', lastCheck: '2025-12-01' },
        overtimePay: { status: 'compliant', lastCheck: '2025-12-01' },
        recordKeeping: { status: 'compliant', lastCheck: '2025-11-15' },
        childLabor: { status: 'na', lastCheck: null },
        breakPeriods: { status: 'compliant', lastCheck: '2025-11-01' }
      },
      penalties: 'Up to $2,374 per violation; criminal prosecution for willful violations',
      recentUpdates: [
        {
          date: '2025-07-01',
          change: 'Updated overtime calculation methods for remote workers',
          impact: 'Low - no changes needed to current practices'
        }
      ],
      auditHistory: [
        {
          date: '2025-11-15',
          type: 'internal',
          result: 'compliant',
          findings: 'All wage and hour practices meet FLSA requirements'
        }
      ]
    },
    {
      id: 2,
      name: 'Family and Medical Leave Act (FMLA)',
      category: 'leave',
      authority: 'Department of Labor',
      lastUpdate: '2025-08-15',
      nextReview: '2025-02-15',
      status: 'compliant',
      riskLevel: 'high',
      applicableEmployees: 47,
      requirements: [
        '12 weeks unpaid leave for eligible employees',
        'Job protection during leave',
        'Health insurance continuation',
        'Proper notice and documentation',
        'Eligibility determination (1250 hours, 12 months employment)'
      ],
      currentCompliance: {
        eligibilityTracking: { status: 'compliant', lastCheck: '2025-12-01' },
        leaveTracking: { status: 'compliant', lastCheck: '2025-12-01' },
        jobProtection: { status: 'compliant', lastCheck: '2025-11-15' },
        healthInsurance: { status: 'compliant', lastCheck: '2025-11-15' },
        documentation: { status: 'compliant', lastCheck: '2025-12-01' }
      },
      penalties: 'Up to $2,374 per violation; liquidated damages; attorney fees',
      recentUpdates: [
        {
          date: '2025-08-15',
          change: 'Clarification on military family leave entitlements',
          impact: 'Low - existing practices already compliant'
        }
      ],
      auditHistory: [
        {
          date: '2025-09-01',
          type: 'internal',
          result: 'compliant',
          findings: 'FMLA administration and tracking meets all requirements'
        }
      ]
    },
    {
      id: 3,
      name: 'Equal Employment Opportunity (Title VII)',
      category: 'discrimination',
      authority: 'EEOC',
      lastUpdate: '2025-06-01',
      nextReview: '2025-03-01',
      status: 'compliant',
      riskLevel: 'high',
      applicableEmployees: 47,
      requirements: [
        'Prohibition of discrimination based on protected classes',
        'Sexual harassment prevention and response',
        'Reasonable accommodations',
        'EEO-1 reporting (if applicable)',
        'Anti-retaliation protections'
      ],
      currentCompliance: {
        discriminationPolicy: { status: 'compliant', lastCheck: '2025-12-01' },
        harassmentPrevention: { status: 'compliant', lastCheck: '2025-11-01' },
        accommodations: { status: 'compliant', lastCheck: '2025-10-15' },
        eeoReporting: { status: 'na', lastCheck: null },
        antiRetaliation: { status: 'compliant', lastCheck: '2025-12-01' }
      },
      penalties: 'Unlimited compensatory and punitive damages; attorney fees; injunctive relief',
      recentUpdates: [
        {
          date: '2025-06-01',
          change: 'Updated guidance on pregnancy discrimination',
          impact: 'Medium - reviewed and updated policies accordingly'
        }
      ],
      auditHistory: [
        {
          date: '2025-10-01',
          type: 'internal',
          result: 'compliant',
          findings: 'All EEO policies and practices meet requirements'
        }
      ]
    },
    {
      id: 4,
      name: 'Americans with Disabilities Act (ADA)',
      category: 'accommodation',
      authority: 'EEOC / DOJ',
      lastUpdate: '2025-09-01',
      nextReview: '2025-03-01',
      status: 'compliant',
      riskLevel: 'high',
      applicableEmployees: 47,
      requirements: [
        'Reasonable accommodations for qualified individuals',
        'Interactive accommodation process',
        'Workplace accessibility',
        'Non-discrimination in hiring and employment',
        'Confidentiality of medical information'
      ],
      currentCompliance: {
        accommodationProcess: { status: 'compliant', lastCheck: '2025-12-01' },
        workplaceAccess: { status: 'compliant', lastCheck: '2025-08-15' },
        hiringPractices: { status: 'compliant', lastCheck: '2025-11-01' },
        medicalConfidentiality: { status: 'compliant', lastCheck: '2025-12-01' },
        interactiveProcess: { status: 'compliant', lastCheck: '2025-11-15' }
      },
      penalties: 'Up to $75,000 first violation, $150,000 subsequent; attorney fees',
      recentUpdates: [
        {
          date: '2025-09-01',
          change: 'New guidance on mental health accommodations',
          impact: 'Medium - enhanced accommodation procedures'
        }
      ],
      auditHistory: [
        {
          date: '2025-08-15',
          type: 'accessibility_audit',
          result: 'compliant',
          findings: 'Workplace accessibility meets ADA requirements'
        }
      ]
    },
    {
      id: 5,
      name: 'Occupational Safety and Health Act (OSHA)',
      category: 'safety',
      authority: 'OSHA',
      lastUpdate: '2025-10-01',
      nextReview: '2025-04-01',
      status: 'action_required',
      riskLevel: 'medium',
      applicableEmployees: 47,
      requirements: [
        'Safe and healthy working conditions',
        'Hazard communication standards',
        'Injury and illness recording (Form 300)',
        'Emergency action plans',
        'Training and safety programs'
      ],
      currentCompliance: {
        safetyProgram: { status: 'compliant', lastCheck: '2025-11-01' },
        hazardCommunication: { status: 'compliant', lastCheck: '2025-10-01' },
        injuryRecording: { status: 'action_required', lastCheck: '2025-12-01' },
        emergencyPlans: { status: 'compliant', lastCheck: '2025-09-01' },
        safetyTraining: { status: 'compliant', lastCheck: '2025-11-15' }
      },
      penalties: 'Up to $16,131 per serious violation; $161,323 for willful/repeat violations',
      recentUpdates: [
        {
          date: '2025-10-01',
          change: 'Updated COVID-19 workplace safety guidelines',
          impact: 'Low - office environment has minimal impact'
        }
      ],
      auditHistory: [
        {
          date: '2025-11-01',
          type: 'safety_inspection',
          result: 'minor_issues',
          findings: 'Update injury log entries for Q4 2025'
        }
      ]
    }
  ];

  const stateLaws = [
    {
      id: 1,
      name: 'California Fair Employment and Housing Act (FEHA)',
      state: 'California',
      category: 'discrimination',
      authority: 'DFEH',
      lastUpdate: '2025-01-01',
      nextReview: '2025-01-01',
      status: 'compliant',
      riskLevel: 'high',
      requirements: [
        'Expanded protected classes beyond federal law',
        'Mandatory sexual harassment training',
        'Pay equity and salary history restrictions',
        'Pregnancy disability leave',
        'Enhanced accommodation requirements'
      ],
      currentCompliance: {
        harassmentTraining: { status: 'compliant', lastCheck: '2025-11-01', completionRate: 100 },
        payEquity: { status: 'compliant', lastCheck: '2025-10-01' },
        pregnancyLeave: { status: 'compliant', lastCheck: '2025-09-01' },
        accommodations: { status: 'compliant', lastCheck: '2025-12-01' }
      }
    },
    {
      id: 2,
      name: 'California Healthy Workplaces, Healthy Families Act',
      state: 'California',
      category: 'sick_leave',
      authority: 'DIR',
      lastUpdate: '2025-01-01',
      nextReview: '2025-01-01',
      status: 'compliant',
      riskLevel: 'medium',
      requirements: [
        'Minimum 3 days/24 hours paid sick leave annually',
        'Accrual at 1 hour per 30 hours worked',
        'Carryover of unused leave',
        'Notice and posting requirements',
        'Anti-retaliation protections'
      ],
      currentCompliance: {
        sickLeaveAccrual: { status: 'compliant', lastCheck: '2025-12-01' },
        carryoverPolicy: { status: 'compliant', lastCheck: '2025-11-01' },
        noticeRequirements: { status: 'compliant', lastCheck: '2025-10-01' },
        antiRetaliation: { status: 'compliant', lastCheck: '2025-12-01' }
      }
    },
    {
      id: 3,
      name: 'California Labor Code - Wage and Hour',
      state: 'California',
      category: 'wage_hour',
      authority: 'DIR',
      lastUpdate: '2025-01-01',
      nextReview: '2025-01-01',
      status: 'compliant',
      riskLevel: 'high',
      requirements: [
        'Higher minimum wage than federal ($16.00/hour)',
        'Daily overtime after 8 hours',
        'Double time after 12 hours',
        'Meal and rest break requirements',
        'Final pay requirements'
      ],
      currentCompliance: {
        minimumWage: { status: 'compliant', lastCheck: '2025-12-01', currentRate: 16.00 },
        dailyOvertime: { status: 'compliant', lastCheck: '2025-12-01' },
        mealBreaks: { status: 'compliant', lastCheck: '2025-11-15' },
        restBreaks: { status: 'compliant', lastCheck: '2025-11-15' },
        finalPay: { status: 'compliant', lastCheck: '2025-11-01' }
      }
    }
  ];

  const healthBenefitCompliance = [
    {
      id: 1,
      name: 'Affordable Care Act (ACA)',
      category: 'health_benefits',
      authority: 'IRS / HHS',
      status: 'compliant',
      riskLevel: 'high',
      applicableEmployees: 47,
      requirements: [
        'Employer mandate (50+ FTE employees)',
        'Minimum essential coverage',
        'Affordability standards (9.12% of household income)',
        'Minimum value requirements (60% actuarial value)',
        'Form 1095-C reporting'
      ],
      currentCompliance: {
        employerMandate: { status: 'na', note: 'Under 50 FTE employees' },
        essentialCoverage: { status: 'compliant', lastCheck: '2025-11-01' },
        affordability: { status: 'compliant', lastCheck: '2025-11-01', percentage: 8.5 },
        minimumValue: { status: 'compliant', lastCheck: '2025-11-01', actuarialValue: 85 },
        reporting: { status: 'na', note: 'Not required under 50 FTE' }
      },
      penalties: 'Up to $4,460 per employee annually for non-compliance'
    },
    {
      id: 2,
      name: 'COBRA Continuation Coverage',
      category: 'health_benefits',
      authority: 'DOL',
      status: 'compliant',
      riskLevel: 'high',
      applicableEmployees: 47,
      requirements: [
        'Continuation coverage for qualifying events',
        'Proper notice requirements (18-36 months)',
        'Premium payment procedures',
        'COBRA election periods',
        'Qualified beneficiary determination'
      ],
      currentCompliance: {
        noticeRequirements: { status: 'compliant', lastCheck: '2025-12-01' },
        electionPeriods: { status: 'compliant', lastCheck: '2025-11-01' },
        premiumCollection: { status: 'compliant', lastCheck: '2025-12-01' },
        beneficiaryTracking: { status: 'compliant', lastCheck: '2025-11-15' }
      },
      penalties: 'Up to $110 per day per participant; unlimited liability'
    },
    {
      id: 3,
      name: 'HIPAA Privacy and Security',
      category: 'privacy',
      authority: 'HHS',
      status: 'compliant',
      riskLevel: 'high',
      applicableEmployees: 47,
      requirements: [
        'Protected Health Information (PHI) safeguards',
        'Privacy policies and procedures',
        'Employee training on HIPAA',
        'Breach notification procedures',
        'Business associate agreements'
      ],
      currentCompliance: {
        phiSafeguards: { status: 'compliant', lastCheck: '2025-11-01' },
        privacyPolicies: { status: 'compliant', lastCheck: '2025-10-01' },
        employeeTraining: { status: 'compliant', lastCheck: '2025-09-01', completionRate: 100 },
        breachProcedures: { status: 'compliant', lastCheck: '2025-11-01' },
        businessAssociates: { status: 'compliant', lastCheck: '2025-12-01' }
      },
      penalties: 'Up to $1.92 million per incident; criminal prosecution possible'
    },
    {
      id: 4,
      name: 'ERISA Fiduciary Requirements',
      category: 'retirement_benefits',
      authority: 'DOL',
      status: 'compliant',
      riskLevel: 'medium',
      applicableEmployees: 42, // those enrolled in 401k
      requirements: [
        'Fiduciary duty to plan participants',
        'Prudent selection of investments',
        'Reasonable fees and expenses',
        'Plan document compliance',
        'Annual Form 5500 filing'
      ],
      currentCompliance: {
        fiduciaryDuty: { status: 'compliant', lastCheck: '2025-10-01' },
        investmentSelection: { status: 'compliant', lastCheck: '2025-09-01' },
        feeReasonableness: { status: 'compliant', lastCheck: '2025-11-01' },
        planDocuments: { status: 'compliant', lastCheck: '2025-08-01' },
        form5500: { status: 'compliant', lastCheck: '2025-07-31', filedDate: '2025-07-15' }
      },
      penalties: 'Personal liability for losses; restoration of profits; civil penalties'
    }
  ];

  const complianceAudits = [
    {
      id: 1,
      name: 'Annual EEO Compliance Review',
      type: 'internal',
      category: 'discrimination',
      scheduledDate: '2025-03-01',
      status: 'scheduled',
      scope: ['Hiring practices', 'Promotion decisions', 'Compensation equity', 'Harassment prevention'],
      assignedTo: 'Sarah Mitchell',
      estimatedDuration: '2 weeks',
      lastCompleted: '2025-03-01',
      lastResult: 'compliant',
      findings: []
    },
    {
      id: 2,
      name: 'Wage and Hour Audit',
      type: 'internal',
      category: 'wage_hour',
      scheduledDate: '2025-01-15',
      status: 'scheduled',
      scope: ['Overtime calculations', 'Break compliance', 'Classification review', 'Record keeping'],
      assignedTo: 'Michael Chen',
      estimatedDuration: '1 week',
      lastCompleted: '2025-11-15',
      lastResult: 'compliant',
      findings: []
    },
    {
      id: 3,
      name: 'FMLA Administration Review',
      type: 'external',
      category: 'leave',
      scheduledDate: '2025-02-15',
      status: 'scheduled',
      scope: ['Eligibility tracking', 'Leave administration', 'Job protection', 'Documentation'],
      assignedTo: 'External Auditor',
      estimatedDuration: '3 days',
      lastCompleted: '2025-09-01',
      lastResult: 'compliant',
      findings: []
    },
    {
      id: 4,
      name: 'Benefits Compliance Audit',
      type: 'internal',
      category: 'benefits',
      scheduledDate: '2025-05-01',
      status: 'scheduled',
      scope: ['ACA compliance', 'COBRA administration', 'ERISA requirements', 'HIPAA privacy'],
      assignedTo: 'Sarah Mitchell',
      estimatedDuration: '2 weeks',
      lastCompleted: '2025-05-01',
      lastResult: 'minor_issues',
      findings: [
        'Update COBRA notice templates',
        'Enhanced HIPAA training needed'
      ]
    }
  ];

  const complianceTraining = [
    {
      id: 1,
      name: 'Sexual Harassment Prevention (CA Required)',
      category: 'mandatory',
      frequency: 'biennial',
      targetAudience: 'all_employees',
      lastCompleted: '2025-01-15',
      nextDue: '2026-01-15',
      completionRate: 100,
      status: 'current',
      provider: 'Internal Training',
      duration: '2 hours'
    },
    {
      id: 2,
      name: 'HIPAA Privacy and Security',
      category: 'mandatory',
      frequency: 'annual',
      targetAudience: 'all_employees',
      lastCompleted: '2025-09-01',
      nextDue: '2025-09-01',
      completionRate: 100,
      status: 'current',
      provider: 'External Provider',
      duration: '1 hour'
    },
    {
      id: 3,
      name: 'Workplace Safety Training',
      category: 'mandatory',
      frequency: 'annual',
      targetAudience: 'all_employees',
      lastCompleted: '2025-11-15',
      nextDue: '2025-11-15',
      completionRate: 96,
      status: 'current',
      provider: 'Internal Training',
      duration: '30 minutes'
    },
    {
      id: 4,
      name: 'ADA Accommodation Process',
      category: 'role_specific',
      frequency: 'annual',
      targetAudience: 'managers',
      lastCompleted: '2025-10-01',
      nextDue: '2025-10-01',
      completionRate: 100,
      status: 'current',
      provider: 'External Provider',
      duration: '1.5 hours'
    }
  ];

  const upcomingDeadlines = [
    {
      id: 1,
      name: 'CA Sexual Harassment Training Compliance Check',
      dueDate: '2025-01-31',
      type: 'training',
      priority: 'medium',
      description: 'Verify all employees have completed required biennial training',
      assignedTo: 'Sarah Mitchell',
      status: 'pending'
    },
    {
      id: 2,
      name: 'Form 5500 Filing Preparation',
      dueDate: '2025-07-31',
      type: 'filing',
      priority: 'high',
      description: 'Prepare and file annual retirement plan report',
      assignedTo: 'External Accountant',
      status: 'pending'
    },
    {
      id: 3,
      name: 'OSHA Injury Log Update',
      dueDate: '2025-01-15',
      type: 'reporting',
      priority: 'high',
      description: 'Complete Q4 2025 injury and illness log entries',
      assignedTo: 'Sarah Mitchell',
      status: 'in_progress'
    },
    {
      id: 4,
      name: 'EEO-1 Report Review',
      dueDate: '2025-05-31',
      type: 'filing',
      priority: 'low',
      description: 'Determine if EEO-1 filing required (100+ employees)',
      assignedTo: 'Sarah Mitchell',
      status: 'pending'
    },
    {
      id: 5,
      name: 'Benefits Plan Year End Compliance',
      dueDate: '2025-12-31',
      type: 'compliance',
      priority: 'medium',
      description: 'Annual review of all benefit plan compliance requirements',
      assignedTo: 'Sarah Mitchell',
      status: 'pending'
    }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'compliant': return 'bg-green-500/20 text-green-400';
      case 'action_required': return 'bg-yellow-500/20 text-yellow-400';
      case 'non_compliant': return 'bg-red-500/20 text-red-400';
      case 'under_review': return 'bg-blue-500/20 text-blue-400';
      case 'na': return 'bg-gray-500/20 text-gray-400';
      case 'scheduled': return 'bg-blue-500/20 text-blue-400';
      case 'in_progress': return 'bg-yellow-500/20 text-yellow-400';
      case 'completed': return 'bg-green-500/20 text-green-400';
      case 'current': return 'bg-green-500/20 text-green-400';
      case 'overdue': return 'bg-red-500/20 text-red-400';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getRiskColor = (risk) => {
    switch(risk) {
      case 'high': return 'bg-red-500/20 text-red-400';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'low': return 'bg-green-500/20 text-green-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-500/20 text-red-400';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'low': return 'bg-green-500/20 text-green-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const renderComplianceDashboard = () => (
    <div className="space-y-6">
      {/* Compliance Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-green-900/30 to-green-800/30 border border-green-500/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-green-300 text-sm font-semibold">Overall Compliance Score</p>
              <p className="text-3xl font-bold text-white">{complianceOverview.overallScore}%</p>
            </div>
            <Shield className="w-10 h-10 text-green-400" />
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span className="text-green-400 text-sm font-semibold">Excellent</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-900/30 to-red-800/30 border border-red-500/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-red-300 text-sm font-semibold">Critical Issues</p>
              <p className="text-3xl font-bold text-white">{complianceOverview.criticalIssues}</p>
            </div>
            <AlertTriangle className="w-10 h-10 text-red-400" />
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-red-400" />
            <span className="text-red-400 text-sm font-semibold">Immediate attention</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-900/30 to-yellow-800/30 border border-yellow-500/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-yellow-300 text-sm font-semibold">Pending Actions</p>
              <p className="text-3xl font-bold text-white">{complianceOverview.pendingActions}</p>
            </div>
            <Clock className="w-10 h-10 text-yellow-400" />
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-yellow-400" />
            <span className="text-yellow-400 text-sm font-semibold">{complianceOverview.upcomingDeadlines} due soon</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-900/30 to-blue-800/30 border border-blue-500/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-blue-300 text-sm font-semibold">Training Completion</p>
              <p className="text-3xl font-bold text-white">{complianceOverview.complianceTraining}%</p>
            </div>
            <GraduationCap className="w-10 h-10 text-blue-400" />
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-sm font-semibold">Above target</span>
          </div>
        </div>
      </div>

      {/* Upcoming Deadlines */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Upcoming Compliance Deadlines</h3>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Schedule Review
          </button>
        </div>
        <div className="space-y-4">
          {upcomingDeadlines.slice(0, 5).map(deadline => (
            <div key={deadline.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
              <div className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full ${getPriorityColor(deadline.priority).includes('red') ? 'bg-red-500' : 
                  getPriorityColor(deadline.priority).includes('yellow') ? 'bg-yellow-500' : 'bg-green-500'}`} />
                <div>
                  <h4 className="text-white font-semibold">{deadline.name}</h4>
                  <p className="text-gray-400 text-sm">{deadline.description}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white font-semibold">{deadline.dueDate}</p>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(deadline.priority)}`}>
                    {deadline.priority.charAt(0).toUpperCase() + deadline.priority.slice(1)}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(deadline.status)}`}>
                    {deadline.status.replace('_', ' ').charAt(0).toUpperCase() + deadline.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-white font-semibold mb-4">Federal Law Status</h3>
          <div className="space-y-3">
            {federalLaws.slice(0, 3).map(law => (
              <div key={law.id} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                <div>
                  <p className="text-white font-medium">{law.name}</p>
                  <p className="text-gray-400 text-sm">{law.category.replace('_', ' ')}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(law.status)}`}>
                  {law.status.replace('_', ' ').charAt(0).toUpperCase() + law.status.slice(1)}
                </span>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 text-purple-400 hover:bg-purple-900/30 rounded-lg transition-colors text-sm">
            View All Federal Laws →
          </button>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-white font-semibold mb-4">State Law Status</h3>
          <div className="space-y-3">
            {stateLaws.map(law => (
              <div key={law.id} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                <div>
                  <p className="text-white font-medium">{law.name}</p>
                  <p className="text-gray-400 text-sm">{law.state} • {law.category.replace('_', ' ')}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(law.status)}`}>
                  {law.status.replace('_', ' ').charAt(0).toUpperCase() + law.status.slice(1)}
                </span>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 text-purple-400 hover:bg-purple-900/30 rounded-lg transition-colors text-sm">
            View All State Laws →
          </button>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-white font-semibold mb-4">Benefits Compliance</h3>
          <div className="space-y-3">
            {healthBenefitCompliance.slice(0, 3).map(benefit => (
              <div key={benefit.id} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                <div>
                  <p className="text-white font-medium">{benefit.name}</p>
                  <p className="text-gray-400 text-sm">{benefit.category.replace('_', ' ')}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(benefit.status)}`}>
                  {benefit.status.replace('_', ' ').charAt(0).toUpperCase() + benefit.status.slice(1)}
                </span>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 text-purple-400 hover:bg-purple-900/30 rounded-lg transition-colors text-sm">
            View All Benefits Laws →
          </button>
        </div>
      </div>
    </div>
  );

  const renderFederalLaws = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Federal Employment Laws</h2>
        <div className="flex gap-2">
          <select className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500">
            <option>All Categories</option>
            <option>Wage & Hour</option>
            <option>Discrimination</option>
            <option>Safety</option>
            <option>Leave</option>
          </select>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            Export Report
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {federalLaws.map(law => (
          <div key={law.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-white">{law.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(law.status)}`}>
                    {law.status.replace('_', ' ').charAt(0).toUpperCase() + law.status.slice(1)}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getRiskColor(law.riskLevel)}`}>
                    {law.riskLevel.charAt(0).toUpperCase() + law.riskLevel.slice(1)} Risk
                  </span>
                </div>
                <div className="flex items-center gap-4 text-gray-400 text-sm">
                  <span>Authority: {law.authority}</span>
                  <span>•</span>
                  <span>Applies to: {law.applicableEmployees} employees</span>
                  <span>•</span>
                  <span>Next Review: {law.nextReview}</span>
                </div>
              </div>
              <button
                onClick={() => {
                  setSelectedCompliance(law);
                  setShowComplianceDetail(true);
                }}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 mb-4">
              <div>
                <h4 className="text-white font-semibold mb-3">Key Requirements</h4>
                <div className="space-y-2">
                  {law.requirements.slice(0, 3).map((req, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                      <span className="text-gray-300 text-sm">{req}</span>
                    </div>
                  ))}
                  {law.requirements.length > 3 && (
                    <p className="text-purple-400 text-sm ml-4">+{law.requirements.length - 3} more requirements</p>
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-3">Compliance Status</h4>
                <div className="space-y-2">
                  {Object.entries(law.currentCompliance).slice(0, 3).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm capitalize">{key.replace(/([A-Z])/g, ' $1').toLowerCase()}</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(value.status)}`}>
                        {value.status === 'na' ? 'N/A' : value.status.replace('_', ' ').charAt(0).toUpperCase() + value.status.slice(1)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-gray-400">Penalties: {law.penalties.slice(0, 50)}...</span>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors">
                    View Details
                  </button>
                  <button className="px-3 py-1 bg-gray-700 text-white rounded text-sm hover:bg-gray-600 transition-colors">
                    Update Status
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderBenefitsCompliance = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Health Benefits & Retirement Compliance</h2>
        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Compliance Item
        </button>
      </div>

      <div className="space-y-6">
        {healthBenefitCompliance.map(benefit => (
          <div key={benefit.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-white">{benefit.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(benefit.status)}`}>
                    {benefit.status.replace('_', ' ').charAt(0).toUpperCase() + benefit.status.slice(1)}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getRiskColor(benefit.riskLevel)}`}>
                    {benefit.riskLevel.charAt(0).toUpperCase() + benefit.riskLevel.slice(1)} Risk
                  </span>
                </div>
                <div className="flex items-center gap-4 text-gray-400 text-sm">
                  <span>Authority: {benefit.authority}</span>
                  <span>•</span>
                  <span>Category: {benefit.category.replace('_', ' ')}</span>
                  {benefit.applicableEmployees && (
                    <>
                      <span>•</span>
                      <span>Applies to: {benefit.applicableEmployees} employees</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 mb-4">
              <div>
                <h4 className="text-white font-semibold mb-3">Requirements</h4>
                <div className="space-y-2">
                  {benefit.requirements.map((req, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{req}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-3">Current Compliance</h4>
                <div className="space-y-3">
                  {Object.entries(benefit.currentCompliance).map(([key, value]) => (
                    <div key={key} className="p-3 bg-gray-700 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-white text-sm font-medium capitalize">
                          {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(value.status)}`}>
                          {value.status === 'na' ? 'N/A' : value.status.replace('_', ' ').charAt(0).toUpperCase() + value.status.slice(1)}
                        </span>
                      </div>
                      {value.note && <p className="text-gray-400 text-xs">{value.note}</p>}
                      {value.lastCheck && <p className="text-gray-500 text-xs">Last check: {value.lastCheck}</p>}
                      {value.percentage && <p className="text-gray-400 text-xs">Rate: {value.percentage}%</p>}
                      {value.actuarialValue && <p className="text-gray-400 text-xs">Actuarial value: {value.actuarialValue}%</p>}
                      {value.completionRate && <p className="text-gray-400 text-xs">Completion: {value.completionRate}%</p>}
                      {value.filedDate && <p className="text-gray-400 text-xs">Filed: {value.filedDate}</p>}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-yellow-400 font-semibold">Penalties for Non-Compliance</h5>
                  <p className="text-yellow-300 text-sm mt-1">{benefit.penalties}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAuditsSchedule = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Compliance Audits & Reviews</h2>
        <button
          onClick={() => setShowAuditModal(true)}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
        >
          <Calendar className="w-4 h-4" />
          Schedule Audit
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-white font-semibold mb-4">Audit Statistics</h3>
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-white">{complianceOverview.completedAudits}</p>
              <p className="text-gray-400 text-sm">Completed This Year</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-white">4</p>
              <p className="text-gray-400 text-sm">Scheduled</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-white">0</p>
              <p className="text-gray-400 text-sm">Overdue</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-white font-semibold mb-4">Audit Results</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Compliant</span>
              <span className="text-green-400 font-semibold">12</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Minor Issues</span>
              <span className="text-yellow-400 font-semibold">3</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Major Issues</span>
              <span className="text-red-400 font-semibold">0</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-white font-semibold mb-4">Next Audit</h3>
          <div className="text-center">
            <p className="text-2xl font-bold text-white">Jan 15</p>
            <p className="text-gray-400">Wage and Hour Audit</p>
            <p className="text-gray-500 text-sm mt-2">Assigned to Michael Chen</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {complianceAudits.map(audit => (
          <div key={audit.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold text-white">{audit.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(audit.status)}`}>
                    {audit.status.charAt(0).toUpperCase() + audit.status.slice(1)}
                  </span>
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs font-medium">
                    {audit.type.charAt(0).toUpperCase() + audit.type.slice(1)}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-gray-400 text-sm">
                  <span>Category: {audit.category.replace('_', ' ')}</span>
                  <span>•</span>
                  <span>Scheduled: {audit.scheduledDate}</span>
                  <span>•</span>
                  <span>Duration: {audit.estimatedDuration}</span>
                </div>
              </div>
              <button
                onClick={() => {
                  setSelectedAudit(audit);
                  setShowAuditModal(true);
                }}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 mb-4">
              <div>
                <h4 className="text-white font-semibold mb-3">Audit Scope</h4>
                <div className="space-y-2">
                  {audit.scope.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-purple-400 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-3">Assignment & History</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-700 rounded-lg">
                    <p className="text-white text-sm font-medium">Assigned To</p>
                    <p className="text-gray-400 text-sm">{audit.assignedTo}</p>
                  </div>
                  {audit.lastCompleted && (
                    <div className="p-3 bg-gray-700 rounded-lg">
                      <p className="text-white text-sm font-medium">Last Completed</p>
                      <p className="text-gray-400 text-sm">{audit.lastCompleted}</p>
                      <p className="text-gray-500 text-xs">Result: {audit.lastResult.replace('_', ' ')}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {audit.findings.length > 0 && (
              <div className="p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
                <h5 className="text-yellow-400 font-semibold mb-2">Previous Findings</h5>
                <div className="space-y-1">
                  {audit.findings.map((finding, index) => (
                    <p key={index} className="text-yellow-300 text-sm">• {finding}</p>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-2 mt-4 pt-4 border-t border-gray-700">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                View Details
              </button>
              <button className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm">
                Reschedule
              </button>
              <button className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm">
                Generate Checklist
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTrainingCompliance = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Compliance Training</h2>
        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Training Requirement
        </button>
      </div>

      <div className="grid lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <p className="text-gray-400 text-sm mb-2">Overall Completion</p>
          <p className="text-3xl font-bold text-white">96%</p>
          <div className="flex items-center gap-2 mt-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-green-400 text-sm">Above target</span>
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <p className="text-gray-400 text-sm mb-2">Mandatory Training</p>
          <p className="text-3xl font-bold text-white">4</p>
          <div className="flex items-center gap-2 mt-2">
            <Shield className="w-4 h-4 text-red-400" />
            <span className="text-red-400 text-sm">Required</span>
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <p className="text-gray-400 text-sm mb-2">Overdue Training</p>
          <p className="text-3xl font-bold text-white">0</p>
          <div className="flex items-center gap-2 mt-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span className="text-green-400 text-sm">All current</span>
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <p className="text-gray-400 text-sm mb-2">Next Due</p>
          <p className="text-2xl font-bold text-white">Sep 1</p>
          <div className="flex items-center gap-2 mt-2">
            <Calendar className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-sm">HIPAA Training</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {complianceTraining.map(training => (
          <div key={training.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold text-white">{training.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(training.status)}`}>
                    {training.status.charAt(0).toUpperCase() + training.status.slice(1)}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    training.category === 'mandatory' ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {training.category.replace('_', ' ').charAt(0).toUpperCase() + training.category.slice(1)}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-gray-400 text-sm">
                  <span>Frequency: {training.frequency}</span>
                  <span>•</span>
                  <span>Duration: {training.duration}</span>
                  <span>•</span>
                  <span>Provider: {training.provider}</span>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6 mb-4">
              <div>
                <h4 className="text-white font-semibold mb-3">Target Audience</h4>
                <p className="text-gray-300 capitalize">{training.targetAudience.replace('_', ' ')}</p>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-3">Completion Rate</h4>
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${training.completionRate}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-white font-semibold">{training.completionRate}%</span>
                </div>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-3">Schedule</h4>
                <div className="space-y-1 text-sm">
                  <p className="text-gray-400">Last: {training.lastCompleted}</p>
                  <p className="text-gray-400">Next Due: {training.nextDue}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t border-gray-700">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                View Training
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                Assign to Employees
              </button>
              <button className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm">
                Generate Report
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* View Selector */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Compliance Management</h1>
        <div className="flex gap-2 bg-gray-800 p-1 rounded-lg">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: Shield },
            { id: 'federal', label: 'Federal Laws', icon: Flag },
            { id: 'benefits', label: 'Benefits', icon: Heart },
            { id: 'audits', label: 'Audits', icon: FileCheck },
            { id: 'training', label: 'Training', icon: GraduationCap }
          ].map(view => {
            const Icon = view.icon;
            return (
              <button
                key={view.id}
                onClick={() => setActiveView(view.id)}
                className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${
                  activeView === view.id
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{view.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Render Active View */}
      {activeView === 'dashboard' && renderComplianceDashboard()}
      {activeView === 'federal' && renderFederalLaws()}
      {activeView === 'benefits' && renderBenefitsCompliance()}
      {activeView === 'audits' && renderAuditsSchedule()}
      {activeView === 'training' && renderTrainingCompliance()}

      {/* Compliance Detail Modal */}
      {showComplianceDetail && selectedCompliance && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white">{selectedCompliance.name}</h3>
                  <p className="text-gray-400 mt-1">Authority: {selectedCompliance.authority}</p>
                </div>
                <button
                  onClick={() => setShowComplianceDetail(false)}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-white font-semibold mb-4">Complete Requirements</h4>
                  <div className="space-y-3">
                    {selectedCompliance.requirements.map((req, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                        <span className="text-gray-300">{req}</span>
                      </div>
                    ))}
                  </div>
                  
                  <h4 className="text-white font-semibold mb-4 mt-6">Recent Updates</h4>
                  {selectedCompliance.recentUpdates && selectedCompliance.recentUpdates.map((update, index) => (
                    <div key={index} className="p-4 bg-gray-800 rounded-lg mb-3">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="text-white font-medium">Update: {update.date}</h5>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          update.impact === 'High' ? 'bg-red-500/20 text-red-400' :
                          update.impact === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-green-500/20 text-green-400'
                        }`}>
                          {update.impact} Impact
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm mb-2">{update.change}</p>
                      <p className="text-gray-500 text-xs">{update.impact}</p>
                    </div>
                  ))}
                </div>
                
                <div>
                  <h4 className="text-white font-semibold mb-4">Detailed Compliance Status</h4>
                  <div className="space-y-4">
                    {Object.entries(selectedCompliance.currentCompliance).map(([key, value]) => (
                      <div key={key} className="p-4 bg-gray-800 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="text-white font-medium capitalize">
                            {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                          </h5>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(value.status)}`}>
                            {value.status === 'na' ? 'N/A' : value.status.replace('_', ' ').charAt(0).toUpperCase() + value.status.slice(1)}
                          </span>
                        </div>
                        {value.lastCheck && (
                          <p className="text-gray-400 text-sm">Last checked: {value.lastCheck}</p>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
                    <h5 className="text-red-400 font-semibold mb-2">Penalties for Non-Compliance</h5>
                    <p className="text-red-300 text-sm">{selectedCompliance.penalties}</p>
                  </div>
                  
                  {selectedCompliance.auditHistory && (
                    <div className="mt-6">
                      <h4 className="text-white font-semibold mb-4">Audit History</h4>
                      {selectedCompliance.auditHistory.map((audit, index) => (
                        <div key={index} className="p-3 bg-gray-800 rounded-lg mb-3">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-white font-medium">{audit.type.replace('_', ' ').charAt(0).toUpperCase() + audit.type.slice(1)} Audit</span>
                            <span className="text-gray-400 text-sm">{audit.date}</span>
                          </div>
                          <p className="text-gray-400 text-sm">{audit.findings}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex gap-4 mt-8 pt-6 border-t border-gray-700">
                <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold">
                  Update Compliance Status
                </button>
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                  Schedule Audit
                </button>
                <button className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors font-semibold">
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}