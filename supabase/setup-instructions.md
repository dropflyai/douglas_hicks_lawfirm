# Supabase Vector Store Setup for Douglas Hicks Law

## 🎯 Overview

This setup creates a comprehensive **Supabase vector database** that powers the SuperCode AI agent with deep legal knowledge, case precedents, and intelligent conversation handling.

## 📋 Database Architecture

### **Core Tables:**
- **`case_precedents`** - Firm victories with vector embeddings for similarity search
- **`legal_knowledge`** - Statutes, case law, regulations with semantic search
- **`case_strategies`** - Winning strategies and approaches 
- **`conversation_context`** - Chat/voice conversation continuity
- **`ai_training_data`** - Machine learning improvement data
- **`expert_witnesses`** - Expert database with performance metrics
- **`communication_templates`** - Smart template matching

### **Advanced Features:**
- **Vector similarity search** using OpenAI embeddings
- **Full-text search** with PostgreSQL tsvector
- **Row Level Security** for data protection
- **Automatic cleanup** of expired conversations
- **Performance analytics** and learning loops

## 🚀 Setup Instructions

### Step 1: Create Supabase Project

1. **Go to Supabase Dashboard**: https://app.supabase.com
2. **Create New Project**:
   - Name: "Douglas Hicks Law - Vector Store"
   - Database Password: Generate secure password
   - Region: Choose closest to your users

### Step 2: Enable Vector Extension

```sql
-- In Supabase SQL Editor, run:
CREATE EXTENSION IF NOT EXISTS vector;
```

### Step 3: Create Database Schema

1. **Copy and paste** the entire `legal-knowledge-schema.sql` file
2. **Run in SQL Editor** to create all tables, indexes, and functions
3. **Verify creation** - should see all tables in Table Editor

### Step 4: Populate Initial Data

1. **Copy and paste** the `populate-legal-database.sql` file  
2. **Run in SQL Editor** to insert firm victories and legal knowledge
3. **Verify data** - check case_precedents table for your victories

### Step 5: Set up Edge Functions

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref YOUR_PROJECT_REF

# Deploy edge functions
supabase functions deploy generate-case-embeddings --no-verify-jwt
supabase functions deploy smart-case-analysis --no-verify-jwt
supabase functions deploy batch-process-knowledge --no-verify-jwt
supabase functions deploy update-conversation --no-verify-jwt
supabase functions deploy collect-training-data --no-verify-jwt
supabase functions deploy analyze-performance --no-verify-jwt
```

### Step 6: Configure Environment Variables

In **Supabase Dashboard > Settings > Edge Functions**:

```bash
OPENAI_API_KEY=sk-your-openai-api-key-here
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### Step 7: Generate Initial Embeddings

```bash
# Call the batch processing function to generate embeddings
curl -X POST 'https://your-project.supabase.co/functions/v1/batch-process-knowledge' \
  -H 'Authorization: Bearer YOUR_ANON_KEY' \
  -H 'Content-Type: application/json'
```

## 🔧 n8n Integration Setup

### Step 1: Add Supabase Credentials in n8n

1. **Go to n8n Credentials**
2. **Add "Supabase" credential**:
   - Name: "Supabase Douglas Hicks Law"
   - Host: `https://your-project.supabase.co`
   - Service Role Secret: Your service role key

### Step 2: Import SuperCode Agent Workflow

1. **Import** `supercode-agent-workflow.json` into n8n
2. **Update webhook URLs**:
   - Chat: `douglas-hicks-chat-agent`
   - VAPI: `douglas-hicks-vapi-agent`

### Step 3: Configure Environment Variables in n8n

```bash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
OPENAI_API_KEY=sk-your-openai-key
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK
```

## 💬 Connect Website Chat to SuperCode Agent

Update your website's chat component:

```javascript
// In your LiveChat.js component
const sendMessageToSuperCodeAgent = async (message) => {
  try {
    const response = await fetch('https://your-n8n-instance.com/webhook/douglas-hicks-chat-agent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: message,
        session_id: generateSessionId(),
        timestamp: new Date().toISOString(),
        user_agent: navigator.userAgent,
        referrer: document.referrer
      })
    });

    const result = await response.json();
    
    return {
      message: result.message,
      analysis: result.analysis,
      precedents_found: result.precedents_found,
      next_actions: result.next_actions
    };
    
  } catch (error) {
    console.error('SuperCode agent error:', error);
    // Fallback to local AI brain
    return AIBrain.analyzeChatIntent(message);
  }
};
```

