import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import OwnerSidebar from "../../Components/Navbar/OwnerSidebar";
import { IRaffle } from "../../Utils/Interface/raffle.interface";
import { errorToast } from "../../Utils/Toast/error.toast";
import { Toaster } from "react-hot-toast";
import { ICategory, getCategories } from "../../Services/Raffle/categories";
import { createRaffle } from "../../Services/Owner/createRaffle";
import { successToast } from "../../Utils/Toast/success.toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Modal, Radio } from "flowbite-react";
import { log } from "util";
import moment from "moment";
import { API_ENDPOINTS, CONSTANT_DATA } from "../../constants";
import { API_INSTANCE } from "../../API/Instance";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { User } from "../../Utils/Interface/Customer";
import { getUserData } from '../../Services/Authentication/getUserData'


export const initialFormData: IRaffle = {
  raffle_name: "",
  raffle_description: "",
  websites: "",
  images: [],
  email: "",
  existingImages: [],
  videos: [],
  category: "",
  isInstantPrize: false,
  instant_prizes: [],
  main_prizes: [
    {
      ticket_position: 1,
      prize_value: "",
      prize_name: "Prize Name",
    },
  ],
  max_tickets_per_person: "0",
  instant_prize: "",
  instant_value: "",
  instant_prize_position: "",
  main_prize_value: "",
  ticket_price: "",
  raffle_type: "TIME",
  revenue_set_prize: "",
  start_date: "",
  ticket_set_prize: 0,
  time_set_prize: "",
  winners: [],
  owner: "",
  isDraft: false,
  cronTime: "",
  currency: "",
  isApprovedByAdmin: false,
  isAlive: true,
  isSuspended: false,
  tcApproved: true,
  isEmailApproved: true,
  purchases: [],
  totalPurchasedTicket: 0,
  totalPurchasedTicketAmount: "",
  review: [],
  ratings: [],
  raffle_status: 0,
  result: {
    image: "",
    businessName: "",
  },
  ownerDetails: {
    image: "",
    businessName: "",
  },
  _id: "",
  createdAt: "",
  question: "", // Add this field
  correctAnswer: "100", // Add this field
  answers: ["", "", ""],  // Add this field
  isFreeRaffle: false,
  selectedImage: null,
  bannerImage: "", // New field for banner image
  raffleCategoryType: " ",
  associatedLogo: ""
};

interface TermsConditionsData {
  _id?: string;
  isActive1: boolean;
  link1: string;
  description1: string;
  isActive2: boolean;
  link2: string;
  // description2: string;
  descriptionPrivacy: string;
  descriptionLegalInfo: string;
  descriptionHelp: string;
  descriptionTerms: string;
  descriptionAcceptableUse: string;
  descriptionCookies: string;
}

