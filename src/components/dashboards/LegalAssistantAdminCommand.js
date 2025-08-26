'use client'

import { useState, useEffect } from 'react'
import { 
  Calendar, 
  Users, 
  FileText, 
  Phone, 
  Mail, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Briefcase,
  User,
  Search,
  Edit,
  Send,
  Archive,
  Filter,
  Download,
  Upload,
  Settings,
  Bell,
  MessageSquare,
  Calculator,
  FileCheck,
  Bookmark,
  Star,
  Zap
} from 'lucide-react'
import WorkspaceBrowser from '../browser/WorkspaceBrowser'

const LegalAssistantAdminCommand = ({ userRole, aiActive, setAiActive }) => {
  const [activeTab, setActiveTab] = useState('overview')
  const [appointments, setAppointments] = useState([])
  const [tasks, setTasks] = useState([])
  const [clients, setClients] = useState([])
  const [selectedWorkspace, setSelectedWorkspace] = useState('dashboard')
  const [navigationHistory, setNavigationHistory] = useState(['dashboard'])
  const [historyIndex, setHistoryIndex] = useState(0)

  // Simulated data loading
  useEffect(() => {
    // Simulate loading real-time data
    const loadData = () => {
      setAppointments([
        { id: 1, time: '9:00 AM', client: 'Johnson v. ABC Corp', type: 'Initial Consultation', attorney: 'Douglas Hicks', status: 'confirmed' },
        { id: 2, time: '11:30 AM', client: 'Smith Family Trust', type: 'Document Review', attorney: 'Sarah Johnson', status: 'pending' },
        { id: 3, time: '2:00 PM', client: 'Metro Insurance', type: 'Settlement Meeting', attorney: 'Douglas Hicks', status: 'confirmed' },
        { id: 4, time: '3:30 PM', client: 'Davis Personal Injury', type: 'Client Update', attorney: 'Michael Chen', status: 'needs_prep' }
      ])

      setTasks([
        { id: 1, task: 'Prepare discovery documents for Johnson case', priority: 'high', due: 'Today', completion: 75, attorney: 'Douglas Hicks' },
        { id: 2, task: 'Schedule depositions for Metro Insurance', priority: 'medium', due: 'Tomorrow', completion: 30, attorney: 'Sarah Johnson' },
        { id: 3, task: 'File motions with court clerk', priority: 'urgent', due: '2 hours', completion: 90, attorney: 'Douglas Hicks' },
        { id: 4, task: 'Update client contact information', priority: 'low', due: 'This week', completion: 0, attorney: 'Michael Chen' }
      ])

      setClients([
        { id: 1, name: 'Johnson Manufacturing', type: 'Corporate', lastContact: '2 days ago', status: 'active', attorney: 'Douglas Hicks' },
        { id: 2, name: 'Smith Family', type: 'Estate Planning', lastContact: '1 week ago', status: 'active', attorney: 'Sarah Johnson' },
        { id: 3, name: 'Metro Insurance Co.', type: 'Litigation', lastContact: 'Yesterday', status: 'urgent', attorney: 'Douglas Hicks' },
        { id: 4, name: 'Davis Personal Injury', type: 'Personal Injury', lastContact: '3 days ago', status: 'follow_up', attorney: 'Michael Chen' }
      ])
    }

    loadData()
  }, [])

  const tabs = [
    { id: 'overview', name: 'Administrative Command', icon: <Briefcase className="w-5 h-5" /> },
    { id: 'calendar', name: 'Smart Calendar', icon: <Calendar className="w-5 h-5" /> },
    { id: 'clients', name: 'Client Management', icon: <Users className="w-5 h-5" /> },
    { id: 'communications', name: 'Communications Hub', icon: <MessageSquare className="w-5 h-5" /> },
    { id: 'documents', name: 'Document Control', icon: <FileText className="w-5 h-5" /> }
  ]

  const renderOverview = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Today's Priority Tasks */}
      <div className="lg:col-span-2">
        <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-gray-700/30 rounded-3xl p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Priority Task Queue</h2>
                <p className="text-gray-400 text-sm">AI-prioritized administrative workflow</p>
              </div>
            </div>
            <div className="bg-green-400/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium">
              94% Efficiency Rate
            </div>
          </div>
          
          <div className="space-y-4">
            {tasks.map((task) => (
              <div key={task.id} className="bg-black/30 border border-gray-700/40 rounded-xl p-4 hover:border-purple-500/30 transition-all duration-300">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      task.priority === 'urgent' ? 'bg-red-400' : 
                      task.priority === 'high' ? 'bg-yellow-400' : 
                      task.priority === 'medium' ? 'bg-blue-400' : 'bg-gray-400'
                    }`}></div>
                    <h3 className="text-white font-medium">{task.task}</h3>
                  </div>
                  <span className="text-sm text-gray-400">{task.due}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">For: {task.attorney}</div>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${task.completion}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-400">{task.completion}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions & Metrics */}
      <div className="space-y-6">
        {/* AI Insights */}
        <div className="bg-gradient-to-r from-blue-900/80 to-purple-900/80 backdrop-blur-xl border border-blue-500/30 rounded-3xl p-6 shadow-2xl">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">AI Administrative Insights</h3>
              <p className="text-blue-300 text-sm">Real-time optimization</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="bg-black/40 p-3 rounded-lg">
              <div className="text-green-400 text-sm font-medium">📈 Peak Productivity Window</div>
              <div className="text-gray-300 text-sm">9:00 AM - 11:30 AM optimal for complex tasks</div>
            </div>
            <div className="bg-black/40 p-3 rounded-lg">
              <div className="text-yellow-400 text-sm font-medium">⚠️ Scheduling Conflict Alert</div>
              <div className="text-gray-300 text-sm">Johnson meeting may run over - buffer needed</div>
            </div>
            <div className="bg-black/40 p-3 rounded-lg">
              <div className="text-blue-400 text-sm font-medium">💡 Workflow Optimization</div>
              <div className="text-gray-300 text-sm">Batch similar tasks for 23% efficiency gain</div>
            </div>
          </div>
        </div>

        {/* Today's Appointments */}
        <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-gray-700/30 rounded-3xl p-6 shadow-2xl">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Today's Schedule</h3>
              <p className="text-gray-400 text-sm">4 appointments managed</p>
            </div>
          </div>
          <div className="space-y-3">
            {appointments.slice(0, 3).map((apt) => (
              <div key={apt.id} className="bg-black/30 p-3 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white font-medium text-sm">{apt.time}</span>
                  <div className={`w-2 h-2 rounded-full ${
                    apt.status === 'confirmed' ? 'bg-green-400' : 
                    apt.status === 'pending' ? 'bg-yellow-400' : 'bg-red-400'
                  }`}></div>
                </div>
                <div className="text-gray-300 text-sm">{apt.client}</div>
                <div className="text-gray-500 text-xs">{apt.type}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderCalendar = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-gray-700/30 rounded-3xl p-6 shadow-2xl">
        <h2 className="text-xl font-bold text-white mb-6">Smart Calendar Management</h2>
        <div className="space-y-4">
          {appointments.map((apt) => (
            <div key={apt.id} className="bg-black/30 border border-gray-700/40 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-medium text-white">{apt.time}</span>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  apt.status === 'confirmed' ? 'bg-green-400/20 text-green-400' : 
                  apt.status === 'pending' ? 'bg-yellow-400/20 text-yellow-400' : 
                  'bg-red-400/20 text-red-400'
                }`}>
                  {apt.status.replace('_', ' ')}
                </div>
              </div>
              <div className="text-white font-medium">{apt.client}</div>
              <div className="text-gray-400 text-sm">{apt.type}</div>
              <div className="text-gray-500 text-xs mt-1">Attorney: {apt.attorney}</div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-purple-900/80 to-pink-900/80 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-6 shadow-2xl">
        <h2 className="text-xl font-bold text-white mb-6">AI Scheduling Assistant</h2>
        <div className="space-y-4">
          <div className="bg-black/40 p-4 rounded-lg">
            <div className="text-purple-400 font-medium">Optimal Meeting Times</div>
            <div className="text-gray-300 text-sm mt-1">Based on attorney availability and preferences</div>
          </div>
          <div className="bg-black/40 p-4 rounded-lg">
            <div className="text-blue-400 font-medium">Buffer Time Analysis</div>
            <div className="text-gray-300 text-sm mt-1">Automatically adds preparation time between meetings</div>
          </div>
          <div className="bg-black/40 p-4 rounded-lg">
            <div className="text-green-400 font-medium">Conflict Resolution</div>
            <div className="text-gray-300 text-sm mt-1">Smart rescheduling suggestions when conflicts arise</div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderClients = () => (
    <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-gray-700/30 rounded-3xl p-6 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Client Management Center</h2>
        <div className="flex items-center space-x-2">
          <span className="text-green-400 text-sm font-medium">{clients.length} Active Clients</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {clients.map((client) => (
          <div key={client.id} className="bg-black/30 border border-gray-700/40 rounded-xl p-4 hover:border-purple-500/30 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-medium">{client.name}</h3>
                  <p className="text-gray-400 text-sm">{client.type}</p>
                </div>
              </div>
              <div className={`w-3 h-3 rounded-full ${
                client.status === 'active' ? 'bg-green-400' : 
                client.status === 'urgent' ? 'bg-red-400' : 'bg-yellow-400'
              }`}></div>
            </div>
            <div className="text-sm text-gray-500 mb-2">Last Contact: {client.lastContact}</div>
            <div className="text-sm text-gray-500">Attorney: {client.attorney}</div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderCommunications = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-gray-700/30 rounded-3xl p-6 shadow-2xl">
        <h2 className="text-xl font-bold text-white mb-6">Communication Hub</h2>
        <div className="space-y-4">
          <div className="bg-black/30 p-4 rounded-lg">
            <div className="flex items-center space-x-3 mb-2">
              <Phone className="w-5 h-5 text-blue-400" />
              <span className="text-white font-medium">Phone Management</span>
            </div>
            <p className="text-gray-400 text-sm">Route calls, schedule callbacks, track communications</p>
          </div>
          <div className="bg-black/30 p-4 rounded-lg">
            <div className="flex items-center space-x-3 mb-2">
              <Mail className="w-5 h-5 text-green-400" />
              <span className="text-white font-medium">Email Coordination</span>
            </div>
            <p className="text-gray-400 text-sm">Template management, follow-up tracking, client updates</p>
          </div>
          <div className="bg-black/30 p-4 rounded-lg">
            <div className="flex items-center space-x-3 mb-2">
              <MessageSquare className="w-5 h-5 text-purple-400" />
              <span className="text-white font-medium">Internal Messaging</span>
            </div>
            <p className="text-gray-400 text-sm">Team coordination, urgent alerts, case updates</p>
          </div>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-blue-900/80 to-purple-900/80 backdrop-blur-xl border border-blue-500/30 rounded-3xl p-6 shadow-2xl">
        <h2 className="text-xl font-bold text-white mb-6">AI Communication Assistant</h2>
        <div className="space-y-4">
          <div className="bg-black/40 p-4 rounded-lg">
            <div className="text-blue-400 font-medium">Smart Response Suggestions</div>
            <div className="text-gray-300 text-sm mt-1">Context-aware email and message templates</div>
          </div>
          <div className="bg-black/40 p-4 rounded-lg">
            <div className="text-purple-400 font-medium">Priority Routing</div>
            <div className="text-gray-300 text-sm mt-1">AI determines urgency and routes accordingly</div>
          </div>
          <div className="bg-black/40 p-4 rounded-lg">
            <div className="text-green-400 font-medium">Follow-up Automation</div>
            <div className="text-gray-300 text-sm mt-1">Never miss important client communications</div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderDocuments = () => (
    <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-gray-700/30 rounded-3xl p-6 shadow-2xl">
      <h2 className="text-xl font-bold text-white mb-6">Document Control Center</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-black/30 p-4 rounded-lg text-center">
          <FileText className="w-8 h-8 text-blue-400 mx-auto mb-3" />
          <div className="text-white font-medium">Template Library</div>
          <div className="text-gray-400 text-sm mt-1">200+ legal templates</div>
        </div>
        <div className="bg-black/30 p-4 rounded-lg text-center">
          <Archive className="w-8 h-8 text-green-400 mx-auto mb-3" />
          <div className="text-white font-medium">Document Filing</div>
          <div className="text-gray-400 text-sm mt-1">Smart categorization</div>
        </div>
        <div className="bg-black/30 p-4 rounded-lg text-center">
          <FileCheck className="w-8 h-8 text-purple-400 mx-auto mb-3" />
          <div className="text-white font-medium">Review Queue</div>
          <div className="text-gray-400 text-sm mt-1">Pending approvals</div>
        </div>
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

  // Legal Assistant Tools
  const legalAssistantTools = [
    { id: 'cases', name: 'Cases', icon: Briefcase },
    { id: 'documents', name: 'Documents', icon: FileText },
    { id: 'calendar', name: 'Calendar', icon: Calendar },
    { id: 'billing', name: 'Billing', icon: Calculator },
    { id: 'contacts', name: 'Contacts', icon: Users },
    { id: 'research', name: 'Research', icon: Search },
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
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">🏢 Legal Assistant Admin Command</h1>
                <p className="text-gray-400">Welcome back, {userRole?.name} • {userRole?.department}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-green-400/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                AI Optimized
              </div>
              <div className="bg-purple-400/20 text-purple-400 px-3 py-1 rounded-full text-sm font-medium">
                {tasks.filter(t => t.completion > 50).length}/{tasks.length} Tasks On Track
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
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/20'
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
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'calendar' && renderCalendar()}
        {activeTab === 'clients' && renderClients()}
        {activeTab === 'communications' && renderCommunications()}
        {activeTab === 'documents' && renderDocuments()}
      </div>

      {/* Advanced Toolbar */}
      <div className="bg-gray-800/50 border-t border-gray-700/30 px-6 py-2 sticky bottom-0">
        <div className="flex items-center space-x-2 overflow-x-auto">
          {[
            { icon: <Calendar className="w-4 h-4" />, label: 'Schedule Meeting', action: 'schedule' },
            { icon: <Phone className="w-4 h-4" />, label: 'Quick Call', action: 'call' },
            { icon: <Mail className="w-4 h-4" />, label: 'Send Email', action: 'email' },
            { icon: <FileText className="w-4 h-4" />, label: 'New Document', action: 'document' },
            { icon: <Users className="w-4 h-4" />, label: 'Client Update', action: 'client' },
            { icon: <CheckCircle className="w-4 h-4" />, label: 'Complete Task', action: 'complete' },
            { icon: <Bell className="w-4 h-4" />, label: 'Set Reminder', action: 'reminder' },
            { icon: <Calculator className="w-4 h-4" />, label: 'Billing', action: 'billing' },
            { icon: <Archive className="w-4 h-4" />, label: 'File Document', action: 'file' },
            { icon: <Download className="w-4 h-4" />, label: 'Export Report', action: 'export' }
          ].map((tool) => (
            <button
              key={tool.action}
              onClick={() => console.log(`${tool.action} clicked`)}
              className="flex items-center space-x-2 px-3 py-1.5 bg-gray-700/50 hover:bg-purple-600/30 rounded-lg text-gray-300 hover:text-white transition-all duration-300 text-sm whitespace-nowrap"
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

export default LegalAssistantAdminCommand