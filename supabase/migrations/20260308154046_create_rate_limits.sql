-- Rate limiting table for tracking API requests by IP
CREATE TABLE IF NOT EXISTS rate_limits (
  id SERIAL PRIMARY KEY,
  ip TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast lookups by IP and timestamp
CREATE INDEX IF NOT EXISTS rate_limits_ip_created_idx ON rate_limits(ip, created_at);

-- Optional: Add cleanup job to delete old records (>24 hours)
-- This keeps the table small and performant
CREATE OR REPLACE FUNCTION cleanup_old_rate_limits()
RETURNS void AS $$
BEGIN
  DELETE FROM rate_limits WHERE created_at < NOW() - INTERVAL '24 hours';
END;
$$ LANGUAGE plpgsql;
