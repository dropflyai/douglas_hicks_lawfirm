'use client'

import { useState, useEffect, useRef } from 'react'
import { 
  MessageCircle, 
  Send, 
  Users, 
  Phone, 
  Video, 
  Search, 
  Plus, 
  Hash, 
  Lock, 
  Star,
  Paperclip,
  Smile,
  MoreVertical,
  UserPlus,
  Settings,
  Crown,
  Scale,
  Clock,
  CheckCircle2,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  VideoIcon,
  VideoOff
} from 'lucide-react'

export default function AttorneyMessaging({ attorneyData }) {
  const [selectedChannel, setSelectedChannel] = useState('general')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState({})
  const [onlineAttorneys, setOnlineAttorneys] = useState([])
  const [isTyping, setIsTyping] = useState({})
  const [newChannelName, setNewChannelName] = useState('')
  const [showNewChannel, setShowNewChannel] = useState(false)
  const [activeCall, setActiveCall] = useState(null)
  const [isMuted, setIsMuted] = useState(false)
  const [videoEnabled, setVideoEnabled] = useState(false)
  const messagesEndRef = useRef(null)
  const [superCodeEnabled, setSuperCodeEnabled] = useState(false)

  // Sample data - in real app, this would come from your database
  const channels = [
    { 
      id: 'general', 
      name: 'General Discussion', 
      type: 'public', 
      members: 8, 
      unread: 0,
      lastActivity: '2 mins ago',
      description: 'General firm announcements and discussion'
    },
    { 
      id: 'gm-case', 
      name: 'GM Product Liability', 
      type: 'case', 
      members: 4, 
      unread: 3,
      lastActivity: '5 mins ago',
      caseValue: '$4.9B',
      priority: 'high',
      description: 'Anderson v. General Motors case discussion'
    },
    { 
      id: 'police-brutality', 
      name: 'LA Sheriff Cases', 
      type: 'case', 
      members: 6, 
      unread: 1,
      lastActivity: '1 hour ago',
      caseValue: '$8M',
      priority: 'high',
      description: 'Civil rights cases against LASD'
    },
    { 
      id: 'personal-injury', 
      name: 'Personal Injury Team', 
      type: 'practice', 
      members: 12, 
      unread: 0,
      lastActivity: '3 hours ago',
      description: 'Personal injury practice area discussions'
    },
    { 
      id: 'partners-only', 
      name: 'Partners Only', 
      type: 'private', 
      members: 3, 
      unread: 0,
      lastActivity: '1 day ago',
      description: 'Private partner discussions'
    }
  ]

  const sampleMessages = {
    'general': [
      {
        id: 1,
        user: 'Douglas Hicks',
        avatar: '👨‍💼',
        message: 'Great work everyone on the settlements this week. Team meeting at 3 PM.',
        timestamp: '10:30 AM',
        type: 'text',
        isPartner: true
      },
      {
        id: 2,
        user: 'Jamon R. Hicks',
        avatar: '⚖️',
        message: 'The Cedars-Sinai case documentation is ready for review.',
        timestamp: '10:45 AM',
        type: 'text',
        isPartner: true
      },
      {
        id: 3,
        user: 'Carl E. Douglas',
        avatar: '👑',
        message: 'Excellent news on the GM precedent! This opens up several new strategies.',
        timestamp: '11:15 AM',
        type: 'text',
        isPartner: true,
        isCurrentUser: true
      }
    ],
    'gm-case': [
      {
        id: 1,
        user: 'Carl E. Douglas',
        avatar: '👑',
        message: 'The $4.9B verdict continues to set precedent. We have 3 similar cases in pipeline.',
        timestamp: '9:00 AM',
        type: 'text',
        isPartner: true,
        isCurrentUser: true
      },
      {
        id: 2,
        user: 'SuperCode AI',
        avatar: '🤖',
        message: 'Found 12 similar product liability cases with design defect patterns. Average settlement: $2.8M.',
        timestamp: '9:05 AM',
        type: 'ai-analysis',
        aiData: {
          caseCount: 12,
          averageSettlement: '$2.8M',
          successRate: '87%',
          keyFactors: ['Design defect', 'Corporate knowledge', 'Safety negligence']
        }
      },
      {
        id: 3,
        user: 'A\'ja Simplis',
        avatar: '👩‍💼',
        message: 'Expert witness lined up for the Chen case. Dr. Martinez available for deposition.',
        timestamp: '9:30 AM',
        type: 'text'
      }
    ]
  }

  useEffect(() => {
    // Initialize messages
    setMessages(sampleMessages)
    
    // Simulate online attorneys
    setOnlineAttorneys([
      { name: 'Douglas Hicks', status: 'available', avatar: '👨‍💼', role: 'Managing Partner' },
      { name: 'Jamon R. Hicks', status: 'busy', avatar: '⚖️', role: 'Partner' },
      { name: 'A\'ja Simplis', status: 'available', avatar: '👩‍💼', role: 'Associate' },
      { name: 'Kristen DeVezin', status: 'away', avatar: '👩‍⚖️', role: 'Associate' },
      { name: 'Bianca Perez', status: 'available', avatar: '👩‍💻', role: 'Legal Assistant' }
    ])

    // Auto-scroll to bottom
    scrollToBottom()
  }, [selectedChannel])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const sendMessage = async () => {
    if (!message.trim()) return

    const newMessage = {
      id: Date.now(),
      user: attorneyData.name,
      avatar: '👑',
      message: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text',
      isCurrentUser: true,
      isPartner: true
    }

    setMessages(prev => ({
      ...prev,
      [selectedChannel]: [...(prev[selectedChannel] || []), newMessage]
    }))

    setMessage('')

    // If SuperCode is enabled, get AI analysis
    if (superCodeEnabled && message.toLowerCase().includes('case') || message.toLowerCase().includes('precedent')) {
      setTimeout(() => {
        const aiResponse = {
          id: Date.now() + 1,
          user: 'SuperCode AI',
          avatar: '🤖',
          message: `Analyzing legal context for: "${message}". Found relevant precedents and case strategies.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'ai-analysis',
          aiData: {
            relevantCases: 5,
            suggestedActions: ['Review precedents', 'Check similar settlements', 'Analyze success rates'],
            confidence: '94%'
          }
        }

        setMessages(prev => ({
          ...prev,
          [selectedChannel]: [...(prev[selectedChannel] || []), aiResponse]
        }))
      }, 2000)
    }
  }

  const startCall = (type) => {
    setActiveCall({
      type, // 'voice' or 'video'
      participants: onlineAttorneys.filter(a => a.status === 'available').slice(0, 3),
      startTime: new Date(),
      channel: selectedChannel
    })
  }

  const endCall = () => {
    setActiveCall(null)
    setIsMuted(false)
    setVideoEnabled(false)
  }

  const toggleMute = () => setIsMuted(!isMuted)
  const toggleVideo = () => setVideoEnabled(!videoEnabled)

  const getChannelIcon = (channel) => {
    switch(channel.type) {
      case 'case': return <Scale className="w-4 h-4 text-green-400" />
      case 'practice': return <Users className="w-4 h-4 text-blue-400" />
      case 'private': return <Lock className="w-4 h-4 text-purple-400" />
      default: return <Hash className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'available': return 'bg-green-400'
      case 'busy': return 'bg-red-400'
      case 'away': return 'bg-yellow-400'
      default: return 'bg-gray-400'
    }
  }

  const createNewChannel = () => {
    if (!newChannelName.trim()) return
    // In real app, this would create a channel via API
    setNewChannelName('')
    setShowNewChannel(false)
  }

  return (
    <div className="flex h-[800px] bg-gray-900 rounded-xl border border-gray-700 overflow-hidden">
      {/* Sidebar - Channels & Users */}
      <div className="w-80 bg-gray-800 border-r border-gray-700 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-white flex items-center">
              <MessageCircle className="w-5 h-5 mr-2 text-blue-400" />
              Attorney Messages
            </h3>
            <button 
              onClick={() => setShowNewChannel(true)}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          
          {/* SuperCode Toggle */}
          <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                🤖
              </div>
              <div>
                <p className="text-white text-sm font-semibold">SuperCode AI</p>
                <p className="text-gray-400 text-xs">Legal analysis in chat</p>
              </div>
            </div>
            <button
              onClick={() => setSuperCodeEnabled(!superCodeEnabled)}
              className={`w-12 h-6 rounded-full transition-all ${
                superCodeEnabled ? 'bg-green-500' : 'bg-gray-600'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                superCodeEnabled ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>
        </div>

        {/* Channels List */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="mb-4">
            <h4 className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3">Channels</h4>
            <div className="space-y-1">
              {channels.map((channel) => (
                <button
                  key={channel.id}
                  onClick={() => setSelectedChannel(channel.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                    selectedChannel === channel.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <div className="flex items-center">
                    {getChannelIcon(channel)}
                    <span className="ml-2 font-medium">{channel.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {channel.unread > 0 && (
                      <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center">
                        {channel.unread}
                      </span>
                    )}
                    {channel.priority === 'high' && (
                      <Star className="w-3 h-3 text-yellow-400" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Online Attorneys */}
          <div>
            <h4 className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3">
              Online Attorneys ({onlineAttorneys.length})
            </h4>
            <div className="space-y-2">
              {onlineAttorneys.map((attorney, index) => (
                <div key={index} className="flex items-center p-2 rounded-lg hover:bg-gray-700 transition-colors">
                  <div className="relative">
                    <div className="w-8 h-8 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-full flex items-center justify-center text-sm">
                      {attorney.avatar}
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-gray-800 ${getStatusColor(attorney.status)}`} />
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-white text-sm font-medium">{attorney.name}</p>
                    <p className="text-gray-400 text-xs">{attorney.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-700 bg-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {getChannelIcon(channels.find(c => c.id === selectedChannel))}
              <div className="ml-3">
                <h3 className="text-white font-bold">
                  {channels.find(c => c.id === selectedChannel)?.name}
                </h3>
                <p className="text-gray-400 text-sm">
                  {channels.find(c => c.id === selectedChannel)?.members} members • 
                  {channels.find(c => c.id === selectedChannel)?.lastActivity}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => startCall('voice')}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
              >
                <Phone className="w-5 h-5" />
              </button>
              <button 
                onClick={() => startCall('video')}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
              >
                <Video className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
                <Search className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Active Call Banner */}
        {activeCall && (
          <div className="p-4 bg-green-600 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {activeCall.type === 'video' ? <VideoIcon className="w-5 h-5 mr-2" /> : <Phone className="w-5 h-5 mr-2" />}
                <span className="font-semibold">
                  {activeCall.type === 'video' ? 'Video Call' : 'Voice Call'} in progress
                </span>
                <span className="ml-4 text-green-200">
                  {activeCall.participants.length + 1} participants
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={toggleMute}
                  className={`p-2 rounded-lg transition-colors ${
                    isMuted ? 'bg-red-500' : 'bg-green-700 hover:bg-green-800'
                  }`}
                >
                  {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>
                
                {activeCall.type === 'video' && (
                  <button
                    onClick={toggleVideo}
                    className={`p-2 rounded-lg transition-colors ${
                      !videoEnabled ? 'bg-red-500' : 'bg-green-700 hover:bg-green-800'
                    }`}
                  >
                    {!videoEnabled ? <VideoOff className="w-4 h-4" /> : <VideoIcon className="w-4 h-4" />}
                  </button>
                )}
                
                <button
                  onClick={endCall}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
                >
                  End Call
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {(messages[selectedChannel] || []).map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isCurrentUser ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-[70%] ${msg.isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* Avatar */}
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  msg.isPartner ? 'bg-gradient-to-r from-yellow-600 to-orange-600' : 
                  msg.type === 'ai-analysis' ? 'bg-gradient-to-r from-blue-500 to-purple-600' :
                  'bg-gray-600'
                } ${msg.isCurrentUser ? 'ml-3' : 'mr-3'}`}>
                  <span className="text-white text-lg">{msg.avatar}</span>
                </div>

                {/* Message Content */}
                <div className={`${msg.isCurrentUser ? 'mr-2' : 'ml-2'}`}>
                  <div className="flex items-baseline mb-1">
                    <span className="text-white font-semibold text-sm">
                      {msg.user}
                    </span>
                    {msg.isPartner && <Crown className="w-3 h-3 text-yellow-400 ml-1" />}
                    <span className="text-gray-400 text-xs ml-2">{msg.timestamp}</span>
                  </div>
                  
                  <div className={`rounded-lg p-3 ${
                    msg.isCurrentUser
                      ? 'bg-blue-600 text-white'
                      : msg.type === 'ai-analysis'
                      ? 'bg-gradient-to-r from-blue-900 to-purple-900 border border-blue-600'
                      : 'bg-gray-700 text-white'
                  }`}>
                    <p>{msg.message}</p>
                    
                    {/* AI Analysis Data */}
                    {msg.type === 'ai-analysis' && msg.aiData && (
                      <div className="mt-3 p-3 bg-black/20 rounded-lg">
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          {msg.aiData.caseCount && (
                            <div>
                              <p className="text-blue-300 font-semibold">Similar Cases</p>
                              <p className="text-white">{msg.aiData.caseCount}</p>
                            </div>
                          )}
                          {msg.aiData.averageSettlement && (
                            <div>
                              <p className="text-green-300 font-semibold">Avg Settlement</p>
                              <p className="text-white">{msg.aiData.averageSettlement}</p>
                            </div>
                          )}
                          {msg.aiData.successRate && (
                            <div>
                              <p className="text-yellow-300 font-semibold">Success Rate</p>
                              <p className="text-white">{msg.aiData.successRate}</p>
                            </div>
                          )}
                          {msg.aiData.confidence && (
                            <div>
                              <p className="text-purple-300 font-semibold">Confidence</p>
                              <p className="text-white">{msg.aiData.confidence}</p>
                            </div>
                          )}
                        </div>
                        
                        {msg.aiData.keyFactors && (
                          <div className="mt-2">
                            <p className="text-blue-300 font-semibold text-sm mb-1">Key Factors:</p>
                            <div className="flex flex-wrap gap-1">
                              {msg.aiData.keyFactors.map((factor, idx) => (
                                <span key={idx} className="bg-blue-800 text-blue-200 text-xs px-2 py-1 rounded">
                                  {factor}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-700 bg-gray-800">
          <div className="flex items-center space-x-3">
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <Paperclip className="w-5 h-5" />
            </button>
            
            <div className="flex-1 relative">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder={`Message ${channels.find(c => c.id === selectedChannel)?.name}`}
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
              />
              {superCodeEnabled && (
                <div className="absolute right-3 top-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    🤖
                  </div>
                </div>
              )}
            </div>
            
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <Smile className="w-5 h-5" />
            </button>
            
            <button
              onClick={sendMessage}
              disabled={!message.trim()}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* New Channel Modal */}
      {showNewChannel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl p-6 w-96 border border-gray-700">
            <h3 className="text-white text-lg font-bold mb-4">Create New Channel</h3>
            <input
              type="text"
              value={newChannelName}
              onChange={(e) => setNewChannelName(e.target.value)}
              placeholder="Channel name"
              className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:border-blue-500"
            />
            <div className="flex space-x-3">
              <button
                onClick={createNewChannel}
                className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create
              </button>
              <button
                onClick={() => setShowNewChannel(false)}
                className="flex-1 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}