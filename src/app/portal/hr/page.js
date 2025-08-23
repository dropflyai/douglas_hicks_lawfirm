'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Bell,
  Search,
  Plus,
  Calendar,
  Users,
  FileText,
  DollarSign,
  Clock,
  Star,
  TrendingUp,
  Award,
  Target,
  ChevronRight,
  Play,
  BookOpen,
  HelpCircle,
  Settings,
  User,
  Phone,
  MessageCircle,
  Briefcase,
  Scale,
  Brain,
  Zap,
  Activity,
  ArrowUpRight,
  Sparkles,
  Circle,
  CheckCircle2,
  AlertTriangle,
  Info,
  Shield,
  UserPlus,
  UserCheck,
  FileCheck,
  GraduationCap,
  BarChart3,
  PieChart,
  Clipboard,
  Folder,
  Building
} from 'lucide-react'

// Import HR components
import HROnboarding from '../../../components/HROnboarding'
import EmployeeManagement from '../../../components/EmployeeManagement'
import PerformanceManagement from '../../../components/PerformanceManagement'
import PayrollManagement from '../../../components/PayrollManagement'
import HRAnalytics from '../../../components/HRAnalytics'
import PolicyManagement from '../../../components/PolicyManagement'
import TrainingManagement from '../../../components/TrainingManagement'
import BenefitsManagement from '../../../components/BenefitsManagement'
import TimeOffManagement from '../../../components/TimeOffManagement'
import RecruitmentManagement from '../../../components/RecruitmentManagement'
import ComplianceManagement from '../../../components/ComplianceManagement'
import HRSettings from '../../../components/HRSettings'

