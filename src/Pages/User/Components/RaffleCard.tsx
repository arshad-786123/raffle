import { MouseEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS, CONSTANT_DATA } from "../../../constants";
import moment from "moment-timezone";
import { getUserPurchasedRaffle } from "../../../Services/Authentication/getUserPurchasedRaffle";
import { successToast } from "../../../Utils/Toast/success.toast";
import { errorToast } from "../../../Utils/Toast/error.toast";
import noimage from "../../../assets/no-image.png";
import toast from "react-hot-toast";

interface RaffleDetails {
  images: string[];
  raffle_type: string;
}

interface Item {
  brand: string;
  raffleDetails: RaffleDetails;
  cronTime: string;
}

interface UserRaffleCardProps {
  item: Item;
  i: number;
}

const UserRaffleCard = ({ item, i }: any) => {
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);
  const [indexValue, setIndexValue] = useState(null); // Use null to represent no active index
  const [raffleSold, setRaffleSold] = useState<any>();

  const handleMenuClick = (index: any) => {
    // Toggle the menu open/close state for the clicked card
    setIndexValue(indexValue === index ? null : index);
  };

  const handleClickOutside = (event: any) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      // Click occurred outside of the menu, so close it
      setIndexValue(null);
    }
  };

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

  useEffect(() => {
    getData();
    // Add event listener when component mounts
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Clean up the event listener when component unmounts
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const CountdownTimer = ({ endTime }: any) => {
    const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());
    const [isExpired, setIsExpired] = useState(false);


    function calculateTimeRemaining() {
      const now = moment().tz('Europe/London'); // GMT+1 time zone
      const end = moment(endTime).tz('Europe/London'); // Ensure end time is also in GMT+1
      const duration = moment.duration(end.diff(now));
      return {
        days: Math.floor(duration.asDays()), // Correct days calculation for duration
        hours: duration.hours(),
        minutes: duration.minutes(),
        seconds: duration.seconds()
      };
    }

    useEffect(() => {
      const timerID = setInterval(() => {
        const remaining = calculateTimeRemaining();
        setTimeRemaining(remaining);

        // Check if the timer has expired
        if (!isExpired && moment().tz('Europe/London').isSameOrAfter(moment(endTime).tz('Europe/London'))) {
          setIsExpired(true);
          setTimeRemaining({
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
          });
        }
      }, 1000);

      return () => clearInterval(timerID);
    }, [endTime, isExpired]);

    const { days, hours, minutes, seconds } = timeRemaining;

    return (
      <div>
        {isExpired ? (
          <p>00D, 00H, 00M, 00S</p>
        ) : (
          <p>{days}D, {hours}H, {minutes}M, {seconds}S</p>
        )}
      </div>
    );
  };

  const totalSale =
    (parseFloat(item?.raffleDetails?.totalPurchasedTicket) * 100) /
    parseFloat(item?.raffleDetails?.ticket_set_prize) || 0;

  const now = moment();
  const endDate = moment(item?.raffleDetails?.cronTime);
  const startDate = moment(item?.raffleDetails?.createdAt);

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

  const formattedDate = moment(
    raffleSold?.raffleDetails?.time_set_prize
  ).format("DD MMMM, YYYY HH:mm");

  const handleCopy = () => {
    const url = `${CONSTANT_DATA.WEB_URL}/raffle/details/${item?.raffleDetails?.uniqueID}`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          // successToast("Link copied to clipboard!");
          toast.success("Link copied to clipboard!");
        })
        .catch((err) => {
          console.error("Failed to copy using navigator.clipboard:", err);
          fallbackCopyTextToClipboard(url);
        });
    } else {
      fallbackCopyTextToClipboard(url);
    }
  };

  const fallbackCopyTextToClipboard = (text: any) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed"; // Avoid scrolling to bottom
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      const successful = document.execCommand("copy");
      if (successful) {
        successToast("Link copied to clipboard!");
      } else {
        throw new Error("Fallback: Copying text command was unsuccessful");
      }
    } catch (err) {
      console.error("Fallback: Oops, unable to copy", err);
      errorToast("Failed to copy the link.");
    } finally {
      document.body.removeChild(textArea);
    }
  };
  return (
    <div className="keen-slider__slide ">
      <div className="bg-[#20124C]  rounded-xl relative">
        <img
          src={
            item
              ? CONSTANT_DATA.IMAGE_BASE_URL + item?.raffleDetails?.images[0]
              : noimage
          }
          alt={item.brand}
          className="w-full rounded-t-xl h-[400px]"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = noimage;
          }}
        />
        {item.raffleDetails?.raffle_type === "TIME" && (
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
            <CountdownTimer endTime={item?.raffleDetails?.cronTime} />
          </div>
        )}
        <div className="absolute top-3 right-3">
          <button
            onClick={() => handleMenuClick(i)}
            className="bg-[#F2DAE9] rounded-3xl py-4 px-3 w-fit "
          >
            <svg
              width="14"
              height="5"
              viewBox="0 0 14 5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.756 2.43907C13.756 3.38073 13.0359 4.10083 12.0942 4.10083C11.1526 4.10083 10.4325 3.38073 10.4325 2.43907C10.4325 1.49741 11.1526 0.777311 12.0942 0.777311C13.0359 0.777311 13.756 1.49741 13.756 2.43907ZM8.77071 2.43907C8.77071 3.38073 8.05061 4.10083 7.10895 4.10083C6.16729 4.10083 5.44719 3.38073 5.44719 2.43907C5.44719 1.49741 6.16729 0.777312 7.10895 0.777312C8.05061 0.777311 8.77071 1.49741 8.77071 2.43907ZM3.78543 2.43907C3.78543 3.38073 3.06534 4.10083 2.12367 4.10083C1.18201 4.10083 0.461914 3.38073 0.461914 2.43907C0.461914 1.49741 1.18201 0.777312 2.12367 0.777312C3.06534 0.777312 3.78543 1.49741 3.78543 2.43907Z"
                fill="black"
              />
            </svg>
          </button>
        </div>
        {indexValue === i && (
          <div
            ref={menuRef}
            className="bg-white rounded-md py-2 px-4 absolute top-16 right-3"
          >
            <button
              className="flex items-center gap-2 justify-start mt-2"
              onClick={() =>
                navigate(`/raffle/details/${item?.raffleDetails?.uniqueID}`)
              }
            >
              <svg
                width="11"
                height="13"
                viewBox="0 0 11 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() =>
                  navigator.clipboard.writeText(`${CONSTANT_DATA.IMAGE_BASE_URL}`)
                }
              >
                <path
                  d="M7.9118 8.65356C7.63292 8.65402 7.35689 8.70676 7.0995 8.80875C6.84212 8.91075 6.60846 9.05999 6.41189 9.24794L3.96469 7.61856C4.13678 7.32298 4.22705 6.99073 4.22705 6.65294C4.22705 6.31515 4.13678 5.9829 3.96469 5.68731L6.41189 4.05794C6.75431 4.38807 7.20675 4.595 7.69192 4.64339C8.1771 4.69179 8.6649 4.57864 9.07202 4.32328C9.47914 4.06791 9.7803 3.68618 9.92406 3.24328C10.0678 2.80038 10.0453 2.3238 9.86026 1.89495C9.67524 1.4661 9.33924 1.11158 8.90964 0.891955C8.48005 0.67233 7.98352 0.601225 7.50488 0.690788C7.02623 0.78035 6.59516 1.02502 6.28531 1.38301C5.97546 1.74099 5.80605 2.19008 5.80601 2.65356C5.80609 2.83615 5.83266 3.01786 5.88496 3.19356L3.2325 4.96544C2.90115 4.76491 2.51623 4.65884 2.12336 4.65981C1.56487 4.65981 1.02926 4.87059 0.634348 5.24578C0.239437 5.62097 0.0175781 6.12984 0.0175781 6.66044C0.0175781 7.19104 0.239437 7.69991 0.634348 8.0751C1.02926 8.45029 1.56487 8.66106 2.12336 8.66106C2.5178 8.65757 2.90285 8.54626 3.2325 8.34044L5.88496 10.1048C5.76375 10.508 5.77897 10.9372 5.92846 11.3318C6.07795 11.7263 6.35416 12.0663 6.71805 12.3036C7.08194 12.5409 7.51512 12.6636 7.95639 12.6543C8.39766 12.645 8.8247 12.5043 9.17718 12.2519C9.52967 11.9995 9.78977 11.6483 9.92073 11.2478C10.0517 10.8474 10.0469 10.418 9.90705 10.0202C9.76719 9.6225 9.49932 9.27659 9.14129 9.03135C8.78326 8.78612 8.35317 8.65396 7.9118 8.65356ZM7.9118 1.65231C8.18315 1.66348 8.4395 1.77375 8.62735 1.96012C8.81521 2.14649 8.92008 2.39458 8.92008 2.65263C8.92008 2.91068 8.81521 3.15876 8.62735 3.34513C8.4395 3.53151 8.18315 3.64177 7.9118 3.65294C7.6833 3.65297 7.46122 3.5811 7.28026 3.44856C7.10353 3.32297 6.97296 3.14766 6.90708 2.94753C6.84121 2.74741 6.84339 2.53266 6.91331 2.33378C6.98324 2.1349 7.11735 1.96202 7.29659 1.83968C7.47583 1.71735 7.6911 1.65179 7.9118 1.65231ZM3.0904 7.03731C3.01597 7.20959 2.89181 7.35838 2.73224 7.46653C2.57267 7.57467 2.38417 7.63778 2.18849 7.64856C2.16947 7.65056 2.15027 7.65056 2.13125 7.64856C1.85227 7.64856 1.58472 7.54327 1.38745 7.35585C1.19018 7.16844 1.07935 6.91424 1.07935 6.64919C1.07935 6.38414 1.19018 6.12994 1.38745 5.94252C1.58472 5.75511 1.85227 5.64981 2.13125 5.64981C2.15027 5.64782 2.16947 5.64782 2.18849 5.64981C2.38618 5.66203 2.57608 5.72764 2.73586 5.83891C2.89564 5.95019 3.01864 6.1025 3.0904 6.27794C3.14639 6.3991 3.1753 6.52999 3.1753 6.66231C3.1753 6.79464 3.14639 6.92552 3.0904 7.04669V7.03731ZM7.9118 11.6536C7.6911 11.6541 7.47583 11.5885 7.29659 11.4662C7.11735 11.3439 6.98324 11.171 6.91331 10.9721C6.84339 10.7732 6.84121 10.5585 6.90708 10.3583C6.97296 10.1582 7.10353 9.98291 7.28026 9.85732C7.46122 9.72477 7.6833 9.65291 7.9118 9.65294C8.18315 9.6641 8.4395 9.77437 8.62735 9.96075C8.81521 10.1471 8.92008 10.3952 8.92008 10.6533C8.92008 10.9113 8.81521 11.1594 8.62735 11.3458C8.4395 11.5321 8.18315 11.6424 7.9118 11.6536Z"
                  fill="#35353D"
                />
              </svg>
              <span>Share</span>
            </button>
            <button
              className="flex items-center gap-2 justify-start mt-2"
              onClick={handleCopy}
            >
              {/* <button className='flex items-center gap-2 justify-start mt-2' onClick={() => navigator.clipboard.writeText(`http://128.199.164.240/`)}> */}
              <svg
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.1976 2.78346C12.4607 2.09875 11.4651 1.7146 10.4276 1.7146C9.39007 1.7146 8.39452 2.09875 7.65762 2.78346L7.08012 3.32487C6.98629 3.41283 6.93359 3.53212 6.93359 3.65651C6.93359 3.78091 6.98629 3.90019 7.08012 3.98815C7.17394 4.07611 7.30117 4.12551 7.43387 4.12551C7.56654 4.12551 7.69379 4.07611 7.78762 3.98815L8.36512 3.44674C8.91607 2.95214 9.65174 2.67949 10.4145 2.68725C11.1773 2.69498 11.9065 2.98249 12.4459 3.48818C12.9853 3.99387 13.292 4.67751 13.3002 5.39262C13.3085 6.10772 13.0177 6.79741 12.4901 7.31393L11.9126 7.85534C11.8188 7.9433 11.7661 8.06259 11.7661 8.18698C11.7661 8.31138 11.8188 8.43066 11.9126 8.51862C12.0064 8.60658 12.1337 8.65598 12.2664 8.65598C12.399 8.65598 12.5263 8.60658 12.6201 8.51862L13.1976 7.97721C13.931 7.28787 14.3429 6.35398 14.3429 5.38034C14.3429 4.40672 13.931 3.47283 13.1976 2.78346Z"
                  fill="black"
                />
                <path
                  d="M8.24748 11.2914L7.66998 11.8328C4.82498 14.2961 0.919972 10.6375 3.54498 7.96559L4.12248 7.42418C4.21628 7.33622 4.26901 7.21693 4.26901 7.09254C4.26901 6.96814 4.21628 6.84886 4.12248 6.7609C4.02866 6.67294 3.90141 6.62354 3.76873 6.62354C3.63603 6.62354 3.50878 6.67294 3.41498 6.7609L2.83748 7.30231C2.11263 7.99294 1.70825 8.92414 1.71243 9.89302C1.71662 10.8619 2.12902 11.79 2.85981 12.4751C3.59061 13.1602 4.58056 13.5469 5.61403 13.5508C6.64753 13.5547 7.64078 13.1756 8.37748 12.4961L8.95498 11.9547C9.04878 11.8667 9.10151 11.7474 9.10151 11.623C9.10151 11.4986 9.04878 11.3793 8.95498 11.2914C8.86116 11.2034 8.73391 11.154 8.60123 11.154C8.46853 11.154 8.34128 11.2034 8.24748 11.2914Z"
                  fill="black"
                />
                <path
                  d="M9.49762 5.58903L5.83012 9.02731C5.73629 9.11527 5.68359 9.23454 5.68359 9.35895C5.68359 9.48333 5.73629 9.60263 5.83012 9.69059C5.92394 9.77855 6.05117 9.82796 6.18387 9.82796C6.31654 9.82796 6.44379 9.77855 6.53762 9.69059L10.2051 6.25231C10.2989 6.16435 10.3516 6.04505 10.3516 5.92067C10.3516 5.79626 10.2989 5.67699 10.2051 5.58903C10.1113 5.50107 9.98404 5.45166 9.85137 5.45166C9.71867 5.45166 9.59144 5.50107 9.49762 5.58903Z"
                  fill="black"
                />
              </svg>
              <span>Copy link</span>
            </button>
            <button
              className="flex items-center gap-2 justify-start mt-2"
              onClick={() => navigate("/user/prizes")}
            >
              <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.2237 3.87646H11.3425V2.82397C11.3425 2.72452 11.3054 2.62913 11.2395 2.55881C11.1736 2.48848 11.0842 2.44897 10.9909 2.44897H4.04405C3.95081 2.44897 3.86138 2.48848 3.79545 2.55881C3.72952 2.62913 3.69249 2.72452 3.69249 2.82397V3.87646H2.81124C2.52361 3.87714 2.24796 3.99929 2.04459 4.21624C1.84122 4.43316 1.72669 4.72719 1.72607 5.03396V6.81646C1.72665 7.39014 1.93895 7.94051 2.31704 8.34849C2.69513 8.75646 3.20862 8.98924 3.74639 8.99646C3.88259 9.88821 4.29211 10.7066 4.91086 11.3236C5.52959 11.9407 6.32264 12.3215 7.16592 12.4065V14.054H4.9628C4.86956 14.054 4.78013 14.0935 4.7142 14.1638C4.64827 14.2341 4.61124 14.3295 4.61124 14.429C4.61124 14.5284 4.64827 14.6238 4.7142 14.6941C4.78013 14.7645 4.86956 14.804 4.9628 14.804H10.0722C10.1654 14.804 10.2548 14.7645 10.3208 14.6941C10.3867 14.6238 10.4237 14.5284 10.4237 14.429C10.4237 14.3295 10.3867 14.2341 10.3208 14.1638C10.2548 14.0935 10.1654 14.054 10.0722 14.054H7.86905V12.4065C8.71198 12.3216 9.50477 11.9411 10.1235 11.3246C10.7422 10.7081 11.1519 9.89027 11.2886 8.99897C11.8264 8.99174 12.3398 8.75896 12.7179 8.35099C13.096 7.94301 13.3083 7.39264 13.3089 6.81896V5.03646C13.3089 4.72926 13.1946 4.43459 12.9912 4.21711C12.7878 3.99964 12.5117 3.87714 12.2237 3.87646ZM2.4292 6.81896V5.03646C2.4289 4.98274 2.43853 4.92949 2.45761 4.87976C2.47666 4.83004 2.50477 4.78481 2.54025 4.74671C2.57576 4.70861 2.61799 4.67836 2.66449 4.65774C2.71099 4.63709 2.76087 4.62646 2.81124 4.62646H3.69249V8.24896C3.35088 8.22671 3.03009 8.06644 2.79541 7.80077C2.56071 7.53509 2.42974 7.18401 2.4292 6.81896ZM7.51749 11.674C6.6897 11.6733 5.89601 11.3223 5.31066 10.6979C4.72533 10.0736 4.39622 9.22694 4.39561 8.34396V3.19896H10.6394V8.34396C10.6387 9.22694 10.3096 10.0736 9.72429 10.6979C9.13896 11.3223 8.34525 11.6733 7.51749 11.674ZM12.6058 6.81896C12.6052 7.18401 12.4743 7.53509 12.2396 7.80077C12.0049 8.06644 11.6841 8.22671 11.3425 8.24896V4.62646H12.2237C12.2739 4.62646 12.3236 4.63701 12.3699 4.65749C12.4163 4.67796 12.4584 4.70799 12.4939 4.74584C12.5293 4.78366 12.5575 4.82859 12.5767 4.87804C12.5959 4.92746 12.6058 4.98046 12.6058 5.03396V6.81896Z"
                  fill="black"
                />
              </svg>
              <span>Winners</span>
            </button>
          </div>
        )}

        <div className="w-[90%] m-auto text-white mt-8 pb-6 ">
          <div className="flex items-end justify-between">
            <div className="flex items-center gap-2">
              <img
                src={
                  item
                    ? CONSTANT_DATA.IMAGE_BASE_URL + item?.ownerDetails?.image
                    : noimage
                }
                alt={item?.ownerDetails?.businessName}
                style={{ height: "50px", width: "50px", borderRadius: "50%" }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = noimage;
                }}
              />
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-md font-light">by</span>{" "}
                  <h4 className="text-md font-medium">
                    {item.ownerDetails?.businessName}
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="font-medium text-md tracking-wider">
              {item?.raffleDetails?.raffle_name}
            </h3>
          </div>
          <p className="-mb-3 mt-4  text-sm tracking-wider font-light">
            {item?.raffleDetails?.raffle_type === "TICKET" &&
              totalSale.toFixed(0) + "%" + " " + "SOLD"}
            {item?.raffleDetails?.raffle_type === "TIME" && formattedDate}
          </p>
          <div className="w-[95%] bg-[#D9D9D9] h-2 rounded-xl mt-4">
            <div
              className={`bg-[#FF6A78]  h-2 rounded-xl`}
              style={{
                width:

                  totalSale + "%",
                maxWidth: "100%",
              }}
            ></div>
          </div>
          <p className="mt-2 p-1 text-sm tracking-wider font-light">
            {item?.raffleDetails?.totalQuantity} Tickets Purchased
          </p>
          <div className="flex items-center justify-between mt-0">
            {/* <p className='mt-2 p-1 text-sm tracking-wider font-light'>£ {item.raffleDetails?.ticket_price} Total amount</p> */}
            <p className="mt-2 p-1 text-sm tracking-wider font-light">
              £ {item.raffleDetails?.ticket_price || 0} Total amount
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRaffleCard;
