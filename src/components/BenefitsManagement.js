'use client';

import { useState, useEffect } from 'react';
import { 
  Shield, Heart, DollarSign, Calendar, Users, TrendingUp, Award,
  Plus, Edit3, Eye, Download, Search, Filter, CheckCircle, Clock,
  AlertTriangle, Info, User, Building, Globe, Star, Flag, BookOpen,
  Archive, RotateCcw, Send, MessageSquare, Bookmark, Tag, Share2,
  Copy, ExternalLink, Trash2, Settings, Brain, Zap, Activity,
  BarChart3, PieChart, Target, Briefcase, Phone, Mail, MapPin,
  X, ChevronRight, ChevronDown, ArrowUpRight, RefreshCw, Database,
  Calculator, CreditCard, Wallet, Banknote, Receipt, FileText,
  Stethoscope, Pill, Car, Home, Umbrella, Baby, GraduationCap
} from 'lucide-react';

export default function BenefitsManagement() {
  const [activeView, setActiveView] = useState('overview');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showEnrollmentModal, setShowEnrollmentModal] = useState(false);
  const [showPlanDetails, setShowPlanDetails] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showHIPAAModal, setShowHIPAAModal] = useState(false);
  const [hipaaAuditLog, setHipaaAuditLog] = useState([]);

  // Comprehensive benefits data
  const benefitsOverview = {
    totalParticipants: 45,
    enrollmentRate: 96,
    totalCost: 2250000,
    employeeCost: 675000,
    employerCost: 1575000,
    averageCostPerEmployee: 50000,
    openEnrollmentPeriod: {
      start: '2025-11-01',
      end: '2025-11-30',
      status: 'completed'
    },
    nextEnrollment: '2025-11-01'
  };

  const benefitsPlans = [
    {
      id: 1,
      category: 'health',
      name: 'Premium Health Plan',
      type: 'PPO',
      provider: 'Blue Cross Blue Shield',
      coverage: 'Individual + Family',
      monthlyPremium: {
        employee: 450,
        employer: 850,
        total: 1300
      },
      deductible: {
        individual: 1500,
        family: 3000
      },
      copay: {
        primaryCare: 25,
        specialist: 50,
        emergency: 300
      },
      outOfPocketMax: {
        individual: 6000,
        family: 12000
      },
      enrolled: 32,
      capacity: 50,
      benefits: [
        'Comprehensive medical coverage',
        'Prescription drug coverage',
        'Mental health services',
        'Preventive care at 100%',
        'Telehealth services'
      ],
      status: 'active',
      effectiveDate: '2025-01-01',
      renewalDate: '2025-01-01'
    },
    {
      id: 2,
      category: 'health',
      name: 'Standard Health Plan',
      type: 'HMO',
      provider: 'Kaiser Permanente',
      coverage: 'Individual + Family',
      monthlyPremium: {
        employee: 300,
        employer: 600,
        total: 900
      },
      deductible: {
        individual: 2500,
        family: 5000
      },
      copay: {
        primaryCare: 30,
        specialist: 60,
        emergency: 400
      },
      outOfPocketMax: {
        individual: 7500,
        family: 15000
      },
      enrolled: 13,
      capacity: 30,
      benefits: [
        'Basic medical coverage',
        'Generic prescription coverage',
        'Preventive care included',
        'Network restrictions apply'
      ],
      status: 'active',
      effectiveDate: '2025-01-01',
      renewalDate: '2025-01-01'
    },
    {
      id: 3,
      category: 'dental',
      name: 'Comprehensive Dental',
      type: 'PPO',
      provider: 'Delta Dental',
      coverage: 'Individual + Family',
      monthlyPremium: {
        employee: 45,
        employer: 85,
        total: 130
      },
      benefits: [
        'Preventive care at 100%',
        'Basic services at 80%',
        'Major services at 50%',
        'Orthodontics at 50%',
        'Annual maximum: $2,000'
      ],
      enrolled: 38,
      capacity: 50,
      status: 'active',
      effectiveDate: '2025-01-01',
      renewalDate: '2025-01-01'
    },
    {
      id: 4,
      category: 'vision',
      name: 'Vision Care Plan',
      type: 'Vision',
      provider: 'VSP',
      coverage: 'Individual + Family',
      monthlyPremium: {
        employee: 15,
        employer: 25,
        total: 40
      },
      benefits: [
        'Annual eye exam covered',
        '$200 frame allowance',
        'Lens coverage included',
        'Contact lens allowance',
        '20% discount on additional pairs'
      ],
      enrolled: 35,
      capacity: 50,
      status: 'active',
      effectiveDate: '2025-01-01',
      renewalDate: '2025-01-01'
    },
    {
      id: 5,
      category: 'retirement',
      name: '401(k) Retirement Plan',
      type: '401k',
      provider: 'Fidelity',
      coverage: 'Individual',
      employerMatch: {
        percentage: 6,
        vestingSchedule: 'Immediate',
        maxMatch: 5000
      },
      contribution: {
        employeeMax: 23000,
        catchUpMax: 7500,
        totalMax: 30500
      },
      enrolled: 42,
      capacity: 50,
      benefits: [
        '6% employer match',
        'Immediate vesting',
        'Diverse investment options',
        'Financial planning tools',
        'Loan options available'
      ],
      status: 'active',
      effectiveDate: '2025-01-01',
      renewalDate: '2025-01-01'
    },
    {
      id: 6,
      category: 'life',
      name: 'Life & Disability Insurance',
      type: 'Group Life',
      provider: 'MetLife',
      coverage: 'Individual + Family',
      monthlyPremium: {
        employee: 25,
        employer: 45,
        total: 70
      },
      coverage_amount: {
        life: '2x Annual Salary',
        disability: '60% of Salary',
        maxBenefit: 250000
      },
      enrolled: 45,
      capacity: 50,
      benefits: [
        'Basic life insurance included',
        'Short-term disability',
        'Long-term disability',
        'Accidental death coverage',
        'Optional additional coverage'
      ],
      status: 'active',
      effectiveDate: '2025-01-01',
      renewalDate: '2025-01-01'
    },
    {
      id: 7,
      category: 'fsa',
      name: 'Flexible Spending Account',
      type: 'FSA',
      provider: 'WageWorks',
      coverage: 'Individual',
      annualLimit: {
        healthcare: 3200,
        dependentCare: 5000
      },
      enrolled: 28,
      capacity: 50,
      benefits: [
        'Pre-tax healthcare expenses',
        'Dependent care expenses',
        'Debit card provided',
        'Online expense management',
        'Mobile app access'
      ],
      status: 'active',
      effectiveDate: '2025-01-01',
      renewalDate: '2025-01-01'
    }
  ];

  const employeeBenefits = [
    {
      employeeId: 1,
      employeeName: 'Michael Chen',
      position: 'Senior Associate',
      enrollmentStatus: 'enrolled',
      enrollmentDate: '2025-01-15',
      dependents: 2,
      totalMonthlyCost: 1125,
      employeeCost: 375,
      employerCost: 750,
      plans: [
        { planId: 1, planName: 'Premium Health Plan', status: 'active' },
        { planId: 3, planName: 'Comprehensive Dental', status: 'active' },
        { planId: 4, planName: 'Vision Care Plan', status: 'active' },
        { planId: 5, planName: '401(k) Retirement Plan', status: 'active', contribution: '15%' },
        { planId: 6, planName: 'Life & Disability Insurance', status: 'active' },
        { planId: 7, planName: 'Flexible Spending Account', status: 'active', amount: 2500 }
      ],
      beneficiaries: [
        { name: 'Lisa Chen', relationship: 'Spouse', percentage: 60 },
        { name: 'Emma Chen', relationship: 'Child', percentage: 40 }
      ],
      lastUpdated: '2025-12-01'
    },
    {
      employeeId: 2,
      employeeName: 'Jennifer Davis',
      position: 'Legal Assistant',
      enrollmentStatus: 'enrolled',
      enrollmentDate: '2025-11-01',
      dependents: 0,
      totalMonthlyCost: 425,
      employeeCost: 175,
      employerCost: 250,
      plans: [
        { planId: 2, planName: 'Standard Health Plan', status: 'active' },
        { planId: 3, planName: 'Comprehensive Dental', status: 'active' },
        { planId: 5, planName: '401(k) Retirement Plan', status: 'active', contribution: '8%' },
        { planId: 6, planName: 'Life & Disability Insurance', status: 'active' }
      ],
      beneficiaries: [
        { name: 'Robert Davis', relationship: 'Parent', percentage: 100 }
      ],
      lastUpdated: '2025-11-15'
    },
    {
      employeeId: 3,
      employeeName: 'Sarah Mitchell',
      position: 'HR Director',
      enrollmentStatus: 'enrolled',
      enrollmentDate: '2025-01-01',
      dependents: 1,
      totalMonthlyCost: 950,
      employeeCost: 285,
      employerCost: 665,
      plans: [
        { planId: 1, planName: 'Premium Health Plan', status: 'active' },
        { planId: 3, planName: 'Comprehensive Dental', status: 'active' },
        { planId: 4, planName: 'Vision Care Plan', status: 'active' },
        { planId: 5, planName: '401(k) Retirement Plan', status: 'active', contribution: '12%' },
        { planId: 6, planName: 'Life & Disability Insurance', status: 'active' },
        { planId: 7, planName: 'Flexible Spending Account', status: 'active', amount: 3000 }
      ],
      beneficiaries: [
        { name: 'David Mitchell', relationship: 'Spouse', percentage: 100 }
      ],
      lastUpdated: '2025-09-15'
    }
  ];

  const upcomingEvents = [
    {
      type: 'enrollment',
      title: 'Open Enrollment 2025',
      date: '2025-11-01',
      description: 'Annual benefits enrollment period begins',
      status: 'scheduled'
    },
    {
      type: 'renewal',
      title: 'Health Plan Renewal',
      date: '2025-01-01',
      description: 'All health plans renew for 2025',
      status: 'upcoming'
    },
    {
      type: 'education',
      title: 'Benefits Education Session',
      date: '2025-02-15',
      description: 'Quarterly benefits education and Q&A',
      status: 'scheduled'
    },
    {
      type: 'audit',
      title: 'Benefits Compliance Audit',
      date: '2025-03-01',
      description: 'Annual compliance review and audit',
      status: 'scheduled'
    }
  ];

  const benefitsAnalytics = {
    utilizationRates: {
      health: 87,
      dental: 72,
      vision: 45,
      retirement: 89,
      life: 100,
      fsa: 63
    },
    costTrends: {
      current: 2250000,
      previous: 2100000,
      change: 7.1,
      projectedNext: 2400000
    },
    employeeSatisfaction: {
      overall: 4.3,
      health: 4.5,
      dental: 4.2,
      vision: 4.0,
      retirement: 4.6,
      communication: 4.1
    },
    claims: {
      totalClaims: 342,
      totalAmount: 485000,
      averageClaimAmount: 1418,
      pendingClaims: 23
    }
  };

  // HIPAA Compliance Data and Functions
  const hipaaCompliance = {
    status: 'compliant',
    lastAudit: '2025-12-01',
    nextAudit: '2025-06-01',
    businessAssociates: 15,
    riskAssessmentScore: 92,
    securityIncidents: 0,
    employeeTrainingCompletion: 98,
    dataBreaches: 0,
    accessControls: {
      roleBasedAccess: true,
      minimumNecessary: true,
      auditLogs: true,
      encryptionAtRest: true,
      encryptionInTransit: true,
      twoFactorAuth: true
    },
    policies: {
      privacyPolicy: { updated: '2025-11-01', status: 'current' },
      securityPolicy: { updated: '2025-11-01', status: 'current' },
      breachNotification: { updated: '2025-10-15', status: 'current' },
      businessAssociate: { updated: '2025-09-01', status: 'current' }
    }
  };

  const logHIPAAAccess = (action, employeeId = null, details = '') => {
    const logEntry = {
      timestamp: new Date().toISOString(),
      user: 'HR Admin', // In production, get from auth context
      action: action,
      employeeId: employeeId,
      details: details,
      ipAddress: 'XXX.XXX.XXX.XXX' // Anonymized for demo
    };
    setHipaaAuditLog(prev => [logEntry, ...prev].slice(0, 100)); // Keep last 100 entries
  };

  const getPlanCategoryIcon = (category) => {
    switch(category) {
      case 'health': return Stethoscope;
      case 'dental': return Heart;
      case 'vision': return Eye;
      case 'retirement': return DollarSign;
      case 'life': return Shield;
      case 'fsa': return Wallet;
      default: return Award;
    }
  };

  const getPlanCategoryColor = (category) => {
    switch(category) {
      case 'health': return 'bg-blue-500/20 text-blue-400';
      case 'dental': return 'bg-green-500/20 text-green-400';
      case 'vision': return 'bg-purple-500/20 text-purple-400';
      case 'retirement': return 'bg-orange-500/20 text-orange-400';
      case 'life': return 'bg-red-500/20 text-red-400';
      case 'fsa': return 'bg-teal-500/20 text-teal-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const renderBenefitsOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-900/30 to-blue-800/30 border border-blue-500/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-blue-300 text-sm font-semibold">Total Participants</p>
              <p className="text-3xl font-bold text-white">{benefitsOverview.totalParticipants}</p>
            </div>
            <Users className="w-10 h-10 text-blue-400" />
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-green-400 text-sm font-semibold">{benefitsOverview.enrollmentRate}%</span>
            <span className="text-gray-400 text-sm">enrollment rate</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-900/30 to-green-800/30 border border-green-500/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-green-300 text-sm font-semibold">Total Annual Cost</p>
              <p className="text-3xl font-bold text-white">${(benefitsOverview.totalCost / 1000000).toFixed(1)}M</p>
            </div>
            <DollarSign className="w-10 h-10 text-green-400" />
          </div>
          <div className="flex items-center gap-2">
            <Calculator className="w-4 h-4 text-green-400" />
            <span className="text-green-400 text-sm font-semibold">${benefitsOverview.averageCostPerEmployee.toLocaleString()}</span>
            <span className="text-gray-400 text-sm">per employee</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-900/30 to-purple-800/30 border border-purple-500/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-purple-300 text-sm font-semibold">Employer Cost</p>
              <p className="text-3xl font-bold text-white">${(benefitsOverview.employerCost / 1000000).toFixed(1)}M</p>
            </div>
            <Building className="w-10 h-10 text-purple-400" />
          </div>
          <div className="flex items-center gap-2">
            <PieChart className="w-4 h-4 text-purple-400" />
            <span className="text-purple-400 text-sm font-semibold">70%</span>
            <span className="text-gray-400 text-sm">of total cost</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-900/30 to-orange-800/30 border border-orange-500/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-orange-300 text-sm font-semibold">Employee Cost</p>
              <p className="text-3xl font-bold text-white">${(benefitsOverview.employeeCost / 1000).toFixed(0)}K</p>
            </div>
            <Wallet className="w-10 h-10 text-orange-400" />
          </div>
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-orange-400" />
            <span className="text-orange-400 text-sm font-semibold">30%</span>
            <span className="text-gray-400 text-sm">of total cost</span>
          </div>
        </div>
      </div>

      {/* Benefits Plans Grid */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-6">Available Benefits Plans</h3>
        <div className="grid lg:grid-cols-2 gap-6">
          {benefitsPlans.map(plan => {
            const Icon = getPlanCategoryIcon(plan.category);
            return (
              <div key={plan.id} className="p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer"
                   onClick={() => {
                     setSelectedPlan(plan);
                     setShowPlanDetails(true);
                   }}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getPlanCategoryColor(plan.category)}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{plan.name}</h4>
                      <p className="text-gray-400 text-sm">{plan.provider}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div>
                    <p className="text-gray-400">Monthly Premium</p>
                    <p className="text-white font-semibold">${plan.monthlyPremium?.total.toLocaleString() || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Enrolled</p>
                    <p className="text-white font-semibold">{plan.enrolled}/{plan.capacity}</p>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Enrollment</span>
                    <span className="text-white">{Math.round((plan.enrolled / plan.capacity) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div
                      className="bg-purple-500 h-2 rounded-full"
                      style={{ width: `${(plan.enrolled / plan.capacity) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getPlanCategoryColor(plan.category)}`}>
                    {plan.category.charAt(0).toUpperCase() + plan.category.slice(1)}
                  </span>
                  <span className="text-gray-400 text-sm">{plan.type}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-6">Upcoming Events</h3>
        <div className="space-y-4">
          {upcomingEvents.map((event, index) => (
            <div key={index} className="flex items-center gap-4 p-4 bg-gray-700 rounded-lg">
              <div className="w-12 h-12 bg-purple-900/30 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-purple-400" />
              </div>
              <div className="flex-1">
                <h4 className="text-white font-semibold">{event.title}</h4>
                <p className="text-gray-400 text-sm">{event.description}</p>
              </div>
              <div className="text-right">
                <p className="text-white font-semibold">{event.date}</p>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  event.status === 'scheduled' ? 'bg-blue-500/20 text-blue-400' : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderEmployeeEnrollments = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Employee Enrollments</h2>
        <button
          onClick={() => setShowEnrollmentModal(true)}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Enroll Employee
        </button>
      </div>

      <div className="space-y-4">
        {employeeBenefits.map(employee => (
          <div key={employee.employeeId} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">
                    {employee.employeeName.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{employee.employeeName}</h3>
                  <p className="text-gray-400">{employee.position}</p>
                  <p className="text-gray-500 text-sm">Enrolled: {employee.enrollmentDate}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white font-bold text-lg">${employee.totalMonthlyCost.toLocaleString()}</p>
                <p className="text-gray-400 text-sm">Monthly Total</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center p-4 bg-gray-700 rounded-lg">
                <p className="text-2xl font-bold text-white">{employee.dependents}</p>
                <p className="text-gray-400 text-sm">Dependents</p>
              </div>
              <div className="text-center p-4 bg-gray-700 rounded-lg">
                <p className="text-2xl font-bold text-white">${employee.employeeCost}</p>
                <p className="text-gray-400 text-sm">Employee Cost</p>
              </div>
              <div className="text-center p-4 bg-gray-700 rounded-lg">
                <p className="text-2xl font-bold text-white">${employee.employerCost}</p>
                <p className="text-gray-400 text-sm">Employer Cost</p>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-white font-semibold">Enrolled Plans:</h4>
              <div className="grid md:grid-cols-2 gap-3">
                {employee.plans.map((plan, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                    <div>
                      <p className="text-white font-medium">{plan.planName}</p>
                      {plan.contribution && (
                        <p className="text-gray-400 text-sm">Contribution: {plan.contribution}</p>
                      )}
                      {plan.amount && (
                        <p className="text-gray-400 text-sm">Annual Amount: ${plan.amount}</p>
                      )}
                    </div>
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs font-medium">
                      {plan.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2 mt-6 pt-4 border-t border-gray-600">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                View Details
              </button>
              <button className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm">
                Edit Enrollment
              </button>
              <button className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm">
                Generate Summary
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <p className="text-gray-400 text-sm mb-2">Utilization Rate</p>
          <p className="text-3xl font-bold text-white">84%</p>
          <div className="flex items-center gap-2 mt-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-green-400 text-sm">+3% vs last year</span>
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <p className="text-gray-400 text-sm mb-2">Employee Satisfaction</p>
          <p className="text-3xl font-bold text-white">{benefitsAnalytics.employeeSatisfaction.overall}/5</p>
          <div className="flex items-center gap-2 mt-2">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-yellow-400 text-sm">Excellent</span>
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <p className="text-gray-400 text-sm mb-2">Total Claims</p>
          <p className="text-3xl font-bold text-white">{benefitsAnalytics.claims.totalClaims}</p>
          <div className="flex items-center gap-2 mt-2">
            <FileText className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-sm">${benefitsAnalytics.claims.averageClaimAmount} avg</span>
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <p className="text-gray-400 text-sm mb-2">Cost Growth</p>
          <p className="text-3xl font-bold text-white">+{benefitsAnalytics.costTrends.change}%</p>
          <div className="flex items-center gap-2 mt-2">
            <TrendingUp className="w-4 h-4 text-orange-400" />
            <span className="text-orange-400 text-sm">Year over year</span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-white font-semibold mb-4">Plan Utilization Rates</h3>
          <div className="space-y-4">
            {Object.entries(benefitsAnalytics.utilizationRates).map(([plan, rate]) => (
              <div key={plan} className="flex items-center justify-between">
                <span className="text-gray-400 capitalize">{plan}</span>
                <div className="flex items-center gap-3">
                  <div className="w-24 bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-purple-500 h-2 rounded-full"
                      style={{ width: `${rate}%` }}
                    />
                  </div>
                  <span className="text-white font-semibold w-12">{rate}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-white font-semibold mb-4">Cost Breakdown</h3>
          <div className="h-64 flex items-center justify-center">
            <PieChart className="w-16 h-16 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* View Selector */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Benefits Administration</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setShowHIPAAModal(true)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
          >
            <Shield className="w-4 h-4" />
            HIPAA Compliance
          </button>
          <div className="flex gap-2 bg-gray-800 p-1 rounded-lg">
            {[
              { id: 'overview', label: 'Overview', icon: Award },
              { id: 'enrollments', label: 'Enrollments', icon: Users },
              { id: 'plans', label: 'Plans', icon: Shield },
              { id: 'analytics', label: 'Analytics', icon: BarChart3 }
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
      </div>

      {/* Render Active View */}
      {activeView === 'overview' && renderBenefitsOverview()}
      {activeView === 'enrollments' && renderEmployeeEnrollments()}
      {activeView === 'plans' && (
        <div className="bg-gray-800 rounded-xl p-8 text-center">
          <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Plan Management</h3>
          <p className="text-gray-400">Detailed plan configuration and management tools</p>
        </div>
      )}
      {activeView === 'analytics' && renderAnalytics()}

      {/* Plan Details Modal */}
      {showPlanDetails && selectedPlan && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white">{selectedPlan.name}</h3>
                  <p className="text-gray-400 mt-1">{selectedPlan.provider} • {selectedPlan.type}</p>
                </div>
                <button
                  onClick={() => setShowPlanDetails(false)}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-white font-semibold mb-4">Plan Details</h4>
                  <div className="space-y-4">
                    {selectedPlan.monthlyPremium && (
                      <div className="p-4 bg-gray-800 rounded-lg">
                        <h5 className="text-white font-medium mb-2">Monthly Premium</h5>
                        <div className="grid grid-cols-3 gap-3 text-sm">
                          <div>
                            <p className="text-gray-400">Employee</p>
                            <p className="text-white font-semibold">${selectedPlan.monthlyPremium.employee}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Employer</p>
                            <p className="text-white font-semibold">${selectedPlan.monthlyPremium.employer}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Total</p>
                            <p className="text-white font-semibold">${selectedPlan.monthlyPremium.total}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedPlan.deductible && (
                      <div className="p-4 bg-gray-800 rounded-lg">
                        <h5 className="text-white font-medium mb-2">Deductible</h5>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <p className="text-gray-400">Individual</p>
                            <p className="text-white font-semibold">${selectedPlan.deductible.individual.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Family</p>
                            <p className="text-white font-semibold">${selectedPlan.deductible.family.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedPlan.copay && (
                      <div className="p-4 bg-gray-800 rounded-lg">
                        <h5 className="text-white font-medium mb-2">Copayments</h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Primary Care</span>
                            <span className="text-white">${selectedPlan.copay.primaryCare}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Specialist</span>
                            <span className="text-white">${selectedPlan.copay.specialist}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Emergency</span>
                            <span className="text-white">${selectedPlan.copay.emergency}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-white font-semibold mb-4">Benefits & Features</h4>
                  <div className="space-y-3">
                    {selectedPlan.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                        <span className="text-white">{benefit}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 bg-gray-800 rounded-lg">
                    <h5 className="text-white font-medium mb-3">Enrollment Summary</h5>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400">Enrolled</span>
                      <span className="text-white font-semibold">{selectedPlan.enrolled}/{selectedPlan.capacity}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-purple-500 h-2 rounded-full"
                        style={{ width: `${(selectedPlan.enrolled / selectedPlan.capacity) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4 mt-8 pt-6 border-t border-gray-700">
                <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold">
                  Enroll Employees
                </button>
                <button className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors font-semibold">
                  Edit Plan
                </button>
                <button className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors font-semibold">
                  View Reports
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* HIPAA Compliance Modal */}
      {showHIPAAModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white">HIPAA Compliance Dashboard</h3>
                  <p className="text-gray-400 mt-1">Health Insurance Portability and Accountability Act Compliance</p>
                </div>
                <button
                  onClick={() => setShowHIPAAModal(false)}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {/* Compliance Status Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-r from-green-900/30 to-green-800/30 border border-green-500/30 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-green-300 text-sm font-semibold">Compliance Status</p>
                      <p className="text-3xl font-bold text-white capitalize">{hipaaCompliance.status}</p>
                    </div>
                    <CheckCircle className="w-10 h-10 text-green-400" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 text-sm font-semibold">Last Audit: {hipaaCompliance.lastAudit}</span>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-900/30 to-blue-800/30 border border-blue-500/30 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-blue-300 text-sm font-semibold">Risk Score</p>
                      <p className="text-3xl font-bold text-white">{hipaaCompliance.riskAssessmentScore}%</p>
                    </div>
                    <Shield className="w-10 h-10 text-blue-400" />
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-blue-400" />
                    <span className="text-blue-400 text-sm font-semibold">Low Risk</span>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-orange-900/30 to-orange-800/30 border border-orange-500/30 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-orange-300 text-sm font-semibold">Training Completion</p>
                      <p className="text-3xl font-bold text-white">{hipaaCompliance.employeeTrainingCompletion}%</p>
                    </div>
                    <GraduationCap className="w-10 h-10 text-orange-400" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-orange-400" />
                    <span className="text-orange-400 text-sm font-semibold">46/47 Employees</span>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-red-900/30 to-red-800/30 border border-red-500/30 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-red-300 text-sm font-semibold">Security Incidents</p>
                      <p className="text-3xl font-bold text-white">{hipaaCompliance.securityIncidents}</p>
                    </div>
                    <AlertTriangle className="w-10 h-10 text-red-400" />
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 text-sm font-semibold">No breaches in 2025</span>
                  </div>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Security Controls */}
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-white font-semibold mb-4">Security Controls</h3>
                  <div className="space-y-4">
                    {Object.entries(hipaaCompliance.accessControls).map(([control, enabled]) => (
                      <div key={control} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                        <div className="flex items-center gap-3">
                          {enabled ? (
                            <CheckCircle className="w-5 h-5 text-green-400" />
                          ) : (
                            <X className="w-5 h-5 text-red-400" />
                          )}
                          <span className="text-white capitalize">
                            {control.replace(/([A-Z])/g, ' $1').toLowerCase()}
                          </span>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          enabled ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                        }`}>
                          {enabled ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* HIPAA Policies */}
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-white font-semibold mb-4">HIPAA Policies</h3>
                  <div className="space-y-4">
                    {Object.entries(hipaaCompliance.policies).map(([policy, info]) => (
                      <div key={policy} className="p-3 bg-gray-700 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-medium capitalize">
                            {policy.replace(/([A-Z])/g, ' $1')}
                          </span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            info.status === 'current' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {info.status}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm">Last updated: {info.updated}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Privacy Notice */}
              <div className="mt-8 p-6 bg-blue-900/20 border border-blue-500/30 rounded-xl">
                <div className="flex items-start gap-3">
                  <Info className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-blue-400 font-semibold mb-2">HIPAA Privacy Protection</h4>
                    <p className="text-blue-300 text-sm leading-relaxed mb-4">
                      All Protected Health Information (PHI) is handled in accordance with HIPAA Privacy and Security Rules. 
                      Access to employee health information is restricted to authorized personnel only and logged for audit purposes.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div className="bg-blue-800/30 p-3 rounded-lg">
                        <p className="text-blue-300 font-medium">Data Encryption</p>
                        <p className="text-blue-200">AES-256 at rest & in transit</p>
                      </div>
                      <div className="bg-blue-800/30 p-3 rounded-lg">
                        <p className="text-blue-300 font-medium">Access Logging</p>
                        <p className="text-blue-200">All PHI access is audited</p>
                      </div>
                      <div className="bg-blue-800/30 p-3 rounded-lg">
                        <p className="text-blue-300 font-medium">Minimum Necessary</p>
                        <p className="text-blue-200">Role-based access controls</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-8 pt-6 border-t border-gray-700">
                <button className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold">
                  Conduct Risk Assessment
                </button>
                <button className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors font-semibold">
                  View Audit Logs
                </button>
                <button className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors font-semibold">
                  Generate Compliance Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}