'use client'

import { useState, useEffect, useRef } from 'react'
import { Mic, MicOff, Send, X, Sparkles, Brain, Zap } from 'lucide-react'

const AIAssistant = ({ active, setActive, userRole, voiceActive, setVoiceActive, context }) => {
  const [isListening, setIsListening] = useState(false)
  const [contextInfo, setContextInfo] = useState(null)
  const [transcript, setTranscript] = useState('')
  const [aiResponse, setAiResponse] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [chatHistory, setChatHistory] = useState([])
  const textareaRef = useRef(null)
  const recognitionRef = useRef(null)

  // Role-specific AI prompts and capabilities
  const roleCapabilities = {
    attorney: {
      greeting: "Hi Carl! I'm Maya, your AI legal assistant. I can help with case strategy, legal research, brief drafting, and client communications.",
      capabilities: [
        "🎯 Case strategy analysis and outcome prediction",
        "📝 Draft motions, briefs, and legal documents", 
        "🔍 Legal research and cite checking",
        "💼 Client communication drafting",
        "📊 Case performance analytics"
      ],
      quickActions: [
        "Analyze my calendar",
        "Schedule client meeting", 
        "Check for conflicts",
        "Draft a motion to dismiss",
        "Research similar cases",
        "Analyze settlement prospects",
        "Set smart reminders"
      ]
    },
    case_manager: {
      greeting: "Hello Sarah! I'm Maya, optimizing your case workflow. I can coordinate discovery, manage timelines, and automate vendor communications.",
      capabilities: [
        "⚡ Automated discovery coordination",
        "📋 Smart timeline and deadline management",
        "🤝 Vendor coordination and negotiation",
        "💰 Budget optimization and tracking",
        "🔄 Workflow automation and bottleneck detection"
      ],
      quickActions: [
        "Update case timeline",
        "Coordinate depositions", 
        "Track discovery progress",
        "Generate status report"
      ]
    },
    paralegal: {
      greeting: "Hi Michael! I'm Maya, your research and drafting powerhouse. I can accelerate legal research, draft documents, and analyze evidence.",
      capabilities: [
        "📚 Advanced legal research with case summaries",
        "✍️ Intelligent document drafting and assembly",
        "🔍 Evidence analysis and categorization",
        "📋 Investigation planning and coordination",
        "✅ Citation verification and optimization"
      ],
      quickActions: [
        "Research case law",
        "Draft discovery requests",
        "Analyze evidence files",
        "Create investigation plan"
      ]
    },
    legal_assistant: {
      greeting: "Hello Jennifer! I'm Maya, streamlining your administrative workflows. I can manage intake, organize documents, and optimize scheduling.",
      capabilities: [
        "📋 Intelligent client intake processing",
        "📁 Smart document management and filing",
        "📅 Predictive scheduling optimization",
        "📝 Automated form completion",
        "📞 Communication routing and prioritization"
      ],
      quickActions: [
        "Process new client",
        "Organize case files", 
        "Schedule appointments",
        "Complete court forms"
      ]
    },
    secretary: {
      greeting: "Hi Maria! I'm Maya, your communication orchestrator. I can handle calls, coordinate meetings, and manage correspondence.",
      capabilities: [
        "📞 Smart call routing and message taking",
        "✈️ Intelligent travel planning",
        "📧 Automated correspondence handling",
        "📅 Multi-calendar coordination",
        "🎤 Voice-to-action command processing"
      ],
      quickActions: [
        "Schedule meeting",
        "Book travel",
        "Draft correspondence",
        "Route urgent calls"
      ]
    }
  }

  useEffect(() => {
    if (active && userRole) {
      const roleData = roleCapabilities[userRole.id]
      if (roleData) {
        let greeting = roleData.greeting
        
        // Add context to greeting if available
        if (context?.case) {
          greeting += `\n\nI see you're working on ${context.case.name}. I'm ready to help with this case.`
        } else if (context?.workspace && context.workspace !== 'dashboard') {
          greeting += `\n\nYou're in the ${context.workspace} workspace. How can I assist?`
        }
        
        setChatHistory([{
          type: 'ai',
          message: greeting,
          timestamp: new Date()
        }])
      }
    }
  }, [active, userRole, context])

  // Handle voice activation from parent component
  useEffect(() => {
    if (voiceActive !== undefined) {
      if (voiceActive && !isListening) {
        startListening()
      } else if (!voiceActive && isListening) {
        stopListening()
      }
    }
  }, [voiceActive, isListening])

  // Speech Recognition Setup
  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      recognitionRef.current = new window.webkitSpeechRecognition()
      recognitionRef.current.continuous = true
      recognitionRef.current.interimResults = true
      
      recognitionRef.current.onresult = (event) => {
        let finalTranscript = ''
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript
          }
        }
        if (finalTranscript) {
          setTranscript(finalTranscript)
          handleAIQuery(finalTranscript)
        }
      }

      recognitionRef.current.onend = () => {
        setIsListening(false)
      }
    }
  }, [])

  const startListening = () => {
    if (recognitionRef.current) {
      setIsListening(true)
      recognitionRef.current.start()
    }
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }

  const handleAIQuery = async (query) => {
    if (!query.trim()) return

    setIsProcessing(true)
    const userMessage = { type: 'user', message: query, timestamp: new Date() }
    setChatHistory(prev => [...prev, userMessage])

    // Simulate AI processing with role-specific responses
    const roleData = roleCapabilities[userRole?.id || 'attorney']
    
    setTimeout(() => {
      // Enhanced calendar-aware responses
      const getCalendarResponse = (query) => {
        const lowerQuery = query.toLowerCase()
        
        // Calendar-specific intelligence
        if (lowerQuery.includes('calendar') || lowerQuery.includes('schedule')) {
          return `📅 **Smart Calendar Analysis**\n\nI see you're looking at your calendar. Here's what I've analyzed:\n\n🎯 **Today's Focus**:\n• Client meeting at 9:00 AM - Johnson case settlement discussion\n• Court hearing at 2:00 PM - State v. Rodriguez motion\n• Document review at 4:30 PM - Williams estate planning\n\n⚡ **AI Recommendations**:\n• Prepare settlement terms before 9 AM meeting\n• Review witness statements for 2 PM court hearing\n• Have trust documents ready for 4:30 PM review\n\n🔍 **Conflict Analysis**: No scheduling conflicts detected\n📊 **Productivity Score**: 95% - Well-balanced day\n\nWould you like me to prepare briefing materials for any of these appointments?`
        }
        
        if (lowerQuery.includes('meeting') || lowerQuery.includes('appointment')) {
          return `📅 **Meeting Scheduler Activated**\n\nI can help you schedule efficiently:\n\n🎯 **Available Slots This Week**:\n• **Tomorrow**: 10:30 AM - 12:00 PM, 3:00 PM - 5:00 PM\n• **Wednesday**: 9:00 AM - 11:00 AM, 1:30 PM - 3:30 PM  \n• **Thursday**: 11:00 AM - 1:00 PM, 4:00 PM - 6:00 PM\n• **Friday**: 9:30 AM - 12:00 PM\n\n🤖 **AI Suggestions**:\n• Best time for client calls: Tuesday 10:30 AM (post-coffee, pre-lunch)\n• Optimal court prep: Wednesday morning (fresh mind)\n• Document review: Friday AM (fewer interruptions)\n\nWho would you like to meet with?`
        }
        
        if (lowerQuery.includes('conflict') || lowerQuery.includes('available')) {
          return `🔍 **Calendar Conflict Analysis**\n\nI've scanned your schedule for potential issues:\n\n✅ **No Hard Conflicts Detected**\n\n⚠️ **Optimization Opportunities**:\n• 15-min buffer between Johnson meeting and court hearing\n• Consider moving document review to morning for better focus\n• Travel time to courthouse: 25 minutes (factor in traffic)\n\n📊 **Calendar Health Score**: 87/100\n\n💡 **Maya's Suggestions**:\n• Block 30 minutes before court for final prep\n• Schedule brief team check-in after Rodriguez hearing\n• Add reminder to review settlement terms tonight\n\nShall I implement these optimizations?`
        }
        
        if (lowerQuery.includes('remind') || lowerQuery.includes('alert')) {
          return `🔔 **Smart Reminder System**\n\nI'll set up intelligent reminders for you:\n\n📱 **Today's Active Reminders**:\n• 8:30 AM: Review Johnson settlement terms\n• 1:30 PM: Gather Rodriguez case files\n• 4:00 PM: Prep Williams trust documents\n\n🧠 **AI-Powered Alerts**:\n• Weather update: 20% rain at 2 PM (courthouse has covered parking)\n• Traffic alert: Court route clear, normal 25-min drive\n• Case update: New evidence filed in Rodriguez case this morning\n\n⚡ **Proactive Suggestions**:\n• Print backup copies of key documents\n• Charge devices for court recording\n• Review judge's recent rulings on similar motions\n\nWould you like me to create custom alerts for specific cases?`
        }
        
        return null
      }
      
      const calendarResponse = getCalendarResponse(query)
      if (calendarResponse) {
        const aiMessage = {
          type: 'ai',
          message: calendarResponse,
          timestamp: new Date()
        }
        setChatHistory(prev => [...prev, aiMessage])
        setIsProcessing(false)
        setTranscript('')
        return
      }

      const responses = {
        "draft": `I'll help you draft that document. Based on the case details, here's a structured approach:\n\n1. **Legal Theory**: [Analysis]\n2. **Key Arguments**: [Strategic points]\n3. **Supporting Cases**: [Relevant precedents]\n\nWould you like me to generate the full draft?`,
        "research": `I found 12 relevant cases for your query. Here are the most applicable:\n\n• **Smith v. Johnson (2023)**: Similar fact pattern, favorable outcome\n• **Brown v. Corp (2022)**: Key precedent on liability\n• **Davis v. State (2023)**: Recent ruling on damages\n\nShall I provide detailed case summaries?`,
        "schedule": `I've analyzed your calendar and optimal scheduling options:\n\n📅 **Best Times Available**:\n• Tomorrow 2:00 PM - 3:30 PM\n• Thursday 10:00 AM - 12:00 PM\n• Friday 3:00 PM - 4:00 PM\n\nWould you like me to send calendar invites?`,
        default: `I understand you need help with: "${query}"\n\nBased on your role as ${userRole?.title}, I can assist with:\n${roleData?.capabilities?.map(cap => `• ${cap}`).join('\n')}\n\nWhat specific aspect would you like to focus on?`
      }

      const responseKey = Object.keys(responses).find(key => 
        query.toLowerCase().includes(key)
      ) || 'default'

      const aiMessage = {
        type: 'ai',
        message: responses[responseKey],
        timestamp: new Date()
      }

      setChatHistory(prev => [...prev, aiMessage])
      setIsProcessing(false)
      setTranscript('')
    }, 1500)
  }

  const handleSendMessage = () => {
    if (transcript.trim()) {
      handleAIQuery(transcript)
    }
  }

  if (!active) return null

  const roleData = roleCapabilities[userRole?.id || 'attorney']

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl h-[80vh] bg-gray-900 rounded-3xl shadow-2xl border border-gray-700/50 flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Maya AI Assistant</h2>
              <p className="text-sm text-gray-400">Powered by Advanced Legal AI • {userRole?.title}</p>
            </div>
          </div>
          <button
            onClick={() => setActive(false)}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {chatHistory.map((chat, index) => (
            <div
              key={index}
              className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-3xl p-4 rounded-2xl ${
                  chat.type === 'user'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-800 text-white border border-gray-700/50'
                }`}
              >
                <div className="whitespace-pre-wrap">{chat.message}</div>
                <div className="text-xs opacity-70 mt-2">
                  {chat.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
          
          {isProcessing && (
            <div className="flex justify-start">
              <div className="bg-gray-800 border border-gray-700/50 p-4 rounded-2xl">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                  <span className="text-gray-400 text-sm">Maya is thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="p-4 border-t border-gray-700/50">
          <div className="flex flex-wrap gap-2 mb-4">
            {roleData?.quickActions?.map((action, index) => (
              <button
                key={index}
                onClick={() => handleAIQuery(action)}
                className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-full text-sm text-gray-300 hover:text-white transition-all border border-gray-600/50 hover:border-purple-500/50"
              >
                <Sparkles className="w-3 h-3 inline mr-1" />
                {action}
              </button>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="p-6 border-t border-gray-700/50">
          <div className="flex items-end space-x-3">
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                placeholder="Ask Maya anything... or use voice commands"
                className="w-full p-4 bg-gray-800 border border-gray-600 rounded-2xl text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50"
                rows={3}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
              />
            </div>
            
            <div className="flex flex-col space-y-2">
              <button
                onClick={() => {
                  if (isListening) {
                    stopListening()
                    if (setVoiceActive) setVoiceActive(false)
                  } else {
                    startListening()
                    if (setVoiceActive) setVoiceActive(true)
                  }
                }}
                className={`p-3 rounded-xl transition-all ${
                  isListening
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                }`}
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
              
              <button
                onClick={handleSendMessage}
                disabled={!transcript.trim() || isProcessing}
                className="p-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-xl transition-all"
              >
                <Send className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AIAssistant