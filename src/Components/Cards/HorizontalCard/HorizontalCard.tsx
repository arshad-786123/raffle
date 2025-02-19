import React, { useState, useEffect } from "react";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import noimage from "@/assets/no-image.png";
import home from "../../../assets/homepage/explore/home.png";
import { fetchFeaturedRaffles } from "@/Services/FetchFeaturedRaffles/fetchFeaturedRaffles";
import { CONSTANT_DATA } from "@/constants";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { errorToast } from "@/Utils/Toast/error.toast";

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

const HorizontalCard: React.FC = () => {
  const navigate = useNavigate();
  const [raffles, setRaffles] = useState<any[]>([]);
  const [timeLeftData, setTimeLeftData] = useState<{ [key: string]: any }>({});

  // Dummy Data
  // const dummyRaffles = [
  //   {
  //     _id: "1",
  //     raffle_name: "Test Raffle",
  //     images: [],
  //     time_set_prize: moment().add(1, "day").toISOString(),
  //     main_prizes: [{ prize_value: "5000" }],
  //     ticket_price: "10",
  //     totalPurchasedTicket: 50,
  //     ticket_set_prize: "100",
  //     start_date: moment().subtract(1, "day").toISOString(),
  //     cronTime: moment().add(2, "days").toISOString(),
  //     createdAt: moment().subtract(2, "days").toISOString(),
  //     raffle_type: "TIME",
  //     uniqueID: "raffle-123",
  //     raffle_status: 1,
  //     owner: {
  //       image: "",
  //       businessName: "Raffle Corp",
  //     },
  //   },
  //   {
  //     _id: "2",
  //     raffle_name: "Test Raffle",
  //     images: [],
  //     time_set_prize: moment().add(1, "day").toISOString(),
  //     main_prizes: [{ prize_value: "5000" }],
  //     ticket_price: "10",
  //     totalPurchasedTicket: 50,
  //     ticket_set_prize: "100",
  //     start_date: moment().subtract(1, "day").toISOString(),
  //     cronTime: moment().add(2, "days").toISOString(),
  //     createdAt: moment().subtract(2, "days").toISOString(),
  //     raffle_type: "TIME",
  //     uniqueID: "raffle-123",
  //     raffle_status: 1,
  //     owner: {
  //       image: "",
  //       businessName: "Raffle Corp",
  //     },
  //   },
  //   {
  //     _id: "3",
  //     raffle_name: "Test Raffle",
  //     images: [],
  //     time_set_prize: moment().add(1, "day").toISOString(),
  //     main_prizes: [{ prize_value: "5000" }],
  //     ticket_price: "10",
  //     totalPurchasedTicket: 50,
  //     ticket_set_prize: "100",
  //     start_date: moment().subtract(1, "day").toISOString(),
  //     cronTime: moment().add(2, "days").toISOString(),
  //     createdAt: moment().subtract(2, "days").toISOString(),
  //     raffle_type: "TIME",
  //     uniqueID: "raffle-123",
  //     raffle_status: 1,
  //     owner: {
  //       image: "",
  //       businessName: "Raffle Corp",
  //     },
  //   },
  //   {
  //     _id: "4",
  //     raffle_name: "Test Raffle",
  //     images: [],
  //     time_set_prize: moment().add(1, "day").toISOString(),
  //     main_prizes: [{ prize_value: "5000" }],
  //     ticket_price: "10",
  //     totalPurchasedTicket: 50,
  //     ticket_set_prize: "100",
  //     start_date: moment().subtract(1, "day").toISOString(),
  //     cronTime: moment().add(2, "days").toISOString(),
  //     createdAt: moment().subtract(2, "days").toISOString(),
  //     raffle_type: "TIME",
  //     uniqueID: "raffle-123",
  //     raffle_status: 1,
  //     owner: {
  //       image: "",
  //       businessName: "Raffle Corp",
  //     },
  //   },
    

  // ];
  

  // Fetch raffles from the API
  const getRaffles = async () => {
    try {
      const raffData = await fetchFeaturedRaffles();
      setRaffles(raffData.result);
      //  setRaffles([...dummyRaffles, ...raffData.result]);
    } catch (error) {
      errorToast("Something went wrong");
    }
  };

  useEffect(() => {
    getRaffles();
  }, []);

  const calculateTimeLeft = (endDate: string) => {
    const now = moment();
    const end = moment(endDate);
    const duration = moment.duration(end.diff(now));

    return {
      days: Math.max(duration.days(), 0),
      hours: Math.max(duration.hours(), 0),
      minutes: Math.max(duration.minutes(), 0),
      seconds: Math.max(duration.seconds(), 0),
    };
  };

  const calculateProgress = (totalPurchased: number, ticketSetPrize: string) => {
    const prizeValue = parseFloat(ticketSetPrize);
    if (!prizeValue || prizeValue <= 0) return 0; // Return 0 if the ticket set prize is invalid or zero
    const totalSold = (totalPurchased * 100) / prizeValue;
    return Math.min(100, totalSold); // Ensure the progress doesn't exceed 100
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

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeftData((prevTimeLeft) => {
        const updatedTimeLeft = { ...prevTimeLeft };
        for (const raffleId in updatedTimeLeft) {
          const newTimeLeft = calculateTimeLeft(
            raffles.find((raffle) => raffle._id === raffleId)?.time_set_prize || ""
          );
          updatedTimeLeft[raffleId] = newTimeLeft;
        }
        return updatedTimeLeft;
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup the interval on unmount
  }, [raffles]);

  const handleRaffleNavigate = (raffle: Raffle, sold: number) => {
    navigate(`/raffle/details/${raffle.uniqueID}`, { state: { sold } });
  };

  return (
    <div className="flex gap-5 overflow-x-auto overflow-y-hidden">
      {raffles
        .filter(
          (raffle) => ![0, 2, 3].includes(raffle.raffle_status) // Exclude specific raffle statuses
        )
        .map((raffle) => {
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
            <Link to={`/raffle/details/${raffle.uniqueID}`}>
              <div
                key={raffle._id}
                className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 md:gap-6 rounded-[10px] w-full border border-[#EAEBED] bg-[#F6F6F899] min-w-[275px] md:min-w-[600px] h-[100%] "
              >
                {/* Image Section */}
                <div className="w-full md:w-[300px] h-[300px] md:h-auto bg-white grid place-items-start overflow-hidden relative">
                  <img
                    src={
                      raffle.images?.length > 0
                        ? `${CONSTANT_DATA.BASE_URL}${raffle.images[0]}`
                        : noimage
                    }
                    alt={raffle.raffle_name}
                    className="w-full h-full object-contain rounded-tl-[10px] md:rounded-bl-[10px]"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = noimage;
                    }}
                  />

                  {timerStatus !== "Expired" && (
                    <div
                      className={`absolute sm:top-4 sm:left-2 sm:transform-none top-[4.5px] left-[9px]  text-white sm:w-[203px] w-[80%] shadow-md sm:p-0 p-2`}
                    >
                      <div
                        className={`w-full flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1 sm:py-2 rounded-lg justify-between ${isEndingSoon ? "" : "bg-raffles-blue"
                          }`}
                        style={{
                          background: `${isEndingSoon
                            ? "linear-gradient(55.21deg, #AD6FFF 9.69%, #FD98E8 47.47%, #FF7385 83.78%)"
                            : ""
                            }`,
                        }}
                      >
                        <div className="text-center">
                          <p className="text-xs sm:text-lg font-bold">
                            {timeLeft.days.toString().padStart(2, "0")}
                          </p>
                          <p className="text-[10px] sm:text-xs font-medium">Days</p>
                        </div>
                        <span className="font-thin opacity-[60%]">|</span>
                        <div className="text-center">
                          <p className="text-xs sm:text-lg font-bold">
                            {timeLeft.hours.toString().padStart(2, "0")}
                          </p>
                          <p className="text-[10px] sm:text-xs font-medium">Hrs</p>
                        </div>
                        <span className="font-thin opacity-[60%]">|</span>
                        <div className="text-center">
                          <p className="text-xs sm:text-lg font-bold">
                            {timeLeft.minutes.toString().padStart(2, "0")}
                          </p>
                          <p className="text-[10px] sm:text-xs font-medium">Mins</p>
                        </div>
                        <span className="font-thin opacity-[60%]">|</span>
                        <div className="text-center">
                          <p className="text-xs sm:text-lg font-bold">
                            {timeLeft.seconds.toString().padStart(2, "0")}
                          </p>
                          <p className="text-[10px] sm:text-xs font-medium">Secs</p>
                        </div>
                      </div>
                    </div>
                  )}
                  <img
                    src={home}
                    alt="brand logo"
                    className="rounded-full w-[56px] h-[56px] absolute bottom-2 left-2 border-[2px] !object-cover"
                  />
                  <img
                    src={
                      raffle.owner.image?.length > 0
                        ? `${CONSTANT_DATA.BASE_URL}${raffle.owner.image}`
                        : noimage
                    }
                    alt={raffle.owner.businessName}
                    className="rounded-full w-[56px] h-[56px] absolute bottom-2 left-2 border-[2px] !object-cover"
                  />
                </div>

                {/* Content Section */}
                <div className="w-full md:w-[300px] flex flex-col md:pt-5 pt-0 pb-5 pr-5 md:pl-0 pl-5">
                  <span className="font-modernBold text-[10px] leading-[14px] bg-gradient-to-b from-[#FF7385] via-[#FD98E8] to-[#AD6FFF] bg-clip-text text-transparent uppercase mb-2">
                    Raffily FEATURED
                  </span>
                  <h5 className="font-modernBold text-[24px] leading-[31.2px] mb-2 line-clamp-2">
                    {raffle.raffle_name}
                  </h5>
                  <h6 className="font-extrabold text-[16px] leading-[20.8px] font-modernBold">
                    Worth £{raffle.main_prizes[0]?.prize_value || "N/A"}
                  </h6>

                  {/* Progress Bar */}
                  <div className="my-4">
                    <div className="bg-gray-200 rounded-full h-2 mt-2 relative w-full">
                      <div
                        className="bg-gradient-to-l from-[#FF7385] via-[#FD98E8] to-[#AD6FFF] h-2 rounded-full"
                        style={{ width: `${progress}%` }}
                      ></div>
                      <Badge
                        className="absolute top-[-10px] sm:top-[-14px] text-[10px] sm:text-xs text-white bg-raffles-blue px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full shadow-md mt-1"
                        style={
                          progress <= 50
                            ? { left: `${progress}%`, transform: "translateX(-20%)" }
                            : { right: `${100 - progress}%`, transform: "translateX(20%)" }
                        }
                      >
                        {progress.toFixed(0)}% sold
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-[10px] sm:text-xs mt-2 text-gray-500">
                      <span>0</span>
                      <span>{raffle?.ticket_set_prize || 100}</span>
                    </div>
                  </div>

                  <h6 className="font-modernBold text-[16px] leading-[20.8px] mb-2">
                    £{raffle.ticket_price} <span className="font-modernBold text-[10px]">per ticket</span>
                  </h6>

                  {/* Bottom Buttons */}
                  <div className="px-3 sm:px-6 pb-4">
                    {timerStatus === "Pending" && (
                      <Button
                        className="w-full bg-gray-400 hover:bg-gray-200 text-[16px] font-modernBold cursor-not-allowed"
                        size="lg"
                        disabled
                      >
                        Coming Soon
                      </Button>
                    )}
                    {timerStatus === "Running" && (
                      <Button
                        className="w-full bg-raffles-blue hover:bg-purple-700 text-[16px] font-modernBold"
                        onClick={() => handleRaffleNavigate(raffle, sold)}
                        size="lg"
                        disabled={isEnterButtonDisabled}
                      >
                        Enter
                      </Button>
                    )}
                    {timerStatus === "Expired" && (
                      <Button
                        className="w-full bg-gray-400 hover:bg-purple-700 text-[16px] font-modernBold cursor-not-allowed"
                        size="lg"
                        disabled
                      >
                        Expired
                      </Button>
                    )}
                  </div>
                </div>
              </div></Link>
          );
        })}
    </div>
  );
};

export default HorizontalCard;
