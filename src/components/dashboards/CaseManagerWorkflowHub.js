'use client'

import { useState, useEffect } from 'react'
import { 
  Users, Clock, DollarSign, Calendar, FileText, 
  AlertTriangle, CheckCircle, TrendingUp, Zap,
  Brain, Target, BarChart3, ArrowUpRight, 
  Workflow, Package, MapPin, Phone, Mail, Bell, Briefcase, MessageCircle
} from 'lucide-react'
import LegalMessagingHub from '../messaging/LegalMessagingHub'

const CaseManagerWorkflowHub = ({ userRole, aiActive, setAiActive }) => {
  const [selectedWorkflow, setSelectedWorkflow] = useState(null)
  const [automationMode, setAutomationMode] = useState(true)
  const [showMessaging, setShowMessaging] = useState(false)

  // AI-powered case pipeline
  const casePipeline = {
    intake: 8,
    discovery: 12,
    negotiations: 7,
    trial_prep: 4,
    settlement: 3
  }

  // Automated vendor management
  const vendorStatus = [
    { 
      name: 'Expert Medical Associates', 
      type: 'Medical Expert',
      status: 'active',
      cost: '$12,500',
      aiScore: 94,
      nextAction: 'Schedule deposition',
      autoNegotiated: true
    },
    {
      name: 'Discovery Solutions LLC',
      type: 'Document Review',
      status: 'pending',
      cost: '$8,200',
      aiScore: 87,
      nextAction: 'Approve contract',
      autoNegotiated: true
    },
    {
      name: 'Litigation Support Pro',
      type: 'Trial Graphics',
      status: 'in_progress',
      cost: '$15,600',
      aiScore: 91,
      nextAction: 'Review deliverables',
      autoNegotiated: false
    }
  ]

  // AI workflow automation
  const automatedWorkflows = [
    {
      name: 'Discovery Coordination',
      status: 'running',
      progress: 73,
      nextStep: 'Schedule expert depositions',
      timesSaved: '24 hours',
      casesAffected: 8
    },
    {
      name: 'Settlement Timeline Tracking',
      status: 'running', 
      progress: 89,
      nextStep: 'Prepare final documentation',
      timesSaved: '16 hours',
      casesAffected: 5
    },
    {
      name: 'Vendor Auto-Negotiation',
      status: 'completed',
      progress: 100,
      nextStep: 'Monitor performance',
      timesSaved: '32 hours',
      casesAffected: 12
    }
  ]

  // Critical deadlines with AI prioritization
  const criticalDeadlines = [
    {
      case: 'Johnson v. Metro Insurance',
      deadline: 'Discovery Cutoff',
      daysLeft: 3,
      priority: 'critical',
      aiRecommendation: 'File extension request immediately',
      progress: 67
    },
    {
      case: 'Davis Construction Liability', 
      deadline: 'Expert Report Due',
      daysLeft: 7,
      priority: 'high',
      aiRecommendation: 'Expert on track, monitor daily',
      progress: 85
    },
    {
      case: 'Williams Medical Malpractice',
      deadline: 'Settlement Conference',
      daysLeft: 14,
      priority: 'medium',
      aiRecommendation: 'Prepare settlement authority docs',
      progress: 45
    }
  ]

  // Budget optimization insights
  const budgetInsights = {
    totalBudget: 425000,
    spent: 312000,
    projected: 389000,
    savings: 36000,
    aiOptimizations: [
      { area: 'Vendor negotiations', saved: '$18K', percent: '12%' },
      { area: 'Discovery automation', saved: '$14K', percent: '8%' },
      { area: 'Timeline optimization', saved: '$4K', percent: '3%' }
    ]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* Modern Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 via-blue-600/20 to-teal-600/20"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-teal-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>
      
      {/* Modern Glassmorphism Header */}
      <header className="relative bg-white/5 backdrop-blur-2xl border-b border-white/10 shadow-2xl sticky top-0 z-40">
        <div className="px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-6">
              <div className="relative group">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 via-blue-500 to-teal-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-green-500/25 group-hover:scale-105 transition-all duration-300">
                  <Workflow className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-slate-900 animate-pulse shadow-lg"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-green-100 to-blue-100 bg-clip-text text-transparent">
                  Case Manager Hub
                </h1>
                <p className="text-slate-300 font-medium">AI-Powered Process Automation</p>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-slate-400 text-sm">Welcome back, {userRole?.name}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm border border-green-400/30 px-6 py-3 rounded-2xl shadow-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                  <span className="text-green-200 font-medium">
                    {automationMode ? 'Full Automation' : 'Manual Mode'}
                  </span>
                </div>
              </div>
              
              <button 
                onClick={() => setShowMessaging(true)}
                className="relative p-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm border border-green-400/30 text-green-200 hover:text-white hover:from-green-500/30 hover:to-emerald-500/30 rounded-2xl transition-all duration-300 shadow-lg"
              >
                <MessageCircle className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-pulse shadow-lg shadow-blue-500/50"></span>
              </button>

              <button 
                onClick={() => setAutomationMode(!automationMode)}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white rounded-2xl font-semibold transition-all hover:scale-105 shadow-xl shadow-blue-500/25"
              >
                {automationMode ? 'Disable AI' : 'Enable AI'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="relative px-8 py-10">
        
        {/* AI Automation Status - Enhanced */}
        <div className="relative group mb-10">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-blue-500/20 to-teal-500/20 rounded-3xl blur-xl group-hover:blur-lg transition-all duration-500"></div>
          <div className="relative bg-white/5 backdrop-blur-2xl border border-green-400/30 rounded-3xl p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-green-500/25">
                  <Zap className="w-8 h-8 text-white animate-pulse" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-green-200 to-blue-200 bg-clip-text text-transparent">
                    AI Workflow Automation
                  </h3>
                  <p className="text-slate-300 font-medium">72 hours saved this week • $36K in cost optimization</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-slate-400 text-sm">94% automation rate achieved</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">94%</div>
                <div className="text-slate-300 font-medium">Automation Rate</div>
                <div className="text-green-400 text-sm mt-1">↑ 12% this month</div>
              </div>
            </div>

          <div className="grid grid-cols-3 gap-4">
            {automatedWorkflows.map((workflow, index) => (
              <div key={index} className="bg-gray-800/50 rounded-2xl p-4 border border-gray-700/50">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-white text-sm">{workflow.name}</h4>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    workflow.status === 'running' ? 'bg-green-900/30 text-green-300' :
                    workflow.status === 'completed' ? 'bg-blue-900/30 text-blue-300' :
                    'bg-yellow-900/30 text-yellow-300'
                  }`}>
                    {workflow.status}
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Progress</span>
                    <span>{workflow.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${workflow.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="text-xs text-gray-400 mb-2">
                  Next: {workflow.nextStep}
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs text-blue-400 font-medium">
                    Saved: {workflow.timesSaved}
                  </span>
                  <span className="text-xs text-gray-400">
                    {workflow.casesAffected} cases
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dashboard Metrics */}
        <div className="grid grid-cols-5 gap-6 mb-8">
          {[
            { 
              label: 'Active Cases', 
              value: Object.values(casePipeline).reduce((a, b) => a + b, 0), 
              change: '+3 this week',
              icon: <FileText className="w-5 h-5" />,
              color: 'blue'
            },
            { 
              label: 'Budget Used', 
              value: `${Math.round((budgetInsights.spent / budgetInsights.totalBudget) * 100)}%`, 
              change: '$36K saved',
              icon: <DollarSign className="w-5 h-5" />,
              color: 'green'
            },
            { 
              label: 'On Schedule', 
              value: '91%', 
              change: '+5% improvement',
              icon: <Clock className="w-5 h-5" />,
              color: 'purple'
            },
            { 
              label: 'Vendor Score', 
              value: '4.8/5', 
              change: 'Top performers',
              icon: <Target className="w-5 h-5" />,
              color: 'yellow'
            },
            { 
              label: 'AI Efficiency', 
              value: '8.2x', 
              change: '72h saved/week',
              icon: <Brain className="w-5 h-5" />,
              color: 'pink'
            }
          ].map((metric, index) => (
            <div key={index} className="bg-gray-900 rounded-3xl p-4 border border-gray-700/50 hover:scale-105 transition-all cursor-pointer">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl bg-${metric.color}-900/30 flex items-center justify-center`}>
                  {metric.icon}
                </div>
                <TrendingUp className="w-4 h-4 text-green-400" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
              <div className="text-sm text-gray-400 mb-1">{metric.label}</div>
              <div className="text-xs text-green-400">{metric.change}</div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-3 gap-8">
          
          {/* Case Pipeline */}
          <div className="bg-gray-900 rounded-3xl p-6 border border-gray-700/50">
            <h3 className="text-xl font-bold text-white mb-6">Case Pipeline - AI Optimized</h3>
            
            <div className="space-y-4">
              {Object.entries(casePipeline).map(([stage, count]) => (
                <div key={stage} className="flex items-center justify-between p-4 rounded-2xl bg-gray-800/50 border border-gray-700/50 hover:border-blue-500/50 transition-all cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center text-sm font-bold">
                      {count}
                    </div>
                    <span className="font-medium text-white capitalize">
                      {stage.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Brain className="w-4 h-4 text-blue-400" />
                    <span className="text-xs text-blue-400">AI Managed</span>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => setAiActive(true)}
              className="w-full mt-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-2xl font-semibold transition-all hover:scale-105"
            >
              🧠 Optimize Pipeline with AI
            </button>
          </div>

          {/* Critical Deadlines */}
          <div className="bg-gray-900 rounded-3xl p-6 border border-gray-700/50">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Critical Deadlines</h3>
              <div className="px-2 py-1 bg-red-900/30 rounded-full">
                <span className="text-xs font-medium text-red-300">3 urgent</span>
              </div>
            </div>
            
            <div className="space-y-4">
              {criticalDeadlines.map((item, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-2xl border ${
                    item.priority === 'critical' ? 'bg-red-900/20 border-red-500/30' :
                    item.priority === 'high' ? 'bg-orange-900/20 border-orange-500/30' :
                    'bg-yellow-900/20 border-yellow-500/30'
                  } cursor-pointer hover:scale-[1.02] transition-all`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${
                        item.priority === 'critical' ? 'bg-red-400' :
                        item.priority === 'high' ? 'bg-orange-400' :
                        'bg-yellow-400'
                      } animate-pulse`}></div>
                      <span className="text-sm font-semibold text-white">{item.daysLeft} days</span>
                    </div>
                    <AlertTriangle className={`w-4 h-4 ${
                      item.priority === 'critical' ? 'text-red-400' :
                      item.priority === 'high' ? 'text-orange-400' :
                      'text-yellow-400'
                    }`} />
                  </div>
                  
                  <div className="text-sm text-white font-medium mb-1">{item.deadline}</div>
                  <div className="text-xs text-gray-400 mb-3">{item.case}</div>
                  
                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>Progress</span>
                      <span>{item.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1">
                      <div 
                        className={`h-1 rounded-full ${
                          item.priority === 'critical' ? 'bg-red-400' :
                          item.priority === 'high' ? 'bg-orange-400' :
                          'bg-yellow-400'
                        }`}
                        style={{ width: `${item.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="text-xs text-blue-400 font-medium">
                    🧠 AI: {item.aiRecommendation}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Vendor Management */}
          <div className="bg-gray-900 rounded-3xl p-6 border border-gray-700/50">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Vendor Management</h3>
              <div className="px-2 py-1 bg-green-900/30 rounded-full">
                <span className="text-xs font-medium text-green-300">Auto-negotiated</span>
              </div>
            </div>
            
            <div className="space-y-4">
              {vendorStatus.map((vendor, index) => (
                <div key={index} className="p-4 rounded-2xl bg-gray-800/50 border border-gray-700/50 hover:border-green-500/50 transition-all cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-white text-sm">{vendor.name}</h4>
                    <div className="flex items-center space-x-2">
                      {vendor.autoNegotiated && (
                        <div className="px-2 py-1 bg-green-900/30 rounded-full">
                          <span className="text-xs text-green-300">Auto</span>
                        </div>
                      )}
                      <div className={`w-2 h-2 rounded-full ${
                        vendor.status === 'active' ? 'bg-green-400' :
                        vendor.status === 'pending' ? 'bg-yellow-400' :
                        'bg-blue-400'
                      }`}></div>
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-400 mb-2">{vendor.type}</div>
                  
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-green-400">{vendor.cost}</span>
                    <div className="flex items-center space-x-1">
                      <span className="text-xs text-gray-400">Score:</span>
                      <span className="text-xs font-semibold text-purple-400">{vendor.aiScore}%</span>
                    </div>
                  </div>
                  
                  <div className="text-xs text-blue-400 font-medium">
                    Next: {vendor.nextAction}
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-4 py-2 border border-green-500/50 rounded-xl text-sm font-medium text-green-400 hover:bg-green-500/10 transition-all">
              🤖 Auto-Negotiate New Vendor
            </button>
          </div>
        </div>

        {/* Budget Optimization Panel */}
        <div className="mt-8 bg-gradient-to-r from-green-900/20 to-emerald-900/20 rounded-3xl p-6 border border-green-500/20">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-600 rounded-2xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">AI Budget Optimization</h3>
                <p className="text-sm text-gray-400">
                  ${budgetInsights.savings.toLocaleString()} saved • {Math.round(((budgetInsights.totalBudget - budgetInsights.projected) / budgetInsights.totalBudget) * 100)}% under budget
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-2xl font-bold text-green-400">
                ${(budgetInsights.totalBudget - budgetInsights.projected).toLocaleString()}
              </div>
              <div className="text-sm text-gray-400">Projected Savings</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {budgetInsights.aiOptimizations.map((opt, index) => (
              <div key={index} className="bg-gray-800/50 rounded-2xl p-4 border border-gray-700/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-white">{opt.area}</span>
                  <span className="text-sm font-bold text-green-400">{opt.percent}</span>
                </div>
                <div className="text-lg font-bold text-green-400 mb-1">{opt.saved}</div>
                <div className="text-xs text-gray-400">This quarter</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
      
      {/* Modern Case Manager Toolbar */}
      <div className="relative bg-white/5 backdrop-blur-2xl border-t border-white/10 px-8 py-4 sticky bottom-0">
        <div className="flex items-center space-x-3 overflow-x-auto">
          {[
            { icon: <Zap className="w-5 h-5" />, label: 'Auto-Assign Case', action: 'assign', gradient: 'from-green-500 to-green-600' },
            { icon: <Calendar className="w-5 h-5" />, label: 'Schedule Review', action: 'schedule', gradient: 'from-blue-500 to-blue-600' },
            { icon: <Clock className="w-5 h-5" />, label: 'Deadline Tracker', action: 'deadline', gradient: 'from-orange-500 to-orange-600' },
            { icon: <DollarSign className="w-5 h-5" />, label: 'Budget Analysis', action: 'budget', gradient: 'from-emerald-500 to-emerald-600' },
            { icon: <Users className="w-5 h-5" />, label: 'Team Allocation', action: 'team', gradient: 'from-purple-500 to-purple-600' },
            { icon: <FileText className="w-5 h-5" />, label: 'Generate Report', action: 'report', gradient: 'from-cyan-500 to-cyan-600' },
            { icon: <Target className="w-5 h-5" />, label: 'Performance Metrics', action: 'metrics', gradient: 'from-pink-500 to-pink-600' },
            { icon: <Briefcase className="w-5 h-5" />, label: 'Vendor Management', action: 'vendor', gradient: 'from-indigo-500 to-indigo-600' },
            { icon: <TrendingUp className="w-5 h-5" />, label: 'Optimization', action: 'optimize', gradient: 'from-teal-500 to-teal-600' },
            { icon: <Bell className="w-5 h-5" />, label: 'Set Alert', action: 'alert', gradient: 'from-red-500 to-red-600' }
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

export default CaseManagerWorkflowHub