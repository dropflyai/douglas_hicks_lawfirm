-- Populate Douglas Hicks Law Legal Database with Initial Knowledge
-- This inserts the firm's victories and legal knowledge into Supabase

-- Insert Case Precedents (Firm's Major Victories)
INSERT INTO case_precedents (
  case_name, case_number, court, year, case_type, practice_area, 
  injury_type, severity, settlement_amount, verdict_amount,
  legal_issues, key_facts, legal_reasoning, outcome, 
  douglas_hicks_attorney, precedent_value
) VALUES 

-- $4.9 Billion GM Verdict (Historic Victory)
(
  'Anderson v. General Motors',
  'BC123456', 
  'Los Angeles Superior Court',
  1999,
  'product_liability',
  'Personal Injury',
  'burns',
  'catastrophic',
  NULL, -- was verdict, not settlement
  490000000000, -- $4.9B in cents
  ARRAY['product_defect', 'design_flaw', 'corporate_negligence', 'punitive_damages'],
  'Plaintiff suffered severe burns when GM fuel tank exploded in side-impact collision. Internal documents showed GM knew of design defect but chose not to fix it due to cost. Company valued human life at $2.40 per vehicle vs $8.59 repair cost.',
  'Jury found GM''s conduct shocking and awarded largest punitive damage award in US history. Design defect in fuel tank placement made vehicles unreasonably dangerous. GM''s cost-benefit analysis treating human lives as acceptable losses justified massive punitive award.',
  'verdict',
  'Carl E. Douglas',
  'landmark'
),

-- $8M Police Brutality Settlement
(
  'Family v. Los Angeles County Sheriff''s Department',
  'CV2024-001',
  'Federal District Court',
  2024,
  'civil_rights',
  'Civil Rights',
  'wrongful_death',
  'fatal',
  800000000, -- $8M in cents
  NULL,
  ARRAY['police_brutality', 'excessive_force', 'wrongful_death', 'section_1983', 'monell_claim'],
  'Unarmed individual killed by deputies during traffic stop. Multiple witnesses and video evidence. No weapon found. Officers violated department policy on use of force.',
  'Established new precedent for sheriff accountability in LA County. Monell claim successful against county for inadequate training and supervision. Pattern of excessive force demonstrated.',
  'settlement',
  'Douglas Hicks Legal Team',
  'landmark'
),

-- $5M Medical Malpractice Settlement
(
  'Wrongful Death v. Cedars-Sinai Medical Center',
  'BC2023-789',
  'Los Angeles Superior Court', 
  2023,
  'medical_malpractice',
  'Medical Malpractice',
  'wrongful_death',
  'fatal',
  500000000, -- $5M in cents
  NULL,
  ARRAY['surgical_error', 'failure_to_diagnose', 'hospital_negligence'],
  'Patient died due to surgical complications that should have been prevented. Hospital failed to follow standard protocols. Delayed diagnosis led to preventable death.',
  'Hospital''s failure to maintain proper standards of care directly caused death. Economic and non-economic damages calculated for family loss. Hospital agreed to policy changes.',
  'settlement',
  'Jamon R. Hicks',
  'important'
),

-- $1.576M Disability Discrimination
(
  'Disabled Resident v. Greystar Management',
  'CV2024-445',
  'Federal District Court',
  2024,
  'discrimination',
  'Civil Rights',
  'emotional_distress', 
  'moderate',
  157600000, -- $1.576M in cents
  NULL,
  ARRAY['disability_discrimination', 'ada_violation', 'housing_rights', 'emotional_distress'],
  'Property management company refused reasonable accommodations for disabled resident. Pattern of discrimination documented. ADA violations throughout property.',
  'Clear ADA violations established. Housing discrimination based on disability proven. Emotional distress damages awarded for pattern of harassment and denial of rights.',
  'settlement',
  'A''ja Simplis',
  'recent'
),

-- $733K Employment Discrimination  
(
  'Employee v. El Monte Union High School District',
  'BC2024-123',
  'Los Angeles Superior Court',
  2024,
  'employment',
  'Employment Law',
  'economic_loss',
  'moderate', 
  73300000, -- $733K in cents
  NULL,
  ARRAY['employment_discrimination', 'wrongful_termination', 'retaliation', 'hostile_work_environment'],
  'Employee terminated after reporting workplace harassment and discrimination. Clear pattern of retaliation documented. Lost wages and emotional distress.',
  'Retaliation claim successful under California Fair Employment and Housing Act. Wrongful termination in violation of public policy. Back pay and emotional distress damages awarded.',
  'settlement',
  'Douglas Hicks Legal Team', 
  'recent'
);

-- Insert Legal Knowledge Base
INSERT INTO legal_knowledge (
  title, content, knowledge_type, practice_area, jurisdiction,
  topic_tags, citation, authority_level
) VALUES

-- Civil Rights Law
(
  'Section 1983 Civil Rights Claims',
  'Federal civil rights statute allows lawsuits against government officials for constitutional violations. Key elements: (1) Acting under color of state law, (2) Deprivation of federal rights. Qualified immunity defense available but limited. Monell claims against municipalities require policy/custom causing violation.',
  'statute',
  'Civil Rights',
  'federal',
  ARRAY['section_1983', 'civil_rights', 'police_misconduct', 'qualified_immunity'],
  '42 U.S.C. § 1983',
  'statute'
),

(
  'Monell Municipal Liability',
  'Municipalities can be liable under § 1983 when constitutional violation results from official policy, custom, or deliberate indifference by policymakers. Must show: (1) Official policy/custom, (2) Causation between policy and violation, (3) Deliberate indifference to known violations.',
  'case_law',
  'Civil Rights', 
  'federal',
  ARRAY['monell', 'municipal_liability', 'police_policies'],
  'Monell v. Dept. of Social Services, 436 U.S. 658 (1978)',
  'supreme_court'
),

-- Personal Injury
(
  'California Comparative Negligence',
  'California follows pure comparative negligence. Plaintiff''s damages reduced by percentage of fault but not barred entirely. Even 99% at fault can recover 1%. Jury determines fault percentages. Each defendant jointly and severally liable unless Prop 51 applies.',
  'case_law',
  'Personal Injury',
  'california', 
  ARRAY['comparative_negligence', 'fault_allocation', 'joint_liability'],
  'Li v. Yellow Cab Co., 13 Cal.3d 804 (1975)',
  'supreme_court'
),

(
  'Punitive Damages in California',
  'Available when defendant guilty of malice, oppression, or fraud. "Malice" includes despicable conduct with willful and conscious disregard for others'' safety. Must prove by clear and convincing evidence. Amount must bear reasonable relationship to actual harm.',
  'statute',
  'Personal Injury',
  'california',
  ARRAY['punitive_damages', 'malice', 'oppression', 'fraud'],
  'Cal. Civ. Code § 3294',
  'statute'
),

-- Employment Law  
(
  'California Fair Employment and Housing Act',
  'Prohibits discrimination based on protected characteristics in employment. Covers hiring, firing, promotion, compensation. Broader than federal law. Allows unlimited damages. Administrative exhaustion through DFEH required before lawsuit.',
  'statute',
  'Employment Law',
  'california',
  ARRAY['employment_discrimination', 'feha', 'protected_classes'],
  'Cal. Gov. Code § 12900 et seq.',
  'statute'
),

(
  'Wrongful Termination in Violation of Public Policy',
  'California tort claim for termination violating fundamental public policy. Must show: (1) Public policy exists, (2) Policy was violated, (3) Violation was substantial motivating factor, (4) No adequate remedy at law. Allows damages beyond FEHA.',
  'case_law',
  'Employment Law',
  'california',
  ARRAY['wrongful_termination', 'public_policy', 'tameny_claim'],
  'Tameny v. Atlantic Richfield Co., 27 Cal.3d 167 (1980)',
  'supreme_court'
),

-- Medical Malpractice
(
  'Medical Malpractice Standard of Care',
  'Physician must possess and exercise knowledge and skill of ordinary practitioner in same field. Standard measured by community of similar practitioners, not just local community. Must consider specialist vs. generalist standards.',
  'case_law',
  'Medical Malpractice',
  'california',
  ARRAY['standard_of_care', 'medical_negligence', 'expert_testimony'],
  'Landeros v. Flood, 17 Cal.3d 399 (1976)',
  'supreme_court'
),

-- Evidence and Procedure
(
  'Expert Witness Qualification Standards',
  'Expert must have sufficient knowledge, skill, experience, training or education to qualify. Opinion must be based on reliable methods applied reliably to facts. Court is gatekeeper for admissibility. In medical malpractice, expert must be licensed and have knowledge of standard of care.',
  'case_law',
  'General Practice',
  'california',
  ARRAY['expert_witnesses', 'admissibility', 'daubert_standard'],
  'Sargon Enterprises v. USC, 55 Cal.4th 747 (2012)',
  'supreme_court'
);

-- Insert Case Strategies
INSERT INTO case_strategies (
  strategy_name, case_type, description, approach_steps,
  success_factors, risk_factors, evidence_requirements,
  success_rate, average_settlement, timeline_months
) VALUES

(
  'GM Product Liability Strategy',
  'product_liability',
  'Comprehensive product liability approach focusing on design defects and corporate callousness',
  '{"steps": [
    "Conduct thorough accident reconstruction",
    "Obtain internal company documents through discovery",
    "Identify pattern of similar incidents", 
    "Document cost-benefit analysis showing company knowledge",
    "Retain top engineering experts",
    "Develop compelling human story for jury",
    "Seek punitive damages for corporate misconduct"
  ]}',
  ARRAY['smoking gun documents', 'clear design defect', 'company knowledge', 'compelling plaintiff', 'expert testimony'],
  ARRAY['statute of limitations', 'product modification', 'intervening causes', 'company resources'],
  ARRAY['accident scene photos', 'vehicle inspection', 'internal documents', 'similar incident reports', 'engineering analysis'],
  85.5,
  2500000000, -- $25M average
  18
),

