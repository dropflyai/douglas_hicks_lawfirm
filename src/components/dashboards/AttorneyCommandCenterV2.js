'use client'

import { useState, useEffect } from 'react'
import { 
  Brain, Zap, TrendingUp, DollarSign, Clock, Users, 
  FileText, Calendar, Phone, MessageCircle, Target,
  ArrowUpRight, Sparkles, Activity, Award, Scale,
  ChevronRight, Bell, Search, Settings, User,
  Mic, MicOff, Volume2, AlertTriangle, CheckCircle,
  BarChart3, Shield, Briefcase, Eye, X, Globe,
  ChevronDown, ChevronUp, ExternalLink, Star,
  Folder, Tag, Filter, SortAsc, MoreVertical,
  PlayCircle, PauseCircle, RefreshCw, Maximize2
} from 'lucide-react'
import LegalMessagingHub from '../messaging/LegalMessagingHub'
import DocumentBrowser from '../documents/DocumentBrowser'
import DocumentViewer from '../documents/DocumentViewer'
import DocumentVersionControl from '../documents/DocumentVersionControl'
import CollaborationHub from '../documents/CollaborationHub'
import UnifiedBrowser from '../browser/UnifiedBrowser'

const AttorneyCommandCenterV2 = ({ userRole, aiActive, setAiActive }) => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedCase, setSelectedCase] = useState(null)
  const [aiListening, setAiListening] = useState(false)
  const [showPrediction, setShowPrediction] = useState(false)
  const [showMessaging, setShowMessaging] = useState(false)
  const [showDocumentBrowser, setShowDocumentBrowser] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState(null)
  const [showVersionControl, setShowVersionControl] = useState(false)
  const [showCollaboration, setShowCollaboration] = useState(false)
  const [showUnifiedBrowser, setShowUnifiedBrowser] = useState(false)
  const [expandedCard, setExpandedCard] = useState(null)
  const [expandedCase, setExpandedCase] = useState(null)

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Priority case data
  const priorityCase = {
    id: 1,
    name: 'Johnson v. Metro Insurance',
    status: 'Settlement Negotiations',
    priority: 'critical',
    aiScore: 94,
    deadline: '2 days',
    value: '$340K',
    nextAction: 'Review settlement draft',
    sentiment: 'positive',
    lastActivity: '2 hours ago',
    progress: 85,
    details: {
      client: 'Jennifer Johnson',
      opposing: 'Metro Insurance Corp',
      caseType: 'Personal Injury',
      filedDate: '2024-03-15',
      keyDeadlines: [
        { date: '2024-08-26', event: 'Settlement Response Due', critical: true },
        { date: '2024-09-01', event: 'Mediation Scheduled', critical: false },
        { date: '2024-09-15', event: 'Discovery Deadline', critical: false }
      ],
      documents: 23,
      billableHours: 47.5,
      team: ['Carl Douglas', 'Sarah Johnson', 'Michael Chen']
    }
  }

  // Active cases with expandable details
  const activeCases = [
    { 
      id: 2,
      name: 'Davis Construction Liability',
      status: 'Discovery',
      priority: 'high',
      aiScore: 82,
      deadline: '1 week',
      value: '$425K',
      nextAction: 'Deposition prep',
      progress: 65,
      lastActivity: '5 hours ago'
    },
    {
      id: 3,
      name: 'Williams Medical Malpractice',
      status: 'Trial Prep',
      priority: 'medium',
      aiScore: 88,
      deadline: '3 weeks',
      value: '$1.2M',
      nextAction: 'Expert witness briefing',
      progress: 72,
      lastActivity: '1 day ago'
    },
    {
      id: 4,
      name: 'Chen Contract Dispute',
      status: 'Research',
      priority: 'medium',
      aiScore: 76,
      deadline: '2 weeks',
      value: '$180K',
      nextAction: 'Legal precedent analysis',
      progress: 45,
      lastActivity: '3 hours ago'
    }
  ]

  // Maya AI insights
  const aiInsights = [
    {
      id: 1,
      type: 'opportunity',
      title: 'High Settlement Probability',
      case: 'Johnson v. Metro',
      content: '89% chance of favorable settlement at $340K range',
      action: 'Schedule conference call today',
      urgency: 'high',
      confidence: 89
    },
    {
      id: 2,
      type: 'risk',
      title: 'Discovery Deadline Risk',
      case: 'Chen Contract',
      content: 'Extension request should be filed within 48 hours',
      action: 'Draft extension motion',
      urgency: 'medium',
      confidence: 94
    },
    {
      id: 3,
      type: 'optimization',
      title: 'Resource Allocation',
      case: 'Multiple',
      content: 'Redistribute paralegal hours for optimal efficiency',
      action: 'Review team assignments',
      urgency: 'low',
      confidence: 78
    }
  ]

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'from-red-500 to-orange-500'
      case 'high': return 'from-orange-500 to-yellow-500'
      case 'medium': return 'from-blue-500 to-cyan-500'
      case 'low': return 'from-green-500 to-emerald-500'
      default: return 'from-gray-500 to-slate-500'
    }
  }

  const getInsightIcon = (type) => {
    switch (type) {
      case 'opportunity': return <TrendingUp className="w-5 h-5 text-green-400" />
      case 'risk': return <AlertTriangle className="w-5 h-5 text-red-400" />
      case 'optimization': return <Target className="w-5 h-5 text-blue-400" />
      default: return <Brain className="w-5 h-5 text-purple-400" />
    }
  }

  const toggleCardExpansion = (cardId) => {
    setExpandedCard(expandedCard === cardId ? null : cardId)
  }

  const toggleCaseExpansion = (caseId) => {
    setExpandedCase(expandedCase === caseId ? null : caseId)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      
      {/* Clean Header */}
      <header className="bg-gradient-to-r from-gray-900 via-black to-gray-900 border-b border-gray-800 sticky top-0 z-40">
        <div className="px-8 py-6">
          <div className="flex justify-between items-center">
            
            {/* Title & Status */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-xl">
                  <Scale className="w-7 h-7 text-black font-bold" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Attorney Dashboard</h1>
                  <p className="text-gray-400 text-sm">Welcome back, {userRole?.name || 'Douglas Hicks'}</p>
                </div>
              </div>
              
              {/* Maya AI Status */}
              <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 px-4 py-2 rounded-xl">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-purple-300 text-sm font-medium">Maya AI Active</span>
                  <span className="text-gray-400 text-sm">• 3 insights ready</span>
                </div>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center space-x-3">
              <button className="p-3 hover:bg-gray-800 rounded-xl text-gray-400 hover:text-white transition-colors">
                <Search className="w-5 h-5" />
              </button>
              
              <button className="relative p-3 hover:bg-gray-800 rounded-xl text-gray-400 hover:text-white transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>

              {/* Core Tools */}
              <div className="flex items-center space-x-2 pl-3 border-l border-gray-700">
                <button
                  onClick={() => setShowUnifiedBrowser(true)}
                  className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-indigo-500/20 to-indigo-600/20 border border-indigo-500/30 text-indigo-200 hover:from-indigo-500/30 hover:to-indigo-600/30 rounded-lg transition-all"
                  title="AI Browser with Maya Assistant"
                >
                  <Globe className="w-4 h-4" />
                  <span className="text-sm font-medium">AI Browser</span>
                </button>

                <button
                  onClick={() => setShowDocumentBrowser(true)}
                  className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-violet-500/20 to-violet-600/20 border border-violet-500/30 text-violet-200 hover:from-violet-500/30 hover:to-violet-600/30 rounded-lg transition-all"
                  title="Document Management System"
                >
                  <Briefcase className="w-4 h-4" />
                  <span className="text-sm font-medium">Documents</span>
                </button>
              </div>

              <div className="flex items-center space-x-3 pl-3 border-l border-gray-700">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="p-8 space-y-8">
        
        {/* Priority Case - Expandable Hero Card */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-orange-500/10 to-yellow-500/10 rounded-2xl blur-xl opacity-50"></div>
          <div 
            className="relative bg-gradient-to-r from-gray-900 to-black border border-red-500/20 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:border-red-500/40"
            onClick={() => toggleCardExpansion('priority')}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">Priority Case</h2>
                  <p className="text-gray-400">Requires immediate attention</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-lg text-sm font-medium">
                  CRITICAL
                </span>
                {expandedCard === 'priority' ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
              </div>
            </div>

            <div className="grid grid-cols-4 gap-6">
              <div className="col-span-2">
                <h3 className="text-2xl font-bold text-white mb-2">{priorityCase.name}</h3>
                <p className="text-gray-300 text-lg mb-3">{priorityCase.status}</p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-red-400" />
                    <span className="text-red-400 font-medium">{priorityCase.deadline}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 font-medium">{priorityCase.value}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Brain className="w-4 h-4 text-purple-400" />
                    <span className="text-purple-400 font-medium">{priorityCase.aiScore}% confident</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/30 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Progress</span>
                  <span className="text-white font-bold">{priorityCase.progress}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 mb-3">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${priorityCase.progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-300">{priorityCase.nextAction}</p>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span className="text-yellow-400 font-medium text-sm">Maya Insight</span>
                </div>
                <p className="text-white text-sm font-medium">89% settlement chance</p>
                <p className="text-gray-400 text-xs mt-1">Schedule conference TODAY</p>
              </div>
            </div>

            {/* Expanded Details */}
            {expandedCard === 'priority' && (
              <div className="mt-6 pt-6 border-t border-gray-800 space-y-4 animate-in slide-in-from-top duration-300">
                <div className="grid grid-cols-3 gap-6">
                  
                  {/* Client Details */}
                  <div className="bg-gray-800/30 rounded-xl p-4">
                    <h4 className="font-semibold text-white mb-3">Case Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Client:</span>
                        <span className="text-white">{priorityCase.details.client}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Opposing:</span>
                        <span className="text-white">{priorityCase.details.opposing}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Case Type:</span>
                        <span className="text-white">{priorityCase.details.caseType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Filed:</span>
                        <span className="text-white">{new Date(priorityCase.details.filedDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Key Deadlines */}
                  <div className="bg-gray-800/30 rounded-xl p-4">
                    <h4 className="font-semibold text-white mb-3">Key Deadlines</h4>
                    <div className="space-y-2">
                      {priorityCase.details.keyDeadlines.map((deadline, idx) => (
                        <div key={idx} className={`p-2 rounded-lg ${deadline.critical ? 'bg-red-500/10 border border-red-500/20' : 'bg-gray-700/30'}`}>
                          <div className="flex justify-between items-start">
                            <span className={`text-sm font-medium ${deadline.critical ? 'text-red-400' : 'text-gray-300'}`}>
                              {deadline.event}
                            </span>
                            <span className="text-xs text-gray-400">
                              {new Date(deadline.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Team & Resources */}
                  <div className="bg-gray-800/30 rounded-xl p-4">
                    <h4 className="font-semibold text-white mb-3">Team & Resources</h4>
                    <div className="space-y-3">
                      <div>
                        <span className="text-gray-400 text-sm">Team Members:</span>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {priorityCase.details.team.map((member, idx) => (
                            <span key={idx} className="px-2 py-1 bg-blue-500/10 text-blue-400 rounded text-xs">
                              {member}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-400">Documents:</span>
                          <span className="text-white ml-2">{priorityCase.details.documents}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Billable:</span>
                          <span className="text-white ml-2">{priorityCase.details.billableHours}h</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex items-center space-x-3 pt-2">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm font-medium">Call Client</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                    <FileText className="w-4 h-4" />
                    <span className="text-sm font-medium">View Documents</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors">
                    <Brain className="w-4 h-4" />
                    <span className="text-sm font-medium">Ask Maya</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8">
          
          {/* Active Cases - Expandable List */}
          <div className="col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Active Cases</h2>
              <button className="text-gray-400 hover:text-white flex items-center space-x-2">
                <span className="text-sm">View All</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              {activeCases.map((case_item) => (
                <div 
                  key={case_item.id}
                  className="bg-gray-900 border border-gray-800 rounded-xl p-4 hover:border-gray-700 cursor-pointer transition-all duration-300"
                  onClick={() => toggleCaseExpansion(case_item.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${getPriorityColor(case_item.priority)}`}></div>
                      <div>
                        <h3 className="font-semibold text-white">{case_item.name}</h3>
                        <p className="text-gray-400 text-sm">{case_item.status} • {case_item.nextAction}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-green-400 font-medium">{case_item.value}</div>
                        <div className="text-gray-400 text-sm">{case_item.deadline}</div>
                      </div>
                      <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                        <span className="text-purple-400 font-bold">{case_item.aiScore}</span>
                      </div>
                      {expandedCase === case_item.id ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                    </div>
                  </div>

                  {/* Case Progress Bar */}
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                      <span>Progress</span>
                      <span>{case_item.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-1">
                      <div 
                        className={`bg-gradient-to-r ${getPriorityColor(case_item.priority)} h-1 rounded-full transition-all duration-500`}
                        style={{ width: `${case_item.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Expanded Case Details */}
                  {expandedCase === case_item.id && (
                    <div className="mt-4 pt-4 border-t border-gray-800 animate-in slide-in-from-top duration-300">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-300 mb-2">Recent Activity</h4>
                          <p className="text-sm text-gray-400">Last update: {case_item.lastActivity}</p>
                        </div>
                        <div className="flex space-x-2">
                          <button className="flex-1 px-3 py-2 bg-blue-600/20 text-blue-400 rounded-lg text-sm hover:bg-blue-600/30 transition-colors">
                            View Details
                          </button>
                          <button className="flex-1 px-3 py-2 bg-green-600/20 text-green-400 rounded-lg text-sm hover:bg-green-600/30 transition-colors">
                            Take Action
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Maya AI Insights - Expandable Cards */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Maya Insights</h2>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>

            <div className="space-y-4">
              {aiInsights.map((insight) => (
                <div 
                  key={insight.id}
                  className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-xl p-4 hover:border-purple-500/40 cursor-pointer transition-all duration-300"
                  onClick={() => toggleCardExpansion(`insight-${insight.id}`)}
                >
                  <div className="flex items-start justify-between mb-3">
                    {getInsightIcon(insight.type)}
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-purple-300">{insight.confidence}% confident</span>
                      {expandedCard === `insight-${insight.id}` ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                    </div>
                  </div>

                  <h3 className="font-semibold text-white mb-1">{insight.title}</h3>
                  <p className="text-sm text-gray-300 mb-2">{insight.case}</p>
                  <p className="text-sm text-gray-400">{insight.content}</p>

                  {expandedCard === `insight-${insight.id}` && (
                    <div className="mt-4 pt-4 border-t border-purple-500/20 animate-in slide-in-from-top duration-300">
                      <div className="space-y-3">
                        <div>
                          <h4 className="text-sm font-medium text-purple-300 mb-1">Recommended Action</h4>
                          <p className="text-sm text-white">{insight.action}</p>
                        </div>
                        <button className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm font-medium transition-colors">
                          Take Action
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Quick Maya Chat */}
            <div className="mt-6 bg-gradient-to-r from-gray-900 to-black border border-gray-800 rounded-xl p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                  <Brain className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium text-white">Ask Maya</span>
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="What would you like to know?"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 text-sm focus:border-purple-500 focus:outline-none"
                />
                <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors">
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* All Modals */}
      {showMessaging && (
        <LegalMessagingHub 
          isOpen={showMessaging}
          onClose={() => setShowMessaging(false)}
          userRole={userRole}
        />
      )}

      {showDocumentBrowser && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50">
          <DocumentBrowser
            caseId={selectedCase?.id || 'general'}
            userRole={userRole}
            onDocumentSelect={(doc) => {
              setSelectedDocument(doc)
              setShowDocumentBrowser(false)
            }}
          />
          <button
            onClick={() => setShowDocumentBrowser(false)}
            className="absolute top-4 right-4 p-3 bg-gray-900 hover:bg-gray-800 rounded-xl text-white transition-colors z-60"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      )}

      {selectedDocument && (
        <DocumentViewer
          document={selectedDocument}
          onClose={() => setSelectedDocument(null)}
          userRole={userRole}
          collaborators={['Carl Douglas', 'Sarah Johnson', 'Michael Chen']}
        />
      )}

      {showVersionControl && (
        <DocumentVersionControl
          document={selectedDocument}
          onVersionSelect={(version) => {
            console.log('Version selected:', version)
            setShowVersionControl(false)
          }}
          onClose={() => setShowVersionControl(false)}
        />
      )}

      <CollaborationHub
        document={selectedDocument}
        isActive={showCollaboration}
        onToggle={() => setShowCollaboration(!showCollaboration)}
        userRole={userRole}
      />

      <UnifiedBrowser
        isOpen={showUnifiedBrowser}
        onClose={() => setShowUnifiedBrowser(false)}
        userRole={userRole}
      />
    </div>
  )
}

export default AttorneyCommandCenterV2