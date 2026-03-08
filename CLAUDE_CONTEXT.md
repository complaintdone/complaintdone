# ComplaintDone - Claude Desktop Context

## 🎯 Mission
Build ComplaintDone to $25,000 monthly recurring revenue (MRR) through organic growth and SEO.

**Current Status:** Live product, first revenue confirmed, zero marketing
**Revenue Target:** $25,000 MRR = ~5,700 complaint letters per month
**Current Price:** £3 (UK) / $5 (USA) per letter
**Strategy:** SEO-first organic growth (no paid ads)

---

## 📦 What We've Built (From Scratch)

### Core Product (100% Functional)
- **AI Letter Generation:** Claude Haiku API generates professional complaint letters
- **Payment Processing:** Stripe Checkout integration (£3 UK / $5 USA)
- **Email Delivery:** Resend API sends letters to customer inbox within 60 seconds
- **Market Support:** UK and USA markets with different pricing and legal references

### Tech Stack
- **Frontend:** React 18 + TypeScript + Vite
- **UI:** shadcn/ui components + Tailwind CSS + Framer Motion
- **Backend:** Supabase Edge Functions (Deno runtime)
- **Database:** PostgreSQL (Supabase managed)
- **Payment:** Stripe
- **AI:** Anthropic Claude API (claude-haiku-4-5-20251001)
- **Email:** Resend
- **Deployment:** Vercel (frontend), Supabase (backend)
- **Routing:** React Router v6

### Security Implemented
- ✅ Stripe webhook signature verification (HMAC-SHA256)
- ✅ Rate limiting (5 requests per IP per 60 min for checkout, 3/hour for contact form)
- ✅ Input validation and sanitization
- ✅ Replay attack prevention
- ✅ Database logging of all complaints

### Pages & Features
1. **Homepage (/)** - Hero with UK/USA market toggle, pricing cards, how it works
2. **Complaint Form (/complaint)** - Multi-step form with market/tone/outcome selectors
3. **Success Page (/success)** - Post-payment confirmation
4. **About (/about)** - Company story (authentic, no marketing fluff)
5. **Examples (/examples)** - 6 sample complaint letters (UK/USA mix)
6. **Contact (/contact)** - Contact form with rate limiting
7. **Terms (/terms)** - Terms of service + disclaimer
8. **Privacy (/privacy)** - Privacy policy (GDPR compliant)

### Edge Functions (Supabase)
1. **create-checkout** - Creates Stripe session with rate limiting
2. **generate-complaint** - Generates letter via Claude API
3. **send-email** - Sends letter via Resend
4. **stripe-webhook** - Handles payment webhooks, orchestrates generation + sending
5. **contact-form** - Handles contact form submissions

### SEO Infrastructure (Just Added)
- ✅ Sitemap.xml generation (automated on build)
- ✅ robots.txt with sitemap reference
- ✅ SEO meta tags on all pages (title, description, keywords, OG tags)
- ✅ Schema.org JSON-LD structured data
- ✅ Canonical URLs
- ⏳ Google Search Console (needs setup)
- ⏳ Google Analytics 4 (needs setup)

### Database Tables
- `complaints` - Logs all generated complaints (email, company, created_at, market, tone, outcome)
- `rate_limits` - IP-based rate limiting (ip, created_at)
- Auto-cleanup function for old rate_limits (24 hours)

---

## 💰 Economics (Validated)

**Cost per complaint:** £0.051
- Stripe: £0.03 (1% + 10p)
- Claude API: £0.001
- Resend: £0.00 (free tier: 100/day)
- Supabase: £0.00 (free tier)
- Vercel: £0.00 (free tier)

**Revenue per complaint:** £3 (UK) or $5 (USA)
**Net profit:** ~£2.95 per complaint (98% margin)

**To reach $25k MRR:**
- Need: 5,700 complaints/month = 190/day
- Organic traffic required: ~6,300 visitors/month (3% conversion rate)
- SEO target: Rank for 50+ keywords bringing combined 6k+ monthly visits

---

## 🚀 What Needs to Happen Next

