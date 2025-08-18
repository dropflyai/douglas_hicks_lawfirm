// AI Brain Module - Advanced Case Scoring and Analysis Engine
// Powered by Douglas Hicks Law proprietary algorithms

export class LegalAIBrain {
  constructor() {
    this.version = '2.0'
    this.modelName = 'DHL-Legal-Intelligence-v2'
  }

  // Main case analysis with advanced scoring
  analyzeCaseValue(caseData) {
    const baseScore = this.calculateBaseScore(caseData)
    const multipliers = this.calculateMultipliers(caseData)
    const riskFactors = this.assessRiskFactors(caseData)
    const precedentMatch = this.matchHistoricalPrecedents(caseData)
    
    const finalScore = baseScore * multipliers.total * (1 - riskFactors.reduction)
    const confidence = this.calculateConfidence(caseData, precedentMatch)
    
    return {
      estimatedValue: this.formatCaseValue(finalScore),
      rawScore: finalScore,
      confidence: `${Math.round(confidence * 100)}%`,
      tier: this.determineCaseTier(finalScore),
      recommendation: this.generateRecommendation(finalScore, confidence),
      analysis: this.generateDetailedAnalysis(caseData, finalScore, multipliers, riskFactors),
      precedents: precedentMatch,
      timeline: this.estimateTimeline(caseData, finalScore),
      successProbability: this.calculateSuccessProbability(caseData, precedentMatch)
    }
  }

  // Calculate base score from injury/damage severity
  calculateBaseScore(caseData) {
    const scoreMatrix = {
      // Personal Injury
      'catastrophic_injury': 5000000,
      'permanent_disability': 3000000,
      'serious_injury': 1500000,
      'moderate_injury': 500000,
      'minor_injury': 100000,
      
      // Civil Rights
      'systematic_discrimination': 4000000,
      'police_brutality': 3500000,
      'wrongful_termination': 1000000,
      'harassment': 500000,
      'discrimination': 750000,
      
      // Product Liability
      'multiple_victims': 10000000,
      'design_defect': 5000000,
      'manufacturing_defect': 2000000,
      'failure_to_warn': 1000000,
      
      // Medical Malpractice
      'wrongful_death': 5000000,
      'surgical_error': 3000000,
      'misdiagnosis': 1500000,
      'medication_error': 750000,
      
      // Employment
      'class_action': 8000000,
      'executive_termination': 2000000,
      'wage_theft': 500000,
      'retaliation': 750000
    }
    
    let score = 100000 // Base minimum
    
    // Check injury severity
    if (caseData.injurySeverity) {
      const severityKey = caseData.injurySeverity.toLowerCase().replace(/\s+/g, '_')
      score = scoreMatrix[severityKey] || score
    }
    
    // Check case type
    if (caseData.caseType) {
      const typeKey = caseData.caseType.toLowerCase().replace(/\s+/g, '_')
      if (scoreMatrix[typeKey]) {
        score = Math.max(score, scoreMatrix[typeKey])
      }
    }
    
    // Age factor (younger victims = higher damages)
    if (caseData.victimAge) {
      const age = parseInt(caseData.victimAge)
      if (age < 18) score *= 1.5
      else if (age < 30) score *= 1.3
      else if (age < 50) score *= 1.1
    }
    
    // Lost wages calculation
    if (caseData.annualIncome && caseData.yearsOfLostWork) {
      const lostWages = parseFloat(caseData.annualIncome) * parseFloat(caseData.yearsOfLostWork)
      score += lostWages
    }
    
    // Medical expenses
    if (caseData.medicalExpenses) {
      score += parseFloat(caseData.medicalExpenses) * 3 // Triple medical expenses
    }
    
    return score
  }

  // Calculate multipliers based on case factors
  calculateMultipliers(caseData) {
    const multipliers = {
      liability: 1.0,
      documentation: 1.0,
      witnesses: 1.0,
      defendant: 1.0,
      publicInterest: 1.0,
      emotionalImpact: 1.0
    }
    
    // Clear liability multiplier
    if (caseData.liabilityClear === 'yes' || caseData.evidence?.includes('video')) {
      multipliers.liability = 1.5
    } else if (caseData.liabilityClear === 'partial') {
      multipliers.liability = 0.7
    }
    
    // Documentation strength
    if (caseData.documentation?.includes('medical_records')) multipliers.documentation *= 1.2
    if (caseData.documentation?.includes('police_report')) multipliers.documentation *= 1.15
    if (caseData.documentation?.includes('expert_opinion')) multipliers.documentation *= 1.25
    
    // Witness multiplier
    if (caseData.witnesses) {
      const witnessCount = parseInt(caseData.witnesses) || 0
      if (witnessCount > 5) multipliers.witnesses = 1.4
      else if (witnessCount > 2) multipliers.witnesses = 1.2
      else if (witnessCount > 0) multipliers.witnesses = 1.1
    }
    
    // Defendant type (deep pockets)
    const deepPocketDefendants = ['corporation', 'government', 'insurance', 'hospital', 'manufacturer']
    if (caseData.defendantType && deepPocketDefendants.includes(caseData.defendantType.toLowerCase())) {
      multipliers.defendant = 1.8
    }
    
    // Public interest/media attention
    if (caseData.mediaAttention === 'high' || caseData.publicInterest === 'yes') {
      multipliers.publicInterest = 1.3
    }
    
    // Emotional impact
    if (caseData.emotionalDistress === 'severe') multipliers.emotionalImpact = 1.4
    else if (caseData.emotionalDistress === 'moderate') multipliers.emotionalImpact = 1.2
    
    // Calculate total multiplier
    multipliers.total = Object.values(multipliers).reduce((a, b) => a * b, 1)
    
    return multipliers
  }

