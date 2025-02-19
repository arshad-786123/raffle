import bannerBackground from "../../../assets/homepage/banner_back.png";
import bannerBackground1 from "../../../assets/homepage/banner_back_1.png";
import Slider from "./Slider";
import spiral1 from "../../../assets/homepage/spiral_1.png";
import spiral2 from "../../../assets/homepage/spiral_2.png";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { errorToast } from "../../../Utils/Toast/error.toast";
import CompanyCarousel from "@/Components/newDesign/CompanyCarousel/CompanyCarousel";

import Mobile_Banner from "@/assets/homepage/new_banner.png";
import BannerImage from "@/assets/GroupBanner.png";
import Brand from "@/assets/homepage/brand.png";
import { exclusiveRaffle } from "@/Services/Raffle/listRaffle";
import { useNavigate } from "react-router-dom";
import { CONSTANT_DATA } from "@/constants";
import noimage from "../../../assets/no-image.png";
import moment from "moment";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Button } from "@/Components/ui/button";
import image from "@/assets/home-racategale.png";
import HeroSection from "@/Components/HeroSection/HeroSection";

interface Raffle {
  _id: string;
  raffle_name: string;
  images: string[];
  time_set_prize: string;
  main_prizes: { prize_value: string }[];
  ticket_price: string;
  totalPurchasedTicket: number;
  ticket_set_prize: string;
  start_date: string;
  cronTime?: string;
  createdAt: string;
  raffle_type: string;
  uniqueID: string;
  raffle_status: number;
}

