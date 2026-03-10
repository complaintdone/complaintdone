# ComplaintDone - System Verification Guide

**Date:** 10 March 2026
**Status:** Ready for final verification
**Changes Deployed:** Company pages, sitemap fix, CORS security, docs cleanup

---

## 🎉 What Was Just Completed

### 1. ✅ Documentation Cleanup (52% reduction)
**Deleted 7 redundant files:**
- CLAUDE_CONTEXT.md (outdated $25K MRR goal)
- START_HERE.md (wrapper file)
- DEPLOYMENT_COMPLETE.md (historical 9 March)
- WHAT_CHANGED.md (historical SEO notes)
- GROWTH_SUMMARY.md (duplicate)
- IMPLEMENTATION_CHECKLIST.md (outdated tasks)
- SECURITY_AUDIT_SUMMARY.md (duplicate)

**Kept 7 essential files:**
- CLAUDE.md - Main project instructions
- SECURITY_HANDOFF.md - Security audit (A- 89/100)
- SECURITY_INCIDENT_RESPONSE.md - GDPR compliance
- CLAUDECODE_SETUP.md - Dev environment
- PROMO_CODE_SETUP.md - Testing feature
- GROWTH_PLAN.md - Strategic roadmap
- README.md - Project readme

### 2. ✅ Company Pages Built (5 priority pages)
**New pages created:**
- /companies/british-gas
- /companies/sky
- /companies/bt
- /companies/vodafone
- /companies/virgin-media

**Each page includes:**
- SEO-optimized title, description, keywords
- Company-specific common complaints
- Legal rights (Consumer Rights Act 2015, industry regulations)
- Escalation process (internal → Ombudsman → regulator)
- Sample complaint letter preview
- CTA buttons linking to complaint form with pre-filled company name

**Reusable component:** `src/pages/companies/CompanyPage.tsx`

