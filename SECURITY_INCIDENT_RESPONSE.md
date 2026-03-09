# Security Incident Response & Data Breach Notification Plan

**Document Owner:** Technical Lead
**Last Updated:** 9 March 2026
**Review Frequency:** Annually or after any security incident

---

## Purpose

This document outlines ComplaintDone's security incident response and data breach notification procedures to ensure compliance with:
- UK GDPR Article 33 (Breach notification to supervisory authority)
- UK GDPR Article 34 (Communication to data subjects)
- UK Data Protection Act 2018

---

## 1. Incident Severity Classification

### CRITICAL (P0) - Immediate Response Required
- Active data breach with confirmed PII exposure
- Payment system compromise
- Complete service unavailability
- Active ransomware/malware infection
- Unauthorized access to production databases

### HIGH (P1) - Response Within 1 Hour
- Suspected data breach (unconfirmed)
- Multiple failed authentication attempts suggesting attack
- DDoS attack affecting service availability
- Compromise of admin credentials
- Critical vulnerability discovered in production code

### MEDIUM (P2) - Response Within 4 Hours
- Rate limit abuse detected
- Webhook signature verification failures (potential attack)
- Suspicious API activity patterns
- Non-critical security vulnerabilities

### LOW (P3) - Response Within 24 Hours
- Outdated dependencies with known vulnerabilities
- Configuration issues without immediate risk
- Security best practice violations

---

## 2. Incident Response Team

### Roles & Responsibilities

| Role | Responsibilities | Contact |
|------|------------------|---------|
| **Incident Commander** | Overall coordination, decision-making | Technical Lead |
| **Technical Lead** | Investigation, containment, remediation | Developer |
| **Legal Contact** | Legal compliance, regulatory notifications | privacy@complaintdone.com |
| **Communications Lead** | Customer notifications, public statements | support@complaintdone.com |

### External Contacts

