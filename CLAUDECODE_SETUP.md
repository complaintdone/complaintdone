# ComplaintDone - Claude Code Development Environment Audit

**Audit Date:** 8 March 2026
**Claude Code Version:** 2.0.29
**Project:** ComplaintDone SaaS (complaintdone.com)

---

## EXECUTIVE SUMMARY

This document provides a complete audit of the Claude Code development environment for the ComplaintDone project. It serves as a handoff reference for Claude Desktop or future development sessions.

**System Status:** ✅ Fully operational with security hardening in progress

**Recent Security Enhancements:**
- ✅ Stripe webhook signature verification implemented (native HMAC-SHA256)
- ✅ Rate limiting added to create-checkout (5 requests/IP/60min via Postgres)
- ⏳ JWT verification still disabled (documented in SECURITY_HANDOFF.md)

---

## CLAUDE CODE CONFIGURATION

### Version & Features

```
Claude Code: 2.0.29
Model: claude-sonnet-4-5-20250929
Platform: darwin (macOS 25.4.0)
Always Thinking Mode: ENABLED
```

### Settings Location

```
~/.claude/
├── settings.json              # alwaysThinkingEnabled: true
├── settings.local.json        # Custom permissions & output style
├── history.jsonl             # Session history
├── projects/                 # Project-specific configs
├── todos/                    # Todo tracking
└── debug/                    # Debug logs
```

### Custom Permissions Configured

The following Bash commands are pre-approved in `~/.claude/settings.local.json`:

```json
{
  "permissions": {
    "allow": [
      "Bash(find:*)",
      "Bash(mv:*)", "Bash(ls:*)", "Bash(cp:*)", "Bash(rm:*)",
      "Bash(mkdir:*)", "Bash(chmod:*)",
      "Bash(du:*)", "Bash(head:*)",
      "Bash(python3:*)", "Bash(python:*)",
      "Bash(npm install:*)",
      "Bash(claude mcp:*)",
      "Bash(osascript:*)",
      "Bash(pkill:*)",
      "Bash(command -v:*)",
      "mcp__Canva__generate-design",
      "WebSearch"
    ]
  }
}
```

**Notable:** Auto-approved for file operations, npm installs, Python scripts, and MCP management.

---

## MCP SERVERS

### Active MCP Servers

```bash
$ claude mcp list

rube: https://rube.app/mcp (HTTP) - ✓ Connected
```

### Rube MCP (Composio Integration)

**Purpose:** Connects 500+ apps including Slack, GitHub, Notion, Google Workspace, Microsoft, Stripe, and more.

**Available Tools:**
- `mcp__rube__RUBE_SEARCH_TOOLS` - Discover tools and execution plans
- `mcp__rube__RUBE_MULTI_EXECUTE_TOOL` - Execute up to 50 tools in parallel
- `mcp__rube__RUBE_REMOTE_BASH_TOOL` - Execute bash in remote sandbox
- `mcp__rube__RUBE_REMOTE_WORKBENCH` - Process remote files with Python
- `mcp__rube__RUBE_MANAGE_CONNECTIONS` - Create/manage app connections
- `mcp__rube__RUBE_GET_TOOL_SCHEMAS` - Retrieve input schemas for tools
- `mcp__rube__RUBE_CREATE_UPDATE_RECIPE` - Convert workflows to reusable notebooks
- `mcp__rube__RUBE_EXECUTE_RECIPE` - Execute saved recipes
- `mcp__rube__RUBE_FIND_RECIPE` - Search for recipes by natural language
- `mcp__rube__RUBE_MANAGE_RECIPE_SCHEDULE` - Schedule recurring recipe runs

**Status:** Currently connected but not used in this project. Could be valuable for:
- Monitoring Stripe webhooks → Slack notifications
- Tracking Resend email deliveries
- Syncing complaint data to Google Sheets for analytics
- GitHub issue creation for customer support

### Recommended Additional MCP Servers for This Project

