'use client'

import { useState, useEffect, useRef } from 'react'
import {
  Globe, FileText, ArrowLeft, ArrowRight, RotateCcw, Home,
  Search, Star, BookOpen, Download, Share, Settings, 
  MoreHorizontal, Plus, X, Minimize2, Maximize2, Volume2,
  Shield, Lock, Unlock, Zap, Brain, MessageSquare, Sparkles,
  Eye, EyeOff, Layout, Sidebar, PanelRightOpen, PanelRightClose,
  History, Bookmark, Filter, Archive, Folder, Tag, Clock,
  Users, Camera, Mic, Phone, Video, Screen
} from 'lucide-react'
import DocumentBrowser from '../documents/DocumentBrowser'
import DocumentViewer from '../documents/DocumentViewer'
import AIAssistantSidebar from './AIAssistantSidebar'

const UnifiedBrowser = ({ isOpen, onClose, userRole }) => {
  const [currentUrl, setCurrentUrl] = useState('https://www.google.com')
  const [navigationHistory, setNavigationHistory] = useState(['https://www.google.com'])
  const [historyIndex, setHistoryIndex] = useState(0)
  const [tabs, setTabs] = useState([
    { id: 1, title: 'Google Search', url: 'https://www.google.com', type: 'web', isActive: true },
    { id: 2, title: 'Document Browser', url: 'documents://browser', type: 'documents', isActive: false },
    { id: 3, title: 'Legal Research', url: 'https://www.westlaw.com', type: 'web', isActive: false }
  ])
  const [activeTab, setActiveTab] = useState(1)
  const [showAI, setShowAI] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [bookmarks, setBookmarks] = useState([])
  const [showBookmarks, setShowBookmarks] = useState(false)
  const [downloadQueue, setDownloadQueue] = useState([])
  const [aiContext, setAiContext] = useState('')
  const [selectedDocument, setSelectedDocument] = useState(null)
  const [webPageContent, setWebPageContent] = useState('')
  
  const iframeRef = useRef(null)
  const urlInputRef = useRef(null)

  // Legal research bookmarks
  useEffect(() => {
    const legalBookmarks = [
      { name: 'Westlaw', url: 'https://www.westlaw.com', category: 'Research' },
      { name: 'LexisNexis', url: 'https://www.lexisnexis.com', category: 'Research' },
      { name: 'Google Scholar', url: 'https://scholar.google.com', category: 'Research' },
      { name: 'Justia', url: 'https://www.justia.com', category: 'Case Law' },
      { name: 'FindLaw', url: 'https://www.findlaw.com', category: 'Legal Resources' },
      { name: 'Court Records', url: 'https://www.courtrecords.com', category: 'Documents' },
      { name: 'Black\'s Law Dictionary', url: 'https://thelawdictionary.org', category: 'Reference' },
      { name: 'Legal Ethics', url: 'https://www.americanbar.org/groups/professional_responsibility/', category: 'Ethics' }
    ]
    setBookmarks(legalBookmarks)
  }, [])

  const getCurrentTab = () => tabs.find(tab => tab.id === activeTab)

  const navigateTo = (url) => {
    const newHistory = [...navigationHistory.slice(0, historyIndex + 1), url]
    setNavigationHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
    setCurrentUrl(url)
    
    // Update active tab
    setTabs(tabs.map(tab => 
      tab.id === activeTab 
        ? { ...tab, url, title: getPageTitle(url) }
        : tab
    ))

    // Set AI context based on URL
    if (url.includes('westlaw') || url.includes('lexisnexis')) {
      setAiContext('legal_research')
    } else if (url.includes('google')) {
      setAiContext('web_search')
    } else {
      setAiContext('general_browsing')
    }
  }

  const getPageTitle = (url) => {
    if (url.includes('google.com')) return 'Google Search'
    if (url.includes('westlaw.com')) return 'Westlaw Legal Research'
    if (url.includes('lexisnexis.com')) return 'LexisNexis'
    if (url.includes('documents://')) return 'Document Browser'
    return 'Legal Browser'
  }

  const goBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1
      setHistoryIndex(newIndex)
      setCurrentUrl(navigationHistory[newIndex])
    }
  }

  const goForward = () => {
    if (historyIndex < navigationHistory.length - 1) {
      const newIndex = historyIndex + 1
      setHistoryIndex(newIndex)
      setCurrentUrl(navigationHistory[newIndex])
    }
  }

  const refresh = () => {
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src
    }
  }

  const addNewTab = () => {
    const newTab = {
      id: Date.now(),
      title: 'New Tab',
      url: 'https://www.google.com',
      type: 'web',
      isActive: true
    }
    setTabs([...tabs.map(t => ({ ...t, isActive: false })), newTab])
    setActiveTab(newTab.id)
    setCurrentUrl(newTab.url)
  }

  const closeTab = (tabId) => {
    const filteredTabs = tabs.filter(tab => tab.id !== tabId)
    setTabs(filteredTabs)
    
    if (activeTab === tabId && filteredTabs.length > 0) {
      setActiveTab(filteredTabs[0].id)
      setCurrentUrl(filteredTabs[0].url)
    }
  }

  const switchTab = (tabId) => {
    setActiveTab(tabId)
    const tab = tabs.find(t => t.id === tabId)
    if (tab) {
      setCurrentUrl(tab.url)
      setTabs(tabs.map(t => ({ ...t, isActive: t.id === tabId })))
    }
  }

  const handleUrlSubmit = (e) => {
    e.preventDefault()
    const url = urlInputRef.current.value
    if (url && !url.startsWith('http')) {
      navigateTo(`https://${url}`)
    } else if (url) {
      navigateTo(url)
    }
  }

  const renderContent = () => {
    const currentTab = getCurrentTab()
    
    if (currentTab?.type === 'documents') {
      return (
        <div className="flex-1 bg-gray-900">
          <DocumentBrowser
            caseId="all"
            userRole={userRole}
            onDocumentSelect={setSelectedDocument}
          />
        </div>
      )
    }

    return (
      <div className="flex-1 relative">
        <iframe
          ref={iframeRef}
          src={currentUrl}
          className="w-full h-full border-0"
          sandbox="allow-same-origin allow-scripts allow-forms allow-downloads allow-modals allow-popups"
          title="Legal Browser"
        />
        
        {/* Loading overlay */}
        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center opacity-0 transition-opacity">
          <div className="text-white text-lg">Loading...</div>
        </div>
      </div>
    )
  }

  if (!isOpen) return null

  return (
    <div className={`fixed inset-0 bg-black z-50 flex flex-col ${isFullscreen ? '' : 'inset-4 rounded-xl border border-gray-700'}`}>
      
      {/* Browser Chrome Header */}
      <div className="bg-gray-900 border-b border-gray-700 flex flex-col">
        
        {/* Window Controls */}
        <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full cursor-pointer hover:bg-red-400" onClick={onClose}></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full cursor-pointer hover:bg-yellow-400" onClick={() => setIsFullscreen(false)}></div>
              <div className="w-3 h-3 bg-green-500 rounded-full cursor-pointer hover:bg-green-400" onClick={() => setIsFullscreen(!isFullscreen)}></div>
            </div>
            <span className="text-sm text-gray-400 font-medium">Legal Browser - Douglass Hicks Law</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowAI(!showAI)}
              className={`p-2 rounded-lg transition-colors ${
                showAI ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              title="Toggle AI Assistant"
            >
              {showAI ? <PanelRightClose className="w-4 h-4" /> : <PanelRightOpen className="w-4 h-4" />}
            </button>
            
            <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-300">
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Bar */}
        <div className="flex items-center bg-gray-850 px-4 border-b border-gray-700">
          <div className="flex items-center space-x-1 flex-1 overflow-x-auto">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className={`group flex items-center space-x-2 px-4 py-2 min-w-0 max-w-xs cursor-pointer border-b-2 transition-all ${
                  tab.id === activeTab
                    ? 'border-blue-500 bg-gray-800 text-white'
                    : 'border-transparent hover:bg-gray-800 text-gray-400'
                }`}
                onClick={() => switchTab(tab.id)}
              >
                {tab.type === 'documents' ? <FileText className="w-4 h-4 flex-shrink-0" /> : <Globe className="w-4 h-4 flex-shrink-0" />}
                <span className="truncate text-sm">{tab.title}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    closeTab(tab.id)
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-700 rounded"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
            
            <button
              onClick={addNewTab}
              className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation Bar */}
        <div className="flex items-center space-x-3 px-4 py-3 bg-gray-800">
          <div className="flex items-center space-x-2">
            <button
              onClick={goBack}
              disabled={historyIndex <= 0}
              className="p-2 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-gray-300"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            
            <button
              onClick={goForward}
              disabled={historyIndex >= navigationHistory.length - 1}
              className="p-2 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-gray-300"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
            
            <button
              onClick={refresh}
              className="p-2 rounded-lg hover:bg-gray-700 text-gray-300"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* URL Bar */}
          <form onSubmit={handleUrlSubmit} className="flex-1 flex items-center">
            <div className="flex-1 relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                {currentUrl.startsWith('https') ? (
                  <Lock className="w-4 h-4 text-green-400" />
                ) : (
                  <Globe className="w-4 h-4 text-gray-400" />
                )}
              </div>
              
              <input
                ref={urlInputRef}
                type="text"
                defaultValue={currentUrl}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                placeholder="Search or enter address..."
              />
            </div>
          </form>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowBookmarks(!showBookmarks)}
              className="p-2 rounded-lg hover:bg-gray-700 text-gray-300"
            >
              <Star className="w-4 h-4" />
            </button>
            
            <button className="p-2 rounded-lg hover:bg-gray-700 text-gray-300">
              <Download className="w-4 h-4" />
            </button>
            
            <button className="p-2 rounded-lg hover:bg-gray-700 text-gray-300">
              <Share className="w-4 h-4" />
            </button>
            
            <div className="w-px h-6 bg-gray-600"></div>
            
            <button className="flex items-center space-x-2 px-3 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors">
              <Brain className="w-4 h-4 text-white" />
              <span className="text-sm text-white font-medium">Ask AI</span>
            </button>
          </div>
        </div>

        {/* Bookmarks Bar */}
        {showBookmarks && (
          <div className="px-4 py-2 bg-gray-850 border-b border-gray-700">
            <div className="flex items-center space-x-3 overflow-x-auto">
              <span className="text-sm text-gray-400 font-medium">Legal Research:</span>
              {bookmarks.map((bookmark, idx) => (
                <button
                  key={idx}
                  onClick={() => navigateTo(bookmark.url)}
                  className="flex items-center space-x-2 px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-md text-sm text-gray-300 hover:text-white transition-colors whitespace-nowrap"
                >
                  <BookOpen className="w-3 h-3" />
                  <span>{bookmark.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex">
        
        {/* Browser Content */}
        <div className={`flex-1 flex flex-col ${showAI ? 'pr-96' : ''}`}>
          {renderContent()}
        </div>

        {/* AI Assistant Sidebar */}
        {showAI && (
          <div className="absolute top-0 right-0 w-96 h-full">
            <AIAssistantSidebar
              context={aiContext}
              currentUrl={currentUrl}
              selectedDocument={selectedDocument}
              webPageContent={webPageContent}
              userRole={userRole}
              onClose={() => setShowAI(false)}
            />
          </div>
        )}
      </div>

      {/* Document Viewer Modal */}
      {selectedDocument && (
        <DocumentViewer
          document={selectedDocument}
          onClose={() => setSelectedDocument(null)}
          userRole={userRole}
          collaborators={['Carl Douglas', 'Sarah Johnson', 'Michael Chen']}
        />
      )}
    </div>
  )
}

export default UnifiedBrowser