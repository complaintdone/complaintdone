import { CompanyPage } from "./CompanyPage";

const AmazonUK = () => {
  return (
    <CompanyPage
      companyName="Amazon UK"
      companySlug="amazon-uk"
      industry="UK Retail"
      commonIssues={[
        "Refund refused or delayed",
        "Item not received but marked as delivered",
        "Counterfeit or fake products",
        "A-to-z Guarantee claim rejected",
        "Third-party seller disputes",
        "Account suspension without explanation",
      ]}
      legalRights={[
        "Under the Consumer Rights Act 2015, Amazon UK is responsible for goods sold on their platform, including from third-party sellers.",
        "You have 30 days to return faulty goods for a full refund.",
        "If an item isn't delivered, Amazon must provide a replacement or full refund — 'marked as delivered' is not proof you received it.",
        "If you paid by credit card, Section 75 of the Consumer Credit Act protects purchases over £100.",
        "Amazon's A-to-z Guarantee must be considered fairly — you can escalate to Trading Standards if denied unfairly.",
      ]}
      escalationInfo={{
        internalProcess: "Contact Amazon via their online help centre or request a callback. Escalate to a supervisor if the first response is unsatisfactory. Reference your order number.",
        ombudsman: "Amazon UK is not covered by a specific ombudsman, but you can use the EU Online Dispute Resolution platform or take a small claim to court for amounts under £10,000.",
        regulator: "Report misleading practices to the Competition and Markets Authority (CMA) at gov.uk/cma or Trading Standards via Citizens Advice.",
      }}
      sampleLetterPreview={`[Date]

Customer Service
Amazon UK
[Address]

Dear Sir or Madam,

RE: FORMAL COMPLAINT – NON-DELIVERY / REFUND REFUSED
Order Number: [Your Order Number]

I am writing to formally complain about order [number] placed on [date] for £[amount].

[Describe issue: e.g., The item was marked as delivered on [date], however I did not receive it. I have checked with neighbours and my local delivery depot with no result.]

Under the Consumer Rights Act 2015, Amazon UK bears responsibility for ensuring goods reach the customer. I am requesting a full refund of £[amount] within 14 days.

If not resolved, I will pursue this via my credit card provider under Section 75 of the Consumer Credit Act and report the matter to Trading Standards.

Yours faithfully,
[Your Name]`}
    />
  );
};

export default AmazonUK;
