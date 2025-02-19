import { useEffect, useState } from "react";
import logo from "../../assets/main_logo.png";
import { API_INSTANCE } from "../../API/Instance";
import { API_ENDPOINTS } from "../../constants";
import { useNavigate } from "react-router";
import XLogo from "../../assets/xcom.png";

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

const AdminFooter = ({ setAuthenticationModal, authenticationModal }: any) => {
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
      const url = `/entrant-faqs`;
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
    <>
      {/* <div className="bg-[#2D234A] text-white pt-12  z-50">
                <div className="w-[95%] m-auto pb-2">
                    <div className="block lg:flex justify-between ">
                        <div>
                            <img
                                className="w-36"
                                src={logo}
                                alt="logo"
                                onClick={handleLogoClick}
                                style={{ cursor: "pointer" }}
                            />
                            
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
                                    href="https://www.instagram.com/raffilyuk/"
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


                    <div className="mt-12 block flex  lg:block items-center justify-center lg:justify-between w-[90%]">
                        <div className="lg:ml-[277px] whitespace-nowrap lg:mr-2">
                            <p className="hidden lg:block font-light text-sm tracking-widest">
                                © Raffily 2024 - All rights reserved
                                <span className="age-restriction">18+</span>
                            </p>
                        </div>

                        <div className="block lg:flex items-center gap-3 lg:gap-5 whitespace-nowrap m-auto lg:justify-center">
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
                </div>
            </div> */}

      <div className="bg-[#2D234A] text-white pt-12 z-50 w-[100%]">
        <div className=" w-[95%] mx-auto pb-2">
          {/* Top Section */}
          <div className="ipad-margin">
            <div className="flex flex-col lg:flex-row justify-between items-center">
              {/* Logo Section */}
              <div className="mb-6 lg:mb-0">
                <img
                  className="w-36 cursor-pointer"
                  src={logo}
                  alt="logo"
                  onClick={handleLogoClick}
                  style={{ cursor: "pointer" }}
                />
              </div>

              {/* Social Media Links */}
              <div>
                <h4 className="font-bold tracking-wider text-center lg:text-left">
                  Follow Us
                </h4>
                <div className="flex gap-6 mt-4 justify-center lg:justify-start">
                  <a
                    href="https://x.com/RaffilyUK"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={XLogo} alt="Custom Logo" width="23" height="19" />
                  </a>
                  <a
                    href="https://www.instagram.com/raffilyuk/"
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
                    href="https://www.facebook.com/people/Raffily/61556451772407/"
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
          </div>

          {/* Footer Section */}
          <div className="mt-12 flex flex-col lg:flex-row justify-between items-center ipad-margin">
            {/* Left Section */}
            <div className="text-center lg:text-left">
              <p className="font-light text-sm tracking-widest">
                © Raffily 2024 - All rights reserved{" "}
                <span className="age-restriction">18+</span>
              </p>
            </div>

            {/* Links Section */}
            <div className="flex flex-wrap justify-center lg:justify-end gap-4 mt-4 lg:mt-0">
              <p
                className="font-light text-sm cursor-pointer tracking-widest"
                style={{ cursor: "pointer" }}
                onClick={() => termsAndCondition()}
              >
                Terms and Conditions
              </p>
              <div className="h-8 w-[.2px] bg-gray-400 hidden lg:block"></div>

              <p
                className="font-light text-sm cursor-pointer tracking-widest"
                style={{ cursor: "pointer" }}
                onClick={() => privacyPolicy()}
              >
                Privacy Policy
              </p>
              <div className="h-8 w-[.2px] bg-gray-400 hidden lg:block"></div>

              <p
                className="font-light text-sm cursor-pointer tracking-widest"
                style={{ cursor: "pointer" }}
                onClick={() => termsOfUse()}
              >
                Terms of Use
              </p>
              <div className="h-8 w-[.2px] bg-gray-400 hidden lg:block"></div>

              <p
                className="font-light text-sm cursor-pointer tracking-widest"
                style={{ cursor: "pointer" }}
                onClick={() => cookiesDis()}
              >
                Cookies
              </p>
              <div className="h-8 w-[.2px] bg-gray-400 hidden lg:block"></div>

              <p
                className="font-light text-sm cursor-pointer tracking-widest"
                style={{ cursor: "pointer" }}
                onClick={() => acceptableUse()}
              >
                Acceptable Use
              </p>
              <div className="h-8 w-[.2px] bg-gray-400 hidden lg:block"></div>

              <p
                className="font-light text-sm cursor-pointer tracking-widest"
                style={{ cursor: "pointer" }}
                onClick={() => legalInfo()}
              >
                FAQ
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminFooter;
