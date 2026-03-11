# ComplaintDone - Claude Desktop Context Sync

**Purpose:** Share current project state between ClaudeCode and Claude Desktop
**Last Updated:** 10 March 2026
**How to use:** Copy the "Quick Context" section below and paste it into Claude Desktop

---

## 📋 Quick Context (Copy This to Claude Desktop)

```
I'm working on ComplaintDone.com - a live SaaS complaint letter generator.

CURRENT STATUS (10 March 2026):
✅ Live & profitable: £3 UK / $5 USA per letter
✅ Tech stack: React 18 + Supabase Edge Functions + Stripe + Claude API
✅ Security: A- rating (89/100) - JWT enabled, rate limiting, webhook verification
✅ SEO: 5 company pages live (British Gas, Sky, BT, Vodafone, Virgin Media)
✅ Sitemap: Fixed from 31 broken URLs → 12 working URLs
✅ Email: Restored - Google appeal successful, Resend operating normally

⚠️ ACTION REQUIRED: Verify JWT enforcement in Supabase Dashboard
→ Check: https://supabase.com/dashboard/project/ygobfieifodvcpvftqxr/settings/functions
→ Enable for: create-checkout, generate-complaint, send-email, contact-form

📁 KEY FILES (read these for full context):
- CLAUDE.md - Main project documentation (SINGLE SOURCE OF TRUTH)
- VERIFICATION_GUIDE.md - Testing checklist
- SECURITY_HANDOFF.md - Security audit & gaps
- EMAIL_PROVIDER_MIGRATION.md - Email provider guide (for reference only - issue resolved)

🔧 RECENT CHANGES (10 March):
- ✅ Email account restored (Google appeal successful)
- Built 5 company landing pages for SEO
- Fixed sitemap (removed 25 non-existent pages)
- Fixed pricing references (was £1.49, now £3/$5)
- Restricted contact-form CORS to production domain
- Cleaned up 7 redundant documentation files

💰 ECONOMICS:
- Revenue: £3 UK / $5 USA per complaint
- Costs: ~£0.06 per complaint
- Profit: ~£2.94 UK / $4.74 USA (96% margin)
- Promo code for testing: nSACtg4aX574 (£0.00 checkout)

🎯 IMMEDIATE PRIORITIES:
1. Verify JWT enforcement in Supabase Dashboard
2. Test full payment flow (use promo code: nSACtg4aX574)
3. Build 10 more company pages (see GROWTH_PLAN.md)

WHAT DO YOU NEED HELP WITH?
```

---

## 🔄 How to Keep Context in Sync

### Option 1: Use This File (Recommended)

**When starting new Claude Desktop session:**
1. Open this file: `CLAUDE_DESKTOP_CONTEXT.md`
2. Copy the "Quick Context" section above
3. Paste into Claude Desktop
4. Ask your question

**Update this file when:**
- Major changes happen (new features, bug fixes, deployments)
- Priorities change
- New urgent issues arise

### Option 2: Always Reference CLAUDE.md

**Why:** CLAUDE.md is the single source of truth for the project.

**In Claude Desktop, always start with:**
```
Read CLAUDE.md in /Users/darrenentwistle/complaintdone/
and give me a summary of the current project status.

Then help me with: [your question]
```

### Option 3: Create Session Notes

**After each ClaudeCode session:**
1. Copy important outcomes to this file
2. Update the "Quick Context" section
3. Next Claude Desktop session will have fresh context

---

## 📊 Current Project State (Detailed)

### ✅ What's Working

**Frontend (14 pages):**
- Homepage with market toggle (UK/USA)
- Complaint form (2000 char limit, UK companies autocomplete)
- Success page
- About, Examples, Contact pages
- Terms & Privacy pages
- 5 Company pages: British Gas, Sky, BT, Vodafone, Virgin Media

**Backend (5 Edge Functions):**
- create-checkout (v38) - Rate limiting, JWT, CORS restricted
- generate-complaint (v10) - Claude Haiku API
- send-email (v11) - Resend API
- stripe-webhook (v24) - HMAC-SHA256 verification
- contact-form (v7) - Rate limiting, JWT, CORS restricted

**Database:**
- rate_limits table (IP-based, 5/hour checkout, 3/hour contact)
- complaints table (logging all generated letters)
- pg_cron scheduled cleanup job

**Security:**
- JWT verification enabled in config.toml
- Rate limiting active
- Stripe webhook signature verification
- Security headers (CSP, HSTS, X-Frame-Options)
- CORS restricted to production domain

**Analytics:**
- Google Analytics: G-CPDL50NG38
- Google Search Console verified
- Sitemap: 12 URLs (all working)

**Payment:**
- Stripe integration: £3 UK / $5 USA
- Promo code feature: nSACtg4aX574 for £0.00 testing
- Success/cancel flow working

### ⚠️ Known Issues

**1. JWT Verification - NEEDS MANUAL CHECK**
- Enabled in config.toml
- NEEDS MANUAL VERIFICATION in Supabase Dashboard
- Check: https://supabase.com/dashboard/project/ygobfieifodvcpvftqxr/settings/functions

**2. Documentation**
- Some pricing references may still be outdated
- Need to ensure CLAUDE.md is always updated first

### 📈 Next Development Priorities

**Phase 1: Fix Critical Issues**
1. Email provider (DNS config or switch to Postmark)
2. Verify JWT in Dashboard
3. Test full payment flow

