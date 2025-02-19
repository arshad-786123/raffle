import User from "@/assets/about_us/user.svg";
import { Button } from "@/Components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HowItWorks = () => {

  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("Entrants");
  const raffilyForBusiness = () => {
    navigate('/winners');
  };
  return (
    <div className="w-full bg-raffles-blue lg:px-24 sm:px-10 px-4 flex sm:items-start items-center justify-center flex-col gap-5 py-11 relative pb-20">
      <div className="absolute top-1/2 left-1 transform -translate-x-1 -translate-y-1/2 bg-gradient-to-r from-[#AD6FFF] via-[#FD98E8] to-[#FF7385] z-0 blur-[240px] md:w-50 md:h-50 w-[322px] h-[322px] rounded-full opacity-20"></div>
      <div className="absolute top-1 right-1 transform -translate-x-1 translate-y-1 bg-gradient-to-r from-[#AD6FFF] via-[#FD98E8] to-[#FF7385] z-0 blur-[150px] md:w-50 md:h-50 w-[229px] h-[229px] rounded-full opacity-20"></div>

      <div className="flex lg:flex-row flex-col w-full gap-8 sm:gap-4 items-center justify-between">
        <h4 className="sm:text-[40px] text-[28px] sm:leading-[40px] leading-[28px] text-white font-modernBold sm:text-start text-center">
          How it works
        </h4>
        <div className="z-[2] flex h-[55px] rounded-lg p-1 text-white border border-white">
          <div
            className={`flex cursor-pointer items-center justify-center py-2 transition-all duration-75  h-[70xp] w-[120px] sm:w-[174px]
        rounded-lg text-base font-semibold  ${selectedTab === "Entrants" ? "bg-white text-black" : "text-white"
              }`}
            onClick={() => setSelectedTab("Entrants")}
          >
            <p className="font-modernBold sm:text-[16px] text-[14px] sm:leading-[16px] leading-[14px] -tracking-2">
              For Entrants
            </p>
          </div>
          <div
            className={`flex cursor-pointer items-center justify-center py-2 transition-all duration-75  h-[70xp] w-[120px] sm:w-[174px] 
              rounded-lg text-base font-semibold  ${selectedTab === "Businesses"
                ? "bg-white text-black"
                : "text-white"
              }`}
            onClick={() => setSelectedTab("Businesses")}
          >
            <p className="font-modernBold sm:text-[16px] text-[14px] sm:leading-[16px] leading-[14px] -tracking-2">
              For Businesses
            </p>
          </div>
        </div>
      </div>
      <hr className="h-px my-2 bg-[rgba(255, 255, 255, 1] opacity-[20%] w-full"></hr>
      <div className="flex lg:flex-row flex-col items-start justify-between text-white w-full gap-8">
        {selectedTab === "Entrants" ? (
          <>
            <div className="flex sm:flex-row flex-col sm:items-start items-center sm:justify-between justify-center gap-16 lg:w-1/2 w-full xl:pr-14 pr-0">
              <div className="flex flex-col items-start w-full sm:gap-8 gap-4">
                <div className="inset-0 bg-gradient-to-r from-[#AD6FFF] via-[#FD98E8] to-[#FF7385] rounded-full p-[2.5px] w-20 h-20">
                  {/* Inner content */}
                  <div className="bg-[#280E51] w-full h-full rounded-full flex items-center justify-center">
                    <img src={User} alt="User" className="sm:size-9 size-7" />
                  </div>
                </div>
                <h5 className="text-[18px] leading-[23.4px] sm:text-[24px] sm:leading-[31.2px] sm:text-start text-center font-modernBold">
                  For Entrants
                </h5>
                <p className="text-[12px] leading-[16.8px] sm:text-[16px] sm:leading-[22.4px] font-[500] text-start max-w-[584px] font-modernRegular -tracking-2">
                  Getting involved with Raffily is simple and fun! You can
                  browse our range of raffles, choose your favourite, buy your
                  tickets, and wait for the draw. Our secure and fair system
                  ensures that every participant has an equal chance of winning.
                </p>
                <div className="hidden py-4 gap-8 px-6 w-full border-[1px] border-[#FFFFFF33] rounded-[10px] lg:flex md:flex-row flex-col text-white items-center justify-between bg-[#280E51]">
                  <div className="">
                    <h4 className="sm:text-[18px] text-[14px] sm:leading-[25.2px] leading-[19.6px] text-white font-modernBold">
                      Learn more about Raffily’s winners!
                    </h4>
                  </div>
                  <div className="md:w-px w-full bg-[#FFFFFF1A] md:h-16 h-px"></div>
                  <div className="">
                    <Button
                      className="bg-white text-raffles-light-blue sm:text-[18px] text-[16px] sm:leading-[25.2px] leading-[16px] font-modernBold hover:bg-gray-200"
                      variant="secondary"
                      size="lg"
                      onClick={raffilyForBusiness}
                    >
                      Raffily Winners’ Club
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-[3.1rem] items-start justify-start lg:w-1/2 w-full lg:pl-14 pl-0">
              <div className="flex items-center gap-4">
                <div className="size-14">
                  <div className="size-14 h-full bg-[#FF7385] rounded-full flex items-center justify-center">
                    <span className="font-modernBold sm:text-[22px] text-[18px] sm:leading-[22px] leading-[18px] text-center text-white">
                      01
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-start justify-start gap-2">
                  <h4 className="sm:text-[18px] text-[14px] sm:leading-[25.2px] leading-[19.6px] text-white font-modernBold">
                    Browse Raffles
                  </h4>
                  <p className="sm:text-[14px] text-[12px] sm:leading-[19.6px] leading-[16.8px] text-white font-modernRegular opacity-[80%]">
                    Find exciting raffles for everything from luxury vacations
                    to tech gadgets.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="size-14">
                  <div className="size-14 h-full bg-[#FF7385] rounded-full flex items-center justify-center">
                    <span className="font-modernBold sm:text-[22px] text-[18px] sm:leading-[22px] leading-[18px] text-center text-white">
                      02
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-start justify-start gap-2">
                  <h4 className="sm:text-[18px] text-[14px] sm:leading-[25.2px] leading-[19.6px] text-white font-modernBold">
                    Buy Tickets
                  </h4>
                  <p className="sm:text-[14px] text-[12px] sm:leading-[19.6px] leading-[16.8px] text-white font-modernRegular opacity-[80%]">
                    Choose how many tickets you want, and increase your chances
                    of winning.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="size-14">
                  <div className="size-14 h-full bg-[#FF7385] rounded-full flex items-center justify-center">
                    <span className="font-modernBold sm:text-[22px] text-[18px] sm:leading-[22px] leading-[18px] text-center text-white">
                      03
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-start justify-start gap-2">
                  <h4 className="sm:text-[18px] text-[14px] sm:leading-[25.2px] leading-[19.6px] text-white font-modernBold">
                    Wait for the Draw
                  </h4>
                  <p className="sm:text-[14px] text-[12px] sm:leading-[19.6px] leading-[16.8px] text-white font-modernRegular opacity-[80%]">
                    Sit back, relax, and watch for the results!
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="size-14">
                  <div className="size-14 h-full bg-[#FF7385] rounded-full flex items-center justify-center">
                    <span className="font-modernBold sm:text-[22px] text-[18px] sm:leading-[22px] leading-[18px] text-center text-white">
                      04
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-start justify-start gap-2">
                  <h4 className="sm:text-[18px] text-[14px] sm:leading-[25.2px] leading-[19.6px] text-white font-modernBold">
                    Win Big
                  </h4>
                  <p className="sm:text-[14px] text-[12px] sm:leading-[19.6px] leading-[16.8px] text-white font-modernRegular opacity-[80%]">
                    Winners are drawn fairly, and you’ll be notified if you win!
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:hidden py-4 gap-8 px-6 w-full border-[1px] border-[#FFFFFF33] rounded-[10px] flex md:flex-row flex-col text-white items-center justify-between bg-[#280E51]">
              <div className="">
                <h4 className="sm:text-[18px] text-[14px] sm:leading-[25.2px] leading-[19.6px] text-white font-modernBold">
                  Learn more about Raffily’s winners!
                </h4>
              </div>
              <div className="md:w-px w-full bg-[#FFFFFF1A] md:h-16 h-px"></div>
              <div className="">
                <Button
                  className="bg-white text-raffles-light-blue sm:text-[18px] text-[16px] sm:leading-[25.2px] leading-[16px] hover:bg-gray-200"
                  variant="secondary"
                  size="lg"
                  onClick={raffilyForBusiness}
                >
                  Raffily Winners’ Club
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex sm:flex-row flex-col sm:items-start items-center sm:justify-between justify-center gap-16 lg:w-1/2 w-full xl:pr-14 pr-0">
              <div className="flex flex-col items-start w-full sm:gap-8 gap-4">
                <div className="inset-0 bg-gradient-to-r from-[#AD6FFF] via-[#FD98E8] to-[#FF7385] rounded-full p-[2.5px] w-20 h-20">
                  {/* Inner content */}
                  <div className="bg-[#280E51] w-full h-full rounded-full flex items-center justify-center">
                    <img src={User} alt="User" className="sm:size-9 size-7" />
                  </div>
                </div>
                <h5 className="text-[18px] leading-[23.4px] sm:text-[24px] sm:leading-[31.2px] sm:text-start text-center font-modernBold">
                  For Businesses
                </h5>
                <p className="text-[12px] leading-[16.8px] sm:text-[16px] sm:leading-[22.4px] font-[500] text-start max-w-[584px] font-modernRegular -tracking-2">
                  Partnering with Raffily allows businesses to create raffles that drive customer engagement and boost sales. Whether you’re promoting a new product, rewarding loyal customers, or increasing brand visibility, Raffily makes it easy to launch effective and fun raffles.
                </p>
                <div className="hidden py-4 gap-8 px-6 w-full border-[1px] border-[#FFFFFF33] rounded-[10px] lg:flex md:flex-row flex-col text-white items-center justify-between bg-[#280E51]">
                  <div className="">
                    <h4 className="sm:text-[18px] text-[14px] sm:leading-[25.2px] leading-[19.6px] text-white font-modernBold">
                      Learn more about Raffily’s winners!
                    </h4>
                  </div>
                  <div className="md:w-px w-full bg-[#FFFFFF1A] md:h-16 h-px"></div>
                  <div className="">
                    <Button
                      className="bg-white text-raffles-light-blue sm:text-[18px] text-[16px] sm:leading-[25.2px] leading-[16px] font-modernBold hover:bg-gray-200"
                      variant="secondary"
                      size="lg"
                      onClick={raffilyForBusiness}
                    >
                      Raffily Winners’ Club
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-[3.1rem] items-start justify-start lg:w-1/2 w-full lg:pl-14 pl-0">
              <div className="flex items-center gap-4">
                <div className="size-14">
                  <div className="size-14 h-full bg-[#FF7385] rounded-full flex items-center justify-center">
                    <span className="font-modernBold sm:text-[22px] text-[18px] sm:leading-[22px] leading-[18px] text-center text-white">
                      01
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-start justify-start gap-2">
                  <h4 className="sm:text-[18px] text-[14px] sm:leading-[25.2px] leading-[19.6px] text-white font-modernBold">
                    Customizable Raffles
                  </h4>
                  <p className="sm:text-[14px] text-[12px] sm:leading-[19.6px] leading-[16.8px] text-white font-modernRegular opacity-[80%]">
                    Set up raffles tailored to your goals
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="size-14">
                  <div className="size-14 h-full bg-[#FF7385] rounded-full flex items-center justify-center">
                    <span className="font-modernBold sm:text-[22px] text-[18px] sm:leading-[22px] leading-[18px] text-center text-white">
                      02
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-start justify-start gap-2">
                  <h4 className="sm:text-[18px] text-[14px] sm:leading-[25.2px] leading-[19.6px] text-white font-modernBold">
                    Real-Time Analytics
                  </h4>
                  <p className="sm:text-[14px] text-[12px] sm:leading-[19.6px] leading-[16.8px] text-white font-modernRegular opacity-[80%]">
                    Track participation, ticket sales, and customer engagement.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="size-14">
                  <div className="size-14 h-full bg-[#FF7385] rounded-full flex items-center justify-center">
                    <span className="font-modernBold sm:text-[22px] text-[18px] sm:leading-[22px] leading-[18px] text-center text-white">
                      03
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-start justify-start gap-2">
                  <h4 className="sm:text-[18px] text-[14px] sm:leading-[25.2px] leading-[19.6px] text-white font-modernBold">
                    Seamless Promotion
                  </h4>
                  <p className="sm:text-[14px] text-[12px] sm:leading-[19.6px] leading-[16.8px] text-white font-modernRegular opacity-[80%]">
                    Use Raffily’s tools to promote your raffles and attract new audiences.
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:hidden py-4 gap-8 px-6 w-full border-[1px] border-[#FFFFFF33] rounded-[10px] flex md:flex-row flex-col text-white items-center justify-between bg-[#280E51]">
              <div className="">
                <h4 className="sm:text-[18px] text-[14px] sm:leading-[25.2px] leading-[19.6px] text-white font-modernBold">
                  Learn more about Raffily’s winners!
                </h4>
              </div>
              <div className="md:w-px w-full bg-[#FFFFFF1A] md:h-16 h-px"></div>
              <div className="">
                <Button
                  className="bg-white text-raffles-light-blue sm:text-[18px] text-[16px] sm:leading-[25.2px] leading-[16px] hover:bg-gray-200"
                  variant="secondary"
                  size="lg"
                  onClick={raffilyForBusiness}
                >
                  Raffily Winners’ Club
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HowItWorks;
