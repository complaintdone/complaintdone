# Growth Automation Scripts

This directory contains automation scripts for ComplaintDone's growth strategy.

## Available Scripts

### 1. `generate-sitemap.js`
**Purpose:** Generate sitemap.xml for SEO

**Usage:**
```bash
node scripts/generate-sitemap.js
```

**When to run:**
- Before every production deploy (automated via `prebuild`)
- When adding new company pages
- When adding new static pages

**Output:** `public/sitemap.xml`

---

### 2. `blog-post-generator.js` (To be created)
**Purpose:** Generate blog post drafts using Claude API

**⚠️ IMPORTANT:** These are DRAFTS ONLY. You MUST:
1. Manually review every post
2. Fact-check all legal references
3. Add human expertise and examples
4. Check for plagiarism

**Usage:**
```bash
# Set API key
export ANTHROPIC_API_KEY=sk-ant-xxx

# Generate all blog posts
node scripts/blog-post-generator.js
```

**Cost:** ~£0.10 per blog post (Claude Sonnet)

**Output:** `blog/*.md` (Markdown files)

---

### 3. `backlink-finder.js` (To be created)
**Purpose:** Find relevant blogs/forums for backlink outreach

**Usage:**
```bash
# Set API key (100 free searches/month)
export SERPAPI_KEY=xxx

# Find opportunities
node scripts/backlink-finder.js
```

**Output:** `backlink-opportunities.json`

**Next steps:**
1. Manually review each site
2. Find contact emails (use Hunter.io free tier: 25/month)
3. Send personalized outreach (NOT automated)

---

### 4. `analytics-report.js` (To be created)
**Purpose:** Weekly analytics summary

**Usage:**
```bash
# Set up Google Analytics credentials
export GA_PROPERTY_ID=xxx
export GA_CLIENT_EMAIL=xxx
export GA_PRIVATE_KEY=xxx

# Generate weekly report
node scripts/analytics-report.js
```

**Output:** Console output + optional email

**Data includes:**
- Weekly visitors
- Top pages
- Conversion rate
- Traffic sources

---

## Automation Schedule

### Daily (Automated via Vercel cron)
- None currently (keep it simple)

### Weekly (Manual, 30 min)
- Review Google Analytics
- Check Search Console for new rankings
- Monitor backlink opportunities

### Monthly (Manual, 2 hours)
- Run analytics report
- Review content performance
- Plan next month's content

---

## Environment Variables Required

### For sitemap generation
- None (uses hardcoded BASE_URL)

### For blog generation
```bash
ANTHROPIC_API_KEY=sk-ant-xxx
```

### For backlink finder
```bash
SERPAPI_KEY=xxx
```

### For analytics
```bash
GA_PROPERTY_ID=xxx
GA_CLIENT_EMAIL=xxx
GA_PRIVATE_KEY=xxx
```

---

## Cost Breakdown (Monthly)

| Service | Free Tier | Usage | Cost |
|---------|-----------|-------|------|
| Claude API | N/A | 20 blog posts/month | £2 |
| SerpAPI | 100 searches | 5 searches/month | £0 |
| Google Analytics | Unlimited | All traffic | £0 |
| **Total** | | | **£2/month** |

---

## Safety & Ethics

### ✅ DO:
- Use AI for drafts, human for final review
- Respect rate limits on all APIs
- Manual review of all backlink targets
- Genuine, helpful engagement on forums/social

### ❌ DON'T:
- Auto-post to social media (ban risk)
- Spam forums with links (ban risk)
- Buy backlinks (Google penalty)
- Copy content without attribution
- Ignore privacy laws (GDPR)

---

## Troubleshooting

### "Module not found" error
```bash
# Make sure you're in project root
cd /path/to/complaintdone

# Install dependencies
npm install
```

### "Permission denied" error
```bash
# Make script executable
chmod +x scripts/generate-sitemap.js
```

### API rate limit errors
- SerpAPI: Max 100/month free, wait until next month
- Claude API: No free tier, check billing
- Google Analytics: No limits

---

## Future Automation Ideas

### Low priority (don't build yet)
- Auto-tweet new blog posts (risky, manual better)
- Auto-email newsletter (ConvertKit has this built-in)
- Auto-respond to comments (feels spammy)
- Auto-translate for EU markets (quality issues)

### High priority (build in Month 6+)
- Weekly SEO rank tracker
- Automated broken link checker
- Content performance dashboard
- A/B test result aggregator

---

Last updated: March 2026
