# Growth Strategy Implementation Checklist

## ✅ Week 1: Technical SEO Foundation

### Day 1: Sitemap & Robots.txt
- [x] robots.txt updated with sitemap reference
- [ ] Generate sitemap: `npm run generate:sitemap`
- [ ] Add to package.json: `"generate:sitemap": "node scripts/generate-sitemap.js"`
- [ ] Add to prebuild: `"prebuild": "npm run generate:sitemap"`
- [ ] Test sitemap: Visit https://complaintdone.com/sitemap.xml after deploy

### Day 2: Analytics Setup
- [ ] Create Google Analytics 4 property at https://analytics.google.com
- [ ] Copy GA4 Measurement ID (format: G-XXXXXXXXXX)
- [ ] Add to .env.local: `VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX`
- [ ] Add to Vercel env vars (Settings → Environment Variables)
- [ ] Install dependency: `npm install react-helmet-async`
- [ ] Deploy and test GA is tracking (Real-time view)

### Day 3: Google Search Console
- [ ] Visit https://search.google.com/search-console
- [ ] Add property: https://complaintdone.com
- [ ] Verify ownership (DNS or HTML file method)
- [ ] Submit sitemap: https://complaintdone.com/sitemap.xml
- [ ] Wait 24-48 hours for indexing to start

### Day 4: SEO Component Integration
- [ ] Update App.tsx with HelmetProvider (see GROWTH_PLAN.md)
- [ ] Add <SEO> component to Index.tsx
- [ ] Add <SEO> component to Complaint.tsx
- [ ] Add <SEO> component to About.tsx
- [ ] Add <SEO> component to Examples.tsx
- [ ] Add <SEO> component to Contact.tsx
- [ ] Test: View page source, check meta tags are present

### Day 5: OG Image Creation
- [ ] Create 1200x630px OG image with Canva (free)
- [ ] Design: ComplaintDone logo + tagline + £3/£5 pricing
- [ ] Save as public/og-image.png
- [ ] Test: Share link on Twitter/Facebook, verify image shows

---

## ✅ Week 2: Company Landing Pages (Phase 1)

### Priority Companies (Highest Search Volume)
- [ ] British Gas (`/companies/british-gas`)
- [ ] Sky (`/companies/sky`)
- [ ] BT (`/companies/bt`)
- [ ] Vodafone (`/companies/vodafone`)
- [ ] Virgin Media (`/companies/virgin-media`)

### Implementation Steps
1. [ ] Create `src/pages/companies/CompanyTemplate.tsx` (see GROWTH_PLAN.md)
2. [ ] Add COMPANY_DATA for all 5 companies
3. [ ] Add route to App.tsx: `<Route path="/companies/:slug" element={<CompanyPage />} />`
4. [ ] Test each page locally
5. [ ] Deploy and verify indexing in Search Console

### Content Checklist (Per Company)
- [ ] Company name + industry
- [ ] 5 common complaints (research on Trustpilot)
- [ ] 3-step escalation path (research on company website)
- [ ] Legal references (Consumer Rights Act 2015, etc.)
- [ ] Average complaint resolution time (estimate from ombudsman data)

---

## ✅ Week 3-4: Email Newsletter Setup

### ConvertKit Setup
- [ ] Sign up at https://convertkit.com (free up to 10k subscribers)
- [ ] Create "Consumer Rights Tips" newsletter
- [ ] Create signup form (simple: name + email)
- [ ] Copy Form ID and API key
- [ ] Add to .env.local: `VITE_CONVERTKIT_API_KEY=xxx` and `VITE_CONVERTKIT_FORM_ID=xxx`
- [ ] Add to Vercel env vars

### Newsletter Component
- [ ] Create `src/components/NewsletterPopup.tsx` (see GROWTH_PLAN.md)
- [ ] Add to App.tsx
- [ ] Test: Wait 30 seconds or scroll 50% → popup should appear
- [ ] Test submission works (check ConvertKit dashboard)

### First Email Sequence
- [ ] Welcome email (immediate): "Your free consumer rights guide"
- [ ] Email 2 (day 3): "How to write a complaint letter that works"
- [ ] Email 3 (day 7): "Top 5 consumer rights you didn't know you had"
- [ ] Weekly newsletter (Fridays): Case studies + tips

---

## ✅ Month 2: Content Creation (10 Blog Posts)

### Blog System Setup
- [ ] Create `src/pages/Blog.tsx` (blog index page)
- [ ] Create `src/pages/blog/[slug].tsx` (blog post template)
- [ ] Add routes to App.tsx
- [ ] Create `public/blog/` directory for markdown files

### Blog Posts to Write (AI Draft + Human Edit)
1. [ ] "How to Complain to British Gas (2026 Template)"
   - Target keyword: "british gas complaint letter"
   - Search volume: 720/month
   - Include: Template, legal refs, escalation path

