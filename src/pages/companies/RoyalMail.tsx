import { CompanyPage } from "./CompanyPage";

const RoyalMail = () => {
  return (
    <CompanyPage
      companyName="Royal Mail"
      companySlug="royal-mail"
      industry="UK Postal Services"
      commonIssues={[
        "Lost or missing parcel",
        "Delayed delivery beyond guaranteed time",
        "Damaged parcel or contents",
        "Failed delivery without attempted delivery",
        "Compensation claim rejected",
        "Special Delivery or Tracked 24 not arriving on time",
      ]}
      legalRights={[
        "Under the Postal Services Act 2000, Royal Mail must compensate for provably lost or damaged items.",
        "For Special Delivery, Royal Mail guarantees delivery by 1pm the next working day — delays entitle you to a full postage refund.",
        "Compensation for lost items is capped by service type — e.g., up to £100 for Tracked 48, up to £750 for Special Delivery.",
        "You have 80 days from the date of posting to claim compensation from Royal Mail.",
        "Royal Mail must acknowledge your complaint within 30 days and resolve within a further 30 days.",
      ]}
      escalationInfo={{
        internalProcess: "Submit a claim online at royalmail.com/help/claims or call 03457 740 740. You need your tracking number and proof of posting.",
        ombudsman: "If unresolved after 30 days, escalate to the Postal Redress Service (POSTRS) at cedr.com/postrs — an independent ADR scheme for postal complaints.",
        regulator: "Report systemic issues to Ofcom, which now regulates postal services in the UK at ofcom.org.uk.",
      }}
      sampleLetterPreview={`[Date]

Customer Services
Royal Mail
[Address]

Dear Sir or Madam,

RE: FORMAL COMPLAINT – LOST PARCEL
Tracking Number: [Your Tracking Number]
Date of Posting: [Date]

I am writing to formally complain about a parcel posted on [date] using [service, e.g. Royal Mail Tracked 48] which has not been delivered.

The recipient has confirmed non-receipt. Tracking shows [describe last status: e.g., 'In Transit' since date]. I have already submitted a claim on [date], reference [claim number], which has not been resolved.

Under the Postal Services Act 2000, I am entitled to compensation of £[amount] for the lost item plus a full refund of postage costs of £[amount].

If this is not resolved within 14 days, I will escalate to the Postal Redress Service (POSTRS).

Yours faithfully,
[Your Name]`}
    />
  );
};

export default RoyalMail;
