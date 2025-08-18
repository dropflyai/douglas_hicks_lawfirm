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

export default function LiveChatSuperCode() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [chatPhase, setChatPhase] = useState('greeting')
  const [userProfile, setUserProfile] = useState({})
  const [hasUnread, setHasUnread] = useState(false)
  const [sessionId, setSessionId] = useState(null)
  const [isConnectedToSuperCode, setIsConnectedToSuperCode] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // Generate unique session ID
  const generateSessionId = () => {
    return `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  // Initialize session
  useEffect(() => {
    if (!sessionId) {
      setSessionId(generateSessionId())
    }
  }, [])

  // Initial greeting message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        addBotMessage(
          "👋 Hi! I'm Maya, the AI legal assistant for Douglass Hicks Law. I'm powered by our comprehensive legal knowledge base and can access our entire case precedent library.\n\nI'm here to help you understand your legal options and connect you with our expert attorneys. How can I help you today?",
          'greeting',
          [
            { text: "🔍 Evaluate my case", action: "qualification" },
            { text: "📅 Schedule consultation", action: "consultation" },
            { text: "👥 Meet our team", action: "team_info" },
            { text: "🚀 AI-powered intake", action: "intake" }
          ]
        )
      }, 1000)
    }
  }, [isOpen, messages.length])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const addBotMessage = (text, type = 'text', buttons = null) => {
    const message = {
      text,
      sender: 'bot',
      timestamp: new Date(),
      type,
      buttons
    }
    setMessages(prev => [...prev, message])
    
    if (!isOpen) {
      setHasUnread(true)
    }
  }

  const addUserMessage = (text) => {
    setMessages(prev => [...prev, {
      text,
      sender: 'user',
      timestamp: new Date()
    }])
    setHasUnread(false)
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    addUserMessage(inputValue)
    const userInput = inputValue
    setInputValue('')
    
    // Show typing indicator
    setIsTyping(true)
    
    // Process with SuperCode agent
    processWithSuperCodeAgent(userInput)
  }

  // Main SuperCode Agent integration
  const processWithSuperCodeAgent = async (input) => {
    try {
      // Try SuperCode AI Agent first
      const response = await fetch('https://your-n8n-instance.com/webhook/douglas-hicks-chat-agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input,
          session_id: sessionId,
          timestamp: new Date().toISOString(),
          user_agent: navigator.userAgent,
          referrer: document.referrer,
          context: {
            previous_messages: messages.slice(-5).map(m => ({
              role: m.sender === 'user' ? 'user' : 'assistant',
              content: m.text
            })),
            chat_phase: chatPhase,
            user_profile: userProfile
          }
        })
      });

      if (response.ok) {
        const result = await response.json();
        
        setIsConnectedToSuperCode(true);
        setIsTyping(false);
        
        // Process SuperCode agent response
        processSuperCodeResponse(result, input);
        return;
      } else {
        console.warn('SuperCode agent returned error:', response.status);
      }
    } catch (error) {
      console.warn('SuperCode agent unavailable, using local AI brain:', error);
      setIsConnectedToSuperCode(false);
    }
    
    // Fallback to local AI brain
    setTimeout(() => {
      setIsTyping(false);
      processWithLocalAI(input);
    }, 1000);
  }

  // Process SuperCode Agent Response
  const processSuperCodeResponse = (result, originalInput) => {
    const { message, analysis, precedents_found, next_actions } = result;
    
    // Update user profile with detected case info
    if (analysis) {
      setUserProfile(prev => ({
        ...prev,
        case_type: analysis.case_type,
        confidence: analysis.confidence,
        urgency_level: analysis.urgency_level,
        estimated_tier: analysis.estimated_tier
      }));
      
      // Update chat phase based on analysis
      if (analysis.urgency_level === 'high' || analysis.estimated_tier === 'gold') {
        setChatPhase('urgent');
      } else if (analysis.case_type && analysis.case_type !== 'general') {
        setChatPhase('qualification');
      }
    }
    
    // Create enhanced bot response with SuperCode insights
    let enhancedMessage = message;
    let buttons = [];
    let messageType = 'supercode';
    
    // Add precedent information if available
    if (precedents_found > 0) {
      enhancedMessage += `\n\n🔍 **AI Analysis Complete**: Found ${precedents_found} similar cases in our database`;
    }
    
    // Add confidence indicator
    if (analysis?.confidence) {
      enhancedMessage += `\n📊 **Confidence**: ${Math.round(analysis.confidence * 10)}% match`;
    }
    
    // Generate action buttons based on next_actions
    if (next_actions?.includes('schedule_urgent_consultation')) {
      buttons.push({ text: "🚨 Schedule URGENT Consultation", action: "urgent_consultation" });
      messageType = 'urgent';
    }
    
    if (next_actions?.includes('alert_attorneys')) {
      enhancedMessage += `\n\n⚡ **PRIORITY CASE DETECTED** - Our attorneys have been notified`;
    }
    
    if (next_actions?.includes('schedule_consultation')) {
      buttons.push({ text: "📅 Schedule Consultation", action: "consultation" });
    }
    
    if (next_actions?.includes('send_intake_packet')) {
      buttons.push({ text: "📋 Complete Case Evaluation", action: "intake" });
    }
    
    // Add standard options if no specific actions
    if (buttons.length === 0) {
      if (analysis?.estimated_tier === 'gold' || analysis?.urgency_level === 'high') {
        buttons = [
          { text: "🚀 Start Case Evaluation", action: "intake" },
          { text: "📞 Call Now", action: "urgent" },
          { text: "📅 Schedule Today", action: "consultation" }
        ];
      } else {
        buttons = [
          { text: "📋 Get Case Evaluation", action: "intake" },
          { text: "📅 Schedule Consultation", action: "consultation" },
          { text: "❓ Ask More Questions", action: "continue_chat" }
        ];
      }
    }
    
    // Display the enhanced message
    addBotMessage(enhancedMessage, messageType, buttons);
  }

  // Fallback to local AI processing
  const processWithLocalAI = (input) => {
    const aiAnalysis = AIBrain.analyzeChatIntent(input);
    
    // Store user data for case building
    if (aiAnalysis.hasInjury || aiAnalysis.hasLegalIntent) {
      setUserProfile(prev => ({
        ...prev,
        caseType: aiAnalysis.caseType,
        urgency: aiAnalysis.isUrgent,
        initialMessage: input
      }));
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
      );
    } else if (aiAnalysis.caseType === 'discrimination' || aiAnalysis.caseType === 'civil_rights') {
      addBotMessage(
        `🛡️ **Civil Rights Case Detected** (${Math.round(aiAnalysis.confidence * 100)}% confidence)\n\n${aiAnalysis.suggestedResponse}\n\n**Recent Victory:** $8M police brutality case\n**Lead Attorney:** Carl E. Douglas (Dream Team)\n**Success Rate:** 95% in civil rights cases`,
        'civil_rights',
        [
          { text: "Start immediate evaluation", action: "urgent_civil_rights" },
          { text: "Tell me more", action: "civil_rights_info" },
          { text: "Schedule consultation", action: "consultation" }
        ]
      );
    } else {
      // Default response
      addBotMessage(
        `Thank you for that information. ${aiAnalysis.suggestedResponse || "I'd like to learn more about your situation to provide the best guidance."}\n\nHow can I help you further?`,
        'follow_up',
        [
          { text: "📋 Evaluate my case", action: "intake" },
          { text: "📅 Schedule consultation", action: "consultation" },
          { text: "❓ Ask another question", action: "continue_chat" }
        ]
      );
    }
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
          "🚀 **AI-Powered Case Evaluation**\n\nI'll connect you to our comprehensive case evaluation system powered by our SuperCode AI agent. This system:\n\n• Analyzes your case using our $4.9B+ victory database\n• Matches you with similar successful cases\n• Provides instant value estimates\n• Connects you with the right attorney\n\nReady to get started?",
          'cta',
          [
            { text: "🚀 Start AI Evaluation", action: "redirect_intake" },
            { text: "Tell me more about the AI", action: "explain_ai" },
            { text: "Skip to consultation", action: "consultation" }
          ]
        )
        break

      case 'explain_ai':
        addBotMessage(
          `🧠 **Our SuperCode AI System**\n\n${isConnectedToSuperCode ? '✅ **Currently Connected**' : '⚠️ **Using Local Processing**'}\n\n**What makes it powerful:**\n• Access to our entire case precedent database\n• Vector similarity matching to find relevant cases\n• Real-time analysis using GPT-4 and legal knowledge\n• Continuous learning from successful outcomes\n\n**Your data is secure and protected by attorney-client privilege.**`,
          'ai_info',
          [
            { text: "🚀 Start AI Evaluation", action: "redirect_intake" },
            { text: "📅 Schedule Human Consultation", action: "consultation" },
            { text: "❓ More Questions", action: "continue_chat" }
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
            { text: "AI evaluation first", action: "intake" }
          ]
        )
        break

      case 'urgent_consultation':
        addBotMessage(
          "🚨 **URGENT CONSULTATION SCHEDULING**\n\nBased on our AI analysis, this case requires immediate attorney attention. I'm connecting you to our priority scheduling system.\n\n**Available Today:**\n• Emergency consultation slots\n• Senior attorney review\n• Immediate case action plan",
          'urgent',
          [
            { text: "📞 Call Now (213) 995-3991", action: "call_now" },
            { text: "💻 Schedule Online", action: "schedule_urgent_online" },
            { text: "📧 Priority Email", action: "priority_email" }
          ]
        )
        break

      case 'continue_chat':
        addBotMessage(
          "I'm here to help! Feel free to ask me anything about:\n\n• Your legal situation\n• Our attorneys and experience\n• The legal process\n• What to expect\n• Case timelines and costs\n\nWhat would you like to know?",
          'open_chat'
        )
        break

      case 'redirect_intake':
        window.open('/intake', '_blank')
        addBotMessage(
          "🚀 **AI Case Evaluation Opening...**\n\nI've opened our comprehensive case evaluation system in a new tab. This AI-powered tool will:\n\n✅ Analyze your case details\n✅ Compare to similar victories\n✅ Provide value estimates\n✅ Match you with the right attorney\n\nNeed any help while you're filling it out?",
          'redirect_confirmation'
        )
        break

      default:
        // Process as user message for SuperCode agent
        if (action.startsWith('case_') || action.includes('_')) {
          const actionMessage = action.replace(/_/g, ' ').replace('case ', '');
          addUserMessage(actionMessage);
          setIsTyping(true);
          processWithSuperCodeAgent(actionMessage);
        } else {
          addBotMessage("I'm here to help! Let me know what you need assistance with.");
        }
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-yellow-600 to-yellow-500 text-black p-4 rounded-full shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 z-50 group animate-pulse hover:animate-none"
          aria-label="Open live chat"
        >
          <MessageCircle className="h-6 w-6" />
          {hasUnread && (
            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-bounce">
              !
            </div>
          )}
          <div className="absolute bottom-16 right-0 bg-black text-white px-3 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            💬 Chat with Maya AI
            {isConnectedToSuperCode && <span className="ml-2">🧠</span>}
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className={`fixed bottom-6 right-6 bg-black border border-yellow-500/30 rounded-2xl shadow-2xl z-50 transition-all duration-300 ${
          isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
        }`}>
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-yellow-500/30">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Bot className="h-8 w-8 text-yellow-500" />
                {isConnectedToSuperCode && (
                  <div className="absolute -top-1 -right-1 bg-green-500 rounded-full h-3 w-3"></div>
                )}
              </div>
              <div>
                <h3 className="text-white font-semibold">Maya AI Assistant</h3>
                <p className="text-yellow-500 text-xs">
                  {isConnectedToSuperCode ? '🧠 SuperCode AI Connected' : '💻 Local AI Active'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-yellow-500 hover:text-yellow-400 transition-colors"
              >
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-yellow-500 hover:text-yellow-400 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="h-96 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-yellow-600">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] ${
                      message.sender === 'user'
                        ? 'bg-yellow-600 text-black rounded-2xl rounded-br-md'
                        : message.type === 'urgent'
                        ? 'bg-red-900/50 text-white border border-red-500/50 rounded-2xl rounded-bl-md'
                        : message.type === 'supercode'
                        ? 'bg-gradient-to-r from-purple-900/50 to-blue-900/50 text-white border border-purple-500/50 rounded-2xl rounded-bl-md'
                        : 'bg-gray-800 text-white rounded-2xl rounded-bl-md'
                    } p-3 shadow-lg`}>
                      <div className="whitespace-pre-wrap text-sm leading-relaxed">
                        {message.text}
                      </div>
                      
                      {/* Action Buttons */}
                      {message.buttons && (
                        <div className="mt-3 space-y-2">
                          {message.buttons.map((button, btnIndex) => (
                            <button
                              key={btnIndex}
                              onClick={() => handleButtonClick(button.action)}
                              className="block w-full text-left px-3 py-2 bg-yellow-600 hover:bg-yellow-500 text-black rounded-lg text-sm font-medium transition-colors"
                            >
                              {button.text}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-800 text-white rounded-2xl rounded-bl-md p-3 shadow-lg">
                      <div className="flex items-center space-x-2">
                        <Brain className="h-4 w-4 text-yellow-500 animate-pulse" />
                        <span className="text-sm">Maya is analyzing...</span>
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-yellow-500/30">
                <div className="flex items-center space-x-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Describe your legal situation..."
                    className="flex-1 bg-gray-800 text-white border border-gray-700 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-yellow-500 transition-colors"
                    disabled={isTyping}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    className="bg-yellow-600 hover:bg-yellow-500 disabled:bg-gray-600 text-black p-2 rounded-full transition-colors disabled:cursor-not-allowed"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
                
                {/* Status Indicator */}
                <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
                  <span>
                    {isConnectedToSuperCode ? (
                      <span className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                        SuperCode AI Active
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <span className="w-2 h-2 bg-yellow-500 rounded-full mr-1"></span>
                        Local AI Active
                      </span>
                    )}
                  </span>
                  <span>Session: {sessionId?.split('_')[1]}</span>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}