#### 1. Supabase MCP Server (High Priority)
```bash
npm install -g @anthropic-ai/mcp-supabase
```

**Why:** Direct Supabase database access from Claude Code
- Query rate_limits table directly
- Monitor complaints table (when implemented)
- Check Edge Function logs
- Manage RLS policies

#### 2. Stripe MCP Server (Medium Priority)
```bash
# Install via npm or use Rube's Stripe integration
```

**Why:** Monitor payments and webhook events
- List recent checkout sessions
- View webhook event history
- Check payment failures
- Validate metadata parsing

#### 3. GitHub MCP Server (Low Priority)
**Why:** Already have git CLI access, but MCP provides:
- PR review workflows
- Issue tracking for customer complaints
- Release management

---

## ENVIRONMENT TOOLS

### Installed Versions

```bash
Node.js:       v22.16.0
npm:           11.4.2
Supabase CLI:  2.75.0
Git:           2.50.1
Platform:      darwin (macOS 25.4.0)
```

### Supabase CLI Configuration

**Project ID:** `zwfqmnxozwksdkygojsh`
**Project Ref:** `zwfqmnxozwksdkygojsh`
**Linked Project:** ✅ Yes (via `supabase link`)

**Available Commands:**
```bash
supabase functions deploy <name>    # Deploy Edge Function
supabase db push --linked           # Apply migrations
supabase functions list             # List deployed functions
supabase status                     # Check local dev status
```

**Important:** `supabase functions list --project-ref` requires API key - use Dashboard instead.

### Git Configuration

**Remote:** `https://github.com/darrenentwistle1/complaintdone.git`
**Current Branch:** `main`
**Main Branch:** `main` (used for PRs)

**Recent Commits:**
```
ab194c6 - Fix: Use SUPABASE_ANON_KEY instead of SERVICE_ROLE_KEY
c5565d0 - Fix: Allow Stripe webhooks by disabling JWT verification
740fabd - Fix: Handle Stripe 500-char metadata limit
3ef5b31 - Fix linting errors blocking Vercel deployments
686f3ed - Fix: Standardize environment variable to VITE_SUPABASE_ANON_KEY
```

**Workflow Pattern:**
- Changes pushed to GitHub trigger Vercel auto-deploy
- Edge Functions require manual `supabase functions deploy`
- Migrations applied via `supabase db push --linked`

---

## PROJECT STRUCTURE

```
complaintdone/
├── src/                          # React frontend (TypeScript)
│   ├── pages/                    # Route components
│   │   ├── Index.tsx             # Landing page
│   │   ├── Complaint.tsx         # Main form (2000 char limit)
│   │   ├── Success.tsx           # Post-payment success page
│   │   ├── Terms.tsx             # Terms & conditions
│   │   └── NotFound.tsx          # 404 page
│   ├── components/
│   │   ├── ui/                   # shadcn/ui components (49+)
│   │   └── NavLink.tsx           # Navigation component
│   ├── integrations/
│   │   └── supabase/
│   │       ├── client.ts         # Supabase client singleton
│   │       └── types.ts          # Database types
│   ├── hooks/                    # React custom hooks
│   ├── lib/                      # Utility functions
│   ├── App.tsx                   # Root component with routing
│   ├── main.tsx                  # Entry point
│   └── index.css                 # Global styles + CSS variables
│
├── supabase/
│   ├── functions/                # Edge Functions (Deno runtime)
│   │   ├── create-checkout/      # Creates Stripe checkout session
│   │   │   └── index.ts          # WITH rate limiting (NEW)
│   │   ├── generate-complaint/   # Generates letter via Claude API
│   │   │   └── index.ts
│   │   ├── send-email/           # Sends letter via Resend
│   │   │   └── index.ts
│   │   └── stripe-webhook/       # Processes payment webhooks
│   │       └── index.ts          # WITH signature verification (NEW)
│   ├── migrations/
│   │   └── 20260308154046_create_rate_limits.sql  # Rate limiting table
│   └── config.toml               # Edge Function configuration
│
├── public/                       # Static assets
├── dist/                         # Production build output
├── CLAUDE.md                     # Claude Code project instructions
├── SECURITY_HANDOFF.md           # Security audit & gaps documentation
├── CLAUDECODE_SETUP.md           # This file
├── package.json                  # Dependencies
├── vite.config.ts                # Vite bundler config
├── tsconfig.json                 # TypeScript config
└── tailwind.config.ts            # Tailwind CSS config
```

