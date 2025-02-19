import React from "react";
import mark from "../../../assets/merchant/mark.svg";
import Checkmark from "../../../assets/merchant/CheckMark.svg";
import Lockmark from "../../../assets/merchant/LockMark.svg";
import Customermark from "../../../assets/merchant/CustomerMark.svg";
import Settingmark from "../../../assets/merchant/SettingMark.svg";

const RaffilyStandard = () => {
  const sections = [
    {
      id: 1,
      title: "Guaranteeing Fairness",
      description:
        "We ensure that each raffle follows clear rules and offers participants an equal chance to win. Our approval process helps us verify that all prizes are legitimate and that the terms are clear and fair.",
      icon: Checkmark,
    },
    {
      id: 2,
      title: "Secure Transactions & Compliance",
      description:
        "Raffily ensures that all financial transactions are secure, compliant with legal regulations, and seamlessly integrated with trusted payment gateways.",
      icon: Lockmark,
    },
    {
      id: 3,
      title: "Enhancing Customer Trust",
      description:
        "Customers need to trust that the raffles they're entering are genuine. When your raffle is approved by Raffily, it carries our seal of integrity. This boosts confidence, encouraging more entries and helping you achieve better results.",
      icon: Customermark,
    },
    {
      id: 4,
      title: "Optimising Raffle Success",
      description:
        "Our team of experts will also review your raffle to ensure that your prizes, ticket pricing, and marketing approach are aligned with your goals. We'll suggest any improvements necessary to maximise participation and ensure you reach your target audience.",
      icon: Settingmark,
    },
  ];

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Title Section */}
        <div className="flex justify-center">
          <div className="p-5 rounded-full mb-4">
            <img src={mark} alt="Raffily Logo" className="w-12 h-12" />
          </div>
          <h1 className="md:text-[40px] text-[28px] font-modernExtraBold text-raffles-blue mt-4 items-center" style={{ fontFamily: 'ModernEraBold' }}>
            The Raffily Standard
          </h1>
        </div>

        {/* Content Sections */}
        <div className="py-4 px-4 md:py-6 md:px-6">
          {sections.map((section, index) => (
            <div key={section.id}>
              <div className="grid grid-cols-12 gap-0 lg:gap-8 items-start lg:items-center">
                {/* Icon Section */}
                <div className="col-span-2 lg:col-span-2 flex items-auto lg:items-center justify-center lg:justify-start">
                  <div
                    className="w-14 h-14 lg:w-20 lg:h-20 flex items-center justify-center rounded-lg"
                    style={{
                      backgroundColor: "#FFFFFF99",
                      border: "1px solid #EAEBED",
                    }}
                  >
                    <img
                      src={section.icon}
                      alt={section.title}
                      className="w-4 h-4 lg:w-6 lg:h-6"
                    />
                  </div>
                </div>

                {/* Content Section */}
                <div className="col-span-10 lg:col-span-3">
                  <h3 className="text-base md:text-xl font-modernExtraBold text-raffles-blue" style={{ fontFamily: 'ModernEraBold' }}>
                    {section.title}
                  </h3>
                  <p className="block lg:hidden text-xs lg:text-sm text-raffles-blue mt-2" style={{ fontFamily: 'ModernEraRegular' }}>
                    {section.description}
                  </p>
                </div>
                <div className="col-span-12 lg:col-span-7 hidden lg:block">
                <p className="text-xs lg:text-sm text-raffles-blue mt-2">
                    {section.description}
                  </p>
                  </div>
              </div>
              {/* Horizontal Line Between Boxes */}
              {index < sections.length - 1 && (
                <hr className="w-full bg-gray-300 h-[1px] my-6" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RaffilyStandard;