### Phase 1: Analytics & Tracking (PRIORITY - Do First)
**Why:** Can't improve what you don't measure

**Tasks:**
1. **Set up Google Search Console**
   - Add property: complaintdone.com
   - Verify ownership
   - Submit sitemap: https://complaintdone.com/sitemap.xml
   - Monitor: Impressions, clicks, ranking keywords

2. **Set up Google Analytics 4**
   - Create GA4 property
   - Get Measurement ID (G-XXXXXXXXXX)
   - Add to Vercel env vars: `VITE_GA_MEASUREMENT_ID`
   - Integrate analytics.ts helper (already coded in `src/lib/analytics.ts`)
   - Track: Visitors, conversion rate, traffic sources

3. **Create OG Image**
   - Design 1200x630px image in Canva
   - Include: Logo, tagline, pricing
   - Save as `public/og-image.png`
   - Improves social media link previews

**Time:** 2 hours total
**Impact:** Visibility into what's working

---

### Phase 2: Company Landing Pages (HIGH ROI)
**Why:** "British Gas complaint letter" = 720 monthly searches, low competition

**Target companies (by search volume):**
1. British Gas (720/mo)
2. Sky (590/mo)
3. BT (320/mo)
4. Vodafone (280/mo)
5. Virgin Media (240/mo)
6. EDF Energy (180/mo)
7. O2 (210/mo)
8. Three (160/mo)
9. Amazon (1,200/mo - but competitive)
10. Royal Mail (450/mo)

**Template ready:** See `GROWTH_PLAN.md` for `CompanyTemplate.tsx` code

**Each page needs:**
- Company name + industry
- 5 common complaint issues
- 3-step escalation path
- Legal references (Consumer Rights Act 2015, Ofgem, etc.)
- SEO-optimized content
- CTA to complaint form with pre-selected market

**Time per page:** 2-3 hours (research + implementation)
**Impact per page:** 50-100 visitors/month after 2-3 months
**Goal:** Create 15 company pages

---

### Phase 3: Blog Content (SEO Foundation)
**Why:** Blog posts rank for long-tail keywords, bring organic traffic

**Priority blog topics (by search volume):**
1. "How to write a complaint letter" (1,300/mo)
2. "Consumer Rights Act 2015" (880/mo)
3. "British Gas complaint letter" (720/mo)
4. "Formal complaint letter template UK" (650/mo)
5. "Sky complaint letter" (590/mo)
6. "How to complain to British Gas" (480/mo)
7. "Complaint letter template UK" (410/mo)
8. "BT complaint letter" (320/mo)
9. "Energy ombudsman complaint" (210/mo)
10. "Complaint letter threatening legal action" (220/mo)

**Blog post structure:**
- 1,500-2,000 words
- H1: Main keyword
- H2s: Related questions from "People Also Ask"
- Include: Legal references, templates, escalation paths
- CTA: "Generate your letter in 60 seconds"
- Internal links: To relevant company pages

**Time per post:** 4-6 hours (research + write + optimize)
**Impact per post:** 20-50 visitors/month after ranking (2-3 months)
**Goal:** Publish 30 blog posts

---

### Phase 4: Email List Building
**Why:** Email = owned audience, not dependent on Google

**Newsletter popup component:** Code ready in `GROWTH_PLAN.md` (NewsletterPopup.tsx)

**Implementation:**
1. Sign up for ConvertKit (free: 10k subscribers)
2. Create form, get API key + Form ID
3. Add to env vars
4. Integrate popup component
5. Trigger: After 30 seconds OR 50% scroll

**Email sequence:**
- Welcome: "Your free consumer rights guide"
- Day 3: "How to write a complaint letter that works"
- Day 7: "Top 5 consumer rights you didn't know you had"
- Weekly: Case studies, tips, updates

**Target:** 2,000 subscribers
**Conversion:** 5-10% of subscribers will purchase eventually

---

### Phase 5: Distribution (Manual, Not Automated)
**Why:** Get initial traction, test messaging, build authority

**Channels (ranked by ROI):**

