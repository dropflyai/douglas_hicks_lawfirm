import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

// POST /api/webhooks/n8n - Receive responses from n8n AI workflows
export async function POST(request) {
  try {
    // Verify webhook authenticity
    const headersList = headers()
    const signature = headersList.get('x-n8n-signature')
    const webhookSecret = process.env.N8N_WEBHOOK_SECRET
    
    if (webhookSecret && !verifyWebhookSignature(signature, webhookSecret)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }
    
    const payload = await request.json()
    console.log('n8n Webhook received:', payload)
    
    // Process different types of n8n responses
    switch (payload.type) {
      case 'case_analysis_complete':
        return await handleCaseAnalysisComplete(payload)
      case 'chat_response':
        return await handleChatResponse(payload)
      case 'training_complete':
        return await handleTrainingComplete(payload)
      case 'alert':
        return await handleAlert(payload)
      default:
        console.warn('Unknown n8n webhook type:', payload.type)
        return NextResponse.json({ status: 'received' })
    }
  } catch (error) {
    console.error('n8n Webhook Error:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}

// Handle completed case analysis from n8n
async function handleCaseAnalysisComplete(payload) {
  const { session_id, analysis, confidence, recommendations } = payload.data
  
  // Store analysis results for retrieval
  await storeCaseAnalysis(session_id, {
    analysis,
    confidence,
    recommendations,
    source: 'n8n_ai',
    timestamp: new Date().toISOString()
  })
  
  // Optionally trigger real-time updates to frontend
  if (payload.real_time) {
    await triggerFrontendUpdate(session_id, analysis)
  }
  
  return NextResponse.json({ status: 'analysis_stored' })
}

// Handle chat responses from n8n AI workflows
async function handleChatResponse(payload) {
  const { session_id, message, intent, confidence, suggested_actions } = payload.data
  
  // Store chat context for conversation continuity
  await storeChatContext(session_id, {
    message,
    intent,
    confidence,
    suggested_actions,
    timestamp: new Date().toISOString()
  })
  
  return NextResponse.json({ status: 'chat_response_stored' })
}

// Handle training completion notifications
async function handleTrainingComplete(payload) {
  const { model_version, performance_metrics, deployment_ready } = payload.data
  
  console.log('Training Complete:', {
    version: model_version,
    metrics: performance_metrics,
    ready: deployment_ready
  })
  
  // Update model version in environment or config
  if (deployment_ready) {
    await updateModelVersion(model_version)
  }
  
  return NextResponse.json({ status: 'training_processed' })
}

// Handle alerts from n8n monitoring
async function handleAlert(payload) {
  const { severity, message, details } = payload.data
  
  console.log(`n8n Alert [${severity}]:`, message, details)
  
  // Send to monitoring system, Slack, email, etc.
  if (severity === 'critical') {
    await sendCriticalAlert(message, details)
  }
  
  return NextResponse.json({ status: 'alert_processed' })
}

// Verify webhook signature for security
function verifyWebhookSignature(signature, secret) {
  // Implement HMAC verification
  // This is a placeholder - implement actual signature verification
  return signature && secret && signature.length > 10
}

// Store case analysis results (in production: use database)
async function storeCaseAnalysis(sessionId, analysis) {
  // Placeholder - in production, store in Redis, database, etc.
  console.log('Storing case analysis:', sessionId, analysis)
}

// Store chat context (in production: use database/cache)
async function storeChatContext(sessionId, context) {
  // Placeholder - in production, store conversation state
  console.log('Storing chat context:', sessionId, context)
}

// Trigger real-time frontend updates
async function triggerFrontendUpdate(sessionId, data) {
  // Placeholder - in production, use WebSockets, Server-Sent Events, or pusher
  console.log('Frontend update triggered:', sessionId, data)
}

// Update model version
async function updateModelVersion(version) {
  // Placeholder - update configuration, environment variables, etc.
  console.log('Model version updated:', version)
}

// Send critical alerts
async function sendCriticalAlert(message, details) {
  // Placeholder - integrate with Slack, email, PagerDuty, etc.
  console.error('CRITICAL ALERT:', message, details)
}

// GET /api/webhooks/n8n - Webhook health check
export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    webhook_url: '/api/webhooks/n8n',
    supported_types: [
      'case_analysis_complete',
      'chat_response', 
      'training_complete',
      'alert'
    ],
    timestamp: new Date().toISOString()
  })
}