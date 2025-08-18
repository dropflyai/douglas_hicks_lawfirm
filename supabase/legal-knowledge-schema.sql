-- Douglas Hicks Law - Legal Knowledge Vector Database Schema
-- Supabase setup for comprehensive legal AI system

-- Enable vector extension for embeddings
CREATE EXTENSION IF NOT EXISTS vector;

-- Enable RLS for security
ALTER DEFAULT PRIVILEGES REVOKE EXECUTE ON FUNCTIONS FROM PUBLIC;

-- Case Precedents Table with Vector Embeddings
CREATE TABLE case_precedents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_name TEXT NOT NULL,
  case_number TEXT,
  court TEXT,
  year INTEGER,
  
  -- Case details
  case_type TEXT NOT NULL, -- personal_injury, civil_rights, employment, etc.
  practice_area TEXT NOT NULL,
  injury_type TEXT,
  severity TEXT,
  
  -- Financial data
  settlement_amount BIGINT, -- in cents for precision
  verdict_amount BIGINT,
  attorney_fees BIGINT,
  
  -- Legal details
  legal_issues TEXT[],
  key_facts TEXT,
  legal_reasoning TEXT,
  outcome TEXT, -- settlement, verdict, dismissed
  
  -- Firm involvement
  douglas_hicks_attorney TEXT,
  client_name TEXT,
  
  -- Vector embedding for semantic search
  embedding VECTOR(1536), -- OpenAI ada-002 dimensions
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  precedent_value TEXT DEFAULT 'standard', -- landmark, important, standard
  
  -- Full text search
  search_vector TSVECTOR GENERATED ALWAYS AS (
    to_tsvector('english', case_name || ' ' || 
                COALESCE(key_facts, '') || ' ' || 
                COALESCE(legal_reasoning, '') || ' ' ||
                array_to_string(legal_issues, ' '))
  ) STORED
);

-- Legal Knowledge Base
CREATE TABLE legal_knowledge (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  knowledge_type TEXT NOT NULL, -- statute, regulation, case_law, practice_tip
  
  -- Categorization
  practice_area TEXT NOT NULL,
  jurisdiction TEXT DEFAULT 'california',
  topic_tags TEXT[],
  
  -- Legal citation
  citation TEXT,
  authority_level TEXT, -- supreme_court, appellate, trial, regulation, statute
  
  -- Vector embedding
  embedding VECTOR(1536),
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_reviewed TIMESTAMPTZ,
  
  -- Full text search
  search_vector TSVECTOR GENERATED ALWAYS AS (
    to_tsvector('english', title || ' ' || content || ' ' ||
                COALESCE(citation, '') || ' ' ||
                array_to_string(topic_tags, ' '))
  ) STORED
);

-- Case Templates and Strategies
CREATE TABLE case_strategies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  strategy_name TEXT NOT NULL,
  case_type TEXT NOT NULL,
  description TEXT,
  
  -- Strategy details
  approach_steps JSONB, -- structured strategy steps
  success_factors TEXT[],
  risk_factors TEXT[],
  evidence_requirements TEXT[],
  
  -- Performance data
  success_rate DECIMAL(5,2), -- percentage
  average_settlement BIGINT,
  timeline_months INTEGER,
  
  -- Vector embedding for strategy matching
  embedding VECTOR(1536),
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Opponent/Defense Analysis
CREATE TABLE defense_patterns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  defendant_name TEXT NOT NULL,
  defendant_type TEXT, -- corporation, insurance, government
  
  -- Defense analysis
  common_defenses TEXT[],
  settlement_patterns JSONB, -- historical settlement data
  attorney_firms TEXT[],
  typical_tactics TEXT[],
  
  -- Success against them
  our_wins INTEGER DEFAULT 0,
  our_losses INTEGER DEFAULT 0,
  average_settlement BIGINT,
  
  -- Vector embedding for pattern matching
  embedding VECTOR(1536),
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Expert Witnesses Database
CREATE TABLE expert_witnesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  credentials TEXT,
  specialties TEXT[],
  
  -- Performance metrics
  win_rate DECIMAL(5,2),
  average_case_value BIGINT,
  deposition_quality INTEGER, -- 1-10 rating
  jury_appeal INTEGER, -- 1-10 rating
  
  -- Contact and availability
  contact_info JSONB,
  availability TEXT,
  hourly_rate INTEGER,
  
  -- Case history
  recent_cases JSONB,
  notable_victories TEXT[],
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Client Communication Templates
CREATE TABLE communication_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  template_name TEXT NOT NULL,
  template_type TEXT NOT NULL, -- email, letter, intake_form
  
  -- Template content
  subject TEXT,
  content TEXT NOT NULL,
  variables JSONB, -- available template variables
  
  -- Usage context
  case_types TEXT[],
  communication_stage TEXT, -- intake, discovery, settlement, trial
  recipient_type TEXT, -- client, opposing_counsel, court
  
  -- Vector embedding for smart template matching
  embedding VECTOR(1536),
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  usage_count INTEGER DEFAULT 0
);

-- Conversation Context (for chat/voice continuity)
CREATE TABLE conversation_context (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  user_type TEXT NOT NULL, -- chat, voice, portal
  
  -- Conversation data
  messages JSONB NOT NULL, -- full conversation history
  case_analysis JSONB, -- current case being discussed
  client_info JSONB, -- gathered client information
  
  -- AI state
  current_intent TEXT,
  confidence_score DECIMAL(3,2),
  next_suggested_action TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '24 hours')
);

