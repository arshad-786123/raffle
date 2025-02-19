import React from "react";

const CookiesSetting: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full h-full bg-white p-8 md:p-12 lg:p-16">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          Cookies Policy
        </h1>

        <section className="mb-8">
          <h2 className="text-2xl font-modernEraBold text-gray-700 mb-4">
            What are Cookies?
          </h2>
          <p className="text-gray-600">
            Cookies are small text files that are placed on your device
            (computer, smartphone, or other electronic devices) when you visit a
            website. They are widely used to make websites work, or work more
            efficiently, as well as to provide information to the owners of the
            site.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-modernEraBold text-gray-700 mb-4">
            Types of Cookies We Use
          </h2>
          <p className="text-gray-600 mb-4">
            We use the following types of cookies on our Website:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
            <li>
              <strong className="font-modernEraBold">Strictly Necessary Cookies:</strong> These cookies are
              essential for the operation of our Website. They enable you to
              move around the Website and use its features, such as accessing
              secure areas.
            </li>
            <li>
              <strong className="font-modernEraBold">Performance Cookies:</strong> These cookies collect
              information about how visitors use our Website, such as which
              pages are visited most often and if they receive error messages
              from web pages. These cookies do not collect information that
              identifies a visitor. All information these cookies collect is
              aggregated and therefore anonymous. It is only used to improve how
              our Website works.
            </li>
            <li>
              <strong className="font-modernEraBold">Functionality Cookies:</strong> These cookies allow our
              Website to remember choices you make (such as your username,
              language, or the region you are in) and provide enhanced, more
              personalized features. These cookies can also be used to remember
              changes you have made to text size, fonts, and other parts of web
              pages that you can customize.
            </li>
            <li>
              <strong className="font-modernEraBold">Targeting Cookies:</strong>{" "}
              These cookies are used to deliver adverts more relevant to you and
              your interests. They are also used to limit the number of times
              you see an advertisement and help measure the effectiveness of the
              advertising campaign. They are usually placed by advertising
              networks with the website operator’s permission. They remember
              that you have visited a website, and this information is shared
              with other organisations such as advertisers.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-modernEraBold text-gray-700 mb-4">
            How We Use Cookies
          </h2>

          <h2 className="text-xl text-gray-700 font-modernEraBold mb-4">
            We use cookies to:
          </h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
            <li>Ensure the Website functions properly.</li>
            <li>Improve the Website’s performance and usability.</li>
            <li>Personalise your experience on the Website.</li>
            <li>Provide social media features.</li>
            <li>Analyse our traffic.</li>
            <li>Provide you with relevant advertising.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-modernEraBold text-gray-700 mb-4">
            Your Consent
          </h2>
          <p className="text-gray-600">
            By using our Website, you agree to the use of cookies in accordance
            with this Cookies Policy. You can withdraw your consent at any time
            by deleting the cookies on your device or changing your cookie
            preferences in your browser settings.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-modernEraBold text-gray-700 mb-4">
            Managing Cookies
          </h2>
          <p className="text-gray-600 mb-4">
            Most web browsers allow you to control cookies through their
            settings preferences. However, if you choose to disable cookies, you
            may not be able to use the full functionality of our Website.
          </p>
          <p className="text-gray-600 mb-4">
            Here are links to information on managing cookies in the most
            commonly used browsers:
          </p>
          <ul className="list-disc list-inside text-blue-600 space-y-2">
            <li>Google Chrome</li>
            <li>Mozilla Firefox</li>
            <li>Apple Safari</li>
            <li>Microsoft Edge</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-modernEraBold text-gray-700 mb-4">
            Third-Party Cookies
          </h2>
          <p className="text-gray-600">
            We may use third-party services, such as Google Analytics, to
            analyse the use of our Website. These third-party service providers
            may use cookies and other technologies to collect information about
            your online activities across different websites and over time. This
            information is used to evaluate the use of our Website and to
            compile statistical reports on website activity.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-modernEraBold text-gray-700 mb-4">
            Changes to This Cookies Policy
          </h2>
          <p className="text-gray-600">
            We may update this Cookies Policy from time to time to reflect
            changes in our practices or relevant laws. When we make changes to
            this policy, we will revise the "Last updated" date at the top of
            this page. We encourage you to review this policy periodically to
            stay informed about our use of cookies and related technologies.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-modernEraBold text-gray-700 mb-4">
            Contact Us
          </h2>
          <p className="text-gray-600">
            If you have any questions about our use of cookies, please contact
            us at{" "}
            <a
              href="mailto:hello@raffily.co.uk"
              className="text-blue-500 underline"
            >
              hello@raffily.co.uk
            </a>
          </p>
          <p className="text-gray-600">
            By using the Raffily Website, you acknowledge that you have read and
            understand this Cookies Policy and that you agree to our use of
            cookies as described herein.
          </p>
        </section>
      </div>
    </div>
  );
};

export default CookiesSetting;
