'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Scale,
  ArrowLeft,
  Bell,
  Download,
  MessageCircle,
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
  Upload,
  Search,
  Filter,
  MoreVertical
} from 'lucide-react'

export default function ClientDashboard() {
  const [selectedTab, setSelectedTab] = useState('overview')
  const [notifications, setNotifications] = useState(3)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Sample client data
  const clientData = {
    name: "Sarah Johnson",
    caseNumber: "DHL-2025-0156",
    attorney: "Carl E. Douglas",
    caseType: "Personal Injury",
    status: "Active Discovery",
    nextHearing: "March 25, 2025",
    caseValue: "$2.8M",
    lastUpdate: "2 hours ago"
  }

  const caseDocuments = [
    { name: "Initial Complaint Filing", date: "Jan 15, 2025", type: "PDF", size: "2.4 MB", status: "Final" },
    { name: "Medical Records Summary", date: "Feb 8, 2025", type: "PDF", size: "8.7 MB", status: "Updated" },
    { name: "Witness Statements", date: "Feb 20, 2025", type: "PDF", size: "1.2 MB", status: "New" },
    { name: "Expert Analysis Report", date: "Mar 5, 2025", type: "PDF", size: "5.1 MB", status: "Draft" },
    { name: "Settlement Proposal", date: "Mar 12, 2025", type: "PDF", size: "892 KB", status: "Confidential" }
  ]

  const recentActivity = [
    { type: "update", message: "Expert witness deposition scheduled for March 20th", time: "2 hours ago", priority: "high" },
    { type: "document", message: "New medical records added to case file", time: "1 day ago", priority: "medium" },
    { type: "payment", message: "Invoice #DHL-156-03 payment received", time: "3 days ago", priority: "low" },
    { type: "meeting", message: "Strategy meeting completed with legal team", time: "5 days ago", priority: "medium" },
    { type: "filing", message: "Motion for summary judgment filed", time: "1 week ago", priority: "high" }
  ]

  const upcomingEvents = [
    { title: "Expert Witness Deposition", date: "Mar 20, 2025", time: "10:00 AM", location: "Downtown Office" },
    { title: "Settlement Conference", date: "Mar 25, 2025", time: "2:00 PM", location: "Superior Court" },
    { title: "Client Check-in Call", date: "Apr 1, 2025", time: "3:00 PM", location: "Phone Conference" }
  ]

  const billingInfo = [
    { description: "Legal Research & Case Preparation", hours: "24.5", rate: "$650", amount: "$15,925" },
    { description: "Court Appearances & Hearings", hours: "8.0", rate: "$750", amount: "$6,000" },
    { description: "Document Review & Analysis", hours: "12.0", rate: "$450", amount: "$5,400" },
    { description: "Expert Witness Coordination", hours: "6.5", rate: "$550", amount: "$3,575" }
  ]

  const getActivityIcon = (type) => {
    switch(type) {
      case 'update': return <AlertCircle className="w-5 h-5 text-blue-400" />
      case 'document': return <FileText className="w-5 h-5 text-green-400" />
      case 'payment': return <DollarSign className="w-5 h-5 text-yellow-400" />
      case 'meeting': return <Calendar className="w-5 h-5 text-purple-400" />
      case 'filing': return <Scale className="w-5 h-5 text-red-400" />
      default: return <Bell className="w-5 h-5 text-gray-400" />
    }
  }

  const tabs = [
    { id: 'overview', label: 'Case Overview', icon: Scale },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'billing', label: 'Billing', icon: DollarSign },
    { id: 'messages', label: 'Messages', icon: MessageCircle }
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
              <span className="text-xl font-bold text-white">Client Portal</span>
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
                  <p className="text-white font-semibold">{clientData.name}</p>
                  <p className="text-gray-400 text-sm">{clientData.caseNumber}</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
              </div>

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
          <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-2xl p-8 border border-blue-700/30">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-black text-white mb-2">Welcome back, {clientData.name.split(' ')[0]}!</h1>
                <p className="text-blue-200 text-lg">Your case is progressing well. Here&apos;s your latest update.</p>
              </div>
              <Crown className="w-16 h-16 text-yellow-400" />
            </div>
            
            <div className="grid md:grid-cols-4 gap-6 mt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{clientData.status}</div>
                <div className="text-blue-200 text-sm">Current Status</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{clientData.caseValue}</div>
                <div className="text-blue-200 text-sm">Estimated Value</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">{clientData.nextHearing}</div>
                <div className="text-blue-200 text-sm">Next Hearing</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">{clientData.attorney}</div>
                <div className="text-blue-200 text-sm">Lead Attorney</div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-gray-800 rounded-lg p-1 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex items-center px-6 py-3 rounded-md font-semibold transition-all ${
                  selectedTab === tab.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
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
          {/* Overview Tab */}
          {selectedTab === 'overview' && (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Recent Activity */}
              <div className="lg:col-span-2">
                <div className="bg-gray-900 rounded-xl border border-gray-700 p-6">
                  <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-start space-x-4 p-4 bg-gray-800 rounded-lg">
                        <div className="flex-shrink-0">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1">
                          <p className="text-white">{activity.message}</p>
                          <p className="text-gray-400 text-sm mt-1">{activity.time}</p>
                        </div>
                        <div className={`px-2 py-1 rounded text-xs font-semibold ${
                          activity.priority === 'high' ? 'bg-red-900 text-red-200' :
                          activity.priority === 'medium' ? 'bg-yellow-900 text-yellow-200' :
                          'bg-gray-700 text-gray-300'
                        }`}>
                          {activity.priority}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Upcoming Events */}
              <div>
                <div className="bg-gray-900 rounded-xl border border-gray-700 p-6">
                  <h3 className="text-xl font-bold text-white mb-6">Upcoming Events</h3>
                  <div className="space-y-4">
                    {upcomingEvents.map((event, index) => (
                      <div key={index} className="p-4 bg-gray-800 rounded-lg">
                        <h4 className="text-white font-semibold">{event.title}</h4>
                        <p className="text-blue-400 text-sm">{event.date} at {event.time}</p>
                        <p className="text-gray-400 text-sm">{event.location}</p>
                      </div>
                    ))}
                  </div>
                  
                  <button className="w-full mt-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:scale-105 transition-all">
                    View Full Calendar
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Documents Tab */}
          {selectedTab === 'documents' && (
            <div className="bg-gray-900 rounded-xl border border-gray-700 p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">Case Documents</h3>
                <div className="flex space-x-3">
                  <button className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
                    <Filter className="w-4 h-4 mr-2 inline" />
                    Filter
                  </button>
                  <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:scale-105 transition-all">
                    <Upload className="w-4 h-4 mr-2 inline" />
                    Upload
                  </button>
                </div>
              </div>
              
              <div className="space-y-3">
                {caseDocuments.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg hover:bg-gray-750 transition-colors">
                    <div className="flex items-center space-x-4">
                      <FileText className="w-8 h-8 text-blue-400" />
                      <div>
                        <h4 className="text-white font-semibold">{doc.name}</h4>
                        <p className="text-gray-400 text-sm">{doc.date} • {doc.type} • {doc.size}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        doc.status === 'New' ? 'bg-green-900 text-green-200' :
                        doc.status === 'Updated' ? 'bg-blue-900 text-blue-200' :
                        doc.status === 'Draft' ? 'bg-yellow-900 text-yellow-200' :
                        doc.status === 'Confidential' ? 'bg-red-900 text-red-200' :
                        'bg-gray-700 text-gray-300'
                      }`}>
                        {doc.status}
                      </span>
                      <button className="p-2 text-gray-400 hover:text-white transition-colors">
                        <Download className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-white transition-colors">
                        <Eye className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Billing Tab */}
          {selectedTab === 'billing' && (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-gray-900 rounded-xl border border-gray-700 p-6">
                  <h3 className="text-xl font-bold text-white mb-6">Current Invoice</h3>
                  <div className="space-y-4">
                    {billingInfo.map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-4 bg-gray-800 rounded-lg">
                        <div>
                          <p className="text-white font-semibold">{item.description}</p>
                          <p className="text-gray-400 text-sm">{item.hours} hours @ {item.rate}/hour</p>
                        </div>
                        <div className="text-green-400 font-bold text-lg">{item.amount}</div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-gray-700 mt-6 pt-6">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-white">Total Amount Due:</span>
                      <span className="text-2xl font-black text-green-400">$30,900</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="bg-gray-900 rounded-xl border border-gray-700 p-6">
                  <h3 className="text-xl font-bold text-white mb-6">Payment Options</h3>
                  <div className="space-y-4">
                    <button className="w-full p-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg hover:scale-105 transition-all">
                      Pay Online
                    </button>
                    <button className="w-full p-4 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors">
                      Request Payment Plan
                    </button>
                    <button className="w-full p-4 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors">
                      Download Invoice
                    </button>
                  </div>
                  
                  <div className="mt-6 p-4 bg-blue-900/30 border border-blue-700 rounded-lg">
                    <p className="text-blue-200 text-sm">
                      <Shield className="w-4 h-4 inline mr-1" />
                      All payments are processed securely with bank-level encryption.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-12 grid md:grid-cols-4 gap-6">
          <Link href="/intake" className="p-6 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl text-center hover:scale-105 transition-all">
            <MessageCircle className="w-8 h-8 text-white mx-auto mb-3" />
            <h4 className="text-white font-bold mb-2">Message Attorney</h4>
            <p className="text-blue-100 text-sm">Send secure messages to your legal team</p>
          </Link>
          
          <Link href="/#contact" className="p-6 bg-gradient-to-br from-green-600 to-green-700 rounded-xl text-center hover:scale-105 transition-all">
            <Phone className="w-8 h-8 text-white mx-auto mb-3" />
            <h4 className="text-white font-bold mb-2">Schedule Call</h4>
            <p className="text-green-100 text-sm">Book a consultation with your attorney</p>
          </Link>
          
          <Link href="/resources" className="p-6 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl text-center hover:scale-105 transition-all">
            <FileText className="w-8 h-8 text-white mx-auto mb-3" />
            <h4 className="text-white font-bold mb-2">Legal Resources</h4>
            <p className="text-purple-100 text-sm">Access guides and legal information</p>
          </Link>
          
          <Link href="/results" className="p-6 bg-gradient-to-br from-yellow-600 to-orange-600 rounded-xl text-center hover:scale-105 transition-all">
            <TrendingUp className="w-8 h-8 text-white mx-auto mb-3" />
            <h4 className="text-white font-bold mb-2">Case Results</h4>
            <p className="text-yellow-100 text-sm">View our victory track record</p>
          </Link>
        </div>
      </div>
    </div>
  )
}