import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const onboardingData = await request.json()
    
    // Log the onboarding completion
    console.log('New client onboarding completed:', {
      client: `${onboardingData.personalInfo.firstName} ${onboardingData.personalInfo.lastName}`,
      email: onboardingData.personalInfo.email,
      phone: onboardingData.personalInfo.phone,
      timestamp: onboardingData.timestamp
    })

    // Generate client ID and portal credentials
    const clientId = generateClientId()
    const portalUrl = generatePortalUrl(clientId)
    
    // In a real implementation, you would:
    // 1. Create user account in authentication system
    // 2. Set up client portal access
    // 3. Create initial case records
    // 4. Send welcome emails
    // 5. Schedule introduction meetings
    // 6. Set up document sharing permissions
    
    // Prepare welcome email content
    const welcomeEmail = generateWelcomeEmail(onboardingData, clientId, portalUrl)
    
    // Send notification to legal team
    const teamNotification = generateTeamNotification(onboardingData, clientId)
    
    // Store in database (when implemented)
    // await storeClientOnboarding(onboardingData, clientId)
    
    // Send emails (when email service is integrated)
    // await sendWelcomeEmail(welcomeEmail)
    // await sendTeamNotification(teamNotification)
    
    return NextResponse.json({
      success: true,
      message: 'Client onboarding completed successfully',
      client_id: clientId,
      portal_url: portalUrl,
      next_steps: [
        'Check your email for portal access instructions',
        'Your legal team will contact you within 24 hours',
        'Introduction meeting will be scheduled this week',
        'Case strategy session will be arranged within 7 days'
      ],
      team_assignment: {
        primary_attorney: determinePrimaryAttorney(onboardingData),
        case_manager: 'Kristen Devezin',
        paralegal: 'Legal Support Team'
      },
      portal_features: [
        'Real-time case updates',
        'Secure document access',
        'Billing and payment portal',
        'Direct team messaging',
        'Appointment scheduling'
      ]
    })
    
  } catch (error) {
    console.error('Client onboarding error:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Failed to complete onboarding',
      message: 'Please contact our office directly for assistance'
    }, { status: 500 })
  }
}

function generateClientId() {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substr(2, 6).toUpperCase()
  return `DHL-${timestamp}-${random}`
}

function generatePortalUrl(clientId) {
  return `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3012'}/portal/client?id=${clientId}`
}

function determinePrimaryAttorney(data) {
  // Logic to assign attorney based on case type or consultation data
  // This could be enhanced with AI analysis
  
  const personalInfo = data.personalInfo
  const caseInfo = data.caseAccess || {}
  
  // Default assignment rules
  if (personalInfo.email?.includes('civil') || personalInfo.phone?.includes('discrimination')) {
    return 'Carl E. Douglas'
  } else if (personalInfo.firstName?.toLowerCase().includes('employment')) {
    return "A'ja Simplis"
  } else {
    return 'Jamon R. Hicks'
  }
}

