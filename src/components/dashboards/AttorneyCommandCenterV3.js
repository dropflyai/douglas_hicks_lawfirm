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
  PlayCircle, PauseCircle, RefreshCw, Maximize2,
  BookOpen, Gavel, FileSearch, Edit, Calculator,
  Video, Mail, Database, HelpCircle, MousePointer,
  LayoutGrid, List, Grid3x3
} from 'lucide-react'
import LegalMessagingHub from '../messaging/LegalMessagingHub'
import WorkspaceBrowser from '../browser/WorkspaceBrowser'
import AIAssistant from '../ai/AIAssistant'
import CaseManagerDashboard from '../case-management/CaseManagerDashboard'

const AttorneyCommandCenterV3 = ({ userRole, aiActive, setAiActive }) => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedWorkspace, setSelectedWorkspace] = useState('dashboard')
  const [aiVoiceActive, setAiVoiceActive] = useState(false)
  const [expandedCard, setExpandedCard] = useState(null)
  const [selectedCase, setSelectedCase] = useState(null)
  const [showMessaging, setShowMessaging] = useState(false)
  const [navigationHistory, setNavigationHistory] = useState(['dashboard'])
  const [historyIndex, setHistoryIndex] = useState(0)

  // Navigation functions (moved before useEffect to avoid hoisting issues)
  const navigateTo = (workspace) => {
    // Add to history
    const newHistory = navigationHistory.slice(0, historyIndex + 1)
    newHistory.push(workspace)
    setNavigationHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
    setSelectedWorkspace(workspace)
  }

  const navigateBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1
      setHistoryIndex(newIndex)
      setSelectedWorkspace(navigationHistory[newIndex])
      return true
    }
    return false
  }

  const navigateForward = () => {
    if (historyIndex < navigationHistory.length - 1) {
      const newIndex = historyIndex + 1
      setHistoryIndex(newIndex)
      setSelectedWorkspace(navigationHistory[newIndex])
      return true
    }
    return false
  }

  const toggleVoiceAssistant = () => {
    setAiVoiceActive(!aiVoiceActive)
    setAiActive(true)
  }

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])


  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event) => {
      // Alt + key combinations for navigation
      if (event.altKey) {
        switch (event.key) {
          case '1':
            event.preventDefault()
            navigateTo('cases')
            break
          case '2':
            event.preventDefault()
            navigateTo('documents')
            break
          case '3':
            event.preventDefault()
            navigateTo('research')
            break
          case '4':
            event.preventDefault()
            navigateTo('calendar')
            break
          case '5':
            event.preventDefault()
            navigateTo('billing')
            break
          case 'm':
            event.preventDefault()
            toggleVoiceAssistant()
            break
          case 'h':
            event.preventDefault()
            navigateTo('dashboard')
            break
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [navigateTo, toggleVoiceAssistant])

  // Attorney Tools
  const attorneyTools = [
    { id: 'cases', name: 'Cases', icon: Briefcase, color: 'blue', description: 'Manage active cases' },
    { id: 'documents', name: 'Documents', icon: FileText, color: 'green', description: 'Legal documents' },
    { id: 'research', name: 'Research', icon: FileSearch, color: 'purple', description: 'Legal research' },
    { id: 'calendar', name: 'Calendar', icon: Calendar, color: 'orange', description: 'Court dates & meetings' },
    { id: 'billing', name: 'Billing', icon: DollarSign, color: 'yellow', description: 'Time & billing' },
    { id: 'contacts', name: 'Contacts', icon: Users, color: 'cyan', description: 'Client contacts' },
    { id: 'court', name: 'Court', icon: Gavel, color: 'red', description: 'Court filings' },
    { id: 'messages', name: 'Messages', icon: Mail, color: 'pink', description: 'Communications' },
    { id: 'video', name: 'Video', icon: Video, color: 'indigo', description: 'Video meetings' },
  ]

  // Sample cases data
  const cases = [
    {
      id: 1,
      name: 'Johnson v. Metro Insurance',
      type: 'Personal Injury',
      status: 'Settlement Negotiations',
      priority: 'critical',
      client: 'Sarah Johnson',
      value: '$340K',
      deadline: '2 days',
      progress: 85,
      documents: 124,
      lastUpdate: '10 minutes ago',
      nextAction: 'Review settlement draft',
      team: ['Carl Douglass', 'Sarah Johnson', 'Michael Chen']
    },
    {
      id: 2,
      name: 'State v. Rodriguez',
      type: 'Criminal Defense',
      status: 'Trial Preparation',
      priority: 'high',
      client: 'Miguel Rodriguez',
      value: 'Pro Bono',
      deadline: '1 week',
      progress: 60,
      documents: 89,
      lastUpdate: '2 hours ago',
      nextAction: 'Prepare witness testimony',
      team: ['Carl Douglass', 'Jennifer Davis']
    },
    {
      id: 3,
      name: 'Williams Estate Planning',
      type: 'Estate Planning',
      status: 'Document Review',
      priority: 'medium',
      client: 'Robert Williams',
      value: '$25K',
      deadline: '2 weeks',
      progress: 40,
      documents: 34,
      lastUpdate: '1 day ago',
      nextAction: 'Finalize trust documents',
      team: ['Jamon Hicks', 'Maria Rodriguez']
    }
  ]


  const handleToolClick = (toolId) => {
    if (toolId === 'messages') {
      setShowMessaging(true)
    } else {
      navigateTo(toolId)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      
      {/* Professional Header */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-700">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            
            {/* Left: Firm Branding */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <Scale className="w-8 h-8 text-gold-400" />
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
                    Douglass & Hicks Law Firm
                  </h1>
                  <p className="text-xs text-gray-400">Attorney Command Center</p>
                </div>
              </div>
            </div>

            {/* Center: Quick Stats */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Briefcase className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-gray-300">12 Active Cases</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-orange-400" />
                <span className="text-sm text-gray-300">3 Urgent Deadlines</span>
              </div>
              <div className="flex items-center space-x-2">
                <DollarSign className="w-4 h-4 text-green-400" />
                <span className="text-sm text-gray-300">$2.4M Pipeline</span>
              </div>
            </div>

            {/* Right: User & Time */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400">
                {currentTime.toLocaleString('en-US', { 
                  weekday: 'short', 
                  month: 'short', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
              <div className="flex items-center space-x-2">
                <Bell className="w-5 h-5 text-gray-400 cursor-pointer hover:text-white" />
                <Settings className="w-5 h-5 text-gray-400 cursor-pointer hover:text-white" />
              </div>
              <div className="flex items-center space-x-3 pl-4 border-l border-gray-700">
                <div className="text-right">
                  <div className="text-sm font-medium text-white">{userRole?.name || 'Carl Douglass'}</div>
                  <div className="text-xs text-gray-400">Senior Partner</div>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Attorney Toolbar */}
        <div className="px-6 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {attorneyTools.map((tool) => {
                const Icon = tool.icon
                return (
                  <button
                    key={tool.id}
                    onClick={() => handleToolClick(tool.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                      selectedWorkspace === tool.id
                        ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-black shadow-lg'
                        : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{tool.name}</span>
                  </button>
                )
              })}
            </div>

            {/* Single Maya AI Button with Voice */}
            <button
              onClick={toggleVoiceAssistant}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                aiVoiceActive
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/30 animate-pulse'
                  : 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 shadow-lg'
              }`}
            >
              <Brain className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">Maya AI</span>
              {aiVoiceActive ? (
                <Mic className="w-4 h-4 text-white" />
              ) : (
                <MicOff className="w-4 h-4 text-white/60" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1">
        {selectedWorkspace === 'dashboard' ? (
          // Dashboard View
          <div className="p-6">
            <div className="grid grid-cols-12 gap-6">
              
              {/* Priority Cases */}
              <div className="col-span-8">
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                      <Briefcase className="w-5 h-5 text-blue-400" />
                      <span>Active Cases</span>
                    </h2>
                    <button className="text-sm text-gray-400 hover:text-white flex items-center space-x-1">
                      <span>View All</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    {cases.map((case_) => (
                      <div
                        key={case_.id}
                        className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:bg-gray-800 transition-all cursor-pointer"
                        onClick={() => {
                          setSelectedCase(case_)
                          navigateTo('case-detail')
                        }}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="font-semibold text-white">{case_.name}</h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                case_.priority === 'critical' 
                                  ? 'bg-red-500/20 text-red-400'
                                  : case_.priority === 'high'
                                  ? 'bg-orange-500/20 text-orange-400'
                                  : 'bg-blue-500/20 text-blue-400'
                              }`}>
                                {case_.priority.toUpperCase()}
                              </span>
                              <span className="text-xs text-gray-400">{case_.type}</span>
                            </div>
                            
                            <div className="grid grid-cols-4 gap-4 mb-3">
                              <div>
                                <p className="text-xs text-gray-400">Client</p>
                                <p className="text-sm text-gray-300">{case_.client}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-400">Value</p>
                                <p className="text-sm font-semibold text-green-400">{case_.value}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-400">Deadline</p>
                                <p className="text-sm text-orange-400">{case_.deadline}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-400">Documents</p>
                                <p className="text-sm text-gray-300">{case_.documents}</p>
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <span className="text-xs text-gray-400">Next:</span>
                                <span className="text-xs text-blue-400">{case_.nextAction}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="flex -space-x-2">
                                  {case_.team.slice(0, 3).map((member, idx) => (
                                    <div
                                      key={idx}
                                      className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full border-2 border-gray-900 flex items-center justify-center"
                                      title={member}
                                    >
                                      <span className="text-xs text-white">{member[0]}</span>
                                    </div>
                                  ))}
                                </div>
                                <span className="text-xs text-gray-500">Updated {case_.lastUpdate}</span>
                              </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="mt-3">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs text-gray-400">Progress</span>
                                <span className="text-xs text-gray-400">{case_.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-700 rounded-full h-2">
                                <div
                                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
                                  style={{ width: `${case_.progress}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="col-span-4 space-y-6">
                
                {/* Enhanced Calendar with Maya AI */}
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                      <Calendar className="w-5 h-5 text-orange-400" />
                      <span>Smart Calendar</span>
                    </h3>
                    <button 
                      onClick={() => {
                        setAiActive(true)
                        setAiVoiceActive(true)
                      }}
                      className="p-2 bg-purple-600/20 hover:bg-purple-600/30 rounded-lg transition-all group"
                      title="Ask Maya about your schedule"
                    >
                      <Brain className="w-4 h-4 text-purple-400 group-hover:text-purple-300" />
                    </button>
                  </div>

                  {/* Calendar Navigation */}
                  <div className="flex items-center justify-between mb-4 p-2 bg-gray-800/30 rounded-lg">
                    <button className="p-1 hover:bg-gray-700/50 rounded">
                      <ChevronUp className="w-4 h-4 text-gray-400" />
                    </button>
                    <span className="text-sm font-medium text-white">
                      {currentTime.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                    <button className="p-1 hover:bg-gray-700/50 rounded">
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    {/* Current Time Indicator */}
                    <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-lg">
                      <div className="text-center">
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-blue-300">Now: {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
                        <p className="text-xs text-gray-400">Maya AI ready to assist with scheduling</p>
                      </div>
                      <Brain className="w-4 h-4 text-purple-400" />
                    </div>

                    {/* Enhanced Schedule Items */}
                    <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-all cursor-pointer border-l-4 border-orange-500">
                      <div className="text-center">
                        <p className="text-xs text-gray-400">9:00</p>
                        <p className="text-xs text-gray-400">AM</p>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <p className="text-sm font-medium text-white">Client Meeting</p>
                          <span className="px-2 py-1 bg-orange-500/20 text-orange-400 text-xs rounded-full">In 30 min</span>
                        </div>
                        <p className="text-xs text-gray-400">Johnson Case Review • Settlement Discussion</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-blue-400">🎯 Maya suggests: Review settlement terms</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-center space-y-1">
                        <Video className="w-4 h-4 text-blue-400" />
                        <button 
                          onClick={() => navigateTo('video')}
                          className="text-xs text-gray-500 hover:text-gray-300"
                        >
                          Join
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-all cursor-pointer border-l-4 border-red-500">
                      <div className="text-center">
                        <p className="text-xs text-gray-400">2:00</p>
                        <p className="text-xs text-gray-400">PM</p>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <p className="text-sm font-medium text-white">Court Hearing</p>
                          <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-full">Critical</span>
                        </div>
                        <p className="text-xs text-gray-400">State v. Rodriguez • Motion Hearing</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-purple-400">💡 Maya reminder: Bring witness statements</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-center space-y-1">
                        <Gavel className="w-4 h-4 text-red-400" />
                        <button 
                          onClick={() => navigateTo('court')}
                          className="text-xs text-gray-500 hover:text-gray-300"
                        >
                          Prep
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-all cursor-pointer border-l-4 border-green-500">
                      <div className="text-center">
                        <p className="text-xs text-gray-400">4:30</p>
                        <p className="text-xs text-gray-400">PM</p>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <p className="text-sm font-medium text-white">Document Review</p>
                          <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">On Track</span>
                        </div>
                        <p className="text-xs text-gray-400">Williams Estate • Trust Documents</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-green-400">✅ Maya prepared: Key sections highlighted</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-center space-y-1">
                        <FileText className="w-4 h-4 text-green-400" />
                        <button 
                          onClick={() => navigateTo('documents')}
                          className="text-xs text-gray-500 hover:text-gray-300"
                        >
                          Open
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Maya Quick Actions for Calendar */}
                  <div className="mt-4 p-3 bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-700/30 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-purple-300">Maya Calendar Assistant</span>
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => {
                            setAiActive(true)
                            setAiVoiceActive(true)
                          }}
                          className="text-xs text-purple-400 hover:text-purple-300 px-2 py-1 bg-purple-600/20 rounded"
                        >
                          Schedule Meeting
                        </button>
                        <button 
                          onClick={() => {
                            setAiActive(true)
                            setAiVoiceActive(true)
                          }}
                          className="text-xs text-purple-400 hover:text-purple-300 px-2 py-1 bg-purple-600/20 rounded"
                        >
                          Find Conflicts
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => navigateTo('documents')}
                      className="p-3 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-colors flex flex-col items-center space-y-1"
                    >
                      <FileText className="w-5 h-5" />
                      <span className="text-xs">New Document</span>
                    </button>
                    <button 
                      onClick={() => navigateTo('billing')}
                      className="p-3 bg-green-600/20 text-green-400 rounded-lg hover:bg-green-600/30 transition-colors flex flex-col items-center space-y-1"
                    >
                      <Calculator className="w-5 h-5" />
                      <span className="text-xs">Time Entry</span>
                    </button>
                    <button 
                      onClick={() => navigateTo('research')}
                      className="p-3 bg-purple-600/20 text-purple-400 rounded-lg hover:bg-purple-600/30 transition-colors flex flex-col items-center space-y-1"
                    >
                      <FileSearch className="w-5 h-5" />
                      <span className="text-xs">Research</span>
                    </button>
                    <button 
                      onClick={() => navigateTo('messages')}
                      className="p-3 bg-orange-600/20 text-orange-400 rounded-lg hover:bg-orange-600/30 transition-colors flex flex-col items-center space-y-1"
                    >
                      <Mail className="w-5 h-5" />
                      <span className="text-xs">Email Client</span>
                    </button>
                  </div>
                </div>

                {/* AI Insights */}
                <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-700/50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                    <Brain className="w-5 h-5 text-purple-400" />
                    <span>Maya AI Insights</span>
                  </h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-800/50 rounded-lg">
                      <p className="text-sm text-gray-300">
                        <span className="text-yellow-400">⚠️</span> Settlement deadline approaching for Johnson case - prepare final terms
                      </p>
                    </div>
                    <div className="p-3 bg-gray-800/50 rounded-lg">
                      <p className="text-sm text-gray-300">
                        <span className="text-green-400">✓</span> All discovery documents submitted for Rodriguez case
                      </p>
                    </div>
                    <div className="p-3 bg-gray-800/50 rounded-lg">
                      <p className="text-sm text-gray-300">
                        <span className="text-blue-400">📊</span> 85% win rate on similar personal injury cases
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : selectedWorkspace === 'case-detail' ? (
          // Enhanced Case Management Dashboard
          <CaseManagerDashboard
            selectedCase={selectedCase}
            onBack={navigateBack}
            onNavigate={navigateTo}
            setAiActive={setAiActive}
            setAiVoiceActive={setAiVoiceActive}
          />
        ) : (
          // Workspace Browser (Documents, Research, etc.)
          <WorkspaceBrowser 
            workspace={selectedWorkspace}
            selectedCase={selectedCase}
            onBack={navigateBack}
            onForward={navigateForward}
            onNavigate={navigateTo}
            canGoBack={historyIndex > 0}
            canGoForward={historyIndex < navigationHistory.length - 1}
            setAiActive={setAiActive}
            setAiVoiceActive={setAiVoiceActive}
          />
        )}
      </div>

      {/* Maya AI Assistant - Single Instance */}
      {aiActive && (
        <AIAssistant
          active={aiActive}
          setActive={setAiActive}
          userRole={userRole}
          voiceActive={aiVoiceActive}
          setVoiceActive={setAiVoiceActive}
          context={{
            workspace: selectedWorkspace,
            case: selectedCase,
            // Pass current document/case context to Maya
          }}
        />
      )}

      {/* Messaging Hub */}
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

export default AttorneyCommandCenterV3