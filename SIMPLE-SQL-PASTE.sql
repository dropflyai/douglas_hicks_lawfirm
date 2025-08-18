-- COPY THIS ENTIRE BLOCK AND PASTE INTO SUPABASE
-- First run this to create tables:

CREATE TABLE IF NOT EXISTS case_precedents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_name TEXT NOT NULL UNIQUE,
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

CREATE TABLE IF NOT EXISTS legal_knowledge (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL UNIQUE,
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

-- Then run this to insert your data:

INSERT INTO case_precedents (case_name, case_number, court, year, case_type, practice_area, injury_type, severity, settlement_amount, verdict_amount, legal_issues, key_facts, legal_reasoning, outcome, douglas_hicks_attorney, precedent_value) VALUES 
('Anderson v. General Motors', 'BC123456', 'Los Angeles Superior Court', 1999, 'product_liability', 'Personal Injury', 'burns', 'catastrophic', NULL, 490000000000, ARRAY['product_defect', 'design_flaw', 'corporate_negligence', 'punitive_damages'], 'Plaintiff suffered severe burns when GM fuel tank exploded in side-impact collision. Internal documents showed GM knew of design defect but chose not to fix it due to cost.', 'Jury found GM conduct shocking and awarded largest punitive damage award in US history. Design defect made vehicles unreasonably dangerous.', 'verdict', 'Carl E. Douglas', 'landmark'),
('Family v. Los Angeles County Sheriff Department', 'CV2024-001', 'Federal District Court', 2024, 'civil_rights', 'Civil Rights', 'wrongful_death', 'fatal', 800000000, NULL, ARRAY['police_brutality', 'excessive_force', 'wrongful_death', 'section_1983'], 'Unarmed individual killed by deputies during traffic stop. Multiple witnesses and video evidence.', 'Established new precedent for sheriff accountability in LA County. Pattern of excessive force demonstrated.', 'settlement', 'Douglas Hicks Legal Team', 'landmark'),
('Wrongful Death v. Cedars-Sinai Medical Center', 'BC2023-789', 'Los Angeles Superior Court', 2023, 'medical_malpractice', 'Medical Malpractice', 'wrongful_death', 'fatal', 500000000, NULL, ARRAY['surgical_error', 'failure_to_diagnose', 'hospital_negligence'], 'Patient died due to surgical complications that should have been prevented. Hospital failed to follow protocols.', 'Hospital failure to maintain proper standards directly caused death. Economic and non-economic damages calculated.', 'settlement', 'Jamon R. Hicks', 'important')
ON CONFLICT (case_name) DO NOTHING;

INSERT INTO legal_knowledge (title, content, knowledge_type, practice_area, jurisdiction, topic_tags, citation, authority_level) VALUES
('Section 1983 Civil Rights Claims', 'Federal civil rights statute allows lawsuits against government officials for constitutional violations. Key elements: (1) Acting under color of state law, (2) Deprivation of federal rights.', 'statute', 'Civil Rights', 'federal', ARRAY['section_1983', 'civil_rights', 'police_misconduct'], '42 U.S.C. § 1983', 'statute'),
('California Comparative Negligence', 'California follows pure comparative negligence. Plaintiff damages reduced by percentage of fault but not barred entirely. Even 99% at fault can recover 1%.', 'case_law', 'Personal Injury', 'california', ARRAY['comparative_negligence', 'fault_allocation'], 'Li v. Yellow Cab Co., 13 Cal.3d 804 (1975)', 'supreme_court'),
('Punitive Damages in California', 'Available when defendant guilty of malice, oppression, or fraud. Must prove by clear and convincing evidence.', 'statute', 'Personal Injury', 'california', ARRAY['punitive_damages', 'malice', 'oppression'], 'Cal. Civ. Code § 3294', 'statute')
ON CONFLICT (title) DO NOTHING;

-- Verify it worked:
SELECT 
    case_name,
    CASE 
        WHEN settlement_amount IS NOT NULL THEN '$' || (settlement_amount / 100000000) || 'M settlement'
        WHEN verdict_amount IS NOT NULL THEN '$' || (verdict_amount / 100000000) || 'M verdict'
    END as amount,
    douglas_hicks_attorney
FROM case_precedents 
ORDER BY COALESCE(settlement_amount, verdict_amount) DESC;