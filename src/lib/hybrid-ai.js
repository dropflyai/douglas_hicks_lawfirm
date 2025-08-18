// Hybrid AI System - Combines External AI Agent + Local Rule Engine
// Provides reliability, learning, and intelligent fallbacks

import { AIBrain } from './ai-brain'
import { VectorDB } from './vector-database'
import { TrainingData } from './training-data'

export class HybridAISystem {
  constructor() {
    this.version = '1.0'
    this.primaryAI = 'external' // external, local, hybrid
    this.fallbackEnabled = true
    this.learningEnabled = true
    this.confidence_threshold = 0.7
  }

  // Main analysis function with hybrid approach
  async analyzeCase(caseData, options = {}) {
    const startTime = Date.now()
    let result = null
    let source = 'unknown'
    let confidence = 0
    
    try {
      // Step 1: Try external AI agent first
      if (this.primaryAI === 'external' || this.primaryAI === 'hybrid') {
        result = await this.callExternalAI(caseData, 'case_analysis')
        if (result && result.confidence >= this.confidence_threshold) {
          source = 'external_ai'
          confidence = result.confidence
          
          // Log successful external AI usage
          await this.logAIUsage(caseData, result, 'external_ai', Date.now() - startTime)
          
          // Enhance with local data
          result = await this.enhanceWithLocalData(result, caseData)
          
          return this.formatResponse(result, source, confidence)
        }
      }
      
      // Step 2: Fallback to local AI brain
      if (this.fallbackEnabled) {
        console.log('External AI failed or low confidence, using local AI brain')
        result = AIBrain.analyzeCaseValue(caseData)
        source = 'local_ai'
        confidence = parseFloat(result.confidence.replace('%', '')) / 100
        
        // Enhance with vector database
        result = await this.enhanceWithVectorDB(result, caseData)
        
        await this.logAIUsage(caseData, result, 'local_ai', Date.now() - startTime)
        
        return this.formatResponse(result, source, confidence)
      }
      
      throw new Error('All AI systems failed')
      
    } catch (error) {
      console.error('Hybrid AI analysis error:', error)
      
      // Ultimate fallback: simplified analysis
      return this.emergencyFallback(caseData)
    }
  }

  // Analyze chat intent with hybrid approach
  async analyzeChatIntent(message, context = {}) {
    try {
      // Try external AI for natural language processing
      const externalResult = await this.callExternalAI({
        message,
        context,
        action: 'chat_intent'
      }, 'chat_analysis')
      
      if (externalResult && externalResult.confidence >= 0.6) {
        // Enhance with local context
        const enhanced = this.enhanceWithLocalContext(externalResult, context)
        await this.logChatAnalysis(message, enhanced, 'external_ai')
        return enhanced
      }
      
    } catch (error) {
      console.warn('External chat AI failed:', error)
    }
    
    // Fallback to local intent analysis
    const localResult = AIBrain.analyzeChatIntent(message)
    await this.logChatAnalysis(message, localResult, 'local_ai')
    return localResult
  }

  // Call external AI agent (n8n, OpenAI, etc.)
  async callExternalAI(data, analysisType) {
    const AI_ENDPOINT = process.env.NEXT_PUBLIC_AI_AGENT_URL || process.env.AI_AGENT_WEBHOOK_URL
    const API_KEY = process.env.AI_API_KEY
    
    if (!AI_ENDPOINT) {
      throw new Error('External AI endpoint not configured')
    }
    
    const payload = {
      timestamp: new Date().toISOString(),
      firm_id: 'douglas-hicks-law',
      analysis_type: analysisType,
      data: data,
      options: {
        include_precedents: true,
        include_recommendations: true,
        confidence_threshold: this.confidence_threshold
      }
    }
    
    const response = await fetch(AI_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        'X-Source': 'douglas-hicks-hybrid-ai',
        'X-Version': this.version
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(15000) // 15 second timeout
    })
    
    if (!response.ok) {
      throw new Error(`External AI responded with ${response.status}: ${response.statusText}`)
    }
    
    const result = await response.json()
    
    // Validate response structure
    if (!this.validateExternalResponse(result, analysisType)) {
      throw new Error('Invalid response structure from external AI')
    }
    