- **UK ICO (Information Commissioner's Office)**: https://ico.org.uk/for-organisations/report-a-breach/
- **Stripe Security**: security@stripe.com
- **Supabase Security**: security@supabase.io
- **Vercel Security**: security@vercel.com

---

## 3. Incident Response Workflow

### Phase 1: Detection & Assessment (0-30 minutes)

**Actions:**
1. ✅ Confirm the incident is real (not false positive)
2. ✅ Classify severity (P0-P3)
3. ✅ Document initial findings in incident log
4. ✅ Notify Incident Commander
5. ✅ Preserve evidence (logs, screenshots, timestamps)

**Key Questions:**
- What happened and when?
- What systems/data are affected?
- Is the incident ongoing?
- How many users are potentially impacted?

### Phase 2: Containment (30-60 minutes)

**Actions Based on Incident Type:**

**For Data Breach:**
- [ ] Immediately revoke compromised credentials
- [ ] Disable affected API endpoints if necessary
- [ ] Block malicious IP addresses in rate_limits table
- [ ] Take snapshots of affected systems before changes

**For Payment System Compromise:**
- [ ] Contact Stripe immediately (security@stripe.com)
- [ ] Disable create-checkout function temporarily
- [ ] Review all recent transactions for anomalies

**For Unauthorized Access:**
- [ ] Force logout all sessions (if user auth implemented)
- [ ] Rotate all API keys and secrets
- [ ] Enable additional logging/monitoring

**For DDoS Attack:**
- [ ] Enable Vercel DDoS protection
- [ ] Implement stricter rate limiting
- [ ] Contact Vercel support

### Phase 3: Investigation (1-4 hours)

**Actions:**
1. ✅ Review Supabase Edge Function logs
2. ✅ Check Stripe webhook logs for suspicious activity
3. ✅ Analyze rate_limits table for attack patterns
4. ✅ Review database query logs
5. ✅ Identify root cause and attack vector
6. ✅ Determine scope of data exposure (if any)
7. ✅ Document timeline of events

**Log Locations:**
- Supabase Edge Functions: Dashboard → Edge Functions → Logs
- Stripe webhooks: dashboard.stripe.com/webhooks
- Vercel deployments: vercel.com/[project]/logs
- Database queries: Supabase Dashboard → Database → Logs

### Phase 4: Eradication & Recovery (4-24 hours)

**Actions:**
1. ✅ Remove malicious code or backdoors
2. ✅ Patch vulnerabilities
3. ✅ Restore service from clean backups if necessary
4. ✅ Implement additional security controls
5. ✅ Verify system integrity
6. ✅ Gradually restore service

### Phase 5: Notification (24-72 hours)

**See Section 4: Data Breach Notification Procedures**

### Phase 6: Post-Incident Review (Within 7 days)

**Actions:**
1. ✅ Conduct post-mortem meeting
2. ✅ Document lessons learned
3. ✅ Update security procedures
4. ✅ Implement preventive measures
5. ✅ Update this document if necessary

---

## 4. Data Breach Notification Procedures

### UK GDPR Requirements

**Article 33: Notification to ICO**
- **Timeline:** Within 72 hours of becoming aware of the breach
- **Required if:** Breach is likely to result in risk to individuals' rights and freedoms
- **Exemption:** If breach is unlikely to result in risk (must document reasoning)

**Article 34: Notification to Data Subjects**
- **Timeline:** Without undue delay
- **Required if:** Breach likely to result in high risk to individuals
- **Exemption:**
  - Appropriate technical/organizational protection applied (e.g., encryption)
  - Subsequent measures ensure high risk no longer likely
  - Would involve disproportionate effort (public communication acceptable)

### Step-by-Step Breach Notification

#### Step 1: Determine if Breach is Notifiable (Within 24 hours)

**What Data Was Exposed?**
- [ ] Email addresses → **LOW RISK** (publicly available)
- [ ] Names → **LOW RISK** (non-sensitive)
- [ ] Complaint descriptions → **MEDIUM RISK** (may contain sensitive information)
- [ ] Payment card data → **CRITICAL RISK** (notify immediately)
- [ ] Nothing exposed → **NO BREACH**

**Risk Assessment Questions:**
- Could individuals suffer discrimination, identity theft, or financial loss?
- Does the breach involve sensitive personal data?
- Are vulnerable individuals affected (children, disabled, etc.)?
- How many individuals are affected?
- Is data encrypted or pseudonymized?

**Decision Matrix:**

| Risk Level | ICO Notification | User Notification |
|------------|------------------|-------------------|
| NO RISK | ❌ Not required | ❌ Not required |
| LOW RISK | ✅ Required (within 72h) | ❌ Not required |
| MEDIUM RISK | ✅ Required (within 72h) | ⚠️ Consider notifying |
| HIGH RISK | ✅ Required (within 72h) | ✅ Required (without undue delay) |
| CRITICAL RISK | ✅ URGENT (within 24h) | ✅ URGENT (within 24h) |

#### Step 2: Notify the ICO (If Required)

**Method:** https://ico.org.uk/for-organisations/report-a-breach/

**Information to Provide:**
1. **Nature of the breach:**
   - What happened?
   - When was it discovered?
   - Is it ongoing?

2. **Categories and approximate numbers:**
   - Number of data subjects affected
   - Number of personal data records affected

3. **Contact details:**
   - Data Protection Officer (if applicable): privacy@complaintdone.com
   - Organisation contact: support@complaintdone.com

4. **Likely consequences:**
   - Potential harm to individuals
   - Risk assessment

5. **Measures taken:**
   - Actions to mitigate breach
   - Actions to address causes
   - Steps to prevent recurrence

**Timeline:**
- Within 72 hours of becoming aware
- If not possible within 72 hours, provide reasons for delay and submit as soon as possible

#### Step 3: Notify Affected Users (If High Risk)

**Email Template:**

```
Subject: Important Security Notice - ComplaintDone Data Incident

Dear [Name],

We are writing to inform you of a security incident that may have affected your
personal information used with ComplaintDone.

WHAT HAPPENED:
[Brief description of the incident, when it occurred, and when it was discovered]

WHAT INFORMATION WAS INVOLVED:
[Specific data types affected: email, name, complaint description, etc.]

WHAT WE ARE DOING:
[Steps taken to investigate, contain, and remediate the incident]

WHAT YOU CAN DO:
[Specific recommendations: monitor accounts, change passwords, watch for phishing]

FOR MORE INFORMATION:
Please contact us at privacy@complaintdone.com or visit [incident page URL]

We sincerely apologize for this incident and any concern it may cause.

Regards,
ComplaintDone Team
```

**Notification Method:**
- Email to affected users (primary)
- Website notice if >500 users affected
- Social media if users cannot be contacted individually

#### Step 4: Document Everything

**Create Incident Report Including:**
- [ ] Timeline of events (discovery, containment, resolution)
- [ ] Nature and scope of breach
- [ ] Data categories and number of individuals affected
- [ ] Risk assessment and reasoning
- [ ] Actions taken
- [ ] Notifications sent (ICO, users, third parties)
- [ ] Lessons learned
- [ ] Preventive measures implemented

**Retention:** Keep for 7 years (UK GDPR requirement)

---

## 5. Incident Log Template

**Copy this template for each incident:**

```markdown
## Incident ID: [YYYY-MM-DD-###]

**Severity:** [P0/P1/P2/P3]
**Status:** [Open/Contained/Resolved]
**Incident Commander:** [Name]

### Timeline
- **[HH:MM]** Incident detected via [source]
- **[HH:MM]** Incident Commander notified
- **[HH:MM]** Containment actions taken
- **[HH:MM]** Root cause identified
- **[HH:MM]** Service restored
- **[HH:MM]** Notifications sent

### Description
[What happened, how it happened, what was affected]

### Impact
- **Users Affected:** [Number or "None"]
- **Data Exposed:** [Types of data or "None"]
- **Service Downtime:** [Duration or "None"]

### Root Cause
[Technical explanation of vulnerability or misconfiguration]

### Actions Taken
1. [Containment action]
2. [Investigation action]
3. [Remediation action]
4. [Notification action]

### Notifications Sent
- [ ] ICO (if required) - [Date/Time]
- [ ] Affected users (if required) - [Date/Time]
- [ ] Third parties (Stripe, Supabase, etc.) - [Date/Time]

### Lessons Learned
[What went well, what could be improved]

### Follow-up Actions
- [ ] [Preventive measure 1] - Owner: [Name] - Due: [Date]
- [ ] [Preventive measure 2] - Owner: [Name] - Due: [Date]
```

---

## 6. Common Incident Scenarios & Responses

### Scenario A: Stripe Webhook Abuse (Fake Webhook Calls)

**Indicators:**
- Multiple webhook signature verification failures in logs
- Unexpected letter generation without corresponding Stripe payments
- Unusual API usage spikes

**Response:**
1. ✅ Verify webhook signature verification is working (check logs)
2. ✅ Block malicious IP addresses
3. ✅ Review Stripe dashboard for legitimate payments
4. ✅ If letters were sent without payment, identify affected users
5. ✅ Consider rotating webhook secret

**Data Breach?** NO (no PII exposed, only API abuse)

---

### Scenario B: Rate Limit Database Failure Causing Unrestricted Access

**Indicators:**
- High volume of requests from single IP
- Rate limit check errors in logs
- Unusual Anthropic API costs

**Response:**
1. ✅ Temporarily disable create-checkout function
2. ✅ Fix database connection issue
3. ✅ Review rate_limits table for abuse patterns
4. ✅ Calculate financial impact
5. ✅ Re-enable function with monitoring

**Data Breach?** NO (no PII exposed, financial loss only)

---

### Scenario C: Supabase Database Unauthorized Access

**Indicators:**
- Unexpected database queries in logs
- Data export detected
- Notification from Supabase security team

**Response:**
1. ✅ **IMMEDIATELY** rotate all Supabase keys (anon, service role)
2. ✅ Review database logs for accessed tables
3. ✅ Determine if `complaints` table accessed (LOW RISK - no PII)
4. ✅ Check if rate_limits table accessed (MEDIUM RISK - contains IP addresses)
5. ✅ Force redeploy all Edge Functions with new keys
6. ✅ Contact Supabase support

**Data Breach?** LIKELY YES
- **ICO Notification:** Required within 72 hours
- **User Notification:** Only if IP addresses or other PII exposed

---

### Scenario D: Email Delivery System Compromise (Resend Account Breach)

**Indicators:**
- Notification from Resend
- Emails sent from noreply@complaintdone.com not originating from your functions
- User complaints about spam

**Response:**
1. ✅ **IMMEDIATELY** rotate Resend API key
2. ✅ Review Resend dashboard for unauthorized sends
3. ✅ Redeploy send-email function with new key
4. ✅ Contact Resend support
5. ✅ Notify users if personal data was exposed in unauthorized emails

**Data Breach?** DEPENDS
- If only your domain was used for spam: NO
- If user emails/names/letters were accessed: YES

---

## 7. Prevention & Monitoring

### Daily Monitoring (Automated)
- [ ] Supabase function error rates
- [ ] Stripe webhook success rate
- [ ] Rate limit trigger frequency
- [ ] Database storage growth

### Weekly Review (Manual)
- [ ] Review Edge Function logs for anomalies
- [ ] Check Stripe dashboard for disputes/refunds
- [ ] Verify rate_limits table is being cleaned up
- [ ] Review complaints table for patterns

### Monthly Security Checks
- [ ] Run `npm audit` and update dependencies
- [ ] Review access logs for admin accounts
- [ ] Verify all team members still require access
- [ ] Test incident response plan (tabletop exercise)

### Quarterly Security Audit
- [ ] Full security review (like this document)
- [ ] Penetration testing (if budget allows)
- [ ] Review and update security policies
- [ ] Update this incident response plan

---

## 8. Contact Information

### Internal Contacts
- **Technical Lead:** [Your email]
- **Privacy Officer:** privacy@complaintdone.com
- **Support Team:** support@complaintdone.com

### External Contacts
- **UK ICO:** casework@ico.org.uk | 0303 123 1113
- **Stripe Security:** security@stripe.com
- **Supabase Security:** security@supabase.io
- **Anthropic Security:** security@anthropic.com
- **Resend Support:** support@resend.com
- **Vercel Security:** security@vercel.com

### Legal Contacts
- **Data Protection Lawyer:** [To be determined]

---

## 9. Annual Review Checklist

This document must be reviewed annually and after any security incident.

**Last Review:** 9 March 2026
**Next Review:** 9 March 2027

**Review Items:**
- [ ] Contact information is current
- [ ] Notification timelines comply with current regulations
- [ ] Incident severity classification still appropriate
- [ ] Team roles and responsibilities are accurate
- [ ] Scenarios reflect current architecture
- [ ] Monitoring procedures are being followed

---

**Document Version:** 1.0
**Approved By:** Technical Lead
**Date:** 9 March 2026
