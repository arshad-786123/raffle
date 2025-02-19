import React from "react";
import { Link } from "react-router-dom";

const AcceptableUsePolicy: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-7xl rounded-lg p-8 md:p-12 lg:p-16">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center font-modernEraBold">
          Acceptable Use Policy
        </h1>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4 font-modernEraBold">
            About Us
          </h2>
          <p className="text-gray-600 mb-4">
            This acceptable use policy sets out the terms between you and us
            under which you may access our website{" "}
            <Link to="/acceptable-use" className="text-blue-500 underline">
              [www.raffily.com/acceptable-use]{" "}
            </Link>
            (our site). This acceptable use policy applies to all users of, and
            visitors to, our site.
          </p>
          <p className="text-gray-600 mb-4">
            Your use of our site means that you accept, and agree to abide by,
            all the policies in this acceptable use policy, which supplement our
            terms of website use{" "}
            <Link to="/terms-of-use" className="text-blue-500 underline">
              [www.raffily.com/terms-of-use]
            </Link>{" "}
            .
          </p>
          <p className="text-gray-600 mb-4">
            Our site is operated by <strong>Raffily Ltd</strong> ("We"). We are
            registered in England and Wales under company number{" "}
            <strong>15658661</strong> and have our registered office at{" "}
            <strong>
              Raffily Prize Draws, PO Box 1457 FY1 9TJ
            </strong>
            .
          </p>
          <p className="text-gray-600">
            To contact us, please email{" "}
            <a
              href="mailto:hello@raffily.co.uk"
              className="text-blue-500 underline"
            >
              hello@raffily.co.uk
            </a>
            .
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4 font-modernEraBold">
            Prohibited Uses
          </h2>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            You may use our site only for lawful purposes. You may not use our
            site:
          </h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>
              In any way that breaches any applicable local, national or
              international law or regulation.
            </li>
            <li>
              In any way that is unlawful or fraudulent, or has any unlawful or
              fraudulent purpose or effect.
            </li>
            <li>
              For the purpose of harming or attempting to harm minors in any
              way.
            </li>
            <li>
              To send, knowingly receive, upload, download, use or re-use any
              material which does not comply with our content standards as set
              out below.
            </li>
            <li>
              To transmit, or procure the sending of, any unsolicited or
              unauthorised advertising or promotional material or any other form
              of similar solicitation (spam).
            </li>
            <li>
              To knowingly transmit any data, send or upload any material that
              contains viruses, Trojan horses, worms, time-bombs, keystroke
              loggers, spyware, adware or any other harmful programs or similar
              computer code designed to adversely affect the operation of any
              computer software or hardware.
            </li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            You also agree:
          </h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>
              Not to reproduce, duplicate, copy or re-sell any part of our site
              in contravention of the provisions of our terms of website use{" "}
              <Link to="/terms-of-use" className="text-blue-500 underline">
                [www.raffily.com/terms-of-use]
              </Link>{" "}
              .
            </li>
            <li>
              Not to access without authority, interfere with, damage or
              disrupt:
            </li>
            <li>any part of our site;</li>
            <li>any equipment or network on which our site is stored;</li>
            <li>any software used in the provision of our site; or</li>
            <li>
              any equipment or network or software owned or used by any third
              party.
            </li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4 font-modernEraBold">
            Interactive Services
          </h2>
          <p className="text-gray-600 mb-4">
            We may from time to time provide interactive services on our site,
            for example, the ability to participate in games, competitions,
            comment on blog posts or post to our social media accounts
            (interactive services).
          </p>
          <p className="text-gray-600 mb-4">
            Where we do provide any interactive service, we will provide clear
            information to you about the kind of service offered, if it is
            moderated and what form of moderation is used (including whether it
            is human or technical).
          </p>
          <p className="text-gray-600 mb-4">
            We will do our best to assess any possible risks for users (and in
            particular, for children) from third parties when they use any
            interactive service provided on our site, and we will decide in each
            case whether it is appropriate to use moderation of the relevant
            service (including what kind of moderation to use) in the light of
            those risks. However, we are under no obligation to oversee, monitor
            or moderate any interactive service we provide on our site, and we
            expressly exclude our liability for any loss or damage arising from
            the use of any interactive service by a user in contravention of our
            content standards, whether the service is moderated or not.
          </p>
          <p className="text-gray-600 mb-4">
            The use of any of our interactive services by a minor is subject to
            the consent of their parent or guardian. We advise parents who
            permit their children to use an interactive service that it is
            important that they communicate with their children about their
            safety online, as moderation is not fool proof. Minors who are using
            any interactive service should be made aware of the potential risks
            to them.
          </p>
          <p className="text-gray-600">
            Where we do moderate an interactive service, we will normally
            provide you with a means of contacting the moderator, should a
            concern or difficulty arise.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-modernEraBold text-gray-700 mb-4">
            Content Standards
          </h2>
          <p className="text-gray-600 mb-4">
            These content standards apply to any and all material which you
            contribute to our site (contributions), and to any interactive
            services associated with it.
          </p>
          <p className="text-gray-600 mb-4">
            You must comply with the spirit and the letter of the following
            standards. The standards apply to each part of any contribution as
            well as to its whole.
          </p>
          <p className="text-gray-600 mb-4 font-modernEraBold">
            Contributions must:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
            <li>Be accurate (where they state facts).</li>
            <li>Be genuinely held (where they state opinions).</li>
            <li>
              Comply with applicable law in the UK and in any country from which
              they are posted.
            </li>
          </ul>
          <p className="text-gray-600 font-modernEraBold mb-4">
            Contributions must not:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
            <li>Contain any material which is defamatory of any person.</li>
            <li>
              Contain any material which is obscene, offensive, hateful or
              inflammatory.
            </li>
            <li>Promote sexually explicit material.</li>
            <li>Promote violence.</li>
            <li>
              Promote discrimination based on race, sex, religion, nationality,
              disability, sexual orientation or age.
            </li>
            <li>
              Infringe any copyright, database right or trademark of any other
              person.
            </li>
            <li>Be likely to deceive any person.</li>
            <li>
              Be made in breach of any legal duty owed to a third party, such as
              a contractual duty or a duty of confidence.
            </li>
            <li>Promote any illegal activity.</li>
            <li>
              Be threatening, abuse or invade another’s privacy, or cause
              annoyance, inconvenience or needless anxiety.
            </li>
            <li>
              Be likely to harass, upset, embarrass, alarm or annoy any other
              person.
            </li>
            <li>
              Be used to impersonate any person, or to misrepresent your
              identity or affiliation with any person.
            </li>
            <li>
              Give the impression that they emanate from us, if this is not the
              case.
            </li>
            <li>
              Advocate, promote or assist any unlawful act such as (by way of
              example only) copyright infringement or computer misuse.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-modernEraBold text-gray-700 mb-4">
            Suspension and Termination
          </h2>
          <p className="text-gray-600 mb-4">
            We will determine, in our discretion, whether there has been a
            breach of this acceptable use policy through your use of our site.
            When a breach of this policy has occurred, we may take such action
            as we deem appropriate.
          </p>
          <p className="text-gray-600 mb-4">
            Failure to comply with this acceptable use policy constitutes a
            material breach of the terms of use{" "}
            <Link to="/terms-of-use" className="text-blue-500 underline">
              [www.raffily.com/terms-of-use]
            </Link>{" "}
            upon which you are permitted to use our site, and may result in our
            taking all or any of the following actions:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
            <li>
              Immediate, temporary or permanent withdrawal of your right to use
              our site.
            </li>
            <li>
              Immediate, temporary or permanent removal of any posting or
              material uploaded by you to our site.
            </li>
            <li>Issue of a warning to you.</li>
            <li>
              Legal proceedings against you for reimbursement of all costs on an
              indemnity basis (including, but not limited to, reasonable
              administrative and legal costs) resulting from the breach.
            </li>
            <li>Further legal action against you.</li>
            <li>
              Disclosure of such information to law enforcement authorities as
              we reasonably feel is necessary.
            </li>
          </ul>
          <p className="text-gray-600">
            We exclude liability for actions taken in response to breaches of
            this acceptable use policy. The responses described in this policy
            are not limited, and we may take any other action we reasonably deem
            appropriate.
          </p>
        </section>

        {/* Changes to the Acceptable Use Policy Section */}
        <section>
          <h2 className="text-2xl font-modernEraBold text-gray-700 mb-4">
            Changes to the Acceptable Use Policy
          </h2>
          <p className="text-gray-600">
            We may revise this acceptable use policy at any time by amending
            this page. You are expected to check this page from time to time to
            take notice of any changes we make, as they are legally binding on
            you. Some of the provisions contained in this acceptable use policy
            may also be superseded by provisions or notices published elsewhere
            on our site.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AcceptableUsePolicy;