function generateWelcomeEmail(data, clientId, portalUrl) {
  const fullName = `${data.personalInfo.firstName} ${data.personalInfo.lastName}`
  
  return {
    to: data.personalInfo.email,
    subject: `Welcome to Douglas Hicks Law - Your Dream Team Journey Begins`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #1e40af, #7c3aed); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to the Dream Team!</h1>
          <p style="color: #e5e7eb; margin: 10px 0; font-size: 18px;">Douglas Hicks Law</p>
        </div>
        
        <div style="background: #f9fafb; padding: 30px;">
          <div style="background: white; padding: 30px; border-radius: 12px; margin-bottom: 20px;">
            <h2 style="color: #1f2937; margin-top: 0;">Dear ${fullName},</h2>
            <p style="color: #374151; line-height: 1.6;">
              Welcome to Douglas Hicks Law! Your onboarding is complete and you're now officially part of our Dream Team family. 
              We're honored to represent you and fight for the justice you deserve.
            </p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 12px; margin-bottom: 20px;">
            <h3 style="color: #1f2937; margin-top: 0;">Your Client Portal Access</h3>
            <div style="background: #dbeafe; padding: 20px; border-radius: 8px; margin: 15px 0;">
              <p style="margin: 0; color: #1e40af;"><strong>Client ID:</strong> ${clientId}</p>
              <p style="margin: 10px 0 0 0; color: #1e40af;"><strong>Portal URL:</strong> <a href="${portalUrl}" style="color: #1e40af;">${portalUrl}</a></p>
            </div>
            <p style="color: #374151;">
              Your secure client portal gives you 24/7 access to your case information, documents, billing, and direct communication with your legal team.
            </p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 12px; margin-bottom: 20px;">
            <h3 style="color: #1f2937; margin-top: 0;">Your Legal Team</h3>
            <div style="display: flex; gap: 20px; flex-wrap: wrap;">
              <div style="flex: 1; min-width: 200px;">
                <h4 style="color: #1f2937; margin: 0 0 5px 0;">Primary Attorney</h4>
                <p style="color: #7c3aed; font-weight: bold; margin: 0;">${determinePrimaryAttorney(data)}</p>
                <p style="color: #6b7280; font-size: 14px; margin: 5px 0 0 0;">Lead counsel for your case</p>
              </div>
              <div style="flex: 1; min-width: 200px;">
                <h4 style="color: #1f2937; margin: 0 0 5px 0;">Case Manager</h4>
                <p style="color: #059669; font-weight: bold; margin: 0;">Kristen Devezin</p>
                <p style="color: #6b7280; font-size: 14px; margin: 5px 0 0 0;">Your primary contact</p>
              </div>
            </div>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 12px; margin-bottom: 20px;">
            <h3 style="color: #1f2937; margin-top: 0;">What Happens Next</h3>
            <ol style="color: #374151; padding-left: 20px;">
              <li style="margin-bottom: 10px;"><strong>Team Introduction Call</strong> - We'll contact you within 24 hours to schedule</li>
              <li style="margin-bottom: 10px;"><strong>Case Strategy Meeting</strong> - Detailed discussion of your case within one week</li>
              <li style="margin-bottom: 10px;"><strong>Evidence Collection</strong> - We'll begin gathering documentation and evidence</li>
              <li style="margin-bottom: 10px;"><strong>Regular Updates</strong> - You'll receive updates based on your communication preferences</li>
            </ol>
          </div>
          
          <div style="text-align: center; padding: 20px;">
            <a href="${portalUrl}" style="background: #1e40af; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
              Access Your Client Portal
            </a>
          </div>
        </div>
        
        <div style="background: #374151; color: #d1d5db; padding: 20px; text-align: center; font-size: 14px;">
          <p style="margin: 0;">Douglas Hicks Law | Dream Team Legacy | $4.9B Record Verdict</p>
          <p style="margin: 10px 0 0 0;">5120 W. Goldleaf Circle, Suite 140, Los Angeles, CA 90056 | (323) 337-3636</p>
        </div>
      </div>
    `,
    text: `
Welcome to Douglas Hicks Law - Dream Team!

Dear ${fullName},

Your onboarding is complete! You're now part of our Dream Team family.

CLIENT PORTAL ACCESS:
Client ID: ${clientId}
Portal URL: ${portalUrl}

YOUR LEGAL TEAM:
Primary Attorney: ${determinePrimaryAttorney(data)}
Case Manager: Kristen Devezin

NEXT STEPS:
1. Team introduction call within 24 hours
2. Case strategy meeting within one week  
3. Evidence collection begins immediately
4. Regular updates per your preferences

Access your portal: ${portalUrl}

Douglas Hicks Law
(323) 337-3636
info@douglashickslaw.com
    `
  }
}

function generateTeamNotification(data, clientId) {
  const fullName = `${data.personalInfo.firstName} ${data.personalInfo.lastName}`
  
  return {
    to: 'team@douglashickslaw.com',
    subject: `New Client Onboarding Complete - ${fullName} (${clientId})`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #059669, #0d9488); padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">New Client Onboarding Complete</h1>
          <p style="color: #d1fae5; margin: 5px 0;">Douglas Hicks Law Team Notification</p>
        </div>
        
        <div style="background: #f9fafb; padding: 20px;">
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #1f2937; margin-top: 0;">Client Information</h2>
            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Client ID:</strong> ${clientId}</p>
            <p><strong>Email:</strong> ${data.personalInfo.email}</p>
            <p><strong>Phone:</strong> ${data.personalInfo.phone}</p>
            <p><strong>Address:</strong> ${data.personalInfo.address || 'Not provided'}</p>
          </div>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #1f2937; margin-top: 0;">Communication Preferences</h2>
            <p><strong>Preferred Method:</strong> ${data.preferences.preferredCommunication}</p>
            <p><strong>Frequency:</strong> ${data.preferences.notificationFrequency}</p>
            <p><strong>Language:</strong> ${data.preferences.language}</p>
            <p><strong>Best Hours:</strong> ${data.preferences.availabilityHours}</p>
          </div>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #1f2937; margin-top: 0;">Team Assignments</h2>
            <p><strong>Primary Attorney:</strong> ${determinePrimaryAttorney(data)}</p>
            <p><strong>Case Manager:</strong> Kristen Devezin</p>
            <p><strong>Meeting Requested:</strong> ${data.teamIntro?.meetingScheduled ? 'Yes' : 'No'}</p>
          </div>
          
          <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #92400e; margin-top: 0;">Action Required</h3>
            <ul style="color: #92400e; margin: 0; padding-left: 20px;">
              <li>Schedule introduction call within 24 hours</li>
              <li>Set up client portal access</li>
              <li>Arrange case strategy meeting</li>
              <li>Begin case file preparation</li>
            </ul>
          </div>
        </div>
        
        <div style="background: #374151; color: #d1d5db; padding: 15px; text-align: center; font-size: 12px;">
          <p style="margin: 0;">Douglas Hicks Law Team System | Onboarding Completed: ${new Date().toLocaleString()}</p>
        </div>
      </div>
    `
  }
}