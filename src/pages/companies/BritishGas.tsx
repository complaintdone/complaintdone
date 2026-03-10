import { CompanyPage } from "./CompanyPage";

const BritishGas = () => {
  return (
    <CompanyPage
      companyName="British Gas"
      companySlug="british-gas"
      industry="UK Energy"
      commonIssues={[
        "Incorrect billing and overcharging",
        "Poor customer service response times",
        "Smart meter installation issues",
        "Unexplained price increases",
        "Refund delays and disputes",
        "Direct debit errors",
      ]}
      legalRights={[
        "Under the Consumer Rights Act 2015, you have the right to receive services with reasonable care and skill.",
        "If British Gas fails to provide accurate billing, you're entitled to a refund of any overcharged amounts.",
        "You have the right to switch energy suppliers at any time without penalty fees.",
        "British Gas must respond to your complaint within 8 weeks, or you can escalate to the Ombudsman.",
        "Under Ofgem regulations, you may be entitled to compensation for delayed responses or poor service.",
      ]}
      escalationInfo={{
        internalProcess: "Contact British Gas customer service first. They must acknowledge your complaint within 2 working days and provide a final response within 8 weeks.",
        ombudsman: "If unresolved after 8 weeks or you receive a 'deadlock letter', escalate to the Energy Ombudsman (free service) at ombudsman-services.org/energy",
        regulator: "Report serious issues to Ofgem (Office of Gas and Electricity Markets) at ofgem.gov.uk",
      }}
      sampleLetterPreview={`[Date]

Customer Service Department
British Gas
[Address]

Dear Sir or Madam,

RE: FORMAL COMPLAINT – BILLING ERROR
Account Number: [Your Account Number]

I am writing to lodge a formal complaint regarding an incorrect charge on my recent British Gas bill dated [date].

I have been charged £[amount], which is significantly higher than my usual monthly usage. Upon reviewing my meter readings, I believe there has been a billing error that requires immediate correction.

I am requesting:
1. A full investigation into the billing discrepancy
2. A refund of any overcharged amount
3. A detailed breakdown of the charges

I expect a response within 10 working days. I am aware of my rights under the Consumer Rights Act 2015 and may escalate this matter to the Energy Ombudsman if necessary.

Yours faithfully,
[Your Name]`}
    />
  );
};

export default BritishGas;
