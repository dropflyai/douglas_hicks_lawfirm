'use client'

import { useState, useEffect, useRef } from 'react'
import {
  Brain, Sparkles, Send, Mic, MicOff, Volume2, VolumeX, 
  Camera, Image, Paperclip, MoreVertical, X, Minimize2,
  Search, FileText, Globe, Zap, Target, Scale, Shield,
  Copy, Download, Share, ThumbsUp, ThumbsDown, RefreshCw,
  User, Bot, AlertCircle, CheckCircle, Clock, Star,
  MessageSquare, Lightbulb, BookOpen, Gavel, Calculator,
  TrendingUp, BarChart3, PieChart, Activity, Award,
  Eye, Edit3, Highlight, Tag, Filter, SortAsc
} from 'lucide-react'

const AIAssistantSidebar = ({ 
  context, 
  currentUrl, 
  selectedDocument, 
  webPageContent, 
  userRole, 
  onClose 
}) => {
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const [aiMode, setAiMode] = useState('chat') // chat, analyze, research, draft
  const [isMinimized, setIsMinimized] = useState(false)
  const [conversationHistory, setConversationHistory] = useState([])
  const [aiPersonality, setAiPersonality] = useState('legal_expert')
  
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // Initialize AI with context-aware welcome message
  useEffect(() => {
    const welcomeMessage = getContextualWelcome()
    setMessages([{
      id: 1,
      type: 'ai',
      content: welcomeMessage,
      timestamp: new Date().toISOString(),
      suggestions: getContextualSuggestions()
    }])
  }, [context, currentUrl, selectedDocument])

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const getContextualWelcome = () => {
    if (selectedDocument) {
      return `🏛️ **Legal AI Assistant**\n\nI'm analyzing "${selectedDocument.name}". I can help you:\n- Review and annotate this document\n- Extract key legal points\n- Draft related motions or briefs\n- Research relevant case law\n- Check for compliance issues\n\nWhat would you like to know about this document?`
    }
    
    if (context === 'legal_research') {
      return `⚖️ **Legal Research Assistant**\n\nI see you're on a legal research platform. I can help you:\n- Find relevant case law and statutes\n- Analyze legal precedents\n- Draft search queries\n- Summarize research findings\n- Create case brief outlines\n\nWhat legal research can I assist with?`
    }
    
    if (context === 'web_search') {
      return `🔍 **Web Research Assistant**\n\nI'm here to help with your research. I can:\n- Suggest better search terms\n- Analyze web content\n- Extract key information\n- Fact-check claims\n- Find additional sources\n\nWhat are you researching today?`
    }

    return `🤖 **Maya - Your AI Legal Assistant**\n\nI'm your intelligent legal companion. I can help you with:\n- Document analysis and review\n- Legal research and case law\n- Motion drafting and briefs\n- Case strategy and planning\n- Compliance and risk assessment\n\nHow can I assist you today?`
  }

  const getContextualSuggestions = () => {
    if (selectedDocument) {
      return [
        { text: "Summarize key points", icon: FileText, action: "summarize_document" },
        { text: "Find potential issues", icon: AlertCircle, action: "analyze_risks" },
        { text: "Draft motion based on this", icon: Edit3, action: "draft_motion" },
        { text: "Research cited cases", icon: Search, action: "research_citations" }
      ]
    }
    
    if (context === 'legal_research') {
      return [
        { text: "Help me search case law", icon: Gavel, action: "search_cases" },
        { text: "Analyze this precedent", icon: Scale, action: "analyze_precedent" },
        { text: "Find similar cases", icon: Target, action: "find_similar" },
        { text: "Create research outline", icon: BookOpen, action: "create_outline" }
      ]
    }

    return [
      { text: "Analyze current page", icon: Eye, action: "analyze_page" },
      { text: "Legal document review", icon: FileText, action: "document_review" },
      { text: "Research assistance", icon: Search, action: "research_help" },
      { text: "Draft legal content", icon: Edit3, action: "draft_content" }
    ]
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)

    // Simulate AI response with realistic legal content
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage, context, selectedDocument)
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
      updateSuggestions(inputMessage)
    }, 1500)
  }

  const generateAIResponse = (userInput, context, document) => {
    // Simulate intelligent legal AI responses based on context
    const responses = {
      document_analysis: {
        content: `📋 **Document Analysis Complete**\n\n**Key Findings:**\n• Settlement amount: $340,000\n• Deadline: 3 business days for acceptance\n• Missing: Medical records verification\n• Risk level: Medium\n\n**Recommendations:**\n1. Verify medical damages calculation\n2. Review statute of limitations\n3. Consider counter-offer at $375,000\n4. Prepare alternative dispute resolution\n\n**Next Steps:**\n- Schedule client consultation\n- Request additional medical records\n- Draft counter-proposal`,
        suggestions: [
          { text: "Draft counter-proposal", icon: Edit3, action: "draft_counter" },
          { text: "Calculate damages", icon: Calculator, action: "calculate_damages" },
          { text: "Research precedents", icon: Search, action: "research_precedents" }
        ]
      },
      legal_research: {
        content: `🔍 **Legal Research Results**\n\n**Found 23 relevant cases:**\n\n**Primary Precedents:**\n• *Johnson v. Metro Insurance* (2021) - Similar settlement range\n• *Davis Construction Liability* (2020) - Comparable damages\n• *Williams Medical Malpractice* (2019) - Relevant procedural issues\n\n**Key Legal Principles:**\n1. Comparative negligence applies\n2. Medical damages cap: $500K in this jurisdiction\n3. Discovery deadline extensions rarely granted\n\n**Strategic Implications:**\n- Strong case for settlement in our favor\n- Defendant likely motivated to avoid trial\n- Consider mediation as next step`,
        suggestions: [
          { text: "View full case citations", icon: BookOpen, action: "show_citations" },
          { text: "Compare case outcomes", icon: BarChart3, action: "compare_outcomes" },
          { text: "Draft brief outline", icon: Edit3, action: "draft_brief" }
        ]
      },
      web_research: {
        content: `🌐 **Web Research Analysis**\n\n**Content Summary:**\n• Page contains 15 relevant legal references\n• 3 potential factual discrepancies identified\n• 2 supporting citations found\n\n**Key Information Extracted:**\n- Defendant company has 12 prior similar cases\n- Average settlement: $280K - $450K range\n- Recent regulatory changes may impact case\n\n**Credibility Assessment:**\n✅ Source appears reliable\n⚠️ Claims need verification\n❌ One citation appears outdated\n\n**Research Recommendations:**\n1. Cross-reference with Westlaw\n2. Verify recent regulatory changes\n3. Check defendant's litigation history`,
        suggestions: [
          { text: "Verify claims", icon: CheckCircle, action: "verify_claims" },
          { text: "Find more sources", icon: Search, action: "find_sources" },
          { text: "Export findings", icon: Download, action: "export_findings" }
        ]
      }
    }

    // Choose response based on input and context
    let responseType = 'document_analysis'
    if (userInput.toLowerCase().includes('research') || userInput.toLowerCase().includes('case')) {
      responseType = 'legal_research'
    } else if (userInput.toLowerCase().includes('page') || userInput.toLowerCase().includes('website')) {
      responseType = 'web_research'
    }

    const selectedResponse = responses[responseType]

    return {
      id: Date.now(),
      type: 'ai',
      content: selectedResponse.content,
      timestamp: new Date().toISOString(),
      suggestions: selectedResponse.suggestions
    }
  }

  const updateSuggestions = (lastMessage) => {
    // Update contextual suggestions based on conversation
    const newSuggestions = [
      { text: "Explain this further", icon: Lightbulb, action: "explain_more" },
      { text: "Find supporting cases", icon: Search, action: "find_support" },
      { text: "Draft based on this", icon: Edit3, action: "draft_document" },
      { text: "What are the risks?", icon: AlertCircle, action: "assess_risks" }
    ]
    setSuggestions(newSuggestions)
  }

  const handleSuggestionClick = (suggestion) => {
    setInputMessage(suggestion.text)
    handleSendMessage()
  }

  const handleVoiceToggle = () => {
    setIsListening(!isListening)
    if (!isListening) {
      // Simulate voice recognition
      setTimeout(() => {
        setInputMessage("Analyze the settlement terms in this document")
        setIsListening(false)
      }, 3000)
    }
  }

  if (isMinimized) {
    return (
      <div className="fixed top-20 right-4 z-50">
        <button
          onClick={() => setIsMinimized(false)}
          className="flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl shadow-lg hover:from-purple-500 hover:to-blue-500 transition-all"
        >
          <Brain className="w-5 h-5 text-white animate-pulse" />
          <span className="text-white font-medium">Maya AI</span>
          {messages.length > 1 && (
            <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
          )}
        </button>
      </div>
    )
  }

  return (
    <div className="w-96 h-full bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 border-l border-gray-700 flex flex-col">
      
      {/* Header */}
      <div className="p-4 border-b border-gray-700 bg-gradient-to-r from-purple-600/10 to-blue-600/10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-white">Maya AI Assistant</h3>
              <p className="text-xs text-gray-400">Legal Intelligence Engine</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setIsMinimized(true)}
              className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* AI Mode Selector */}
        <div className="flex space-x-1 bg-gray-800 rounded-lg p-1">
          {[
            { id: 'chat', icon: MessageSquare, label: 'Chat' },
            { id: 'analyze', icon: Eye, label: 'Analyze' },
            { id: 'research', icon: Search, label: 'Research' },
            { id: 'draft', icon: Edit3, label: 'Draft' }
          ].map((mode) => {
            const Icon = mode.icon
            return (
              <button
                key={mode.id}
                onClick={() => setAiMode(mode.id)}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-xs font-medium transition-all ${
                  aiMode === mode.id
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                <Icon className="w-3 h-3" />
                <span>{mode.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] ${
              message.type === 'user'
                ? 'bg-blue-600 text-white rounded-lg rounded-br-sm'
                : 'bg-gray-800 text-gray-100 rounded-lg rounded-bl-sm border border-gray-700'
            } p-3`}>
              
              {message.type === 'ai' && (
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                    <Bot className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-xs font-medium text-purple-400">Maya AI</span>
                  <span className="text-xs text-gray-500">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              )}

              <div className="text-sm leading-relaxed whitespace-pre-line">
                {message.content}
              </div>

              {message.type === 'ai' && (
                <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-700">
                  <div className="flex items-center space-x-2">
                    <button className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-white">
                      <ThumbsUp className="w-3 h-3" />
                    </button>
                    <button className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-white">
                      <ThumbsDown className="w-3 h-3" />
                    </button>
                    <button className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-white">
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                  <button className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-white">
                    <MoreVertical className="w-3 h-3" />
                  </button>
                </div>
              )}

              {/* AI Suggestions */}
              {message.suggestions && message.suggestions.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-600">
                  <p className="text-xs text-gray-400 mb-2">Quick actions:</p>
                  <div className="flex flex-wrap gap-2">
                    {message.suggestions.map((suggestion, idx) => {
                      const Icon = suggestion.icon
                      return (
                        <button
                          key={idx}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="flex items-center space-x-1 px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded-md text-xs text-gray-300 hover:text-white transition-colors"
                        >
                          <Icon className="w-3 h-3" />
                          <span>{suggestion.text}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-800 rounded-lg rounded-bl-sm p-3 border border-gray-700">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                  <Bot className="w-3 h-3 text-white" />
                </div>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Context Status */}
      {(selectedDocument || context !== 'general_browsing') && (
        <div className="px-4 py-2 bg-gray-800 border-t border-gray-700">
          <div className="flex items-center space-x-2 text-xs">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-gray-400">
              {selectedDocument ? `Analyzing: ${selectedDocument.name}` : `Context: ${context.replace('_', ' ')}`}
            </span>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 border-t border-gray-700 bg-gray-900">
        
        {/* Global Suggestions */}
        {suggestions.length > 0 && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion, idx) => {
                const Icon = suggestion.icon
                return (
                  <button
                    key={idx}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="flex items-center space-x-1 px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded-md text-xs text-gray-300 hover:text-white transition-colors"
                  >
                    <Icon className="w-3 h-3" />
                    <span>{suggestion.text}</span>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Voice Listening Status */}
        {isListening && (
          <div className="mb-3 p-3 bg-blue-600/10 border border-blue-600/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <Volume2 className="w-4 h-4 text-blue-400 animate-pulse" />
              <span className="text-sm text-blue-400">Listening... Say your question</span>
            </div>
            <div className="flex items-center space-x-1 mt-2">
              <div className="w-2 h-4 bg-blue-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-6 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-3 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
              <div className="w-2 h-5 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></div>
              <div className="w-2 h-4 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
            </div>
          </div>
        )}

        {/* Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSendMessage()
          }}
          className="flex items-center space-x-2"
        >
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask me anything about law, documents, or research..."
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none pr-10"
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-white"
            >
              <Paperclip className="w-4 h-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={handleVoiceToggle}
            className={`p-2 rounded-lg transition-all ${
              isListening
                ? 'bg-red-600 text-white animate-pulse'
                : 'bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white'
            }`}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          <button
            type="submit"
            disabled={!inputMessage.trim()}
            className="p-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
          >
            <Send className="w-4 h-4 text-white" />
          </button>
        </form>

        <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
          <span>Maya AI can make mistakes. Verify important information.</span>
          <div className="flex items-center space-x-2">
            <div className="w-1 h-1 bg-green-400 rounded-full"></div>
            <span>Connected</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AIAssistantSidebar