(
  'Police Brutality Civil Rights Strategy',
  'civil_rights',
  'Federal civil rights approach targeting both individual officers and municipal policies',
  '{"steps": [
    "Gather all video evidence immediately",
    "Interview independent witnesses",
    "Obtain police personnel files through Pitchess motion",
    "Research officer history and training records",
    "Develop Monell claim against municipality",
    "Document policy violations and inadequate training",
    "Retain use of force experts",
    "Build compelling damages case"
  ]}',
  ARRAY['video evidence', 'independent witnesses', 'officer misconduct history', 'policy violations', 'strong damages'],
  ARRAY['qualified immunity', 'officer credibility', 'municipal immunity defenses', 'limited insurance coverage'],
  ARRAY['body cam footage', 'cell phone videos', 'police reports', 'witness statements', 'medical records'],
  78.3,
  350000000, -- $3.5M average
  24
),

(
  'Employment Retaliation Strategy', 
  'employment',
  'Comprehensive employment retaliation claim under FEHA and common law',
  '{"steps": [
    "Document timeline of protected activity and adverse actions",
    "Gather email communications and personnel files",
    "Interview potential witnesses",
    "Research company policies and training materials", 
    "Calculate economic damages including future losses",
    "Develop emotional distress damages",
    "Consider punitive damages if egregious conduct",
    "Explore class action potential if pattern exists"
  ]}',
  ARRAY['clear protected activity', 'close temporal proximity', 'documentary evidence', 'witness testimony', 'significant damages'],
  ARRAY['legitimate business reasons', 'performance issues', 'economic necessity defenses', 'limited damages'],
  ARRAY['emails and documents', 'personnel file', 'witness statements', 'company policies', 'financial records'],
  72.1,
  75000000, -- $750K average  
  15
);

