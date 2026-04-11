import { CompanyPage } from "./CompanyPage";

const O2 = () => {
  return (
    <CompanyPage
      companyName="O2"
      companySlug="o2"
      industry="UK Telecoms"
      commonIssues={[
        "Poor signal and network coverage",
        "Incorrect charges on monthly bill",
        "Difficulty cancelling contract",
        "Upgrade disputes and hidden fees",
        "Data not working as advertised",
        "Customer service ignoring complaints",
      ]}
      legalRights={[
        "Under the Consumer Rights Act 2015, O2 must deliver services with reasonable care and skill.",
        "If O2 fails to provide the service advertised, you may be entitled to a price reduction or to exit your contract.",
        "Ofcom rules require O2 to resolve complaints within 8 weeks before you can go to an Alternative Dispute Resolution (ADR) scheme.",
        "You have the right to cancel within 14 days of a new contract under the Consumer Contracts Regulations 2013.",
        "O2 must notify you of price increases, and if they're above CPI+3.9%, you may have the right to exit penalty-free.",
      ]}
      escalationInfo={{
        internalProcess: "Contact O2 on 202 (from your O2 phone) or 0344 809 0202. Request a formal complaint and get a reference number. They must respond within 8 weeks.",
        ombudsman: "Escalate to the Communications Ombudsman (free) at commsombudsman.org if unresolved after 8 weeks or you receive a deadlock letter.",
        regulator: "Report ongoing issues to Ofcom at ofcom.org.uk/complaints — they regulate mobile networks in the UK.",
      }}
      sampleLetterPreview={`[Date]

Customer Relations
O2
[Address]

Dear Sir or Madam,

RE: FORMAL COMPLAINT – NETWORK SERVICE FAILURE
Account Number: [Your Account Number]

I am writing to make a formal complaint about the ongoing failure of O2 to provide the mobile service I am paying for under my contract dated [date].

Since [date], I have experienced [describe issue: e.g., no signal at my home address, incorrect charges of £X]. Despite contacting O2 on [date(s)], the issue remains unresolved.

I am requesting [your desired outcome: e.g., a bill credit / contract termination without penalty / refund of £X].

If this is not resolved within 14 days, I will escalate to the Communications Ombudsman. I am aware of my rights under the Consumer Rights Act 2015 and Ofcom regulations.

Yours faithfully,
[Your Name]`}
    />
  );
};

export default O2;
