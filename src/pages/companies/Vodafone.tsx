import { CompanyPage } from "./CompanyPage";

const Vodafone = () => {
  return (
    <CompanyPage
      companyName="Vodafone"
      companySlug="vodafone"
      industry="UK Mobile & Telecoms"
      commonIssues={[
        "Unexpected charges on mobile bill",
        "Poor network coverage",
        "Contract upgrade disputes",
        "Roaming charge errors",
        "Customer service complaints",
        "PAC code delays when switching",
      ]}
      legalRights={[
        "Under the Consumer Rights Act 2015, Vodafone must provide services as described in your contract.",
        "You have the right to receive a PAC (Porting Authorisation Code) within 1 working day of requesting it.",
        "If Vodafone increases prices beyond inflation + 3.9%, you have the right to exit your contract without penalty.",
        "Network coverage must be as advertised; persistent poor signal may entitle you to cancel or receive compensation.",
        "Vodafone must respond to complaints within 8 weeks, after which you can escalate to the Ombudsman.",
      ]}
      escalationInfo={{
        internalProcess: "Contact Vodafone customer service via phone (191 from a Vodafone mobile) or their online chat. Log a formal complaint through their complaints procedure.",
        ombudsman: "Escalate to Ombudsman Services: Communications at ombudsman-services.org/communications if unresolved after 8 weeks or you receive a deadlock letter.",
        regulator: "Report to Ofcom (Office of Communications) at ofcom.org.uk for serious issues or regulatory breaches.",
      }}
      sampleLetterPreview={`[Date]

Complaints Department
Vodafone UK
[Address]

Dear Sir or Madam,

RE: FORMAL COMPLAINT – INCORRECT BILLING
Account Number: [Your Account Number]
Mobile Number: [Your Number]

I am writing to formally complain about incorrect charges totalling £[amount] on my recent Vodafone bill dated [date].

I was charged for [specific charges - e.g., roaming, premium services] that I did not authorize or use. I have contacted customer service on [dates] but the issue remains unresolved.

I am requesting:
1. Immediate removal of the incorrect charges
2. A refund of £[amount] to my account
3. Written confirmation that no further incorrect charges will appear

I expect this matter to be resolved within 10 working days. I am aware of my rights under the Consumer Rights Act 2015 and may escalate to the Communications Ombudsman if necessary.

Yours faithfully,
[Your Name]`}
    />
  );
};

export default Vodafone;