### Key Files Deep Dive

#### 1. `src/pages/Complaint.tsx`
**Lines 65-95:** Main complaint form
- 2000 character limit on description
- Pre-defined UK companies autocomplete
- Tone selector: polite, firm, assertive
- Form validation: email, company, description required
- Calls `create-checkout` function → redirects to Stripe

#### 2. `supabase/functions/create-checkout/index.ts`
**Lines 16-68:** Rate limiting logic (NEWLY ADDED)
- Extracts IP from `x-forwarded-for` header
- Queries `rate_limits` table for count in last 60 minutes
- Blocks if count >= 5 with 429 status
- Uses `SUPABASE_SERVICE_ROLE_KEY` to bypass RLS

**Lines 86-104:** Stripe metadata chunking
- Splits descriptions into 490-char chunks
- Stores as `description_0`, `description_1`, etc.
- Required due to Stripe 500-char metadata limit

**Line 108:** Hardcoded Stripe price ID
```typescript
line_items: [{ price: "price_1T7w2IPt9nNFZaKHsb5S6GUv", quantity: 1 }]
```

#### 3. `supabase/functions/stripe-webhook/index.ts`
**Lines 10-62:** Native HMAC-SHA256 signature verification (NEWLY ADDED)
- Uses `crypto.subtle` API (Deno built-in)
- Avoids Stripe SDK to prevent EarlyDrop crashes
- Implements replay attack prevention (5-minute tolerance)
- Timing-safe comparison to prevent timing attacks

**Lines 96-160:** Webhook processing
- Reassembles chunked description from metadata
- Calls `generate-complaint` function
- Calls `send-email` function
- Returns 500 on any failure (proper error handling)

#### 4. `supabase/config.toml`
**All functions:** `verify_jwt = false`
- **Security Gap:** JWT verification disabled for all functions
- **Reason:** Previous developer encountered "Invalid JWT" errors
- **Impact:** Functions accept unauthenticated requests
- **Fix Needed:** See SECURITY_HANDOFF.md Phase 1

---

## DEPLOYMENT ARCHITECTURE

### Frontend (Vercel)

**Deployment:** Auto-deploys on `git push` to main branch
**Domain:** https://www.complaintdone.com
**Build Command:** `npm run build`
**Output Directory:** `dist`

**Environment Variables:**
```
VITE_SUPABASE_URL=https://ygobfieifodvcpvftqxr.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Backend (Supabase Edge Functions)

**Deployment:** Manual via `supabase functions deploy <name>`
**Runtime:** Deno (not Node.js)
**Region:** Auto-assigned by Supabase

**Environment Variables (Secrets):**
```
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
ANTHROPIC_API_KEY=sk-ant-...
RESEND_API_KEY=re_...
SUPABASE_URL=https://ygobfieifodvcpvftqxr.supabase.co
SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
```

**Set via:** Supabase Dashboard → Edge Functions → Secrets

### Database (Supabase Postgres)

**Schema Version:** Managed via migrations in `supabase/migrations/`

**Current Tables:**
```sql
rate_limits (
  id SERIAL PRIMARY KEY,
  ip TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
)

