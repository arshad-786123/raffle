import { useEffect, useState } from "react";
import logo from "../../assets/main_logo.png";
import { API_INSTANCE } from "../../API/Instance";
import { API_ENDPOINTS } from "../../constants";
import { useNavigate } from "react-router";
import XLogo from "../../assets/xcom.png";
import FooterLogo from "@/assets/footer/footer_logo.png";
import Plus18 from "@/assets/footer/18Plus.png";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

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

const Footer = ({ setAuthenticationModal, authenticationModal }: any) => {
  const navigate = useNavigate();

  const handleLogoClick = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.preventDefault();
    navigate("/");
  };
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

  const termsAndCondition = () => {
    if (termsData?.description1) {
      const url = `/terms-and-conditions`;
      window.location.href = url;
    }
  };
  const privacyPolicy = () => {
    if (termsData?.descriptionPrivacy) {
      const url = `/privacy-policy`;
      window.location.href = url;
    }
  };
  const legalInfo = () => {
    if (termsData?.descriptionLegalInfo) {
      const url = `/faqs`;
      window.location.href = url;
    }
  };
  // const helpAndAccessibility = () => {
  //     if (termsData?.descriptionHelp) {
  //         const url = `/help-accessibility`;
  //         window.location.href = url;
  //     }
  // }
  const termsOfUse = () => {
    if (termsData?.descriptionTerms) {
      const url = `/terms-of-use`;
      window.location.href = url;
    }
  };
  const cookiesDis = () => {
    if (termsData?.descriptionCookies) {
      const url = `/cookies`;
      window.location.href = url;
    }
  };
  const acceptableUse = () => {
    if (termsData?.descriptionAcceptableUse) {
      const url = `/acceptable-use`;
      window.location.href = url;
    }
  };

  return (
    <div className="bg-raffles-footer w-full min-h-[513px] text-white pt-24 sm:px-20 px-4">
      {/* <div className="w-[95%] m-auto pb-2">
        <div className="block lg:flex justify-between ">
          <div>
            <img
              className="w-36"
              src={logo}
              alt="logo"
              onClick={handleLogoClick}
              style={{ cursor: "pointer" }}
            />
            <div className='flex flex-col lg:flex-row items-start lg:items-center gap-4 text-sm font-normal tracking-wide mt-8 lg:mt-4 ml-4 lg:ml-0'>
                            <p>Winners</p>
                            <p>Contact</p>
                        </div>
          </div>
          <div className="hidden lg:block">
            <h4 className="font-bold tracking-wider">Follow Us</h4>
            <div className="flex items-center gap-8 mt-2">
              <a
                href="https://x.com/RaffilyUK"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={XLogo} alt="Custom Logo" width="23" height="19" />
              </a>

              <a
                href=" https://www.instagram.com/raffilyuk/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  width="27"
                  height="25"
                  viewBox="0 0 27 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.0676 7.5491C20.8924 7.5491 21.561 6.90512 21.561 6.11073C21.561 5.31634 20.8924 4.67236 20.0676 4.67236C19.2428 4.67236 18.5742 5.31634 18.5742 6.11073C18.5742 6.90512 19.2428 7.5491 20.0676 7.5491Z"
                    fill="white"
                  />
                  <path
                    d="M13.4271 6.51709C9.96742 6.51709 7.15259 9.22764 7.15259 12.5593C7.15259 15.8909 9.96742 18.6014 13.4271 18.6014C16.8868 18.6014 19.7014 15.8909 19.7014 12.5593C19.7014 9.22764 16.8868 6.51709 13.4271 6.51709ZM13.4271 16.4297C11.2109 16.4297 9.40779 14.6935 9.40779 12.5593C9.40779 10.4251 11.2109 8.68886 13.4271 8.68886C15.6433 8.68886 17.4462 10.4251 17.4462 12.5593C17.4462 14.6935 15.6433 16.4297 13.4271 16.4297Z"
                    fill="white"
                  />
                  <path
                    d="M18.4084 24.8268H8.23612C4.0161 24.8268 0.583008 21.521 0.583008 17.4573V7.66151C0.583008 3.59782 4.01609 0.291992 8.23612 0.291992H18.4084C22.6285 0.291992 26.062 3.59782 26.062 7.66151V17.4573C26.062 21.5209 22.6285 24.8268 18.4084 24.8268ZM8.23612 2.60018C5.33771 2.60018 2.98002 4.8705 2.98002 7.66151V17.4573C2.98002 20.2483 5.33771 22.5186 8.23612 22.5186H18.4084C21.3069 22.5186 23.665 20.2483 23.665 17.4573V7.66151C23.665 4.8705 21.3069 2.60018 18.4084 2.60018H8.23612Z"
                    fill="white"
                  />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61565498777192"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  width="12"
                  height="25"
                  viewBox="0 0 12 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.98183 24.4496V12.5581H11.3906L11.8424 8.46024H7.98183L7.98769 6.40921C7.98769 5.3404 8.09314 4.76774 9.68725 4.76774H11.8182V0.669434H8.40901C4.31394 0.669434 2.87267 2.65734 2.87267 6.00039V8.46069H0.320068V12.5585H2.87267V24.4496H7.98183Z"
                    fill="white"
                  />
                </svg>
              </a>

              <a
                href="https://www.tiktok.com/@raffilyuk?_t=8qBknJtBDzk&_r=1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  width="30"
                  height="25"
                  fill="none"
                >
                  <path
                    fill="#ffffff"
                    d="M448 209.9a210.1 210.1 0 0 1 -122.8-39.3V349.4A162.6 162.6 0 1 1 185 188.3V278.2a74.6 74.6 0 1 0 52.2 71.2V0l88 0a121.2 121.2 0 0 0 1.9 22.2h0A122.2 122.2 0 0 0 381 102.4a121.4 121.4 0 0 0 67 20.1z"
                  />
                </svg>
              </a>

              <a
                href="https://www.linkedin.com/company/raffily/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  width="30"
                  height="25"
                  fill="none"
                >
                  <path
                    fill="#ffffff"
                    d="M100.28 448H7.4V149.06h92.78zm-46.14-342.41a53.59 53.59 0 1 1 53.59-53.59 53.59 53.59 0 0 1 -53.59 53.59zm394.36 342.41h-92.68V302.4c0-34.74-12.44-58.46-43.62-58.46-23.77 0-37.91 16-44.15 31.4-2.27 5.52-2.84 13.24-2.84 20.96v151.7H172.4s1.25-246.26 0-271.94h92.58v38.54a92.16 92.16 0 0 1 83.57-46.05c61.07 0 106.64 39.84 106.64 125.42z"
                  />
                </svg>
              </a>
            </div>
          </div>
          <div className="block lg:hidden flex lg:block items-center justify-between mt-10 w-[94%] m-auto">
            <h4 className="font-bold tracking-wider">Follow Us</h4>
            <div className="flex items-center gap-8 mt-2">
              <a
                href="https://x.com/RaffilyUK"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={XLogo} alt="Custom Logo" width="23" height="19" />
              </a>
              <a
                href=" https://www.instagram.com/raffilyuk/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  width="27"
                  height="25"
                  viewBox="0 0 27 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.0676 7.5491C20.8924 7.5491 21.561 6.90512 21.561 6.11073C21.561 5.31634 20.8924 4.67236 20.0676 4.67236C19.2428 4.67236 18.5742 5.31634 18.5742 6.11073C18.5742 6.90512 19.2428 7.5491 20.0676 7.5491Z"
                    fill="white"
                  />
                  <path
                    d="M13.4271 6.51709C9.96742 6.51709 7.15259 9.22764 7.15259 12.5593C7.15259 15.8909 9.96742 18.6014 13.4271 18.6014C16.8868 18.6014 19.7014 15.8909 19.7014 12.5593C19.7014 9.22764 16.8868 6.51709 13.4271 6.51709ZM13.4271 16.4297C11.2109 16.4297 9.40779 14.6935 9.40779 12.5593C9.40779 10.4251 11.2109 8.68886 13.4271 8.68886C15.6433 8.68886 17.4462 10.4251 17.4462 12.5593C17.4462 14.6935 15.6433 16.4297 13.4271 16.4297Z"
                    fill="white"
                  />
                  <path
                    d="M18.4084 24.8268H8.23612C4.0161 24.8268 0.583008 21.521 0.583008 17.4573V7.66151C0.583008 3.59782 4.01609 0.291992 8.23612 0.291992H18.4084C22.6285 0.291992 26.062 3.59782 26.062 7.66151V17.4573C26.062 21.5209 22.6285 24.8268 18.4084 24.8268ZM8.23612 2.60018C5.33771 2.60018 2.98002 4.8705 2.98002 7.66151V17.4573C2.98002 20.2483 5.33771 22.5186 8.23612 22.5186H18.4084C21.3069 22.5186 23.665 20.2483 23.665 17.4573V7.66151C23.665 4.8705 21.3069 2.60018 18.4084 2.60018H8.23612Z"
                    fill="white"
                  />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61565498777192"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  width="12"
                  height="25"
                  viewBox="0 0 12 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.98183 24.4496V12.5581H11.3906L11.8424 8.46024H7.98183L7.98769 6.40921C7.98769 5.3404 8.09314 4.76774 9.68725 4.76774H11.8182V0.669434H8.40901C4.31394 0.669434 2.87267 2.65734 2.87267 6.00039V8.46069H0.320068V12.5585H2.87267V24.4496H7.98183Z"
                    fill="white"
                  />
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@raffilyuk?_t=8qBknJtBDzk&_r=1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  width="30"
                  height="25"
                  fill="none"
                >
                  <path
                    fill="#ffffff"
                    d="M448 209.9a210.1 210.1 0 0 1 -122.8-39.3V349.4A162.6 162.6 0 1 1 185 188.3V278.2a74.6 74.6 0 1 0 52.2 71.2V0l88 0a121.2 121.2 0 0 0 1.9 22.2h0A122.2 122.2 0 0 0 381 102.4a121.4 121.4 0 0 0 67 20.1z"
                  />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/raffily/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  width="30"
                  height="25"
                  fill="none"
                >
                  <path
                    fill="#ffffff"
                    d="M100.28 448H7.4V149.06h92.78zm-46.14-342.41a53.59 53.59 0 1 1 53.59-53.59 53.59 53.59 0 0 1 -53.59 53.59zm394.36 342.41h-92.68V302.4c0-34.74-12.44-58.46-43.62-58.46-23.77 0-37.91 16-44.15 31.4-2.27 5.52-2.84 13.24-2.84 20.96v151.7H172.4s1.25-246.26 0-271.94h92.58v38.54a92.16 92.16 0 0 1 83.57-46.05c61.07 0 106.64 39.84 106.64 125.42z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 block lg:flex items-center justify-center lg:justify-between w-full">
            <p className="hidden lg:block font-light text-sm tracking-widest">
              © Raffily 2024 - All rights reserved
              <span className="age-restriction">18+</span>
            </p>
            <div className="block lg:flex items-center gap-3 lg:gap-6">
              <p
                className="font-light  text-sm font-normal mt-3 lg:mt-1 tracking-widest"
                style={{ cursor: "pointer" }}
                onClick={() => termsAndCondition()}
              >
                Terms and Conditions
              </p>
              <div className="h-8 w-[.2px] bg-gray-400 hidden lg:block "></div>
              <p
                className="font-light  text-sm font-normal mt-3 lg:mt-1 tracking-widest"
                style={{ cursor: "pointer" }}
                onClick={() => privacyPolicy()}
              >
                Privacy Policy
              </p>

              <div className="h-8 w-[.2px] bg-gray-400 hidden lg:block "></div>
              <p
                className="font-light  text-sm font-normal mt-3 lg:mt-1  tracking-widest"
                style={{ cursor: "pointer" }}
                onClick={() => termsOfUse()}
              >
                Terms of Use
              </p>
              <div className="h-8 w-[.2px] bg-gray-400 hidden lg:block "></div>
              <p
                className="font-light  text-sm font-normal mt-3 lg:mt-1  tracking-widest"
                style={{ cursor: "pointer" }}
                onClick={() => cookiesDis()}
              >
                Cookies
              </p>
              <div className="h-8 w-[.2px] bg-gray-400 hidden lg:block "></div>
              <p
                className="font-light  text-sm font-normal mt-3 lg:mt-1  tracking-widest"
                style={{ cursor: "pointer" }}
                onClick={() => acceptableUse()}
              >
                Acceptable Use
              </p>
              <div className="h-8 w-[.2px] bg-gray-400 hidden lg:block "></div>
              <p
                className="font-light  text-sm font-normal mt-3 lg:mt-1  tracking-widest"
                style={{ cursor: "pointer" }}
                onClick={() => legalInfo()}
              >
                FAQ
              </p>
            </div>
          </div>

        <div className="mt-12 block lg:flex items-center justify-center lg:justify-between w-full">
          <div className="lg:ml-[250px] whitespace-nowrap lg:mr-2">
            <p className="hidden lg:block font-light text-sm tracking-widest">
              © Raffily 2024 - All rights reserved
              <span className="age-restriction">18+</span>
            </p>
          </div>

          <div className="block lg:flex items-center gap-3 lg:gap-6 whitespace-nowrap">
            <p
              className="font-light text-sm font-normal mt-3 lg:mt-1 tracking-widest"
              style={{ cursor: "pointer" }}
              onClick={() => termsAndCondition()}
            >
              Terms and Conditions
            </p>
            <div className="h-8 w-[.2px] bg-gray-400 hidden lg:block"></div>

            <p
              className="font-light text-sm font-normal mt-3 lg:mt-1 tracking-widest"
              style={{ cursor: "pointer" }}
              onClick={() => privacyPolicy()}
            >
              Privacy Policy
            </p>
            <div className="h-8 w-[.2px] bg-gray-400 hidden lg:block"></div>

            <p
              className="font-light text-sm font-normal mt-3 lg:mt-1 tracking-widest"
              style={{ cursor: "pointer" }}
              onClick={() => termsOfUse()}
            >
              Terms of Use
            </p>
            <div className="h-8 w-[.2px] bg-gray-400 hidden lg:block"></div>

            <p
              className="font-light text-sm font-normal mt-3 lg:mt-1 tracking-widest"
              style={{ cursor: "pointer" }}
              onClick={() => cookiesDis()}
            >
              Cookies
            </p>
            <div className="h-8 w-[.2px] bg-gray-400 hidden lg:block"></div>

            <p
              className="font-light text-sm font-normal mt-3 lg:mt-1 tracking-widest"
              style={{ cursor: "pointer" }}
              onClick={() => acceptableUse()}
            >
              Acceptable Use
            </p>
            <div className="h-8 w-[.2px] bg-gray-400 hidden lg:block"></div>

            <p
              className="font-light text-sm font-normal mt-3 lg:mt-1 tracking-widest"
              style={{ cursor: "pointer" }}
              onClick={() => legalInfo()}
            >
              FAQ
            </p>
          </div>
        </div>

        <p className="block lg:hidden font-light text-xs text-center mt-6 tracking-widest">
          © Raffily 2024 - All rights reserved
          <span className="age-restriction" style={{ fontSize: "13px" }}>
            18+
          </span>
        </p>
      </div> */}
      <div className="flex flex-wrap justify-between items-center mb-7 gap-8">
        <div className="lg:w-[313px] w-full mb-7">
        <div className="mb-5">
  <img 
    className="w-[124px] h-[30px] md:w-[257px] md:h-[60px] object-contain" 
    src={FooterLogo} 
    alt="Footer Logo"
  />
</div>
          <h5 className="text-[16px] leading-[16px] font-[500] mb-3">
            W
            <span className="bg-gradient-to-b from-[#FF7385] via-[#FD98E8] to-[#AD6FFF] bg-clip-text text-transparent font-bold">
              IN:
            </span>
            GEN
            <span className="bg-gradient-to-b from-[#FF7385] to-[#FD98E8] bg-clip-text text-transparent font-bold">
              UIN
            </span>
            E
          </h5>
          <p className="">
            The UK’s leading raffle platform connecting you with exclusive
            prizes and the brands you love
          </p>
        </div>
        <div className="lg:w-[313px] w-full mb-7">
          <div className="">
            <h5 className="font-bold font-modernBold text-[20px] leading-[24px] mb-7">
              Raffily
            </h5>
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-5">
                <Link
                  to="/"
                  className="text-[16px] leading-[16px] font-[700] opacity-[60%] mb-3"
                >
                  Home
                </Link>
                <Link
                  to="/about-page"
                  className="text-[16px] leading-[16px] font-[700] opacity-[60%] mb-3"
                >
                  About Raffily
                </Link>
                <Link
                  to="/raffily-green-policy"
                  className="text-[16px] leading-[16px] font-[700] opacity-[60%] mb-3"
                >
                  Raffily Green Policy
                </Link>
                <Link
                  to="/winners"
                  className="text-[16px] leading-[16px] font-[700] opacity-[60%] mb-3"
                >
                  Winners
                </Link>
              </div>
              <div className="flex flex-col gap-5">
                <Link
                  to="/past-draws"
                  className="text-[16px] leading-[16px] font-[700] opacity-[60%] mb-3"
                >
                  Past Draws
                </Link>
                <Link
                  to=""
                  className="text-[16px] leading-[16px] font-[700] opacity-[60%] mb-3"
                  onClick={() => {
                    setAuthenticationModal({
                      ...authenticationModal,
                      isSignUpOpen: true,
                    });
                  }}
                >
                  Join Raffily
                </Link>
                <Link
                  to=""
                  className="text-[16px] leading-[16px] font-[700] opacity-[60%] mb-3"
                  onClick={() => {
                    setAuthenticationModal({
                      ...authenticationModal,
                      isSignUpOpen: true,
                    });
                  }}
                >
                  Sign In
                </Link>
                <Link
                  to="/contact-us"
                  className="text-[16px] leading-[16px] font-[700] opacity-[60%] mb-3"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:w-[450px] w-full mb-7">
          <div className="">
            <h5 className="font-bold font-modernBold text-[20px] leading-[24px] mb-7">
              Legal
            </h5>
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-5 flex-wrap">
                <Link
                  to="/terms-and-conditions"
                  className="text-[16px] leading-[16px] font-[700] opacity-[60%] mb-3"
                >
                  Entrant Terms & Conditions
                </Link>
                <Link
                  to="/merchant-terms-and-condition"
                  className="text-[16px] leading-[16px] font-[700] opacity-[60%] mb-3"
                >
                  Merchant Terms & Conditions
                </Link>

                <Link
                  to="/marketing-communication-policy"
                  className="text-[16px] leading-[16px] font-[700] opacity-[60%] mb-3"
                >
                  Marketing Communications Policy
                </Link>
                <Link
                  to="/terms-of-use"
                  className="text-[16px] leading-[16px] font-[700] opacity-[60%] mb-3"
                >
                  Terms of Use
                </Link>
                <Link
                  to="/acceptable-use"
                  className="text-[16px] leading-[16px] font-[700] opacity-[60%] mb-3"
                >
                  Acceptable Use
                </Link>
              </div>
              <div className="flex flex-col gap-5">
                <Link
                  to="/privacy-policy"
                  className="text-[16px] leading-[16px] font-[700] opacity-[60%] mb-3"
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/cookies"
                  className="text-[16px] leading-[16px] font-[700] opacity-[60%] mb-3"
                >
                  Cookies
                </Link>
                <Link
                  to="/how-it-work"
                  className="text-[16px] leading-[16px] font-[700] opacity-[60%] mb-3"
                >
                  How it Works
                </Link>
                <Link
                  to="/entrant-faqs"
                  className="text-[16px] leading-[16px] font-[700] opacity-[60%] mb-3"
                >
                  Entrant FAQs
                </Link>
                {/* <Link
                  to="/business-faqs"
                  className="text-[16px] leading-[16px] font-[700] opacity-[60%] mb-3"
                >
                  Merchant FAQ
                </Link> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center lg:items-start lg:justify-start mb-8">
        <h5 className="font-bold font-modernBold text-[20px] leading-[24px] mb-4">
          Follow us
        </h5>
        <div className="">
          <div className="flex items-center sm:space-x-4 space-x-5">
            {/* TikTok Icon */}
            <div className="p-3 rounded-full bg-[#45356b] size-11">
              <a
                href="https://www.tiktok.com/@raffilyuk?_t=8qBknJtBDzk&_r=1"
                target="_blank"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.4074 4.74074V7.7037C15.4074 7.86087 15.345 8.0116 15.2338 8.12273C15.1227 8.23386 14.972 8.2963 14.8148 8.2963C13.5769 8.29917 12.3568 8.00151 11.2593 7.42889V10.3704C11.2593 11.8634 10.6661 13.2954 9.61038 14.3511C8.55462 15.4069 7.1227 16 5.62963 16C4.13656 16 2.70464 15.4069 1.64888 14.3511C0.59312 13.2954 0 11.8634 0 10.3704C0 7.63704 1.99333 5.22074 4.63704 4.74963C4.72232 4.73447 4.8099 4.73819 4.89359 4.76054C4.97728 4.78288 5.05506 4.8233 5.12144 4.87895C5.18782 4.93459 5.2412 5.00412 5.27781 5.08263C5.31442 5.16113 5.33337 5.24671 5.33333 5.33333V8.49556C5.33337 8.60771 5.30158 8.71757 5.24166 8.81237C5.18173 8.90718 5.09614 8.98303 4.99481 9.03111C4.75529 9.14471 4.55063 9.32049 4.40218 9.54013C4.25374 9.75978 4.16695 10.0152 4.15088 10.2798C4.1348 10.5444 4.19002 10.8085 4.31077 11.0445C4.43153 11.2805 4.6134 11.4798 4.83741 11.6216C5.06142 11.7633 5.31937 11.8424 5.58434 11.8505C5.84932 11.8586 6.11161 11.7954 6.34387 11.6676C6.57613 11.5398 6.76983 11.352 6.90478 11.1239C7.03974 10.8957 7.11099 10.6355 7.11111 10.3704V0.592593C7.11111 0.435427 7.17354 0.284699 7.28468 0.173566C7.39581 0.0624337 7.54654 0 7.7037 0H10.6667C10.8238 0 10.9746 0.0624337 11.0857 0.173566C11.1968 0.284699 11.2593 0.435427 11.2593 0.592593C11.2602 1.53528 11.6352 2.43908 12.3017 3.10567C12.9683 3.77225 13.8721 4.14717 14.8148 4.14815C14.972 4.14815 15.1227 4.21058 15.2338 4.32171C15.345 4.43285 15.4074 4.58358 15.4074 4.74074Z"
                    fill="white"
                  />
                </svg>
              </a>
            </div>

            {/* Instagram Icon */}
            <div className="p-3 rounded-full bg-[#45356b] size-11">
              <a href="https://www.instagram.com/raffilyuk/" target="_blank">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.375 1.6875H5.625C4.58105 1.68862 3.58018 2.10382 2.842 2.842C2.10382 3.58018 1.68862 4.58105 1.6875 5.625V12.375C1.68862 13.4189 2.10382 14.4198 2.842 15.158C3.58018 15.8962 4.58105 16.3114 5.625 16.3125H12.375C13.4189 16.3114 14.4198 15.8962 15.158 15.158C15.8962 14.4198 16.3114 13.4189 16.3125 12.375V5.625C16.3114 4.58105 15.8962 3.58018 15.158 2.842C14.4198 2.10382 13.4189 1.68862 12.375 1.6875ZM9 12.375C8.33249 12.375 7.67997 12.1771 7.12495 11.8062C6.56993 11.4354 6.13735 10.9083 5.88191 10.2916C5.62646 9.67486 5.55962 8.99626 5.68985 8.34157C5.82008 7.68688 6.14151 7.08552 6.61351 6.61351C7.08552 6.14151 7.68688 5.82008 8.34157 5.68985C8.99626 5.55962 9.67486 5.62646 10.2916 5.88191C10.9083 6.13735 11.4354 6.56993 11.8062 7.12495C12.1771 7.67997 12.375 8.33249 12.375 9C12.3741 9.89482 12.0182 10.7527 11.3855 11.3855C10.7527 12.0182 9.89482 12.3741 9 12.375ZM13.2188 5.625C13.0519 5.625 12.8887 5.57552 12.75 5.4828C12.6112 5.39009 12.5031 5.25831 12.4392 5.10414C12.3754 4.94996 12.3587 4.78031 12.3912 4.61664C12.4238 4.45297 12.5041 4.30263 12.6221 4.18463C12.7401 4.06663 12.8905 3.98627 13.0541 3.95371C13.2178 3.92116 13.3875 3.93787 13.5416 4.00173C13.6958 4.06559 13.8276 4.17373 13.9203 4.31249C14.013 4.45124 14.0625 4.61437 14.0625 4.78125C14.0625 5.00503 13.9736 5.21964 13.8154 5.37787C13.6571 5.53611 13.4425 5.625 13.2188 5.625ZM11.25 9C11.25 9.44501 11.118 9.88002 10.8708 10.25C10.6236 10.62 10.2722 10.9084 9.86104 11.0787C9.4499 11.249 8.9975 11.2936 8.56105 11.2068C8.12459 11.12 7.72368 10.9057 7.40901 10.591C7.09434 10.2763 6.88005 9.87541 6.79323 9.43895C6.70642 9.0025 6.75097 8.5501 6.92127 8.13896C7.09157 7.72783 7.37996 7.37643 7.74997 7.12919C8.11998 6.88196 8.55499 6.75 9 6.75C9.59674 6.75 10.169 6.98705 10.591 7.40901C11.0129 7.83097 11.25 8.40326 11.25 9Z"
                    fill="white"
                  />
                </svg>
              </a>
            </div>

            {/* LinkedIn Icon */}
            <div className="p-3 rounded-full bg-[#45356b] size-11">
              <a
                href="https://www.linkedin.com/company/raffily/"
                target="_blank"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_41_3125)">
                    <path
                      d="M2.31125 0.8125C1.21133 0.8125 0.492188 1.53476 0.492188 2.48407C0.492188 3.41241 1.18991 4.15527 2.26904 4.15527H2.28992C3.41135 4.15527 4.10925 3.41241 4.10925 2.48407C4.08829 1.53476 3.41135 0.8125 2.31125 0.8125Z"
                      fill="white"
                    />
                    <path
                      d="M2.31125 0.8125C1.21133 0.8125 0.492188 1.53476 0.492188 2.48407C0.492188 3.41241 1.18991 4.15527 2.26904 4.15527H2.28992C3.41135 4.15527 4.10925 3.41241 4.10925 2.48407C4.08829 1.53476 3.41135 0.8125 2.31125 0.8125Z"
                      fill="white"
                    />
                    <path
                      d="M0.683594 5.47559H3.89911V15.1496H0.683594V5.47559Z"
                      fill="white"
                    />
                    <path
                      d="M0.683594 5.47559H3.89911V15.1496H0.683594V5.47559Z"
                      fill="white"
                    />
                    <path
                      d="M11.7892 5.24902C10.0546 5.24902 8.89139 6.87903 8.89139 6.87903V5.47607H5.67578V15.1501H8.8912V9.74774C8.8912 9.45853 8.91217 9.16977 8.99713 8.96295C9.22958 8.38544 9.75858 7.78714 10.6469 7.78714C11.8105 7.78714 12.2758 8.67429 12.2758 9.97479V15.1501H15.4911V9.60318C15.4911 6.63174 13.9046 5.24902 11.7892 5.24902Z"
                      fill="white"
                    />
                    <path
                      d="M11.7892 5.24902C10.0546 5.24902 8.89139 6.87903 8.89139 6.87903V5.47607H5.67578V15.1501H8.8912V9.74774C8.8912 9.45853 8.91217 9.16977 8.99713 8.96295C9.22958 8.38544 9.75858 7.78714 10.6469 7.78714C11.8105 7.78714 12.2758 8.67429 12.2758 9.97479V15.1501H15.4911V9.60318C15.4911 6.63174 13.9046 5.24902 11.7892 5.24902Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_41_3125">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </a>
            </div>

            {/* Facebook Icon */}
            <div className="p-3 rounded-full bg-[#45356b] size-11">
              <a
                href="https://www.facebook.com/profile.php?id=61556451772407"
                target="_blank"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 12 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.98183 24.4496V12.5581H11.3906L11.8424 8.46024H7.98183L7.98769 6.40921C7.98769 5.3404 8.09314 4.76774 9.68725 4.76774H11.8182V0.669434H8.40901C4.31394 0.669434 2.87267 2.65734 2.87267 6.00039V8.46069H0.320068V12.5585H2.87267V24.4496H7.98183Z"
                    fill="white"
                  />
                </svg>
              </a>
            </div>

            {/* X (formerly Twitter) Icon */}
            <div className="p-3 rounded-full bg-[#45356b] size-11">
              <a href="https://x.com/RaffilyUK" target="_blank">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.7967 15.1758C14.7429 15.2738 14.6637 15.3556 14.5676 15.4126C14.4714 15.4696 14.3616 15.4998 14.2498 15.5H10.4998C10.3946 15.5 10.2911 15.4734 10.199 15.4227C10.1068 15.3721 10.0289 15.2989 9.97247 15.2102L6.80919 10.2391L2.21232 15.2953C2.10026 15.4157 1.94526 15.487 1.78095 15.4939C1.61663 15.5008 1.45622 15.4426 1.33451 15.332C1.2128 15.2214 1.13959 15.0673 1.13076 14.903C1.12192 14.7388 1.17817 14.5777 1.28732 14.4547L6.1131 9.14219L1.22247 1.46094C1.16224 1.36644 1.12852 1.25749 1.12485 1.14548C1.12117 1.03348 1.14768 0.922555 1.20159 0.824314C1.25551 0.726073 1.33484 0.644135 1.43129 0.587078C1.52774 0.530021 1.63775 0.499946 1.74982 0.5H5.49982C5.605 0.500033 5.70848 0.526613 5.80067 0.57728C5.89285 0.627946 5.97075 0.701058 6.02716 0.789844L9.19044 5.76094L13.7873 0.704687C13.8994 0.584312 14.0544 0.512956 14.2187 0.50609C14.383 0.499225 14.5434 0.557404 14.6651 0.668012C14.7868 0.778621 14.86 0.932746 14.8689 1.09697C14.8777 1.2612 14.8215 1.42228 14.7123 1.54531L9.88653 6.85391L14.7772 14.5398C14.8371 14.6344 14.8705 14.7433 14.8739 14.8551C14.8773 14.967 14.8507 15.0777 14.7967 15.1758Z"
                    fill="white"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <hr className="h-px my-2 bg-[rgba(255, 255, 255, 1] opacity-[20%]"></hr>

      <div className="grid gap-5 grid-cols-1 lg:grid-cols-3 py-4">
        <p className="font-[500] text-[14px] leading-[19.6px] opacity-[60%] lg:justify-self-start justify-self-center">
          © Raffily 2024 – All Rights Reserved
        </p>
        <p className="font-[500] text-[14px] leading-[19.6px] opacity-[60%] text-center lg:px-0 px-6">
          Please note that Raffily Ltd is not a lottery but a prize draw. Our
          online draws to win prizes include a free method of entry via post.
          Entrants will be entered into the prize draw of the raffles that they
          correctly enter regardless of the method of entry.
        </p>
        <div className="lg:justify-self-end justify-self-center">
          <img src={Plus18} alt="Plus18" width={28} height={28} />
        </div>
      </div>
    </div>
  );
};

export default Footer;
