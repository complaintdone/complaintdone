-- Create complaints table for analytics and support
CREATE TABLE complaints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company TEXT NOT NULL,
  market TEXT NOT NULL DEFAULT 'uk',
  tone TEXT NOT NULL,
  outcome TEXT,
  status TEXT NOT NULL DEFAULT 'delivered',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster queries by company and market
CREATE INDEX complaints_company_idx ON complaints(company);
CREATE INDEX complaints_market_idx ON complaints(market);
CREATE INDEX complaints_created_at_idx ON complaints(created_at DESC);

-- Add comment to table
COMMENT ON TABLE complaints IS 'Tracks complaint letters generated and delivered (no PII stored)';
