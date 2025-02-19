import React, { useEffect, useState } from "react";
import IkeaBack from "../../assets/owner/ikea_back.png";
import Ikea from "../../assets/homepage/featured/ikea.png";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import RaffleCard from "../Home/Components/RaffleCard";
import raffle1 from "../../assets/homepage/liveRaffles/raffle_1.png";
import raffle2 from "../../assets/homepage/liveRaffles/raffle_2.png";
import raffle3 from "../../assets/homepage/liveRaffles/raffle_3.png";
import raffle4 from "../../assets/homepage/liveRaffles/raffle_4.png";
import raffle5 from "../../assets/homepage/liveRaffles/raffle_5.png";
import raffle6 from "../../assets/homepage/liveRaffles/raffle_6.png";
import raffle7 from "../../assets/homepage/liveRaffles/raffle_7.png";
import raffle8 from "../../assets/homepage/liveRaffles/raffle_8.png";
import ikeaLogo from "../..//assets/homepage/featured/ikea.png";
import { useKeenSlider } from "keen-slider/react";
import { getRaffle, specificRaffleNull } from "../../Services/Owner/getRaffle";
import { getSpecificRaffle } from "../../Services/Owner/getSpecificRaffle";
import { IRaffle } from "../../Utils/Interface/raffle.interface";
import { initialFormData } from "../Owner/Create";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, clearCart } from "../../Redux/Cart/cartSlice";
import { API_ENDPOINTS, CONSTANT_DATA } from "../../constants";
import { Props } from "react-confetti";
import moment from "moment";
import { getUserPurchasedRaffle } from "../../Services/Authentication/getUserPurchasedRaffle";
import { errorToast } from "../../Utils/Toast/error.toast";
import { Modal } from "flowbite-react";
import {
  FacebookShareButton,
  WhatsappShareButton,
  FacebookIcon,
  WhatsappIcon,
  InstapaperShareButton,
} from "react-share";
import noimage from "../../assets/no-image.png";
import { Helmet } from "react-helmet";