2. [ ] "Consumer Rights Act 2015: Complete Refund Guide"
   - Target keyword: "consumer rights act 2015"
   - Search volume: 880/month
   - Include: 30-day window, repair/replace/refund

3. [ ] "How to Write a Complaint Letter That Gets Results"
   - Target keyword: "how to write a complaint letter"
   - Search volume: 1,300/month
   - Include: Structure, tone, legal refs

4. [ ] "UK Energy Company Complaints: Your Legal Rights"
   - Target keyword: "energy complaint rights UK"
   - Search volume: 320/month
   - Include: Ofgem, ombudsman

5. [ ] "How to Escalate to the Ombudsman (Step-by-Step)"
   - Target keyword: "how to escalate complaint ombudsman"
   - Search volume: 210/month
   - Include: Timelines, forms, examples

6. [ ] "Getting Refunds from Sky: What You Need to Know"
   - Target keyword: "sky refund complaint"
   - Search volume: 290/month
   - Include: Contract terms, ADR

7. [ ] "Billing Dispute? Your Rights Under UK Law"
   - Target keyword: "billing dispute rights"
   - Search volume: 180/month
   - Include: Direct debit guarantees

8. [ ] "How Long Should a Company Take to Resolve Complaints?"
   - Target keyword: "complaint resolution time UK"
   - Search volume: 150/month
   - Include: Legal timelines by industry

9. [ ] "Template: Formal Complaint Letter (Free Download)"
   - Target keyword: "formal complaint letter template UK"
   - Search volume: 650/month
   - Include: PDF download (lead magnet)

10. [ ] "When to Threaten Legal Action in a Complaint Letter"
    - Target keyword: "complaint letter threatening legal action"
    - Search volume: 220/month
    - Include: When appropriate, how to phrase

### Blog Writing Process (Per Post)
1. [ ] Generate AI draft with Claude (use scripts/blog-generator.js)
2. [ ] Human review: Fact-check legal references
3. [ ] Add examples and templates
4. [ ] Optimize for target keyword (naturally, no stuffing)
5. [ ] Add internal links to complaint form + company pages
6. [ ] Add CTA at bottom: "Generate your complaint letter now"
7. [ ] Create OG image for post (Canva)
8. [ ] Publish and submit to Search Console

---

## ✅ Month 3: Distribution & Backlinks

### Product Hunt Launch
- [ ] Prepare assets:
  - [ ] 3 screenshots (hero, form, example letter)
  - [ ] 60-second demo video (Loom screen recording)
  - [ ] Tagline: "AI-powered complaint letters in 60 seconds"
  - [ ] Description (200 words)
- [ ] Schedule launch for Tuesday-Thursday (best days)
- [ ] Rally support: Email list, social media, friends
- [ ] Monitor comments and respond promptly
- [ ] Goal: Top 5 Product of the Day

### Reddit Strategy (Manual, Not Automated)
- [ ] Join communities:
  - [ ] r/UKPersonalFinance (474k members)
  - [ ] r/LegalAdviceUK (288k members)
  - [ ] r/AskUK (768k members)
- [ ] Build karma first: Comment helpful answers (no links)
- [ ] After 50+ karma, post genuinely helpful content
- [ ] Max 1 link per week per subreddit
- [ ] Example posts:
  - "I got a £200 refund from British Gas - here's what I did"
  - "PSA: Your rights under Consumer Rights Act 2015"

### Quora Strategy
- [ ] Create professional profile
- [ ] Answer 50 questions related to:
  - Complaint letters
  - Consumer rights
  - Refunds
  - UK law
- [ ] Provide genuinely helpful answers (300+ words)
- [ ] Link to ComplaintDone only when relevant
- [ ] Goal: 10,000+ answer views

### Guest Posting Outreach
- [ ] Create list of 20 target blogs (money-saving, consumer rights)
- [ ] Find contact emails (Hunter.io free tier: 25/month)
- [ ] Send personalized pitches (NOT mass email)
- [ ] Pitch ideas:
  - "10 Consumer Rights Mistakes That Cost You Money"
  - "How to Get a Refund When Companies Say No"
  - "The Ultimate Guide to UK Ombudsman Services"
- [ ] Goal: 3 guest posts published

---

## ✅ Month 4-6: SEO Traction

### Add 10 More Company Pages
- [ ] Amazon
- [ ] Royal Mail
- [ ] Currys
- [ ] Evri
- [ ] DPD
- [ ] O2
- [ ] Three
- [ ] TalkTalk
- [ ] Octopus Energy
- [ ] E.ON

### Internal Linking Audit
- [ ] Link blog posts to relevant company pages
- [ ] Link company pages to each other (same industry)
- [ ] Link homepage to top-performing pages
- [ ] Add "Related Articles" section to blog posts

