import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const onboardingData = await request.json()
    
    // Generate unique firm ID
    const firmId = generateFirmId()
    
    // Create subdomain/instance URL
    const instanceUrl = generateInstanceUrl(onboardingData.firmName, firmId)
    
    console.log('New law firm onboarding:', {
      firmName: onboardingData.firmName,
      firmId: firmId,
      plan: onboardingData.selectedPlan,
      contact: onboardingData.contactEmail,
      practiceAreas: onboardingData.practiceAreas
    })

    // Prepare deployment configuration
    const deploymentConfig = generateDeploymentConfig(onboardingData, firmId, instanceUrl)
    
    // Generate setup emails
    const setupEmails = generateSetupEmails(onboardingData, firmId, instanceUrl)
    
    // In production:
    // 1. Create database instance for firm
    // 2. Deploy firm-specific application 
    // 3. Configure custom domain/subdomain
    // 4. Set up payment processing
    // 5. Send setup emails
    // 6. Schedule onboarding call
    
    return NextResponse.json({
      success: true,
      message: 'Law firm onboarding initiated successfully',
      firmId: firmId,
      instanceUrl: instanceUrl,
      estimatedDeployment: getDeploymentTimeline(onboardingData.selectedPlan),
      nextSteps: [
        'Our team will review your application within 2 hours',
        'Technical setup will begin within 24 hours',
        'You will receive login credentials via email',
        'Onboarding call will be scheduled within 48 hours',
        'Your platform will be live within 72 hours'
      ],
      deploymentConfig: deploymentConfig
    })
    
  } catch (error) {
    console.error('Law firm onboarding error:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Failed to process law firm onboarding',
      message: 'Please contact our support team directly'
    }, { status: 500 })
  }
}

function generateFirmId() {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substr(2, 6).toUpperCase()
  return `FIRM-${timestamp}-${random}`
}

function generateInstanceUrl(firmName, firmId) {
  // Clean firm name for URL
  const cleanName = firmName
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
  
  // Create subdomain options
  const baseOptions = [
    `${cleanName}.legalplatform.ai`,
    `${cleanName}-law.legalplatform.ai`,
    `${firmId.toLowerCase()}.legalplatform.ai`
  ]
  
  return baseOptions[0] // Return primary option
}

function generateDeploymentConfig(data, firmId, instanceUrl) {
  return {
    firmId: firmId,
    instanceUrl: instanceUrl,
    
    // Application Configuration
    app: {
      name: data.firmName,
      primaryColor: data.primaryColor || '#1e40af',
      logoUrl: data.logoFile ? `/logos/${firmId}/logo.png` : null,
      practiceAreas: data.practiceAreas,
      firmType: data.firmType,
      contact: {
        phone: data.phone,
        email: data.contactEmail,
        address: data.address
      }
    },
    
    // Database Configuration
    database: {
      name: `firm_${firmId.toLowerCase()}`,
      multiTenant: true,
      encryption: true
    },
    
    // Email Configuration
    email: {
      provider: data.emailProvider || 'sendgrid',
      fromEmail: `noreply@${instanceUrl}`,
      replyToEmail: data.contactEmail
    },
    
    // Payment Configuration
    payments: {
      processor: data.paymentProcessor || 'stripe',
      webhookUrl: `https://${instanceUrl}/api/webhooks/payments`
    },
    
    // Security Configuration
    security: {
      ssl: true,
      twoFactor: true,
      sessionTimeout: 60,
      passwordPolicy: 'strong'
    },
    
    // Capacity Configuration
    capacity: {
      plan: data.selectedPlan,
      maxAttorneys: getMaxAttorneys(data.selectedPlan),
      maxClients: getMaxClients(data.selectedPlan),
      storageLimit: getStorageLimit(data.selectedPlan)
    }
  }
}

function generateSetupEmails(data, firmId, instanceUrl) {
  const welcomeEmail = {
    to: data.contactEmail,
    subject: `Welcome to Your Legal Platform - ${data.firmName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #1e40af, #7c3aed); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to Your Legal Platform!</h1>
          <p style="color: #e5e7eb; margin: 10px 0; font-size: 18px;">${data.firmName}</p>
        </div>
        
        <div style="background: #f9fafb; padding: 30px;">
          <h2 style="color: #1f2937; margin-top: 0;">Your Platform is Being Set Up</h2>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1f2937; margin-top: 0;">Platform Details</h3>
            <p><strong>Firm ID:</strong> ${firmId}</p>
            <p><strong>Platform URL:</strong> <a href="https://${instanceUrl}">https://${instanceUrl}</a></p>
            <p><strong>Plan:</strong> ${data.selectedPlan.charAt(0).toUpperCase() + data.selectedPlan.slice(1)}</p>
          </div>
          
          <div style="background: #dbeafe; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e40af; margin-top: 0;">Next Steps</h3>
            <ol style="color: #374151;">
              <li>Our technical team will configure your platform (24-48 hours)</li>
              <li>You'll receive login credentials via email</li>
              <li>We'll schedule your onboarding call</li>
              <li>Your platform will be live and ready to use</li>
            </ol>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <p style="color: #6b7280;">Questions? Contact us at support@legalplatform.ai</p>
          </div>
        </div>
      </div>
    `
  }
  
  const teamNotification = {
    to: 'deploy@legalplatform.ai',
    subject: `New Law Firm Deployment - ${data.firmName} (${firmId})`,
    html: `
      <h2>New Law Firm Deployment Request</h2>
      <h3>Firm Information</h3>
      <p><strong>Name:</strong> ${data.firmName}</p>
      <p><strong>ID:</strong> ${firmId}</p>
      <p><strong>Plan:</strong> ${data.selectedPlan}</p>
      <p><strong>Contact:</strong> ${data.contactName} (${data.contactEmail})</p>
      <p><strong>Instance URL:</strong> ${instanceUrl}</p>
      
      <h3>Configuration Required</h3>
      <p><strong>Practice Areas:</strong> ${data.practiceAreas.join(', ')}</p>
      <p><strong>Expected Team Size:</strong> ${data.attorneys} attorneys, ${data.staff} staff</p>
      <p><strong>Expected Clients:</strong> ${data.expectedClients}</p>
      
      <h3>Technical Setup</h3>
      <p><strong>Email Provider:</strong> ${data.emailProvider}</p>
      <p><strong>Payment Processor:</strong> ${data.paymentProcessor}</p>
      <p><strong>Custom Domain:</strong> ${data.customDomain || 'None'}</p>
      
      <p><strong>Action Required:</strong> Begin deployment process</p>
    `
  }
  
  return { welcomeEmail, teamNotification }
}

function getDeploymentTimeline(plan) {
  const timelines = {
    'starter': '24-48 hours',
    'professional': '48-72 hours', 
    'enterprise': '3-5 business days'
  }
  return timelines[plan] || '48-72 hours'
}

function getMaxAttorneys(plan) {
  const limits = {
    'starter': 3,
    'professional': 15,
    'enterprise': 999
  }
  return limits[plan] || 3
}

function getMaxClients(plan) {
  const limits = {
    'starter': 100,
    'professional': 500,
    'enterprise': 9999
  }
  return limits[plan] || 100
}

function getStorageLimit(plan) {
  const limits = {
    'starter': '10GB',
    'professional': '100GB',
    'enterprise': '1TB'
  }
  return limits[plan] || '10GB'
}