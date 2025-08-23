'use client';
import { useState, useEffect } from 'react';
import { 
  Briefcase, TrendingUp, BarChart3, Target, DollarSign,
  Clock, Users, Scale, Gavel, FileText, AlertTriangle,
  CheckCircle, Star, Calendar, Brain, Zap, Award,
  ArrowUp, ArrowDown, ArrowRight, Play, Pause,
  Eye, Edit, Plus, Filter, Search, Download,
  MessageSquare, Phone, Mail, Map, Building
} from 'lucide-react';

export default function SmartCaseManagement() {
  const [activeView, setActiveView] = useState('analytics');
  const [selectedCase, setSelectedCase] = useState(null);
  const [timeRange, setTimeRange] = useState('12months');

  // Mock case analytics data
  const caseAnalytics = {
    winRate: {
      overall: 87.3,
      trend: '+5.2%',
      byType: {
        'Personal Injury': { rate: 92.1, cases: 47, trend: '+3.1%' },
        'Police Misconduct': { rate: 89.4, cases: 23, trend: '+8.7%' },
        'Medical Malpractice': { rate: 78.6, cases: 18, trend: '-2.1%' },
        'Employment Law': { rate: 85.2, cases: 31, trend: '+4.3%' },
        'Civil Rights': { rate: 94.7, cases: 12, trend: '+12.5%' }
      }
    },
    financialMetrics: {
      totalValue: 15750000,
      averageSettlement: 425000,
      profitMargin: 68.4,
      revenueGrowth: '+23.7%'
    },
    caseLoad: {
      active: 47,
      pending: 12,
      inTrial: 8,
      settled: 156,
      avgDuration: 8.3
    }
  };

  // Mock active cases with AI insights
  const activeCases = [
    {
      id: 1,
      title: 'Rodriguez v. LAPD',
      type: 'Police Misconduct',
      client: 'Maria Rodriguez',
      status: 'Discovery',
      value: 2500000,
      probability: 89,
      nextDeadline: '2025-01-25',
      daysToDeadline: 7,
      aiInsights: {
        strategy: 'Focus on video evidence inconsistencies',
        riskFactors: ['Witness credibility', 'Officer disciplinary record'],
        opportunities: ['Strong precedent cases', 'Clear policy violations'],
        recommendedAction: 'File motion to compel additional body cam footage'
      },
      timeline: [
        { date: '2025-12-15', event: 'Case filed', status: 'completed' },
        { date: '2025-01-10', event: 'Discovery requests sent', status: 'completed' },
        { date: '2025-01-25', event: 'Depositions scheduled', status: 'upcoming' },
        { date: '2025-02-15', event: 'Expert witness testimony', status: 'pending' }
      ],
      documents: 247,
      billableHours: 156.5,
      expenses: 12450
    },
    {
      id: 2,
      title: 'Johnson Medical Malpractice',
      type: 'Medical Malpractice',
      client: 'Robert Johnson',
      status: 'Settlement Negotiation',
      value: 1800000,
      probability: 76,
      nextDeadline: '2025-01-22',
      daysToDeadline: 4,
      aiInsights: {
        strategy: 'Emphasize standard of care violations',
        riskFactors: ['Complex medical evidence', 'Hospital reputation'],
        opportunities: ['Clear causation link', 'Expert testimony strength'],
        recommendedAction: 'Counter-offer at $1.2M based on similar cases'
      },
      timeline: [
        { date: '2025-10-05', event: 'Case filed', status: 'completed' },
        { date: '2025-12-20', event: 'Medical records review', status: 'completed' },
        { date: '2025-01-22', event: 'Settlement conference', status: 'upcoming' },
        { date: '2025-03-01', event: 'Trial date (if needed)', status: 'scheduled' }
      ],
      documents: 189,
      billableHours: 203.2,
      expenses: 18750
    },
    {
      id: 3,
      title: 'Chen Employment Discrimination',
      type: 'Employment Law',
      client: 'Susan Chen',
      status: 'Trial Preparation',
      value: 750000,
      probability: 82,
      nextDeadline: '2025-01-20',
      daysToDeadline: 2,
      aiInsights: {
        strategy: 'Build comprehensive timeline of discriminatory acts',
        riskFactors: ['Limited documentation', 'At-will employment'],
        opportunities: ['Pattern of discrimination', 'Witness testimony'],
        recommendedAction: 'Prepare demonstrative exhibits for jury presentation'
      },
      timeline: [
        { date: '2025-08-12', event: 'Case filed', status: 'completed' },
        { date: '2025-11-30', event: 'Discovery completed', status: 'completed' },
        { date: '2025-01-20', event: 'Pre-trial conference', status: 'upcoming' },
        { date: '2025-02-10', event: 'Trial begins', status: 'scheduled' }
      ],
      documents: 156,
      billableHours: 178.7,
      expenses: 9230
    }
  ];

  // Judge and opposing counsel intelligence
  const legalIntelligence = {
    judges: [
      {
        name: 'Hon. Patricia Williams',
        court: 'LA Superior Court',
        rulingTendency: 'Plaintiff-favorable',
        avgSettlement: '$1.2M',
        trialLength: '12 days',
        preferences: ['Detailed motions', 'Early settlement conferences'],
        recentRulings: 'Favorable on discovery motions'
      },
      {
        name: 'Hon. Michael Chen',
        court: 'Federal District Court',
        rulingTendency: 'Evidence-focused',
        avgSettlement: '$850K',
        trialLength: '8 days',
        preferences: ['Concise briefs', 'Strong precedent citations'],
        recentRulings: 'Strict on procedural deadlines'
      }
    ],
    opposingCounsel: [
      {
        name: 'Sarah Thompson, Esq.',
        firm: 'City Attorney\'s Office',
        winRate: 72,
        avgSettlement: '$650K',
        strategy: 'Aggressive motion practice',
        weaknesses: ['Late document production', 'Inconsistent arguments'],
        recentCases: 'Lost 3 of last 5 police misconduct cases'
      }
    ]
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Discovery': return 'bg-blue-500/20 text-blue-400';
      case 'Settlement Negotiation': return 'bg-orange-500/20 text-orange-400';
      case 'Trial Preparation': return 'bg-purple-500/20 text-purple-400';
      case 'In Trial': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getProbabilityColor = (prob) => {
    if (prob >= 80) return 'text-green-400';
    if (prob >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-6">
      {/* Analytics Dashboard */}
      {activeView === 'analytics' && (
        <>
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-r from-green-900/30 to-green-800/30 border border-green-500/30 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-green-300 text-sm font-semibold">Win Rate</p>
                  <p className="text-3xl font-bold text-white">{caseAnalytics.winRate.overall}%</p>
                </div>
                <TrendingUp className="w-10 h-10 text-green-400" />
              </div>
              <div className="flex items-center gap-2">
                <ArrowUp className="w-4 h-4 text-green-400" />
                <span className="text-green-400 text-sm font-semibold">{caseAnalytics.winRate.trend}</span>
                <span className="text-gray-400 text-sm">vs last year</span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-900/30 to-blue-800/30 border border-blue-500/30 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-blue-300 text-sm font-semibold">Total Case Value</p>
                  <p className="text-3xl font-bold text-white">${(caseAnalytics.financialMetrics.totalValue / 1000000).toFixed(1)}M</p>
                </div>
                <DollarSign className="w-10 h-10 text-blue-400" />
              </div>
              <div className="flex items-center gap-2">
                <ArrowUp className="w-4 h-4 text-blue-400" />
                <span className="text-blue-400 text-sm font-semibold">{caseAnalytics.financialMetrics.revenueGrowth}</span>
                <span className="text-gray-400 text-sm">revenue growth</span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-900/30 to-purple-800/30 border border-purple-500/30 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-purple-300 text-sm font-semibold">Active Cases</p>
                  <p className="text-3xl font-bold text-white">{caseAnalytics.caseLoad.active}</p>
                </div>
                <Briefcase className="w-10 h-10 text-purple-400" />
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-400" />
                <span className="text-purple-400 text-sm font-semibold">{caseAnalytics.caseLoad.avgDuration} mo</span>
                <span className="text-gray-400 text-sm">avg duration</span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-900/30 to-orange-800/30 border border-orange-500/30 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-orange-300 text-sm font-semibold">Avg Settlement</p>
                  <p className="text-3xl font-bold text-white">${(caseAnalytics.financialMetrics.averageSettlement / 1000).toFixed(0)}K</p>
                </div>
                <Award className="w-10 h-10 text-orange-400" />
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-orange-400" />
                <span className="text-orange-400 text-sm font-semibold">{caseAnalytics.financialMetrics.profitMargin}%</span>
                <span className="text-gray-400 text-sm">profit margin</span>
              </div>
            </div>
          </div>

          {/* Win Rate by Case Type */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Win Rate Analysis by Case Type</h3>
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-[#f4c900]" />
                <span className="text-[#f4c900] text-sm font-semibold">AI Insights</span>
              </div>
            </div>
            <div className="space-y-4">
              {Object.entries(caseAnalytics.winRate.byType).map(([type, data]) => (
                <div key={type} className="p-4 bg-gray-900/50 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <h4 className="text-white font-semibold">{type}</h4>
                      <span className="text-gray-400 text-sm">({data.cases} cases)</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`text-sm font-semibold ${
                        data.trend.startsWith('+') ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {data.trend}
                      </span>
                      <span className="text-2xl font-bold text-white">{data.rate}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-[#f4c900] to-[#b68600] h-3 rounded-full transition-all duration-500"
                      style={{ width: `${data.rate}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Strategic Insights */}
          <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <Brain className="w-8 h-8 text-purple-400" />
              <div>
                <h3 className="text-xl font-bold text-white">AI Strategic Recommendations</h3>
                <p className="text-gray-400 text-sm">Based on case history and market analysis</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                    <h4 className="text-green-300 font-semibold">Opportunity</h4>
                  </div>
                  <p className="text-gray-300 text-sm">Civil Rights cases show highest win rate (94.7%) and growth (+12.5%). Consider expanding practice area.</p>
                </div>
                <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-5 h-5 text-blue-400" />
                    <h4 className="text-blue-300 font-semibold">Optimization</h4>
                  </div>
                  <p className="text-gray-300 text-sm">Medical Malpractice cases take 12.4 months on average. Focus on early settlement strategies.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-orange-900/20 border border-orange-500/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-orange-400" />
                    <h4 className="text-orange-300 font-semibold">Risk Alert</h4>
                  </div>
                  <p className="text-gray-300 text-sm">Medical Malpractice win rate declined 2.1%. Review case selection criteria and expert witness strategy.</p>
                </div>
                <div className="p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-5 h-5 text-purple-400" />
                    <h4 className="text-purple-300 font-semibold">Action Item</h4>
                  </div>
                  <p className="text-gray-300 text-sm">Schedule strategy session for Rodriguez case. AI predicts 89% win probability with current approach.</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Active Cases View */}
      {activeView === 'cases' && (
        <div className="space-y-6">
          {/* Cases Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Active Case Management</h2>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-gray-700 rounded-lg text-white hover:bg-gray-600 transition-colors flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-[#f4c900] to-[#b68600] rounded-lg text-black font-semibold hover:shadow-xl hover:shadow-yellow-500/20 transition-all duration-300 flex items-center gap-2">
                <Plus className="w-4 h-4" />
                New Case
              </button>
            </div>
          </div>

          {/* Cases Grid */}
          <div className="space-y-4">
            {activeCases.map((caseItem) => (
              <div key={caseItem.id} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-gray-600 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-white">{caseItem.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(caseItem.status)}`}>
                        {caseItem.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-gray-400 mb-3">
                      <span>Client: {caseItem.client}</span>
                      <span>Type: {caseItem.type}</span>
                      <span>Value: ${(caseItem.value / 1000000).toFixed(1)}M</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-gray-400 text-sm">Win Probability:</span>
                      <span className={`text-2xl font-bold ${getProbabilityColor(caseItem.probability)}`}>
                        {caseItem.probability}%
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-orange-400" />
                      <span className="text-orange-400">{caseItem.daysToDeadline} days to deadline</span>
                    </div>
                  </div>
                </div>

                {/* AI Insights */}
                <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Brain className="w-5 h-5 text-purple-400" />
                    <h4 className="text-purple-300 font-semibold">AI Strategic Analysis</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400 mb-1">Strategy:</p>
                      <p className="text-gray-300">{caseItem.aiInsights.strategy}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 mb-1">Recommended Action:</p>
                      <p className="text-gray-300">{caseItem.aiInsights.recommendedAction}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 text-sm">
                    <div>
                      <p className="text-red-300 mb-1">Risk Factors:</p>
                      <ul className="text-gray-300 space-y-1">
                        {caseItem.aiInsights.riskFactors.map((risk, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <AlertTriangle className="w-3 h-3 text-red-400" />
                            {risk}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-green-300 mb-1">Opportunities:</p>
                      <ul className="text-gray-300 space-y-1">
                        {caseItem.aiInsights.opportunities.map((opp, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <CheckCircle className="w-3 h-3 text-green-400" />
                            {opp}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Case Metrics */}
                <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-gray-400 text-xs">Documents</p>
                    <p className="text-white font-bold">{caseItem.documents}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-400 text-xs">Billable Hours</p>
                    <p className="text-white font-bold">{caseItem.billableHours}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-400 text-xs">Expenses</p>
                    <p className="text-white font-bold">${(caseItem.expenses / 1000).toFixed(1)}K</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-400 text-xs">Next Event</p>
                    <p className="text-white font-bold">{caseItem.nextDeadline}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-400 text-xs">Timeline</p>
                    <p className="text-white font-bold">{caseItem.timeline.filter(t => t.status === 'completed').length}/{caseItem.timeline.length}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-400 text-xs">Status</p>
                    <div className="flex justify-center">
                      {caseItem.timeline.find(t => t.status === 'upcoming') ? (
                        <Play className="w-4 h-4 text-green-400" />
                      ) : (
                        <Pause className="w-4 h-4 text-yellow-400" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button className="px-4 py-2 bg-gradient-to-r from-[#f4c900] to-[#b68600] text-black rounded-lg font-semibold hover:shadow-xl hover:shadow-yellow-500/20 transition-all duration-300 flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                  <button className="px-4 py-2 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors flex items-center gap-2">
                    <Edit className="w-4 h-4" />
                    Update
                  </button>
                  <button className="px-4 py-2 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Schedule
                  </button>
                  <button className="px-4 py-2 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Contact Client
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Case Management View Selector */}
      <div className="flex justify-center mb-6">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-2">
          <div className="flex gap-2">
            {[
              { id: 'analytics', label: 'Analytics', icon: BarChart3 },
              { id: 'cases', label: 'Cases', icon: Briefcase },
              { id: 'intelligence', label: 'Intelligence', icon: Brain },
              { id: 'financial', label: 'Financial', icon: DollarSign }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveView(tab.id)}
                  className={`px-4 py-2 rounded-xl transition-all duration-300 flex items-center gap-2 ${
                    activeView === tab.id
                      ? 'bg-gradient-to-r from-[#f4c900] to-[#b68600] text-black'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-semibold">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}