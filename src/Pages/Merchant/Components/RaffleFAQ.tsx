import React, { useState } from "react";
import eye from "../../../assets/merchant/Eye.svg";
import handShake from '../../../assets/merchant/Handshake.svg';
import aligns from '../../../assets/merchant/AlignBottom.svg';
import heart from '../../../assets/merchant/HeartStraight.svg';
import merchant_r from '@/assets/merchant/merchant_r-bg.jpg';



const PlusIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_41_3308)">
      <path
        d="M2.8125 9H15.1875"
        stroke="#120145"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9 2.8125V15.1875"
        stroke="#120145"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_41_3308">
        <rect width="18" height="18" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const MinusIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_41_3305)">
      <path
        d="M2.8125 9H15.1875"
        stroke="#FF7385"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_41_3305">
        <rect width="18" height="18" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const RaffleFAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      title: "Engage your customers like never before",
      icon: (
        <div className="flex justify-center items-center bg-[#FFFAFD] rounded-lg w-14 h-14">
          <img src={handShake} alt="End Date Icon" />
        </div>
      ),
      content:
        "A raffle is a type of lottery in which people buy tickets to win a prize. The winner is chosen at random.",
    },
    {
      title: "Leverage powerful customer insight data",
      icon: (
        <div className="flex justify-center items-center bg-[#FFFAFD] rounded-lg w-14 h-14">
          <img src={aligns} alt="End Date Icon" />
        </div>
      ),
      content:
        "Get detailed insights into customer engagement, ticket sales, and overall raffle performance. Use data to optimise your strategies and maximise customer interation.",
    },
    {
      title: "Boost Brand Visibility",
      icon: (
        <div className="flex justify-center items-center bg-[#FFFAFD] rounded-lg w-14 h-14">
          <img src={eye} alt="End Date Icon" />
        </div>
      ),
      content:
        "The winner will be randomly selected and announced on our website after the raffle ends. Make sure to check the date on our homepage!",
    },
    {
      title: "Build Customer Loyalty",
      icon: (
        <div className="flex justify-center items-center bg-[#FFFAFD] rounded-lg w-14 h-14">
          <img src={heart} alt="End Date Icon" />
        </div>
      ),
      content:
        "No, you do not need to be present to win. We will contact the winner via email and arrange the prize delivery.",
    },
  ];

  const handleToggle = (index: any) => {
    setActiveIndex(activeIndex === index ? null : index); // Toggle open/close for accordion
  };

  return (
    <div className="container-fluid px-4 lg:px-10 lg:py-10">
      <div className="lg:flex lg:space-x-12 space-y-8 lg:space-y-0 mt-3.5">
        {/* Left Side Image */}
        <div className="lg:w-1/2">
          <img
            src={merchant_r}
            alt="Raffle"
            className="w-full h-[342px] sm:h-[650px] object-cover rounded-lg"
          />
        </div>

        {/* Right Side Content and Accordion */}
        <div className="lg:w-1/2 content-center">
          <div className="space-y-4">
            {/* Content Description */}
            <div className="lg:pt-0 pt-4">
              <h3 className="text-[28px] sm:text-[40px] font-modernExtraBold text-raffles-blue" style={{ fontFamily: 'ModernEraBold' }}>
                Why Raffily is your new superpower
              </h3>
              <p className="text-sm sm:text-base text-raffles-light-blue mt-2">
                The way businesses engage customers is changing. With years of
                industry knowledge, Raffily’s presents a compliant and
                innovative way for you to engage new and existing customers with
                your products and experiences - through raffles!
              </p>
            </div>

            {/* FAQ Accordion */}
            <div className="space-y-4 mt-8">
              {faqData.map((item, index) => (
                <div key={index} className="border-b p-4">
                  <div
                    className="flex justify-between items-center  cursor-pointer"
                    onClick={() => handleToggle(index)}
                  >
                    <div className="flex items-center space-x-2">
                      {item.icon}
                      <span className="text-base sm:text-xl text-raffles-blue font-modernExtraBold" style={{ fontFamily: 'ModernEraBold' }}>
                        {item.title}
                      </span>
                    </div>
                    {activeIndex === index ? <MinusIcon /> : <PlusIcon />}
                  </div>
                  {activeIndex === index && (
                    <div className="p-2 pl-16 sm:pl-20 text-xs sm:text-sm text-raffles-light-blue">
                      <p>{item.content}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RaffleFAQ;
