// Consultation Request Handler
export class ConsultationHandler {
  constructor() {
    this.emailEndpoint = '/api/consultation-request'
    this.notificationEmail = 'info@douglashickslaw.com'
  }

  // Submit consultation request
  async submitConsultationRequest(formData) {
    try {
      const response = await fetch(this.emailEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'consultation_request',
          timestamp: new Date().toISOString(),
          urgent: this.determineUrgency(formData.message),
          client: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            location: formData.location
          },
          case: {
            description: formData.message,
            estimatedValue: this.estimateValue(formData.message),
            practice_area: this.categorizeCase(formData.message),
            urgency_level: this.determineUrgency(formData.message)
          },
          source: 'website_contact_form',
          recommended_attorney: this.recommendAttorney(formData.message),
          next_steps: this.generateNextSteps(formData.message)
        })
      })

      if (!response.ok) {
        throw new Error('Failed to submit consultation request')
      }

      return await response.json()
    } catch (error) {
      console.error('Consultation submission error:', error)
      // Fallback: Use mailto as backup
      this.fallbackEmailSubmission(formData)
      throw error
    }
  }

  // Determine case urgency based on keywords
  determineUrgency(message) {
    const urgentKeywords = [
      'statute of limitations', 'deadline', 'urgent', 'emergency', 
      'time sensitive', 'court date', 'served', 'summons',
      'police report', 'arrest', 'jail', 'custody'
    ]
    
    const soonKeywords = [
      'recent', 'happened', 'occurred', 'incident', 'accident',
      'injury', 'discrimination', 'fired', 'terminated'
    ]

    const lowerMessage = message.toLowerCase()
    
    if (urgentKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return 'immediate'
    } else if (soonKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return 'soon'
    }
    
    return 'planning'
  }

  // Categorize case type
  categorizeCase(message) {
    const categories = {
      'civil-rights': ['police', 'brutality', 'discrimination', 'civil rights', 'constitutional', 'violation'],
      'personal-injury': ['accident', 'injury', 'car crash', 'slip', 'fall', 'medical malpractice'],
      'wrongful-death': ['death', 'died', 'killed', 'fatal', 'wrongful death'],
      'employment': ['fired', 'terminated', 'harassment', 'workplace', 'employment', 'discrimination'],
      'product-liability': ['defective', 'product', 'recalled', 'automotive', 'medical device'],
      'criminal-defense': ['arrested', 'charges', 'criminal', 'felony', 'defense', 'court']
    }

    const lowerMessage = message.toLowerCase()
    
    for (const [category, keywords] of Object.entries(categories)) {
      if (keywords.some(keyword => lowerMessage.includes(keyword))) {
        return category
      }
    }
    
    return 'general'
  }

  // Recommend attorney based on case type
  recommendAttorney(message) {
    const practiceArea = this.categorizeCase(message)
    
    const attorneyMap = {
      'civil-rights': 'Carl E. Douglas',
      'criminal-defense': 'Carl E. Douglas', 
      'wrongful-death': 'Jamon R. Hicks',
      'personal-injury': 'Jamon R. Hicks',
      'employment': "A'ja Simplis",
      'product-liability': 'Carl E. Douglas',
      'general': 'Douglas Hicks Legal Team'
    }
    
    return attorneyMap[practiceArea] || 'Douglas Hicks Legal Team'
  }

  // Estimate potential case value
  estimateValue(message) {
    const lowerMessage = message.toLowerCase()
    
    // High value indicators
    const highValueKeywords = [
      'police brutality', 'wrongful death', 'product liability', 
      'medical malpractice', 'permanent injury', 'disability'
    ]
    
    // Medium value indicators  
    const mediumValueKeywords = [
      'discrimination', 'car accident', 'slip and fall',
      'employment', 'harassment', 'injury'
    ]
    
    if (highValueKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return '$500K - $5M+'
    } else if (mediumValueKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return '$50K - $500K'
    }
    
    return 'Consultation Required'
  }

  // Generate next steps
  generateNextSteps(message) {
    const urgency = this.determineUrgency(message)
    const practiceArea = this.categorizeCase(message)
    
    const baseSteps = [
      'Schedule consultation with recommended attorney',
      'Gather all relevant documentation',
      'Preserve evidence and witness information'
    ]
    
    if (urgency === 'immediate') {
      baseSteps.unshift('URGENT: Contact office immediately - same day response')
    }
    
    if (practiceArea === 'civil-rights') {
      baseSteps.push('Document all civil rights violations with photos/videos')
    } else if (practiceArea === 'personal-injury') {
      baseSteps.push('Obtain medical records and treatment documentation')
    }
    
    return baseSteps
  }

  // Fallback email submission using mailto
  fallbackEmailSubmission(formData) {
    const subject = encodeURIComponent('Consultation Request - ' + formData.name)
    const body = encodeURIComponent(`
Consultation Request

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Case Description: ${formData.message}

Recommended Attorney: ${this.recommendAttorney(formData.message)}
Urgency Level: ${this.determineUrgency(formData.message)}
Practice Area: ${this.categorizeCase(formData.message)}
Estimated Value: ${this.estimateValue(formData.message)}

Please respond within 24 hours for consultation scheduling.
    `)
    
    const mailtoLink = `mailto:${this.notificationEmail}?subject=${subject}&body=${body}`
    window.open(mailtoLink)
  }

  // Schedule consultation
  async scheduleConsultation(consultationData) {
    try {
      const response = await fetch('/api/schedule-consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...consultationData,
          timestamp: new Date().toISOString(),
          status: 'scheduled'
        })
      })

      return await response.json()
    } catch (error) {
      console.error('Consultation scheduling error:', error)
      throw error
    }
  }
}

// Create global instance
export const consultationHandler = new ConsultationHandler()