  // Assess risk factors that might reduce case value
  assessRiskFactors(caseData) {
    const risks = {
      preExistingCondition: 0,
      contributoryNegligence: 0,
      statuteOfLimitations: 0,
      jurisdictionalIssues: 0,
      credibilityIssues: 0
    }
    
    // Pre-existing conditions
    if (caseData.preExistingConditions === 'yes') {
      risks.preExistingCondition = 0.15
    }
    
    // Contributory negligence
    if (caseData.contributoryNegligence === 'partial') {
      risks.contributoryNegligence = 0.2
    } else if (caseData.contributoryNegligence === 'significant') {
      risks.contributoryNegligence = 0.4
    }
    
    // Statute of limitations concerns
    if (caseData.incidentDate) {
      const daysSinceIncident = this.daysSince(caseData.incidentDate)
      if (daysSinceIncident > 700) risks.statuteOfLimitations = 0.1
      if (daysSinceIncident > 1000) risks.statuteOfLimitations = 0.3
    }
    
    // Jurisdiction issues
    if (caseData.jurisdiction === 'unfavorable') {
      risks.jurisdictionalIssues = 0.15
    }
    
    // Credibility concerns
    if (caseData.criminalHistory === 'yes') risks.credibilityIssues = 0.1
    if (caseData.inconsistentStatements === 'yes') risks.credibilityIssues += 0.15
    
    // Calculate total risk reduction
    risks.reduction = Math.min(0.6, Object.values(risks).reduce((a, b) => a + b, 0))
    
    return risks
  }

  // Match against historical precedents
  matchHistoricalPrecedents(caseData) {
    const precedents = []
    
    // Match based on case type and severity
    if (caseData.caseType === 'personal_injury' && caseData.injurySeverity === 'catastrophic') {
      precedents.push({
        case: 'Anderson v. General Motors',
        amount: '$4.9 Billion',
        similarity: '92%',
        attorney: 'Carl E. Douglas'
      })
    }
    
    if (caseData.caseType === 'civil_rights' && caseData.defendantType === 'government') {
      precedents.push({
        case: 'Family v. Los Angeles County',
        amount: '$8.0 Million',
        similarity: '85%',
        attorney: 'Douglas Hicks Team'
      })
    }
    
    if (caseData.caseType === 'wrongful_death') {
      precedents.push({
        case: 'Recent Wrongful Death Victory',
        amount: '$5.0 Million',
        similarity: '78%',
        attorney: 'Jamon R. Hicks'
      })
    }
    
    if (caseData.caseType === 'employment' && caseData.discriminationType) {
      precedents.push({
        case: 'Disability Discrimination v. Greystar',
        amount: '$1.576 Million',
        similarity: '71%',
        attorney: "A'ja Simplis"
      })
    }
    
    return precedents
  }

  // Calculate confidence in the analysis
  calculateConfidence(caseData, precedents) {
    let confidence = 0.5 // Base confidence
    
    // Increase confidence based on data completeness
    const dataPoints = Object.keys(caseData).length
    confidence += Math.min(0.2, dataPoints * 0.01)
    
    // Precedent matches increase confidence
    if (precedents.length > 0) {
      confidence += 0.1 * precedents.length
    }
    
    // Clear liability increases confidence
    if (caseData.liabilityClear === 'yes') confidence += 0.15
    
    // Good documentation increases confidence
    if (caseData.documentation?.length > 2) confidence += 0.1
    
    return Math.min(0.95, confidence)
  }

  // Determine case tier (Platinum, Gold, Silver, Bronze)
  determineCaseTier(score) {
    if (score > 5000000) return 'PLATINUM'
    if (score > 2000000) return 'GOLD'
    if (score > 500000) return 'SILVER'
    return 'BRONZE'
  }

