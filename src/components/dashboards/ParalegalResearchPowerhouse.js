'use client'

import { useState, useEffect } from 'react'
import { 
  Search, BookOpen, FileText, Scale, Brain, 
  Database, Clock, CheckCircle, AlertTriangle, TrendingUp,
  FolderOpen, Download, Upload, Copy, Edit3,
  MessageSquare, Calendar, Users, DollarSign, Target,
  Zap, BarChart3, Globe, Shield, Terminal,
  Briefcase, PenTool, FileCheck, Link, Archive,
  ChevronRight, Plus, Filter, Star, Eye, MessageCircle
} from 'lucide-react'
import LegalMessagingHub from '../messaging/LegalMessagingHub'

const ParalegalResearchPowerhouse = ({ userRole, aiActive, setAiActive }) => {
  const [activeView, setActiveView] = useState('research')
  const [selectedDocument, setSelectedDocument] = useState(null)
  const [showMessaging, setShowMessaging] = useState(false)
  
  // Comprehensive research tasks
  const researchTasks = [
    {
      id: 1,
      case: 'Johnson v. Metro Insurance',
      type: 'Case Law Research',
      deadline: '2 days',
      progress: 67,
      priority: 'high',
      assignedBy: 'Douglas Hicks',
      status: 'in_progress',
      aiScore: 92,
      documentsFound: 34,
      relevantCases: 12
    },
    {
      id: 2,
      case: 'Davis Construction',
      type: 'Statutory Research',
      deadline: '1 week',
      progress: 45,
      priority: 'medium',
      assignedBy: 'Sarah Chen',
      status: 'pending_review',
      aiScore: 88,
      documentsFound: 28,
      relevantCases: 8
    },
    {
      id: 3,
      case: 'Williams Medical',
      type: 'Expert Research',
      deadline: '3 days',
      progress: 90,
      priority: 'critical',
      assignedBy: 'Michael Torres',
      status: 'near_complete',
      aiScore: 95,
      documentsFound: 56,
      relevantCases: 23
    }
  ]

  // Document drafting queue
  const draftingQueue = [
    {
      id: 1,
      document: 'Motion to Dismiss',
      case: 'Chen v. State',
      template: 'MTD-2024-v3',
      deadline: 'Today 5PM',
      status: 'drafting',
      progress: 78,
      aiAssisted: true,
      citations: 15
    },
    {
      id: 2,
      document: 'Discovery Requests',
      case: 'Johnson Matter',
      template: 'DISC-REQ-2024',
      deadline: 'Tomorrow',
      status: 'review',
      progress: 95,
      aiAssisted: true,
      citations: 8
    },
    {
      id: 3,
      document: 'Settlement Agreement',
      case: 'Williams Case',
      template: 'SETTLE-2024',
      deadline: '3 days',
      status: 'pending',
      progress: 30,
      aiAssisted: false,
      citations: 0
    }
  ]

  // Evidence management
  const evidenceFiles = [
    {
      id: 1,
      name: 'Medical_Records_Johnson.pdf',
      size: '4.2MB',
      type: 'Medical',
      date: '2024-01-18',
      privileged: true,
      reviewed: true,
      tags: ['injury', 'treatment', 'key-evidence'],
      relevance: 95
    },
    {
      id: 2,
      name: 'Deposition_Transcript_Davis.docx',
      size: '892KB',
      type: 'Deposition',
      date: '2024-01-17',
      privileged: false,
      reviewed: true,
      tags: ['witness', 'testimony'],
      relevance: 88
    },
    {
      id: 3,
      name: 'Contract_2019_Original.pdf',
      size: '156KB',
      type: 'Contract',
      date: '2024-01-16',
      privileged: false,
      reviewed: false,
      tags: ['breach', 'terms'],
      relevance: 92
    }
  ]

  // Citation verification
  const citationTasks = [
    {
      brief: 'Motion for Summary Judgment',
      totalCitations: 45,
      verified: 42,
      issues: 3,
      deadline: 'Today',
      status: 'critical'
    },
    {
      brief: 'Appellate Brief',
      totalCitations: 78,
      verified: 78,
      issues: 0,
      deadline: 'Complete',
      status: 'complete'
    }
  ]

  // AI Research Insights
  const aiInsights = {
    suggestedCases: [
      { name: 'Smith v. Johnson (2023)', relevance: 94, court: '9th Circuit', outcome: 'Favorable' },
      { name: 'Brown v. State (2022)', relevance: 89, court: 'State Supreme', outcome: 'Partial' },
      { name: 'Davis v. Corp (2023)', relevance: 87, court: 'Federal', outcome: 'Favorable' }
    ],
    keyStatutes: [
      { code: '42 USC § 1983', relevance: 'Critical', lastUpdated: '2023' },
      { code: 'Cal. Civ. Code § 3294', relevance: 'High', lastUpdated: '2024' }
    ],
    researchGaps: [
      'Missing expert testimony on damages',
      'No cases addressing specific procedural issue',
      'Limited precedent in this jurisdiction'
    ]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* Modern Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-violet-600/20"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-violet-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>
      
      {/* Modern Glassmorphism Header */}
      <header className="relative bg-white/5 backdrop-blur-2xl border-b border-white/10 shadow-2xl sticky top-0 z-40">
        <div className="px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-6">
              <div className="relative group">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 via-pink-500 to-violet-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-purple-500/25 group-hover:scale-105 transition-all duration-300">
                  <BookOpen className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-slate-900 animate-pulse shadow-lg"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent">
                  Paralegal Research Hub
                </h1>
                <p className="text-slate-300 font-medium">AI-Enhanced Legal Research & Drafting</p>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-slate-400 text-sm">Welcome back, {userRole?.name}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-400/30 px-6 py-3 rounded-2xl shadow-xl">
                <span className="text-purple-200 font-medium">8 Tasks • 5 Drafts • 127 Files</span>
              </div>
              
              <button 
                onClick={() => setShowMessaging(true)}
                className="relative p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-400/30 text-purple-200 hover:text-white hover:from-purple-500/30 hover:to-pink-500/30 rounded-2xl transition-all duration-300 shadow-lg"
              >
                <MessageCircle className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full animate-pulse shadow-lg shadow-pink-500/50"></span>
              </button>

              <button 
                onClick={() => setAiActive(true)}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 text-white rounded-2xl font-semibold transition-all hover:scale-105 shadow-xl shadow-purple-500/25 flex items-center space-x-3"
              >
                <Brain className="w-5 h-5" />
                <span>AI Research</span>
              </button>
            </div>
          </div>
        </div>

      </header>

      <div className="relative px-8 py-10">
        
        {/* Navigation Tabs */}
        <div className="flex space-x-4 mb-6">
          {['research', 'drafting', 'evidence', 'citations', 'investigation'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveView(tab)}
              className={`px-4 py-2 rounded-xl font-medium transition-all ${
                activeView === tab 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-6 gap-4 mb-8">
          {[
            { label: 'Research Tasks', value: '8', change: '+3 today', icon: <Search className="w-5 h-5" />, color: 'blue' },
            { label: 'Documents Draft', value: '5', change: '2 urgent', icon: <FileText className="w-5 h-5" />, color: 'green' },
            { label: 'Evidence Files', value: '127', change: '+12 new', icon: <FolderOpen className="w-5 h-5" />, color: 'purple' },
            { label: 'Citations', value: '245', change: '98% verified', icon: <Link className="w-5 h-5" />, color: 'yellow' },
            { label: 'AI Accuracy', value: '96%', change: '+2% week', icon: <Brain className="w-5 h-5" />, color: 'pink' },
            { label: 'Time Saved', value: '18h', change: 'This week', icon: <Clock className="w-5 h-5" />, color: 'cyan' }
          ].map((metric, index) => (
            <div key={index} className="bg-gray-900 rounded-2xl p-4 border border-gray-700/50 hover:scale-105 transition-all cursor-pointer">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl bg-${metric.color}-900/30 flex items-center justify-center`}>
                  {metric.icon}
                </div>
                <TrendingUp className="w-4 h-4 text-green-400" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
              <div className="text-xs text-gray-400">{metric.label}</div>
              <div className="text-xs text-green-400">{metric.change}</div>
            </div>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-3 gap-6">
          
          {/* Research Tasks Panel */}
          <div className="col-span-2 bg-gray-900 rounded-3xl p-6 border border-gray-700/50">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Active Research Tasks</h3>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all">
                  <Filter className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              {researchTasks.map((task) => (
                <div 
                  key={task.id}
                  className="p-5 rounded-2xl border border-gray-700/50 hover:border-green-500/50 bg-gray-800/50 hover:bg-gray-800 transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        task.priority === 'critical' ? 'bg-red-400' :
                        task.priority === 'high' ? 'bg-orange-400' :
                        'bg-yellow-400'
                      } animate-pulse`}></div>
                      <h4 className="font-semibold text-white">{task.case}</h4>
                      <span className="px-2 py-1 bg-green-900/30 rounded-full text-xs text-green-300">
                        AI: {task.aiScore}%
                      </span>
                    </div>
                    <div className="text-xs text-gray-400">{task.deadline}</div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-400">{task.type}</span>
                      <span className="text-xs text-gray-400">{task.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all"
                        style={{ width: `${task.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-xs text-gray-400">
                      <span>📚 {task.documentsFound} docs</span>
                      <span>⚖️ {task.relevantCases} cases</span>
                      <span>By: {task.assignedBy}</span>
                    </div>
                    <button className="text-xs text-green-400 hover:text-green-300 font-medium">
                      View Research →
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-4 py-3 bg-green-600/20 hover:bg-green-600/30 border border-green-500/50 rounded-2xl text-sm font-medium text-green-400 transition-all">
              🧠 Start AI-Powered Research Session
            </button>
          </div>

          {/* AI Research Assistant */}
          <div className="bg-gray-900 rounded-3xl p-6 border border-gray-700/50">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white">AI Research Assistant</h3>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            
            {/* Suggested Cases */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-400 mb-3">📚 Suggested Cases</h4>
              <div className="space-y-2">
                {aiInsights.suggestedCases.map((case_item, index) => (
                  <div key={index} className="p-3 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition-all cursor-pointer">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-white">{case_item.name}</span>
                      <span className="text-xs text-green-400">{case_item.relevance}%</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>{case_item.court}</span>
                      <span className={case_item.outcome === 'Favorable' ? 'text-green-400' : 'text-yellow-400'}>
                        {case_item.outcome}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Statutes */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-400 mb-3">📋 Key Statutes</h4>
              <div className="space-y-2">
                {aiInsights.keyStatutes.map((statute, index) => (
                  <div key={index} className="p-3 bg-gray-800/50 rounded-xl">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-white">{statute.code}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        statute.relevance === 'Critical' 
                          ? 'bg-red-900/30 text-red-300' 
                          : 'bg-yellow-900/30 text-yellow-300'
                      }`}>
                        {statute.relevance}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Research Gaps */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-400 mb-3">⚠️ Research Gaps</h4>
              <div className="space-y-2">
                {aiInsights.researchGaps.map((gap, index) => (
                  <div key={index} className="p-3 bg-orange-900/20 border border-orange-500/30 rounded-xl text-xs text-orange-300">
                    {gap}
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={() => setAiActive(true)}
              className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-2xl font-semibold transition-all"
            >
              🤖 Ask AI Research Question
            </button>
          </div>
        </div>

        {/* Document Drafting Queue */}
        {activeView === 'drafting' && (
          <div className="mt-8 bg-gray-900 rounded-3xl p-6 border border-gray-700/50">
            <h3 className="text-xl font-bold text-white mb-6">Document Drafting Queue</h3>
            
            <div className="grid grid-cols-3 gap-4">
              {draftingQueue.map((doc) => (
                <div key={doc.id} className="p-4 bg-gray-800/50 rounded-2xl border border-gray-700/50 hover:border-green-500/50 transition-all cursor-pointer">
                  <div className="flex items-center justify-between mb-3">
                    <FileText className="w-5 h-5 text-green-400" />
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      doc.status === 'drafting' ? 'bg-blue-900/30 text-blue-300' :
                      doc.status === 'review' ? 'bg-yellow-900/30 text-yellow-300' :
                      'bg-gray-700 text-gray-300'
                    }`}>
                      {doc.status}
                    </span>
                  </div>
                  
                  <h4 className="font-semibold text-white mb-1">{doc.document}</h4>
                  <p className="text-sm text-gray-400 mb-3">{doc.case}</p>
                  
                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>Progress</span>
                      <span>{doc.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1">
                      <div 
                        className="bg-green-500 h-1 rounded-full"
                        style={{ width: `${doc.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">⏰ {doc.deadline}</span>
                    {doc.aiAssisted && (
                      <span className="text-green-400">🤖 AI Assisted</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Legal Messaging Hub Modal */}
      {showMessaging && (
        <LegalMessagingHub 
          isOpen={showMessaging}
          onClose={() => setShowMessaging(false)}
          userRole={userRole}
        />
      )}
    </div>
  )
}

export default ParalegalResearchPowerhouse