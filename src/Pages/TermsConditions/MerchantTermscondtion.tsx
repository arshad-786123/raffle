import React from "react";

const MerchantTermscondtion: React.FC = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center bg-gray-50 p-8"
      style={{ fontFamily: "poppins, sans-serif" }}
    >
      <div className="w-full max-w-screen-lg p-6">
        <h1 className="text-4xl font-modernBold text-center text-gray-700 mb-8">
          Terms and Conditions
        </h1>

        <div className="text-lg text-gray-700 space-y-6">
          <p>
            <strong>The promoter is:</strong> Raffily Limited Company Number
            [15658661] and whose registered office is at 28 Eaton Avenue,
            Buckshaw Village, Chorley, Lancashire PR7 7NA.
          </p>
          <p>
            If you wish to contact us for any reason, please email{" "}
            <a href="mailto:hello@raffily.co.uk" className="text-[#FF7385]">
              hello@raffily.co.uk
            </a>
          </p>

          <h2 className="text-2xl font-modernBold mt-6 mb-4">
            1. Agreement to Provide Prizes
          </h2>
          <p>
            <strong>1.1</strong> By agreeing to participate in an online raffle
            hosted by Raffily Limited (the “Promoter”) via the Promoter’s
            website at [www.raffily.com] (the “Website”), you, the supplier
            ("Supplier"), agree to provide the designated prize ("Prize") as
            described during the raffle setup.
          </p>
          <p>
            <strong>1.2</strong> You commit to sending the Prize directly to the
            winner within 7 days of receiving notification of the winner’s
            details, regardless of the number of raffle tickets sold. The
            delivery of the Prize is mandatory and independent of the raffle’s
            total ticket sales.
          </p>
          <p>
            <strong>1.3</strong> Failure to deliver the Prize as agreed will
            result in legal action, including potential reimbursement for any
            expenses incurred by the Promoter in resolving the issue with the
            raffle participants.
          </p>

          <h2 className="text-2xl font-modernBold mt-6 mb-4">
            2. Commission and Payment Terms
          </h2>
          <p>
            <strong>2.1</strong> The Promoter retains 25% of the total funds
            raised through ticket sales as its commission for operating and
            hosting the raffle.
          </p>
          <p>
            <strong>2.2</strong> The remaining 75% of the funds raised will be
            payable to the Retailer within 30 days of the raffle’s official end
            date.
          </p>
          <p>
            <strong>2.3</strong> Payments will be made via Bank Transfer. The
            Supplier is responsible for providing accurate payment details to
            ensure timely transactions.
          </p>
          <p>
            <strong>2.4</strong> If there are delays in sending the payment, the
            Promoter will notify the Supplier of the expected timeframe.
          </p>

          <h2 className="text-2xl font-modernBold mt-6 mb-4">
            3. Responsibilities of the Supplier
          </h2>
          <p>
            <strong>3.1</strong> The Supplier guarantees the availability and
            authenticity of the Prize as described during the raffle setup. Any
            misleading information about the Prize is grounds for termination of
            this agreement and potential legal liability.
          </p>
          <p>
            <strong>3.2</strong> The Supplier must ensure that the Prize is new,
            unused, and in proper working condition (if applicable).
          </p>
          <p>
            <strong>3.3</strong> If the prize is a service/experience, the
            Supplier must ensure that all elements of the Prize are fulfilled.
          </p>
          <p>
            <strong>3.4</strong> The Supplier agrees to bear all costs related
            to the shipping and handling of the Prize to the winner.
          </p>
          <p>
            <strong>3.5</strong> The Supplier agrees to cooperate with Promoter
            in case of any disputes or queries from the winner regarding the
            Prize.
          </p>

          <h2 className="text-2xl font-modernBold mt-6 mb-4">
            4. Winner Notification and Prize Delivery
          </h2>
          <p>
            <strong>4.1</strong> The Promoter will notify the Supplier of the
            raffle winner within 1 day of the raffle’s end.
          </p>
          <p>
            <strong>4.2</strong> The Supplier agrees to contact the winner
            directly and arrange for the delivery of the Prize. All
            communication regarding the Prize shipment and tracking details
            should be shared with both the winner and the Promoter.
          </p>
          <p>
            <strong>4.3</strong> The Retailer is required to dispatch the Prize
            to the winner within 7 days of being notified of the winner's
            details.
          </p>

          <h2 className="text-2xl font-modernBold mt-6 mb-4">
            5. Refunds and Cancellations
          </h2>
          <p>
            <strong>5.1</strong> In the unlikely event that the raffle is
            cancelled for any reason, the Promoter will notify the Supplier
            immediately. Any funds collected will be refunded to participants,
            and the Supplier will not be entitled to any portion of the
            proceeds.
          </p>
          <p>
            <strong>5.2</strong> The Supplier is not entitled to request or
            initiate a cancellation after agreeing to participate and the raffle
            has begun.
          </p>

          <h2 className="text-2xl font-modernBold mt-6 mb-4">
            6. Liability and Indemnification
          </h2>
          <p>
            <strong>6.1</strong> The Supplier assumes full responsibility for
            the Prize and its delivery. The Promoter is not liable for any
            damages, delays, or issues related to the Prize’s quality or
            shipment.
          </p>
          <p>
            <strong>6.2</strong> The Supplier agrees to indemnify and hold
            harmless the Promoter, its officers, employees, and agents from any
            claims, damages, losses, or liabilities arising from the Prize or
            its delivery.
          </p>

          <h2 className="text-2xl font-modernBold mt-6 mb-4">
            7. Termination of Agreement
          </h2>
          <p>
            <strong>7.1</strong> The Promoter reserves the right to terminate
            this agreement if the Supplier fails to deliver the Prize, violates
            these Terms and Conditions, or engages in fraudulent or unethical
            behaviour.
          </p>
          <p>
            <strong>7.2</strong> If this agreement is terminated, the Supplier
            forfeits any claim to proceeds from ticket sales.
          </p>

          <h2 className="text-2xl font-modernBold mt-6 mb-4">
            8. Dispute Resolution
          </h2>
          <p>
            <strong>8.1</strong> Any disputes arising from this agreement shall
            be resolved through negotiation between the Promoter and the
            Supplier. If a resolution cannot be reached, the matter may be
            escalated to binding arbitration, subject to the laws of England and
            Wales.
          </p>

          <h2 className="text-2xl font-modernBold mt-6 mb-4">
            9. Amendments to Terms
          </h2>
          <p>
            <strong>9.1</strong> The Promoter reserves the right to update or
            amend these Terms and Conditions at any time. Any changes will be
            communicated to the Supplier in writing, and continued participation
            in raffles will constitute acceptance of the updated terms.
          </p>

          <h2 className="text-2xl font-modernBold mt-6 mb-4">
            10. Supplier Contact and Data Protection
          </h2>
          <p className="mb-2">
            <strong>10.1</strong> <strong>Opt-In Requirement:</strong>
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>
              Suppliers and third-party retailers associated with the raffle are
              strictly prohibited from contacting entrants unless the entrant
              has expressly opted in to receive communications. Entrants will
              have the opportunity to provide their consent by ticking the
              relevant opt-in box during the registration or entry process.
            </li>
          </ul>

          <p className="mb-2">
            <strong>10.2</strong> <strong>Use of Entrant Data:</strong>
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>
              Suppliers may only use the contact information of entrants who
              have opted in for the purposes explicitly agreed to at the time of
              opt-in, such as marketing communications, prize fulfilment, or
              other agreed services.
            </li>
            <li>
              Entrant data must not be used, sold, shared, or transferred to
              third parties for any purposes beyond those consented to by the
              entrant.
            </li>
          </ul>

          <p className="mb-2">
            <strong>10.3</strong>{" "}
            <strong>Compliance with Data Protection Laws:</strong>
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>
              All suppliers and third-party retailers must comply with
              applicable data protection laws, including but not limited to the
              General Data Protection Regulation (GDPR) and the Data Protection
              Act 2018.
            </li>
            <li>
              Suppliers must ensure they have a lawful basis for processing the
              entrant's personal data, such as explicit consent, and provide
              clear, accessible information on how they will handle, store, and
              protect this data.
            </li>
          </ul>

          <p className="mb-2">
            <strong>10.4</strong> <strong>Withdrawal of Consent:</strong>
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>
              Entrants who have opted in to receive communications from
              suppliers or third-party retailers retain the right to withdraw
              their consent at any time. Suppliers must honour any requests to
              unsubscribe or opt out within a reasonable timeframe, not
              exceeding 1 day.
            </li>
          </ul>

          <p className="mb-2">
            <strong>10.5</strong> <strong>Breach of Policy:</strong>
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>
              Any breach of this clause by a supplier or third-party retailer
              may result in the termination of the supplier's involvement with
              the Promoter, and the Promoter reserves the right to take legal
              action or report the breach to relevant data protection
              authorities.
            </li>
          </ul>

          <p className="mb-4">
            <strong>11.</strong>{" "}
            <strong>Prohibited Items for Raffles on Raffily Limited</strong>
          </p>
          <ul className="mb-4">
            <li className="mb-2">
              <strong>11.1</strong> Weapons (firearms, knives, ammunition,
              explosives, or any other item(s) that could be deemed a weapon)
            </li>
            <li className="mb-2">
              <strong>11.2</strong> Pyrotechnic devices and hazardous materials
              such as fireworks, or any toxic/flammable/radioactive compounds
            </li>
            <li className="mb-2">
              <strong>11.3</strong> Pornographic material
            </li>
            <li className="mb-2">
              <strong>11.4</strong> Dating/escort services
            </li>
            <li className="mb-2">
              <strong>11.5</strong> Drugs or pharmaceutical compounds
              <ul className="list-disc list-inside ml-6">
                <li>
                  <strong>11.5.1</strong> Drug-related accessories
                </li>
                <li>
                  <strong>11.5.2</strong> Psychoactive and/or plant-based drugs
                  and any literature encouraging their use
                </li>
              </ul>
            </li>
            <li className="mb-2">
              <strong>11.6</strong> Counterfeit/imitations of goods
            </li>
            <li className="mb-2">
              <strong>11.7</strong> Copyright copies of software, videogames,
              movies, music, and other non-licensed content, such as books,
              music, and more
            </li>
            <li className="mb-2">
              <strong>11.8</strong> Animals or insects
            </li>
            <li className="mb-2">
              <strong>11.9</strong> Financial products/services
            </li>
          </ul>

          <p className="mt-8">
            By agreeing to participate in a raffle hosted by the Promoter, the
            Supplier confirms that they have read, understood, and agree to
            these Terms and Conditions. Last Updated 04 October 2024
          </p>
        </div>
      </div>
    </div>
  );
};

export default MerchantTermscondtion;
