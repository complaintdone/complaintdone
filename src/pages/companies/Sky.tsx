import { CompanyPage } from "./CompanyPage";

const Sky = () => {
  return (
    <CompanyPage
      companyName="Sky"
      companySlug="sky"
      industry="UK Telecoms & Broadcasting"
      commonIssues={[
        "Broadband speed not as advertised",
        "TV service interruptions",
        "Contract cancellation disputes",
        "Unexpected price increases mid-contract",
        "Installation delays",
        "Customer retention tactics",
      ]}
      legalRights={[
        "Under the Consumer Rights Act 2015, services must match their description and be performed with reasonable care.",
        "If Sky increases prices mid-contract beyond the agreed terms, you may have grounds to cancel without penalty.",
        "You're entitled to compensation if broadband speeds consistently fall below the guaranteed minimum.",
        "Sky must provide 30 days notice of any price increases, and you have the right to cancel if you don't accept them.",
        "Under Ofcom regulations, broadband must be repaired within 2 working days or you're entitled to automatic compensation.",
      ]}
      escalationInfo={{
        internalProcess: "Contact Sky customer service or use their online complaints form. They must respond within 8 weeks.",
        ombudsman: "If unresolved, escalate to the Communications Ombudsman (Ombudsman Services: Communications) at ombudsman-services.org/communications",
        regulator: "Report serious issues to Ofcom (Office of Communications) at ofcom.org.uk",
      }}
      sampleLetterPreview={`[Date]

Complaints Department
Sky UK Limited
[Address]

Dear Sir or Madam,

RE: FORMAL COMPLAINT – BROADBAND SERVICE FAILURE
Account Number: [Your Account Number]

I am writing to formally complain about the unacceptable broadband service I have received from Sky over the past [period].

Despite being advertised as [speed] Mbps, my connection consistently delivers speeds of only [actual speed] Mbps, which is significantly below the guaranteed minimum of [guaranteed minimum] Mbps.

I am requesting:
1. A full refund for the period of poor service
2. Immediate investigation and resolution of the speed issues
3. Compensation as per Ofcom automatic compensation scheme

I expect a substantive response within 10 working days. I am aware of my rights under the Consumer Rights Act 2015 and may escalate to the Communications Ombudsman if necessary.

Yours faithfully,
[Your Name]`}
    />
  );
};

export default Sky;
