# How to Check Supabase Logs

**When:** Use this when investigating bugs, errors, or unexpected behavior

---

## 📊 Accessing Logs in Supabase Dashboard

**URL:** https://supabase.com/dashboard/project/ygobfieifodvcpvftqxr/functions

**Navigation:**
1. Go to Supabase Dashboard
2. Select project: `ygobfieifodvcpvftqxr`
3. Click "Edge Functions" in left sidebar
4. Click on function name to view logs

---

## 🔍 Which Function to Check

### Letter Generation Flow (Most Common)

**Order of execution:**
1. **stripe-webhook** - Receives Stripe payment confirmation
2. **generate-complaint** - Creates letter via Claude API
3. **send-email** - Sends letter to user via Resend

**Check all 3 in order when debugging "letter not received" issues.**

### Contact Form Submissions

**Function:** contact-form
**Use case:** Someone submitted contact form but no email received

---

## 🎯 What to Look For in Logs

### Success Patterns

**stripe-webhook successful flow:**
```
Verified Stripe event: checkout.session.completed
Processing complaint: BritishGas for jo***@example.com
Letter generated successfully
Email sent successfully to jo***@example.com
Complaint logged to database
```

**generate-complaint successful:**
```
(No error messages = success)
Returns: { letter: "..." }
```

**send-email successful:**
```
(No error messages = success)
Returns: { success: true, id: "..." }
```

### Error Patterns

**CORS errors (current bug):**
```
fetch failed
TypeError: Failed to fetch
CORS policy: No 'Access-Control-Allow-Origin' header
```

**Authentication errors:**
```
Invalid signature
Unauthorized
401 status
```

**API errors:**
```
Anthropic API error
Resend API error
An error occurred while generating your complaint letter
An error occurred while sending your complaint letter
```

**Timeout errors:**
```
Function timed out
Request timeout
```

---

## 📝 How to Share Logs with Claude Desktop

### Option 1: Copy-Paste Text
1. Click on function in dashboard
2. Select "Logs" tab
3. Copy last 20-30 lines
4. Paste into Claude Desktop

### Option 2: Screenshot
1. Take screenshot of logs panel
2. Share with Claude Desktop
3. Claude can read text from images

### Option 3: Filter by Time
**Dashboard has time filter:**
- Last 5 minutes
- Last 15 minutes
- Last hour
- Custom time range

**Use this to isolate specific test runs.**

---

## 🚨 Current Bug Investigation (11 March 2026)

**Bug:** Letter generation hangs, no email received

**What to check:**

### 1. stripe-webhook logs
**Look for:**
- ✅ "Verified Stripe event: checkout.session.completed"
- ❌ "generate-complaint failed:" (error message)
- ❌ "send-email failed:" (error message)
- ❌ CORS errors or fetch failures

### 2. generate-complaint logs
**Look for:**
- ❌ "Generate complaint error:" (error message)
- ❌ CORS policy errors
- ❌ Anthropic API errors
- ❌ Timeout errors

### 3. send-email logs
**Look for:**
- ❌ "Send email error:" (error message)
- ❌ CORS policy errors
- ❌ Resend API errors

---

## 🔧 Common Issues and Solutions

### Issue: "CORS policy: No 'Access-Control-Allow-Origin' header"
**Cause:** Function CORS misconfigured
**Solution:** Fix CORS headers in function code, redeploy

### Issue: "Invalid signature"
**Cause:** Stripe webhook secret mismatch
**Solution:** Verify STRIPE_WEBHOOK_SECRET env var matches Stripe dashboard

### Issue: "Anthropic API error: 401"
**Cause:** Invalid or expired ANTHROPIC_API_KEY
**Solution:** Verify API key in Supabase secrets

### Issue: "Resend API error"
**Cause:** Invalid RESEND_API_KEY or rate limit
**Solution:** Check Resend dashboard for account status

### Issue: No logs at all
**Cause:** Function not being called
**Solution:** Check Stripe webhook configuration

---

## 💡 Pro Tips

1. **Timestamp correlation:** Note exact time of test, filter logs to that time
2. **Multiple windows:** Open all 3 function logs in separate browser tabs
3. **Refresh often:** Logs may take 5-10 seconds to appear
4. **Error codes:** 401 = auth, 403 = forbidden, 500 = server error, 429 = rate limit
5. **Email masking:** Logs show "jo***@example.com" for GDPR compliance

---

## 📞 Getting Help from Claude Desktop

**Always provide:**
1. **What you did:** "Used promo code, payment went through"
2. **What you expected:** "Should receive email with letter"
3. **What happened:** "Loading spinner hangs, no email"
4. **Logs from all 3 functions:** (copy-paste or screenshot)
5. **Time of test:** "11 March 2026 20:45 UTC"

**Example message to Claude Desktop:**
```
Bug report: Letter generation hanging

Test details:
- Time: 11 March 2026 20:45 UTC
- Promo code: nSACtg4aX574
- Email: test@example.com
- Payment: Succeeded
- Expected: Email with letter
- Actual: Loading spinner, no email

Logs attached (see screenshot)

What's wrong?
```

---

**Updated:** 11 March 2026
