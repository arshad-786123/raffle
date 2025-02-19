import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import OwnerSidebar from '../../Components/Navbar/OwnerSidebar'
import { IRaffle } from '../../Utils/Interface/raffle.interface';
import { errorToast } from '../../Utils/Toast/error.toast';
import { Toaster } from 'react-hot-toast';
import { ICategory, getCategories } from '../../Services/Raffle/categories';
import { createRaffle, createRaffleAdmin } from '../../Services/Owner/createRaffle';
import { successToast } from '../../Utils/Toast/success.toast';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Modal, Radio } from 'flowbite-react';
import { log } from 'util';
import moment from 'moment';
import AdminSidebar from '../../Components/Navbar/AdminSidebar';
import { CONSTANT_DATA } from '../../constants';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export const initialFormData: IRaffle = {
    raffle_name: '',
    raffle_description: '',
    websites: '',
    images: [],
    existingImages: [],
    videos: [],
    category: '',
    isInstantPrize: false,
    instant_prizes: [],
    main_prizes: [{
        ticket_position: 1,
        prize_value: "",
        prize_name: "Prize Name"
    }],
    instant_prize: "",
    instant_value: "",
    instant_prize_position: "",
    main_prize_value: '',
    ticket_price: '',
    raffle_type: 'TIME',
    revenue_set_prize: '',
    start_date: '',
    ticket_set_prize: '',
    time_set_prize: '',
    winners: [],
    owner: '',
    isDraft: false,
    cronTime: "",
    currency: '',
    isApprovedByAdmin: false,
    isAlive: true,
    isSuspended: false,
    tcApproved: true,
    isEmailApproved: true,
    purchases: [],
    totalPurchasedTicket: 0,
    totalPurchasedTicketAmount: "",
    email: "",
    review: [],
    ratings: [],
    raffle_status: 0,
    result: {
        image: "",
        businessName: ""
    },
    ownerDetails: {
        image: "",
        businessName: ""
    },
    _id: "",
    createdAt: "",
    question: "", // Add this field
    correctAnswer: "", // Add this field
    answers: [], // Add this field
    isFreeRaffle: false,
    max_tickets_per_person: '0',
    selectedImage: null,
    bannerImage: "", // New field for banner image
    raffleCategoryType: " ",
    associatedLogo: ""
};

