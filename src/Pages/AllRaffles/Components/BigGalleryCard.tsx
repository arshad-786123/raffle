import fullStar from "../../../assets/full_star.png";
import emptyStar from "../../../assets/empty_star.png";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS, CONSTANT_DATA } from "../../../constants";
import { useEffect, useState } from "react";
import moment from "moment-timezone";
import { getUserPurchasedRaffle } from "../../../Services/Authentication/getUserPurchasedRaffle";
import noimage from "../../../assets/no-image.png";

const BigGalleryCard = ({ item }: any, { i }: any) => {
  const navigate = useNavigate();

  const [raffleSold, setRaffleSold] = useState<any>();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const a = await getUserPurchasedRaffle(
        `${API_ENDPOINTS.SOLDOUT_RAFFLE}${item._id}`
      );

      setRaffleSold(a.result[0]);
    } catch (error: any) {
      // errorToast(error.message)
    }
  };

  const totalSale =
    (parseFloat(item?.totalPurchasedTicket) * 100) /
      parseFloat(item?.ticket_set_prize) || 0;

  const now = moment();
  const endDate = moment(item.cronTime);
  const startDate = moment(item.createdAt);

  // Check for valid dates
  if (!endDate.isValid() || !startDate.isValid()) {
    console.error("Invalid date format for cronTime or createdAt");
    return null;
  }

  // Calculate total duration and time passed in milliseconds
  const totalDuration = Math.max(0, endDate.diff(startDate, "milliseconds"));
  const timePassed = Math.max(0, now.diff(startDate, "milliseconds"));

  // Prevent NaN and ensure percentage doesn't exceed 100%
  const totalSaleBasedOnTime =
    totalDuration > 0 ? Math.min(100, (timePassed / totalDuration) * 100) : 0;

  // Ensure totalSaleBasedOnTime is not NaN
  const validTotalSaleBasedOnTime = isNaN(totalSaleBasedOnTime)
    ? 0
    : totalSaleBasedOnTime;

  const handleUserNavigate = (uniqueID: any) => {
    if (raffleSold?.raffleDetails?.raffle_type === "TICKET") {
      navigate(`/raffle/details/${uniqueID}`, {
        state: {
          sold: totalSale,
        },
      });
    } else if (raffleSold?.raffleDetails?.raffle_type === "TIME") {
      navigate(`/raffle/details/${uniqueID}`, {
        state: {
          sold: validTotalSaleBasedOnTime,
        },
      });
    } else {
      navigate(`/raffle/details/${uniqueID}`, {
        state: {
          sold: totalSale,
        },
      });
    }
  };

  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 1000);

  // const CountdownTimer = ({ startTime, endTime }: { startTime: string, endTime: string }) => {
  //   const [timeRemaining, setTimeRemaining] = useState<{ days: number, hours: number, minutes: number, seconds: number } | null>(null);
  //   const [timerStatus, setTimerStatus] = useState<'Pending' | 'Running' | 'Expired'>('Pending');

  //   const calculateTimeRemaining = (endTime: moment.Moment) => {
  //     const now = moment();
  //     const duration = moment.duration(endTime.diff(now));

  //     return {
  //       days: duration.days(),
  //       hours: duration.hours(),
  //       minutes: duration.minutes(),
  //       seconds: duration.seconds()
  //     };
  //   };

  //   useEffect(() => {
  //     const start = moment(startTime);
  //     const end = moment(endTime);

  //     const timerID = setInterval(() => {
  //       const now = moment();

  //       if (now.isBefore(start)) {
  //         setTimerStatus('Pending');
  //         setTimeRemaining(null);
  //       } else if (now.isBetween(start, end)) {
  //         setTimerStatus('Running');
  //         setTimeRemaining(calculateTimeRemaining(end));
  //       } else {
  //         setTimerStatus('Expired');
  //         setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  //       }
  //     }, 1000);

  //     return () => clearInterval(timerID);
  //   }, [startTime, endTime]);

  //   if (timerStatus === 'Pending') {
  //     return <p style={{color:"black"}}> {moment(startTime).format('DD MMMM, YYYY HH:mm')}</p>;
  //   }

  //   if (timerStatus === 'Running' && timeRemaining) {
  //     const { days, hours, minutes, seconds } = timeRemaining;
  //     return (
  //       <p style={{ color: "black" }}>
  //         {days}D, {hours}H, {minutes}M, {seconds}S
  //       </p>
  //     );
  //   }

  //   if (timerStatus === 'Expired') {
  //     return <p>Expired!</p>;
  //   }

  //   return null;
  // }

  const CountdownTimer = ({
    startTime,
    endTime,
  }: {
    startTime: string;
    endTime: string;
  }) => {
    const [timeRemaining, setTimeRemaining] = useState<{
      days: number;
      hours: number;
      minutes: number;
      seconds: number;
    } | null>(null);
    const [timerStatus, setTimerStatus] = useState<
      "Pending" | "Running" | "Expired"
    >(() => {
      const now = moment();
      if (now.isBefore(moment(startTime))) {
        return "Pending";
      } else if (now.isBetween(moment(startTime), moment(endTime))) {
        return "Running";
      } else {
        return "Expired";
      }
    });

    const calculateTimeRemaining = (endTime: moment.Moment) => {
      const now = moment().tz('Europe/London'); // Moment.js uses "Etc/GMT-1" for GMT+1
      const duration = moment.duration(endTime.diff(now));
      return {
        days: Math.floor(duration.asDays()),
        hours: duration.hours(),
        minutes: duration.minutes(),
        seconds: duration.seconds(),
      };
    };

    useEffect(() => {
      const start = moment(startTime).tz('Europe/London'); // Set start time in GMT+1
      const end = moment(endTime).tz('Europe/London'); // Set end time in GMT+1

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

      // If the timer should be running at the initial render
      if (moment().isBetween(start, end)) {
        setTimerStatus("Running");
        setTimeRemaining(calculateTimeRemaining(end));
      }

      return () => clearInterval(timerID);
    }, [startTime, endTime]);

    if (timerStatus === "Pending") {
      return (
        <p className="text-black">
          {moment(startTime).format("DD MMMM, YYYY HH:mm")}
        </p>
      );
    }

    if (timerStatus === "Running" && timeRemaining) {
      const { days, hours, minutes, seconds } = timeRemaining;
      return (
        <p className="text-black">
          {days}D, {hours}H, {minutes}M, {seconds}S
        </p>
      );
    }

    if (timerStatus === "Expired") {
      return <p>Expired!</p>;
    }

    return null;
  };

  const [timerStatus, setTimerStatus] = useState("Pending");

  useEffect(() => {
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

    updateTimerStatus();
    const interval = setInterval(updateTimerStatus, 1000);

    return () => clearInterval(interval);
  }, [item.start_date, item.time_set_prize]);

  return (
    <div key={i} className="keen-slider__slide ">
      {item?.raffle_status !== 0 &&
        item?.raffle_status !== 2 &&
        item?.raffle_status !== 3 && (
          <div className="bigcardgap">
            <div className="hidden lg:block bg-[#20124C] h-[850px]  rounded-xl ">
              <div className="flex items-center justify-center">
                <img
                  src={item ? CONSTANT_DATA.IMAGE_BASE_URL + item.images[0] : noimage}
                  alt={item.raffle_name}
                  className="h-[500px] rounded-t-xl"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = noimage;
                  }}
                />
              </div>
              <div className="absolute top-3 left-3 bg-[#F2DAE9] w-fit px-4 py-1 rounded-3xl flex items-center gap-2">
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
              <div className="w-[90%] m-auto text-white mt-8 pb-6 ">
                <div className="flex items-center gap-4">
                  <img
                    src={
                      item
                        ? CONSTANT_DATA.IMAGE_BASE_URL + item?.owner?.image
                        : noimage
                    }
                    alt={item?.owner?.businessName}
                    style={{
                      height: "50px",
                      width: "50px",
                      borderRadius: "50%",
                    }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = noimage;
                    }}
                  />
                  <div>
                    <h4 className="text-xl font-medium">
                      {item?.owner?.businessName}
                    </h4>
                    <div className="flex items-center gap-1">
                      <img src={fullStar} alt="5 stars" />
                      <img src={fullStar} alt="5 stars" />
                      <img src={fullStar} alt="5 stars" />
                      <img src={fullStar} alt="5 stars" />
                      <img src={fullStar} alt="5 stars" />

                      {/* <img src={emptyStar} alt="5 stars" /> */}
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="font-medium text-2xl tracking-wider">
                    {item.raffle_name}
                  </h3>
                </div>
                <div className="w-[95%] bg-[#D9D9D9] h-4 rounded-xl mt-4">
                  <div
                    className="bg-[#FF6A78] h-4 rounded-xl"
                    style={{
                      width: totalSale + "%",

                      maxWidth: "100%",
                    }}
                  ></div>
                </div>
                <p className="mt-2 p-1 text-sm tracking-wider font-light">
                  {item.totalTicketSold} tickets sold
                </p>
                <div className="mt-6 flex items-end justify-between">
                  {timerStatus === "Pending" && (
                    <button className="bg-[#FF6A78] py-4 px-16 rounded-lg text-xl font-medium tracking-wide">
                      Coming soon
                    </button>
                  )}
                  {timerStatus === "Running" && (
                    <button
                      onClick={() => {
                        handleUserNavigate(item?.uniqueID);
                      }}
                      className="bg-[#FF6A78] py-4 px-16 rounded-lg text-xl font-medium tracking-wide"
                    >
                      Enter Now !
                    </button>
                  )}
                  {timerStatus === "Expired" && (
                    <button className="bg-[#FF6A78] py-4 px-16 rounded-lg text-xl font-medium tracking-wide">
                      Expired
                    </button>
                  )}
                  <div>
                    <h1 className="text-[#FFBA01] font-bold text-lg tracking-wider m-0">
                      £{item.ticket_price}
                    </h1>
                    <h1 className="font-bold text-sm m-0">per ticket</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      {item?.raffle_status !== 0 &&
        item?.raffle_status !== 2 &&
        item?.raffle_status !== 3 && (
          <div className="block lg:hidden bg-[#20124C] rounded-xl w-[98%] m-auto">
            <img
              src={item ? CONSTANT_DATA.IMAGE_BASE_URL + item.images[0] : noimage}
              alt={item.raffle_name}
              className="w-full h-[400px]  rounded-t-xl"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = noimage;
              }}
            />
            <div className="w-[90%] m-auto text-white mt-8 pb-6 ">
              <div className="flex items-center gap-4">
                {/* <img src={CONSTANT_DATA.IMAGE_BASE_URL + item?.owner?.image} className='w-12 h-12 rounded-xl' alt={item?.owner?.businessName} /> */}
                <img
                  src={
                    item ? CONSTANT_DATA.IMAGE_BASE_URL + item?.owner?.image : noimage
                  }
                  alt={item?.owner?.businessName}
                  style={{ height: "50px", width: "50px", borderRadius: "50%" }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = noimage;
                  }}
                />
                <div className="absolute top-3 left-3 bg-[#F2DAE9] w-fit px-4 py-1 rounded-3xl flex items-center gap-2">
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
                <div>
                  <h4 className="text-xl font-medium">
                    {item?.owner?.businessName}
                  </h4>
                  <div className="flex items-center gap-1">
                    <img src={fullStar} alt="5 stars" />
                    <img src={fullStar} alt="5 stars" />
                    <img src={fullStar} alt="5 stars" />
                    <img src={fullStar} alt="5 stars" />
                    <img src={fullStar} alt="5 stars" />
                    {/* <img src={emptyStar} alt="5 stars" /> */}
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="font-medium text-sm tracking-wider">
                  {item.raffle_name}
                </h3>
              </div>
              <div className="w-[95%] bg-[#D9D9D9] h-2 rounded-xl mt-4">
                <div
                  className="bg-[#FF6A78] h-2 rounded-xl"
                  style={{
                    width: totalSale + "%",

                    maxWidth: "100%",
                  }}
                ></div>
              </div>
              <p className="mt-2 p-1 text-xs tracking-wider font-light">
                {item.totalTicketSold} tickets sold
              </p>
              <div className="mt-6 flex items-end justify-between">
                {timerStatus === "Pending" && (
                  <button className="bg-[#FF6A78] py-2 px-8 rounded-lg text-xl font-medium tracking-wide">
                    Coming soon
                  </button>
                )}
                {timerStatus === "Running" && (
                  <button
                    onClick={() => {
                      handleUserNavigate(item?.uniqueID);
                    }}
                    className="bg-[#FF6A78] py-2 px-8 rounded-lg text-xl font-medium tracking-wide"
                  >
                    Enter Now !
                  </button>
                )}
                {timerStatus === "Expired" && (
                  <button className="bg-[#FF6A78] py-2 px-8 rounded-lg text-xl font-medium tracking-wide">
                    Expired
                  </button>
                )}
                <div>
                  <h1 className="text-[#FFBA01] font-bold text-md tracking-wider m-0">
                    £{item.ticket_price}
                  </h1>
                  <h1 className="font-bold text-xs m-0">per ticket</h1>
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default BigGalleryCard;
