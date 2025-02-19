import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { API_ENDPOINTS, CONSTANT_DATA } from "../../../constants";
import { getUserPurchasedRaffle } from "../../../Services/Authentication/getUserPurchasedRaffle";
import noimage from "../../../assets/no-image.png";

interface RaffleCardProps {
  item: any;
}

const RaffleCard: React.FC<RaffleCardProps> = ({ item }) => {
  const navigate = useNavigate();
  const [raffleSold, setRaffleSold] = useState<any>(null);
  const [timerStatus, setTimerStatus] = useState<
    "Pending" | "Running" | "Expired"
  >("Pending");

  useEffect(() => {
    getData();
    updateTimerStatus();
    const interval = setInterval(updateTimerStatus, 1000);
    return () => clearInterval(interval);
  }, [item.start_date, item.time_set_prize]);

  const getData = async () => {
    try {
      const response = await getUserPurchasedRaffle(
        `${API_ENDPOINTS.SOLDOUT_RAFFLE}${item._id}`
      );
      setRaffleSold(response.result[0]);
    } catch (error: any) {
      console.error("Error fetching raffle data:", error.message);
    }
  };
  console.log("ticket price", item.ticket_price)

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

  const totalSale =
    (parseFloat(item?.totalPurchasedTicket) * 100) /
    parseFloat(item?.ticket_set_prize) || 0;
  const formattedDate = moment(item?.time_set_prize).format(
    "DD MMMM, YYYY HH:mm"
  );

  let soldTicketPercentage = (item?.totalPurchasedTicket * 100) / item?.ticket_set_prize;
  if (soldTicketPercentage >= 100) {
    soldTicketPercentage = 100;
  }


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

  if (
    item?.raffle_status === 0 ||
    item?.raffle_status === 2 ||
    item?.raffle_status === 3
  ) {
    return null;
  }

  return (
    <div className="keen-slider__slide mb-8">
      <div className="bg-[#20124C] rounded-xl shadow-lg overflow-hidden">
        {/* Image Section */}
        <div className="relative">
          <img
            src={
              item?.images?.[0]
                ? CONSTANT_DATA.IMAGE_BASE_URL + item.images[0]
                : noimage
            }
            alt={item.brand}
            className="w-full h-[300px] object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = noimage;
            }}
          />
          {item.raffle_type === "TIME" && (
            <div className="absolute top-4 left-4 bg-[#F2DAE9] px-4 py-2 rounded-full flex items-center gap-2">
              <svg
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.478 13.5786V14.9579H12.038V15.6475C12.5839 15.5785 13.0519 15.5785 13.5979 15.6475V14.9579H15.1578V13.5786H10.478Z"
                  fill="black"
                />
                <path
                  d="M13.631 3.76977L14.177 3.28705L14.801 3.83876L15.8929 2.87329L13.5531 0.804443L12.4611 1.76991L13.0851 2.32158L12.3831 2.94224C8.63931 0.942344 3.80354 1.97677 1.61967 5.28691C-0.56421 8.59706 0.605694 12.7347 4.27152 14.7346C7.93734 16.7345 12.7731 15.7001 14.957 12.39C16.9069 9.56253 16.3609 5.97655 13.631 3.76977ZM8.3273 13.6313C5.28545 13.6313 2.86759 11.4935 2.86759 8.80398C2.86759 6.11448 5.28545 3.97666 8.3273 3.97666V8.80394H13.787C13.787 11.4934 11.3691 13.6313 8.3273 13.6313Z"
                  fill="black"
                />
              </svg>
              <CountdownTimer
                startTime={item.start_date}
                endTime={item.cronTime}
              />
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-6 text-white">
          {/* Owner Info */}
          <div className="flex items-center gap-4 mb-6">
            <img
              src={item ? CONSTANT_DATA.IMAGE_BASE_URL + item?.owner?.image : noimage}
              alt={item?.owner?.businessName}
              className="h-12 w-12 rounded-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = noimage;
              }}
            />
            <h4 className="text-lg font-medium">{item.owner?.businessName}</h4>
          </div>

          {/* Raffle Name */}
          <h3
            className="font-medium text-xl mb-4 raffle-title"
          >
            {item.raffle_name}
          </h3>

          {/* Progress Info */}
          {/* <p className="text-sm mb-2">
            {item.raffle_type === "TICKET"
              ? `${soldTicketPercentage.toFixed(0)}% SOLD`
              : formattedDate}
          </p> */}
          <p className="text-sm mb-2">
            {soldTicketPercentage.toFixed(0) +
              "%" +
              " " +
              "Tickets sold"}
          </p>

          <div className="w-full bg-[#D9D9D9] h-2 rounded-full mb-4">
            <div
              className="bg-[#FF6A78] h-2 rounded-full"
              style={{ width: `${Math.min(totalSale, 100)}%` }}
            ></div>
          </div>

          {/* Price */}
          {/* <div className="mb-6">
            <h1 className="text-[#FFBA01] font-bold text-xl">
              {item.ticket_price === 0
                ? "FREE"
                : `${item.currency}£${item.ticket_price}`}
            </h1>
          </div> */}

          <div className="mb-6">
            <h1 className="text-[#FFBA01] font-bold text-xl">
              {parseFloat(item.ticket_price) === 0
                ? "FREE"
                : `${item.currency}£${item.ticket_price}`}
            </h1>
          </div>


          {/* Action Button */}
          <div className="mt-auto">
            {timerStatus === "Pending" && (
              <button
                className="bg-[#FF6A78] py-3 px-6 rounded-lg text-lg font-medium w-full opacity-50 cursor-not-allowed"
                disabled
              >
                Coming Soon
              </button>
            )}
            {timerStatus === "Running" && (
              <button
                onClick={handleRaffleNavigate}
                className="bg-[#FF6A78] py-3 px-6 rounded-lg text-lg font-medium w-full hover:bg-[#ff8691] transition-colors"
              >
                Enter Now!
              </button>
            )}
            {timerStatus === "Expired" && (
              <button
                className="bg-[#FF6A78] py-3 px-6 rounded-lg text-lg font-medium w-full opacity-50 cursor-not-allowed"
                disabled
              >
                Expired!
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const CountdownTimer: React.FC<{ startTime: string; endTime: string }> = ({
  startTime,
  endTime,
}) => {
  const [timeRemaining, setTimeRemaining] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);
  const [timerStatus, setTimerStatus] = useState<
    "Pending" | "Running" | "Expired"
  >("Pending");

  useEffect(() => {
    const start = moment(startTime);
    const end = moment(endTime);

    const timerID = setInterval(() => {
      const now = moment();

      if (now.isBefore(start)) {
        setTimerStatus("Pending");
        setTimeRemaining(null);
      } else if (now.isBetween(start, end)) {
        setTimerStatus("Running");
        setTimeRemaining(calculateTimeRemaining(end));
      } else {
        setTimerStatus("Expired");
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timerID);
  }, [startTime, endTime]);

  const calculateTimeRemaining = (endTime: moment.Moment) => {
    const now = moment();
    const duration = moment.duration(endTime.diff(now));

    return {
      days: duration.days(),
      hours: duration.hours(),
      minutes: duration.minutes(),
      seconds: duration.seconds(),
    };
  };

  if (timerStatus === "Pending") {
    return <p>{moment(startTime).format("DD MMMM, YYYY HH:mm")}</p>;
  }

  if (timerStatus === "Running" && timeRemaining) {
    const { days, hours, minutes, seconds } = timeRemaining;
    return (
      <p>
        {days}D, {hours}H, {minutes}M, {seconds}S
      </p>
    );
  }

  if (timerStatus === "Expired") {
    return <p>Expired!</p>;
  }

  return null;
};

export default RaffleCard;