export default function HRDashboard() {
  const [notifications, setNotifications] = useState(2)
  const [searchQuery, setSearchQuery] = useState('')
  const [showTraining, setShowTraining] = useState(false)
  const [activeCard, setActiveCard] = useState(null)
  const [activeTab, setActiveTab] = useState('dashboard')

  useEffect(() => {
    // Add subtle animations on mount
    const timer = setTimeout(() => {
      const cards = document.querySelectorAll('.dashboard-card')
      cards.forEach((card, index) => {
        setTimeout(() => {
          card.style.opacity = '1'
          card.style.transform = 'translateY(0)'
        }, index * 100)
      })
    }, 100)
    
    return () => clearTimeout(timer)
  }, [activeTab])

  // Sample HR data
  const hrData = {
    name: "Sarah Mitchell",
    title: "HR Director",
    totalEmployees: 47,
    newHires: 3,
    pendingOnboarding: 2,
    thisMonthBudget: "$125,000",
    completionRate: "94%",
    nextReview: "March 25, 2025",
    todaysTasks: 6,
    weeklyGoal: 85,
    weeklyProgress: 78
  }

  const todaysHRTasks = [
    { 
      id: 1,
      title: "New Hire Orientation - Jennifer Davis",
      time: "9:00 AM",
      type: "urgent",
      estimate: "2h"
    },
    { 
      id: 2,
      title: "Performance Review - Michael Chen",
      time: "11:00 AM",
      type: "important",
      estimate: "1h"
    },
    { 
      id: 3,
      title: "Benefits Enrollment Meeting",
      time: "2:00 PM",
      type: "normal",
      estimate: "45m"
    },
    { 
      id: 4,
      title: "Policy Update Review",
      time: "4:00 PM",
      type: "normal",
      estimate: "30m"
    }
  ]

  const hrQuickStats = [
    { label: "Total Employees", value: "47", change: "+3", icon: Users, color: "blue" },
    { label: "This Month Budget", value: "$125K", change: "+8%", icon: DollarSign, color: "green" },
    { label: "Onboarding Rate", value: "94%", change: "+2%", icon: UserCheck, color: "purple" },
    { label: "Employee Satisfaction", value: "4.8/5", change: "+0.2", icon: Star, color: "amber" }
  ]

  const hrQuickActions = [
    { title: "New Employee", icon: UserPlus, color: "bg-blue-500", action: () => setActiveTab('onboarding') },
    { title: "Schedule Review", icon: Calendar, color: "bg-green-500", action: () => {} },
    { title: "HR Documents", icon: FileText, color: "bg-purple-500", action: () => {} },
    { title: "Training", icon: GraduationCap, color: "bg-orange-500", action: () => setShowTraining(true) }
  ]

  const recentHRActivity = [
    { 
      type: "hire",
      title: "New Employee Added",
      subtitle: "Jennifer Davis - Legal Assistant",
      time: "2h ago",
      status: "new"
    },
    { 
      type: "review",
      title: "Performance Review Completed",
      subtitle: "Michael Chen - Senior Associate",
      time: "1d ago",
      status: "completed"
    },
    { 
      type: "policy",
      title: "Policy Update Published",
      subtitle: "Remote Work Guidelines v2.1",
      time: "3d ago",
      status: "important"
    }
  ]

  const employeeMetrics = [
    { department: "Legal", count: 28, percentage: 60, trend: "+2" },
    { department: "Administration", count: 12, percentage: 25, trend: "+1" },
    { department: "IT", count: 4, percentage: 8, trend: "0" },
    { department: "Finance", count: 3, percentage: 7, trend: "+0" }
  ]

  const trainingModules = [
    {
      title: "HR Platform Overview",
      description: "Complete guide to HR dashboard",
      duration: "8 min",
      completed: true,
      icon: Play
    },
    {
      title: "Employee Onboarding",
      description: "Streamline new hire process",
      duration: "15 min",
      completed: false,
      icon: UserPlus
    },
    {
      title: "Performance Management",
      description: "Conduct effective reviews",
      duration: "12 min",
      completed: false,
      icon: Award
    }
  ]

  const getStatusColor = (status) => {
    switch(status) {
      case 'new': return 'bg-blue-100 text-blue-800'
      case 'important': return 'bg-orange-100 text-orange-800'
      case 'completed': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (type) => {
    switch(type) {
      case 'urgent': return 'bg-red-500'
      case 'important': return 'bg-orange-500'
      default: return 'bg-blue-500'
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* iOS-style Header */}
      <header className="bg-gray-900/95 backdrop-blur-xl border-b border-gray-700/30 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            {/* Left - Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Users className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-semibold text-white">HR Portal</span>
            </div>

            {/* Center - Search */}
            <div className="flex-1 max-w-xl mx-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search employees, policies, documents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 bg-gray-800/70 border-0 rounded-2xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:bg-gray-700 focus:shadow-sm transition-all duration-200 placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Right - Actions */}
            <div className="flex items-center space-x-2">
              <button className="relative p-2.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-all duration-200">
                <Bell className="w-5 h-5" />
                {notifications > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium shadow-lg">
                    {notifications}
                  </span>
                )}
              </button>
              
              <button 
                onClick={() => setShowTraining(true)}
                className="p-2.5 text-gray-400 hover:text-purple-400 hover:bg-purple-900/30 rounded-xl transition-all duration-200"
              >
                <HelpCircle className="w-5 h-5" />
              </button>
              
              <div className="flex items-center space-x-3 ml-2 pl-2 border-l border-gray-700">
                <div className="text-right">
                  <p className="text-sm font-semibold text-white">{hrData.name}</p>
                  <p className="text-xs text-gray-400">{hrData.title}</p>
                </div>
                <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
                  <User className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-gray-900/50 border-b border-gray-700/30">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="overflow-x-auto scrollbar-hide py-4">
            <div className="flex space-x-2 bg-gray-800/50 rounded-2xl p-2 backdrop-blur-sm min-w-max">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: Target },
                { id: 'employees', label: 'Employees', icon: Users },
                { id: 'onboarding', label: 'Onboarding', icon: UserPlus },
                { id: 'performance', label: 'Performance', icon: Award },
                { id: 'policies', label: 'Policies', icon: FileText },
                { id: 'payroll', label: 'Payroll', icon: DollarSign },
                { id: 'benefits', label: 'Benefits', icon: Shield },
                { id: 'timeoff', label: 'Time-off', icon: Calendar },
                { id: 'recruitment', label: 'Recruitment', icon: Briefcase },
                { id: 'analytics', label: 'Analytics', icon: BarChart3 },
                { id: 'training', label: 'Training', icon: GraduationCap },
                { id: 'compliance', label: 'Compliance', icon: Scale },
                { id: 'settings', label: 'Settings', icon: Settings }
              ].map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-xl font-medium transition-all duration-200 whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20'
                        : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{tab.label}</span>
                  </button>
                )
              })}
            </div>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'dashboard' && (
          <>
            {/* Welcome Message */}
            <div className="mb-10">
              <h1 className="text-3xl font-bold text-white mb-2">
                Good morning, {hrData.name.split(' ')[0]} 👋
              </h1>
              <p className="text-lg text-gray-400 font-medium">
                You have {hrData.todaysTasks} tasks today • {hrData.weeklyProgress}% of weekly goals completed
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {hrQuickStats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div 
                    key={index}
                    className="dashboard-card bg-gray-900 rounded-3xl p-6 shadow-lg border border-gray-700/50 hover:shadow-xl hover:border-gray-600 transition-all duration-300 cursor-pointer group"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                        stat.color === 'blue' ? 'bg-blue-900/30 group-hover:bg-blue-800/40' :
                        stat.color === 'green' ? 'bg-green-900/30 group-hover:bg-green-800/40' :
                        stat.color === 'purple' ? 'bg-purple-900/30 group-hover:bg-purple-800/40' :
                        'bg-amber-900/30 group-hover:bg-amber-800/40'
                      } transition-colors duration-300`}>
                        <Icon className={`w-6 h-6 ${
                          stat.color === 'blue' ? 'text-blue-500' :
                          stat.color === 'green' ? 'text-green-500' :
                          stat.color === 'purple' ? 'text-purple-500' :
                          'text-amber-500'
                        }`} />
                      </div>
                      <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
                        stat.change.includes('+') ? 'bg-green-900/40 text-green-400' :
                        stat.change.includes('-') ? 'bg-red-900/40 text-red-400' :
                        'bg-gray-700 text-gray-300'
                      }`}>
                        {stat.change}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1 group-hover:text-gray-100 transition-colors">{stat.value}</div>
                    <div className="text-sm font-medium text-gray-400">{stat.label}</div>
                  </div>
                )
              })}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {hrQuickActions.map((action, index) => {
                const Icon = action.icon
                return (
                  <button
                    key={index}
                    onClick={action.action}
                    className="dashboard-card group bg-gray-900 rounded-3xl p-6 shadow-lg border border-gray-700/50 hover:shadow-xl hover:border-gray-600 transition-all duration-300 text-center active:scale-95"
                  >
                    <div className={`w-14 h-14 ${action.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-all duration-300 shadow-lg`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-sm font-semibold text-white group-hover:text-gray-100 transition-colors">{action.title}</div>
                  </button>
                )
              })}
            </div>

            {/* Main Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Today's HR Tasks */}
              <div className="dashboard-card bg-gray-900 rounded-3xl p-7 shadow-lg border border-gray-700/50 hover:shadow-xl hover:border-gray-600 transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">Today's HR Tasks</h3>
                  <div className="flex items-center space-x-2 bg-purple-900/30 px-3 py-1 rounded-full">
                    <Circle className="w-2 h-2 text-purple-500 fill-current" />
                    <span className="text-xs font-semibold text-purple-400">{todaysHRTasks.length} tasks</span>
                  </div>
                </div>
                <div className="space-y-3">
                  {todaysHRTasks.map((task) => (
                    <div key={task.id} className="flex items-center space-x-4 p-4 bg-gray-800/50 rounded-2xl hover:bg-gray-700/50 hover:shadow-sm transition-all duration-200 cursor-pointer group">
                      <div className={`w-3 h-3 rounded-full ${getPriorityColor(task.type)} shadow-sm`} />
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-white group-hover:text-gray-100">{task.title}</div>
                        <div className="text-xs font-medium text-gray-400 mt-0.5">{task.time} • {task.estimate}</div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-gray-300 transition-colors" />
                    </div>
                  ))}
                </div>
                <button className="w-full mt-6 py-3 text-sm font-semibold text-purple-400 hover:bg-purple-900/30 rounded-2xl transition-all duration-200 hover:shadow-sm">
                  View All Tasks
                </button>
              </div>

              {/* Recent HR Activity */}
              <div className="dashboard-card bg-gray-900 rounded-3xl p-7 shadow-lg border border-gray-700/50 hover:shadow-xl hover:border-gray-600 transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">Recent Activity</h3>
                  <div className="w-10 h-10 bg-purple-900/30 rounded-2xl flex items-center justify-center">
                    <Activity className="w-5 h-5 text-purple-400" />
                  </div>
                </div>
                <div className="space-y-3">
                  {recentHRActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 hover:bg-gray-800/50 rounded-2xl transition-all duration-200 cursor-pointer group">
                      <div className="w-2.5 h-2.5 bg-purple-500 rounded-full mt-2 shadow-sm" />
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-white group-hover:text-gray-100">{activity.title}</div>
                        <div className="text-xs font-medium text-gray-400 mt-0.5">{activity.subtitle}</div>
                      </div>
                      <div className="text-xs font-medium text-gray-500 bg-gray-800 px-2 py-1 rounded-lg">{activity.time}</div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-6 py-3 text-sm font-semibold text-gray-400 hover:bg-gray-800/50 rounded-2xl transition-all duration-200 hover:shadow-sm">
                  View All Activity
                </button>
              </div>

              {/* Department Overview */}
              <div className="dashboard-card bg-gray-900 rounded-3xl p-7 shadow-lg border border-gray-700/50 hover:shadow-xl hover:border-gray-600 transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">Department Overview</h3>
                  <div className="bg-purple-900/30 px-3 py-1 rounded-full">
                    <span className="text-sm font-semibold text-purple-400">{hrData.totalEmployees} total</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {employeeMetrics.map((dept, index) => (
                    <div key={index} className="p-4 bg-gray-800/50 rounded-2xl">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <h4 className="text-white font-semibold">{dept.department}</h4>
                          <span className="text-gray-400 text-sm">({dept.count} employees)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-semibold ${
                            dept.trend.startsWith('+') ? 'text-green-400' : 
                            dept.trend.startsWith('-') ? 'text-red-400' : 'text-gray-400'
                          }`}>
                            {dept.trend !== '0' ? dept.trend : 'stable'}
                          </span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${dept.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Onboarding Tab */}
        {activeTab === 'onboarding' && <HROnboarding />}

        {/* Employee Management Tab */}
        {activeTab === 'employees' && <EmployeeManagement />}

        {/* Performance Management Tab */}
        {activeTab === 'performance' && <PerformanceManagement />}

        {/* Policy Management Tab */}
        {activeTab === 'policies' && <PolicyManagement />}

        {/* Payroll Management Tab */}
        {activeTab === 'payroll' && <PayrollManagement />}

        {/* HR Analytics Tab */}
        {activeTab === 'analytics' && <HRAnalytics />}

        {/* Training Management Tab */}
        {activeTab === 'training' && <TrainingManagement />}

        {/* Benefits Management Tab */}
        {activeTab === 'benefits' && <BenefitsManagement />}

        {/* Time-off Management Tab */}
        {activeTab === 'timeoff' && <TimeOffManagement />}

        {/* Recruitment Management Tab */}
        {activeTab === 'recruitment' && <RecruitmentManagement />}

        {/* Compliance Management Tab */}
        {activeTab === 'compliance' && <ComplianceManagement />}

        {activeTab === 'settings' && <HRSettings />}

        {/* Training Modal */}
        {showTraining && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-lg flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-auto shadow-2xl border border-gray-700/50">
              <div className="p-8 border-b border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white">HR Training & Help</h2>
                    <p className="text-gray-400 mt-1">Master your HR platform</p>
                  </div>
                  <button
                    onClick={() => setShowTraining(false)}
                    className="w-10 h-10 bg-gray-800 rounded-2xl flex items-center justify-center hover:bg-gray-700 transition-all duration-200 active:scale-95"
                  >
                    <span className="text-gray-400 text-lg">×</span>
                  </button>
                </div>
              </div>
              
              <div className="p-8">
                <div className="grid gap-4">
                  {trainingModules.map((module, index) => {
                    const Icon = module.icon
                    return (
                      <div key={index} className="flex items-center space-x-5 p-5 bg-gray-800/50 rounded-3xl hover:bg-gray-700/50 hover:shadow-sm transition-all duration-200 cursor-pointer group">
                        <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-1">
                            <h3 className="font-semibold text-white group-hover:text-gray-100">{module.title}</h3>
                            {module.completed && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                          </div>
                          <p className="text-sm text-gray-400 mb-1">{module.description}</p>
                          <p className="text-xs font-medium text-gray-500 bg-gray-700 px-2 py-1 rounded-lg inline-block">{module.duration}</p>
                        </div>
                        <ArrowUpRight className="w-5 h-5 text-gray-500 group-hover:text-gray-300 transition-colors" />
                      </div>
                    )
                  })}
                </div>
                
                <div className="mt-8 flex space-x-4">
                  <Link 
                    href="/help/hr"
                    className="flex-1 py-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white text-center rounded-2xl font-semibold hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95"
                  >
                    Open HR Help Center
                  </Link>
                  <Link 
                    href="/help/hr/videos"
                    className="flex-1 py-4 bg-gray-800 text-white text-center rounded-2xl font-semibold hover:bg-gray-700 transition-all duration-200 active:scale-95"
                  >
                    HR Training Videos
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}