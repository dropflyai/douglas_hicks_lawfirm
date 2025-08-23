import { NextResponse } from 'next/server'

// Email configuration (you'll need to set up your email service)
const NOTIFICATION_EMAIL = 'info@douglashickslaw.com'
const FIRM_EMAIL = 'consultation@douglashickslaw.com'

export async function POST(request) {
  try {
    const consultationData = await request.json()
    
    // Log the consultation request
    console.log('New consultation request:', {
      client: consultationData.client?.name || 'Unknown',
      email: consultationData.client?.email || 'Unknown',
      urgency: consultationData.case?.urgency_level || consultationData.urgent,
      practice_area: consultationData.case?.practice_area || 'general',
      timestamp: consultationData.timestamp
    })

    // Ensure required fields for email content
    const completeData = {
      ...consultationData,
      next_steps: consultationData.next_steps || [
        'Schedule consultation with recommended attorney',
        'Begin evidence preservation and documentation',
        'Develop case strategy based on precedents'
      ]
    }
    
    // Prepare email content
    const emailContent = generateEmailContent(completeData)
    
    // In a real implementation, you would integrate with an email service like:
    // - SendGrid
    // - AWS SES
    // - Nodemailer with SMTP
    // - Resend
    
    // For now, we'll simulate the email sending and return success
    // Replace this with actual email service integration
    
    const emailResult = await sendNotificationEmail(emailContent, consultationData)
    
    // Store in database (if you have one set up)
    // await storeConsultationRequest(consultationData)
    
    return NextResponse.json({
      success: true,
      message: 'Consultation request submitted successfully',
      consultation_id: generateConsultationId(),
      recommended_attorney: consultationData.recommended_attorney,
      response_timeframe: getResponseTimeframe(consultationData.case.urgency_level),
      next_steps: consultationData.next_steps
    })
    
  } catch (error) {
    console.error('Consultation request error:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Failed to process consultation request',
      message: 'Please call our office directly at (323) 337-3636'
    }, { status: 500 })
  }
}

function generateEmailContent(data) {
  const urgencyBadge = {
    'immediate': '🚨 URGENT',
    'soon': '⚡ TIME-SENSITIVE', 
    'planning': '📋 PLANNING PHASE'
  }
  
  return {
    subject: `${urgencyBadge[data.case.urgency_level] || '📋'} New Consultation Request - ${data.client.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #1e40af, #7c3aed); padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">Douglas Hicks Law</h1>
          <p style="color: #e5e7eb; margin: 5px 0;">New Consultation Request</p>
        </div>
        
        <div style="background: #f9fafb; padding: 20px;">
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #1f2937; margin-top: 0;">Client Information</h2>
            <p><strong>Name:</strong> ${data.client.name}</p>
            <p><strong>Email:</strong> ${data.client.email}</p>
            <p><strong>Phone:</strong> ${data.client.phone}</p>
            <p><strong>Location:</strong> ${data.client.location || 'Not provided'}</p>
          </div>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #1f2937; margin-top: 0;">Case Details</h2>
            <div style="background: ${getUrgencyColor(data.case.urgency_level)}; padding: 10px; border-radius: 4px; margin-bottom: 10px;">
              <strong style="color: white;">Urgency: ${urgencyBadge[data.case.urgency_level] || 'Standard'}</strong>
            </div>
            <p><strong>Practice Area:</strong> ${formatPracticeArea(data.case.practice_area)}</p>
            <p><strong>Estimated Value:</strong> ${data.case.estimatedValue}</p>
            <p><strong>Case Description:</strong></p>
            <div style="background: #f3f4f6; padding: 15px; border-radius: 4px; margin: 10px 0;">
              ${data.case.description}
            </div>
          </div>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #1f2937; margin-top: 0;">AI Recommendations</h2>
            <p><strong>Recommended Attorney:</strong> ${data.recommended_attorney}</p>
            <p><strong>Next Steps:</strong></p>
            <ul>
              ${data.next_steps.map(step => `<li>${step}</li>`).join('')}
            </ul>
          </div>
          
          <div style="text-align: center; padding: 20px;">
            <a href="mailto:${data.client.email}" style="background: #1e40af; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 0 10px;">
              Email Client
            </a>
            <a href="tel:${data.client.phone}" style="background: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 0 10px;">
              Call Client
            </a>
          </div>
        </div>
        
        <div style="background: #374151; color: #d1d5db; padding: 15px; text-align: center; font-size: 12px;">
          <p>Douglas Hicks Law | Dream Team Legacy | $4.9B Record Verdict</p>
          <p>Received: ${new Date(data.timestamp).toLocaleString()}</p>
        </div>
      </div>
    `,
    text: `
New Consultation Request - ${data.client.name}

CLIENT INFORMATION:
Name: ${data.client.name}
Email: ${data.client.email}
Phone: ${data.client.phone}
Location: ${data.client.location || 'Not provided'}

CASE DETAILS:
Urgency: ${data.case.urgency_level}
Practice Area: ${data.case.practice_area}
Estimated Value: ${data.case.estimatedValue}

Case Description:
${data.case.description}

AI RECOMMENDATIONS:
Recommended Attorney: ${data.recommended_attorney}

Next Steps:
${data.next_steps.map((step, i) => `${i + 1}. ${step}`).join('\n')}

Received: ${new Date(data.timestamp).toLocaleString()}
    `
  }
}

async function sendNotificationEmail(emailContent, consultationData) {
  // This is where you would integrate with your email service
  // For example, with SendGrid:
  /*
  const sgMail = require('@sendgrid/mail')
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  
  const msg = {
    to: NOTIFICATION_EMAIL,
    from: FIRM_EMAIL,
    subject: emailContent.subject,
    text: emailContent.text,
    html: emailContent.html,
  }
  
  return await sgMail.send(msg)
  */
  
  // For now, just log and return success
  console.log('Email would be sent:', {
    to: NOTIFICATION_EMAIL,
    subject: emailContent.subject,
    urgency: consultationData.case.urgency_level
  })
  
  return { success: true, messageId: 'mock-' + Date.now() }
}

function getUrgencyColor(urgency) {
  const colors = {
    'immediate': '#dc2626',
    'soon': '#ea580c',
    'planning': '#2563eb'
  }
  return colors[urgency] || '#6b7280'
}

function formatPracticeArea(area) {
  const areas = {
    'civil-rights': 'Civil Rights',
    'personal-injury': 'Personal Injury',
    'wrongful-death': 'Wrongful Death',
    'employment': 'Employment Law',
    'product-liability': 'Product Liability',
    'criminal-defense': 'Criminal Defense',
    'general': 'General Legal Matter'
  }
  return areas[area] || 'General Legal Matter'
}

function generateConsultationId() {
  return 'CONS-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5).toUpperCase()
}

function getResponseTimeframe(urgency) {
  const timeframes = {
    'immediate': 'Same day response (within 4 hours)',
    'soon': '24-48 hour response',
    'planning': '3-5 business day response'
  }
  return timeframes[urgency] || '3-5 business day response'
}