import { Clock3 } from "lucide-react";

import Gift from "@/assets/HowItWorks/Gift.svg";
import SummariesImage from "@/assets/HowItWorks/Summaries.png";
import Ticket from "@/assets/HowItWorks/Ticket.svg";
import ChartPolar from "@/assets/HowItWorks/ChartPolar.svg";
import Timer from "@/assets/HowItWorks/Timer.svg";
import SortAscending from "@/assets/HowItWorks/SortAscending.svg";
import Ticketi from "@/assets/HowItWorks/Ticketi.svg";

const Summaries = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center items-start md:justify-center justify-start md:gap-[45px] w-full py-20 lg:px-24 sm:px-10 px-4 bg-[#FFFAFD]">
        <div className="md:hidden block">
          {/* <h2 className="mb-2 text-[28px] leading-[29.4px] text-raffles-light-blue font-modernBold">
            To summaries
          </h2> */}
          <p className="text-[18px] leading-[23.4px] bg-gradient-to-b from-[#FF7385] via-[#FD98E8] to-[#AD6FFF] bg-clip-text text-transparent mb-4 font-modernBold">
            The Automated Draw process involves
          </p>
        </div>
        {/* Image Section */}
        <div className="w-full md:w-1/2 flex md:items-end items-start md:justify-end justify-start md:p-0 p-8">
          <div className="aspect-w-16 aspect-h-9 w-full sm:w-[480px] md:w-[638px] lg:w-[768px] xl:w-[1024px] 2xl:w-[1366px] relative">
            <img
              src={SummariesImage} // Replace with the actual image path
              alt="Description"
              className="!object-cover w-full h-full"
            />
            <div className="absolute h-fit top-8 md:-left-10 -left-8 bg-white flex items-center p-1 w-fit sm:gap-4 gap-2 sm:rounded-[12px] rounded-[4px]">
              <div className="sm:size-[42px] size-5 flex items-center justify-center bg-[#FF7485] rounded-[6px]">
                <img
                  src={Ticket}
                  alt="Ticket"
                  className="sm:size-[22px] size-[12px]"
                />
              </div>
              <p className="sm:text-[16px] text-[10px] sm:leading-[16px] leading-[16px] text-raffles-blue font-modernBold sm:pr-4 pr-2">
                New Raffles
              </p>
            </div>
            <div className="absolute top-[unset] left-[unset] h-fit bottom-3 md:-right-10 -right-8 bg-white flex items-center p-1 w-fit sm:gap-4 gap-2 sm:rounded-[12px] rounded-[4px]">
              <div className="sm:size-[42px] size-5 flex items-center justify-center bg-[#FF7485] rounded-[6px]">
                <img
                  src={Gift}
                  alt="Ticket"
                  className="sm:size-[22px] size-[12px]"
                />
              </div>
              <p className="sm:text-[16px] text-[10px] sm:leading-[16px] leading-[16px] text-raffles-blue font-modernBold sm:pr-4 pr-2">
                Exciting Prizes
              </p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full md:w-1/2 mt-6 md:mt-0 text-left flex flex-col gap-5">
          {/* <h2 className="text-[40px] leading-[42px] text-raffles-light-blue font-modernBold hidden md:block -tracking-2">
            To summaries
          </h2> */}
          <p className="font-modernBold text-[24px] leading-[31.2px] -tracking-2 bg-gradient-to-b from-[#FF7385] via-[#FD98E8] to-[#AD6FFF] bg-clip-text text-transparent hidden lg:block">
            The Automated Draw process involves
          </p>
          <div className="flex gap-4 items-center pb-4 border-b border-[#1100441A] px-4">
            <div className="size-5">
              <img src={Timer} alt="FillTicket" />
            </div>
            <p className="sm:text-[16px] text-[12px] sm:leading-[22.4px] leading-[16.8px] text-raffles-blue -tracking-2 font-modernRegular">
              Using the current time as a starting point (seed)
            </p>
          </div>
          <div className="flex gap-4 items-center pb-4 border-b border-[#1100441A] px-4">
            <div className="size-5">
              <img src={ChartPolar} alt="FillTicket" />
            </div>
            <p className="sm:text-[16px] text-[12px] sm:leading-[22.4px] leading-[16.8px] text-raffles-blue -tracking-2 font-modernRegular">
              Defining the range based on the number of tickets
            </p>
          </div>
          <div className="flex gap-4 items-center pb-4 border-b border-[#1100441A] px-4">
            <div className="size-5">
              <img src={SortAscending} alt="FillTicket" />
            </div>
            <p className="sm:text-[16px] text-[12px] sm:leading-[22.4px] leading-[16.8px] text-raffles-blue -tracking-2 font-modernRegular">
              Using Mersenne Twister to find the winning ticket's position in
              the sorted list
            </p>
          </div>
          <div className="flex gap-4 items-center pb-4 border-b border-[#1100441A] px-4">
            <div className="size-5">
              <img src={Ticketi} alt="FillTicket" />
            </div>
            <p className="sm:text-[16px] text-[12px] sm:leading-[22.4px] leading-[16.8px] text-raffles-blue -tracking-2 font-modernRegular">
              Identifying the winning ticket number on that line.
            </p>
          </div>

          {/* <div className="flex gap-4 items-center pb-4 border-b border-[#1100441A] px-4">
            <div className="sm:w-8 w-4 sm:h-6 h-4">
              <div className="sm:w-8 w-4 sm:h-6 h-4  flex items-center justify-center">
                <img
                  src={Cheers}
                  alt="Cheers"
                  className="sm:w-6 w-4 sm:h-6 h-4"
                />
              </div>
            </div>
            <p className="sm:text-[16px] text-[12px] sm:leading-[22.4px] leading-[16.8px] text-raffles-blue font-modernRegular -tracking-2">
              To make raffles fun, fair, and accessible to all
            </p>
          </div>
          <div className="flex gap-4 items-center pb-4 border-b border-[#1100441A] px-4">
            <div className="sm:w-8 w-4 sm:h-6 h-4">
              <div className="sm:w-8 w-4 sm:h-6 h-4 flex items-center justify-center">
                <PiUsersThree className="sm:size-6 size-4 text-[#FF7385]" />
              </div>
            </div>
            <p className="sm:text-[16px] text-[12px] sm:leading-[22.4px] leading-[16.8px] text-raffles-blue font-modernRegular -tracking-2">
              To bring communities together through thrilling opportunities and
              shared excitement.
            </p>
          </div>
          <div className="flex gap-4 items-center pb-4 px-4">
            <div className="sm:w-8 w-4 sm:h-6 h-4">
              <div className="sm:w-8 w-4 sm:h-6 h-4  flex items-center justify-center">
                <img
                  src={Trophy}
                  alt="Trophy"
                  className="sm:w-6 w-4 sm:h-6 h-4"
                />
              </div>
            </div>
            <p className="sm:text-[16px] text-[12px] sm:leading-[22.4px] leading-[16.8px] text-raffles-blue font-modernRegular -tracking-2">
              To help businesses engage customers and reward their loyalty in
              new and innovative ways.
            </p>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Summaries;
