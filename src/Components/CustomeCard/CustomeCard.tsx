import React, { useState, useEffect } from "react";
import { Badge } from "@/Components/ui/badge";

interface CustomeCardProps {
  title: string;
  image: string;
  logo: string;
  price: number;
  progress: number;
  sold?: number; // Optional, as it's not used in the current code
  endTime: string; // Assuming endTime is a date string
  isEndingSoon?: boolean; // Optional prop
}
const CustomeCard: React.FC<CustomeCardProps> = ({
  title,
  image,
  logo,
  price,
  progress,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  sold = 0,
  endTime,
  isEndingSoon = false,
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(endTime).getTime() - new Date().getTime();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    const timer = setInterval(() => calculateTimeLeft(), 1000);
    return () => clearInterval(timer); // Cleanup interval on component unmount
  }, [endTime]);

  return (
    <div className="xs:max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl rounded-2xl overflow-hidden shadow-lg border border-gray-200 bg-white flex flex-col relative">
      {/* Top Content */}
      <div className="relative">
        <img
          src={image}
          alt="Featured Raffle"
          className="w-full h-[140px] sm:h-[200px] lg:h-[300px] object-cover rounded-t-2xl"
        />
        <div
          className={`absolute sm:top-4 sm:left-2 sm:transform-none top-0 left-1/2 transform -translate-x-1/2 translate-y-[10%] text-white rounded-lg px-3 sm:px-4 py-1 sm:py-2 flex items-center gap-1 sm:gap-2 shadow-md ${
            isEndingSoon ? "" : "bg-raffles-blue"
          }`}
          style={{
            background: `${
              isEndingSoon
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
        <img
          src={logo}
          alt="Logo"
          className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 w-8 h-8 sm:w-12 sm:h-12 rounded-full border-2 border-white"
        />
      </div>
      {/* Middle Content */}
      <div className="px-3 sm:px-6 py-2 sm:py-4 flex-grow">
        <p className="text-[14px] sm:text-[16px] leading-[16.8px] sm:leading-[19.2px] font-modernBold text-raffles-light-blue line-clamp-2">
          {title}
        </p>
        <h6 className="font-modernBold text-[16px] sm:text-[20px] leading-[19.2px] sm:leading-[24px] mb-1 sm:mb-2 mt-1 sm:mt-2">
          £ {price}
          <span className="font-normal text-[10px] sm:text-[12px] ml-1">
            per ticket
          </span>
        </h6>
      </div>
      {/* Progress bar */}
      <div className="px-3 sm:px-6 py-2 sm:py-4">
        <div className="w-full bg-gray-200 rounded-full h-2 mt-1 sm:mt-2 relative">
          <div
            className="h-2 rounded-full"
            style={{
              width: `${Math.min(progress, 100)}%`,
              background:
                "linear-gradient(55.21deg, #AD6FFF 9.69%, #FD98E8 47.47%, #FF7385 83.78%)",
            }}
          ></div>
          <Badge
            className="absolute top-[-10px] sm:top-[-12px] text-[10px] sm:text-xs text-white bg-raffles-blue px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full shadow-md mt-1"
            style={{
              ...(progress <= 50
                ? {
                    left: `${Math.min(progress, 50)}%`,
                    transform: "translateX(-50%)",
                  }
                : {
                    right: `${100 - Math.min(progress, 100)}%`,
                    transform: "translateX(50%)",
                  }),
            }}
          >
            {progress}% sold
          </Badge>
        </div>
        <div className="flex items-center justify-between text-[10px] sm:text-xs mt-1 text-gray-500">
          <span>0</span>
          <span>100</span>
        </div>
      </div>
      {/* Bottom Content */}
      <div className="px-3 sm:px-6 py-1 sm:py-2">
        <button className="w-full bg-raffles-blue text-white py-1 sm:py-2 rounded font-medium hover:bg-purple-700 text-[14px] sm:text-[16px] leading-[14px] sm:leading-[16px] font-modernBold h-[48px]">
          Enter
        </button>
      </div>
    </div>
  );
};

export default CustomeCard;