    return result
  }

  // Enhance external AI result with local data
  async enhanceWithLocalData(externalResult, caseData) {
    try {
      // Add local precedent matching
      const similarCases = await VectorDB.findSimilarCases(caseData, 3)
      if (similarCases.length > 0) {
        externalResult.local_precedents = similarCases
        externalResult.precedent_confidence = similarCases[0]?.similarity || 0
      }
      
      // Add local legal knowledge
      const localAnalysis = AIBrain.analyzeCaseValue(caseData)
      externalResult.local_validation = {
        tier: localAnalysis.tier,
        risk_factors: localAnalysis.analysis.weaknesses,
        local_confidence: localAnalysis.confidence
      }
      
      // Cross-validate results
      externalResult.validation_score = this.crossValidate(externalResult, localAnalysis)
      
      return externalResult
      
    } catch (error) {
      console.warn('Failed to enhance with local data:', error)
      return externalResult
    }
  }

  // Enhance local result with vector database
  async enhanceWithVectorDB(localResult, caseData) {
    try {
      const similarCases = await VectorDB.findSimilarCases(caseData, 5)
      
      if (similarCases.length > 0) {
        localResult.vector_precedents = similarCases
        localResult.precedent_strength = this.calculatePrecedentStrength(similarCases)
        
        // Adjust confidence based on precedent quality
        const precedentBoost = similarCases[0]?.similarity > 0.8 ? 0.1 : 0.05
        const currentConfidence = parseFloat(localResult.confidence.replace('%', ''))
        localResult.confidence = `${Math.min(95, currentConfidence + precedentBoost * 100)}%`
      }
      
      return localResult
      
    } catch (error) {
      console.warn('Failed to enhance with vector DB:', error)
      return localResult
    }
  }

  // Enhance chat result with local context
  enhanceWithLocalContext(externalResult, context) {
    // Add firm-specific context
    externalResult.firm_context = {
      practice_areas: ['Civil Rights', 'Personal Injury', 'Employment', 'Medical Malpractice'],
      specialties: ['Dream Team Experience', '$4.9B Record Verdict', 'Police Brutality'],
      recent_wins: ['$8M Police Brutality', '$5M Wrongful Death', '$1.576M Discrimination']
    }
    
    // Add session context
    if (context.previous_messages) {
      externalResult.conversation_continuity = this.analyzeConversationFlow(context.previous_messages)
    }
    
    return externalResult
  }

  // Cross-validate external and local results
  crossValidate(externalResult, localResult) {
    let validationScore = 0.5 // Baseline
    
    // Compare estimated values (within 50% range is good)
    const externalValue = this.parseValue(externalResult.estimated_value)
    const localValue = this.parseValue(localResult.estimatedValue)
    
    if (externalValue && localValue) {
      const ratio = Math.min(externalValue, localValue) / Math.max(externalValue, localValue)
      if (ratio > 0.5) validationScore += 0.2
      if (ratio > 0.7) validationScore += 0.1
    }
    
    // Compare confidence levels
    const externalConf = parseFloat(externalResult.confidence) || 0
    const localConf = parseFloat(localResult.confidence.replace('%', '')) / 100 || 0
    
    const confDiff = Math.abs(externalConf - localConf)
    if (confDiff < 0.2) validationScore += 0.15
    if (confDiff < 0.1) validationScore += 0.1
    
    // Compare recommendations/tiers
    if (externalResult.tier === localResult.tier) {
      validationScore += 0.15
    }
    
    return Math.min(1.0, validationScore)
  }

  // Emergency fallback for when all AI systems fail
  emergencyFallback(caseData) {
    console.log('Using emergency fallback analysis')
    
    return {
      estimatedValue: '$500K+',
      confidence: '60%',
      tier: 'REVIEW',
      source: 'emergency_fallback',
      recommendation: 'Case requires human attorney review - AI systems unavailable',
      analysis: {
        strengths: ['Case submitted for review'],
        weaknesses: ['AI analysis unavailable'],
        overallAssessment: 'Unable to perform automated analysis. Please contact our attorneys directly for immediate consultation.'
      },
      precedents: [],
      timeline: { expected: 12, minimum: 6, maximum: 18 },
      successProbability: { overall: 0.7, settlement: 0.8, trial: 0.6 },
      emergency_mode: true
    }
  }

  // Log AI usage for monitoring and improvement
  async logAIUsage(input, output, source, responseTime) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      source: source,
      input_hash: this.hashObject(input),
      output_summary: this.summarizeOutput(output),
      response_time_ms: responseTime,
      confidence: output.confidence || 'unknown',
      success: true,
      version: this.version
    }
    
    // Send to monitoring/analytics
    if (process.env.ANALYTICS_WEBHOOK) {
      try {
        await fetch(process.env.ANALYTICS_WEBHOOK, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(logEntry)
        })
      } catch (error) {
        console.warn('Analytics logging failed:', error)
      }
    }
    
    // Store for training if learning is enabled
    if (this.learningEnabled) {
      await this.storeForTraining(input, output, source)
    }
  }

  // Store data for training
  async storeForTraining(input, output, source) {
    try {
      const trainingData = TrainingData.formatCaseTrainingData(input, {
        settlementAmount: this.parseValue(output.estimatedValue),
        successProbability: output.successProbability?.overall || 0.7,
        tier: output.tier,
        accepted: true,
        source: source
      })
      
      // Send to training pipeline
      if (process.env.TRAINING_WEBHOOK) {
        await fetch(process.env.TRAINING_WEBHOOK, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(trainingData)
        })
      }
      
    } catch (error) {
      console.warn('Training data storage failed:', error)
    }
  }

  // Submit feedback for model improvement
  async submitFeedback(analysisId, actualOutcome, attorneyFeedback) {
    try {
      const feedbackData = TrainingData.formatFeedbackData(
        { analysis_id: analysisId },
        actualOutcome,
        'attorney'
      )
      
      feedbackData.attorney_feedback = attorneyFeedback
      feedbackData.learning_priority = attorneyFeedback.priority || 'normal'
      
      // Send to external AI for learning
      if (process.env.AI_AGENT_WEBHOOK_URL) {
        await fetch(process.env.AI_AGENT_WEBHOOK_URL + '/feedback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.AI_API_KEY}`
          },
          body: JSON.stringify(feedbackData)
        })
      }
      
      return { success: true, feedback_id: feedbackData.id }
      
    } catch (error) {
      console.error('Feedback submission failed:', error)
      return { success: false, error: error.message }
    }
  }

  // Utility functions
  parseValue(valueString) {
    if (!valueString) return 0
    const cleaned = valueString.replace(/[$,KMB]/g, '')
    const num = parseFloat(cleaned)
    
    if (valueString.includes('B')) return num * 1000000000
    if (valueString.includes('M')) return num * 1000000
    if (valueString.includes('K')) return num * 1000
    return num || 0
  }

  hashObject(obj) {
    return btoa(JSON.stringify(obj)).substring(0, 16)
  }

  summarizeOutput(output) {
    return {
      value: output.estimatedValue || output.estimated_value,
      tier: output.tier,
      confidence: output.confidence
    }
  }

  validateExternalResponse(response, analysisType) {
    if (analysisType === 'case_analysis') {
      return response.estimated_value && response.confidence && response.tier
    }
    if (analysisType === 'chat_analysis') {
      return response.intent && response.confidence
    }
    return false
  }

  calculatePrecedentStrength(precedents) {
    if (!precedents.length) return 0
    const avgSimilarity = precedents.reduce((sum, p) => sum + p.similarity, 0) / precedents.length
    const recentCases = precedents.filter(p => p.year >= 2020).length
    return (avgSimilarity * 0.7) + (recentCases / precedents.length * 0.3)
  }

  formatResponse(result, source, confidence) {
    return {
      ...result,
      meta: {
        source: source,
        confidence: confidence,
        timestamp: new Date().toISOString(),
        version: this.version,
        hybrid_system: true
      }
    }
  }

  // Configuration methods
  setMode(mode) {
    if (['external', 'local', 'hybrid'].includes(mode)) {
      this.primaryAI = mode
    }
  }

  setConfidenceThreshold(threshold) {
    this.confidence_threshold = Math.max(0.1, Math.min(1.0, threshold))
  }

  enableLearning(enabled = true) {
    this.learningEnabled = enabled
  }

  // Health check
  async healthCheck() {
    const health = {
      status: 'healthy',
      local_ai: true,
      vector_db: VectorDB.getCaseStatistics().total_cases > 0,
      external_ai: false,
      configuration: {
        primary_mode: this.primaryAI,
        fallback_enabled: this.fallbackEnabled,
        learning_enabled: this.learningEnabled,
        confidence_threshold: this.confidence_threshold
      }
    }
    
    // Test external AI
    try {
      if (process.env.AI_AGENT_WEBHOOK_URL) {
        const testResponse = await fetch(process.env.AI_AGENT_WEBHOOK_URL + '/health', {
          method: 'GET',
          timeout: 5000
        })
        health.external_ai = testResponse.ok
      }
    } catch (error) {
      health.external_ai_error = error.message
    }
    
    return health
  }
}

// Export singleton instance
export const HybridAI = new HybridAISystem()