-- Index: rate_limits_ip_created_idx (ip, created_at)
```

**Cleanup Function:** `cleanup_old_rate_limits()` - Deletes records >24 hours old
**Usage:** Not scheduled yet (could add as cron job)

---

## TESTING & MONITORING

### Testing Workflow

**Frontend Changes:**
```bash
npm run dev              # Local dev server (port 8080)
git add . && git commit -m "..." && git push
# Vercel auto-deploys → check https://vercel.com/dashboard
```

**Edge Function Changes:**
```bash
# Edit function code
supabase functions deploy <function-name>
# Test via curl or Stripe CLI webhook forwarding
```

**Database Changes:**
```bash
# Create migration: supabase/migrations/YYYYMMDDHHMMSS_name.sql
supabase db push --linked
# Verify in Supabase Dashboard → Database → Tables
```

### Monitoring Resources

**Stripe:**
- Dashboard: https://dashboard.stripe.com
- Webhook logs: https://dashboard.stripe.com/webhooks
- Test events: Use Stripe CLI `stripe listen --forward-to`

**Supabase:**
- Dashboard: https://supabase.com/dashboard/project/ygobfieifodvcpvftqxr
- Edge Function logs: `/logs/edge-functions`
- Database: `/editor`
- API logs: `/logs/api`

**Vercel:**
- Dashboard: https://vercel.com/dashboard
- Deployments: Click project → Deployments tab
- Logs: Click deployment → View logs

**Resend:**
- Dashboard: https://resend.com/emails
- Email logs: `/logs`
- Domain verification: `/domains`

### Test Commands for Rate Limiting

```bash
# Test rate limiting (run 6 times to trigger 429)
for i in {1..6}; do
  curl -X POST https://ygobfieifodvcpvftqxr.supabase.co/functions/v1/create-checkout \
    -H "Content-Type: application/json" \
    -d '{"email":"test@test.com","name":"Test","company":"Test Ltd","description":"Test","tone":"firm"}'
  echo "Request $i"
done

# Expected: Requests 1-5 succeed (200), Request 6 fails (429)
```

### Test Commands for Stripe Webhook

```bash
# Test signature verification (should fail with 401)
curl -X POST https://ygobfieifodvcpvftqxr.supabase.co/functions/v1/stripe-webhook \
  -H "Content-Type: application/json" \
  -H "stripe-signature: t=1234,v1=invalid" \
  -d '{"type":"test"}'

