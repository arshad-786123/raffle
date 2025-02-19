import futureDraws from "../../assets/past_draws/futureDraws.png";
import newRaffles from "../../assets/past_draws/newRaffles.svg";
import cashPrize from "../../assets/past_draws/cashPrize.svg";

const FutureDraws = () => {
  // Dynamic Steps Array
  const steps = [
    {
      id: 1,
      title: "Browse Live Raffles",
      description:
        "Browse our live raffle and choose the draw that excites you.",
    },
    {
      id: 2,
      title: "Purchase Your Ticket",
      description: "Secure your tickets.",
    },
    {
      id: 3,
      title: "Wait for the Draw Date",
      description:
        "Our system will select winners at random, and the lucky winner will be contacted shortly after the draw date and time.",
    },
  ];
  return (
    <div className="w-full sm:px-20 px-4 text-white bg-raffles-blue relative">
      <div className="max-w-7xl mx-auto pt-16 pb-24">
        <div className="block lg:flex justify-between items-center">
          <div className="text-left">
            <h2 className="text-3xl xl:text-4xl font-modernExtraBold leading-tight">
              Get involved in future draws
            </h2>
          </div>
          <div className="lg:block hidden">
            <button className="px-6 py-3 bg-white text-black font-modernExtraBold rounded-lg shadow-lg hover:bg-gray-200">
              Live Raffles
            </button>
          </div>
        </div>
        <hr className="border-t border-[rgba(255,255,255,0.2)] w-full my-2 xl:my-8 h-[1px]" />

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative">
          {/* Left Side - Image Section */}
          <div className="relative">
            <div className="mt-8">
              <img
                src={futureDraws} // Replace with your image path
                alt="Raffle Image"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>

            {/* Fixed Position Cards */}
            {/* New Raffles Card */}
            <div className="absolute top-14 left-0 xl:-left-12 bg-white text-[#FF7385] rounded-md p-1 xl:p-2 flex items-center space-x-2 z-10">
              <img
                src={newRaffles}
                alt="new"
                className="w-6 h-6 xl:w-9 xl:h-9"
              />
              <span className="text-sm lg:text-lg font-modernExtraBold text-[#120145]">
                New Raffles
              </span>
            </div>

            {/* Cash Prize Card */}
            <div className="absolute bottom-3 lg:bottom-11 xl:bottom-3 2xl:bottom-3 right-3 bg-white text-[#FF7385] rounded-lg p-2 xl:p-2 pr-1 xl:pr-14  z-10">
              <div className="flex space-x-1">
                <img
                  src={cashPrize}
                  alt="cashPrize"
                  className="w-6 h-6 xl:w-9 xl:h-9"
                />
                <span className="text-sm lg:text-lg font-modernExtraBold text-[#120145]">
                  Cash Prize
                </span>
              </div>

              <div>
                <ul className="space-y-2 text-xs font-modernbold mt-1 lg:mt-2 text-[#120145]">
                  <li className="flex items-center space-x-1 lg:space-x-2 justify-start">
                    <input
                      type="radio"
                      id="experienceActivities"
                      name="raffleOption"
                      value="All Experience Activities"
                      className="form-radio text-[#FF7385] w-3 h-3"
                    />
                    <label htmlFor="experienceActivities">
                      All Experience Activities
                    </label>
                  </li>
                  <li className="flex items-center space-x-1 lg:space-x-2 justify-start">
                    <input
                      type="radio"
                      id="raffleEntries"
                      name="raffleOption"
                      value="All Raffle Entries"
                      className="form-radio text-[#FF7385] w-3 h-3"
                    />
                    <label htmlFor="raffleEntries">All Raffle Entries</label>
                  </li>
                  <li className="flex items-center space-x-1 lg:space-x-2 justify-start">
                    <input
                      type="radio"
                      id="raffle50"
                      name="raffleOption"
                      value="50/50 Raffle Entries Only"
                      className="form-radio text-[#FF7385] w-3 h-3"
                    />
                    <label htmlFor="raffle50">50/50 Raffle Entries Only</label>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Section: Dynamic Steps */}
          <div className="space-y-8 content-center">
            {steps.map((step) => (
              <div key={step.id} className="flex items-start space-x-4">
                <div>
                  <button className="bg-raffles-pink text-white text-xl font-bold w-12 h-12 sm:w-12 sm:h-12 rounded-full flex items-center justify-center">
                    <span>{step.id < 10 ? `0${step.id}` : step.id}</span>
                  </button>
                </div>
                <div>
                  <div className="flex flex-col">
                    <span className="text-lg lg:text-xl font-modernExtraBold">
                      {step.title}
                    </span>
                    <p className="text-sm lg:text-base mt-2">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FutureDraws;