1. **Product Hunt Launch**
   - Prepare: Screenshots, demo video, tagline
   - Launch on Tuesday-Thursday
   - Goal: Top 5 Product of the Day
   - Expected: 500-1,000 visitors on launch day

2. **Reddit (Manual Only)**
   - Communities: r/UKPersonalFinance, r/LegalAdviceUK, r/AskUK
   - Strategy: Be genuinely helpful, max 1 link per week
   - Build karma first (50+ before posting links)
   - Example: "I got £200 refund from British Gas - here's what I did"

3. **Quora**
   - Answer 50 questions about complaint letters, consumer rights, refunds
   - Provide 300+ word helpful answers
   - Link only when genuinely relevant
   - Goal: 10k+ answer views

4. **Guest Posting**
   - Target: MoneySavingExpert, Which?, consumer rights blogs
   - Pitch 3 topics each, personalized emails
   - Write: 1,500-2,000 word guides
   - Goal: 3 guest posts published

5. **PR Campaign**
   - Create: "State of UK Consumer Complaints 2026" report
   - Survey 500+ people (SurveyMonkey free tier)
   - Design infographic (Canva)
   - Pitch: Guardian, BBC, MoneySavingExpert
   - Goal: 1-2 media mentions

**⚠️ CRITICAL:** Do NOT automate social media posting - manual engagement only

---

### Phase 6: Conversion Optimization
**Why:** Double conversion rate = double revenue with same traffic

**A/B Testing (Google Optimize - free):**
- Test headline variations on homepage
- Test CTA button text ("Generate Now" vs "Start My Complaint")
- Test pricing page layout
- Test form length (remove optional fields?)

**Trust Elements:**
- Add Stripe badge ("Powered by Stripe")
- Add testimonials (ask customers for permission)
- Add "As seen on" logos (after PR success)
- Add FAQ section on homepage

**Goal:** Improve conversion rate from 3% to 5%+

---

### Phase 7: Referral Program (Viral Growth)
**Why:** Network effects, word-of-mouth growth

**Database schema ready:** See `GROWTH_PLAN.md` for migration SQL

**Mechanics:**
- Referrer: Gets £1.50 credit per successful referral
- Referred: Gets £1.50 off first purchase
- Track via: Unique referral codes (REF + random 6 chars)

**Implementation:**
1. Run migration (referral tables)
2. Create referral page (code ready in GROWTH_PLAN.md)
3. Add "Refer Friends" to footer
4. Add referral CTA to success page
5. Email announcement to newsletter

**Expected:** 10-15% of revenue from referrals

---

## 📊 Key Metrics to Track

### Weekly
- Google Analytics: Total visitors, conversion rate
- Google Search Console: Impressions, clicks, avg position
- Stripe: Total revenue, transaction count
- ConvertKit: Email subscribers, open rate

### Monthly
- Organic traffic growth
- Number of ranking keywords (position 1-10, 11-20, 21-50)
- Total backlinks (Ahrefs Webmaster Tools - free)
- MRR (Monthly Recurring Revenue)
- Customer Acquisition Cost (CAC)

### Goals (Milestones)
- **First 1,000 visitors/month:** Validate SEO strategy is working
- **First 20 ranking keywords:** Content quality confirmed
- **First 100 customers:** Product-market fit validated
- **First $1,000 MRR:** Proof of concept
- **First $5,000 MRR:** Time to scale (hire content writer)
- **$25,000 MRR:** Mission accomplished

---

## 🎯 Revenue Projections

### Conservative Path (SEO Only)
- **Month 3:** 500 visitors → 15 customers → $66 MRR
- **Month 6:** 2,000 visitors → 60 customers → $264 MRR
- **Month 12:** 10,000 visitors → 300 customers → $1,320 MRR
- **Month 24:** 50,000 visitors → 1,500 customers → $6,600 MRR
- **Month 36:** 200,000 visitors → 6,000 customers → $26,400 MRR

