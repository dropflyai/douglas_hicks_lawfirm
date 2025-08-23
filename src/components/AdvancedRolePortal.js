'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Brain, Mic, Volume2 } from 'lucide-react'

// Import advanced dashboards
import AttorneyCommandCenter from './dashboards/AttorneyCommandCenter'
import CaseManagerWorkflowHub from './dashboards/CaseManagerWorkflowHub'
import ParalegalResearchPowerhouse from './dashboards/ParalegalResearchPowerhouse'
import LegalAssistantAdminCommand from './dashboards/LegalAssistantAdminCommand'
import SecretaryCommunicationHub from './dashboards/SecretaryCommunicationHub'
import HROnboarding from '../components/HROnboarding'
import AdminControlCenter from './admin/AdminControlCenter'

// Import AI Assistant
import AIAssistant from './ai/AIAssistant'

const AdvancedRolePortal = () => {
  const [userRole, setUserRole] = useState(null)
  const [loading, setLoading] = useState(true)
  const [aiActive, setAiActive] = useState(false)
  const [voiceListening, setVoiceListening] = useState(false)
  const router = useRouter()

  // Enhanced role detection with URL params
  useEffect(() => {
    const detectUserRole = async () => {
      const roles = [
        { id: 'attorney', title: 'Senior Partner', name: 'Douglas Hicks', department: 'Litigation' },
        { id: 'case_manager', title: 'Senior Case Manager', name: 'Sarah Johnson', department: 'Operations' },
        { id: 'paralegal', title: 'Senior Paralegal', name: 'Michael Chen', department: 'Research' },
        { id: 'legal_assistant', title: 'Legal Assistant', name: 'Jennifer Davis', department: 'Administration' },
        { id: 'secretary', title: 'Executive Secretary', name: 'Maria Rodriguez', department: 'Communications' },
        { id: 'hr', title: 'HR Director', name: 'Sarah Mitchell', department: 'Human Resources' },
        { id: 'admin', title: 'System Administrator', name: 'John Smith', department: 'IT' }
      ]
      
      const urlParams = new URLSearchParams(window.location.search)
      const roleParam = urlParams.get('role') || 'attorney'
      
      const selectedRole = roles.find(r => r.id === roleParam) || roles[0]
      
      // Simulate authentication delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setUserRole(selectedRole)
      setLoading(false)
    }

    detectUserRole()
  }, [])

  // Voice activation
  const toggleVoiceListening = () => {
    setVoiceListening(!voiceListening)
    if (!voiceListening) {
      // Start voice recognition
      setAiActive(true)
    }
  }

  const renderRoleSpecificDashboard = () => {
    if (!userRole) return null

    const dashboardProps = {
      userRole,
      aiActive,
      setAiActive
    }

    switch (userRole.id) {
      case 'attorney':
        return <AttorneyCommandCenter {...dashboardProps} />
      case 'case_manager':
        return <CaseManagerWorkflowHub {...dashboardProps} />
      case 'paralegal':
        return <ParalegalResearchPowerhouse {...dashboardProps} />
      case 'legal_assistant':
        return <LegalAssistantAdminCommand {...dashboardProps} />
      case 'secretary':
        return <SecretaryCommunicationHub {...dashboardProps} />
      case 'hr':
        return <HROnboarding {...dashboardProps} />
      case 'admin':
        return <AdminControlCenter {...dashboardProps} />
      default:
        return <AttorneyCommandCenter {...dashboardProps} />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-white mb-3">🚀 Initializing AI-Powered Legal Portal</h2>
          <p className="text-gray-400 text-lg mb-4">Loading your personalized workspace...</p>
          
          <div className="max-w-md mx-auto space-y-2 text-left">
            <div className="flex items-center space-x-3 p-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-300">Detecting user role and permissions</span>
            </div>
            <div className="flex items-center space-x-3 p-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
              <span className="text-sm text-gray-300">Initializing LEX AI Assistant</span>
            </div>
            <div className="flex items-center space-x-3 p-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
              <span className="text-sm text-gray-300">Loading case intelligence and analytics</span>
            </div>
            <div className="flex items-center space-x-3 p-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" style={{animationDelay: '0.6s'}}></div>
              <span className="text-sm text-gray-300">Configuring workflow automations</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white relative">
      
      {/* AI Assistant Modal */}
      <AIAssistant 
        active={aiActive}
        setActive={setAiActive}
        userRole={userRole}
      />

      {/* Role-Specific Dashboard */}
      {renderRoleSpecificDashboard()}

      {/* Advanced AI Floating Controls */}
      <div className="fixed bottom-6 right-6 flex flex-col space-y-3 z-50">
        
        {/* Voice Activation Button */}
        <button
          onClick={toggleVoiceListening}
          className={`w-14 h-14 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center ${
            voiceListening 
              ? 'bg-gradient-to-r from-red-500 to-red-600 scale-110 shadow-red-500/50 animate-pulse' 
              : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:scale-105 shadow-blue-500/30'
          }`}
          title={voiceListening ? 'Stop Voice Command' : 'Start Voice Command (Say "Hey LEX")'}
        >
          {voiceListening ? (
            <Volume2 className="w-6 h-6 text-white" />
          ) : (
            <Mic className="w-6 h-6 text-white" />
          )}
        </button>

        {/* Main AI Assistant Button */}
        <button
          onClick={() => setAiActive(!aiActive)}
          className={`w-16 h-16 rounded-full shadow-2xl transition-all duration-300 relative overflow-hidden ${
            aiActive 
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 scale-110 shadow-purple-500/50' 
              : 'bg-gradient-to-r from-purple-600 to-purple-700 hover:scale-105 shadow-purple-600/30'
          }`}
          title="Open LEX AI Assistant"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 animate-pulse opacity-20"></div>
          <div className="flex items-center justify-center relative z-10">
            {aiActive ? (
              <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Brain className="w-8 h-8 text-white" />
            )}
          </div>
        </button>

        {/* Role Status Indicator */}
        <div className="bg-gray-900/95 backdrop-blur-sm border border-gray-700/50 rounded-2xl px-3 py-2 shadow-xl">
          <div className="text-xs font-medium text-white">{userRole?.name}</div>
          <div className="text-xs text-gray-400">{userRole?.title}</div>
          <div className="flex items-center space-x-1 mt-1">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-400">AI Active</span>
          </div>
        </div>
      </div>

      {/* Role Switcher & HR Demo Access */}
      <div className="fixed bottom-6 left-6 z-50">
        <div className="space-y-3">
          {/* Quick HR Portal Access */}
          <div className="bg-purple-900/95 backdrop-blur-sm border border-purple-500/50 rounded-xl p-3 shadow-xl">
            <label className="text-xs text-purple-300 block mb-2">🚀 Demo Access</label>
            <button
              onClick={() => window.open('/portal/hr', '_blank')}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 shadow-lg"
            >
              👥 Open HR Portal
            </button>
            <div className="mt-2 text-xs text-purple-300">
              Direct access to full HR dashboard
            </div>
          </div>

          {/* Role Switcher (Development Mode) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="bg-gray-900/95 backdrop-blur-sm border border-gray-700/50 rounded-xl p-3 shadow-xl">
              <label className="text-xs text-gray-400 block mb-2">Switch Role (Dev Mode)</label>
              <select
                value={userRole?.id || ''}
                onChange={(e) => {
                  if (e.target.value === 'hr') {
                    // Open HR portal in new tab for full experience
                    window.open('/portal/hr', '_blank')
                  } else {
                    const newUrl = new URL(window.location)
                    newUrl.searchParams.set('role', e.target.value)
                    window.location.href = newUrl.toString()
                  }
                }}
                className="bg-gray-800 text-white px-3 py-2 rounded-lg text-sm border border-gray-600 min-w-[180px]"
              >
                <option value="attorney">👨‍💼 Attorney</option>
                <option value="case_manager">📋 Case Manager</option>
                <option value="paralegal">📚 Paralegal</option>
                <option value="legal_assistant">🏢 Legal Assistant</option>
                <option value="secretary">📞 Secretary</option>
                <option value="hr">👥 HR Manager (Opens Portal)</option>
                <option value="admin">🔐 Admin</option>
              </select>
              <div className="mt-2 text-xs text-gray-500">
                Current: {userRole?.department}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Voice Command Status */}
      {voiceListening && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <div className="bg-gray-900/95 backdrop-blur-xl border border-blue-500/30 rounded-3xl p-8 shadow-2xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <Volume2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">🎤 Voice Command Active</h3>
              <p className="text-gray-400 mb-4">Say "Hey LEX" followed by your command</p>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-8 bg-blue-500 rounded-full animate-pulse"></div>
                <div className="w-2 h-12 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-6 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-10 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></div>
                <div className="w-2 h-8 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


export default AdvancedRolePortal