'use client'

import { useState, useEffect, useRef } from 'react'
import { Mic, MicOff, Send, X, Sparkles, Brain, Zap } from 'lucide-react'

const AIAssistant = ({ active, setActive, userRole }) => {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [aiResponse, setAiResponse] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [chatHistory, setChatHistory] = useState([])
  const textareaRef = useRef(null)
  const recognitionRef = useRef(null)

  // Role-specific AI prompts and capabilities
  const roleCapabilities = {
    attorney: {
      greeting: "Hi Douglas! I'm Maya, your AI legal assistant. I can help with case strategy, legal research, brief drafting, and client communications.",
      capabilities: [
        "🎯 Case strategy analysis and outcome prediction",
        "📝 Draft motions, briefs, and legal documents", 
        "🔍 Legal research and cite checking",
        "💼 Client communication drafting",
        "📊 Case performance analytics"
      ],
      quickActions: [
        "Draft a motion to dismiss",
        "Research similar cases",
        "Analyze settlement prospects",
        "Schedule client calls"
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
        setChatHistory([{
          type: 'ai',
          message: roleData.greeting,
          timestamp: new Date()
        }])
      }
    }
  }, [active, userRole])

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
                onClick={isListening ? stopListening : startListening}
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