### Aggressive Path (SEO + PR + Referrals)
- **Month 6:** 5,000 visitors → 150 customers → $660 MRR
- **Month 12:** 25,000 visitors → 750 customers → $3,300 MRR
- **Month 18:** 100,000 visitors → 3,000 customers → $13,200 MRR
- **Month 24:** 200,000 visitors → 6,000 customers → $26,400 MRR

**Assumptions:**
- 3% conversion rate (industry standard for SaaS)
- 50/50 UK/USA split (average $4.40 per transaction)
- SEO compounds exponentially (not linear)
- Referral program adds 10-15% boost

---

## ⚠️ Critical Constraints

### Do NOT Do These
1. **Automate social media posting** - Platforms ban bots, zero ROI
2. **Buy backlinks** - Google penalties, waste of money
3. **Spam Reddit/forums** - Instant ban, brand damage
4. **Over-optimize for keywords** - Google detects and penalizes
5. **Use AI content without human review** - Quality issues, factual errors
6. **Expect fast results** - SEO takes 6-12 months minimum

### Do These Instead
1. **Manual engagement** - Quality over quantity
2. **Earn backlinks** - Great content + personal outreach
3. **Be genuinely helpful** - 90% value, 10% promotion
4. **Write for humans** - Keywords appear naturally
5. **AI + human** - Draft with AI, refine with expertise
6. **Be patient** - Track weekly progress, optimize monthly

---

## 🛠️ Tools & Costs

| Tool | Purpose | Cost | When to Upgrade |
|------|---------|------|-----------------|
| Google Analytics | Traffic tracking | Free | Never |
| Google Search Console | SEO monitoring | Free | Never |
| ConvertKit | Email newsletter | Free (10k subs) | At 10k subscribers |
| Canva | Design | Free | Optional: £10/mo for pro |
| Ahrefs Webmaster | Backlinks | Free (1 site) | At $5k MRR for competitor analysis |
| Anthropic Claude | Blog drafts | ~£2/mo | As needed |
| **Total** | | **£2/mo** | Scale as revenue grows |

---

## 📁 Important Files

### Strategy & Planning
- `CLAUDE_CONTEXT.md` - This file (project overview)
- `GROWTH_PLAN.md` - Complete 12-month strategy (5,000+ words)
- `IMPLEMENTATION_CHECKLIST.md` - Detailed task list (3,500+ words)
- `WHAT_CHANGED.md` - Recent changes + immediate next steps
- `CLAUDE.md` - Development environment & tech stack
- `SECURITY_HANDOFF.md` - Security audit (now resolved)

### Code & Infrastructure
- `src/components/SEO.tsx` - SEO meta tags component (✅ integrated)
- `src/lib/analytics.ts` - Google Analytics helper (⏳ needs GA ID)
- `scripts/generate-sitemap.js` - Sitemap generator (✅ working)
- `public/sitemap.xml` - Auto-generated sitemap (32 URLs)
- `public/robots.txt` - Search engine directives (✅ done)

### Templates (Ready to Use)
- Company landing page: See GROWTH_PLAN.md → CompanyTemplate.tsx
- Newsletter popup: See GROWTH_PLAN.md → NewsletterPopup.tsx
- Referral program: See GROWTH_PLAN.md → Referral.tsx + SQL migration

---

## 🎓 What Claude Should Know

### Project Philosophy
1. **Quality over quantity** - One great blog post > 10 mediocre ones
2. **SEO-first** - Organic growth, no paid ads initially
3. **Patient execution** - Results in 6-12 months, not weeks
4. **Data-driven** - Track everything, optimize based on metrics
5. **Ethical growth** - No black hat SEO, no spam, no shortcuts

### When Making Decisions
- **Prioritize:** SEO content (company pages, blog posts) > everything else
- **Avoid:** Complexity, paid tools, automation that risks bans
- **Validate:** Check Search Console for keyword data before creating content
- **Optimize:** For conversion rate (3% → 5%+) once traffic exists

### Coding Standards
- Keep existing architecture (React + Supabase + Stripe)
- Follow patterns in existing code (SEO component, Edge Functions)
- Test builds before committing
- Write clear commit messages
- Update CLAUDE.md when adding new features

