'use client'

import { useState, useEffect } from 'react'
import { 
  Users, Clock, DollarSign, Calendar, FileText, 
  AlertTriangle, CheckCircle, TrendingUp, Zap,
  Brain, Target, BarChart3, ArrowUpRight, 
  Phone, Mail, Bell, Briefcase, MessageCircle,
  PenTool, ClipboardList, FolderOpen, UserCheck,
  Timer, BookOpen, Settings, Shield, Star, Plus
} from 'lucide-react'
import LegalMessagingHub from '../messaging/LegalMessagingHub'

const LegalAssistantDashboard = ({ userRole, aiActive, setAiActive }) => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [showMessaging, setShowMessaging] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Daily tasks and priorities
  const dailyTasks = [
    {
      id: 1,
      title: 'Client Intake - Martinez Family',
      priority: 'high',
      deadline: '10:30 AM',
      status: 'pending',
      type: 'intake',
      estimatedTime: '45 min',
      aiSuggestion: 'Prepare standard forms in advance'
    },
    {
      id: 2,
      title: 'Document Filing - Henderson Case',
      priority: 'medium',
      deadline: '2:00 PM',
      status: 'in-progress',
      type: 'filing',
      estimatedTime: '30 min',
      aiSuggestion: 'All documents ready for submission'
    },
    {
      id: 3,
      title: 'Court Calendar Updates',
      priority: 'low',
      deadline: 'EOD',
      status: 'completed',
      type: 'administrative',
      estimatedTime: '15 min',
      aiSuggestion: 'Weekly review completed'
    },
    {
      id: 4,
      title: 'Client Communication Follow-ups',
      priority: 'high',
      deadline: '4:00 PM',
      status: 'pending',
      type: 'communication',
      estimatedTime: '60 min',
      aiSuggestion: '5 clients require status updates'
    }
  ]

  // Recent client interactions
  const recentInteractions = [
    {
      client: 'Johnson Family',
      type: 'Phone Consultation',
      time: '9:15 AM',
      duration: '35 min',
      status: 'completed',
      notes: 'Discussed settlement options'
    },
    {
      client: 'Davis Construction',
      type: 'Document Review',
      time: '11:45 AM',
      duration: '20 min',
      status: 'completed',
      notes: 'Contract amendments approved'
    },
    {
      client: 'Williams Medical',
      type: 'Intake Appointment',
      time: '2:30 PM',
      duration: 'Scheduled',
      status: 'upcoming',
      notes: 'Medical malpractice consultation'
    }
  ]

  // Performance metrics
  const metrics = [
    {
      label: 'Tasks Completed',
      value: '24',
      change: '+12%',
      icon: <CheckCircle className="w-6 h-6" />,
      gradient: 'from-green-500 to-emerald-500',
      bgGlow: 'green-500/20'
    },
    {
      label: 'Client Interactions',
      value: '18',
      change: '+8%',
      icon: <Users className="w-6 h-6" />,
      gradient: 'from-blue-500 to-cyan-500',
      bgGlow: 'blue-500/20'
    },
    {
      label: 'Documents Filed',
      value: '43',
      change: '+23%',
      icon: <FileText className="w-6 h-6" />,
      gradient: 'from-purple-500 to-violet-500',
      bgGlow: 'purple-500/20'
    },
    {
      label: 'Efficiency Score',
      value: '94%',
      change: '+6%',
      icon: <Target className="w-6 h-6" />,
      gradient: 'from-yellow-500 to-orange-500',
      bgGlow: 'yellow-500/20'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* Modern Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600/20 via-cyan-600/20 to-blue-600/20"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>
      
      {/* Modern Glassmorphism Header */}
      <header className="relative bg-white/5 backdrop-blur-2xl border-b border-white/10 shadow-2xl sticky top-0 z-40">
        <div className="px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-6">
              <div className="relative group">
                <div className="w-14 h-14 bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-teal-500/25 group-hover:scale-105 transition-all duration-300">
                  <PenTool className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-slate-900 animate-pulse shadow-lg"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-teal-100 to-cyan-100 bg-clip-text text-transparent">
                  Legal Assistant Hub
                </h1>
                <p className="text-slate-300 font-medium">Administrative Excellence Center</p>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-slate-400 text-sm">Welcome back, {userRole?.name}</span>
                </div>
              </div>
            </div>

            {/* Enhanced AI Status & Controls */}
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-teal-500/20 to-cyan-500/20 backdrop-blur-sm border border-teal-400/30 px-6 py-3 rounded-2xl shadow-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                  <span className="text-teal-200 font-medium">LEX Assistant Online</span>
                  <div className="w-px h-4 bg-teal-400/30"></div>
                  <span className="text-slate-300 text-sm">8 tasks pending</span>
                </div>
              </div>
              
              <button 
                onClick={() => setShowMessaging(true)}
                className="relative p-3 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 backdrop-blur-sm border border-teal-400/30 text-teal-200 hover:text-white hover:from-teal-500/30 hover:to-cyan-500/30 rounded-2xl transition-all duration-300 shadow-lg"
              >
                <MessageCircle className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full animate-pulse shadow-lg shadow-orange-500/50"></span>
              </button>

              <button 
                onClick={() => setAiActive(true)}
                className="px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-white rounded-2xl font-semibold transition-all hover:scale-105 shadow-xl shadow-teal-500/25 flex items-center space-x-3"
              >
                <Brain className="w-5 h-5" />
                <span>LEX Assistant</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="relative px-8 py-10">
        
        {/* Performance Metrics with Modern Glassmorphism */}
        <div className="grid grid-cols-4 gap-6 mb-10">
          {metrics.map((metric, index) => (
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
                <div className="text-green-400 text-sm font-medium">
                  {metric.change}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Daily Tasks & Client Interactions */}
        <div className="grid grid-cols-2 gap-8 mb-10">
          
          {/* Daily Tasks Panel */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 via-cyan-500/20 to-blue-500/20 rounded-3xl blur-xl group-hover:blur-lg transition-all duration-500"></div>
            <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-xl shadow-teal-500/25">
                    <ClipboardList className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
                      Daily Tasks
                    </h2>
                    <p className="text-slate-400 text-sm">4 tasks • 2 high priority</p>
                  </div>
                </div>
                <button className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all">
                  <Plus className="w-5 h-5 text-slate-300" />
                </button>
              </div>
              
              <div className="space-y-4">
                {dailyTasks.map((task, index) => (
                  <div key={task.id} className={`group/task p-4 rounded-2xl backdrop-blur-sm transition-all hover:scale-105 cursor-pointer ${
                    task.priority === 'high' ? 'bg-red-500/10 border border-red-400/40 hover:bg-red-500/20' :
                    task.priority === 'medium' ? 'bg-yellow-500/10 border border-yellow-400/40 hover:bg-yellow-500/20' :
                    'bg-green-500/10 border border-green-400/40 hover:bg-green-500/20'
                  } shadow-xl`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                        task.status === 'completed' ? 'bg-green-500/20 text-green-300' :
                        task.status === 'in-progress' ? 'bg-yellow-500/20 text-yellow-300' :
                        'bg-blue-500/20 text-blue-300'
                      }`}>
                        {task.status.replace('-', ' ').toUpperCase()}
                      </span>
                      <span className="text-slate-400 text-sm">{task.deadline}</span>
                    </div>
                    <h4 className="text-white font-semibold mb-2">{task.title}</h4>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-300">⏱ {task.estimatedTime}</span>
                      <span className="text-purple-300">🤖 {task.aiSuggestion}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Client Interactions Panel */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl group-hover:blur-lg transition-all duration-500"></div>
            <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/25">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
                      Recent Interactions
                    </h2>
                    <p className="text-slate-400 text-sm">Today's client activity</p>
                  </div>
                </div>
                <button className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all">
                  <Calendar className="w-5 h-5 text-slate-300" />
                </button>
              </div>
              
              <div className="space-y-4">
                {recentInteractions.map((interaction, index) => (
                  <div key={index} className="p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl hover:scale-105 transition-all shadow-xl">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white font-semibold">{interaction.client}</h4>
                      <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                        interaction.status === 'completed' ? 'bg-green-500/20 text-green-300' :
                        interaction.status === 'upcoming' ? 'bg-blue-500/20 text-blue-300' :
                        'bg-purple-500/20 text-purple-300'
                      }`}>
                        {interaction.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="text-slate-300 text-sm mb-2">{interaction.type}</div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">🕐 {interaction.time} • {interaction.duration}</span>
                    </div>
                    <p className="text-purple-300 text-sm mt-2">📝 {interaction.notes}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modern Legal Assistant Toolbar */}
        <div className="relative bg-white/5 backdrop-blur-2xl border-t border-white/10 px-8 py-4 sticky bottom-0">
          <div className="flex items-center space-x-3 overflow-x-auto">
            {[
              { icon: <FileText className="w-5 h-5" />, label: 'Documents', action: 'documents', gradient: 'from-teal-500 to-teal-600' },
              { icon: <Calendar className="w-5 h-5" />, label: 'Schedule', action: 'schedule', gradient: 'from-blue-500 to-blue-600' },
              { icon: <Phone className="w-5 h-5" />, label: 'Call Clients', action: 'call', gradient: 'from-green-500 to-green-600' },
              { icon: <Mail className="w-5 h-5" />, label: 'Email', action: 'email', gradient: 'from-purple-500 to-purple-600' },
              { icon: <ClipboardList className="w-5 h-5" />, label: 'Tasks', action: 'tasks', gradient: 'from-yellow-500 to-yellow-600' },
              { icon: <BookOpen className="w-5 h-5" />, label: 'Forms', action: 'forms', gradient: 'from-pink-500 to-pink-600' },
              { icon: <Settings className="w-5 h-5" />, label: 'Settings', action: 'settings', gradient: 'from-gray-500 to-gray-600' }
            ].map((tool) => (
              <button
                key={tool.action}
                onClick={() => console.log(`${tool.action} clicked`)}
                className={`group flex items-center space-x-3 px-4 py-2.5 bg-white/10 hover:bg-gradient-to-r hover:${tool.gradient} backdrop-blur-sm border border-white/20 hover:border-white/30 rounded-2xl text-slate-300 hover:text-white transition-all duration-300 font-medium whitespace-nowrap hover:scale-105 shadow-lg hover:shadow-xl`}
                title={tool.label}
              >
                <div className="group-hover:animate-pulse">
                  {tool.icon}
                </div>
                <span className="hidden lg:inline group-hover:font-semibold">{tool.label}</span>
              </button>
            ))}
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
    </div>
  )
}

export default LegalAssistantDashboard