const AdminCreate = () => {

    const navigate = useNavigate();
    const params = useParams();
    const { state } = useLocation();
    const [imageUploaded, setImageUploaded] = useState(false);
    const [formData, setFormData] = useState<IRaffle>(initialFormData);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [videoUrls, setVideoUrls] = useState<string[]>([]);
    const fileInputBannerRef = useRef<HTMLInputElement>(null);
    const fileInputLogoRef = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState(false)
    const [categoryData, setCategoryData] = useState<ICategory[]>([])
    const [startDate, setStartDate] = useState(moment().add(1, 'days').format('YYYY-MM-DD'));
    const [endDate, setEndDate] = useState(moment().add(2, 'days').format('YYYY-MM-DD'));
    const [isTermsChecked, setIsTermsChecked] = useState(false);
    const [isGoingLiveChecked, setIsGoingLiveChecked] = useState(false);
    const [backgroundImageUrl, setBackgroundIImageUrls] = useState<string>();
    const [associatedLogoImageUrl, setassociatedLogoImageUrls] = useState<string>();


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
                        if (file.type.startsWith('image/')) {
                            newImages.push(file);
                            newImageUrls.push(URL.createObjectURL(file));
                        } else if (file.type.startsWith('video/')) {
                            newVideos.push(file);
                            newVideoUrls.push(URL.createObjectURL(file));
                        }
                    } else {
                        errorToast(`File ${file.name} is not a valid file type. Only jpeg, jpg, png, and mp4 are allowed.`);
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
                        bannerImage: file, // Store the file URL for preview
                    }));
                } else {
                    errorToast(`File ${file.name} is not a valid image. Only jpeg, jpg, and png are allowed.`);
                }
            } else {
                errorToast(`${file.name} exceeds the 50MB size limit.`);
            }
        }
    };


    const handleAssociatedImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (files && files.length > 0) {
            const file = files[0]; // Since we're only uploading one banner image
            const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50 MB
            const allowedFileTypes = /(\.jpeg|\.jpg|\.png)$/i; // Only allow image types

            if (file.size <= MAX_FILE_SIZE) {
                if (allowedFileTypes.test(file.name)) {
                    // If file is an image, create a URL for it
                    const fileUrl = URL.createObjectURL(file);
                    setassociatedLogoImageUrls(fileUrl)
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

    // Function to convert a date to UTC before saving, assuming the input date is in Europe/London timezone
    const convertToUTCBeforeSave = (date: any) => {
        return moment.tz(date, 'Europe/London').utc().format();
    };

    // Function to format a date from UTC for display in Europe/London timezone
    const formatDateForDisplay = (date: any) => {
        return moment.utc(date).tz('Europe/London').format('YYYY-MM-DDTHH:mm');
    };


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const cleanValue = value.replace(/£/g, '');
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    console.log('state?.item)', state?.item)
    useEffect(() => {
        if (state?.item) {
            const existingImages = state?.item?.images.map((image: string) => CONSTANT_DATA.IMAGE_BASE_URL + image);
            setImageUrls(existingImages);

            const existingVideoes = state?.item?.videos.map(
                (video: string) => CONSTANT_DATA.IMAGE_BASE_URL + video
            );
            setVideoUrls(existingVideoes);
            setBackgroundIImageUrls(CONSTANT_DATA.IMAGE_BASE_URL + state?.item?.bannerImage);
            setassociatedLogoImageUrls(CONSTANT_DATA.IMAGE_BASE_URL + state?.item?.associatedLogo);

            if (state?.item?.associatedLogo) {
                setImageUploaded(true);
            }

            // Convert UTC to UK Timezone
            let start_date = formatDateForDisplay(state?.item?.start_date);
            let time_set_prize = formatDateForDisplay(state?.item?.time_set_prize);

            setFormData({ ...state?.item, start_date: start_date, time_set_prize: time_set_prize });
        }
        d()
    }, [])

    // const d = async () => {
    //     const categ: any = await getCategories()
    //     setCategoryData(categ)
    // }


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
        const name = selectedOption.getAttribute('data-name');
        const type = selectedOption.getAttribute('data-type');
        setFormData((prev) => {
            return {
                ...prev,
                category: type
            }
        })
    }

    const handleSelectType = (e: any) => {
        const selectedOption = e.target.value;
        setFormData((prev) => {
            return {
                ...prev,
                raffle_type: selectedOption
            }
        })
    }
    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // const newStartDate = moment(e.target.value).tz('Etc/GMT-1').toISOString(); // Store as UTC
        // const newEndDate = moment(newStartDate).tz('Etc/GMT-1').add(1, 'days').toISOString();

        const newStartDate = moment(e.target.value).format('YYYY-MM-DDTHH:mm');
        const newEndDate = moment(newStartDate).add(1, 'days').format('YYYY-MM-DDTHH:mm');

        setStartDate(newStartDate);
        setEndDate(newEndDate);
        setFormData((prevData) => ({
            ...prevData,
            start_date: newStartDate,
            time_set_prize: newEndDate,
        }));
    };

    const handleUploadBannerClick = () => {
        fileInputBannerRef.current?.click(); // Trigger the file input click for banner image
    };

    const handleUploadAssociatedrClick = () => {
        fileInputLogoRef.current?.click(); // Trigger the file input click for banner image
    };


    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // const newEndDate = moment.tz(e.target.value, 'Etc/GMT-1').toISOString();
        const newEndDate = moment(e.target.value).format('YYYY-MM-DDTHH:mm');

        setEndDate(newEndDate);
        setFormData((prevData) => ({
            ...prevData,
            time_set_prize: newEndDate,
        }));
    };


    // Separate handler for ReactQuill
    const handleQuillChange = (value: string) => {
        const cleanValue = value.replace(/£/g, ''); // Remove '£' symbols
        setFormData((prevFormData) => ({
            ...prevFormData,
            raffle_description: value,
        }));
    };

    const formatDateForInput = (dateString: string) => {
        return dateString
            ? moment(dateString).tz('Europe/London').format('YYYY-MM-DDTHH:mm')
            : '';
    };


    const handleRaffleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;

        setFormData((prev) => ({
            ...prev,
            isFreeRaffle: value === "free" ? true : false,
            ticket_price: value === "free" ? "0" : prev.ticket_price,
        }));
    };

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
                        prize_name: `${newPrizeIndex}${getOrdinalSuffix(newPrizeIndex)} Prize Name`,
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

    const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };
    const handleRaffleCategoryTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevFormData: any) => ({
            ...prevFormData,
            raffleCategoryType: event.target.value as 'exclusive' | 'featured' | '',
        }));
    };

    const handleCorrectAnswerChange = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            // correctAnswer: prev.answers[index],
            correctAnswer: index.toString(),
        }));
    };
    const handleAnswerChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value } = e.target;
        const newAnswers = [...formData.answers];
        newAnswers[index] = value;
        setFormData((prev) => ({
            ...prev,
            answers: newAnswers
        }));
    };

    const handleAddAnswer = () => {
        setFormData((prev) => ({
            ...prev,
            answers: [...prev.answers, ""]
        }));
    };

    const handleRemoveAnswer = (index: number) => {
        const newAnswers = formData.answers?.filter((_, i) => i !== index);
        setFormData((prevFormData) => ({
            ...prevFormData,
            answers: newAnswers,
            correctAnswer: prevFormData.correctAnswer === formData.answers[index] ? '' : prevFormData.correctAnswer,
        }));
    };

    const handleTermsChange = (e: any) => {
        setIsTermsChecked(e.target.checked);
    };

    const handleGoingLiveChange = (e: any) => {
        setIsGoingLiveChecked(e.target.checked);
    };


    // SUBMIT
    const handleSubmit = async (isDraft: string) => {

        const areAllInstantPrizesFilled = () => {
            return formData.instant_prizes.every(prize =>
                prize.instant_position !== null &&
                prize.instant_prize !== "" &&
                prize.instant_value !== ""
            );
        };


        const areAllMainPrizesFilled = () => {
            return formData.main_prizes.every(prize =>
                prize.prize_value !== "" &&
                prize.prize_name !== ""
            );
        };


        try {
            if (formData.raffle_name == "") {
                return errorToast("Please enter the raffle name")
            }
            if (formData.raffle_description == "") {
                return errorToast("Please enter the raffle description")
            }
            if (formData.websites == "") {
                return errorToast("Please enter the Website")
            }


            if (!formData.category) {
                return errorToast("Please select the category")
            }

            // Validate the new fields
            // if (!formData.bannerImage) {
            //     return errorToast("Please upload a banner image");
            // }
            // if (!formData.raffleCategoryType) {
            //     return errorToast("Please select a raffle category type");
            // }
            if (!formData.max_tickets_per_person && formData.max_tickets_per_person !== '0') {
                return errorToast("Please fill the maximum tickets per person");
            }


            if (formData.isInstantPrize && !areAllInstantPrizesFilled()) {
                return errorToast("Please fill all the instant prizes");
            }

            if (!areAllMainPrizesFilled()) {
                return errorToast("Please fill the main prize")
            }


            if (!formData.ticket_price) {
                return errorToast("Please fill the ticket price")
            }
            if (
                (!formData.isFreeRaffle && parseFloat(formData.ticket_price) <= 0)
            ) {
                return errorToast("Ticket price must be greater then 0");
            }
            if (
                (
                    (!formData.isFreeRaffle && parseInt(formData.max_tickets_per_person) <= 0))
            ) {
                return errorToast("Max tickets per person must be greater than 0");
            }
            if (
                formData.isFreeRaffle &&
                parseInt(formData.max_tickets_per_person) !== 1
            ) {
                return errorToast("For Free Raffles, Max tickets per person must be 1");
            }


            if (!formData.raffle_type) {
                return errorToast("Please select the raffle type")
            }
            if (formData.raffle_type === "REVENUE") {
                if (formData.revenue_set_prize === "") {
                    return errorToast("You selected Revenue. Please enter the minimum revenue to close the raffle")
                }
                if (formData.revenue_set_prize < formData.ticket_price) {
                    return errorToast("The Ticket Price should be less than the Revenue prize")
                }

                const ticketCount = parseFloat(formData.revenue_set_prize) / parseFloat(formData.ticket_price);

                const findBiggestInstantTicketPosition = findMaxInstantValue(formData.instant_prizes)

                if (findBiggestInstantTicketPosition > ticketCount) {
                    return errorToast("Instant win ticket position is less than your official ticket count")
                }
            }
            if (
                (
                    (!formData.ticket_set_prize || parseInt(formData.ticket_set_prize) <= 0))
            ) {
                return errorToast("total tickets available must be greater than 0");
            }
            if (formData.raffle_type === "TIME" && (formData.start_date === "" || formData.time_set_prize === "")) {
                return errorToast("Please enter the start and end date to close the raffle");
            }
            if (formData.ticket_set_prize === "") {
                return errorToast("You selected Ticket. Please enter the minimum ticket to close the raffle")
            }

            if (formData.raffle_type === "TICKET") {

                const ticketCount = parseFloat(formData.ticket_set_prize);

                const findBiggestInstantTicketPosition = findMaxInstantValue(formData.instant_prizes)

                if (findBiggestInstantTicketPosition > ticketCount) {
                    return errorToast("Instant win ticket position is less than your official ticket count")
                }

            }
            if (formData.question === "") {
                return errorToast("Please enter the question");
            }
            if (formData.correctAnswer === "") {
                return errorToast("Please enter the correct answer");
            }
            if (!formData.answers || formData.answers.length === 0 || formData.answers.some(answer => answer === "")) {
                return errorToast("Please enter answers");
            }
            if (formData.raffleCategoryType === "exclusive" && formData.bannerImage === "") {
                return errorToast("Please select banner image");
            }

            if (formData.raffleCategoryType === "exclusive" && formData.associatedLogo === "") {
                return errorToast("Please select bussiness logo");
            }
            const fData = new FormData();

            fData.append("raffle_name", formData.raffle_name);
            fData.append('raffle_description', formData.raffle_description);
            fData.append('websites', formData.websites);

            formData.images?.forEach((image, index) => {
                if (typeof image === "string") return;
                fData.append(`images[${index}]`, image);
            });
            formData.videos?.forEach((video, index) => {
                if (typeof video === "string") return;
                fData.append(`videos[${index}]`, video);
            });

            fData.append("bannerImage", formData.bannerImage);
            fData.append("associatedLogo", formData.associatedLogo);
            fData.append("raffleCategoryType", formData.raffleCategoryType);

            fData.append("category", formData.category);
            fData.append("main_prize_value", formData.main_prize_value)
            fData.append("ticket_price", formData.ticket_price)
            fData.append("raffle_type", formData.raffle_type)
            // fData.append("raffle_status", formData.raffle_status)
            fData.append("instant_prizes", JSON.stringify(formData.instant_prizes))
            fData.append("main_prizes", JSON.stringify(formData.main_prizes))
            if (formData.raffle_type === "REVENUE") {
                fData.append("revenue_set_prize", formData.revenue_set_prize)
            }
            if (formData.raffle_type === "TIME") {
                // Save time uk timezone to utc
                fData.append("start_date", convertToUTCBeforeSave(formData.start_date));
                fData.append("time_set_prize", convertToUTCBeforeSave(formData.start_date));
            }
            if (formData.raffle_type === "TICKET") {
                fData.append("ticket_set_prize", formData.ticket_set_prize)
            }
            if (isDraft === "DRAFT") {
                fData.append("isDraft", "OK")
            }
            fData.append("question", formData.question);
            fData.append("correctAnswer", formData.correctAnswer);

            fData.append("answers", JSON.stringify(formData.answers));
            fData.append("max_tickets_per_person", formData.max_tickets_per_person.toString());

            setIsLoading(true)


            const a = await createRaffleAdmin(formData, state?.item, params.id)

            if (a) {

                successToast("Raffle Created Successfully!")
                navigate("/admin/raffles")
            }

            setIsLoading(false)

        } catch (error: any) {
            // console.log(error);

            errorToast(error.message)
            setIsLoading(false)
        }
    }


    const handleBack = () => {
        navigate("/admin/raffles")
    }

    const [instantOpen, setInstantOpen] = useState(false)
    const handleRemoveImage = (index: number) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            images: prevFormData.images?.filter((_, i) => i !== index),
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


        const a = formData.instant_prizes?.filter((_, index) => index !== i)

        setFormData({ ...formData, instant_prizes: a })
    }

    const handleRemoveInstantWinsMain = (i: number) => {
        const a = formData.main_prizes?.filter((_, index) => index !== i)
        setFormData({ ...formData, main_prizes: a })
    }



    return (
        <div className='flex  footer-manage' >
            <Toaster position='top-right' />
            <div className='hidden lg:block'>
                <AdminSidebar />
            </div>

            <div className='w-[100%] lg:w-[100%] mx-auto z-10 p-2 lg:p-10 duration-500' style={{ fontFamily: "poppins, sans-serif" }}>

                <div onClick={handleBack} className='flex items-center gap-2'>
                    <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.0871582 6.50472C0.0871582 6.36287 0.145596 6.2274 0.242813 6.1254L5.50166 0.813434C5.70938 0.60359 6.04566 0.604121 6.25285 0.813434C6.46056 1.02275 6.46056 1.36275 6.25285 1.57206L1.90031 5.96815H16.5559C16.8492 5.96815 17.0872 6.20828 17.0872 6.50472C17.0872 6.80115 16.8492 7.04128 16.5559 7.04128H1.90085L6.25285 11.4374C6.46056 11.6467 6.46003 11.9867 6.25285 12.196C6.04513 12.4053 5.70885 12.4053 5.50166 12.196L0.242813 6.88403C0.143471 6.78362 0.0887527 6.6455 0.0871582 6.50472Z" fill="black" fill-opacity="0.74" />
                    </svg>
                    <p className='text-gray-500 text-[14px]' style={{ cursor: "pointer" }}>
                        Back
                    </p>
                </div>
                <div className='block lg:flex justify-between items-start'>

                    <div className='w-[100%] lg:w-[48%]  h-fit '>
                        <div className={`bg-[#F9F0F0] h-fit ${imageUrls.length > 2 ? "" : "lg:h-[auto]"} rounded-md p-6 m-auto`}>
                            <h4 className='text-sm lg:text-md  font-bold tracking-wide'>Raffle Title</h4>
                            <input onChange={handleInputChange} className='p-3 outline-none border-none w-[100%] lg:w-[100%]' type="text" placeholder='Example: “A 5k Solar Panel Package for your Home!”' name="raffle_name" id="" value={formData.raffle_name} />



                            <div >
                                <h4 className='text-sm lg:text-md font-bold tracking-wide mt-6'>Description</h4>
                                <p className='text-xs block lg:hidden'>
                                    Describe your prize, tell the buyers exactly what they could win!
                                </p>

                                {/* ReactQuill editor */}
                                <ReactQuill
                                    value={formData.raffle_description}
                                    onChange={handleQuillChange} // Handle ReactQuill's input separately
                                    placeholder='Write about your raffle and why you are doing it. This could be a promotion or a new product launch!' style={{ resize: "none" }}
                                    className='custom-quill py-3 mt-2 lg:mt-0 outline-none border-none w-[100%] lg:w-[100%]'
                                />

                            </div>
                            <h4 className='text-sm lg:text-md  font-bold tracking-wide mt-6'>Add as many images or video of your prize as possible!</h4>
                            <div className='cursor-pointer grid grid-cols-2 gap-2 w-[100%] lg:w-[100%] mt-4 lg:mt-0'>

                                {imageUrls?.map((imageUrl, index) => (
                                    <div key={index} className="uploaded-image relative">
                                        <svg onClick={() => handleRemoveImage(index)} className='absolute right-10 top-3 cursor-pointer' width="25" height="25" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="75" cy="75" r="75" fill="#FF8787" />
                                            <path d="M75.4999 68.3336L99.2223 45L106 51.6667L82.2776 75.0002L106 98.3334L99.2223 105L75.4999 81.6668L51.7778 105L45 98.3334L68.7222 75.0002L45 51.6667L51.7778 45L75.4999 68.3336Z" fill="white" />
                                        </svg>
                                        <img src={imageUrl} alt={`Uploaded ${index + 1}`} style={{ width: '300px', height: '250px', borderRadius: '20px' }} />
                                    </div>
                                ))}
                                {videoUrls.map((videoUrl, index) => (
                                    <div key={index} className="uploaded-video relative">
                                        <video src={videoUrl} controls style={{ width: '300px', height: '250px', borderRadius: '20px' }} />
                                        <svg
                                            onClick={() => handleRemoveVideo(index)}
                                            className='absolute right-10 top-3 cursor-pointer'
                                            width="25"
                                            height="25"
                                            viewBox="0 0 150 150"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <circle cx="75" cy="75" r="75" fill="#FF8787" />
                                            <path d="M75.4999 68.3336L99.2223 45L106 51.6667L82.2776 75.0002L106 98.3334L99.2223 105L75.4999 81.6668L51.7778 105L45 98.3334L68.7222 75.0002L45 51.6667L51.7778 45L75.4999 68.3336Z" fill="white" />
                                        </svg>
                                    </div>
                                ))}
                                {(imageUrls.length + videoUrls.length) < 10 && (
                                    <div
                                        onClick={handleUploadClick}
                                        className="rounded-lg my-4 flex items-center justify-center bg-white py-8 px-4"
                                        style={{ height: "250px", minHeight: "250px" }} // Example height for centering
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


                            <ul className='font-normal text-xs text-gray-500' style={{ minHeight: "100px" }}>
                                <li className='mt-1'>Recommended image size: 630 x 470px</li>
                                <li className='mt-1'>Maximum file size: 50MB</li>
                                <li className='mt-1'>Supported file: JPEG, JPG, PNG and MP4</li>
                            </ul>
                            {formData.raffleCategoryType === "exclusive" && (
                                <>
                                    <h4 className="text-sm lg:text-md font-bold tracking-wide mt-2">
                                        Select exclusive Raffle background Image (Resolution: 1250 X 830)
                                    </h4>

                                    <div className="cursor-pointer grid grid-cols-2 gap-2 w-[100%] lg:w-[100%] mt-4 lg:mt-0 ">
                                        {/* Display Banner Image */}
                                        {formData.bannerImage && (
                                            <div className="uploaded-banner-image relative">
                                                <svg
                                                    onClick={() => {
                                                        setFormData((prevData) => ({
                                                            ...prevData,
                                                            bannerImage: "", // Reset banner image
                                                        }));
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
                                                        height: "250px",
                                                        borderRadius: "20px",
                                                    }}
                                                />
                                            </div>
                                        )}
                                        {/* Button to Upload New Image */}
                                        <div
                                            onClick={handleUploadBannerClick}
                                            className="rounded-lg my-4 flex items-center justify-center bg-white py-8 px-4"
                                            style={{ height: "250px", minHeight: "250px" }}
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
                                    </div>
                                </>
                            )}
                            {formData.raffleCategoryType === "exclusive" && (
                                <>
                                    <h4 className="text-sm lg:text-md font-bold tracking-wide mt-2">
                                        Upload Business Logo (Resolution: 287 X 37)
                                    </h4>

                                    <div className="cursor-pointer grid grid-cols-2 gap-2 w-[100%] lg:w-[100%] mt-4 lg:mt-0 mt-4">

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
                                                    src={associatedLogoImageUrl}
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
                                            {!imageUploaded && ( // Conditionally render the upload section
                                                <div
                                                    onClick={handleUploadAssociatedrClick}
                                                    className="rounded-lg my-4 flex items-center justify-center bg-white py-8 px-4"

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
                                                            ref={fileInputLogoRef}
                                                            accept="image/*"
                                                            style={{ display: "none" }}
                                                            onChange={handleAssociatedImageChange}
                                                            multiple={true}
                                                        />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}
                            <div className='w-[100%] mt-4'>
                                <h4 className='text-sm lg:text-md  font-medium tracking-wide'>Website</h4>
                                <input className='p-3 outline-none border-none w-[100%]' type="text" placeholder='www.zara.com' name="websites" value={formData?.websites} id="" onChange={handleInputChange} />
                            </div>

                        </div>
                        {!state?.item && <button onClick={() => {
                            handleSubmit("DRAFT")
                        }} className='hidden lg:block font-medium text-center border-2 border-[#000000] border-opacity-40 rounded-md w-full mt-6 p-4 '>Save to draft</button>
                        }
                    </div>

                    <div className={`w-[100%] lg:w-[48%] mt-4 lg:mt-0 m-auto h-fit ${formData.isInstantPrize || formData.main_prizes.length > 1 ? "lg:h-fit" : "lg:h-[auto]"}  `}>

                        <div className={`bg-[#F9F0F0] rounded-md p-6 m-auto w-[100%]    ${formData.instant_prizes.length > 1 ? "h-fit" : "h-[auto]"}`}>
                            <h4 className='text-sm lg:text-md  font-bold tracking-wide'>Prize Category</h4>
                            <div className='w-[100%] bg-white flex items-center justify-between'>
                                <select onChange={handleCategoryChange} id="countrySelect" className='p-3  border-none outline-none w-full cursor-pointer' value={formData.category}>
                                    {
                                        categoryData?.map((item, i) => (
                                            <>
                                                <option data-name={item?.category_name} data-type={item?.type} value={item?.type} className='text-start'>{item?.category_name}
                                                </option>
                                            </>
                                        ))
                                    }
                                </select>
                            </div>

                            <div className="my-8">
                                <div className="block md:flex" style={{ alignItems: "center" }}>
                                    <h4 className="text-sm lg:text-md font-bold tracking-wide">
                                        Raffle Category Type:{" "}
                                    </h4>
                                    <div className="ml-0 md:ml-5 mt-4 md:mt-0 ">
                                        <label>
                                            <input
                                                type="radio"
                                                name="raffleCategoryType"
                                                value="none"
                                                checked={formData.raffleCategoryType === "none"}
                                                onChange={handleRaffleCategoryTypeChange}
                                            />
                                            <span className="ml-2">Standard</span>
                                        </label>
                                        <label className="ml-2">
                                            <input
                                                type="radio"
                                                name="raffleCategoryType"
                                                value="exclusive"
                                                checked={formData.raffleCategoryType === "exclusive"}
                                                onChange={handleRaffleCategoryTypeChange}
                                            />
                                            <span className="ml-2">Exclusive</span>
                                        </label>
                                        <label className="ml-2">
                                            <input
                                                type="radio"
                                                name="raffleCategoryType"
                                                value="featured"
                                                checked={formData.raffleCategoryType === "featured"}
                                                onChange={handleRaffleCategoryTypeChange}
                                            />
                                            <span className="ml-2">Featured</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="my-8" >
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <h4 className='text-sm lg:text-md font-bold tracking-wide'>Raffle Type : </h4>
                                    <div className='ml-5'>
                                        <label>
                                            <input
                                                type="radio"
                                                name="raffleType"
                                                value="paid"
                                                checked={!formData.isFreeRaffle}
                                                onChange={handleRaffleTypeChange}
                                            />
                                            <span className='ml-3'>Paid Tickets</span>

                                        </label>
                                        <label className='ml-5'>
                                            <input
                                                type="radio"
                                                name="raffleType"
                                                value="free"
                                                checked={formData.isFreeRaffle}
                                                onChange={handleRaffleTypeChange}
                                            />
                                            <span className='ml-3'>Free Tickets</span>

                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className='flex items-center gap-2 w-[100%] mt-4'>
                                <div className='w-[100%]'>
                                    <h4 className='text-sm lg:text-sm lg:text-md   font-bold tracking-wide'>List your prizes (up to 10)</h4>
                                </div>
                            </div>
                            {<>
                                {
                                    formData.main_prizes.map((item, i) => (
                                        <div className='block lg:flex items-center gap-2 w-[100%] mt-4'>
                                            {/* <h4 className='w-[30%]'>{i + 1} Prize</h4> */}

                                            <input
                                                onChange={(e) =>
                                                    handleMainPrizeChange(i, { name: e.target.name, value: e.target.value })
                                                }
                                                className='p-3 outline-none border-none w-[100%] bg-[#FFFFFF] mt-4 lg:mt-0'
                                                type="text"
                                                placeholder='Prize Name'
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

                                            {
                                                formData.main_prizes.length > 1 &&
                                                <svg onClick={() => handleRemoveInstantWinsMain(i)} width="30" height="30" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="75" cy="75" r="75" fill="#FF8787" />
                                                    <path d="M75.4999 68.3336L99.2223 45L106 51.6667L82.2776 75.0002L106 98.3334L99.2223 105L75.4999 81.6668L51.7778 105L45 98.3334L68.7222 75.0002L45 51.6667L51.7778 45L75.4999 68.3336Z" fill="white" />
                                                </svg>
                                            }
                                        </div>
                                    ))
                                }
                                <div className='hidden lg:block'>
                                    <p className='text-[#F66E6A] font-xs text-sm mt-2 cursor-pointer' onClick={handleAddMoreMain}>Add Prize +</p>
                                </div>
                            </>}



                            {!formData.isFreeRaffle && (
                                // <div className='w-[100%] mt-4'>
                                //     <h4 className='text-sm lg:text-md font-bold tracking-wide'>Ticket Price</h4>
                                //     <input
                                //         onChange={handleInputChange}
                                //         className='p-3 outline-none border-none w-[100%]'
                                //         type="text"
                                //         placeholder='Value'
                                //         name="ticket_price"
                                //         // Display the £ symbol in the input field
                                //         value={`£${formData?.ticket_price || ''}`}
                                //     />
                                // </div>
                                <>
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
                                </>
                            )}
                            <div className='w-[100%] mt-4'>
                                <h4 className='text-sm lg:text-md font-bold tracking-wide'>Maximum Tickets Per Person</h4>
                                <input
                                    onChange={handleInputChange}
                                    className='p-3 outline-none border-none w-[100%]'
                                    type="number"
                                    placeholder='Maximum Tickets'
                                    name="max_tickets_per_person"
                                    value={formData?.max_tickets_per_person}
                                />
                            </div>

                            <h4 className='text-sm lg:text-sm lg:text-md   font-bold tracking-wide mt-4'>Choose how the raffles closes</h4>
                            <div className='w-[100%] bg-white flex items-center  justify-between mt-2'>
                                <select onChange={handleSelectType} id="countrySelect" className='p-3  border-none outline-none w-full cursor-pointer'>
                                    <option value="TIME" className='text-start'>Time</option>
                                </select>
                            </div>

                            <div className='flex flex-col lg:flex-row items-center gap-2 w-[100%] mt-4'>
                                <div className='w-[100%] lg:w-1/2'>
                                    <h4 className='text-sm lg:text-md font-bold tracking-wide'>Start date and Time</h4>
                                    <input
                                        onChange={handleStartDateChange}
                                        className='p-3 outline-none border-none w-[100%]'
                                        type="datetime-local"
                                        name="start_date"
                                        value={formData?.start_date}
                                    // min={moment().add(1, 'days').format('YYYY-MM-DDTHH:mm')}
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
                                    // min={moment(startDate).add(1, 'days').format('YYYY-MM-DDTHH:mm')}
                                    />
                                </div>
                            </div>

                            <div className='hidden lg:flex items-center gap-2 w-[100%] mt-4'>
                                <div className='w-[100%]'>
                                    <h4 className='text-sm lg:text-md font-bold tracking-wide'>Total Tickets Available</h4>
                                    <input onChange={handleInputChange} className='p-3 outline-none border-none w-[100%]' type="text" placeholder='Value' name="ticket_set_prize" value={formData.ticket_set_prize} />
                                </div>
                            </div>


                            <div className="mb-4">
                                <h4 className='text-sm lg:text-sm lg:text-md   font-bold tracking-wide mt-4'>Add a simple question for people to enter</h4>
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
                                <h4 className='text-sm lg:text-sm lg:text-md   font-bold tracking-wide mt-4'>Add answer (add a minimum of 3 possible answers)</h4>
                                {formData?.answers?.map((answer, index) => {
                                    return (
                                        <div key={index} className="mb-2" style={{ display: "flex", alignItems: "center" }}>
                                            <input
                                                type="text"
                                                value={answer}
                                                onChange={(e) => handleAnswerChange(index, e)}
                                                className="p-3 outline-none border-none w-[100%]"
                                            />
                                            <input
                                                type="checkbox"
                                                name="correctAnswer"
                                                checked={formData.correctAnswer.toString() == index.toString()}
                                                className="h-10 p-5 ms-3 w-6 bg-gray-200 border-gray-300 rounded"
                                                onChange={() => handleCorrectAnswerChange(index)}
                                                value={formData?.correctAnswer}
                                            />

                                            {formData.answers.length > 1 && (
                                                <svg onClick={() => handleRemoveAnswer(index)} width="30" height="30" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg" className='p-2'>
                                                    <circle cx="75" cy="75" r="75" fill="#FF8787" />
                                                    <path d="M75.4999 68.3336L99.2223 45L106 51.6667L82.2776 75.0002L106 98.3334L99.2223 105L75.4999 81.6668L51.7778 105L45 98.3334L68.7222 75.0002L45 51.6667L51.7778 45L75.4999 68.3336Z" fill="white" />
                                                </svg>
                                            )}
                                        </div>
                                    )
                                })}

                                <div className='hidden lg:block'>
                                    <p className='text-[#F66E6A] font-xs text-sm mt-2 cursor-pointer' onClick={handleAddAnswer}>+ Add Answer</p>
                                </div>
                            </div>
                        </div>
                        <br />
                        {!state?.item && <div className='bg-[#F9F0F0] rounded-md p-6 m-auto w-[100%] h-[48%]'>
                            <div>
                                <h4 className='font-[700] text-[17px] text-[#000000] text-opacity-45'>Terms and conditions</h4>
                                <div className='flex items-center gap-4'>
                                    <input
                                        type="checkbox"
                                        id="terms"
                                        checked={isTermsChecked}
                                        onChange={handleTermsChange}
                                    />
                                    <p className='font-[400] text-[13px] mt-4'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

                                </div>
                            </div>
                        </div>}
                        <button onClick={() => {
                            handleSubmit("NO_DRAFT")
                        }} className='font-medium text-white text-center bg-[#FF6A78] rounded-md w-full mt-6 p-4 '>{state?.item ? "Update Raffle" : "Submit Raffle"}</button>
                        <button onClick={() => {
                            handleSubmit("DRAFT")
                        }} className='block lg:hidden font-medium text-center border-2 border-[#000000] border-opacity-40 rounded-md w-full mt-6 p-4 '>Save to draft</button>
                    </div>
                </div>
            </div>
            <Modal
                className='bg-[#160B3A]'
                position="center"
                show={isLoading}
                popup
            >
                <div className='rounded-md'>
                    <Modal.Header className='bg-white  rounded-t-md' />

                    <Modal.Body className="bg-white text-secondary  h-full xs:h-auto rounded-b-md" style={{ fontFamily: "poppins, sans-serif" }}>
                        <div className='flex flex-col justify-center items-center'>

                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
                                <radialGradient id="a11" cx=".66" fx=".66" cy=".3125" fy=".3125" gradientTransform="scale(1.5)">
                                    <stop offset="0" stop-color="#FF6A78"></stop>
                                    <stop offset=".3" stop-color="#FF6A78" stop-opacity=".9"></stop>
                                    <stop offset=".6" stop-color="#FF6A78" stop-opacity=".6"></stop>
                                    <stop offset=".8" stop-color="#FF6A78" stop-opacity=".3"></stop>
                                    <stop offset="1" stop-color="#FF6A78" stop-opacity="0"></stop>
                                </radialGradient>
                                <circle transform-origin="center" fill="none" stroke="url(#a11)" stroke-width="8" stroke-linecap="round" stroke-dasharray="100 500" stroke-dashoffset="0" cx="50" cy="50" r="35">
                                    <animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="2" values="360;0" keyTimes="0;1" keySplines="0 0 1 1" repeatCount="indefinite"></animateTransform>
                                </circle>
                                <circle transform-origin="center" fill="none" opacity=".2" stroke="#FF6A78" stroke-width="8" stroke-linecap="round" cx="50" cy="50" r="35"></circle>
                            </svg>

                            <h6 className='mt-2 font-bold text-xl tracking-wide' style={{ fontFamily: "poppins, sans-serif", color: "black" }}>Please wait!</h6>
                            <h4 className='mt-2 font-bold text-xl tracking-wide' style={{ fontFamily: "poppins, sans-serif", color: "black" }}>Raffle is Creating</h4>

                        </div>

                    </Modal.Body>

                </div>
            </Modal>
        </div >
    )
}

export default AdminCreate