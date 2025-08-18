// Training Data Structure for AI Agent
// Standardized format for machine learning and n8n workflows

export class TrainingDataManager {
  constructor() {
    this.version = '1.0'
    this.schema = 'douglas-hicks-law-training'
  }

  // Structure case data for AI training
  formatCaseTrainingData(caseData, outcome) {
    return {
      // Metadata
      id: `case_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      firm_id: 'douglas-hicks-law',
      data_type: 'case_training',
      version: this.version,
      
      // Input Features (what AI learns from)
      input: {
        // Case classification
        case_type: caseData.caseType,
        practice_area: this.mapCaseTypeToPracticeArea(caseData.caseType),
        
        // Damage factors
        injury_severity: caseData.injurySeverity || 'unknown',
        injury_type: caseData.injuryType || 'unknown',
        medical_expenses: this.normalizeAmount(caseData.medicalExpenses),
        lost_wages: this.normalizeAmount(caseData.lostWages),
        pain_suffering_score: this.calculatePainSufferingScore(caseData),
        
        // Liability factors
        liability_clarity: caseData.liabilityClear || 'partial',
        fault_percentage: caseData.faultPercentage || 50,
        witness_count: parseInt(caseData.witnesses) || 0,
        witness_quality: this.assessWitnessQuality(caseData.witnessTypes),
        
        // Evidence strength
        evidence_score: this.calculateEvidenceScore(caseData),
        documentation_quality: this.assessDocumentationQuality(caseData.documentation),
        expert_witness_available: !!caseData.expertWitnesses,
        
        // Defendant factors
        defendant_type: caseData.defendantType || 'individual',
        defendant_assets: this.assessDefendantAssets(caseData.defendantType),
        insurance_coverage: caseData.insuranceCoverage || 'unknown',
        
        // Legal factors
        jurisdiction: caseData.jurisdiction || 'california',
        venue_favorability: this.assessVenueFavorability(caseData.jurisdiction),
        statute_of_limitations_days: this.calculateSOLDays(caseData),
        precedent_strength: this.assessPrecedentStrength(caseData),
        
        // Client factors
        client_age: parseInt(caseData.victimAge) || 0,
        client_occupation: caseData.occupation || 'unknown',
        client_credibility: this.assessClientCredibility(caseData),
        client_cooperation: caseData.clientCooperation || 'good',
        
        // Case complexity
        complexity_score: this.calculateComplexityScore(caseData),
        discovery_scope: caseData.discoveryScope || 'standard',
        expert_fields_needed: caseData.expertFieldsNeeded || [],
        
        // External factors
        media_attention: caseData.mediaAttention || 'low',
        public_interest: caseData.publicInterest || 'low',
        political_sensitivity: caseData.politicalSensitivity || 'none'
      },
      
      // Target Output (what AI predicts)
      target: {
        // Primary targets
        settlement_amount: this.normalizeAmount(outcome.settlementAmount),
        case_duration_months: outcome.durationMonths || 0,
        success_probability: outcome.successProbability || 0,
        
        // Secondary targets
        settlement_vs_trial: outcome.resolution || 'settlement',
        attorney_hours: outcome.attorneyHours || 0,
        case_tier: outcome.tier || 'bronze',
        
        // Categorical outcomes
        case_accepted: outcome.accepted || false,
        referral_needed: outcome.referralNeeded || false,
        urgent_priority: outcome.urgentPriority || false
      },
      
      // Training metadata
      training_meta: {
        attorney_assigned: outcome.attorneyAssigned,
        case_source: caseData.source || 'website',
        confidence_override: outcome.attorneyConfidenceOverride,
        learning_weight: this.calculateLearningWeight(caseData, outcome),
        validation_status: 'pending' // pending, validated, rejected
      }
    }
  }

  // Structure chat data for NLP training
  formatChatTrainingData(chatData, response, userFeedback) {
    return {
      id: `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      firm_id: 'douglas-hicks-law',
      data_type: 'chat_training',
      version: this.version,
      
      // Input: User message and context
      input: {
        message: chatData.message,
        message_length: chatData.message.length,
        message_sentiment: this.analyzeSentiment(chatData.message),
        
        // Intent features
        legal_keywords: this.extractLegalKeywords(chatData.message),
        urgency_indicators: this.extractUrgencyIndicators(chatData.message),
        case_type_hints: this.extractCaseTypeHints(chatData.message),
        
        // Context
        conversation_stage: chatData.conversationStage || 'initial',
        previous_messages: chatData.previousMessages || [],
        user_session_data: chatData.sessionData || {},
        
        // Technical features
        time_of_day: new Date().getHours(),
        day_of_week: new Date().getDay(),
        referrer_source: chatData.referrer || 'direct'
      },
      
      // Target: Expected response and intent
      target: {
        intent_classification: response.intent,
        confidence_score: response.confidence,
        response_type: response.type,
        next_action: response.suggestedAction,
        urgency_level: response.urgencyLevel || 'normal',
        case_type_prediction: response.caseTypePrediction,
        handoff_required: response.handoffRequired || false
      },
      
      // Feedback loop
      feedback: {
        user_satisfaction: userFeedback?.satisfaction || null, // 1-5 scale
        response_helpfulness: userFeedback?.helpfulness || null,
        accuracy_rating: userFeedback?.accuracy || null,
        user_continued_conversation: userFeedback?.continued || null,
        led_to_consultation: userFeedback?.consultation || null
      }
    }
  }

