'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  UserPlus, FileText, CheckCircle, Clock, AlertCircle, 
  Upload, Calendar, Users, Briefcase, Shield, Award,
  Mail, Phone, MapPin, Building, CreditCard, Heart,
  Brain, Zap, Lock, BarChart3, Bot, Scan, Target,
  TrendingUp, Globe, Database, Settings, Star,
  Gauge, UserCheck, BookOpen, Camera, Headphones,
  Puzzle, MessageSquare, Lightbulb, Rocket, Gem,
  Activity, PieChart, LineChart, Radar, Filter,
  Search, Download, Eye, Edit, Trash2, Plus,
  MoreVertical, ChevronDown, ChevronRight, Play,
  Pause, RefreshCw, Bell, BellRing, Wifi, WifiOff,
  CheckSquare, Square, DollarSign, Percent, Hash,
  FileCheck, FilePlus, FileSearch, FolderOpen,
  Key, Fingerprint, ShieldCheck, ShieldAlert,
  UserX, UserCheck2, Users2, Crown, Sparkles, Scale
} from 'lucide-react';
import SecureNavigation from './SecureNavigation';
import { useSecureNavigation } from '../hooks/useSecureNavigation';

export default function HROnboarding() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { navigateTo, currentUser } = useSecureNavigation();
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeSubTab, setActiveSubTab] = useState('overview');
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showNewHireForm, setShowNewHireForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedResume, setSelectedResume] = useState(null);
  const [showAIAnalysis, setShowAIAnalysis] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);

  // Authentication and tab management
  useEffect(() => {
    if (currentUser) {
      // Check if user has HR access
      const hrRoles = ['Super Admin', 'HR Administrator', 'HR Manager', 'HR Specialist'];
      const hasHRAccess = hrRoles.includes(currentUser.role) || currentUser.role === 'Partner Attorney';
      setHasAccess(hasHRAccess);
      
      if (!hasHRAccess) {
        navigateTo('/unauthorized');
        return;
      }
      
      // Check for tab parameter in URL
      const tabParam = searchParams.get('tab');
      if (tabParam) {
        setActiveTab(tabParam);
      }
    } else {
      navigateTo('/login');
    }
  }, [currentUser, searchParams, navigateTo]);

  // Handle tab changes with URL updates
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    // Update URL without page reload
    const url = new URL(window.location);
    url.searchParams.set('tab', tabId);
    window.history.pushState({}, '', url);
  };

  // Comprehensive mock data
  const hrModules = [
    { id: 'dashboard', label: 'Executive Dashboard', icon: Gauge, color: 'text-blue-400' },
    { id: 'recruitment', label: 'AI Recruitment Hub', icon: Brain, color: 'text-purple-400' },
    { id: 'security', label: 'Security Vault', icon: Lock, color: 'text-red-400' },
    { id: 'analytics', label: 'Analytics Engine', icon: BarChart3, color: 'text-green-400' },
    { id: 'employee-portal', label: 'Employee Portal', icon: Users, color: 'text-orange-400' },
    { id: 'compliance', label: 'Compliance Center', icon: Shield, color: 'text-yellow-400' },
    { id: 'legal-specific', label: 'Legal Industry Tools', icon: Scale, color: 'text-indigo-400' },
    { id: 'integrations', label: 'Integration Platform', icon: Puzzle, color: 'text-pink-400' }
  ];

  const candidates = [
    {
      id: 1,
      name: 'Jennifer Martinez',
      email: 'j.martinez@email.com',
      position: 'Senior Associate Attorney',
      aiScore: 94,
      status: 'shortlisted',
      experience: '8 years',
      education: 'Harvard Law School, JD',
      location: 'Los Angeles, CA',
      skills: ['Corporate Law', 'Contract Negotiation', 'Litigation', 'M&A'],
      interviewStage: 'Final Round',
      salary_expectation: '$180,000',
      background_status: 'cleared',
      references_verified: true,
      cultural_fit: 92,
      photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jennifer'
    },
    {
      id: 2,
      name: 'Marcus Johnson',
      email: 'm.johnson@email.com',
      position: 'Paralegal',
      aiScore: 87,
      status: 'interviewing',
      experience: '5 years',
      education: 'UCLA Paralegal Certificate',
      location: 'Long Beach, CA',
      skills: ['Legal Research', 'Document Preparation', 'Client Communication'],
      interviewStage: 'Second Round',
      salary_expectation: '$65,000',
      background_status: 'in_progress',
      references_verified: false,
      cultural_fit: 89,
      photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus'
    }
  ];

  const securityLogs = [
    {
      id: 1,
      timestamp: '2025-01-18 14:30:22',
      user: 'Douglas Hicks',
      action: 'Accessed salary data',
      file: 'Attorney_Compensation_2025.pdf',
      ip: '192.168.1.100',
      status: 'authorized'
    },
    {
      id: 2,
      timestamp: '2025-01-18 14:25:18',
      user: 'Lisa Martinez',
      action: 'Downloaded employee handbook',
      file: 'Employee_Handbook_v2025.pdf',
      ip: '192.168.1.105',
      status: 'authorized'
    },
    {
      id: 3,
      timestamp: '2025-01-18 14:20:45',
      user: 'Failed Login Attempt',
      action: 'Invalid credentials',
      file: 'HR Portal Access',
      ip: '203.45.67.89',
      status: 'blocked'
    }
  ];

  const analyticsData = [
    {
      metric: 'Employee Retention Rate',
      value: '94.2%',
      trend: '+2.8%',
      status: 'excellent',
      benchmark: '92%',
      prediction: '95.1% (next quarter)'
    },
    {
      metric: 'Time to Hire',
      value: '23 days',
      trend: '-5 days',
      status: 'good',
      benchmark: '28 days',
      prediction: '21 days (next month)'
    },
    {
      metric: 'Cost per Hire',
      value: '$12,400',
      trend: '-$800',
      status: 'good',
      benchmark: '$15,200',
      prediction: '$11,900 (optimized)'
    },
    {
      metric: 'Employee Satisfaction',
      value: '4.7/5.0',
      trend: '+0.2',
      status: 'excellent',
      benchmark: '4.3/5.0',
      prediction: '4.8/5.0 (after initiatives)'
    }
  ];

  const integrations = [
    {
      name: 'ADP Payroll',
      status: 'connected',
      lastSync: '2 minutes ago',
      records: '47 employees',
      icon: DollarSign,
      health: 'excellent'
    },
    {
      name: 'Google Workspace',
      status: 'connected',
      lastSync: '5 minutes ago',
      records: '52 accounts',
      icon: Mail,
      health: 'excellent'
    },
    {
      name: 'Sterling Background',
      status: 'connected',
      lastSync: '1 hour ago',
      records: '15 pending checks',
      icon: ShieldCheck,
      health: 'good'
    },
    {
      name: 'LinkedIn Learning',
      status: 'error',
      lastSync: 'Failed 2 hours ago',
      records: 'Connection timeout',
      icon: BookOpen,
      health: 'error'
    }
  ];

  const newHires = [
    {
      id: 1,
      name: 'Sarah Mitchell',
      position: 'Associate Attorney',
      startDate: '2025-01-22',
      status: 'in-progress',
      completedSteps: 5,
      totalSteps: 12,
      mentor: 'James Wilson',
      department: 'Civil Rights',
      photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
    },
    {
      id: 2,
      name: 'Michael Chen',
      position: 'Paralegal',
      startDate: '2025-01-25',
      status: 'pending',
      completedSteps: 2,
      totalSteps: 10,
      mentor: 'Lisa Martinez',
      department: 'Personal Injury',
      photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael'
    }
  ];

  const onboardingChecklist = [
    { id: 1, task: 'Personal Information Form', category: 'Documentation', required: true, status: 'completed' },
    { id: 2, task: 'I-9 Employment Eligibility', category: 'Documentation', required: true, status: 'completed' },
    { id: 3, task: 'W-4 Tax Withholding', category: 'Documentation', required: true, status: 'completed' },
    { id: 4, task: 'Direct Deposit Setup', category: 'Payroll', required: true, status: 'completed' },
    { id: 5, task: 'Benefits Enrollment', category: 'Benefits', required: true, status: 'completed' },
    { id: 6, task: 'Employment Agreement', category: 'Legal', required: true, status: 'pending' },
    { id: 7, task: 'Confidentiality Agreement', category: 'Legal', required: true, status: 'pending' },
    { id: 8, task: 'IT Equipment Assignment', category: 'IT', required: true, status: 'pending' },
    { id: 9, task: 'Email & System Access', category: 'IT', required: true, status: 'pending' },
    { id: 10, task: 'Office Tour', category: 'Orientation', required: false, status: 'pending' },
    { id: 11, task: 'Team Introduction', category: 'Orientation', required: false, status: 'pending' },
    { id: 12, task: 'Training Schedule', category: 'Training', required: true, status: 'pending' }
  ];

  const complianceItems = [
    {
      id: 1,
      employee: 'Douglas Hicks',
      item: 'Bar License Renewal',
      dueDate: '2025-03-15',
      daysRemaining: 56,
      status: 'warning',
      barNumber: 'CA-123456',
      lastRenewed: '2025-03-15'
    },
    {
      id: 2,
      employee: 'Jamon Hicks',
      item: 'CLE Credits',
      dueDate: '2025-02-28',
      daysRemaining: 41,
      status: 'warning',
      creditsNeeded: 8,
      creditsCompleted: 5
    },
    {
      id: 3,
      employee: 'James Wilson',
      item: 'Malpractice Insurance',
      dueDate: '2025-04-01',
      daysRemaining: 73,
      status: 'good',
      policyNumber: 'MP-789012',
      coverage: '$5M/$10M'
    },
    {
      id: 4,
      employee: 'Lisa Martinez',
      item: 'Ethics Training',
      dueDate: '2025-01-31',
      daysRemaining: 13,
      status: 'critical',
      hoursRequired: 4,
      hoursCompleted: 0
    }
  ];

  const performanceReviews = [
    {
      id: 1,
      employee: 'Jennifer Adams',
      type: '30-Day Review',
      dueDate: '2025-01-20',
      manager: 'Douglas Hicks',
      status: 'scheduled',
      goals: ['Case Management', 'Client Communication', 'Legal Research']
    },
    {
      id: 2,
      employee: 'Robert Kim',
      type: '90-Day Review',
      dueDate: '2025-01-25',
      manager: 'Jamon Hicks',
      status: 'pending',
      goals: ['Trial Preparation', 'Document Review', 'Team Collaboration']
    }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'text-green-400';
      case 'in-progress': return 'text-yellow-400';
      case 'pending': return 'text-gray-400';
      case 'critical': return 'text-red-400';
      case 'warning': return 'text-orange-400';
      case 'good': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'completed': return 'bg-green-500/20 text-green-400';
      case 'in-progress': return 'bg-yellow-500/20 text-yellow-400';
      case 'pending': return 'bg-gray-500/20 text-gray-400';
      case 'critical': return 'bg-red-500/20 text-red-400';
      case 'warning': return 'bg-orange-500/20 text-orange-400';
      case 'good': return 'bg-green-500/20 text-green-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  // Loading state while checking authentication
  if (!hasAccess && !currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#f4c900] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Verifying HR access permissions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white p-6">
      {/* Secure Navigation */}
      <SecureNavigation />

      {/* Access Control Header */}
      {currentUser && (
        <div className="mb-4 p-4 bg-green-900/20 border border-green-500/30 rounded-xl">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-green-400" />
            <div>
              <p className="text-green-300 font-semibold">Authorized HR Access</p>
              <p className="text-gray-300 text-sm">
                Secure navigation enabled • All access logged for compliance
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#f4c900] to-[#b68600] bg-clip-text text-transparent flex items-center gap-3">
              <Sparkles className="w-10 h-10 text-[#f4c900]" />
              Enterprise HR Suite
            </h1>
            <p className="text-gray-400 mt-2 flex items-center gap-2">
              <Crown className="w-4 h-4 text-[#f4c900]" />
              AI-Powered Human Resources Management Platform
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowAIAnalysis(!showAIAnalysis)}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl font-semibold hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 flex items-center gap-2"
            >
              <Brain className="w-5 h-5" />
              AI Insights
            </button>
            <button
              onClick={() => setShowNewHireForm(true)}
              className="px-6 py-3 bg-gradient-to-r from-[#f4c900] to-[#b68600] rounded-xl font-semibold hover:shadow-xl hover:shadow-yellow-500/20 transition-all duration-300 flex items-center gap-2"
            >
              <UserPlus className="w-5 h-5" />
              Add Employee
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Active Employees</p>
                <p className="text-3xl font-bold text-white">47</p>
              </div>
              <Users className="w-10 h-10 text-[#f4c900] opacity-50" />
            </div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">New Hires (30d)</p>
                <p className="text-3xl font-bold text-white">4</p>
              </div>
              <UserPlus className="w-10 h-10 text-green-400 opacity-50" />
            </div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Compliance Alerts</p>
                <p className="text-3xl font-bold text-orange-400">6</p>
              </div>
              <AlertCircle className="w-10 h-10 text-orange-400 opacity-50" />
            </div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Reviews Due</p>
                <p className="text-3xl font-bold text-white">3</p>
              </div>
              <Award className="w-10 h-10 text-purple-400 opacity-50" />
            </div>
          </div>
        </div>

        {/* AI Insights Panel */}
        {showAIAnalysis && (
          <div className="mb-6 bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="w-6 h-6 text-purple-400" />
              <h3 className="text-xl font-bold text-white">AI Workforce Insights</h3>
              <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full">LIVE</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-black/30 rounded-lg p-4">
                <p className="text-purple-300 text-sm">Predicted Turnover Risk</p>
                <p className="text-2xl font-bold text-white">2 employees</p>
                <p className="text-xs text-gray-400">Jennifer Adams (78%), Robert Kim (65%)</p>
              </div>
              <div className="bg-black/30 rounded-lg p-4">
                <p className="text-blue-300 text-sm">Optimal Hiring Window</p>
                <p className="text-2xl font-bold text-white">Next 3 weeks</p>
                <p className="text-xs text-gray-400">Based on workload analysis</p>
              </div>
              <div className="bg-black/30 rounded-lg p-4">
                <p className="text-green-300 text-sm">Culture Fit Score</p>
                <p className="text-2xl font-bold text-white">92.4%</p>
                <p className="text-xs text-gray-400">Current team compatibility</p>
              </div>
            </div>
          </div>
        )}

        {/* Module Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 mb-8">
          {hrModules.map((module) => {
            const Icon = module.icon;
            return (
              <button
                key={module.id}
                onClick={() => handleTabChange(module.id)}
                className={`p-4 rounded-xl transition-all duration-300 border ${
                  activeTab === module.id
                    ? 'bg-gradient-to-r from-[#f4c900] to-[#b68600] border-[#f4c900] text-black'
                    : 'bg-gray-800/50 border-gray-700 hover:border-gray-600 text-gray-300 hover:text-white'
                }`}
              >
                <Icon className={`w-6 h-6 mx-auto mb-2 ${activeTab === module.id ? 'text-black' : module.color}`} />
                <p className="text-xs font-semibold text-center">{module.label}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Executive Dashboard */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Real-time Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {analyticsData.map((metric, idx) => (
              <div key={idx} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold">{metric.metric}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    metric.status === 'excellent' ? 'bg-green-500/20 text-green-400' :
                    metric.status === 'good' ? 'bg-blue-500/20 text-blue-400' : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {metric.status.toUpperCase()}
                  </span>
                </div>
                <div className="space-y-2">
                  <p className="text-3xl font-bold text-white">{metric.value}</p>
                  <p className="text-sm text-gray-400">Trend: <span className="text-green-400">{metric.trend}</span></p>
                  <p className="text-xs text-gray-500">Industry benchmark: {metric.benchmark}</p>
                  <p className="text-xs text-purple-400">AI Prediction: {metric.prediction}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Live Activity Feed */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#f4c900]" />
                Live HR Activity
              </h3>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {[
                  { action: 'New application received', candidate: 'Jennifer Martinez', time: '2 min ago', type: 'positive' },
                  { action: 'Interview scheduled', candidate: 'Marcus Johnson', time: '5 min ago', type: 'neutral' },
                  { action: 'Background check completed', candidate: 'Sarah Mitchell', time: '12 min ago', type: 'positive' },
                  { action: 'Reference verification failed', candidate: 'Alex Thompson', time: '18 min ago', type: 'negative' },
                  { action: 'Offer letter sent', candidate: 'Diana Chen', time: '25 min ago', type: 'positive' }
                ].map((activity, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-gray-900/50 rounded-lg">
                    <div className={`w-3 h-3 rounded-full ${
                      activity.type === 'positive' ? 'bg-green-400' :
                      activity.type === 'negative' ? 'bg-red-400' : 'bg-blue-400'
                    }`} />
                    <div className="flex-1">
                      <p className="text-white text-sm">{activity.action}</p>
                      <p className="text-gray-400 text-xs">{activity.candidate} • {activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-[#f4c900]" />
                AI Recommendations
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="w-4 h-4 text-purple-400" />
                    <span className="text-purple-300 text-sm font-semibold">Hiring Priority</span>
                  </div>
                  <p className="text-white text-sm">Consider hiring 2 additional paralegals within 30 days based on current case load analysis.</p>
                </div>
                <div className="p-4 bg-orange-900/20 border border-orange-500/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-4 h-4 text-orange-400" />
                    <span className="text-orange-300 text-sm font-semibold">Retention Alert</span>
                  </div>
                  <p className="text-white text-sm">Jennifer Adams shows 78% likelihood of leaving. Schedule retention conversation.</p>
                </div>
                <div className="p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="w-4 h-4 text-green-400" />
                    <span className="text-green-300 text-sm font-semibold">Process Optimization</span>
                  </div>
                  <p className="text-white text-sm">Automate timesheet approval workflow to save 4.2 hours/week.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Recruitment Hub */}
      {activeTab === 'recruitment' && (
        <div className="space-y-6">
          {/* Recruitment Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-r from-purple-900/30 to-purple-800/30 border border-purple-500/30 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-300 text-sm">AI-Scanned Resumes</p>
                  <p className="text-3xl font-bold text-white">247</p>
                </div>
                <Scan className="w-10 h-10 text-purple-400" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-green-900/30 to-green-800/30 border border-green-500/30 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-300 text-sm">Top Candidates</p>
                  <p className="text-3xl font-bold text-white">12</p>
                </div>
                <Star className="w-10 h-10 text-green-400" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-blue-900/30 to-blue-800/30 border border-blue-500/30 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-300 text-sm">Interviews Scheduled</p>
                  <p className="text-3xl font-bold text-white">8</p>
                </div>
                <Calendar className="w-10 h-10 text-blue-400" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-orange-900/30 to-orange-800/30 border border-orange-500/30 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-300 text-sm">Avg. AI Score</p>
                  <p className="text-3xl font-bold text-white">87.3</p>
                </div>
                <Brain className="w-10 h-10 text-orange-400" />
              </div>
            </div>
          </div>

          {/* Candidate Pipeline */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">AI-Ranked Candidates</h3>
                  <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg font-semibold hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 flex items-center gap-2">
                    <Brain className="w-4 h-4" />
                    Re-analyze All
                  </button>
                </div>
                <div className="space-y-4">
                  {candidates.map((candidate) => (
                    <div key={candidate.id} className="p-4 bg-gray-900/50 rounded-xl border border-gray-700 hover:border-purple-500/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <img src={candidate.photo} alt={candidate.name} className="w-12 h-12 rounded-full" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-white font-bold">{candidate.name}</h4>
                            <div className="flex items-center gap-2">
                              <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                                candidate.aiScore >= 90 ? 'bg-green-500/20 text-green-400' :
                                candidate.aiScore >= 80 ? 'bg-blue-500/20 text-blue-400' :
                                'bg-yellow-500/20 text-yellow-400'
                              }`}>
                                AI Score: {candidate.aiScore}
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-400 text-sm mb-2">{candidate.position} • {candidate.experience}</p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {candidate.skills.slice(0, 3).map((skill, idx) => (
                              <span key={idx} className="px-2 py-1 bg-gray-700 rounded-md text-xs text-gray-300">
                                {skill}
                              </span>
                            ))}
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-xs">
                            <div>
                              <span className="text-gray-400">Cultural Fit: </span>
                              <span className="text-green-400 font-semibold">{candidate.cultural_fit}%</span>
                            </div>
                            <div>
                              <span className="text-gray-400">Interview Stage: </span>
                              <span className="text-blue-400 font-semibold">{candidate.interviewStage}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex gap-3">
                        <button className="flex-1 px-3 py-2 bg-gradient-to-r from-[#f4c900] to-[#b68600] rounded-lg text-sm font-semibold hover:shadow-xl hover:shadow-yellow-500/20 transition-all duration-300">
                          Schedule Interview
                        </button>
                        <button className="flex-1 px-3 py-2 bg-purple-600 rounded-lg text-sm font-semibold hover:bg-purple-700 transition-colors">
                          AI Analysis
                        </button>
                        <button className="flex-1 px-3 py-2 bg-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-600 transition-colors">
                          Send Email
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* Resume Upload & AI Scanning */}
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Upload className="w-5 h-5 text-[#f4c900]" />
                  AI Resume Scanner
                </h3>
                <div className="border-2 border-dashed border-purple-500/50 rounded-lg p-6 text-center hover:border-purple-400 transition-colors cursor-pointer">
                  <Brain className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                  <p className="text-white font-semibold mb-1">Drop resume here</p>
                  <p className="text-gray-400 text-sm">AI will analyze and score automatically</p>
                </div>
                <div className="mt-4 p-3 bg-purple-900/20 border border-purple-500/30 rounded-lg">
                  <p className="text-purple-300 text-sm font-semibold mb-1">AI Features:</p>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>• Skills extraction & matching</li>
                    <li>• Experience relevance scoring</li>
                    <li>• Cultural fit prediction</li>
                    <li>• Salary expectation analysis</li>
                  </ul>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full text-left px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg hover:from-purple-700 hover:to-purple-900 transition-all text-sm text-white font-semibold">
                    🤖 Generate Interview Questions
                  </button>
                  <button className="w-full text-left px-4 py-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors text-sm text-gray-300">
                    📧 Send Bulk Emails
                  </button>
                  <button className="w-full text-left px-4 py-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors text-sm text-gray-300">
                    📊 Export Candidate Report
                  </button>
                  <button className="w-full text-left px-4 py-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors text-sm text-gray-300">
                    🔍 Background Check All
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Hires Tab (keeping original for now) */}
      {activeTab === 'new-hires' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Employee List */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-xl font-bold text-white mb-4">Current Onboarding</h2>
            {newHires.map((hire) => (
              <div
                key={hire.id}
                onClick={() => setSelectedEmployee(hire)}
                className={`p-4 bg-gray-800/50 backdrop-blur-sm border rounded-xl cursor-pointer transition-all duration-300 hover:border-[#f4c900] ${
                  selectedEmployee?.id === hire.id ? 'border-[#f4c900]' : 'border-gray-700'
                }`}
              >
                <div className="flex items-center gap-4">
                  <img
                    src={hire.photo}
                    alt={hire.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">{hire.name}</h3>
                    <p className="text-sm text-gray-400">{hire.position}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex-1 bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-[#f4c900] to-[#b68600] h-2 rounded-full"
                          style={{ width: `${(hire.completedSteps / hire.totalSteps) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-400">
                        {hire.completedSteps}/{hire.totalSteps}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Onboarding Details */}
          <div className="lg:col-span-2">
            {selectedEmployee ? (
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <img
                      src={selectedEmployee.photo}
                      alt={selectedEmployee.name}
                      className="w-16 h-16 rounded-full"
                    />
                    <div>
                      <h2 className="text-2xl font-bold text-white">{selectedEmployee.name}</h2>
                      <p className="text-gray-400">{selectedEmployee.position} • {selectedEmployee.department}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadge(selectedEmployee.status)}`}>
                    {selectedEmployee.status.replace('-', ' ').toUpperCase()}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-900/50 rounded-lg p-3">
                    <p className="text-gray-400 text-sm">Start Date</p>
                    <p className="text-white font-semibold">{selectedEmployee.startDate}</p>
                  </div>
                  <div className="bg-gray-900/50 rounded-lg p-3">
                    <p className="text-gray-400 text-sm">Mentor</p>
                    <p className="text-white font-semibold">{selectedEmployee.mentor}</p>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-4">Onboarding Checklist</h3>
                <div className="space-y-2 max-h-[400px] overflow-y-auto">
                  {onboardingChecklist.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg hover:bg-gray-900/70 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {item.status === 'completed' ? (
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        ) : (
                          <Clock className="w-5 h-5 text-gray-400" />
                        )}
                        <div>
                          <p className="text-white font-medium">{item.task}</p>
                          <p className="text-gray-400 text-sm">{item.category}</p>
                        </div>
                      </div>
                      {item.required && (
                        <span className="text-xs text-red-400 font-semibold">REQUIRED</span>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex gap-3">
                  <button className="flex-1 px-4 py-2 bg-gradient-to-r from-[#f4c900] to-[#b68600] rounded-lg font-semibold hover:shadow-xl hover:shadow-yellow-500/20 transition-all duration-300">
                    Send Reminder
                  </button>
                  <button className="flex-1 px-4 py-2 bg-gray-700 rounded-lg font-semibold hover:bg-gray-600 transition-colors">
                    View Documents
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-12 text-center">
                <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">Select an employee to view onboarding details</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Compliance Tab */}
      {activeTab === 'compliance' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-400 text-sm font-semibold">Critical (&lt; 30 days)</p>
                  <p className="text-3xl font-bold text-white">2</p>
                </div>
                <AlertCircle className="w-10 h-10 text-red-400" />
              </div>
            </div>
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-400 text-sm font-semibold">Warning (30-60 days)</p>
                  <p className="text-3xl font-bold text-white">3</p>
                </div>
                <Clock className="w-10 h-10 text-orange-400" />
              </div>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-400 text-sm font-semibold">Good (&gt; 60 days)</p>
                  <p className="text-3xl font-bold text-white">8</p>
                </div>
                <CheckCircle className="w-10 h-10 text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden">
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-xl font-bold text-white">Compliance Tracking</h2>
              <p className="text-gray-400 text-sm mt-1">Monitor licenses, certifications, and training requirements</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-900/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Employee</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Requirement</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Due Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Days Remaining</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {complianceItems.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-900/30 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-white">{item.employee}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-white">{item.item}</div>
                        {item.barNumber && <div className="text-xs text-gray-400">Bar #{item.barNumber}</div>}
                        {item.policyNumber && <div className="text-xs text-gray-400">Policy #{item.policyNumber}</div>}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {item.dueDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`text-sm font-semibold ${getStatusColor(item.status)}`}>
                          {item.daysRemaining} days
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(item.status)}`}>
                          {item.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button className="text-[#f4c900] hover:text-[#b68600] font-semibold mr-3">
                          Send Alert
                        </button>
                        <button className="text-gray-400 hover:text-white">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Performance Tab */}
      {activeTab === 'performance' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white mb-4">Upcoming Reviews</h2>
            {performanceReviews.map((review) => (
              <div key={review.id} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">{review.employee}</h3>
                    <p className="text-gray-400 text-sm">{review.type}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    review.status === 'scheduled' ? 'bg-blue-500/20 text-blue-400' : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {review.status.toUpperCase()}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-gray-900/50 rounded-lg p-2">
                    <p className="text-gray-400 text-xs">Due Date</p>
                    <p className="text-white text-sm font-semibold">{review.dueDate}</p>
                  </div>
                  <div className="bg-gray-900/50 rounded-lg p-2">
                    <p className="text-gray-400 text-xs">Manager</p>
                    <p className="text-white text-sm font-semibold">{review.manager}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-gray-400 text-sm mb-2">Review Goals:</p>
                  <div className="flex flex-wrap gap-2">
                    {review.goals.map((goal, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-700 rounded-md text-xs text-gray-300">
                        {goal}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 px-3 py-2 bg-gradient-to-r from-[#f4c900] to-[#b68600] rounded-lg text-sm font-semibold hover:shadow-xl hover:shadow-yellow-500/20 transition-all duration-300">
                    Start Review
                  </button>
                  <button className="flex-1 px-3 py-2 bg-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-600 transition-colors">
                    Schedule Meeting
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Performance Metrics</h2>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Reviews Completed (YTD)</span>
                  <span className="text-white font-semibold">87%</span>
                </div>
                <div className="bg-gray-700 rounded-full h-3">
                  <div className="bg-gradient-to-r from-[#f4c900] to-[#b68600] h-3 rounded-full" style={{ width: '87%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Goal Achievement Rate</span>
                  <span className="text-white font-semibold">92%</span>
                </div>
                <div className="bg-gray-700 rounded-full h-3">
                  <div className="bg-gradient-to-r from-green-500 to-green-400 h-3 rounded-full" style={{ width: '92%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Employee Satisfaction</span>
                  <span className="text-white font-semibold">4.6/5.0</span>
                </div>
                <div className="bg-gray-700 rounded-full h-3">
                  <div className="bg-gradient-to-r from-purple-500 to-purple-400 h-3 rounded-full" style={{ width: '92%' }} />
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-900/50 rounded-lg">
                <h3 className="text-white font-semibold mb-3">Quick Actions</h3>
                <div className="space-y-2">
                  <button className="w-full text-left px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors text-sm text-gray-300">
                    📊 Generate Performance Report
                  </button>
                  <button className="w-full text-left px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors text-sm text-gray-300">
                    📝 Create Review Template
                  </button>
                  <button className="w-full text-left px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors text-sm text-gray-300">
                    📧 Send Review Reminders
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Documents Tab */}
      {activeTab === 'documents' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">Document Management</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { name: 'I-9 Form', icon: FileText, count: 47, color: 'text-blue-400' },
                { name: 'W-4 Form', icon: CreditCard, count: 47, color: 'text-green-400' },
                { name: 'Contracts', icon: Briefcase, count: 52, color: 'text-purple-400' },
                { name: 'NDAs', icon: Shield, count: 45, color: 'text-orange-400' },
                { name: 'Benefits', icon: Heart, count: 43, color: 'text-pink-400' },
                { name: 'Licenses', icon: Award, count: 28, color: 'text-yellow-400' },
              ].map((doc, idx) => (
                <div key={idx} className="bg-gray-900/50 rounded-lg p-4 hover:bg-gray-900/70 transition-colors cursor-pointer">
                  <doc.icon className={`w-8 h-8 ${doc.color} mb-3`} />
                  <p className="text-white font-semibold">{doc.name}</p>
                  <p className="text-gray-400 text-sm">{doc.count} documents</p>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-gray-900/50 rounded-lg">
              <h3 className="text-white font-semibold mb-3">Recent Uploads</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-white text-sm">Sarah_Mitchell_I9.pdf</p>
                      <p className="text-gray-400 text-xs">Uploaded 2 hours ago</p>
                    </div>
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-400" />
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-white text-sm">Michael_Chen_W4.pdf</p>
                      <p className="text-gray-400 text-xs">Uploaded 5 hours ago</p>
                    </div>
                  </div>
                  <Clock className="w-5 h-5 text-yellow-400" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Upload Documents</h3>
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-[#f4c900] transition-colors cursor-pointer">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-white font-semibold mb-1">Drop files here</p>
              <p className="text-gray-400 text-sm">or click to browse</p>
              <p className="text-gray-500 text-xs mt-2">PDF, DOC, DOCX up to 10MB</p>
            </div>

            <div className="mt-6">
              <h4 className="text-white font-semibold mb-3">Document Templates</h4>
              <div className="space-y-2">
                <button className="w-full text-left px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors text-sm text-gray-300">
                  📄 Employment Agreement
                </button>
                <button className="w-full text-left px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors text-sm text-gray-300">
                  📋 Onboarding Checklist
                </button>
                <button className="w-full text-left px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors text-sm text-gray-300">
                  🔒 Confidentiality Agreement
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}