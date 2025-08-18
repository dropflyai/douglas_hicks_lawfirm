-- Enable vector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Create case_precedents table
CREATE TABLE IF NOT EXISTS case_precedents (
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
  legal_issues TEXT[],
  key_facts TEXT,
  legal_reasoning TEXT,
  outcome TEXT,
  douglas_hicks_attorney TEXT,
  precedent_value TEXT DEFAULT 'standard',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create legal_knowledge table
CREATE TABLE IF NOT EXISTS legal_knowledge (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  knowledge_type TEXT NOT NULL,
  practice_area TEXT NOT NULL,
  jurisdiction TEXT DEFAULT 'california',
  topic_tags TEXT[],
  citation TEXT,
  authority_level TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create case_strategies table
CREATE TABLE IF NOT EXISTS case_strategies (
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
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create expert_witnesses table
CREATE TABLE IF NOT EXISTS expert_witnesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  credentials TEXT,
  specialties TEXT[],
  win_rate DECIMAL(5,2),
  average_case_value BIGINT,
  deposition_quality INTEGER,
  jury_appeal INTEGER,
  contact_info JSONB,
  hourly_rate INTEGER,
  notable_victories TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create communication_templates table  
CREATE TABLE IF NOT EXISTS communication_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  template_name TEXT NOT NULL,
  template_type TEXT NOT NULL,
  subject TEXT,
  content TEXT NOT NULL,
  variables JSONB,
  case_types TEXT[],
  communication_stage TEXT,
  recipient_type TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE case_precedents ENABLE ROW LEVEL SECURITY;
ALTER TABLE legal_knowledge ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_strategies ENABLE ROW LEVEL SECURITY;
ALTER TABLE expert_witnesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE communication_templates ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY IF NOT EXISTS "Public read access" ON case_precedents FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "Service role full access" ON case_precedents FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY IF NOT EXISTS "Public read knowledge" ON legal_knowledge FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "Service role knowledge access" ON legal_knowledge FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY IF NOT EXISTS "Public read strategies" ON case_strategies FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "Service role strategies access" ON case_strategies FOR ALL USING (auth.role() = 'service_role');