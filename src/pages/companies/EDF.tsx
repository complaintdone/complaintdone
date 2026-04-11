import { CompanyPage } from "./CompanyPage";

const EDF = () => {
  return (
    <CompanyPage
      companyName="EDF Energy"
      companySlug="edf-energy"
      industry="UK Energy"
      commonIssues={[
        "Inaccurate estimated billing",
        "Delayed final bill after switching",
        "Smart meter malfunction",
        "Direct debit increased without warning",
        "Refund of credit balance refused",
        "Poor customer service response times",
      ]}
      legalRights={[
        "Under the Consumer Rights Act 2015, EDF must provide services with reasonable care and skill.",
        "Ofgem rules require EDF to send your final bill within 6 weeks of switching supplier.",
        "EDF must refund a credit balance within 10 working days of your request.",
        "You can switch energy supplier at any time — EDF cannot charge early exit fees on standard variable tariffs.",
        "EDF must respond to your formal complaint within 8 weeks before you can take it to the Energy Ombudsman.",
      ]}
      escalationInfo={{
        internalProcess: "Contact EDF on 0333 200 5100 or via their online portal. Request a formal complaint reference. They must acknowledge within 2 working days and resolve within 8 weeks.",
        ombudsman: "After 8 weeks or a deadlock letter, escalate free of charge to the Energy Ombudsman at ombudsman-services.org/energy",
        regulator: "Report ongoing billing or switching issues to Ofgem at ofgem.gov.uk — they can take enforcement action against energy suppliers.",
      }}
      sampleLetterPreview={`[Date]

Customer Relations
EDF Energy
[Address]

Dear Sir or Madam,

RE: FORMAL COMPLAINT – INACCURATE BILLING / CREDIT REFUND
Account Number: [Your Account Number]

I am writing to formally complain about [billing error / refusal to refund credit balance] on my EDF Energy account.

[Describe issue: e.g., My account shows a credit balance of £X, which I requested to be refunded on [date]. Despite your obligation to process this within 10 working days, I have not received payment.]

I am requesting [your outcome: full refund of £X / correction of bill / compensation for inconvenience] within 14 days.

I am aware of my rights under Ofgem regulations and the Consumer Rights Act 2015. If not resolved, I will escalate to the Energy Ombudsman.

Yours faithfully,
[Your Name]`}
    />
  );
};

export default EDF;