-- Training Data for AI Improvement
CREATE TABLE ai_training_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  interaction_type TEXT NOT NULL, -- chat, voice, analysis
  
  -- Input/Output pairs
  user_input TEXT NOT NULL,
  ai_response TEXT NOT NULL,
  human_feedback TEXT,
  
  -- Performance metrics
  accuracy_rating INTEGER, -- 1-5 scale
  user_satisfaction INTEGER, -- 1-5 scale
  led_to_consultation BOOLEAN DEFAULT FALSE,
  
  -- Context
  case_type TEXT,
  session_id TEXT,
  
  -- Vector embeddings for similarity analysis
  input_embedding VECTOR(1536),
  response_embedding VECTOR(1536),
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  feedback_date TIMESTAMPTZ
);

-- Performance Analytics
CREATE TABLE case_performance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID REFERENCES case_precedents(id),
  
  -- AI Predictions vs Reality
  predicted_value BIGINT,
  actual_value BIGINT,
  predicted_duration INTEGER, -- months
  actual_duration INTEGER,
  predicted_outcome TEXT,
  actual_outcome TEXT,
  
  -- Accuracy metrics
  value_accuracy DECIMAL(5,2), -- percentage accuracy
  outcome_correct BOOLEAN,
  
  -- Learning data
  what_we_learned TEXT,
  strategy_adjustments TEXT[],
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_case_precedents_embedding ON case_precedents USING ivfflat (embedding vector_cosine_ops);
CREATE INDEX idx_case_precedents_type ON case_precedents (case_type, practice_area);
CREATE INDEX idx_case_precedents_year ON case_precedents (year DESC);
CREATE INDEX idx_case_precedents_amount ON case_precedents (settlement_amount DESC NULLS LAST);
CREATE INDEX idx_case_precedents_search ON case_precedents USING gin(search_vector);

CREATE INDEX idx_legal_knowledge_embedding ON legal_knowledge USING ivfflat (embedding vector_cosine_ops);
CREATE INDEX idx_legal_knowledge_type ON legal_knowledge (knowledge_type, practice_area);
CREATE INDEX idx_legal_knowledge_search ON legal_knowledge USING gin(search_vector);

CREATE INDEX idx_case_strategies_embedding ON case_strategies USING ivfflat (embedding vector_cosine_ops);
CREATE INDEX idx_case_strategies_type ON case_strategies (case_type);

CREATE INDEX idx_conversation_session ON conversation_context (session_id);
CREATE INDEX idx_conversation_expires ON conversation_context (expires_at);

CREATE INDEX idx_training_data_type ON ai_training_data (interaction_type, case_type);
CREATE INDEX idx_training_data_feedback ON ai_training_data (accuracy_rating, user_satisfaction);

-- RLS Policies for Security
ALTER TABLE case_precedents ENABLE ROW LEVEL SECURITY;
ALTER TABLE legal_knowledge ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_strategies ENABLE ROW LEVEL SECURITY;
ALTER TABLE defense_patterns ENABLE ROW LEVEL SECURITY;
ALTER TABLE expert_witnesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE communication_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversation_context ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_training_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_performance ENABLE ROW LEVEL SECURITY;

-- Create policies (authenticated users can read, service role can write)
CREATE POLICY "Public read access" ON case_precedents FOR SELECT USING (true);
CREATE POLICY "Service role full access" ON case_precedents FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Public read knowledge" ON legal_knowledge FOR SELECT USING (true);
CREATE POLICY "Service role knowledge access" ON legal_knowledge FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Public read strategies" ON case_strategies FOR SELECT USING (true);
CREATE POLICY "Service role strategies access" ON case_strategies FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Session context access" ON conversation_context FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Training data access" ON ai_training_data FOR ALL USING (auth.role() = 'service_role');

-- Functions for vector similarity search
CREATE OR REPLACE FUNCTION search_similar_cases(
  query_embedding vector(1536),
  match_threshold float DEFAULT 0.7,
  match_count int DEFAULT 5
)
RETURNS TABLE (
  id uuid,
  case_name text,
  case_type text,
  settlement_amount bigint,
  similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    cp.id,
    cp.case_name,
    cp.case_type,
    cp.settlement_amount,
    1 - (cp.embedding <=> query_embedding) as similarity
  FROM case_precedents cp
  WHERE 1 - (cp.embedding <=> query_embedding) > match_threshold
  ORDER BY cp.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

CREATE OR REPLACE FUNCTION search_legal_knowledge(
  query_embedding vector(1536),
  knowledge_types text[] DEFAULT NULL,
  practice_areas text[] DEFAULT NULL,
  match_threshold float DEFAULT 0.7,
  match_count int DEFAULT 5
)
RETURNS TABLE (
  id uuid,
  title text,
  content text,
  knowledge_type text,
  similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    lk.id,
    lk.title,
    lk.content,
    lk.knowledge_type,
    1 - (lk.embedding <=> query_embedding) as similarity
  FROM legal_knowledge lk
  WHERE 1 - (lk.embedding <=> query_embedding) > match_threshold
    AND (knowledge_types IS NULL OR lk.knowledge_type = ANY(knowledge_types))
    AND (practice_areas IS NULL OR lk.practice_area = ANY(practice_areas))
  ORDER BY lk.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- Trigger to update updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_case_precedents_updated_at BEFORE UPDATE ON case_precedents FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_legal_knowledge_updated_at BEFORE UPDATE ON legal_knowledge FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_case_strategies_updated_at BEFORE UPDATE ON case_strategies FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_conversation_context_updated_at BEFORE UPDATE ON conversation_context FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Cleanup function for expired conversations
CREATE OR REPLACE FUNCTION cleanup_expired_conversations()
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  DELETE FROM conversation_context 
  WHERE expires_at < NOW();
END;
$$;

-- Schedule cleanup to run every hour
SELECT cron.schedule('cleanup-conversations', '0 * * * *', 'SELECT cleanup_expired_conversations();');