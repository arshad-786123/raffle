import { PiUsersThree } from "react-icons/pi";

import SummariesImage from "@/assets/HowItWorks/Summaries.png";
import Ticket from "@/assets/HowItWorks/Ticket.svg";
import Cheers from "@/assets/about_us/Cheers.svg";
import Trophy from "@/assets/about_us/Trophy.svg";
import Group_image from "@/assets/about_us/aboutgroup.svg";

const Mission = () => {
  return (
    <>
      {/* <div className="flex flex-col lg:flex-row items-start justify-start lg:gap-[45px] w-full  lg:px-24 sm:px-10 px-2">
        <div className="lg:hidden block">
          <h2 className="mb-4 text-[28px] leading-[29.4px] text-raffles-blue font-modernBold">
            Our Mission
          </h2>
          <p className="text-[18px] leading-[23.4px] bg-gradient-to-b from-[#FF7385] via-[#FD98E8] to-[#AD6FFF] bg-clip-text text-transparent mb-6 font-modernBold">
            Bringing excitement to everyone
          </p>
          <p className="text-[12px] leading-[16.8px] text-raffles-blue font-modernRegular mb-6">
            At Raffily, we’re on a mission to bring excitement and opportunity
            to everyone, whether you’re a customer hoping to win a fantastic
            prize or a business looking to engage and reward your audience. We
            believe that raffles aren’t just about winning—they’re about
            connecting people with the brands they love in a fun, fair and
            interactive way.
          </p>
        </div>
        <div className="w-full lg:w-1/2 flex lg:items-end items-start lg:justify-end justify-start lg:pr-16 pr-16">
          <div className="aspect-w-16 aspect-h-9 w-full sm:w-[480px] md:w-[638px] lg:w-[768px] xl:w-[1024px] relative">
            <img
              src={Group_image} // Replace with the actual image path
              alt="Description"
              className="!object-cover w-full h-full"
            />
            <div className="absolute h-fit top-8 lg:-right-10 -right-8 bg-white flex items-center p-1 w-fit sm:gap-4 gap-2 sm:rounded-[12px] rounded-[4px]">
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
          </div>
        </div>

        <div className="w-full lg:w-1/2 mt-6 lg:mt-0 text-left flex flex-col gap-5"></div>
      </div> */}
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 md:px-8 lg:py-20 bg-[#FFFAFD]">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-center md:gap-8">
            <div className="md:hidden block">
              <h2 className="mb-2 text-[28px] leading-[29.4px] text-raffles-light-blue font-modernBold">
                Our Mission
              </h2>
              <p className="text-[18px] leading-[23.4px] bg-gradient-to-b from-[#FF7385] via-[#FD98E8] to-[#AD6FFF] bg-clip-text text-transparent mb-4 font-modernBold">
                Bringing excitement to everyone
              </p>
              <p className="text-[12px] leading-[16.8px] text-raffles-blue font-modernRegular mb-6 -tracking-2">
                At Raffily, we’re on a mission to bring excitement and
                opportunity to everyone, whether you’re a customer hoping to win
                a fantastic prize or a business looking to engage and reward
                your audience. We believe that raffles aren’t just about
                winning—they’re about connecting people with the brands they
                love in a fun, fair and interactive way.
              </p>
            </div>
            <div className="relative lg:w-full w-fit">
              <img src={Group_image} className="rounded" alt="" />
              <div className="absolute h-fit top-8 lg:-right-[-2.3rem] -right-0 bg-white flex items-center p-1 w-fit sm:gap-4 gap-2 sm:rounded-[12px] rounded-[4px]">
                {/* <div className="sm:size-[42px] size-5 flex items-center justify-center bg-[#FF7485] rounded-[6px]">
                  <img
                    src={Ticket}
                    alt="Ticket"
                    className="sm:size-[22px] size-[12px]"
                  />
                </div>
                <p className="sm:text-[16px] text-[10px] sm:leading-[16px] leading-[16px] text-raffles-blue font-modernBold sm:pr-4 pr-2">
                  New Raffles
                </p> */}
              </div>
            </div>
            <div>
              <div className="max-w-lg md:max-w-none flex flex-col gap-4">
                <h2 className="text-[40px] leading-[42px] text-raffles-light-blue font-modernBold hidden md:block -tracking-2">
                  Our Mission
                </h2>
                <p className="font-modernBold text-[24px] leading-[31.2px] -tracking-2 bg-gradient-to-b from-[#FF7385] via-[#FD98E8] to-[#AD6FFF] bg-clip-text text-transparent hidden lg:block">
                  Bringing excitement to everyone
                </p>
                <p className="text-[16px] leading-[22.4px] text-raffles-blue font-modernRegular hidden md:block -tracking-2">
                  At Raffily, we’re on a mission to bring excitement and
                  opportunity to everyone, whether you’re a customer hoping to
                  win a fantastic prize or a business looking to engage and
                  reward your audience. We believe that raffles aren’t just
                  about winning—they’re about connecting people with the brands
                  they love in a fun, fair and interactive way.
                </p>
                <h2 className="text-[16px] leading-[19.2px] sm:text-[20px] sm:leading-[24px] text-raffles-light-blue font-modernBold">
                  Why we exist:
                </h2>
                <div className="flex gap-4 items-center pb-4 border-b border-[#1100441A] px-4">
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
                    To bring communities together through thrilling
                    opportunities and shared excitement.
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
                    To help businesses engage customers and reward their loyalty
                    in new and innovative ways.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Mission;
