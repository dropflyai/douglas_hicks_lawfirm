// Vector Database for Case Precedents and Legal Knowledge
// Enables semantic search and similar case matching

export class VectorDatabase {
  constructor() {
    this.version = '1.0'
    this.embeddings_model = 'text-embedding-ada-002' // OpenAI default
    this.similarity_threshold = 0.7
  }

  // Case precedent vectors for semantic matching
  casePrecedents = [
    {
      id: 'anderson_v_gm_1999',
      case_name: 'Anderson v. General Motors',
      amount: 4900000000,
      year: 1999,
      attorney: 'Carl E. Douglas',
      case_type: 'product_liability',
      practice_area: 'Personal Injury',
      injury_type: 'burns',
      severity: 'catastrophic',
      defendant: 'General Motors',
      description: 'Product liability case involving defective fuel tank design causing catastrophic burns. Largest personal injury verdict in U.S. history at the time.',
      legal_issues: ['product_defect', 'design_flaw', 'corporate_negligence', 'punitive_damages'],
      outcome: 'verdict',
      precedent_value: 'landmark',
      // This would be the actual vector embedding in production
      vector: null, // generateEmbedding(description + legal_issues)
      keywords: ['product liability', 'burns', 'fuel tank', 'design defect', 'general motors', 'catastrophic injury']
    },
    
    {
      id: 'family_v_la_county_2024',
      case_name: 'Family v. Los Angeles County',
      amount: 8000000,
      year: 2024,
      attorney: 'Douglas Hicks Legal Team',
      case_type: 'civil_rights',
      practice_area: 'Civil Rights',
      injury_type: 'wrongful_death',
      severity: 'fatal',
      defendant: 'Los Angeles County',
      description: 'Police brutality case resulting in wrongful death by sheriff deputies. Set new precedent for police accountability.',
      legal_issues: ['police_brutality', 'excessive_force', 'wrongful_death', 'civil_rights_violation'],
      outcome: 'settlement',
      precedent_value: 'recent',
      vector: null,
      keywords: ['police brutality', 'wrongful death', 'civil rights', 'los angeles county', 'sheriff deputies']
    },
    
    {
      id: 'wrongful_death_2023',
      case_name: 'Wrongful Death Medical Malpractice',
      amount: 5000000,
      year: 2023,
      attorney: 'Jamon R. Hicks',
      case_type: 'medical_malpractice',
      practice_area: 'Medical Malpractice',
      injury_type: 'wrongful_death',
      severity: 'fatal',
      defendant: 'Medical Center',
      description: 'Medical malpractice resulting in wrongful death due to surgical error and failure to diagnose.',
      legal_issues: ['medical_malpractice', 'surgical_error', 'failure_to_diagnose', 'wrongful_death'],
      outcome: 'settlement',
      precedent_value: 'recent',
      vector: null,
      keywords: ['medical malpractice', 'wrongful death', 'surgical error', 'failure to diagnose']
    },
    
    {
      id: 'disability_discrimination_2024',
      case_name: 'Disability Discrimination v. Greystar',
      amount: 1576000,
      year: 2024,
      attorney: "A'ja Simplis",
      case_type: 'discrimination',
      practice_area: 'Civil Rights',
      injury_type: 'emotional_distress',
      severity: 'moderate',
      defendant: 'Greystar Management',
      description: 'Disability discrimination case involving housing rights violations and ADA compliance failures.',
      legal_issues: ['disability_discrimination', 'ada_violation', 'housing_rights', 'emotional_distress'],
      outcome: 'settlement',
      precedent_value: 'recent',
      vector: null,
      keywords: ['disability discrimination', 'ada violation', 'housing rights', 'greystar management']
    },
    
    {
      id: 'employment_discrimination_2024',
      case_name: 'Employment Discrimination v. El Monte USD',
      amount: 733000,
      year: 2024,
      attorney: 'Douglas Hicks Legal Team',
      case_type: 'employment',
      practice_area: 'Employment Law',
      injury_type: 'economic_loss',
      severity: 'moderate',
      defendant: 'El Monte Union High School District',
      description: 'Employment discrimination case involving wrongful termination and workplace harassment.',
      legal_issues: ['employment_discrimination', 'wrongful_termination', 'workplace_harassment', 'retaliation'],
      outcome: 'settlement',
      precedent_value: 'recent',
      vector: null,
      keywords: ['employment discrimination', 'wrongful termination', 'workplace harassment', 'school district']
    }
  ]

