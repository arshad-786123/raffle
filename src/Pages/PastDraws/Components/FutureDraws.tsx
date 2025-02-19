import futureDraws from "../../../assets/past_draws/futureDraws.svg";
import newRaffles from "../../../assets/past_draws/newRaffles.svg";
import cashPrize from "../../../assets/past_draws/cashPrize.svg";
import payments from "../../../assets/past_draws/payments.svg";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate(); // Initialize the navigate function

  const handleNavigate = () => {
    navigate("/all-raffles"); // Replace with the path you want to navigate to
  };
  return (
    <div className="w-full lg:px-24 sm:px-10 px-6 py-14 text-white bg-raffles-blue relative">
      <div className="block lg:flex justify-between items-center">
        <div className="text-left">
          <h2 className="sm:text-[40px] sm:leading-[40px] text-[28px] leading-[28px] font-modernBold">
            Get involved in future draws
          </h2>
        </div>
        <div className="lg:block hidden">
          <button className="px-6 py-3 bg-white text-black rounded-lg shadow-lg hover:bg-gray-200 font-modernBold" onClick={handleNavigate}>
            Live Raffles
          </button>
        </div>
      </div>
      <hr className="border-t border-[rgba(255,255,255,0.2)] w-full lg:my-8 my-4 h-[1px]" />

      {/* Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative">
        {/* Left Side - Image Section */}
        <div className="lg:max-w-[597px] lg:max-h-[361px] max-w-full max-h-[500px] min-h-[190px] min-w-[328px] relative lg:p-0 p-6 place-items-center">
          <img
            src={futureDraws} // Replace with your image path
            alt="Raffle Image"
            className="w-full h-full rounded-lg shadow-lg"
          />

          {/* Fixed Position Cards */}
          {/* New Raffles Card */}
          <div className="absolute top-14 left-0 xl:-left-12 bg-white text-[#FF7385] rounded-md p-1 xl:p-2 flex items-center space-x-2 z-10 ">
            <img src={newRaffles} alt="new" className="w-6 h-6 xl:w-9 xl:h-9" />
            <span className="text-[10px] leading-[17px] sm:text-[16px] sm:leading-[16px] font-modernBold text-[#120145] pr-4">
              New Raffles
            </span>
          </div>

          <div className="absolute md:w-[265px] h-fit bottom-3 right-10 bg-white flex-col flex items-start p-1 xl:p-2 w-fit gap-2 sm:rounded-[12px] rounded-[4px] md:pr-0 pr-4">
            <div className="flex items-center md:gap-2 gap-1">
              <div className="sm:size-[42px] size-5 flex items-center justify-center bg-[#FF7485] rounded-[6px]">
                <img
                  src={payments}
                  alt="Ticket"
                  className="sm:size-[22px] size-[12px]"
                />
              </div>
              <p className="sm:text-[16px] text-[10px] sm:leading-[16px] leading-[16px] text-raffles-blue font-modernBold sm:pr-4 pr-2">
                Cash Prize
              </p>
            </div>
            <ul className="space-y-2 text-xs font-modernbold mt-1 lg:mt-2 text-[#120145] mb-2 lg:ml-2 ml-1">
              <li className="flex items-center space-x-1 lg:space-x-2 justify-start">
                <input
                  type="radio"
                  id="raffleEntries"
                  name="raffleOption"
                  value="All Raffle Entries"
                  className="form-radio text-[#FF7385] w-3 h-3"
                  checked
                />
                <label
                  htmlFor="experienceActivities"
                  className="sm:text-[12px] text-[8px] sm:leading-[12px] leading-[8px] text-[#120145] font-modernBold"
                >
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
                <label
                  htmlFor="raffleEntries"
                  className="sm:text-[12px] text-[8px] sm:leading-[12px] leading-[8px] text-[#120145] font-modernBold"
                >
                  All Raffle Entries
                </label>
              </li>
              <li className="flex items-center space-x-1 lg:space-x-2 justify-start">
                <input
                  type="radio"
                  id="raffle50"
                  name="raffleOption"
                  value="50/50 Raffle Entries Only"
                  className="form-radio text-[#FF7385] w-3 h-3"
                />
                <label
                  htmlFor="raffle50"
                  className="sm:text-[12px] text-[8px] sm:leading-[12px] leading-[8px] text-[#120145] font-modernBold"
                >
                  50/50 Raffle Entries Only
                </label>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Section: Dynamic Steps */}
        <div className="space-y-8 content-center">
          {steps.map((step) => (
            <div key={step.id} className="flex items-start space-x-4">
              <div className="w-[56px] h-[56px]">
                <button className="bg-[#FF7385] text-white text-xl font-bold w-[56px] h-[56px] rounded-full flex items-center justify-center font-modernBold sm:text-[22px] sm:leading-[22px] text-[18px] leading-[18px]">
                  {step.id < 10 ? `0${step.id}` : step.id}
                </button>
              </div>
              <div>
                <div className="flex flex-col">
                  <span className="sm:text-[18px] sm:leading-[25.2px] text-[16px] leading-[22.4px] font-modernBold">
                    {step.title}
                  </span>
                  <p className="sm:text-[14px] sm:leading-[19.6px] text-[12px] leading-[16.8px] mt-2 font-modernRegular lg:max-w-[390px] opacity-[80%]">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FutureDraws;
