import React from "react";

const HowItWorks = ({ setAuthenticationModal, authenticationModal }: any) => {
  const steps = [
    {
      number: "01",
      title: "Create Your Raffle",
      description:
        "Sign up as a Raffly partner, customize your raffle, and set the entry requirements.",
    },
    {
      number: "02",
      title: "Raffly Approval",
      description: "We review your raffle for fairness and quality.",
    },
    {
      number: "03",
      title: "Launch and Promote",
      description:
        "Once approved and live, promote your raffle through Raffly’s platform and your own marketing channels to drive participation.",
    },
    {
      number: "04",
      title: "Track and Engage",
      description:
        "Monitor ticket sales, engage with participants, and interact with winners in real time.",
    },
    {
      number: "05",
      title: "Reward and Celebrate",
      description:
        "Reward winners, showcase the results, and enjoy the boost in brand loyalty!",
    },
  ];

  return (
    <div className="w-full sm:px-20 px-4 text-white bg-raffles relative">


      <div className="max-w-7xl mx-auto pt-16 pb-24">
        {/* Title Section */}
        <div className="text-center lg:text-start">
          <h2 className="text-[28px] lg:text-[40px] font-modernExtraBold" style={{ fontFamily: 'ModernEraBold' }}>How it works</h2>
        </div>
        <div className="block lg:flex justify-between items-center">
          <div className="text-center lg:text-start">
            <p className="text-base lg:text-xl font-modernExtraBold" style={{ fontFamily: 'ModernEraBold' }}>
              Hassle-Free, Fee-Free Raffle. <br /> Go live in 5 simple steps!
            </p>
          </div>
          <div className="lg:block hidden">
            <button className="px-6 py-3 bg-white text-black font-modernExtraBold rounded-lg shadow hover:bg-gray-200" style={{ fontFamily: 'ModernEraBold' }} onClick={() => {
              setAuthenticationModal({
                ...authenticationModal,
                isSignUpOpen: true,
              });
            }}>
              Join now
            </button>
          </div>
        </div>
        <hr className="border-t border-[rgba(255,255,255,0.2)] w-full my-8 h-[1px]" />
        {/* Steps Section */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex md:block lg:items-start items-auto space-x-4 items-center"
            >
              <button className="bg-[#FF7385] text-white text-xl font-bold w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center">
                <span style={{ fontFamily: 'ModernEraBold' }}> {step.number}</span>
              </button>
              <div className="flex-1 lg:!ml-0">
                <h3 className="text-base sm:text-lg font-modernExtraBold mt-4" style={{ fontFamily: 'ModernEraBold' }}>
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm mt-2" style={{ fontFamily: 'ModernEraRegular' }}>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="lg:hidden block mt-5">
          <button className="px-6 py-3 bg-white w-full text-black font-modernExtraBold rounded-lg shadow hover:bg-gray-200" onClick={() => {
            setAuthenticationModal({
              ...authenticationModal,
              isSignUpOpen: true,
            });
          }}>
            Join now
          </button>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