  // Generate recommendation based on analysis
  generateRecommendation(score, confidence) {
    if (score > 5000000 && confidence > 0.8) {
      return 'IMMEDIATE PRIORITY - This case has exceptional value potential. Assign to senior partner immediately.'
    } else if (score > 2000000 && confidence > 0.7) {
      return 'HIGH PRIORITY - Strong case with significant value. Schedule consultation within 24 hours.'
    } else if (score > 1000000 && confidence > 0.6) {
      return 'PRIORITY CASE - Good potential for substantial recovery. Schedule consultation within 48 hours.'
    } else if (score > 500000) {
      return 'STANDARD INTAKE - Solid case worth pursuing. Schedule normal consultation.'
    } else {
      return 'EVALUATION NEEDED - Requires additional review to determine viability.'
    }
  }

  // Generate detailed analysis report
  generateDetailedAnalysis(caseData, score, multipliers, risks) {
    const strengths = []
    const weaknesses = []
    const opportunities = []
    
    // Identify strengths
    if (multipliers.liability > 1.2) strengths.push('Clear liability established')
    if (multipliers.documentation > 1.2) strengths.push('Strong documentation available')
    if (multipliers.witnesses > 1.1) strengths.push('Multiple credible witnesses')
    if (multipliers.defendant > 1.5) strengths.push('Deep-pocket defendant with payment capacity')
    if (multipliers.publicInterest > 1.2) strengths.push('High public interest potential')
    
    // Identify weaknesses
    if (risks.contributoryNegligence > 0) weaknesses.push('Potential contributory negligence issues')
    if (risks.preExistingCondition > 0) weaknesses.push('Pre-existing conditions may complicate damages')
    if (risks.statuteOfLimitations > 0) weaknesses.push('Statute of limitations concerns')
    if (risks.credibilityIssues > 0) weaknesses.push('Potential credibility challenges')
    
    // Identify opportunities
    if (caseData.mediaAttention === 'high') opportunities.push('Media attention could drive settlement')
    if (caseData.classAction === 'possible') opportunities.push('Potential for class action expansion')
    if (caseData.punitiveEligible === 'yes') opportunities.push('Punitive damages may apply')
    
    return {
      strengths,
      weaknesses,
      opportunities,
      overallAssessment: this.generateNarrative(score, strengths, weaknesses)
    }
  }

  // Generate narrative assessment
  generateNarrative(score, strengths, weaknesses) {
    const tier = this.determineCaseTier(score)
    let narrative = `This ${tier} tier case presents `
    
    if (strengths.length > weaknesses.length) {
      narrative += 'excellent potential for a substantial recovery. '
    } else if (strengths.length === weaknesses.length) {
      narrative += 'solid potential with some challenges to navigate. '
    } else {
      narrative += 'moderate potential requiring careful strategy. '
    }
    
    narrative += `Key advantages include ${strengths.slice(0, 2).join(' and ')}. `
    
    if (weaknesses.length > 0) {
      narrative += `We'll need to address ${weaknesses[0].toLowerCase()}. `
    }
    
    narrative += 'Douglas Hicks Law has the expertise to maximize this case value.'
    
    return narrative
  }

  // Estimate case timeline
  estimateTimeline(caseData, score) {
    let months = 12 // Base timeline
    
    // Adjust based on case value (bigger cases take longer)
    if (score > 5000000) months = 24
    else if (score > 2000000) months = 18
    else if (score > 1000000) months = 15
    
    // Adjust based on complexity
    if (caseData.multipleDefendants === 'yes') months += 6
    if (caseData.classAction === 'yes') months += 12
    if (caseData.expertWitnesses === 'multiple') months += 3
    
    // Fast track for clear cases
    if (caseData.liabilityClear === 'yes' && caseData.defendantAdmission === 'yes') {
      months = Math.max(6, months - 6)
    }
    
    return {
      minimum: Math.max(3, months - 3),
      expected: months,
      maximum: months + 6,
      factors: this.getTimelineFactors(caseData)
    }
  }

  // Get factors affecting timeline
  getTimelineFactors(caseData) {
    const factors = []
    
    if (caseData.liabilityClear === 'yes') factors.push('Clear liability may expedite')
    if (caseData.multipleDefendants === 'yes') factors.push('Multiple defendants will extend timeline')
    if (caseData.expertWitnesses === 'multiple') factors.push('Expert testimony preparation needed')
    if (caseData.classAction === 'yes') factors.push('Class certification process required')
    
    return factors
  }