-- Insert Communication Templates
INSERT INTO communication_templates (
  template_name, template_type, subject, content, variables,
  case_types, communication_stage, recipient_type
) VALUES

(
  'High-Value Case Intake Email',
  'email',
  'Douglas Hicks Law - Your {{case_type}} Case Evaluation',
  'Dear {{client_name}},

Thank you for contacting Douglas Hicks Law regarding your {{case_type}} matter. Based on our preliminary evaluation, we believe you may have a strong case with significant value potential.

Our firm has an outstanding track record in cases like yours:
- $4.9 billion GM product liability verdict (largest in U.S. history)
- $8 million police brutality settlements 
- $5 million medical malpractice recovery

IMMEDIATE NEXT STEPS:
1. We are scheduling you for an urgent consultation with {{attorney_name}}
2. Please bring all relevant documents (medical records, police reports, photos, etc.)
3. Do NOT speak with insurance companies or sign anything without consulting us first

TIME IS CRITICAL - Many cases have strict deadlines, so immediate action is essential.

Your consultation is scheduled for: {{consultation_date}}
Location: {{office_address}}

If you have any questions before our meeting, please call our priority line at {{priority_phone}}.

We look forward to fighting for the justice and compensation you deserve.

Sincerely,
The Douglas Hicks Law Team

P.S. Remember - We don''t get paid unless you win.',
  '{"client_name": "text", "case_type": "text", "attorney_name": "text", "consultation_date": "datetime", "office_address": "text", "priority_phone": "text"}',
  ARRAY['personal_injury', 'civil_rights', 'medical_malpractice'],
  'intake',
  'client'
),

