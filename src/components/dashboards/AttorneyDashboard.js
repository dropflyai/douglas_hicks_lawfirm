'use client'

import { useState, useEffect } from 'react'
import { 
  Brain, Zap, TrendingUp, DollarSign, Clock, Users, 
  FileText, Calendar, Phone, MessageCircle, Target,
  ArrowUpRight, Sparkles, Activity, Award, Scale,
  ChevronRight, Bell, Search, Settings, User
} from 'lucide-react'

const AttorneyDashboard = ({ userRole, aiActive, setAiActive }) => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [activeWidget, setActiveWidget] = useState('overview')

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // AI-Generated Case Intelligence
  const caseIntelligence = {
    activeCases: 23,
    winRate: 94,
    settlementSuccess: 87,
    avgCaseValue: 2.4,
    upcomingDeadlines: 7,
    clientSatisfaction: 4.9
  }

  // AI Predictions and Insights
  const aiInsights = [
    {
      type: 'urgent',
      title: 'High Settlement Probability',
      case: 'Johnson v. Metro Insurance',
      prediction: 'AI predicts 89% chance of favorable settlement this week',
      action: 'Schedule settlement conference',
      value: '$340K estimated'
    },
    {
      type: 'opportunity', 
      title: 'Case Strategy Optimization',
      case: 'Davis v. Construction Corp',
      prediction: 'Similar cases suggest adding negligence claim',
      action: 'Review motion to amend',
      value: '+$180K potential increase'
    },
    {
      type: 'warning',
      title: 'Discovery Deadline Risk',
      case: 'Williams Personal Injury',
      prediction: 'Missing key evidence could reduce outcome by 23%',
      action: 'Request extension or expedite discovery',
      value: 'Protect $425K claim value'
    }
  ]

  // Today's AI-Generated Schedule
  const intelligentSchedule = [
    { 
      time: '9:00 AM', 
      type: 'client_call', 
      title: 'Johnson Settlement Conference',
      ai_prep: 'AI Brief: 89% settlement probability, suggest $340K opening',
      priority: 'high'
    },
    {
      time: '10:30 AM',
      type: 'court',
      title: 'Motion Hearing - Davis Case', 
      ai_prep: 'AI Research: 3 supporting precedents identified',
      priority: 'high'
    },
    {
      time: '2:00 PM',
      type: 'client_meeting',
      title: 'New Client Consultation - Sarah Martinez',
      ai_prep: 'AI Intake: Medical malpractice, $2.1M damage estimate',
      priority: 'medium'
    },
    {
      time: '4:00 PM',
      type: 'strategy',
      title: 'Case Strategy Session',
      ai_prep: 'AI Analysis: Review Williams case discovery gaps',
      priority: 'medium'
    }
  ]

  // Performance Metrics with AI Enhancement
  const performanceMetrics = [
    { 
      label: 'Total Active Cases', 
      value: caseIntelligence.activeCase,
      change: '+3 this month',
      trend: 'up',
      aiInsight: 'Optimal caseload for maximum efficiency'
    },
    { 
      label: 'Win Rate', 
      value: `${caseIntelligence.winRate}%`,
      change: '+2% vs industry avg',
      trend: 'up',
      aiInsight: 'Top 5% of attorneys in practice area'
    },
    { 
      label: 'Avg Case Value', 
      value: `$${caseIntelligence.avgCaseValue}M`,
      change: '+18% YoY',
      trend: 'up',
      aiInsight: 'Premium case selection strategy working'
    },
    { 
      label: 'Client Satisfaction', 
      value: `${caseIntelligence.clientSatisfaction}/5.0`,
      change: 'Consistent excellence',
      trend: 'stable',
      aiInsight: 'Clients appreciate communication style'
    }
  ]

  const quickActions = [
    { 
      icon: <Brain className="w-5 h-5" />, 
      label: 'AI Case Analysis', 
      desc: 'Get strategic insights',
      gradient: 'from-purple-500 to-pink-500'
    },
    { 
      icon: <FileText className="w-5 h-5" />, 
      label: 'Draft Motion', 
      desc: 'AI-powered drafting',
      gradient: 'from-blue-500 to-cyan-500'
    },
    { 
      icon: <Scale className="w-5 h-5" />, 
      label: 'Legal Research', 
      desc: 'Find precedents',
      gradient: 'from-green-500 to-emerald-500'
    },
    { 
      icon: <DollarSign className="w-5 h-5" />, 
      label: 'Settlement Calculator', 
      desc: 'AI valuation model',
      gradient: 'from-yellow-500 to-orange-500'
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      
      {/* Premium Header */}
      <header className="bg-gray-900/95 backdrop-blur-xl border-b border-gray-700/30 sticky top-0 z-40 shadow-2xl">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Scale className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">Attorney Portal</h1>
                <p className="text-xs text-gray-400">AI-Powered Legal Workspace</p>
              </div>
            </div>

            {/* AI Status Indicator */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-gradient-to-r from-purple-900/30 to-pink-900/30 px-3 py-1.5 rounded-full border border-purple-500/20">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-purple-300">Maya AI Online</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="relative p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-all">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">3</span>
                </button>
                
                <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-gray-700">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-white">{userRole?.name}</p>
                    <p className="text-xs text-gray-400">{userRole?.title}</p>
                  </div>
                  <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
                    <User className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Welcome Section with AI Greeting */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Good {currentTime.getHours() < 12 ? 'morning' : currentTime.getHours() < 17 ? 'afternoon' : 'evening'}, Douglas 👋
              </h2>
              <p className="text-lg text-gray-400">
                You have <span className="text-purple-400 font-semibold">7 urgent tasks</span> today • 
                <span className="text-green-400 font-semibold"> 89% win rate</span> this quarter
              </p>
            </div>
            <button
              onClick={() => setAiActive(true)}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-200 flex items-center space-x-2 group"
            >
              <Brain className="w-5 h-5 group-hover:animate-pulse" />
              <span>Ask Maya AI</span>
            </button>
          </div>
        </div>

        {/* AI Insights Banner */}
        <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-500/20 rounded-3xl p-6 mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Sparkles className="w-6 h-6 text-purple-400" />
            <h3 className="text-xl font-bold text-white">AI Strategic Insights</h3>
            <div className="px-2 py-1 bg-purple-500/20 rounded-full">
              <span className="text-xs font-medium text-purple-300">Live Analysis</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {aiInsights.map((insight, index) => (
              <div 
                key={index}
                className={`p-4 rounded-2xl border cursor-pointer hover:scale-105 transition-all duration-200 ${
                  insight.type === 'urgent' ? 'bg-red-900/20 border-red-500/30' :
                  insight.type === 'opportunity' ? 'bg-green-900/20 border-green-500/30' :
                  'bg-yellow-900/20 border-yellow-500/30'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                    insight.type === 'urgent' ? 'bg-red-500/20 text-red-300' :
                    insight.type === 'opportunity' ? 'bg-green-500/20 text-green-300' :
                    'bg-yellow-500/20 text-yellow-300'
                  }`}>
                    {insight.type.toUpperCase()}
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
                <h4 className="font-semibold text-white mb-1">{insight.title}</h4>
                <p className="text-xs text-gray-400 mb-2">{insight.case}</p>
                <p className="text-sm text-gray-300 mb-2">{insight.prediction}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-purple-400">{insight.action}</span>
                  <span className="text-xs font-semibold text-white">{insight.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {performanceMetrics.map((metric, index) => (
            <div key={index} className="bg-gray-900 rounded-3xl p-6 border border-gray-700/50 hover:border-purple-500/30 transition-all duration-200 group cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                  metric.trend === 'up' ? 'bg-green-900/30' : 'bg-blue-900/30'
                } group-hover:scale-110 transition-all duration-200`}>
                  {index === 0 && <Users className="w-6 h-6 text-green-400" />}
                  {index === 1 && <Award className="w-6 h-6 text-green-400" />}
                  {index === 2 && <DollarSign className="w-6 h-6 text-green-400" />}
                  {index === 3 && <Target className="w-6 h-6 text-blue-400" />}
                </div>
                <TrendingUp className={`w-4 h-4 ${metric.trend === 'up' ? 'text-green-400' : 'text-blue-400'}`} />
              </div>
              <div className="text-2xl font-bold text-white mb-1 group-hover:text-purple-300 transition-colors">
                {metric.value}
              </div>
              <div className="text-sm text-gray-400 mb-2">{metric.label}</div>
              <div className="text-xs text-purple-400">{metric.aiInsight}</div>
            </div>
          ))}
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Today's Schedule with AI Prep */}
          <div className="lg:col-span-2 bg-gray-900 rounded-3xl p-6 border border-gray-700/50">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Intelligent Schedule</h3>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-purple-400">AI-Optimized</span>
              </div>
            </div>
            
            <div className="space-y-4">
              {intelligentSchedule.map((item, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-2xl border transition-all duration-200 hover:scale-[1.02] cursor-pointer ${
                    item.priority === 'high' 
                      ? 'bg-red-900/20 border-red-500/30 hover:border-red-500/50' 
                      : 'bg-gray-800/50 border-gray-600/50 hover:border-purple-500/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        item.priority === 'high' ? 'bg-red-400' : 'bg-blue-400'
                      }`}></div>
                      <span className="text-sm font-medium text-white">{item.time}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        item.type === 'court' ? 'bg-purple-500/20 text-purple-300' :
                        item.type === 'client_call' ? 'bg-green-500/20 text-green-300' :
                        'bg-blue-500/20 text-blue-300'
                      }`}>
                        {item.type.replace('_', ' ')}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="text-white font-medium mb-1">{item.title}</div>
                  <div className="text-sm text-purple-400 flex items-center space-x-1">
                    <Brain className="w-3 h-3" />
                    <span>{item.ai_prep}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-900 rounded-3xl p-6 border border-gray-700/50">
            <h3 className="text-xl font-bold text-white mb-6">AI Quick Actions</h3>
            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => setAiActive(true)}
                  className={`w-full p-4 rounded-2xl bg-gradient-to-r ${action.gradient} hover:shadow-lg transition-all duration-200 hover:scale-105 group`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-all duration-200">
                      {action.icon}
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-white">{action.label}</div>
                      <div className="text-sm text-white/80">{action.desc}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AttorneyDashboard