import React, { useState, useEffect } from "react";
import { Badge } from "@/Components/ui/badge";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import noimage from "../../../assets/no-image.png";
import { CONSTANT_DATA } from "@/constants";
import { Button } from "@/Components/ui/button";

interface RaffleCardProps {
  item: any;
}

const RaffleCardNew: React.FC<RaffleCardProps> = ({ item }) => {

  const navigate = useNavigate();

  const [timerStatus, setTimerStatus] = useState<"Pending" | "Running" | "Expired">("Pending");
  const [timeLeft, setTimeLeft] = useState<any>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [progress, setProgress] = useState<number>(0);

  const updateTimerStatus = () => {
    const now = moment();
    const start = moment(item.start_date);
    const end = moment(item.time_set_prize);

    if (now.isBefore(start)) {
      setTimerStatus("Pending");
    } else if (now.isAfter(end)) {
      setTimerStatus("Expired");
    } else {
      setTimerStatus("Running");
    }
  };

  const calculateProgress = () => {
    if (!item?.ticket_set_prize || parseFloat(item?.ticket_set_prize) === 0) {
      // If the ticket_set_prize is 0 or undefined, set progress to 0
      setProgress(0);
    } else {
      const totalSold = (parseFloat(item?.totalPurchasedTicket) * 100) / parseFloat(item?.ticket_set_prize);
      setProgress(Math.min(100, totalSold));
    }
  };


  const calculateTimeLeft = () => {
    const now = moment();
    const end = moment(item.time_set_prize);

    const duration = moment.duration(end.diff(now));

    if (duration.asMilliseconds() <= 0) {
      // If the countdown has expired, set all fields to 0
      setTimeLeft({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      });
    } else {
      // Otherwise, calculate the remaining time
      setTimeLeft({
        days: Math.floor(duration.asDays()),
        hours: duration.hours(),
        minutes: duration.minutes(),
        seconds: duration.seconds(),
      });
    }
  };

  const totalSale =
    (parseFloat(item?.totalPurchasedTicket) * 100) /
    parseFloat(item?.ticket_set_prize) || 0;
  const formattedDate = moment(item?.time_set_prize).format("DD MMMM, YYYY HH:mm");


  const handleRaffleNavigate = () => {
    const sold = item.raffle_type === "TIME" ? calculateTimeSale() : totalSale;
    navigate(`/raffle/details/${item.uniqueID}`, { state: { sold } });
  };

  const calculateTimeSale = () => {
    const now = moment();
    const endDate = moment(item.cronTime);
    const startDate = moment(item.createdAt);

    if (!endDate.isValid() || !startDate.isValid()) {
      console.error("Invalid date format for cronTime or createdAt");
      return 0;
    }

    const totalDuration = Math.max(0, endDate.diff(startDate, "milliseconds"));
    const timePassed = Math.max(0, now.diff(startDate, "milliseconds"));

    return Math.min(100, (timePassed / totalDuration) * 100);
  };

  const isEndingSoon = timerStatus === "Running" && timeLeft.days === 0 && timeLeft.hours <= 24;

  useEffect(() => {
    updateTimerStatus();
    calculateProgress();
    calculateTimeLeft();
    const timer = setInterval(() => calculateTimeLeft(), 1000);

    return () => clearInterval(timer);
  }, [item]);

  if (item?.raffle_status === 0 || item?.raffle_status === 3) {
    return null;
  }
  const isEnterButtonDisabled = progress === 100 || timerStatus === "Expired";

  const baseButtonClasses = `
  w-32 md:w-64 lg:w-72 xl:w-80 2xl:w-96
  h-9 md:h-10 lg:h-12
  text-sm md:text-base
  font-bold
  leading-snug
  tracking-tight
  rounded-tl-md md:rounded-tl-lg
  font-modernBold
  text-left
  px-4 md:px-6
  py-2 md:py-3
`;

  const isSoldOut = parseInt(item?.totalPurchasedTicket) >= parseInt(item?.ticket_set_prize);

  const buttonConfig = {
    Pending: {
      text: "Coming Soon",
      className: `${baseButtonClasses} bg-gray-400 hover:bg-purple-700`,
      disabled: true
    },
    Running: {
      text: isSoldOut ? "Sold Out" : "Enter",
      className: `${baseButtonClasses} ${isSoldOut ? "bg-gray-400" : "bg-raffles-blue hover:bg-purple-700"}`,
      disabled: isSoldOut || isEnterButtonDisabled
    },
    Expired: {
      text: "Expired",
      className: `${baseButtonClasses} bg-gray-400 hover:bg-purple-700`,
      disabled: true
    }
  };

  const config = buttonConfig[timerStatus];

  return (
    <Link to={`/raffle/details/${item.uniqueID}`} onClick={handleRaffleNavigate}> <div className="w-full sm:rounded-[16px] rounded-[8px] border border-gray-200 bg-white flex flex-col relative h-[100%]">
      {/* Top Content */}
      <div className="relative">
        <img
          src={item?.images?.[0] ? CONSTANT_DATA.BASE_URL + item.images[0] : noimage}
          alt={item.raffle_name}
          className="w-full sm:h-[276px] h-[157px] object-cover sm:rounded-tl-[16px] rounded-tl-[8px] sm:rounded-tr-[16px] rounded-tr-[8px]"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = noimage;
          }}
        />
        {timerStatus !== "Expired" && (
          <div
            className={`absolute sm:top-4 sm:left-4 sm:transform-none top-0 left-1/2 transform -translate-x-1/2 translate-y-[10%] text-white sm:w-[203px] sm:h-[57px] w-[160px] h-[50px] shadow-md sm:p-0 p-2`}
          >
            <div
              className={`w-full h-full flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1 sm:py-2 rounded-lg justify-between ${isEndingSoon ? "" : "bg-raffles-blue"
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
          src={
            item?.owner?.image
              ? CONSTANT_DATA.BASE_URL + item?.owner?.image
              : item?.ownerImage
                ? CONSTANT_DATA.BASE_URL + item?.ownerImage
                : noimage
          }
          alt={item?.owner?.businessName}
          className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 w-8 h-8 sm:w-12 sm:h-12 rounded-full border-2 border-white"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = noimage;
          }}
        />
      </div>

      {/* Middle Content */}
      <div className="px-3 sm:px-6 pt-4 sm:pt-6 flex-grow">
        <p className="text-[14px] sm:text-[16px] sm:leading-[19.2px] leading-[16.8px] font-modernBold text-raffles-light-blue mb-2 line-clamp-2">
          {item.raffle_name}
        </p>
        <h6 className="font-bold text-[16px] sm:text-[20px] leading-[19.2px] sm:leading-[24px] font-modernBold text-raffles-light-blue">
          {item.currency}£ {item.ticket_price}
          <span className="text-[10px] leading-[14px] text-raffles-light-blue ml-1 font-modernBold">per ticket</span>
        </h6>
      </div>

      {/* Progress bar */}
      <div className="px-3 sm:px-6 py-2 sm:py-4">
        <div className="w-full bg-gray-200 rounded-full h-2 mt-1 sm:mt-2 relative">
          <div
            className="h-2 rounded-full"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(55.21deg, #AD6FFF 9.69%, #FD98E8 47.47%, #FF7385 83.78%)",
            }}
          ></div>
          <Badge
            className="absolute top-[-10px] sm:top-[-14px] text-[10px] sm:text-xs text-white bg-raffles-blue px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full shadow-md mt-1"
            style={{
              ...(progress <= 50
                ? { left: `${Math.min(progress, 50)}%`, transform: "translateX(-20%)" }
                : { right: `${100 - Math.min(progress, 100)}%`, transform: "translateX(20%)" }),
            }}
          >
            {progress.toFixed(0)}% sold
          </Badge>
        </div>
        <div className="flex items-center justify-between text-[10px] sm:text-xs mt-2 text-gray-500">
          <span>0</span>
          <span>{item?.ticket_set_prize || 100}</span>
        </div>
      </div>

      {/* Bottom Content */}
      <div className="px-3 sm:px-6 pb-4 flex justify-center items-center">
        <Button
          className={config.className}
          size="lg"
          disabled={config.disabled}
          onClick={timerStatus === "Running" ? handleRaffleNavigate : undefined}
        >
          {config.text}
        </Button>
      </div>
    </div></Link>
  );
};

export default RaffleCardNew;
