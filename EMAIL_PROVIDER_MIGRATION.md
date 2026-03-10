# Email Provider Migration - Google Policy Abuse

**Issue:** Google has flagged your account for policy abuse
**Current Provider:** Resend API
**Reason:** Sending transactional emails at scale triggers Google's anti-spam filters

---

## 🔍 Why This Happened

Resend is a legitimate email service, but Google may flag accounts when:
- Sending too many emails in a short time
- Emails look automated (which complaint letters are)
- No proper SPF/DKIM/DMARC DNS records set up
- Sending from a shared IP pool that's been flagged

**This is NOT your fault** - it's common with transactional email at scale.

---

## ✅ Recommended Email Providers (Ranked)

### 1. **Resend (KEEP IT, but fix DNS)**
**Cost:** Free tier: 3,000 emails/month, then $20/month
**Why stay:**
- You're already integrated
- Modern API (like Sendgrid but better)
- Good deliverability IF DNS is configured correctly

**ACTION REQUIRED:**
1. Add custom domain email (e.g., noreply@complaintdone.com)
2. Configure SPF, DKIM, DMARC DNS records in your domain registrar
3. Move from shared pool to dedicated IP (if sending >10k/month)

**Resend DNS Setup:**
https://resend.com/docs/dashboard/domains/introduction

---

### 2. **Postmark** (Best Alternative)
**Cost:** $15/month for 10,000 emails
**Pros:**
- Best deliverability (98%+)
- Transactional-email specialist
- No shared IP issues
- Great support

**Cons:**
- Costs more than Resend
- Requires API migration

**Integration time:** 1 hour
**Postmark Docs:** https://postmarkapp.com/developer

---

### 3. **SendGrid** (Enterprise Option)
**Cost:** Free tier: 100 emails/day, then $19.95/month for 50k
**Pros:**
- Industry standard
- Massive scale capability
- Good analytics

**Cons:**
- Slower support
- More complex UI
- Shared IP pool issues on free tier

**Integration time:** 2 hours
**SendGrid Docs:** https://docs.sendgrid.com/

---

### 4. **AWS SES** (Cheapest at Scale)
**Cost:** $0.10 per 1,000 emails (cheapest!)
**Pros:**
- Ultra-low cost
- Unlimited scale
- AWS infrastructure

**Cons:**
- Requires AWS account setup
- Sandbox mode restrictions initially
- More technical to set up
- No pretty UI/dashboard

**Integration time:** 3 hours
**AWS SES Docs:** https://docs.aws.amazon.com/ses/

---

## 🎯 My Recommendation: Fix Resend DNS First

**Why:** You're already integrated. The issue is likely DNS configuration, not Resend itself.

**Steps:**

### 1. Add Custom Domain to Resend

**Go to:** https://resend.com/domains

**Add domain:** complaintdone.com

**They'll give you DNS records to add:**
```
SPF Record:
Type: TXT
Name: @
Value: v=spf1 include:_spf.resend.com ~all

DKIM Record:
Type: TXT
Name: resend._domainkey
Value: [Resend will provide this]

DMARC Record:
Type: TXT
Name: _dmarc
Value: v=DMARC1; p=none; rua=mailto:dmarc@complaintdone.com
```

### 2. Update Your Domain Registrar

**If using Vercel/Namecheap/GoDaddy:**
1. Go to DNS settings
2. Add the 3 TXT records above
3. Wait 24-48 hours for propagation

### 3. Verify in Resend Dashboard

**Go to:** https://resend.com/domains
- Click "Verify"
- Should show green checkmarks for SPF, DKIM, DMARC

### 4. Update send-email Function

**Change FROM address from:**
```typescript
from: "noreply@resend.dev"  // ❌ Using Resend's domain
```

**To:**
```typescript
from: "noreply@complaintdone.com"  // ✅ Your verified domain
```

---

## ⚡ If You Need to Switch Immediately

**Best fast alternative:** Postmark

### Migration Steps (1 hour):

**1. Sign up for Postmark:**
https://account.postmarkapp.com/sign_up

**2. Get API key:**
- Create "Server" in Postmark
- Copy Server API Token

**3. Update Supabase Secrets:**
```bash
# Remove old Resend key
# Add new Postmark key
POSTMARK_API_KEY=your-key-here
```

**4. Update send-email function:**

**Replace:**
```typescript
import { Resend } from "https://esm.sh/resend@2.0.0";
const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

await resend.emails.send({
  from: "noreply@complaintdone.com",
  to: email,
  subject: `Your ${company} Complaint Letter`,
  html: emailHtml,
});
```

**With:**
```typescript
const postmarkKey = Deno.env.get("POSTMARK_API_KEY");

const response = await fetch("https://api.postmarkapp.com/email", {
  method: "POST",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "X-Postmark-Server-Token": postmarkKey,
  },
  body: JSON.stringify({
    From: "noreply@complaintdone.com",
    To: email,
    Subject: `Your ${company} Complaint Letter`,
    HtmlBody: emailHtml,
    MessageStream: "outbound",
  }),
});
```

**5. Deploy:**
```bash
supabase functions deploy send-email
```

---

## 📊 Cost Comparison (10,000 emails/month)

| Provider | Cost/Month | Deliverability | Ease of Use |
|----------|------------|----------------|-------------|
| **Resend (fixed DNS)** | $20 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Postmark** | $15 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **SendGrid** | $19.95 | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| **AWS SES** | $1 | ⭐⭐⭐⭐ | ⭐⭐ |

---

## 🎯 Action Plan

**Option A: Fix Resend (Recommended)**
1. Add complaintdone.com to Resend
2. Configure DNS records (SPF, DKIM, DMARC)
3. Update FROM address to noreply@complaintdone.com
4. Redeploy send-email function
5. Test with promo code

**Option B: Switch to Postmark (If urgent)**
1. Sign up for Postmark
2. Update send-email function (code above)
3. Deploy and test
4. Cancel Resend

**My recommendation:** Option A. Resend is great, you just need proper DNS setup.

---

## 🔍 Current Status Check

**Check your Resend dashboard:**
1. Go to https://resend.com/domains
2. Do you have complaintdone.com added?
3. Are SPF/DKIM/DMARC verified?

**If NO:** Follow Option A above
**If YES but still flagged:** Switch to Postmark (Option B)

---

**Next:** I'll fix all the pricing inconsistencies and create the context-sharing doc.
