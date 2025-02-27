import React, { useEffect, useState } from 'react'
import { Label, Modal, Select } from 'flowbite-react';
import google from '../../../assets/authentication/google.png'
import apple from '../../../assets/authentication/apple.png'
import facebook from '../../../assets/authentication/facebook.png'
import { UserRegister } from '../../../Utils/Interface/register.interface';
import toast, { Toaster } from 'react-hot-toast';
import { errorToast } from '../../../Utils/Toast/error.toast';
import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { getUserRegisteredWithGoogleData } from '../../../Services/Authentication/register';
import Cookies from 'js-cookie';
import { successToast } from '../../../Utils/Toast/success.toast';
import { loginUser, socialLogin, verifyUser } from '../../../Services/Authentication/verifyUser';
import { storeUser } from '../../../Redux/User/userSlice';
import { useDispatch } from 'react-redux';
import { User } from '../../../Utils/Interface/Customer';
import FacebookLogin from 'react-facebook-login';
import { ArrowLeft, Check, Lock, PartyPopper } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/Components/signupui/button';
import { Progress } from '@/Components/signupui/progress';
import { Checkbox } from '@/Components/signupui/checkbox';

interface SignUpProps {
    authenticationModal: any;
    setAuthenticationModal: React.Dispatch<React.SetStateAction<any>>;
    userRegisterData: UserRegister;
    setUserRegisterData: React.Dispatch<React.SetStateAction<UserRegister>>;
    onSuccess?: (response: any) => void;
    onFailure?: (error: any) => void;
}



function CountdownTimer() {
    const [timeLeft, setTimeLeft] = useState(10000) // 2 hours, 46 minutes, 40 seconds in seconds

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timer)
                    return 0
                }
                return prevTime - 1
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    const hours = Math.floor(timeLeft / 3600)
    const minutes = Math.floor((timeLeft % 3600) / 60)
    const seconds = timeLeft % 60

    return (
        <span className="text-2xl font-bold text-red-500 animate-pulse-fast">
            {hours.toString().padStart(2, "0")}:{minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}
        </span>
    )
}