const UserDetails = ({ authenticationModal, setAuthenticationModal }: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const cartData = useSelector((state: any) => state);
  const [raffleSold, setRaffleSold] = useState<any>();
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(
    null
  );
  const [isPostalEntry, setIsPostalEntry] = useState(false);

  const userData = useSelector((state: any) => state.reducer.user);
  console.log("userData", userData);

  const { state, pathname } = useLocation();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleShareClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const data = [
    {
      time: "22:15:05",
      image: raffle1,
      logo: ikeaLogo,
      title: "IKEA",
      name: "$20k Valentines Day Instant Win!",
      sold: "32%",
      price: "£1.99",
      cashAlternate: "$89",
    },
    {
      time: "22:15:05",
      image: raffle2,
      logo: ikeaLogo,
      title: "IKEA",
      name: "$20k Valentines Day Instant Win!",
      sold: "32%",
      price: "£1.99",
      cashAlternate: "$89",
    },
    {
      time: "22:15:05",
      image: raffle3,
      logo: ikeaLogo,
      title: "IKEA",
      name: "$20k Valentines Day Instant Win!",
      sold: "32%",
      price: "£1.99",
      cashAlternate: "$89",
    },
    {
      time: "22:15:05",
      image: raffle4,
      logo: ikeaLogo,
      title: "IKEA",
      name: "$20k Valentines Day Instant Win!",
      sold: "32%",
      price: "£1.99",
      cashAlternate: "$89",
    },
  ];

  const [ref2] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "free-snap",
    slides: {
      perView: 1,
      spacing: 2,
    },
  });

  const [raffleData, setRaffleData] = useState<IRaffle>(initialFormData);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");

  // const totalPrize = raffleData.revenue_set_prize || raffleData.ticket_set_prize

  // const purchasedTickets = (raffleData?.totalQuantity || 0);

  useEffect(() => {
    getUserType();
  }, []);

  type MediaItem = {
    data: string | null;
    index: number | null;
  };

  const [selectedImage, setSelectedImage] = useState<MediaItem>({
    data: null,
    index: null,
  });
  const [selectedVideo, setSelectedVideo] = useState<MediaItem>({
    data: null,
    index: null,
  });
  const getUserType = async () => {
    const getID = window.location.pathname;
    const ID = getID.split("/")[getID.split("/")?.length - 1];

    try {
      const type = await specificRaffleNull(ID);
      if (!type.success) {
        navigate("/");
      } else {
        if (type.result) {
          setSelectedImage({ data: type.result?.images[0], index: 0 });
          setSelectedVideo({ data: type.result?.videos[0], index: 0 });

          setRaffleData(type.result);
        } else {
          // Handle case where type.result is null or undefined
        }
      }
    } catch (error) {
      console.error("Error fetching raffle data:", error);
      // Handle error (e.g., show error message)
    }
  };

  const handleSelectedImage = (item: string, index: number) => {
    setSelectedImage({ data: item, index });
    setSelectedVideo({ data: null, index: null });
  };

  const handleSelectedVideos = (item: string, index: number) => {
    setSelectedVideo({ data: item, index });
    setSelectedImage({ data: null, index: null });
  };
  const getData = async () => {
    try {
      if (raffleData?._id) {
        const result = await getUserPurchasedRaffle(
          `${API_ENDPOINTS.SOLDOUT_RAFFLE}${raffleData._id}`
        );

        if (
          result &&
          result.success &&
          result.result &&
          result.result.length > 0
        ) {
          setRaffleSold(result.result[0]); // Update raffleSold with the first item in the result array
        } else {
          console.log("No purchased raffle found or API result format error.");
          // Optionally handle case where result is empty or format is unexpected
          // setRaffleSold(null);
        }
      } else {
        console.log("raffleData._id is not defined.");
        // Optionally handle case where raffleData._id is not defined
        // setRaffleSold(null);
      }
    } catch (error) {
      console.error("Error fetching purchased raffle:", error);
      // Optionally handle error (e.g., show error message, set raffleSold to null)
      // setRaffleSold(null);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getUserType();
  }, []);

  useEffect(() => {
    if (raffleData) {
      getData();
    }
  }, [raffleData]);

  const [itemValue, setItemValue] = useState(1);

  const handleReduceItemQty = () => {
    if (raffleData?.isFreeRaffle) {
      if (itemValue > 1) {
        setItemValue(itemValue - 1);
      }
      return;
    }
    if (itemValue > 0) {
      setItemValue(itemValue - 1);
    }
  };

  const perPerson = parseFloat(raffleData.max_tickets_per_person) || 0;

  const handleIncreaseItemQty = () => {
    if (raffleData?.isFreeRaffle) {
      if (itemValue < 1) {
        setItemValue(itemValue + 1);
        console.log("Incrementing item value for free raffle.");
      } else {
        console.log("Reached the limit for free raffle.");
      }
      return; // Exit the function if it's a free raffle
    }


    // Calculate the total tickets available for purchase
    let totalTicketPurchasable =
      parseInt(raffleData.ticket_set_prize) - raffleData.totalPurchasedTicket;

    // Limit the purchasable tickets by the per-person limit, if applicable
    if (perPerson > 0 && perPerson <= totalTicketPurchasable) {
      totalTicketPurchasable = perPerson;
    }

    // Check if the current itemValue exceeds the allowable limit
    if (itemValue < totalTicketPurchasable) {
      setItemValue(itemValue + 1); // Increment itemValue
      console.log(`Incrementing itemValue to ${itemValue + 1}`);
    } else {
      console.log(
        `Cannot increment itemValue. Max limit of ${totalTicketPurchasable} reached.`
      );
    }

    // if (perPerson === 0) {
    //   setItemValue(itemValue + 1);
    //   console.log(
    //     "No per person limit, incrementing item value until remaining tickets limit."
    //   );
    // } else if (itemValue < perPerson) {
    //   setItemValue(itemValue + 1);
    //   console.log(
    //     "No limit set for remaining tickets but respecting perPerson limit, incrementing item value."
    //   );
    // } else if (itemValue < perPerson) {
    //   setItemValue(itemValue + 1);
    //   console.log("Incrementing item value.");
    // } else {
    //   console.log("Item value cannot be incremented. Conditions not met.");
    // }

    console.log("itemValue after increment", itemValue);
  };

  const handleCart = () => {
    dispatch(addItemToCart({ raffleData, itemValue }));
  };


  const handleBuy = () => {
    // Check if selected answer index is not null and matches the correct answer index before adding to cart
    if (selectedAnswerIndex === null) {
      errorToast("Please select the answer.");
    } else if (selectedAnswerIndex.toString() == raffleData?.correctAnswer) {
      // dispatch(clearCart());
      if (
        userData?.user?.role !== "Business" &&
        userData?.user?.role !== "ADMIN"
      ) {
        dispatch(addItemToCart({ raffleData, itemValue }));
        navigate("/user/cart");
      } else {
        errorToast("You cannot buy this raffle");
      }
    } else {
      errorToast("Incorrect answer.");
    }
  };

  console.log("raffleData>>>", raffleData);

  const formattedDate = moment(raffleData?.time_set_prize).format(
    "DD MMM, YYYY"
  );

  // const remainingTickets = parseFloat(raffleData.ticket_set_prize) - raffleData?.totalPurchasedTicket;
  const ticket_set_prize = parseFloat(raffleData.ticket_set_prize) || 0;
  const totalPurchasedTicket = raffleData.totalPurchasedTicket || 0;

  const totalSale =
    (raffleData?.totalPurchasedTicket * 100) /
    parseFloat(raffleData?.ticket_set_prize) || 0;

  console.log("ticket_set_prize", ticket_set_prize); // Check if this is NaN
  console.log("totalPurchasedTicket", totalPurchasedTicket); // Should be 0 or a valid number

  // let remainingTickets = ticket_set_prize - raffleData?.totalPurchasedTicket;
  // if (isNaN(remainingTickets)) {
  //     remainingTickets = 0;
  //     console.error("remainingTickets is NaN, setting to 0");
  // }
  // console.log("remainingTickets after NaN check", remainingTickets);

  // Calculate percentage
  let soldTicketPercentage = (totalPurchasedTicket * 100) / ticket_set_prize;
  if (soldTicketPercentage >= 100) {
    soldTicketPercentage = 100;
  }

  // const totalSale = parseFloat(raffleSold?.totalQuantity || 0) * 100 / parseFloat(raffleData.ticket_set_prize);

  const now = moment();
  const endDate = moment(raffleData?.cronTime);
  const startDate = moment(raffleData?.createdAt);

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

  console.log(
    ">>>>>>>>>>>",
    selectedImage.data ? CONSTANT_DATA.BASE_URL + selectedImage.data : noimage
  );

  return (
    <div style={{ fontFamily: "poppins, sans-serif" }}
      className={`bg-[#F9F0F0] footer-manage h-fit ${data.length > 4 ? "lg:fit pb-12" : "lg:h-[auto]"
        } `}
    >
      <Helmet>
        <meta property="og:title" content={raffleData?.raffle_name} />
        <meta
          property="og:description"
          content={raffleData?.raffle_description}
        />
        <meta property="og:url" content={`${CONSTANT_DATA?.BASE_URL}/${id}`} />
        <meta
          property="og:image"
          content={
            selectedImage.data
              ? CONSTANT_DATA.BASE_URL + selectedImage.data
              : noimage
          }
        />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content={CONSTANT_DATA?.BASE_URL} />

        {/* Twitter Card Data */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:image"
          content={
            selectedImage?.data
              ? CONSTANT_DATA.BASE_URL + selectedImage.data
              : noimage
          }
        />
        <meta name="twitter:image:alt" content="Alt text for image" />
      </Helmet>

      <div className="pt-16 m-auto w-[80%]">
        <div>
          <div>
            {/* <h1 className='text-[16px] lg:text-[20] font-[700]'>{raffleData?.raffle_name}</h1> */}
            <div className="flex items-center justify-between ">
              <div className="flex w-[100%] lg:w-fit justify-between gap-6 mt-2"></div>
              <div className="hidden lg:block lg:flex gap-2 items-end">
                <div
                  className="flex gap-2 items-end"
                  onClick={handleShareClick}
                  style={{ alignItems: "center" }}
                >
                  <p className="font-medium">Share on your socials:</p>
                  <div className="flex justify-center space-x-2">
                    <FacebookShareButton
                      url={`${CONSTANT_DATA?.BASE_URL}/${id}`}
                      title="Check out this raffle!"
                    >
                      <FacebookIcon size={32} round />
                    </FacebookShareButton>
                    {/* <InstapaperShareButton url={`${CONSTANT_DATA?.BASE_URL}/${id}`}>
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
                        alt="instapaper"
                        className="w-6 h-6"
                      />
                    </InstapaperShareButton> */}
                    {/* <WhatsappShareButton url={`${CONSTANT_DATA?.BASE_URL}/${id}`} title="Check out this raffle!">
                                            <WhatsappIcon size={32} round />
                                        </WhatsappShareButton> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="block lg:flex gap-5 justify-between mt-8 mb-20 lg:mb-0">
          <div className="block lg:flex   ">
            <div>
              {/* {selectedImage.data ? (
                                <img
                                    className='w-[370px] h-[350px] rounded-lg'
                                    src={selectedImage.data ? CONSTANT_DATA.BASE_URL + selectedImage.data : noimage}
                                    alt="ikea"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        console.log('Image failed to load:', target.src);
                                        target.onerror = null;
                                        target.src = noimage;
                                        console.log('Set fallback image:', noimage);
                                    }}
                                    onLoad={() => console.log('Image loaded successfully')}
                                />
                            ) : (
                                <video
                                        className='w-[370px] h-[350px] rounded-lg'
                                    src={CONSTANT_DATA.BASE_URL + selectedVideo.data}
                                    controls
                                    autoPlay
                                />
                            )} */}
              <div className="responsive-container1">
                {selectedImage.data ? (
                  <img
                    className="responsive-content"
                    src={
                      selectedImage.data
                        ? CONSTANT_DATA.BASE_URL + selectedImage.data
                        : noimage
                    }
                    alt="ikea"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      console.log("Image failed to load:", target.src);
                      target.onerror = null;
                      target.src = noimage;
                      console.log("Set fallback image:", noimage);
                    }}
                    onLoad={() => console.log("Image loaded successfully")}
                  />
                ) : (
                  <video
                    className="responsive-content"
                    src={CONSTANT_DATA.BASE_URL + selectedVideo.data}
                    controls
                    autoPlay
                  />
                )}
              </div>

              {/* <div className="mt-4  grid grid-cols-3 lg:grid-cols-5 gap-6">
                {raffleData?.images?.map((item, i) => (
                  <img
                    key={`image-${i}`}
                    onClick={() => {
                      handleSelectedImage(item, i);
                    }}
                    className={`w-[100px] h-[70px] rounded-lg cursor-pointer border-black object-cover ${selectedImage.index === i ? "border-2 p-1" : ""
                      }`}
                    src={item ? CONSTANT_DATA.BASE_URL + item : noimage}
                    alt={raffleData?.raffle_name || `Raffle image ${i + 1}`}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = noimage;
                    }}
                  />
                ))}
                {raffleData?.videos?.map((item, i) => (
                  <video
                    key={`video-${i}`}
                    onClick={() => {
                      handleSelectedVideos(item, i);
                    }}
                    className={`w-[100px] h-[70px] rounded-lg cursor-pointer border-black ${selectedVideo.index === i && "border-2 p-1"
                      }`}
                    src={CONSTANT_DATA.BASE_URL + item}
                    title={raffleData?.raffle_name}
                    muted
                  />
                ))}
              </div> */}

              <div className="mt-4 grid grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4 lg:gap-6">
                {raffleData?.images?.map((item, i) => (
                  <img
                    key={`image-${i}`}
                    onClick={() => {
                      handleSelectedImage(item, i);
                    }}
                    className={`w-16 h-12 sm:w-24 sm:h-16 lg:w-[100px] lg:h-[70px] rounded-lg cursor-pointer border-black object-cover ${selectedImage.index === i ? "border-2 p-1" : ""
                      }`}
                    src={item ? CONSTANT_DATA.BASE_URL + item : noimage}
                    alt={raffleData?.raffle_name || `Raffle image ${i + 1}`}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = noimage;
                    }}
                  />
                ))}
                {raffleData?.videos?.map((item, i) => (
                  <video
                    key={`video-${i}`}
                    onClick={() => {
                      handleSelectedVideos(item, i);
                    }}
                    className={`w-16 h-12 sm:w-24 sm:h-16 lg:w-[100px] lg:h-[70px] rounded-lg cursor-pointer border-black ${selectedVideo.index === i && "border-2 p-1"
                      }`}
                    src={CONSTANT_DATA.BASE_URL + item}
                    title={raffleData?.raffle_name}
                    muted
                  />
                ))}
              </div>
            </div>

            <div className="responsive-container">
              <div className="hidden lg:flex flex-row mb-4 items-center gap-2">
                {raffleData?.ownerDetails?.image ? (
                  <img
                    className="w-12 h-12 rounded-xl object-cover"
                    src={
                      raffleData?.ownerDetails?.image
                        ? `${CONSTANT_DATA.BASE_URL}${raffleData.ownerDetails.image}`
                        : noimage
                    }
                    alt={
                      raffleData?.ownerDetails?.businessName || "Raffle image"
                    }
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = noimage;
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

                <p className="font-bold">
                  {raffleData.ownerDetails?.businessName}
                </p>
              </div>
              {/* <div className="block lg:hidden flex justify-between items-center">
                <div className=" flex items-center gap-2">
                  {raffleData?.ownerDetails?.image ? (
                    <img
                      className="w-12 h-12 rounded-xl object-cover"
                      src={
                        raffleData?.ownerDetails?.image
                          ? `${CONSTANT_DATA.BASE_URL}${raffleData.ownerDetails.image}`
                          : noimage
                      }
                      alt={
                        raffleData?.ownerDetails?.businessName || "Raffle image"
                      }
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = noimage;
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

                  <p className="font-bold">
                    {raffleData.ownerDetails?.businessName}
                  </p>
                </div>
                <div className=" flex gap-4 items-end">
                  <div
                    className="flex gap-2 items-end"
                    onClick={handleShareClick}
                    style={{ alignItems: "center" }}
                  >
                    <div className="flex justify-center space-x-2">
                      <FacebookShareButton
                        url={`${CONSTANT_DATA?.BASE_URL}/${id}`}
                        title="Check out this raffle!"
                      >
                        <FacebookIcon size={32} round />
                      </FacebookShareButton>
                    </div>
                  </div>
                </div>
              </div> */}

              <div className="block lg:hidden">
                {/* Main container with vertical spacing */}
                <div className="py-4 space-y-4">
                  {/* Content container with flex layout */}
                  <div className="flex justify-between items-start">
                    {/* Left side - Owner details */}
                    <div className="flex items-center gap-3">
                      {raffleData?.ownerDetails?.image ? (
                        <img
                          className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                          src={
                            raffleData?.ownerDetails?.image
                              ? `${CONSTANT_DATA.BASE_URL}${raffleData.ownerDetails.image}`
                              : noimage
                          }
                          alt={
                            raffleData?.ownerDetails?.businessName ||
                            "Raffle image"
                          }
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = noimage;
                          }}
                        />
                      ) : (
                        <svg
                          className="flex-shrink-0"
                          width="46"
                          height="44"
                          viewBox="0 0 46 44"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          {/* SVG content remains the same */}
                        </svg>
                      )}
                      <p className="font-bold text-sm md:text-base">
                        {raffleData.ownerDetails?.businessName}
                      </p>
                    </div>

                    {/* Right side - Share button */}
                    <div className="flex-shrink-0">
                      <div
                        className="flex items-center"
                        onClick={handleShareClick}
                      >
                        <FacebookShareButton
                          url={`${CONSTANT_DATA?.BASE_URL}/${id}`}
                          title="Check out this raffle!"
                        >
                          <FacebookIcon size={32} round />
                        </FacebookShareButton>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <h1 className="text-[16px] lg:text-[20] font-[700]">
                {raffleData?.raffle_name}
              </h1>
              <div className="flex items-center gap-2">
                <p className="font-bold text-sm lg:text-md">Website: </p>
                <a
                  href={
                    raffleData?.websites.startsWith("http")
                      ? raffleData?.websites
                      : `http://${raffleData?.websites}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#F66E6A] font-[600] underline text-xs lg:text-md"
                >
                  {raffleData?.websites}
                </a>
              </div> */}
              <div className="space-y-2 py-4 lg:py-6">
                <h1 className="text-base lg:text-xl font-bold">
                  {raffleData?.raffle_name}
                </h1>
                <div className="flex items-center gap-2">
                  <p className="font-bold text-sm lg:text-base">Website:</p>
                  <a
                    href={
                      raffleData?.websites.startsWith("http")
                        ? raffleData?.websites
                        : `http://${raffleData?.websites}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#F66E6A] font-semibold underline text-xs lg:text-base"
                  >
                    {raffleData?.websites}
                  </a>
                </div>
              </div>
              <div className="mt-5">
                <h3 className="font-bold tracking-wide mt-4 lg:mt-0">
                  About this Raffle
                </h3>

                <div className="font-medium text-md mt-4 lg:mt-0">
                  {/* {raffleData?.raffle_description.replace(/<[^>]*>/g, '')} */}
                  <div
                    dangerouslySetInnerHTML={{ __html: raffleData?.raffle_description }}
                    className="raffle-details-description"
                  />


                </div>
              </div>
            </div>
          </div>
          <div className="w-[100%] lg:w-[30%]">
            {/* <div className='flex gap-2 bg-white py-2 px-8 rounded-[100px]'>
                            <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.9395 4.2203L14.4798 3.68892L15.0973 4.29624L16.1779 3.23344L13.8623 0.956055L12.7817 2.01885L13.3992 2.62613L12.7045 3.30935C8.99949 1.10786 4.21385 2.24655 2.05262 5.89037C-0.108619 9.5342 1.04916 14.089 4.67698 16.2905C8.3048 18.492 13.0904 17.3533 15.2517 13.7094C17.1813 10.597 16.641 6.64953 13.9395 4.2203ZM8.69071 15.0759C5.6804 15.0759 3.2876 12.7226 3.2876 9.76197C3.2876 6.80137 5.6804 4.44804 8.69071 4.44804V9.76194H14.0938C14.0939 12.7225 11.701 15.0759 8.69071 15.0759Z" fill="black" />
                            </svg>
                            <p className='font-bold'>22:15:05</p>
                        </div> */}

            {/* <div className='mt-6'>
                            <p className='font-bold'>Question: {raffleData.question}</p>
                            <select
                                value={selectedAnswer}
                                onChange={(e) => setSelectedAnswer(e.target.value)}
                                className='w-full mt-2 p-2 border-2 border-black rounded-md'
                            >
                                <option value='' disabled>Select your answer</option>
                                {raffleData.answers?.map((answer, index) => (
                                    <option key={index} value={answer}>{answer}</option>
                                ))}
                            </select>
                        </div> */}

            <br />

            <div className="lg:w-[400px] p-4 border-[#FF6A78] border-2 bg-white rounded-md relative">
              {raffleData.raffle_type === "TIME" && (
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
                    startTime={raffleData.start_date}
                    endTime={raffleData.cronTime}
                  />
                </div>
              )}
              <div className="flex items-center justify-between" style={{ marginTop: "50px" }}>
                <p className="font-bold tracking-wide">
                  {raffleData?.ticket_price === "0"
                    ? "Free Entry"
                    : `£${raffleData?.ticket_price}`}
                </p>
                <div className="flex gap-2 items-center">
                  <div>

                    <p className="text-[#FF6A78] font-bold">
                      {Math.max(0, raffleData?.ticket_set_prize - raffleData?.totalPurchasedTicket)} Tickets Available
                    </p>
                    <p className="text-[#20124c] font-bold">
                      {" "}
                      {raffleData?.raffle_type == "TIME"
                        ? `Ends:  ${formattedDate} `
                        : `Ends: ${0} Ticket Sold`}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className="mt-2">
                  <p>
                    {soldTicketPercentage ? (
                      soldTicketPercentage.toFixed(0) + "%" + " " + "Tickets sold"
                    ) : (
                      "0% Tickets sold" // Or any default message you'd like to show when it's empty
                    )}
                  </p>

                  <div className="w-[95%] bg-[#D9D9D9] h-2 rounded-xl ">
                    {raffleData.raffle_type == "TIME" && (
                      <div
                        className="bg-[#FF6A78]  h-2 rounded-xl"
                        style={{ width: totalSale + "%", maxWidth: "100%" }}
                      ></div>
                    )}
                    {raffleData.raffle_type == "TICKET" && (
                      <div
                        className="bg-[#FF6A78]  h-2 rounded-xl"
                        style={{
                          width: soldTicketPercentage + "%",
                          maxWidth: "100%",
                        }}
                      ></div>
                    )}
                  </div>
                </div>
                <div className="flex mt-4 justify-between">
                  <p className="text-[#FFBA01] font-bold"></p>
                  <div>
                    {/* <p className='text-sm'>Cash Alternative: £{raffleData?.ticket_price}</p> */}

                    <p className="text-sm">
                      Number of Prizes: {raffleData?.main_prizes?.length}
                    </p>
                  </div>
                </div>
                <p className=" mt-4">Add Tickets</p>
                <div className="flex justify-between rounded-md border-2 border-black ">
                  <div
                    onClick={handleReduceItemQty}
                    className="cursor-pointer border-r-2 border-black p-4 text-xl font-medium"
                  >
                    -
                  </div>
                  <p className="p-4 font-bold tracking-wide">{itemValue}</p>
                  <div
                    onClick={handleIncreaseItemQty}
                    className="border-l-2 cursor-pointer border-black p-4 text-xl font-medium"
                  >
                    +
                  </div>
                </div>
                <div className="mt-4">
                  <p className="">Question: </p>
                  <p className="">{raffleData.question}</p>
                  <select
                    value={selectedAnswerIndex ?? ""}
                    onChange={(e) =>
                      setSelectedAnswerIndex(Number(e.target.value))
                    }
                    className="w-full mt-4 p-2 border-2 border-black rounded-md"
                  >
                    <option value="" disabled>
                      Select your answer
                    </option>
                    {raffleData.answers?.map(
                      (answer: string, index: number) => (
                        <option key={index} value={index}>
                          {answer}
                        </option>
                      )
                    )}
                  </select>

                </div>
                {/* {
                                    !(state?.isOwner === true || Number(raffleData?.totalPurchasedTicket) === Number(raffleData?.ticket_set_prize)) && (
                                        <div className='mt-6 flex items-end justify-between text-white'>
                                            <button
                                                onClick={handleBuy}
                                                className='bg-[#FF6A78] py-3 px-16 rounded-lg text-lg font-medium tracking-wide w-full'
                                            >
                                                Buy Now
                                            </button>
                                        </div>
                                    )
                                } */}
                {!(
                  state?.isOwner === true ||
                  Number(raffleData?.totalPurchasedTicket) >=
                  Number(raffleData?.ticket_set_prize) ||
                  new Date() >= new Date(raffleData?.cronTime)
                ) && (
                    <div className="mt-6 flex items-end justify-between text-white">
                      <button
                        onClick={handleBuy}
                        className="bg-[#FF6A78] py-3 px-16 rounded-lg text-lg font-medium tracking-wide w-full"
                      >
                        {raffleData?.ticket_price === `0`
                          ? "Enter for Free"
                          : "Buy Now"}
                      </button>
                    </div>
                  )}

                <div className="mt-4">
                  <div className="flex mt-4 justify-between">
                    {/* <p className='text-[#FF6A78] ' style={{ cursor: "pointer" }}>Terms and conditions</p> */}
                    <div>
                      <p
                        className="text-[#FF6A78]"
                        style={{ cursor: "pointer", fontSize: "13px" }}
                        onClick={() => setIsPostalEntry(true)}
                      >
                        Free Postal Entry
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {raffleData?.main_prizes?.length > 0 && (
          <div>
            <div className="bg-[#F9F0F0] mt-0 lg:mt-10 ">
              <h1 className="text-[16px] lg:text-[20] font-[700]">Winners</h1>

              {/* <div className='w-[100%] bg-white overflow-x-scroll mt-4 p-1 lg:p-10 border-[#FF6A78] border-2 rounded-md'>
                                    <table className='w-[100%] '>
                                        <thead className='border-b-2'>
                                            <th className='text-[8px] lg:text-[16px] font-normal p-4'>Prize Name</th>
                                            <th className='text-[8px] lg:text-[16px] font-normal p-4'>Prize</th>
                                            <th className='text-[8px] lg:text-[16px] font-normal p-4'>Ticket Number</th>
                                            <th className='text-[8px] lg:text-[16px] font-normal p-4'>Winner Name</th>

                                        </thead>

                                        <tbody className='mt-2'>
                                            {raffleData.main_prizes && raffleData.main_prizes?.map((prize, index) => (
                                                <tr key={index}>
                                                    <td className='text-[8px] lg:text-[16px] text-center pt-3'>{prize.prize_name}</td>
                                                    <td className='text-[8px] lg:text-[16px] text-center pt-3'>£{prize.prize_value}</td>
                                                    <td className='text-[8px] lg:text-[16px] text-center pt-3'>{prize.ticketID}</td>
                                                    <td className='text-[8px] lg:text-[16px] text-center pt-3'>{prize?.firstname}{" "} {prize?.lastname}</td>
                                                </tr>
                                            ))}
                                        </tbody>

                                    </table>
                                </div> */}

              {/* <div className="w-full bg-white overflow-x-auto mt-4 p-2 lg:p-10 border-[#FF6A78] border-2 rounded-md">
                  <table className="w-full min-w-[640px]">
                    <thead className="border-b-2">
                      <tr>
                        <th className="text-xs lg:text-base font-normal p-2 lg:p-4">
                          Prize Name
                        </th>
                        <th className="text-xs lg:text-base font-normal p-2 lg:p-4">
                          Prize
                        </th>
                        <th className="text-xs lg:text-base font-normal p-2 lg:p-4">
                          Ticket Number
                        </th>
                        <th className="text-xs lg:text-base font-normal p-2 lg:p-4">
                          Winner Name
                        </th>
                      </tr>
                    </thead>
                    <tbody className="mt-2">
                      {raffleData.main_prizes &&
                        raffleData.main_prizes.map((prize, index) => (
                          <tr key={index}>
                            <td className="text-xs lg:text-base text-center py-3 px-2">
                              {prize.prize_name}
                            </td>
                            <td className="text-xs lg:text-base text-center py-3 px-2">
                              £{prize.prize_value}
                            </td>
                            <td className="text-xs lg:text-base text-center py-3 px-2">
                              {prize.ticketID}
                            </td>
                            <td className="text-xs lg:text-base text-center py-3 px-2">
                              {prize?.firstname} {prize?.lastname}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div> */}

              <div className="w-full bg-white mt-4 p-2 lg:p-10 border-[#FF6A78] border-2 rounded-md">
                <table className="w-full hidden lg:table">
                  <thead className="border-b-2">
                    <tr>
                      <th className="text-xs lg:text-base font-bold p-2 lg:p-4 ">
                        Prize Name
                      </th>
                      <th className="text-xs lg:text-base font-bold p-2 lg:p-4 ">
                        {/* Prize */}
                        Prize Value
                      </th>
                      <th className="text-xs lg:text-base font-bold p-2 lg:p-4 ">
                        Ticket Number
                      </th>
                      <th className="text-xs lg:text-base font-bold p-2 lg:p-4 ">
                        Winner Name
                      </th>
                    </tr>
                  </thead>
                  <tbody className="mt-2">
                    {raffleData.main_prizes &&
                      raffleData.main_prizes.map((prize, index) => (
                        <tr key={index}>
                          <td className="text-xs lg:text-base text-center py-3 px-2">
                            {prize.prize_name}
                          </td>
                          <td className="text-xs lg:text-base text-center py-3 px-2">
                            £{prize.prize_value}
                          </td>
                          <td className="text-xs lg:text-base text-center py-3 px-2 break-words">
                            {prize.ticketID}
                          </td>
                          <td className="text-xs lg:text-base text-center py-3 px-2 break-words">
                            {prize?.firstname} {prize?.lastname}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>

                <div className="lg:hidden">
                  {raffleData.main_prizes &&
                    raffleData.main_prizes.map((prize, index) => (
                      <div
                        key={index}
                        className="border border-gray-300 rounded-lg p-4 mb-4"
                      >
                        <div className="mb-2">
                          <strong>Prize Name:</strong> {prize.prize_name}
                        </div>
                        <div className="mb-2">
                          <strong>Prize Value:</strong> £{prize.prize_value}
                        </div>
                        <div className="mb-2">
                          <strong>Ticket Number:</strong>
                          <div className="break-words">{prize.ticketID}</div>
                        </div>
                        <div className="break-words">
                          <strong>Winner Name:</strong> {prize?.firstname}{" "}
                          {prize?.lastname}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Modal
        className="bg-[#160B3A]"
        position="center"
        show={isPostalEntry}
        popup
        onClose={() => setIsPostalEntry(false)}
        size="7xl"
      >
        <div className="rounded-md relative max-h-[80vh] max-w-[90vw] overflow-y-auto free-postal-entry">
          <Modal.Header className="bg-white  rounded-t-md p-6  pb-0">
            Free Postal Entry
          </Modal.Header>

          <Modal.Body className="bg-white text-secondary h-full xs:h-auto rounded-b-md  p-6">
            {/* <h1>Competition Entry Conditions</h1> */}
            <p>
              You may enter the competition for free by complying with the
              following conditions:
            </p>
            <br />
            <ol className="p-4">
              <li>
                Send your entry by first or second class post to the Promoter at
                the following address:
                <address className="mt-3 ms-5">
                  Raffily Prize Draws,
                  <br />
                  PO Box 1457,
                  <br />
                  FY1 9TJ
                </address>
              </li>
              <br />
              <li>
                {" "}
                Hand-delivered entries will not be accepted and will not be
                entered into the random draw.
              </li>
              <br />
              <li>
                Include with your entry the following information (all details
                must match the details on your account):
                <ul className="mt-3 ms-5">
                  <li>
                    {" "}
                    The name or details of the competition you wish to enter.
                  </li>
                  <li> Your full name.</li>
                  <li> Your address.</li>
                  <li> A contact telephone number and email address.</li>
                  <li>
                    {" "}
                    Your answer to the Competition Question (if there is one).
                  </li>
                </ul>
              </li>
              <br />
              <li> Incomplete or illegible entries will be disqualified.</li>
              <br />
              <li>
                You may make multiple free entries for any competition (up to
                any limit placed on entries by the Promoter), but each free
                entry must be submitted and posted to the Promoter separately.
                Bulk entries in one envelope will not be accepted as multiple
                entries and if a bulk entry is received, it will be counted as
                one single entry.
              </li>
              <br />
              <li>
                {" "}
                By entering the competition, you are confirming that you are
                eligible to enter and accept these terms and conditions.
              </li>
              <br />
              <li>
                Your entry must be received by the Promoter prior to the Closing
                Date. Entries received after the Closing Date will not be
                entered into the random draw. Proof of posting does not
                guarantee that you will be entered into the random draw.
              </li>
              <br />
              <li>
                {" "}
                The Promoter will not acknowledge receipt of your entry nor
                confirm if your answer to the Competition Question is correct.
              </li>
              <br />
              <li>
                If the number of entries received reaches any cap or limit
                before your free entry is received, you will not be entered into
                the random draw.
              </li>
            </ol>
            {/* <br /> */}
            <br />
            <p>
              Your entry is subject to our full terms and conditions.{" "}
              <a
                href="/terms-and-conditions"
                target="_blank"
                className="underline"
              >
                Click here for details.
              </a>
            </p>
          </Modal.Body>
        </div>
      </Modal>
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


export default UserDetails;