const Banner = ({
  authenticationModal,
  setAuthenticationModal,
  liveRafflesRef,
}: any) => {
  const userData = useSelector((state: any) => state.reducer.user);
  const [discount, setDiscount] = useState<number>(0);
  const userCart = useSelector((state: any) => state.reducer?.cart?.cartItems);
  const [isLoading, setIsLoading] = useState(false);

  const handlePaymentNavigate = async () => {
    liveRafflesRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const navigate = useNavigate();
  const [raffleData, setRaffleData] = useState<any[]>([]);

  useEffect(() => {
    getRaffles();
  }, []);

  const getRaffles = async () => {
    try {
      const raffData: any = await exclusiveRaffle();
      setRaffleData(raffData);
    } catch (error) {
      errorToast("Something went wrong");
    }
  };

  const calculateTimeLeft = (endDate: string) => {
    const now = moment();
    const end = moment(endDate);
    const duration = moment.duration(end.diff(now));

    return {
      days: duration.days(),
      hours: duration.hours(),
      minutes: duration.minutes(),
      seconds: duration.seconds(),
    };
  };

  const calculateProgress = (
    totalPurchased: number,
    ticketSetPrize: string
  ) => {
    if (!ticketSetPrize) return 0;
    const totalSold = (totalPurchased * 100) / parseFloat(ticketSetPrize);
    return Math.min(100, totalSold);
  };

  const determineTimerStatus = (startDate: string, endDate: string) => {
    const now = moment();
    if (now.isBefore(moment(startDate))) return "Pending";
    if (now.isAfter(moment(endDate))) return "Expired";
    return "Running";
  };

  const calculateTimeSale = (startDate: string, cronTime?: string) => {
    if (!cronTime) return 0;
    const now = moment();
    const start = moment(startDate);
    const end = moment(cronTime);

    const totalDuration = Math.max(0, end.diff(start, "milliseconds"));
    const timePassed = Math.max(0, now.diff(start, "milliseconds"));

    return Math.min(100, (timePassed / totalDuration) * 100);
  };

  const handleRaffleNavigate = (raffle: Raffle, sold: number) => {
    navigate(`/raffle/details/${raffle.uniqueID}`, { state: { sold } });
  };

  return (
    <>
      <div className="">
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          loop
        >
          {raffleData
            .filter((raffle) => ![0, 2, 3].includes(raffle.raffle_status))
            .map((raffle) => {
              const totalPurchasedTicket =
                parseInt(String(raffle.totalPurchasedTicket)) || 0;
              const timerStatus = determineTimerStatus(
                raffle.start_date,
                raffle.time_set_prize
              );
              const timeLeft = calculateTimeLeft(raffle.time_set_prize);
              const progress = calculateProgress(
                raffle.totalPurchasedTicket,
                raffle.ticket_set_prize
              );
              const isEndingSoon =
                timerStatus === "Running" &&
                timeLeft.days === 0 &&
                timeLeft.hours <= 24;
              const isEnterButtonDisabled =
                progress === 100 || timerStatus === "Expired";

              const sold =
                raffle.raffle_type === "TIME"
                  ? calculateTimeSale(raffle.createdAt, raffle.cronTime)
                  : progress;

              return (
                // <SwiperSlide key={raffle._id}>

                //   <div className="relative z-10 text-white flex flex-wrap lg:flex-nowrap justify-between items-center overflow-hidden pl-0  ">

                //     <img
                //       src={raffle.bannerImage ? CONSTANT_DATA.IMAGE_BASE_URL + raffle.bannerImage : BannerImage}
                //       alt="Banner"
                //       className="w-full object-cover z-0 hidden lg:block md:block h-[700px]"
                //     />
                //     <div className="w-full h-[auto] lg:hidden md:hidden">
                //       <img
                //         src={raffle.bannerImage ? CONSTANT_DATA.IMAGE_BASE_URL + raffle?.bannerImage : BannerImage}
                //         alt="Banner"
                //         className="w-full h-[auto] object-cover"
                //       />
                //     </div>






                //     <div className="absolute lg:clip-path-none lg:left-0 lg:top-0 overflow-hidden lg:h-full bottom-0 text-white z-10 w-full h-[auto]  lg:px-24 px-4 lg:py-14 py-8 left-0 banner-mobile banner-img">
                //       <div className="flex flex-col w-full  lg:w-[53%] h-[auto] lg:h-full lg:justify-center">

                //         <h1
                //           className="hidden lg:block lg:text-[64px] text-3xl font-modernExtraBold font-bold lg:leading-[67.2px] leading-[33.6px] tracking-[-2%] lg:mb-4 mb-4"
                //           style={{ fontFamily: "ModernEraBold" }}
                //         >
                //           Raffily{" "}
                //           <span className="bg-gradient-to-b from-[#FF7385] via-[#FD98E8] to-[#AD6FFF] bg-clip-text text-transparent">
                //             Exclusive
                //           </span>
                //         </h1>


                //         <p className="hidden lg:block lg:text-[22px] text-[16px] lg:leading-[30.8px] leading-[22.4px] tracking-[-2%] lg:mb-4 mb-4">
                //           {raffle.raffle_name}
                //         </p>
                //         <p className="hidden lg:block lg:text-lg text-[16px] font-semibold lg:mb-4 mb-4">
                //           Worth over £{raffle.main_prizes[0]?.prize_value}
                //         </p>

                //         <div className="lg:mt-4 mt-auto flex flex-col">

                //           <h1
                //             className="lg:hidden block lg:text-[64px] text-3xl font-modernExtraBold font-bold lg:leading-[67.2px] leading-[33.6px] tracking-[-2%] lg:mb-0 mb-4"
                //             style={{ fontFamily: "ModernEraBold" }}
                //           >
                //             Raffily{" "}
                //             <span className="bg-gradient-to-b from-[#FF7385] via-[#FD98E8] to-[#AD6FFF] bg-clip-text text-transparent">
                //               Exclusive
                //             </span>
                //           </h1>


                //           <p className="lg:hidden block lg:text-[22px] text-[16px] lg:leading-[30.8px] leading-[22.4px] tracking-[-2%] lg:mb-0 mb-4">
                //             {raffle.raffle_name}
                //           </p>
                //           <p className="lg:hidden block lg:text-lg text-[16px] font-semibold lg:mb-0 mb-4">
                //             Worth over £{raffle.main_prizes[0]?.prize_value}
                //           </p>

                //           {timerStatus === "Pending" && (
                //             <button
                //               className="bg-gray-400 text-black font-bold py-2 px-4 rounded lg:w-fit w-full font-modernBold  lg:mb-8 hover:bg-gray-200"
                //               disabled
                //             >
                //               Coming Soon
                //             </button>
                //           )}
                //           {timerStatus === "Running" && (
                //             <button
                //               className="bg-white text-black font-bold py-3 px-1 rounded  lg:w-[20%]  w-full font-modernBold  lg:mb-8 hover:bg-gray-200"
                //               onClick={() => handleRaffleNavigate(raffle, sold)}
                //               disabled={isEnterButtonDisabled}
                //             >
                //               Enter
                //             </button>
                //           )}
                //           {timerStatus === "Expired" && (
                //             <button
                //               className="bg-gray-400 text-black font-bold py-2 px-4 rounded lg:w-fit w-full font-modernBold  lg:mb-8 hover:bg-gray-200"
                //               disabled
                //             >
                //               Expired
                //             </button>
                //           )}

                //           {raffle.associatedLogo && raffle.associatedLogo != "" ? <div className="flex flex-col lg:items-start items-center justify-start lg:justify-start w-full ">
                //             <p className="text-[12px] font-modernLight leading-[16.8px] text-[#FFFFFF] uppercase mb-2 white-text mt-5 lg:mt-0">
                //               In association with
                //             </p>
                //             <img
                //               src={raffle.associatedLogo ? CONSTANT_DATA.IMAGE_BASE_URL + raffle?.associatedLogo : Brand}
                //               alt="brand"
                //               width={287}
                //               height={35}
                //             />
                //           </div> : ''}

                //         </div>
                //       </div>
                //     </div>
                //   </div>
                // </SwiperSlide>

                <SwiperSlide key={raffle._id}>
                  <HeroSection
                    leftImage={image}
                    rightImage={raffle.bannerImage ? CONSTANT_DATA.IMAGE_BASE_URL + raffle.bannerImage : BannerImage}
                    mobileImage={raffle.bannerImage ? CONSTANT_DATA.IMAGE_BASE_URL + raffle.bannerImage : BannerImage}
                  >
                    <div className="flex flex-col w-full lg:w-[53%] h-auto lg:h-full lg:justify-center ">
                      <h1
                        className="hidden lg:block lg:text-[64px] text-3xl font-modernExtraBold font-bold lg:leading-[67.2px] leading-[33.6px] tracking-[-2%] lg:mb-4 mb-4 banner-text-small"
                        style={{ fontFamily: "ModernEraBold" }}
                      >
                        Raffily{" "}
                        <span className="bg-gradient-to-b from-[#FF7385] via-[#FD98E8] to-[#AD6FFF] bg-clip-text text-transparent">
                          Exclusive
                        </span>
                      </h1>


                      <p className="hidden lg:block lg:text-[22px] text-[16px] lg:leading-[30.8px] leading-[22.4px] tracking-[-2%] lg:mb-4 mb-4">
                        {raffle.raffle_name}
                      </p>
                      <p className="hidden lg:block text-[22px] font-semibold lg:mb-4 mb-4"
                        style={{ fontFamily: "ModernEraBold" }}>
                        Worth over £{raffle.main_prizes[0]?.prize_value}
                      </p>

                      <div className="lg:mt-4 mt-auto flex flex-col">

                        <h1
                          className="lg:hidden block lg:text-[64px] text-3xl font-modernExtraBold font-bold lg:leading-[67.2px] leading-[33.6px] tracking-[-2%] lg:mb-0 mb-4"
                          style={{ fontFamily: "ModernEraBold" }}
                        >
                          Raffily{" "}
                          <span className="bg-gradient-to-b from-[#FF7385] via-[#FD98E8] to-[#AD6FFF] bg-clip-text text-transparent">
                            Exclusive
                          </span>
                        </h1>


                        <p className="lg:hidden block lg:text-[22px] text-[16px] lg:leading-[30.8px] leading-[22.4px] tracking-[-2%] lg:mb-0 mb-4">
                          {raffle.raffle_name}
                        </p>
                        <p className="lg:hidden block text-[16px] font-semibold lg:mb-0 mb-4" style={{ fontFamily: "ModernEraBold" }}>
                          Worth over £{raffle.main_prizes[0]?.prize_value}
                        </p>

                        {timerStatus === "Pending" && (
                          <button
                            className="bg-gray-400 text-black font-bold py-2 px-4 rounded w-[328px] sm:w-[135px] font-modernBold mb-8 hover:bg-gray-200"
                            disabled
                          >
                            Coming Soon
                          </button>
                        )}
                        {timerStatus === "Running" && (
                          <button
                            className="bg-white text-black font-bold py-3 px-1 rounded w-[328px] sm:w-[82px] font-modernBold mb-8 hover:bg-gray-200"
                            onClick={() => handleRaffleNavigate(raffle, sold)}
                            disabled={isEnterButtonDisabled}
                          >
                            Enter
                          </button>
                        )}
                        {timerStatus === "Expired" && (
                          <button
                            className="bg-gray-400 text-black font-bold py-2 px-4 rounded w-[328px] sm:w-[100px] font-modernBold mb-8 hover:bg-gray-200"
                            disabled
                          >
                            Expired
                          </button>
                        )}


                        {raffle.associatedLogo && raffle.associatedLogo != "" ? <div className="flex flex-col lg:items-start items-center justify-start lg:justify-start w-full ">
                          <p className="text-[12px] font-modernLight leading-[16.8px] text-[#FFFFFF] uppercase mb-2 white-text mt-5 lg:mt-0">
                            In association with
                          </p>
                          <img
                            src={raffle.associatedLogo ? CONSTANT_DATA.IMAGE_BASE_URL + raffle?.associatedLogo : Brand}
                            alt="brand"
                            width={287}
                            height={35}
                            style={{ maxHeight: "100px", width: "auto" }}
                          />
                        </div> : ''}
                      </div>
                    </div>
                  </HeroSection>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>

      <div className="w-full h-[114px]">
        <CompanyCarousel />
      </div>
    </>
  );
};

export default Banner;