const SignUp: React.FC<SignUpProps> = ({ authenticationModal, setAuthenticationModal, setUserRegisterData, userRegisterData, onSuccess, onFailure }: any) => {
    const [step, setStep] = useState(1)

    const steps = [
        { number: 1, title: "Email", description: "Your contact" },
        { number: 2, title: "Create Account", description: "Set up access" },
    ]

    const [progress, setProgress] = useState(50)

    useEffect(() => {
        setProgress(step === 1 ? 50 : 100)
    }, [step])
    const onClose = (): void => {
        setAuthenticationModal({
            isSignUp1Step: false,
            isSignUp2Step: false,
            isBusinessSignUp1Step: false,
            isForgotPassOpen: false,
            isSignUpOpen: false,
            isSignInOpen: false
        });
    };

    const handleSignIn = () => {
        setAuthenticationModal({
            isSignUp1Step: false,
            isSignUp2Step: false,
            isBusinessSignUp1Step: false,
            isForgotPassOpen: false,
            isSignUpOpen: false,
            isSignInOpen: true
        });
    }

    const handleSignUp = () => {
        setAuthenticationModal({
            isSignUp1Step: false,
            isSignUp2Step: false,
            isBusinessSignUp1Step: false,
            isForgotPassOpen: false,
            isSignUpOpen: true,
            isSignInOpen: false
        });
    }

    const validateEmail = (email: string): boolean => {
        // Regular expression pattern for validating email addresses
        const emailPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Test the provided email against the pattern
        return emailPattern.test(email);
    };


    const handleSignUp1Step = () => {
        if (userRegisterData.email.trim() === "") {
            return errorToast("Please enter your email address")
        } else if (!validateEmail(userRegisterData.email.trim())) {
            return errorToast("Please enter the valid email address")
        }
        else if (userRegisterData.role.trim() === "") {
            return errorToast("Please select the role")
        }
        if (userRegisterData.role === "Business") {
            setAuthenticationModal({
                isSignUpOpen: false,
                isSignInOpen: false,
                isSignUp1Step: false,
                isBusinessSignUp1Step: true,
                isSignUp2Step: false,
                isForgotPassOpen: false
            })
        } 
        else {
            setAuthenticationModal({
                isSignUpOpen: false,
                isSignInOpen: false,
                isSignUp1Step: true,
                isBusinessSignUp1Step: false,
                isSignUp2Step: false,
                isForgotPassOpen: false
            })
        }


    }

    const dispatch = useDispatch();

    const clientId = '966931789518-8p7bk6v8nssujgvbvuu9pveja6jgr9th.apps.googleusercontent.com';


    interface DecodedToken {
        sub: string; // userId
        email: string;
        name: string;
        picture?: string;
    }


    const handleSocialLoginSuccess = async (decodedToken: DecodedToken, loginType: string) => {
        console.log("decodedToken", decodedToken);
        console.log("loginType", loginType);
        if (!decodedToken.email) {
            errorToast('Something went wrong on facebook login, please try again after some time.');
            return;
        }
        try {
            const payload = {
                userId: decodedToken.sub,
                name: decodedToken.name,
                email: decodedToken.email,
                role: userRegisterData.role,
                loginType,
            };
            console.log("payload", payload);

            const apiResponse = await socialLogin(payload);
            console.log("apiResponse>>>", apiResponse);


            if (apiResponse.success) {
                const { accessToken, refreshToken, user } = apiResponse.result;
                Cookies.set('accessToken', accessToken, {
                    expires: new Date(Date.now() + 3600 * 1000),
                    sameSite: 'strict',
                    secure: false,
                });
                console.log("refreshToken>>>", refreshToken);

                Cookies.set('refreshToken', refreshToken, {
                    expires: new Date(Date.now() + 7 * 24 * 3600 * 1000),
                    sameSite: 'strict',
                    secure: false,
                });
                console.log("User ++ ", user);

                dispatch(storeUser(user));
                let redirect_to = "";
                if (user.role === "Business") {
                    redirect_to = "/owner/account";
                } else if (user.role === "Customer") {
                    redirect_to = "/user";
                    if (location.pathname === "/user/cart") {
                        redirect_to = "/user/cart";
                    }
                } else if (user.role === "ADMIN") {
                    redirect_to = "/admin/reports";
                }

                if (redirect_to) {
                    setTimeout(() => {
                        window.location.href = redirect_to;
                    }, 1000);
                }

                setAuthenticationModal({
                    isSignUp1Step: false,
                    isSignUp2Step: false,
                    isBusinessSignUp1Step: false,
                    isForgotPassOpen: false,
                    isSignUpOpen: false,
                    isSignInOpen: false,
                });
                successToast('Successfully logged in');
                onClose();
            } else {
                errorToast(apiResponse.message || 'Login failed');
            }
        } catch (error) {
            errorToast('An error occurred during login');
        }
    };

    const handleGoogleSignUpSuccess = async (response: CredentialResponse) => {
        console.log("credential > ", response.credential);
        if (response.credential) {
            const decodedToken: DecodedToken = jwtDecode(response.credential);
            console.log("decodedToken 1 > ", decodedToken);

            await handleSocialLoginSuccess(decodedToken, 'Google');
        }
    };

    const handleFacebookResponse = async (response: any) => {
        const { userID, name, email } = response;
        const decodedToken = { sub: userID, name, email };
        await handleSocialLoginSuccess(decodedToken, 'Facebook');
    };

    const handleGoogleLoginFailure = () => {
        console.error('Google Signup Failure:');
        // // Handle error response
        // if (onFailure) onFailure(error);
        onFailure();
        return
    };

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setUserRegisterData((prev: UserRegister) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    return (
        <>
            <Toaster position="top-right"
                reverseOrder={false} />
            <Modal
                position="center"
                show={authenticationModal.isSignUpOpen}
                onClose={onClose}
                dismissible
                popup
                theme={{
                    content: {
                        base: "bg-transparent shadow-none",
                    },
                }}
            >
                <div className='rounded-xs'>
                    {/* <Modal.Body style={{ fontFamily: "poppins, sans-serif" }}> */}
                    <div style={{ fontFamily: "poppins, sans-serif" }} className="py-6 flex items-center justify-center">
                        <div className="w-full max-w-md bg-white rounded-lg overflow-hidden">
                            <div className="px-4 space-y-6">
                                {/* Header with Back Button and Progress */}
                                <header className="flex items-center justify-between">
                                    {step > 1 && (
                                        <button onClick={() => setStep((prev) => prev - 1)} className="p-2 hover:bg-gray-100 rounded-full">
                                            <ArrowLeft className="w-5 h-5 text-gray-600" />
                                        </button>
                                    )}
                                    <div className="flex space-x-2">
                                        <Button variant="ghost" asChild>
                                            <Link to={'#'} onClick={handleSignIn}>Sign In</Link>
                                        </Button>
                                        <Button className="bg-pink-500 text-white hover:bg-pink-600" onClick={handleSignUp}>Sign Up</Button>
                                    </div>
                                </header>
                                {/* Progress Steps */}
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm font-medium">
                                        {steps.map((s) => (
                                            <div
                                                key={s.number}
                                                className={`flex flex-col items-center ${step >= s.number ? "text-purple-700" : "text-gray-400"}`}
                                            >
                                                <span>{s.title}</span>
                                                <span className="text-xs text-gray-500">{s.description}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <Progress value={progress} className="h-3 transition-all duration-500 ease-in-out" />
                                </div>

                                <div className="text-center space-y-2">
                                    <h1 className="text-3xl font-bold tracking-tight">Create Your Raffily Account – Join 10,000+ Winners!</h1>
                                    <p className="text-lg text-gray-600">It takes seconds to enter for free – No payment required!</p>
                                </div>
                                {/* Security Trust Badges */}
                                <div className="flex justify-center items-center space-x-4 text-sm text-gray-600">
                                    <span className="flex items-center">
                                        <Lock className="w-4 h-4 mr-1" /> SSL Secure
                                    </span>
                                    <span className="flex items-center">
                                        <Check className="w-4 h-4 mr-1" /> Verified Entries
                                    </span>
                                    <span className="flex items-center">
                                        <PartyPopper className="w-4 h-4 mr-1" /> 10,000+ Winners
                                    </span>
                                </div>

                                <div className='mt-4'>
                                    <div className='flex items-center gap-4 rounded-md p-2 border-[1px] mt-2'>
                                        <input onChange={handleChange} value={userRegisterData.email} className='border-none outline-none w-[100%] text-black' type="email" placeholder='Email' name="email" id="email" />
                                    </div>
                                    <div className='w-full'>
                                        <Select
                                            onChange={handleChange}
                                            value={userRegisterData.role || ""}
                                            name="role"
                                            className='rounded-md mt-2'
                                            id="countries"
                                            required
                                            style={{ backgroundColor: 'white', color: 'gray', padding: '10px', height: '55px', border: '1px solid lightgray', outline: 'none', fontSize: '16px', letterSpacing: '.5px', fontWeight: '400', cursor: 'pointer' }}
                                        >
                                            <option value="" selected>Select Role</option>
                                            <option value="Business">I want to launch a raffle!</option>
                                            <option value="Customer"> I want to enter Raffles!</option>
                                        </Select>
                                    </div>

                                    {/* </div> */}
                                </div>
                                <Button
                                    className="w-full h-12 text-lg font-bold bg-purple-700 hover:bg-purple-800 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-150 text-white"
                                    onClick={() => { handleSignUp1Step() }}
                                >
                                    Enter the Raffle Now!
                                </Button>
                                {/* Urgency Message with Countdown Timer */}
                                <div className="text-center pt-3">
                                    <p className="text-lg font-medium text-gray-800">
                                        Spots close in <CountdownTimer />
                                    </p>
                                </div>

                                {step === 1 && (
                                    <>
                                        <div className="relative py-4">
                                            <div className="absolute inset-0 flex items-center">
                                                <span className="w-full border-t border-gray-300" />
                                            </div>
                                            <div className="relative flex justify-center text-sm">
                                                <span className="px-2 bg-white text-gray-500">Or continue with</span>
                                            </div>
                                        </div>

                                        {/* Social Login Buttons */}
                                        <div className="space-y-3">
                                            <Button
                                                variant="outline"
                                                className="w-full h-[40px] font-medium text-gray-600 border border-gray-300 bg-white hover:bg-gray-50"
                                            >
                                                <GoogleOAuthProvider clientId={clientId}>
                                                    <span className="object-contain">
                                                        <GoogleLogin
                                                            onSuccess={handleGoogleSignUpSuccess}
                                                            onError={handleGoogleLoginFailure}
                                                            useOneTap
                                                        />
                                                    </span>
                                                </GoogleOAuthProvider>
                                            </Button>
                                        </div>
                                    </>
                                )}
                                <div className="flex items-center pt-4">
                                    <Checkbox
                                        id="marketing"
                                        name="marketing"
                                        checked={userRegisterData.opted}
                                        onCheckedChange={(checked: any) => setUserRegisterData((prev: any) => ({ ...prev, opted: checked as boolean }))}
                                        className="mr-2"
                                    />
                                    <label htmlFor="marketing" className="text-sm text-gray-600">
                                        Get exclusive raffle updates & prize notifications (Optional)
                                    </label>
                                </div>

                                <p className="text-center text-sm text-gray-700 font-medium">
                                    By creating an account you agree to our{" "}
                                    <Link to="/terms" className="text-purple-600 underline hover:text-purple-800">
                                        Terms and Conditions
                                    </Link>{" "}
                                    and{" "}
                                    <Link to="/privacy" className="text-purple-600 underline hover:text-purple-800">
                                        Privacy Policy
                                    </Link>
                                </p>

                                <p className="text-center text-sm text-gray-600 pb-4">
                                    Already have an account?{" "}
                                    <Link to="#" onClick={handleSignIn} className="text-purple-600 hover:underline">
                                        Sign In
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* </Modal.Body> */}
                </div>
            </Modal>
        </>
    )
}

export default SignUp