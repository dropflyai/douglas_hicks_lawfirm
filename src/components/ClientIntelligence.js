'use client';
import { useState, useEffect } from 'react';
import { 
  Users, User, Phone, Mail, MapPin, Calendar, DollarSign,
  TrendingUp, BarChart3, Target, AlertCircle, CheckCircle,
  Star, Award, MessageSquare, FileText, Clock, Briefcase,
  Brain, Zap, Heart, Shield, Search, Filter, Plus, Edit,
  Eye, Download, Upload, RefreshCw, Settings, ChevronDown,
  ChevronRight, ArrowUp, ArrowDown, Building, Globe,
  CreditCard, Handshake, Scale, Gavel, BookOpen, Lightbulb
} from 'lucide-react';

export default function ClientIntelligence() {
  const [activeView, setActiveView] = useState('overview');
  const [selectedClient, setSelectedClient] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock client data with AI insights
  const clientDatabase = [
    {
      id: 1,
      name: 'Maria Rodriguez',
      company: 'Rodriguez Family',
      type: 'Individual',
      status: 'Active',
      relationship: 'Primary Client',
      caseValue: 2500000,
      cases: [
        { name: 'Rodriguez v. LAPD', status: 'Discovery', value: 2500000, type: 'Police Misconduct' }
      ],
      contact: {
        phone: '(555) 123-4567',
        email: 'maria.rodriguez@email.com',
        address: '1234 Main St, Los Angeles, CA 90210'
      },
      preferences: {
        communication: 'Phone calls preferred',
        availability: 'Weekday evenings',
        language: 'English/Spanish',
        style: 'Frequent updates appreciated'
      },
      aiInsights: {
        satisfaction: 95,
        riskLevel: 'Low',
        paymentHistory: 'Excellent',
        referralPotential: 'High',
        communicationStyle: 'Professional, detail-oriented',
        recommendations: [
          'Schedule weekly check-ins during discovery phase',
          'Provide bilingual documentation when possible',
          'High referral potential - consider client appreciation program'
        ]
      },
      timeline: [
        { date: '2025-12-15', event: 'Case filing', status: 'completed' },
        { date: '2025-01-10', event: 'Initial consultation', status: 'completed' },
        { date: '2025-01-25', event: 'Discovery meeting scheduled', status: 'upcoming' }
      ],
      financials: {
        totalBilled: 45000,
        totalPaid: 45000,
        outstandingBalance: 0,
        averagePaymentTime: 15,
        lifetimeValue: 2500000
      }
    },
    {
      id: 2,
      name: 'Robert Johnson',
      company: 'Johnson Construction LLC',
      type: 'Business',
      status: 'Active',
      relationship: 'Corporate Client',
      caseValue: 1800000,
      cases: [
        { name: 'Johnson Medical Malpractice', status: 'Settlement Negotiation', value: 1800000, type: 'Medical Malpractice' }
      ],
      contact: {
        phone: '(555) 987-6543',
        email: 'robert@johnsonconst.com',
        address: '5678 Business Blvd, Beverly Hills, CA 90212'
      },
      preferences: {
        communication: 'Email with follow-up calls',
        availability: 'Business hours only',
        language: 'English',
        style: 'Concise, executive summaries'
      },
      aiInsights: {
        satisfaction: 88,
        riskLevel: 'Medium',
        paymentHistory: 'Good',
        referralPotential: 'Very High',
        communicationStyle: 'Business-focused, results-oriented',
        recommendations: [
          'Provide executive summaries for all communications',
          'Schedule calls during business hours only',
          'Strong network - ideal for business referrals'
        ]
      },
      timeline: [
        { date: '2025-10-05', event: 'Case filed', status: 'completed' },
        { date: '2025-12-20', event: 'Medical review completed', status: 'completed' },
        { date: '2025-01-22', event: 'Settlement conference', status: 'upcoming' }
      ],
      financials: {
        totalBilled: 75000,
        totalPaid: 65000,
        outstandingBalance: 10000,
        averagePaymentTime: 30,
        lifetimeValue: 1800000
      }
    },
    {
      id: 3,
      name: 'Susan Chen',
      company: 'Tech Innovations Inc',
      type: 'Business',
      status: 'Active',
      relationship: 'Repeat Client',
      caseValue: 750000,
      cases: [
        { name: 'Chen Employment Discrimination', status: 'Trial Preparation', value: 750000, type: 'Employment Law' }
      ],
      contact: {
        phone: '(555) 456-7890',
        email: 'susan.chen@techinnovations.com',
        address: '9012 Tech Drive, Silicon Valley, CA 94025'
      },
      preferences: {
        communication: 'Video calls and encrypted email',
        availability: 'Flexible, including weekends',
        language: 'English',
        style: 'Detailed technical explanations'
      },
      aiInsights: {
        satisfaction: 92,
        riskLevel: 'Low',
        paymentHistory: 'Excellent',
        referralPotential: 'High',
        communicationStyle: 'Tech-savvy, analytical',
        recommendations: [
          'Use secure communication channels',
          'Provide detailed case analytics and data',
          'Tech industry connections valuable for referrals'
        ]
      },
      timeline: [
        { date: '2025-08-12', event: 'Case filed', status: 'completed' },
        { date: '2025-11-30', event: 'Discovery completed', status: 'completed' },
        { date: '2025-01-20', event: 'Pre-trial conference', status: 'upcoming' }
      ],
      financials: {
        totalBilled: 55000,
        totalPaid: 55000,
        outstandingBalance: 0,
        averagePaymentTime: 10,
        lifetimeValue: 750000
      }
    }
  ];

  // Client intelligence analytics
  const clientAnalytics = {
    totalClients: 156,
    activeClients: 47,
    averageSatisfaction: 91.5,
    totalLifetimeValue: 15750000,
    averageCaseValue: 1350000,
    referralRate: 34.2,
    retentionRate: 89.4,
    paymentTimeline: 18.5
  };

  // AI-generated client insights
  const aiClientInsights = {
    topPerformingSegments: [
      { segment: 'Corporate Clients', satisfaction: 94, value: 8200000, count: 23 },
      { segment: 'High-Net-Worth Individuals', satisfaction: 96, value: 4100000, count: 18 },
      { segment: 'Personal Injury', satisfaction: 89, value: 2450000, count: 34 }
    ],
    riskAlerts: [
      {
        client: 'Johnson Construction LLC',
        risk: 'Payment Delay',
        severity: 'Medium',
        recommendation: 'Follow up on $10K outstanding balance'
      }
    ],
    opportunities: [
      {
        type: 'Referral Potential',
        client: 'Tech Innovations Inc',
        value: 'High network in tech industry',
        action: 'Schedule networking introduction'
      },
      {
        type: 'Case Expansion',
        client: 'Rodriguez Family',
        value: 'Additional family members may need representation',
        action: 'Discuss family legal needs'
      }
    ]
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-500/20 text-green-400';
      case 'Inactive': return 'bg-gray-500/20 text-gray-400';
      case 'At Risk': return 'bg-red-500/20 text-red-400';
      default: return 'bg-blue-500/20 text-blue-400';
    }
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'Low': return 'text-green-400';
      case 'Medium': return 'text-yellow-400';
      case 'High': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const filteredClients = clientDatabase.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Client Overview */}
      {activeView === 'overview' && (
        <>
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-r from-blue-900/30 to-blue-800/30 border border-blue-500/30 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-blue-300 text-sm font-semibold">Total Clients</p>
                  <p className="text-3xl font-bold text-white">{clientAnalytics.totalClients}</p>
                </div>
                <Users className="w-10 h-10 text-blue-400" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-400 text-sm font-semibold">{clientAnalytics.activeClients} active</span>
                <span className="text-gray-400 text-sm">this month</span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-900/30 to-green-800/30 border border-green-500/30 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-green-300 text-sm font-semibold">Satisfaction</p>
                  <p className="text-3xl font-bold text-white">{clientAnalytics.averageSatisfaction}%</p>
                </div>
                <Heart className="w-10 h-10 text-green-400" />
              </div>
              <div className="flex items-center gap-2">
                <ArrowUp className="w-4 h-4 text-green-400" />
                <span className="text-green-400 text-sm font-semibold">+2.3%</span>
                <span className="text-gray-400 text-sm">vs last quarter</span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-900/30 to-purple-800/30 border border-purple-500/30 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-purple-300 text-sm font-semibold">Lifetime Value</p>
                  <p className="text-3xl font-bold text-white">${(clientAnalytics.totalLifetimeValue / 1000000).toFixed(1)}M</p>
                </div>
                <DollarSign className="w-10 h-10 text-purple-400" />
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-purple-400" />
                <span className="text-purple-400 text-sm font-semibold">${(clientAnalytics.averageCaseValue / 1000).toFixed(0)}K</span>
                <span className="text-gray-400 text-sm">avg case</span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-900/30 to-orange-800/30 border border-orange-500/30 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-orange-300 text-sm font-semibold">Referral Rate</p>
                  <p className="text-3xl font-bold text-white">{clientAnalytics.referralRate}%</p>
                </div>
                <Handshake className="w-10 h-10 text-orange-400" />
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-orange-400" />
                <span className="text-orange-400 text-sm font-semibold">{clientAnalytics.retentionRate}%</span>
                <span className="text-gray-400 text-sm">retention</span>
              </div>
            </div>
          </div>

          {/* AI Client Insights */}
          <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <Brain className="w-8 h-8 text-purple-400" />
              <div>
                <h3 className="text-xl font-bold text-white">AI Client Intelligence</h3>
                <p className="text-gray-400 text-sm">Automated insights and relationship optimization</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Top Performing Segments */}
              <div>
                <h4 className="text-white font-bold mb-4">Top Performing Segments</h4>
                <div className="space-y-3">
                  {aiClientInsights.topPerformingSegments.map((segment, idx) => (
                    <div key={idx} className="p-3 bg-gray-900/50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-semibold text-sm">{segment.segment}</span>
                        <span className="text-green-400 font-bold">{segment.satisfaction}%</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span>${(segment.value / 1000000).toFixed(1)}M value</span>
                        <span>{segment.count} clients</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Risk Alerts */}
              <div>
                <h4 className="text-white font-bold mb-4">Risk Alerts</h4>
                <div className="space-y-3">
                  {aiClientInsights.riskAlerts.map((alert, idx) => (
                    <div key={idx} className="p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="w-4 h-4 text-red-400" />
                        <span className="text-red-300 font-semibold text-sm">{alert.risk}</span>
                      </div>
                      <p className="text-gray-300 text-xs mb-2">{alert.client}</p>
                      <p className="text-gray-400 text-xs">{alert.recommendation}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Opportunities */}
              <div>
                <h4 className="text-white font-bold mb-4">Growth Opportunities</h4>
                <div className="space-y-3">
                  {aiClientInsights.opportunities.map((opp, idx) => (
                    <div key={idx} className="p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Lightbulb className="w-4 h-4 text-green-400" />
                        <span className="text-green-300 font-semibold text-sm">{opp.type}</span>
                      </div>
                      <p className="text-gray-300 text-xs mb-2">{opp.client}</p>
                      <p className="text-gray-400 text-xs">{opp.action}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Client Directory */}
      {activeView === 'directory' && (
        <div className="space-y-6">
          {/* Search and Filters */}
          <div className="flex items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search clients..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-[#f4c900] focus:outline-none"
                />
              </div>
            </div>
            <div className="flex gap-3 ml-4">
              <button className="px-4 py-2 bg-gray-700 rounded-lg text-white hover:bg-gray-600 transition-colors flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-[#f4c900] to-[#b68600] rounded-lg text-black font-semibold hover:shadow-xl hover:shadow-yellow-500/20 transition-all duration-300 flex items-center gap-2">
                <Plus className="w-4 h-4" />
                New Client
              </button>
            </div>
          </div>

          {/* Client Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredClients.map((client) => (
              <div key={client.id} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-gray-600 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#f4c900] to-[#b68600] rounded-full flex items-center justify-center">
                      {client.type === 'Business' ? (
                        <Building className="w-6 h-6 text-black" />
                      ) : (
                        <User className="w-6 h-6 text-black" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{client.name}</h3>
                      <p className="text-gray-400 text-sm">{client.company}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(client.status)}`}>
                    {client.status}
                  </span>
                </div>

                {/* Client Metrics */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-gray-400 text-xs">Satisfaction</p>
                    <p className="text-white font-bold">{client.aiInsights.satisfaction}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-400 text-xs">Case Value</p>
                    <p className="text-white font-bold">${(client.caseValue / 1000000).toFixed(1)}M</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-400 text-xs">Risk Level</p>
                    <p className={`font-bold ${getRiskColor(client.aiInsights.riskLevel)}`}>
                      {client.aiInsights.riskLevel}
                    </p>
                  </div>
                </div>

                {/* AI Insights Preview */}
                <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-3 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="w-4 h-4 text-purple-400" />
                    <span className="text-purple-300 font-semibold text-sm">AI Insights</span>
                  </div>
                  <p className="text-gray-300 text-sm">{client.aiInsights.communicationStyle}</p>
                  <p className="text-gray-400 text-xs mt-1">Referral Potential: {client.aiInsights.referralPotential}</p>
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300 truncate">{client.contact.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300 truncate">{client.contact.email}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button 
                    onClick={() => setSelectedClient(client)}
                    className="px-4 py-2 bg-gradient-to-r from-[#f4c900] to-[#b68600] text-black rounded-lg font-semibold hover:shadow-xl hover:shadow-yellow-500/20 transition-all duration-300 flex items-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                  <button className="px-4 py-2 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Contact
                  </button>
                  <button className="px-4 py-2 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors flex items-center gap-2">
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Client Detail Modal */}
      {selectedClient && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#f4c900] to-[#b68600] rounded-full flex items-center justify-center">
                    {selectedClient.type === 'Business' ? (
                      <Building className="w-8 h-8 text-black" />
                    ) : (
                      <User className="w-8 h-8 text-black" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedClient.name}</h2>
                    <p className="text-gray-400">{selectedClient.company} • {selectedClient.type}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedClient(null)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Client Details Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Contact Information */}
                <div className="bg-gray-800/50 rounded-xl p-4">
                  <h3 className="text-white font-bold mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-blue-400" />
                      <span className="text-gray-300">{selectedClient.contact.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300">{selectedClient.contact.email}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-orange-400 mt-1" />
                      <span className="text-gray-300">{selectedClient.contact.address}</span>
                    </div>
                  </div>
                </div>

                {/* Financial Summary */}
                <div className="bg-gray-800/50 rounded-xl p-4">
                  <h3 className="text-white font-bold mb-4">Financial Summary</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Total Billed:</span>
                      <span className="text-white font-semibold">${selectedClient.financials.totalBilled.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Total Paid:</span>
                      <span className="text-green-400 font-semibold">${selectedClient.financials.totalPaid.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Outstanding:</span>
                      <span className={`font-semibold ${selectedClient.financials.outstandingBalance > 0 ? 'text-red-400' : 'text-green-400'}`}>
                        ${selectedClient.financials.outstandingBalance.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Avg Payment Time:</span>
                      <span className="text-white font-semibold">{selectedClient.financials.averagePaymentTime} days</span>
                    </div>
                  </div>
                </div>

                {/* AI Insights */}
                <div className="bg-purple-900/20 border border-purple-500/30 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Brain className="w-5 h-5 text-purple-400" />
                    <h3 className="text-white font-bold">AI Insights & Recommendations</h3>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-purple-300 text-sm font-semibold">Communication Style:</p>
                      <p className="text-gray-300 text-sm">{selectedClient.aiInsights.communicationStyle}</p>
                    </div>
                    <div>
                      <p className="text-purple-300 text-sm font-semibold">Recommendations:</p>
                      <ul className="text-gray-300 text-sm space-y-1">
                        {selectedClient.aiInsights.recommendations.map((rec, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <div className="w-1 h-1 bg-[#f4c900] rounded-full mt-2" />
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Client Preferences */}
                <div className="bg-gray-800/50 rounded-xl p-4">
                  <h3 className="text-white font-bold mb-4">Client Preferences</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-gray-400 text-sm">Communication:</p>
                      <p className="text-white text-sm">{selectedClient.preferences.communication}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Availability:</p>
                      <p className="text-white text-sm">{selectedClient.preferences.availability}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Language:</p>
                      <p className="text-white text-sm">{selectedClient.preferences.language}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Style:</p>
                      <p className="text-white text-sm">{selectedClient.preferences.style}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Case Timeline */}
              <div className="mt-6 bg-gray-800/50 rounded-xl p-4">
                <h3 className="text-white font-bold mb-4">Case Timeline</h3>
                <div className="space-y-3">
                  {selectedClient.timeline.map((event, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        event.status === 'completed' ? 'bg-green-400' :
                        event.status === 'upcoming' ? 'bg-blue-400' : 'bg-gray-400'
                      }`} />
                      <div className="flex-1">
                        <p className="text-white font-medium">{event.event}</p>
                        <p className="text-gray-400 text-sm">{event.date}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        event.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                        event.status === 'upcoming' ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        {event.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Client Intelligence View Selector */}
      <div className="flex justify-center mb-6">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-2">
          <div className="flex gap-2">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'directory', label: 'Directory', icon: Users },
              { id: 'analytics', label: 'Analytics', icon: Brain },
              { id: 'relationships', label: 'Relationships', icon: Handshake }
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