  // Calculate success probability
  calculateSuccessProbability(caseData, precedents) {
    let probability = 0.7 // Base success rate
    
    // Adjust based on evidence strength
    if (caseData.liabilityClear === 'yes') probability += 0.15
    if (caseData.evidence?.includes('video')) probability += 0.1
    if (caseData.witnesses > 3) probability += 0.05
    
    // Adjust based on precedents
    if (precedents.length > 0) {
      probability += 0.05 * Math.min(2, precedents.length)
    }
    
    // Risk factors reduce probability
    if (caseData.contributoryNegligence === 'significant') probability -= 0.2
    if (caseData.credibilityIssues === 'yes') probability -= 0.1
    
    return {
      settlement: Math.min(0.95, probability + 0.1),
      trial: Math.min(0.85, probability),
      overall: Math.min(0.92, probability + 0.05)
    }
  }

  // Format case value for display
  formatCaseValue(value) {
    if (value > 1000000000) {
      return `$${(value / 1000000000).toFixed(1)}B`
    } else if (value > 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`
    } else if (value > 1000) {
      return `$${Math.round(value / 1000)}K`
    }
    return `$${Math.round(value)}`
  }

  // Calculate days since incident
  daysSince(dateString) {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  // Chat-specific intelligence
  analyzeChatIntent(message) {
    const lowerMessage = message.toLowerCase()
    
    // Injury-related keywords
    const injuryKeywords = ['hurt', 'injured', 'accident', 'pain', 'hospital', 'doctor', 'surgery']
    const hasInjury = injuryKeywords.some(keyword => lowerMessage.includes(keyword))
    
    // Legal keywords
    const legalKeywords = ['sue', 'lawyer', 'attorney', 'case', 'court', 'settlement', 'compensation']
    const hasLegalIntent = legalKeywords.some(keyword => lowerMessage.includes(keyword))
    
    // Urgency indicators
    const urgencyKeywords = ['emergency', 'urgent', 'immediately', 'asap', 'now', 'today']
    const isUrgent = urgencyKeywords.some(keyword => lowerMessage.includes(keyword))
    
    // Case type detection
    let caseType = 'general'
    if (lowerMessage.includes('discriminat') || lowerMessage.includes('harass')) caseType = 'discrimination'
    else if (lowerMessage.includes('fired') || lowerMessage.includes('terminat')) caseType = 'employment'
    else if (lowerMessage.includes('police') || lowerMessage.includes('arrest')) caseType = 'civil_rights'
    else if (lowerMessage.includes('car') || lowerMessage.includes('crash')) caseType = 'auto_accident'
    else if (lowerMessage.includes('slip') || lowerMessage.includes('fall')) caseType = 'premises_liability'
    else if (lowerMessage.includes('product') || lowerMessage.includes('defect')) caseType = 'product_liability'
    else if (lowerMessage.includes('medical') || lowerMessage.includes('malpractice')) caseType = 'medical_malpractice'
    
    return {
      hasInjury,
      hasLegalIntent,
      isUrgent,
      caseType,
      confidence: this.calculateIntentConfidence(hasInjury, hasLegalIntent, message.length),
      suggestedResponse: this.generateSmartResponse(caseType, isUrgent, hasInjury)
    }
  }

  // Calculate confidence in intent analysis
  calculateIntentConfidence(hasInjury, hasLegalIntent, messageLength) {
    let confidence = 0.5
    if (hasInjury) confidence += 0.2
    if (hasLegalIntent) confidence += 0.2
    if (messageLength > 50) confidence += 0.1
    return Math.min(1.0, confidence)
  }

  // Generate smart response based on analysis
  generateSmartResponse(caseType, isUrgent, hasInjury) {
    if (isUrgent && hasInjury) {
      return "I understand this is urgent and you're hurt. Let me connect you with our emergency intake team immediately. We can have an attorney call you within the hour."
    }
    
    const responses = {
      'discrimination': "I understand you may have experienced discrimination. This is a serious matter that our civil rights team specializes in. Let me gather some details to connect you with the right attorney.",
      'employment': "Employment law violations can be complex. Our team has recovered millions for wrongfully terminated employees. Let's discuss your situation.",
      'civil_rights': "Civil rights violations require immediate attention. Our Dream Team has extensive experience holding authorities accountable.",
      'auto_accident': "Car accidents can be traumatic. We'll help you get medical care and fight for maximum compensation. Our team has secured millions in auto accident cases.",
      'premises_liability': "Property owners have a duty to maintain safe conditions. We'll investigate your slip and fall thoroughly.",
      'product_liability': "Defective products can cause serious harm. We've taken on major corporations and won billions.",
      'medical_malpractice': "Medical errors can be devastating. Our experts will review your case thoroughly.",
      'general': "I'm here to help evaluate your legal situation. Our team has won over $4.9 billion in verdicts. Tell me more about what happened."
    }
    
    return responses[caseType] || responses.general
  }
}

// Export singleton instance
export const AIBrain = new LegalAIBrain()