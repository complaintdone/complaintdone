# Promo Code Feature Setup Guide

**Date:** 9 March 2026
**Feature:** Hidden promo code for free £0.00 testing

---

## 🎯 What This Does

Adds a hidden "Have a promo code?" link to your complaint form that allows you to test the full payment flow with £0.00 Stripe checkout using a secret code.

**How it works:**
1. User clicks "Have a promo code?" on the form
2. Enter secret code: `nSACtg4aX574`
3. Full Stripe checkout flow proceeds with £0.00
4. Complaint letter generated and emailed
5. You pay nothing!

---

## 📋 Setup Steps

### Step 1: Create Free Prices in Stripe

You need to create £0.00 and $0.00 products in Stripe.

**Go to Stripe Dashboard:**
1. **Switch to LIVE mode** (toggle in top right)
2. Go to: **Products** → **Add product**

**Create UK Free Product:**
- **Product name:** ComplaintDone - Testing (UK)
- **Description:** Free testing version for UK market
- **Pricing model:** Standard pricing
- **Price:** £0.00 GBP
- **Recurring:** One time
- Click **Save product**
- **Copy the Price ID** (starts with `price_`) → Save for Step 2

**Create USA Free Product:**
- **Product name:** ComplaintDone - Testing (USA)
- **Description:** Free testing version for USA market
- **Pricing model:** Standard pricing
- **Price:** $0.00 USD
- **Recurring:** One time
- Click **Save product**
- **Copy the Price ID** (starts with `price_`) → Save for Step 2

---

### Step 2: Add Environment Variables to Supabase

**Go to Supabase Dashboard:**
https://supabase.com/dashboard/project/ygobfieifodvcpvftqxr/settings/functions

**Add these 3 new secrets:**

| Secret Name | Value | Description |
|-------------|-------|-------------|
| `PROMO_CODE_SECRET` | `nSACtg4aX574` | Secret promo code (only you know this) |
| `STRIPE_PRICE_ID_UK_FREE` | `price_xxxxxxxxxxxxx` | UK £0.00 price ID from Step 1 |
| `STRIPE_PRICE_ID_USA_FREE` | `price_xxxxxxxxxxxxx` | USA $0.00 price ID from Step 1 |

**How to add:**
1. Click **Add new secret**
2. Enter name and value
3. Click **Save**
4. Repeat for all 3 secrets

---

### Step 3: Deploy Updated Code

**Deploy the changes to production:**

```bash
# 1. Deploy updated create-checkout function
supabase functions deploy create-checkout

# 2. Deploy frontend changes (Vercel will auto-deploy)
git add .
git commit -m "Add hidden promo code feature for free testing"
git push

# 3. Wait 2-3 minutes for Vercel deployment to complete
```

---

### Step 4: Test the Promo Code

**Once deployed, test the full flow:**

1. **Go to:** https://www.complaintdone.com/complaint

2. **Click:** "Have a promo code?" (link below the description field)

3. **Enter:** `nSACtg4aX574` (your secret code)

4. **Fill out the form:**
   - Market: UK
   - Email: your-email@example.com
   - Company: Test Company
   - Description: "Testing promo code feature"

5. **Submit:** Click "Generate & Pay — £3.00"

6. **Expected result:**
   - Redirects to Stripe checkout
   - **Shows £0.00 total** (not £3.00)
   - Complete checkout with any card (no charge)
   - Redirects to success page
   - Email arrives with complaint letter

---

## 🔒 Security Notes

### Code is Secret
- **NEVER share the code:** `nSACtg4aX574`
- Only you should know this code
- It's not visible in the UI or code (stored in Supabase secrets)

### How to Rotate the Code

If the code is compromised, change it:

1. **Generate new code:**
   ```bash
   openssl rand -base64 12 | tr -d '/+=' | head -c 12
   ```

2. **Update Supabase secret:**
   - Dashboard → Edge Functions → Secrets
   - Edit `PROMO_CODE_SECRET`
   - Replace with new code
   - **No redeployment needed** (takes effect immediately)

---

## 🎨 User Experience

### What Users See

**Without knowing the code:**
- Normal form with submit button
- Small "Have a promo code?" link (easy to miss)

**When they know the code:**
- Click link → Promo field appears
- Enter code → Submit
- Stripe checkout shows £0.00
- Full flow completes with no charge

### What's Hidden

- The actual code value (not in code or UI)
- No hint about what the code is
- No visible indication it's for free testing

---

## 💰 Pricing Logic

**How the system decides which price to use:**

```
If promoCode === "nSACtg4aX574":
  → Use FREE price IDs (£0.00 or $0.00)
Else:
  → Use PAID price IDs (£3.00 or $5.00)
```

**Market selection still works:**
- UK market → £0.00 GBP (with promo) or £3.00 GBP (without)
- USA market → $0.00 USD (with promo) or $5.00 USD (without)

---

## 🐛 Troubleshooting

### Issue: "Free pricing not configured" error

**Cause:** Free price IDs not set in Supabase secrets

**Fix:**
1. Verify you created £0.00/$0.00 products in Stripe
2. Copy the price IDs (start with `price_`)
3. Add to Supabase secrets: `STRIPE_PRICE_ID_UK_FREE` and `STRIPE_PRICE_ID_USA_FREE`
4. Redeploy: `supabase functions deploy create-checkout`

---

### Issue: Stripe checkout shows £3.00 instead of £0.00

**Cause:** Promo code doesn't match the secret

**Check:**
1. Verify you entered exactly: `nSACtg4aX574` (case-sensitive)
2. Check Supabase secret `PROMO_CODE_SECRET` is set correctly
3. Redeploy create-checkout function

---

### Issue: Promo code field doesn't appear

**Cause:** Frontend changes not deployed

**Fix:**
1. Check Vercel deployment status: https://vercel.com/dashboard
2. Verify git push completed
3. Clear browser cache and refresh
4. Check browser console for errors

---

## 📊 Monitoring

**Check if promo code is being used:**

1. **Stripe Dashboard** → **Payments**
   - Look for £0.00 transactions
   - Should show "ComplaintDone - Testing (UK)" as product

2. **Supabase Function Logs**
   - Dashboard → Edge Functions → Logs
   - Look for create-checkout logs
   - No obvious indication of promo (stays private)

---

## 🚀 Future Enhancements

**Optional improvements you could add:**

1. **Multiple promo codes:**
   - Store codes in database
   - Track usage per code
   - Set expiration dates

2. **Percentage discounts:**
   - Instead of free, apply 50% off
   - Create discounted Stripe price IDs

3. **Usage limits:**
   - Track how many times code is used
   - Limit to X uses per email address

4. **Admin dashboard:**
   - Generate and manage promo codes
   - View usage statistics

---

## 📝 Summary

**Your secret promo code:** `nSACtg4aX574`

**To use it:**
1. Go to /complaint
2. Click "Have a promo code?"
3. Enter: `nSACtg4aX574`
4. Complete form and checkout with £0.00

**Environment variables added:**
- `PROMO_CODE_SECRET=nSACtg4aX574`
- `STRIPE_PRICE_ID_UK_FREE=price_xxxxx` (from Stripe)
- `STRIPE_PRICE_ID_USA_FREE=price_xxxxx` (from Stripe)

**Files modified:**
- `src/pages/Complaint.tsx` (added promo field UI)
- `supabase/functions/create-checkout/index.ts` (added promo validation)

---

**Setup Time:** ~15 minutes
**Requires:** Stripe free products + Supabase secrets + deployment

🎉 **You can now test the full payment flow for free!**