**Phase 2: SEO Growth**
1. Build 10 more company pages (EDF Energy, Amazon, O2, etc.)
2. Write blog content for high-volume keywords
3. Submit updated sitemap to Google Search Console

**Phase 3: Technical Improvements**
1. Add error monitoring (Sentry)
2. Optimize database cleanup schedule
3. Implement email newsletter signup

---

## 🎯 Decision Log (What's Been Decided)

### Pricing
- **Decision:** £3 UK / $5 USA (not £1.49)
- **Rationale:** Better margin, more sustainable, still affordable
- **Date:** Before 10 March 2026

### Email Provider
- **Current:** Resend API
- **Issue:** Google policy abuse flag (10 March 2026)
- **Resolution:** Appeal successful, account restored
- **Decision:** Keep Resend, no migration needed
- **Date:** 10 March 2026 (resolved same day)

### Company Pages Strategy
- **Decision:** Build 5 high-priority pages first, then expand
- **Pages built:** British Gas, Sky, BT, Vodafone, Virgin Media
- **Next:** 10 more pages (energy, telecoms, banking, airlines)
- **Date:** 10 March 2026

### Documentation Cleanup
- **Decision:** Keep only 7 essential docs, delete 7 redundant ones
- **Rationale:** Too much context slows down AI tools
- **Date:** 10 March 2026

### Sitemap Fix
- **Decision:** Only include pages that exist (12 URLs)
- **Rationale:** 25 broken URLs hurting SEO
- **Date:** 10 March 2026

---

## 📝 Session Notes Template

**Use this template after each ClaudeCode session to track what was done:**

```
DATE: 10 March 2026 (Session 1)
ISSUE: Google email policy abuse + pricing inconsistencies
OUTCOME:
  ✅ Created EMAIL_PROVIDER_MIGRATION.md
  ✅ Fixed all pricing references (£1.49 → £3/$5)
  ✅ Created CLAUDE_DESKTOP_CONTEXT.md for syncing
  ✅ Email issue RESOLVED - Google appeal successful

DATE: 10 March 2026 (Session 2)
ISSUE: Email account restored
OUTCOME:
  ✅ Updated all docs to reflect email resolution
  ✅ EMAIL_PROVIDER_MIGRATION.md marked as resolved
  ✅ CLAUDE.md urgent issues section updated
  ✅ CLAUDE_DESKTOP_CONTEXT.md priorities updated

NEXT ACTIONS:
  1. User: Verify JWT enforcement in Supabase Dashboard
  2. User: Test full payment flow with promo code
  3. ClaudeCode: Build next 10 company pages
```

---

## 🔑 Key Environment Variables

**Frontend (Vercel):**
```
VITE_SUPABASE_URL=https://ygobfieifodvcpvftqxr.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
VITE_GA_MEASUREMENT_ID=G-CPDL50NG38
```

**Backend (Supabase Edge Function Secrets):**
```
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
ANTHROPIC_API_KEY=sk-ant-...
RESEND_API_KEY=re_...
PROMO_CODE_SECRET=nSACtg4aX574
STRIPE_PRICE_ID_UK=price_1T8lZyPt9nNFZaKH5MAnzlq0  (£3.00)
STRIPE_PRICE_ID_USA=price_1T8lZyPt9nNFZaKHNeNvTdRL ($5.00)
STRIPE_PRICE_ID_UK_FREE=price_... (£0.00 for promo)
STRIPE_PRICE_ID_USA_FREE=price_... ($0.00 for promo)
```

---

## 🗂️ File Map (Where to Find Things)

### Core Documentation
- **CLAUDE.md** - Main project docs (read first!)
- **SECURITY_HANDOFF.md** - Security audit (A- 89/100)
- **GROWTH_PLAN.md** - SEO strategy & roadmap
- **PROMO_CODE_SETUP.md** - Testing with free checkout
- **VERIFICATION_GUIDE.md** - Testing checklist
- **EMAIL_PROVIDER_MIGRATION.md** - Email issue fix guide
- **THIS FILE** - Claude Desktop context sync

### Frontend Code
- **src/pages/** - All page components
- **src/pages/companies/** - Company landing pages
- **src/pages/companies/CompanyPage.tsx** - Reusable template
- **src/App.tsx** - Routing configuration
- **index.html** - SEO meta tags
- **public/sitemap.xml** - Auto-generated sitemap

### Backend Code
- **supabase/functions/** - All Edge Functions
- **supabase/config.toml** - Function configuration (JWT settings)
- **supabase/migrations/** - Database migrations

### Build & Deploy
- **package.json** - NPM scripts
- **scripts/generate-sitemap.js** - Sitemap generator
- **vercel.json** - Security headers & routing

---

## 💡 Tips for Using This File

**For Claude Desktop Sessions:**
1. Always start by copying the "Quick Context" section
2. Reference specific files when you need details
3. Update this file after major changes

**For ClaudeCode Sessions:**
1. Update "Session Notes" template after each session
2. Keep "Quick Context" section up to date
3. Add new decisions to "Decision Log"

**For User:**
1. This file is your "memory" between AI sessions
2. Update it whenever you make important decisions
3. Use it to onboard new AI sessions quickly

---

**Last Updated:** 10 March 2026
**Next Update:** After email provider issue is resolved
**Maintained By:** User + ClaudeCode + Claude Desktop
