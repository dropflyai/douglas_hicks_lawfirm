'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import AttorneyMessaging from '../../../components/AttorneyMessaging'
import { 
  Scale,
  ArrowLeft,
  Bell,
  Users,
  Calendar,
  FileText,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  Settings,
  LogOut,
  Phone,
  Mail,
  Star,
  TrendingUp,
  Shield,
  Crown,
  Eye,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Briefcase,
  Target,
  Award,
  MessageCircle,
  Download,
  Upload,
  Edit,
  Trash2
} from 'lucide-react'

export default function AttorneyDashboard() {
  const [selectedTab, setSelectedTab] = useState('dashboard')
  const [notifications, setNotifications] = useState(7)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Sample attorney data
  const attorneyData = {
    name: "Carl E. Douglas",
    title: "Founding Partner",
    activeCases: 23,
    totalClients: 156,
    thisMonthRevenue: "$485,000",
    successRate: "95%",
    nextCourtDate: "March 22, 2024"
  }

  const activeCases = [
    { 
      id: "DHL-2024-0156", 
      client: "Sarah Johnson", 
      type: "Personal Injury", 
      status: "Discovery", 
      value: "$2.8M", 
      nextAction: "Deposition - Mar 20",
      priority: "high",
      lastUpdate: "2 hours ago"
    },
    { 
      id: "DHL-2024-0142", 
      client: "Marcus Williams", 
      type: "Civil Rights", 
      status: "Negotiation", 
      value: "$1.2M", 
      nextAction: "Settlement Conference",
      priority: "medium",
      lastUpdate: "1 day ago"
    },
    { 
      id: "DHL-2024-0134", 
      client: "Jennifer Davis", 
      type: "Employment", 
      status: "Filing", 
      value: "$450K", 
      nextAction: "Motion Due - Mar 25",
      priority: "high",
      lastUpdate: "3 hours ago"
    },
    { 
      id: "DHL-2024-0128", 
      client: "Robert Chen", 
      type: "Product Liability", 
      status: "Investigation", 
      value: "$3.5M", 
      nextAction: "Expert Review",
      priority: "medium",
      lastUpdate: "2 days ago"
    }
  ]

  const todaysSchedule = [
    { time: "9:00 AM", event: "Client Meeting - Sarah Johnson", type: "meeting", location: "Conference Room A" },
    { time: "11:30 AM", event: "Deposition Review", type: "work", location: "Office" },
    { time: "2:00 PM", event: "Court Hearing - Williams Case", type: "court", location: "Superior Court" },
    { time: "4:00 PM", event: "Settlement Negotiation Call", type: "call", location: "Phone Conference" },
    { time: "5:30 PM", event: "Team Strategy Meeting", type: "meeting", location: "Conference Room B" }
  ]

  const recentDocuments = [
    { name: "Motion for Summary Judgment - Johnson", date: "Mar 15, 2024", type: "Motion", status: "Filed" },
    { name: "Expert Witness Report - Chen Case", date: "Mar 14, 2024", type: "Report", status: "Review" },
    { name: "Settlement Agreement Draft - Williams", date: "Mar 13, 2024", type: "Agreement", status: "Draft" },
    { name: "Discovery Response - Davis", date: "Mar 12, 2024", type: "Discovery", status: "Sent" }
  ]

  const clientMessages = [
    { client: "Sarah Johnson", message: "Question about upcoming deposition", time: "30 mins ago", unread: true },
    { client: "Marcus Williams", message: "Settlement offer response", time: "2 hours ago", unread: true },
    { client: "Jennifer Davis", message: "Thank you for the update", time: "1 day ago", unread: false },
    { client: "Robert Chen", message: "Additional documentation attached", time: "2 days ago", unread: false }
  ]

  const performanceMetrics = [
    { label: "Cases Won", value: "142", change: "+8", icon: Award, color: "green" },
    { label: "Total Revenue", value: "$12.4M", change: "+15%", icon: DollarSign, color: "blue" },
    { label: "Client Satisfaction", value: "98%", change: "+2%", icon: Star, color: "yellow" },
    { label: "Success Rate", value: "95%", change: "stable", icon: Target, color: "purple" }
  ]

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-900 text-red-200 border-red-700'
      case 'medium': return 'bg-yellow-900 text-yellow-200 border-yellow-700'
      case 'low': return 'bg-green-900 text-green-200 border-green-700'
      default: return 'bg-gray-700 text-gray-300 border-gray-600'
    }
  }

  const getEventIcon = (type) => {
    switch(type) {
      case 'meeting': return <Users className="w-4 h-4 text-blue-400" />
      case 'court': return <Scale className="w-4 h-4 text-red-400" />
      case 'call': return <Phone className="w-4 h-4 text-green-400" />
      default: return <Clock className="w-4 h-4 text-gray-400" />
    }
  }

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Scale },
    { id: 'cases', label: 'Active Cases', icon: Briefcase },
    { id: 'messages', label: 'Team Messages', icon: MessageCircle },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'clients', label: 'Clients', icon: Users },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'billing', label: 'Billing', icon: DollarSign }
  ]

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/images/scraped/logo-main.png"
                alt="Douglass Hicks Law"
                width={40}
                height={40}
                className="mr-3"
              />
              <span className="text-xl font-bold text-white">Attorney Portal</span>
            </Link>

            {/* Header Actions */}
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
                <Bell className="w-6 h-6" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-white font-semibold">{attorneyData.name}</p>
                  <p className="text-gray-400 text-sm">{attorneyData.title}</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-600 to-orange-600 rounded-full flex items-center justify-center">
                  <Crown className="w-6 h-6 text-white" />
                </div>
              </div>

              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <Settings className="w-6 h-6" />
              </button>
              
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <LogOut className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className={`mb-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <div className="bg-gradient-to-r from-yellow-900 to-orange-900 rounded-2xl p-8 border border-yellow-700/30">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-black text-white mb-2">Good morning, {attorneyData.name.split(' ')[0]}!</h1>
                <p className="text-yellow-200 text-lg">You have {activeCases.length} active cases and {clientMessages.filter(m => m.unread).length} new messages.</p>
              </div>
              <Crown className="w-16 h-16 text-yellow-400" />
            </div>
            
            <div className="grid md:grid-cols-4 gap-6 mt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{attorneyData.activeCases}</div>
                <div className="text-yellow-200 text-sm">Active Cases</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{attorneyData.thisMonthRevenue}</div>
                <div className="text-yellow-200 text-sm">This Month Revenue</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{attorneyData.successRate}</div>
                <div className="text-yellow-200 text-sm">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">{attorneyData.nextCourtDate}</div>
                <div className="text-yellow-200 text-sm">Next Court Date</div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-gray-800 rounded-lg p-1 mb-8 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex items-center px-6 py-3 rounded-md font-semibold transition-all whitespace-nowrap ${
                  selectedTab === tab.id
                    ? 'bg-gradient-to-r from-yellow-600 to-orange-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                <Icon className="w-5 h-5 mr-2" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {/* Dashboard Tab */}
          {selectedTab === 'dashboard' && (
            <>
              {/* Performance Metrics */}
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                {performanceMetrics.map((metric, index) => {
                  const Icon = metric.icon
                  return (
                    <div key={index} className="bg-gray-900 rounded-xl border border-gray-700 p-6">
                      <div className="flex items-center justify-between mb-4">
                        <Icon className={`w-8 h-8 ${
                          metric.color === 'green' ? 'text-green-400' :
                          metric.color === 'blue' ? 'text-blue-400' :
                          metric.color === 'yellow' ? 'text-yellow-400' :
                          'text-purple-400'
                        }`} />
                        <span className={`text-sm font-semibold ${
                          metric.change.includes('+') ? 'text-green-400' :
                          metric.change.includes('-') ? 'text-red-400' :
                          'text-gray-400'
                        }`}>
                          {metric.change}
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                      <div className="text-gray-400 text-sm">{metric.label}</div>
                    </div>
                  )
                })}
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Today's Schedule */}
                <div>
                  <div className="bg-gray-900 rounded-xl border border-gray-700 p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold text-white">Today&apos;s Schedule</h3>
                      <Calendar className="w-6 h-6 text-blue-400" />
                    </div>
                    <div className="space-y-4">
                      {todaysSchedule.map((item, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 bg-gray-800 rounded-lg">
                          <div className="flex-shrink-0 w-16 text-blue-400 font-semibold text-sm">
                            {item.time}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              {getEventIcon(item.type)}
                              <p className="text-white font-medium">{item.event}</p>
                            </div>
                            <p className="text-gray-400 text-sm">{item.location}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Active Cases Overview */}
                <div>
                  <div className="bg-gray-900 rounded-xl border border-gray-700 p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold text-white">Priority Cases</h3>
                      <Briefcase className="w-6 h-6 text-yellow-400" />
                    </div>
                    <div className="space-y-4">
                      {activeCases.filter(c => c.priority === 'high').map((caseItem, index) => (
                        <div key={index} className="p-4 bg-gray-800 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="text-white font-semibold">{caseItem.client}</h4>
                              <p className="text-gray-400 text-sm">{caseItem.id}</p>
                            </div>
                            <span className={`px-2 py-1 rounded text-xs font-semibold border ${getPriorityColor(caseItem.priority)}`}>
                              {caseItem.priority}
                            </span>
                          </div>
                          <p className="text-blue-400 text-sm mb-1">{caseItem.nextAction}</p>
                          <p className="text-green-400 font-semibold">{caseItem.value}</p>
                        </div>
                      ))}
                    </div>
                    <button className="w-full mt-4 py-3 bg-gradient-to-r from-yellow-600 to-orange-600 text-white font-semibold rounded-lg hover:scale-105 transition-all">
                      View All Cases
                    </button>
                  </div>
                </div>

                {/* Recent Messages */}
                <div>
                  <div className="bg-gray-900 rounded-xl border border-gray-700 p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold text-white">Client Messages</h3>
                      <MessageCircle className="w-6 h-6 text-green-400" />
                    </div>
                    <div className="space-y-4">
                      {clientMessages.map((message, index) => (
                        <div key={index} className={`p-4 rounded-lg ${message.unread ? 'bg-blue-900/30 border border-blue-700' : 'bg-gray-800'}`}>
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="text-white font-semibold">{message.client}</h4>
                            {message.unread && <div className="w-2 h-2 bg-blue-400 rounded-full"></div>}
                          </div>
                          <p className="text-gray-400 text-sm mb-2">{message.message}</p>
                          <p className="text-gray-500 text-xs">{message.time}</p>
                        </div>
                      ))}
                    </div>
                    <button className="w-full mt-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg hover:scale-105 transition-all">
                      View All Messages
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Messages Tab */}
          {selectedTab === 'messages' && (
            <div>
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Attorney Team Communication</h3>
                <p className="text-gray-400">Real-time messaging with SuperCode AI integration and voice/video calls</p>
              </div>
              <AttorneyMessaging attorneyData={attorneyData} />
            </div>
          )}

          {/* Cases Tab */}
          {selectedTab === 'cases' && (
            <div className="bg-gray-900 rounded-xl border border-gray-700 p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">Active Cases</h3>
                <div className="flex space-x-3">
                  <button className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
                    <Filter className="w-4 h-4 mr-2 inline" />
                    Filter
                  </button>
                  <button className="px-4 py-2 bg-gradient-to-r from-yellow-600 to-orange-600 text-white rounded-lg hover:scale-105 transition-all">
                    <Plus className="w-4 h-4 mr-2 inline" />
                    New Case
                  </button>
                </div>
              </div>
              
              <div className="space-y-4">
                {activeCases.map((caseItem, index) => (
                  <div key={index} className="p-6 bg-gray-800 rounded-lg">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-xl font-bold text-white">{caseItem.client}</h4>
                        <p className="text-gray-400">{caseItem.id} • {caseItem.type}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-green-400">{caseItem.value}</div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(caseItem.priority)}`}>
                          {caseItem.priority} priority
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-gray-400 text-sm">Status</p>
                        <p className="text-white font-semibold">{caseItem.status}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Next Action</p>
                        <p className="text-blue-400 font-semibold">{caseItem.nextAction}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Last Update</p>
                        <p className="text-white">{caseItem.lastUpdate}</p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-3">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        <Eye className="w-4 h-4 mr-2 inline" />
                        View Details
                      </button>
                      <button className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
                        <Edit className="w-4 h-4 mr-2 inline" />
                        Edit
                      </button>
                      <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                        <MessageCircle className="w-4 h-4 mr-2 inline" />
                        Message Client
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-12 grid md:grid-cols-4 gap-6">
          <button className="p-6 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl text-center hover:scale-105 transition-all">
            <Plus className="w-8 h-8 text-white mx-auto mb-3" />
            <h4 className="text-white font-bold mb-2">New Case</h4>
            <p className="text-blue-100 text-sm">Add a new client case</p>
          </button>
          
          <button className="p-6 bg-gradient-to-br from-green-600 to-green-700 rounded-xl text-center hover:scale-105 transition-all">
            <Calendar className="w-8 h-8 text-white mx-auto mb-3" />
            <h4 className="text-white font-bold mb-2">Schedule Event</h4>
            <p className="text-green-100 text-sm">Add to calendar</p>
          </button>
          
          <button className="p-6 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl text-center hover:scale-105 transition-all">
            <FileText className="w-8 h-8 text-white mx-auto mb-3" />
            <h4 className="text-white font-bold mb-2">Generate Document</h4>
            <p className="text-purple-100 text-sm">Create legal documents</p>
          </button>
          
          <button className="p-6 bg-gradient-to-br from-yellow-600 to-orange-600 rounded-xl text-center hover:scale-105 transition-all">
            <TrendingUp className="w-8 h-8 text-white mx-auto mb-3" />
            <h4 className="text-white font-bold mb-2">Analytics</h4>
            <p className="text-yellow-100 text-sm">View performance metrics</p>
          </button>
        </div>
      </div>
    </div>
  )
}