# Expected: {"error":"Invalid signature"} with 401 status
```

---

## TECH STACK DETAILS

### Frontend

**Framework:** React 18.3.1 + TypeScript 5.6.2
**Build Tool:** Vite 5.4.2
**UI Library:** shadcn/ui (49+ components)
**Styling:** Tailwind CSS 3.4.1
**Routing:** React Router v6
**HTTP Client:** Built-in fetch API

**Fonts:**
- Headings: 'Space Grotesk'
- Body: 'DM Sans'

**Color Palette:**
```css
--navy: 215 100% 15%
--orange: 25 100% 50%
--background: 0 0% 100%
--foreground: 215 100% 15%
```

### Backend

**Runtime:** Deno (Supabase Edge Functions)
**AI Model:** claude-haiku-4-5-20251001 (via Anthropic API)
**Email:** Resend API
**Payment:** Stripe Checkout
**Database:** PostgreSQL (Supabase managed)

**Import Convention (Deno):**
```typescript
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
```

**CORS Headers Required:**
```typescript
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
```

---

## COST ANALYSIS

### Current Pricing

**Revenue Per Complaint:** £3.00 UK / $5.00 USA

**Costs Per Complaint:**
- Stripe fee: £0.05 (1.5% + 20p)
- Anthropic API: £0.001 (Claude Haiku)
- Resend email: £0 (free tier: 100/day)
- **Total cost: £0.051**

**Net Profit Per Complaint:** £1.44 (96.6% margin)

### Free Tier Limits

**Vercel:**
- Tier: Hobby (Free)
- Bandwidth: Unlimited
- Builds: 100/month
- **Current Status:** Well within limits

**Supabase:**
- Database: 500MB (currently minimal usage)
- Bandwidth: 2GB/month
- Edge Function invocations: 500,000/month
- **Current Status:** Well within limits

**Resend:**
- Emails: 100/day
- **Constraint:** Main bottleneck for scale
- **Max Revenue at Free Tier:** ~£4,470/month (100 complaints/day)

**Anthropic:**
- Pay per use (no free tier)
- Claude Haiku: ~£0.001 per letter
- **Current Cost:** Negligible

### Scale Thresholds

**Before Paid Upgrades Needed:**
- ~100 complaints/day (Resend limit)
- ~3,000 complaints/month
- ~£4,470/month revenue
- ~£4,317/month profit

**When to Upgrade:**
- Resend: £8/month for 50,000 emails
- Supabase: Stay on free tier until 500MB database
- Stripe: Already on paid tier (no action needed)

---

## SECURITY STATUS

### ✅ Implemented Protections

1. **Stripe Webhook Signature Verification**
   - Native HMAC-SHA256 using `crypto.subtle`
   - Replay attack prevention (5-minute tolerance)
   - Timing-safe comparison
   - **File:** `supabase/functions/stripe-webhook/index.ts:10-62`

2. **Rate Limiting**
   - 5 requests per IP per 60 minutes
   - Database-backed (no external service costs)
   - Graceful error handling
   - **File:** `supabase/functions/create-checkout/index.ts:16-68`

3. **Form Validation**
   - Email format validation
   - Required fields enforced
   - 2000 character description limit
   - **File:** `src/pages/Complaint.tsx:65-95`

### ⚠️ Known Security Gaps

**See SECURITY_HANDOFF.md for complete details.**

**High Priority:**
- JWT verification disabled on all functions
- No database logging of complaints
- No error monitoring service (Sentry)

**Medium Priority:**
- Hardcoded values (price ID, URLs)
- No monitoring/alerting
- No customer support lookup system

**Low Priority:**
- Could implement stricter rate limits
- Add CAPTCHA for bot prevention
- Implement email verification

---

## RECOMMENDED MCP SETUP FOR THIS PROJECT

### Priority 1: Supabase MCP (Install Now)

**Why:**
- Direct database access for monitoring
- Query rate_limits table
- Check Edge Function logs
- Manage migrations

**Installation:**
```bash
npm install -g @anthropic-ai/mcp-supabase
claude mcp add supabase
```

**Configuration:**
```json
{
  "supabase": {
    "url": "https://ygobfieifodvcpvftqxr.supabase.co",
    "service_role_key": "eyJhbGci..."
  }
}
```

**Use Cases:**
```
"Show me all rate limit entries from the last hour"
"Check Edge Function logs for errors in the last 24 hours"
"Query complaints table for customer support lookup" (when implemented)
```

### Priority 2: Rube/Composio Workflows (Configure)

**Already Installed:** ✅ Connected

**Recommended Workflows:**

1. **Stripe Event → Slack Notification**
   - Monitor failed payments
   - Alert on webhook errors
   - Track daily revenue

2. **Complaint Analytics → Google Sheets**
   - Export complaint data
   - Track most complained-about companies
   - Revenue vs. complaints ratio

3. **Customer Support Automation**
   - Create GitHub issues from failed deliveries
   - Email resend requests
   - Refund processing

**Setup:**
```
Ask Claude: "Set up a Rube workflow to send Slack notifications when Stripe payments fail"
```

### Priority 3: GitHub MCP (Optional)

**Why:**
- Already have git CLI access
- MCP adds PR review workflows
- Issue tracking for customer complaints

**Installation:**
```bash
claude mcp add github
```

---

## TOKEN EFFICIENCY RECOMMENDATIONS

### Optimizing Claude Code Sessions

**1. Use File References Instead of Full Reads**

❌ **Inefficient:**
```
"Read the entire stripe-webhook/index.ts file"
```

✅ **Efficient:**
```
"Check the signature verification function in stripe-webhook/index.ts:10-62"
```

**2. Leverage Existing Documentation**

This project has excellent documentation:
- `CLAUDE.md` - Project overview & architecture
- `SECURITY_HANDOFF.md` - Security audit & gaps
- `CLAUDECODE_SETUP.md` - This file

**Start new sessions with:**
```
"Review SECURITY_HANDOFF.md and implement the next high-priority fix"
```

**3. Use Targeted Tool Calls**

❌ **Inefficient:**
```
Read all Edge Function files to understand the flow
```

✅ **Efficient:**
```
Grep for "SUPABASE_SERVICE_ROLE_KEY" usage across Edge Functions
```

**4. Batch Related Tasks**

✅ **Good:**
```
"Deploy all Edge Functions and verify webhook signature in one session"
```

**5. Use TodoWrite for Complex Tasks**

For multi-step tasks like "Implement JWT verification":
```
1. Update supabase/config.toml
2. Toggle Supabase Dashboard settings
3. Update stripe-webhook to keep verify_jwt=false
4. Test end-to-end flow
5. Rollback if broken
```

### Common Task Patterns

**Pattern 1: Security Enhancement**
```bash
# Read security doc → Implement fix → Test → Deploy → Update doc
1. Read SECURITY_HANDOFF.md
2. Edit relevant function file
3. Deploy function
4. Test with curl
5. Update SECURITY_HANDOFF.md (mark as ✅)
```

**Pattern 2: Feature Addition**
```bash
# Plan → Frontend → Backend → Test → Deploy
1. Update src/pages/Complaint.tsx
2. Create new Edge Function if needed
3. Update supabase/config.toml
4. Deploy function
5. Push to GitHub (Vercel auto-deploys)
6. Test end-to-end
```

**Pattern 3: Debugging**
```bash
# Check logs → Identify issue → Fix → Verify
1. Check Supabase Edge Function logs
2. Grep codebase for error pattern
3. Edit relevant file
4. Deploy
5. Test with curl
```

---

## TROUBLESHOOTING GUIDE

### Common Issues & Solutions

#### 1. Edge Function Not Updating After Deploy

**Symptom:** Deployed function shows old code
**Cause:** Local file differs from GitHub
**Solution:**
```bash
git stash              # Save local changes
git pull               # Get latest from GitHub
supabase functions deploy <name>
```

#### 2. "Invalid JWT" Errors

**Symptom:** Function calls return 401 Unauthorized
**Cause:** `verify_jwt = true` but client not sending JWT
**Solutions:**
- Option A: Set `verify_jwt = false` in config.toml (current approach)
- Option B: Send `Authorization: Bearer ${supabaseAnonKey}` header from client
- Option C: Implement custom API key authentication

**Current Status:** All functions have `verify_jwt = false`

#### 3. Rate Limiting Blocking Your IP

**Symptom:** Getting 429 errors during testing
**Solution:**
```bash
# Create temp migration to clear table
cat > supabase/migrations/temp_clear.sql <<EOF
DELETE FROM rate_limits;
EOF

