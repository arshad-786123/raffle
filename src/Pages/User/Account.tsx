import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import UserSidebar from "../../Components/Navbar/UserSidebar";
import { Country, getCountries } from "../../Services/General/countries";
import { getUserData } from "../../Services/Authentication/getUserData";
import { errorToast } from "../../Utils/Toast/error.toast";
import { User } from "../../Utils/Interface/Customer";
import {
    deleteCardUser,
    updateCardUser,
    updateUser,
} from "../../Services/Authentication/updateUser";
import { CONSTANT_DATA } from "../../constants";
import { successToast } from "../../Utils/Toast/success.toast";
import { Modal } from "flowbite-react";
import OTPInput from "react-otp-input";
import { sendOTP } from "../../Services/Authentication/sendOTP";
import { verifyUser } from "../../Services/Authentication/verifyUser";
import { forgotPassword } from "../../Services/Authentication/forgotPassword";
import { Toaster } from "react-hot-toast";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import {
    formatCreditCardNumber,
    formatCVC,
    formatExpirationDate,
    formatFormData,
} from "../Owner/utils";
import noimage from "../../assets/no-image.png";

interface UserAccountProps {
    setSelectedImageForNavbar: (imageUrl: string | null) => void;
}


const UserAccount: React.FC<UserAccountProps> = ({
    setSelectedImageForNavbar,
}) => {
    const [selectedImage, setSelectedImage] = useState<any>(null);

    const [userDetails, setUserDetails] = useState<User>({
        _id: "",
        firstname: "",
        lastname: "",
        email: "",
        role: "",
        dialCode: {
            country: "",
            code: "",
            dial_code: "",
        },
        phone: "",
        landline: '',
        referralCode: "",
        businessName: "",
        businessAddress: "",
        businessEmailNote: "",
        businessEmailVerify: "",
        description: "",
        VATNumber: "",
        companyNumber: "",
        image: null,
        websites: "",
        companyName: "",
        createdAt: "",
        wallet: {
            _id: "",
            cardDetails: [],
            balance: "",
            revenue: [],
            profits: "",
            userID: "",
            createdAt: "",
            updatedAt: "",
        },
        country: "",
        city: "",
        address: "",
        region: "",
        postcode: "",
    });
    const fileInputRef = useRef<HTMLInputElement>(null);


    const validateFields = () => {

        if (!userDetails.firstname) {
            errorToast("Please Enter a firstname");
            return false;
        }
        if (!userDetails.lastname) {
            errorToast("Please Enter a firstname");
            return false;
        }
        if (!userDetails.phone) {
            errorToast("Please Enter a Phone Number");
            return false;
        }
        if (!userDetails.address) {
            errorToast("Please Enter a Adress");
            return false;
        }
        if (!userDetails.region) {
            errorToast("Please Enter a town");
            return false;
        }
        if (!userDetails.city) {
            errorToast("Please Enter a County");
            return false;
        }
        if (!userDetails.postcode) {
            errorToast("Please Enter a Postcode");
            return false;
        }



        return true;
    };


    useEffect(() => {
        setSelectedImageForNavbar(selectedImage);
    }, [selectedImage, setSelectedImageForNavbar]);

    // const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    //     if (e.target.files && e.target.files[0]) {
    //         const imageUrl = URL.createObjectURL(e.target.files[0]);
    //         setSelectedImage(imageUrl);
    //         localStorage.setItem("selectedImage", imageUrl);

    //         // Update userDetails state
    //         setUserDetails({ ...userDetails, image: e.target.files[0] });

    //         // Update the image value in persist:root
    //         const persistedData = localStorage.getItem("persist:root");
    //         if (persistedData) {
    //             const parsedData = JSON.parse(persistedData);
    //             let userData = JSON.parse(parsedData.user);

    //             // Update the image value
    //             userData.user.image = imageUrl;

    //             // Update the parsed data
    //             parsedData.user = JSON.stringify(userData);

    //             // Save the updated data back to localStorage
    //             localStorage.setItem("persist:root", JSON.stringify(parsedData));
    //         }
    //     }
    // };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const imageUrl = URL.createObjectURL(e.target.files[0]);
            setSelectedImage(imageUrl); // Set blob URL for preview
            setUserDetails({ ...userDetails, image: e.target.files[0] }); // Store file in userDetails

            // Temporarily update blob URL in localStorage for immediate preview
            localStorage.setItem("selectedImage", imageUrl);
        }
    };

    useEffect(() => {
        const persistedData = localStorage.getItem("persist:root");
        if (persistedData) {
            const parsedData = JSON.parse(persistedData);
            const userData = JSON.parse(parsedData.user);
            setUserDetails(userData.user);
            setSelectedImage(userData.user?.image);
        }
    }, []);
    useEffect(() => {
        setSelectedImageForNavbar(selectedImage);
    }, [selectedImage, setSelectedImageForNavbar]);

    const [countriesData, setCountriesData] = useState<Country[]>([]);

    useEffect(() => {
        const countries = async () => {
            const result = await getCountries();
            const userData = await getUserData();
            setUserDetails(userData.result);

            setCountriesData(result);
        };
        countries();
    }, []);

    const handleSelectDialCode = (e: any): void => {
        const selectedOption = e.target.selectedOptions[0];
        const name = selectedOption.getAttribute("data-name");
        const dialCode = selectedOption.getAttribute("data-dialcode");
        const code = selectedOption.getAttribute("data-code");
        setUserDetails({
            ...userDetails,
            dialCode: {
                dial_code: dialCode,
                code: code,
                country: name,
            },
        });
    };

    const convertToFormData = (user: User): FormData => {
        const formData = new FormData();

        formData.append("_id", user._id);
        formData.append("firstname", user.firstname);
        formData.append("lastname", user.lastname);
        formData.append("email", user.email);
        formData.append("role", user.role);
        // formData.append("dialCode[country]", user.dialCode.country);
        // formData.append("dialCode[code]", user.dialCode.code);
        // formData.append("dialCode[dial_code]", user.dialCode.dial_code);
        formData.append("phone", user.phone);
        formData.append("referralCode", user.referralCode);
        formData.append("businessName", user.businessName);
        formData.append("businessAddress", user.businessAddress);
        formData.append("businessEmailNote", user.businessEmailNote);
        formData.append("businessEmailVerify", user.businessEmailVerify);
        formData.append("description", user.description);
        formData.append("VATNumber", user.VATNumber);
        formData.append("companyNumber", user.companyNumber);
        formData.append("websites", user.websites);

        if (user?.image) {
            formData.append("image", user?.image);
        }

        if (user.wallet) {
            formData.append("wallet[_id]", user.wallet._id);
            formData.append("wallet[balance]", user.wallet.balance);
            formData.append("wallet[profits]", user.wallet.profits);
            formData.append("wallet[userID]", user.wallet.userID);
            formData.append("wallet[createdAt]", user.wallet.createdAt);
            formData.append("wallet[updatedAt]", user.wallet.updatedAt);

            user.wallet.cardDetails.forEach((detail: any, index: any) => {
                formData.append(`wallet[cardDetails][${index}]`, detail);
            });

            user.wallet.revenue.forEach((revenue: any, index: any) => {
                formData.append(`wallet[revenue][${index}]`, revenue);
            });
        }

        formData.append("country", user.country);
        formData.append("city", user.city);
        formData.append("postcode", user.postcode);
        formData.append("address", user.address);
        formData.append("region", user.region);

        return formData;
    };

    const handleChange = (e: any) => {
        setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (!validateFields()) return;
        try {
            const formData = convertToFormData(userDetails);
            console.log("formData", userDetails);
            const res = await updateUser(formData);
            if (!res.success) {
                return errorToast(res.message);
            } else {
                successToast("User Updated Successfully!");
                console.log("RES", res);

                const updatedImageUrl = res?.result?.image;

                // Update `userDetails` with the actual image URL
                setUserDetails({ ...userDetails, image: updatedImageUrl });
                setSelectedImage(updatedImageUrl);

                // Update `localStorage` with the actual image URL
                const persistedData = localStorage.getItem("persist:root");
                if (persistedData) {
                    const parsedData = JSON.parse(persistedData);
                    let userData = JSON.parse(parsedData.user);

                    userData.user.image = updatedImageUrl;
                    parsedData.user = JSON.stringify(userData);

                    localStorage.setItem("persist:root", JSON.stringify(parsedData));
                    localStorage.setItem("selectedImage", updatedImageUrl); // Update for image preview
                }
            }
        } catch (error: any) {
            console.log(">>>Error", error.message);

            errorToast(error.message);
        }
    };
    useEffect(() => {
        const persistedData = localStorage.getItem("persist:root");
        if (persistedData) {
            const parsedData = JSON.parse(persistedData);
            const userData = JSON.parse(parsedData.user);

            setUserDetails(userData.user);

            // Show the actual image URL or fallback to blob for preview
            const storedImage = localStorage.getItem("selectedImage");
            setSelectedImage(storedImage || userData.user?.image);
        }
    }, []);

    const [isResetPassword, setIsResetPassword] = useState(false);
    const [isOTPVerified, setIsOTPVerified] = useState(false);
    const [otp, setOtp] = useState("");

    const onClose = (): void => {
        setIsResetPassword(false);
    };

    const [userData, setUserData] = useState({
        email: "",
        code: "",
        type: "RESET_PASSWORD_UPDATE",
        oldPassword: "",
        newPassword: "",
        newConfirmPassword: "",
    });

    const handleChangeReset = (e: any) => {
        setUserData((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    const handleSendOTP = async () => {
        setIsResetPassword(true);
        try {
            const a = await sendOTP(userDetails);
            if (a.success) {
                successToast("Mail sent successfully!");
            } else {
                errorToast(a.message);
            }
        } catch (error: any) {
            errorToast(error.message);
        }
    };

    const handleVerifyOTP = async () => {
        try {
            if (!otp) {
                return errorToast("Please fill the OTP");
            }
            setUserData({ ...userData, email: userDetails.email, code: otp });
            const a = await verifyUser(userData);
            if (a.success) {
                successToast("User Verified!");
                setIsOTPVerified(true);
            } else {
                errorToast(a.message);
            }
        } catch (error: any) {
            errorToast(error.message);
        }
    };

    const handleSubmitReset = async () => {
        try {
            if (userData.newPassword !== userData.newConfirmPassword) {
                return errorToast("Password Mismatch");
            }
            const a = await forgotPassword(userData);
            if (a.success) {
                successToast("Password Updated!");
                setIsResetPassword(false);
            } else {
                errorToast(a.message);
            }
        } catch (error: any) {
            errorToast(error.message);
        }
    };

    const [isCardOpened, setIsCardOpened] = useState(false);

    const [state, setState] = useState({
        number: "",
        name: "",
        expiry: "",
        cvc: "",
        issuer: "",
        focused: undefined,
        formData: null,
        _id: "",
        isEditMode: false,
    });

    const formRef = useRef(null);

    const handleCallback = ({ issuer }: any, isValid: any) => {
        if (isValid) {
            setState((prevState) => ({ ...prevState, issuer }));
        }
    };

    const handleInputFocus = ({ target }: any) => {
        setState((prevState) => ({
            ...prevState,
            focused: target.name,
        }));
    };

    const handleInputChange = ({ target }: any) => {
        let value = target.value;

        if (target.name === "number") {
            value = formatCreditCardNumber(value);
        } else if (target.name === "expiry") {
            value = formatExpirationDate(value);
        } else if (target.name === "cvc") {
            value = formatCVC(value);
        }
        setState((prevState) => ({
            ...prevState,
            _id: userDetails._id,
            [target.name]: value,
        }));
    };

    const handleSubmitCard = async (e: any) => {
        try {
            e.preventDefault();
            const obj = { ...state, _id: userDetails._id };
            const res = await updateCardUser(obj);
            if (!res.success) {
                return errorToast(res.message);
            } else {
                setState({
                    number: "",
                    name: "",
                    expiry: "",
                    cvc: "",
                    issuer: "",
                    focused: undefined,
                    formData: null,
                    _id: userDetails._id,
                    isEditMode: true,
                });
                setIsCardOpened(false);
                const userData = await getUserData();
                setUserDetails(userData.result);
                return successToast("Card Updated Successfully!");
            }
        } catch (error: any) {
            errorToast(error.message);
        }
    };

    const { name, number, expiry, cvc, focused, issuer, formData } = state;

    // const handleCardEdit = (item: any, i: any) => {
    //     setState(item);
    //     setIsCardOpened(true);
    // };

    const handleCardEdit = (item: any, i: any) => {
        setState({
            ...state,
            number: item.number,
            name: item.name,
            expiry: item.expiry,
            cvc: item.cvc,
            issuer: item.issuer,
            isEditMode: true, // Set to true when editing
        });
        setIsCardOpened(true);
    };

    const handleCardDelete = async (item: any) => {
        try {
            const obj = { ...state, ...item };
            const res = await deleteCardUser(obj);
            if (!res.success) {
                return errorToast(res.message);
            } else {
                setState({
                    number: "",
                    name: "",
                    expiry: "",
                    cvc: "",
                    issuer: "",
                    focused: undefined,
                    formData: null,
                    _id: userDetails._id,
                    isEditMode: false,
                });
                setIsCardOpened(false);
                const userData = await getUserData();
                setUserDetails(userData.result);
                return successToast("Card Updated Successfully!");
            }
        } catch (error: any) {
            errorToast(error.message);
        }
    };

    const handleNewCard = () => {
        setState({
            number: "",
            name: "",
            expiry: "",
            cvc: "",
            issuer: "",
            focused: undefined,
            formData: null,
            _id: userDetails._id,
            isEditMode: false,
        });
        setIsCardOpened(true);
    };

    const [visible, setVisible] = useState({
        oldPassword: false,
        newPassword: false,
        confirmNewPassword: false,
    });

    console.log(
        "CONSTANT_DATA?.BASE_URL + userDetails?.image",
        CONSTANT_DATA?.BASE_URL + userDetails?.image
    );
    console.log("selectedImage", selectedImage);

    return (
        <div className="flex footer-manage" >
            <Toaster position="top-right" />
            <div className="hidden lg:block">
                <UserSidebar />
            </div>

            <div className="w-[98%] lg:w-[100%] mx-auto z-10 p-4 lg:p-10 duration-500" style={{ fontFamily: "poppins, sans-serif" }}>
                <div className="w-[100%] m-auto">
                    <h3>My Account</h3>
                    <div className="border-[#FF6A78] border-[1px]"></div>
                    <br />
                    <div className="bg-[#F9F0F0] p-2 lg:p-8 ">
                        <div className="flex items-center gap-4">
                            <div>
                                {selectedImage ? (
                                    selectedImage.startsWith("blob") ? (
                                        <img
                                            src={selectedImage}
                                            alt="Selected"
                                            className="image-preview w-24 h-24 border-2 rounded-[100%] object-cover"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.onerror = null;
                                                target.src = noimage;
                                            }}
                                        />
                                    ) : (
                                        <img
                                            src={CONSTANT_DATA.BASE_URL + selectedImage}
                                            alt="Selected"
                                            className="image-preview w-24 h-24 border-2 rounded-[100%] object-cover"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.onerror = null;
                                                target.src = noimage;
                                            }}
                                        />
                                    )
                                ) : (
                                    (() => {
                                        const storedImage = localStorage.getItem("selectedImage");
                                        return (
                                            <>
                                                {userDetails?.image ? (
                                                    <img
                                                        src={CONSTANT_DATA?.BASE_URL + userDetails?.image}
                                                        alt="Selected"
                                                        className="image-preview w-24 h-24 border-2 rounded-[100%]"
                                                    />
                                                ) : (
                                                    <svg
                                                        width="98"
                                                        height="94"
                                                        viewBox="0 0 98 94"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <ellipse
                                                            cx="48.7691"
                                                            cy="46.7292"
                                                            rx="48.3301"
                                                            ry="46.5125"
                                                            fill="white"
                                                        />
                                                        <g clipPath="url(#clip0_235_2883)">
                                                            <path
                                                                d="M48.4445 46.3785C50.5919 46.3785 52.4515 45.6596 53.9709 44.2413C55.4903 42.8232 56.2605 41.0881 56.2605 39.0835C56.2605 37.0797 55.4903 35.3443 53.9706 33.9258C52.451 32.5079 50.5917 31.7891 48.4445 31.7891C46.2967 31.7891 44.4377 32.5079 42.9183 33.926C41.3989 35.3441 40.6284 37.0795 40.6284 39.0835C40.6284 41.0881 41.3989 42.8234 42.9185 44.2415C44.4381 45.6594 46.2975 46.3785 48.4445 46.3785Z"
                                                                fill="#C2C2C2"
                                                            />
                                                            <path
                                                                d="M62.1203 55.0784C62.0765 54.4882 61.9879 53.8444 61.8574 53.1646C61.7257 52.4797 61.5561 51.8323 61.3531 51.2405C61.1434 50.6288 60.8582 50.0248 60.5056 49.446C60.1397 48.8452 59.7099 48.3221 59.2276 47.8916C58.7233 47.4412 58.1059 47.0791 57.3919 46.815C56.6803 46.5523 55.8918 46.4192 55.0483 46.4192C54.717 46.4192 54.3967 46.546 53.778 46.922C53.3972 47.1538 52.9518 47.4218 52.4546 47.7183C52.0296 47.9711 51.4537 48.2079 50.7424 48.4223C50.0484 48.6319 49.3438 48.7382 48.6484 48.7382C47.9529 48.7382 47.2486 48.6319 46.5539 48.4223C45.8433 48.2081 45.2675 47.9713 44.8429 47.7185C44.3504 47.4248 43.9048 47.1568 43.5183 46.9218C42.9004 46.5458 42.5798 46.4189 42.2485 46.4189C41.4047 46.4189 40.6165 46.5523 39.9052 46.8152C39.1916 47.0789 38.5739 47.441 38.0691 47.8918C37.5871 48.3225 37.1571 48.8454 36.7916 49.446C36.4393 50.0248 36.1541 50.6286 35.9442 51.2407C35.7414 51.8325 35.5718 52.4797 35.4401 53.1646C35.3096 53.8435 35.221 54.4875 35.1772 55.0791C35.1341 55.6586 35.1123 56.2601 35.1123 56.8676C35.1123 58.4486 35.6508 59.7285 36.7126 60.6724C37.7614 61.6038 39.1491 62.0764 40.8366 62.0764H56.4617C58.1492 62.0764 59.5364 61.6041 60.5854 60.6724C61.6475 59.7292 62.186 58.449 62.186 56.8673C62.1857 56.2571 62.1637 55.6551 62.1203 55.0784Z"
                                                                fill="#C2C2C2"
                                                            />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_235_2883">
                                                                <rect
                                                                    width="32.4505"
                                                                    height="30.2872"
                                                                    fill="white"
                                                                    transform="translate(32.4502 31.7891)"
                                                                />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                )}
                                            </>
                                        );
                                    })()
                                )}
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                ref={fileInputRef}
                                style={{ display: "none" }}
                            />
                            <p
                                onClick={() => fileInputRef.current?.click()}
                                className="text-[#F66E6A] border-b-[1px] border-[#F66E6A] cursor-pointer"
                            >
                                Add profile picture
                            </p>
                        </div>
                        <br />
                        <div className="grid lg:flex items-center gap-2 w-[100%] lg:w-[95%] mt-4 image-space">
                            <div className="w-[100%]">
                                <h4 className="text-md font-medium tracking-wide">First Name</h4>
                                <div className="flex items-center gap-2">
                                    <input
                                        className={`p-3 outline-none rounded-md border w-[100%] ${!userDetails.firstname.trim() ? "border-red-500" : "border-gray-300"
                                            }`}
                                        onChange={handleChange}
                                        type="text"
                                        placeholder="Enter the name"
                                        name="firstname"
                                        value={userDetails?.firstname}
                                        id=""
                                    />

                                </div>
                            </div>
                            <div className="w-[100%] ">
                                <h4 className="text-md font-medium tracking-wide">
                                    Last Name
                                </h4>
                                <div className="flex gap-1">
                                    <input onChange={handleChange} className='p-3 outline-none rounded-md border-none w-[100%]' type="text" placeholder='Enter the name' name="lastname" value={userDetails?.lastname} id="" />
                                </div>
                            </div>

                        </div>


                        <div className="grid lg:flex items-start gap-2 w-[100%] lg:w-[95%] mt-4 lg:mt-8">
                            <div className="w-[100%]">
                                <h4 className="text-md font-medium tracking-wide">
                                    Email Address
                                </h4>
                                <input
                                    className="p-3 rounded-md outline-none border-none w-[100%] text-gray-400"
                                    type="email"
                                    placeholder="raffly@gmail.com"
                                    name="email"
                                    value={userDetails?.email}
                                    id=""
                                />
                            </div>
                            <div className="w-[100%]">
                                <h4 className="text-md font-medium tracking-wide">Password</h4>
                                <input
                                    className="p-3 rounded-md outline-none border-none w-[100%]"
                                    type="password"
                                    placeholder="Password"
                                    value="**************"
                                    name=""
                                    id=""
                                />
                                <p
                                    onClick={handleSendOTP}
                                    className="mt-2 text-sm font-medium tracking-wide border-b-[1px] border-[#FF5F5F] w-fit text-[#FF5F5F] cursor-pointer"
                                >
                                    Reset Password
                                </p>
                            </div>
                        </div>
                        <div className="grid lg:flex items-center gap-2 w-[100%] lg:w-[95%] mt-4 lg:mt-8">
                            <div className="w-[100%] ">
                                <h4 className="text-md font-medium tracking-wide">
                                    Phone Number
                                </h4>
                                <div className="flex gap-1">
                                    <input
                                        className="p-3 outline-none rounded-md border-none w-[100%]"
                                        type="text"
                                        placeholder="Phone number"
                                        name="phone"
                                        value={userDetails?.phone}
                                        onChange={handleChange}
                                        id=""
                                    />
                                </div>
                            </div>

                            <div className="w-[100%]">
                                <h4 className="text-md font-medium tracking-wide">First Line of Address*</h4>
                                <input
                                    className="p-3 rounded-md outline-none border-none w-[100%]"
                                    type="text"
                                    placeholder="Enter the address"
                                    name="address"
                                    value={
                                        userDetails?.address !== "undefined" && userDetails?.address
                                            ? userDetails?.address
                                            : ""
                                    }
                                    onChange={handleChange}
                                    id=""
                                />
                            </div>

                        </div>
                        <div className="grid lg:flex items-center gap-2 w-[100%] lg:w-[95%] mt-4 lg:mt-8">
                            <div className="w-[100%]">
                                <h4 className="text-md font-medium tracking-wide">Town*</h4>
                                <input
                                    className={`p-3 outline-none rounded-md border w-[100%] ${!userDetails?.region?.trim() ? "border-red-500" : "border-gray-300"
                                        }`}
                                    type="text"
                                    placeholder="Enter your Town"
                                    name="region"
                                    value={userDetails?.region || ""}
                                    onChange={handleChange}
                                    id=""
                                />
                            </div>
                            <div className="w-[100%]">
                                <h4 className="text-md font-medium tracking-wide">County*</h4>
                                <input
                                    className="p-3 rounded-md outline-none border-none w-[100%]"
                                    type="text"
                                    placeholder="Enter the County"
                                    name="city"
                                    value={
                                        userDetails?.city !== "undefined" && userDetails?.city
                                            ? userDetails?.city
                                            : ""
                                    }
                                    onChange={handleChange}
                                    id=""
                                />
                            </div>
                            <div className="w-[100%]">
                                <h4 className="text-md font-medium tracking-wide">Postcode*</h4>
                                <input
                                    className="p-3 rounded-md outline-none border-none w-[100%]"
                                    type="text"
                                    placeholder="Enter your postcode"
                                    name="postcode"
                                    value={
                                        userDetails?.postcode !== "undefined" && userDetails?.postcode
                                            ? userDetails?.postcode
                                            : ""
                                    }
                                    onChange={handleChange}
                                    id=""
                                />
                            </div>

                        </div>

                        <div className="h-[1px] bg-gray-400 mt-4"></div>

                        <button
                            onClick={handleSubmit}
                            className="bg-[#FF6A78] w-[100%] text-white p-3 rounded-md save-button mt-4"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
                <br />
                <div className="w-[100%] m-auto">
                    <div className="bg-[#F9F0F0] p-2 lg:p-8 ">
                        <h2 className="text-lg font-medium tracking-wider">Card Details</h2>
                        {userDetails?.wallet?.cardDetails.length > 0 ? (
                            <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 mt-6">
                                {userDetails?.wallet?.cardDetails.map((item, i) => {
                                    return (
                                        <div className="md:px-8 px-1 pb-8 rounded-2xl bg-white  shadow-xl">
                                            <div className="flex items-center justify-end pt-4  gap-4">
                                                <svg
                                                    onClick={() => {
                                                        handleCardEdit(item, i);
                                                    }}
                                                    width="25"
                                                    height="24"
                                                    viewBox="0 0 25 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M22.812 1.70787C21.9628 0.858404 20.9396 0.433594 19.7432 0.433594H5.26484C4.06848 0.433594 3.04528 0.858404 2.19566 1.70787C1.3462 2.55749 0.921387 3.58064 0.921387 4.77705V19.2553C0.921387 20.4516 1.3462 21.4748 2.19566 22.3244C3.04528 23.1741 4.06848 23.5989 5.26484 23.5989H19.7431C20.9394 23.5989 21.9626 23.1741 22.8119 22.3244C23.6615 21.4748 24.0863 20.4516 24.0863 19.2553V4.77705C24.0862 3.58064 23.6614 2.55733 22.812 1.70787ZM9.12564 19.7379H4.78208V15.3943L12.9865 7.1901L17.3297 11.5335L9.12564 19.7379ZM19.6827 9.18083L18.2954 10.5685L13.9518 6.2248L15.3391 4.83737C15.6207 4.55609 15.9624 4.41515 16.3648 4.41515C16.7668 4.41515 17.1088 4.55587 17.3901 4.83737L19.6826 7.12983C19.9639 7.41122 20.1049 7.75305 20.1049 8.15535C20.105 8.5575 19.9643 8.89928 19.6827 9.18083Z"
                                                        fill="#FF5F5F"
                                                    />
                                                    <path
                                                        d="M6.22998 15.9975V16.8417H7.67778V18.2898H8.52223L9.30656 17.5055L7.01415 15.2129L6.22998 15.9975Z"
                                                        fill="#FF5F5F"
                                                    />
                                                    <path
                                                        d="M8.41701 13.7657C8.24601 13.9363 8.23101 14.0871 8.37163 14.218C8.50232 14.359 8.65318 14.3438 8.82412 14.1728L13.2128 9.78403C13.3838 9.61341 13.3987 9.46255 13.258 9.33181C13.1271 9.19092 12.9765 9.20593 12.8057 9.37697L8.41701 13.7657Z"
                                                        fill="#FF5F5F"
                                                    />
                                                </svg>
                                                <svg
                                                    onClick={() => {
                                                        handleCardDelete(item);
                                                    }}
                                                    width="25"
                                                    height="24"
                                                    viewBox="0 0 172 172"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <rect
                                                        width="172"
                                                        height="172"
                                                        rx="15"
                                                        fill="#FF8888"
                                                    />
                                                    <path
                                                        d="M85.9998 75.1115L124.111 37L135 47.8889L96.8886 86.0003L135 124.111L124.111 135L85.9998 96.8891L47.8889 135L37 124.111L75.1111 86.0003L37 47.8889L47.8889 37L85.9998 75.1115Z"
                                                        fill="white"
                                                    />
                                                </svg>
                                            </div>
                                            <div className="lg:p-4 p-2">
                                                <Cards
                                                    name={item.name}
                                                    number={item.number}
                                                    expiry={item.expiry}
                                                    cvc={item.cvc}
                                                />
                                            </div>
                                            <h2>Card #{i + 1}</h2>
                                            <div className="flex items-center justify-between pt-4">
                                                <div>
                                                    <h3 className="text-xs">Card Number</h3>
                                                    <p>{item.number}</p>
                                                </div>
                                                <div className="mt-0">
                                                    <h3 className="text-xs">Issuer</h3>
                                                    <p>{item.issuer}</p>
                                                </div>
                                            </div>
                                            <div className="mt-2">
                                                <h3 className="text-xs">Name</h3>
                                                <p>{item.name}</p>
                                            </div>

                                            <div className="mt-2">
                                                <h3 className="text-xs">Valid till</h3>
                                                <p>{item.expiry}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div></div>
                        )}
                        <h3
                            onClick={handleNewCard}
                            className="m-4 underline-offset-2 decoration-2 cursor-pointer text-[#FF6A78] border-b-2 w-fit border-[#FF6A78]"
                        >
                            Add new Card
                        </h3>
                    </div>
                </div>
            </div>

            <Modal
                className="bg-[#160B3A]"
                dismissible
                position="center"
                show={isResetPassword}
                onClose={onClose}
                popup
            >
                <div className="rounded-md">
                    <Modal.Header className="bg-white  rounded-t-md" />
                    {isOTPVerified ? (
                        <Modal.Body className="bg-white text-secondary  h-full xs:h-auto rounded-b-md">
                            <div
                                onClick={() => setIsOTPVerified(false)}
                                className="cursor-pointer absolute top-4"
                            >
                                <svg
                                    width="10"
                                    height="16"
                                    viewBox="0 0 10 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M9.44033 14.0972C9.85557 14.5178 9.86807 15.213 9.46885 15.6503C9.26416 15.8743 8.99072 15.9872 8.71728 15.9872C8.45713 15.9872 8.19658 15.8854 7.99463 15.6806L1.21611 8.81616C1.01182 8.60964 0.895996 8.32353 0.895996 8.02529C0.895996 7.72601 1.01182 7.44052 1.21611 7.23339L7.99463 0.369592C8.40947 -0.0506281 9.06963 -0.0372585 9.46885 0.399622C9.86807 0.837531 9.85537 1.53276 9.44033 1.95256L3.44385 8.02529L9.44033 14.0972Z"
                                        fill="black"
                                    />
                                </svg>
                            </div>
                            <div className="mt-0">
                                <h3 className="text-center text-lg font-bold tracking-wider">
                                    Forgot Password
                                </h3>
                            </div>
                            {/* <p className='my-4 text-center w-[80%] m-auto py-12'>We have sent an email to raffilytest@gmail.com with a link to reset your pasword.</p> */}
                            <div className="flex justify-between items-center gap-4 rounded-md p-4 border-[1px] mt-2">
                                <input
                                    onChange={handleChangeReset}
                                    className="w-[100%] border-none outline-none"
                                    type={visible.oldPassword ? "text" : "password"}
                                    placeholder="Enter your old password"
                                    name="oldPassword"
                                    id="email"
                                />
                                {visible.oldPassword ? (
                                    <svg
                                        onClick={() => {
                                            setVisible({ ...visible, oldPassword: false });
                                        }}
                                        width="24"
                                        height="21"
                                        viewBox="0 0 29 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M0 12C1.26055 5.17301 7.27301 0 14.5 0C21.727 0 27.7395 5.17301 29 12C27.7395 18.8269 21.727 24 14.5 24C7.27301 24 1.26055 18.8269 0 12ZM14.5 18.6667C18.2011 18.6667 21.2014 15.6819 21.2014 12C21.2014 8.31811 18.2011 5.33333 14.5 5.33333C10.7989 5.33333 7.79858 8.31811 7.79858 12C7.79858 15.6819 10.7989 18.6667 14.5 18.6667ZM14.5 16C12.2793 16 10.4791 14.2092 10.4791 12C10.4791 9.7908 12.2793 8 14.5 8C16.7206 8 18.5209 9.7908 18.5209 12C18.5209 14.2092 16.7206 16 14.5 16Z"
                                            fill="black"
                                            fill-opacity="0.5"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        onClick={() => {
                                            setVisible({ ...visible, oldPassword: true });
                                        }}
                                        width="24"
                                        height="21"
                                        viewBox="0 0 29 28"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M4.47497 5.99383L0.284166 1.86667L2.17962 0L28.7159 26.1332L26.8204 28L22.3841 23.631C20.1039 25.0548 17.3997 25.8794 14.5 25.8794C7.27301 25.8794 1.26055 20.7583 0 14C0.585274 10.8621 2.19495 8.07711 4.47497 5.99383ZM18.1957 19.5063L16.2336 17.5739C15.7086 17.8212 15.1207 17.9598 14.5 17.9598C12.2793 17.9598 10.4791 16.1869 10.4791 14C10.4791 13.3886 10.6198 12.8097 10.871 12.2927L8.90887 10.3604C8.20721 11.4037 7.79858 12.6549 7.79858 14C7.79858 17.6449 10.7989 20.5997 14.5 20.5997C15.8658 20.5997 17.1362 20.1972 18.1957 19.5063ZM9.10429 3.12375C10.7754 2.47624 12.5955 2.12061 14.5 2.12061C21.727 2.12061 27.7395 7.24162 29 14C28.5816 16.2434 27.6395 18.3064 26.3032 20.0615L21.13 14.9669C21.1771 14.6513 21.2014 14.3284 21.2014 14C21.2014 10.3551 18.2011 7.40033 14.5 7.40033C14.1664 7.40033 13.8386 7.42432 13.5182 7.47064L9.10429 3.12375Z"
                                            fill="black"
                                            fill-opacity="0.5"
                                        />
                                    </svg>
                                )}
                            </div>
                            <div className="flex justify-between items-center gap-4 rounded-md p-4 border-[1px] mt-2">
                                <input
                                    onChange={handleChangeReset}
                                    className="w-[100%] border-none outline-none"
                                    type={visible.newPassword ? "text" : "password"}
                                    placeholder="Enter your new password"
                                    name="newPassword"
                                    id="email"
                                />
                                {visible.newPassword ? (
                                    <svg
                                        onClick={() => {
                                            setVisible({ ...visible, newPassword: false });
                                        }}
                                        width="24"
                                        height="21"
                                        viewBox="0 0 29 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M0 12C1.26055 5.17301 7.27301 0 14.5 0C21.727 0 27.7395 5.17301 29 12C27.7395 18.8269 21.727 24 14.5 24C7.27301 24 1.26055 18.8269 0 12ZM14.5 18.6667C18.2011 18.6667 21.2014 15.6819 21.2014 12C21.2014 8.31811 18.2011 5.33333 14.5 5.33333C10.7989 5.33333 7.79858 8.31811 7.79858 12C7.79858 15.6819 10.7989 18.6667 14.5 18.6667ZM14.5 16C12.2793 16 10.4791 14.2092 10.4791 12C10.4791 9.7908 12.2793 8 14.5 8C16.7206 8 18.5209 9.7908 18.5209 12C18.5209 14.2092 16.7206 16 14.5 16Z"
                                            fill="black"
                                            fill-opacity="0.5"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        onClick={() => {
                                            setVisible({ ...visible, newPassword: true });
                                        }}
                                        width="24"
                                        height="21"
                                        viewBox="0 0 29 28"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M4.47497 5.99383L0.284166 1.86667L2.17962 0L28.7159 26.1332L26.8204 28L22.3841 23.631C20.1039 25.0548 17.3997 25.8794 14.5 25.8794C7.27301 25.8794 1.26055 20.7583 0 14C0.585274 10.8621 2.19495 8.07711 4.47497 5.99383ZM18.1957 19.5063L16.2336 17.5739C15.7086 17.8212 15.1207 17.9598 14.5 17.9598C12.2793 17.9598 10.4791 16.1869 10.4791 14C10.4791 13.3886 10.6198 12.8097 10.871 12.2927L8.90887 10.3604C8.20721 11.4037 7.79858 12.6549 7.79858 14C7.79858 17.6449 10.7989 20.5997 14.5 20.5997C15.8658 20.5997 17.1362 20.1972 18.1957 19.5063ZM9.10429 3.12375C10.7754 2.47624 12.5955 2.12061 14.5 2.12061C21.727 2.12061 27.7395 7.24162 29 14C28.5816 16.2434 27.6395 18.3064 26.3032 20.0615L21.13 14.9669C21.1771 14.6513 21.2014 14.3284 21.2014 14C21.2014 10.3551 18.2011 7.40033 14.5 7.40033C14.1664 7.40033 13.8386 7.42432 13.5182 7.47064L9.10429 3.12375Z"
                                            fill="black"
                                            fill-opacity="0.5"
                                        />
                                    </svg>
                                )}
                            </div>
                            <div className="flex justify-between items-center gap-4 rounded-md p-4 border-[1px] mt-2">
                                <input
                                    onChange={handleChangeReset}
                                    className="w-[100%] border-none outline-none"
                                    type={visible.confirmNewPassword ? "text" : "password"}
                                    placeholder="Enter your confirm password"
                                    name="newConfirmPassword"
                                    id="email"
                                />
                                {visible.confirmNewPassword ? (
                                    <svg
                                        onClick={() => {
                                            setVisible({ ...visible, confirmNewPassword: false });
                                        }}
                                        width="24"
                                        height="21"
                                        viewBox="0 0 29 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M0 12C1.26055 5.17301 7.27301 0 14.5 0C21.727 0 27.7395 5.17301 29 12C27.7395 18.8269 21.727 24 14.5 24C7.27301 24 1.26055 18.8269 0 12ZM14.5 18.6667C18.2011 18.6667 21.2014 15.6819 21.2014 12C21.2014 8.31811 18.2011 5.33333 14.5 5.33333C10.7989 5.33333 7.79858 8.31811 7.79858 12C7.79858 15.6819 10.7989 18.6667 14.5 18.6667ZM14.5 16C12.2793 16 10.4791 14.2092 10.4791 12C10.4791 9.7908 12.2793 8 14.5 8C16.7206 8 18.5209 9.7908 18.5209 12C18.5209 14.2092 16.7206 16 14.5 16Z"
                                            fill="black"
                                            fill-opacity="0.5"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        onClick={() => {
                                            setVisible({ ...visible, confirmNewPassword: true });
                                        }}
                                        width="24"
                                        height="21"
                                        viewBox="0 0 29 28"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M4.47497 5.99383L0.284166 1.86667L2.17962 0L28.7159 26.1332L26.8204 28L22.3841 23.631C20.1039 25.0548 17.3997 25.8794 14.5 25.8794C7.27301 25.8794 1.26055 20.7583 0 14C0.585274 10.8621 2.19495 8.07711 4.47497 5.99383ZM18.1957 19.5063L16.2336 17.5739C15.7086 17.8212 15.1207 17.9598 14.5 17.9598C12.2793 17.9598 10.4791 16.1869 10.4791 14C10.4791 13.3886 10.6198 12.8097 10.871 12.2927L8.90887 10.3604C8.20721 11.4037 7.79858 12.6549 7.79858 14C7.79858 17.6449 10.7989 20.5997 14.5 20.5997C15.8658 20.5997 17.1362 20.1972 18.1957 19.5063ZM9.10429 3.12375C10.7754 2.47624 12.5955 2.12061 14.5 2.12061C21.727 2.12061 27.7395 7.24162 29 14C28.5816 16.2434 27.6395 18.3064 26.3032 20.0615L21.13 14.9669C21.1771 14.6513 21.2014 14.3284 21.2014 14C21.2014 10.3551 18.2011 7.40033 14.5 7.40033C14.1664 7.40033 13.8386 7.42432 13.5182 7.47064L9.10429 3.12375Z"
                                            fill="black"
                                            fill-opacity="0.5"
                                        />
                                    </svg>
                                )}
                            </div>
                            <div
                                onClick={handleSubmitReset}
                                className="text-center bg-[#20124C] p-4 rounded-md flex items-center text-white gap-4 font-bold mt-4 cursor-pointer"
                            >
                                <p className="text-center w-full text-xl font-medium tracking-wider">
                                    Reset Password
                                </p>
                            </div>
                        </Modal.Body>
                    ) : (
                        <Modal.Body className="bg-white text-secondary  h-full xs:h-auto rounded-b-md">
                            <div
                                onClick={() => setIsResetPassword(false)}
                                className="cursor-pointer absolute top-4"
                            >
                                <svg
                                    width="10"
                                    height="16"
                                    viewBox="0 0 10 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M9.44033 14.0972C9.85557 14.5178 9.86807 15.213 9.46885 15.6503C9.26416 15.8743 8.99072 15.9872 8.71728 15.9872C8.45713 15.9872 8.19658 15.8854 7.99463 15.6806L1.21611 8.81616C1.01182 8.60964 0.895996 8.32353 0.895996 8.02529C0.895996 7.72601 1.01182 7.44052 1.21611 7.23339L7.99463 0.369592C8.40947 -0.0506281 9.06963 -0.0372585 9.46885 0.399622C9.86807 0.837531 9.85537 1.53276 9.44033 1.95256L3.44385 8.02529L9.44033 14.0972Z"
                                        fill="black"
                                    />
                                </svg>
                            </div>
                            <div className="mt-0">
                                <h3 className="text-center text-lg font-bold tracking-wider">
                                    Forgot Password
                                </h3>
                            </div>
                            <p className="mt-6 text-center">
                                Please enter the OTP which has sent your registered email
                                address
                            </p>
                            <div className="hidden lg:flex justify-around mt-3 ">
                                <OTPInput
                                    value={otp}
                                    onChange={setOtp}
                                    numInputs={6}
                                    renderSeparator={<span></span>}
                                    renderInput={(props) => (
                                        <input
                                            {...props}
                                            style={{
                                                border: "1px solid #000",
                                                width: "60px",
                                                height: "60px",
                                                marginRight: "10px",
                                                textAlign: "center",
                                                borderRadius: "5px",
                                            }}
                                        />
                                    )}
                                />
                            </div>

                            <div className="block lg:hidden flex justify-center mt-6">
                                <OTPInput
                                    value={otp}
                                    onChange={setOtp}
                                    numInputs={6}
                                    renderSeparator={<span></span>}
                                    renderInput={(props) => (
                                        <input
                                            {...props}
                                            style={{
                                                border: "1px solid #000",
                                                width: "40px",
                                                height: "40px",
                                                marginRight: "10px",
                                                textAlign: "center",
                                                borderRadius: "5px",
                                            }}
                                        />
                                    )}
                                />
                            </div>
                            <br />
                            <div className="text-center bg-[#20124C] p-4 rounded-md flex items-center text-white gap-4 font-bold mt-4 cursor-pointer">
                                <p
                                    onClick={handleVerifyOTP}
                                    className="text-center w-full text-xl font-medium tracking-wider"
                                >
                                    Verify
                                </p>
                            </div>
                        </Modal.Body>
                    )}
                </div>
            </Modal>

            <Modal
                className="bg-[#160B3A]"
                dismissible
                position="center"
                show={isCardOpened}
                onClose={() => {
                    setIsCardOpened(false);
                }}
                popup
            >
                <Modal.Body className="p-2 lg:p-12 rounded-xl bg-white text-secondary  h-full rounded-b-md">
                    <div key="Payment">
                        <div className="App-payment">
                            <Cards
                                number={number}
                                name={name}
                                expiry={expiry}
                                cvc={cvc}
                                focused={focused}
                                callback={handleCallback}
                            />
                            <br />

                            <form ref={formRef} onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <input
                                        type="tel"
                                        name="number"
                                        className="form-control border-2 p-2 w-[100%] text-lg rounded-md"
                                        placeholder="Card Number"
                                        pattern="[\d| ]{16,22}"
                                        required
                                        value={state.number}
                                        onChange={handleInputChange}
                                        onFocus={handleInputFocus}
                                        disabled={state.isEditMode}
                                    />
                                </div>
                                <small>E.g.: 49..., 51..., 36..., 37...</small>
                                <div className="form-group mt-4">
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control border-2 p-2 w-[100%] text-lg rounded-md"
                                        placeholder="Name"
                                        required
                                        value={state.name}
                                        onChange={handleInputChange}
                                        onFocus={handleInputFocus}
                                    />
                                </div>
                                <div className="row lg:flex items-center justify-between gap-2">
                                    <div className="form-group">
                                        <input
                                            type="tel"
                                            name="expiry"
                                            className="form-control border-2 p-2 text-lg rounded-md mt-4"
                                            placeholder="Valid Till"
                                            pattern="\d\d/\d\d"
                                            required
                                            value={state.expiry}
                                            onChange={handleInputChange}
                                            onFocus={handleInputFocus}
                                            style={{ width: "100%" }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="tel"
                                            name="cvc"
                                            className="form-control border-2 p-2 text-lg rounded-md mt-4"
                                            placeholder="CVV"
                                            pattern="\d{3,4}"
                                            required
                                            value={state.cvc}
                                            onChange={handleInputChange}
                                            onFocus={handleInputFocus}
                                            style={{ width: "100%" }}
                                        />
                                    </div>
                                </div>
                                <input type="hidden" name="issuer" value={issuer} />
                                <div
                                    onClick={handleSubmitCard}
                                    className="form-actions w-[100%] bg-blue-500 text-center mt-4 p-4 text-white rounded-xl cursor-pointer"
                                >
                                    <button className="btn btn-primary btn-block text-center">
                                        SUBMIT
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default UserAccount;
