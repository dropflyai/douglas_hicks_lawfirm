'use client'

import { useState, useEffect } from 'react'
import { 
  Shield, Settings, Users, Lock, Key, Activity,
  Database, Cloud, AlertTriangle, CheckCircle,
  BarChart3, DollarSign, Brain, Zap, Globe,
  Terminal, Server, Cpu, HardDrive, Wifi,
  Eye, EyeOff, FileText, Download, Upload,
  Monitor, Network, Gauge, Clock, Bell,
  TrendingUp, TrendingDown, RefreshCw, Power,
  UserCheck, UserX, Calendar, Mail, Phone, MessageCircle
} from 'lucide-react'
import LegalMessagingHub from '../messaging/LegalMessagingHub'

const AdminControlCenter = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [securityLevel, setSecurityLevel] = useState('maximum')
  const [aiGovernance, setAiGovernance] = useState('strict')
  const [systemStatus, setSystemStatus] = useState('optimal')
  const [realTimeData, setRealTimeData] = useState({})
  const [showMessaging, setShowMessaging] = useState(false)

  // Real-time system monitoring
  useEffect(() => {
    const updateRealTimeData = () => {
      setRealTimeData({
        activeUsers: Math.floor(Math.random() * 15) + 8,
        cpuUsage: Math.floor(Math.random() * 30) + 15,
        memoryUsage: Math.floor(Math.random() * 40) + 25,
        networkTraffic: Math.floor(Math.random() * 100) + 200,
        databaseQueries: Math.floor(Math.random() * 500) + 1200,
        aiProcessing: Math.floor(Math.random() * 20) + 85,
        securityEvents: Math.floor(Math.random() * 5),
        uptime: '99.97%',
        lastBackup: '2 hours ago',
        complianceScore: 98.5
      })
    }
    
    updateRealTimeData()
    const interval = setInterval(updateRealTimeData, 5000)
    return () => clearInterval(interval)
  }, [])

  // System hierarchy and permissions
  const systemHierarchy = {
    'Owner/Managing Partner': {
      level: 0,
      permissions: 'FULL_CONTROL',
      users: ['Douglas Hicks'],
      capabilities: [
        'System shutdown/restart',
        'Financial overview access',
        'Employee termination',
        'AI governance control',
        'Compliance override',
        'Audit log access',
        'Billing management',
        'Partnership decisions'
      ]
    },
    'IT Administrator': {
      level: 1,
      permissions: 'SYSTEM_ADMIN',
      users: ['John Smith'],
      capabilities: [
        'User management',
        'System configuration',
        'Security settings',
        'AI model training',
        'Database management',
        'Integration setup',
        'Backup/Recovery',
        'Performance monitoring'
      ]
    },
    'Compliance Officer': {
      level: 2,
      permissions: 'COMPLIANCE_ADMIN',
      users: ['Sarah Mitchell'],
      capabilities: [
        'Audit trail review',
        'Policy enforcement',
        'Ethics monitoring',
        'Data privacy control',
        'Regulatory reporting',
        'Risk assessment',
        'Training requirements',
        'Incident response'
      ]
    },
    'Department Head': {
      level: 3,
      permissions: 'DEPARTMENT_ADMIN',
      users: ['Michael Chen', 'Jennifer Davis'],
      capabilities: [
        'Team management',
        'Performance reviews',
        'Resource allocation',
        'Case assignment',
        'Budget approval (limited)',
        'Report generation',
        'Workflow customization',
        'Department analytics'
      ]
    }
  }

  // Security & Compliance Rules
  const securityRules = {
    authentication: {
      mfa: 'REQUIRED',
      biometric: 'ENABLED',
      sessionTimeout: '30 minutes',
      passwordPolicy: 'NIST_AAL3',
      failedAttempts: 3
    },
    dataProtection: {
      encryption: 'AES-256',
      atRest: 'ENCRYPTED',
      inTransit: 'TLS 1.3',
      backupFrequency: 'HOURLY',
      retention: '7 YEARS'
    },
    aiGovernance: {
      modelAccess: 'ROLE_BASED',
      trainingData: 'ANONYMIZED',
      decisionLogging: 'REQUIRED',
      humanReview: 'MANDATORY',
      biasMonitoring: 'CONTINUOUS'
    },
    compliance: {
      frameworks: ['SOC2', 'HIPAA', 'GDPR', 'CCPA'],
      auditFrequency: 'QUARTERLY',
      reportingSchedule: 'MONTHLY',
      incidentResponse: '< 1 HOUR',
      dataResidency: 'US_ONLY'
    }
  }

  // Real-time system metrics
  const systemMetrics = {
    users: {
      total: 47,
      active: 42,
      sessions: 38,
      mfaEnabled: '100%'
    },
    security: {
      threatsBlocked: 156,
      lastIncident: 'None (45 days)',
      complianceScore: 98,
      vulnerabilities: 0
    },
    performance: {
      uptime: '99.99%',
      responseTime: '142ms',
      aiAccuracy: '96.8%',
      errorRate: '0.02%'
    },
    costs: {
      monthly: '$24,500',
      perUser: '$520',
      aiUsage: '$8,200',
      storage: '$3,100'
    }
  }

  // Permission Matrix
  const permissionMatrix = {
    'Case Access': {
      'Owner': 'ALL',
      'Attorney': 'ASSIGNED',
      'Paralegal': 'ASSIGNED',
      'Assistant': 'LIMITED',
      'Secretary': 'NONE'
    },
    'Financial Data': {
      'Owner': 'FULL',
      'Attorney': 'OWN_BILLING',
      'Paralegal': 'NONE',
      'Assistant': 'NONE',
      'Secretary': 'NONE'
    },
    'AI Features': {
      'Owner': 'UNLIMITED',
      'Attorney': 'FULL',
      'Paralegal': 'RESEARCH',
      'Assistant': 'BASIC',
      'Secretary': 'BASIC'
    },
    'Client PII': {
      'Owner': 'FULL',
      'Attorney': 'ASSIGNED',
      'Paralegal': 'ASSIGNED',
      'Assistant': 'LIMITED',
      'Secretary': 'CONTACT_ONLY'
    },
    'System Settings': {
      'Owner': 'FULL',
      'IT Admin': 'FULL',
      'Attorney': 'PERSONAL',
      'Paralegal': 'PERSONAL',
      'Others': 'NONE'
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      
      {/* Admin Header */}
      <header className="bg-red-950/50 backdrop-blur-xl border-b border-red-900/50 sticky top-0 z-50">
        <div className="px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-2xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">🔐 Enterprise Admin Control Center</h1>
                <p className="text-xs text-red-300">Maximum Security Mode • Audit Logging Active</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="px-3 py-1.5 bg-red-900/30 rounded-full border border-red-500/30">
                <span className="text-xs font-medium text-red-300">ADMIN ACCESS</span>
              </div>
              
              <button 
                onClick={() => setShowMessaging(true)}
                className="relative p-2 bg-red-900/30 hover:bg-red-800/40 border border-red-500/30 hover:border-red-400/50 rounded-xl transition-all duration-300"
                title="Secure Admin Messaging"
              >
                <MessageCircle className="w-4 h-4 text-red-300" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-yellow-500 to-red-500 rounded-full animate-pulse shadow-lg shadow-red-500/50"></span>
              </button>

              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-400">All Systems Operational</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-gray-900/50 border-b border-gray-800">
        <div className="px-6">
          <div className="flex space-x-6">
            {['overview', 'permissions', 'security', 'ai-governance', 'compliance', 'setup'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-2 border-b-2 transition-all ${
                  activeTab === tab 
                    ? 'border-red-500 text-red-400' 
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <span className="text-sm font-medium capitalize">{tab.replace('-', ' ')}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-6 py-8">
        
        {/* System Overview - Enhanced */}
        {activeTab === 'overview' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Real-Time System Command Center</h2>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => window.location.reload()}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl transition-all"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Refresh</span>
                </button>
                <div className="px-3 py-2 bg-green-900/30 rounded-xl border border-green-500/30">
                  <span className="text-green-400 text-sm font-medium">System Status: OPTIMAL</span>
                </div>
              </div>
            </div>
            
            {/* Real-Time Metrics Grid */}
            <div className="grid grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-r from-blue-900/50 to-blue-800/50 rounded-3xl p-6 border border-blue-500/30">
                <div className="flex items-center justify-between mb-4">
                  <UserCheck className="w-8 h-8 text-blue-400" />
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                <div className="text-3xl font-bold text-white mb-1">{realTimeData.activeUsers || 12}</div>
                <div className="text-sm text-blue-300">Active Users</div>
                <div className="text-xs text-green-400 mt-2">↑ 23% from yesterday</div>
              </div>

              <div className="bg-gradient-to-r from-green-900/50 to-green-800/50 rounded-3xl p-6 border border-green-500/30">
                <div className="flex items-center justify-between mb-4">
                  <Shield className="w-8 h-8 text-green-400" />
                  <div className="text-xs text-green-400 font-medium">SECURE</div>
                </div>
                <div className="text-3xl font-bold text-white mb-1">{realTimeData.complianceScore || 98.5}%</div>
                <div className="text-sm text-green-300">Security Score</div>
                <div className="text-xs text-green-400 mt-2">{realTimeData.securityEvents || 0} alerts today</div>
              </div>

              <div className="bg-gradient-to-r from-purple-900/50 to-purple-800/50 rounded-3xl p-6 border border-purple-500/30">
                <div className="flex items-center justify-between mb-4">
                  <Cpu className="w-8 h-8 text-purple-400" />
                  <div className="text-xs text-green-400">{realTimeData.uptime || '99.97%'}</div>
                </div>
                <div className="text-3xl font-bold text-white mb-1">{realTimeData.cpuUsage || 22}%</div>
                <div className="text-sm text-purple-300">CPU Usage</div>
                <div className="text-xs text-purple-400 mt-2">Memory: {realTimeData.memoryUsage || 34}%</div>
              </div>

              <div className="bg-gradient-to-r from-yellow-900/50 to-orange-900/50 rounded-3xl p-6 border border-yellow-500/30">
                <div className="flex items-center justify-between mb-4">
                  <Brain className="w-8 h-8 text-yellow-400" />
                  <div className="text-xs text-green-400">AI ACTIVE</div>
                </div>
                <div className="text-3xl font-bold text-white mb-1">{realTimeData.aiProcessing || 89}%</div>
                <div className="text-sm text-yellow-300">AI Processing</div>
                <div className="text-xs text-yellow-400 mt-2">{realTimeData.databaseQueries || 1847} queries/sec</div>
              </div>
            </div>

            {/* Advanced System Monitoring */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Real-Time Activity Feed */}
              <div className="bg-gray-900/80 rounded-3xl p-6 border border-gray-700/50">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">Live Activity Monitor</h3>
                  <Monitor className="w-6 h-6 text-blue-400" />
                </div>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {[
                    { time: '14:32:15', user: 'Douglas Hicks', action: 'Accessed Johnson case files', level: 'info' },
                    { time: '14:31:42', user: 'Sarah Johnson', action: 'Generated settlement report', level: 'info' },
                    { time: '14:30:18', user: 'System', action: 'AI model training completed', level: 'success' },
                    { time: '14:29:03', user: 'John Smith', action: 'Updated security settings', level: 'warning' },
                    { time: '14:28:45', user: 'LEX AI', action: 'Processed 247 legal queries', level: 'info' },
                    { time: '14:27:12', user: 'Michael Chen', action: 'Document analysis completed', level: 'success' }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-black/30 rounded-lg hover:bg-black/50 transition-all">
                      <div className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${
                          activity.level === 'success' ? 'bg-green-400' :
                          activity.level === 'warning' ? 'bg-yellow-400' : 'bg-blue-400'
                        } animate-pulse`}></div>
                        <div>
                          <div className="text-white text-sm font-medium">{activity.action}</div>
                          <div className="text-gray-400 text-xs">by {activity.user}</div>
                        </div>
                      </div>
                      <div className="text-gray-500 text-xs">{activity.time}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* System Performance Dashboard */}
              <div className="bg-gray-900/80 rounded-3xl p-6 border border-gray-700/50">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">Performance Analytics</h3>
                  <Gauge className="w-6 h-6 text-green-400" />
                </div>
                <div className="space-y-4">
                  <div className="bg-black/30 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white text-sm">Network Traffic</span>
                      <span className="text-blue-400 text-sm font-medium">{realTimeData.networkTraffic || 287} MB/s</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full transition-all duration-1000" style={{ width: `${(realTimeData.networkTraffic || 287) / 5}%` }}></div>
                    </div>
                  </div>
                  
                  <div className="bg-black/30 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white text-sm">Database Performance</span>
                      <span className="text-green-400 text-sm font-medium">Optimal</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full transition-all duration-1000" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                  
                  <div className="bg-black/30 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white text-sm">AI Response Time</span>
                      <span className="text-purple-400 text-sm font-medium">127ms avg</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full transition-all duration-1000" style={{ width: '85%' }}></div>
                    </div>
                  </div>

                  <div className="bg-black/30 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white text-sm">System Load</span>
                      <span className="text-yellow-400 text-sm font-medium">Light Load</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full transition-all duration-1000" style={{ width: '35%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Critical System Controls */}
            <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 rounded-3xl p-6 border border-red-500/30 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <Power className="w-8 h-8 text-red-400" />
                  <div>
                    <h3 className="text-xl font-bold text-white">Emergency System Controls</h3>
                    <p className="text-red-300 text-sm">Owner/Admin Level Access Required</p>
                  </div>
                </div>
                <div className="text-xs text-red-400 bg-red-900/50 px-3 py-1 rounded-full">
                  RESTRICTED ACCESS
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-4">
                <button className="bg-red-900/50 hover:bg-red-800/50 border border-red-500/50 rounded-xl p-4 text-center transition-all">
                  <Power className="w-6 h-6 text-red-400 mx-auto mb-2" />
                  <div className="text-red-400 text-sm font-medium">System Shutdown</div>
                </button>
                <button className="bg-yellow-900/50 hover:bg-yellow-800/50 border border-yellow-500/50 rounded-xl p-4 text-center transition-all">
                  <AlertTriangle className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                  <div className="text-yellow-400 text-sm font-medium">Maintenance Mode</div>
                </button>
                <button className="bg-blue-900/50 hover:bg-blue-800/50 border border-blue-500/50 rounded-xl p-4 text-center transition-all">
                  <Download className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                  <div className="text-blue-400 text-sm font-medium">Full Backup</div>
                </button>
                <button className="bg-purple-900/50 hover:bg-purple-800/50 border border-purple-500/50 rounded-xl p-4 text-center transition-all">
                  <Shield className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                  <div className="text-purple-400 text-sm font-medium">Security Lockdown</div>
                </button>
              </div>
            </div>

            {/* Hierarchy Display */}
            <div className="bg-gray-900 rounded-3xl p-6 border border-gray-700/50">
              <h3 className="text-xl font-bold text-white mb-6">System Hierarchy & Access Levels</h3>
              
              <div className="space-y-4">
                {Object.entries(systemHierarchy).map(([role, data]) => (
                  <div key={role} className="p-4 bg-gray-800/50 rounded-2xl border border-gray-700/50">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          data.level === 0 ? 'bg-red-600' :
                          data.level === 1 ? 'bg-orange-600' :
                          data.level === 2 ? 'bg-yellow-600' :
                          'bg-blue-600'
                        }`}>
                          <span className="text-white font-bold">L{data.level}</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">{role}</h4>
                          <p className="text-xs text-gray-400">Permission: {data.permissions}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-400">Users: {data.users.length}</div>
                        <div className="text-xs text-blue-400">{data.users[0]}</div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {data.capabilities.slice(0, 4).map((cap, i) => (
                        <span key={i} className="px-2 py-1 bg-gray-700/50 rounded-lg text-xs text-gray-300">
                          {cap}
                        </span>
                      ))}
                      {data.capabilities.length > 4 && (
                        <span className="px-2 py-1 bg-gray-700/50 rounded-lg text-xs text-gray-400">
                          +{data.capabilities.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Permissions Matrix */}
        {activeTab === 'permissions' && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Permission Matrix</h2>
            
            <div className="bg-gray-900 rounded-3xl p-6 border border-gray-700/50">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Feature/Resource</th>
                      <th className="text-center py-3 px-4 text-sm font-semibold text-gray-400">Owner</th>
                      <th className="text-center py-3 px-4 text-sm font-semibold text-gray-400">Attorney</th>
                      <th className="text-center py-3 px-4 text-sm font-semibold text-gray-400">Paralegal</th>
                      <th className="text-center py-3 px-4 text-sm font-semibold text-gray-400">Assistant</th>
                      <th className="text-center py-3 px-4 text-sm font-semibold text-gray-400">Secretary</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(permissionMatrix).map(([feature, perms]) => (
                      <tr key={feature} className="border-b border-gray-800">
                        <td className="py-3 px-4 text-sm text-white font-medium">{feature}</td>
                        {Object.values(perms).map((perm, i) => (
                          <td key={i} className="text-center py-3 px-4">
                            <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                              perm === 'FULL' || perm === 'ALL' || perm === 'UNLIMITED' ? 'bg-green-900/30 text-green-400' :
                              perm === 'NONE' ? 'bg-red-900/30 text-red-400' :
                              'bg-yellow-900/30 text-yellow-400'
                            }`}>
                              {perm}
                            </span>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 flex justify-between items-center">
                <button className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-xl text-sm font-medium transition-all">
                  Edit Permissions
                </button>
                <div className="text-xs text-gray-400">
                  Last modified: 2 hours ago by IT Admin
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Security Settings */}
        {activeTab === 'security' && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Security Configuration</h2>
            
            <div className="grid grid-cols-2 gap-6">
              {/* Authentication */}
              <div className="bg-gray-900 rounded-3xl p-6 border border-gray-700/50">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Lock className="w-5 h-5 mr-2 text-red-400" />
                  Authentication
                </h3>
                
                <div className="space-y-4">
                  {Object.entries(securityRules.authentication).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between py-2 border-b border-gray-800">
                      <span className="text-sm text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <span className={`text-sm font-medium ${
                        value === 'REQUIRED' || value === 'ENABLED' ? 'text-green-400' : 'text-white'
                      }`}>
                        {value}
                      </span>
                    </div>
                  ))}
                </div>

                <button className="mt-4 w-full py-2 bg-red-600/20 hover:bg-red-600/30 border border-red-500/50 rounded-xl text-sm font-medium text-red-400 transition-all">
                  Configure Authentication
                </button>
              </div>

              {/* Data Protection */}
              <div className="bg-gray-900 rounded-3xl p-6 border border-gray-700/50">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Database className="w-5 h-5 mr-2 text-blue-400" />
                  Data Protection
                </h3>
                
                <div className="space-y-4">
                  {Object.entries(securityRules.dataProtection).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between py-2 border-b border-gray-800">
                      <span className="text-sm text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <span className="text-sm font-medium text-white">{value}</span>
                    </div>
                  ))}
                </div>

                <button className="mt-4 w-full py-2 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/50 rounded-xl text-sm font-medium text-blue-400 transition-all">
                  Manage Encryption
                </button>
              </div>
            </div>

            {/* Compliance Frameworks */}
            <div className="mt-6 bg-gray-900 rounded-3xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                Compliance Frameworks
              </h3>
              
              <div className="grid grid-cols-4 gap-4">
                {securityRules.compliance.frameworks.map((framework) => (
                  <div key={framework} className="p-4 bg-gray-800/50 rounded-2xl border border-green-500/30 text-center">
                    <div className="text-lg font-bold text-green-400 mb-1">{framework}</div>
                    <div className="text-xs text-gray-400">Compliant</div>
                    <CheckCircle className="w-6 h-6 text-green-400 mx-auto mt-2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* AI Governance */}
        {activeTab === 'ai-governance' && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">AI Governance & Ethics</h2>
            
            <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-500/20 rounded-3xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Brain className="w-8 h-8 text-purple-400" />
                  <div>
                    <h3 className="text-xl font-bold text-white">AI Control Settings</h3>
                    <p className="text-sm text-gray-400">Governance Level: {aiGovernance.toUpperCase()}</p>
                  </div>
                </div>
                
                <select 
                  value={aiGovernance}
                  onChange={(e) => setAiGovernance(e.target.value)}
                  className="bg-gray-800 text-white px-4 py-2 rounded-xl border border-gray-600"
                >
                  <option value="strict">Strict Governance</option>
                  <option value="moderate">Moderate Governance</option>
                  <option value="flexible">Flexible Governance</option>
                </select>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {Object.entries(securityRules.aiGovernance).map(([key, value]) => (
                  <div key={key} className="p-4 bg-gray-800/50 rounded-2xl border border-gray-700/50">
                    <div className="text-sm text-gray-400 mb-1 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                    <div className="text-lg font-semibold text-purple-400">{value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Usage Limits */}
            <div className="bg-gray-900 rounded-3xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-white mb-4">AI Usage Limits by Role</h3>
              
              <div className="space-y-3">
                {[
                  { role: 'Owner/Partner', limit: 'Unlimited', usage: '2,450 queries', cost: '$8,200' },
                  { role: 'Attorney', limit: '1000/day', usage: '742 queries', cost: '$2,100' },
                  { role: 'Paralegal', limit: '500/day', usage: '423 queries', cost: '$980' },
                  { role: 'Assistant', limit: '200/day', usage: '156 queries', cost: '$340' },
                  { role: 'Secretary', limit: '100/day', usage: '87 queries', cost: '$180' }
                ].map((item) => (
                  <div key={item.role} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                        <Brain className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">{item.role}</div>
                        <div className="text-xs text-gray-400">Limit: {item.limit}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-purple-400">{item.usage}</div>
                      <div className="text-xs text-gray-400">{item.cost}/mo</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Setup Wizard */}
        {activeTab === 'setup' && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Initial Setup & Configuration</h2>
            
            <div className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border border-blue-500/20 rounded-3xl p-8">
              <h3 className="text-xl font-bold text-white mb-6">🚀 Quick Setup Wizard</h3>
              
              <div className="space-y-6">
                {[
                  { step: 1, title: 'Organization Setup', status: 'completed', desc: 'Firm name, address, licensing' },
                  { step: 2, title: 'User Provisioning', status: 'completed', desc: '47 users imported from Azure AD' },
                  { step: 3, title: 'Role Assignment', status: 'completed', desc: 'Hierarchy and permissions configured' },
                  { step: 4, title: 'Security Configuration', status: 'in_progress', desc: 'MFA, encryption, compliance' },
                  { step: 5, title: 'AI Training', status: 'pending', desc: 'Custom model training with firm data' },
                  { step: 6, title: 'Integration Setup', status: 'pending', desc: 'Connect to existing systems' },
                  { step: 7, title: 'Go Live', status: 'pending', desc: 'Final testing and deployment' }
                ].map((item) => (
                  <div key={item.step} className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold ${
                      item.status === 'completed' ? 'bg-green-600 text-white' :
                      item.status === 'in_progress' ? 'bg-blue-600 text-white animate-pulse' :
                      'bg-gray-700 text-gray-400'
                    }`}>
                      {item.status === 'completed' ? '✓' : item.step}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold text-white">{item.title}</h4>
                        {item.status === 'in_progress' && (
                          <span className="px-2 py-0.5 bg-blue-900/30 rounded-full text-xs text-blue-400">In Progress</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-400">{item.desc}</p>
                    </div>
                    {item.status === 'in_progress' && (
                      <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl text-sm font-medium transition-all">
                        Continue Setup
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-gray-800/50 rounded-2xl border border-gray-700/50">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-white">Estimated Time to Complete</h4>
                    <p className="text-sm text-gray-400">2-3 hours with IT administrator</p>
                  </div>
                  <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-xl font-semibold transition-all">
                    Resume Setup Wizard
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Advanced Admin Toolbar */}
      <div className="bg-gray-800/50 border-t border-red-700/30 px-6 py-2 sticky bottom-0">
        <div className="flex items-center space-x-2 overflow-x-auto">
          {[
            { icon: <Users className="w-4 h-4" />, label: 'User Management', action: 'users', color: 'blue' },
            { icon: <Shield className="w-4 h-4" />, label: 'Security Scan', action: 'security', color: 'green' },
            { icon: <Database className="w-4 h-4" />, label: 'Database Admin', action: 'database', color: 'purple' },
            { icon: <Brain className="w-4 h-4" />, label: 'AI Training', action: 'ai', color: 'yellow' },
            { icon: <Activity className="w-4 h-4" />, label: 'System Monitor', action: 'monitor', color: 'blue' },
            { icon: <Download className="w-4 h-4" />, label: 'Backup Now', action: 'backup', color: 'green' },
            { icon: <FileText className="w-4 h-4" />, label: 'Audit Logs', action: 'logs', color: 'gray' },
            { icon: <Settings className="w-4 h-4" />, label: 'System Config', action: 'config', color: 'purple' },
            { icon: <Bell className="w-4 h-4" />, label: 'Alert Manager', action: 'alerts', color: 'red' },
            { icon: <Power className="w-4 h-4" />, label: 'System Control', action: 'power', color: 'red' }
          ].map((tool) => (
            <button
              key={tool.action}
              onClick={() => console.log(`${tool.action} clicked`)}
              className={`flex items-center space-x-2 px-3 py-1.5 bg-gray-700/50 hover:bg-${tool.color}-600/30 rounded-lg text-gray-300 hover:text-white transition-all duration-300 text-sm whitespace-nowrap`}
              title={tool.label}
            >
              {tool.icon}
              <span className="hidden lg:inline">{tool.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Secure Admin Messaging Hub Modal */}
      {showMessaging && (
        <LegalMessagingHub 
          isOpen={showMessaging}
          onClose={() => setShowMessaging(false)}
          userRole={{ name: 'Admin', title: 'System Administrator', role: 'admin' }}
        />
      )}
    </div>
  )
}

export default AdminControlCenter