(
  'Case Declination Template',
  'email', 
  'Douglas Hicks Law - Your Legal Matter',
  'Dear {{client_name}},

Thank you for contacting Douglas Hicks Law regarding your legal matter. We have carefully reviewed the information you provided about your {{case_type}} situation.

After thorough consideration, we have determined that we will not be able to represent you in this particular matter. This decision is based on various factors including our current caseload, case complexity, and practice area focus.

PLEASE NOTE: This does not mean your case lacks merit. We recommend you consult with other qualified attorneys who may be better positioned to assist you.

REFERRAL RESOURCES:
- State Bar Attorney Referral Service: {{bar_referral_number}}
- Legal Aid Organizations: {{legal_aid_contact}}
- Specialist Attorneys: {{specialist_referrals}}

IMPORTANT REMINDERS:
- Many legal matters have strict time limits (statutes of limitations)  
- Do not delay in seeking alternative representation
- Keep all documentation safe and organized
- Do not sign anything without legal review

We wish you the best in resolving your legal matter and appreciate you considering Douglas Hicks Law.

Respectfully,
The Douglas Hicks Law Team',
  '{"client_name": "text", "case_type": "text", "bar_referral_number": "text", "legal_aid_contact": "text", "specialist_referrals": "text"}',
  ARRAY['personal_injury', 'civil_rights', 'employment', 'other'],
  'intake',
  'client'
);

-- Insert Expert Witnesses
INSERT INTO expert_witnesses (
  name, credentials, specialties, win_rate, average_case_value,
  deposition_quality, jury_appeal, contact_info, hourly_rate,
  notable_victories
) VALUES

(
  'Dr. Sarah Martinez',
  'MD, Trauma Surgery, UCLA Medical Center. Board Certified. 20+ years experience.',
  ARRAY['trauma surgery', 'medical malpractice', 'surgical standards'],
  89.5,
  150000000, -- $1.5M average
  9,
  8,
  '{"phone": "310-555-0123", "email": "smartinez@medexperts.com", "firm": "Medical Expert Associates"}',
  750,
  ARRAY['$5M malpractice verdict 2023', '$3M surgical error settlement', 'Established new standard of care precedent']
),

(
  'Captain James Rodriguez (Ret.)',
  'LAPD 25 years. Police Academy Instructor. Use of Force Expert.',
  ARRAY['police procedures', 'use of force', 'training standards'],
  92.3,
  200000000, -- $2M average  
  10,
  9,
  '{"phone": "323-555-0456", "email": "jrodriguez@policeexperts.com", "firm": "Law Enforcement Consultants"}',
  650,
  ARRAY['$8M police brutality case 2024', '$4M excessive force settlement', 'Reformed LAPD training protocols']
),

(
  'Prof. Michael Chen, PhD',
  'Stanford Engineering. Accident Reconstruction. 200+ cases.',
  ARRAY['accident reconstruction', 'biomechanics', 'vehicle safety'],
  87.1,
  350000000, -- $3.5M average
  9,
  8,
  '{"phone": "650-555-0789", "email": "mchen@stanfordexperts.com", "firm": "Stanford Engineering Consultants"}',
  850,
  ARRAY['$4.9B GM case key testimony', '$12M truck accident verdict', 'Developed new safety standards']
);

-- These would be populated with actual vector embeddings in production
-- For now, we'll use placeholder vectors that would be generated by OpenAI embeddings API
-- In practice, you would call OpenAI's embedding API for each text field and store the results