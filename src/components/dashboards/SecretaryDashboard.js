'use client'

import { useState, useEffect } from 'react'
import { 
  Users, Clock, DollarSign, Calendar, FileText, 
  AlertTriangle, CheckCircle, TrendingUp, Zap,
  Brain, Target, BarChart3, ArrowUpRight, 
  Phone, Mail, Bell, Briefcase, MessageCircle,
  HeadphonesIcon, MapPin, Coffee, Printer, 
  Timer, BookOpen, Settings, Shield, Star, Plus
} from 'lucide-react'
import LegalMessagingHub from '../messaging/LegalMessagingHub'

const SecretaryDashboard = ({ userRole, aiActive, setAiActive }) => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [showMessaging, setShowMessaging] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState(null)

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Today's appointments and tasks
  const todaySchedule = [
    {
      id: 1,
      time: '9:00 AM',
      type: 'Client Meeting',
      title: 'Johnson Family Consultation',
      attendees: ['Douglas Hicks', 'Johnson Family'],
      location: 'Conference Room A',
      status: 'confirmed',
      priority: 'high',
      notes: 'Settlement discussion - prepare files'
    },
    {
      id: 2,
      time: '11:30 AM',
      type: 'Court Call',
      title: 'Davis v. Metro Insurance',
      attendees: ['Attorney Chen', 'Court Clerk'],
      location: 'Phone Conference',
      status: 'pending',
      priority: 'medium',
      notes: 'Motion hearing status update'
    },
    {
      id: 3,
      time: '2:00 PM',
      type: 'Staff Meeting',
      title: 'Weekly Case Review',
      attendees: ['All Partners', 'Paralegals'],
      location: 'Main Conference Room',
      status: 'confirmed',
      priority: 'medium',
      notes: 'Review active cases and priorities'
    },
    {
      id: 4,
      time: '4:30 PM',
      type: 'Client Call',
      title: 'Williams Medical Follow-up',
      attendees: ['Sarah Williams', 'Medical Expert'],
      location: 'Phone Conference',
      status: 'scheduled',
      priority: 'high',
      notes: 'Expert testimony preparation'
    }
  ]

  // Communication activity
  const communicationStats = [
    {
      type: 'Incoming Calls',
      count: 34,
      handled: 32,
      pending: 2,
      icon: <Phone className="w-6 h-6" />,
      color: 'green'
    },
    {
      type: 'Emails Processed',
      count: 67,
      handled: 64,
      pending: 3,
      icon: <Mail className="w-6 h-6" />,
      color: 'blue'
    },
    {
      type: 'Appointments Set',
      count: 12,
      handled: 11,
      pending: 1,
      icon: <Calendar className="w-6 h-6" />,
      color: 'purple'
    },
    {
      type: 'Documents Filed',
      count: 28,
      handled: 26,
      pending: 2,
      icon: <FileText className="w-6 h-6" />,
      color: 'orange'
    }
  ]

  // Performance metrics
  const metrics = [
    {
      label: 'Calls Handled',
      value: '34',
      change: '+18%',
      icon: <Phone className="w-6 h-6" />,
      gradient: 'from-green-500 to-emerald-500',
      bgGlow: 'green-500/20'
    },
    {
      label: 'Meetings Scheduled',
      value: '12',
      change: '+25%',
      icon: <Calendar className="w-6 h-6" />,
      gradient: 'from-blue-500 to-cyan-500',
      bgGlow: 'blue-500/20'
    },
    {
      label: 'Client Satisfaction',
      value: '98%',
      change: '+3%',
      icon: <Star className="w-6 h-6" />,
      gradient: 'from-yellow-500 to-orange-500',
      bgGlow: 'yellow-500/20'
    },
    {
      label: 'Response Time',
      value: '1.2m',
      change: '-23%',
      icon: <Timer className="w-6 h-6" />,
      gradient: 'from-purple-500 to-violet-500',
      bgGlow: 'purple-500/20'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* Modern Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-600/20 via-pink-600/20 to-purple-600/20"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-rose-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>
      
      {/* Modern Glassmorphism Header */}
      <header className="relative bg-white/5 backdrop-blur-2xl border-b border-white/10 shadow-2xl sticky top-0 z-40">
        <div className="px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-6">
              <div className="relative group">
                <div className="w-14 h-14 bg-gradient-to-br from-rose-500 via-pink-500 to-purple-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-rose-500/25 group-hover:scale-105 transition-all duration-300">
                  <HeadphonesIcon className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-slate-900 animate-pulse shadow-lg"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-rose-100 to-pink-100 bg-clip-text text-transparent">
                  Executive Secretary Hub
                </h1>
                <p className="text-slate-300 font-medium">Communication & Coordination Center</p>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-slate-400 text-sm">Welcome back, {userRole?.name}</span>
                </div>
              </div>
            </div>

            {/* Enhanced AI Status & Controls */}
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-rose-500/20 to-pink-500/20 backdrop-blur-sm border border-rose-400/30 px-6 py-3 rounded-2xl shadow-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                  <span className="text-rose-200 font-medium">Communication Hub Active</span>
                  <div className="w-px h-4 bg-rose-400/30"></div>
                  <span className="text-slate-300 text-sm">4 meetings today</span>
                </div>
              </div>
              
              <button 
                onClick={() => setShowMessaging(true)}
                className="relative p-3 bg-gradient-to-r from-rose-500/20 to-pink-500/20 backdrop-blur-sm border border-rose-400/30 text-rose-200 hover:text-white hover:from-rose-500/30 hover:to-pink-500/30 rounded-2xl transition-all duration-300 shadow-lg"
              >
                <MessageCircle className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full animate-pulse shadow-lg shadow-yellow-500/50"></span>
              </button>

              <button 
                onClick={() => setAiActive(true)}
                className="px-6 py-3 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-400 hover:to-rose-500 text-white rounded-2xl font-semibold transition-all hover:scale-105 shadow-xl shadow-rose-500/25 flex items-center space-x-3"
              >
                <Brain className="w-5 h-5" />
                <span>Communication AI</span>
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

        {/* Today's Schedule & Communication Stats */}
        <div className="grid grid-cols-2 gap-8 mb-10">
          
          {/* Today's Schedule */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-rose-500/20 via-pink-500/20 to-purple-500/20 rounded-3xl blur-xl group-hover:blur-lg transition-all duration-500"></div>
            <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl shadow-rose-500/25">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
                      Today's Schedule
                    </h2>
                    <p className="text-slate-400 text-sm">4 appointments • 2 high priority</p>
                  </div>
                </div>
                <button className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all">
                  <Plus className="w-5 h-5 text-slate-300" />
                </button>
              </div>
              
              <div className="space-y-4">
                {todaySchedule.map((appointment, index) => (
                  <div key={appointment.id} className={`group/appointment p-4 rounded-2xl backdrop-blur-sm transition-all hover:scale-105 cursor-pointer ${
                    appointment.priority === 'high' ? 'bg-red-500/10 border border-red-400/40 hover:bg-red-500/20' :
                    'bg-blue-500/10 border border-blue-400/40 hover:bg-blue-500/20'
                  } shadow-xl`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-semibold">{appointment.time}</span>
                        <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                          appointment.status === 'confirmed' ? 'bg-green-500/20 text-green-300' :
                          appointment.status === 'pending' ? 'bg-yellow-500/20 text-yellow-300' :
                          'bg-blue-500/20 text-blue-300'
                        }`}>
                          {appointment.status.toUpperCase()}
                        </span>
                      </div>
                      <span className="text-slate-400 text-sm">{appointment.type}</span>
                    </div>
                    <h4 className="text-white font-semibold mb-2">{appointment.title}</h4>
                    <div className="text-slate-300 text-sm mb-2">📍 {appointment.location}</div>
                    <div className="text-purple-300 text-sm">📝 {appointment.notes}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Communication Activity */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-indigo-500/20 rounded-3xl blur-xl group-hover:blur-lg transition-all duration-500"></div>
            <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/25">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
                      Communication Hub
                    </h2>
                    <p className="text-slate-400 text-sm">Today's activity overview</p>
                  </div>
                </div>
                <button className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all">
                  <BarChart3 className="w-5 h-5 text-slate-300" />
                </button>
              </div>
              
              <div className="space-y-4">
                {communicationStats.map((stat, index) => (
                  <div key={index} className="p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl hover:scale-105 transition-all shadow-xl">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 bg-gradient-to-br from-${stat.color}-500 to-${stat.color}-600 rounded-xl flex items-center justify-center`}>
                          {stat.icon}
                        </div>
                        <div>
                          <h4 className="text-white font-semibold text-sm">{stat.type}</h4>
                          <p className="text-slate-400 text-xs">Total: {stat.count}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-green-400 font-bold">{stat.handled}</div>
                        <div className="text-slate-400 text-xs">Completed</div>
                      </div>
                    </div>
                    {stat.pending > 0 && (
                      <div className="text-yellow-400 text-sm">
                        ⏳ {stat.pending} pending
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modern Secretary Toolbar */}
        <div className="relative bg-white/5 backdrop-blur-2xl border-t border-white/10 px-8 py-4 sticky bottom-0">
          <div className="flex items-center space-x-3 overflow-x-auto">
            {[
              { icon: <Phone className="w-5 h-5" />, label: 'Phone', action: 'phone', gradient: 'from-green-500 to-green-600' },
              { icon: <Mail className="w-5 h-5" />, label: 'Email', action: 'email', gradient: 'from-blue-500 to-blue-600' },
              { icon: <Calendar className="w-5 h-5" />, label: 'Calendar', action: 'calendar', gradient: 'from-purple-500 to-purple-600' },
              { icon: <FileText className="w-5 h-5" />, label: 'Documents', action: 'documents', gradient: 'from-rose-500 to-rose-600' },
              { icon: <MapPin className="w-5 h-5" />, label: 'Travel', action: 'travel', gradient: 'from-orange-500 to-orange-600' },
              { icon: <Printer className="w-5 h-5" />, label: 'Print', action: 'print', gradient: 'from-teal-500 to-teal-600' },
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

export default SecretaryDashboard