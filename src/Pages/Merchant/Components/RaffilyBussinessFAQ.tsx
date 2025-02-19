import { useNavigate } from "react-router-dom";
import Rectangle from "../../../assets/merchant/Rectangle.png";

const RaffilyBussinessFAQ = () => {
  const navigate = useNavigate();
  const handleBusinessFaq = () => {
    navigate("/business-faqs");
  };
  return (
    <div className="container-fluid px-4 lg:px-10 lg:py-10">
      <div className="lg:flex lg:space-x-12 space-y-8 lg:space-y-0">
        {/* Left Side Image */}
        <div className="lg:w-1/2">
          <h3
            className="text-[28px] sm:text-[40px] font-modernExtraBold text-raffles-blue block lg:hidden md:text-center"
            style={{ fontFamily: "ModernEraBold" }}
          >
            Raffily's Business FAQs
          </h3>
          <img
            src={Rectangle}
            alt="Raffle"
            className="w-full h-[342px] sm:h-[680px] object-cover rounded-lg"
          />
        </div>

        {/* Right Side Content and Accordion */}
        <div className="lg:w-1/2 content-center">
          <div className="space-y-4">
            {/* Content Description */}
            <div className="lg:pt-0 pt-4">
              <h3
                className="text-[28px] sm:text-[40px] font-modernExtraBold text-raffles-blue hidden lg:block"
                style={{ fontFamily: "ModernEraBold" }}
              >
                Raffily's Business FAQs
              </h3>
              <p className="text-sm sm:text-base text-raffles-light-blue mt-2">
                To make it easier for businesses to get started and succeed with
                Raffily, we've created a comprehensive Business FAQ page! This
                resource is designed to answer all your questions and provide
                you with the information you need to run a successful raffle on
                our platform.
              </p>
            </div>

            {/* FAQ Accordion */}
            <div className="space-y-4 mt-8">
              <h2
                className="text-lg md:text-2xl font-modernExtraBold mb-4"
                style={{ fontFamily: "ModernEraBold", color: "#FF7385" }}
              >
                Have Questions? We’ve Got Answers!
              </h2>

              {/* FAQ List */}
              <div className="bg-[#FFFFFF] rounded-lg shadow-md">
                <h2
                  className="text-base lg:text-xl font-modernMedium text-white py-6 px-9 bg-[#FF7385] rounded-t-3xl"
                  style={{ fontFamily: "ModernEraBold" }}
                >
                  Learn more about:
                </h2>

                <ul
                  className="space-y-6 font-modernExtraBold text-raffles-blue py-4 px-7 text-base lg:text-xl"
                  style={{ fontFamily: "ModernEraBold" }}
                >
                  <li className="border-b border-gray-300 pb-5">
                    How Raffily works for businesses
                  </li>
                  <li className="border-b border-gray-300 pb-5">
                    Setting up your raffle
                  </li>
                  <li className="border-b border-gray-300 pb-5">
                    Payment processes
                  </li>
                  <li>
                    Compliance guidelines to ensure you meet our standards
                  </li>
                </ul>
                <div className="mt-2 py-2 px-3">
                  <button
                    className="text-raffles-blue border border-solid border-[#110044] px-6 py-2 rounded-md items-center w-full hover:bg-gray-200"
                    style={{ fontFamily: "ModernEraBold" }}
                    onClick={handleBusinessFaq}
                  >
                    Business FAQs
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RaffilyBussinessFAQ;
