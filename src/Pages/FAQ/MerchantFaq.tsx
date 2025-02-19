import React, { useState } from "react";

const MerchantFaq = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (index: any) => {
    setOpenSection(openSection === index ? null : index);
  };

  const faqData = [
    {
      question: "How do I get started with Raffily as a business?",
      answer:
        "Getting started is easy:\n\n1. Sign Up as a Merchant: Create a merchant account on Raffily.\n2. Set Up Your Raffle: Use our platform to create a raffle, set your prize, ticket price, and draw date.\n3. Launch & Promote: Once your raffle is live, promote it through your channels and watch as customers engage.\n4. Our team is also available to help you through the setup process and ensure you get the most out of the platform.\n\nRaffily provides all the tools to help you set up and manage your raffle, including marketing support.",
    },
    {
      question: "How does Raffily help me understand my customers better?",
      answer:
        "Raffily provides valuable insights into customer behaviour by:\n\n• Tracking participation: You’ll see how many customers enter your raffles, which products or prizes they’re most interested in, and how frequently they engage.\n• Collecting feedback: Through raffles, you can gather information about customer preferences, buying patterns, and what drives their loyalty to your brand.\n• Building engagement: By offering exciting prizes and fun experiences, you can better connect with your customers, increasing brand loyalty and repeat business.",
    },
    {
      question: "What types of raffles can my business create?",
      answer:
        "You can create a variety of raffles depending on your goals:\n\n• Product Giveaways: Promote new or popular products by offering them as prizes.\n• Exclusive Experiences: Offer unique experiences that your customers can’t get elsewhere.\n\nRaffily allows full customisation of prizes, ticket pricing, and draw dates.",
    },
    {
      question: "Can I run free ticket raffles as well as paid ticket raffles?",
      answer:
        "Yes! Free raffles are a great way to engage your audience, increase visibility and attract new customers. They are set up as a ‘no charge’ for entry into the raffle. As a result, no revenue will be generated from a Free Ticket raffle and, as such, you will receive no direct revenue once the raffle has ended.\n\nPaid Ticket Raffles: Ticket Pricing and Availability generates revenue and are determined by Raffily’s proven formula to ensure that each raffle maximises both engagement and value.",
    },
    {
      question: "How do I decide the number of tickets to offer for my raffle?",
      answer: `
Determining the right number of tickets depends on several factors:

• Value of the prize: For higher-value prizes, you might want to offer a higher number of tickets to spread out the cost.
• Audience size: If you have a large customer base, offering more tickets will allow greater participation.
• Engagement goals: If you’re running the raffle to build customer engagement, you might want to offer fewer tickets to create excitement and scarcity.
• You can set a maximum number of tickets based on your business goals. Raffily’s analytics tools can also help you track the performance of your raffle and adjust your ticket strategy for future raffles.
`
    },
    {
      question: "How should I price my raffle tickets?",
      answer: `
The price of your raffle tickets should reflect:

• The value of the prize: For example, a higher-value item could justify a higher ticket price. For smaller or lower-value prizes, you may want to keep the ticket price low to encourage more entries.
• Audience affordability: Consider your target audience’s willingness to pay. If the ticket price is too high, it may limit participation.
• Marketing goals: If your goal is brand engagement, you may want to keep the ticket price low or offer special promotions (e.g., buy 3 tickets, get 1 free).
`
    },
    {
      question: "Is there a ticket pricing formula?",
      answer: `
Yes, this formula considers various factors, including:

• The value of the prize you are offering.
• Market demand and interest in similar raffles.
• Ensuring the ticket price is attractive to participants while allowing you to reach your financial targets.

By calculating the optimal ticket price and total number of tickets, we help create a raffle that is fair, exciting, delivering the best experience for both your business and the raffle entrants. This approach ensures you have the opportunity to generate strong participation and a successful outcome.
`
    },
    {
      question: "How much does it cost to run a raffle on Raffily?",
      answer: `
There is no charge.
`
    },
    {
      question: "What types of prizes can I offer?",
      answer: `
You can offer a wide range of prizes, including:

• Products: Items from your inventory like gadgets, clothing, or food products
• Experiences: Tickets to events, travel experiences, or exclusive offers
• Gift Cards: Store credit or vouchers that winners can redeem with your business

Make sure your prize is attractive to your target audience to drive engagement.
`
    },
    {
      question: "Is there a limit to how many raffles I can run?",
      answer: `
No, you can run as many raffles as you’d like simultaneously. Raffily is designed to support businesses of all sizes, so whether you want to run one large raffle or several smaller ones, the platform can handle it.
`
    },
    {
      question: "What information do I need to be able to upload a raffle?",
      answer: `
You will need the following information:

• Images of the prize
• Your brand’s logo
• A headline of the prize
• A description of the prize
• Details of any conditions for the prize; i.e. subject to availability if the prize is an experience
• RRP (£) value of the prize
`
    },
    {
      question: "Can I limit the number of tickets a participant can buy?",
      answer: `
Yes, as a merchant, you can set limits on the number of tickets any individual can purchase. This helps ensure fairness and encourages broader participation in your raffle.
`
    },
    {
      question: "Are there any restrictions on the types of prizes I can offer?",
      answer: `
While Raffily allows for a wide variety of prizes, it’s essential to check local laws to ensure that certain high-value or restricted items (e.g., alcohol, firearms) comply with promotional regulations. Our team can assist you in designing raffles that meet legal requirements while avoiding any classification as gambling.
`
    },
    {
      question: "Can I use Raffily for charity fundraising?",
      answer: `
Yes! Raffily allows businesses to host charity raffles, where you can donate part or all of the proceeds to a charity of your choice. These raffles are a great way to engage customers while supporting a good cause.
`
    },
    {
      question: "Do I need approval from Raffily before running a raffle?",
      answer: `
Yes, before your business can start hosting raffles on Raffily, it must go through an approval process. This ensures that all merchants meet our standards and provide a safe, trustworthy experience for participants.
`
    },
    {
      question: "Why is business approval necessary?",
      answer: `
Business approval helps us maintain:

• Trust and security for our participants by ensuring that only legitimate and reliable businesses can host raffles
• Compliance with legal and regulatory requirements for running promotional raffles
• A fair experience for all users, ensuring that businesses can fulfil prize commitments and operate transparently
`
    },
    {
      question: "What is involved in the approval process?",
      answer: `
The approval process typically includes:

• Business verification: You will be asked to provide basic details about your business, such as your business name, registration details, and contact information
• Legal compliance: Depending on your location, we may require additional documentation to ensure compliance with local laws and regulations regarding raffles and promotions
• Financial and operational review: We may review your ability to deliver prizes and handle customer service to ensure you can fulfil the obligations of running a raffle
`
    },
    {
      question: "How long does the approval process take?",
      answer: `
The approval process will be done on the same day, but it may vary depending on the complexity of your business and the completeness of your submitted information. Our team will keep you updated throughout the process.
`
    },
    {
      question: "What happens once my business is approved?",
      answer: `
Once approved, you will receive a notification via email and can start creating raffles immediately on Raffily. Your merchant dashboard will be activated, allowing you to set up and manage your raffles.
`
    },
    {
      question: "What if my business is not approved?",
      answer: `
If your business is not approved, Raffily will provide feedback on why the application was declined and, where possible, outline steps you can take to meet our requirements. You can reapply once you address any issues.
`
    },
    {
      question: "How can I ensure my business gets approved?",
      answer: `
To ensure smooth approval, provide accurate and complete information when submitting your application. 

Be prepared with:

• Valid business registration details
• Proof that your business can deliver prizes and maintain a good customer experience
`
    },
    {
      question: "Is there a fee for the approval process?",
      answer: `
No, Raffily does not charge a fee for the business approval process. The approval is part of our commitment to maintaining a trusted platform for all participants.
`
    }
  ];


  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Frequently Asked Questions</h1>
      {faqData.map((item, index) => (
        <div key={index} className="mb-6">
          {/* <h2 className="text-xl font-semibold mb-4 text-gray-700">{item.question}</h2> */}
          <div
            key={index}
            className="border-b border-gray-300 bg-gray-100 rounded-md overflow-hidden mb-2"
          >
            <button
              className="w-full flex justify-between items-center py-4 px-6 bg-gray-200 hover:bg-gray-300 transition duration-200 text-left font-medium text-gray-800 rounded-md"
              onClick={() => toggleSection(index)}
            >
              <span className="flex-1">{item.question}</span>
              <span className="text-lg">
                {openSection === index ? "▲" : "▼"}
              </span>
            </button>
            {openSection === index && (
              <p className="text-gray-600 px-6 py-4 bg-gray-50 whitespace-pre-line rounded-b-md">
                {item.answer}
              </p>
            )}
          </div>
        </div>
      ))}

    </div>

  );
};

export default MerchantFaq;