supabase db push --linked
rm supabase/migrations/temp_clear.sql
```

#### 4. Stripe Webhook Signature Verification Failing

**Symptom:** All webhook events return 401
**Cause:** Wrong webhook secret or signature parsing issue
**Debug:**
```bash
# Check webhook secret is set
echo $STRIPE_WEBHOOK_SECRET

# Test with Stripe CLI
stripe listen --forward-to https://ygobfieifodvcpvftqxr.supabase.co/functions/v1/stripe-webhook

# Check Supabase logs
# Dashboard → Edge Functions → stripe-webhook → Logs
```

#### 5. Migration File Rejected

**Symptom:** `file name must match pattern "<timestamp>_name.sql"`
**Solution:**
```bash
# Correct format: YYYYMMDDHHMMSS_description.sql
mv create_table.sql 20260308154046_create_table.sql
```

#### 6. Supabase CLI "Forbidden resource" Error

**Symptom:** `supabase functions list --project-ref` returns 403
**Solution:** Use Supabase Dashboard instead:
- https://supabase.com/dashboard/project/ygobfieifodvcpvftqxr/functions

---

## NEXT DEVELOPMENT PRIORITIES

### Phase 1: Security Hardening (URGENT)

**From SECURITY_HANDOFF.md:**

1. **Re-enable JWT Verification** (30 minutes)
   - Update `supabase/config.toml`
   - Set `verify_jwt = true` for create-checkout, generate-complaint, send-email
   - Keep `verify_jwt = false` for stripe-webhook
   - Toggle Supabase Dashboard settings
   - Test end-to-end flow
   - Rollback if broken

2. **Add Error Logging Service** (1 hour)
   - Install Sentry for Deno
   - Add to all Edge Functions
   - Test error capture

3. **Implement Complaint Database Logging** (2 hours)
   - Create `complaints` table migration
   - Add logging to generate-complaint function
   - Add customer support lookup endpoint

### Phase 2: Functionality Enhancements

**User Requested:** "Adjust functionality and add more detail to website"

**Questions to Address:**
1. What functionality changes are needed?
2. What additional details should be added?
3. Are there new features to build?
4. UI/UX improvements needed?

**Potential Improvements:**
- Success page content (order confirmation, timeline)
- Form validation (min description length, company validation)
- Error handling (specific error messages)
- Loading states (letter generation progress)

### Phase 3: Technical Improvements

1. **Move Hardcoded Values to Env Vars**
   - Stripe price ID
   - Success/cancel URLs
   - Rate limit thresholds

2. **Add Monitoring/Alerting**
   - Set up Sentry alerts
   - Configure Supabase log alerts
   - Add health check endpoints

3. **Optimize Database**
   - Schedule `cleanup_old_rate_limits()` cron job
   - Add indexes as needed
   - Implement RLS policies

---

## HANDOFF CHECKLIST

### For Claude Desktop Sessions

- [ ] Read this file first (`CLAUDECODE_SETUP.md`)
- [ ] Review `SECURITY_HANDOFF.md` for current status
- [ ] Check `CLAUDE.md` for project-specific guidance
- [ ] Run `git status` to check for uncommitted changes
- [ ] Run `git pull` to get latest from GitHub
- [ ] Check Supabase Dashboard for recent logs/errors
- [ ] Review Stripe Dashboard for webhook events

### For New Developers

- [ ] Install required tools (Node, Supabase CLI, Git)
- [ ] Clone repo: `git clone https://github.com/darrenentwistle1/complaintdone.git`
- [ ] Install dependencies: `npm install`
- [ ] Link Supabase project: `supabase link --project-ref zwfqmnxozwksdkygojsh`
- [ ] Request access to:
  - Vercel dashboard
  - Supabase dashboard
  - Stripe dashboard
  - Resend dashboard
  - GitHub repo (write access)
- [ ] Set up local environment variables (`.env.local`)
- [ ] Test local dev server: `npm run dev`
- [ ] Review all three docs: CLAUDE.md, SECURITY_HANDOFF.md, this file

---

## ADDITIONAL RESOURCES

### Documentation

- Supabase Edge Functions: https://supabase.com/docs/guides/functions
- Deno Runtime: https://deno.land/manual
- Stripe Webhooks: https://stripe.com/docs/webhooks
- Anthropic API: https://docs.anthropic.com/claude/reference
- shadcn/ui: https://ui.shadcn.com/

### Support Contacts

**Stripe:** https://support.stripe.com
**Supabase:** https://supabase.com/support
**Vercel:** https://vercel.com/support
**Resend:** https://resend.com/support
**Anthropic:** https://support.anthropic.com

---

## CHANGELOG

**2026-03-08:** Initial audit completed
- Claude Code 2.0.29
- Rube MCP connected
- Stripe webhook signature verification implemented
- Rate limiting added to create-checkout
- Security gaps documented in SECURITY_HANDOFF.md

---

**This document should be updated after each major development session to maintain accuracy.**
