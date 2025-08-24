'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import {
  Highlight, Pen, Eraser, MousePointer, Square, Circle, Type,
  Undo, Redo, ZoomIn, ZoomOut, RotateCw, Save, MessageSquare,
  Users, Clock, Eye, EyeOff, Layers, Settings, Download,
  ChevronLeft, ChevronRight, Menu, X, Plus, Trash2, Edit3,
  Check, AlertTriangle, Shield, Lock, User, Star, Flag
} from 'lucide-react'

const DocumentViewer = ({ document, onClose, userRole, collaborators = [] }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages] = useState(document?.pages || 15) // Simulated page count
  const [zoomLevel, setZoomLevel] = useState(100)
  const [selectedTool, setSelectedTool] = useState('pointer')
  const [annotations, setAnnotations] = useState([])
  const [comments, setComments] = useState([])
  const [isDrawing, setIsDrawing] = useState(false)
  const [showAnnotations, setShowAnnotations] = useState(true)
  const [showComments, setShowComments] = useState(true)
  const [showCollaborators, setShowCollaborators] = useState(false)
  const [newComment, setNewComment] = useState('')
  const [selectedAnnotation, setSelectedAnnotation] = useState(null)
  const [undoStack, setUndoStack] = useState([])
  const [redoStack, setRedoStack] = useState([])
  
  const canvasRef = useRef(null)
  const documentRef = useRef(null)
  const [canvasContext, setCanvasContext] = useState(null)

  // Initialize canvas
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      setCanvasContext(ctx)
      
      // Set canvas size
      canvas.width = 800
      canvas.height = 1000
      
      // Set default styles
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.lineWidth = 2
    }
  }, [document])

  // Sample annotations and comments
  useEffect(() => {
    const sampleAnnotations = [
      {
        id: 1,
        type: 'highlight',
        x: 120,
        y: 200,
        width: 200,
        height: 20,
        color: '#ffff00',
        opacity: 0.3,
        page: 1,
        author: 'Carl Douglas',
        timestamp: '2024-08-23T14:30:00',
        content: 'Key evidence point'
      },
      {
        id: 2,
        type: 'comment',
        x: 350,
        y: 300,
        page: 1,
        author: 'Sarah Johnson',
        timestamp: '2024-08-23T15:45:00',
        content: 'Need to verify this claim with client',
        replies: [
          {
            author: 'Michael Chen',
            content: 'I can help with the research on this',
            timestamp: '2024-08-23T16:00:00'
          }
        ]
      },
      {
        id: 3,
        type: 'rectangle',
        x: 100,
        y: 450,
        width: 300,
        height: 100,
        stroke: '#ff0000',
        strokeWidth: 2,
        fill: 'transparent',
        page: 1,
        author: 'Jamon Hicks',
        timestamp: '2024-08-23T16:15:00',
        content: 'Important contract clause'
      }
    ]

    const sampleComments = [
      {
        id: 1,
        author: 'Carl Douglas',
        avatar: '/avatars/carl.jpg',
        timestamp: '2024-08-23T14:30:00',
        content: 'This document needs priority review. The defendant\'s response deadline is approaching.',
        page: 1,
        resolved: false,
        replies: [
          {
            author: 'Sarah Johnson',
            content: 'I\'ll review the response timeline and prepare our counter-arguments.',
            timestamp: '2024-08-23T14:45:00'
          }
        ]
      },
      {
        id: 2,
        author: 'Jennifer Davis',
        avatar: '/avatars/jennifer.jpg',
        timestamp: '2024-08-23T15:20:00',
        content: 'Found inconsistency in dates on page 3. Need to cross-reference with medical records.',
        page: 3,
        resolved: true,
        replies: []
      }
    ]

    setAnnotations(sampleAnnotations)
    setComments(sampleComments)
  }, [document])

  const tools = [
    { id: 'pointer', icon: MousePointer, label: 'Select', color: 'text-gray-400' },
    { id: 'highlight', icon: Highlight, label: 'Highlight', color: 'text-yellow-400' },
    { id: 'pen', icon: Pen, label: 'Pen', color: 'text-blue-400' },
    { id: 'rectangle', icon: Square, label: 'Rectangle', color: 'text-red-400' },
    { id: 'circle', icon: Circle, label: 'Circle', color: 'text-green-400' },
    { id: 'text', icon: Type, label: 'Text', color: 'text-purple-400' },
    { id: 'comment', icon: MessageSquare, label: 'Comment', color: 'text-orange-400' },
    { id: 'eraser', icon: Eraser, label: 'Eraser', color: 'text-red-500' }
  ]

  const handleToolSelect = (toolId) => {
    setSelectedTool(toolId)
    setSelectedAnnotation(null)
  }

  const handleCanvasClick = useCallback((event) => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    if (selectedTool === 'comment') {
      // Create new comment
      const newCommentObj = {
        id: Date.now(),
        author: userRole?.name || 'Current User',
        avatar: '/avatars/user.jpg',
        timestamp: new Date().toISOString(),
        content: 'New comment...',
        page: currentPage,
        x: x,
        y: y,
        resolved: false,
        replies: [],
        editing: true
      }
      setComments([...comments, newCommentObj])
    } else if (selectedTool === 'highlight') {
      // Start highlighting
      setIsDrawing(true)
    }
  }, [selectedTool, comments, currentPage, userRole])

  const handleZoom = (direction) => {
    const newZoom = direction === 'in' 
      ? Math.min(zoomLevel + 25, 200)
      : Math.max(zoomLevel - 25, 50)
    setZoomLevel(newZoom)
  }

  const handleSave = () => {
    // Save annotations and comments
    console.log('Saving document annotations:', { annotations, comments })
    // Here you would send to your backend API
  }

  const handleUndo = () => {
    if (undoStack.length > 0) {
      const lastState = undoStack[undoStack.length - 1]
      setRedoStack([...redoStack, { annotations, comments }])
      setAnnotations(lastState.annotations)
      setComments(lastState.comments)
      setUndoStack(undoStack.slice(0, -1))
    }
  }

  const handleRedo = () => {
    if (redoStack.length > 0) {
      const nextState = redoStack[redoStack.length - 1]
      setUndoStack([...undoStack, { annotations, comments }])
      setAnnotations(nextState.annotations)
      setComments(nextState.comments)
      setRedoStack(redoStack.slice(0, -1))
    }
  }

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleString()
  }

  const getConfidentialityBadge = (level) => {
    const colors = {
      'attorney-client': 'bg-red-500/10 text-red-400 border-red-500/20',
      'privileged': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
      'work-product': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
      'confidential': 'bg-blue-500/10 text-blue-400 border-blue-500/20'
    }
    return colors[level] || colors['confidential']
  }

  return (
    <div className="fixed inset-0 bg-black text-white z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-gray-900">
        <div className="flex items-center space-x-4">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-lg">{document?.name || 'Document Viewer'}</h2>
              <div className="flex items-center space-x-3 text-sm text-gray-400">
                <span>{document?.author}</span>
                <span>•</span>
                <span>Page {currentPage} of {totalPages}</span>
                <span>•</span>
                <span className={`px-2 py-1 rounded border text-xs ${getConfidentialityBadge(document?.confidentiality)}`}>
                  <Lock className="w-3 h-3 inline mr-1" />
                  {document?.confidentiality || 'Confidential'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Zoom Controls */}
          <div className="flex items-center space-x-1 bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => handleZoom('out')}
              className="p-2 hover:bg-gray-700 rounded-md transition-colors"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="px-3 text-sm font-medium">{zoomLevel}%</span>
            <button
              onClick={() => handleZoom('in')}
              className="p-2 hover:bg-gray-700 rounded-md transition-colors"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

          {/* Action Buttons */}
          <button
            onClick={handleUndo}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            disabled={undoStack.length === 0}
          >
            <Undo className="w-5 h-5" />
          </button>
          <button
            onClick={handleRedo}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            disabled={redoStack.length === 0}
          >
            <Redo className="w-5 h-5" />
          </button>

          <div className="w-px h-6 bg-gray-700" />

          <button
            onClick={handleSave}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 rounded-lg hover:from-green-500 hover:to-green-600 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save</span>
          </button>

          <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <Download className="w-5 h-5" />
          </button>

          <button
            onClick={() => setShowCollaborators(!showCollaborators)}
            className="flex items-center space-x-2 p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <Users className="w-5 h-5" />
            <span className="text-sm">{collaborators.length}</span>
          </button>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Toolbar */}
        <div className="w-16 bg-gray-900 border-r border-gray-800 flex flex-col items-center py-4 space-y-2">
          {tools.map((tool) => {
            const Icon = tool.icon
            return (
              <button
                key={tool.id}
                onClick={() => handleToolSelect(tool.id)}
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                  selectedTool === tool.id
                    ? 'bg-blue-600 shadow-lg shadow-blue-600/25'
                    : 'hover:bg-gray-800'
                }`}
                title={tool.label}
              >
                <Icon className={`w-6 h-6 ${selectedTool === tool.id ? 'text-white' : tool.color}`} />
              </button>
            )
          })}
        </div>

        {/* Main Document Area */}
        <div className="flex-1 flex">
          {/* Document Viewer */}
          <div className="flex-1 bg-gray-800 overflow-auto relative">
            <div className="p-8">
              {/* Page Navigation */}
              <div className="flex items-center justify-center mb-6 space-x-4">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    value={currentPage}
                    onChange={(e) => {
                      const page = parseInt(e.target.value)
                      if (page >= 1 && page <= totalPages) {
                        setCurrentPage(page)
                      }
                    }}
                    className="w-16 px-2 py-1 bg-gray-700 border border-gray-600 rounded text-center"
                    min="1"
                    max={totalPages}
                  />
                  <span className="text-gray-400">of {totalPages}</span>
                </div>

                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Document Canvas */}
              <div 
                className="relative mx-auto bg-white shadow-2xl"
                style={{ 
                  width: `${800 * (zoomLevel / 100)}px`,
                  height: `${1000 * (zoomLevel / 100)}px`
                }}
              >
                {/* Simulated Document Content */}
                <div className="absolute inset-0 p-8 text-black text-sm leading-relaxed">
                  <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold mb-2">LEGAL DOCUMENT</h1>
                    <p className="text-gray-600">Case No: 2024-CV-001234</p>
                  </div>
                  
                  <div className="space-y-4">
                    <p>
                      WHEREAS, the parties hereto desire to set forth their agreement regarding the settlement
                      of all claims arising from the incident that occurred on March 15, 2024, involving
                      the collision between vehicles operated by the parties;
                    </p>
                    <p>
                      NOW, THEREFORE, in consideration of the mutual covenants and agreements contained
                      herein, and for other good and valuable consideration, the receipt and sufficiency
                      of which are hereby acknowledged, the parties agree as follows:
                    </p>
                    <p>
                      1. <strong>SETTLEMENT AMOUNT:</strong> Defendant agrees to pay Plaintiff the sum of
                      Three Hundred Forty Thousand Dollars ($340,000.00) in full settlement of all claims
                      arising from the aforementioned incident.
                    </p>
                    <p>
                      2. <strong>RELEASE:</strong> Upon payment of the settlement amount, Plaintiff hereby
                      releases and forever discharges Defendant from any and all claims, demands, damages,
                      actions, causes of action, suits, debts, sums of money, accounts, bonds, bills,
                      specialties, covenants, contracts, controversies, agreements, promises, variances,
                      trespasses, damages, judgments, extents, executions, claims and demands whatsoever.
                    </p>
                  </div>
                </div>

                {/* Annotation Canvas */}
                <canvas
                  ref={canvasRef}
                  onClick={handleCanvasClick}
                  className="absolute inset-0 pointer-events-auto cursor-crosshair"
                  style={{ 
                    width: '100%',
                    height: '100%',
                    opacity: showAnnotations ? 1 : 0
                  }}
                />

                {/* Annotation Overlays */}
                {showAnnotations && annotations
                  .filter(ann => ann.page === currentPage)
                  .map((annotation) => (
                    <div
                      key={annotation.id}
                      className={`absolute border-2 ${
                        selectedAnnotation === annotation.id ? 'border-blue-500' : 'border-transparent'
                      }`}
                      style={{
                        left: `${annotation.x * (zoomLevel / 100)}px`,
                        top: `${annotation.y * (zoomLevel / 100)}px`,
                        width: annotation.width ? `${annotation.width * (zoomLevel / 100)}px` : '200px',
                        height: annotation.height ? `${annotation.height * (zoomLevel / 100)}px` : '20px',
                        backgroundColor: annotation.type === 'highlight' ? annotation.color : 'transparent',
                        opacity: annotation.opacity || 1
                      }}
                      onClick={() => setSelectedAnnotation(annotation.id)}
                    >
                      {annotation.type === 'comment' && (
                        <div className="absolute -top-2 -left-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
                          <MessageSquare className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Comments Sidebar */}
          <div className="w-80 bg-gray-900 border-l border-gray-800 flex flex-col">
            <div className="p-4 border-b border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">Comments & Notes</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowAnnotations(!showAnnotations)}
                    className={`p-2 rounded-lg transition-colors ${
                      showAnnotations ? 'bg-blue-600' : 'bg-gray-800 hover:bg-gray-700'
                    }`}
                    title="Toggle Annotations"
                  >
                    <Layers className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setShowComments(!showComments)}
                    className={`p-2 rounded-lg transition-colors ${
                      showComments ? 'bg-blue-600' : 'bg-gray-800 hover:bg-gray-700'
                    }`}
                    title="Toggle Comments"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Add Comment Input */}
              <div className="space-y-2">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg resize-none text-sm focus:border-blue-500 focus:outline-none"
                  rows="2"
                />
                <button
                  onClick={() => {
                    if (newComment.trim()) {
                      const comment = {
                        id: Date.now(),
                        author: userRole?.name || 'Current User',
                        avatar: '/avatars/user.jpg',
                        timestamp: new Date().toISOString(),
                        content: newComment,
                        page: currentPage,
                        resolved: false,
                        replies: []
                      }
                      setComments([...comments, comment])
                      setNewComment('')
                    }
                  }}
                  disabled={!newComment.trim()}
                  className="w-full px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add Comment
                </button>
              </div>
            </div>

            {/* Comments List */}
            <div className="flex-1 overflow-auto p-4 space-y-4">
              {comments
                .filter(comment => showComments)
                .map((comment) => (
                  <div key={comment.id} className="bg-gray-800 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-sm">{comment.author}</span>
                          <span className="text-xs text-gray-400">
                            Page {comment.page}
                          </span>
                        </div>
                        <p className="text-sm text-gray-300 mb-2">{comment.content}</p>
                        <div className="flex items-center justify-between text-xs text-gray-400">
                          <span>{formatTime(comment.timestamp)}</span>
                          <div className="flex items-center space-x-2">
                            {comment.resolved ? (
                              <span className="flex items-center space-x-1 text-green-400">
                                <Check className="w-3 h-3" />
                                <span>Resolved</span>
                              </span>
                            ) : (
                              <button className="text-blue-400 hover:text-blue-300">
                                Reply
                              </button>
                            )}
                          </div>
                        </div>
                        
                        {/* Replies */}
                        {comment.replies && comment.replies.length > 0 && (
                          <div className="mt-3 space-y-2 pl-4 border-l-2 border-gray-700">
                            {comment.replies.map((reply, idx) => (
                              <div key={idx} className="text-sm">
                                <div className="flex items-center space-x-2 mb-1">
                                  <span className="font-medium">{reply.author}</span>
                                  <span className="text-xs text-gray-400">
                                    {formatTime(reply.timestamp)}
                                  </span>
                                </div>
                                <p className="text-gray-300">{reply.content}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Collaborators Panel */}
      {showCollaborators && (
        <div className="absolute top-20 right-4 w-64 bg-gray-900 border border-gray-700 rounded-xl shadow-xl p-4 z-10">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold">Active Collaborators</h4>
            <button
              onClick={() => setShowCollaborators(false)}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-3">
            {['Carl Douglas', 'Sarah Johnson', 'Michael Chen'].map((name, idx) => (
              <div key={idx} className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm">{name}</div>
                  <div className="text-xs text-gray-400">Currently viewing</div>
                </div>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default DocumentViewer