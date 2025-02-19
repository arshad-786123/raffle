import { Checkbox, Modal } from 'flowbite-react';
import google from '../../../assets/authentication/google.png'
import apple from '../../../assets/authentication/apple.png'
import facebook from '../../../assets/authentication/facebook.png'
import { useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';
import { useNavigate } from 'react-router-dom';
import { UserRegister } from '../../../Utils/Interface/register.interface';
// import { Country, getCountries } from '../../../Services/General/countries';
import { loginUser, verifyUser } from '../../../Services/Authentication/verifyUser';
import { errorToast } from '../../../Utils/Toast/error.toast';
import { resendOTP } from '../../../Services/Authentication/resendOTP';
import { successToast } from '../../../Utils/Toast/success.toast';
import Cookies from 'js-cookie';
import { storeUser } from '../../../Redux/User/userSlice';
import { useDispatch } from 'react-redux';

const SignUp2Step = ({ authenticationModal, setAuthenticationModal, setUserRegisterData, userRegisterData, userLoginData }: any) => {

    const [mobile, setMobile] = useState({
        number: "",
        dialcode: ""
    })
    const [disableCode, setDisableCode] = useState(false);

    const navigate = useNavigate()

    const onClose = (): void => {
        setAuthenticationModal({
            isSignUp1Step: false,
            isSignUp2Step: false,
            isBusinessSignUp1Step: false,
            isForgotPassOpen: false,
            isSignInOpen: false,
            isSignUpOpen: false
        });
    };

    const handleSign1Step = (): void => {
        setAuthenticationModal({
            isSignUp1Step: true,
            isSignUp2Step: false,
            isForgotPassOpen: false,
            isSignInOpen: false,
            isSignUpOpen: false
        });
    }

    const goBack = (): void => {


        if (userRegisterData.role === "Business") {
            setAuthenticationModal({
                isSignUp1Step: false,
                isSignUp2Step: false,
                isBusinessSignUp1Step: true,
                isForgotPassOpen: false,
                isSignInOpen: false,
                isSignUpOpen: false
            });
        } else {
            setAuthenticationModal({
                isSignUp1Step: true,
                isSignUp2Step: false,
                isForgotPassOpen: false,
                isBusinessSignUp1Step: false,
                isSignInOpen: false,
                isSignUpOpen: false
            });
        }

    }

    const [otp, setOtp] = useState('');

    // const handleOwner = async () => {

    //     if (!otp) {
    //         return errorToast("Please fill the OTP")
    //     }

    //     if (userRegisterData.email === "") {
    //         userRegisterData.email = userLoginData.emailOrUsername
    //     }

    //     const data = { ...userRegisterData, type: "REGISTRATION", code: otp }

    //     const a = await verifyUser(data)
    //     if (a.success) {
    //         successToast("Registration Successful");
    //     } else {
    //         return errorToast(a.message);
    //     }
    //     // navigate("/owner")
    //     setAuthenticationModal({
    //         isSignUp1Step: false,
    //         isSignUp2Step: false,
    //         isBusinessSignUp1Step: false,
    //         isForgotPassOpen: false,
    //         isSignInOpen: true,
    //         isSignUpOpen: false
    //     });
    // }

    const dispatch = useDispatch();

    const handleOwner = async () => {

        if (!otp) {
            return errorToast("Please fill the OTP");
        }

        if (userRegisterData.email === "") {
            userRegisterData.email = userLoginData.emailOrUsername;
        }

        const data = { ...userRegisterData, type: "REGISTRATION", code: otp };

        try {
            const verifyResult = await verifyUser(data);

            if (verifyResult.success) {
                successToast("Registration Successful");

                console.log("Attempting to log in with:", { emailOrUsername: userRegisterData.email, password: userRegisterData.password });

                const loginResult = await loginUser({ emailOrUsername: userRegisterData.email, password: userRegisterData.password });

                console.log("Login result:", loginResult);

                if (!loginResult.success) {
                    return errorToast("Error logging in after signup: " + loginResult.message);
                }

                // Dispatch action to store user data in Redux
                dispatch(storeUser(loginResult.result.user));

                // Get the access and refresh tokens from the response
                const { accessTokenExpiresIn, refreshTokenExpiresIn } = loginResult.result.user;

                // Set cookies for access and refresh tokens
                Cookies.set('accessToken', loginResult.result.accessToken, {
                    expires: new Date(Date.now() + accessTokenExpiresIn * 1000),
                    sameSite: 'strict',
                    secure: false, // Set to true if you're using HTTPS
                });

                Cookies.set('refreshToken', loginResult.result.refreshToken, {
                    expires: new Date(Date.now() + refreshTokenExpiresIn * 1000),
                    sameSite: 'strict',
                    secure: false, // Set to true if you're using HTTPS
                });

                // Determine redirect URL based on user role
                let redirect_to = "";
                if (loginResult.result.user.role === "Business") {
                    redirect_to = "/owner/account";
                } else if (loginResult.result.user.role === "Customer") {
                    redirect_to = "/";
                    if (location.pathname === "/user/cart") {
                        redirect_to = "/user/cart";
                    }
                } else if (loginResult.result.user.role === "ADMIN") {
                    redirect_to = "/admin/reports";
                }

                // Redirect after a short delay
                if (redirect_to) {
                    setTimeout(() => {
                        window.location.href = redirect_to;
                    }, 1000); // Adjust delay time as needed
                }

                // Update authentication modal state
                setAuthenticationModal({
                    isSignUp1Step: false,
                    isSignUp2Step: false,
                    isBusinessSignUp1Step: false,
                    isForgotPassOpen: false,
                    isSignUpOpen: false,
                    isSignInOpen: false
                });

            } else {
                return errorToast(verifyResult.message);
            }
        } catch (error: any) {
            console.log(error.message);
            return errorToast("An error occurred during registration.");
        }
    };



    const handleResend = async () => {
        try {
            setDisableCode(true);
            const data = { ...userRegisterData, type: "REGISTRATION", code: otp }

            const a = await resendOTP(data)
            setTimeout(() => {
                setDisableCode(false);
            }, 30000);
        } catch (error: any) {
            errorToast(error.message)
        }
    }

    // const [countriesData, setCountriesData] = useState<Country[]>([])

    // useEffect(() => {
    //     const countries = async () => {
    //         const result = await getCountries();
    //         setCountriesData(result)
    //     }
    //     countries()
    // }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setUserRegisterData((prev: UserRegister) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleSelectDialCode = (e: any): void => {
        const selectedOption = e.target.selectedOptions[0];
        const name = selectedOption.getAttribute('data-name');
        const dialCode = selectedOption.getAttribute('data-dialcode');
        setUserRegisterData((prev: UserRegister) => {
            return {
                ...prev,
                dialCode: {
                    country: name,
                    code: e.target.value,
                    dial_code: dialCode
                }
            }
        })
    }

    return (
        <div style={{ fontFamily: "poppins, sans-serif" }}>
            <Modal
                className='bg-[#160B3A]'
                dismissible
                position="center"
                show={authenticationModal.isSignUp2Step}
                onClose={onClose}
                popup
            >
                <div className='rounded-md'>
                    <Modal.Header className='bg-white  rounded-t-md' />

                    <Modal.Body className="bg-white text-secondary  h-full xs:h-auto rounded-b-md" style={{ fontFamily: "poppins, sans-serif" }}>

                        <div onClick={goBack} className='cursor-pointer absolute top-4'>
                            <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.44033 14.0972C9.85557 14.5178 9.86807 15.213 9.46885 15.6503C9.26416 15.8743 8.99072 15.9872 8.71728 15.9872C8.45713 15.9872 8.19658 15.8854 7.99463 15.6806L1.21611 8.81616C1.01182 8.60964 0.895996 8.32353 0.895996 8.02529C0.895996 7.72601 1.01182 7.44052 1.21611 7.23339L7.99463 0.369592C8.40947 -0.0506281 9.06963 -0.0372585 9.46885 0.399622C9.86807 0.837531 9.85537 1.53276 9.44033 1.95256L3.44385 8.02529L9.44033 14.0972Z" fill="black" />
                            </svg>
                        </div>
                        <div className='mt-2' style={{ color: "black", fontFamily: "poppins, sans-serif" }}>
                            <h3 className='text-center text-lg font-bold tracking-wider'>Step 2: Verify your account</h3>
                        </div>
                        {/* <div className='mt-4'>
                            <p className='mt-2'>Phone Number</p>
                            <div className='flex items-center gap-4'>
                            <div className='w-[28%] flex items-center justify-between gap-4 rounded-md p-2 lg:p-4 border-[1px] mt-2'>
                                   
                                    <select onChange={(e) => handleSelectDialCode(e)} value={userRegisterData.dialCode.code} id="countrySelect" className='border-none outline-none w-full cursor-pointer'>
                                        {
                                            countriesData?.map((item, i) => (
                                                <>
                                                    <option data-name={item.name} data-dialcode={item.dial_code} value={item.code} className='text-start'>{item.code} &nbsp; {item.dial_code}
                                                        <img src={`https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/${item.code}.svg`} />
                                                    </option>
                                                </>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className='w-[70%] flex items-center justify-between gap-4 rounded-md p-4 border-[1px] mt-2'>
                                    <input className='border-none outline-none' type="password" placeholder='Phone' name="email" id="email" />
                                </div>
                            </div>
                        </div> */}
                        <div className='h-[.2px] w-full bg-gray-200 mt-6'></div>
                        <p className='text-xs lg:text-sm text-center mt-3' style={{ color: "black", fontFamily: "poppins, sans-serif" }}>Please enter 6-digit code that was just sent to your mobile number</p>
                        <p className='text-sm text-center' style={{ color: "black", fontFamily: "poppins, sans-serif" }}>to {mobile.dialcode}&nbsp;{mobile.number} </p>


                        <div className='hidden lg:flex justify-center mt-6 ' style={{ color: "black", fontFamily: "poppins, sans-serif" }}>
                            <OtpInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={6}
                                inputType="number"
                                renderSeparator={<span></span>}
                                renderInput={(props) => <input
                                    {...props}
                                    style={{ border: '1px solid #000', width: '60px', height: "60px", marginRight: '10px', textAlign: 'center', borderRadius: '5px' }}
                                />}
                            />
                        </div>


                        <div className='block lg:hidden flex justify-center mt-6' style={{ color: "black", fontFamily: "poppins, sans-serif" }}>
                            <OtpInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={6}
                                inputType="number"
                                renderSeparator={<span></span>}
                                renderInput={(props) => <input

                                    {...props}
                                    style={{ border: '1px solid #000', width: '40px', height: "40px", marginRight: '10px', textAlign: 'center', borderRadius: '5px' }}
                                />}
                            />
                        </div>

                        <div className='flex items-center gap-1 justify-center mt-4'>
                            <p className='text-sm text-center' style={{ color: "black", fontFamily: "poppins, sans-serif" }}>Didn't receive a code?</p>
                            <span onClick={disableCode ? () => { } : handleResend} className={`${disableCode ? "text-[#E7E7E7E7] cursor-not-allowed" : "text-[#EB4C60] font-bold cursor-pointer"}`} >Resend code</span>
                        </div>

                        <div onClick={handleOwner} className='text-center bg-[#20124C] p-4 rounded-md flex items-center text-white gap-4 font-bold mt-4 cursor-pointer'>
                            <p className='text-center w-full text-xl font-medium ' style={{ fontFamily: "poppins, sans-serif" }}>Verify</p>
                        </div>

                        <div className=' mt-4 w-[100%] m-auto text-center text-xs ' style={{ color: "black", fontFamily: "poppins, sans-serif" }}>
                            If you didn’t receive a code please make sure your mobile number is correct and try again.
                        </div>
                    </Modal.Body>
                </div>
            </Modal>
        </div>
    )
}

export default SignUp2Step