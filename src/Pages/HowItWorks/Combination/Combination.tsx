import FillTicket from "@/assets/HowItWorks/fillTicket.svg";
import HourglassHigh from "@/assets/HowItWorks/HourglassHigh.svg";
import Stack from "@/assets/HowItWorks/Stack.svg";
import Timer1 from "@/assets/HowItWorks/Timer1.svg"

const Combination = () => {
  return (
    <div className="w-full pb-11 sm:mt-14 mt-8 lg:px-24 sm:px-10 px-4 flex lg:flex-row flex-col items-start lg:gap-20 gap-8">
      <div className="lg:w-1/4 w-full">
        <h1 className="sm:text-[32px] text-[24px] sm:leading-[38.4px] leading-[24px] text-raffles-light-blue -tracking-2 font-modernBold hidden sm:block">
        The random nature of Raffily’s draws is due to a combination of
        </h1>
        <h1 className="sm:text-[32px] text-[24px] sm:leading-[38.4px] leading-[24px] text-raffles-light-blue -tracking-2 font-modernBold block sm:hidden">
        This randomness is <br /> introduced through
        </h1>
      </div>
      <div className="lg:w-3/4 w-full grid lg:grid-cols-2 grid-cols-1">
        <div className="flex items-center gap-4 w-full mb-4">
          <div className="border border-[#EAEBED] sm:min-w-[72px] sm:min-h-[72px] sm:w-[72px] sm:h-[72px] min-w-[48px] min-h-[48px] w-[48px] h-[48px] flex items-center justify-center rounded-[8px]">
            <img src={FillTicket} alt="FillTicket" className="sm:size-7 size-[18px]" />
          </div>
          <div className="">
            <p className="sm:text-[20px] text-[16px] sm:leading-[24px] leading-[19.2 px] text-raffles-light-blue font-modernBold">
            Random allocation of ticket numbers to customers
            </p>
          </div>
          <div className=""></div>
        </div>
        <div className="flex items-center gap-4 w-full mb-4">
          <div className="border border-[#EAEBED] sm:min-w-[72px] sm:min-h-[72px] sm:w-[72px] sm:h-[72px] min-w-[48px] min-h-[48px] w-[48px] h-[48px] flex items-center justify-center rounded-[8px]">
            <img src={Timer1} alt="FillTicket" className="sm:size-7 size-[18px]" />
          </div>
          <div className="">
            <p className="sm:text-[20px] text-[16px] sm:leading-[24px] leading-[19.2 px] text-raffles-light-blue font-modernBold">
            The inclusion of milliseconds in the seed
            </p>
          </div>
          <div className=""></div>
        </div>
        <div className="flex items-center gap-4 w-full mb-4">
          <div className="border border-[#EAEBED] sm:min-w-[72px] sm:min-h-[72px] sm:w-[72px] sm:h-[72px] min-w-[48px] min-h-[48px] w-[48px] h-[48px] flex items-center justify-center rounded-[8px]">
            <img src={HourglassHigh} alt="FillTicket" className="sm:size-7 size-[18px]" />
          </div>
          <div className="">
            <p className="sm:text-[20px] text-[16px] sm:leading-[24px] leading-[19.2 px] text-raffles-light-blue font-modernBold">
            The unpredictable timing of the draw
            </p>
          </div>
          <div className=""></div>
        </div>
        <div className="flex items-center gap-4 w-full mb-4">
          <div className="border border-[#EAEBED] sm:min-w-[72px] sm:min-h-[72px] sm:w-[72px] sm:h-[72px] min-w-[48px] min-h-[48px] w-[48px] h-[48px] flex items-center justify-center rounded-[8px]">
            <img src={Stack} alt="FillTicket" className="sm:size-7 size-[18px]" />
          </div>
          <div className="">
            <p className="sm:text-[20px] text-[16px] sm:leading-[24px] leading-[19.2 px] text-raffles-light-blue font-modernBold">
            Variations in the number of tickets for each draw
            </p>
          </div>
          <div className=""></div>
        </div>
      </div>
    </div>
  );
};

export default Combination;
