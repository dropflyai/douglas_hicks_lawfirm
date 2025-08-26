'use client'

import { useState, useRef, useEffect } from 'react'
import {
  Globe, ArrowLeft, ArrowRight, RefreshCw, Home, Star,
  Plus, X, Search, Download, Upload, Lock, Unlock,
  FileText, Folder, ChevronRight, Calendar, User,
  Tag, Clock, Shield, AlertCircle, CheckCircle,
  Briefcase, Scale, Edit, Trash2, Share2, Copy,
  Eye, EyeOff, MessageSquare, Mic, Brain,
  ExternalLink, Bookmark, History, Settings,
  ZoomIn, ZoomOut, Maximize2, Minimize2, Grid3x3,
  ChevronLeft, MoreVertical, Filter, SortAsc, TrendingUp,
  BookOpen, Target, Calculator, BarChart3, PlayCircle,
  Phone, Mail, MessageCircle, Gavel, Video, FileSearch,
  AlertTriangle
} from 'lucide-react'

const WorkspaceBrowser = ({ workspace, selectedCase, onBack, onForward, onNavigate, canGoBack, canGoForward, setAiActive, setAiVoiceActive }) => {
  
  const [tabs, setTabs] = useState([
    { id: 1, title: 'New Tab', url: '', content: null, type: 'blank' }
  ])
  const [activeTab, setActiveTab] = useState(1)
  const [urlInput, setUrlInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [bookmarks, setBookmarks] = useState([
    { id: 1, title: 'Westlaw', url: 'https://www.westlaw.com', icon: '⚖️' },
    { id: 2, title: 'LexisNexis', url: 'https://www.lexisnexis.com', icon: '📚' },
    { id: 3, title: 'PACER', url: 'https://pacer.uscourts.gov', icon: '🏛️' },
    { id: 4, title: 'Google Scholar', url: 'https://scholar.google.com', icon: '🎓' },
  ])
  const [selectedDocument, setSelectedDocument] = useState(null)
  const [viewMode, setViewMode] = useState('split') // split, web, document
  const iframeRef = useRef(null)

  // Generate case-specific documents based on selectedCase
  const getCaseDocuments = (caseData) => {
    if (!caseData) return []

    const caseId = caseData.id
    const caseName = caseData.name
    const caseType = caseData.type
    const clientName = caseData.client

    switch (caseId) {
      case 1: // Johnson v. Metro Insurance
        return [
          {
            id: 1,
            name: 'Settlement Agreement Draft v3.docx',
            type: 'contract',
            size: '245 KB',
            modified: '2 hours ago',
            author: 'Carl Douglass',
            status: 'in-review',
            privileged: true,
            tags: ['settlement', 'negotiation', 'draft'],
            content: 'Johnson v. Metro Insurance Settlement Agreement'
          },
          {
            id: 2,
            name: 'Medical Records - Johnson.pdf',
            type: 'evidence',
            size: '12.3 MB',
            modified: '1 day ago',
            author: 'Sarah Johnson',
            status: 'approved',
            privileged: false,
            tags: ['medical', 'evidence', 'injury'],
            content: 'Medical records for Sarah Johnson personal injury case'
          },
          {
            id: 3,
            name: 'Insurance Claim - Metro Policy.pdf',
            type: 'evidence',
            size: '890 KB',
            modified: '3 days ago',
            author: 'Michael Chen',
            status: 'final',
            privileged: false,
            tags: ['insurance', 'policy', 'claim'],
            content: 'Metro Insurance policy details and coverage limits'
          },
          {
            id: 4,
            name: 'Deposition Transcript - Dr. Martinez.pdf',
            type: 'deposition',
            size: '1.8 MB',
            modified: '5 days ago',
            author: 'Jennifer Davis',
            status: 'final',
            privileged: true,
            tags: ['deposition', 'medical-expert', 'witness'],
            content: 'Expert medical testimony regarding injuries and treatment'
          },
          {
            id: 5,
            name: 'Personal Injury Case Strategy.docx',
            type: 'internal',
            size: '156 KB',
            modified: '1 week ago',
            author: 'Carl Douglass',
            status: 'confidential',
            privileged: true,
            tags: ['strategy', 'internal', 'work-product'],
            content: 'Strategic approach for maximizing settlement value'
          }
        ]

      case 2: // State v. Rodriguez
        return [
          {
            id: 1,
            name: 'Motion to Suppress Evidence.docx',
            type: 'motion',
            size: '89 KB',
            modified: '1 hour ago',
            author: 'Carl Douglass',
            status: 'draft',
            privileged: true,
            tags: ['motion', 'evidence', 'suppression'],
            content: 'Motion to suppress illegally obtained evidence in State v. Rodriguez'
          },
          {
            id: 2,
            name: 'Police Report - Arrest.pdf',
            type: 'evidence',
            size: '2.1 MB',
            modified: '2 weeks ago',
            author: 'Court Clerk',
            status: 'discovery',
            privileged: false,
            tags: ['police', 'arrest', 'evidence'],
            content: 'Official police report detailing arrest circumstances'
          },
          {
            id: 3,
            name: 'Witness Statements Collection.pdf',
            type: 'evidence',
            size: '456 KB',
            modified: '1 week ago',
            author: 'Jennifer Davis',
            status: 'compiled',
            privileged: true,
            tags: ['witnesses', 'statements', 'defense'],
            content: 'Collected witness statements supporting defense position'
          },
          {
            id: 4,
            name: 'Criminal Defense Strategy.docx',
            type: 'internal',
            size: '134 KB',
            modified: '3 days ago',
            author: 'Carl Douglass',
            status: 'confidential',
            privileged: true,
            tags: ['strategy', 'criminal', 'defense'],
            content: 'Comprehensive defense strategy for Rodriguez case'
          },
          {
            id: 5,
            name: 'Expert Witness - Forensics.pdf',
            type: 'expert',
            size: '678 KB',
            modified: '4 days ago',
            author: 'Michael Chen',
            status: 'retained',
            privileged: true,
            tags: ['expert', 'forensics', 'testimony'],
            content: 'Forensic expert analysis challenging prosecution evidence'
          }
        ]

      case 3: // Williams Estate Planning
        return [
          {
            id: 1,
            name: 'Last Will and Testament - Draft.docx',
            type: 'will',
            size: '67 KB',
            modified: '3 hours ago',
            author: 'Jamon Hicks',
            status: 'draft',
            privileged: true,
            tags: ['will', 'estate', 'draft'],
            content: 'Comprehensive will for Robert Williams estate planning'
          },
          {
            id: 2,
            name: 'Living Trust Agreement.pdf',
            type: 'trust',
            size: '234 KB',
            modified: '1 day ago',
            author: 'Maria Rodriguez',
            status: 'review',
            privileged: true,
            tags: ['trust', 'living', 'assets'],
            content: 'Revocable living trust to minimize estate taxes'
          },
          {
            id: 3,
            name: 'Asset Inventory Spreadsheet.xlsx',
            type: 'inventory',
            size: '45 KB',
            modified: '2 days ago',
            author: 'Robert Williams',
            status: 'client-provided',
            privileged: false,
            tags: ['assets', 'inventory', 'valuation'],
            content: 'Complete inventory of assets including real estate and investments'
          },
          {
            id: 4,
            name: 'Power of Attorney - Financial.pdf',
            type: 'poa',
            size: '123 KB',
            modified: '1 week ago',
            author: 'Jamon Hicks',
            status: 'executed',
            privileged: true,
            tags: ['power-of-attorney', 'financial', 'healthcare'],
            content: 'Durable power of attorney for financial and healthcare decisions'
          },
          {
            id: 5,
            name: 'Estate Tax Planning Memo.docx',
            type: 'internal',
            size: '178 KB',
            modified: '5 days ago',
            author: 'Maria Rodriguez',
            status: 'analysis',
            privileged: true,
            tags: ['tax', 'planning', 'estate'],
            content: 'Tax minimization strategies for the Williams estate'
          }
        ]

      default:
        return [
          {
            id: 1,
            name: 'Case Overview Document.docx',
            type: 'overview',
            size: '123 KB',
            modified: '1 day ago',
            author: 'Legal Team',
            status: 'draft',
            privileged: true,
            tags: ['overview', 'case', 'summary'],
            content: `Overview document for ${caseName}`
          }
        ]
    }
  }

  const caseDocuments = getCaseDocuments(selectedCase)

  // Handle navigation
  const handleNavigate = (url) => {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url
    }
    
    setIsLoading(true)
    const currentTab = tabs.find(t => t.id === activeTab)
    
    // Update tab with new URL
    setTabs(tabs.map(tab => 
      tab.id === activeTab 
        ? { ...tab, url, title: url.split('/')[2] || url, type: 'web' }
        : tab
    ))
    
    setUrlInput(url)
    
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000)
  }

  // Add new tab
  const addNewTab = () => {
    const newTab = {
      id: Date.now(),
      title: 'New Tab',
      url: '',
      content: null,
      type: 'blank'
    }
    setTabs([...tabs, newTab])
    setActiveTab(newTab.id)
    setUrlInput('')
  }

  // Close tab
  const closeTab = (tabId) => {
    if (tabs.length > 1) {
      const newTabs = tabs.filter(t => t.id !== tabId)
      setTabs(newTabs)
      if (activeTab === tabId) {
        setActiveTab(newTabs[0].id)
      }
    }
  }

  // Open document
  const openDocument = (doc) => {
    setSelectedDocument(doc)
    const newTab = {
      id: Date.now(),
      title: doc.name,
      url: '',
      content: doc,
      type: 'document'
    }
    setTabs([...tabs, newTab])
    setActiveTab(newTab.id)
  }

  // Get current tab
  const currentTab = tabs.find(t => t.id === activeTab) || tabs[0]

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-950 via-black to-gray-950">
      
      {/* Enhanced Browser Header */}
      <div className="bg-gradient-to-r from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-xl border-b border-gray-700/50 shadow-2xl">
        
        {/* Modern Tab Bar */}
        <div className="flex items-center bg-gray-950/80 backdrop-blur-sm px-3 pt-3">
          <div className="flex items-center flex-1 space-x-2 overflow-x-auto">
            {tabs.map(tab => (
              <div
                key={tab.id}
                className={`flex items-center min-w-[220px] max-w-[260px] px-4 py-3 rounded-t-xl cursor-pointer group transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-b from-gray-800 to-gray-900 text-white shadow-lg border-t-2 border-blue-500'
                    : 'bg-gray-800/60 text-gray-400 hover:bg-gray-800/80 hover:text-gray-200'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.type === 'document' ? (
                  <FileText className="w-4 h-4 mr-3 flex-shrink-0 text-blue-400" />
                ) : tab.type === 'case' ? (
                  <Briefcase className="w-4 h-4 mr-3 flex-shrink-0 text-orange-400" />
                ) : (
                  <Globe className="w-4 h-4 mr-3 flex-shrink-0 text-purple-400" />
                )}
                <span className="flex-1 truncate text-sm font-medium">{tab.title}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    closeTab(tab.id)
                  }}
                  className="ml-2 p-1.5 rounded-lg hover:bg-gray-700/80 opacity-0 group-hover:opacity-100 transition-all duration-200"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
            <button
              onClick={addNewTab}
              className="p-3 hover:bg-gray-800/60 rounded-xl transition-all duration-200 hover:scale-105"
            >
              <Plus className="w-4 h-4 text-gray-400 hover:text-white" />
            </button>
          </div>
        </div>

        {/* Enhanced Navigation Bar */}
        <div className="flex items-center space-x-4 px-6 py-4 bg-gray-900/60 backdrop-blur-sm">
          
          {/* Dashboard Button */}
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-600/30 hover:to-purple-600/30 rounded-xl text-gray-300 hover:text-white transition-all duration-200 border border-blue-500/20 shadow-lg"
            title="Back to Dashboard"
          >
            <Home className="w-4 h-4" />
            <span className="text-sm font-medium">Dashboard</span>
          </button>

          {/* Modern Browser Controls */}
          <div className="flex items-center space-x-2 bg-gray-800/60 backdrop-blur-sm rounded-xl p-1">
            <button 
              onClick={onBack}
              disabled={!canGoBack}
              className={`p-2.5 rounded-lg transition-all duration-200 ${
                canGoBack 
                  ? 'hover:bg-gray-700/80 text-gray-400 hover:text-white cursor-pointer' 
                  : 'text-gray-600 cursor-not-allowed'
              }`}
              title="Go Back"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={onForward}
              disabled={!canGoForward}
              className={`p-2.5 rounded-lg transition-all duration-200 ${
                canGoForward 
                  ? 'hover:bg-gray-700/80 text-gray-400 hover:text-white cursor-pointer' 
                  : 'text-gray-600 cursor-not-allowed'
              }`}
              title="Go Forward"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="p-2.5 hover:bg-gray-700/80 rounded-lg text-gray-400 hover:text-white transition-all duration-200">
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-blue-400' : ''}`} />
            </button>
            <button 
              onClick={() => onNavigate('dashboard')}
              className="p-2.5 hover:bg-gray-700/80 rounded-lg text-gray-400 hover:text-white transition-all duration-200"
              title="Dashboard Home"
            >
              <Home className="w-4 h-4" />
            </button>
          </div>

          {/* Sleek URL Bar */}
          <div className="flex-1 flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-gray-800/80 to-gray-700/80 backdrop-blur-sm rounded-xl border border-gray-600/30 shadow-lg">
            {currentTab.type === 'document' ? (
              <>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <FileText className="w-5 h-5 text-green-400" />
                <span className="text-sm font-medium text-gray-200">Document: {currentTab.title}</span>
              </>
            ) : currentTab.type === 'case' ? (
              <>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <Briefcase className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-medium text-gray-200">Case: {currentTab.title}</span>
              </>
            ) : (
              <>
                <Globe className="w-5 h-5 text-purple-400" />
                <input
                  type="text"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleNavigate(urlInput)}
                  placeholder="Enter URL or search legal databases..."
                  className="flex-1 bg-transparent text-white placeholder-gray-500 focus:outline-none text-sm font-medium"
                />
                <Search className="w-5 h-5 text-gray-400 hover:text-purple-400 cursor-pointer transition-colors" />
              </>
            )}
          </div>

          {/* Stylish View Mode Toggle */}
          <div className="flex items-center space-x-1 bg-gray-800/60 backdrop-blur-sm rounded-xl p-1 border border-gray-600/20">
            <button
              onClick={() => setViewMode('web')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                viewMode === 'web' 
                  ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
              }`}
            >
              Web
            </button>
            <button
              onClick={() => setViewMode('split')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                viewMode === 'split' 
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
              }`}
            >
              Split
            </button>
            <button
              onClick={() => setViewMode('document')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                viewMode === 'document' 
                  ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
              }`}
            >
              Docs
            </button>
          </div>

          {/* Enhanced Tool Buttons */}
          <div className="flex items-center space-x-2 bg-gray-800/40 backdrop-blur-sm rounded-xl p-1">
            <button className="p-2.5 hover:bg-gray-700/80 rounded-lg text-gray-400 hover:text-yellow-400 transition-all duration-200" title="Bookmark">
              <Bookmark className="w-4 h-4" />
            </button>
            <button className="p-2.5 hover:bg-gray-700/80 rounded-lg text-gray-400 hover:text-green-400 transition-all duration-200" title="Download">
              <Download className="w-4 h-4" />
            </button>
            <button className="p-2.5 hover:bg-gray-700/80 rounded-lg text-gray-400 hover:text-blue-400 transition-all duration-200" title="Share">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Sidebar - Case Files */}
        {(viewMode === 'split' || viewMode === 'document') && (
          <div className="w-80 bg-gray-900 border-r border-gray-800 flex flex-col">
            
            {/* Case Header */}
            {selectedCase && (
              <div className="p-4 border-b border-gray-800">
                <div className="flex items-center space-x-3 mb-3">
                  <Briefcase className="w-5 h-5 text-blue-400" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-white text-sm">{selectedCase.name}</h3>
                    <p className="text-xs text-gray-400">{selectedCase.type} • {selectedCase.client}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-xs">
                  <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded">
                    {selectedCase.documents} Documents
                  </span>
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded">
                    {selectedCase.status}
                  </span>
                </div>
              </div>
            )}

            {/* Search and Filter */}
            <div className="p-4 border-b border-gray-800">
              <div className="flex items-center space-x-2 px-3 py-2 bg-gray-800 rounded-lg mb-3">
                <Search className="w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search documents..."
                  className="flex-1 bg-transparent text-white placeholder-gray-500 focus:outline-none text-sm"
                />
              </div>
              <div className="flex items-center space-x-2">
                <button className="flex items-center space-x-1 px-3 py-1 bg-gray-800 rounded text-xs text-gray-400 hover:text-white">
                  <Filter className="w-3 h-3" />
                  <span>Filter</span>
                </button>
                <button className="flex items-center space-x-1 px-3 py-1 bg-gray-800 rounded text-xs text-gray-400 hover:text-white">
                  <SortAsc className="w-3 h-3" />
                  <span>Sort</span>
                </button>
              </div>
            </div>

            {/* Document List */}
            <div className="flex-1 overflow-auto p-4">
              <div className="space-y-2">
                {caseDocuments.map(doc => (
                  <div
                    key={doc.id}
                    onClick={() => openDocument(doc)}
                    className="p-3 bg-gray-800/50 hover:bg-gray-800 rounded-lg cursor-pointer transition-all group"
                  >
                    <div className="flex items-start space-x-3">
                      <FileText className="w-5 h-5 text-blue-400 mt-1" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="text-sm font-medium text-white truncate">
                            {doc.name}
                          </h4>
                          {doc.privileged && (
                            <Shield className="w-3 h-3 text-red-400" title="Attorney-Client Privilege" />
                          )}
                        </div>
                        <div className="flex items-center space-x-3 text-xs text-gray-400">
                          <span>{doc.size}</span>
                          <span>•</span>
                          <span>{doc.modified}</span>
                          <span>•</span>
                          <span>{doc.author}</span>
                        </div>
                        <div className="flex items-center space-x-2 mt-2">
                          {doc.tags.map(tag => (
                            <span key={tag} className="px-2 py-1 bg-gray-700 rounded text-xs text-gray-300">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1 hover:bg-gray-700 rounded">
                          <MoreVertical className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="p-4 border-t border-gray-800">
              <div className="grid grid-cols-2 gap-2">
                <button className="px-3 py-2 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 text-xs font-medium">
                  Upload Document
                </button>
                <button className="px-3 py-2 bg-green-600/20 text-green-400 rounded-lg hover:bg-green-600/30 text-xs font-medium">
                  Create New
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Viewing Area */}
        <div className="flex-1 bg-gray-950 relative">
          {/* Show different content based on workspace type */}
          {workspace === 'calendar' ? (
            // Calendar View
            <div className="p-6 h-full overflow-y-auto">
              <h2 className="text-2xl font-bold text-white mb-6">Calendar & Court Dates</h2>
              <div className="bg-gray-900 rounded-xl p-6">
                <div className="grid grid-cols-7 gap-4">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center text-gray-400 font-semibold py-2">
                      {day}
                    </div>
                  ))}
                  {Array.from({length: 31}, (_, i) => i + 1).map(date => (
                    <div key={date} className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 cursor-pointer min-h-[80px]">
                      <div className="text-white font-semibold mb-1">{date}</div>
                      {date === 15 && (
                        <div className="text-xs bg-red-600/20 text-red-400 rounded px-1 py-0.5">
                          Court: Rodriguez
                        </div>
                      )}
                      {date === 22 && (
                        <div className="text-xs bg-blue-600/20 text-blue-400 rounded px-1 py-0.5">
                          Deposition
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : workspace === 'billing' ? (
            // Enhanced Billing & Time Tracking View
            <div className="p-6 h-full overflow-y-auto">
              <h2 className="text-2xl font-bold text-white mb-6">Advanced Billing & Time Management</h2>
              
              <div className="grid grid-cols-12 gap-6">
                {/* Time Tracking */}
                <div className="col-span-8 space-y-6">
                  <div className="bg-gray-900 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-white">Active Timer</h3>
                      <div className="flex space-x-2">
                        <span className="px-3 py-1 bg-green-600/20 text-green-400 rounded-full text-xs">Running</span>
                        <span className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-xs">Johnson v. Metro</span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-white font-medium">Settlement Negotiation Review</h4>
                          <p className="text-sm text-gray-400">Started at 2:30 PM • $450/hour</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-400">02:34:12</div>
                          <div className="text-sm text-gray-400">$1,177.50</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 mt-3">
                        <button className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-medium">
                          Stop Timer
                        </button>
                        <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white">
                          Pause
                        </button>
                        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white">
                          Add Note
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-900 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-white">Today's Time Entries</h3>
                      <button className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-lg text-sm hover:bg-blue-600/30">
                        Export Daily Report
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                      {[
                        { task: 'Document Review - Settlement Agreement', hours: 1.5, rate: 450, case: 'Johnson v. Metro', status: 'billable' },
                        { task: 'Client Call - Strategy Discussion', hours: 0.75, rate: 450, case: 'State v. Rodriguez', status: 'billable' },
                        { task: 'Research - Personal Injury Precedents', hours: 2.25, rate: 450, case: 'Johnson v. Metro', status: 'billable' },
                        { task: 'Administrative - File Organization', hours: 0.5, rate: 0, case: 'Internal', status: 'non-billable' }
                      ].map((entry, idx) => (
                        <div key={idx} className={`bg-gray-800/50 rounded-lg p-4 hover:bg-gray-800 transition-all ${
                          entry.status === 'billable' ? 'border-l-4 border-green-500' : 'border-l-4 border-gray-600'
                        }`}>
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h4 className="text-white font-medium">{entry.task}</h4>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  entry.status === 'billable' 
                                    ? 'bg-green-600/20 text-green-400' 
                                    : 'bg-gray-600/20 text-gray-400'
                                }`}>
                                  {entry.status.toUpperCase()}
                                </span>
                              </div>
                              <p className="text-sm text-gray-400">{entry.case} • {entry.hours} hours @ ${entry.rate}/hr</p>
                            </div>
                            <div className="text-right">
                              <span className="text-lg font-semibold text-green-400">
                                ${(entry.hours * entry.rate).toFixed(2)}
                              </span>
                              <div className="flex items-center space-x-2 mt-1">
                                <button className="p-1 text-gray-400 hover:text-white">
                                  <Edit className="w-3 h-3" />
                                </button>
                                <button className="p-1 text-gray-400 hover:text-red-400">
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-700">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-blue-400">5.0</div>
                          <div className="text-sm text-gray-400">Total Hours</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-green-400">$2,025</div>
                          <div className="text-sm text-gray-400">Billable Revenue</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-purple-400">90%</div>
                          <div className="text-sm text-gray-400">Billable Rate</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Billing Tools */}
                <div className="col-span-4 space-y-6">
                  <div className="bg-gray-900 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                      <button className="w-full p-3 bg-green-600/20 text-green-400 rounded-lg hover:bg-green-600/30 transition-colors flex items-center space-x-3">
                        <PlayCircle className="w-5 h-5" />
                        <span>Start New Timer</span>
                      </button>
                      <button className="w-full p-3 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-colors flex items-center space-x-3">
                        <Calculator className="w-5 h-5" />
                        <span>Manual Time Entry</span>
                      </button>
                      <button className="w-full p-3 bg-purple-600/20 text-purple-400 rounded-lg hover:bg-purple-600/30 transition-colors flex items-center space-x-3">
                        <FileText className="w-5 h-5" />
                        <span>Generate Invoice</span>
                      </button>
                      <button className="w-full p-3 bg-orange-600/20 text-orange-400 rounded-lg hover:bg-orange-600/30 transition-colors flex items-center space-x-3">
                        <BarChart3 className="w-5 h-5" />
                        <span>Billing Reports</span>
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-gray-900 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Recent Invoices</h3>
                    <div className="space-y-3">
                      {[
                        { client: 'Sarah Johnson', amount: '$8,450', status: 'Paid', date: '2 days ago' },
                        { client: 'Miguel Rodriguez', amount: 'Pro Bono', status: 'N/A', date: '1 week ago' },
                        { client: 'Robert Williams', amount: '$3,200', status: 'Pending', date: '3 days ago' }
                      ].map((invoice, idx) => (
                        <div key={idx} className="bg-gray-800/50 rounded-lg p-3 hover:bg-gray-800 transition-all cursor-pointer">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-white font-medium">{invoice.client}</p>
                              <p className="text-xs text-gray-400">{invoice.date}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-green-400">{invoice.amount}</p>
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                invoice.status === 'Paid' 
                                  ? 'bg-green-600/20 text-green-400' 
                                  : invoice.status === 'Pending'
                                  ? 'bg-yellow-600/20 text-yellow-400'
                                  : 'bg-gray-600/20 text-gray-400'
                              }`}>
                                {invoice.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                      <Brain className="w-5 h-5 text-purple-400" />
                      <span>Maya Billing Insights</span>
                    </h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-800/50 rounded-lg">
                        <p className="text-sm text-gray-300">
                          <span className="text-green-400">💰</span> You're 23% ahead of monthly billing target
                        </p>
                      </div>
                      <div className="p-3 bg-gray-800/50 rounded-lg">
                        <p className="text-sm text-gray-300">
                          <span className="text-blue-400">⏰</span> Optimal billing hours: 9-11 AM, 2-4 PM
                        </p>
                      </div>
                      <div className="p-3 bg-gray-800/50 rounded-lg">
                        <p className="text-sm text-gray-300">
                          <span className="text-yellow-400">📊</span> Johnson case: 15.5 hours logged this week
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : workspace === 'contacts' ? (
            // Enhanced Contacts & Communication Center
            <div className="p-6 h-full overflow-y-auto">
              <h2 className="text-2xl font-bold text-white mb-6">Communication Center</h2>
              
              <div className="grid grid-cols-12 gap-6">
                {/* Contact Management */}
                <div className="col-span-8 space-y-6">
                  <div className="bg-gray-900 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-white">Client Contacts</h3>
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 bg-green-600/20 text-green-400 rounded-lg text-sm hover:bg-green-600/30">
                          Add Contact
                        </button>
                        <button className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-lg text-sm hover:bg-blue-600/30">
                          Import Contacts
                        </button>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      {[
                        { 
                          name: 'Sarah Johnson', 
                          role: 'Client', 
                          case: 'Johnson v. Metro Insurance', 
                          phone: '(555) 123-4567', 
                          email: 'sarah.johnson@email.com',
                          lastContact: '2 hours ago',
                          status: 'active',
                          priority: 'high'
                        },
                        { 
                          name: 'Miguel Rodriguez', 
                          role: 'Client', 
                          case: 'State v. Rodriguez', 
                          phone: '(555) 234-5678', 
                          email: 'miguel.rodriguez@email.com',
                          lastContact: '1 day ago',
                          status: 'active',
                          priority: 'critical'
                        },
                        { 
                          name: 'Robert Williams', 
                          role: 'Client', 
                          case: 'Williams Estate Planning', 
                          phone: '(555) 345-6789', 
                          email: 'robert.williams@email.com',
                          lastContact: '3 days ago',
                          status: 'pending',
                          priority: 'medium'
                        },
                        { 
                          name: 'Dr. Patricia Martinez', 
                          role: 'Expert Witness', 
                          case: 'Johnson v. Metro Insurance', 
                          phone: '(555) 456-7890', 
                          email: 'p.martinez@medexperts.com',
                          lastContact: '1 week ago',
                          status: 'scheduled',
                          priority: 'medium'
                        }
                      ].map((contact, idx) => (
                        <div key={idx} className={`bg-gray-800/50 rounded-lg p-4 hover:bg-gray-800 transition-all cursor-pointer border-l-4 ${
                          contact.priority === 'critical' ? 'border-red-500' :
                          contact.priority === 'high' ? 'border-orange-500' : 'border-blue-500'
                        }`}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="relative">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                  <User className="w-6 h-6 text-white" />
                                </div>
                                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-gray-800 ${
                                  contact.status === 'active' ? 'bg-green-400' :
                                  contact.status === 'pending' ? 'bg-yellow-400' : 'bg-blue-400'
                                }`}></div>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-1">
                                  <h4 className="text-white font-semibold">{contact.name}</h4>
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    contact.priority === 'critical' ? 'bg-red-600/20 text-red-400' :
                                    contact.priority === 'high' ? 'bg-orange-600/20 text-orange-400' :
                                    'bg-blue-600/20 text-blue-400'
                                  }`}>
                                    {contact.priority.toUpperCase()}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-400">{contact.role} • {contact.case}</p>
                                <p className="text-xs text-gray-500">Last contact: {contact.lastContact}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center space-x-2 mb-2">
                                <button className="p-2 bg-green-600/20 text-green-400 rounded-lg hover:bg-green-600/30">
                                  <Phone className="w-4 h-4" />
                                </button>
                                <button className="p-2 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30">
                                  <Mail className="w-4 h-4" />
                                </button>
                                <button className="p-2 bg-purple-600/20 text-purple-400 rounded-lg hover:bg-purple-600/30">
                                  <MessageCircle className="w-4 h-4" />
                                </button>
                              </div>
                              <p className="text-xs text-gray-400">{contact.phone}</p>
                              <p className="text-xs text-gray-500">{contact.email}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-gray-900 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Recent Communications</h3>
                    <div className="space-y-3">
                      {[
                        { contact: 'Sarah Johnson', type: 'Email', subject: 'Settlement Update Required', time: '2 hours ago', status: 'sent' },
                        { contact: 'Miguel Rodriguez', type: 'Call', subject: 'Court date confirmation', time: '1 day ago', status: 'completed' },
                        { contact: 'Robert Williams', type: 'SMS', subject: 'Document review reminder', time: '2 days ago', status: 'delivered' },
                        { contact: 'Dr. Martinez', type: 'Email', subject: 'Expert testimony preparation', time: '1 week ago', status: 'replied' }
                      ].map((comm, idx) => (
                        <div key={idx} className="bg-gray-800/50 rounded-lg p-4 hover:bg-gray-800 transition-all">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className={`p-2 rounded-lg ${
                                comm.type === 'Email' ? 'bg-blue-600/20 text-blue-400' :
                                comm.type === 'Call' ? 'bg-green-600/20 text-green-400' :
                                'bg-purple-600/20 text-purple-400'
                              }`}>
                                {comm.type === 'Email' ? <Mail className="w-4 h-4" /> :
                                 comm.type === 'Call' ? <Phone className="w-4 h-4" /> :
                                 <MessageCircle className="w-4 h-4" />}
                              </div>
                              <div>
                                <h4 className="text-white font-medium">{comm.subject}</h4>
                                <p className="text-sm text-gray-400">{comm.contact} • {comm.time}</p>
                              </div>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              comm.status === 'sent' ? 'bg-blue-600/20 text-blue-400' :
                              comm.status === 'completed' ? 'bg-green-600/20 text-green-400' :
                              comm.status === 'delivered' ? 'bg-yellow-600/20 text-yellow-400' :
                              'bg-purple-600/20 text-purple-400'
                            }`}>
                              {comm.status.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Communication Tools */}
                <div className="col-span-4 space-y-6">
                  <div className="bg-gray-900 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Quick Communication</h3>
                    <div className="space-y-3">
                      <button className="w-full p-3 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-colors flex items-center space-x-3">
                        <Mail className="w-5 h-5" />
                        <span>New Email</span>
                      </button>
                      <button className="w-full p-3 bg-green-600/20 text-green-400 rounded-lg hover:bg-green-600/30 transition-colors flex items-center space-x-3">
                        <Phone className="w-5 h-5" />
                        <span>Make Call</span>
                      </button>
                      <button className="w-full p-3 bg-purple-600/20 text-purple-400 rounded-lg hover:bg-purple-600/30 transition-colors flex items-center space-x-3">
                        <MessageCircle className="w-5 h-5" />
                        <span>Send Message</span>
                      </button>
                      <button className="w-full p-3 bg-orange-600/20 text-orange-400 rounded-lg hover:bg-orange-600/30 transition-colors flex items-center space-x-3">
                        <Video className="w-5 h-5" />
                        <span>Video Call</span>
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-gray-900 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Email Templates</h3>
                    <div className="space-y-2">
                      {[
                        'Settlement Update',
                        'Court Date Reminder',
                        'Document Request',
                        'Case Status Update',
                        'Billing Statement'
                      ].map((template, idx) => (
                        <button key={idx} className="w-full text-left p-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg text-sm">
                          {template}
                        </button>
                      ))}
                    </div>
                    <button className="w-full mt-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-300 text-sm">
                      Manage Templates
                    </button>
                  </div>
                  
                  <div className="bg-gray-900 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Communication Stats</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Emails Today:</span>
                        <span className="text-white font-semibold">12</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Calls Made:</span>
                        <span className="text-white font-semibold">8</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Response Rate:</span>
                        <span className="text-green-400 font-semibold">87%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Pending Replies:</span>
                        <span className="text-yellow-400 font-semibold">3</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                      <Brain className="w-5 h-5 text-purple-400" />
                      <span>Maya Communication AI</span>
                    </h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-800/50 rounded-lg">
                        <p className="text-sm text-gray-300">
                          <span className="text-blue-400">📧</span> 3 urgent emails need responses today
                        </p>
                      </div>
                      <div className="p-3 bg-gray-800/50 rounded-lg">
                        <p className="text-sm text-gray-300">
                          <span className="text-green-400">📞</span> Best time to call Rodriguez: 2-4 PM
                        </p>
                      </div>
                      <div className="p-3 bg-gray-800/50 rounded-lg">
                        <p className="text-sm text-gray-300">
                          <span className="text-yellow-400">⏰</span> Schedule follow-up with Williams Estate
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        setAiActive && setAiActive(true)
                        setAiVoiceActive && setAiVoiceActive(true)
                      }}
                      className="w-full mt-4 py-2 bg-purple-600/20 hover:bg-purple-600/30 rounded-lg text-purple-400 text-sm"
                    >
                      Ask Maya about Communications
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : workspace === 'court' ? (
            // Enhanced Court & E-Filing System
            <div className="p-6 h-full overflow-y-auto">
              <h2 className="text-2xl font-bold text-white mb-6">Court Management & E-Filing Center</h2>
              
              <div className="grid grid-cols-12 gap-6">
                {/* Active Filings */}
                <div className="col-span-8 space-y-6">
                  <div className="bg-gray-900 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-white">E-Filing Queue</h3>
                      <div className="flex space-x-2">
                        <span className="px-3 py-1 bg-green-600/20 text-green-400 rounded-full text-xs">CM/ECF Connected</span>
                        <button className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-xs hover:bg-blue-600/30">
                          New Filing
                        </button>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      {[
                        { 
                          title: 'Motion for Summary Judgment', 
                          case: 'Johnson v. Metro Insurance', 
                          caseNum: '2024-CV-1234',
                          status: 'ready', 
                          deadline: '2 days', 
                          court: 'Superior Court of CA',
                          judge: 'Hon. Patricia Martinez'
                        },
                        { 
                          title: 'Response to Motion to Dismiss', 
                          case: 'State v. Rodriguez', 
                          caseNum: '2024-CR-5678',
                          status: 'pending', 
                          deadline: '5 days', 
                          court: 'Los Angeles County Court',
                          judge: 'Hon. Robert Chen'
                        },
                        { 
                          title: 'Amended Complaint', 
                          case: 'Williams Estate Matter', 
                          caseNum: '2024-PR-9012',
                          status: 'draft', 
                          deadline: '1 week', 
                          court: 'Probate Court',
                          judge: 'Hon. Sarah Williams'
                        }
                      ].map((filing, idx) => (
                        <div key={idx} className={`bg-gray-800/50 rounded-lg p-4 hover:bg-gray-800 transition-all border-l-4 ${
                          filing.status === 'ready' ? 'border-green-500' :
                          filing.status === 'pending' ? 'border-yellow-500' : 'border-blue-500'
                        }`}>
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h4 className="text-white font-semibold">{filing.title}</h4>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  filing.status === 'ready' ? 'bg-green-600/20 text-green-400' :
                                  filing.status === 'pending' ? 'bg-yellow-600/20 text-yellow-400' :
                                  'bg-blue-600/20 text-blue-400'
                                }`}>
                                  {filing.status.toUpperCase()}
                                </span>
                                <span className="px-2 py-1 bg-red-600/20 text-red-400 rounded-full text-xs">
                                  Due in {filing.deadline}
                                </span>
                              </div>
                              <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
                                <div>
                                  <p><span className="text-gray-300">Case:</span> {filing.case}</p>
                                  <p><span className="text-gray-300">Number:</span> {filing.caseNum}</p>
                                </div>
                                <div>
                                  <p><span className="text-gray-300">Court:</span> {filing.court}</p>
                                  <p><span className="text-gray-300">Judge:</span> {filing.judge}</p>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col space-y-2">
                              {filing.status === 'ready' && (
                                <button className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white text-sm font-medium">
                                  File Now
                                </button>
                              )}
                              {filing.status === 'pending' && (
                                <button className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg text-white text-sm font-medium">
                                  Review
                                </button>
                              )}
                              {filing.status === 'draft' && (
                                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm font-medium">
                                  Complete
                                </button>
                              )}
                              <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-300 text-sm">
                                Preview
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-gray-900 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-white">Recent Filings</h3>
                      <button className="px-3 py-1 bg-purple-600/20 text-purple-400 rounded-lg text-sm hover:bg-purple-600/30">
                        View All History
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                      {[
                        { title: 'Motion to Compel Discovery', status: 'Accepted', date: 'Dec 20, 2024', confirmation: 'ECF-2024-12345' },
                        { title: 'Discovery Requests', status: 'Filed', date: 'Dec 18, 2024', confirmation: 'ECF-2024-12344' },
                        { title: 'Case Management Statement', status: 'Accepted', date: 'Dec 15, 2024', confirmation: 'ECF-2024-12343' }
                      ].map((filing, idx) => (
                        <div key={idx} className="bg-gray-800/50 rounded-lg p-4 hover:bg-gray-800 transition-all">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="text-white font-medium">{filing.title}</h4>
                              <p className="text-sm text-gray-400">{filing.date} • {filing.confirmation}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              filing.status === 'Accepted' ? 'bg-green-600/20 text-green-400' :
                              'bg-blue-600/20 text-blue-400'
                            }`}>
                              {filing.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Court Tools & Calendar */}
                <div className="col-span-4 space-y-6">
                  <div className="bg-gray-900 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Filing Tools</h3>
                    <div className="space-y-3">
                      <button className="w-full p-3 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-colors flex items-center space-x-3">
                        <FileText className="w-5 h-5" />
                        <span>New E-Filing</span>
                      </button>
                      <button className="w-full p-3 bg-green-600/20 text-green-400 rounded-lg hover:bg-green-600/30 transition-colors flex items-center space-x-3">
                        <Gavel className="w-5 h-5" />
                        <span>Court Rules</span>
                      </button>
                      <button className="w-full p-3 bg-purple-600/20 text-purple-400 rounded-lg hover:bg-purple-600/30 transition-colors flex items-center space-x-3">
                        <Calendar className="w-5 h-5" />
                        <span>Hearing Calendar</span>
                      </button>
                      <button className="w-full p-3 bg-orange-600/20 text-orange-400 rounded-lg hover:bg-orange-600/30 transition-colors flex items-center space-x-3">
                        <AlertTriangle className="w-5 h-5" />
                        <span>Deadline Tracker</span>
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-gray-900 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Upcoming Hearings</h3>
                    <div className="space-y-3">
                      {[
                        { case: 'Johnson v. Metro', type: 'Motion Hearing', date: 'Dec 28', time: '9:00 AM', judge: 'Martinez' },
                        { case: 'State v. Rodriguez', type: 'Arraignment', date: 'Jan 5', time: '10:30 AM', judge: 'Chen' },
                        { case: 'Williams Estate', type: 'Probate Hearing', date: 'Jan 12', time: '2:00 PM', judge: 'Williams' }
                      ].map((hearing, idx) => (
                        <div key={idx} className="bg-gray-800/50 rounded-lg p-3 hover:bg-gray-800 transition-all">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h4 className="text-white font-medium text-sm">{hearing.type}</h4>
                              <p className="text-xs text-gray-400">{hearing.case}</p>
                              <p className="text-xs text-gray-500">Judge {hearing.judge}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium text-blue-400">{hearing.date}</p>
                              <p className="text-xs text-gray-400">{hearing.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                      <Brain className="w-5 h-5 text-purple-400" />
                      <span>Maya Court Assistant</span>
                    </h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-800/50 rounded-lg">
                        <p className="text-sm text-gray-300">
                          <span className="text-red-400">⚠️</span> 3 filings due this week - all prepared
                        </p>
                      </div>
                      <div className="p-3 bg-gray-800/50 rounded-lg">
                        <p className="text-sm text-gray-300">
                          <span className="text-blue-400">📋</span> Court rules updated for LA County - review changes
                        </p>
                      </div>
                      <div className="p-3 bg-gray-800/50 rounded-lg">
                        <p className="text-sm text-gray-300">
                          <span className="text-green-400">✓</span> All documents comply with local formatting rules
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        setAiActive && setAiActive(true)
                        setAiVoiceActive && setAiVoiceActive(true)
                      }}
                      className="w-full mt-4 py-2 bg-purple-600/20 hover:bg-purple-600/30 rounded-lg text-purple-400 text-sm"
                    >
                      Ask Maya about Filing Rules
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : workspace === 'research' ? (
            // Enhanced Legal Research View
            <div className="p-6 h-full overflow-y-auto">
              <h2 className="text-2xl font-bold text-white mb-6">Legal Research Center</h2>
              
              {/* Research Dashboard */}
              <div className="grid grid-cols-12 gap-6 mb-6">
                {/* Search Interface */}
                <div className="col-span-8 bg-gray-900 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">Advanced Legal Search</h3>
                    <div className="flex space-x-2">
                      <span className="px-3 py-1 bg-green-600/20 text-green-400 rounded-full text-xs">Westlaw Connected</span>
                      <span className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-xs">LexisNexis Ready</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex space-x-3">
                      <input
                        type="text"
                        placeholder="Enter search terms, case names, or legal concepts..."
                        className="flex-1 p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium">
                        Search
                      </button>
                    </div>
                    
                    <div className="flex space-x-2">
                      <select className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm">
                        <option>All Jurisdictions</option>
                        <option>Federal</option>
                        <option>State Courts</option>
                        <option>Supreme Court</option>
                      </select>
                      <select className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm">
                        <option>All Practice Areas</option>
                        <option>Personal Injury</option>
                        <option>Criminal Defense</option>
                        <option>Estate Planning</option>
                      </select>
                      <select className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm">
                        <option>Last 10 Years</option>
                        <option>Last 5 Years</option>
                        <option>Last Year</option>
                        <option>All Time</option>
                      </select>
                    </div>
                  </div>
                  
                  {/* Search Results */}
                  <div className="mt-6 space-y-4">
                    <div className="border-b border-gray-800 pb-4">
                      <h4 className="text-white font-semibold mb-2">Recent Search Results</h4>
                    </div>
                    
                    {[
                      { title: "Smith v. Johnson Industries", citation: "245 F.3d 892 (9th Cir. 2023)", relevance: 95, type: "Federal Case" },
                      { title: "Personal Injury Settlement Standards", citation: "2023 WL 1234567", relevance: 87, type: "Legal Analysis" },
                      { title: "Motor Vehicle Accident Liability", citation: "Cal. Code § 17151", relevance: 82, type: "Statute" }
                    ].map((result, idx) => (
                      <div key={idx} className="bg-gray-800/50 rounded-lg p-4 hover:bg-gray-800 transition-all cursor-pointer">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h4 className="text-white font-medium">{result.title}</h4>
                              <span className="px-2 py-1 bg-blue-600/20 text-blue-400 text-xs rounded-full">{result.type}</span>
                              <span className="px-2 py-1 bg-green-600/20 text-green-400 text-xs rounded-full">{result.relevance}% Match</span>
                            </div>
                            <p className="text-gray-400 text-sm">{result.citation}</p>
                          </div>
                          <div className="flex space-x-2">
                            <button className="p-2 text-gray-400 hover:text-white">
                              <BookOpen className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-white">
                              <Star className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Research Tools */}
                <div className="col-span-4 space-y-6">
                  <div className="bg-gray-900 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Research Tools</h3>
                    <div className="space-y-3">
                      <button className="w-full p-3 bg-purple-600/20 text-purple-400 rounded-lg hover:bg-purple-600/30 transition-colors text-left">
                        <div className="flex items-center space-x-3">
                          <FileSearch className="w-5 h-5" />
                          <span>Case Law Search</span>
                        </div>
                      </button>
                      <button className="w-full p-3 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-colors text-left">
                        <div className="flex items-center space-x-3">
                          <BookOpen className="w-5 h-5" />
                          <span>Statute Lookup</span>
                        </div>
                      </button>
                      <button className="w-full p-3 bg-green-600/20 text-green-400 rounded-lg hover:bg-green-600/30 transition-colors text-left">
                        <div className="flex items-center space-x-3">
                          <Target className="w-5 h-5" />
                          <span>Citation Analysis</span>
                        </div>
                      </button>
                      <button className="w-full p-3 bg-orange-600/20 text-orange-400 rounded-lg hover:bg-orange-600/30 transition-colors text-left">
                        <div className="flex items-center space-x-3">
                          <TrendingUp className="w-5 h-5" />
                          <span>Legal Trends</span>
                        </div>
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                      <Brain className="w-5 h-5 text-purple-400" />
                      <span>Maya Research Assistant</span>
                    </h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-800/50 rounded-lg">
                        <p className="text-sm text-gray-300">
                          <span className="text-purple-400">🔍</span> Found 847 relevant cases for your Johnson v. Metro search
                        </p>
                      </div>
                      <div className="p-3 bg-gray-800/50 rounded-lg">
                        <p className="text-sm text-gray-300">
                          <span className="text-blue-400">📊</span> 78% success rate in similar personal injury settlements
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        setAiActive(true)
                        setAiVoiceActive(true)
                      }}
                      className="w-full mt-4 py-2 bg-purple-600/20 hover:bg-purple-600/30 rounded-lg text-purple-400 text-sm"
                    >
                      Ask Maya for Research Help
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : workspace === 'video' ? (
            // Video Meetings View
            <div className="p-6 h-full overflow-y-auto">
              <h2 className="text-2xl font-bold text-white mb-6">Video Conferencing</h2>
              <div className="bg-gray-900 rounded-xl p-6">
                <div className="text-center py-12">
                  <Video className="w-24 h-24 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Start or Join Meeting</h3>
                  <div className="max-w-md mx-auto space-y-4">
                    <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold">
                      Start New Meeting
                    </button>
                    <input
                      type="text"
                      placeholder="Enter meeting ID"
                      className="w-full py-3 px-4 bg-gray-800 rounded-lg text-white placeholder-gray-400"
                    />
                    <button className="w-full py-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-white">
                      Join Meeting
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : workspace === 'cases' ? (
            // Cases Management View
            <div className="p-6 h-full overflow-y-auto">
              <h2 className="text-2xl font-bold text-white mb-6">Case Management Center</h2>
              
              <div className="grid grid-cols-12 gap-6">
                {/* Cases List */}
                <div className="col-span-4 bg-gray-900 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">Active Cases</h3>
                    <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm">
                      New Case
                    </button>
                  </div>
                  
                  <div className="space-y-3 max-h-[600px] overflow-y-auto">
                    {[
                      { id: 1, name: 'Johnson v. Metro Insurance', type: 'Personal Injury', priority: 'high', nextDate: 'Jan 25', client: 'Sarah Johnson' },
                      { id: 2, name: 'Smith Employment Dispute', type: 'Employment Law', priority: 'medium', nextDate: 'Jan 28', client: 'Michael Smith' },
                      { id: 3, name: 'Davis v. City Planning', type: 'Civil Rights', priority: 'high', nextDate: 'Feb 2', client: 'Jennifer Davis' },
                      { id: 4, name: 'Rodriguez Workers Comp', type: 'Workers Comp', priority: 'low', nextDate: 'Feb 5', client: 'Maria Rodriguez' },
                      { id: 5, name: 'Wilson Contract Breach', type: 'Contract Law', priority: 'medium', nextDate: 'Feb 8', client: 'James Wilson' }
                    ].map((case_item) => (
                      <div 
                        key={case_item.id}
                        className="p-3 bg-gray-800 hover:bg-gray-750 rounded-lg cursor-pointer border-l-4 border-blue-500"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-white text-sm">{case_item.name}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            case_item.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                            case_item.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-green-500/20 text-green-400'
                          }`}>
                            {case_item.priority}
                          </span>
                        </div>
                        <p className="text-gray-400 text-xs mb-1">{case_item.type}</p>
                        <p className="text-gray-500 text-xs">Client: {case_item.client}</p>
                        <p className="text-blue-400 text-xs mt-2">Next: {case_item.nextDate}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Case Details */}
                <div className="col-span-8 bg-gray-900 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-white">Johnson v. Metro Insurance</h3>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm">
                        Edit Case
                      </button>
                      <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm">
                        Add Entry
                      </button>
                    </div>
                  </div>

                  {/* Case Info Grid */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-gray-800 rounded-lg p-4">
                      <p className="text-gray-400 text-sm">Case Status</p>
                      <p className="text-white font-semibold">Active Settlement</p>
                      <p className="text-green-400 text-xs mt-1">85% Win Probability</p>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-4">
                      <p className="text-gray-400 text-sm">Settlement Value</p>
                      <p className="text-white font-semibold">$425,000</p>
                      <p className="text-blue-400 text-xs mt-1">Initial demand: $500K</p>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-4">
                      <p className="text-gray-400 text-sm">Next Action</p>
                      <p className="text-white font-semibold">Mediation</p>
                      <p className="text-orange-400 text-xs mt-1">Jan 25, 2025</p>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="bg-gray-800 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-4">Recent Activity</h4>
                    <div className="space-y-3 max-h-[400px] overflow-y-auto">
                      {[
                        { date: 'Jan 18', action: 'Settlement demand increased to $450K', author: 'Carl Douglass' },
                        { date: 'Jan 17', action: 'Medical records review completed', author: 'Sarah Johnson' },
                        { date: 'Jan 15', action: 'Expert deposition scheduled', author: 'Michael Chen' },
                        { date: 'Jan 12', action: 'Insurance response received', author: 'Jennifer Davis' },
                        { date: 'Jan 10', action: 'Case strategy meeting held', author: 'Carl Douglass' }
                      ].map((activity, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-2 hover:bg-gray-700 rounded">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                          <div className="flex-1">
                            <p className="text-white text-sm">{activity.action}</p>
                            <p className="text-gray-400 text-xs">{activity.date} • {activity.author}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : workspace === 'documents' ? (
            // Documents Management View  
            <div className="p-6 h-full overflow-y-auto">
              <h2 className="text-2xl font-bold text-white mb-6">Document Management Center</h2>
              
              <div className="grid grid-cols-12 gap-6">
                {/* Document Categories */}
                <div className="col-span-3 bg-gray-900 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Categories</h3>
                  
                  <div className="space-y-2">
                    {[
                      { name: 'All Documents', count: 1247, icon: '📁', active: true },
                      { name: 'Contracts', count: 89, icon: '📄', active: false },
                      { name: 'Evidence', count: 156, icon: '🔍', active: false },
                      { name: 'Pleadings', count: 234, icon: '⚖️', active: false },
                      { name: 'Correspondence', count: 445, icon: '✉️', active: false },
                      { name: 'Expert Reports', count: 67, icon: '📊', active: false },
                      { name: 'Internal Memos', count: 123, icon: '📝', active: false },
                      { name: 'Templates', count: 45, icon: '📋', active: false }
                    ].map((category, idx) => (
                      <button 
                        key={idx}
                        className={`w-full text-left p-3 rounded-lg transition-all ${
                          category.active ? 'bg-blue-600 text-white' : 'hover:bg-gray-800 text-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span>{category.icon}</span>
                            <span className="text-sm font-medium">{category.name}</span>
                          </div>
                          <span className="text-xs bg-gray-700 px-2 py-1 rounded-full">{category.count}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Document List */}
                <div className="col-span-6 bg-gray-900 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">Document Library</h3>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded-lg text-sm">
                        Upload
                      </button>
                      <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm">
                        Search
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2 max-h-[600px] overflow-y-auto">
                    {getCaseDocuments({ id: 1, name: 'Johnson v. Metro Insurance', type: 'Personal Injury', client: 'Sarah Johnson', documents: 47 })
                      .concat([
                        {
                          id: 10,
                          name: 'Smith Employment Agreement.pdf',
                          type: 'contract',
                          size: '1.2 MB',
                          modified: '3 hours ago',
                          author: 'Jennifer Davis',
                          status: 'final',
                          privileged: false,
                          tags: ['employment', 'contract'],
                          content: 'Employment agreement for Smith case'
                        },
                        {
                          id: 11,
                          name: 'Davis Civil Rights Complaint.docx',
                          type: 'pleading',
                          size: '456 KB',
                          modified: '5 hours ago',
                          author: 'Carl Douglass',
                          status: 'filed',
                          privileged: true,
                          tags: ['civil-rights', 'complaint'],
                          content: 'Civil rights violation complaint'
                        }
                      ])
                      .map((doc, idx) => (
                        <div 
                          key={idx}
                          className="p-3 bg-gray-800 hover:bg-gray-750 rounded-lg cursor-pointer"
                          onClick={() => setSelectedDocument(doc)}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                doc.type === 'contract' ? 'bg-blue-600' :
                                doc.type === 'evidence' ? 'bg-green-600' :
                                doc.type === 'pleading' ? 'bg-purple-600' :
                                'bg-gray-600'
                              }`}>
                                {doc.type === 'contract' ? '📄' :
                                 doc.type === 'evidence' ? '🔍' :
                                 doc.type === 'pleading' ? '⚖️' : '📝'}
                              </div>
                              <div>
                                <h4 className="font-medium text-white text-sm">{doc.name}</h4>
                                <p className="text-gray-400 text-xs">{doc.size} • {doc.modified}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                doc.status === 'final' ? 'bg-green-500/20 text-green-400' :
                                doc.status === 'draft' ? 'bg-yellow-500/20 text-yellow-400' :
                                doc.status === 'in-review' ? 'bg-blue-500/20 text-blue-400' :
                                'bg-gray-500/20 text-gray-400'
                              }`}>
                                {doc.status}
                              </span>
                              {doc.privileged && (
                                <div className="text-red-400 text-xs mt-1">🔒 Privileged</div>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {doc.tags.map((tag, tagIdx) => (
                              <span key={tagIdx} className="px-2 py-1 bg-gray-700 rounded text-xs text-gray-300">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Document Preview */}
                <div className="col-span-3 bg-gray-900 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Document Preview</h3>
                  
                  {selectedDocument ? (
                    <div>
                      <div className="bg-gray-800 rounded-lg p-4 mb-4">
                        <h4 className="font-medium text-white text-sm mb-2">{selectedDocument.name}</h4>
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Type:</span>
                            <span className="text-white">{selectedDocument.type}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Size:</span>
                            <span className="text-white">{selectedDocument.size}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Author:</span>
                            <span className="text-white">{selectedDocument.author}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Modified:</span>
                            <span className="text-white">{selectedDocument.modified}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm">
                          Open Document
                        </button>
                        <button className="w-full py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm">
                          Download
                        </button>
                        <button className="w-full py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm">
                          Share
                        </button>
                        <button className="w-full py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm">
                          Edit Metadata
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-400 text-sm">Select a document to preview</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : currentTab.type === 'blank' ? (
            // New Tab Page
            <div className="flex items-center justify-center h-full">
              <div className="text-center max-w-2xl mx-auto p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Legal Workspace</h2>
                
                {/* Quick Access */}
                <div className="grid grid-cols-4 gap-4 mb-8">
                  {bookmarks.map(bookmark => (
                    <button
                      key={bookmark.id}
                      onClick={() => handleNavigate(bookmark.url)}
                      className="p-4 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all group"
                    >
                      <div className="text-3xl mb-2">{bookmark.icon}</div>
                      <p className="text-sm text-gray-300 group-hover:text-white">
                        {bookmark.title}
                      </p>
                    </button>
                  ))}
                </div>

                {/* Recent Cases */}
                {selectedCase && (
                  <div className="bg-gray-800/50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Current Case</h3>
                    <div className="text-left">
                      <p className="text-gray-300">{selectedCase.name}</p>
                      <p className="text-sm text-gray-400 mt-1">
                        {selectedCase.documents} documents • {selectedCase.status}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : currentTab.type === 'web' ? (
            // Web Browser View
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <Globe className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Web Browser</h3>
                <p className="text-gray-400 mb-4">
                  Navigating to: {currentTab.url}
                </p>
                <div className="bg-gray-800 rounded-lg p-4 max-w-2xl mx-auto">
                  <p className="text-sm text-gray-300">
                    Note: For security reasons, we're displaying a preview.
                    The full web browsing experience would connect to actual websites.
                  </p>
                </div>
                {/* In production, this would be an iframe or embedded browser */}
                <div className="mt-6 border border-gray-700 rounded-lg p-8 bg-gray-900">
                  <p className="text-gray-400">
                    {currentTab.url} would load here with full web functionality
                  </p>
                </div>
              </div>
            </div>
          ) : currentTab.type === 'document' ? (
            // Document Viewer
            <div className="flex flex-col h-full">
              {/* Document Header */}
              <div className="p-4 bg-gray-900 border-b border-gray-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-blue-400" />
                    <div>
                      <h3 className="font-semibold text-white">{currentTab.content?.name}</h3>
                      <p className="text-xs text-gray-400">
                        {currentTab.content?.size} • Modified {currentTab.content?.modified}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white">
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white">
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white">
                      <MessageSquare className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Dynamic Document Content */}
              <div className="flex-1 overflow-auto p-8 bg-white">
                <div className="max-w-4xl mx-auto">
                  <div className="prose prose-lg">
                    {currentTab.content ? (() => {
                      const doc = currentTab.content
                      switch (doc.type) {
                        case 'contract':
                          return (
                            <>
                              <h1 className="text-black">{doc.name}</h1>
                              <p className="text-gray-700">{doc.content}</p>
                              <p className="text-gray-700">
                                This Settlement Agreement ("Agreement") is entered into as of December 20, 2024, 
                                by and between {selectedCase?.client} ("Plaintiff") and Metro Insurance Company ("Defendant").
                              </p>
                              <h2 className="text-black mt-6">1. Recitals</h2>
                              <p className="text-gray-700">
                                WHEREAS, Plaintiff has asserted claims against Defendant arising from 
                                an automobile accident that occurred on September 15, 2024;
                              </p>
                              <p className="text-gray-700">
                                WHEREAS, Defendant denies any liability or wrongdoing;
                              </p>
                              <p className="text-gray-700">
                                WHEREAS, the parties desire to resolve all claims and disputes between them;
                              </p>
                              <h2 className="text-black mt-6">2. Settlement Terms</h2>
                              <p className="text-gray-700">
                                In consideration of the mutual promises and covenants contained herein:
                              </p>
                              <ul className="text-gray-700">
                                <li>Defendant agrees to pay Plaintiff the sum of {selectedCase?.value}</li>
                                <li>Payment shall be made within 30 days of execution</li>
                                <li>Plaintiff agrees to release all claims against Defendant</li>
                                <li>This agreement constitutes the full and final settlement</li>
                              </ul>
                            </>
                          )
                        
                        case 'motion':
                          return (
                            <>
                              <h1 className="text-black">{doc.name}</h1>
                              <p className="text-gray-600 text-sm mb-4">Case: {selectedCase?.name} | Filed: {doc.modified}</p>
                              <p className="text-gray-700 font-semibold">{doc.content}</p>
                              
                              <h2 className="text-black mt-6">TO THE HONORABLE COURT:</h2>
                              <p className="text-gray-700">
                                Defendant {selectedCase?.client}, by and through undersigned counsel, 
                                respectfully moves this Court for an Order suppressing all evidence obtained 
                                in violation of the Fourth Amendment to the United States Constitution.
                              </p>
                              
                              <h2 className="text-black mt-6">STATEMENT OF FACTS</h2>
                              <p className="text-gray-700">
                                On the date in question, law enforcement conducted a search without proper 
                                warrant or probable cause. The evidence obtained through this unlawful search 
                                should be suppressed as "fruit of the poisonous tree."
                              </p>
                              
                              <h2 className="text-black mt-6">ARGUMENT</h2>
                              <p className="text-gray-700">
                                The Fourth Amendment protects against unreasonable searches and seizures. 
                                Evidence obtained in violation of this constitutional protection must be excluded 
                                from trial proceedings.
                              </p>
                            </>
                          )
                          
                        case 'will':
                          return (
                            <>
                              <h1 className="text-black">{doc.name}</h1>
                              <p className="text-gray-600 text-sm mb-4">Testator: {selectedCase?.client} | {doc.content}</p>
                              
                              <h2 className="text-black mt-6">LAST WILL AND TESTAMENT</h2>
                              <p className="text-gray-700">
                                I, {selectedCase?.client}, being of sound mind and memory, do hereby make, 
                                publish, and declare this to be my Last Will and Testament.
                              </p>
                              
                              <h2 className="text-black mt-6">ARTICLE I - REVOCATION</h2>
                              <p className="text-gray-700">
                                I hereby revoke all former wills and codicils made by me.
                              </p>
                              
                              <h2 className="text-black mt-6">ARTICLE II - FAMILY</h2>
                              <p className="text-gray-700">
                                I am married to [Spouse Name]. I have [Number] children whose names are: 
                                [Children Names].
                              </p>
                              
                              <h2 className="text-black mt-6">ARTICLE III - DISPOSITION OF PROPERTY</h2>
                              <p className="text-gray-700">
                                I give, devise, and bequeath all of my estate, real and personal, 
                                of whatever kind and wherever situated, to my beloved family as outlined 
                                in the attached asset inventory.
                              </p>
                            </>
                          )
                          
                        case 'evidence':
                          return (
                            <>
                              <h1 className="text-black">{doc.name}</h1>
                              <p className="text-gray-600 text-sm mb-4">Evidence Type: {doc.type} | {doc.content}</p>
                              
                              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded mb-6">
                                <p className="text-yellow-800 font-semibold">⚠️ CONFIDENTIAL EVIDENCE</p>
                                <p className="text-yellow-700 text-sm">
                                  This document contains sensitive evidence related to {selectedCase?.name}. 
                                  Handle with appropriate confidentiality protocols.
                                </p>
                              </div>
                              
                              <h2 className="text-black mt-6">Document Summary</h2>
                              <p className="text-gray-700">{doc.content}</p>
                              
                              <h2 className="text-black mt-6">Relevance to Case</h2>
                              <p className="text-gray-700">
                                This evidence is crucial to establishing the facts in {selectedCase?.name}. 
                                The document provides key insights that support our {selectedCase?.type.toLowerCase()} strategy.
                              </p>
                              
                              <h2 className="text-black mt-6">Chain of Custody</h2>
                              <p className="text-gray-700">
                                Document received: {doc.modified}<br/>
                                Author/Source: {doc.author}<br/>
                                Status: {doc.status}
                              </p>
                            </>
                          )
                        
                        case 'internal':
                          return (
                            <>
                              <h1 className="text-black">{doc.name}</h1>
                              <div className="bg-red-50 border border-red-200 p-4 rounded mb-6">
                                <p className="text-red-800 font-semibold">🔒 ATTORNEY WORK PRODUCT - PRIVILEGED</p>
                                <p className="text-red-700 text-sm">
                                  This document is protected by attorney-client privilege and work product doctrine.
                                </p>
                              </div>
                              
                              <p className="text-gray-700 font-semibold mb-4">{doc.content}</p>
                              
                              <h2 className="text-black mt-6">Case Analysis: {selectedCase?.name}</h2>
                              <p className="text-gray-700">
                                Client: {selectedCase?.client}<br/>
                                Case Type: {selectedCase?.type}<br/>
                                Current Status: {selectedCase?.status}<br/>
                                Estimated Value: {selectedCase?.value}
                              </p>
                              
                              <h2 className="text-black mt-6">Strategic Recommendations</h2>
                              <ul className="text-gray-700">
                                <li>Continue with current approach based on case progress ({selectedCase?.progress}%)</li>
                                <li>Next Action: {selectedCase?.nextAction}</li>
                                <li>Key deadline approaching: {selectedCase?.deadline}</li>
                                <li>Team coordination with: {selectedCase?.team?.join(', ')}</li>
                              </ul>
                              
                              <h2 className="text-black mt-6">Risk Assessment</h2>
                              <p className="text-gray-700">
                                Priority Level: {selectedCase?.priority?.toUpperCase()}<br/>
                                The case shows strong potential for favorable outcome based on current evidence 
                                and legal precedents in similar {selectedCase?.type.toLowerCase()} matters.
                              </p>
                            </>
                          )
                          
                        default:
                          return (
                            <>
                              <h1 className="text-black">{doc.name}</h1>
                              <p className="text-gray-700">{doc.content}</p>
                              <p className="text-gray-700 mt-4">
                                This document is part of the {selectedCase?.name} case file. 
                                For more information, please refer to the case management system or 
                                contact the assigned legal team.
                              </p>
                            </>
                          )
                      }
                    })() : (
                      <>
                        <h1 className="text-black">Document Viewer</h1>
                        <p className="text-gray-700">Select a document from the case file to view its contents.</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Case View
            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Case Workspace</h2>
              <p className="text-gray-400">Full case management interface would appear here</p>
            </div>
          )}

          {/* Maya AI Context Indicator */}
          {(currentTab.type === 'document' || currentTab.type === 'case') && (
            <div className="absolute bottom-6 right-6">
              <div className="bg-purple-900/90 backdrop-blur-sm border border-purple-700 rounded-lg px-4 py-3 shadow-xl">
                <div className="flex items-center space-x-3">
                  <Brain className="w-5 h-5 text-purple-400 animate-pulse" />
                  <div>
                    <p className="text-sm font-medium text-white">Maya AI is analyzing</p>
                    <p className="text-xs text-purple-300">
                      {currentTab.type === 'document' ? 'Document content' : 'Case details'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default WorkspaceBrowser