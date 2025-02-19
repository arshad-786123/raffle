import React, { useEffect, useState } from "react";
import AdminSidebar from "../../Components/Navbar/AdminSidebar";
import { API_INSTANCE } from "../../API/Instance";
import { API_ENDPOINTS } from "../../constants";
import toast, { Toaster } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
// Define the type for termsData
interface TermsConditionsData {
  _id?: string;
  isActive1: boolean;
  link1: string;
  description1: string;
  isActive2: boolean;
  link2: string;
  descriptionPrivacy: string;
  descriptionLegalInfo: string;
  descriptionHelp: string;
  descriptionTerms: string;
  descriptionAcceptableUse: string;
  descriptionCookies: string;
}

const TermsConditionDetails = () => {
  const [termsData, setTermsData] = useState<TermsConditionsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { state } = useLocation();

  const handleBack = () => {
    navigate("/owner/create");
  };

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
      <div
        className="w-[100%] lg:w-[95%] mx-auto p-3 lg:p-10 duration-500"
        style={{ fontFamily: "poppins, sans-serif" }}
      >
        <div className="w-[100%] lg:w-[100%] m-auto  mt-4 p-4 rounded-md">
          <div className="w-[100%] m-auto">
            <div className="rounded-md ">
              <div className="w-[100%] mt-4">
                <div className="grid lg:flex items-center justify-between">
                  <h2 className="font-bold " style={{ fontSize: "26px" }}>
                    {" "}
                    Terms and Conditions
                  </h2>
                </div>
                <br />
                <br />
                <div className="footer-pages">
                  <div className="WordSection1">
                    <>
                      <ol>
                        <li
                          style={{
                            fontSize: "12pt",
                          }}
                        >
                          <p>
                            <b>
                              <span
                                style={{
                                  fontSize: "12pt",
                                  textDecoration: "underline",
                                }}
                                className="font-modernEraBold"
                              >
                                1. The Promoter
                              </span>
                            </b>
                          </p>
                        </li>
                      </ol>
                      <p>
                        <span style={{ fontSize: "12pt" }}>
                          The promoter is The promoter is: Raffily Limited
                          [Raffily], Company Number [15658661] and whose
                          registered office is at 28 Eaton Avenue, Buckshaw
                          Village, Chorley, Lancashire PR7 7NA.
                        </span>
                      </p>
                      <p className="mt-3">
                        <span style={{ fontSize: "12pt" }}>
                          If you wish to contact us for any reason, please email
                          hello@raffily.co.uk
                        </span>
                      </p>
                      <p>
                        <span style={{ fontSize: "12pt" }}>&nbsp;</span>
                      </p>
                      <p>
                        <b>
                          <span style={{ fontSize: "12pt" }}>
                            The competition
                          </span>
                        </b>
                      </p>
                      <p>
                        <span style={{ fontSize: "12pt" }}>
                          1.1 These terms and conditions apply to all
                          competitions listed on the Promoter’s website at
                          [www.raffily.co.uk] (the “
                        </span>
                        <b>
                          <span style={{ fontSize: "12pt" }}>Website</span>
                        </b>
                        <span style={{ fontSize: "12pt" }}>”)</span>
                      </p>
                      <p className="mt-3">
                        <span style={{ fontSize: "12pt" }}>
                          1.2 The Promoter may offer different formats to the
                          competitions. Subject to clause 2.3, an entry fee is
                          payable each time you enter.
                        </span>
                      </p>
                      <p className="mt-3">
                        <span style={{ fontSize: "12pt" }}>
                          1.3 To be in with a chance of winning, everyone who
                          enters the competition (an “
                        </span>
                        <b>
                          <span style={{ fontSize: "12pt" }}>Entrant</span>
                        </b>
                        <span style={{ fontSize: "12pt" }}>
                          ”) will be required to correctly answer a question or
                          solve a problem set by the Promoter (the “
                        </span>
                        <b>
                          <span style={{ fontSize: "12pt" }}>
                            Competition Question
                          </span>
                        </b>
                        <span style={{ fontSize: "12pt" }}>
                          ”). Where the Promoter offers an easy or
                          multiple-choice question or, where the Promoter does
                          not ask a Competition Question, a free entry route is
                          available.
                        </span>
                      </p>
                      <p>
                        <span style={{ fontSize: "12pt" }}>&nbsp;</span>
                      </p>
                      <ol>
                        <li
                          style={{
                            fontSize: "12pt",
                          }}
                        >
                          <p>
                            <b>
                              <span
                                style={{
                                  fontSize: "12pt",
                                  textDecoration: "underline",
                                }}
                                className="font-modernEraBold"
                              >
                                2. How to enter
                              </span>
                            </b>
                          </p>
                        </li>
                      </ol>
                      <p>
                        <span style={{ fontSize: "12pt" }}>
                          2.1 The competition will run from and including the
                          opening and closing dates specified on the Website.
                          These dates shall be referred to as the "
                        </span>
                        <b>
                          <span style={{ fontSize: "12pt" }}>Opening Date</span>
                        </b>
                        <span style={{ fontSize: "12pt" }}>" and "</span>
                        <b>
                          <span style={{ fontSize: "12pt" }}>Closing Date</span>
                        </b>
                        <span style={{ fontSize: "12pt" }}>
                          " respectively. All times and dates referred to are
                          the times and dates in London, England.
                        </span>
                      </p>
                      <p className="mt-3">
                        <span style={{ fontSize: "12pt" }}>
                          2.2 If it is absolutely necessary to do so, the
                          Promoter reserves the right to change the Opening and
                          Closing Dates. If the Promoter does change the Opening
                          Date and/or the Closing Date of a competition, the new
                          details will be displayed on the Website. The Promoter
                          will not extend the Closing Date simply to sell more
                          entries.
                        </span>
                      </p>
                      <p className="mt-3">
                        <span style={{ fontSize: "12pt" }}>
                          2.3 All competition entries must be received by the
                          Promoter by no later than the specified time on the
                          Closing Date. All competition entries received after
                          the specified time on the Closing Date are
                          automatically disqualified and no refunds will be
                          given.
                        </span>
                      </p>
                      <p className="mt-3">
                        <span style={{ fontSize: "12pt" }}>
                          2.4 If there is a maximum number of entries to a
                          competition, this will be stated on the Website. The
                          number of entries you are able to make may be limited
                          if the maximum number of entries is reached
                        </span>
                      </p>
                      <p className="mt-3">
                        <span style={{ fontSize: "12pt" }}>
                          2.5 Entrants can enter the competition as many times
                          as they wish [until the maximum number of entries have
                          been received.][Entrants submitting free entries must
                          submit each entry separately. Bulk entries, if
                          received, will not be accepted and will only be
                          counted as one single entry.]
                        </span>
                      </p>
                      <p className="mt-3">
                        <span style={{ fontSize: "12pt" }}>
                          2.6 All Entrants (including those entering for free)
                          must open an account on the Website prior to entering
                          any of our competitions. Only one account per person
                          is permitted. If any Entrant opens or tries to open
                          multiple accounts using different email addresses, all
                          of their accounts will be closed and the Entrant will
                          not be permitted to enter any of the Promoter’s
                          competitions. Once an account has been opened, to
                          enter the competition:
                        </span>
                      </p>
                      <div style={{ paddingLeft: "64px" }} className="mt-3">
                        <ol>
                          <li
                            style={{
                              listStyleType: "decimal",
                              fontSize: "12pt",
                            }}
                          >
                            <p>
                              <span style={{ fontSize: "12pt" }}>
                                go to the Website and view the Competition
                                Question, if there is one;
                              </span>
                            </p>
                          </li>
                          <li
                            style={{
                              listStyleType: "decimal",
                              fontSize: "12pt",
                            }}
                          >
                            <p>
                              <span style={{ fontSize: "12pt" }}>
                                complete and submit the online entry form or
                                follow the instructions on how to enter for
                                free; then
                              </span>
                            </p>
                          </li>
                          <li
                            style={{
                              listStyleType: "decimal",
                              fontSize: "12pt",
                            }}
                          >
                            <p>
                              <span style={{ fontSize: "12pt" }}>
                                purchase the required number of entries; then
                              </span>
                            </p>
                          </li>
                          <li
                            style={{
                              listStyleType: "decimal",
                              fontSize: "12pt",
                            }}
                          >
                            <p>
                              <span style={{ fontSize: "12pt" }}>
                                when you have purchased your entries, submit
                                your answer to the Competition Question, if
                                there is one.
                              </span>
                            </p>
                          </li>
                        </ol>
                      </div>
                      <p className="mt-3">
                        <span style={{ fontSize: "12pt" }}>
                          2.7 All entries must be submitted in the English
                          language. Entries in languages other than English will
                          automatically be disqualified and no refund will be
                          given.
                        </span>
                      </p>
                      <p className="mt-3">
                        <span style={{ fontSize: "12pt" }}>
                          2.8 Unless you are using the free entry method, the
                          Promoter will send confirmation that your entry has
                          been received [and confirm whether or not your answer
                          to the Competition Question is correct.]
                        </span>
                      </p>
                      <p className="mt-3">
                        <span style={{ fontSize: "12pt" }}>
                          2.9 The Promoter will&nbsp;
                        </span>
                        <b>
                          <span style={{ fontSize: "12pt" }}>not</span>
                        </b>
                        <span style={{ fontSize: "12pt" }}>
                          &nbsp;accept responsibility for competition entries
                          that are not successfully completed, are lost or are
                          delayed regardless of cause, including, for example,
                          as a result of any equipment failure, technical
                          malfunction, systems, satellite, network, server,
                          computer hardware or software failure of any kind.
                        </span>
                      </p>
                      <p className="mt-3">
                        <span style={{ fontSize: "12pt" }}>
                          2.10 By purchasing entries and submitting a
                          competition entry, you are entering into a contract
                          with the Promoter and are agreeing to be bound by
                          these terms and conditions.
                        </span>
                      </p>
                      <p className="mt-3">
                        <span style={{ fontSize: "12pt" }}>
                          2.11 You may enter the competition for free by
                          complying with the following conditions:
                        </span>
                      </p>
                      <div className="mt-3" style={{ paddingLeft: "64px" }}>
                        <ol>
                          <li
                            style={{
                              listStyleType: "decimal",
                              fontSize: "12pt",
                            }}
                          >
                            <p>
                              <span style={{ fontSize: "12pt" }}>
                                send your entry by first- or second-class post
                                to the Promoter at the following address: [28
                                Eaton Avenue, Buckshaw Village, Chorley,
                                Lancashire PR7 7NA];
                              </span>
                            </p>
                          </li>
                          <li
                            style={{
                              listStyleType: "decimal",
                              fontSize: "12pt",
                            }}
                          >
                            <p>
                              <span style={{ fontSize: "12pt" }}>
                                hand delivered entries will not be accepted and
                                will not be entered into the random draw;
                              </span>
                            </p>
                          </li>
                          <li
                            style={{
                              listStyleType: "decimal",
                              fontSize: "12pt",
                            }}
                          >
                            <p>
                              <span style={{ fontSize: "12pt" }}>
                                include with your entry the following
                                information (all details must match the details
                                on your account):
                              </span>
                            </p>
                          </li>
                          <li
                            style={{
                              listStyleType: "decimal",
                              fontSize: "12pt",
                            }}
                          >
                            <p>
                              <span style={{ fontSize: "12pt" }}>
                                the name or details of the competition you wish
                                to enter
                              </span>
                            </p>
                          </li>
                          <li
                            style={{
                              listStyleType: "decimal",
                              fontSize: "12pt",
                            }}
                          >
                            <p>
                              <span style={{ fontSize: "12pt" }}>
                                your full name;
                              </span>
                            </p>
                          </li>
                          <li
                            style={{
                              listStyleType: "decimal",
                              fontSize: "12pt",
                            }}
                          >
                            <p>
                              <span style={{ fontSize: "12pt" }}>
                                your address;
                              </span>
                            </p>
                          </li>
                          <li
                            style={{
                              listStyleType: "decimal",
                              fontSize: "12pt",
                            }}
                          >
                            <p>
                              <span style={{ fontSize: "12pt" }}>
                                a contact telephone number and email address;
                                and
                              </span>
                            </p>
                          </li>
                          <li
                            style={{
                              listStyleType: "decimal",
                              fontSize: "12pt",
                            }}
                          >
                            <p>
                              <span style={{ fontSize: "12pt" }}>
                                your answer to the Competition Question (if
                                there is one).
                              </span>
                            </p>
                          </li>
                          <li
                            style={{
                              listStyleType: "decimal",
                              fontSize: "12pt",
                            }}
                          >
                            <p>
                              <span style={{ fontSize: "12pt" }}>
                                incomplete or illegible entries will be
                                disqualified;
                              </span>
                            </p>
                          </li>
                          <li
                            style={{
                              listStyleType: "decimal",
                              fontSize: "12pt",
                            }}
                          >
                            <p>
                              <span style={{ fontSize: "12pt" }}>
                                you may make multiple free entries for any
                                competition (up to any limit placed on entries
                                by the Promoter) but each free entry must be
                                submitted and posted to the Promoter separately.
                                Bulk entries in one envelope will not be
                                accepted as multiple entries and if a bulk entry
                                is received, it will be counted as one single
                                entry;
                              </span>
                            </p>
                          </li>
                          <li
                            style={{
                              listStyleType: "decimal",
                              fontSize: "12pt",
                            }}
                          >
                            <p>
                              <span style={{ fontSize: "12pt" }}>
                                by entering the competition, you are confirming
                                that you are eligible to enter and accept these
                                terms and conditions;
                              </span>
                            </p>
                          </li>
                          <li
                            style={{
                              listStyleType: "decimal",
                              fontSize: "12pt",
                            }}
                          >
                            <p>
                              <span style={{ fontSize: "12pt" }}>
                                your entry must be received by the Promoter
                                prior to the Closing Date. Entries received
                                after the Closing Date will not be entered into
                                the random draw. Proof of posting does not
                                guarantee that you will be entered into the
                                random draw;
                              </span>
                            </p>
                          </li>
                          <li
                            style={{
                              listStyleType: "decimal",
                              fontSize: "12pt",
                            }}
                          >
                            <p>
                              <span style={{ fontSize: "12pt" }}>
                                the Promoter will not acknowledge receipt of
                                your entry nor confirm if your answer to the
                                Competition Question is correct;
                              </span>
                            </p>
                          </li>
                          <li
                            style={{
                              listStyleType: "decimal",
                              fontSize: "12pt",
                            }}
                          >
                            <p>
                              <span style={{ fontSize: "12pt" }}>
                                if the number of entries received reaches any
                                cap or limit before your free entry is received,
                                you will not be entered into the random draw.
                              </span>
                            </p>
                          </li>
                        </ol>
                      </div>
                      <p>
                        <span style={{ fontSize: "12pt" }}>&nbsp;</span>
                      </p>
                      <ol>
                        <li
                          style={{
                            fontSize: "12pt",
                          }}
                        >
                          <p>
                            <b>
                              <span
                                style={{
                                  fontSize: "12pt",
                                  textDecoration: "underline",
                                }}
                                className="font-modernEraBold"
                              >
                                3. Choosing a winner
                              </span>
                            </b>
                          </p>
                        </li>
                      </ol>
                      <p>
                        <span style={{ fontSize: "12pt" }}>
                          3.1 All Entrants who correctly answer the Competition
                          Question will be placed into a draw and the winner
                          will be chosen by random draw. If no Competition
                          Question is asked, all Entrants will be entered into
                          the random draw. The random draw will take place as
                          soon as reasonably possible and, in any event, within
                          [7] days of the Closing Date ("
                        </span>
                        <b>
                          <span style={{ fontSize: "12pt" }}>Draw Date</span>
                        </b>
                        <span style={{ fontSize: "12pt" }}>").</span>
                      </p>
                      <p className="mt-3">
                        <span style={{ fontSize: "12pt" }}>
                          3.2 All Entrants will have their names and entry
                          numbers include on a spreadsheet which may be
                          published on the Website and may be visible during the
                          live draw. If you do not wish to have your name
                          included on this spreadsheet you must contact the
                          Promoter via email at hello@raffily.co.uk as soon as
                          reasonably possible after you have completed your
                          entry and, in any event, at least 48 hours before the
                          live draw takes place.
                        </span>
                      </p>
                      <p className="mt-3">
                        <span style={{ fontSize: "12pt" }}>
                          3.3 [For help with entries, please email us at
                          [hello@raffily.co.uk]
                        </span>
                      </p>
                      <p>
                        <span style={{ fontSize: "12pt" }}>&nbsp;</span>
                      </p>
                      <ol>
                        <li
                          style={{
                            fontSize: "12pt",
                          }}
                        >
                          <p>
                            <b>
                              <span
                                style={{
                                  fontSize: "12pt",
                                  textDecoration: "underline",
                                }}
                                className="font-modernEraBold"
                              >
                                4. Eligibility
                              </span>
                            </b>
                          </p>
                        </li>
                      </ol>
                      <p>
                        <span style={{ fontSize: "12pt" }}>
                          4.1 The competition is only open to all residents in
                          the United Kingdom aged 18 years or over,&nbsp;
                        </span>
                        <b>
                          <span style={{ fontSize: "12pt" }}>except</span>
                        </b>
                      </p>
                      <div style={{ paddingLeft: "64px" }} className="mt-3">
                        <ol>
                          <li
                            style={{
                              listStyleType: "decimal",
                              fontSize: "12pt",
                            }}
                          >
                            <p>
                              <span style={{ fontSize: "12pt" }}>
                                employees of the Promoter;
                              </span>
                            </p>
                          </li>
                          <li
                            style={{
                              listStyleType: "decimal",
                              fontSize: "12pt",
                            }}
                          >
                            <p>
                              <span style={{ fontSize: "12pt" }}>
                                employees of agents or suppliers of the
                                Promoter, who are professionally connected with
                                the competition or its administration; or
                              </span>
                            </p>
                          </li>
                          <li
                            style={{
                              listStyleType: "decimal",
                              fontSize: "12pt",
                            }}
                          >
                            <p>
                              <span style={{ fontSize: "12pt" }}>
                                members of the immediate families or households
                                of (a) and (b) above.
                              </span>
                            </p>
                          </li>
                        </ol>
                      </div>

                      <p className="mt-3">
                        <span style={{ fontSize: "12pt" }}>
                          4.2 By entering the competition, you confirm that you
                          are eligible to do so and eligible to claim any prize
                          you may win. The Promoter may require you to provide
                          proof that you are eligible to enter the competition
                          and claim the prize. If you fail to provide the
                          Promoter with any such proof or other information that
                          they may require within a reasonable time, you may be
                          disqualified from the competition.
                        </span>
                      </p>
                      <p className="mt-3">
                        <span style={{ fontSize: "12pt" }}>
                          4.3 The Promoter will not accept competition entries
                          that are automatically generated by computer or
                          incomplete.
                        </span>
                      </p>
                      <p className="mt-3">
                        <span style={{ fontSize: "12pt" }}>
                          4.4 The Promoter reserves all rights to disqualify you
                          if your conduct is contrary to the spirit or intention
                          of the prize competition. This includes if you are
                          rude or abusive to the Promoter or anyone associated
                          with them.
                        </span>
                      </p>
                      <p className="mt-3">
                        <span style={{ fontSize: "12pt" }}>
                          4.5 No refunds of the entry fee will be given in any
                          event, including;
                        </span>
                      </p>
                      <div style={{ paddingLeft: "64px" }} className="mt-3">
                        <ol>
                          <li
                            style={{
                              listStyleType: "decimal",
                              fontSize: "12pt",
                            }}
                          >
                            <p>
                              <span style={{ fontSize: "12pt" }}>
                                if, following your entry into the competition,
                                you subsequently find out that you are not
                                eligible to enter the competition or claim the
                                Prize;
                              </span>
                            </p>
                          </li>
                          <li
                            style={{
                              listStyleType: "decimal",
                              fontSize: "12pt",
                            }}
                          >
                            <p>
                              <span style={{ fontSize: "12pt" }}>
                                if, following your entry into the competition
                                the eligibility criteria for entering the
                                competition or claiming the Prize changes and
                                you are no longer eligible; or
                              </span>
                            </p>
                          </li>
                          <li
                            style={{
                              listStyleType: "decimal",
                              fontSize: "12pt",
                            }}
                          >
                            <p>
                              <span style={{ fontSize: "12pt" }}>
                                if you are disqualified from the competition by
                                the Promoter for any reason.
                              </span>
                            </p>
                          </li>
                        </ol>
                      </div>
                      <p className="mt-3">
                        <span style={{ fontSize: "12pt" }}>
                          4.6 If the Entrant engages in:
                        </span>
                      </p>
                      <div style={{ paddingLeft: "64px" }} className="mt-3">
                        <ol>
                          <li
                            style={{
                              listStyleType: "decimal",
                              fontSize: "12pt",
                            }}
                          >
                            <p>
                              <span style={{ fontSize: "12pt" }}>
                                any form of fraud (actual or apparent);
                              </span>
                            </p>
                          </li>
                          <li
                            style={{
                              listStyleType: "decimal",
                              fontSize: "12pt",
                            }}
                          >
                            <p>
                              <span style={{ fontSize: "12pt" }}>
                                fraudulent misrepresentation;
                              </span>
                            </p>
                          </li>
                          <li
                            style={{
                              listStyleType: "decimal",
                              fontSize: "12pt",
                            }}
                          >
                            <p>
                              <span style={{ fontSize: "12pt" }}>
                                fraudulent concealment;
                              </span>
                            </p>
                          </li>
                          <li
                            style={{
                              listStyleType: "decimal",
                              fontSize: "12pt",
                            }}
                          >
                            <p>
                              <span style={{ fontSize: "12pt" }}>
                                hacking or interference with the proper
                                functioning of the Website; or
                              </span>
                            </p>
                          </li>
                          <li
                            style={{
                              listStyleType: "decimal",
                              fontSize: "12pt",
                            }}
                          >
                            <p>
                              <span style={{ fontSize: "12pt" }}>
                                amending, or unauthorized use of, any of the
                                code that constitutes the websiteall of their
                                entries will be declared void, no refunds will
                                be given and they may be prevented from
                                participating in any future competitions
                              </span>
                            </p>
                          </li>
                        </ol>
                      </div>

                      <ol>
                        <li
                          style={{
                            fontSize: "12pt",
                          }}
                        >
                          <p>
                            <b>
                              <span
                                style={{
                                  fontSize: "12pt",
                                  textDecoration: "underline",
                                }}
                                className="font-modernEraBold"
                              >
                                5. The prize
                              </span>
                            </b>
                          </p>
                        </li>
                      </ol>

                      <p>
                        <span style={{ fontSize: "12pt" }}>
                          5.1 The prize for each competition is described on the
                          Website (the “
                        </span>
                        <b>
                          <span style={{ fontSize: "12pt" }}>Prize</span>
                        </b>
                        <span style={{ fontSize: "12pt" }}>
                          ”). Details of the Prize are, to the best of the
                          Promoter’s knowledge, information and belief, correct
                          as at the Opening Date.
                        </span>
                      </p>
                      <p className="mt-3">
                        <span style={{ fontSize: "12pt" }}>
                          5.2 Prizes are subject to availability. The Promoter
                          reserves the right to substitute any prize with a
                          prize of equal or greater value. If any details of the
                          Prize change, the Promoter will endeavour to update
                          the Website as soon as reasonably possible.
                        </span>
                      </p>
                      <p className="mt-3">
                        <span style={{ fontSize: "12pt" }}>
                          5.3 The Promoter makes no representations and gives no
                          warranties about the Prize, its value, its condition
                          or any other information provided on the Website. The
                          Promoter makes no representations and gives no
                          warranties that the information provide on the Website
                          is accurate, complete or up to date.
                        </span>
                      </p>
                      <p className="mt-3">
                        <span style={{ fontSize: "12pt" }}>
                          5.4 The Prize may be supplied by a third-party
                          supplier (the “Supplier”). Details of the Supplier (if
                          any) will be provided on the Website.
                        </span>
                      </p>
                      <p className="mt-3">
                        <span style={{ fontSize: "12pt" }}>
                          5.5 The Promoter may offer an alternative cash prize
                          (“
                        </span>
                        <b>
                          <span style={{ fontSize: "12pt" }}>Cash Prize</span>
                        </b>
                        <span style={{ fontSize: "12pt" }}>
                          ”) for some competitions. If an alternative Cash Prize
                          is offered, the amount of the Cash Prize will be
                          stated in the prize description. It is the winner’s as
                          to whether or not they take the Prize or the Cash
                          Prize. The Promoter also reserves the right, at its
                          discretion, to substitute the Prize for a Cash Prize a
                          in the following circumstances:
                        </span>
                      </p>
                      <div style={{ paddingLeft: "64px" }} className="mt-3">
                        <ol>
                          <li
                            style={{
                              listStyleType: "decimal",
                              fontSize: "12pt",
                            }}
                          >
                            <p>
                              <span style={{ fontSize: "12pt" }}>
                                the Prize becomes unavailable;
                              </span>
                            </p>
                          </li>
                          <li
                            style={{
                              listStyleType: "decimal",
                              fontSize: "12pt",
                            }}
                          >
                            <p>
                              <span style={{ fontSize: "12pt" }}>
                                other circumstances beyond the reasonable
                                control of the Promoter make it necessary to do
                                so.
                              </span>
                            </p>
                          </li>
                        </ol>
                      </div>
                      <p className="mt-3">
                        <span style={{ fontSize: "12pt" }}>
                          5.6 The prize is not negotiable or transferable.
                        </span>
                      </p>
                      <p>
                        <span style={{ fontSize: "12pt" }}>&nbsp;</span>
                      </p>
                      <ol>
                        <li
                          style={{
                            fontSize: "12pt",
                          }}
                        >
                          <p>
                            <b>
                              <span
                                style={{
                                  fontSize: "12pt",
                                  textDecoration: "underline",
                                }}
                                className="font-modernEraBold"
                              >
                                6. Winners
                              </span>
                            </b>
                          </p>
                        </li>
                      </ol>
                      <p>
                        <span style={{ fontSize: "12pt" }}>
                          6.1 The decision of the Promoter is final and no
                          correspondence or discussion will be entered into.
                        </span>
                      </p>
                      <p className="mt-3">
                        <span style={{ fontSize: "12pt" }}>
                          6.2 The Promoter will contact the winner personally as
                          soon as practicable after the Draw Date, using the
                          telephone number or email address provided with the
                          competition entry. If the winner cannot be contacted
                          or is not available, or has not claimed the Prize
                          within [14] of days of the Draw Date, the Promoter
                          reserves the right to offer the Prize to the next
                          eligible Entrant selected from the correct entries
                          that were received before the Closing Date.
                        </span>
                      </p>
                      <p className="mt-3">
                        <span style={{ fontSize: "12pt" }}>
                          6.3 The Promoter must either publish or make available
                          information that indicates that a valid award took
                          place. To comply with this obligation the Promoter
                          will either publish
                        </span>
                      </p>
                      <p className="mt-3">
                        <span style={{ fontSize: "12pt" }}>
                          the surname and county of major prize winners on the
                          Website or send the surname and county of major prize
                          winners to anyone who writes to the address set out in
                          clause 1 (enclosing a self-addressed envelope) within
                          one month after the Closing Date of the competition.
                        </span>
                      </p>
                      <p className="mt-3">
                        <span style={{ fontSize: "12pt" }}>
                          6.4 If you object to any or all of your surname,
                          county and winning entry being published or made
                          available, please contact the Promoter at
                          hello@raffily.co.uk prior to the Closing Date. In such
                          circumstances, the Promoter must still provide the
                          information to the Advertising Standards Authority on
                          request.
                        </span>
                      </p>
                      <p>
                        <span style={{ fontSize: "12pt" }}>&nbsp;</span>
                      </p>
                      <ol>
                        <li
                          style={{
                            fontSize: "12pt",
                          }}
                        >
                          <p>
                            <b>
                              <span
                                style={{
                                  fontSize: "12pt",
                                  textDecoration: "underline",
                                }}
                                className="font-modernEraBold"
                              >
                                7. Claiming the prize
                              </span>
                            </b>
                          </p>
                        </li>
                      </ol>
                      <p>
                        <span style={{ fontSize: "12pt" }}>
                          7.1 You must claim the Prize personally. The Prize may
                          not be claimed by a third party on your behalf.
                          Details of how the Prize will be delivered to you (or
                          made available for collection) are published on the
                          Website.
                        </span>
                      </p>
                      <p className="mt-3">
                        <span style={{ fontSize: "12pt" }}>
                          7.2 If your personal details, including contact
                          information, changes at any time you should notify the
                          Promoter as soon as reasonably possible. Notifications
                          should be sent to the Promoter via email to
                          [hello@raffily.co.uk]. Notifications must include
                          details of the competition you have entered, your old
                          details and your new details. If your details change
                          within 5 days of the Closing Date, the Promoter will
                          use your old details if it needs to try to contact
                          you.
                        </span>
                      </p>
                      <p className="mt-3">
                        <span style={{ fontSize: "12pt" }}>
                          7.3 Any Cash Prize will be transferred directly to the
                          winners nominated bank account. The winner must
                          provide evidence that it is the sole or joint
                          beneficiary of the bank account. Failure to do so
                          within [14] days will result in disqualification from
                          the competition and the winner forfeiting the prize.
                          In such circumstances, the Promoter reserves the right
                          to offer the prize to the next eligible Entrant
                          selected from the correct entries that were received
                          before the Closing Date.
                        </span>
                      </p>
                      <p className="mt-3">
                        <span style={{ fontSize: "12pt" }}>
                          7.4 The Promoter does not accept any responsibility
                          and is not liable to pay any compensation if you are
                          unable to or do not take up the prize.
                        </span>
                      </p>
                      <p>
                        <span style={{ fontSize: "12pt" }}>&nbsp;</span>
                      </p>
                      <ol>
                        <li
                          style={{
                            fontSize: "12pt",
                          }}
                        >
                          <p>
                            <b>
                              <span
                                style={{
                                  fontSize: "12pt",
                                  textDecoration: "underline",
                                }}
                                className="font-modernEraBold"
                              >
                                8. Limitation of liability
                              </span>
                            </b>
                          </p>
                        </li>
                      </ol>
                      <p>
                        <span style={{ fontSize: "12pt" }}>
                          8.1 Insofar as is permitted by law, the Promoter, its
                          agents or distributors will not in any circumstances
                          be responsible or liable to compensate the winner or
                          accept any liability for any loss, damage, personal
                          injury or death occurring as a result of taking up the
                          prize except where it is caused by the negligence of
                          the Promoter, its agents or distributors or that of
                          their employees. Your statutory rights are not
                          affected.
                        </span>
                      </p>
                      <p>
                        <span style={{ fontSize: "12pt" }}>&nbsp;</span>
                      </p>
                      <ol>
                        <li
                          style={{
                            fontSize: "12pt",
                          }}
                        >
                          <p>
                            <b>
                              <span
                                style={{
                                  fontSize: "12pt",
                                  textDecoration: "underline",
                                }}
                                className="font-modernEraBold"
                              >
                                9. Data protection and publicity
                              </span>
                            </b>
                          </p>
                        </li>
                      </ol>
                      <p>
                        <span style={{ fontSize: "12pt" }}>
                          9.1 &nbsp; &nbsp;By entering the competition, you
                          agree that any personal information provided by you
                          with the competition entry may be held and used only
                          by the Promoter or its agents and
                        </span>
                      </p>
                      <p className="mt-3">
                        <span style={{ fontSize: "12pt" }}>
                          suppliers to administer the competition or as
                          otherwise set out in the Promoter’s Privacy Policy
                          [www.raffily.com/privacy-policy], a copy of which is
                          available on the Website.
                        </span>
                      </p>
                      <p className="mt-3">
                        <span style={{ fontSize: "12pt" }}>
                          9.2 If you are the winner of the competition, you
                          agree that the Promoter may use your name, image and
                          town or county of residence to announce the winner of
                          this competition. You further agree to participate in
                          any reasonable publicity required by the Promoter.
                        </span>
                      </p>
                      <p className="mt-3">
                        <span style={{ fontSize: "12pt" }}>
                          9.3 If you do not wish to participate in any
                          publicity, you must notify the Promoter prior to the
                          Closing Date. This will not affect your chances of
                          winning the Prize. If you do not agree to participate
                          in any publicity about the competition we may still
                          provide your details to the Advertising Standards
                          Authority. This is a legal requirement that we must
                          comply with to prove that the competition has been
                          properly administered and the Prize awarded.
                        </span>
                      </p>
                      <p className="mt-3">
                        <span style={{ fontSize: "12pt" }}>
                          9.4 If you are the winner of the competition, you may
                          be required to provide further personal information
                          and proof of your identity in order to confirm your
                          eligibility to claim the Prize and transfer ownership
                          of the Prize to you. You consent to the use of your
                          information in this way. You are entitled to request
                          further details about how your personal information is
                          being used. You may also withdraw your consent to your
                          personal information being used in such way but by
                          doing so you may prevent the Prize being transferred
                          to you. In such circumstances, you will be deemed to
                          have withdrawn from the competition and forfeit the
                          Prize. You will not be entitled to any refund of your
                          entry fee. The Promoter reserves the right to offer
                          the Prize to the next eligible Entrant selected from
                          the correct entries that were received before the
                          Closing Date.
                        </span>
                      </p>
                      <p className="mt-3">
                        <span style={{ fontSize: "12pt" }}>
                          9.5 Please note that under data protection laws you
                          are entitled to request that the Promoter does not
                          contact you and removes your details from its
                          database. If you make such a request you will be
                          withdrawing from the competition as it will not be
                          possible to contact you in the event that you are the
                          winner. You will not be entitled to any refund of any
                          entry fee if you withdraw from the competition. If you
                          do not wish any of your personal details to be used by
                          the Promoter for promotional purposes, please email
                          the Promoter at hello@raffily.co.uk prior to the
                          Closing Date.
                        </span>
                      </p>
                      <p>
                        <span style={{ fontSize: "12pt" }}>&nbsp;</span>
                      </p>
                      <ol>
                        <li
                          style={{
                            fontSize: "12pt",
                          }}
                        >
                          <p>
                            <b>
                              <span
                                style={{
                                  fontSize: "12pt",
                                  textDecoration: "underline",
                                }}
                                className="font-modernEraBold"
                              >
                                10. General
                              </span>
                            </b>
                          </p>
                        </li>
                      </ol>
                      <p>
                        <span style={{ fontSize: "12pt" }}>
                          10.1 The Promoter reserves the right to amend these
                          terms and conditions from time to time. The latest
                          version of these terms and conditions will be
                          available on the Website.
                        </span>
                      </p>
                      <p className="mt-3">
                        <span style={{ fontSize: "12pt" }}>
                          10.2 If there is any reason to believe that there has
                          been a breach of these terms and conditions, the
                          Promoter may, at its sole discretion, reserve the
                          right to exclude you from participating in the
                          competition and any future competitions
                        </span>
                      </p>
                      <p className="mt-3">
                        <span style={{ fontSize: "12pt" }}>
                          10.3 The Promoter reserves the right to hold void,
                          suspend, cancel, or amend the prize competition where
                          it becomes necessary to do so. There is no minimum
                          number of entries and the Promoter will not hold void,
                          suspend, cancel, or amend the prize competition due to
                          a lack of entries.
                        </span>
                      </p>
                      <p className="mt-3">
                        <span style={{ fontSize: "12pt" }}>
                          10.4 The competitions on the Website are in no way
                          sponsored, endorsed, administered by or associated
                          with Facebook. By entering the competitions, Entrants
                          agree that Facebook has no liability and is not
                          responsible for the administration or promotion of the
                          competitions.
                        </span>
                      </p>
                      <p className="mt-3">
                        <span style={{ fontSize: "12pt" }}>
                          10.5 These terms and conditions shall be governed by
                          English law, and the parties submit to the exclusive
                          jurisdiction of the courts of England and Wales.
                        </span>
                      </p>
                      <p className="mt-3">
                        <span style={{ fontSize: "12pt" }}>
                          10.6 You should print a copy of these terms and
                          conditions and keep them for your records
                        </span>
                      </p>
                      <p className="mt-3">
                        <span style={{ fontSize: "12pt" }}>
                          Last Updated: 20 December 2024
                        </span>
                      </p>
                      <p>
                        <br />
                      </p>

                      {/* <h2 className='font-bold ' style={{ fontSize: "26px", marginTop: "40px" }}> TERMS AND CONDITIONS FOR SUPPLIERS PARTICIPATING IN RAFFLES                                            </h2>
                                            <p>
                                                <br />
                                            </p>
                                            <p>
                                                The promoter is: RAFFILY LTD [raffily], Company Number [15658661] and whose
                                                registered office is at 28 Eaton Avenue, Buckshaw Village, Chorley,
                                                Lancashire PR7 7NA.
                                            </p>
                                            <p>
                                                If you wish to contact us for any reason, please email{" "}
                                                <a data-fr-linked="true" href="mailto:hello@raffily.co.uk">
                                                    hello@raffily.co.uk
                                                </a>
                                            </p>
                                            <p>
                                                <br />
                                            </p>
                                            <>
                                                <p style={{ textAlign: "justify" }}>
                                                    <b>
                                                        <span  style={{ fontSize: "12pt"}}
                                                                className='font-modernEraBold'>
                                                            1. Agreement to Provide Prizes
                                                        </span>
                                                    </b>
                                                </p>
                                                <p style={{ textAlign: "justify" }}>
                                                    <span style={{ fontSize: "12pt", }}>
                                                        1.1 By agreeing to participate in an online raffle hosted by Raffily
                                                        Limited (the “Promoter”) via the Promoter’s website at [www.raffily.co.uk]
                                                        (the “Website”), you, the supplier ("Supplier"), agree to provide the
                                                        designated prize ("Prize") as described during the raffle setup.
                                                    </span>
                                                </p>
                                                <p>
                                                    <br />
                                                </p>
                                                <p style={{ textAlign: "justify" }}>
                                                    <span style={{ fontSize: "12pt", }}>
                                                        1.2 You commit to sending the Prize directly to the winner within 7 days
                                                        of receiving notification of the winner’s details, regardless of the
                                                        number of raffle tickets sold. The delivery of the Prize is mandatory and
                                                        independent of the raffle’s total ticket sales.
                                                    </span>
                                                </p>
                                                <p>
                                                    <br />
                                                </p>
                                                <p style={{ textAlign: "justify" }}>
                                                    <span style={{ fontSize: "12pt", }}>
                                                        1.3 Failure to deliver the Prize as agreed will result in legal action,
                                                        including potential reimbursement for any expenses incurred by the
                                                        Promoter in resolving the issue with the raffle participants.
                                                    </span>
                                                </p>
                                                <p style={{ textAlign: "justify" }} className='mt-3'>
                                                    <b>
                                                        <span style={{ fontSize: "12pt", }} className='font-modernEraBold'>
                                                            2. &nbsp;Commission and Payment Terms
                                                        </span>
                                                    </b>
                                                </p>
                                                <p style={{ textAlign: "justify" }}>
                                                    <span style={{ fontSize: "12pt", }}>
                                                        2.1 The Promoter retains 25% of the total funds raised through ticket
                                                        sales as its commission for operating and hosting the raffle.
                                                    </span>
                                                </p>
                                                <p style={{ textAlign: "justify" }} className='mt-3' >
                                                    <span style={{ fontSize: "12pt", }}>
                                                        2.2 The remaining 75% of the funds raised will be payable to the Retailer
                                                        within 30 days of the raffle’s official end date.
                                                    </span>
                                                </p>
                                                <p style={{ textAlign: "justify" }} className='mt-3'>
                                                    <span style={{ fontSize: "12pt", }}>
                                                        2.3 Payments will be made via Bank Transfer. The Supplier is responsible
                                                        for providing accurate payment details to ensure timely transactions.
                                                    </span>
                                                </p>
                                                <p style={{ textAlign: "justify" }} className='mt-3'>
                                                    <span style={{ fontSize: "12pt", }}>
                                                        2.4 If there are delays in sending the payment, the Promoter will notify
                                                        the Supplier of the expected timeframe.
                                                    </span>
                                                </p>
                                                <p style={{ textAlign: "justify" }} className='mt-3'>
                                                    <b>
                                                        <span style={{ fontSize: "12pt", }} className='mt-3 font-modernEraBold' >
                                                            3. Responsibilities of the Supplier
                                                        </span>
                                                    </b>
                                                </p>
                                                <p style={{ textAlign: "justify" }}>
                                                    <span style={{ fontSize: "12pt", }}>
                                                        3.1 The Supplier guarantees the availability and authenticity of the Prize
                                                        as described during the raffle setup. Any misleading information about the
                                                        Prize is grounds for termination of this agreement and potential legal
                                                        liability.
                                                    </span>
                                                </p>
                                                <p style={{ textAlign: "justify" }} className='mt-3'>
                                                    <span style={{ fontSize: "12pt", }}>
                                                        3.2 The Supplier must ensure that the Prize is new, unused, and in proper
                                                        working condition (if applicable).
                                                    </span>
                                                </p>
                                                <p style={{ textAlign: "justify" }} className='mt-3'>
                                                    <span style={{ fontSize: "12pt", }}>
                                                        3.3 If the prize is a service/experience, the Supplier must ensure that
                                                        all elements of the Prize are fulfilled.
                                                    </span>
                                                </p>
                                                <p style={{ textAlign: "justify" }} className='mt-3'>
                                                    <span style={{ fontSize: "12pt", }}>
                                                        3.4 The Supplier agrees to bear all costs related to the shipping and
                                                        handling of the Prize to the winner.
                                                    </span>
                                                </p>
                                                <p style={{ textAlign: "justify" }} className='mt-3'>
                                                    <span style={{ fontSize: "12pt", }}>
                                                        3.5 The Supplier agrees to cooperate with Promoter in case of any disputes
                                                        or queries from the winner regarding the Prize.
                                                    </span>
                                                </p>
                                                <p style={{ textAlign: "justify" }} className='mt-3'>
                                                    <b>
                                                        <span style={{ fontSize: "12pt", }}  className='font-modernEraBold'>
                                                            4. Winner Notification and Prize Delivery
                                                        </span>
                                                    </b>
                                                </p>
                                                <p style={{ textAlign: "justify" }}>
                                                    <span style={{ fontSize: "12pt", }}>
                                                        4.1 The Promoter will notify the Supplier of the raffle winner within 1
                                                        day of the raffle’s end.
                                                    </span>
                                                </p>
                                                <p style={{ textAlign: "justify" }} className='mt-3'>
                                                    <span style={{ fontSize: "12pt", }}>
                                                        4.2 The Supplier agrees to contact the winner directly and arrange for the
                                                        delivery of the Prize. All communication regarding the Prize shipment and
                                                        tracking details should be shared with both the winner and the Promoter.
                                                    </span>
                                                </p>
                                                <p style={{ textAlign: "justify" }} className='mt-3'>
                                                    <span style={{ fontSize: "12pt", }}>
                                                        4.3 The Retailer is required to dispatch the Prize to the winner within 7
                                                        days of being notified of the winner's details.
                                                    </span>
                                                </p>
                                                <p style={{ textAlign: "justify" }} className='mt-3'>
                                                    <b>
                                                        <span style={{ fontSize: "12pt", }}  className='font-modernEraBold'>
                                                            5. Refunds and Cancellations
                                                        </span>
                                                    </b>
                                                </p>
                                                <p style={{ textAlign: "justify" }}>
                                                    <span style={{ fontSize: "12pt", }}>
                                                        5.1 In the unlikely event that the raffle is cancelled for any reason, the
                                                        Promoter will notify the Supplier immediately. Any funds collected will be
                                                        refunded to participants, and the Supplier will not be entitled to any
                                                        portion of the proceeds.
                                                    </span>
                                                </p>
                                                <p style={{ textAlign: "justify" }} className='mt-3'>
                                                    <span style={{ fontSize: "12pt", }}>
                                                        5.2 The Supplier is not entitled to request or initiate a cancellation
                                                        after agreeing to participate and the raffle has begun.
                                                    </span>
                                                </p>
                                                <p style={{ textAlign: "justify" }} className='mt-3'>
                                                    <b>
                                                        <span style={{ fontSize: "12pt", }}  className='font-modernEraBold'>
                                                            6. Liability and Indemnification
                                                        </span>
                                                    </b>
                                                </p>
                                                <p style={{ textAlign: "justify" }}>
                                                    <span style={{ fontSize: "12pt", }}>
                                                        6.1 The Supplier assumes full responsibility for the Prize and its
                                                        delivery. The Promoter is not liable for any damages, delays, or issues
                                                        related to the Prize’s quality or shipment.
                                                    </span>
                                                </p>
                                                <p style={{ textAlign: "justify" }} className='mt-3'>
                                                    <span style={{ fontSize: "12pt", }}>
                                                        6.2 The Supplier agrees to indemnify and hold harmless the Promoter, its
                                                        officers, employees, and agents from any claims, damages, losses, or
                                                        liabilities arising from the Prize or its delivery.
                                                    </span>
                                                </p>
                                                <p style={{ textAlign: "justify" }} className='mt-3'>
                                                    <b>
                                                        <span style={{ fontSize: "12pt", }}  className='font-modernEraBold'>
                                                            7. Termination of Agreement
                                                        </span>
                                                    </b>
                                                </p>
                                                <p style={{ textAlign: "justify" }}>
                                                    <span style={{ fontSize: "12pt", }}>
                                                        7.1 The Promoter reserves the right to terminate this agreement if the
                                                        Supplier fails to deliver the Prize, violates these Terms and Conditions,
                                                        or engages in fraudulent or unethical behaviour.
                                                    </span>
                                                </p>
                                                <p style={{ textAlign: "justify" }} className='mt-3'>
                                                    <span style={{ fontSize: "12pt", }}>
                                                        7.2 If this agreement is terminated, the Supplier forfeits any claim to
                                                        proceeds from ticket sales.
                                                    </span>
                                                </p>
                                                <p style={{ textAlign: "justify" }} className='mt-3'>
                                                    <b>
                                                        <span style={{ fontSize: "12pt", }} className='font-modernEraBold'>
                                                            8. Dispute Resolution
                                                        </span>
                                                    </b>
                                                </p>
                                                <p style={{ textAlign: "justify" }}>
                                                    <span style={{ fontSize: "12pt", }}>
                                                        8.1 Any disputes arising from this agreement shall be resolved through
                                                        negotiation between the Promoter and the Supplier. If a resolution cannot
                                                        be reached, the matter may be escalated to binding arbitration, subject to
                                                        the laws of England and Wales.
                                                    </span>
                                                </p>
                                                <p style={{ textAlign: "justify" }} className='mt-3'>
                                                    <b>
                                                        <span style={{ fontSize: "12pt", }} className='font-modernEraBold'>
                                                            9. Amendments to Terms
                                                        </span>
                                                    </b>
                                                </p>
                                                <p style={{ textAlign: "justify" }}>
                                                    <span style={{ fontSize: "12pt", }}>
                                                        9.1 The Promoter reserves the right to update or amend these Terms and
                                                        Conditions at any time. Any changes will be communicated to the Supplier
                                                        in writing, and continued participation in raffles will constitute
                                                        acceptance of the updated terms.
                                                    </span>
                                                </p>
                                                <h3 style={{ textAlign: "justify" }} className='mt-3'>
                                                    <b>
                                                        <span style={{ fontSize: "12pt", }} className='font-modernEraBold'>
                                                            10. Supplier Contact and Data Protection
                                                        </span>
                                                    </b>
                                                </h3>
                                                <h3 style={{ textAlign: "justify" }}>

                                                    <span style={{ fontSize: "12pt", }}>
                                                        10.1 <b>Opt-In Requirement</b>
                                                    </span>

                                                </h3>
                                                <ul>
                                                    <li
                                                        style={{
                                                            listStyleType: "disc",
                                                            fontSize: "12pt",
                                                            fontFamily: '"Noto Sans Symbols",sans-serif'
                                                        }}
                                                    >
                                                        <p style={{ textAlign: "justify" }}>
                                                            <span style={{ fontSize: "12pt", }}>
                                                                Suppliers and third-party retailers associated with the raffle are
                                                                strictly prohibited from contacting entrants unless the entrant has
                                                                expressly opted in to receive communications. Entrants will have the
                                                                opportunity to provide their consent by ticking the relevant opt-in
                                                                box during the registration or entry process.
                                                            </span>
                                                        </p>
                                                    </li>
                                                </ul>
                                                <p style={{ textAlign: "justify" }}>
                                                    <span style={{ fontSize: "12pt", }}>
                                                        10.2&nbsp;
                                                    </span>
                                                    <b>
                                                        <span style={{ fontSize: "12pt", }}>
                                                            Use of Entrant Data
                                                        </span>
                                                    </b>
                                                </p>
                                                <ul>
                                                    <li
                                                        style={{
                                                            listStyleType: "disc",
                                                            fontSize: "12pt",
                                                            fontFamily: '"Noto Sans Symbols",sans-serif'
                                                        }}
                                                    >
                                                        <p style={{ textAlign: "justify" }}>
                                                            <span style={{ fontSize: "12pt", }}>
                                                                Suppliers may only use the contact information of entrants who have
                                                                opted in for the purposes explicitly agreed to at the time of opt-in,
                                                                such as marketing communications, prize fulfilment, or other agreed
                                                                services.
                                                            </span>
                                                        </p>
                                                    </li>
                                                    <li
                                                        style={{
                                                            listStyleType: "disc",
                                                            fontSize: "12pt",
                                                            fontFamily: '"Noto Sans Symbols",sans-serif'
                                                        }}
                                                    >
                                                        <p style={{ textAlign: "justify" }}>
                                                            <span style={{ fontSize: "12pt", }}>
                                                                Entrant data must not be used, sold, shared, or transferred to third
                                                                parties for any purposes beyond those consented to by the entrant.
                                                            </span>
                                                        </p>
                                                    </li>
                                                </ul>
                                                <p style={{ textAlign: "justify" }}>
                                                    <span style={{ fontSize: "12pt", }}>
                                                        10.3&nbsp;
                                                    </span>
                                                    <b>
                                                        <span style={{ fontSize: "12pt", }}>
                                                            Compliance with Data Protection Laws
                                                        </span>
                                                    </b>
                                                </p>
                                                <ul>
                                                    <li
                                                        style={{
                                                            listStyleType: "disc",
                                                            fontSize: "12pt",
                                                            fontFamily: '"Noto Sans Symbols",sans-serif'
                                                        }}
                                                    >
                                                        <p style={{ textAlign: "justify" }}>
                                                            <span style={{ fontSize: "12pt", }}>
                                                                All suppliers and third-party retailers must comply with applicable
                                                                data protection laws, including but not limited to the General Data
                                                                Protection Regulation (GDPR) and the Data Protection Act 2018.
                                                            </span>
                                                        </p>
                                                    </li>
                                                    <li
                                                        style={{
                                                            listStyleType: "disc",
                                                            fontSize: "12pt",
                                                            fontFamily: '"Noto Sans Symbols",sans-serif'
                                                        }}
                                                    >
                                                        <p style={{ textAlign: "justify" }}>
                                                            <span style={{ fontSize: "12pt", }}>
                                                                Suppliers must ensure they have a lawful basis for processing the
                                                                entrant's personal data, such as explicit consent, and provide clear,
                                                                accessible information on how they will handle, store, and protect
                                                                this data.
                                                            </span>
                                                        </p>
                                                    </li>
                                                </ul>
                                                <p style={{ textAlign: "justify" }}>
                                                    <span style={{ fontSize: "12pt", }}>
                                                        10.4&nbsp;
                                                    </span>
                                                    <b>
                                                        <span style={{ fontSize: "12pt", }}>
                                                            Withdrawal of Consent
                                                        </span>
                                                    </b>
                                                </p>
                                                <ul>
                                                    <li
                                                        style={{
                                                            listStyleType: "disc",
                                                            fontSize: "12pt",
                                                            fontFamily: '"Noto Sans Symbols",sans-serif'
                                                        }}
                                                    >
                                                        <p style={{ textAlign: "justify" }}>
                                                            <span style={{ fontSize: "12pt", }}>
                                                                Entrants who have opted in to receive communications from suppliers or
                                                                third-party retailers retain the right to withdraw their consent at
                                                                any time. Suppliers must honour any requests to unsubscribe or opt out
                                                                within a reasonable timeframe, not exceeding 1 day.
                                                            </span>
                                                        </p>
                                                    </li>
                                                </ul>
                                                <p style={{ textAlign: "justify" }}>
                                                    <span style={{ fontSize: "12pt", }}>
                                                        10.5&nbsp;
                                                    </span>
                                                    <b>
                                                        <span style={{ fontSize: "12pt", }}>
                                                            Breach of Policy
                                                        </span>
                                                    </b>
                                                </p>
                                                <ul>
                                                    <li
                                                        style={{
                                                            listStyleType: "disc",
                                                            fontSize: "12pt",
                                                            fontFamily: '"Noto Sans Symbols",sans-serif'
                                                        }}
                                                    >
                                                        <p style={{ textAlign: "justify" }}>
                                                            <span style={{ fontSize: "12pt", }}>
                                                                Any breach of this clause by a supplier or third-party retailer may
                                                                result in the termination of the supplier's involvement with the
                                                                Promoter, and the Promoter reserves the right to take legal action or
                                                                report the breach to relevant data protection authorities.
                                                            </span>
                                                        </p>
                                                    </li>
                                                </ul>
                                                <p style={{ textAlign: "justify" }}>
                                                    <b>
                                                        <span style={{ fontSize: "12pt", }}  className='font-modernEraBold'>
                                                            11. Prohibited Items for Raffles on Raffily Limited
                                                        </span>
                                                    </b>
                                                </p>
                                                <p style={{ textAlign: "justify" }}>
                                                    <span style={{ fontSize: "12pt", }}>
                                                        11.1 Weapons (firearms, knives, ammunition, explosives or any other
                                                        item(s) that could be deemed a weapon)
                                                    </span>
                                                </p>
                                                <p style={{ textAlign: "justify" }} className='mt-3'>
                                                    <span style={{ fontSize: "12pt", }}>
                                                        11.2 Pyrotechnic devices and hazardous materials such as fireworks, or any
                                                        toxic/flammable/radioactive compounds
                                                    </span>
                                                </p>
                                                <p style={{ textAlign: "justify" }} className='mt-3'>
                                                    <span style={{ fontSize: "12pt", }}>
                                                        11.3 Pornographic material
                                                    </span>
                                                </p>
                                                <p style={{ textAlign: "justify" }} className='mt-3'>
                                                    <span style={{ fontSize: "12pt", }}>
                                                        11.4 Dating/escort services
                                                    </span>
                                                </p>
                                                <p style={{ textAlign: "justify" }} className='mt-3'>
                                                    <span style={{ fontSize: "12pt", }}>
                                                        11.5 Drugs or pharmaceutical compounds.&nbsp;
                                                    </span>
                                                </p>
                                                <p style={{ textAlign: "justify" }}>
                                                    <span style={{ fontSize: "12pt", }}>
                                                        11.5.1 Drug-related accessories
                                                    </span>
                                                </p>
                                                <p style={{ textAlign: "justify" }}>
                                                    <span style={{ fontSize: "12pt", }}>
                                                        11.5.2 Psychoactive and/or plant-based drugs and any literature
                                                        encouraging their use
                                                    </span>
                                                </p>
                                                <p style={{ textAlign: "justify" }}>
                                                    <span style={{ fontSize: "12pt", }}>
                                                        11.6 Counterfeit/imitations of goods
                                                    </span>
                                                </p>
                                                <p style={{ textAlign: "justify" }}>
                                                    <span style={{ fontSize: "12pt", }}>
                                                        11.7 Copyright Copies of software, videogames, movies, music, and any
                                                        other non-licensed content, such as books, music, and more.
                                                    </span>
                                                </p>
                                                <p style={{ textAlign: "justify" }} className='mt-3'>
                                                    <span style={{ fontSize: "12pt", }}>
                                                        11.8 Animals or Insects
                                                    </span>
                                                </p>
                                                <p style={{ textAlign: "justify" }} className='mt-3'>
                                                    <span style={{ fontSize: "12pt", }}>
                                                        11.9 Financial products/services
                                                    </span>
                                                </p>

                                                <p>
                                                    <br />
                                                </p>
                                                <p style={{ textAlign: "justify" }}>
                                                    <b>
                                                        <span style={{ fontSize: "12pt", }}>
                                                            By agreeing to participate in a raffle hosted by the Promoter, the
                                                            Supplier confirms that they have read, understood, and agree to these
                                                            Terms and Conditions.
                                                        </span>
                                                    </b>
                                                    <br />
                                                    <b>
                                                        <span style={{ fontSize: "10.5pt", }}>
                                                            Last Updated
                                                        </span>
                                                    </b>
                                                    <span style={{ fontSize: "10.5pt", }}>
                                                        : 04 October 2024
                                                    </span>
                                                </p>
                                                <p>
                                                    <br />
                                                </p>
                                            </> */}
                    </>
                  </div>
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

export default TermsConditionDetails;
