'use client'

import { useState, useEffect } from 'react'
import { 
  Brain, Zap, TrendingUp, DollarSign, Clock, Users, 
  FileText, Calendar, Phone, MessageCircle, Target,
  ArrowUpRight, Sparkles, Activity, Award, Scale,
  ChevronRight, Bell, Search, Settings, User,
  Mic, MicOff, Volume2, AlertTriangle, CheckCircle,
  BarChart3, Shield, Briefcase, Eye, X, Globe
} from 'lucide-react'
import LegalMessagingHub from '../messaging/LegalMessagingHub'
import DocumentBrowser from '../documents/DocumentBrowser'
import DocumentViewer from '../documents/DocumentViewer'
import DocumentVersionControl from '../documents/DocumentVersionControl'
import CollaborationHub from '../documents/CollaborationHub'
import UnifiedBrowser from '../browser/UnifiedBrowser'

const AttorneyCommandCenter = ({ userRole, aiActive, setAiActive }) => {
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

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Real-time AI predictions
  const aiPredictions = {
    settlements: [
      { case: 'Johnson v. Metro', probability: 89, value: '$340K', urgency: 'high', action: 'Schedule conference TODAY' },
      { case: 'Davis Construction', probability: 76, value: '$425K', urgency: 'medium', action: 'Review motion to amend' },
      { case: 'Williams Medical', probability: 92, value: '$1.2M', urgency: 'critical', action: 'Accept settlement now' }
    ],
    risks: [
      { case: 'Chen Breach', risk: 'Discovery deadline', impact: 'high', mitigation: 'File extension immediately' },
      { case: 'Martinez Estate', risk: 'Statute limitations', impact: 'critical', mitigation: '3 days remaining to file' }
    ],
    opportunities: [
      { type: 'Cross-sell', client: 'Tech Corp', value: '$500K', action: 'Offer IP protection services' },
      { type: 'Referral', source: 'Judge Martinez', value: '$300K', action: 'Schedule intake today' }
    ]
  }

  // Active cases with AI scoring
  const activeCases = [
    { 
      id: 1, 
      name: 'Johnson v. Metro Insurance', 
      status: 'Settlement Negotiations',
      aiScore: 94,
      deadline: '2 days',
      value: '$340K',
      nextAction: 'Review settlement draft',
      sentiment: 'positive'
    },
    {
      id: 2,
      name: 'Davis Construction Liability',
      status: 'Discovery',
      aiScore: 82,
      deadline: '1 week',
      value: '$425K',
      nextAction: 'Deposition prep',
      sentiment: 'neutral'
    },
    {
      id: 3,
      name: 'Williams Medical Malpractice',
      status: 'Trial Prep',
      aiScore: 88,
      deadline: '3 weeks',
      value: '$1.2M',
      nextAction: 'Expert witness briefing',
      sentiment: 'positive'
    }
  ]

  // AI-optimized schedule
  const intelligentSchedule = [
    {
      time: '9:00 AM',
      title: 'Johnson Settlement Call',
      type: 'critical',
      aiNote: '🧠 89% settlement chance - Open with $340K',
      participants: ['Opposing Counsel', 'Client'],
      duration: '1h'
    },
    {
      time: '10:30 AM',
      title: 'AI Case Review Session',
      type: 'ai-session',
      aiNote: '🔍 Review 3 new opportunities identified by Maya',
      participants: ['Maya AI', 'Paralegals'],
      duration: '30m'
    },
    {
      time: '2:00 PM',
      title: 'Court Hearing - Davis',
      type: 'court',
      aiNote: '⚖️ Motion likely granted (78% confidence)',
      participants: ['Judge Chen', 'Defense Team'],
      duration: '2h'
    },
    {
      time: '4:00 PM',
      title: 'Client Strategy - Williams',
      type: 'strategy',
      aiNote: '💰 Settlement window closing - Recommend accept',
      participants: ['Williams Family', 'Medical Expert'],
      duration: '1h'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* Modern Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>
      
      {/* Modern Glassmorphism Header */}
      <header className="relative bg-white/5 backdrop-blur-2xl border-b border-white/10 shadow-2xl sticky top-0 z-40">
        <div className="px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-6">
              <div className="relative group">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-purple-500/25 group-hover:scale-105 transition-all duration-300">
                  <Scale className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-slate-900 animate-pulse shadow-lg"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                  Attorney Command Center
                </h1>
                <p className="text-slate-300 font-medium">AI-Powered Legal Intelligence</p>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-slate-400 text-sm">Welcome back, {userRole?.name}</span>
                </div>
              </div>
            </div>

            {/* Enhanced AI Status & Controls */}
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-400/30 px-6 py-3 rounded-2xl shadow-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                  <span className="text-purple-200 font-medium">Maya AI Online</span>
                  <div className="w-px h-4 bg-purple-400/30"></div>
                  <span className="text-slate-300 text-sm">3 insights pending</span>
                </div>
              </div>
              
              <button 
                onClick={() => setAiListening(!aiListening)}
                className={`p-3 rounded-2xl transition-all duration-300 shadow-lg ${
                  aiListening 
                    ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-red-500/25 scale-105' 
                    : 'bg-white/10 backdrop-blur-sm border border-white/20 text-slate-300 hover:text-white hover:bg-white/20'
                }`}
              >
                {aiListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>

              <button className="relative p-3 bg-white/10 backdrop-blur-sm border border-white/20 text-slate-300 hover:text-white hover:bg-white/20 rounded-2xl transition-all duration-300 shadow-lg">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-bounce shadow-lg shadow-red-500/50"></span>
              </button>

              <button 
                onClick={() => setShowMessaging(true)}
                className="relative p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-400/30 text-purple-200 hover:text-white hover:from-purple-500/30 hover:to-pink-500/30 rounded-2xl transition-all duration-300 shadow-lg"
              >
                <MessageCircle className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></span>
              </button>

              {/* Core Action Tools */}
              <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-gray-700">
                <button
                  onClick={() => setShowUnifiedBrowser(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-indigo-500/20 to-indigo-600/20 border border-indigo-500/30 text-indigo-200 hover:from-indigo-500/30 hover:to-indigo-600/30 rounded-xl transition-all duration-300 shadow-lg hover:shadow-indigo-500/20"
                  title="AI Browser"
                >
                  <Globe className="w-4 h-4" />
                  <span className="hidden lg:inline text-sm font-medium">AI Browser</span>
                </button>

                <button
                  onClick={() => setShowDocumentBrowser(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-violet-500/20 to-violet-600/20 border border-violet-500/30 text-violet-200 hover:from-violet-500/30 hover:to-violet-600/30 rounded-xl transition-all duration-300 shadow-lg hover:shadow-violet-500/20"
                  title="Document Browser"
                >
                  <Briefcase className="w-4 h-4" />
                  <span className="hidden lg:inline text-sm font-medium">Documents</span>
                </button>

                <button
                  onClick={() => console.log('Legal Research clicked')}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-purple-600/20 border border-purple-500/30 text-purple-200 hover:from-purple-500/30 hover:to-purple-600/30 rounded-xl transition-all duration-300 shadow-lg hover:shadow-purple-500/20"
                  title="Legal Research"
                >
                  <Scale className="w-4 h-4" />
                  <span className="hidden lg:inline text-sm font-medium">Research</span>
                </button>
              </div>

              <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-gray-700">
                <div className="text-right">
                  <p className="text-sm font-semibold text-white">{userRole?.name || 'Douglas Hicks'}</p>
                  <p className="text-xs text-gray-400">{userRole?.title || 'Senior Partner'}</p>
                </div>
                <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
                  <User className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="relative px-8 py-10">
        
        {/* Critical AI Insights - Modern Card */}
        <div className="relative group mb-10">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-orange-500/20 to-pink-500/20 rounded-3xl blur-xl group-hover:blur-lg transition-all duration-500"></div>
          <div className="relative bg-white/5 backdrop-blur-2xl border border-red-400/30 rounded-3xl p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-red-500/25">
                  <AlertTriangle className="w-8 h-8 text-white animate-pulse" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-red-200 to-orange-200 bg-clip-text text-transparent">
                    Critical AI Alert
                  </h3>
                  <p className="text-slate-300 font-medium">Immediate action required on 2 cases</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                    <span className="text-slate-400 text-sm">High priority settlements pending</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setShowPrediction(true)}
                className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 text-white rounded-2xl font-semibold transition-all hover:scale-105 shadow-xl shadow-red-500/25"
              >
                View Details
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-6">
              {aiPredictions.settlements.slice(0, 3).map((pred, index) => (
                <div key={index} className={`relative group/card p-6 rounded-2xl backdrop-blur-sm transition-all hover:scale-105 ${
                  pred.urgency === 'critical' ? 'bg-red-500/10 border border-red-400/40 hover:bg-red-500/20' :
                  pred.urgency === 'high' ? 'bg-orange-500/10 border border-orange-400/40 hover:bg-orange-500/20' :
                  'bg-yellow-500/10 border border-yellow-400/40 hover:bg-yellow-500/20'
                } shadow-xl`}>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-bold text-white">{pred.probability}%</span>
                    <Zap className={`w-6 h-6 ${
                      pred.urgency === 'critical' ? 'text-red-400' :
                      pred.urgency === 'high' ? 'text-orange-400' :
                      'text-yellow-400'
                    } group-hover/card:animate-pulse`} />
                  </div>
                  <p className="text-white font-semibold mb-2">{pred.case}</p>
                  <p className="text-slate-300 text-sm mb-3">Settlement: {pred.value}</p>
                  <p className="text-purple-300 font-medium text-sm">→ {pred.action}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Key Metrics with Modern Glassmorphism */}
        <div className="grid grid-cols-4 gap-6 mb-10">
          {[
            { 
              label: 'Win Rate', 
              value: '94%', 
              change: '+12%', 
              icon: <Award className="w-7 h-7" />,
              aiInsight: 'Top 1% nationally',
              gradient: 'from-purple-500 to-pink-500',
              bgGlow: 'purple-500/20'
            },
            { 
              label: 'Active Cases', 
              value: '23', 
              change: '$14.2M value', 
              icon: <Briefcase className="w-7 h-7" />,
              aiInsight: 'Optimal capacity',
              gradient: 'from-blue-500 to-cyan-500',
              bgGlow: 'blue-500/20'
            },
            { 
              label: 'Settlement Rate', 
              value: '87%', 
              change: '+$2.3M saved', 
              icon: <DollarSign className="w-7 h-7" />,
              aiInsight: 'Above target',
              gradient: 'from-green-500 to-emerald-500',
              bgGlow: 'green-500/20'
            },
            { 
              label: 'AI Efficiency', 
              value: '10.3x', 
              change: '↑ 283% YoY', 
              icon: <Zap className="w-7 h-7" />,
              aiInsight: 'Industry leading',
              gradient: 'from-yellow-500 to-orange-500',
              bgGlow: 'yellow-500/20'
            }
          ].map((metric, index) => (
            <div key={index} className="relative group cursor-pointer">
              <div className={`absolute inset-0 bg-gradient-to-r ${metric.gradient} opacity-20 rounded-3xl blur-xl group-hover:opacity-30 transition-all duration-500`}></div>
              <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-2xl hover:scale-105 transition-all duration-300 group-hover:border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${metric.gradient} rounded-2xl flex items-center justify-center shadow-xl shadow-${metric.bgGlow} group-hover:scale-110 transition-all duration-300`}>
                    {metric.icon}
                  </div>
                  <TrendingUp className="w-5 h-5 text-green-400 group-hover:animate-pulse" />
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent mb-2">
                  {metric.value}
                </div>
                <div className="text-slate-300 font-medium mb-2">{metric.label}</div>
                <div className="text-green-400 text-sm font-medium mb-3">{metric.change}</div>
                <div className="flex items-center text-purple-300 text-sm font-medium">
                  <Sparkles className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                  {metric.aiInsight}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Dashboard Grid - Modern Layout */}
        <div className="grid grid-cols-3 gap-8">
          
          {/* Active Cases with AI Scoring - Enhanced */}
          <div className="col-span-2 relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-xl group-hover:blur-lg transition-all duration-500"></div>
            <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">Active Cases</h3>
              <button className="text-sm text-purple-400 hover:text-purple-300 font-medium">View All →</button>
            </div>
            
            <div className="space-y-4">
              {activeCases.map((case_item) => (
                <div 
                  key={case_item.id}
                  onClick={() => setSelectedCase(case_item)}
                  className="p-5 rounded-2xl border border-gray-700/50 hover:border-purple-500/50 bg-gray-800/50 hover:bg-gray-800 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        case_item.aiScore > 90 ? 'bg-green-400' :
                        case_item.aiScore > 80 ? 'bg-yellow-400' :
                        'bg-orange-400'
                      } animate-pulse`}></div>
                      <h4 className="font-semibold text-white group-hover:text-purple-300 transition-colors">
                        {case_item.name}
                      </h4>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="px-3 py-1 bg-purple-900/30 rounded-full">
                        <span className="text-xs font-bold text-purple-300">AI: {case_item.aiScore}%</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-purple-400 transition-colors" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="text-gray-400">Status: {case_item.status}</span>
                      <span className="text-yellow-400">⏰ {case_item.deadline}</span>
                      <span className="text-green-400 font-semibold">{case_item.value}</span>
                    </div>
                    <div className="text-xs text-purple-400 font-medium">
                      Next: {case_item.nextAction}
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-gray-700/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Brain className="w-4 h-4 text-purple-400" />
                        <span className="text-xs text-gray-400">AI recommends immediate action</span>
                      </div>
                      <button className="text-xs text-purple-400 hover:text-purple-300 font-medium">
                        Generate Strategy →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Today's AI-Optimized Schedule */}
          <div className="bg-gray-900 rounded-3xl p-6 border border-gray-700/50">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Today's Schedule</h3>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-purple-400">AI-Optimized</span>
              </div>
            </div>
            
            <div className="space-y-3">
              {intelligentSchedule.map((item, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-2xl border transition-all hover:scale-[1.02] cursor-pointer ${
                    item.type === 'critical' ? 'bg-red-900/20 border-red-500/30' :
                    item.type === 'court' ? 'bg-purple-900/20 border-purple-500/30' :
                    item.type === 'ai-session' ? 'bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-purple-500/30' :
                    'bg-gray-800/50 border-gray-600/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white">{item.time}</span>
                    <span className="text-xs text-gray-400">{item.duration}</span>
                  </div>
                  <div className="font-semibold text-white mb-2">{item.title}</div>
                  <div className="text-xs text-purple-400 mb-2">{item.aiNote}</div>
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {item.participants.slice(0, 3).map((_, i) => (
                        <div key={i} className="w-6 h-6 bg-gray-700 rounded-full border-2 border-gray-900"></div>
                      ))}
                    </div>
                    <button className="text-xs text-purple-400 hover:text-purple-300">Join →</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        </div>

        {/* AI Quick Actions Bar */}
        <div className="mt-8 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-3xl p-6 border border-purple-500/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-white">Maya AI Quick Actions</h4>
                <p className="text-xs text-gray-400">Voice enabled • Say "Hey Maya" to activate</p>
              </div>
            </div>
            
            <div className="flex space-x-3">
              {[
                { label: 'Draft Motion', icon: <FileText className="w-4 h-4" /> },
                { label: 'Case Analysis', icon: <BarChart3 className="w-4 h-4" /> },
                { label: 'Legal Research', icon: <Search className="w-4 h-4" /> },
                { label: 'Settlement Calc', icon: <DollarSign className="w-4 h-4" /> }
              ].map((action, index) => (
                <button
                  key={index}
                  onClick={() => setAiActive(true)}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-xl font-medium transition-all hover:scale-105 flex items-center space-x-2"
                >
                  {action.icon}
                  <span className="text-sm">{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>


      {/* Legal Messaging Hub Modal */}
      {showMessaging && (
        <LegalMessagingHub 
          isOpen={showMessaging}
          onClose={() => setShowMessaging(false)}
          userRole={userRole}
        />
      )}

      {/* Document Browser Modal */}
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

      {/* Document Viewer Modal */}
      {selectedDocument && (
        <DocumentViewer
          document={selectedDocument}
          onClose={() => setSelectedDocument(null)}
          userRole={userRole}
          collaborators={['Carl Douglas', 'Sarah Johnson', 'Michael Chen']}
        />
      )}

      {/* Document Version Control Modal */}
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

      {/* Collaboration Hub */}
      <CollaborationHub
        document={selectedDocument}
        isActive={showCollaboration}
        onToggle={() => setShowCollaboration(!showCollaboration)}
        userRole={userRole}
      />

      {/* Unified Browser with AI Assistant */}
      <UnifiedBrowser
        isOpen={showUnifiedBrowser}
        onClose={() => setShowUnifiedBrowser(false)}
        userRole={userRole}
      />
    </div>
  )
}

export default AttorneyCommandCenter