const Create = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { state } = useLocation();

  const [formData, setFormData] = useState<IRaffle>(initialFormData);
  const [termsData, setTermsData] = useState<TermsConditionsData | null>(null);
  const [imageUploaded, setImageUploaded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileInputBannerRef = useRef<HTMLInputElement>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [backgroundImageUrl, setBackgroundIImageUrls] = useState<string>();
  const [videoUrls, setVideoUrls] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTermsAndConditions, setIsTermsAndConditions] = useState(false);
  const [categoryData, setCategoryData] = useState<ICategory[]>([]);
  const [selectedImage, setSelectedImageIndex] = useState<number | null>(null);

  const [startDate, setStartDate] = useState(
    moment().add(1, "days").format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState(
    moment().add(2, "days").format("YYYY-MM-DD")
  );
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [isGoingLiveChecked, setIsGoingLiveChecked] = useState(false);
  const [isTerms1Checked, setIsTerms1Checked] = useState(false);
  const [isTerms2Checked, setIsTerms2Checked] = useState(false);
  const [isTerms3Checked, setIsTerms3Checked] = useState(false);
  const [isTerms4Checked, setIsTerms4Checked] = useState(false);
  const [userDetails, setUserDetails] = useState<User>({
    _id: "",
    firstname: '',
    lastname: '',
    email: '',
    role: '',
    dialCode: {
      country: '',
      code: '',
      dial_code: ''
    },
    phone: '',
    landline: '',
    referralCode: '',
    businessName: '',
    businessAddress: '',
    businessEmailNote: '',
    businessEmailVerify: '',
    description: '',
    VATNumber: '',
    companyNumber: '',
    image: null,
    websites: '',
    companyName: '',
    createdAt: '',
    wallet: {
      _id: '',
      cardDetails: [],
      balance: '',
      revenue: [],
      profits: '',
      userID: '',
      createdAt: '',
      updatedAt: ''
    },
    country: '',
    city: '',
    address: '',
    region: '',
    postcode: '',
  })
  // const [newImages, setNewImages] = useState<File[]>([]);
  // const [existingImages, setExistingImages] = useState<string[]>([]);

  // const [instantOpen, setInstantOpen] = useState(false);

  // const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
  //     const files = event.target.files;

  //     if (files && files.length > 0) {
  //         const newImages: File[] = Array.from(files);
  //         const newUrls: string[] = [];

  //         newImages.forEach((file) => {
  //             const imageUrl = URL.createObjectURL(file);
  //             newUrls.push(imageUrl);
  //         });

  //         setFormData((prevFormData) => ({
  //             ...prevFormData,
  //             images: [...prevFormData.images, ...newImages]
  //         }));

  //         setImageUrls((prevUrls) => [...prevUrls, ...newUrls]);
  //     }

  // };

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUserData();
      setFormData((prevData) => ({
        ...prevData,
        email: userData?.result?.email || "", // set email if available
        websites: userData?.result?.websites
      }));
    }
    fetchUserData()
  }, [])



  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      main_prizes: prev.main_prizes.map((prize, index) => {
        const newIndex = index + 1;
        return {
          ...prize,
          prize_name: `${newIndex}${getOrdinalSuffix(newIndex)} Prize Name`,
        };
      }),
    }));
  }, []);

  // const handleBannerImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     const fileName = file.name; // Get the file name
  //     setFormData((prevData) => ({
  //       ...prevData,
  //       bannerImage: fileName, // Store the file name, not the blob URL
  //     }));
  //   }
  // };

  const handleBannerImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const file = files[0]; // Since we're only uploading one banner image
      const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50 MB
      const allowedFileTypes = /(\.jpeg|\.jpg|\.png)$/i; // Only allow image types

      if (file.size <= MAX_FILE_SIZE) {
        if (allowedFileTypes.test(file.name)) {
          // If file is an image, create a URL for it
          const fileUrl = URL.createObjectURL(file);
          setBackgroundIImageUrls(fileUrl)
          setFormData((prevData: any) => ({
            ...prevData,
            associatedLogo: file, // Store the file URL for preview
          }));
          setImageUploaded(true);
        } else {
          errorToast(`File ${file.name} is not a valid image. Only jpeg, jpg, and png are allowed.`);
        }
      } else {
        errorToast(`${file.name} exceeds the 50MB size limit.`);
      }
    }
  };



  // const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
  //     const files = event.target.files;

  //     if (files && files.length > 0) {
  //         const newImages: File[] = [];
  //         const newVideos: File[] = [];
  //         const newImageUrls: string[] = [];
  //         const newVideoUrls: string[] = [];
  //         const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25 MB
  //         const allowedFileTypes = /(\.jpeg|\.jpg|\.png|\.mp4)$/i;

  //         Array.from(files).forEach((file) => {
  //             if (file.size <= MAX_FILE_SIZE) {
  //                 if (allowedFileTypes.test(file.name)) {
  //                     if (file.type.startsWith('image/')) {
  //                         newImages.push(file);
  //                         newImageUrls.push(URL.createObjectURL(file));
  //                     } else if (file.type.startsWith('video/')) {
  //                         newVideos.push(file);
  //                         newVideoUrls.push(URL.createObjectURL(file));
  //                     }
  //                 } else {
  //                     errorToast(`File ${file.name} is not a valid file type. Only jpeg, jpg, png, and mp4 are allowed.`);
  //                 }
  //             } else {
  //                 errorToast(`File ${file.name} exceeds the 25MB size limit.`);
  //             }
  //         });

  //         setFormData((prevFormData) => ({
  //             ...prevFormData,
  //             images: [...prevFormData.images, ...newImages],
  //             videos: [...prevFormData.videos, ...newVideos],
  //         }));

  //         setImageUrls((prevUrls) => [...prevUrls, ...newImageUrls]);
  //         setVideoUrls((prevUrls) => [...prevUrls, ...newVideoUrls]);
  //     }
  // };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const newImages: File[] = [];
      const newVideos: File[] = [];
      const newImageUrls: string[] = [];
      const newVideoUrls: string[] = [];
      const MAX_FILE_SIZE = 50 * 1024 * 1024; // 25 MB
      const allowedFileTypes = /(\.jpeg|\.jpg|\.png|\.mp4)$/i;

      Array.from(files).forEach((file) => {
        if (file.size <= MAX_FILE_SIZE) {
          if (allowedFileTypes.test(file.name)) {
            if (file.type.startsWith("image/")) {
              newImages.push(file);
              newImageUrls.push(URL.createObjectURL(file));
            } else if (file.type.startsWith("video/")) {
              newVideos.push(file);
              newVideoUrls.push(URL.createObjectURL(file));
            }
          } else {
            errorToast(
              `File ${file.name} is not a valid file type. Only jpeg, jpg, png, and mp4 are allowed.`
            );
          }
        } else {
          errorToast(`${file.name} exceeds the 50MB size limit.`);
        }
      });

      setFormData((prevFormData) => ({
        ...prevFormData,
        images: [...prevFormData.images, ...newImages],
        videos: [...prevFormData.videos, ...newVideos],
      }));

      setImageUrls((prevUrls) => [...prevUrls, ...newImageUrls]);
      setVideoUrls((prevUrls) => [...prevUrls, ...newVideoUrls]);
    }
  };

  // useEffect(() => {
  //     if (state?.item) {
  //         const existingImages = state?.item?.images.map((image: string) => CONSTANT_DATA.IMAGE_BASE_URL + image);
  //         setExistingImages(existingImages);
  //         setFormData({ ...state?.item });
  //     }
  //     d();
  // }, [state]);

  const handleRaffleCategoryTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      raffleCategoryType: event.target.value as 'exclusive' | 'featured',
    }));
  };

  useEffect(() => {
    if (imageUrls.length > 10) {
      errorToast("Please upload less than 10 images!");
      setImageUrls(imageUrls.slice(0, 10));
    }

    if (videoUrls.length > 10) {
      errorToast("Please upload less than 10 videos!");
      setVideoUrls(videoUrls.slice(0, 10));
    }
  }, [imageUrls, videoUrls]);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleUploadBannerClick = () => {
    fileInputBannerRef.current?.click(); // Trigger the file input click for banner image
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const cleanValue = value.replace(/£/g, "");
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Separate handler for ReactQuill
  const handleQuillChange = (value: string) => {
    // const cleanValue = value.replace(/£/g, ""); // Remove '£' symbols
    setFormData((prevFormData) => ({
      ...prevFormData,
      raffle_description: value,
    }));
  };

  useEffect(() => {
    if (state?.item) {
      const existingImages = state?.item?.images.map(
        (image: string) => CONSTANT_DATA.IMAGE_BASE_URL + image
      );
      const existingVideoes = state?.item?.videos.map(
        (video: string) => CONSTANT_DATA.IMAGE_BASE_URL + video
      );

      setImageUrls(existingImages);
      setVideoUrls(existingVideoes)
      setBackgroundIImageUrls(CONSTANT_DATA.IMAGE_BASE_URL + state?.item?.associatedLogo);

      if (state?.item?.associatedLogo) {
        setImageUploaded(true);
      }
      // Convert UTC to UK Timezone
      let start_date = formatDateForDisplay(state?.item?.start_date);
      let time_set_prize = formatDateForDisplay(state?.item?.time_set_prize);

      setFormData({ ...state?.item, start_date: start_date, time_set_prize: time_set_prize, selectedImage: 0, category: state?.item?.category });
    }
    d();
  }, [state]);

  useEffect(() => {
    const fetchTermsData = async () => {
      try {
        const response = await API_INSTANCE.get(
          API_ENDPOINTS.GET_TERMS_CONDITIONS
        );
        if (response.data) {
          setTermsData(response.data);
        }
      } catch (error) {
        console.error("Error fetching terms and conditions:", error);
      }
    };
    fetchTermsData();
  }, []);

  const d = async () => {
    const categ: any = await getCategories();
    setCategoryData(categ);
    if (categ.length > 0) {
      setFormData((prev) => ({
        ...prev,
        category: prev.category ? prev.category : categ[0]?.type,
      }));
    }
  };

  const handleCategoryChange = (e: any) => {
    const selectedOption = e.target.selectedOptions[0];
    const name = selectedOption.getAttribute("data-name");
    const type = selectedOption.getAttribute("data-type");
    setFormData((prev) => {
      return {
        ...prev,
        category: type,
      };
    });
  };
  console.log("CAAA", formData?.category);

  const handleSelectType = (e: any) => {
    const selectedOption = e.target.value;
    setFormData((prev) => {
      return {
        ...prev,
        raffle_type: selectedOption,
      };
    });
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartDate = moment(e.target.value).format("YYYY-MM-DDTHH:mm");
    const minStartDate = moment().add(1, "days").format("YYYY-MM-DDTHH:mm");

    // Validate if the new start date is tomorrow or later
    if (moment(newStartDate).isBefore(minStartDate)) {
      errorToast("Start date must be tomorrow or later.");
      // alert("Start date must be tomorrow or later.");
      return;
    }

    const newEndDate = moment(newStartDate)
      .add(1, "days")
      .format("YYYY-MM-DDTHH:mm");
    setStartDate(newStartDate);
    setEndDate(newEndDate);
    setFormData((prevData) => ({
      ...prevData,
      start_date: newStartDate,
      time_set_prize: newEndDate,
    }));
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEndDate = moment(e.target.value).format("YYYY-MM-DDTHH:mm");
    const minEndDate = moment(startDate)
      .add(1, "days")
      .format("YYYY-MM-DDTHH:mm");

    // Validate if the new end date is at least one day after the start date
    if (moment(newEndDate).isBefore(minEndDate)) {
      errorToast("End date must be at least one day after the start date.");
      return;
    }

    setEndDate(newEndDate);
    setFormData((prevData) => ({
      ...prevData,
      time_set_prize: newEndDate,
    }));
  };

  const handleRaffleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setFormData((prev) => ({
      ...prev,
      isFreeRaffle: value === "free" ? true : false,
      ticket_price: value === "free" ? "0" : prev.ticket_price,
      max_tickets_per_person: value === "free" ? "1" : prev.max_tickets_per_person,
    }));
  };

  const handlePrizeChange = (index: any, e: any) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const newInstantPrizes = [...prev.instant_prizes];
      newInstantPrizes[index] = {
        ...newInstantPrizes[index],
        [name]: value,
      };
      return {
        ...prev,
        instant_prizes: newInstantPrizes,
      };
    });

    // const updatedPrizes = [...formData.instant_prize];
    // updatedPrizes[index] = value;
    // setFormData({ ...formData, instant_prize: value });
  };

  // const handleMainPrizeChange = (index: any, e: any) => {

  //     const { name, value } = e.target;

  //     setFormData((prev) => {
  //         const newMainPrizes = [...prev.main_prizes];
  //         newMainPrizes[index] = {
  //             ...newMainPrizes[index],
  //             [name]: value,
  //         };
  //         return {
  //             ...prev,
  //             main_prizes: newMainPrizes,
  //         };
  //     });

  //     // const updatedPrizes = [...formData.instant_prize];
  //     // updatedPrizes[index] = value;
  //     // setFormData({ ...formData, instant_prize: value });
  // };
  console.log("state.item", state?.item)

  const handleMainPrizeChange = (
    index: number,
    updatedField: { name: string; value: string }
  ) => {
    const { name, value } = updatedField;

    setFormData((prev) => {
      const newMainPrizes = [...prev.main_prizes];
      newMainPrizes[index] = {
        ...newMainPrizes[index],
        [name]: value,
      };
      return {
        ...prev,
        main_prizes: newMainPrizes,
      };
    });
  };

  // const handleAddMoreMain = () => {
  //     // Create copies of the current state arrays

  //     const { instant_prize, instant_value, instant_prize_position } = formData
  //     // Add empty strings for the new row
  //     formData.main_prizes.push({
  //         prize_value: "",
  //         prize_name: "",
  //         ticket_position: formData.main_prizes.length + 1
  //     });

  //     // Update the state with the new arrays
  //     setFormData({
  //         ...formData,
  //     });
  // };
  const getOrdinalSuffix = (n: number) => {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return s[(v - 20) % 10] || s[v] || s[0];
  };
  const handleAddMoreMain = () => {
    setFormData((prev) => {
      if (prev.main_prizes.length >= 10) {
        return prev; // Return the previous state if the limit is reached
      }
      const newPrizeIndex = prev.main_prizes.length + 1;
      return {
        ...prev,
        main_prizes: [
          ...prev.main_prizes,
          {
            ticket_position: newPrizeIndex,
            prize_value: "",
            prize_name: `${newPrizeIndex}${getOrdinalSuffix(
              newPrizeIndex
            )} Prize Name`,
          },
        ],
      };
    });
  };
  const findMaxInstantValue = (prizes: any) => {
    if (prizes.length === 0) return null;

    return prizes.reduce((max: any, prize: any) => {
      const value = parseFloat(prize.instant_value);
      return value > max ? value : max;
    }, parseFloat(prizes[0].instant_value));
  };

  const handleQuestionChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCorrectAnswerChange = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      correctAnswer: index.toString(),
    }));
  };
  const handleAnswerChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    const newAnswers = [...formData.answers];
    newAnswers[index] = value;
    setFormData((prev) => ({
      ...prev,
      answers: newAnswers,
    }));
  };

  const handleAddAnswer = () => {
    setFormData((prev) => ({
      ...prev,
      answers: [...prev.answers, ""],
    }));
  };

  const handleRemoveAnswer = (index: number) => {
    const newAnswers = formData.answers?.filter((_, i) => i !== index);
    setFormData((prevFormData) => ({
      ...prevFormData,
      answers: newAnswers,
    }));
  };

  const convertToUTCBeforeSave = (date: any) => {
    return moment.tz(date, "Europe/London").utc().format('YYYY-MM-DDTHH:mm');
  };
  // Function to format a date from UTC for display in Europe/London timezone
  const formatDateForDisplay = (date: any) => {
    return moment.utc(date).tz('Europe/London').format('YYYY-MM-DD HH:mm');
  };


  const handleTermsChange = (e: any) => {
    setIsTermsChecked(e.target.checked);
  };
  const handleTerms1Change = (e: any) => {
    setIsTerms1Checked(e.target.checked);
  };
  const handleTerms2Change = (e: any) => {
    setIsTerms2Checked(e.target.checked);
  };
  const handleTerms3Change = (e: any) => {
    setIsTerms3Checked(e.target.checked);
  };
  const handleTerms4Change = (e: any) => {
    setIsTerms4Checked(e.target.checked);
  };

  const handleGoingLiveChange = (e: any) => {
    setIsGoingLiveChecked(e.target.checked);
  };

  console.log("IMAGE", formData.images);
  // SUBMIT
  const handleSubmit = async (isDraft: string) => {
    console.log("Selected Image Index: ", formData.selectedImage);

    // Logging all images
    console.log("All images: ", formData.images);
    const areAllInstantPrizesFilled = () => {
      return formData.instant_prizes.every(
        (prize) =>
          prize.instant_position !== null &&
          prize.instant_prize !== "" &&
          prize.instant_value !== ""
      );
    };

    const areAllMainPrizesFilled = () => {
      return formData.main_prizes.every(
        (prize) => prize.prize_value !== "" && prize.prize_name !== ""
      );
    };

    try {


      if (formData.raffle_name == "") {
        return errorToast("Please enter the raffle name");
      }
      if (formData.email == "") {
        return errorToast("Please enter the Email");
      }
      if (formData.raffle_description == "" && isDraft !== "DRAFT") {
        return errorToast("Please enter the raffle description");
      }
      if (formData.websites == "" && isDraft !== "DRAFT") {
        return errorToast("Please enter the Website");
      }

      if (formData.images.length < 1) {
        return errorToast("Please upload at least 1 image");
      }
      // // Validate the new fields
      // if (!formData.bannerImage && isDraft !== "DRAFT") {
      //   return errorToast("Please upload a banner image");
      // }
      // if (!formData.raffleCategoryType) {
      //   return errorToast("Please select a raffle category type");
      // }
      // if (formData.images.length < 1) {
      //     return errorToast("Please upload at least 1 image")
      // }
      if (!formData.category) {
        return errorToast("Please select the category");
      }

      if (
        !formData.max_tickets_per_person &&
        formData.max_tickets_per_person !== "0" && isDraft !== "DRAFT"
      ) {
        return errorToast("Please fill the maximum tickets per person");
      }


      if (formData.isInstantPrize && !areAllInstantPrizesFilled() && isDraft !== "DRAFT") {
        return errorToast("Please fill all the instant prizes");
      }

      // if (instantOpen) {
      //     if (!formData.instant_prize[0].toString().trim()) {
      //         return errorToast("Please fill the instant prize")
      //     }
      //     if (!formData.instant_value[0].toString().trim()) {
      //         return errorToast("Please fill the instant value")
      //     }
      // }

      if (!areAllMainPrizesFilled() && isDraft !== "DRAFT") {
        return errorToast("Please fill the main prize");
      }

      if (!formData.ticket_price && isDraft !== "DRAFT") {
        return errorToast("Please fill the ticket price");
      }
      if (
        (!formData.isFreeRaffle && parseFloat(formData.ticket_price) <= 0) &&
        isDraft !== "DRAFT"
      ) {
        return errorToast("Ticket price must be greater then 0");
      }
      if (
        (
          (!formData.isFreeRaffle && parseInt(formData.max_tickets_per_person) <= 0)) &&
        isDraft !== "DRAFT"
      ) {
        return errorToast("Max tickets per person must be greater than 0");
      }

      if (!formData.raffle_type && isDraft !== "DRAFT") {
        return errorToast("Please select the raffle type");
      }
      if (formData.raffle_type === "REVENUE" && isDraft !== "DRAFT") {
        if (formData.revenue_set_prize === "") {
          return errorToast(
            "You selected Revenue. Please enter the minimum revenue to close the raffle"
          );
        }
        if (formData.revenue_set_prize < formData.ticket_price) {
          return errorToast(
            "The Ticket Price should be less than the Revenue prize"
          );
        }

        const ticketCount =
          parseFloat(formData.revenue_set_prize) /
          parseFloat(formData.ticket_price);

        const findBiggestInstantTicketPosition = findMaxInstantValue(
          formData.instant_prizes
        );

        if (findBiggestInstantTicketPosition > ticketCount) {
          return errorToast(
            "Instant win ticket position is less than your official ticket count"
          );
        }
      }
      if (
        formData.raffle_type === "TIME" &&
        (formData.start_date === "" || formData.time_set_prize === "")
      ) {
        return errorToast(
          "Please enter the start and end date to close the raffle"
        );
      }

      if (formData.ticket_set_prize === "" && isDraft !== "DRAFT") {
        return errorToast(
          "You selected Ticket. Please enter the minimum ticket to close the raffle"
        );
      }

      if (formData.raffle_type === "TICKET" && isDraft !== "DRAFT") {
        const ticketCount = parseFloat(formData.ticket_set_prize);

        const findBiggestInstantTicketPosition = findMaxInstantValue(
          formData.instant_prizes
        );

        if (findBiggestInstantTicketPosition > ticketCount) {
          return errorToast(
            "Instant win ticket position is less than your official ticket count"
          );
        }
      }
      if (
        (
          (!formData.ticket_set_prize || parseInt(formData.ticket_set_prize) <= 0)) &&
        isDraft !== "DRAFT"
      ) {
        return errorToast("total tickets available must be greater than 0");
      }

      if (formData.question === "" && isDraft !== "DRAFT") {
        return errorToast("Please enter the question");
      }

      if (formData.correctAnswer == "100" && isDraft !== "DRAFT") {
        return errorToast("Please select the correct answer");
      }
      if (isDraft !== "DRAFT" &&
        (!formData.answers || formData.answers.length === 0 || formData.answers.some((answer) => answer === ""))
      ) {
        return errorToast("Please enter answers");
      }


      if ((!state?.item && isDraft !== "DRAFT") || (state?.item && state?.item.raffle_status == 4 && isDraft !== "DRAFT")) {
        if (!isTermsChecked) {
          return errorToast("Please agree to the terms and conditions");
        }
        if (!isTerms1Checked) {
          return errorToast("Please agree to the terms and conditions");
        }
        if (!isTerms3Checked) {
          return errorToast("Please agree to the terms and conditions");
        }
        if (!isTerms2Checked) {
          return errorToast("Please agree to the terms and conditions");
        }
        // if (!isTerms4Checked) {
        //   return errorToast("Please agree to the terms and conditions");
        // }
        // if (!isGoingLiveChecked) {
        //     return errorToast("Please acknowledge the going live conditions");
        // }
      }

      const fData = new FormData();

      fData.append("raffle_name", formData.raffle_name);
      fData.append("raffle_name", formData.email);
      fData.append("raffle_description", formData.raffle_description);
      fData.append("websites", formData.websites);
      fData.append("main_prizes", JSON.stringify(formData.main_prizes));
      fData.append("email", formData.email); // Add email to FormData

      fData.append("existing_images", JSON.stringify(formData.existingImages));
      console.log("formData.existingImages", formData.existingImages);

      // Append images
      formData.images.forEach((image, index) => {
        console.log(`Appending image ${index}:`, image);
        if (typeof image === "object") {
          fData.append(`images[${index}]`, image);
        }
      });

      // Append selected "first image"
      if (formData.selectedImage !== null && formData.images[formData.selectedImage]) {
        console.log("Appending first image:", formData.images[formData.selectedImage]);
        fData.append("first_image", formData.images[formData.selectedImage]);
      }

      console.log("Videos Array: ", formData.videos);

      if (!formData.videos || formData.videos.length === 0) {
        console.log("No videos to upload");
      } else {
        formData.videos.forEach((video, index) => {
          console.log(`Appending video ${index}:`, video);
          if (video && typeof video === "object") {
            fData.append(`videos[${index}]`, video);
          }
        });
      }

      fData.append("associatedLogo", formData.associatedLogo);
      fData.append("raffleCategoryType", formData.raffleCategoryType);

      //   for (const image of formData.images) {
      // fData.append("images", JSON.stringify(formData.images));
      //   }

      fData.append("category", formData.category);
      fData.append("main_prize_value", formData.main_prize_value);
      fData.append("ticket_price", formData.ticket_price);
      fData.append("raffle_type", formData.raffle_type);
      // fData.append("raffle_status", formData.raffle_status)
      fData.append("instant_prizes", JSON.stringify(formData.instant_prizes));
      fData.append("main_prizes", JSON.stringify(formData.main_prizes));
      if (formData.raffle_type === "REVENUE") {
        fData.append("revenue_set_prize", formData.revenue_set_prize);
      }
      if (formData.raffle_type === "TIME") {
        // Save time uk timezone to utc
        fData.append("start_date", convertToUTCBeforeSave(formData.start_date));
        fData.append(
          "time_set_prize",
          convertToUTCBeforeSave(formData.start_date)
        );
      }
      if (formData.raffle_type === "TICKET") {
        fData.append("ticket_set_prize", formData.ticket_set_prize);
      }
      fData.append("isDraft", isDraft === "DRAFT" ? "true" : "false");

      fData.append("question", formData.question);
      let correctAnswer = parseInt(formData.correctAnswer);
      let correctAnswerValue = formData.answers[correctAnswer]
        ? formData.answers[correctAnswer].toString()
        : "100";
      fData.append("correctAnswer", correctAnswerValue);

      fData.append("answers", JSON.stringify(formData.answers));
      fData.append(
        "max_tickets_per_person",
        formData.max_tickets_per_person.toString()
      );

      setIsLoading(true);
      console.log("formData", formData);

      const dataToSend = {
        ...formData,
        isDraft: isDraft === "DRAFT" ? true : false,
      };


      const a = await createRaffle(dataToSend, state?.item, params.id);

      if (a) {
        successToast("Raffle Created Successfully!");
        // Navigate to the respective tab based on the action (Draft or Pending)
        if (isDraft === "DRAFT") {
          navigate("/owner", { state: { draftTab: true } });  // Navigate to the draft tab
        } else {
          navigate("/owner", { state: { pendingTab: true } });  // Navigate to the pending tab
        }

      }

      setIsLoading(false);
    } catch (error: any) {
      errorToast(error.message);
      setIsLoading(false);
    }
  };


  // SUBMIT
  const handlePerview = async (isDraft: string, isPreview: boolean = false) => {
    const areAllInstantPrizesFilled = () => {
      return formData.instant_prizes.every(
        (prize) =>
          prize.instant_position !== null &&
          prize.instant_prize !== "" &&
          prize.instant_value !== ""
      );
    };

    const areAllMainPrizesFilled = () => {
      return formData.main_prizes.every(
        (prize) => prize.prize_value !== "" && prize.prize_name !== ""
      );
    };

    try {
      if (formData.raffle_name == "") {
        return errorToast("Please enter the raffle name");
      }
      if (formData.email == "") {
        return errorToast("Please enter the Email");
      }
      if (formData.raffle_description == "" && isDraft !== "DRAFT") {
        return errorToast("Please enter the raffle description");
      }
      if (formData.websites == "" && isDraft !== "DRAFT") {
        return errorToast("Please enter the Website");
      }

      if (formData.images.length < 1) {
        return errorToast("Please upload at least 1 image");
      }
      // Validate the new fields
      // if (!formData.bannerImage) {
      //   return errorToast("Please upload a banner image");
      // }
      // if (!formData.raffleCategoryType) {
      //   return errorToast("Please select a raffle category type");
      // }
      if (!formData.category) {
        return errorToast("Please select the category");
      }

      if (
        !formData.max_tickets_per_person &&
        formData.max_tickets_per_person !== "0" && isDraft !== "DRAFT"
      ) {
        return errorToast("Please fill the maximum tickets per person");
      }

      if (formData.isInstantPrize && !areAllInstantPrizesFilled() && isDraft !== "DRAFT") {
        return errorToast("Please fill all the instant prizes");
      }

      // if (instantOpen) {
      //     if (!formData.instant_prize[0].toString().trim()) {
      //         return errorToast("Please fill the instant prize")
      //     }
      //     if (!formData.instant_value[0].toString().trim()) {
      //         return errorToast("Please fill the instant value")
      //     }
      // }

      if (!areAllMainPrizesFilled() && isDraft !== "DRAFT") {
        return errorToast("Please fill the main prize");
      }

      if (!formData.ticket_price && isDraft !== "DRAFT") {
        return errorToast("Please fill the ticket prize");
      }
      if (!formData.raffle_type && isDraft !== "DRAFT") {
        return errorToast("Please select the raffle type");
      }
      if (formData.raffle_type === "REVENUE" && isDraft !== "DRAFT") {
        if (formData.revenue_set_prize === "") {
          return errorToast(
            "You selected Revenue. Please enter the minimum revenue to close the raffle"
          );
        }
        if (formData.revenue_set_prize < formData.ticket_price) {
          return errorToast(
            "The Ticket Price should be less than the Revenue prize"
          );
        }

        const ticketCount =
          parseFloat(formData.revenue_set_prize) /
          parseFloat(formData.ticket_price);

        const findBiggestInstantTicketPosition = findMaxInstantValue(
          formData.instant_prizes
        );

        if (findBiggestInstantTicketPosition > ticketCount) {
          return errorToast(
            "Instant win ticket position is less than your official ticket count"
          );
        }
      }
      if (
        formData.raffle_type === "TIME" &&
        (formData.start_date === "" || formData.time_set_prize === "")
      ) {
        return errorToast(
          "Please enter the start and end date to close the raffle"
        );
      }

      if (formData.ticket_set_prize === "" && isDraft !== "DRAFT") {
        return errorToast(
          "You selected Ticket. Please enter the minimum ticket to close the raffle"
        );
      }

      if (formData.raffle_type === "TICKET" && isDraft !== "DRAFT") {
        const ticketCount = parseFloat(formData.ticket_set_prize);

        const findBiggestInstantTicketPosition = findMaxInstantValue(
          formData.instant_prizes
        );

        if (findBiggestInstantTicketPosition > ticketCount) {
          return errorToast(
            "Instant win ticket position is less than your official ticket count"
          );
        }
      }
      if (formData.question === "" && isDraft !== "DRAFT") {
        return errorToast("Please enter the question");
      }

      if (formData.correctAnswer == "100" && isDraft !== "DRAFT") {
        return errorToast("Please select the correct answer");
      }
      if (isDraft !== "DRAFT" &&
        (!formData.answers || formData.answers.length === 0 || formData.answers.some((answer) => answer === ""))
      ) {
        return errorToast("Please enter answers");
      }

      if ((!state?.item && isDraft !== "DRAFT") || (state?.item && state?.item.raffle_status == 4 && isDraft !== "DRAFT")) {
        if (!isTermsChecked) {
          return errorToast("Please agree to the terms and conditions");
        }
        if (!isTerms1Checked) {
          return errorToast("Please agree to the terms and conditions");
        }
        if (!isTerms3Checked) {
          return errorToast("Please agree to the terms and conditions");
        }
        if (!isTerms2Checked) {
          return errorToast("Please agree to the terms and conditions");
        }
        // if (!isTerms4Checked) {
        //   return errorToast("Please agree to the terms and conditions");
        // }
        // if (!isGoingLiveChecked) {
        //     return errorToast("Please acknowledge the going live conditions");
        // }
      }

      const fData = new FormData();

      fData.append("raffle_name", formData.raffle_name);
      fData.append("raffle_name", formData.email);
      fData.append("raffle_description", formData.raffle_description);
      fData.append("websites", formData.websites);
      fData.append("main_prizes", JSON.stringify(formData.main_prizes));
      fData.append("email", formData.email); // Add email to FormData
      // formData.images.forEach((image, index) => {
      //     fData.append(`images[${index}]`, image);
      // });
      fData.append("existing_images", JSON.stringify(formData.existingImages));
      console.log("formData.existingImages", formData.existingImages);

      // Append images
      formData.images.forEach((image, index) => {
        console.log(`Appending image ${index}:`, image);
        if (typeof image === "object") {
          fData.append(`images[${index}]`, image);
        }
      });

      // Append selected "first image"
      if (formData.selectedImage !== null && formData.images[formData.selectedImage]) {
        console.log("Appending first image:", formData.images[formData.selectedImage]);
        fData.append("first_image", formData.images[formData.selectedImage]);
      }


      formData.videos?.forEach((video, index) => {
        fData.append(`videos[${index}]`, video);
      });


      fData.append("associatedLogo", formData.associatedLogo);
      fData.append("raffleCategoryType", formData.raffleCategoryType);

      fData.append("category", formData.category);
      fData.append("main_prize_value", formData.main_prize_value);
      fData.append("ticket_price", formData.ticket_price);
      fData.append("raffle_type", formData.raffle_type);
      // fData.append("raffle_status", formData.raffle_status)
      fData.append("instant_prizes", JSON.stringify(formData.instant_prizes));
      fData.append("main_prizes", JSON.stringify(formData.main_prizes));
      if (formData.raffle_type === "REVENUE") {
        fData.append("revenue_set_prize", formData.revenue_set_prize);
      }
      if (formData.raffle_type === "TIME") {
        // Save time uk timezone to utc
        fData.append("start_date", convertToUTCBeforeSave(formData.start_date));
        fData.append(
          "time_set_prize",
          convertToUTCBeforeSave(formData.start_date)
        );
      }
      if (formData.raffle_type === "TICKET") {
        fData.append("ticket_set_prize", formData.ticket_set_prize);
      }
      fData.append("isDraft", isDraft === "DRAFT" ? "true" : "false");

      fData.append("question", formData.question);
      let correctAnswer = parseInt(formData.correctAnswer);
      let correctAnswerValue = formData.answers[correctAnswer]
        ? formData.answers[correctAnswer].toString()
        : "100";
      fData.append("correctAnswer", correctAnswerValue);

      fData.append("answers", JSON.stringify(formData.answers));
      fData.append(
        "max_tickets_per_person",
        formData.max_tickets_per_person.toString()
      );

      setIsLoading(true);
      console.log("formData", formData);

      const dataToSend = {
        ...formData,
        isDraft: isDraft === "DRAFT" ? true : false,
      };



      const a = await createRaffle(dataToSend, state?.item, params.id);

      if (a) {
        successToast("Raffle Created Successfully!");

        if (isPreview) {

          if (window.location.href.includes("owner/create")) {
            // const editUrl = `/owner/edit/${a?.result?._id}`;
            // window.location.href = editUrl;
            navigate(`/owner/edit/${a?.result?._id}`, {
              state: {
                item: a?.result,
              },
            })
          }

          const url = `/raffle/details/${a?.result?.uniqueID}`;

          // Open the URL in a new tab
          window.open(url, '_blank');  // This opens the URL in a new tab

          // Optionally, pass the state to the new tab using localStorage or sessionStorage
          localStorage.setItem('raffleDetailsState', JSON.stringify({ isOwner: true }));
        } else if (isDraft === "DRAFT") {
          navigate("/owner", { state: { draftTab: true } });
        } else {
          navigate("/owner", { state: { pendingTab: true } });
        }


      }

      setIsLoading(false);
    } catch (error: any) {
      errorToast(error.message);
      setIsLoading(false);
    }
  };






  const handleBack = () => {
    navigate("/owner");
  };

  const [instantOpen, setInstantOpen] = useState(false);

  // const handleRemoveImage = (i: number) => {
  //     const images = imageUrls.filter((image, index) => i !== index)
  //     setImageUrls(images)
  // }
  const handleRemoveImage = (index: number) => {
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      images: prevFormData.images?.filter((_: any, i: any) => i !== index),
    }));
    setImageUrls((prevUrls) => prevUrls?.filter((_, i) => i !== index));
  };

  const handleRemoveVideo = (index: number) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      videos: prevFormData.videos?.filter((_, i) => i !== index), // Update formData.videos
    }));
    setVideoUrls((prevUrls) => prevUrls?.filter((_, i) => i !== index)); // Update videoUrls
  };

  const handleRemoveInstantWins = (i: number) => {
    const a = formData.instant_prizes?.filter((_, index) => index !== i);

    setFormData({ ...formData, instant_prizes: a });
  };

  const handleRemoveInstantWinsMain = (i: number) => {
    const a = formData.main_prizes?.filter((_, index) => index !== i);

    setFormData({ ...formData, main_prizes: a });
  };

  const handleInstantOpen = () => {
    if (!instantOpen) {
      setFormData((prev) => {
        return {
          ...prev,
          instant_prizes: [
            ...prev.instant_prizes,
            {
              instant_position: 1,
              instant_prize: "",
              instant_value: "",
            },
          ],
        };
      });
    } else {
      setFormData((prev) => {
        return {
          ...prev,
          instant_prizes: [],
        };
      });
    }
  };

  const termsConditionPage = (label: any, description: any) => {
    // const url = `/owner/terms`;
    // window.open(url, '_blank');
    setIsTermsAndConditions(true);
  };

  console.log("formData?.start_date", formData?.start_date);
  console.log("formData?.time_set_prize", formData?.time_set_prize);

  return (
    <div className="flex  footer-manage" >
      <Toaster position="top-right" />
      <div className="hidden lg:block">
        <OwnerSidebar />
      </div>

      <div className="w-[100%] lg:w-[100%] mx-auto z-10 p-2 lg:p-10 duration-500" style={{ fontFamily: "poppins, sans-serif" }}>
        <div
          onClick={handleBack}
          className="flex items-center gap-2"
          style={{ cursor: "pointer" }}
        >
          <svg
            width="18"
            height="13"
            viewBox="0 0 18 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0.0871582 6.50472C0.0871582 6.36287 0.145596 6.2274 0.242813 6.1254L5.50166 0.813434C5.70938 0.60359 6.04566 0.604121 6.25285 0.813434C6.46056 1.02275 6.46056 1.36275 6.25285 1.57206L1.90031 5.96815H16.5559C16.8492 5.96815 17.0872 6.20828 17.0872 6.50472C17.0872 6.80115 16.8492 7.04128 16.5559 7.04128H1.90085L6.25285 11.4374C6.46056 11.6467 6.46003 11.9867 6.25285 12.196C6.04513 12.4053 5.70885 12.4053 5.50166 12.196L0.242813 6.88403C0.143471 6.78362 0.0887527 6.6455 0.0871582 6.50472Z"
              fill="black"
              fill-opacity="0.74"
            />
          </svg>
          <p className="text-gray-500 text-[14px]">Back</p>
        </div>
        <div className="block lg:flex justify-between items-start">
          <div className="w-[100%] lg:w-[48%]  h-fit ">
            <div
              className={`bg-[#F9F0F0] h-fit ${imageUrls.length > 2 ? "" : "lg:h-[auto]"
                } rounded-md p-6 m-auto`}
            >
              <h4 className="text-sm lg:text-md  font-bold tracking-wide">
                Raffle Title
              </h4>
              <input
                onChange={handleInputChange}
                className="p-3 outline-none border-none w-[100%] lg:w-[100%]"
                type="text"
                placeholder="Example: “A 5k Solar Panel Package for your Home!”"
                name="raffle_name"
                id=""
                value={formData.raffle_name}
              />

              {/* <h4 className='text-sm lg:text-md  font-bold tracking-wide mt-6'>Description</h4>
                            <p className='text-xs block lg:hidden'>Describe your prize, tell the buyers exactly what they could win!</p>
                            <textarea onChange={handleInputChange} placeholder='Write about your raffle and why you are doing it. This could be a promotion or a new product launch!' style={{ resize: "none" }} className='p-3 mt-2 lg:mt-0 outline-none border-none w-[100%] lg:w-[100%]' name="raffle_description" id="" value={formData.raffle_description} cols={30} rows={10}></textarea> */}

              <div>
                <h4 className="text-sm lg:text-md font-bold tracking-wide mt-6">
                  Description
                </h4>
                <p className="text-xs block lg:hidden">
                  Describe your prize, tell the buyers exactly what they could
                  win!
                </p>

                {/* ReactQuill editor */}
                <ReactQuill
                  value={formData.raffle_description}
                  onChange={handleQuillChange} // Handle ReactQuill's input separately
                  placeholder="Write about your raffle and why you are doing it. This could be a promotion or a new product launch!"
                  style={{ resize: "none", minHeight: "150px" }} // Set min-height here
                  className="custom-quill py-3 mt-2 lg:mt-0 outline-none border-none w-[100%] lg:w-[100%]"
                />


                {/* You can also include other input fields here and use the handleInputChange function for them */}
              </div>
              <h4 className="text-sm lg:text-md  font-bold tracking-wide mt-6">
                Raffle Email
              </h4>
              <input
                onChange={handleInputChange}
                className="p-3 outline-none border-none w-[100%] lg:w-[100%]"
                type="text"
                placeholder="Enter your email address"
                name="email"
                id=""
                value={formData.email}
              />


              <h4 className="text-sm lg:text-md font-bold tracking-wide mt-6">
                Add as many images or videos of your prize as possible!
              </h4>
              {/* <p className="text-xs text-gray-500 mt-2">
                Select your raffle's main image
              </p> */}

              <p className="text-sm lg:text-md font-bold tracking-wide mt-3" style={{ color: "#333" }}>Select your raffle's main image</p>

              <div className="cursor-pointer grid grid-cols-2 gap-2 w-[100%] lg:w-[100%] mt-4 lg:mt-0">

                {imageUrls?.map((imageUrl, index) => (
                  <div key={index} className="uploaded-image relative">
                    <svg
                      onClick={() => handleRemoveImage(index)}
                      className="absolute right-3 top-3 cursor-pointer"
                      width="25"
                      height="25"
                      viewBox="0 0 150 150"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="75" cy="75" r="75" fill="#FF8787" />
                      <path
                        d="M75.4999 68.3336L99.2223 45L106 51.6667L82.2776 75.0002L106 98.3334L99.2223 105L75.4999 81.6668L51.7778 105L45 98.3334L68.7222 75.0002L45 51.6667L51.7778 45L75.4999 68.3336Z"
                        fill="white"
                      />
                    </svg>
                    <img
                      src={imageUrl}
                      alt={`Uploaded ${index + 1}`}
                      style={{
                        width: "300px",
                        height: "300px",
                        borderRadius: "20px",
                      }}
                    />
                    {/* Radio Button to select the first image */}
                    <input
                      type="radio"
                      name="priorityImage"
                      checked={formData.selectedImage === index} // This ensures the correct image is selected
                      onChange={() => {
                        const newIndex = index;  // Capture the selected image index
                        setFormData(prevData => ({
                          ...prevData,
                          selectedImage: newIndex, // Update formData with new selected image index
                        }));
                        console.log("Updated selected image index:", newIndex); // Optional: debug the value
                      }}
                      className="absolute top-3 left-3 radio-button"
                    />
                  </div>
                ))}
                {videoUrls.map((videoUrl, index) => (
                  <div key={index} className="uploaded-video relative">
                    <video
                      src={videoUrl}
                      controls
                      style={{
                        width: "300px",
                        height: "300px",
                        borderRadius: "20px",
                      }}
                    />
                    <svg
                      onClick={() => handleRemoveVideo(index)}
                      className="absolute right-3 top-3 cursor-pointer"
                      width="25"
                      height="25"
                      viewBox="0 0 150 150"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="75" cy="75" r="75" fill="#FF8787" />
                      <path
                        d="M75.4999 68.3336L99.2223 45L106 51.6667L82.2776 75.0002L106 98.3334L99.2223 105L75.4999 81.6668L51.7778 105L45 98.3334L68.7222 75.0002L45 51.6667L51.7778 45L75.4999 68.3336Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                ))}
                {(imageUrls.length + videoUrls.length) < 10 && (
                  <div
                    onClick={handleUploadClick}
                    className="rounded-lg my-4 flex items-center justify-center bg-white py-8 px-4"
                    style={{ height: "200px", minHeight: "300px" }} // Example height for centering
                  >
                    <button className="bg-[#E8E8E8] flex items-center justify-center py-2 px-4 rounded-md">
                      <svg
                        width="15"
                        height="16"
                        viewBox="0 0 15 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0_205_668)">
                          <path
                            d="M13.3321 9.97656V12.4699C13.3321 12.8005 13.2007 13.1176 12.9669 13.3514C12.7331 13.5852 12.416 13.7166 12.0854 13.7166H3.35873C3.02809 13.7166 2.711 13.5852 2.4772 13.3514C2.24341 13.1176 2.11206 12.8005 2.11206 12.4699V9.97656"
                            stroke="black"
                            stroke-width="1.76"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M10.8388 5.61276L7.72214 2.49609L4.60547 5.61276"
                            stroke="black"
                            stroke-width="1.76"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M7.72217 2.49609V9.97609"
                            stroke="black"
                            stroke-width="1.76"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_205_668">
                            <rect
                              width="14.96"
                              height="14.96"
                              fill="white"
                              transform="translate(0.0327148 0.706055)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                      <label className="custom-file-input text-xs lg:text-sm lg:text-md">
                        Click here to upload
                      </label>
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*,video/*"
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                        multiple={true}
                      />
                    </button>
                  </div>
                )}

              </div>

              <ul className="font-normal text-xs text-gray-500" style={{ minHeight: "100px" }}>
                <li className="mt-1">Recommended image size: 630 x 470px</li>
                <li className="mt-1">Maximum file size: 50MB</li>
                <li className="mt-1">Supported file: JPEG, JPG, PNG and MP4</li>
              </ul>

              {/* <h4 className="text-sm lg:text-md font-bold tracking-wide mt-2">
                Select Bussiness Logo
              </h4>

              <div className="cursor-pointer grid grid-cols-2 gap-2 w-[100%] lg:w-[100%] mt-4 lg:mt-0">

                {formData.associatedLogo && (
                  <div className="uploaded-banner-image relative">
                    <svg
                      onClick={() => {
                        setFormData((prevData) => ({
                          ...prevData,
                          associatedLogo: "", // Reset banner image
                        }));
                        setImageUploaded(false);
                      }}
                      className="absolute right-3 top-3 cursor-pointer"
                      width="25"
                      height="25"
                      viewBox="0 0 150 150"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="75" cy="75" r="75" fill="#FF8787" />
                      <path
                        d="M75.4999 68.3336L99.2223 45L106 51.6667L82.2776 75.0002L106 98.3334L99.2223 105L75.4999 81.6668L51.7778 105L45 98.3334L68.7222 75.0002L45 51.6667L51.7778 45L75.4999 68.3336Z"
                        fill="white"
                      />
                    </svg>
                    <img
                      src={backgroundImageUrl}
                      alt="Banner Image"
                      style={{
                        width: "300px",
                        height: "auto",
                        borderRadius: "20px",
                      }}
                    />
                  </div>
                )}
                <div>
                  {!imageUploaded && (
                    <div
                      onClick={handleUploadBannerClick}
                      className="rounded-lg my-4 flex items-center justify-center bg-white py-8 px-4"
                      style={{ height: "200px", minHeight: "200px" }}
                    >
                      <button className="bg-[#E8E8E8] flex items-center justify-center py-2 px-4 rounded-md">
                        <svg
                          width="15"
                          height="16"
                          viewBox="0 0 15 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_205_668)">
                            <path
                              d="M13.3321 9.97656V12.4699C13.3321 12.8005 13.2007 13.1176 12.9669 13.3514C12.7331 13.5852 12.416 13.7166 12.0854 13.7166H3.35873C3.02809 13.7166 2.711 13.5852 2.4772 13.3514C2.24341 13.1176 2.11206 12.8005 2.11206 12.4699V9.97656"
                              stroke="black"
                              strokeWidth="1.76"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M10.8388 5.61276L7.72214 2.49609L4.60547 5.61276"
                              stroke="black"
                              strokeWidth="1.76"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M7.72217 2.49609V9.97609"
                              stroke="black"
                              strokeWidth="1.76"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_205_668">
                              <rect
                                width="14.96"
                                height="14.96"
                                fill="white"
                                transform="translate(0.0327148 0.706055)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                        <label className="custom-file-input text-xs lg:text-sm lg:text-md">
                          Click here to upload
                        </label>
                        <input
                          type="file"
                          ref={fileInputBannerRef}
                          accept="image/*"
                          style={{ display: "none" }}
                          onChange={handleBannerImageChange}
                          multiple={true}
                        />
                      </button>
                    </div>
                  )}
                </div>
              </div> */}

              <div className="w-[100%] mt-4">
                <h4 className="text-sm lg:text-md  font-medium tracking-wide">
                  Website
                </h4>
                <input
                  className="p-3 outline-none border-none w-[100%]"
                  type="text"
                  placeholder="www.zara.com"
                  name="websites"
                  value={formData.websites}
                  id=""
                  onChange={handleInputChange}
                />
              </div>

            </div>

            {/* <button
              onClick={() => {
                handleSubmit("DRAFT");
              }}
              className="hidden lg:block font-medium text-center border-2 border-[#000000] border-opacity-40 rounded-md w-full mt-6 p-4 "
            >
              Save to draft
            </button>
            <button
              onClick={() => {
                handlePerview("DRAFT", true); // Pass true to navigate to the preview page
              }}
              style={{ backgroundColor: 'rgb(43 33 72)' }}
              className="hidden lg:block font-medium text-center bg-blue-500 text-white rounded-md w-full mt-10 p-4"
            >
              Preview Raffle
            </button> */}

          </div>

          <div
            className={`w-[100%] lg:w-[48%] mt-4 lg:mt-0 m-auto h-fit ${formData.isInstantPrize || formData.main_prizes.length > 1
              ? "lg:h-fit"
              : "lg:h-[auto]"
              }  `}
          >
            <div
              className={`bg-[#F9F0F0] rounded-md p-6 m-auto w-[100%]    ${formData.instant_prizes.length > 1 ? "h-fit" : "h-[auto]"
                }`}
            >
              <h4 className="text-sm lg:text-md  font-bold tracking-wide">
                Prize Category
              </h4>
              <div className="w-[100%] bg-white flex items-center justify-between">
                <select
                  onChange={handleCategoryChange}
                  id="countrySelect"
                  className="p-3  border-none outline-none w-full cursor-pointer"
                  value={formData.category}
                >
                  {categoryData?.map((item, i) => (
                    <>
                      <option
                        data-name={item?.category_name}
                        data-type={item?.type}
                        value={item?.type}
                        className="text-start"
                      >
                        {item?.category_name}
                      </option>
                    </>
                  ))}
                </select>
              </div>

              {/* <div className="my-8">
                <div className="block md:flex" style={{ alignItems: "center" }}>
                  <h4 className="text-sm lg:text-md font-bold tracking-wide">
                    Raffle Category Type:{" "}
                  </h4>
                  <div className="ml-0 md:ml-5 mt-4 md:mt-0 ">
                    <label>
                      <input
                        type="radio"
                        name="raffleCategoryType"
                        value="exclusive"
                        checked={formData.raffleCategoryType === "exclusive"}
                        onChange={handleRaffleCategoryTypeChange}
                      />
                      <span className="ml-3">Exclusive</span>
                    </label>
                    <label className="ml-5">
                      <input
                        type="radio"
                        name="raffleCategoryType"
                        value="featured"
                        checked={formData.raffleCategoryType === "featured"}
                        onChange={handleRaffleCategoryTypeChange}
                      />
                      <span className="ml-3">Featured</span>
                    </label>
                  </div>
                </div>
              </div> */}
              <div className="my-8">
                <div className="block md:flex" style={{ alignItems: "center" }}>
                  <h4 className="text-sm lg:text-md font-bold tracking-wide">
                    Type Of Raffle :{" "}
                  </h4>
                  <div className="ml-0 md:ml-5 mt-4 md:mt-0 ">
                    <label>
                      <input
                        type="radio"
                        name="raffleType"
                        value="paid"
                        checked={!formData.isFreeRaffle}
                        onChange={handleRaffleTypeChange}
                      />
                      <span className="ml-3">Paid Tickets</span>
                    </label>
                    <label className="ml-5">
                      <input
                        type="radio"
                        name="raffleType"
                        value="free"
                        checked={formData.isFreeRaffle}
                        onChange={handleRaffleTypeChange}
                      />
                      <span className="ml-3">Free Tickets</span>
                    </label>
                  </div>
                </div>
              </div>





              {/* <div onClick={() => { setInstantOpen(!instantOpen); setFormData({ ...formData, isInstantPrize: !formData.isInstantPrize }); handleInstantOpen() }} className='flex-row items-center gap-2 font-light text-sm mt-4 hidden lg:flex'>
                                <svg width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="0.880859" y="0.5" width="24" height="24" fill="white" stroke="#909090" />
                                    {
                                        instantOpen &&
                                        <rect x="4.36768" y="3.98633" width="17.0264" height="17.0264" fill="#FF7385" />
                                    }

                                </svg>
                                <p>Do you want to also add instant wins?</p>
                            </div>

                            {instantOpen && <div>
                                {
                                    formData.instant_prizes.map((item, i) => (
                                        <div className='hidden lg:flex items-center gap-2 w-[95%] mt-4'>
                                            <h4>{i + 1}&nbsp;Prize</h4>
                                            <input onChange={(e) => handlePrizeChange(i, e)} className='p-3 outline-none border-none w-[100%]' type="text" placeholder='Instant win prize name' name="instant_prize" id="" />
                                            <input onChange={(e) => handlePrizeChange(i, e)} className=' p-3 outline-none border-none w-[100%]' type="text" placeholder='Instant value' name="instant_value" id="" />
                                            <svg onClick={() => handleRemoveInstantWins(i)} width="60" height="60" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="75" cy="75" r="75" fill="#FF8787" />
                                                <path d="M75.4999 68.3336L99.2223 45L106 51.6667L82.2776 75.0002L106 98.3334L99.2223 105L75.4999 81.6668L51.7778 105L45 98.3334L68.7222 75.0002L45 51.6667L51.7778 45L75.4999 68.3336Z" fill="white" />
                                            </svg>
                                        </div>
                                    ))
                                }

                                <div className='hidden lg:block'>
                                    <p className='text-[#F66E6A] font-xs text-sm mt-2 cursor-pointer' onClick={handleAddMore}>+ Add more</p>
                                </div>
                            </div>} */}

              <div className="flex items-center gap-2 w-[100%] mt-4">
                <div className="w-[100%]">
                  <h4 className="text-sm lg:text-sm lg:text-md   font-bold tracking-wide">
                    List your prizes (up to 10)
                  </h4>
                </div>
              </div>
              {
                <>
                  {formData.main_prizes.map((item, i) => (
                    <div className="block lg:flex items-center gap-2 w-[100%] mt-4">
                      {/* <h4 className='w-[30%]'>{i + 1} Prize</h4> */}

                      <input
                        onChange={(e) =>
                          handleMainPrizeChange(i, { name: e.target.name, value: e.target.value })
                        }
                        className="p-3 outline-none border-none w-[100%] bg-[#FFFFFF] mt-4 lg:mt-0"
                        type="text"
                        placeholder="Prize Name"
                        name="prize_name"
                        id=""
                        value={item.prize_name}
                      />

                      <div className="relative w-[100%] mt-4 lg:mt-0">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 ">£</span>
                        <input
                          onChange={(e) =>
                            handleMainPrizeChange(i, { name: e.target.name, value: e.target.value })
                          }
                          className="p-3 pl-8 outline-none border-none w-[100%]"
                          type="text"
                          placeholder="Prize Value"
                          name="prize_value"
                          value={item.prize_value} // Store only the numeric value in the state
                        />
                      </div>

                      {formData.main_prizes.length > 1 && (
                        <svg
                          onClick={() => handleRemoveInstantWinsMain(i)}
                          width="30"
                          height="30"
                          viewBox="0 0 150 150"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx="75" cy="75" r="75" fill="#FF8787" />
                          <path
                            d="M75.4999 68.3336L99.2223 45L106 51.6667L82.2776 75.0002L106 98.3334L99.2223 105L75.4999 81.6668L51.7778 105L45 98.3334L68.7222 75.0002L45 51.6667L51.7778 45L75.4999 68.3336Z"
                            fill="white"
                          />
                        </svg>
                      )}
                    </div>
                  ))}
                  <div className="hidden lg:block">
                    <p
                      className="text-[#F66E6A] font-xs text-sm mt-2 cursor-pointer"
                      onClick={handleAddMoreMain}
                    >
                      Add More +
                    </p>
                  </div>
                </>
              }

              {!formData.isFreeRaffle && (
                <>

                  {/* <div className="w-[100%] mt-4">
                    <h4 className="text-sm lg:text-md font-bold tracking-wide">
                      Ticket Price
                    </h4>
                    <input
                      onChange={handleInputChange}
                      className="p-3 outline-none border-none w-[100%]"
                      type="text"
                      placeholder="Value"
                      name="ticket_price"
                      value={`£${formData?.ticket_price || ""}`}
                    />
                  </div> */}
                  <h4 className="text-sm lg:text-md font-bold tracking-wide mt-4">
                    Ticket Price
                  </h4>
                  <div className="relative w-[100%] mt-4 lg:mt-0">
                    {/* Absolute £ sign for visual purposes */}
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2">£</span>
                    <input
                      onChange={handleInputChange}
                      className="p-3 pl-8 outline-none border border-gray-300 rounded-md w-[100%]"
                      type="text"
                      name="ticket_price"
                      value={formData?.ticket_price || ""}
                      placeholder="Enter ticket price"
                    />
                  </div>


                  <div className="w-[100%] mt-4">
                    <h4 className="text-sm lg:text-md font-bold tracking-wide">
                      Maximum Tickets Per Person
                    </h4>
                    <input
                      onChange={handleInputChange}
                      className="p-3 outline-none border-none w-[100%]"
                      type="number"
                      placeholder="Maximum Tickets"
                      name="max_tickets_per_person"
                      value={formData?.max_tickets_per_person}
                    />
                  </div>
                </>
              )}

              {/* <h4 className='text-sm lg:text-sm lg:text-md   font-bold tracking-wide mt-4'>Choose how the raffles closes</h4>
                            <div className='w-[100%] bg-white flex items-center  justify-between mt-2'>
                                <select onChange={handleSelectType} id="countrySelect" className='p-3  border-none outline-none w-full cursor-pointer'>
                  
                                    <option value="TIME" className='text-start' selected>Time</option>
                                   
                                </select>
                            </div> */}
              {/* {
                                formData.raffle_type === "REVENUE"
                                &&
                                <div className='hidden lg:flex items-center gap-2 w-[95%] mt-4'>
                                    <div className='w-[100%]'>
                                        <h4 className='text-sm lg:text-md  font-bold tracking-wide'>Minimum revenue to close raffle</h4>
                                        <input onChange={handleInputChange} className='p-3 outline-none border-none w-[100%]' type="text" placeholder='Revenue' name="revenue_set_prize" id="" value={formData.revenue_set_prize} />
                                    </div>
                                 
                                </div>
                            } */}

              {formData.raffle_type === "TIME" && (
                <div className="flex flex-col lg:flex-row items-center gap-2 w-[100%] mt-4">
                  {/* <div className='w-[100%] lg:w-1/2'>
                                        <h4 className='text-sm lg:text-md font-bold tracking-wide'>Start date and Time</h4>
                                        <input
                                            onChange={handleStartDateChange}
                                            className='p-3 outline-none border-none w-[100%]'
                                            type="datetime-local"
                                            name="start_date"
                                            value={formData?.start_date}
                                            min={moment().add(1, 'days').format('YYYY-MM-DDTHH:mm')}
                                        />
                                    </div>
                                    <div className='w-[100%] lg:w-1/2'>
                                        <h4 className='text-sm lg:text-md font-bold tracking-wide'>End Date and Time</h4>
                                        <input
                                            onChange={handleEndDateChange}
                                            className='p-3 outline-none border-none w-[100%]'
                                            type="datetime-local"
                                            name="time_set_prize"
                                            value={formData?.time_set_prize}
                                            min={moment(startDate).add(1, 'days').format('YYYY-MM-DDTHH:mm')}
                                        />
                                    </div> */}
                  <div className="flex flex-col lg:flex-row items-center gap-2 w-[100%] mt-4">
                    <div className="w-[100%] lg:w-1/2">
                      <h4 className="text-sm lg:text-md font-bold tracking-wide">
                        Start date and Time
                      </h4>
                      <input
                        onChange={handleStartDateChange}
                        className="p-3 outline-none border-none w-[100%]"
                        type="datetime-local"
                        name="start_date"
                        value={formData?.start_date}
                      // min={moment().add(1, 'days').format('YYYY-MM-DDTHH:mm')}
                      />
                    </div>
                    <div className="w-[100%] lg:w-1/2">
                      <h4 className="text-sm lg:text-md font-bold tracking-wide">
                        End Date and Time
                      </h4>
                      <input
                        onChange={handleEndDateChange}
                        className="p-3 outline-none border-none w-[100%]"
                        type="datetime-local"
                        name="time_set_prize"
                        value={formData?.time_set_prize}
                      // min={moment(startDate).add(1, 'days').format('YYYY-MM-DDTHH:mm')}
                      />
                    </div>
                  </div>

                  {/* <div className='w-[100%] lg:w-1/2'>
                                        <h4 className='text-sm lg:text-md font-bold tracking-wide'>Start date and Time</h4>
                                        <input
                                            onChange={handleStartDateChange}
                                            className='p-3 outline-none border-none w-[100%]'
                                            type="datetime-local"
                                            name="start_date"
                                            value={formData?.start_date}
                                            min={moment().add(1, 'days').format('YYYY-MM-DDTHH:mm')}
                                        />
                                    </div>
                                    <div className='w-[100%] lg:w-1/2'>
                                        <h4 className='text-sm lg:text-md font-bold tracking-wide'>End Date and Time</h4>
                                        <input
                                            onChange={handleEndDateChange}
                                            className='p-3 outline-none border-none w-[100%]'
                                            type="datetime-local"
                                            name="time_set_prize"
                                            value={formData?.time_set_prize}
                                            min={moment(startDate).add(1, 'days').format('YYYY-MM-DDTHH:mm')}
                                        />
                                    </div> */}
                </div>
              )}

              <div className="hidden lg:flex items-center gap-2 w-[100%] mt-4">
                <div className="w-[100%]">
                  <h4 className="text-sm lg:text-md font-bold tracking-wide">
                    Total Tickets Available
                  </h4>
                  <input
                    onChange={handleInputChange}
                    className="p-3 outline-none border-none w-[100%]"
                    type="text"
                    placeholder="Value"
                    name="ticket_set_prize"
                    value={formData.ticket_set_prize}
                  />
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm lg:text-sm lg:text-md   font-bold tracking-wide mt-4">
                  Add a simple question for people to enter
                </h4>
                <input
                  type="text"
                  id="question"
                  name="question"
                  value={formData.question}
                  onChange={handleQuestionChange}
                  required
                  className="p-3 outline-none border-none w-[100%] custom-input"
                />
              </div>

              {/* Answers Input */}
              <div className="mb-4">
                <h4 className="text-sm lg:text-sm lg:text-md font-bold tracking-wide mt-4">
                  Add answer (add a minimum of 3 possible answers)
                </h4>

                {formData.answers.map((answer, index) => (
                  <div
                    key={index}
                    className="mb-2"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <input
                      type="text"
                      value={answer}
                      onChange={(e) => handleAnswerChange(index, e)}
                      className="p-3 outline-none border-none w-[90%]"
                    />
                    <input
                      type="checkbox"
                      name="correctAnswer"
                      checked={formData.correctAnswer === index.toString()}
                      className="h-10 p-5 ms-3 w-6 bg-gray-200 border-gray-300 rounded"
                      onChange={() => handleCorrectAnswerChange(index)}
                    />
                    {/* {formData.answers.length > 1 && (
                      <svg
                        onClick={() => handleRemoveAnswer(index)}
                        width="30"
                        height="30"
                        viewBox="0 0 150 150"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="p-2"
                      >
                        <circle cx="75" cy="75" r="75" fill="#FF8787" />
                        <path
                          d="M75.4999 68.3336L99.2223 45L106 51.6667L82.2776 75.0002L106 98.3334L99.2223 105L75.4999 81.6668L51.7778 105L45 98.3334L68.7222 75.0002L45 51.6667L51.7778 45L75.4999 68.3336Z"
                          fill="white"
                        />
                      </svg>
                    )} */}
                  </div>
                ))}

                {/* <div className="">
                  <p
                    className="text-[#F66E6A] font-xs text-sm mt-2 cursor-pointer"
                    onClick={handleAddAnswer}
                  >
                    Add Answer +
                  </p>
                </div> */}
              </div>
              {/* <div className="mb-4">
                                <h4 className='text-sm lg:text-sm lg:text-md   font-bold tracking-wide mt-4'>Add Correct Answer</h4>
                                <input
                                    type="text"
                                    id="correctAnswer"
                                    name="correctAnswer"
                                    value={formData.correctAnswer}
                                    onChange={handleCorrectAnswerChange}
                                    required
                                    className="p-3 outline-none border-none w-[100%]"
                                />
                            </div> */}
              {/* {
                                formData.raffle_type === "TICKET"
                                &&
                                <div className='hidden lg:flex items-center gap-2 w-[95%] mt-4'>
                                    <div className='w-[100%]'>
                                        <h4 className='text-sm lg:text-md  font-bold tracking-wide'>Minimum ticket to close raffle</h4>
                                        <input onChange={handleInputChange} className='p-3 outline-none border-none w-[100%]' type="text" placeholder='Value' name="ticket_set_prize" id="" />
                                    </div>
                                </div>
                            } */}

              {/* <div className='hidden lg:flex w-[45%]  bg-white items-center justify-between mt-4'>
                                <div className='flex items-center'>
                                    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.7825 22.2666C18.3053 22.2666 22.7825 17.7894 22.7825 12.2666C22.7825 6.74375 18.3053 2.2666 12.7825 2.2666C7.25962 2.2666 2.78247 6.74375 2.78247 12.2666C2.78247 17.7894 7.25962 22.2666 12.7825 22.2666Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M12.7825 6.2666V12.2666L16.7825 14.2666" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <input className='p-3 outline-none border-none ' type="text" placeholder='00:00' name="" id="" />
                                </div>
                                <svg className='mr-4' width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.20798 0.144463L0.760742 1.58724L7.90761 8.7207L15.0545 1.58724L13.6072 0.144462L7.90761 5.83069L2.20798 0.144463Z" fill="black" />
                                </svg>
                            </div> */}

              {/* <div className='block lg:hidden flex items-center gap-2 w-[95%] mt-4'>
                                <div className='w-[50%]'>
                                    <h4 className='text-sm lg:text-md  font-bold tracking-wide'>Choose day</h4>
                                    <input className='p-3 outline-none border-none ' type="date" placeholder='Value' name="" id="" />
                                </div> */}
              {/* <div className='bg-white flex items-center justify-between mt-4'>
                                    <div className='flex items-center'>
                                        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12.7825 22.2666C18.3053 22.2666 22.7825 17.7894 22.7825 12.2666C22.7825 6.74375 18.3053 2.2666 12.7825 2.2666C7.25962 2.2666 2.78247 6.74375 2.78247 12.2666C2.78247 17.7894 7.25962 22.2666 12.7825 22.2666Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M12.7825 6.2666V12.2666L16.7825 14.2666" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                        <input className='p-3 outline-none border-none ' type="text" placeholder='00:00' name="" id="" />
                                    </div>
                                    <svg className='mr-4' width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2.20798 0.144463L0.760742 1.58724L7.90761 8.7207L15.0545 1.58724L13.6072 0.144462L7.90761 5.83069L2.20798 0.144463Z" fill="black" />
                                    </svg>
                                </div> */}

              {/* </div> */}
            </div>
            <br />
            {(!state?.item || state?.item.isDraft === true) && (

              <div className="bg-[#F9F0F0] rounded-md p-6 m-auto w-[100%] h-[60%]">
                {/* Terms and Conditions Heading */}
                <a
                  href="#"
                  onClick={() =>
                    termsConditionPage(
                      termsData?.link1,
                      termsData?.description1
                    )
                  }
                  style={{ cursor: "pointer" }}
                >
                  <h3 className="text-sm lg:text-sm lg:text-md font-bold mb-4">
                    Terms and Conditions
                  </h3>
                </a>

                <div>
                  <div className="flex items-start gap-4">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={isTermsChecked}
                      onChange={handleTermsChange}
                      className="mt-1"
                    />
                    <label className="text-[13px]">
                      I can confirm that I have read and understood the <a
                        href="#"
                        onClick={() =>
                          termsConditionPage(
                            termsData?.link1,
                            termsData?.description1
                          )
                        }
                        style={{ cursor: "pointer", color: "blue" }}
                      >Terms and Conditions</a>
                    </label>
                  </div>

                  <div className="mt-3">
                    {" "}
                    {/* Reduced gap before the next section */}
                    <div className="flex items-start gap-4 mt-3">
                      {" "}
                      {/* Consistent spacing for all items */}
                      <input
                        type="checkbox"
                        id="terms1"
                        checked={isTerms1Checked}
                        onChange={handleTerms1Change}
                      />
                      <label htmlFor="terms1" className="text-[13px]">
                        We understand that Raffily will retain 25% of all transaction fees
                      </label>
                    </div>
                    <div className="flex items-start gap-4 mt-3">
                      <input
                        type="checkbox"
                        id="terms2"
                        checked={isTerms2Checked}
                        onChange={handleTerms2Change}
                      />
                      <label htmlFor="terms2" className="text-[13px]">
                        When the raffle has ended, commit to sending the prize to the winner irrespective of how many tickets are sold
                      </label>
                    </div>
                    <div className="flex items-start gap-4 mt-3">
                      <input
                        type="checkbox"
                        id="terms3"
                        checked={isTerms3Checked}
                        onChange={handleTerms3Change}
                      />
                      <label htmlFor="terms3" className="text-[13px]">
                        We commit to promoting the raffle through our own marketing channels
                      </label>
                    </div>
                    {/* <div className="flex items-start gap-4 mt-3">
      <input
        type="checkbox"
        id="terms4"
        checked={isTerms4Checked}
        onChange={handleTerms4Change}
      />
      <label htmlFor="terms4" className="text-[13px]">
        We commit to promoting the raffle through our own
        marketing channels
      </label>
    </div> */}
                  </div>
                </div>
              </div>
            )}
            <div className="flex space-x-4 mt-6">
              <button
                onClick={() => {
                  handleSubmit("DRAFT");
                }}
                className="font-medium text-center border-2 border-[#000000] border-opacity-40 rounded-md w-full p-4"
              >
                Save to draft
              </button>
              <button
                onClick={() => {
                  handlePerview("DRAFT", true); // Pass true to navigate to the preview page
                }}
                style={{ backgroundColor: 'rgb(43 33 72)' }}
                className="font-medium text-center bg-blue-500 text-white rounded-md w-full p-4"
              >
                Preview Raffle
              </button>
            </div>


            {/* <button
              onClick={() => {
                handleSubmit("NO_DRAFT");
              }}
              className="font-medium text-white text-center bg-[#FF6A78] rounded-md w-full mt-6 p-4 "
            >
              {state?.item ? "Update Raffle" : "Submit for Approval"}
            </button> */}

            <button
              onClick={() => {
                handleSubmit("NO_DRAFT");
              }}
              className="font-medium text-white text-center bg-[#FF6A78] rounded-md w-full mt-6 p-4"
            >
              {state?.item.raffle_status === 4 || !state?.item ? "Submit for Approval" : "Update Raffle"}
            </button>


          </div>
        </div>
      </div>
      <Modal className="bg-[#160B3A]" position="center" show={isLoading} popup>
        <div className="rounded-md">
          <Modal.Header className="bg-white  rounded-t-md" />

          <Modal.Body className="bg-white text-secondary  h-full xs:h-auto rounded-b-md" style={{ fontFamily: "poppins, sans-serif" }}>
            <div className="flex flex-col justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                width="100"
                height="100"
              >
                <radialGradient
                  id="a11"
                  cx=".66"
                  fx=".66"
                  cy=".3125"
                  fy=".3125"
                  gradientTransform="scale(1.5)"
                >
                  <stop offset="0" stop-color="#FF6A78"></stop>
                  <stop
                    offset=".3"
                    stop-color="#FF6A78"
                    stop-opacity=".9"
                  ></stop>
                  <stop
                    offset=".6"
                    stop-color="#FF6A78"
                    stop-opacity=".6"
                  ></stop>
                  <stop
                    offset=".8"
                    stop-color="#FF6A78"
                    stop-opacity=".3"
                  ></stop>
                  <stop offset="1" stop-color="#FF6A78" stop-opacity="0"></stop>
                </radialGradient>
                <circle
                  transform-origin="center"
                  fill="none"
                  stroke="url(#a11)"
                  stroke-width="8"
                  stroke-linecap="round"
                  stroke-dasharray="100 500"
                  stroke-dashoffset="0"
                  cx="50"
                  cy="50"
                  r="35"
                >
                  <animateTransform
                    type="rotate"
                    attributeName="transform"
                    calcMode="spline"
                    dur="2"
                    values="360;0"
                    keyTimes="0;1"
                    keySplines="0 0 1 1"
                    repeatCount="indefinite"
                  ></animateTransform>
                </circle>
                <circle
                  transform-origin="center"
                  fill="none"
                  opacity=".2"
                  stroke="#FF6A78"
                  stroke-width="8"
                  stroke-linecap="round"
                  cx="50"
                  cy="50"
                  r="35"
                ></circle>
              </svg>

              {/* <h6 className='mt-2 font-bold text-xl tracking-wide'>Please wait!</h6> */}
              <h4 className="mt-2 font-bold text-xl tracking-wide" style={{ fontFamily: "poppins, sans-serif", color: "black" }}>
                Creating your raffle
              </h4>
            </div>
          </Modal.Body>
        </div>
      </Modal>
      <Modal
        className="bg-[#160B3A]"
        position="center"
        show={isTermsAndConditions}
        popup
        onClose={() => setIsTermsAndConditions(false)}
      >
        <div className="footer-pages rounded-md relative max-h-[80vh] max-w-[90vw] overflow-y-auto">
          <Modal.Header className="bg-white  rounded-t-md" />

          <Modal.Body className="bg-white text-secondary h-full xs:h-auto rounded-b-md  p-4">
            <div className="flex flex-col justify-center items-center">
              <div>
                <h2 className="mb-3">
                  <strong>
                    <span>Supplier T&amp;Cs</span>
                  </strong>
                </h2>
                <p className="mb-3">
                  <strong>
                    <span>
                      TERMS AND CONDITIONS FOR SUPPLIERS PARTICIPATING IN
                      RAFFLES
                    </span>
                  </strong>
                </p>
                <p className="mb-2">
                  <strong>
                    <span>1. Agreement to Provide Prizes</span>
                  </strong>
                </p>
                <p className="mt-2">
                  <span>
                    1.1 By agreeing to participate in an online raffle hosted by
                    Raffily Limited (the &ldquo;Promoter&rdquo;) via the
                    Promoter&rsquo;s website at [www.raffily.co.uk] (the
                    &ldquo;Website&rdquo;)
                  </span>
                  <span>
                    {" "}
                    Company Name, you, the supplier (&quot;Supplier&quot;),
                    agree to provide the designated prize (&quot;Prize&quot;) as
                    described during the raffle setup.
                  </span>
                </p>
                {/* <p></p> */}
                <p className="mt-2">
                  <span>
                    1.2 You commit to sending the Prize directly to the winner
                    within 7 days of receiving notification of the
                    winner&rsquo;s details, regardless of the number of raffle
                    tickets sold. The delivery of the Prize is mandatory and
                    independent of the raffle&rsquo;s total ticket sales.
                  </span>
                </p>
                <p></p>
                <p className="mt-2">
                  <span>
                    1.3 Failure to deliver the Prize as agreed will result in
                    legal action, including potential reimbursement for any
                    expenses incurred by the Promoter in resolving the issue
                    with the raffle participants.
                  </span>
                </p>

                <p className="mb-2">
                  <strong>
                    <span>2. &nbsp;Commission and Payment Terms</span>
                  </strong>
                </p>
                <p className="mt-2">
                  <span>
                    2.1 The Promoter retains 25% of the total funds raised
                    through ticket sales as its commission for operating and
                    hosting the raffle.
                  </span>
                </p>
                <p className="mt-2">
                  <span>
                    2.2 The remaining 75% of the funds raised will be payable to
                    the Retailer within 30 days of the raffle&rsquo;s official
                    end date.
                  </span>
                </p>
                <p className="mt-2">
                  <span>
                    2.3 Payments will be made via Bank Transfer. The Supplier is
                    responsible for providing accurate payment details to ensure
                    timely transactions.
                  </span>
                </p>
                <p className="mt-2">
                  <span>
                    2.4 If there are delays in sending the payment, the Promoter
                    will notify the Supplier of the expected timeframe.
                  </span>
                </p>

                <p className="mb-2">
                  <strong>
                    <span>3. Responsibilities of the Supplier</span>
                  </strong>
                </p>
                <p className="mt-2">
                  <span>
                    3.1 The Supplier guarantees the availability and
                    authenticity of the Prize as described during the raffle
                    setup. Any misleading information about the Prize is grounds
                    for termination of this agreement and potential legal
                    liability.
                  </span>
                </p>
                <p className="mt-2">
                  <span>
                    3.2 The Supplier must ensure that the Prize is new, unused,
                    and in proper working condition (if applicable).
                  </span>
                </p>
                <p className="mt-2">
                  <span>
                    3.3 If the prize is a service/experience, the Supplier must
                    ensure that all elements of the Prize are fulfilled.
                  </span>
                </p>
                <p className="mt-2">
                  <span>
                    3.4 The Supplier agrees to bear all costs related to the
                    shipping and handling of the Prize to the winner.
                  </span>
                </p>
                <p className="mt-2">
                  <span>
                    3.5 The Supplier agrees to cooperate with Promoter in case
                    of any disputes or queries from the winner regarding the
                    Prize.
                  </span>
                </p>

                <p className="mb-2">
                  <strong>
                    <span>4. Winner Notification and Prize Delivery</span>
                  </strong>
                </p>
                <p className="mt-2">
                  <span>
                    4.1 The Promoter will notify the Supplier of the raffle
                    winner within 1 day of the raffle&rsquo;s end.
                  </span>
                </p>
                <p className="mt-2">
                  <span>
                    4.2 The Supplier agrees to contact the winner directly and
                    arrange for the delivery of the Prize. All communication
                    regarding the Prize shipment and tracking details should be
                    shared with both the winner and the Promoter.
                  </span>
                </p>
                <p className="mt-2">
                  <span>
                    4.3 The Retailer is required to dispatch the Prize to the
                    winner within 7 days of being notified of the winner&apos;s
                    details.
                  </span>
                </p>

                <p className="mb-2">
                  <strong>
                    <span>5. Refunds and Cancellations</span>
                  </strong>
                </p>
                <p className="mt-2">
                  <span>
                    5.1 In the unlikely event that the raffle is cancelled for
                    any reason, the Promoter will notify the Supplier
                    immediately. Any funds collected will be refunded to
                    participants, and the Supplier will not be entitled to any
                    portion of the proceeds.
                  </span>
                </p>
                <p className="mt-2">
                  <span>
                    5.2 The Supplier is not entitled to request or initiate a
                    cancellation after agreeing to participate and the raffle
                    has begun.
                  </span>
                </p>

                <p className="mb-2">
                  <strong>
                    <span>6. Liability and Indemnification</span>
                  </strong>
                </p>
                <p className="mt-2">
                  <span>
                    6.1 The Supplier assumes full responsibility for the Prize
                    and its delivery. The Promoter is not liable for any
                    damages, delays, or issues related to the Prize&rsquo;s
                    quality or shipment.
                  </span>
                </p>
                <p className="mt-2">
                  <span>
                    6.2 The Supplier agrees to indemnify and hold harmless the
                    Promoter, its officers, employees, and agents from any
                    claims, damages, losses, or liabilities arising from the
                    Prize or its delivery.
                  </span>
                </p>

                <p className="mb-2">
                  <strong>
                    <span>7. Termination of Agreement</span>
                  </strong>
                </p>
                <p className="mt-2">
                  <span>
                    7.1 The Promoter reserves the right to terminate this
                    agreement if the Supplier fails to deliver the Prize,
                    violates these Terms and Conditions, or engages in
                    fraudulent or unethical behaviour.
                  </span>
                </p>
                <p className="mt-2">
                  <span>
                    7.2 If this agreement is terminated, the Supplier forfeits
                    any claim to proceeds from ticket sales.
                  </span>
                </p>

                <p className="mb-2">
                  <strong>
                    <span>8. Dispute Resolution</span>
                  </strong>
                </p>
                <p className="mt-2">
                  <span>
                    8.1 Any disputes arising from this agreement shall be
                    resolved through negotiation between the Promoter and the
                    Supplier. If a resolution cannot be reached, the matter may
                    be escalated to binding arbitration, subject to the laws of
                    England and Wales.
                  </span>
                </p>

                <p className="mb-2">
                  <strong>
                    <span>9. Amendments to Terms</span>
                  </strong>
                </p>
                <p className="mt-2">
                  <span>
                    9.1 The Promoter reserves the right to update or amend these
                    Terms and Conditions at any time. Any changes will be
                    communicated to the Supplier in writing, and continued
                    participation in raffles will constitute acceptance of the
                    updated terms.
                  </span>
                </p>
                <br />
                <h3 className="mb-2">
                  <strong>
                    <span>10. Supplier Contact and Data Protection</span>
                  </strong>
                </h3>
                <p>
                  <span>7.1&nbsp;</span>
                  <b>
                    <span>Opt-In Requirement</span>
                  </b>
                </p>
                <ul>
                  <li>
                    <p>
                      <span>
                        Suppliers and third-party retailers associated with the
                        raffle are strictly prohibited from contacting entrants
                        unless the entrant has expressly opted in to receive
                        communications. Entrants will have the opportunity to
                        provide their consent by ticking the relevant opt-in box
                        during the registration or entry process.
                      </span>
                    </p>
                  </li>
                </ul>
                <p>
                  <span>7.2&nbsp;</span>
                  <b>
                    <span>Use of Entrant Data</span>
                  </b>
                </p>
                <ul>
                  <li>
                    <p>
                      <span>
                        Suppliers may only use the contact information of
                        entrants who have opted in for the purposes explicitly
                        agreed to at the time of opt-in, such as marketing
                        communications, prize fulfillment, or other agreed
                        services.
                      </span>
                    </p>
                  </li>
                  <li>
                    <p>
                      <span>
                        Entrant data must not be used, sold, shared, or
                        transferred to third parties for any purposes beyond
                        those consented to by the entrant.
                      </span>
                    </p>
                  </li>
                </ul>
                <p>
                  <span>7.3&nbsp;</span>
                  <b>
                    <span>Compliance with Data Protection Laws</span>
                  </b>
                </p>
                <ul>
                  <li>
                    <p>
                      <span>
                        All suppliers and third-party retailers must comply with
                        applicable data protection laws, including but not
                        limited to the General Data Protection Regulation (GDPR)
                        and the Data Protection Act 2018.
                      </span>
                    </p>
                  </li>
                  <li>
                    <p>
                      <span>
                        Suppliers must ensure they have a lawful basis for
                        processing the entrant&apos;s personal data, such as
                        explicit consent, and provide clear, accessible
                        information on how they will handle, store, and protect
                        this data.
                      </span>
                    </p>
                  </li>
                </ul>
                <p>
                  <span>7.4&nbsp;</span>
                  <b>
                    <span>Withdrawal of Consent</span>
                  </b>
                </p>
                <ul>
                  <li>
                    <p>
                      <span>
                        Entrants who have opted in to receive communications
                        from suppliers or third-party retailers retain the right
                        to withdraw their consent at any time. Suppliers must
                        honour any requests to unsubscribe or opt out within a
                        reasonable timeframe, not exceeding 1 day.
                      </span>
                    </p>
                  </li>
                </ul>
                <p>
                  <span>7.5&nbsp;</span>
                  <b>
                    <span>Breach of Policy</span>
                  </b>
                </p>
                <ul>
                  <li>
                    <p>
                      <span>
                        Any breach of this clause by a supplier or third-party
                        retailer may result in the termination of the
                        supplier&apos;s involvement with the Promoter, and the
                        Promoter reserves the right to take legal action or
                        report the breach to relevant data protection
                        authorities.
                      </span>
                    </p>
                  </li>
                </ul>
                {/* <p><br /></p> */}
                <hr />
                <p>
                  <br />
                </p>
                <p>
                  <strong>
                    <span>
                      By agreeing to participate in a raffle hosted by the
                      Promoter, the Supplier confirms that they have read,
                      understood, and agree to these Terms and Conditions.
                    </span>
                  </strong>
                </p>
              </div>
            </div>
          </Modal.Body>
        </div>
      </Modal>
    </div >
  );
};

export default Create;
