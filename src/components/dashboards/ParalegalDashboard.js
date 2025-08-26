'use client'

import { useState } from 'react'
import { 
  FileSearch, BookOpen, Scale, Calendar, Users, 
  Settings, Bell, Brain, Mic, MicOff, User,
  ArrowLeft, Search, Filter, Plus, CheckCircle,
  FileText, Clock, Target, Star
} from 'lucide-react'

const ParalegalDashboard = ({ userRole, aiActive, setAiActive }) => {
  const [aiVoiceActive, setAiVoiceActive] = useState(false)
  const [selectedTool, setSelectedTool] = useState('dashboard')

  const paralegalTools = [
    { id: 'research', name: 'Research', icon: FileSearch, color: 'blue' },
    { id: 'documents', name: 'Documents', icon: FileText, color: 'green' },
    { id: 'citations', name: 'Citations', icon: BookOpen, color: 'purple' },
    { id: 'evidence', name: 'Evidence', icon: Target, color: 'orange' },
    { id: 'tasks', name: 'Tasks', icon: CheckCircle, color: 'cyan' }
  ]

  const toggleVoiceAssistant = () => {
    setAiVoiceActive(!aiVoiceActive)
    setAiActive(true)
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      
      {/* Top Toolbar - Consistent Design */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-700">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            
            {/* Left: Firm Branding */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <Scale className="w-8 h-8 text-gold-400" />
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
                    Paralegal Command Center
                  </h1>
                  <p className="text-xs text-gray-400">Research & Document Support</p>
                </div>
              </div>
            </div>

            {/* Center: Quick Stats */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <FileSearch className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-gray-300">8 Research Tasks</span>
              </div>
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-green-400" />
                <span className="text-sm text-gray-300">5 Documents Draft</span>
              </div>
              <div className="flex items-center space-x-2">
                <Target className="w-4 h-4 text-orange-400" />
                <span className="text-sm text-gray-300">127 Evidence Files</span>
              </div>
            </div>

            {/* Right: User & Controls */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Bell className="w-5 h-5 text-gray-400 cursor-pointer hover:text-white" />
                <Settings className="w-5 h-5 text-gray-400 cursor-pointer hover:text-white" />
              </div>
              <div className="flex items-center space-x-3 pl-4 border-l border-gray-700">
                <div className="text-right">
                  <div className="text-sm font-medium text-white">{userRole?.name || 'Jennifer Davis'}</div>
                  <div className="text-xs text-gray-400">Senior Paralegal</div>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Paralegal Toolbar */}
        <div className="px-6 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {paralegalTools.map((tool) => {
                const Icon = tool.icon
                return (
                  <button
                    key={tool.id}
                    onClick={() => setSelectedTool(tool.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                      selectedTool === tool.id
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
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gray-900 p-6 rounded-3xl border border-gray-700">
            <h3 className="font-semibold mb-2">Research Tasks</h3>
            <div className="text-2xl font-bold text-blue-400">8</div>
          </div>
          <div className="bg-gray-900 p-6 rounded-3xl border border-gray-700">
            <h3 className="font-semibold mb-2">Documents Draft</h3>
            <div className="text-2xl font-bold text-yellow-400">5</div>
          </div>
          <div className="bg-gray-900 p-6 rounded-3xl border border-gray-700">
            <h3 className="font-semibold mb-2">Evidence Files</h3>
            <div className="text-2xl font-bold text-green-400">127</div>
          </div>
          <div className="bg-gray-900 p-6 rounded-3xl border border-gray-700">
            <h3 className="font-semibold mb-2">Citations Verified</h3>
            <div className="text-2xl font-bold text-purple-400">45</div>
          </div>
        </div>

        </div>
      </div>
    </div>
  )
}

export default ParalegalDashboard