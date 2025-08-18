CREATE TABLE IF NOT EXISTS case_precedents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_name TEXT NOT NULL,
    case_number TEXT,
    court TEXT,
    year INTEGER,
    case_type TEXT NOT NULL,
    practice_area TEXT NOT NULL,
    settlement_amount BIGINT,
    verdict_amount BIGINT,
    douglas_hicks_attorney TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO case_precedents (case_name, case_number, court, year, case_type, practice_area, settlement_amount, verdict_amount, douglas_hicks_attorney) VALUES 
('Anderson v. General Motors', 'BC123456', 'Los Angeles Superior Court', 1999, 'product_liability', 'Personal Injury', NULL, 490000000000, 'Carl E. Douglas'),
('Family v. Los Angeles County Sheriff Department', 'CV2024-001', 'Federal District Court', 2024, 'civil_rights', 'Civil Rights', 800000000, NULL, 'Douglas Hicks Legal Team'),
('Wrongful Death v. Cedars-Sinai Medical Center', 'BC2023-789', 'Los Angeles Superior Court', 2023, 'medical_malpractice', 'Medical Malpractice', 500000000, NULL, 'Jamon R. Hicks');

SELECT case_name, verdict_amount, settlement_amount FROM case_precedents;