### Content Standards
- AI drafts are acceptable for speed
- Human review is mandatory for accuracy
- Fact-check all legal references
- Include real examples and templates
- Optimize for keywords naturally (no stuffing)
- Internal links to relevant pages

---

## 🚨 Current Blockers

### Immediate
1. **Google Search Console not set up** → No visibility into search performance
2. **Google Analytics not set up** → Can't track visitors or conversion rate
3. **No company landing pages** → Missing 5k+ monthly search volume
4. **No blog content** → Missing 10k+ monthly search volume
5. **No email list** → No owned audience

### Near-Term
6. **No PR/backlinks** → Low domain authority
7. **No referral program** → Missing viral growth
8. **No A/B testing** → Don't know what converts best

**Priority order:** 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8

---

## 💬 Working with Claude

### What to Ask For
✅ "Create British Gas company landing page"
✅ "Write blog post about Consumer Rights Act 2015"
✅ "Optimize homepage conversion rate"
✅ "Set up Google Analytics integration"
✅ "Review SEO performance and suggest improvements"

### What NOT to Ask For
❌ "Automate posting to Twitter" (ban risk)
❌ "Generate 100 blog posts" (quality issues)
❌ "Find shortcuts to rank faster" (no shortcuts exist)
❌ "Buy traffic/backlinks" (waste of money)

### Helpful Context to Provide
- "I have X hours this week, what's highest priority?"
- "Traffic is at X visitors/month, conversion is Y%, what should I optimize?"
- "Keyword X ranks at position Y, how do I improve it?"
- "I got Z signups this month, is that on track?"

---

## 📈 Success Criteria

### You'll know it's working when:
1. Google Search Console shows impressions increasing weekly
2. 5+ keywords rank in top 20 positions
3. Traffic grows month-over-month (even if slow)
4. Conversion rate is 3%+ (visitors → customers)
5. Email list grows organically (not bought)

### You'll know you need to pivot when:
1. After 6 months: Less than 1,000 visitors/month
2. After 6 months: No keywords in top 20
3. After 6 months: Conversion rate below 2%
4. After 12 months: MRR below $1,000

### Pivot options:
- Niche down (energy complaints only)
- B2B focus (sell to law firms)
- Premium tier (add lawyer review for £50)
- White label (license to consumer orgs)

---

## 🎯 Next Session Priorities

When starting a new Claude session, ask:

1. **"What's the current status?"**
   - Check Google Analytics (if set up)
   - Check Google Search Console (if set up)
   - Review recent deployments

2. **"What should I work on next?"**
   - Refer to this document's "Phase 1, 2, 3..." sections
   - Prioritize based on current blockers
   - Focus on highest ROI tasks first

3. **"How can I verify it's working?"**
   - Every change should be measurable
   - Define success criteria before building
   - Track metrics weekly

---

## 🏆 Definition of Success

**Primary goal:** $25,000 MRR

**Milestone 1:** $1,000 MRR (proof of concept)
**Milestone 2:** $5,000 MRR (time to hire help)
**Milestone 3:** $10,000 MRR (quit day job territory)
**Milestone 4:** $25,000 MRR (mission accomplished)

**Timeline:** Realistic = 18-36 months of consistent SEO work

**Effort required:**
- Months 1-6: 15 hours/week (heavy content creation)
- Months 7-12: 10 hours/week (optimization + new content)
- Months 13-24: 10 hours/week (scale what works)

**Alternative:** Hire content writer at $5k MRR to scale faster

---

**Last Updated:** March 8, 2026
**Current MRR:** ~$150 (estimated from first customers)
**Current Traffic:** ~0 organic visitors (just launched SEO)
**Current Status:** Product complete, SEO infrastructure ready, need to execute content strategy

---

**Remember:** ComplaintDone is a marathon, not a sprint. SEO compounds exponentially but takes 6-12 months to show results. Focus on consistent execution, track metrics weekly, and don't give up in the "trough of sorrow" (months 2-5 when traffic is still low).
