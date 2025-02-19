import limit from "../../../assets/pdp/limit.svg";
import time from "../../../assets/pdp/time.svg";
import date from "../../../assets/pdp/date.svg";
import shareNetwork from "../../../assets/pdp/shareNetwork.svg";
import checkmark from "../../../assets/pdp/checkmark.svg";
import { Badge } from "@/Components/ui/badge";
import { useEffect, useState } from "react";
import ImageGallery, { ReactImageGalleryItem } from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Group1707478610 from "../../../assets/Group1707478610.svg";
import { initialFormData } from "@/Pages/Owner/Create";
import { IRaffle } from "@/Utils/Interface/raffle.interface";
import { getUserPurchasedRaffle } from "@/Services/Authentication/getUserPurchasedRaffle";
import { API_ENDPOINTS, CONSTANT_DATA } from "@/constants";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { specificRaffleNull } from "@/Services/Owner/getRaffle";
import moment from "moment";
import { addItemToCart } from "@/Redux/Cart/cartSlice";
import { errorToast } from "@/Utils/Toast/error.toast";
import { Modal } from "flowbite-react";
import { FacebookShareButton, FacebookIcon } from "react-share";
import { Helmet } from "react-helmet";

import noimage from "@/assets/no-image.png";
import { successToast } from "@/Utils/Toast/success.toast";

// Define the type for gallery items
type GalleryItem = ReactImageGalleryItem & {
  logoMark?: string;
};

// Define props type if needed (empty in this case)
type AboutRafflesProps = {};

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
};

