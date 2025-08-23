'use client'

import { useState, useEffect, useRef } from 'react'
import { 
  MessageSquare, Send, Search, Phone, Video, 
  Paperclip, Smile, MoreVertical, Pin, 
  Hash, Lock, Users, Bell, BellOff,
  Star, Archive, Calendar, FileText,
  Zap, Brain, AlertTriangle, CheckCircle,
  UserPlus, Settings, Filter, Download,
  Eye, EyeOff, Reply, Forward, Edit3,
  Mic, MicOff, Upload, Image, File,
  X, Plus, ChevronDown, ChevronRight
} from 'lucide-react'

const LegalMessagingHub = ({ userRole, onClose }) => {
  const [activeChannel, setActiveChannel] = useState('general')
  const [activeView, setActiveView] = useState('channels') // channels, cases, direct
  const [newMessage, setNewMessage] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const messagesEndRef = useRef(null)

  // Channels organized by type
  const channels = {
    firm: [
      { id: 'general', name: 'general', members: 47, unread: 0, type: 'public' },
      { id: 'announcements', name: 'announcements', members: 47, unread: 2, type: 'public', pinned: true },
      { id: 'random', name: 'random', members: 35, unread: 0, type: 'public' },
      { id: 'it-support', name: 'it-support', members: 12, unread: 1, type: 'public' }
    ],
    cases: [
      { id: 'johnson-v-metro', name: 'johnson-v-metro', members: 5, unread: 8, type: 'private', case: 'Johnson v. Metro Insurance', priority: 'high' },
      { id: 'davis-construction', name: 'davis-construction', members: 4, unread: 3, type: 'private', case: 'Davis Construction Liability', priority: 'medium' },
      { id: 'williams-medical', name: 'williams-medical', members: 6, unread: 0, type: 'private', case: 'Williams Medical Malpractice', priority: 'high' },
      { id: 'chen-breach', name: 'chen-breach', members: 3, unread: 12, type: 'private', case: 'Chen Contract Breach', priority: 'urgent' }
    ],
    departments: [
      { id: 'attorneys', name: 'attorneys', members: 8, unread: 2, type: 'private' },
      { id: 'paralegals', name: 'paralegals', members: 6, unread: 0, type: 'private' },
      { id: 'case-managers', name: 'case-managers', members: 4, unread: 1, type: 'private' },
      { id: 'admin-staff', name: 'admin-staff', members: 12, unread: 0, type: 'private' }
    ]
  }

  // Sample messages for active channel
  const messages = [
    {
      id: 1,
      user: 'Douglas Hicks',
      role: 'Senior Partner',
      avatar: 'DH',
      message: 'Team, we need to expedite the Johnson case. Settlement deadline is approaching fast.',
      timestamp: '9:15 AM',
      type: 'text',
      reactions: [{ emoji: '👍', count: 3, users: ['Sarah Chen', 'Michael Davis', 'Jennifer Wilson'] }],
      priority: 'high',
      caseRelated: 'Johnson v. Metro Insurance'
    },
    {
      id: 2,
      user: 'Sarah Chen',
      role: 'Senior Associate', 
      avatar: 'SC',
      message: 'I\'ve completed the discovery review. Found some key documents that strengthen our position significantly. Should I schedule a strategy meeting?',
      timestamp: '9:18 AM',
      type: 'text',
      hasAttachments: true,
      attachments: [
        { name: 'Discovery_Summary.pdf', size: '2.4 MB', type: 'pdf' },
        { name: 'Key_Evidence_Analysis.docx', size: '876 KB', type: 'doc' }
      ]
    },
    {
      id: 3,
      user: 'LEX AI Assistant',
      role: 'AI Legal Assistant',
      avatar: '🤖',
      message: '🧠 AI Analysis: Based on the new discovery documents, settlement probability increased to 89% (+12%). Recommend accepting any offer above $340K.',
      timestamp: '9:19 AM',
      type: 'ai-insight',
      aiConfidence: 94,
      suggestedActions: [
        'Schedule settlement conference',
        'Review insurance policy limits',
        'Prepare settlement authority'
      ]
    },
    {
      id: 4,
      user: 'Michael Davis',
      role: 'Paralegal',
      avatar: 'MD',
      message: 'Perfect timing! I just finished organizing all the medical records. The timeline is crystal clear now.',
      timestamp: '9:22 AM',
      type: 'text',
      reactions: [{ emoji: '💪', count: 2, users: ['Sarah Chen', 'Douglas Hicks'] }]
    },
    {
      id: 5,
      user: 'Jennifer Wilson',
      role: 'Legal Assistant',
      avatar: 'JW',
      message: '',
      timestamp: '9:25 AM',
      type: 'voice',
      voiceNote: {
        duration: '0:47',
        transcript: 'Douglas, I have Metro Insurance on line 2. They want to discuss settlement terms. Should I patch them through or schedule a conference call?'
      }
    },
    {
      id: 6,
      user: 'Douglas Hicks',
      role: 'Senior Partner',
      avatar: 'DH',
      message: '@Jennifer patch them through to my office. @Sarah join me on the call in 5 minutes. This could be it! 🎯',
      timestamp: '9:26 AM',
      type: 'text',
      mentions: ['Jennifer Wilson', 'Sarah Chen'],
      reactions: [{ emoji: '🔥', count: 4, users: ['Sarah Chen', 'Michael Davis', 'Jennifer Wilson', 'Maria Rodriguez'] }]
    }
  ]

  // Direct messages/recent conversations
  const directMessages = [
    { id: 'douglas-hicks', name: 'Douglas Hicks', role: 'Senior Partner', lastMessage: 'Great work on the settlement!', timestamp: '2m ago', unread: 0, online: true },
    { id: 'sarah-chen', name: 'Sarah Chen', role: 'Senior Associate', lastMessage: 'I\'ll have the brief ready by 3pm', timestamp: '15m ago', unread: 2, online: true },
    { id: 'michael-davis', name: 'Michael Davis', role: 'Paralegal', lastMessage: 'Documents are filed ✓', timestamp: '1h ago', unread: 0, online: false },
    { id: 'jennifer-wilson', name: 'Jennifer Wilson', role: 'Legal Assistant', lastMessage: 'Client called about scheduling', timestamp: '2h ago', unread: 1, online: true }
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = () => {
    if (newMessage.trim()) {
      // Here you would typically send to your backend
      console.log('Sending message:', newMessage)
      setNewMessage('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const formatTimestamp = (timestamp) => {
    return timestamp
  }

  const renderMessage = (msg) => {
    const isAI = msg.type === 'ai-insight'
    const isVoice = msg.type === 'voice'
    
    return (
      <div key={msg.id} className={`group flex space-x-4 p-4 hover:bg-white/5 transition-all ${isAI ? 'bg-purple-500/5 border-l-2 border-l-purple-400' : ''}`}>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
          isAI ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'bg-gray-700 text-white'
        }`}>
          {msg.avatar}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <span className="font-semibold text-white">{msg.user}</span>
            <span className="text-xs text-slate-400">{msg.role}</span>
            {msg.caseRelated && (
              <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 text-xs rounded-full">
                {msg.caseRelated}
              </span>
            )}
            {msg.priority && (
              <span className={`px-2 py-0.5 text-xs rounded-full ${
                msg.priority === 'urgent' ? 'bg-red-500/20 text-red-300' :
                msg.priority === 'high' ? 'bg-orange-500/20 text-orange-300' :
                'bg-yellow-500/20 text-yellow-300'
              }`}>
                {msg.priority}
              </span>
            )}
            <span className="text-xs text-slate-500">{msg.timestamp}</span>
          </div>
          
          {isVoice ? (
            <div className="bg-gray-800/50 rounded-xl p-3 mb-2">
              <div className="flex items-center space-x-3 mb-2">
                <button className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <Mic className="w-4 h-4 text-white" />
                </button>
                <div className="flex-1 bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full w-1/3"></div>
                </div>
                <span className="text-sm text-slate-400">{msg.voiceNote.duration}</span>
              </div>
              {msg.voiceNote.transcript && (
                <div className="text-sm text-slate-300 italic">
                  ""{msg.voiceNote.transcript}""
                </div>
              )}
            </div>
          ) : (
            <div className="text-slate-200 mb-2 break-words">
              {msg.message}
              {msg.mentions && msg.mentions.map(mention => (
                <span key={mention} className="text-blue-400">@{mention.split(' ')[0]}</span>
              ))}
            </div>
          )}

          {isAI && msg.aiConfidence && (
            <div className="bg-purple-900/30 rounded-xl p-3 mb-2 border border-purple-500/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-purple-300 text-sm font-medium">AI Confidence</span>
                <span className="text-purple-200 font-semibold">{msg.aiConfidence}%</span>
              </div>
              {msg.suggestedActions && (
                <div className="space-y-1">
                  <div className="text-xs text-purple-300 mb-1">Suggested Actions:</div>
                  {msg.suggestedActions.map((action, index) => (
                    <button key={index} className="block w-full text-left text-xs text-purple-200 hover:text-white bg-purple-800/30 hover:bg-purple-700/30 rounded px-2 py-1 transition-all">
                      • {action}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {msg.hasAttachments && msg.attachments && (
            <div className="space-y-2 mb-2">
              {msg.attachments.map((attachment, index) => (
                <div key={index} className="flex items-center space-x-3 bg-gray-800/50 rounded-lg p-2">
                  <File className="w-4 h-4 text-blue-400" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-white truncate">{attachment.name}</div>
                    <div className="text-xs text-slate-400">{attachment.size}</div>
                  </div>
                  <button className="text-blue-400 hover:text-blue-300">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
          
          {msg.reactions && (
            <div className="flex space-x-1 mb-1">
              {msg.reactions.map((reaction, index) => (
                <button key={index} className="flex items-center space-x-1 bg-gray-800/50 hover:bg-gray-700/50 rounded-full px-2 py-1 text-xs transition-all">
                  <span>{reaction.emoji}</span>
                  <span className="text-slate-400">{reaction.count}</span>
                </button>
              ))}
            </div>
          )}
        </div>
        
        <div className="opacity-0 group-hover:opacity-100 transition-all">
          <button className="p-1 text-slate-400 hover:text-white rounded">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>
    )
  }

  const renderChannelList = () => (
    <div className="space-y-6">
      {/* Firm Channels */}
      <div>
        <h3 className="text-slate-400 text-sm font-medium mb-2 px-4">FIRM CHANNELS</h3>
        <div className="space-y-1">
          {channels.firm.map(channel => (
            <button
              key={channel.id}
              onClick={() => setActiveChannel(channel.id)}
              className={`w-full flex items-center justify-between px-4 py-2 hover:bg-white/10 transition-all ${
                activeChannel === channel.id ? 'bg-blue-500/20 border-r-2 border-r-blue-400' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <Hash className="w-4 h-4 text-slate-400" />
                <span className="text-white font-medium">{channel.name}</span>
                {channel.pinned && <Pin className="w-3 h-3 text-yellow-400" />}
              </div>
              <div className="flex items-center space-x-2">
                {channel.unread > 0 && (
                  <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                    {channel.unread}
                  </span>
                )}
                <span className="text-slate-500 text-xs">{channel.members}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Case Channels */}
      <div>
        <h3 className="text-slate-400 text-sm font-medium mb-2 px-4">CASE CHANNELS</h3>
        <div className="space-y-1">
          {channels.cases.map(channel => (
            <button
              key={channel.id}
              onClick={() => setActiveChannel(channel.id)}
              className={`w-full flex items-center justify-between px-4 py-2 hover:bg-white/10 transition-all ${
                activeChannel === channel.id ? 'bg-blue-500/20 border-r-2 border-r-blue-400' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <Lock className="w-4 h-4 text-slate-400" />
                <div className="text-left">
                  <div className="text-white font-medium">{channel.name}</div>
                  <div className="text-slate-400 text-xs">{channel.case}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {channel.priority && (
                  <div className={`w-2 h-2 rounded-full ${
                    channel.priority === 'urgent' ? 'bg-red-400' :
                    channel.priority === 'high' ? 'bg-orange-400' :
                    'bg-yellow-400'
                  }`}></div>
                )}
                {channel.unread > 0 && (
                  <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                    {channel.unread}
                  </span>
                )}
                <span className="text-slate-500 text-xs">{channel.members}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Department Channels */}
      <div>
        <h3 className="text-slate-400 text-sm font-medium mb-2 px-4">DEPARTMENTS</h3>
        <div className="space-y-1">
          {channels.departments.map(channel => (
            <button
              key={channel.id}
              onClick={() => setActiveChannel(channel.id)}
              className={`w-full flex items-center justify-between px-4 py-2 hover:bg-white/10 transition-all ${
                activeChannel === channel.id ? 'bg-blue-500/20 border-r-2 border-r-blue-400' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <Users className="w-4 h-4 text-slate-400" />
                <span className="text-white font-medium">{channel.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                {channel.unread > 0 && (
                  <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                    {channel.unread}
                  </span>
                )}
                <span className="text-slate-500 text-xs">{channel.members}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  const renderDirectMessages = () => (
    <div className="space-y-1">
      <h3 className="text-slate-400 text-sm font-medium mb-4 px-4">DIRECT MESSAGES</h3>
      {directMessages.map(dm => (
        <button
          key={dm.id}
          className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-white/10 transition-all"
        >
          <div className="relative">
            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-sm font-semibold">
              {dm.name.split(' ').map(n => n[0]).join('')}
            </div>
            {dm.online && (
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-gray-900 rounded-full"></div>
            )}
          </div>
          <div className="flex-1 min-w-0 text-left">
            <div className="flex items-center justify-between">
              <span className="text-white font-medium truncate">{dm.name}</span>
              <span className="text-slate-500 text-xs">{dm.timestamp}</span>
            </div>
            <div className="text-slate-400 text-sm truncate">{dm.lastMessage}</div>
          </div>
          {dm.unread > 0 && (
            <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
              {dm.unread}
            </span>
          )}
        </button>
      ))}
    </div>
  )

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 rounded-2xl shadow-2xl w-full max-w-7xl h-[90vh] flex overflow-hidden">
        
        {/* Sidebar */}
        <div className="w-80 bg-slate-800 flex flex-col border-r border-slate-700">
          
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-700">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-bold">Legal Comm Hub</span>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-white rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search */}
          <div className="p-4 border-b border-slate-700">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search channels, messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* View Tabs */}
          <div className="flex p-2 bg-slate-750 border-b border-slate-700">
            {[
              { id: 'channels', label: 'Channels', icon: Hash },
              { id: 'direct', label: 'DMs', icon: MessageSquare }
            ].map(tab => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveView(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-lg font-medium transition-all ${
                    activeView === tab.id
                      ? 'bg-blue-500 text-white'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{tab.label}</span>
                </button>
              )
            })}
          </div>

          {/* Channel/DM List */}
          <div className="flex-1 overflow-y-auto py-4">
            {activeView === 'channels' ? renderChannelList() : renderDirectMessages()}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-700 bg-slate-850">
            <div className="flex items-center space-x-3">
              <Hash className="w-5 h-5 text-slate-400" />
              <div>
                <h2 className="text-white font-semibold">{activeChannel}</h2>
                <p className="text-slate-400 text-sm">
                  {channels.cases.find(c => c.id === activeChannel)?.case || 
                   'General firm communications'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg">
                <Phone className="w-5 h-5" />
              </button>
              <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg">
                <Video className="w-5 h-5" />
              </button>
              <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg">
                <UserPlus className="w-5 h-5" />
              </button>
              <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto">
            {messages.map(renderMessage)}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-slate-700 bg-slate-850">
            <div className="flex items-end space-x-3">
              <div className="flex-1">
                <div className="relative">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={`Message #${activeChannel}...`}
                    className="w-full px-4 py-3 pr-16 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none max-h-32"
                    rows="1"
                  />
                  <div className="absolute right-2 bottom-2 flex items-center space-x-1">
                    <button className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-600 rounded-lg">
                      <Paperclip className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-600 rounded-lg"
                    >
                      <Smile className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setIsRecording(!isRecording)}
                      className={`p-1.5 rounded-lg ${
                        isRecording 
                          ? 'text-red-400 bg-red-500/20 animate-pulse' 
                          : 'text-slate-400 hover:text-white hover:bg-slate-600'
                      }`}
                    >
                      {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
              <button
                onClick={sendMessage}
                disabled={!newMessage.trim()}
                className="p-3 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white rounded-xl transition-all"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LegalMessagingHub