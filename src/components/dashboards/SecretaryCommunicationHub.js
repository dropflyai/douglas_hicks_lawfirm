'use client'

import { useState, useEffect } from 'react'
import { 
  Phone, 
  Mail, 
  MessageSquare, 
  Calendar, 
  Users, 
  FileText, 
  Clock, 
  Bell, 
  CheckCircle, 
  AlertTriangle, 
  Volume2,
  Mic,
  Send,
  Archive,
  Filter,
  Search,
  Edit,
  Settings,
  Download,
  Upload,
  Star,
  Bookmark,
  UserCheck,
  PhoneCall,
  Headphones,
  Radio,
  Zap
} from 'lucide-react'
import WorkspaceBrowser from '../browser/WorkspaceBrowser'

const SecretaryCommunicationHub = ({ userRole, aiActive, setAiActive }) => {
  const [activeTab, setActiveTab] = useState('communications')
  const [calls, setCalls] = useState([])
  const [messages, setMessages] = useState([])
  const [visitors, setVisitors] = useState([])
  const [selectedWorkspace, setSelectedWorkspace] = useState('dashboard')
  const [navigationHistory, setNavigationHistory] = useState(['dashboard'])
  const [historyIndex, setHistoryIndex] = useState(0)

  // Simulated real-time data
  useEffect(() => {
    const loadData = () => {
      setCalls([
        { id: 1, type: 'incoming', caller: 'Johnson Manufacturing', phone: '(555) 123-4567', time: '9:15 AM', status: 'connected', attorney: 'Douglas Hicks', duration: '00:12:45' },
        { id: 2, type: 'outgoing', caller: 'Metro Insurance', phone: '(555) 987-6543', time: '10:30 AM', status: 'completed', attorney: 'Sarah Johnson', duration: '00:08:22' },
        { id: 3, type: 'missed', caller: 'Smith Family Trust', phone: '(555) 456-7890', time: '11:45 AM', status: 'callback_needed', attorney: 'Michael Chen', duration: '00:00:00' },
        { id: 4, type: 'incoming', caller: 'Davis Personal Injury', phone: '(555) 321-0987', time: '1:20 PM', status: 'on_hold', attorney: 'Douglas Hicks', duration: '00:03:12' }
      ])

      setMessages([
        { id: 1, type: 'email', from: 'johnson@manufacturing.com', subject: 'Contract Review Urgency', time: '8:30 AM', priority: 'high', attorney: 'Douglas Hicks' },
        { id: 2, type: 'voicemail', from: 'Metro Insurance Legal', subject: 'Settlement Discussion', time: '9:45 AM', priority: 'medium', attorney: 'Sarah Johnson' },
        { id: 3, type: 'fax', from: 'Court Clerk', subject: 'Motion Filing Confirmation', time: '11:15 AM', priority: 'urgent', attorney: 'Douglas Hicks' },
        { id: 4, type: 'email', from: 'davis.law@email.com', subject: 'Document Request Follow-up', time: '2:10 PM', priority: 'low', attorney: 'Michael Chen' }
      ])

      setVisitors([
        { id: 1, name: 'Robert Johnson', company: 'Johnson Manufacturing', appointment: '2:00 PM', attorney: 'Douglas Hicks', status: 'waiting', arrived: '1:50 PM' },
        { id: 2, name: 'Lisa Davis', company: 'Davis Personal Injury', appointment: '3:30 PM', attorney: 'Michael Chen', status: 'scheduled', arrived: null },
        { id: 3, name: 'Metro Insurance Rep', company: 'Metro Insurance', appointment: '4:00 PM', attorney: 'Sarah Johnson', status: 'confirmed', arrived: null }
      ])
    }

    loadData()
    const interval = setInterval(loadData, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const tabs = [
    { id: 'communications', name: 'Communication Hub', icon: <MessageSquare className="w-5 h-5" /> },
    { id: 'calls', name: 'Call Management', icon: <Phone className="w-5 h-5" /> },
    { id: 'visitors', name: 'Visitor Management', icon: <Users className="w-5 h-5" /> },
    { id: 'scheduling', name: 'Smart Scheduling', icon: <Calendar className="w-5 h-5" /> },
    { id: 'messages', name: 'Message Center', icon: <Mail className="w-5 h-5" /> }
  ]

  const renderCommunications = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Communication Dashboard */}
      <div className="lg:col-span-2">
        <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-gray-700/30 rounded-3xl p-6 shadow-2xl mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <Radio className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Live Communication Center</h2>
                <p className="text-gray-400 text-sm">AI-powered communication orchestration</p>
              </div>
            </div>
            <div className="bg-green-400/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium">
              98% Response Rate
            </div>
          </div>
          
          <div className="space-y-4">
            {calls.slice(0, 3).map((call) => (
              <div key={call.id} className="bg-black/30 border border-gray-700/40 rounded-xl p-4 hover:border-blue-500/30 transition-all duration-300">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      call.type === 'incoming' ? 'bg-green-400' : 
                      call.type === 'outgoing' ? 'bg-blue-400' : 'bg-red-400'
                    } animate-pulse`}></div>
                    <div>
                      <h3 className="text-white font-medium">{call.caller}</h3>
                      <p className="text-gray-400 text-sm">{call.phone}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white text-sm">{call.time}</div>
                    <div className="text-gray-400 text-xs">{call.duration}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">For: {call.attorney}</span>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    call.status === 'connected' ? 'bg-green-400/20 text-green-400' : 
                    call.status === 'completed' ? 'bg-blue-400/20 text-blue-400' : 
                    call.status === 'callback_needed' ? 'bg-yellow-400/20 text-yellow-400' : 
                    'bg-orange-400/20 text-orange-400'
                  }`}>
                    {call.status.replace('_', ' ')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Messages */}
        <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-gray-700/30 rounded-3xl p-6 shadow-2xl">
          <h2 className="text-xl font-bold text-white mb-6">Priority Message Queue</h2>
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className="bg-black/30 border border-gray-700/40 rounded-xl p-4 hover:border-purple-500/30 transition-all duration-300">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      msg.type === 'email' ? 'bg-blue-500' : 
                      msg.type === 'voicemail' ? 'bg-green-500' : 'bg-purple-500'
                    }`}>
                      {msg.type === 'email' ? <Mail className="w-4 h-4 text-white" /> : 
                       msg.type === 'voicemail' ? <Volume2 className="w-4 h-4 text-white" /> : 
                       <FileText className="w-4 h-4 text-white" />}
                    </div>
                    <div>
                      <h3 className="text-white font-medium">{msg.subject}</h3>
                      <p className="text-gray-400 text-sm">From: {msg.from}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white text-sm">{msg.time}</div>
                    <div className={`text-xs font-medium ${
                      msg.priority === 'urgent' ? 'text-red-400' : 
                      msg.priority === 'high' ? 'text-yellow-400' : 
                      msg.priority === 'medium' ? 'text-blue-400' : 'text-gray-400'
                    }`}>
                      {msg.priority}
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-500">Assigned: {msg.attorney}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Assistant & Quick Actions */}
      <div className="space-y-6">
        {/* AI Communication Insights */}
        <div className="bg-gradient-to-r from-purple-900/80 to-pink-900/80 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-6 shadow-2xl">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">AI Communication Insights</h3>
              <p className="text-purple-300 text-sm">Real-time optimization</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="bg-black/40 p-3 rounded-lg">
              <div className="text-purple-400 text-sm font-medium">📞 Call Pattern Analysis</div>
              <div className="text-gray-300 text-sm">Peak call time: 9-11 AM (67% of daily volume)</div>
            </div>
            <div className="bg-black/40 p-3 rounded-lg">
              <div className="text-blue-400 text-sm font-medium">🎯 Response Optimization</div>
              <div className="text-gray-300 text-sm">Average response time: 2.3 minutes</div>
            </div>
            <div className="bg-black/40 p-3 rounded-lg">
              <div className="text-green-400 text-sm font-medium">📈 Efficiency Gains</div>
              <div className="text-gray-300 text-sm">AI routing saves 45 minutes/day</div>
            </div>
          </div>
        </div>

        {/* Live Call Status */}
        <div className="bg-gradient-to-r from-green-900/80 to-blue-900/80 backdrop-blur-xl border border-green-500/30 rounded-3xl p-6 shadow-2xl">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
              <Headphones className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Live Call Status</h3>
              <p className="text-green-300 text-sm">Active call management</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="bg-black/40 p-3 rounded-lg flex items-center justify-between">
              <div>
                <div className="text-green-400 text-sm font-medium">📞 Active Calls</div>
                <div className="text-gray-300 text-sm">2 in progress</div>
              </div>
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div className="bg-black/40 p-3 rounded-lg flex items-center justify-between">
              <div>
                <div className="text-yellow-400 text-sm font-medium">⏳ On Hold</div>
                <div className="text-gray-300 text-sm">1 waiting</div>
              </div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
            </div>
            <div className="bg-black/40 p-3 rounded-lg flex items-center justify-between">
              <div>
                <div className="text-red-400 text-sm font-medium">📞 Callbacks Due</div>
                <div className="text-gray-300 text-sm">3 pending</div>
              </div>
              <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-gray-700/30 rounded-3xl p-6 shadow-2xl">
          <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 rounded-lg p-3 text-center transition-all duration-300">
              <Phone className="w-6 h-6 text-blue-400 mx-auto mb-1" />
              <div className="text-blue-400 text-sm font-medium">New Call</div>
            </button>
            <button className="bg-green-600/20 hover:bg-green-600/30 border border-green-500/30 rounded-lg p-3 text-center transition-all duration-300">
              <Mail className="w-6 h-6 text-green-400 mx-auto mb-1" />
              <div className="text-green-400 text-sm font-medium">Send Email</div>
            </button>
            <button className="bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 rounded-lg p-3 text-center transition-all duration-300">
              <Calendar className="w-6 h-6 text-purple-400 mx-auto mb-1" />
              <div className="text-purple-400 text-sm font-medium">Schedule</div>
            </button>
            <button className="bg-yellow-600/20 hover:bg-yellow-600/30 border border-yellow-500/30 rounded-lg p-3 text-center transition-all duration-300">
              <Bell className="w-6 h-6 text-yellow-400 mx-auto mb-1" />
              <div className="text-yellow-400 text-sm font-medium">Reminder</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderCalls = () => (
    <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-gray-700/30 rounded-3xl p-6 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Advanced Call Management</h2>
        <div className="flex items-center space-x-2">
          <span className="text-green-400 text-sm font-medium">{calls.length} Calls Today</span>
        </div>
      </div>
      
      <div className="space-y-4">
        {calls.map((call) => (
          <div key={call.id} className="bg-black/30 border border-gray-700/40 rounded-xl p-4 hover:border-blue-500/30 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  call.type === 'incoming' ? 'bg-green-500/20 border-2 border-green-500' : 
                  call.type === 'outgoing' ? 'bg-blue-500/20 border-2 border-blue-500' : 
                  'bg-red-500/20 border-2 border-red-500'
                }`}>
                  <Phone className={`w-6 h-6 ${
                    call.type === 'incoming' ? 'text-green-400' : 
                    call.type === 'outgoing' ? 'text-blue-400' : 'text-red-400'
                  }`} />
                </div>
                <div>
                  <h3 className="text-white font-medium">{call.caller}</h3>
                  <p className="text-gray-400 text-sm">{call.phone}</p>
                  <p className="text-gray-500 text-xs">For: {call.attorney}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-white font-medium">{call.time}</div>
                <div className="text-gray-400 text-sm">{call.duration}</div>
                <div className={`text-xs font-medium mt-1 ${
                  call.status === 'connected' ? 'text-green-400' : 
                  call.status === 'completed' ? 'text-blue-400' : 
                  call.status === 'callback_needed' ? 'text-yellow-400' : 'text-orange-400'
                }`}>
                  {call.status.replace('_', ' ').toUpperCase()}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderVisitors = () => (
    <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-gray-700/30 rounded-3xl p-6 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Visitor Management System</h2>
        <div className="flex items-center space-x-2">
          <span className="text-green-400 text-sm font-medium">{visitors.length} Expected Today</span>
        </div>
      </div>
      
      <div className="space-y-4">
        {visitors.map((visitor) => (
          <div key={visitor.id} className="bg-black/30 border border-gray-700/40 rounded-xl p-4 hover:border-purple-500/30 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <UserCheck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-medium">{visitor.name}</h3>
                  <p className="text-gray-400 text-sm">{visitor.company}</p>
                  <p className="text-gray-500 text-xs">Meeting with: {visitor.attorney}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-white font-medium">{visitor.appointment}</div>
                {visitor.arrived && (
                  <div className="text-green-400 text-sm">Arrived: {visitor.arrived}</div>
                )}
                <div className={`text-xs font-medium mt-1 px-2 py-1 rounded-full ${
                  visitor.status === 'waiting' ? 'bg-yellow-400/20 text-yellow-400' : 
                  visitor.status === 'confirmed' ? 'bg-green-400/20 text-green-400' : 
                  'bg-blue-400/20 text-blue-400'
                }`}>
                  {visitor.status.toUpperCase()}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  // Navigation functions
  const navigateTo = (workspace) => {
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

  // Secretary Tools
  const secretaryTools = [
    { id: 'contacts', name: 'Contacts', icon: Users },
    { id: 'calendar', name: 'Calendar', icon: Calendar },
    { id: 'documents', name: 'Documents', icon: FileText },
    { id: 'cases', name: 'Cases', icon: Phone },
    { id: 'billing', name: 'Billing', icon: Mail },
    { id: 'messages', name: 'Messages', icon: MessageSquare },
  ]

  if (selectedWorkspace !== 'dashboard') {
    return (
      <WorkspaceBrowser 
        workspace={selectedWorkspace}
        selectedCase={null}
        onBack={navigateBack}
        onForward={navigateForward}
        onNavigate={navigateTo}
        canGoBack={historyIndex > 0}
        canGoForward={historyIndex < navigationHistory.length - 1}
        setAiActive={setAiActive}
        setAiVoiceActive={() => {}}
      />
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900/95 to-black/95 backdrop-blur-xl border-b border-gray-700/30 sticky top-0 z-40">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <Radio className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">📞 Secretary Communication Hub</h1>
                <p className="text-gray-400">Welcome back, {userRole?.name} • {userRole?.department}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-green-400/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                All Systems Active
              </div>
              <div className="bg-blue-400/20 text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
                {calls.filter(c => c.status === 'connected').length} Active Calls
              </div>
            </div>
          </div>
          
          {/* Navigation Tabs */}
          <div className="flex space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/20'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                {tab.icon}
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {activeTab === 'communications' && renderCommunications()}
        {activeTab === 'calls' && renderCalls()}
        {activeTab === 'visitors' && renderVisitors()}
        {activeTab === 'scheduling' && (
          <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-gray-700/30 rounded-3xl p-6 shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-6">Smart Scheduling System</h2>
            <p className="text-gray-400">Advanced AI-powered scheduling coming soon...</p>
          </div>
        )}
        {activeTab === 'messages' && (
          <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-gray-700/30 rounded-3xl p-6 shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-6">Unified Message Center</h2>
            <p className="text-gray-400">Comprehensive message management coming soon...</p>
          </div>
        )}
      </div>

      {/* Advanced Communication Toolbar */}
      <div className="bg-gray-800/50 border-t border-gray-700/30 px-6 py-2 sticky bottom-0">
        <div className="flex items-center space-x-2 overflow-x-auto">
          {[
            { icon: <Phone className="w-4 h-4" />, label: 'Answer Call', action: 'answer' },
            { icon: <PhoneCall className="w-4 h-4" />, label: 'Make Call', action: 'call' },
            { icon: <Mail className="w-4 h-4" />, label: 'Send Email', action: 'email' },
            { icon: <MessageSquare className="w-4 h-4" />, label: 'Internal Message', action: 'message' },
            { icon: <Calendar className="w-4 h-4" />, label: 'Schedule Meeting', action: 'schedule' },
            { icon: <UserCheck className="w-4 h-4" />, label: 'Check In Visitor', action: 'checkin' },
            { icon: <Bell className="w-4 h-4" />, label: 'Send Alert', action: 'alert' },
            { icon: <Volume2 className="w-4 h-4" />, label: 'Voice Message', action: 'voicemail' },
            { icon: <Archive className="w-4 h-4" />, label: 'Archive', action: 'archive' },
            { icon: <Download className="w-4 h-4" />, label: 'Export Log', action: 'export' }
          ].map((tool) => (
            <button
              key={tool.action}
              onClick={() => console.log(`${tool.action} clicked`)}
              className="flex items-center space-x-2 px-3 py-1.5 bg-gray-700/50 hover:bg-blue-600/30 rounded-lg text-gray-300 hover:text-white transition-all duration-300 text-sm whitespace-nowrap"
              title={tool.label}
            >
              {tool.icon}
              <span className="hidden lg:inline">{tool.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SecretaryCommunicationHub