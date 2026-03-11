# 🚨 URGENT BUG - Letter Generation Hanging

**Date Discovered:** 11 March 2026
**Severity:** CRITICAL - Blocks core functionality
**Status:** 🔴 UNDER INVESTIGATION

---

## 🐛 Bug Description

**What's working:**
- ✅ Payment flow completes successfully
- ✅ Promo code (`nSACtg4aX574`) accepted
- ✅ Stripe checkout succeeds
- ✅ User redirected to success page
- ✅ Success page shows "generating your letter" message

**What's broken:**
- ❌ Page hangs with loading circle (infinite spinner)
- ❌ No email arrives in inbox
- ❌ Letter generation appears to never complete

---

## 🔍 Possible Root Causes

### 1. Stripe Webhook Not Being Called
**Likelihood:** HIGH
**Evidence needed:**
- Check Stripe Dashboard → Webhooks → Events
- Verify webhook endpoint is receiving events
- Check for webhook signature verification failures

**How to check:**
```bash
# Check Stripe webhook logs in Supabase
# Dashboard → Edge Functions → stripe-webhook → Logs
```

### 2. CORS Changes Broke Internal API Calls
**Likelihood:** HIGH
**Recent change:** Removed CORS wildcards from generate-complaint and send-email
**Impact:** stripe-webhook (server-to-server) may be blocked

**What we changed (11 March 2026):**
- `generate-complaint/index.ts:3` - Changed `"*"` → `""` (empty string)
- `send-email/index.ts:3` - Changed `"*"` → `""` (empty string)

**Hypothesis:** Empty string CORS may be blocking Supabase internal calls

**Fix required:** Change to Supabase domain instead of empty string

### 3. Generate-Complaint Function Timeout
**Likelihood:** MEDIUM
**Evidence needed:**
- Check generate-complaint function logs
- Look for Anthropic API errors
- Check for timeout errors (default: 60 seconds)

### 4. Send-Email Function Failure
**Likelihood:** MEDIUM
**Evidence needed:**
- Check send-email function logs
- Verify Resend API key is valid
- Check for email delivery errors

### 5. Generic Error Messages Hiding Details
**Likelihood:** LOW (but makes debugging harder)
**Recent change:** Added generic error messages to all functions
**Impact:** Harder to diagnose issues from client-side

---

## 🎯 Investigation Steps (Priority Order)

### Step 1: Check Supabase Logs (HIGHEST PRIORITY)
**Where:** Supabase Dashboard → Edge Functions → Logs

**Check each function:**
1. **stripe-webhook** - Is it being called? Any errors?
2. **generate-complaint** - Any errors? Timeouts?
3. **send-email** - Any errors? Resend API failures?

**Look for:**
- "Webhook error:" messages
- "Generate complaint error:" messages
- "Send email error:" messages
- Any 500/401/403 status codes

### Step 2: Check Stripe Dashboard
**Where:** Stripe Dashboard → Developers → Webhooks

**Verify:**
- Webhook endpoint is active
- Recent events show `checkout.session.completed`
- Webhook attempts succeeded (not 400/401/500 errors)

### Step 3: Test Functions Directly (If webhook is working)
**Use Supabase Dashboard → Edge Functions → Invoke**

Test generate-complaint:
```json
{
  "name": "Test User",
  "company": "British Gas",
  "description": "Test complaint",
  "tone": "firm",
  "market": "uk",
  "outcome": "full_refund"
}
```

Test send-email:
```json
{
  "name": "Test User",
  "email": "your-email@example.com",
  "company": "British Gas",
  "letter": "Test letter content"
}
```

### Step 4: Check CORS Configuration (MOST LIKELY ISSUE)
**Recent change caused this:** Empty string CORS on internal functions

**Current (BROKEN):**
```typescript
// generate-complaint/index.ts:3
"Access-Control-Allow-Origin": "",  // ❌ May block Supabase internal calls
```

**Should be:**
```typescript
// Option A: Allow Supabase internal calls
"Access-Control-Allow-Origin": "https://ygobfieifodvcpvftqxr.supabase.co",

// Option B: No CORS headers at all (server-to-server only)
// Remove corsHeaders entirely from internal functions
```

---

## 🔧 Quick Fix (If CORS is the issue)

### Fix 1: Revert CORS Changes (Fastest)
**Revert to wildcards temporarily to unblock:**
```bash
cd supabase/functions/generate-complaint
# Change line 3: "" → "*"

cd ../send-email
# Change line 3: "" → "*"

supabase functions deploy generate-complaint
supabase functions deploy send-email
```

**Test immediately after deployment.**

### Fix 2: Proper CORS for Internal Functions (Better)
**Change to Supabase domain:**
```typescript
const corsHeaders = {
  "Access-Control-Allow-Origin": "https://ygobfieifodvcpvftqxr.supabase.co",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
```

---

## 📊 Deployment Timeline (Context)

**What changed in the last 2 hours:**

**11 March 2026 20:33 UTC - Security Hardening Deployment**
- ✅ contact-form v9 (XSS prevention, email masking)
- ✅ generate-complaint v11 (CORS wildcard removed ❌)
- ✅ send-email v12 (CORS wildcard removed ❌)
- ✅ stripe-webhook v25 (email masking, generic errors)

**Last working version:**
- generate-complaint v10 (had CORS wildcard "*")
- send-email v11 (had CORS wildcard "*")

**Hypothesis:** v11 (generate) and v12 (send-email) broke due to empty CORS

---

## 🚑 Emergency Rollback (If needed)

**Rollback to previous working versions:**
```bash
# Rollback generate-complaint to v10
supabase functions deploy generate-complaint --legacy-bundle

# Rollback send-email to v11
supabase functions deploy send-email --legacy-bundle
```

**Note:** Supabase may not support version rollback. May need to revert git commits and redeploy.

---

## 📝 Information Needed for Troubleshooting

**Please provide to Claude Desktop:**

1. **Screenshot of Success Page** (showing loading spinner)
2. **Supabase Logs:**
   - stripe-webhook logs (last 10 minutes)
   - generate-complaint logs (last 10 minutes)
   - send-email logs (last 10 minutes)
3. **Stripe Dashboard:**
   - Recent webhook events (last 10 minutes)
   - Event details for checkout.session.completed
4. **Email used for test:** (to check if email arrived)
5. **Time of test:** (to correlate logs)

---

## 🎯 Most Likely Root Cause

**CORS misconfiguration on internal functions** (90% confidence)

**Why:**
- Changed 2 hours ago during security hardening
- Empty string CORS blocks legitimate server-to-server calls
- stripe-webhook calling generate-complaint/send-email via Supabase internal routing

**Expected fix:** Change CORS from `""` to Supabase domain or revert to wildcard temporarily

---

**Next:** Share this file with Claude Desktop along with Supabase logs and screenshots.