### 3. ✅ Sitemap Fixed
**Before:** 31 URLs (25 didn't exist - SEO failure)
**After:** 12 URLs (all exist)

**URLs:**
- 7 static pages (home, complaint, about, examples, contact, terms, privacy)
- 5 company pages (British Gas, Sky, BT, Vodafone, Virgin Media)

**File:** `public/sitemap.xml` (auto-generated on build)

### 4. ✅ Security Enhancements
**Contact form CORS restricted:**
- Before: `Access-Control-Allow-Origin: *` (any origin)
- After: `Access-Control-Allow-Origin: https://www.complaintdone.com` (production only)
- **Deployed:** contact-form function v8

### 5. ✅ Git Commit & Push
**Commit:** 0899777
**Status:** Pushed to main
**Vercel:** Auto-deployment in progress (check https://vercel.com/dashboard)

---

## 🔍 Critical: JWT Enforcement Verification

### Why This Matters
**Config vs Dashboard mismatch:**
- `supabase/config.toml` shows `verify_jwt = true` for 4 functions
- But JWT enforcement ALSO needs to be enabled in Supabase Dashboard
- If Dashboard setting is OFF, functions still accept unauthenticated requests

### How to Verify

**1. Open Supabase Dashboard:**
```
https://supabase.com/dashboard/project/ygobfieifodvcpvftqxr/settings/functions
```

**2. Check each function's JWT setting:**

| Function Name | JWT Setting Should Be | Why |
|---------------|----------------------|-----|
| create-checkout | ✅ **ENABLED** | Called by frontend with Supabase auth token |
| generate-complaint | ✅ **ENABLED** | Internal call with auth token |
| send-email | ✅ **ENABLED** | Internal call with auth token |
| contact-form | ✅ **ENABLED** | Called by frontend with auth token |
| stripe-webhook | ❌ **DISABLED** | Stripe uses signature verification, not JWT |

**3. How to check:**
- Click on each function name
- Look for "JWT Verification" toggle or "Verify JWT" setting
- Verify it matches the table above

**4. If JWT is disabled:**
- Toggle it ON for the 4 functions listed above
- Save changes
- **CRITICAL:** Test the payment flow immediately after enabling

---

## 🧪 Testing Checklist

### Test 1: Verify New Company Pages

**Visit each page in browser:**
```
https://www.complaintdone.com/companies/british-gas
https://www.complaintdone.com/companies/sky
https://www.complaintdone.com/companies/bt
https://www.complaintdone.com/companies/vodafone
https://www.complaintdone.com/companies/virgin-media
```

**Check:**
- ✅ Page loads without 404
- ✅ SEO title shows in browser tab
- ✅ "Generate Letter" button links to `/complaint?market=uk&company=British Gas`
- ✅ Legal rights section displays
- ✅ Sample letter preview shows

**Expected result:** All 5 pages load correctly with proper SEO and CTA buttons

---

### Test 2: Verify Sitemap

**Visit sitemap:**
```
https://www.complaintdone.com/sitemap.xml
```

**Check:**
- ✅ Shows 12 URLs total
- ✅ Includes all 5 company pages
- ✅ No 404 URLs listed
- ✅ All URLs return 200 status

**Expected result:** Clean sitemap with only existing pages

---

### Test 3: Test Contact Form CORS

**Run this curl command:**
```bash
curl -X POST https://ygobfieifodvcpvftqxr.supabase.co/functions/v1/contact-form \
  -H "Content-Type: application/json" \
  -H "Origin: https://malicious-site.com" \
  -d '{"name":"Test","email":"test@test.com","message":"Test"}'
```

**Expected result:**
- CORS error (cross-origin request blocked)
- OR 401 Unauthorized (if JWT is enabled)

**This proves:** contact-form now rejects non-production origins

---

### Test 4: Full Payment Flow (CRITICAL)

**🚨 IMPORTANT:** Test this AFTER verifying JWT settings in Dashboard

**Steps:**

1. **Go to:** https://www.complaintdone.com/complaint

2. **Fill out form:**
   - Market: UK
   - Email: your-test-email@example.com
   - Name: Test User
   - Company: British Gas (should auto-complete)
   - Description: "Test complaint for verification"
   - Tone: Firm

3. **Use promo code for free testing:**
   - Click "Have a promo code?"
   - Enter: `nSACtg4aX574`
   - Submit form

4. **Expected flow:**
   - Redirects to Stripe checkout
   - Shows £0.00 (promo code applied)
   - Complete payment (use test card: 4242 4242 4242 4242)
   - Redirects to /success
   - Email arrives within 60 seconds

5. **Check Supabase logs:**
   - Go to: https://supabase.com/dashboard/project/ygobfieifodvcpvftqxr/logs/edge-functions
   - Look for logs from: create-checkout → stripe-webhook → generate-complaint → send-email
   - ✅ All should show 200 status

**If you see 401 errors:**
- JWT is enabled in Dashboard but frontend token is invalid
- Check browser console for Supabase auth errors
- Verify `VITE_SUPABASE_ANON_KEY` in Vercel env vars

**If payment works but no email:**
- Check Resend dashboard for delivery logs
- Check send-email function logs for errors

---

### Test 5: Rate Limiting

**Test checkout rate limit (5 requests/IP/60min):**

1. Submit complaint form 5 times rapidly (use different emails)
2. On 6th attempt, should see:
   ```
   Error: "Too many requests. Please try again later."
   Status: 429
   Retry-After: 3600
   ```

**Test contact form rate limit (3 requests/IP/60min):**

1. Submit contact form 3 times rapidly
2. On 4th attempt, should see rate limit error

**Expected result:** Both rate limits work correctly

---

### Test 6: Database Logging

**Check complaints table:**

```bash
# If you have Supabase CLI linked:
supabase db execute "SELECT COUNT(*) FROM complaints;"
```

**Or via Dashboard:**
- Go to: https://supabase.com/dashboard/project/ygobfieifodvcpvftqxr/editor
- Open `complaints` table
- Check for recent entries

**Expected result:** New row created after each successful payment

---

## 📊 Post-Deployment Monitoring

### Google Search Console (if set up)

**Submit new sitemap:**
1. Go to: https://search.google.com/search-console
2. Sitemaps → Add new sitemap
3. Enter: `https://www.complaintdone.com/sitemap.xml`
4. Submit

**Expected:** Google will re-crawl and remove 404 errors from old company pages

### Google Analytics (if set up)

**Check tracking:**
1. Go to: https://analytics.google.com
2. Real-time view
3. Visit company pages
4. Verify pageviews appear

### Vercel Deployment

**Check deployment status:**
1. Go to: https://vercel.com/dashboard
2. Look for latest deployment (commit 0899777)
3. Status should be "Ready"
4. Check deployment logs for errors

---

## 🎯 Success Criteria

**Your system is fully verified when:**

- [ ] All 5 company pages load correctly
- [ ] Sitemap shows only 12 URLs (no 404s)
- [ ] Contact form CORS blocks non-production origins
- [ ] JWT enforcement is enabled for 4 functions in Dashboard
- [ ] Full payment flow works (promo code: nSACtg4aX574)
- [ ] Email arrives within 60 seconds
- [ ] Rate limiting blocks 6th checkout request
- [ ] Rate limiting blocks 4th contact form request
- [ ] Complaints table logs new entries
- [ ] No 500 errors in Supabase function logs
- [ ] Vercel deployment shows "Ready"

**Once all boxes checked:**
🎉 **System is production-ready with 5 SEO-optimized company pages!**

---

## 🚨 Troubleshooting

### Issue: Company pages show 404

**Cause:** Vercel deployment not complete or failed

**Fix:**
1. Check Vercel dashboard for deployment status
2. Wait 2-3 minutes for build to complete
3. Clear browser cache and refresh
4. Check Vercel logs for build errors

---

### Issue: 401 Unauthorized on payment flow

**Cause:** JWT enabled but frontend not sending token correctly

**Fix:**
1. Check browser console for Supabase errors
2. Verify `VITE_SUPABASE_ANON_KEY` in Vercel env vars
3. Verify `VITE_SUPABASE_URL` in Vercel env vars
4. Redeploy frontend if env vars changed

**Temporary workaround (NOT for production):**
- Disable JWT for create-checkout in Dashboard
- Test payment flow
- Re-enable JWT after fixing

---

### Issue: Contact form still allows any origin

**Cause:** Function not redeployed with CORS fix

**Fix:**
```bash
supabase functions deploy contact-form
```

**Verify:** Use curl test from Test 3 above

---

### Issue: Sitemap still shows 31 URLs

**Cause:** Old sitemap cached by browser or CDN

**Fix:**
1. Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
2. Check source file: `cat public/sitemap.xml`
3. If source shows 12 URLs but website shows 31, clear CDN cache in Vercel

---

### Issue: Promo code doesn't work (shows £3.00 instead of £0.00)

**Cause:** Promo code environment variables not set

**Fix:**
1. Check Supabase Dashboard → Edge Functions → Secrets
2. Verify these exist:
   - `PROMO_CODE_SECRET=nSACtg4aX574`
   - `STRIPE_PRICE_ID_UK_FREE=price_xxxxx`
   - `STRIPE_PRICE_ID_USA_FREE=price_xxxxx`
3. See PROMO_CODE_SETUP.md for full setup instructions

---

## 📞 Next Steps

### Immediate (Today)
1. ✅ Verify JWT enforcement in Supabase Dashboard
2. ✅ Run all 6 tests above
3. ✅ Monitor function logs for first hour

### Short-term (This Week)
1. Submit updated sitemap to Google Search Console
2. Monitor Google Analytics for company page traffic
3. Review GROWTH_PLAN.md for next 20 company pages to build

### Medium-term (Next Month)
1. Build 10 more company pages (EDF Energy, Amazon, Royal Mail, etc.)
2. Write blog content targeting high-volume keywords
3. Set up error monitoring (Sentry)

---

## 📚 Related Documentation

- **CLAUDE.md** - Main project documentation
- **SECURITY_HANDOFF.md** - Security audit & implementation
- **PROMO_CODE_SETUP.md** - Promo code feature setup
- **GROWTH_PLAN.md** - SEO strategy & content roadmap

---

**Last Updated:** 10 March 2026
**Next Review:** After verification complete
**Status:** 🟢 Ready for testing
