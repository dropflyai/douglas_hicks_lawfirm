'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AIBrain } from '@/lib/ai-brain'
import { 
  MessageCircle,
  Send,
  X,
  Minimize2,
  Maximize2,
  Bot,
  User,
  Phone,
  Calendar,
  FileText,
  Shield,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  Sparkles,
  Brain,
  Zap,
  Users,
  Award,
  Scale,
  Gavel,
  Heart
} from 'lucide-react'

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [chatPhase, setChatPhase] = useState('greeting') // greeting, qualification, consultation, escalation
  const [userProfile, setUserProfile] = useState({})
  const [hasUnread, setHasUnread] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // Initial greeting message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        addBotMessage(
          "👋 Hi! I'm Maya, the AI legal assistant for Douglass Hicks Law. I'm here to help you understand your legal options and connect you with our expert attorneys.\n\nHow can I help you today?",
          'greeting',
          [
            { text: "I need legal help", action: "qualification" },
            { text: "Case evaluation", action: "intake" },
            { text: "Speak to attorney", action: "consultation" },
            { text: "Emergency situation", action: "urgent" }
          ]
        )
      }, 1000)
    }
  }, [isOpen])

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Show unread indicator
  useEffect(() => {
    if (!isOpen && messages.length > 0) {
      setHasUnread(true)
    } else {
      setHasUnread(false)
    }
  }, [isOpen, messages])

  const addBotMessage = (text, type = 'text', buttons = null, data = null) => {
    const newMessage = {
      id: Date.now(),
      type: 'bot',
      text,
      timestamp: new Date(),
      messageType: type,
      buttons,
      data
    }
    setMessages(prev => [...prev, newMessage])
  }

  const addUserMessage = (text) => {
    const newMessage = {
      id: Date.now(),
      type: 'user',
      text,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, newMessage])
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    addUserMessage(inputValue)
    const userInput = inputValue.toLowerCase()
    setInputValue('')
    
    // Show typing indicator
    setIsTyping(true)
    
    setTimeout(() => {
      setIsTyping(false)
      processUserMessage(userInput)
    }, 1500)
  }

  const handleButtonClick = (action) => {
    switch (action) {
      case 'qualification':
        setChatPhase('qualification')
        addBotMessage(
          "I'll help you understand if you have a case. Let me ask you a few quick questions.\n\nWhat type of legal issue are you dealing with?",
          'qualification',
          [
            { text: "Personal Injury", action: "case_personal_injury" },
            { text: "Civil Rights Violation", action: "case_civil_rights" },
            { text: "Wrongful Death", action: "case_wrongful_death" },
            { text: "Employment Issue", action: "case_employment" },
            { text: "Other", action: "case_other" }
          ]
        )
        break

      case 'intake':
        addBotMessage(
          "I'll connect you to our comprehensive case evaluation system. This AI-powered tool will analyze your case and match you with the right attorney.\n\n🚀 Ready to get started?",
          'cta',
          [
            { text: "Start Case Evaluation", action: "redirect_intake" },
            { text: "Tell me more first", action: "explain_intake" }
          ]
        )
        break

      case 'consultation':
        addBotMessage(
          "I can help you schedule a consultation with one of our expert attorneys. Our team includes:\n\n👑 **Carl E. Douglas** - Dream Team legend, $4.9B verdict\n⚖️ **Jamon R. Hicks** - Trial advocacy master\n🛡️ **A'ja Simplis** - Civil rights champion\n\nWould you like to schedule now or learn more about our attorneys?",
          'consultation',
          [
            { text: "Schedule consultation", action: "schedule" },
            { text: "Learn about attorneys", action: "team_info" },
            { text: "Free consultation?", action: "consultation_info" }
          ]
        )
        break

      case 'urgent':
        addBotMessage(
          "🚨 **Emergency Legal Situation Detected**\n\nFor immediate assistance:\n📞 **Call (213) 995-3991**\n\nOur emergency line is available 24/7 for urgent legal matters including:\n• Active police investigations\n• Arrest situations  \n• Evidence preservation\n• Statute of limitations deadlines\n\nShould I also help you with immediate next steps?",
          'urgent',
          [
            { text: "Yes, guide me", action: "emergency_guidance" },
            { text: "I'll call now", action: "calling" }
          ]
        )
        break

      case 'case_personal_injury':
        handleCaseTypeSelection('Personal Injury', 'Our personal injury team has recovered millions for clients. Recent victories include a $425K settlement and connections to our $4.9B product liability expertise.')
        break

      case 'case_civil_rights':
        handleCaseTypeSelection('Civil Rights', 'Our civil rights team includes Dream Team experience and recent $8M police brutality victory. We fight for justice and accountability.')
        break

      case 'case_wrongful_death':
        handleCaseTypeSelection('Wrongful Death', 'We handle wrongful death cases with compassion and expertise. Recent $5M settlement shows our commitment to securing justice for families.')
        break

      case 'case_employment':
        handleCaseTypeSelection('Employment Law', 'Our employment team fights workplace discrimination and wrongful termination. Recent $733K victory shows our dedication to worker rights.')
        break

      case 'redirect_intake':
        addBotMessage(
          "Perfect! I'm redirecting you to our AI Case Evaluation system. This will give you:\n\n✅ Instant case analysis\n✅ Attorney matching\n✅ Estimated case value\n✅ Next steps roadmap\n\nOne moment...",
          'redirect'
        )
        setTimeout(() => {
          window.open('/intake', '_blank')
        }, 2000)
        break

      case 'schedule':
        addBotMessage(
          "Excellent! I can help you schedule a **FREE consultation** with the right attorney for your case.\n\nTo get started, I need a few quick details:\n\n1️⃣ What type of legal issue?\n2️⃣ When did it occur?\n3️⃣ Your preferred consultation time?\n\nShall we begin?",
          'scheduling',
          [
            { text: "Yes, let's schedule", action: "begin_scheduling" },
            { text: "More info first", action: "consultation_details" }
          ]
        )
        break

      case 'team_info':
        addBotMessage(
          "Our legendary legal team:\n\n👑 **Carl E. Douglas**\n• O.J. Simpson Dream Team member\n• $4.9B GM verdict (largest in US history)\n• 30+ years experience\n• Celebrity defense attorney\n\n⚖️ **Jamon R. Hicks**\n• Trial advocacy professor\n• $5M wrongful death settlement\n• Former Cochran Firm attorney\n• Super Lawyers recognition\n\n🛡️ **A'ja Simplis & Bianca Perez**\n• Civil rights specialists\n• Employment law experts\n• Community advocates\n\nWould you like to meet a specific attorney or schedule with the best match for your case?",
          'team_info',
          [
            { text: "Schedule with Carl Douglas", action: "schedule_carl" },
            { text: "Schedule with Jamon Hicks", action: "schedule_jamon" },
            { text: "Best match for my case", action: "schedule_match" }
          ]
        )
        break

      default:
        addBotMessage("I'm here to help! Let me know what you need assistance with.")
    }
  }

  const handleCaseTypeSelection = (caseType, description) => {
    setUserProfile(prev => ({ ...prev, caseType }))
    addBotMessage(
      `Great! You selected **${caseType}**.\n\n${description}\n\nTo better help you, when did this incident occur?`,
      'follow_up',
      [
        { text: "Within last 30 days", action: "timeline_recent" },
        { text: "1-6 months ago", action: "timeline_months" },
        { text: "Over 1 year ago", action: "timeline_old" },
        { text: "Ongoing situation", action: "timeline_ongoing" }
      ]
    )
  }

  const processUserMessage = (input) => {
    // Use AI Brain for intelligent intent analysis
    const aiAnalysis = AIBrain.analyzeChatIntent(input)
    
    // Store user data for case building
    if (aiAnalysis.hasInjury || aiAnalysis.hasLegalIntent) {
      setUserProfile(prev => ({
        ...prev,
        caseType: aiAnalysis.caseType,
        urgency: aiAnalysis.isUrgent,
        initialMessage: input
      }))
    }
    
    // Generate intelligent response based on AI analysis
    if (aiAnalysis.isUrgent && aiAnalysis.hasInjury) {
      addBotMessage(
        `🚨 **URGENT SITUATION DETECTED**\n\n${aiAnalysis.suggestedResponse}\n\n**Immediate Actions:**\n• Call us NOW: (213) 995-3991\n• Document everything\n• Don't speak to insurance companies\n• Preserve all evidence\n\nOur emergency response team is standing by.`,
        'urgent',
        [
          { text: "Connect me immediately", action: "urgent" },
          { text: "Start case evaluation", action: "intake" },
          { text: "I need guidance first", action: "emergency_guidance" }
        ]
      )
    } else if (aiAnalysis.caseType === 'discrimination' || aiAnalysis.caseType === 'civil_rights') {
      addBotMessage(
        `🛡️ **Civil Rights Case Detected** (${Math.round(aiAnalysis.confidence * 100)}% confidence)\n\n${aiAnalysis.suggestedResponse}\n\n**Recent Victory:** $8M police brutality case\n**Lead Attorney:** Carl E. Douglas (Dream Team)\n**Success Rate:** 95% in civil rights cases`,
        'civil_rights',
        [
          { text: "Start immediate evaluation", action: "urgent_civil_rights" },
          { text: "Tell me more", action: "civil_rights_info" },
          { text: "Schedule consultation", action: "consultation" }
        ]
      )
    } else if (aiAnalysis.caseType === 'auto_accident' || aiAnalysis.caseType === 'premises_liability') {
      addBotMessage(
        `🚗 **Personal Injury Case Identified** (${Math.round(aiAnalysis.confidence * 100)}% confidence)\n\n${aiAnalysis.suggestedResponse}\n\n**Key Stats:**\n• $4.9B largest verdict\n• Average settlement: $850K\n• 92% success rate\n\n⚠️ **Time-sensitive:** Evidence disappears quickly. Insurance companies are already working against you.`,
        'personal_injury',
        [
          { text: "Get case value estimate", action: "intake" },
          { text: "Protect my rights now", action: "urgent" },
          { text: "Free consultation", action: "consultation" }
        ]
      )
    } else if (aiAnalysis.caseType === 'employment') {
      addBotMessage(
        `💼 **Employment Law Issue Detected** (${Math.round(aiAnalysis.confidence * 100)}% confidence)\n\n${aiAnalysis.suggestedResponse}\n\n**Recent Wins:**\n• $1.576M disability discrimination\n• $733K wrongful termination\n• Specialized team led by A'ja Simplis`,
        'employment',
        [
          { text: "Evaluate my case", action: "case_employment" },
          { text: "Know my rights", action: "employment_rights" },
          { text: "Urgent consultation", action: "consultation" }
        ]
      )
    } else if (aiAnalysis.caseType === 'medical_malpractice') {
      addBotMessage(
        `🏥 **Medical Malpractice Potential** (${Math.round(aiAnalysis.confidence * 100)}% confidence)\n\n${aiAnalysis.suggestedResponse}\n\n**Critical:** Medical cases have strict deadlines and require expert review.\n\nOur medical malpractice team includes medical experts and has recovered millions for victims.`,
        'medical',
        [
          { text: "Get expert review", action: "intake" },
          { text: "Understand my options", action: "medical_info" },
          { text: "Immediate help", action: "urgent" }
        ]
      )
    } else if (input.includes('cost') || input.includes('fee') || input.includes('money')) {
      addBotMessage(
        "💰 **Our Fee Structure:**\n\n✅ **FREE consultation** - always\n✅ **Contingency fee** - most cases (you pay nothing unless we win)\n✅ **No upfront costs** for personal injury/civil rights\n\nMost of our clients pay $0 upfront and we only get paid when you win. Would you like to discuss your specific case?",
        'fees',
        [
          { text: "Discuss my case", action: "qualification" },
          { text: "Schedule consultation", action: "consultation" }
        ]
      )
    } else {
      // Use AI-generated smart response for general queries
      addBotMessage(
        `${aiAnalysis.suggestedResponse}\n\n**How can I help you today?**\n\n🔍 Get instant case analysis\n📞 Schedule free consultation\n🚨 Emergency legal help`,
        'general',
        [
          { text: "Analyze my case", action: "intake" },
          { text: "Free consultation", action: "consultation" },
          { text: "I need help now", action: "urgent" }
        ]
      )
    }
  }

  const toggleChat = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setIsMinimized(false)
    }
  }

  const minimizeChat = () => {
    setIsMinimized(!isMinimized)
  }

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-all z-50 animate-pulse"
        >
          <MessageCircle className="w-8 h-8" />
          {hasUnread && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold">
              !
            </div>
          )}
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className={`fixed bottom-6 right-6 w-96 bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-2xl shadow-2xl z-50 transition-all ${isMinimized ? 'h-16' : 'h-[600px]'}`}>
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-white font-bold">Maya AI Assistant</h3>
                <p className="text-blue-100 text-xs">Douglass Hicks Law • Online now</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={minimizeChat}
                className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                {isMinimized ? <Maximize2 className="w-4 h-4 text-white" /> : <Minimize2 className="w-4 h-4 text-white" />}
              </button>
              <button
                onClick={toggleChat}
                className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages Area */}
              <div className="flex-1 p-4 space-y-4 overflow-y-auto max-h-[480px]">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                      {message.type === 'bot' && (
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                            {message.messageType === 'urgent' ? <Zap className="w-3 h-3 text-white" /> :
                             message.messageType === 'civil_rights' ? <Shield className="w-3 h-3 text-white" /> :
                             message.messageType === 'consultation' ? <Users className="w-3 h-3 text-white" /> :
                             <Bot className="w-3 h-3 text-white" />}
                          </div>
                          <span className="text-gray-400 text-xs">Maya AI</span>
                        </div>
                      )}
                      
                      <div className={`rounded-2xl px-4 py-3 ${
                        message.type === 'user' 
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                          : 'bg-gray-800 text-gray-100'
                      }`}>
                        <div className="whitespace-pre-line text-sm">{message.text}</div>
                        
                        {message.buttons && (
                          <div className="mt-3 space-y-2">
                            {message.buttons.map((button, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleButtonClick(button.action)}
                                className="block w-full text-left px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors"
                              >
                                {button.text}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                        <Bot className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-gray-400 text-xs">Maya is typing...</span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-gray-700">
                <div className="flex items-center gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your message..."
                    className="flex-1 p-3 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm focus:border-blue-500 focus:outline-none"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center hover:scale-105 transition-all"
                  >
                    <Send className="w-4 h-4 text-white" />
                  </button>
                </div>
                <div className="flex items-center justify-center gap-4 mt-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    Confidential
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    24/7 Available
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Free Consultation
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}