  // Create feedback data for model improvement
  formatFeedbackData(originalPrediction, actualOutcome, source) {
    return {
      id: `feedback_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      firm_id: 'douglas-hicks-law',
      data_type: 'feedback',
      version: this.version,
      
      original_prediction: originalPrediction,
      actual_outcome: actualOutcome,
      prediction_accuracy: this.calculateAccuracy(originalPrediction, actualOutcome),
      
      feedback_source: source, // attorney, client, system
      learning_priority: this.calculateFeedbackPriority(originalPrediction, actualOutcome)
    }
  }

  // Helper methods for data processing
  mapCaseTypeToPracticeArea(caseType) {
    const mapping = {
      'personal_injury': 'Personal Injury',
      'auto_accident': 'Personal Injury',
      'slip_fall': 'Personal Injury',
      'civil_rights': 'Civil Rights',
      'police_brutality': 'Civil Rights',
      'discrimination': 'Civil Rights',
      'employment': 'Employment Law',
      'wrongful_termination': 'Employment Law',
      'medical_malpractice': 'Medical Malpractice',
      'product_liability': 'Product Liability'
    }
    return mapping[caseType] || 'General'
  }

  normalizeAmount(amount) {
    if (!amount) return 0
    const numAmount = parseFloat(String(amount).replace(/[$,]/g, ''))
    return isNaN(numAmount) ? 0 : numAmount
  }

  calculatePainSufferingScore(caseData) {
    let score = 0
    if (caseData.emotionalDistress === 'severe') score += 3
    else if (caseData.emotionalDistress === 'moderate') score += 2
    else if (caseData.emotionalDistress === 'mild') score += 1
    
    if (caseData.permanentDisability) score += 3
    if (caseData.chronicPain) score += 2
    if (caseData.scarring) score += 1
    
    return Math.min(score, 10) // 0-10 scale
  }

  calculateEvidenceScore(caseData) {
    let score = 0
    const evidence = caseData.evidence || []
    
    if (evidence.includes('video')) score += 4
    if (evidence.includes('photos')) score += 2
    if (evidence.includes('police_report')) score += 3
    if (evidence.includes('medical_records')) score += 3
    if (evidence.includes('witness_statements')) score += 2
    if (evidence.includes('expert_analysis')) score += 4
    
    return Math.min(score, 20) // 0-20 scale
  }

  extractLegalKeywords(message) {
    const keywords = [
      'lawsuit', 'sue', 'attorney', 'lawyer', 'court', 'settlement',
      'injury', 'accident', 'discrimination', 'harassment', 'fired',
      'police', 'brutality', 'rights', 'violated', 'wrongful', 'death'
    ]
    
    return keywords.filter(keyword => 
      message.toLowerCase().includes(keyword)
    )
  }

  calculateLearningWeight(caseData, outcome) {
    // Higher weight for unusual or high-value cases
    let weight = 1.0
    
    if (outcome.settlementAmount > 1000000) weight += 0.5
    if (outcome.resolution === 'trial') weight += 0.3
    if (caseData.complexity === 'high') weight += 0.2
    if (outcome.attorneyConfidenceOverride) weight += 0.4
    
    return Math.min(weight, 2.0)
  }

  // Export training data in various formats
  exportForN8N(trainingData) {
    return {
      webhook_data: trainingData,
      processing_instructions: {
        model_type: 'legal_case_analysis',
        update_frequency: 'real_time',
        validation_required: true
      }
    }
  }

  exportForOpenAI(trainingData) {
    return {
      messages: [
        {
          role: 'system',
          content: 'You are a legal case analysis AI for Douglas Hicks Law.'
        },
        {
          role: 'user',
          content: JSON.stringify(trainingData.input)
        },
        {
          role: 'assistant', 
          content: JSON.stringify(trainingData.target)
        }
      ],
      metadata: trainingData.training_meta
    }
  }

  // Create training batches for efficient processing
  createTrainingBatch(trainingDataArray, batchSize = 100) {
    const batches = []
    for (let i = 0; i < trainingDataArray.length; i += batchSize) {
      batches.push({
        batch_id: `batch_${Date.now()}_${i}`,
        data: trainingDataArray.slice(i, i + batchSize),
        size: Math.min(batchSize, trainingDataArray.length - i)
      })
    }
    return batches
  }
}

// Export singleton instance
export const TrainingData = new TrainingDataManager()