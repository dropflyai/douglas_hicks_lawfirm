import { NextResponse } from 'next/server'
import { AIBrain } from '@/lib/ai-brain'

// POST /api/ai-agent - Main AI analysis endpoint
export async function POST(request) {
  try {
    const { action, data } = await request.json()
    
    switch (action) {
      case 'analyze_case':
        return await handleCaseAnalysis(data)
      case 'chat_intent':
        return await handleChatIntent(data)
      case 'train_feedback':
        return await handleTrainingFeedback(data)
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }
  } catch (error) {
    console.error('AI Agent API Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Handle case analysis with hybrid approach
async function handleCaseAnalysis(caseData) {
  try {
    // Primary: Try external AI agent
    const aiResponse = await callExternalAIAgent(caseData)
    if (aiResponse.success) {
      // Log successful AI usage for training
      await logAIUsage(caseData, aiResponse.data, 'ai_agent')
      return NextResponse.json({
        source: 'ai_agent',
        confidence: aiResponse.confidence,
        ...aiResponse.data
      })
    }
  } catch (error) {
    console.warn('External AI agent failed, falling back to rule engine:', error)
  }
  
  // Fallback: Use local rule engine
  const ruleResult = AIBrain.analyzeCaseValue(caseData)
  await logAIUsage(caseData, ruleResult, 'rule_engine')
  
  return NextResponse.json({
    source: 'rule_engine',
    confidence: ruleResult.confidence,
    ...ruleResult
  })
}

// Handle chat intent analysis
async function handleChatIntent(chatData) {
  try {
    // Try external AI for natural language processing
    const aiResponse = await callExternalAIAgent({
      action: 'chat_intent',
      message: chatData.message,
      context: chatData.context
    })
    
    if (aiResponse.success) {
      return NextResponse.json({
        source: 'ai_agent',
        ...aiResponse.data
      })
    }
  } catch (error) {
    console.warn('Chat AI failed, using rule-based analysis')
  }
  
  // Fallback to rule-based intent analysis
  const ruleResult = AIBrain.analyzeChatIntent(chatData.message)
  return NextResponse.json({
    source: 'rule_engine',
    ...ruleResult
  })
}

// Call external AI agent (n8n webhook, OpenAI, etc.)
async function callExternalAIAgent(data) {
  const AI_AGENT_URL = process.env.AI_AGENT_WEBHOOK_URL
  const AI_API_KEY = process.env.AI_API_KEY
  
  if (!AI_AGENT_URL) {
    throw new Error('AI agent URL not configured')
  }
  
  const response = await fetch(AI_AGENT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${AI_API_KEY}`,
      'X-Source': 'douglas-hicks-law'
    },
    body: JSON.stringify({
      timestamp: new Date().toISOString(),
      firm_id: 'douglas-hicks-law',
      data: data
    }),
    timeout: 10000 // 10 second timeout
  })
  
  if (!response.ok) {
    throw new Error(`AI agent responded with ${response.status}`)
  }
  
  const result = await response.json()
  return {
    success: true,
    confidence: result.confidence || 0.8,
    data: result
  }
}

// Handle training feedback
async function handleTrainingFeedback(feedback) {
  try {
    // Send feedback to external AI for learning
    if (process.env.AI_AGENT_WEBHOOK_URL) {
      await fetch(process.env.AI_AGENT_WEBHOOK_URL + '/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.AI_API_KEY}`
        },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          firm_id: 'douglas-hicks-law',
          feedback: feedback
        })
      })
    }
    
    // Store locally for analysis
    await logTrainingData(feedback)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Training feedback error:', error)
    return NextResponse.json({ error: 'Failed to process feedback' }, { status: 500 })
  }
}

// Log AI usage for monitoring and training
async function logAIUsage(input, output, source) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    source: source,
    input: input,
    output: output,
    success: true
  }
  
  // In production, store in database
  console.log('AI Usage Log:', logEntry)
  
  // Could send to analytics, database, or training pipeline
  if (process.env.ANALYTICS_WEBHOOK) {
    try {
      await fetch(process.env.ANALYTICS_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(logEntry)
      })
    } catch (error) {
      console.warn('Failed to send analytics:', error)
    }
  }
}

// Store training data
async function logTrainingData(feedback) {
  const trainingEntry = {
    timestamp: new Date().toISOString(),
    type: 'user_feedback',
    data: feedback
  }
  
  // Store for model training
  console.log('Training Data:', trainingEntry)
  
  // In production: send to training pipeline, vector database, etc.
}

// GET /api/ai-agent - Health check and stats
export async function GET() {
  const stats = {
    status: 'healthy',
    version: '1.0',
    ai_agent_configured: !!process.env.AI_AGENT_WEBHOOK_URL,
    rule_engine_available: true,
    timestamp: new Date().toISOString()
  }
  
  return NextResponse.json(stats)
}