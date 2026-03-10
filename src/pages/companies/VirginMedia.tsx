import { CompanyPage } from "./CompanyPage";

const VirginMedia = () => {
  return (
    <CompanyPage
      companyName="Virgin Media"
      companySlug="virgin-media"
      industry="UK Broadband & TV"
      commonIssues={[
        "Slow broadband speeds",
        "Frequent service outages",
        "Installation problems",
        "Price increases without notice",
        "Difficulty cancelling contract",
        "Customer service response times",
      ]}
      legalRights={[
        "Under the Consumer Rights Act 2015, Virgin Media must provide broadband at the speed stated in your contract.",
        "You're entitled to automatic compensation (£8/day) if your service isn't repaired within 2 working days.",
        "If speeds consistently fall below the guaranteed minimum, you can exit your contract without early termination fees.",
        "Virgin Media must give 30 days notice of price increases, and you have the right to cancel if you don't accept them.",
        "Under Ofcom rules, Virgin Media must process cancellation requests within 1 working day.",
      ]}
      escalationInfo={{
        internalProcess: "Contact Virgin Media customer service on 150 (from a Virgin Media landline) or via their online complaints form. They have 8 weeks to resolve your complaint.",
        ombudsman: "If unresolved, escalate to Ombudsman Services: Communications at ombudsman-services.org/communications",
        regulator: "Report serious issues to Ofcom (Office of Communications) at ofcom.org.uk",
      }}
      sampleLetterPreview={`[Date]

Customer Complaints Team
Virgin Media
[Address]

Dear Sir or Madam,

RE: FORMAL COMPLAINT – POOR BROADBAND PERFORMANCE
Account Number: [Your Account Number]

I am writing to formally complain about the consistently poor broadband service I have received from Virgin Media.

My contract guarantees a minimum speed of [guaranteed speed] Mbps, yet speed tests consistently show [actual speed] Mbps. This has persisted for [duration], making the service unfit for purpose.

Under the Consumer Rights Act 2015, I am requesting:
1. A refund for the period of substandard service (£[amount])
2. Immediate investigation and resolution of the speed issues
3. Right to exit contract without penalty if speeds cannot be guaranteed

I expect a substantive response within 10 working days. If this matter is not resolved, I will escalate to the Communications Ombudsman.

Yours faithfully,
[Your Name]`}
    />
  );
};

export default VirginMedia;
