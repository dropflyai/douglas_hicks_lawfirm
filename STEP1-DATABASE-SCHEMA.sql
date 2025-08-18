-- STEP 1: CREATE DATABASE SCHEMA
-- Copy and paste this ENTIRE file into Supabase SQL Editor

-- Enable vector extension for embeddings
CREATE EXTENSION IF NOT EXISTS vector;

-- Case Precedents Table with Vector Embeddings
CREATE TABLE case_precedents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_name TEXT NOT NULL,
  case_number TEXT,
  court TEXT,
  year INTEGER,
  case_type TEXT NOT NULL,
  practice_area TEXT NOT NULL,
  injury_type TEXT,
  severity TEXT,
  settlement_amount BIGINT,
  verdict_amount BIGINT,
  attorney_fees BIGINT,
  legal_issues TEXT[],
  key_facts TEXT,
  legal_reasoning TEXT,
  outcome TEXT,
  douglas_hicks_attorney TEXT,
  client_name TEXT,
  embedding VECTOR(1536),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  precedent_value TEXT DEFAULT 'standard'
);

-- Legal Knowledge Base
CREATE TABLE legal_knowledge (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  knowledge_type TEXT NOT NULL,
  practice_area TEXT NOT NULL,
  jurisdiction TEXT DEFAULT 'california',
  topic_tags TEXT[],
  citation TEXT,
  authority_level TEXT,
  embedding VECTOR(1536),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_reviewed TIMESTAMPTZ
);

-- Case Strategies
CREATE TABLE case_strategies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  strategy_name TEXT NOT NULL,
  case_type TEXT NOT NULL,
  description TEXT,
  approach_steps JSONB,
  success_factors TEXT[],
  risk_factors TEXT[],
  evidence_requirements TEXT[],
  success_rate DECIMAL(5,2),
  average_settlement BIGINT,
  timeline_months INTEGER,
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
  win_rate DECIMAL(5,2),
  average_case_value BIGINT,
  deposition_quality INTEGER,
  jury_appeal INTEGER,
  contact_info JSONB,
  availability TEXT,
  hourly_rate INTEGER,
  recent_cases JSONB,
  notable_victories TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Conversation Context (for chat/voice continuity)
CREATE TABLE conversation_context (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  user_type TEXT NOT NULL,
  messages JSONB NOT NULL,
  case_analysis JSONB,
  client_info JSONB,
  current_intent TEXT,
  confidence_score DECIMAL(3,2),
  next_suggested_action TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '24 hours')
);

-- Training Data for AI Improvement
CREATE TABLE ai_training_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  interaction_type TEXT NOT NULL,
  user_input TEXT NOT NULL,
  ai_response TEXT NOT NULL,
  human_feedback TEXT,
  accuracy_rating INTEGER,
  user_satisfaction INTEGER,
  led_to_consultation BOOLEAN DEFAULT FALSE,
  case_type TEXT,
  session_id TEXT,
  input_embedding VECTOR(1536),
  response_embedding VECTOR(1536),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  feedback_date TIMESTAMPTZ
);

-- Communication Templates
CREATE TABLE communication_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  template_name TEXT NOT NULL,
  template_type TEXT NOT NULL,
  subject TEXT,
  content TEXT NOT NULL,
  variables JSONB,
  case_types TEXT[],
  communication_stage TEXT,
  recipient_type TEXT,
  embedding VECTOR(1536),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  usage_count INTEGER DEFAULT 0
);

-- Performance Analytics
CREATE TABLE case_performance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID REFERENCES case_precedents(id),
  predicted_value BIGINT,
  actual_value BIGINT,
  predicted_duration INTEGER,
  actual_duration INTEGER,
  predicted_outcome TEXT,
  actual_outcome TEXT,
  value_accuracy DECIMAL(5,2),
  outcome_correct BOOLEAN,
  what_we_learned TEXT,
  strategy_adjustments TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Defense Patterns
CREATE TABLE defense_patterns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  defendant_name TEXT NOT NULL,
  defendant_type TEXT,
  common_defenses TEXT[],
  settlement_patterns JSONB,
  attorney_firms TEXT[],
  typical_tactics TEXT[],
  our_wins INTEGER DEFAULT 0,
  our_losses INTEGER DEFAULT 0,
  average_settlement BIGINT,
  embedding VECTOR(1536),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Indexes
CREATE INDEX idx_case_precedents_type ON case_precedents (case_type, practice_area);
CREATE INDEX idx_case_precedents_year ON case_precedents (year DESC);
CREATE INDEX idx_case_precedents_amount ON case_precedents (settlement_amount DESC NULLS LAST);
CREATE INDEX idx_legal_knowledge_type ON legal_knowledge (knowledge_type, practice_area);
CREATE INDEX idx_case_strategies_type ON case_strategies (case_type);
CREATE INDEX idx_conversation_session ON conversation_context (session_id);
CREATE INDEX idx_conversation_expires ON conversation_context (expires_at);
CREATE INDEX idx_training_data_type ON ai_training_data (interaction_type, case_type);

-- Enable Row Level Security
ALTER TABLE case_precedents ENABLE ROW LEVEL SECURITY;
ALTER TABLE legal_knowledge ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_strategies ENABLE ROW LEVEL SECURITY;
ALTER TABLE expert_witnesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversation_context ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_training_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE communication_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_performance ENABLE ROW LEVEL SECURITY;
ALTER TABLE defense_patterns ENABLE ROW LEVEL SECURITY;

-- Create Security Policies
CREATE POLICY "Public read access" ON case_precedents FOR SELECT USING (true);
CREATE POLICY "Service role full access" ON case_precedents FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Public read knowledge" ON legal_knowledge FOR SELECT USING (true);
CREATE POLICY "Service role knowledge access" ON legal_knowledge FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Public read strategies" ON case_strategies FOR SELECT USING (true);
CREATE POLICY "Service role strategies access" ON case_strategies FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Session context access" ON conversation_context FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Training data access" ON ai_training_data FOR ALL USING (auth.role() = 'service_role');

-- Vector Search Functions
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