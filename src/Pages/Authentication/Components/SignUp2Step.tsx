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
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/Components/ui/button';

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
            debugger;
            const verifyResult = await verifyUser(data);

            if (verifyResult.success) {
                successToast("Registration Successful");

                console.log("Attempting to log in with:", { emailOrUsername: userRegisterData.email, password: userRegisterData.password });
                debugger;
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
    useEffect(() => {

        setMobile({number: userRegisterData.phone,
            dialcode: userRegisterData.dialcode,})
    }, [])
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
                theme={{
                    content: {
                        base: "bg-transparent shadow-none",
                    },
                }}
            >
                <div className='rounded-xs'>
                    {/* <Modal.Body style={{ fontFamily: "poppins, sans-serif" }}> */}
                    <div style={{ fontFamily: "poppins, sans-serif" }} className="py-2 flex items-center justify-center">
                        <div className="w-full max-w-md bg-white rounded-lg overflow-hidden">
                            <div className="px-4 space-y-6">
                                {/* Header with Back Button and Progress */}
                                <header className="flex items-center justify-between">

                                    <button onClick={() => goBack()} className="p-2 hover:bg-gray-100 rounded-full">
                                        <ArrowLeft className="w-5 h-5 text-gray-600" />
                                    </button>

                                </header>
                                <div className="text-center space-y-2">
                                    <h3 className="text-3xl font-bold tracking-tight">Step 2: Verify your account</h3>
                                </div>
                              
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
                                    <span onClick={disableCode ? () => { } : handleResend} className={`${disableCode ? "text-[#E7E7E7E7] cursor-not-allowed" : "text-purple-600 underline hover:text-purple-800 font-bold cursor-pointer"}`} >Resend code</span>
                                </div>
                                <Button
                                    className="w-full h-12 text-lg font-bold bg-purple-700 hover:bg-purple-800 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-150 text-white"
                                    onClick={() => { handleOwner() }}
                                    style={{ fontFamily: "poppins, sans-serif" }}
                                >
                                   Verify
                                </Button>
                                {/* <div onClick={handleOwner} className='text-center bg-[#20124C] p-4 rounded-md flex items-center text-white gap-4 font-bold mt-4 cursor-pointer'>
                                    <p className='text-center w-full text-xl font-medium ' style={{ fontFamily: "poppins, sans-serif" }}>Verify</p>
                                </div> */}

                                <div className=' mt-4 pb-4 w-[100%] m-auto text-center text-xs ' style={{ color: "black", fontFamily: "poppins, sans-serif" }}>
                                    If you didn’t receive a code please make sure your mobile number is correct and try again.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default SignUp2Step