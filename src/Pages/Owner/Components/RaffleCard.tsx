import { useEffect, useRef, useState } from "react";
import Boost from "./Modal/Boost";
import { useNavigate, useParams } from "react-router-dom";
import { API_ENDPOINTS, CONSTANT_DATA } from "../../../constants";
import { IRaffle } from "../../../Utils/Interface/raffle.interface";
import moment from "moment-timezone";
import { useSelector } from "react-redux";
import { getUserPurchasedRaffle } from "../../../Services/Authentication/getUserPurchasedRaffle";
import { errorToast } from "../../../Utils/Toast/error.toast";
import { updateRaffleStatus } from "../../../Services/Admin/getDashboardData";
import { successToast } from "../../../Utils/Toast/success.toast";
import noimage from "../../../assets/no-image.png";
import nouserimage from "../../../assets/no-image-user.png";

const RaffleCard = ({ item, raffleType }: any, i: any) => {
  const navigate = useNavigate();
  const [statusUpdated, setStatusUpdated] = useState(false);

  const isRevenue = item.raffle_type === "REVENUE";
  const isRevenueORTick =
    item.raffle_type === "REVENUE"
      ? item.revenue_set_prize
      : item.ticket_set_prize;
  const userDetails = useSelector((state: any) => state.reducer.user);

  const [indexValue, setIndexValue] = useState(null); // Use null to represent no active index
  const [raffleSold, setRaffleSold] = useState<any>();
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

  // Combine the two to get a final totalSaleBaseOnTime
  // const finalTotalSaleBaseOnTime = Math.min(100, (totalSaleBasedOnQuantity + totalSaleBasedOnTime) / 2);

  const handleMenuClick = (index: any) => {
    // Toggle the menu open/close state for the clicked card
    setIndexValue(indexValue === index ? null : index);
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

  const [isBoostModalOpen, setIsBoostModalOpen] = useState(false);

  const handleNavigate = (id: string) => {

    navigate(`/raffle/details/${id}`, {
      state: {
        sold: totalSale,
        isOwner: true,
      },
    });
  };

  const menuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: any) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      // Click occurred outside of the menu, so close it
      setIndexValue(null);
    }
  };

  const handleCopy = () => {
    const url = `${CONSTANT_DATA.WEB_URL}/raffle/details/${item.uniqueID}`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          successToast("Link copied to clipboard!");
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
    textArea.style.position = "fixed";
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

  useEffect(() => {
    // getData();
    // Add event listener when component mounts
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Clean up the event listener when component unmounts
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const checkTimeAndUpdateStatus = async () => {
      if (item?.raffle_type === "TIME") {
        const currentTime = moment();
        if (!statusUpdated && currentTime.isAfter(moment(item?.cronTime))) {
          try {
            //await updateRaffleStatus(item?._id, 2);
            setStatusUpdated(true); // Set status updated to true after the API call
          } catch (error) {
            console.error("Error updating raffle status", error);
          }
        }
      }
    };

    const timerID = setInterval(checkTimeAndUpdateStatus, 1000);

    return () => clearInterval(timerID);
  }, [item, statusUpdated]);

  const formattedDate = moment(
    item.time_set_prize
  ).format("DD MMMM, YYYY HH:mm");

  return (
    <div key={i} className="keen-slider__slide ">
      <div className="bg-[#20124C]  rounded-xl relative">
        {/* <img src={CONSTANT_DATA.IMAGE_BASE_URL+item.images[0]} alt="asd" className='w-full' /> */}

        <img
          onClick={() => {
            handleNavigate(item.uniqueID);
          }}
          src={item ? CONSTANT_DATA.IMAGE_BASE_URL + item.images[0] : noimage}
          alt="asd"
          className="cursor-pointer w-[100%] h-[250px] rounded-t-xl"
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
          <CountdownTimer startTime={item.start_date} endTime={item.cronTime} />
        </div>

        {/* {
                        item?.raffle_status === 0 &&
                        <div
                            className='absolute top-3 left-3 bg-[#FFFFFF] w-fit px-4 py-1 rounded-3xl flex items-center gap-2 cursor-pointer'
                        >
                            PENDING
                        </div>
                    }
                    {
                        item?.raffle_status === 2 &&
                        <div
                            className='absolute top-3 left-3 bg-[#FF6A78] w-fit px-4 py-1 rounded-3xl flex items-center gap-2 cursor-pointer text-white'
                        >
                            DECLINE
                        </div>
                    } */}

        <div className="absolute top-3 right-3 " style={{ zIndex: "9999999" }}>
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
            {(raffleType === "DUE" || raffleType === "DRAFT") && (
              <button
                className="flex items-center justify-start gap-2"
                onClick={() =>
                  navigate(`/owner/edit/${item._id}`, {
                    state: {
                      item: item,
                    },
                  })
                }
              >
                <svg
                  width="17"
                  height="18"
                  viewBox="0 0 17 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.54648 9.07554H8.14648V7.58804L13.4465 1.95679L14.8465 3.44429L9.54648 9.07554Z"
                    stroke="black"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M13.1465 5.35669V12.2629C13.1465 12.8473 12.6965 13.3254 12.1465 13.3254H5.14648C4.59648 13.3254 4.14648 12.8473 4.14648 12.2629V4.82544C4.14648 4.24106 4.59648 3.76294 5.14648 3.76294H11.7465"
                    stroke="black"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span>Edit</span>
              </button>
            )}
            <button
              className="flex items-center gap-2 justify-start mt-2"
              onClick={handleCopy}
            >
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
              onClick={() => navigate("/owner/prizes")}
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

        <div className="cursor-pointer w-[90%] m-auto text-white mt-8 pb-6 ">
          <div
            onClick={() => {
              handleNavigate(item.uniqueID);
            }}
            className="flex items-center justify-between"
          >
            <div className="flex gap-2" style={{ alignItems: "center" }}>
              {item?.owner?.image ? (
                <img
                  src={
                    item
                      ? CONSTANT_DATA.IMAGE_BASE_URL + item?.owner?.image
                      : nouserimage
                  }
                  alt={item?.owner?.businessName}
                  style={{ height: "50px", width: "50px", borderRadius: "50%" }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = nouserimage;
                  }}
                />
              ) : (
                <svg
                  width="46"
                  height="44"
                  viewBox="0 0 46 44"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <ellipse
                    cx="23.1136"
                    cy="21.5474"
                    rx="22.3402"
                    ry="21.5"
                    fill="#F2DAE9"
                  />
                  <g clip-path="url(#clip0_160_72)">
                    <path
                      d="M22.9635 21.3854C23.9561 21.3854 24.8157 21.0532 25.518 20.3975C26.2204 19.742 26.5764 18.94 26.5764 18.0134C26.5764 17.0871 26.2204 16.285 25.5179 15.6293C24.8155 14.9739 23.956 14.6416 22.9635 14.6416C21.9707 14.6416 21.1114 14.9739 20.4091 15.6294C19.7067 16.2849 19.3506 17.087 19.3506 18.0134C19.3506 18.94 19.7067 19.7422 20.4092 20.3977C21.1116 21.053 21.9711 21.3854 22.9635 21.3854Z"
                      fill="#232463"
                    />
                    <path
                      d="M29.285 25.4068C29.2648 25.134 29.2238 24.8364 29.1635 24.5222C29.1026 24.2056 29.0242 23.9063 28.9304 23.6328C28.8334 23.35 28.7016 23.0708 28.5386 22.8033C28.3695 22.5256 28.1708 22.2837 27.9479 22.0848C27.7148 21.8766 27.4294 21.7092 27.0993 21.5871C26.7704 21.4657 26.4059 21.4042 26.016 21.4042C25.8629 21.4042 25.7148 21.4628 25.4288 21.6366C25.2528 21.7437 25.0469 21.8676 24.8171 22.0047C24.6206 22.1215 24.3545 22.231 24.0257 22.3301C23.7049 22.427 23.3792 22.4761 23.0577 22.4761C22.7363 22.4761 22.4107 22.427 22.0896 22.3301C21.7611 22.2311 21.4949 22.1216 21.2987 22.0048C21.071 21.869 20.865 21.7451 20.6864 21.6365C20.4007 21.4627 20.2525 21.4041 20.0994 21.4041C19.7094 21.4041 19.345 21.4657 19.0162 21.5872C18.6864 21.7091 18.4009 21.8765 18.1675 22.0849C17.9447 22.284 17.7459 22.5257 17.577 22.8033C17.4142 23.0708 17.2823 23.3499 17.1853 23.6329C17.0916 23.9064 17.0132 24.2056 16.9523 24.5222C16.892 24.836 16.851 25.1337 16.8308 25.4071C16.8109 25.675 16.8008 25.953 16.8008 26.2338C16.8008 26.9646 17.0497 27.5563 17.5405 27.9926C18.0253 28.4231 18.6667 28.6416 19.4468 28.6416H26.6694C27.4494 28.6416 28.0906 28.4233 28.5755 27.9926C29.0664 27.5566 29.3154 26.9649 29.3154 26.2337C29.3152 25.9516 29.3051 25.6734 29.285 25.4068Z"
                      fill="#232463"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_160_72">
                      <rect
                        width="15"
                        height="14"
                        fill="white"
                        transform="translate(15.5703 14.6416)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              )}
              {/* <div className="flex items-center gap-1">
                <span className="text-md font-light">by</span>{" "}
                <h4 className="text-md font-medium">
                  {item?.owner?.businessName}
                </h4>
              </div>
            </div>
            <div>
              <h1 className="text-[#FFBA01] font-bold text-sm tracking-wider m-0">
                {item.currency} {item?.ticket_set_prize} Tickets Available
              </h1>
            </div> */}
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-1">
                  <span className="text-md font-light">by</span>{" "}
                  <h4 className="text-md font-medium">
                    {item?.owner?.businessName}
                  </h4>
                </div>
                <div className="md:hidden">
                  <h1 className="text-[#FFBA01] font-bold text-sm m-0">
                    {/* {item.currency} {item?.ticket_set_prize} Tickets Available */}
                    {item.currency}{Math.max(0, item?.ticket_set_prize - item?.totalPurchasedTicket)} Tickets Available

                  </h1>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <h1 className="text-[#FFBA01] font-bold text-sm m-0">
                {/* {item.currency} {item?.ticket_set_prize} Tickets Available */}
                {item.currency}{Math.max(0, item?.ticket_set_prize - item?.totalPurchasedTicket)} Tickets Available
              </h1>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="font-medium text-md tracking-wider">
              {item.raffle_name}
            </h3>
          </div>

          {/* <p className='-mb-3 mt-4  text-sm tracking-wider font-light'>{(totalSale == 0 ? 32 : totalSale.toFixed(2)) + "%"} SOLD</p> */}
          <p className="-mb-3 mt-4  text-sm tracking-wider font-light">
            {item?.raffle_type === "TICKET" &&
              totalSale.toFixed(0) + "%" + " " + "SOLD"}
            {item?.raffle_type === "TIME" && formattedDate}
          </p>
          <div className="w-[95%] bg-[#D9D9D9] h-2 rounded-xl mt-4">
            {item?.raffle_type === "TICKET" && (
              <div
                className={`bg-[#FF6A78]  h-2 rounded-xl`}
                style={{ width: totalSale + "%", maxWidth: "100%" }}
              ></div>
            )}
            {item?.raffle_type === "TIME" && (
              <div
                className={`bg-[#FF6A78]  h-2 rounded-xl`}
                style={{ width: totalSale + "%", maxWidth: "100%" }}
              ></div>
            )}
          </div>
          <div className="flex items-center justify-between mt-0">
            <p className="mt-2 p-1 text-sm tracking-wider font-light">
              {item.ticket_price === ""
                ? "£0"
                : parseFloat(item.ticket_price) === 0
                  ? "FREE"
                  : `${item.currency}£${item.ticket_price}`}
            </p>


          </div>



          {raffleType === "LIVE" && (
            <div
              // onClick={() => setIsBoostModalOpen(true)}
              onClick={() => {
                handleNavigate(item.uniqueID);
              }}
              className="mt-6 flex items-end justify-between"
            >
              <button className="bg-[#FF6A78] py-3 px-16 rounded-lg text-lg font-medium tracking-wide w-full">
                Promote Raffle
              </button>
            </div>
          )}
        </div>
      </div>
      <Boost
        isBoostModalOpen={isBoostModalOpen}
        setIsBoostModalOpen={setIsBoostModalOpen}
      />
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
