'use client'

import { useState, useEffect } from 'react'
import {
  Briefcase, Clock, Calendar, Users, FileText, DollarSign,
  AlertTriangle, CheckCircle, Target, Brain, Filter,
  SortAsc, Search, Plus, Edit, Trash2, Share2, Eye,
  MessageCircle, Phone, Mail, Video, Gavel, Scale,
  BarChart3, TrendingUp, Award, Flag, Tag, Bookmark,
  ExternalLink, Download, Upload, Copy, Settings,
  PlayCircle, PauseCircle, Square, ChevronDown,
  ChevronRight, MoreVertical, Star, Bell, RefreshCw,
  FileSearch, Calculator, Grid3x3, List, Maximize2,
  Minimize2, ArrowRight, ArrowLeft, Home, X, Mic,
  MicOff, Volume2
} from 'lucide-react'

const CaseManagerDashboard = ({ 
  selectedCase, 
  onBack, 
  onNavigate, 
  setAiActive, 
  setAiVoiceActive 
}) => {
  const [activeView, setActiveView] = useState('overview')
  const [filterStatus, setFilterStatus] = useState('all')
  const [sortBy, setSortBy] = useState('priority')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTasks, setSelectedTasks] = useState([])
  const [timeTracking, setTimeTracking] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [aiVoiceActive, setAiVoiceActiveLocal] = useState(false)

  // Sample case data with enhanced details
  const caseData = selectedCase || {
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
    team: ['Carl Douglass', 'Sarah Johnson', 'Michael Chen'],
    // Enhanced case management data
    filingDate: '2024-03-15',
    courtDate: '2024-08-30',
    statute: '2026-03-15',
    discovery: {
      deadline: '2024-08-15',
      completed: 90,
      pending: ['Expert witness depositions']
    },
    settlement: {
      demand: '$500K',
      lastOffer: '$300K',
      counterOffer: '$340K',
      negotiations: 8
    }
  }

  // Case management tools and their productivity ratings
  const caseTools = [
    {
      id: 'timeline',
      name: 'Case Timeline',
      icon: Calendar,
      description: 'Track all deadlines and milestones',
      productivity: 9.5,
      category: 'planning'
    },
    {
      id: 'tasks',
      name: 'Task Manager',
      icon: CheckCircle,
      description: 'Manage case tasks and workflows',
      productivity: 9.2,
      category: 'workflow'
    },
    {
      id: 'discovery',
      name: 'Discovery Tracker',
      icon: FileSearch,
      description: 'Manage discovery requests and responses',
      productivity: 8.8,
      category: 'discovery'
    },
    {
      id: 'settlement',
      name: 'Settlement Hub',
      icon: DollarSign,
      description: 'Track negotiations and offers',
      productivity: 8.5,
      category: 'settlement'
    },
    {
      id: 'documents',
      name: 'Document Center',
      icon: FileText,
      description: 'Organize and version case documents',
      productivity: 9.0,
      category: 'documents'
    },
    {
      id: 'communications',
      name: 'Client Communications',
      icon: MessageCircle,
      description: 'Secure client messaging and updates',
      productivity: 8.7,
      category: 'client'
    },
    {
      id: 'billing',
      name: 'Time & Billing',
      icon: Calculator,
      description: 'Track time and generate invoices',
      productivity: 9.1,
      category: 'billing'
    },
    {
      id: 'research',
      name: 'Legal Research',
      icon: BookOpen,
      description: 'Integrated legal research tools',
      productivity: 8.3,
      category: 'research'
    }
  ]

  // Sample tasks for demonstration
  const caseTasks = [
    {
      id: 1,
      title: 'Review settlement agreement draft',
      priority: 'high',
      status: 'in-progress',
      assignee: 'Carl Douglass',
      dueDate: '2024-08-28',
      category: 'settlement',
      timeEstimate: '2 hours',
      completed: false
    },
    {
      id: 2,
      title: 'Prepare client for deposition',
      priority: 'high',
      status: 'pending',
      assignee: 'Jennifer Davis',
      dueDate: '2024-08-29',
      category: 'discovery',
      timeEstimate: '3 hours',
      completed: false
    },
    {
      id: 3,
      title: 'File motion for summary judgment',
      priority: 'medium',
      status: 'planning',
      assignee: 'Michael Chen',
      dueDate: '2024-09-05',
      category: 'court',
      timeEstimate: '4 hours',
      completed: false
    },
    {
      id: 4,
      title: 'Update client on settlement progress',
      priority: 'medium',
      status: 'completed',
      assignee: 'Sarah Johnson',
      dueDate: '2024-08-25',
      category: 'client',
      timeEstimate: '0.5 hours',
      completed: true
    }
  ]

  // Time tracking effect
  useEffect(() => {
    let interval
    if (timeTracking) {
      interval = setInterval(() => {
        setElapsedTime(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [timeTracking])

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const toggleTimeTracking = () => {
    setTimeTracking(!timeTracking)
    if (!timeTracking) {
      setElapsedTime(0) // Reset when starting new session
    }
  }

  const toggleVoiceAssistant = () => {
    setAiVoiceActiveLocal(!aiVoiceActive)
    setAiVoiceActive(!aiVoiceActive)
    setAiActive(true)
  }

  return (
    <div className="h-full flex flex-col bg-black text-white">
      
      {/* Enhanced Top Toolbar - Consistent across all dashboards */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between mb-4">
          
          {/* Left: Navigation & Case Info */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">{caseData.name}</h1>
                <div className="flex items-center space-x-3 text-sm text-gray-400">
                  <span>{caseData.type}</span>
                  <span>•</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    caseData.priority === 'critical' 
                      ? 'bg-red-500/20 text-red-400'
                      : caseData.priority === 'high'
                      ? 'bg-orange-500/20 text-orange-400'
                      : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {caseData.priority.toUpperCase()}
                  </span>
                  <span>•</span>
                  <span className="text-green-400">{caseData.value}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Center: Case Tools Navigation */}
          <div className="flex items-center space-x-1">
            {caseTools.slice(0, 6).map((tool) => {
              const Icon = tool.icon
              return (
                <button
                  key={tool.id}
                  onClick={() => setActiveView(tool.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all text-sm ${
                    activeView === tool.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                      : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tool.name}</span>
                </button>
              )
            })}
            
            {/* More tools dropdown */}
            <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>

          {/* Right: Actions & Maya AI */}
          <div className="flex items-center space-x-3">
            
            {/* Time Tracking */}
            <div className="flex items-center space-x-2 px-3 py-2 bg-gray-800 rounded-lg">
              <button
                onClick={toggleTimeTracking}
                className={`p-1 rounded transition-colors ${
                  timeTracking ? 'text-red-400 hover:text-red-300' : 'text-green-400 hover:text-green-300'
                }`}
              >
                {timeTracking ? <PauseCircle className="w-4 h-4" /> : <PlayCircle className="w-4 h-4" />}
              </button>
              <span className="text-sm font-mono text-white min-w-[60px]">
                {formatTime(elapsedTime)}
              </span>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center space-x-1">
              <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                <Search className="w-4 h-4" />
              </button>
              <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                <Filter className="w-4 h-4" />
              </button>
              <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                <Settings className="w-4 h-4" />
              </button>
            </div>

            {/* Maya AI Assistant */}
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

        {/* Case Progress Bar */}
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-400">Case Progress</span>
              <span className="text-xs text-gray-400">{caseData.progress}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all"
                style={{ width: `${caseData.progress}%` }}
              />
            </div>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <span>Due: {caseData.deadline}</span>
            <span>•</span>
            <span>Team: {caseData.team.length}</span>
            <span>•</span>
            <span>Docs: {caseData.documents}</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 overflow-y-auto">
        
        {activeView === 'overview' && (
          <div className="grid grid-cols-12 gap-6">
            
            {/* Case Overview */}
            <div className="col-span-8 space-y-6">
              
              {/* Key Metrics */}
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Settlement Value</p>
                      <p className="text-xl font-bold text-green-400">{caseData.value}</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-green-400/30" />
                  </div>
                </div>
                
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Days to Deadline</p>
                      <p className="text-xl font-bold text-orange-400">2</p>
                    </div>
                    <Clock className="w-8 h-8 text-orange-400/30" />
                  </div>
                </div>
                
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Discovery</p>
                      <p className="text-xl font-bold text-blue-400">{caseData.discovery.completed}%</p>
                    </div>
                    <FileSearch className="w-8 h-8 text-blue-400/30" />
                  </div>
                </div>
                
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Team Members</p>
                      <p className="text-xl font-bold text-purple-400">{caseData.team.length}</p>
                    </div>
                    <Users className="w-8 h-8 text-purple-400/30" />
                  </div>
                </div>
              </div>

              {/* Recent Tasks */}
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-blue-400" />
                    <span>Active Tasks</span>
                  </h3>
                  <button
                    onClick={() => setActiveView('tasks')}
                    className="text-sm text-blue-400 hover:text-blue-300 flex items-center space-x-1"
                  >
                    <span>View All</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-3">
                  {caseTasks.filter(task => !task.completed).slice(0, 3).map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          task.priority === 'high' ? 'bg-red-400' : 
                          task.priority === 'medium' ? 'bg-orange-400' : 'bg-blue-400'
                        }`} />
                        <div>
                          <p className="text-sm font-medium text-white">{task.title}</p>
                          <p className="text-xs text-gray-400">
                            {task.assignee} • Due: {task.dueDate} • Est: {task.timeEstimate}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          task.status === 'in-progress' ? 'bg-blue-500/20 text-blue-400' :
                          task.status === 'pending' ? 'bg-orange-500/20 text-orange-400' :
                          'bg-gray-500/20 text-gray-400'
                        }`}>
                          {task.status}
                        </span>
                        <button className="p-1 hover:bg-gray-700 rounded">
                          <Edit className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="col-span-4 space-y-6">
              
              {/* Settlement Tracker */}
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                  <DollarSign className="w-5 h-5 text-green-400" />
                  <span>Settlement Progress</span>
                </h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-green-900/20 border border-green-700/30 rounded-lg">
                    <span className="text-sm text-gray-300">Our Demand</span>
                    <span className="text-sm font-bold text-green-400">{caseData.settlement.demand}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-red-900/20 border border-red-700/30 rounded-lg">
                    <span className="text-sm text-gray-300">Their Offer</span>
                    <span className="text-sm font-bold text-red-400">{caseData.settlement.lastOffer}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-blue-900/20 border border-blue-700/30 rounded-lg">
                    <span className="text-sm text-gray-300">Counter Offer</span>
                    <span className="text-sm font-bold text-blue-400">{caseData.settlement.counterOffer}</span>
                  </div>
                  
                  <div className="text-center pt-2">
                    <span className="text-xs text-gray-400">
                      {caseData.settlement.negotiations} rounds of negotiation
                    </span>
                  </div>
                </div>
              </div>

              {/* Case Timeline */}
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-orange-400" />
                  <span>Key Dates</span>
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-2 rounded-lg">
                    <div className="w-2 h-2 bg-blue-400 rounded-full" />
                    <div className="flex-1">
                      <p className="text-sm text-white">Filing Date</p>
                      <p className="text-xs text-gray-400">{caseData.filingDate}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-2 rounded-lg">
                    <div className="w-2 h-2 bg-orange-400 rounded-full" />
                    <div className="flex-1">
                      <p className="text-sm text-white">Discovery Deadline</p>
                      <p className="text-xs text-gray-400">{caseData.discovery.deadline}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-2 bg-red-900/20 border border-red-700/30 rounded-lg">
                    <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                    <div className="flex-1">
                      <p className="text-sm text-white font-medium">Court Date</p>
                      <p className="text-xs text-red-400">{caseData.courtDate}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-2 rounded-lg">
                    <div className="w-2 h-2 bg-gray-400 rounded-full" />
                    <div className="flex-1">
                      <p className="text-sm text-white">Statute of Limitations</p>
                      <p className="text-xs text-gray-400">{caseData.statute}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Maya AI Case Insights */}
              <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-700/50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-purple-400" />
                  <span>Maya Case Insights</span>
                </h3>
                
                <div className="space-y-3">
                  <div className="p-3 bg-gray-800/50 rounded-lg">
                    <p className="text-sm text-gray-300">
                      <span className="text-green-400">💡</span> Similar cases settled for 15% higher - leverage medical expert testimony
                    </p>
                  </div>
                  <div className="p-3 bg-gray-800/50 rounded-lg">
                    <p className="text-sm text-gray-300">
                      <span className="text-yellow-400">⚠️</span> Settlement deadline approaching - consider final counter-offer
                    </p>
                  </div>
                  <div className="p-3 bg-gray-800/50 rounded-lg">
                    <p className="text-sm text-gray-300">
                      <span className="text-blue-400">📊</span> Discovery completion at 90% - ready for strong negotiation position
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Task Manager View */}
        {activeView === 'tasks' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Task Management</h2>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>New Task</span>
              </button>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <div className="space-y-4">
                {caseTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        className="w-4 h-4 text-blue-600 rounded"
                      />
                      <div className={`w-3 h-3 rounded-full ${
                        task.priority === 'high' ? 'bg-red-400' : 
                        task.priority === 'medium' ? 'bg-orange-400' : 'bg-blue-400'
                      }`} />
                      <div className="flex-1">
                        <h4 className={`font-medium ${task.completed ? 'text-gray-500 line-through' : 'text-white'}`}>
                          {task.title}
                        </h4>
                        <p className="text-sm text-gray-400">
                          {task.assignee} • Due: {task.dueDate} • Est: {task.timeEstimate}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        task.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                        task.status === 'in-progress' ? 'bg-blue-500/20 text-blue-400' :
                        task.status === 'pending' ? 'bg-orange-500/20 text-orange-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {task.status}
                      </span>
                      <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                        <Edit className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Other views can be implemented similarly */}
        {activeView !== 'overview' && activeView !== 'tasks' && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🚧</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              {caseTools.find(tool => tool.id === activeView)?.name || 'Tool'} Coming Soon
            </h3>
            <p className="text-gray-400">
              This advanced case management tool is under development
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CaseManagerDashboard