  // Find similar cases using vector similarity
  async findSimilarCases(inputCase, limit = 5) {
    try {
      // Generate embedding for input case
      const inputVector = await this.generateCaseEmbedding(inputCase)
      
      // Calculate similarities
      const similarities = this.casePrecedents.map(precedent => ({
        ...precedent,
        similarity: this.calculateSimilarity(inputVector, precedent, inputCase)
      }))
      
      // Sort by similarity and filter above threshold
      return similarities
        .filter(case => case.similarity >= this.similarity_threshold)
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, limit)
        
    } catch (error) {
      console.error('Vector search error:', error)
      // Fallback to keyword matching
      return this.keywordBasedMatching(inputCase, limit)
    }
  }

  // Generate case embedding (in production, use OpenAI API)
  async generateCaseEmbedding(caseData) {
    // Combine relevant case features into text
    const caseText = this.caseToText(caseData)
    
    // In production, call OpenAI embeddings API:
    // const response = await openai.embeddings.create({
    //   model: this.embeddings_model,
    //   input: caseText
    // })
    // return response.data[0].embedding
    
    // Mock embedding for demo
    return this.mockEmbedding(caseText)
  }

  // Convert case data to searchable text
  caseToText(caseData) {
    const parts = [
      caseData.caseType || '',
      caseData.injurySeverity || '',
      caseData.defendantType || '',
      (caseData.description || ''),
      (caseData.legal_issues || []).join(' '),
      (caseData.keywords || []).join(' ')
    ]
    
    return parts.filter(Boolean).join(' ').toLowerCase()
  }

  // Calculate similarity between cases (simplified)
  calculateSimilarity(inputVector, precedent, inputCase) {
    // In production, use cosine similarity between vectors
    // For demo, use keyword + feature matching
    
    let similarity = 0
    
    // Case type match (high weight)
    if (inputCase.caseType === precedent.case_type) {
      similarity += 0.4
    }
    
    // Practice area match
    const inputPracticeArea = this.mapCaseTypeToPracticeArea(inputCase.caseType)
    if (inputPracticeArea === precedent.practice_area) {
      similarity += 0.3
    }
    
    // Severity match
    if (inputCase.injurySeverity === precedent.severity) {
      similarity += 0.2
    }
    
    // Keyword matching
    const inputKeywords = this.extractKeywords(inputCase)
    const matchingKeywords = inputKeywords.filter(keyword => 
      precedent.keywords.includes(keyword)
    )
    similarity += (matchingKeywords.length / Math.max(inputKeywords.length, 1)) * 0.1
    
    return Math.min(similarity, 1.0)
  }

  // Fallback keyword-based matching
  keywordBasedMatching(inputCase, limit) {
    const inputKeywords = this.extractKeywords(inputCase)
    
    return this.casePrecedents
      .map(precedent => ({
        ...precedent,
        similarity: this.keywordSimilarity(inputKeywords, precedent.keywords)
      }))
      .filter(case => case.similarity > 0.3)
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, limit)
  }

  // Calculate keyword similarity
  keywordSimilarity(keywords1, keywords2) {
    const intersection = keywords1.filter(k => keywords2.includes(k))
    const union = [...new Set([...keywords1, ...keywords2])]
    return intersection.length / union.length
  }

  // Extract keywords from case data
  extractKeywords(caseData) {
    const keywords = []
    
    if (caseData.caseType) keywords.push(caseData.caseType.replace('_', ' '))
    if (caseData.injurySeverity) keywords.push(caseData.injurySeverity)
    if (caseData.defendantType) keywords.push(caseData.defendantType)
    
    // Extract from description
    if (caseData.description) {
      const legalTerms = this.extractLegalTerms(caseData.description)
      keywords.push(...legalTerms)
    }
    
    return keywords.filter(Boolean).map(k => k.toLowerCase())
  }

  // Extract legal terms from text
  extractLegalTerms(text) {
    const legalTerms = [
      'negligence', 'malpractice', 'discrimination', 'harassment',
      'wrongful termination', 'police brutality', 'civil rights',
      'product liability', 'medical error', 'car accident',
      'slip and fall', 'premises liability', 'defective product'
    ]
    
    return legalTerms.filter(term => 
      text.toLowerCase().includes(term)
    )
  }

  // Mock embedding function (replace with OpenAI in production)
  mockEmbedding(text) {
    // Generate pseudo-random vector based on text hash
    const hash = this.simpleHash(text)
    const vector = []
    for (let i = 0; i < 1536; i++) { // OpenAI ada-002 dimension
      vector.push((hash * (i + 1)) % 2 - 1) // Random between -1 and 1
    }
    return vector
  }

  // Simple hash function
  simpleHash(str) {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32-bit integer
    }
    return Math.abs(hash) / Math.pow(2, 31)
  }

  // Map case types to practice areas
  mapCaseTypeToPracticeArea(caseType) {
    const mapping = {
      'personal_injury': 'Personal Injury',
      'auto_accident': 'Personal Injury',
      'civil_rights': 'Civil Rights',
      'discrimination': 'Civil Rights',
      'employment': 'Employment Law',
      'medical_malpractice': 'Medical Malpractice',
      'product_liability': 'Product Liability'
    }
    return mapping[caseType] || 'General'
  }

  // Add new case precedent to database
  async addCasePrecedent(caseData, outcome) {
    const precedent = {
      id: `case_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      case_name: caseData.caseName || 'New Case',
      amount: outcome.settlementAmount || 0,
      year: new Date().getFullYear(),
      attorney: outcome.attorney || 'Douglas Hicks Legal Team',
      case_type: caseData.caseType,
      practice_area: this.mapCaseTypeToPracticeArea(caseData.caseType),
      injury_type: caseData.injuryType || 'unknown',
      severity: caseData.injurySeverity || 'moderate',
      defendant: caseData.defendantName || 'Unknown',
      description: caseData.description || '',
      legal_issues: caseData.legalIssues || [],
      outcome: outcome.resolution || 'settlement',
      precedent_value: 'recent',
      vector: await this.generateCaseEmbedding(caseData),
      keywords: this.extractKeywords(caseData)
    }
    
    this.casePrecedents.push(precedent)
    
    // In production: save to vector database (Pinecone, Weaviate, etc.)
    console.log('Added new case precedent:', precedent.id)
    
    return precedent
  }

  // Search cases by natural language query
  async searchCases(query, limit = 5) {
    try {
      // Generate embedding for query
      const queryVector = await this.generateCaseEmbedding({ description: query })
      
      // Find similar cases
      const results = this.casePrecedents.map(precedent => ({
        ...precedent,
        similarity: this.calculateQuerySimilarity(query, precedent)
      }))
      
      return results
        .filter(case => case.similarity > 0.3)
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, limit)
        
    } catch (error) {
      console.error('Case search error:', error)
      return []
    }
  }

  // Calculate similarity between query and case
  calculateQuerySimilarity(query, precedent) {
    const queryLower = query.toLowerCase()
    let similarity = 0
    
    // Check description
    if (precedent.description.toLowerCase().includes(queryLower)) {
      similarity += 0.4
    }
    
    // Check keywords
    const matchingKeywords = precedent.keywords.filter(keyword =>
      queryLower.includes(keyword) || keyword.includes(queryLower)
    )
    similarity += (matchingKeywords.length / precedent.keywords.length) * 0.6
    
    return similarity
  }

  // Get case statistics for analytics
  getCaseStatistics() {
    return {
      total_cases: this.casePrecedents.length,
      practice_areas: [...new Set(this.casePrecedents.map(c => c.practice_area))],
      average_settlement: this.casePrecedents.reduce((sum, c) => sum + c.amount, 0) / this.casePrecedents.length,
      recent_cases: this.casePrecedents.filter(c => c.year >= 2023).length,
      landmark_cases: this.casePrecedents.filter(c => c.precedent_value === 'landmark').length
    }
  }
}

// Export singleton instance
export const VectorDB = new VectorDatabase()