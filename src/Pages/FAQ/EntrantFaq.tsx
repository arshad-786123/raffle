import React, { useState } from "react";
import { Link } from "react-router-dom";

const EntrantFaq = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (index: any) => {
    setOpenSection(openSection === index ? null : index);
  };

  const faqData = [
    {
      title: "Creating a Raffily Account",
      questions: [
        {
          question: "Do I need to create an account?",
          answer:
            "Yes, you must create an account with Raffily before you can enter the prize draws and be in with a chance of winning. Creating an account will allow you to view your purchase details on your dashboard.\n\nWhen you have signed-up, you will receive an email with a one-time passcode in order to verify your account. Once you have inputted your one-time passcode, you will receive an email confirming your account!",
        },
        {
          question: "What if I’ve lost my email or password?",
          answer:
            "Don’t worry! If you have lost or forgotten your password, just go to the ‘sign in’ page and then click ‘reset password’. If you’ve forgotten the email associated with your account, then please get in contact with us by sending an email to hello@raffily.co.uk and we will locate and verify your account.",
        },
      ],
    },
    {
      title: "Entering Prize Draws",
      questions: [
        {
          question: "Is there a limit to how many entries I can buy?",
          answer:
            "Some raffles may have a ticket purchase limit to ensure fairness, while others may allow unlimited tickets. Check the rules of each specific raffle for any ticket restrictions.",
        },
        {
          question: "How do I enter?",
          answer:
            "1. Sign up to Raffily on our website\n2. Browse the available raffles on our [Live Raffles] page\n3. Select the raffle you want to enter\n4. Choose how many tickets you'd like to purchase\n5. Complete the payment process securely*\n6. Once you’ve purchased your tickets, you're officially entered into the draw!**\n\n*Complete and submit the online entry form or follow the instructions on how to enter for free via postal entry. Anyone entering for free will not be told whether they have answered the question correctly and will not receive confirmation that they are entered into the draw.\n\n**When you have paid your entry fee, and if you have answered the question correctly, your name will be entered in the draw with all of the other correct entries. If you have not answered correctly, you will not be entered into the draw.",
        },
        {
          question: "Can I enter more than one raffle at a time?",
          answer:
            "Yes, you can enter as many raffles as you like at the same time. Each raffle is independent, so you can buy tickets for multiple raffles and increase your chances of winning in different categories.",
        },
        {
          question: "What is my ticket number?",
          answer:
            "Once you have entered, you will receive an email with your ticket numbers. Your ticket numbers will also appear on your Raffily dashboard.",
        },
        {
          question: "How long are the prize draws open for?",
          answer:
            "The opening and closing dates are stated on the website. If we have to change either of these dates for any reason, we will update the website accordingly.",
        },
        {
          question: "How is the winner chosen?",
          answer: (
            <>
              Winners are selected randomly using a secure algorithm that
              ensures fairness for all participants. Click{" "}
              <Link to="/how-it-work" className="text-blue-500 hover:underline">
                here
              </Link>{" "}
              for more information.
            </>
          ),
        },
        {
          question: "Can anyone enter?",
          answer:
            "The prize draws are open to residents of the United Kingdom only who are 18 years or older. You cannot enter this competition if you are a relative of any of our suppliers.\n\nWe do not accept entries from anyone outside of these areas as the laws for running competitions vary. This competition has been organised to comply with the laws of England and Wales.",
        },
        {
          question: "What if Raffily doesn't sell enough tickets?",
          answer:
            "We will always draw a winner, regardless of the number of tickets that are sold. We will also never extend the draw date, even if we've hugely undersold the raffle.",
        },
        {
          question: "What happens if I get the question wrong?",
          answer:
            "Whilst this may be disappointing, you have to remember that this is a competition and we have deliberately made the question tough to comply with the law.\n\nIf you get the question wrong, you will not be entered into the draw so you will not have the chance to win the prize. You will not be entitled to a refund of your entry fees. If you want to, you can try again.",
        },
        {
          question: "Can I try again?",
          answer:
            "You can enter the competition as many times as you wish up to any limit we specify. Your entries may be restricted if we reach the maximum number of entries.\n\nWhilst this isn’t gambling, we still urge you to keep this fun and not spend more than you can afford.",
        },
        {
          question: "Why is the question so hard?",
          answer:
            "This is not a lottery, it is a prize competition and the law says that to be in with a chance of winning, you must demonstrate your skill, knowledge or judgement.\n\nThe law says that the question should be sufficiently difficult that a significant number of people either get the answer wrong or are put off entering. However, this means that the odds of winning are actually increased for those who get the answer correct.",
        },
        {
          question: "Can I get a refund of my entry fee?",
          answer:
            "We do not offer refunds of entry fees if you get the answer to the question wrong, or if you are disqualified from the competition for any reason.",
        },
      ],
    },
    {
      title: "Winning",
      questions: [
        {
          question: "How will I know if I have won?",
          answer: (
            <>
              We will notify the winner via telephone or email within 7 days of
              the closing date of the competition. If you change any of your
              contact details prior to the closing date, you must inform us. We
              will try to contact you using the information you have supplied us
              with. If we cannot reach you within 14 days of the closing date we
              reserve the right to choose another winner and you will lose your
              right to claim the prize. Additionally, winners are announced on
              the Raffily platform, and you can check the results under the
              <Link to="/past-draws" className="text-blue-500 hover:underline">
                {" "}
                Past Draws
              </Link>{" "}
              section.
            </>
          ),
        },
        {
          question: "How is the winner decided?",
          answer:
            "Everyone who gets the answer to the question correct will be entered into a draw. The winner will then be chosen at random from all the correct entries.",
        },
        {
          question: "What are my chances of winning?",
          answer:
            "The maximum number of entries is stated on each competition so your chances of winning will vary from competition to competition. As an example, if entries are capped at a maximum of 3000, this means that if you purchase 1 entry and get the answer correct, your chances of winning will be no worse than 1 in 3,000.\n\nYou can increase your chances of winning by purchasing more entries. For example, if you purchase 10 entries in the example above and you get the answer correct, your chances of winning will be no worse than 1 in 300.\n\nWe say “no worse than” because we expect a significant number of people to get the answer to the question wrong. We cannot predict how many this will be but say 500 people got the answer wrong and they each purchased 1 entry each. Your chances of winning with a single correct entry will now improve to 1 in 2,500.",
        },
      ],
    },
    {
      title: "Prizes",
      questions: [
        {
          question: "What are the prizes?",
          answer: (
            <>
              The prizes are described fully on the website. You can find out
              more details by visiting our{" "}
              <Link to="/all-raffles" className="text-blue-500 hover:underline">
                Live Raffles
              </Link>{" "}
              page. We reserve the right to offer an alternative prize of an
              equal or higher value if the prize is unavailable for any reason.
            </>
          ),
        },
        {
          question: "Can I sell the prize if I don’t want it?",
          answer:
            "If you are the winner, the prize will be yours. You can do whatever you wish with it, including selling it.",
        },
        {
          question:
            "Do holiday and experience prizes need to be taken on specific dates?",
          answer:
            "Experience and holiday prizes may be subject to the business’s availability, so please be sure to read the description in the raffle description before entering.",
        },
        {
          question: "How do prizes get delivered?",
          answer:
            "All prizes will be sent directly to our winners within 14 days! Should the prize be too large or valuable to send by mail, we will arrange for it to be delivered personally.",
        },
        {
          question: "Can I donate my prize to charity?",
          answer:
            "If you win a prize and would like to donate it, you can do so, but you’ll need to handle the transfer or donation arrangements yourself. Raffily doesn’t facilitate prize donations but supports all charitable causes.",
        },
      ],
    },
    {
      title: "Payment",
      questions: [
        {
          question: "Are card payments secure?",
          answer:
            "We use secure, encrypted connections across our website and do not hold your card details on our servers. Our payment providers are fully PCI and ISO compliant, and we leave all of the financial processing to them. Raffily will never share any of your financial data.",
        },
        {
          question: "What payment methods are accepted?",
          answer:
            "Raffily accepts multiple payment methods, including:\n\n- Credit/Debit cards\n- PayPal\n- Apple Pay\n- Google Pay\n\nAll transactions are secure and encrypted.",
        },
        {
          question: "Can I get my tickets refunded?",
          answer:
            "Once a raffle ticket is purchased, it is generally non-refundable. Please double-check the raffle details before making your purchase. If there are any issues, feel free to reach out to our support team.",
        },
      ],
    },
    {
      title: "Your Data",
      questions: [
        {
          question: "Is my personal information secure?",
          answer:
            "Absolutely. Raffily uses encryption and secure technology to protect your personal and payment information. We comply with all relevant data protection laws, ensuring your details remain safe.",
        },
        {
          question: "How do you use my personal data?",
          answer: (
            <>
              We need to use your data to administer the competition and award
              prizes. Full details of how we use your data are included in our
              Privacy Policy which you can read here{" "}
              <Link
                to="/privacy-policy"
                className="text-blue-500 hover:underline"
              >
                Privacy Policy
              </Link>{" "}
              . If you are the winner, we may have to share your details with
              the Advertising Standards Authority to confirm that we have
              administered the competition and awarded the prizes fairly. You
              have the right to opt out from us using your data at any time.
              However, if you do ask us to remove your details from our database
              prior to the closing date, you will be withdrawing from the
              competition. You will not be entitled to a refund of any entry
              fees you have paid.
            </>
          ),
        },
        {
          question:
            "If I win, do I have to participate in promotional exercises?",
          answer: (
            <>
              No, this is not compulsory. However, with your permission, we
              would love to share your excitement on our website and social
              media pages as a member of the{" "}
              <Link to="/winners" className="text-blue-500 hover:underline">
                Raffily Winners' Club
              </Link>.
              <p>
                Even if you do not want to participate in any promotional
                exercises, we may have may have to provide your details to the
                Advertising Standards Authority to prove we have administered
                the competition and awarded the prize fairly.
              </p>
            </>
          ),
        },
        {
          question:
            "What should I do if I suspect fraud or suspicious activity?",
          answer:
            "If you notice any suspicious activity on your account, please contact Raffily’s support team immediately. We take fraud prevention seriously and will investigate any reported issues.",
        },
      ],
    },
    {
      title: "Ready to Enter?",
      questions: [
        {
          question:
            "Check out our current raffles and get your tickets today for a chance to win amazing prizes!",
          answer: (
            <Link to="/all-raffles" className="text-blue-500 hover:underline">
              See Live Raffles →
            </Link>
          ),
        },
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Frequently Asked Questions
      </h1>
      {faqData.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            {section.title}
          </h2>
          {section.questions.map((item, index) => (
            <div
              key={index}
              className="border-b border-gray-300 bg-gray-100 rounded-md overflow-hidden mb-2"
            >
              <button
                className="w-full flex justify-between items-center py-4 px-6 bg-gray-200 hover:bg-gray-300 transition duration-200 text-left font-medium text-gray-800 rounded-md"
                onClick={() => toggleSection(`${sectionIndex}-${index}`)}
              >
                <span className="flex-1">{item.question}</span>
                <span className="text-lg">
                  {openSection === `${sectionIndex}-${index}` ? "▲" : "▼"}
                </span>
              </button>
              {openSection === `${sectionIndex}-${index}` && (
                <p className="text-gray-600 px-6 py-4 bg-gray-50 whitespace-pre-line rounded-b-md">
                  {item.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default EntrantFaq;
