'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Brain, Mic, Volume2 } from 'lucide-react'

// Import advanced dashboards
import AttorneyCommandCenterV3 from './dashboards/AttorneyCommandCenterV3'
import AttorneyCommandCenterV2 from './dashboards/AttorneyCommandCenterV2'
import CaseManagerWorkflowHub from './dashboards/CaseManagerWorkflowHub'
import ParalegalResearchPowerhouse from './dashboards/ParalegalResearchPowerhouse'
import LegalAssistantAdminCommand from './dashboards/LegalAssistantAdminCommand'
import SecretaryCommunicationHub from './dashboards/SecretaryCommunicationHub'
import HROnboarding from '../components/HROnboarding'
import AdminControlCenter from './admin/AdminControlCenter'

// Import AI Assistant
import AIAssistant from './ai/AIAssistant'
import FloatingRoleSwitcher from './ui/FloatingRoleSwitcher'

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
        { id: 'attorney', title: 'Senior Partner', name: 'Carl Douglass', department: 'Litigation' },
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
        return <AttorneyCommandCenterV3 {...dashboardProps} />
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
        return <AttorneyCommandCenterV2 {...dashboardProps} />
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
              <span className="text-sm text-gray-300">Initializing Maya AI Assistant</span>
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
      
      {/* Role-Specific Dashboard */}
      {renderRoleSpecificDashboard()}

      {/* Floating Role Switcher */}
      <FloatingRoleSwitcher userRole={userRole} />

      {/* Voice Command Status */}
      {voiceListening && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <div className="bg-gray-900/95 backdrop-blur-xl border border-blue-500/30 rounded-3xl p-8 shadow-2xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <Volume2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">🎤 Voice Command Active</h3>
              <p className="text-gray-400 mb-4">Say "Hey Maya" followed by your command</p>
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