## 📞 Connect VAPI to SuperCode Agent

Update your VAPI assistant configuration:

```json
{
  "serverUrl": "https://your-n8n-instance.com/webhook/douglas-hicks-vapi-agent",
  "serverMessages": [
    {
      "type": "conversation-update",
      "content": {
        "transcript": true,
        "turnComplete": true
      }
    },
    {
      "type": "function-call", 
      "content": {
        "functionCall": true
      }
    }
  ]
}
```

## 🧠 How the SuperCode Agent Works

### **Input Processing:**
1. **Receives** chat/voice input via n8n webhooks
2. **Normalizes** data from different sources (chat vs VAPI)
3. **Retrieves** conversation history from Supabase
4. **Generates** OpenAI embeddings for semantic search

### **Knowledge Retrieval:**
1. **Searches** case precedents using vector similarity
2. **Finds** relevant legal knowledge and statutes
3. **Matches** successful case strategies
4. **Builds** comprehensive context for AI analysis

### **AI Analysis:**
1. **Combines** user input + conversation history + legal knowledge
2. **Processes** through GPT-4 with specialized legal prompts
3. **Extracts** case type, urgency, value tier, and next actions
4. **Formats** responses for chat vs voice channels

### **Response Actions:**
1. **Saves** conversation context for continuity
2. **Triggers** attorney alerts for high-value cases
3. **Schedules** consultations through function calls
4. **Collects** training data for continuous improvement

## 📊 Performance Monitoring

### Key Metrics Dashboard

```sql
-- Query for performance metrics
SELECT 
  COUNT(*) as total_conversations,
  AVG(confidence_score) as avg_confidence,
  COUNT(CASE WHEN needs_attorney_review THEN 1 END) as high_value_cases,
  DATE_TRUNC('day', created_at) as date
FROM conversation_context 
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY DATE_TRUNC('day', created_at)
ORDER BY date;
```

### Training Data Analysis

```sql
-- Analyze AI performance
SELECT 
  interaction_type,
  AVG(accuracy_rating) as avg_accuracy,
  AVG(user_satisfaction) as avg_satisfaction,
  COUNT(CASE WHEN led_to_consultation THEN 1 END) * 100.0 / COUNT(*) as conversion_rate
FROM ai_training_data
WHERE created_at >= NOW() - INTERVAL '7 days'
GROUP BY interaction_type;
```

## 🔍 Vector Search Examples

### Search Similar Cases

```sql
SELECT * FROM search_similar_cases(
  '[0.1, 0.2, 0.3, ...]'::vector, -- OpenAI embedding
  0.7, -- similarity threshold
  5    -- max results
);
```

### Search Legal Knowledge

```sql
SELECT * FROM search_legal_knowledge(
  '[0.1, 0.2, 0.3, ...]'::vector,
  ARRAY['civil_rights', 'employment'], -- filter by type
  ARRAY['Civil Rights'],               -- filter by practice area  
  0.7,
  3
);
```

## 🎯 Expected Results

This SuperCode agent system will:

### **For Website Chat:**
- **Intelligent Responses** using firm's legal knowledge base
- **Case Precedent Matching** to similar successful cases
- **Automatic Tier Classification** (Platinum/Gold/Silver/Bronze)
- **Smart Follow-up Actions** based on case strength
- **Conversation Continuity** across multiple chat sessions

### **For VAPI Voice Calls:**
- **Same AI Brain** as chat with voice-optimized responses
- **Function Call Triggers** for scheduling and transfers
- **Real-time Case Analysis** during phone conversations
- **Attorney Alerts** for high-value cases while caller is on line

### **For Attorneys:**
- **Instant Slack Alerts** for Platinum/Gold tier cases
- **Complete Conversation Context** with case analysis
- **Precedent Research** automatically provided
- **Performance Analytics** showing AI accuracy and conversion rates

## 🔒 Security & Privacy

- **Row Level Security** protects all client data
- **Encrypted Embeddings** for sensitive case information
- **Automatic Data Expiration** for temporary conversations
- **Audit Trails** for all AI interactions
- **HIPAA Compliance** ready for medical malpractice cases

This creates a **billion-dollar law firm AI brain** that never forgets a case, never misses a precedent, and gets smarter with every interaction!