'use client';

import { useState, useEffect } from 'react';
import { 
  BarChart3, TrendingUp, TrendingDown, Users, DollarSign, 
  Clock, Award, Target, Activity, Brain, Zap, Calendar,
  PieChart, LineChart, Globe, Building, Star, Shield,
  AlertTriangle, CheckCircle, Info, Eye, Download, Filter,
  ArrowUpRight, ArrowDownRight, Minus, Plus, Play, Pause,
  Settings, RefreshCw, Search, Bell, Flag, Heart, Briefcase,
  GraduationCap, MapPin, Phone, Mail, UserPlus, UserMinus,
  FileText, MessageSquare, Video, Smartphone, Monitor
} from 'lucide-react';

export default function HRAnalytics() {
  const [activeView, setActiveView] = useState('overview');
  const [timeRange, setTimeRange] = useState('12months');
  const [selectedMetric, setSelectedMetric] = useState(null);

  // Comprehensive analytics data
  const organizationMetrics = {
    workforce: {
      totalEmployees: 47,
      activeEmployees: 45,
      contractors: 2,
      remoteWorkers: 12,
      onSite: 35,
      growthRate: 8.5,
      turnoverRate: 4.2,
      retentionRate: 95.8,
      averageTenure: 3.4
    },
    performance: {
      overallEngagement: 4.6,
      performanceScore: 4.3,
      goalCompletion: 87,
      trainingCompletion: 92,
      promotionRate: 15,
      satisfactionScore: 4.5,
      productivityIndex: 94,
      leadershipScore: 4.1
    },
    financial: {
      totalPayroll: 4750000,
      averageSalary: 101064,
      benefitsCost: 855000,
      totalCompensation: 5605000,
      costPerHire: 12500,
      revenuePerEmployee: 485000,
      payrollEfficiency: 94.2,
      budgetVariance: -2.3
    },
    recruitment: {
      openPositions: 3,
      timeToFill: 28,
      costPerHire: 12500,
      candidateExperience: 4.4,
      offerAcceptanceRate: 85,
      sourceEffectiveness: {
        'Employee Referral': 45,
        'LinkedIn': 30,
        'Career Site': 15,
        'Recruiters': 10
      },
      diversityHiring: 62
    },
    learning: {
      totalTrainingHours: 1680,
      averageHoursPerEmployee: 36,
      certificationCompletion: 78,
      skillsGapAnalysis: 23,
      trainingROI: 340,
      complianceTraining: 98,
      leadershipDevelopment: 12,
      technicalTraining: 24
    }
  };

  const departmentMetrics = [
    {
      name: 'Legal',
      employees: 28,
      avgSalary: 115000,
      performance: 4.4,
      engagement: 4.3,
      turnover: 3.1,
      billableHours: 1850,
      caseWinRate: 89,
      clientSatisfaction: 4.8,
      trainingHours: 42
    },
    {
      name: 'Human Resources',
      employees: 4,
      avgSalary: 78000,
      performance: 4.6,
      engagement: 4.7,
      turnover: 0,
      projects: 8,
      efficiency: 96,
      satisfaction: 4.9,
      trainingHours: 56
    },
    {
      name: 'Administration',
      employees: 12,
      avgSalary: 65000,
      performance: 4.2,
      engagement: 4.1,
      turnover: 8.3,
      efficiency: 88,
      satisfaction: 4.3,
      trainingHours: 28
    },
    {
      name: 'IT',
      employees: 3,
      avgSalary: 95000,
      performance: 4.5,
      engagement: 4.4,
      turnover: 0,
      uptime: 99.8,
      tickets: 45,
      satisfaction: 4.6,
      trainingHours: 64
    }
  ];

  const predictiveInsights = [
    {
      type: 'retention_risk',
      title: 'Retention Risk Alert',
      description: '2 employees showing early signs of disengagement',
      probability: 78,
      impact: 'high',
      action: 'Schedule 1-on-1 meetings',
      timeline: '2 weeks'
    },
    {
      type: 'performance_trend',
      title: 'Performance Improvement',
      description: 'Legal department trending 12% above target',
      probability: 92,
      impact: 'positive',
      action: 'Recognize top performers',
      timeline: 'Next review cycle'
    },
    {
      type: 'skill_gap',
      title: 'Emerging Skill Gap',
      description: 'AI/Technology skills gap identified in legal practice',
      probability: 85,
      impact: 'medium',
      action: 'Plan training program',
      timeline: 'Q2 2025'
    },
    {
      type: 'salary_market',
      title: 'Market Salary Analysis',
      description: 'Associate attorneys 8% below market rate',
      probability: 89,
      impact: 'high',
      action: 'Review compensation strategy',
      timeline: 'Next budget cycle'
    }
  ];

  const diversityMetrics = {
    gender: {
      male: 52,
      female: 45,
      nonBinary: 3
    },
    ethnicity: {
      'White': 45,
      'Hispanic/Latino': 25,
      'Asian': 15,
      'Black/African American': 12,
      'Other': 3
    },
    ageGroups: {
      '20-29': 15,
      '30-39': 35,
      '40-49': 25,
      '50-59': 20,
      '60+': 5
    },
    leadership: {
      diversityScore: 68,
      femaleLeaders: 40,
      minorityLeaders: 35
    }
  };

  const wellnessMetrics = {
    overallWellness: 4.2,
    workLifeBalance: 4.1,
    stressLevel: 2.8,
    burnoutRisk: 15,
    healthProgram: {
      participation: 78,
      satisfaction: 4.3,
      healthScreenings: 65,
      fitnessProgram: 42
    },
    mentalHealth: {
      eapUtilization: 12,
      stressManagement: 34,
      mindfulnessProgram: 28
    }
  };

  const getMetricColor = (value, benchmark) => {
    const ratio = value / benchmark;
    if (ratio >= 1.1) return 'text-green-400';
    if (ratio >= 0.9) return 'text-blue-400';
    if (ratio >= 0.8) return 'text-yellow-400';
    return 'text-red-400';
  };

  const renderOverviewDashboard = () => (
    <div className="space-y-6">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-900/30 to-blue-800/30 border border-blue-500/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-blue-300 text-sm font-semibold">Total Workforce</p>
              <p className="text-3xl font-bold text-white">{organizationMetrics.workforce.totalEmployees}</p>
            </div>
            <Users className="w-10 h-10 text-blue-400" />
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-green-400 text-sm font-semibold">+{organizationMetrics.workforce.growthRate}%</span>
            <span className="text-gray-400 text-sm">YoY growth</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-900/30 to-green-800/30 border border-green-500/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-green-300 text-sm font-semibold">Employee Engagement</p>
              <p className="text-3xl font-bold text-white">{organizationMetrics.performance.overallEngagement}/5</p>
            </div>
            <Heart className="w-10 h-10 text-green-400" />
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-green-400 text-sm font-semibold">+0.3</span>
            <span className="text-gray-400 text-sm">vs last quarter</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-900/30 to-purple-800/30 border border-purple-500/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-purple-300 text-sm font-semibold">Retention Rate</p>
              <p className="text-3xl font-bold text-white">{organizationMetrics.workforce.retentionRate}%</p>
            </div>
            <Award className="w-10 h-10 text-purple-400" />
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-green-400 text-sm font-semibold">+2.1%</span>
            <span className="text-gray-400 text-sm">above industry</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-900/30 to-orange-800/30 border border-orange-500/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-orange-300 text-sm font-semibold">Revenue per Employee</p>
              <p className="text-3xl font-bold text-white">${(organizationMetrics.financial.revenuePerEmployee / 1000).toFixed(0)}K</p>
            </div>
            <DollarSign className="w-10 h-10 text-orange-400" />
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-green-400 text-sm font-semibold">+12%</span>
            <span className="text-gray-400 text-sm">vs target</span>
          </div>
        </div>
      </div>

      {/* Predictive Insights */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Brain className="w-6 h-6 text-purple-400" />
            AI-Powered Insights
          </h3>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Generate Report
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {predictiveInsights.map((insight, index) => (
            <div key={index} className="p-4 bg-gray-700 rounded-lg border-l-4 border-purple-500">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-white font-semibold">{insight.title}</h4>
                  <p className="text-gray-400 text-sm mt-1">{insight.description}</p>
                </div>
                <div className="text-right">
                  <span className={`text-sm font-semibold ${
                    insight.probability >= 80 ? 'text-red-400' :
                    insight.probability >= 60 ? 'text-yellow-400' :
                    'text-green-400'
                  }`}>
                    {insight.probability}% confidence
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    insight.impact === 'high' ? 'bg-red-500/20 text-red-400' :
                    insight.impact === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    insight.impact === 'positive' ? 'bg-green-500/20 text-green-400' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {insight.impact.charAt(0).toUpperCase() + insight.impact.slice(1)} Impact
                  </span>
                  <span className="text-gray-400">{insight.timeline}</span>
                </div>
                <button className="text-purple-400 hover:text-purple-300 font-medium">
                  {insight.action} →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Department Performance */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-6">Department Performance Overview</h3>
        <div className="grid lg:grid-cols-2 gap-6">
          {departmentMetrics.map((dept, index) => (
            <div key={index} className="p-4 bg-gray-700 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-white font-semibold">{dept.name}</h4>
                <span className="text-gray-400 text-sm">{dept.employees} employees</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-400">Avg Salary</p>
                  <p className="text-white font-semibold">${dept.avgSalary.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-400">Performance</p>
                  <div className="flex items-center gap-1">
                    <span className={`font-semibold ${getMetricColor(dept.performance, 4.0)}`}>
                      {dept.performance}/5
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-gray-400">Engagement</p>
                  <div className="flex items-center gap-1">
                    <span className={`font-semibold ${getMetricColor(dept.engagement, 4.0)}`}>
                      {dept.engagement}/5
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-gray-400">Turnover</p>
                  <span className={`font-semibold ${
                    dept.turnover <= 5 ? 'text-green-400' : 
                    dept.turnover <= 10 ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {dept.turnover}%
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-600">
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Training: {dept.trainingHours}hrs</span>
                  {dept.billableHours && <span>Billable: {dept.billableHours}hrs</span>}
                  {dept.efficiency && <span>Efficiency: {dept.efficiency}%</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDiversityAnalytics = () => (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Gender Distribution */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-white font-semibold mb-4">Gender Distribution</h3>
          <div className="space-y-4">
            {Object.entries(diversityMetrics.gender).map(([gender, percentage]) => (
              <div key={gender}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 capitalize">{gender}</span>
                  <span className="text-white font-semibold">{percentage}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-purple-500 h-2 rounded-full"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ethnicity Distribution */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-white font-semibold mb-4">Ethnicity Distribution</h3>
          <div className="space-y-3">
            {Object.entries(diversityMetrics.ethnicity).map(([ethnicity, percentage]) => (
              <div key={ethnicity} className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">{ethnicity}</span>
                <span className="text-white font-semibold">{percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Leadership Diversity */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-white font-semibold mb-4">Leadership Diversity</h3>
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-400">{diversityMetrics.leadership.diversityScore}%</p>
              <p className="text-gray-400 text-sm">Overall Diversity Score</p>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Female Leaders</span>
                <span className="text-white">{diversityMetrics.leadership.femaleLeaders}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Minority Leaders</span>
                <span className="text-white">{diversityMetrics.leadership.minorityLeaders}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Age Distribution Chart */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-white font-semibold mb-4">Age Distribution</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {Object.entries(diversityMetrics.ageGroups).map(([ageGroup, percentage]) => (
            <div key={ageGroup} className="text-center">
              <p className="text-2xl font-bold text-blue-400">{percentage}%</p>
              <p className="text-gray-400 text-sm">{ageGroup}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderWellnessAnalytics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <p className="text-gray-400 text-sm mb-2">Overall Wellness Score</p>
          <p className="text-3xl font-bold text-white">{wellnessMetrics.overallWellness}/5</p>
          <div className="flex items-center gap-2 mt-2">
            <Heart className="w-4 h-4 text-green-400" />
            <span className="text-green-400 text-sm">Good</span>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <p className="text-gray-400 text-sm mb-2">Work-Life Balance</p>
          <p className="text-3xl font-bold text-white">{wellnessMetrics.workLifeBalance}/5</p>
          <div className="flex items-center gap-2 mt-2">
            <Target className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-sm">Stable</span>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <p className="text-gray-400 text-sm mb-2">Stress Level</p>
          <p className="text-3xl font-bold text-white">{wellnessMetrics.stressLevel}/5</p>
          <div className="flex items-center gap-2 mt-2">
            <TrendingDown className="w-4 h-4 text-green-400" />
            <span className="text-green-400 text-sm">Low</span>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <p className="text-gray-400 text-sm mb-2">Burnout Risk</p>
          <p className="text-3xl font-bold text-white">{wellnessMetrics.burnoutRisk}%</p>
          <div className="flex items-center gap-2 mt-2">
            <Shield className="w-4 h-4 text-green-400" />
            <span className="text-green-400 text-sm">Low Risk</span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-white font-semibold mb-4">Wellness Program Participation</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Overall Participation</span>
                <span className="text-white">{wellnessMetrics.healthProgram.participation}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${wellnessMetrics.healthProgram.participation}%` }}
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Health Screenings</span>
                <span className="text-white">{wellnessMetrics.healthProgram.healthScreenings}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${wellnessMetrics.healthProgram.healthScreenings}%` }}
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Fitness Program</span>
                <span className="text-white">{wellnessMetrics.healthProgram.fitnessProgram}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-purple-500 h-2 rounded-full"
                  style={{ width: `${wellnessMetrics.healthProgram.fitnessProgram}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-white font-semibold mb-4">Mental Health Support</h3>
          <div className="space-y-4">
            <div className="p-3 bg-gray-700 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">EAP Utilization</span>
                <span className="text-white font-semibold">{wellnessMetrics.mentalHealth.eapUtilization}%</span>
              </div>
              <p className="text-gray-500 text-xs mt-1">Employee Assistance Program</p>
            </div>
            
            <div className="p-3 bg-gray-700 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Stress Management</span>
                <span className="text-white font-semibold">{wellnessMetrics.mentalHealth.stressManagement}%</span>
              </div>
              <p className="text-gray-500 text-xs mt-1">Participating in stress reduction programs</p>
            </div>
            
            <div className="p-3 bg-gray-700 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Mindfulness Program</span>
                <span className="text-white font-semibold">{wellnessMetrics.mentalHealth.mindfulnessProgram}%</span>
              </div>
              <p className="text-gray-500 text-xs mt-1">Active in mindfulness initiatives</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTrendAnalysis = () => (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-white font-semibold mb-6">12-Month Trend Analysis</h3>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="h-64 bg-gray-700 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <LineChart className="w-16 h-16 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-400">Employee Growth Trend</p>
            </div>
          </div>
          <div className="h-64 bg-gray-700 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-400">Performance Metrics</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h4 className="text-white font-semibold mb-4">Hiring Trends</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Q1 2025</span>
              <span className="text-white">8 hires</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Q2 2025</span>
              <span className="text-white">12 hires</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Q3 2025</span>
              <span className="text-white">6 hires</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Q4 2025</span>
              <span className="text-white">9 hires</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h4 className="text-white font-semibold mb-4">Engagement Scores</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Q1 2025</span>
              <span className="text-white">4.2/5</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Q2 2025</span>
              <span className="text-white">4.3/5</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Q3 2025</span>
              <span className="text-white">4.5/5</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Q4 2025</span>
              <span className="text-white">4.6/5</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h4 className="text-white font-semibold mb-4">Training Investment</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Q1 2025</span>
              <span className="text-white">$45K</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Q2 2025</span>
              <span className="text-white">$52K</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Q3 2025</span>
              <span className="text-white">$38K</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Q4 2025</span>
              <span className="text-white">$48K</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* View Selector */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">HR Analytics</h1>
        <div className="flex items-center gap-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500"
          >
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
            <option value="12months">Last 12 Months</option>
            <option value="ytd">Year to Date</option>
          </select>
          <div className="flex gap-2 bg-gray-800 p-1 rounded-lg">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'diversity', label: 'Diversity', icon: Users },
              { id: 'wellness', label: 'Wellness', icon: Heart },
              { id: 'trends', label: 'Trends', icon: TrendingUp }
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
      {activeView === 'overview' && renderOverviewDashboard()}
      {activeView === 'diversity' && renderDiversityAnalytics()}
      {activeView === 'wellness' && renderWellnessAnalytics()}
      {activeView === 'trends' && renderTrendAnalysis()}
    </div>
  );
}