### Content Updates
- [ ] Check Search Console for ranking keywords
- [ ] Update old posts with new data
- [ ] Add more internal links
- [ ] Expand thin content

### Keyword Tracking
- [ ] Set up Google Search Console filters
- [ ] Track top 20 keywords weekly
- [ ] Identify quick wins (position 11-20)
- [ ] Create new content for rising topics

---

## ✅ Month 7-9: Amplification

### Referral Program Launch
- [ ] Run migration: `supabase db push --linked` (referral tables)
- [ ] Create referral page (see GROWTH_PLAN.md)
- [ ] Add "Refer Friends" link to footer
- [ ] Add referral CTA to success page
- [ ] Send email announcement to newsletter
- [ ] Track referrals in dashboard

### PR Campaign
- [ ] Create "State of UK Consumer Complaints 2026" report
  - [ ] Survey 500+ people (SurveyMonkey free tier)
  - [ ] Analyze data (Google Sheets)
  - [ ] Design infographic (Canva)
  - [ ] Write press release
- [ ] Pitch to:
  - [ ] MoneySavingExpert
  - [ ] Which? Magazine
  - [ ] Guardian Money section
  - [ ] BBC consumer affairs
- [ ] Goal: 1-2 media mentions

### YouTube Videos
- [ ] Create channel: "ComplaintDone - Consumer Rights"
- [ ] Record 5 videos:
  1. "How to Use ComplaintDone (Screen Recording)"
  2. "British Gas Complaint Letter - Live Demo"
  3. "Your Consumer Rights Explained (2026)"
  4. "How to Escalate Complaints to Ombudsman"
  5. "Top 5 Complaint Letter Mistakes"
- [ ] Upload with SEO-optimized titles and descriptions
- [ ] Link to website in description

---

## ✅ Month 10-12: Optimization

### A/B Testing
- [ ] Set up Google Optimize (free)
- [ ] Test headline variations on homepage
- [ ] Test CTA button text ("Generate Now" vs "Start My Complaint")
- [ ] Test pricing page layout
- [ ] Goal: 5%+ conversion rate

### Conversion Rate Optimization
- [ ] Add trust badges (Stripe, secure payment)
- [ ] Add testimonials (ask customers for permission)
- [ ] Add "As seen on" logos (if PR successful)
- [ ] Reduce form friction (fewer required fields?)

### End-of-Year Campaign
- [ ] "2027 Consumer Rights Forecast" blog post
- [ ] Email to newsletter: Year-in-review
- [ ] Social media push
- [ ] Reddit AMA: "I help people get refunds - AMA"

---

## 📊 Monthly Tracking (Review 1st of Each Month)

### Google Analytics
- [ ] Total visitors
- [ ] Traffic sources (organic, direct, referral, social)
- [ ] Top landing pages
- [ ] Conversion rate
- [ ] Average session duration

### Google Search Console
- [ ] Total impressions
- [ ] Total clicks
- [ ] Average position
- [ ] Top keywords
- [ ] New keywords entering top 20

### Business Metrics
- [ ] Total complaints generated
- [ ] Revenue (£3 × UK + £5 × USA)
- [ ] Newsletter subscribers
- [ ] Referral conversions

### Competitive Analysis
- [ ] Check competitor rankings (ahrefs.com/webmaster-tools - free)
- [ ] Identify new keywords they're ranking for
- [ ] Analyze their content strategy
- [ ] Look for backlink opportunities

---

## 🚨 Red Flags (When to Pivot)

If by Month 6 you see:
- ❌ Less than 1,000 monthly visitors → SEO strategy not working
- ❌ No keywords in top 20 → Content quality issue or keyword targeting wrong
- ❌ Conversion rate below 2% → UX/trust issue
- ❌ Newsletter unsubscribe rate above 5% → Content not valuable

**Action:** Book 2-hour strategy session to reassess.

---

## 💡 Pro Tips

### SEO
- Google takes 6-12 months to rank new domains - be patient
- Long-tail keywords (4+ words) rank faster
- Update old content regularly (Google loves fresh content)
- Internal linking is underrated - use it

### Content
- Write for humans first, SEO second
- Use tools, but always human-review
- Templates and downloadable resources rank well
- Answer "People Also Ask" questions in content

### Distribution
- Don't spam - it backfires
- One quality backlink > 100 low-quality ones
- Reddit hates self-promotion - be genuinely helpful
- Email list is your most valuable asset

### Metrics
- Vanity metrics (pageviews) don't matter
- Focus on: Conversion rate, revenue, email subscribers
- Track everything from day 1
- A/B test methodically (one change at a time)

---

Generated: March 2026
Last Updated: March 2026
