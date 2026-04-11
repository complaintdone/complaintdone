import { CompanyPage } from "./CompanyPage";

const Currys = () => {
  return (
    <CompanyPage
      companyName="Currys"
      companySlug="currys"
      industry="UK Retail"
      commonIssues={[
        "Faulty or damaged goods on delivery",
        "Refund refused on faulty products",
        "Extended warranty disputes",
        "Poor repair service (Knowhow)",
        "Incorrect items delivered",
        "Price match guarantee not honoured",
      ]}
      legalRights={[
        "Under the Consumer Rights Act 2015, goods must be of satisfactory quality, fit for purpose, and as described.",
        "You have the right to a full refund within 30 days if goods are faulty.",
        "Between 30 days and 6 months, Currys must repair or replace a faulty item — if that fails, you're entitled to a refund.",
        "Currys cannot legally charge a restocking fee on faulty goods.",
        "If an item fails within 6 years, you may still have a claim even outside warranty (under the Limitation Act 1980).",
      ]}
      escalationInfo={{
        internalProcess: "Contact Currys customer service online or in-store. Request a formal complaint reference number. They must resolve within 8 weeks.",
        ombudsman: "If unresolved, escalate to the Retail Ombudsman or use your credit card's Section 75 protection if you paid by card.",
        regulator: "Report serious issues to Trading Standards via the Citizens Advice consumer helpline (0808 223 1133).",
      }}
      sampleLetterPreview={`[Date]

Customer Services
Currys
[Store Address / Head Office]

Dear Sir or Madam,

RE: FORMAL COMPLAINT – FAULTY GOODS
Order Number: [Your Order Number]

I am writing to formally complain about a [product name] purchased on [date] from Currys for £[amount].

The item developed a fault on [date], specifically [describe fault]. This fault renders the product unfit for purpose and not of satisfactory quality as required under the Consumer Rights Act 2015.

I am requesting a full refund of £[amount] within 14 days. I am aware of my statutory rights and will escalate this matter to Trading Standards and the Retail Ombudsman if not resolved promptly.

Yours faithfully,
[Your Name]`}
    />
  );
};

export default Currys;
