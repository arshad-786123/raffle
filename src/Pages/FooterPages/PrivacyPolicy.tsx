// import React, { useEffect, useState } from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import AdminSidebar from '../../Components/Navbar/AdminSidebar';
// import { API_INSTANCE } from '../../API/Instance';
// import { API_ENDPOINTS } from '../../constants';
// import toast, { Toaster } from 'react-hot-toast';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { successToast } from '../../Utils/Toast/success.toast';
// import { errorToast } from '../../Utils/Toast/error.toast';
// import 'react-quill/dist/quill.snow.css';
// import ReactQuill from 'react-quill';
// import OwnerSidebar from '../../Components/Navbar/OwnerSidebar';

// interface TermsConditionsData {
//     _id?: string;
//     isActive1: boolean;
//     link1: string;
//     description1: string;
//     isActive2: boolean;
//     link2: string;
//     // description2: string;
//     descriptionPrivacy: string;
//     descriptionLegalInfo: string;
//     descriptionHelp: string;
//     descriptionTerms: string;
//     descriptionAcceptableUse: string;
//     descriptionCookies: string;
// }

// const PrivacyPolicy = () => {

//     const [termsData, setTermsData] = useState<TermsConditionsData | null>(null);

//     useEffect(() => {
//         const fetchTermsData = async () => {
//             try {
//                 const response = await API_INSTANCE.get(API_ENDPOINTS.GET_TERMS_CONDITIONS);

//                 if (response.data) {

//                     setTermsData(response.data);
//                 }
//             } catch (error) {
//                 console.error('Error fetching terms and conditions:', error);
//             }
//         };
//         fetchTermsData();
//     }, []);

//     return (
//         <div className='flex footer-manage'>
//             <Toaster position="top-right" />
//             <div className='w-[100%] lg:w-[95%] mx-auto p-3 lg:p-10 duration-500'>
//                 <div className='w-[100%] lg:w-[100%] m-auto  mt-4 p-4 rounded-md'>
//                     <div className='w-[100%] m-auto'>
//                         <div className='rounded-md'>

//                             <div className='w-[100%] mt-4'>

//                                 <div className='grid lg:flex items-center justify-between'>
//                                     <h2 className='font-bold' style={{ fontSize: "26px" }}> Privacy Policy</h2>

//                                 </div>
//                                 <p className='font-[400] mt-4' dangerouslySetInnerHTML={{ __html: termsData?.descriptionPrivacy }} />
//                             </div>

//                             <br />
//                             <div className='h-[1px] bg-gray-400'></div>
//                             <br />

//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default PrivacyPolicy;
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import AdminSidebar from "../../Components/Navbar/AdminSidebar";
import { API_INSTANCE } from "../../API/Instance";
import { API_ENDPOINTS } from "../../constants";
import toast, { Toaster } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { successToast } from "../../Utils/Toast/success.toast";
import { errorToast } from "../../Utils/Toast/error.toast";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import OwnerSidebar from "../../Components/Navbar/OwnerSidebar";

interface TermsConditionsData {
  _id?: string;
  isActive1: boolean;
  link1: string;
  description1: string;
  isActive2: boolean;
  link2: string;
  // description2: string;
  descriptionPrivacy: string;
  descriptionLegalInfo: string;
  descriptionHelp: string;
  descriptionTerms: string;
  descriptionAcceptableUse: string;
  descriptionCookies: string;
}

