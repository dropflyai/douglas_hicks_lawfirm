'use client'

import { useState, useEffect, useRef } from 'react'
import {
  Users, MessageSquare, Video, Mic, MicOff, VideoOff, Phone,
  Screen, Hand, Coffee, Clock, Bell, Settings, ChevronDown,
  User, Crown, Shield, Star, Activity, Zap, Send, Smile,
  Paperclip, MoreHorizontal, Volume2, VolumeX, X, Plus,
  Edit3, Eye, Cursor, Highlight, PenTool, Type
} from 'lucide-react'

const CollaborationHub = ({ document, isActive, onToggle, userRole }) => {
  const [collaborators, setCollaborators] = useState([])
  const [activeUsers, setActiveUsers] = useState([])
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [showChat, setShowChat] = useState(true)
  const [showVideo, setShowVideo] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(false)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [cursorPositions, setCursorPositions] = useState({})
  const [liveAnnotations, setLiveAnnotations] = useState({})
  const [notifications, setNotifications] = useState([])

  const chatRef = useRef(null)

  // Sample collaborators and active users
  useEffect(() => {
    const sampleCollaborators = [
      {
        id: 1,
        name: 'Carl Douglas',
        role: 'Senior Partner',
        avatar: '/avatars/carl.jpg',
        status: 'active',
        lastSeen: new Date().toISOString(),
        permissions: ['view', 'edit', 'comment', 'approve'],
        isCurrentUser: userRole?.name === 'Carl Douglas',
        activity: 'Reviewing section 3',
        cursor: { x: 245, y: 320, color: '#3b82f6' },
        tool: 'highlight'
      },
      {
        id: 2,
        name: 'Sarah Johnson',
        role: 'Case Manager',
        avatar: '/avatars/sarah.jpg',
        status: 'active',
        lastSeen: new Date(Date.now() - 2 * 60000).toISOString(),
        permissions: ['view', 'edit', 'comment'],
        isCurrentUser: userRole?.name === 'Sarah Johnson',
        activity: 'Adding annotations',
        cursor: { x: 180, y: 450, color: '#10b981' },
        tool: 'comment'
      },
      {
        id: 3,
        name: 'Michael Chen',
        role: 'Paralegal',
        avatar: '/avatars/michael.jpg',
        status: 'idle',
        lastSeen: new Date(Date.now() - 5 * 60000).toISOString(),
        permissions: ['view', 'comment'],
        isCurrentUser: userRole?.name === 'Michael Chen',
        activity: 'Research verification',
        cursor: { x: 320, y: 200, color: '#f59e0b' },
        tool: 'text'
      },
      {
        id: 4,
        name: 'Jamon Hicks',
        role: 'Partner',
        avatar: '/avatars/jamon.jpg',
        status: 'away',
        lastSeen: new Date(Date.now() - 15 * 60000).toISOString(),
        permissions: ['view', 'edit', 'comment', 'approve'],
        isCurrentUser: userRole?.name === 'Jamon Hicks',
        activity: 'In client meeting',
        cursor: { x: 400, y: 300, color: '#8b5cf6' },
        tool: 'pointer'
      },
      {
        id: 5,
        name: 'Jennifer Davis',
        role: 'Legal Assistant',
        avatar: '/avatars/jennifer.jpg',
        status: 'busy',
        lastSeen: new Date(Date.now() - 1 * 60000).toISOString(),
        permissions: ['view', 'comment'],
        isCurrentUser: userRole?.name === 'Jennifer Davis',
        activity: 'Document formatting',
        cursor: { x: 220, y: 380, color: '#ef4444' },
        tool: 'edit'
      }
    ]

    const sampleMessages = [
      {
        id: 1,
        user: 'Carl Douglas',
        avatar: '/avatars/carl.jpg',
        message: 'Team, please focus on the settlement terms in section 3. We need this finalized today.',
        timestamp: new Date(Date.now() - 10 * 60000).toISOString(),
        type: 'message',
        priority: 'high'
      },
      {
        id: 2,
        user: 'Sarah Johnson',
        avatar: '/avatars/sarah.jpg',
        message: 'I\'ve added annotations highlighting the key changes from the previous version.',
        timestamp: new Date(Date.now() - 8 * 60000).toISOString(),
        type: 'message',
        attachments: ['Settlement_Changes_v1.3.pdf']
      },
      {
        id: 3,
        user: 'System',
        avatar: '/avatars/system.png',
        message: 'Document was automatically saved. Version 1.3 created.',
        timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
        type: 'system'
      },
      {
        id: 4,
        user: 'Michael Chen',
        avatar: '/avatars/michael.jpg',
        message: '@Carl The medical records reference on page 2 needs verification. Should I cross-check with our case files?',
        timestamp: new Date(Date.now() - 3 * 60000).toISOString(),
        type: 'mention',
        mentions: ['Carl Douglas']
      }
    ]

    setCollaborators(sampleCollaborators)
    setActiveUsers(sampleCollaborators.filter(c => c.status === 'active'))
    setMessages(sampleMessages)
  }, [userRole])

  // Simulate real-time cursor movements
  useEffect(() => {
    if (!isActive) return

    const interval = setInterval(() => {
      setCollaborators(prev => prev.map(collaborator => {
        if (collaborator.isCurrentUser || collaborator.status !== 'active') return collaborator
        
        // Simulate random cursor movement
        const newX = Math.max(50, Math.min(750, collaborator.cursor.x + (Math.random() - 0.5) * 20))
        const newY = Math.max(50, Math.min(950, collaborator.cursor.y + (Math.random() - 0.5) * 20))
        
        return {
          ...collaborator,
          cursor: { ...collaborator.cursor, x: newX, y: newY }
        }
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [isActive])

  // Auto scroll chat to bottom
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [messages])

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-400'
      case 'idle': return 'bg-yellow-400'
      case 'away': return 'bg-orange-400'
      case 'busy': return 'bg-red-400'
      default: return 'bg-gray-400'
    }
  }

  const getToolIcon = (tool) => {
    switch (tool) {
      case 'highlight': return Highlight
      case 'comment': return MessageSquare
      case 'text': return Type
      case 'edit': return Edit3
      case 'pointer': return Cursor
      default: return Eye
    }
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message = {
      id: Date.now(),
      user: userRole?.name || 'Current User',
      avatar: '/avatars/user.jpg',
      message: newMessage,
      timestamp: new Date().toISOString(),
      type: 'message'
    }

    setMessages([...messages, message])
    setNewMessage('')
  }

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  const getLastSeen = (timestamp) => {
    const diff = Date.now() - new Date(timestamp).getTime()
    const minutes = Math.floor(diff / 60000)
    
    if (minutes < 1) return 'now'
    if (minutes < 60) return `${minutes}m ago`
    return `${Math.floor(minutes / 60)}h ago`
  }

  if (!isActive) {
    return (
      <div className="fixed bottom-6 left-20 z-40">
        <button
          onClick={onToggle}
          className="flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl shadow-lg hover:from-purple-500 hover:to-blue-500 transition-all"
        >
          <Users className="w-5 h-5 text-white" />
          <span className="text-white font-medium">Collaboration ({activeUsers.length})</span>
          <div className="flex -space-x-1">
            {activeUsers.slice(0, 3).map((user) => (
              <div key={user.id} className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 border-2 border-white flex items-center justify-center">
                <User className="w-3 h-3 text-white" />
              </div>
            ))}
            {activeUsers.length > 3 && (
              <div className="w-6 h-6 rounded-full bg-gray-700 border-2 border-white flex items-center justify-center text-xs text-white">
                +{activeUsers.length - 3}
              </div>
            )}
          </div>
        </button>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex">
      {/* Live Cursors Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {collaborators
          .filter(c => !c.isCurrentUser && c.status === 'active')
          .map((collaborator) => {
            const ToolIcon = getToolIcon(collaborator.tool)
            return (
              <div
                key={collaborator.id}
                className="absolute transition-all duration-200 pointer-events-none"
                style={{
                  left: collaborator.cursor.x,
                  top: collaborator.cursor.y,
                  zIndex: 1000
                }}
              >
                <div className="relative">
                  <svg width="24" height="24" viewBox="0 0 24 24" className="drop-shadow-lg">
                    <path
                      d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
                      fill={collaborator.cursor.color}
                      stroke="white"
                      strokeWidth="1"
                    />
                  </svg>
                  
                  <div 
                    className="absolute left-6 -top-1 px-2 py-1 rounded-md text-xs font-medium text-white shadow-lg whitespace-nowrap"
                    style={{ backgroundColor: collaborator.cursor.color }}
                  >
                    <div className="flex items-center space-x-1">
                      <ToolIcon className="w-3 h-3" />
                      <span>{collaborator.name}</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
      </div>

      {/* Main Collaboration Panel */}
      <div className="w-full max-w-5xl mx-auto bg-gray-900 border border-gray-700 rounded-xl m-4 flex">
        
        {/* Collaborators Sidebar */}
        <div className="w-80 border-r border-gray-800 flex flex-col">
          
          {/* Header */}
          <div className="p-4 border-b border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Live Collaboration</h3>
              <button
                onClick={onToggle}
                className="text-gray-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Video Controls */}
            <div className="flex items-center space-x-2 mb-4">
              <button
                onClick={() => setShowVideo(!showVideo)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                  showVideo ? 'bg-green-600' : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                <Video className="w-4 h-4" />
                <span className="text-sm">Video</span>
              </button>
              
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`p-2 rounded-lg transition-all ${
                  isMuted ? 'bg-red-600' : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>
              
              <button
                onClick={() => setIsScreenSharing(!isScreenSharing)}
                className={`p-2 rounded-lg transition-all ${
                  isScreenSharing ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                <Screen className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Active Collaborators */}
          <div className="flex-1 overflow-auto p-4">
            <h4 className="text-sm font-medium text-gray-400 mb-3">
              Active Now ({activeUsers.length})
            </h4>
            
            <div className="space-y-3 mb-6">
              {collaborators.map((collaborator) => (
                <div
                  key={collaborator.id}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(collaborator.status)} rounded-full border-2 border-gray-900`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-white text-sm truncate">
                        {collaborator.name}
                      </span>
                      {collaborator.isCurrentUser && (
                        <span className="text-xs text-blue-400">(You)</span>
                      )}
                      {collaborator.role === 'Senior Partner' && (
                        <Crown className="w-3 h-3 text-yellow-400" />
                      )}
                    </div>
                    <div className="text-xs text-gray-400 truncate">{collaborator.role}</div>
                    <div className="text-xs text-gray-500 truncate">{collaborator.activity}</div>
                  </div>
                  
                  <div className="flex flex-col items-end">
                    <div className="text-xs text-gray-500">
                      {getLastSeen(collaborator.lastSeen)}
                    </div>
                    {collaborator.status === 'active' && (
                      <div className="flex items-center space-x-1 mt-1">
                        <div 
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: collaborator.cursor.color }}
                        />
                        <div className="text-xs text-gray-400">
                          {getToolIcon(collaborator.tool)?.name || collaborator.tool}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Permissions Summary */}
            <div className="bg-gray-800 rounded-lg p-3">
              <h5 className="text-sm font-medium text-white mb-2">Document Permissions</h5>
              <div className="space-y-1 text-xs">
                <div className="flex items-center space-x-2">
                  <Eye className="w-3 h-3 text-blue-400" />
                  <span className="text-gray-400">All team members can view</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Edit3 className="w-3 h-3 text-green-400" />
                  <span className="text-gray-400">Partners & managers can edit</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-3 h-3 text-red-400" />
                  <span className="text-gray-400">Attorney-client privilege enforced</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <MessageSquare className="w-6 h-6 text-blue-400" />
                <div>
                  <h4 className="font-semibold text-white">Team Chat</h4>
                  <p className="text-sm text-gray-400">
                    {document?.name || 'Document Discussion'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-gray-800 rounded-lg text-gray-400">
                  <Bell className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-gray-800 rounded-lg text-gray-400">
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div ref={chatRef} className="flex-1 overflow-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex space-x-3 ${
                message.type === 'system' ? 'justify-center' : ''
              }`}>
                
                {message.type !== 'system' && (
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  </div>
                )}

                <div className={`flex-1 ${message.type === 'system' ? 'max-w-md' : ''}`}>
                  {message.type === 'system' ? (
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 text-center">
                      <div className="flex items-center justify-center space-x-2 text-blue-400 text-sm">
                        <Activity className="w-4 h-4" />
                        <span>{message.message}</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {formatTime(message.timestamp)}
                      </div>
                    </div>
                  ) : (
                    <div className={`${
                      message.type === 'mention' ? 'bg-yellow-500/10 border border-yellow-500/20' : 'bg-gray-800'
                    } rounded-lg p-3`}>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-white text-sm">{message.user}</span>
                        <span className="text-xs text-gray-500">
                          {formatTime(message.timestamp)}
                        </span>
                        {message.priority === 'high' && (
                          <div className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs">
                            HIGH PRIORITY
                          </div>
                        )}
                      </div>
                      
                      <p className="text-gray-300 text-sm">{message.message}</p>
                      
                      {message.attachments && (
                        <div className="mt-2 space-y-1">
                          {message.attachments.map((attachment, idx) => (
                            <div key={idx} className="flex items-center space-x-2 p-2 bg-gray-700 rounded text-xs">
                              <Paperclip className="w-3 h-3 text-gray-400" />
                              <span className="text-gray-300">{attachment}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-800">
            <div className="flex items-center space-x-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type a message..."
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                />
              </div>
              
              <button className="p-2 hover:bg-gray-800 rounded-lg text-gray-400">
                <Paperclip className="w-5 h-5" />
              </button>
              
              <button className="p-2 hover:bg-gray-800 rounded-lg text-gray-400">
                <Smile className="w-5 h-5" />
              </button>
              
              <button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CollaborationHub