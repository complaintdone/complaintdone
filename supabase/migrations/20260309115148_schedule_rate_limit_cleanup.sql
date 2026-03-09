-- ✅ SECURITY: Schedule automatic cleanup of rate limit records (prevent unbounded growth)
-- This migration sets up pg_cron to run the cleanup function daily at 3 AM UTC

-- Enable pg_cron extension if not already enabled
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Schedule the cleanup job to run daily at 3 AM UTC
-- This removes rate_limits records older than 24 hours
SELECT cron.schedule(
  'cleanup-rate-limits-daily',  -- Job name
  '0 3 * * *',                   -- Cron schedule: 3 AM UTC daily
  $$SELECT cleanup_old_rate_limits()$$
);

-- Add comment explaining the job
COMMENT ON EXTENSION pg_cron IS 'Runs scheduled cleanup_old_rate_limits() daily at 3 AM UTC to prevent database bloat';
