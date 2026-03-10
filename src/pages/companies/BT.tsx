import { CompanyPage } from "./CompanyPage";

const BT = () => {
  return (
    <CompanyPage
      companyName="BT"
      companySlug="bt"
      industry="UK Telecoms"
      commonIssues={[
        "Line faults and connection issues",
        "Engineer appointment no-shows",
        "Billing errors and overcharging",
        "Poor broadband speeds",
        "Contract exit fee disputes",
        "Customer service wait times",
      ]}
      legalRights={[
        "Under the Consumer Rights Act 2015, BT must provide services with reasonable care and skill.",
        "You're entitled to automatic compensation if an engineer misses an appointment or service isn't fixed within agreed timescales.",
        "If BT fails to meet the guaranteed minimum broadband speed, you have the right to exit your contract without penalty.",
        "BT must respond to complaints within 8 weeks, or you can escalate to the Ombudsman.",
        "Under Ofcom's automatic compensation scheme, you're entitled to £8/day for missed appointments and delayed repairs.",
      ]}
      escalationInfo={{
        internalProcess: "Contact BT customer service via phone, live chat, or their online complaints portal. They have 8 weeks to resolve your complaint.",
        ombudsman: "Escalate to Ombudsman Services: Communications at ombudsman-services.org/communications if BT doesn't resolve your complaint within 8 weeks.",
        regulator: "Report to Ofcom (Office of Communications) for serious breaches at ofcom.org.uk",
      }}
      sampleLetterPreview={`[Date]

Customer Relations Team
BT Group PLC
[Address]

Dear Sir or Madam,

RE: FORMAL COMPLAINT – MISSED ENGINEER APPOINTMENT
Account Number: [Your Account Number]

I am writing to lodge a formal complaint regarding a missed engineer appointment on [date] and the continued failure to resolve my line fault that was first reported on [date].

Despite booking an appointment and taking time off work, the engineer failed to attend. My broadband service has now been unavailable for [X] days, causing significant disruption.

Under Ofcom's automatic compensation scheme, I am entitled to:
1. £25 for the missed appointment
2. £8 per day for delayed repair (total: £[amount])
3. Immediate resolution of the line fault

I expect full compensation and service restoration within 5 working days. I am aware of my rights under the Consumer Rights Act 2015 and may escalate to the Communications Ombudsman if necessary.

Yours faithfully,
[Your Name]`}
    />
  );
};

export default BT;
