# VAPI Integration Setup for Douglas Hicks Law

## 🎯 Overview

This setup integrates VAPI (Voice AI) with your n8n workflow to create Maya, the AI legal assistant that handles incoming calls and evaluates cases in real-time.

## 📋 Pre-requisites

1. **VAPI Account**: Sign up at [vapi.ai](https://vapi.ai)
2. **n8n Instance**: Your n8n workflow environment
3. **OpenAI API**: For GPT-4 and analysis
4. **Phone Number**: VAPI-provided number or bring your own

## 🚀 Step 1: Create VAPI Assistant

### 1.1 Login to VAPI Dashboard
```bash
https://dashboard.vapi.ai
```

### 1.2 Create New Assistant
1. Click "Create Assistant"
2. Name: "Douglas Hicks Law - Maya AI"
3. Copy and paste the configuration from `vapi-assistant-config.json`

### 1.3 Key Configuration Settings

**Model Settings:**
- Provider: OpenAI
- Model: gpt-4-turbo-preview  
- Temperature: 0.3
- Max Tokens: 500

**Voice Settings:**
- Provider: 11Labs
- Voice: Professional female voice
- Stability: 0.7
- Similarity Boost: 0.8

**Transcriber Settings:**
- Provider: Deepgram
- Model: nova-2
- Language: en-US
- Smart Format: Enabled

## 🔗 Step 2: Configure Webhooks

### 2.1 Set Server URL in VAPI
```
Server URL: https://your-n8n-instance.com/webhook/douglas-hicks-vapi
Server Secret: your-webhook-secret-key
```

### 2.2 Enable Server Messages
- ✅ conversation-update
- ✅ function-call  
- ✅ hang
- ✅ speech-update

### 2.3 Enable Client Messages
- ✅ conversation-update
- ✅ function-call

## 📞 Step 3: Get Phone Number

### Option A: VAPI-Provided Number
1. Go to Phone Numbers section
2. Purchase a number
3. Assign to your Maya assistant

### Option B: Bring Your Own Number  
1. Configure SIP trunk
2. Point to VAPI endpoint
3. Assign to Maya assistant

## ⚙️ Step 4: Import n8n Workflow

### 4.1 Import Workflow File
```bash
# In n8n interface:
1. Go to Workflows
2. Click "Import from file"  
3. Upload: douglas-hicks-ai-workflow.json
4. Click "Import"
```

### 4.2 Configure Webhook URLs
Update these nodes in the workflow:
- **VAPI Voice Webhook**: `douglas-hicks-vapi`
- **Website Response**: Your website webhook URL

### 4.3 Set Environment Variables
```bash
# In n8n Settings > Environment Variables
OPENAI_API_KEY=sk-your-openai-key
WEBSITE_API_KEY=your-website-api-key  
VAPI_API_KEY=your-vapi-api-key
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK
CALENDLY_API_KEY=your-calendly-api-key
N8N_WEBHOOK_SECRET=your-webhook-secret
```

## 🧪 Step 5: Test the System

### 5.1 Test VAPI Assistant
1. Call your VAPI phone number
2. Verify Maya answers professionally
3. Test case evaluation flow
4. Check webhook delivery to n8n

### 5.2 Test n8n Workflow
1. Monitor n8n execution logs
2. Verify webhook receives VAPI data
3. Check case analysis functions work
4. Test attorney alerts and CRM storage

### 5.3 End-to-End Test Scenarios

**Scenario 1: High-Value Personal Injury**
```
Call Script:
"Hi, I was in a serious car accident last week. The other driver was drunk and hit me head-on. I'm in the hospital with multiple injuries and may need surgery. The police report shows it was 100% their fault."

Expected Result:
- Maya identifies as personal injury case
- Gathers key details (drunk driver, serious injuries, clear fault)
- Evaluates as high-value case (Platinum/Gold tier)  
- Triggers immediate attorney alert
- Schedules urgent consultation
```

**Scenario 2: Civil Rights Case**
```
Call Script:
"I need help with a police brutality case. Officers used excessive force during an arrest and I was seriously injured. There's video evidence and witnesses."

Expected Result:
- Maya identifies as civil rights case
- References firm's $8M police brutality settlements
- Gathers evidence details (video, witnesses)
- Evaluates as high-priority case
- Connects to civil rights attorney
```

**Scenario 3: Employment Discrimination**
```
Call Script:
"I was fired from my job after reporting sexual harassment. I have emails and documentation proving retaliation."

Expected Result:
- Maya identifies as employment case
- Gathers discrimination details
- Notes evidence strength (emails, documentation)
- Evaluates case viability
- Schedules consultation with employment attorney
```

## 📊 Step 6: Monitor & Optimize

### 6.1 VAPI Dashboard Monitoring
- Call volume and duration
- Transcription accuracy
- Function call success rates
- Customer satisfaction scores

### 6.2 n8n Execution Monitoring  
- Webhook delivery success
- AI analysis accuracy
- Alert delivery rates
- CRM integration success

### 6.3 Performance Metrics
Track these KPIs:
- **Call Answer Rate**: >95%
- **Case Qualification Rate**: >80% 
- **High-Value Case Detection**: >90%
- **Attorney Alert Response Time**: <5 minutes
- **Consultation Conversion Rate**: Target 60%+

## 🔧 Advanced Configuration

### Custom Function Handlers
Add these functions to handle VAPI function calls:

```javascript
// In n8n Function Node: Handle VAPI Functions
const { functionCall } = $json.message;

switch (functionCall.name) {
  case 'evaluateCase':
    // Send case data to AI analysis
    return {
      action: 'analyze_case',
      caseData: functionCall.parameters,
      callId: $json.call.id
    };
    
  case 'scheduleConsultation':  
    // Trigger Calendly booking
    return {
      action: 'schedule_urgent',
      urgency: functionCall.parameters.urgencyLevel,
      callId: $json.call.id
    };
    
  case 'transferToAttorney':
    // Initiate live transfer
    return {
      action: 'transfer_call', 
      specialty: functionCall.parameters.specialtyNeeded,
      callId: $json.call.id
    };
}
```

### Real-time Alerts Configuration
```javascript
// High-value case alert (Slack/SMS)
if (caseAnalysis.tier === 'Platinum' || caseAnalysis.estimatedValue > 1000000) {
  await sendUrgentAlert({
    message: `🚨 PLATINUM CASE ALERT 🚨\n\nCase: ${caseData.caseType}\nValue: ${caseAnalysis.estimatedValue}\nClient: ${caseData.clientName}\nPhone: ${caseData.clientPhone}\n\n📞 VAPI Call ID: ${callId}`,
    priority: 'critical',
    mentions: ['@channel']
  });
}
```

## 🎯 Expected Call Flow

1. **Maya Answers**: Professional greeting mentioning Dream Team legacy
2. **Case Identification**: Quickly determines case type through conversation
3. **Detail Gathering**: Collects key information using natural dialogue  
4. **Real-time Analysis**: Evaluates case strength while caller is on line
5. **Intelligent Response**: Provides appropriate next steps based on case value
6. **Immediate Action**: Schedules consultations or transfers high-value cases
7. **Follow-up**: Ensures client has clear next steps and timeline

## 💡 Optimization Tips

### Improve Call Quality
- Use high-quality voice (11Labs recommended)
- Set appropriate response delays (0.4s)
- Enable interruptions for natural conversation
- Use backchanelling for active listening

### Enhance Case Evaluation
- Train Maya on recent case victories
- Update precedent references monthly
- Calibrate urgency detection based on outcomes
- Refine case value estimations

### Maximize Conversion
- Reference specific firm victories relevant to caller's case
- Create urgency for strong cases
- Provide clear, actionable next steps
- Follow up with immediate email confirmation

## 🔒 Security & Compliance

### Data Protection
- All calls are encrypted in transit
- Transcripts stored securely
- Client data handled per attorney-client privilege
- HIPAA compliance for medical information

### Webhook Security
- Use HMAC signature verification
- Implement rate limiting
- Validate all incoming data
- Log security events

This VAPI integration transforms Douglas Hicks Law into a 24/7 AI-powered intake machine that never misses a high-value case!