const AboutRaffles: React.FC<AboutRafflesProps> = () => {

  const [images, setImages] = useState<GalleryItem[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state, pathname } = useLocation();
  const [isPostalEntry, setIsPostalEntry] = useState(false);

  const [raffleSold, setRaffleSold] = useState<any>();
  const [raffleData, setRaffleData] = useState<any>(initialFormData);
  const [isMobileView, setIsMobileView] = useState(false);
  const { id, uniqueID } = useParams();


  useEffect(() => {
    if (uniqueID) {

      getUserType(); // Proceed if ID is valid
    } else {
      console.log("No Raffle ID found in URL!");
      // Optionally handle invalid state or navigate elsewhere
    }
  }, [uniqueID]);

  useEffect(() => {
    if (raffleData?.uniqueID) {

      getData();
    }
  }, [raffleData]);

  type MediaItem = {
    data: string | null;
    index: number | null;
  };
  const [selectedImage, setSelectedImage] = useState({ data: null, index: 0 });
  const [selectedVideo, setSelectedVideo] = useState<MediaItem>({
    data: null,
    index: null,
  });

  const [timerStatus, setTimerStatus] = useState<
    "Pending" | "Running" | "Expired"
  >("Pending");

  const [isPlaying, setIsPlaying] = useState({});

  const isVideoFile = (url: any) => {
    return url.toLowerCase().match(/\.(mp4|webm|ogg)$/);
  };

  const [progress, setProgress] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    console.log("raffleData:", raffleData);
    if (raffleData) {
      getData();
    }
  }, [raffleData]);

  const getUserType = async () => {
    const getID = window.location.pathname;
    const ID = getID.split("/")[getID.split("/")?.length - 1];

    try {
      const type = await specificRaffleNull(ID);
      if (!type.success) {
        navigate("/");
      } else {
        if (type.result) {
          const imageItems = type.result.images.map((image: any) => ({
            original: CONSTANT_DATA.IMAGE_BASE_URL + image,
            thumbnail: CONSTANT_DATA.IMAGE_BASE_URL + image,
          }));
          const videoItems = type.result.videos.map((video: any) => ({
            original: CONSTANT_DATA.IMAGE_BASE_URL + video,
            thumbnail: CONSTANT_DATA.IMAGE_BASE_URL + video,
          }));
          const mediaData = [...imageItems, ...videoItems];
          console.log("videoitems:", videoItems);
          setSelectedImage({ data: type.result?.images[0], index: 0 });
          setSelectedVideo({ data: type.result?.videos[0], index: 0 });

          setImages(mediaData);
          console.log("mediaData:", mediaData);
          setSelectedImage({ data: type.result.images[0], index: 0 });
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

  const [thumbnailPosition, setThumbnailPosition] = useState<"left" | "bottom">(
    "left"
  );

  useEffect(() => {
    // Function to handle screen size changes
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setThumbnailPosition("bottom"); // Mobile view
      } else {
        setThumbnailPosition("left"); // Larger devices
      }
    };

    // Set initial position
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const updateTimerStatus = () => {
    const now = moment();
    const start = moment(raffleData.start_date);
    const end = moment(raffleData.time_set_prize);

    if (now.isBefore(start)) {
      setTimerStatus("Pending");
    } else if (now.isAfter(end)) {
      setTimerStatus("Expired");
    } else {
      setTimerStatus("Running");
    }
  };

  // const calculateProgress = () => {
  //   const totalSold =
  //     (parseFloat(raffleData?.totalPurchasedTicket) * 100) /
  //     parseFloat(raffleData?.ticket_set_prize);
  //   setProgress(Math.min(100, totalSold));
  // };

  const calculateProgress = () => {
    const totalPurchasedTicket = parseFloat(raffleData?.totalPurchasedTicket || "0");
    const ticketSetPrize = parseFloat(raffleData?.ticket_set_prize || "0");

    // Check if ticketSetPrize is zero to avoid division by zero
    if (ticketSetPrize === 0) {
      setProgress(0);  // You can decide to set progress to 0 or any other value based on your needs
    } else {
      const totalSold = (totalPurchasedTicket * 100) / ticketSetPrize;
      setProgress(Math.min(100, totalSold));
    }
  };

  const calculateTimeLeft = () => {
    const now = moment();
    const end = moment(raffleData.time_set_prize);

    if (now.isSameOrAfter(end)) {
      setTimeLeft({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      });
    } else {
      const duration = moment.duration(end.diff(now));

      setTimeLeft({
        days: Math.floor(duration.asDays()),
        hours: duration.hours(),
        minutes: duration.minutes(),
        seconds: duration.seconds(),
      });
    }

  };

  const isEndingSoon =
    timerStatus === "Running" && timeLeft.days === 0 && timeLeft.hours <= 24;

  useEffect(() => {
    updateTimerStatus();
    calculateProgress();
    calculateTimeLeft();
    const timer = setInterval(() => calculateTimeLeft(), 1000);

    return () => clearInterval(timer);
  }, [raffleData]);

  const [itemValue, setItemValue] = useState<number | "">(raffleData?.isFreeRaffle ? 1 : 5);


  // const handleReduceItemQty = () => {
  //   if (raffleData?.isFreeRaffle) {
  //     if (itemValue > 1) {
  //       setItemValue(itemValue - 1);
  //     }
  //     return;
  //   }
  //   if (itemValue > 1) {
  //     setItemValue(itemValue - 1); // Regular raffle: decrement but not below 5
  //   } else {
  //     errorToast("The quantity cannot be reduced further.");
  //   }


  // };
  // const perPerson = parseFloat(raffleData.max_tickets_per_person) || 0;

  // const handleIncreaseItemQty = () => {
  //   if (raffleData?.isFreeRaffle) {
  //     errorToast("Cannot increment quantity for free raffle.")
  //     return; // Free raffle: no increment
  //   }

  //   // Calculate the total tickets available for purchase
  //   let totalTicketPurchasable =
  //     parseInt(raffleData.ticket_set_prize) - raffleData.totalPurchasedTicket;

  //   // Limit the purchasable tickets by the per-person limit, if applicable
  //   if (perPerson > 0 && perPerson <= totalTicketPurchasable) {
  //     totalTicketPurchasable = perPerson;
  //   }

  //   // Check if the current itemValue exceeds the allowable limit
  //   if (itemValue < totalTicketPurchasable) {
  //     setItemValue(itemValue + 1); // Increment itemValue
  //     console.log(`Incrementing itemValue to ${itemValue + 1}`);
  //   } else {
  //     console.log(
  //       `Cannot increment itemValue. Max limit of ${totalTicketPurchasable} reached.`
  //     );
  //   }
  // };

  // // Set default value on raffle data update
  // useEffect(() => {
  //   if (raffleData?.isFreeRaffle) {
  //     setItemValue(1); // Free raffle: itemValue is fixed at 1
  //   } else {
  //     // Set the default itemValue to the lower of 5 or max_tickets_per_person
  //     const maxPerPerson = parseInt(raffleData?.max_tickets_per_person) || 1;
  //     setItemValue(Math.min(5, maxPerPerson));
  //   }
  // }, [raffleData]);

  const perPerson = parseFloat(raffleData?.max_tickets_per_person) || 0;

  const totalTicketPurchasable =
    parseInt(raffleData?.ticket_set_prize) - (raffleData?.totalPurchasedTicket || 0);

  const maxAllowed = perPerson > 0 ? Math.min(perPerson, totalTicketPurchasable) : totalTicketPurchasable;

  const handleInputChange = (e: any) => {
    let value = e.target.value;

    // Allow empty input for temporary edits
    if (value === "") {
      setItemValue(""); // Let the user clear the input temporarily
      return;
    }

    // Allow only numbers
    if (!/^\d*$/.test(value)) return;

    // Convert to integer
    value = parseInt(value, 10);

    // Enforce conditions
    if (raffleData?.isFreeRaffle) {
      value = 1; // Free raffle is fixed at 1
      errorToast("Cannot change quantity for free raffle.");
    } else if (value < 1) {
      value = 1; // Minimum quantity is 1
      errorToast("Quantity cannot be less than 1.");
    } else if (value > maxAllowed) {
      value = maxAllowed; // Max per-person or total available limit
      errorToast(`Maximum limit reached: ${maxAllowed}`);
    }

    setItemValue(value);
  };

  // Restore default value on blur (if input is empty)
  const handleBlur = () => {
    if (itemValue === "") {
      setItemValue(1);
    }
  };
  // Update value when raffleData changes
  useEffect(() => {
    if (raffleData?.isFreeRaffle) {
      setItemValue(1);
    } else {
      setItemValue(Math.min(5, maxAllowed));
    }
  }, [raffleData]);

  const userData = useSelector((state: any) => state.reducer.user);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(
    null
  );

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

  const addToCart = () => {
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
        successToast("Raffle added to your basket!");
        setShowModal(true);
      } else {
        errorToast("You cannot buy this raffle");
      }
    } else {
      errorToast("Incorrect answer.");
    }
  };
  const endDate = new Date(raffleData.cronTime); // Using 'cronTime' as an example

  // Format the date
  const formattedDate = endDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleButtonClick = () => {
    // Toggle dropdown visibility
    setIsDropdownOpen(!isDropdownOpen);
  };

  const [showModal, setShowModal] = useState(false);

  // Function to handle the "Enter Now" button click
  const handleEnterNow = () => {
    setShowModal(true);
  };

  // Close the modal
  const closeModal = () => {
    setShowModal(false);
  };

  // Function to handle "See more raffles"
  const handleSeeMoreRaffles = () => {
    // Redirect to all raffles page
    window.location.href = '/all-raffles'; // Or use React Router to navigate
  };

  // Function to handle "Checkout Now"
  const handleCheckoutNow = () => {
    // Trigger checkout process (can be implemented here)
    navigate("/user/cart");
    setShowModal(false); // Close the modal after checkout
  };

  // const isMobileView = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth < 640);
    };

    checkMobileView();
    window.addEventListener('resize', checkMobileView);
    return () => window.removeEventListener('resize', checkMobileView);
  }, []);

  // const images = [
  //   {
  //     original: 'https://picsum.photos/800/600?random=1',
  //     thumbnail: 'https://picsum.photos/100/75?random=1',
  //   },
  //   {
  //     original: 'https://picsum.photos/800/600?random=2',
  //     thumbnail: 'https://picsum.photos/100/75?random=2',
  //   },
  //   {
  //     original: 'https://picsum.photos/800/600?random=3',
  //     thumbnail: 'https://picsum.photos/100/75?random=3',
  //   },
  //   {
  //     original: 'https://picsum.photos/800/600?random=4',
  //     thumbnail: 'https://picsum.photos/100/75?random=4',
  //   },
  //   {
  //     original: 'https://picsum.photos/800/600?random=5',
  //     thumbnail: 'https://picsum.photos/100/75?random=5',
  //   },
  //   {
  //     original: 'https://picsum.photos/800/600?random=6',
  //     thumbnail: 'https://picsum.photos/100/75?random=6',
  //   },
  //   {
  //     original: 'https://picsum.photos/800/600?random=7',
  //     thumbnail: 'https://picsum.photos/100/75?random=7',
  //   },
  //   {
  //     original: 'https://picsum.photos/800/600?random=8',
  //     thumbnail: 'https://picsum.photos/100/75?random=8',
  //   },
  //   {
  //     original: 'https://picsum.photos/800/600?random=9',
  //     thumbnail: 'https://picsum.photos/100/75?random=9',
  //   },
  //   {
  //     original: 'https://picsum.photos/800/600?random=10',
  //     thumbnail: 'https://picsum.photos/100/75?random=10',
  //   },
  // ];

  //   const customThumbnailStyles = `
  //   .image-gallery-thumbnails-container {
  //     display: flex;
  //     flex-direction: ${isMobileView ? 'row' : 'column'};
  //     gap: 8px;
  //     justify-content: flex-start;
  //     ${isMobileView ? 'overflow-x: auto; white-space: nowrap;' : 'overflow-y: auto;'}
  //     ${isMobileView ? 'max-height: 100px;' : 'max-height: 500px;'}
  //   }
  //   .image-gallery-thumbnail {
  //     flex: 0 0 auto; /* Prevent squeezing */
  //     width: ${isMobileView ? '48px' : '92px'} !important;
  //     height: ${isMobileView ? '48px' : '92px'} !important;
  //     transition: all 0.3s ease;
  //     padding: 2px !important;
  //     border-radius: 4px;
  //     background: none; 
  //     border: none !important;
  //     outline: none !important;
  //     box-shadow: none !important;
  //   }

  //   .image-gallery-thumbnail:hover,
  //   .image-gallery-thumbnail.active {
  //     padding: 4px !important;
  //     background: linear-gradient(55.21deg, #AD6FFF 9.69%, #FD98E8 47.47%, #FF7385 83.78%);
  //   }
  //   .image-gallery-thumbnail:hover .image-gallery-thumbnail-image,
  //   .image-gallery-thumbnail.active .image-gallery-thumbnail-image {
  //     border-radius: 3px; 
  //   }

  //   .image-gallery-thumbnail:hover img,
  //   .image-gallery-thumbnail.active img,
  //   .image-gallery-thumbnail:hover video,
  //   .image-gallery-thumbnail.active video 
  //   {    
  //     border: 3px solid #fff;
  //      border-radius: 4px;
  //   }

  //   .image-gallery-thumbnail .image-gallery-thumbnail-inner {
  //     display: flex !important;
  //     position: relative;
  //     width: 100%;
  //     height: 100%;
  //   }
  //   .image-gallery-thumbnail-image {
  //     width: 100% !important;
  //     height: 100% !important;
  //     object-fit: cover;
  //     border-radius: 4px;

  //   }
  //   .image-gallery-thumbnails-wrapper {
  //     ${isMobileView ? `
  //       width: 100%;
  //       overflow-x: auto;
  //     ` : ''}
  //   }
  //   .image-gallery-slide-wrapper {
  //     margin-bottom: 10px;
  //   }
  // `;

  const customThumbnailStyles = `
  .image-gallery-thumbnails-container {
    display: flex;
    flex-direction: ${isMobileView ? 'row' : 'column'};
    gap: 8px;
    justify-content: flex-start;
    ${isMobileView ? 'overflow-x: auto; white-space: nowrap;' : 'overflow-y: auto;'}
    ${isMobileView ? 'max-height: 100px;' : 'max-height: 500px;'} /* Adjust height as needed */

    /* Custom Scrollbar Styling */
    scrollbar-width: thin; /* Firefox */
    scrollbar-color: #aaa transparent; /* Firefox */
  }

  /* Custom Scrollbar for Chrome, Edge, and Safari */
  .image-gallery-thumbnails-container::-webkit-scrollbar {
    width: 3+++px; /* Width of the scrollbar */
    height: 3px; /* Height of the scrollbar (for horizontal scrollbars) */
  }

  .image-gallery-thumbnails-container::-webkit-scrollbar-track {
    background: transparent; /* Transparent track */
  }

  .image-gallery-thumbnails-container::-webkit-scrollbar-thumb {
    background: #aaa; /* Color of the scrollbar thumb */
    border-radius: 2px; /* Rounded corners */
  }

  .image-gallery-thumbnails-container::-webkit-scrollbar-thumb:hover {
    background: #888; /* Color of the scrollbar thumb on hover */
  }

  .image-gallery-thumbnail {
    flex: 0 0 auto; /* Prevent squeezing */
    width: ${isMobileView ? '48px' : '92px'} !important;
    height: ${isMobileView ? '48px' : '92px'} !important;
    transition: all 0.3s ease;
    padding: 2px !important;
    border-radius: 4px;
    background: none; /* No background for non-selected thumbnails */
    border: none !important; /* Removes default blue border */
    outline: none !important; /* Prevents blue outline on focus */
    box-shadow: none !important; /* Removes default shadow */
  }
    
  .image-gallery-thumbnail:hover,
  .image-gallery-thumbnail.active {
    padding: 4px !important;
    background: linear-gradient(55.21deg, #AD6FFF 9.69%, #FD98E8 47.47%, #FF7385 83.78%);
  }
  .image-gallery-thumbnail:hover .image-gallery-thumbnail-image,
  .image-gallery-thumbnail.active .image-gallery-thumbnail-image {
    border-radius: 3px; 
  }

   .image-gallery-thumbnail:hover img,
  .image-gallery-thumbnail.active img,
   .image-gallery-thumbnail:hover video,
  .image-gallery-thumbnail.active video 
  {    
    border: 3px solid #fff;
     border-radius: 4px;
  }

  .image-gallery-thumbnail .image-gallery-thumbnail-inner {
    display: flex !important;
    position: relative;
    width: 100%;
    height: 100%;
  }
  .image-gallery-thumbnail-image {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover;
    border-radius: 4px;
  }
  .image-gallery-thumbnails-wrapper {
    ${isMobileView ? `
      width: 100%;
      overflow-x: auto;
    ` : ''}
  }
  .image-gallery-slide-wrapper {
    margin-bottom: 10px;
  }
`;

  const renderItem = (item: any) => {
    const isVideo = isVideoFile(item.original);

    return (
      <div className={`relative ${isMobileView ? 'w-full h-[247px]' : 'w-full h-[525px]'}`}>
        {isVideo ? (
          <video
            className="object-cover w-full h-full rounded-lg"
            controls
            playsInline
            src={item.original}
            onError={(e) => {
              e.currentTarget.src = noimage;
            }}
          />
        ) : (
          <img
            src={item.original}
            alt=""
            className="object-cover w-full h-full rounded-lg"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = noimage;
            }}
          />
        )}

        {/* Owner Image Overlay */}
        <img
          src={
            raffleData?.ownerDetails?.image
              ? CONSTANT_DATA.IMAGE_BASE_URL + raffleData?.ownerDetails?.image
              : raffleData?.ownerImage
                ? CONSTANT_DATA.IMAGE_BASE_URL + raffleData?.ownerImage
                : noimage
          }
          alt={raffleData?.owner?.businessName}
          className="absolute bottom-4 left-4 w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-white"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = noimage;
          }}
        />
      </div>
    );
  };

  const renderThumbInner = (item: any) => {
    const isVideo = isVideoFile(item.thumbnail);
    return (
      <div className="relative w-full h-full">
        {isVideo ? (
          <>
            <video
              src={item.thumbnail}
              className="object-cover w-full h-full"
              onError={(e) => {
                e.currentTarget.src = noimage;
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8 5v10l7-5-7-5z" />
              </svg>
            </div>
          </>
        ) : (
          <img
            src={item.thumbnail}
            alt=""
            className="object-cover w-full h-full"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = noimage;
            }}
          />
        )}
      </div>
    );
  };

  return (
    <>
      <Helmet>
        <meta property="og:title" content={raffleData?.raffle_name} />
        <meta
          property="og:description"
          content={raffleData?.raffle_description}
        />
        <meta property="og:url" content={`${CONSTANT_DATA?.IMAGE_BASE_URL}/${id}`} />
        <meta
          property="og:image"
          content={
            selectedImage.data
              ? CONSTANT_DATA.IMAGE_BASE_URL + selectedImage.data
              : noimage
          }
        />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content={CONSTANT_DATA?.IMAGE_BASE_URL} />

        {/* Twitter Card Data */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:image"
          content={
            selectedImage?.data
              ? CONSTANT_DATA.IMAGE_BASE_URL + selectedImage.data
              : noimage
          }
        />
        <meta name="twitter:image:alt" content="Alt text for image" />
      </Helmet>
      <main className="bg-white">
        <section className="container-fluid mx-auto px-4  lg:px-10 lg:py-10">
          <div className="lg:border lg:border-#EAEBED-300 bg-[#F6F6F899] rounded-[24px] p-4 lg:p-8">
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4">

              {/* Left Section */}
              <div className="space-y-4">
                {/* Image Gallery */}
                <div className="relative w-full">

                  <style>{customThumbnailStyles}</style>

                  <ImageGallery
                    items={images}
                    showThumbnails={true}
                    thumbnailPosition={thumbnailPosition}
                    showPlayButton={false}
                    showFullscreenButton={false}
                    showNav={false}
                    renderItem={renderItem}
                    renderThumbInner={renderThumbInner}
                  />

                  <div
                    className={`absolute sm:top-6 sm:right-2 md:right-4 lg:right-4 xl:right-8 2xl:right-8 top-3 right-2 text-white rounded-lg px-3 sm:px-4 py-1 sm:py-2 flex items-center gap-1 sm:gap-2 shadow-md ${isEndingSoon ? "" : "bg-raffles-blue"
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
                        {isNaN(timeLeft.days) ? "00" : timeLeft.days.toString().padStart(2, "0")}
                      </p>
                      <p className="text-[10px] sm:text-xs font-medium">Days</p>
                    </div>
                    <span className="font-thin opacity-[60%]">|</span>
                    <div className="text-center">
                      <p className="text-xs sm:text-lg font-bold">
                        {isNaN(timeLeft.hours) ? "00" : timeLeft.hours.toString().padStart(2, "0")}
                      </p>
                      <p className="text-[10px] sm:text-xs font-medium">Hrs</p>
                    </div>
                    <span className="font-thin opacity-[60%]">|</span>
                    <div className="text-center">
                      <p className="text-xs sm:text-lg font-bold">
                        {isNaN(timeLeft.minutes) ? "00" : timeLeft.minutes.toString().padStart(2, "0")}
                      </p>
                      <p className="text-[10px] sm:text-xs font-medium">Mins</p>
                    </div>
                    <span className="font-thin opacity-[60%]">|</span>
                    <div className="text-center">
                      <p className="text-xs sm:text-lg font-bold">
                        {isNaN(timeLeft.seconds) ? "00" : timeLeft.seconds.toString().padStart(2, "0")}
                      </p>
                      <p className="text-[10px] sm:text-xs font-medium">Secs</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Section */}
              <div className="grid space-y-6">
                {/* Header Section */}
                <div className="flex justify-between items-start order-1">
                  {/* Title and Info Section */}
                  <div>
                    <h1 className="text-[28px] sm:text-[40px] sm:leading-[42px] leading-[29.4px] font-modernBold text-raffles-light-blue -tracking-2">
                      {raffleData?.raffle_name}
                    </h1>
                  </div>
                  {/* 
                  <FacebookShareButton
                    url={`${CONSTANT_DATA?.IMAGE_BASE_URL}/${id}`}
                    title="Check out this raffle!"
                  >
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>
                  <button
                    className="p-2 sm:p-3 bg-[#FF73851A] rounded flex items-center justify-center border border-raffles-pink sm:size-[46px] size-[36px]"
                    onClick={() => {
                      const shareUrl = `${CONSTANT_DATA?.IMAGE_BASE_URL}/${id}`;
                      const shareTitle = "Check out this raffle!";
                      const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareTitle)}`;

                      // Open Facebook share in a new tab
                      window.open(facebookShareUrl, "_blank", "noopener,noreferrer");
                    }}
                  >
                    <img
                      src={shareNetwork}
                      alt="Share"
                      className="sm:size-[24px] size-[20px] object-contain"
                    />
                  </button> */}

                  <div className="relative">
                    <button
                      className="p-2 sm:p-3 bg-[#FF73851A] rounded flex items-center justify-center border border-raffles-pink sm:size-[46px] size-[36px]"
                      onClick={handleButtonClick}
                    >
                      <img
                        src={shareNetwork}
                        alt="Share"
                        className="sm:size-[24px] size-[20px] object-contain"
                      />
                    </button>

                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-2 p-2 bg-white border rounded shadow-lg">
                        <FacebookShareButton
                          url={`${CONSTANT_DATA?.IMAGE_BASE_URL}/${id}`}
                          title="Check out this raffle!"
                        >
                          <FacebookIcon size={32} round />
                        </FacebookShareButton>
                      </div>
                    )}
                  </div>
                </div>

                {/* Price and Prizes Info */}
                <div className="flex justify-between order-2">
                  <h6 className="font-modernBold text-[14px] sm:text-[32px] leading-[16px] sm:leading-[20.8px] mb-1 sm:mb-2 mt-1 sm:mt-2 text-raffles-light-blue">
                    {raffleData?.ticket_price === "0"
                      ? "Free Entry"
                      : `£${raffleData?.ticket_price}`}
                    <span className="text-sm sm:text-base ml-1 font-modernBold">
                      per ticket
                    </span>
                  </h6>
                  <h6 className=" text-raffles-light-blue font-modernBold sm:text-[16px] leading-[19.2px] sm:leading-[22.4px] mb-1 sm:mb-2 mt-1 sm:mt-2">
                    Number of prizes: {raffleData?.main_prizes?.length}
                  </h6>
                </div>
                <hr className="border-t border-gray-300 my-4 order-3" />

                {/* Event Details Section */}
                <div className="grid grid-cols-3 gap-4 mt-6 order-6 md:order-4 text-raffles-light-blue">
                  <div className="text-center flex flex-col items-center">
                    <img
                      src={date}
                      alt="End Date Icon"
                      className="rounded-full sm:w-[56px] sm:h-[56px] w-[48px] h-[48px] object-cover mb-2"
                    />
                    <p className="text-[14px] sm:text-[16px] leading-[16.8px] sm:leading-[19.2px] text-raffles-light-blue -tracking-2 font-modernBold">
                      End date
                    </p>
                    <p className="text-[12px] sm:text-[14px] leading-[16.8px] sm:leading-[19.6px] text-raffles-light-blue font-modernRegular">
                      {formattedDate}
                    </p>
                  </div>
                  <div className="text-center flex flex-col items-center">
                    <img
                      src={time}
                      alt="End Time Icon"
                      className="rounded-full sm:w-[56px] sm:h-[56px] w-[48px] h-[48px] object-cover mb-2"
                    />
                    <p className="text-[14px] sm:text-[16px] leading-[16.8px] sm:leading-[19.2px] text-raffles-light-blue -tracking-2 font-modernBold">
                      End time
                    </p>
                    <p className="text-[12px] sm:text-[14px] leading-[16.8px] sm:leading-[19.6px] text-raffles-light-blue font-modernRegular">
                      {isNaN(timeLeft.days) ? "00" : timeLeft.days.toString().padStart(2, "0")}:{" "}
                      {isNaN(timeLeft.hours) ? "00" : timeLeft.hours.toString().padStart(2, "0")}:{" "}
                      {isNaN(timeLeft.minutes) ? "00" : timeLeft.minutes.toString().padStart(2, "0")}:{" "}
                      {isNaN(timeLeft.seconds) ? "00" : timeLeft.seconds.toString().padStart(2, "0")}
                      {/* {timeLeft.days.toString().padStart(2, "0")} :{" "}
                      {timeLeft.hours.toString().padStart(2, "0")} :{" "}
                      {timeLeft.minutes.toString().padStart(2, "0")} :{" "}
                      {timeLeft.seconds.toString().padStart(2, "0")} */}
                    </p>
                  </div>
                  <div className="text-center flex flex-col items-center">
                    <img
                      src={limit}
                      alt="Ticket Limit Icon"
                      className="rounded-full sm:w-[56px] sm:h-[56px] w-[48px] h-[48px] object-cover mb-2"
                    />
                    <p className="text-[14px] sm:text-[16px] leading-[16.8px] sm:leading-[19.2px] text-raffles-light-blue -tracking-2 font-modernBold">
                      Ticket limit
                    </p>
                    <p className="text-[12px] sm:text-[14px] leading-[16.8px] sm:leading-[19.6px] text-raffles-light-blue font-modernRegular">
                      {/* {raffleData?.max_tickets_per_person} Max tickets/person */}
                      {raffleData?.isFreeRaffle ? "1" : raffleData?.max_tickets_per_person} Max tickets/person
                    </p>
                  </div>
                </div>

                <div className="mt-6 order-4 md:order-5 text-raffles-light-blue">
                  <p className="text-[14px] sm:text-[16px] leading-[16.8px] sm:leading-[19.2px] -tracking-2 text-raffles-light-blue font-modernBold mb-4">
                    Tickets available -{" "}
                    <span className="font-modernBold">
                      {" "}
                      {Math.max(
                        0,
                        raffleData?.ticket_set_prize -
                        raffleData?.totalPurchasedTicket
                      )}
                    </span>
                  </p>
                  <div className="px-3 sm:px-6 py-2 sm:py-4">
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1 sm:mt-2 relative">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${progress}%`,
                          background:
                            "linear-gradient(55.21deg, #AD6FFF 9.69%, #FD98E8 47.47%, #FF7385 83.78%)",
                        }}
                      ></div>
                      <Badge
                        className="absolute top-[-10px] sm:top-[-14px] text-[10px] sm:text-xs text-white bg-raffles-blue px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full shadow-md mt-1"
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
                        {progress.toFixed(0)}% sold
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-[10px] sm:text-xs mt-2 text-gray-500">
                      <span>0</span>
                      <span>{raffleData?.ticket_set_prize || 100}</span>
                    </div>
                  </div>
                </div>

                {/* Ticket Selector */}
                <div className="flex flex-col items-start gap-2 mt-6 order-4 md:order-6 text-raffles-light-blue">
                  {/* Quantity Selector and Buy Now Button */}
                  <div className="flex items-center gap-4 w-full">

                    {/*   <div className="flex items-center gap-4 w-full"> <div className="flex items-center border border-raffles-blue rounded-lg overflow-hidden">
                      <button
                        className="px-4 py-2 text-[14px] sm:text-[16px] leading-[19.2px] sm:leading-[22.4px] font-medium"
                        onClick={handleReduceItemQty}
                      >
                        -
                      </button>
                      <span className="px-4 py-2 text-[14px] sm:text-[16px] leading-[19.2px] sm:leading-[22.4px] font-modernBold">
                        {itemValue}
                      </span>
                      <button
                        className="px-4 py-2 text-[14px] sm:text-[16px] leading-[19.2px] sm:leading-[22.4px] font-medium"
                        onClick={handleIncreaseItemQty}
                      >
                        +
                      </button>
                    </div> </div> */}


                    {/* Quantity Input Field */}

                    {
                      !(
                        state?.isOwner === true ||
                        Number(raffleData?.totalPurchasedTicket) >= Number(raffleData?.ticket_set_prize) ||
                        new Date() >= new Date(raffleData?.cronTime)
                      ) ? (
                        <div className="flex items-center border border-raffles-blue rounded-lg overflow-hidden">
                          <input
                            type="number"
                            className="px-4 py-2 text-[14px] sm:text-[16px] leading-[19.2px] sm:leading-[22.4px] font-medium text-center w-[100px] outline-none"
                            value={itemValue}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            min="1"
                            max={maxAllowed}
                          />
                        </div>) : null
                    }
                    {/* {!(
                      state?.isOwner === true ||
                      Number(raffleData?.totalPurchasedTicket) >=
                      Number(raffleData?.ticket_set_prize) ||
                      new Date() >= new Date(raffleData?.cronTime)
                    ) && (
                        <button
                          className="bg-raffles-blue text-white text-[14px]  sm:text-[16px]  leading-[19.2px] sm:leading-[21.6px] font-modernBold px-6 py-3 rounded-lg shadow-lg flex-grow"
                          onClick={addToCart}
                        >
                          Add to basket
                        </button>
                      )}

                    
                    {!(
                      state?.isOwner === true ||
                      Number(raffleData?.totalPurchasedTicket) >=
                      Number(raffleData?.ticket_set_prize) ||
                      new Date() >= new Date(raffleData?.cronTime)
                    ) && (
                        <button
                          className="bg-raffles-blue text-white text-[14px]  sm:text-[16px]  leading-[19.2px] sm:leading-[21.6px] font-modernBold px-6 py-3 rounded-lg shadow-lg flex-grow"
                          onClick={handleBuy}
                        >
                          {raffleData?.ticket_price === `0`
                            ? "Enter for Free"
                            : "Buy Now"}
                        </button>
                      )} */}


                    {/* Enter Now Button */}
                    {
                      !(
                        state?.isOwner === true ||
                        Number(raffleData?.totalPurchasedTicket) >= Number(raffleData?.ticket_set_prize) ||
                        new Date() >= new Date(raffleData?.cronTime)
                      ) ? (
                        new Date() <= new Date(raffleData?.start_date) ? (
                          // Show "Coming Soon" button if the start date is in the future
                          <button
                            className="bg-gray-400 text-white text-[14px] sm:text-[16px] leading-[19.2px] sm:leading-[21.6px] font-modernBold px-6 py-3 rounded-lg shadow-lg flex-grow"
                            disabled
                          >
                            Coming Soon
                          </button>
                        ) : (
                          // Show "Enter Now" button if the raffle is open
                          <button
                            className="bg-raffles-blue text-white text-[14px] sm:text-[16px] leading-[19.2px] sm:leading-[21.6px] font-modernBold px-6 py-3 rounded-lg shadow-lg flex-grow"
                            onClick={addToCart}
                          >
                            {raffleData?.ticket_price === `0` ? "Enter for Free" : "Enter Now"}
                          </button>
                        )
                      ) : null
                    }

                  </div>
                  {/* Free Postal Entry */}
                  <p className="text-[12px] sm:text-[14px] leading-[16.8px] sm:leading-[19.6px] text-raffles-light-blue font-modernRegular -tracking-2 mt-2 ml-16 w-full text-center flex items-center justify-center custom-free-postText">
                    Free Postal Entry
                    <span
                      className="ml-1 cursor-pointer"
                      title="More information"
                      onClick={() => setIsPostalEntry(true)}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0_41_2163)">
                          <path
                            d="M9 13.5C9.46599 13.5 9.84375 13.1222 9.84375 12.6562C9.84375 12.1903 9.46599 11.8125 9 11.8125C8.53401 11.8125 8.15625 12.1903 8.15625 12.6562C8.15625 13.1222 8.53401 13.5 9 13.5Z"
                            fill="#110044"
                          />
                          <path
                            d="M9 10.125V9.5625C10.2424 9.5625 11.25 8.68078 11.25 7.59375C11.25 6.50672 10.2424 5.625 9 5.625C7.75758 5.625 6.75 6.50672 6.75 7.59375V7.875"
                            stroke="#110044"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M9 15.75C12.7279 15.75 15.75 12.7279 15.75 9C15.75 5.27208 12.7279 2.25 9 2.25C5.27208 2.25 2.25 5.27208 2.25 9C2.25 12.7279 5.27208 15.75 9 15.75Z"
                            stroke="#110044"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_41_2163">
                            <rect width="18" height="18" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </span>
                  </p>
                  <Modal
                    className="bg-[#160B3A]"
                    position="center"
                    show={isPostalEntry}
                    popup
                    onClose={() => setIsPostalEntry(false)}
                    size="7xl"
                  >
                    <div className="rounded-md relative max-h-[80vh] max-w-[90vw] overflow-y-auto free-postal-entry" >
                      <Modal.Header className="bg-white  rounded-t-md p-6  pb-0">
                        Free Postal Entry
                      </Modal.Header>

                      <Modal.Body className="bg-white text-secondary h-full xs:h-auto rounded-b-md  p-6" style={{ fontFamily: "poppins, sans-serif", color: "black" }}>
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
                            style={{ color: "blue" }}
                          >
                            Click here for details.
                          </a>
                        </p>
                      </Modal.Body>
                    </div>
                  </Modal>
                  <div className="w-full mt-6 bg-white px-4 py-4 md:px-8 md:py-8 rounded-3xl shadow-md border border-gray-200 text-raffles-light-blue block md:hidden">
                    <p className="text-base sm:text-lg font-modernBold">
                      Question
                    </p>
                    <p className="text-[12px] sm:text-[14px] leading-[16.8px] sm:leading-[19.6px] text-raffles-light-blue font-modernRegular mt-1">
                      {raffleData.question}
                    </p>
                    <select
                      value={selectedAnswerIndex ?? ""}
                      onChange={(e) =>
                        setSelectedAnswerIndex(Number(e.target.value))
                      }
                      className="w-full mt-3 p-3 border border-gray-300 rounded-lg text-gray-500"
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
                </div>
              </div>
            </div>
            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
              {/* Left Section */}
              <div className="space-y-4 mt-8 order-1 md:order-1">
                {/* About Section */}
                <div className="bg-white sm:rounded-t-[16px] rounded-t-[8px]">
                  <h2 className="text-[14px] sm:text-[24px] leading-[23.4px] sm:leading-[31.2px] font-modernBold text-white bg-raffles-pink py-6 px-9 sm:rounded-t-[16px] rounded-t-[8px]">
                    About this Raffle
                  </h2>
                  <div className="about-content px-4 py-4 md:px-8 md:py-8 raffle-details-description ">
                    <p
                      className="text-[14px] sm:text-[16px] leading-[19.6px] sm:leading-[22.4px] text-[#000000] font-modernRegular"
                      dangerouslySetInnerHTML={{
                        __html: raffleData?.raffle_description,
                      }}
                    />
                    {/* <p className="text-[14px] sm:text-[16px] leading-[19.6px] sm:leading-[22.4px] text-[#000000] font-modernRegular">
                      Love fishing? Here's your chance to win an incredible
                      48-hour carp fishing experience at the stunning Clearwater
                      Fisheries, plus 5kg of premium boilies to reel in the big
                      one!
                    </p>
                    <hr className="border border-solid border-[#1100441A] my-7" />
                    <h2 className="mt-6 text-[16px] sm:text-[20px] leading-[19.2px] sm:leading-[24px] text-raffles-light-blue font-modernBold">
                      Grab your tickets today
                    </h2> */}
                    {/* <p className="text-[14px] sm:text-[16px] leading-[19.2px] sm:leading-[22.4px] mt-2">
                      The ultimate weekend for any fishing enthusiast is here!
                    </p> */}
                    <h4 className="text-[16px] sm:text-[18px] leading-[19.2px] sm:leading-[21.6px] text-raffles-light-blue font-modernBold mt-4">
                      Prize Value :
                    </h4>
                    <ul>
                      {raffleData?.main_prizes?.map(
                        (prize: any, index: any) => (
                          <li className="flex items-start gap-3" key={index}>
                            <span>
                              <img
                                src={checkmark}
                                alt="checkmark"
                                className="w-[20px] h-[20px] md:w-[22px] md:h-[22px]"
                              />
                            </span>
                            <p className="text-[14px] sm:text-[16px] leading-[19.6px] font-modernRegular sm:leading-[22.4px] flex-1">
                              £{prize.prize_value}
                            </p>
                          </li>
                        )
                      )}
                    </ul>

                    <div className="mt-6">
                      <h4 className="text-[16px] sm:text-[18px] leading-[19.2px] sm:leading-[21.6px] text-raffles-light-blue font-modernBold">
                        Website:
                      </h4>
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

                    <p className="text-[14px] sm:text-[16px] leading-[19.6px] sm:leading-[22.4px] text-raffles-light-blue text-center mt-12 font-modernRegular">
                      <span className="mr-1">&#9432;</span>Prize is subject to
                      availability
                    </p>
                  </div>
                </div>
              </div>
              {/* Right Section */}
              <div className="space-y-6 order-2 md:order-2">
                <div className="mt-6 bg-white px-4 py-4 md:px-8 md:py-8 rounded-3xl shadow-md border border-gray-200 text-raffles-light-blue hidden md:block">
                  <p className="text-[16px] sm:text-[18px] leading-[19.2px] sm:leading-[21.6px] font-modernBold">
                    Question
                  </p>
                  <p className="text-[12px] sm:text-[14px] leading-[16.8px] sm:leading-[19.6px] text-raffles-light-blue font-modernRegular mt-1">
                    {raffleData.question}
                  </p>
                  <select
                    value={selectedAnswerIndex ?? ""}
                    onChange={(e) =>
                      setSelectedAnswerIndex(Number(e.target.value))
                    }
                    className="w-full mt-3 p-3 border border-gray-300 rounded-lg text-gray-500"
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

                {/* Raffle Terms Section */}
                <div className="bg-white border rounded-3xl p-6 mt-8 relative">
                  {/* Title with Close Icon */}
                  <div className="flex justify-between items-center">
                    <h2 className="text-[16px] sm:text-[20px] leading-[19.2px] sm:leading-[24px] font-modernBold text-raffles-light-blue">
                      Raffle Terms
                    </h2>
                    <button className="bg-raffles-pink text-[16px] sm:text-[18px] leading-[19.2px] sm:leading-[21.6px] font-modernBold w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center">
                      <img
                        src={Group1707478610}
                        alt=""
                        className="w-[20px] h-[20px] md:w-[22px] md:h-[22px]"
                      />
                    </button>
                  </div>

                  {/* Terms List */}
                  <ul className="list-none space-y-3 mt-4 text-[#000000] text-sm sm:text-base">
                    <li className="flex items-center gap-3 ml-4">
                      <span>
                        <img
                          src={checkmark}
                          alt="checkmark"
                          className="w-[20px] h-[20px] md:w-[22px] md:h-[22px]"
                        />
                      </span>
                      <p className="flex-1 text-[12px] sm:text-[14px] leading-[16.8px] sm:leading-[19.6px] font-modernRegular">
                        The draw will be carried out by our random number
                        generator (see below for more info).
                      </p>
                    </li>
                    <li className="flex items-start gap-3 ml-4">
                      <span>
                        <img
                          src={checkmark}
                          alt="checkmark"
                          className="w-[20px] h-[20px] md:w-[22px] md:h-[22px]"
                        />
                      </span>
                      <p className="flex-1 text-[12px] sm:text-[14px] leading-[16.8px] sm:leading-[19.6px] font-modernRegular">
                        The draw will take place regardless of whether all the
                        tickets sell out.
                      </p>
                    </li>
                    <li className="flex items-start gap-3 ml-4">
                      <span>
                        <img
                          src={checkmark}
                          alt="checkmark"
                          className="w-[20px] h-[20px] md:w-[22px] md:h-[22px]"
                        />
                      </span>
                      <p className="flex-1 text-[12px] sm:text-[14px] leading-[16.8px] sm:leading-[19.6px] font-modernRegular">
                        The draw will take place when the raffle ends.
                      </p>
                    </li>
                    {/* <li className="flex items-start gap-3 ml-4">
                      <span>
                        <img
                          src={checkmark}
                          alt="checkmark"
                          className="w-[20px] h-[20px] md:w-[22px] md:h-[22px]"
                        />
                      </span>
                      <p className="flex-1 text-[12px] sm:text-[14px] leading-[16.8px] sm:leading-[19.6px] font-modernRegular">
                        The raffle will expire at 22:00 Hrs on 21 October 2024.
                      </p>
                    </li> */}
                  </ul>

                  {/* Note Section */}
                  <div className="p-4">
                    <div className="flex items-center mt-5 text-raffles-light-blue text-modernMedium">
                      {/* Info Icon */}
                      <span className="mr-2">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0_41_2433)">
                            <path
                              d="M9 15.75C12.7279 15.75 15.75 12.7279 15.75 9C15.75 5.27208 12.7279 2.25 9 2.25C5.27208 2.25 2.25 5.27208 2.25 9C2.25 12.7279 5.27208 15.75 9 15.75Z"
                              stroke="#110044"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M8.4375 8.4375C8.58668 8.4375 8.72976 8.49676 8.83525 8.60225C8.94074 8.70774 9 8.85082 9 9V11.8125C9 11.9617 9.05926 12.1048 9.16475 12.2102C9.27024 12.3157 9.41332 12.375 9.5625 12.375"
                              stroke="#110044"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M8.71875 6.75C9.18474 6.75 9.5625 6.37224 9.5625 5.90625C9.5625 5.44026 9.18474 5.0625 8.71875 5.0625C8.25276 5.0625 7.875 5.44026 7.875 5.90625C7.875 6.37224 8.25276 6.75 8.71875 6.75Z"
                              fill="#110044"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_41_2433">
                              <rect width="18" height="18" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </span>
                      {/* Text */}
                      <p className="text-[12px] sm:text-[14px] leading-[16.8px] sm:leading-[19.6px] font-modernRegular text-raffles-light-blue">
                        All times and dates related to raffles on Raffily are
                        based on UK time (GMT or BST depending on the time of
                        year).
                      </p>
                    </div>
                  </div>

                  {/* How the Draw Works Button */}
                  <div className="mt-6">
                    <button className="w-full border border-raffles-blue text-raffles-light-blue text-base sm:text-[14px] sm:text-[16px] leading-[19.2px] sm:leading-[22.4px] px-[22px] py-[17px] font-modernBold rounded-md hover:bg-blue-100">
                      How the draw works
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Modal for "Enter Now" options */}
        {showModal && (
          <div className="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-50 ">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
              <h2 className="text-xl font-semibold mb-4">What would you like to do?</h2>
              <div className="flex justify-around">
                <button
                  className="bg-gray-300 px-6 py-2 rounded-lg"
                  onClick={handleSeeMoreRaffles}
                >
                  Enter More Raffles
                </button>
                <button
                  className="bg-raffles-blue text-white px-6 py-2 rounded-lg"
                  onClick={handleCheckoutNow}
                >
                  Checkout Now
                </button>
              </div>
              <button
                className="absolute top-2 right-2 text-gray-500"
                onClick={closeModal}
              >
                X
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default AboutRaffles;