const PrivacyPolicy = () => {
  const [termsData, setTermsData] = useState<TermsConditionsData | null>(null);

  useEffect(() => {
    const fetchTermsData = async () => {
      try {
        const response = await API_INSTANCE.get(
          API_ENDPOINTS.GET_TERMS_CONDITIONS
        );

        if (response.data) {
          setTermsData(response.data);
        }
      } catch (error) {
        console.error("Error fetching terms and conditions:", error);
      }
    };
    fetchTermsData();
  }, []);

  return (
    <div className="flex footer-manage">
      <Toaster position="top-right" />
      <div className="w-[100%] lg:w-[95%] mx-auto p-3 lg:p-10 duration-500">
        <div className="w-[100%] lg:w-[100%] m-auto  mt-4 p-4 rounded-md">
          <div className="w-[100%] m-auto">
            <div className="rounded-md">
              <div className="w-[100%] mt-4">
                <div className="grid lg:flex items-center justify-between">
                  <h2 className="font-modernBold" style={{ fontSize: "26px" }}>
                    {" "}
                    Privacy Policy
                  </h2>
                </div>
                <div className="footer-pages">
                  <>
                    <p className="mt-3">
                      <b>
                        <span style={{ fontSize: "12pt" }}>Introduction</span>
                      </b>
                    </p>
                    <p>
                      <span style={{ fontSize: "12pt" }}>&nbsp;</span>
                    </p>
                    <p>
                      <span style={{ fontSize: "12pt" }}>
                        Welcome to Raffily's privacy policy
                      </span>
                    </p>
                    <p>
                      <span style={{ fontSize: "12pt" }}>&nbsp;</span>
                    </p>
                    <p>
                      <span style={{ fontSize: "12pt" }}>
                        Raffily respects your privacy and is committed to
                        protecting your personal data. This privacy policy will
                        inform you as to how we process and look after your
                        personal data when you visit our website (regardless of
                        where you visit it from).
                      </span>
                    </p>
                    <p className="mt-3">
                      <span style={{ fontSize: "12pt" }}>
                        It also tells you about your privacy rights and how the
                        law protects you.
                      </span>
                    </p>
                    {/* <p className="mt-3">
                        <span style={{ fontSize: "12pt" }}>
                          You can download a pdf version of the policy here:
                          [www.raffily.co.uk/privacy-policy].
                        </span>
                      </p>
                      <p className="mt-3">
                        <span style={{ fontSize: "12pt" }}>
                          Please also use the Glossary to understand the meaning
                          of some of the terms used in this privacy policy.
                        </span>
                      </p> */}
                    <p>
                      <span style={{ fontSize: "12pt" }}>&nbsp;</span>
                    </p>
                    <p>
                      <b>
                        <span
                          style={{ fontSize: "12pt" }}
                          className="font-modernBold"
                        >
                          Important information and who we are Purpose of this
                          privacy policy
                        </span>
                      </b>
                    </p>
                    <p>
                      <span style={{ fontSize: "12pt" }}>
                        This privacy policy aims to give you information on how
                        Raffily collects and processes your personal data
                        through your use of this website, including any data you
                        may provide through this website when you sign up to our
                        newsletter, purchase any products or services or take
                        part in a prize draw or competition.
                      </span>
                    </p>
                    <p className="mt-3">
                      <span style={{ fontSize: "12pt" }}>
                        This website is not intended for children and we do not
                        knowingly collect data relating to children.
                      </span>
                    </p>
                    <p className="mt-3">
                      <span style={{ fontSize: "12pt" }}>
                        It is important that you read this privacy policy
                        together with any other privacy policy or fair
                        processing policy we may provide on specific occasions
                        when we are collecting or processing personal data about
                        you so that you are fully aware of how and why we are
                        using your data. This privacy policy supplements other
                        notices and privacy policies and is not intended to
                        override them.
                      </span>
                    </p>
                    <p>
                      <span style={{ fontSize: "12pt" }}>&nbsp;</span>
                    </p>
                    <p>
                      <b>
                        <span
                          style={{ fontSize: "12pt" }}
                          className="font-modernBold"
                        >
                          Controller
                        </span>
                      </b>
                    </p>
                    <p>
                      <span style={{ fontSize: "12pt" }}>
                        Raffily Ltd is the controller and responsible for your
                        personal data (collectively referred to as Raffily in
                        this privacy policy).
                      </span>
                    </p>
                    <p className="mt-3">
                      <span style={{ fontSize: "12pt" }}>
                        We have appointed a data privacy manager who is
                        responsible for overseeing questions in relation to this
                        privacy policy. If you have any questions about this
                        privacy policy, including any requests to exercise your
                        legal rights, please contact the data privacy manager
                        using the details set out below.
                      </span>
                    </p>
                    <p>
                      <span style={{ fontSize: "12pt" }}>&nbsp;</span>
                    </p>
                    <p>
                      <b>
                        <span
                          style={{ fontSize: "12pt" }}
                          className="font-modernBold"
                        >
                          Contact details
                        </span>
                      </b>
                    </p>
                    <p>
                      <span style={{ fontSize: "12pt" }}>
                        If you have any questions about this privacy policy or
                        our privacy practices, please contact our data privacy
                        manager in the following ways:
                      </span>
                    </p>
                    <p className="mt-3">
                      <span style={{ fontSize: "12pt" }}>
                        Full name of legal entity: RAFFILY LTD
                      </span>
                    </p>
                    <p className="mt-3">
                      <span style={{ fontSize: "12pt" }}>
                        Name of data privacy manager: Debbie Waterman
                      </span>
                    </p>
                    <p className="mt-3">
                      <span style={{ fontSize: "12pt" }}>
                        Email address: hello@raffily.co.uk
                      </span>
                    </p>
                    <p className="mt-3">
                      <span style={{ fontSize: "12pt" }}>
                        Postal address: 28 Eaton Avenue, Buckshaw Village,
                        Chorley, Lancashire PR7 7NA
                      </span>
                    </p>

                    <p className="mt-3">
                      <span style={{ fontSize: "12pt" }}>
                        You have the right to make a complaint at any time to
                        the Information Commissioner's Office (ICO), the UK
                        supervisory authority for data protection issues
                        (www.ico.org.uk). We would, however, appreciate the
                        chance to deal with your concerns before you approach
                        the ICO so please contact us in the first instance.
                      </span>
                    </p>
                    <p>
                      <span style={{ fontSize: "12pt" }}>&nbsp;</span>
                    </p>
                    <p>
                      <b>
                        <span style={{ fontSize: "12pt" }}>
                          Changes to the privacy policy and your duty to inform
                          us of changes
                        </span>
                      </b>
                    </p>
                    <p>
                      <span style={{ fontSize: "12pt" }}>
                        We keep our privacy policy under regular review. This
                        version was last updated on 06/01/2025.
                      </span>
                    </p>
                    <p className="mt-3">
                      <span style={{ fontSize: "12pt" }}>
                        It is important that the personal data we hold about you
                        is accurate and current. Please keep us informed if your
                        personal data changes during your relationship with us.
                      </span>
                    </p>
                    <p>
                      <span style={{ fontSize: "12pt" }}>&nbsp;</span>
                    </p>
                    <p>
                      <b>
                        <span style={{ fontSize: "12pt" }}>
                          Third-party links
                        </span>
                      </b>
                    </p>
                    <p>
                      <span style={{ fontSize: "12pt" }}>
                        This website may include links to third-party websites,
                        plug-ins and applications. Clicking on those links or
                        enabling those connections may allow third parties to
                        collect or share data about you. We do not control these
                        third-party websites and are not responsible for their
                        privacy statements. When you leave our website, we
                        encourage you to read the privacy policy of every
                        website you visit.
                      </span>
                    </p>
                    <p>
                      <span style={{ fontSize: "12pt" }}>&nbsp;</span>
                    </p>
                    <p>
                      <b>
                        <span style={{ fontSize: "12pt" }}>
                          The data we collect about you
                        </span>
                      </b>
                    </p>
                    <p>
                      <span style={{ fontSize: "12pt" }}>
                        Personal data, or personal information, means any
                        information about an individual from which that person
                        can be identified. It does not include data where the
                        identity has been removed (anonymous data).
                      </span>
                    </p>
                    <p className="mt-3">
                      <span style={{ fontSize: "12pt" }}>
                        We may collect, use, store and transfer different kinds
                        of personal data about you which we have grouped
                        together as follows:
                      </span>
                    </p>

                    <p className="mt-3">
                      <span style={{ fontSize: "12pt", fontWeight: "bold" }}>
                        Identity Data
                      </span>
                      <span style={{ fontSize: "12pt" }}>
                        &nbsp;includes first name, maiden name, last name,
                        username or similar identifier, title.
                      </span>
                    </p>

                    <p className="mt-3">
                      <b>
                        <span style={{ fontSize: "12pt" }}>Contact Data</span>
                      </b>
                      <span style={{ fontSize: "12pt" }}>
                        &nbsp;includes billing address, delivery address, email
                        address and telephone numbers.
                      </span>
                    </p>
                    {/* <p className="mt-3">
                        <b>
                          <span style={{ fontSize: "12pt" }}>
                            Financial Data
                          </span>
                        </b>
                        <span style={{ fontSize: "12pt" }}>
                          &nbsp;includes [bank account and payment card
                          details].
                        </span>
                      </p> */}
                    <p className="mt-3">
                      <b>
                        <span style={{ fontSize: "12pt" }}>
                          Transaction Data
                        </span>
                      </b>
                      <span style={{ fontSize: "12pt" }}>
                        &nbsp;includes details about payments to and from you
                        and other details of products and services you have
                        purchased from us.
                      </span>
                    </p>
                    <p className="mt-3">
                      <b>
                        <span style={{ fontSize: "12pt" }}>Technical Data</span>
                      </b>
                      <span style={{ fontSize: "12pt" }}>
                        &nbsp;includes internet protocol (IP) address, your
                        login data, browser type and version, time zone setting
                        and location, browser plug-in types and versions,
                        operating system and platform, and other technology on
                        the devices you use to access this website.
                      </span>
                    </p>
                    <p className="mt-3">
                      <b>
                        <span
                          className="font-bold"
                          style={{ fontSize: "12pt" }}
                        >
                          Profile Data
                        </span>
                      </b>
                      <span style={{ fontSize: "12pt" }}>
                        &nbsp;includes your username and password, purchases or
                        orders made by you, your interests, preferences,
                        feedback and survey responses.
                      </span>
                    </p>
                    <p className="mt-3">
                      <b>
                        <span style={{ fontSize: "12pt" }}>Usage Data</span>
                      </b>
                      <span style={{ fontSize: "12pt" }}>
                        &nbsp;includes information about how you use our
                        website, products and services.
                      </span>
                    </p>
                    <p className="mt-3">
                      <b>
                        <span style={{ fontSize: "12pt" }}>
                          Marketing and Communications Data
                        </span>
                      </b>
                      <span style={{ fontSize: "12pt" }}>
                        &nbsp;includes your preferences in receiving marketing
                        from us and our third parties and your communication
                        preferences
                      </span>
                    </p>
                    <p>
                      <span style={{ fontSize: "12pt" }}>&nbsp;</span>
                    </p>
                    <p>
                      <span style={{ fontSize: "12pt" }}>
                        We also collect, use and share&nbsp;
                      </span>
                      <b>
                        <span style={{ fontSize: "12pt" }}>
                          Aggregated Data
                        </span>
                      </b>
                      <span style={{ fontSize: "12pt" }}>
                        &nbsp;such as statistical or demographic data for any
                        purpose. Aggregated Data could be derived from your
                        personal data but is not considered personal data in law
                        as this data will not directly or indirectly reveal your
                        identity. For example, we may aggregate your Usage Data
                        to calculate the percentage of users accessing a
                        specific website feature. However, if we combine or
                        connect Aggregated Data with your personal data so that
                        it can directly or indirectly identify you, we treat the
                        combined data as personal data which will be used in
                        accordance with this privacy policy.
                      </span>
                    </p>
                    <p className="mt-3">
                      <span style={{ fontSize: "12pt" }}>
                        We do not collect any&nbsp;
                      </span>
                      <b>
                        <span style={{ fontSize: "12pt" }}>
                          Special Categories of Personal Data
                        </span>
                      </b>
                      <span style={{ fontSize: "12pt" }}>
                        &nbsp;about you (this includes details about your race
                        or ethnicity, religious or philosophical beliefs, sex
                        life, sexual orientation, political opinions, trade
                        union membership, information about your health, and
                        genetic and biometric data). Nor do we collect any
                        information about criminal convictions and offences.
                      </span>
                    </p>
                    <p>
                      <span style={{ fontSize: "12pt" }}>
                        We may collect the minimum amount of personal data to
                        enable you to enter into any prize draw and competition
                        and allow us to run the promotion. If you are a winner,
                        it may be necessary to collect more detailed information
                        from you in order to award your prize to you. You will
                        be notified of this at the time we notify you if you
                        have won.
                      </span>
                    </p>
                    <p>
                      <span style={{ fontSize: "12pt" }}>&nbsp;</span>
                    </p>
                    <p>
                      <b>
                        <span style={{ fontSize: "12pt" }}>
                          If you fail to provide personal data
                        </span>
                      </b>
                    </p>
                    <p>
                      <span style={{ fontSize: "12pt" }}>
                        Where we need to collect personal data by law, or under
                        the terms of a contract we have with you, and you fail
                        to provide that data when requested, we may not be able
                        to perform the contract we have or are trying to enter
                        into with
                      </span>
                    </p>
                    <p className="mt-3">
                      <span style={{ fontSize: "12pt" }}>
                        you (for example, to provide you with goods or services
                        or to enter you into a competition). In this case, we
                        may have to cancel a product or service you have with us
                        or refuse your entry to a competition. We will notify
                        you if this is the case at the time.
                      </span>
                    </p>
                    <p>
                      <span style={{ fontSize: "12pt" }}>&nbsp;</span>
                    </p>
                    <p>
                      <b>
                        <span style={{ fontSize: "12pt" }}>
                          How is your personal data collected?
                        </span>
                      </b>
                    </p>
                    <p>
                      <span style={{ fontSize: "12pt" }}>
                        We use different methods to collect data from and about
                        you including through:
                      </span>
                    </p>
                    <p className="mt-3">
                      <b>
                        <span style={{ fontSize: "12pt" }}>
                          Direct interactions.
                        </span>
                      </b>
                      <span style={{ fontSize: "12pt" }}>
                        &nbsp;You may give us your Identity, Contact and
                        Financial Data by filling in forms or by corresponding
                        with us by post, phone, email or otherwise. This
                        includes personal data you provide when you:
                      </span>
                    </p>
                    <ul className="mt-3 text-[12pt] space-y-2 list-disc pl-5">
                      <li>create an account on our website;</li>
                      <li>subscribe to our service;</li>
                      <li>request marketing to be sent to you;</li>
                      <li>enter a competition, promotion or survey; or</li>
                      <li>give us feedback or contact us.</li>
                    </ul>
                    <div className="mt-3 text-[12pt]">
                      <p>
                        <span className="font-bold">
                          Automated technologies or interactions.
                        </span>{" "}
                        As you interact with our website, we will automatically
                        collect Technical Data about your equipment, browsing
                        actions and patterns. We collect this personal data by
                        using cookies and other similar technologies. Please see
                        our{" "}
                        <Link
                          to="/cookies"
                          className="text-blue-600 hover:text-blue-800 underline"
                        >
                          cookie policy
                        </Link>{" "}
                        for further details.
                      </p>
                    </div>
                    <p>
                      <b>
                        <span style={{ fontSize: "12pt" }}>
                          Third parties or publicly available sources.
                        </span>
                      </b>
                      <span style={{ fontSize: "12pt" }}>
                        &nbsp;We will receive personal data about you from
                        various third parties [and public sources] as set out
                        below :
                      </span>
                    </p>
                    <ul className="mt-3 text-[12pt] space-y-2 list-disc pl-5">
                      <li>Technical Data from the following parties:</li>
                      <li>
                        analytics providers such as Google based outside the UK;
                        advertising networks; and,
                      </li>
                      <li>
                        Contact, Financial and Transaction Data from providers
                        of technical, payment and delivery services.
                      </li>
                      <li>
                        Identity and Contact Data from data brokers or
                        aggregators.
                      </li>
                      <li>
                        Identity and Contact Data from publicly available
                        sources.
                      </li>
                    </ul>
                    <p>
                      <span style={{ fontSize: "12pt" }}>&nbsp;</span>
                    </p>
                    <p>
                      <b>
                        <span style={{ fontSize: "12pt" }}>
                          How we use your personal data
                        </span>
                      </b>
                    </p>
                    <p>
                      <span style={{ fontSize: "12pt" }}>
                        We will only use your personal data when the law allows
                        us to. Most commonly, we will use your personal data in
                        the following circumstances:
                      </span>
                    </p>
                    <p className="mt-3">
                      <span style={{ fontSize: "12pt" }}>
                        Where we need to perform the contract we are about to
                        enter into or have entered into with you. (A legally
                        binding contract is formed between us when you purchase
                        goods or services from us or you enter into a
                        competition.)
                      </span>
                    </p>
                    <p className="mt-3">
                      <span style={{ fontSize: "12pt" }}>
                        Where it is necessary for our legitimate interests (or
                        those of a third party) and your interests and
                        fundamental rights do not override those interests.
                      </span>
                    </p>
                    <p className="mt-3">
                      <span style={{ fontSize: "12pt" }}>
                        Where we need to comply with a legal obligation.
                      </span>
                    </p>
                    <p className="mt-3">
                      <span style={{ fontSize: "12pt" }}>
                        To find out more about the types of lawful basis that we
                        will rely on to process your personal data, please see
                        the Glossary below.
                      </span>
                    </p>
                    <p className="mt-3">
                      <span style={{ fontSize: "12pt" }}>
                        Generally, we do not rely on consent as a legal basis
                        for processing your personal data although we will get
                        your consent before sending third party direct marketing
                        communications to you via email or text message. You
                        have the right to withdraw consent to marketing at any
                        time by contacting us.
                      </span>
                    </p>
                    <p>
                      <span style={{ fontSize: "12pt" }}>&nbsp;</span>
                    </p>
                    <p>
                      <b>
                        <span style={{ fontSize: "12pt" }}>
                          Purposes for which we will use your personal data
                        </span>
                      </b>
                    </p>
                    <p>
                      <span style={{ fontSize: "12pt" }}>
                        We have set out below, in a table format, a description
                        of all the ways we plan to use your personal data, and
                        which of the legal bases we rely on to do so. We have
                        also identified what our legitimate interests are where
                        appropriate.
                      </span>
                    </p>
                    <p className="mt-3">
                      <span style={{ fontSize: "12pt" }}>
                        Note that we may process your personal data for more
                        than one lawful ground depending on the specific purpose
                        for which we are using your data. Please contact us if
                        you need details about the specific legal ground we are
                        relying on to process your personal data where more than
                        one ground has been set out in the table below.
                      </span>
                    </p>
                    <p>
                      <span style={{ fontSize: "12pt" }}>&nbsp;</span>
                    </p>
                    <p>
                      <br />
                    </p>
                    <div style={{ overflowX: "auto" }}>
                      <table className="privacy-table" border={1}>
                        <tbody>
                          <tr>
                            <td>
                              <p>
                                <span style={{ fontWeight: "400" }}>
                                  Purpose/Activity
                                </span>
                              </p>
                            </td>
                            <td>
                              <p>
                                <span style={{ fontWeight: "400" }}>
                                  Type of data
                                </span>
                              </p>
                            </td>
                            <td>
                              <p>
                                <span style={{ fontWeight: "400" }}>
                                  Lawful basis for processing including basis of
                                  legitimate interest
                                </span>
                              </p>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <p>
                                <span style={{ fontWeight: "400" }}>
                                  To register you as a new customer
                                </span>
                              </p>
                            </td>
                            <td>
                              <p>
                                <span style={{ fontWeight: "400" }}>
                                  (a) Identity&nbsp;
                                </span>
                              </p>
                              <p>
                                <span style={{ fontWeight: "400" }}>
                                  (b) Contact
                                </span>
                              </p>
                            </td>
                            <td>
                              <p>
                                <span style={{ fontWeight: "400" }}>
                                  Performance of a contract with you
                                </span>
                              </p>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <p>
                                <span style={{ fontWeight: "400" }}>
                                  To process and deliver your order including:
                                </span>
                              </p>
                              <p>
                                <span style={{ fontWeight: "400" }}>
                                  (a) Manage payments, fees and charges
                                </span>
                              </p>
                              <p>
                                <span style={{ fontWeight: "400" }}>
                                  (b) Collect and recover money owed to us
                                </span>
                              </p>
                            </td>
                            <td>
                              <p>
                                <span style={{ fontWeight: "400" }}>
                                  (a) Identity&nbsp;
                                </span>
                              </p>
                              <p>
                                <span style={{ fontWeight: "400" }}>
                                  (b) Contact&nbsp;
                                </span>
                              </p>
                              <p>
                                <span style={{ fontWeight: "400" }}>
                                  (c) Financial&nbsp;
                                </span>
                              </p>
                              <p>
                                <span style={{ fontWeight: "400" }}>
                                  (d) Transaction&nbsp;
                                </span>
                              </p>
                              <p>
                                <span style={{ fontWeight: "400" }}>
                                  (e) Marketing and Communications
                                </span>
                              </p>
                            </td>
                            <td>
                              <p>
                                <span style={{ fontWeight: "400" }}>
                                  (a) Performance of a contract with you&nbsp;
                                </span>
                              </p>
                              <p>
                                <span style={{ fontWeight: "400" }}>
                                  (b) Necessary for our legitimate interests (to
                                  recover debts due to us)
                                </span>
                              </p>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <p>
                                <span style={{ fontWeight: "400" }}>
                                  To manage our relationship with you which will
                                  include:
                                </span>
                              </p>
                              <p>
                                <span style={{ fontWeight: "400" }}>
                                  (a) Notifying you about changes to our terms
                                  or privacy policy
                                </span>
                              </p>
                              <p>
                                <span style={{ fontWeight: "400" }}>
                                  (b) Asking you to leave a review or take a
                                  survey
                                </span>
                              </p>
                            </td>
                            <td>
                              <p>
                                <span style={{ fontWeight: "400" }}>
                                  (a) Identity&nbsp;
                                </span>
                              </p>
                              <p>
                                <span style={{ fontWeight: "400" }}>
                                  (b) Contact&nbsp;
                                </span>
                              </p>
                              <p>
                                <span style={{ fontWeight: "400" }}>
                                  (c) Profile&nbsp;
                                </span>
                              </p>
                              <p>
                                <span style={{ fontWeight: "400" }}>
                                  (d) Marketing and Communications
                                </span>
                              </p>
                            </td>
                            <td>
                              <p>
                                <span style={{ fontWeight: "400" }}>
                                  (a) Performance of a contract with you&nbsp;
                                </span>
                              </p>
                              <p>
                                <span style={{ fontWeight: "400" }}>
                                  (b) Necessary to comply with a legal
                                  obligation
                                </span>
                              </p>
                              <p>
                                <span style={{ fontWeight: "400" }}>
                                  (c) Necessary for our legitimate interests (to
                                  keep our records updated and to study how
                                  customers use our products/services)
                                </span>
                              </p>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <p>
                                <span style={{ fontWeight: "400" }}>
                                  To enable you to partake in a prize draw,
                                  competition or complete a survey
                                </span>
                              </p>
                            </td>
                            <td>
                              <p>
                                <span style={{ fontWeight: "400" }}>
                                  (a) Identity&nbsp;
                                </span>
                              </p>
                              <p>
                                <span style={{ fontWeight: "400" }}>
                                  (b) Contact&nbsp;
                                </span>
                              </p>
                              <p>
                                <span style={{ fontWeight: "400" }}>
                                  (c) Profile&nbsp;
                                </span>
                              </p>
                              <p>
                                <span style={{ fontWeight: "400" }}>
                                  (d) Usage&nbsp;
                                </span>
                              </p>
                              <p>
                                <span style={{ fontWeight: "400" }}>
                                  (e) Marketing and Communications
                                </span>
                              </p>
                            </td>
                            <td>
                              <p>
                                <span style={{ fontWeight: "400" }}>
                                  (a) Performance of a contract with you&nbsp;
                                </span>
                              </p>
                              <p>
                                <span style={{ fontWeight: "400" }}>
                                  (b) Necessary for our legitimate interests (to
                                  study how customers use our products/services,
                                  to develop them and grow our business)
                                </span>
                              </p>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <p>
                                <span style={{ fontWeight: "400" }}>
                                  To administer and protect our business and
                                  this website (including troubleshooting, data
                                  analysis, testing, system maintenance,
                                  support, reporting and hosting of
                                  data)&nbsp;&nbsp;
                                </span>
                              </p>
                            </td>
                            <td>
                              <p>
                                <span style={{ fontWeight: "400" }}>
                                  (a) Identity
                                </span>
                              </p>
                              <p>
                                <span style={{ fontWeight: "400" }}>
                                  (b) Contact
                                </span>
                              </p>
                              <p>
                                <span style={{ fontWeight: "400" }}>
                                  (c) Technical
                                </span>
                              </p>
                            </td>
                            <td>
                              <p>
                                <span style={{ fontWeight: "400" }}>
                                  (a) Necessary for our legitimate interests
                                  (for running our business, provision of
                                  administration and IT services, network
                                  security, to prevent fraud and in the context
                                  of a business reorganisation or group
                                  restructuring exercise)
                                </span>
                              </p>
                              <p>
                                <span style={{ fontWeight: "400" }}>
                                  (b) Necessary to comply with a legal
                                  obligation
                                </span>
                              </p>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <p>
                                <span style={{ fontWeight: "400" }}>
                                  To deliver relevant website content and
                                  advertisements to you and measure or
                                  understand the effectiveness of the
                                  advertising we serve to you
                                </span>
                              </p>
                            </td>
                            <td>
                              <p>
                                <span style={{ fontWeight: "400" }}>
                                  (a) Identity&nbsp;
                                </span>
                              </p>
                              <p>
                                <span style={{ fontWeight: "400" }}>
                                  (b) Contact&nbsp;
                                </span>
                              </p>
                              <p>
                                <span style={{ fontWeight: "400" }}>
                                  (c) Profile&nbsp;
                                </span>
                              </p>
                              <p>
                                <span style={{ fontWeight: "400" }}>
                                  (d) Usage&nbsp;
                                </span>
                              </p>
                              <p>
                                <span style={{ fontWeight: "400" }}>
                                  (e) Marketing and Communications&nbsp;
                                </span>
                              </p>
                              <p>
                                <span style={{ fontWeight: "400" }}>
                                  (f) Technical&nbsp;
                                </span>
                              </p>
                            </td>
                            <td>
                              <p>
                                <span style={{ fontWeight: "400" }}>
                                  Necessary for our legitimate interests (to
                                  study how customers use our products/services,
                                  to develop them, to grow our business and to
                                  inform our marketing strategy)
                                </span>
                              </p>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <p>
                                <span style={{ fontWeight: "400" }}>
                                  To use data analytics to improve our website,
                                  products/services, marketing, customer
                                  relationships and experiences
                                </span>
                              </p>
                            </td>
                            <td>
                              <p>
                                <span style={{ fontWeight: "400" }}>
                                  (a) Technical&nbsp;
                                </span>
                              </p>
                              <p>
                                <span style={{ fontWeight: "400" }}>
                                  (b) Usage&nbsp;
                                </span>
                              </p>
                            </td>
                            <td>
                              <p>
                                <span style={{ fontWeight: "400" }}>
                                  Necessary for our legitimate interests (to
                                  define types of customers for our products and
                                  services, to keep our website updated and
                                  relevant, to develop our business and to
                                  inform our marketing strategy)
                                </span>
                              </p>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <p>
                                <span style={{ fontWeight: "400" }}>
                                  To make suggestions and recommendations to you
                                  about goods or services that may be of
                                  interest to you
                                </span>
                              </p>
                            </td>
                            <td>
                              <p>
                                <span style={{ fontWeight: "400" }}>
                                  (a) Identity&nbsp;
                                </span>
                              </p>
                              <p>
                                <span style={{ fontWeight: "400" }}>
                                  (b) Contact&nbsp;
                                </span>
                              </p>
                              <p>
                                <span style={{ fontWeight: "400" }}>
                                  (c) Technical&nbsp;
                                </span>
                              </p>
                              <p>
                                <span style={{ fontWeight: "400" }}>
                                  (d) Usage&nbsp;
                                </span>
                              </p>
                              <p>
                                <span style={{ fontWeight: "400" }}>
                                  (e) Profile&nbsp;
                                </span>
                              </p>
                              <p>
                                <span style={{ fontWeight: "400" }}>
                                  (f) Marketing and Communications
                                </span>
                              </p>
                            </td>
                            <td>
                              <p>
                                <span style={{ fontWeight: "400" }}>
                                  Necessary for our legitimate interests (to
                                  develop our products/services and grow our
                                  business)
                                </span>
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <p>
                      <span style={{ fontSize: "12pt" }}>&nbsp;</span>
                    </p>

                    <p>
                      <span style={{ fontSize: "12pt" }}>
                        If you are the winner of the competition you will be
                        invited to participate in publicity exercises relating
                        to the competition. Your participation is not compulsory
                        but would be greatly appreciated by us. If you do not
                        wish to participate your participation in the
                        competition or chances of winning will not be affected
                        in any way.
                      </span>
                    </p>
                    <p className="mt-3">
                      <span style={{ fontSize: "12pt" }}>
                        However, if you do not wish to participate in any
                        publicity and decline to be named as the winner, we may
                        still have to provide your details to the Advertising
                        Standards Authority (ASA) as proof that the competition
                        has been properly administered and the prize awarded.
                        This is a legal requirement we must comply with. If you
                        require detail of how the ASA will use and process your
                        personal data, please let us know.
                      </span>
                    </p>
                    <p>
                      <span style={{ fontSize: "12pt" }}>&nbsp;</span>
                    </p>
                    <p>
                      <b>
                        <span
                          style={{ fontSize: "12pt" }}
                          className="font-modernBold"
                        >
                          Marketing
                        </span>
                      </b>
                    </p>
                    <p>
                      <span style={{ fontSize: "12pt" }}>
                        We strive to provide you with choices regarding certain
                        personal data uses, particularly around marketing and
                        advertising.
                      </span>
                    </p>
                    <p>
                      <span style={{ fontSize: "12pt" }}>&nbsp;</span>
                    </p>
                    <p>
                      <b>
                        <span
                          style={{ fontSize: "12pt" }}
                          className="font-modernBold"
                        >
                          Promotional offers from us
                        </span>
                      </b>
                    </p>
                    <p>
                      <span style={{ fontSize: "12pt" }}>
                        We may use your Identity, Contact, Technical, Usage and
                        Profile Data to form a view on what we think you may
                        want or need, or what may be of interest to you. This is
                        how we decide which products, services and offers may be
                        relevant for you (we call this marketing).
                      </span>
                    </p>
                    <p className="mt-3">
                      <span style={{ fontSize: "12pt" }}>
                        You will receive marketing communications from us if you
                        have requested information from us or purchased goods or
                        services from us, entered a competition or prize draw
                        and you have not opted out of receiving that marketing.
                      </span>
                    </p>
                    <p>
                      <span style={{ fontSize: "12pt" }}>&nbsp;</span>
                    </p>
                    <p>
                      <b>
                        <span
                          style={{ fontSize: "12pt" }}
                          className="font-modernBold"
                        >
                          Third-party marketing
                        </span>
                      </b>
                    </p>
                    <p>
                      <span style={{ fontSize: "12pt" }}>
                        We will get your express opt-in consent before we share
                        your personal data with any third party for marketing
                        purposes.
                      </span>
                    </p>
                    <p>
                      <span style={{ fontSize: "12pt" }}>&nbsp;</span>
                    </p>
                    <p>
                      <b>
                        <span
                          style={{ fontSize: "12pt" }}
                          className="font-modernBold"
                        >
                          Opting out
                        </span>
                      </b>
                    </p>
                    <p>
                      <span style={{ fontSize: "12pt" }}>
                        You can ask us or third parties to stop sending you
                        marketing messages at any time by following the opt-out
                        links on any marketing message sent to you or by
                        contacting us at any time.
                      </span>
                    </p>
                    <p className="mt-3">
                      <span style={{ fontSize: "12pt" }}>
                        Where you opt out of receiving these marketing messages,
                        this will not apply to personal data provided to us as a
                        result of a product/service purchase, warranty
                        registration, product/service experience or other
                        transactions.
                      </span>
                    </p>
                    <p>
                      <span style={{ fontSize: "12pt" }}>&nbsp;</span>
                    </p>
                    <p>
                      <b>
                        <span
                          style={{ fontSize: "12pt" }}
                          className="font-modernBold"
                        >
                          Cookies
                        </span>
                      </b>
                    </p>
                    <p>
                      <span style={{ fontSize: "12pt" }}>
                        You can set your browser to refuse all or some browser
                        cookies, or to alert you when websites set or access
                        cookies. If you disable or refuse cookies, please note
                        that some parts of this website may become inaccessible
                        or not function properly. For more information about the
                        cookies we use, please see{" "}
                        <Link
                          to="/terms-of-use"
                          className="text-blue-600 hover:text-blue-800 underline"
                        >
                          www.raffily.co.uk/terms-of-use
                        </Link>
                      </span>
                    </p>
                    <p>
                      <span style={{ fontSize: "12pt" }}>&nbsp;</span>
                    </p>
                    <p>
                      <b>
                        <span
                          style={{ fontSize: "12pt" }}
                          className="font-modernBold"
                        >
                          Change of purpose
                        </span>
                      </b>
                    </p>
                    <p>
                      <span style={{ fontSize: "12pt" }}>
                        We will only use your personal data for the purposes for
                        which we collected it, unless we reasonably consider
                        that we need to use it for another reason and that
                        reason is compatible with the original purpose. If you
                        wish to get an explanation as to how the processing for
                        the new purpose is compatible with the original purpose,
                        please contact us.
                      </span>
                    </p>
                    <p className="mt-3">
                      <span style={{ fontSize: "12pt" }}>
                        If we need to use your personal data for an unrelated
                        purpose, we will notify you and we will explain the
                        legal basis which allows us to do so.
                      </span>
                    </p>
                    <p className="mt-3">
                      <span style={{ fontSize: "12pt" }}>
                        Please note that we may process your personal data
                        without your knowledge or consent, in compliance with
                        the above rules, where this is required or permitted by
                        law.
                      </span>
                    </p>
                    <p>
                      <span style={{ fontSize: "12pt" }}>&nbsp;</span>
                    </p>
                    <p>
                      <b>
                        <span
                          style={{ fontSize: "12pt" }}
                          className="font-modernBold"
                        >
                          Disclosures of your personal data
                        </span>
                      </b>
                    </p>
                    <p>
                      <span style={{ fontSize: "12pt" }}>
                        We may share your personal data with the parties set out
                        below for the purposes set out in the table “Purposes
                        for which we will use your personal data” above.
                      </span>
                    </p>
                    {/* <p className="mt-3">
                        <span style={{ fontSize: "12pt" }}>
                          External Third Parties as set out in the Glossary.
                        </span>
                      </p> */}
                    <p className="mt-3">
                      <span style={{ fontSize: "12pt" }}>
                        Specific third parties listed in the table “Purposes for
                        which we will use your personal data” above.
                      </span>
                    </p>
                    <p className="mt-3">
                      <span style={{ fontSize: "12pt" }}>
                        Third parties to whom we may choose to sell, transfer or
                        merge parts of our business or our assets.
                        Alternatively, we may seek to acquire other businesses
                        or merge with them. If a change happens to our business,
                        then the new owners may use your personal data in the
                        same way as set out in this privacy policy.
                      </span>
                    </p>
                    <p className="mt-3">
                      <span style={{ fontSize: "12pt" }}>
                        We require all third parties to respect the security of
                        your personal data and to treat it in accordance with
                        the law. We do not allow our third-party service
                        providers to use your personal data for their own
                        purposes and only permit them to process your personal
                        data for specified purposes and in accordance with our
                        instructions.
                      </span>
                    </p>
                    <p>
                      <span style={{ fontSize: "12pt" }}>&nbsp;</span>
                    </p>
                    <p>
                      <b>
                        <span
                          style={{ fontSize: "12pt" }}
                          className="font-modernBold"
                        >
                          International transfers
                        </span>
                      </b>
                    </p>
                    <p>
                      <span style={{ fontSize: "12pt" }}>
                        We do not transfer your personal data outside the UK.
                      </span>
                    </p>
                    <p>
                      <span style={{ fontSize: "12pt" }}>&nbsp;</span>
                    </p>
                    <p>
                      <b>
                        <span
                          style={{ fontSize: "12pt" }}
                          className="font-modernBold"
                        >
                          Data security
                        </span>
                      </b>
                    </p>
                    <p>
                      <span style={{ fontSize: "12pt" }}>
                        We have put in place appropriate security measures to
                        prevent your personal data from being accidentally lost,
                        used or accessed in an unauthorised way, altered or
                        disclosed. In addition, we limit access to your personal
                        data to those employees, agents, contractors and other
                        third parties who have a business need to know. They
                        will only process your personal data on our instructions
                        and they are subject to a duty of confidentiality.
                      </span>
                    </p>
                    <p className="mt-3">
                      <span style={{ fontSize: "12pt" }}>
                        We have put in place procedures to deal with any
                        suspected personal data breach and will notify you and
                        any applicable regulator of a breach where we are
                        legally required to do so.
                      </span>
                    </p>
                    <p>
                      <span style={{ fontSize: "12pt" }}>&nbsp;</span>
                    </p>
                    <p>
                      <b>
                        <span
                          style={{ fontSize: "12pt" }}
                          className="font-modernBold"
                        >
                          Data retention
                        </span>
                      </b>
                    </p>
                    <p className="mt-3">
                      <b>
                        <span style={{ fontSize: "12pt" }}>
                          How long will you use my personal data for?
                        </span>
                      </b>
                    </p>
                    <p>
                      <span style={{ fontSize: "12pt" }}>
                        We will only retain your personal data for as long as
                        reasonably necessary to fulfil the purposes we collected
                        it for, including for the purposes of satisfying any
                        legal, regulatory, tax, accounting or reporting
                        requirements. We may retain your personal data for a
                        longer period in the event of a complaint or if we
                        reasonably believe there is a prospect of litigation in
                        respect to our relationship with you.
                      </span>
                    </p>
                    <p className="mt-3">
                      <span style={{ fontSize: "12pt" }}>
                        To determine the appropriate retention period for
                        personal data, we consider the amount, nature and
                        sensitivity of the personal data, the potential risk of
                        harm from unauthorised use or disclosure of your
                        personal data, the purposes for which we process your
                        personal data and whether we can achieve those purposes
                        through other means, and the applicable legal,
                        regulatory, tax, accounting or other requirements.
                      </span>
                    </p>
                    <p className="mt-3">
                      <span style={{ fontSize: "12pt" }}>
                        Details of retention periods for different aspects of
                        your personal data are available in our retention policy
                        which you can request from us.
                      </span>
                    </p>
                    <p className="mt-3">
                      <span style={{ fontSize: "12pt" }}>
                        In some circumstances you can ask us to delete your
                        data: see “Your legal rights” below for further
                        information.
                      </span>
                    </p>
                    <p>
                      <span style={{ fontSize: "12pt" }}>
                        In some circumstances we will anonymise your personal
                        data (so that it can no longer be associated with you)
                        for research or statistical purposes, in which case we
                        may use this information indefinitely without further
                        notice to you.
                      </span>
                    </p>
                    <p>
                      <span style={{ fontSize: "12pt" }}>&nbsp;</span>
                    </p>
                    <p>
                      <b>
                        <span
                          style={{ fontSize: "12pt" }}
                          className="font-modernBold"
                        >
                          Your legal rights
                        </span>
                      </b>
                    </p>
                    <p>
                      <span style={{ fontSize: "12pt" }}>
                        Under certain circumstances, you have rights under data
                        protection laws in relation to your personal data.
                      </span>
                    </p>
                    <p>
                      <span style={{ fontSize: "12pt" }}>
                        If you wish to exercise any of these rights, please
                        contact us.
                      </span>
                    </p>
                    <p>
                      <span style={{ fontSize: "12pt" }}>&nbsp;</span>
                    </p>
                    <p>
                      <b>
                        <span
                          style={{ fontSize: "12pt" }}
                          className="font-modernBold"
                        >
                          No fee usually required
                        </span>
                      </b>
                    </p>
                    <p>
                      <span style={{ fontSize: "12pt" }}>
                        You will not have to pay a fee to access your personal
                        data (or to exercise any of the other rights). However,
                        we may charge a reasonable fee if your request is
                        clearly unfounded, repetitive or excessive.
                        Alternatively, we could refuse to comply with your
                        request in these circumstances.
                      </span>
                    </p>
                    <p>
                      <span style={{ fontSize: "12pt" }}>&nbsp;</span>
                    </p>
                    <p>
                      <b>
                        <span
                          style={{ fontSize: "12pt" }}
                          className="font-modernBold"
                        >
                          What we may need from you
                        </span>
                      </b>
                    </p>
                    <p>
                      <span style={{ fontSize: "12pt" }}>
                        We may need to request specific information from you to
                        help us confirm your identity and ensure your right to
                        access your personal data (or to exercise any of your
                        other rights). This is a security measure to ensure that
                        personal data is not disclosed to any person who has no
                        right to receive it. We may also contact you to ask you
                        for further information in relation to your request to
                        speed up our response.
                      </span>
                    </p>
                    <p>
                      <span style={{ fontSize: "12pt" }}>&nbsp;</span>
                    </p>
                    <p>
                      <b>
                        <span
                          style={{ fontSize: "12pt" }}
                          className="font-modernBold"
                        >
                          Time limit to respond
                        </span>
                      </b>
                    </p>
                    <p>
                      <span style={{ fontSize: "12pt" }}>
                        We try to respond to all legitimate requests within one
                        month. Occasionally it could take us longer than a month
                        if your request is particularly complex or you have made
                        a number of requests. In this case, we will notify you
                        and keep you updated.
                      </span>
                      <span style={{ fontSize: "12pt" }}>
                        <br />
                      </span>
                      <span style={{ fontSize: "12pt" }}>&nbsp;</span>
                    </p>
                    <p>
                      <b>
                        <span
                          style={{ fontSize: "17pt" }}
                          className="font-modernBold"
                        >
                          Glossary
                        </span>
                      </b>
                    </p>
                    <p>
                      <span style={{ fontSize: "12pt" }}>&nbsp;</span>
                    </p>
                    <p>
                      <b>
                        <span
                          style={{ fontSize: "15pt" }}
                          className="font-modernBold"
                        >
                          LAWFUL BASIS
                        </span>
                      </b>
                    </p>
                    <p>
                      <span style={{ fontSize: "12pt" }}>&nbsp;</span>
                    </p>
                    <p>
                      <b>
                        <span style={{ fontSize: "12pt" }}>
                          Legitimate Interest
                        </span>
                      </b>
                      <span style={{ fontSize: "12pt" }}>
                        &nbsp;means the interest of our business in conducting
                        and managing our business to enable us to give you the
                        best service/product and the best and most secure
                        experience. We make sure we consider and balance any
                        potential impact on you (both positive and negative) and
                        your rights before we process your personal data for our
                        legitimate interests. We do not use your personal data
                        for activities where our interests are overridden by the
                        impact on you (unless we have your consent or are
                        otherwise required or permitted to by law). You can
                        obtain further information about how we assess our
                        legitimate interests against any potential impact on you
                        in respect of specific activities by contacting us.
                      </span>
                    </p>
                    <p>
                      <span style={{ fontSize: "12pt" }}>&nbsp;</span>
                    </p>
                    <p>
                      <b>
                        <span style={{ fontSize: "12pt" }}>
                          Performance of Contract
                        </span>
                      </b>
                      <span style={{ fontSize: "12pt" }}>
                        &nbsp;means processing your data where it is necessary
                        for the performance of a contract to which you are a
                        party or to take steps at your request before entering
                        into such a contract.
                      </span>
                    </p>
                    <p>
                      <span style={{ fontSize: "12pt" }}>&nbsp;</span>
                    </p>
                    <p>
                      <b>
                        <span style={{ fontSize: "12pt" }}>
                          Comply with a legal obligation
                        </span>
                      </b>
                      <span style={{ fontSize: "12pt" }}>
                        &nbsp;means processing your personal data where it is
                        necessary for compliance with a legal obligation that we
                        are subject to.
                      </span>
                    </p>
                    <p>
                      <span style={{ fontSize: "12pt" }}>&nbsp;</span>
                    </p>
                    <p>
                      <b>
                        <span
                          style={{ fontSize: "15pt" }}
                          className="font-modernBold"
                        >
                          THIRD PARTIES
                        </span>
                      </b>
                    </p>
                    <p>
                      <span style={{ fontSize: "12pt" }}>&nbsp;</span>
                    </p>
                    <p>
                      <b>
                        <span style={{ fontSize: "12pt" }}>
                          External Third Parties
                        </span>
                      </b>
                    </p>
                    <p>
                      <span style={{ fontSize: "12pt" }}>
                        Service providers acting as processors based in outside
                        the United Kingdom who provide IT and system
                        administration services.
                      </span>
                    </p>
                    <p className="mt-3">
                      <span style={{ fontSize: "12pt" }}>
                        Professional advisers acting as processors or joint
                        controllers including lawyers, bankers, auditors and
                        insurers based in the United Kingdomwho provide
                        consultancy, banking, legal, insurance and accounting
                        services.
                      </span>
                    </p>
                    <p className="mt-3">
                      <span style={{ fontSize: "12pt" }}>
                        HM Revenue & Customs, regulators and other authorities
                        such as the Advertising Standards Authority acting as
                        processors or joint controllers based in the United
                        Kingdom
                      </span>
                    </p>
                    <p>
                      <br />
                    </p>
                    <p>
                      <br />
                    </p>
                    <h6>
                      <b>
                        <span
                          style={{ fontSize: "15pt" }}
                          className="font-modernBold"
                        >
                          YOUR LEGAL RIGHTS
                        </span>
                      </b>
                    </h6>

                    <p className="mt-3">
                      <span style={{ fontSize: "12pt" }}>
                        You have the right to:
                      </span>
                    </p>
                    <p>
                      <span style={{ fontSize: "12pt" }}>&nbsp;</span>
                    </p>
                    <p>
                      <b>
                        <span style={{ fontSize: "12pt" }}>
                          Request access to your personal data
                        </span>
                      </b>
                      <span style={{ fontSize: "12pt" }}>
                        &nbsp;(commonly known as a "data subject access
                        request"). This enables you to receive a copy of the
                        personal data we hold about you and to check that we are
                        lawfully processing it.
                      </span>
                    </p>
                    <p>
                      <span style={{ fontSize: "12pt" }}>&nbsp;</span>
                    </p>
                    <p>
                      <b>
                        <span style={{ fontSize: "12pt" }}>
                          Request correction of the personal data that we hold
                          about you.
                        </span>
                      </b>
                      <span style={{ fontSize: "12pt" }}>
                        &nbsp;This enables you to have any incomplete or
                        inaccurate data we hold about you corrected, though we
                        may need to verify the accuracy of the new data you
                        provide to us.
                      </span>
                    </p>
                    <p>
                      <span style={{ fontSize: "12pt" }}>&nbsp;</span>
                    </p>
                    <p>
                      <b>
                        <span style={{ fontSize: "12pt" }}>
                          Request erasure of your personal data.
                        </span>
                      </b>
                      <span style={{ fontSize: "12pt" }}>
                        &nbsp;This enables you to ask us to delete or remove
                        personal data where there is no good reason for us
                        continuing to process it. You also have the right to ask
                        us to delete or remove your personal data where you have
                        successfully exercised your right to object to
                        processing (see below), where we may have processed your
                        information unlawfully or where we are required to erase
                        your personal data to comply with local law. Note,
                        however, that we may not always be able to comply with
                        your request of erasure for specific legal reasons which
                        will be notified to you, if applicable, at the time of
                        your request.
                      </span>
                    </p>
                    <p>
                      <span style={{ fontSize: "12pt" }}>&nbsp;</span>
                    </p>
                    <p>
                      <b>
                        <span style={{ fontSize: "12pt" }}>
                          Object to processing of your personal data where we
                          are relying on a legitimate interest
                        </span>
                      </b>
                      <span style={{ fontSize: "12pt" }}>
                        &nbsp;(or those of a third party) and there is something
                        about your particular situation which makes you want to
                        object to processing on this ground as you feel it
                        impacts on your fundamental rights and freedoms. You
                        also have the right to object where we are processing
                        your personal data for direct marketing purposes. In
                        some cases, we may demonstrate that we have compelling
                        legitimate grounds to process your information which
                        override your rights and freedoms.
                      </span>
                    </p>
                    <p>
                      <span style={{ fontSize: "12pt" }}>&nbsp;</span>
                    </p>
                    <p>
                      <b>
                        <span style={{ fontSize: "12pt" }}>
                          Request restriction of processing of your personal
                          data
                        </span>
                      </b>
                      <span style={{ fontSize: "12pt" }}>
                        . This enables you to ask us to suspend the processing
                        of your personal data in the following scenarios
                      </span>
                      <span style={{ fontSize: "12pt" }}>
                        <br />
                      </span>
                      <span style={{ fontSize: "12pt" }}>&nbsp;</span>
                    </p>
                    <p>
                      <span style={{ fontSize: "12pt" }}>
                        If you want us to establish the data's accuracy.
                      </span>
                    </p>
                    <p>
                      <span style={{ fontSize: "12pt" }}>
                        Where our use of the data is unlawful but you do not
                        want us to erase it.
                      </span>
                    </p>
                    <p>
                      <span style={{ fontSize: "12pt" }}>
                        Where you need us to hold the data even if we no longer
                        require it as you need it to establish, exercise or
                        defend legal claims.
                      </span>
                    </p>
                    <p>
                      <span style={{ fontSize: "12pt" }}>
                        You have objected to our use of your data but we need to
                        verify whether we have overriding legitimate grounds to
                        use it.
                      </span>
                    </p>
                    <p>
                      <span style={{ fontSize: "12pt" }}>&nbsp;</span>
                    </p>
                    <p>
                      <b>
                        <span style={{ fontSize: "12pt" }}>
                          Request the transfer of your personal data to you or
                          to a third party.
                        </span>
                      </b>
                      <span style={{ fontSize: "12pt" }}>
                        &nbsp;We will provide to you, or a third party you have
                        chosen, your personal data in a structured, commonly
                        used, machine-readable format. Note that this right only
                        applies to automated information which you initially
                        provided consent for us to use or where we used the
                        information to perform a contract with you.
                      </span>
                    </p>
                    <p>
                      <span style={{ fontSize: "12pt" }}>&nbsp;</span>
                    </p>
                    <p>
                      <b>
                        <span style={{ fontSize: "12pt" }}>
                          Withdraw consent at any time where we are relying on
                          consent to process your personal data.
                        </span>
                      </b>
                      <span style={{ fontSize: "12pt" }}>
                        &nbsp;However, this will not affect the lawfulness of
                        any processing carried out before you withdraw your
                        consent. If you withdraw your consent, we may not be
                        able to provide certain products or services to you. We
                        will advise you if this is the case at the time you
                        withdraw your consent.
                      </span>
                    </p>

                    <p>
                      <br />
                    </p>
                    <p>
                      <br />
                    </p>
                  </>
                </div>
              </div>

              <br />
              <div className="h-[1px] bg-gray-400"></div>
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
