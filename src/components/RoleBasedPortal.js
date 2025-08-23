'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

// Role-specific dashboards
import AttorneyDashboard from './dashboards/AttorneyDashboard'
import CaseManagerDashboard from './dashboards/CaseManagerDashboard' 
import ParalegalDashboard from './dashboards/ParalegalDashboard'
import LegalAssistantDashboard from './dashboards/LegalAssistantDashboard'
import SecretaryDashboard from './dashboards/SecretaryDashboard'

// AI Assistant for all roles
import AIAssistant from './ai/AIAssistant'

const RoleBasedPortal = () => {
  const [userRole, setUserRole] = useState(null)
  const [loading, setLoading] = useState(true)
  const [aiActive, setAiActive] = useState(false)
  const router = useRouter()

  // Detect user role (in production this would come from authentication)
  useEffect(() => {
    const detectUserRole = async () => {
      // Simulate role detection - replace with actual auth
      const roles = [
        { id: 'attorney', title: 'Senior Partner', name: 'Douglas Hicks' },
        { id: 'case_manager', title: 'Case Manager', name: 'Sarah Johnson' },
        { id: 'paralegal', title: 'Senior Paralegal', name: 'Michael Chen' },
        { id: 'legal_assistant', title: 'Legal Assistant', name: 'Jennifer Davis' },
        { id: 'secretary', title: 'Executive Secretary', name: 'Maria Rodriguez' }
      ]
      
      // For demo, cycle through roles or detect from URL params
      const urlParams = new URLSearchParams(window.location.search)
      const roleParam = urlParams.get('role') || 'attorney'
      
      const selectedRole = roles.find(r => r.id === roleParam) || roles[0]
      setUserRole(selectedRole)
      setLoading(false)
    }

    detectUserRole()
  }, [])

  const renderRoleSpecificDashboard = () => {
    if (!userRole) return null

    const dashboardProps = {
      userRole,
      aiActive,
      setAiActive
    }

    switch (userRole.id) {
      case 'attorney':
        return <AttorneyDashboard {...dashboardProps} />
      case 'case_manager':
        return <CaseManagerDashboard {...dashboardProps} />
      case 'paralegal':
        return <ParalegalDashboard {...dashboardProps} />
      case 'legal_assistant':
        return <LegalAssistantDashboard {...dashboardProps} />
      case 'secretary':
        return <SecretaryDashboard {...dashboardProps} />
      default:
        return <AttorneyDashboard {...dashboardProps} />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Initializing AI-Powered Legal Portal...</p>
          <p className="text-gray-400 text-sm mt-2">Detecting user role and preferences</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* AI Voice Interface - Always Available */}
      <AIAssistant 
        active={aiActive}
        setActive={setAiActive}
        userRole={userRole}
      />

      {/* Role-Specific Dashboard */}
      {renderRoleSpecificDashboard()}

      {/* Floating AI Assistant Button */}
      <button
        onClick={() => setAiActive(!aiActive)}
        className={`fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-2xl transition-all duration-300 z-50 ${
          aiActive 
            ? 'bg-gradient-to-r from-purple-500 to-pink-500 scale-110 shadow-purple-500/50' 
            : 'bg-gradient-to-r from-purple-600 to-purple-700 hover:scale-105 shadow-purple-600/30'
        }`}
      >
        <div className="flex items-center justify-center">
          {aiActive ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <span className="text-2xl">🧠</span>
          )}
        </div>
      </button>

      {/* Role Switcher (Dev Mode) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-4 left-4 z-50">
          <select
            value={userRole?.id || ''}
            onChange={(e) => {
              const newUrl = new URL(window.location)
              newUrl.searchParams.set('role', e.target.value)
              window.location.href = newUrl.toString()
            }}
            className="bg-gray-800 text-white px-3 py-2 rounded-lg text-sm border border-gray-600"
          >
            <option value="attorney">Attorney</option>
            <option value="case_manager">Case Manager</option>
            <option value="paralegal">Paralegal</option>
            <option value="legal_assistant">Legal Assistant</option>
            <option value="secretary">Secretary</option>
          </select>
        </div>
      )}
    </div>
  )
}

export default RoleBasedPortal