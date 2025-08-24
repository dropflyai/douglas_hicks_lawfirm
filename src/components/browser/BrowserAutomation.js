'use client'

import { useState, useEffect } from 'react'
import {
  Play, Pause, Square, RotateCcw, Settings, Code, 
  Zap, Brain, Target, Clock, CheckCircle, AlertCircle,
  FileText, Download, Search, Filter, Tag, Star,
  ArrowRight, ChevronRight, Plus, Trash2, Edit3, Copy,
  Monitor, Mouse, Keyboard, Eye, Camera, Mic
} from 'lucide-react'

const BrowserAutomation = ({ onClose, userRole, currentUrl }) => {
  const [workflows, setWorkflows] = useState([])
  const [selectedWorkflow, setSelectedWorkflow] = useState(null)
  const [isRecording, setIsRecording] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [automationSteps, setAutomationSteps] = useState([])
  const [recordingActions, setRecordingActions] = useState([])

  // Legal workflow templates
  useEffect(() => {
    const legalWorkflows = [
      {
        id: 1,
        name: 'Westlaw Case Research',
        description: 'Automated case law research with citation extraction',
        category: 'Research',
        steps: 12,
        estimatedTime: '5 minutes',
        lastUsed: '2 hours ago',
        useCount: 24,
        actions: [
          { type: 'navigate', target: 'https://www.westlaw.com', description: 'Navigate to Westlaw' },
          { type: 'wait', target: 'login-form', description: 'Wait for login form' },
          { type: 'fill', target: '#username', value: '{user.westlaw_id}', description: 'Enter username' },
          { type: 'fill', target: '#password', value: '{user.westlaw_password}', description: 'Enter password' },
          { type: 'click', target: '#login-button', description: 'Click login' },
          { type: 'wait', target: 'search-box', description: 'Wait for search interface' },
          { type: 'fill', target: '#search', value: '{search_query}', description: 'Enter search terms' },
          { type: 'click', target: '#search-button', description: 'Execute search' },
          { type: 'extract', target: '.search-results', description: 'Extract case citations' },
          { type: 'download', target: 'search-results.pdf', description: 'Download results' },
          { type: 'ai_analyze', target: 'case_relevance', description: 'AI analysis of case relevance' },
          { type: 'export', target: 'case_summary.docx', description: 'Export summary to Word' }
        ]
      },
      {
        id: 2,
        name: 'Court Records Retrieval',
        description: 'Extract case documents from court databases',
        category: 'Documents',
        steps: 8,
        estimatedTime: '3 minutes',
        lastUsed: '1 day ago',
        useCount: 15,
        actions: [
          { type: 'navigate', target: '{court_url}', description: 'Navigate to court system' },
          { type: 'fill', target: '#case-number', value: '{case_id}', description: 'Enter case number' },
          { type: 'click', target: '#search', description: 'Search for case' },
          { type: 'wait', target: '.case-details', description: 'Wait for case details' },
          { type: 'extract', target: '.document-list', description: 'Extract document list' },
          { type: 'download', target: '.pdf-documents', description: 'Download all PDFs' },
          { type: 'organize', target: 'case_folder', description: 'Organize by document type' },
          { type: 'notify', target: 'team', description: 'Notify team of new documents' }
        ]
      },
      {
        id: 3,
        name: 'Legal Citation Checker',
        description: 'Verify and validate legal citations across documents',
        category: 'Validation',
        steps: 6,
        estimatedTime: '2 minutes',
        lastUsed: '3 hours ago',
        useCount: 31,
        actions: [
          { type: 'scan', target: 'document', description: 'Scan document for citations' },
          { type: 'extract', target: 'citations', description: 'Extract all legal citations' },
          { type: 'validate', target: 'citation_format', description: 'Check citation format' },
          { type: 'verify', target: 'case_existence', description: 'Verify cases exist' },
          { type: 'update', target: 'broken_links', description: 'Update broken citations' },
          { type: 'report', target: 'validation_report.pdf', description: 'Generate validation report' }
        ]
      },
      {
        id: 4,
        name: 'Client Background Check',
        description: 'Comprehensive client research and background verification',
        category: 'Investigation',
        steps: 15,
        estimatedTime: '8 minutes',
        lastUsed: '5 hours ago',
        useCount: 8,
        actions: [
          { type: 'search', target: 'public_records', description: 'Search public records' },
          { type: 'extract', target: 'criminal_history', description: 'Extract criminal history' },
          { type: 'search', target: 'civil_cases', description: 'Search civil litigation' },
          { type: 'extract', target: 'business_records', description: 'Extract business filings' },
          { type: 'search', target: 'property_records', description: 'Search property ownership' },
          { type: 'verify', target: 'identity', description: 'Verify identity information' },
          { type: 'compile', target: 'background_report', description: 'Compile comprehensive report' }
        ]
      }
    ]
    setWorkflows(legalWorkflows)
  }, [])

  const startRecording = () => {
    setIsRecording(true)
    setRecordingActions([])
    console.log('Started recording browser actions...')
  }

  const stopRecording = () => {
    setIsRecording(false)
    console.log('Stopped recording. Actions captured:', recordingActions.length)
  }

  const playWorkflow = (workflow) => {
    setIsPlaying(true)
    setSelectedWorkflow(workflow)
    console.log('Playing workflow:', workflow.name)
    
    // Simulate workflow execution
    let stepIndex = 0
    const executeStep = () => {
      if (stepIndex < workflow.actions.length) {
        console.log(`Executing step ${stepIndex + 1}:`, workflow.actions[stepIndex])
        stepIndex++
        setTimeout(executeStep, 1000) // Simulate 1 second per step
      } else {
        setIsPlaying(false)
        console.log('Workflow completed!')
      }
    }
    executeStep()
  }

  const getActionIcon = (actionType) => {
    switch (actionType) {
      case 'navigate': return <ArrowRight className="w-4 h-4 text-blue-400" />
      case 'click': return <Mouse className="w-4 h-4 text-green-400" />
      case 'fill': return <Keyboard className="w-4 h-4 text-yellow-400" />
      case 'wait': return <Clock className="w-4 h-4 text-gray-400" />
      case 'extract': return <Download className="w-4 h-4 text-purple-400" />
      case 'ai_analyze': return <Brain className="w-4 h-4 text-pink-400" />
      case 'download': return <FileText className="w-4 h-4 text-orange-400" />
      default: return <Zap className="w-4 h-4 text-cyan-400" />
    }
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Research': return 'bg-blue-500/10 text-blue-400 border-blue-500/20'
      case 'Documents': return 'bg-green-500/10 text-green-400 border-green-500/20'
      case 'Validation': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
      case 'Investigation': return 'bg-red-500/10 text-red-400 border-red-500/20'
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20'
    }
  }

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex">
      <div className="w-full max-w-6xl mx-auto bg-gray-900 border border-gray-700 rounded-xl m-4 flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Browser Automation Studio</h2>
                <p className="text-gray-400">Automate legal research and document workflows</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {isRecording ? (
                <button
                  onClick={stopRecording}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Square className="w-5 h-5" />
                  <span>Stop Recording</span>
                </button>
              ) : (
                <button
                  onClick={startRecording}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Camera className="w-5 h-5" />
                  <span>Record Actions</span>
                </button>
              )}

              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          
          {/* Workflow Library */}
          <div className="w-1/2 border-r border-gray-800 flex flex-col">
            <div className="p-4 border-b border-gray-800">
              <h3 className="text-lg font-semibold text-white mb-2">Legal Workflow Library</h3>
              <div className="flex items-center space-x-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search workflows..."
                    className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <button className="p-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                  <Plus className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-auto p-4 space-y-4">
              {workflows.map((workflow) => (
                <div
                  key={workflow.id}
                  className="bg-gray-800 border border-gray-700 rounded-xl p-4 hover:border-blue-500/50 hover:bg-gray-800/50 cursor-pointer transition-all"
                  onClick={() => setSelectedWorkflow(workflow)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-white mb-1">{workflow.name}</h4>
                      <p className="text-sm text-gray-400 mb-2">{workflow.description}</p>
                    </div>
                    <span className={`px-2 py-1 rounded border text-xs font-medium ${getCategoryColor(workflow.category)}`}>
                      {workflow.category}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4 text-gray-500">
                      <span>{workflow.steps} steps</span>
                      <span>{workflow.estimatedTime}</span>
                      <span>Used {workflow.useCount} times</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          playWorkflow(workflow)
                        }}
                        disabled={isPlaying}
                        className="flex items-center space-x-1 px-3 py-1 bg-green-600/20 text-green-400 rounded-md hover:bg-green-600/30 transition-colors disabled:opacity-50"
                      >
                        <Play className="w-3 h-3" />
                        <span>Run</span>
                      </button>
                      <button className="p-1 hover:bg-gray-700 rounded text-gray-400">
                        <Edit3 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-3 text-xs text-gray-500">
                    Last used: {workflow.lastUsed}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Workflow Details / Editor */}
          <div className="w-1/2 flex flex-col">
            {selectedWorkflow ? (
              <>
                <div className="p-4 border-b border-gray-800">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-white">{selectedWorkflow.name}</h3>
                    <div className="flex items-center space-x-2">
                      {isPlaying ? (
                        <div className="flex items-center space-x-2 px-3 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded-lg">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="text-sm">Running...</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => playWorkflow(selectedWorkflow)}
                          className="flex items-center space-x-2 px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
                        >
                          <Play className="w-4 h-4" />
                          <span>Run Workflow</span>
                        </button>
                      )}
                      <button className="p-2 hover:bg-gray-800 rounded-lg text-gray-400">
                        <Copy className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-gray-800 rounded-lg text-gray-400">
                        <Settings className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span>{selectedWorkflow.steps} steps</span>
                    <span>~{selectedWorkflow.estimatedTime}</span>
                    <span className={`px-2 py-1 rounded border text-xs ${getCategoryColor(selectedWorkflow.category)}`}>
                      {selectedWorkflow.category}
                    </span>
                  </div>
                </div>

                <div className="flex-1 overflow-auto p-4">
                  <h4 className="font-medium text-white mb-3">Workflow Steps:</h4>
                  <div className="space-y-3">
                    {selectedWorkflow.actions.map((action, index) => (
                      <div
                        key={index}
                        className={`flex items-start space-x-3 p-3 rounded-lg border transition-all ${
                          isPlaying && index === 0 
                            ? 'bg-green-500/10 border-green-500/20' 
                            : 'bg-gray-800 border-gray-700'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center text-xs font-bold text-gray-300">
                            {index + 1}
                          </div>
                          {getActionIcon(action.type)}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium text-white capitalize">{action.type.replace('_', ' ')}</span>
                            {action.target && (
                              <code className="px-2 py-1 bg-gray-700 rounded text-xs font-mono text-gray-300">
                                {action.target}
                              </code>
                            )}
                          </div>
                          <p className="text-sm text-gray-400">{action.description}</p>
                          {action.value && (
                            <div className="mt-1">
                              <span className="text-xs text-gray-500">Value: </span>
                              <code className="text-xs font-mono text-blue-400">{action.value}</code>
                            </div>
                          )}
                        </div>

                        <button className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-white">
                          <Edit3 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <Target className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h4 className="text-xl text-gray-400 mb-2">Select a Workflow</h4>
                  <p className="text-gray-500">Choose a workflow from the library to view its details and run it</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Recording Status */}
        {isRecording && (
          <div className="p-4 bg-red-600/10 border-t border-red-600/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-red-400 font-medium">Recording browser actions...</span>
                <span className="text-gray-400 text-sm">{recordingActions.length} actions captured</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setRecordingActions([])}
                  className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm text-gray-300"
                >
                  Clear
                </button>
                <button
                  onClick={stopRecording}
                  className="px-4 py-1 bg-red-600 hover:bg-red-700 rounded text-sm text-white"
                >
                  Stop & Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default BrowserAutomation