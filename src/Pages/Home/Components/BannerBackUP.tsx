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
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Button } from "@/Components/ui/button";

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

  const calculateProgress = (totalPurchased: number, ticketSetPrize: string) => {
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
      {/* <img
        className="absolute h-[80%] bottom-0 left-0"
        src={bannerBackground}
        alt="bannerBack"
      />
      <div className="flex items-center justify-around h-[90vh]">
        <div className="relative z-10">
          <div className="block lg:hidden relative">
            <img
              src={spiral1}
              alt="spiral1"
              className="absolute -top-20 -left-4"
            />
          </div>
          <div className="flex items-center justify-center lg:justify-start gap-4 -ml-4 lg:ml-0">
            <p className="font-light text-5xl lg:text-6xl">Your</p>
            <h1 className="font-bold tracking-wide text-5xl lg:text-6xl">
              Home
            </h1>
          </div>
          <div className="flex items-center justify-center lg:justify-start gap-4 mt-4 lg:mt-0 mb-16 lg:mb-0">
            <p className="font-light text-5xl lg:text-6xl">For</p>
            <h1 className="font-bold tracking-wide text-5xl lg:text-6xl">
              Raffles.
            </h1>
            <div className='w-3 h-3 bg-black'></div>
          </div>
          <div className="block lg:hidden relative">
            <img
              src={spiral2}
              alt="spiral2"
              className="absolute -top-14 -right-7"
            />
          </div>
          <div className="flex flex-col gap-5 mt-10">
            <button
              className="w-[100%] m-auto lg:w-96 bg-gradient-to-br from-purple-700 via-purple-500 to-red-400  h-16 text-white rounded-md"
              onClick={(e) => {
                handlePaymentNavigate();
              }}
            >
              Go To Raffles
            </button>
            <button className="w-80 m-auto lg:w-96  h-16 border-[2px] border-[black] font-medium rounded-md">
              Free Ticket (coming soon)
            </button>
          </div>
        </div>
        <div className="hidden lg:block">
          <img src={bannerBackground1} alt="bannerBack1" />
        </div>
      </div>
      <Slider /> */}
      {/* <div className="relative w-full min-h-[541px] lg:h-[541px] flex items-center">
        <div className="absolute lg:clip-path-none clip-path-mobile lg:left-0 lg:top-0 overflow-hidden lg:h-full bottom-0 bg-gradient-to-tr from-purple-900 to-raffles-blue text-white z-10 w-full h-1/2 lg:px-24 px-2 lg:py-14 py-12">
          <div className="flex flex-col w-full lg:max-h-[450px] lg:w-[53%] h-full lg:justify-between w">
            <h1 className="lg:text-[64px] text-3xl font-modernExtraBold font-bold lg:leading-[67.2px] leading-[33.6px] tracking-[-2%] lg:mb-0 mb-4"
              style={{ fontFamily: 'ModernEraBold' }}>
              Raffily{" "}
              <span className="bg-gradient-to-b from-[#FF7385] via-[#FD98E8] to-[#AD6FFF] bg-clip-text text-transparent">
                Exclusive
              </span>
            </h1>
            <p className="lg:text-[22px] text-[16px] lg:leading-[30.8px] leading-[22.4px] tracking-[-2%] lg:mb-0 mb-4">
              Win a Prestige Package for 8 in a Private Box at{" "}
              <br className="xl:block hidden" />
              <span className="text-red-400">Chester Racecourse</span> on Ladies
              Day.
            </p>
            <p className="lg:text-lg text-[16px] font-semibold lg:mb-0 mb-4 ">
              Worth over £10,000
            </p>
            <button className="bg-white text-purple-800 font-bold py-2 px-4 rounded lg:w-fit w-full lg:mb-0 mb-4">
              Enter
            </button>
            <div className="flex flex-col lg:items-start items-center justify-start lg:justify-start w-full">
              <p className="text-[12px] font-modernLight leading-[16.8px] text-[#FFFFFF] uppercase mb-3">
                In association with
              </p>

              <img src={Brand} alt="brand" width={287} height={35} />
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 h-full lg:z-10 z-9 w-full lg:w-[55%]">
          <img
            src={Mobile_Banner}
            className="h-full !object-cover w-full block lg:hidden"
            alt="Background Image"
          />
          <img
            src={BannerImage}
            className="h-full !object-fill w-full lg:block hidden"
            alt="Background Image"
          />
        </div>
      </div> */}

      {/* <div className="background-image relative w-full min-h-[541px] lg:h-[541px] flex items-center"> */}
      {/* <div
        className="relative w-full min-h-[541px] lg:h-[541px] flex items-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${raffleData[0]?.images?.[0]
            ? CONSTANT_DATA.BASE_URL + raffleData[0]?.images[0]
            : noimage
            })`,
        }}
      >

        <div className="absolute lg:clip-path-none clip-path-mobile lg:left-0 lg:top-0 overflow-hidden lg:h-full bottom-0  text-white z-10 w-full h-1/2 lg:px-24 px-2 lg:py-14 py-12">
          <div className="flex flex-col w-full lg:max-h-[450px] lg:w-[53%] h-full lg:justify-between w">
            <h1 className="lg:text-[64px] text-3xl font-modernExtraBold font-bold lg:leading-[67.2px] leading-[33.6px] tracking-[-2%] lg:mb-0 mb-4"
              style={{ fontFamily: 'ModernEraBold' }}>
         
              {raffleData[0]?.raffle_name?.split(' ').slice(0, -1).join(' ')}{" "}
              <span className="bg-gradient-to-b from-[#FF7385] via-[#FD98E8] to-[#AD6FFF] bg-clip-text text-transparent">
                {raffleData[0]?.raffle_name?.split(' ').slice(-1)}  
              </span>
            </h1>


            <p
              className="lg:text-[22px] text-[16px] lg:leading-[30.8px] leading-[22.4px] tracking-[-2%] lg:mb-0 mb-4"
              dangerouslySetInnerHTML={{
                __html: raffleData[0]?.raffle_description
                  ? `${raffleData[0].raffle_description.split(' ').slice(0, 11).join(' ')}<br class="xl:block hidden" />
         <span class="text-red-400">${raffleData[0].raffle_description.split(' ').slice(11, 13).join(' ')}</span>
         ${raffleData[0].raffle_description.split(' ').slice(13).join(' ')}`
                  : "",
              }}
            />




            <p className="lg:text-lg text-[16px] font-semibold lg:mb-0 mb-4 ">
              Worth over  {raffleData[0]?.main_prizes[0]?.prize_value}
            </p>
            <button className="bg-white text-purple-800 font-bold py-2 px-4 rounded lg:w-fit w-full lg:mb-0 mb-4">
              Enter
            </button>
            <div className="flex flex-col lg:items-start items-center justify-start lg:justify-start w-full">
              <p className="text-[12px] font-modernLight leading-[16.8px] text-[#FFFFFF] uppercase mb-3 white-text">
                In association with
              </p>

              <img src={Brand} alt="brand" width={287} height={35} />
            </div>
          </div>
        </div>
      </div> */}
      {/* backgroundImage: `url(${raffle.images[0] ? CONSTANT_DATA.BASE_URL + raffle.images[0] : noimage})`, */}

      <div className="my-8">
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          loop
        >
          {raffleData.filter(
            (raffle) => ![0, 2, 3].includes(raffle.raffle_status) // Exclude specific raffle statuses
          ).map((raffle) => {
            const totalPurchasedTicket = parseInt(String(raffle.totalPurchasedTicket)) || 0;
            const timerStatus = determineTimerStatus(raffle.start_date, raffle.time_set_prize);
            const timeLeft = calculateTimeLeft(raffle.time_set_prize);
            const progress = calculateProgress(
              raffle.totalPurchasedTicket,
              raffle.ticket_set_prize
            );
            const isEndingSoon = timerStatus === "Running" && timeLeft.days === 0 && timeLeft.hours <= 24;
            const isEnterButtonDisabled = progress === 100 || timerStatus === "Expired";

            const sold =
              raffle.raffle_type === "TIME"
                ? calculateTimeSale(raffle.createdAt, raffle.cronTime)
                : progress;

            return (
              <SwiperSlide key={raffle._id}>
                <div className="fixed-mobile-view home">
                  <div
                    className="relative w-full min-h-[541px] lg:h-[541px] flex items-center bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `url(${raffle.bannerImage ? CONSTANT_DATA.BASE_URL + raffle?.bannerImage : BannerImage})`,
                      // backgroundPosition: window.innerWidth < 1024 ? 'right' : 'center',
                    }}
                  >
                    <div className="absolute lg:clip-path-none clip-path-mobile lg:left-0 lg:top-0 overflow-hidden lg:h-full bottom-0 text-white z-10 w-full h-1/2 lg:px-24 px-2 lg:py-14 py-12">
                      <div className="flex flex-col w-full lg:max-h-[450px] lg:w-[53%] h-full lg:justify-between">
                        <h1
                          className="lg:text-[64px] text-3xl font-modernExtraBold font-bold lg:leading-[67.2px] leading-[33.6px] tracking-[-2%] lg:mb-0 mb-4"
                          style={{ fontFamily: "ModernEraBold" }}
                        >
                          Raffily{" "}
                          <span className="bg-gradient-to-b from-[#FF7385] via-[#FD98E8] to-[#AD6FFF] bg-clip-text text-transparent">
                            Exclusive
                          </span>
                        </h1>

                        <p className="lg:text-[22px] text-[16px] lg:leading-[30.8px] leading-[22.4px] tracking-[-2%] lg:mb-0 mb-4">
                          {raffle.raffle_name}
                        </p>

                        <p className="lg:text-lg text-[16px] font-semibold lg:mb-0 mb-4">
                          Worth over £{raffle.main_prizes[0]?.prize_value}
                        </p>

                        {/* <button
                        onClick={() => handleRaffleNavigate(raffle, sold)}
                        className={`bg-white font-bold py-2 px-4 rounded lg:w-fit w-full lg:mb-0 mb-4 ${timerStatus !== "Running" || totalPurchasedTicket >= ticketSetPrize
                          ? "text-gray-500 cursor-not-allowed"
                          : "text-black font-semibold text-[16px] leading-[16px] tracking-[-2%] uppercase"
                          }`}
                        disabled={timerStatus !== "Running" || totalPurchasedTicket >= ticketSetPrize}
                      >
                        {(() => {
                          const currentDate = new Date();
                          const startDate = new Date(raffle.start_date);
                          const endDate = new Date(raffle.time_set_prize);

                          if (totalPurchasedTicket >= ticketSetPrize) return "Sold Out";
                          if (currentDate < startDate) return "Coming Soon";
                          if (currentDate >= startDate && currentDate <= endDate) return "Enter";
                          if (currentDate > endDate) return "Expired";
                          return "Unavailable";
                        })()}
                      </button> */}


                        {timerStatus === "Pending" && (
                          <button
                            className=" bg-gray-400 text-black font-bold py-2 px-4 rounded lg:w-fit w-full font-modernBold mb-8"

                            disabled
                          >
                            Coming Soon
                          </button>
                        )}
                        {timerStatus === "Running" && (
                          <button
                            className="bg-white text-black font-bold py-2 px-4 rounded lg:w-fit w-full font-modernBold mb-8"
                            onClick={() => handleRaffleNavigate(raffle, sold)}

                            disabled={isEnterButtonDisabled}
                          >
                            Enter
                          </button>
                        )}
                        {timerStatus === "Expired" && (
                          <button
                            className="bg-gray-400 text-black font-bold py-2 px-4 rounded lg:w-fit w-full font-modernBold mb-8"

                            disabled
                          >
                            Expired
                          </button>
                        )}


                        <div className="flex flex-col lg:items-start items-center justify-start lg:justify-start w-full">
                          <p className="text-[12px] font-modernLight leading-[16.8px] text-[#FFFFFF] uppercase mb-3 white-text">
                            In association with
                          </p>

                          <img src={Brand} alt="brand" width={287} height={35} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
