import React, { MouseEventHandler, useState } from 'react'
import { Modal } from 'flowbite-react';
import google from '../../../assets/authentication/google.png'
import apple from '../../../assets/authentication/apple.png'
import facebook from '../../../assets/authentication/facebook.png'
import { UserLogin } from '../../../Utils/Interface/login.interface';
import { RegisterResponse, getUserLoginData } from '../../../Services/Authentication/login';
import { errorToast } from '../../../Utils/Toast/error.toast';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { storeUser } from '../../../Redux/User/userSlice';
import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { getUserRegisteredWithGoogleData } from '../../../Services/Authentication/register';
import { loginUser, socialLogin } from '../../../Services/Authentication/verifyUser';
import { successToast } from '../../../Utils/Toast/success.toast';
import FacebookLogin from 'react-facebook-login';
import { Button } from '@/Components/ui/button';
import { ArrowLeft, Check, Lock, PartyPopper } from 'lucide-react';
import GoogleLoginButton from './GoogleLoginButton';

interface SignInProps {
    authenticationModal: any;
    setAuthenticationModal: React.Dispatch<React.SetStateAction<any>>;
    userLoginData: UserLogin;
    setUserLoginData: React.Dispatch<React.SetStateAction<UserLogin>>;
    onSuccess?: (response: any) => void;
    onFailure?: (error: any) => void;
}

interface DecodedToken {
    sub: string; // userId
    email: string;
    name: string;
    picture?: string;
}


const SignIn: React.FC<SignInProps> = ({ authenticationModal, setAuthenticationModal, userLoginData, setUserLoginData, onSuccess, onFailure }: any) => {

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch()

    const [step, setStep] = useState(1)

    const onClose = (): void => {
        setAuthenticationModal({
            isSignUp1Step: false,
            isSignUp2Step: false,
            isForgotPassOpen: false,
            isSignInOpen: false,
            isBusinessSignUp1Step: false,
            isSignUpOpen: false
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

    const handleForgotPassword = () => {
        setAuthenticationModal({
            isSignUp1Step: false,
            isSignUp2Step: false,
            isBusinessSignUp1Step: false,
            isForgotPassOpen: true,
            isSignUpOpen: false,
            isSignInOpen: false
        });
    }
    const clientId = '966931789518-8p7bk6v8nssujgvbvuu9pveja6jgr9th.apps.googleusercontent.com';
    const handleSocialLoginSuccess = async (decodedToken: DecodedToken, loginType: string) => {

        try {
            const payload = {
                userId: decodedToken.sub,
                name: decodedToken.name,
                email: decodedToken.email,
                role: userLoginData?.role,
                loginType,
            };

            const apiResponse = await socialLogin(payload);

            if (apiResponse.success) {
                const { accessToken, refreshToken, user } = apiResponse.result;
                Cookies.set('accessToken', accessToken, {
                    expires: new Date(Date.now() + 3600 * 1000),
                    sameSite: 'strict',
                    secure: false,
                });

                Cookies.set('refreshToken', refreshToken, {
                    expires: new Date(Date.now() + 7 * 24 * 3600 * 1000),
                    sameSite: 'strict',
                    secure: false,
                });


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
        if (response.credential) {
            const decodedToken: DecodedToken = jwtDecode(response.credential);

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setUserLoginData((prev: UserLogin) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleSubmit = async () => {
        try {
            const responseData: RegisterResponse = await getUserLoginData(userLoginData);
            if (!responseData.success) {

                if (responseData.message === "User not Verified") {
                    setAuthenticationModal({
                        isSignUp1Step: false,
                        isSignUp2Step: true,
                        isBusinessSignUp1Step: false,
                        isForgotPassOpen: false,
                        isSignUpOpen: false,
                        isSignInOpen: false
                    });
                    return errorToast("User not verified. Please check your mail and verify the user");

                }

                return errorToast(responseData.message)
            } else {


                // Get the access and refresh token expiration times from the response
                const { accessTokenExpiresIn, refreshTokenExpiresIn } = responseData.result.user;

                // Get the access and refresh tokens from the response
                const { accessToken, refreshToken }: any = responseData.result;

                // Calculate the expiration times for the cookies
                const accessTokenExpires = new Date(Date.now() + accessTokenExpiresIn * 1000);
                const refreshTokenExpires = new Date(Date.now() + refreshTokenExpiresIn * 1000);

                // Set the access token cookie



                Cookies.set('accessToken', accessToken, {
                    expires: accessTokenExpires,
                    sameSite: 'strict',
                    secure: false, // Set to true if you're using HTTPS
                    // httpOnly:true                
                });

                // Set the refresh token cookie
                Cookies.set('refreshToken', refreshToken, {
                    expires: refreshTokenExpires,
                    sameSite: 'strict',
                    secure: false, // Set to true if you're using HTTPS
                    // httpOnly:true
                });

                dispatch(storeUser(responseData.result.user))

                // if (responseData.result.user.role === "Business") {
                //     navigate("/owner/account");
                // } else if (responseData.result.user.role === "ADMIN") {
                //     navigate("/admin/reports");
                // } else if (responseData.result.user.role === "Customer") {

                //     if (location.pathname === "/user/cart") {
                //         navigate("/user/cart");
                //     } else {
                //         navigate("/user");
                //     }
                // }



                let redirect_to = "";
                if (responseData.result.user.role == "Business") {
                    if (responseData.result.user.isFAQRead) {
                        redirect_to = "/owner/account"
                    } else {
                        redirect_to = "/owner/account"
                        // redirect_to = "/faq"
                    }
                    // setTimeout(()=>{
                    // navigate("/owner")



                }
                else if (responseData.result.user.role == "Customer") {

                    redirect_to = "/user"

                    if (location.pathname === "/user/cart") {
                        redirect_to = "/user/cart"
                    } else {
                        redirect_to = "/user"
                    }
                    // setTimeout(()=>{
                    // redirect_to = "/user"
                    // navigate("/user")
                    // },100)

                } else if (responseData.result.user.role == "ADMIN") {
                    redirect_to = "/admin/reports"
                }

                if (redirect_to != "") {
                    setTimeout(function () {
                        window.location.href = redirect_to;
                    }, 1000)
                }

                setAuthenticationModal({
                    isSignUp1Step: false,
                    isSignUp2Step: false,
                    isBusinessSignUp1Step: false,
                    isForgotPassOpen: false,
                    isSignUpOpen: false,
                    isSignInOpen: false
                });
            }
        } catch (error: any) {



            // return errorToast(error.message);
        }
    }

    const [passwordVisible, setPasswordVisible] = useState(false)

    return (
        <div style={{ fontFamily: "poppins, sans-serif" }}>

            <Modal
                className='bg-[#160B3A]'
                dismissible
                position="center"
                show={authenticationModal.isSignInOpen}
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
                    <div style={{ fontFamily: "poppins, sans-serif" }} className="py-3 flex items-center justify-center py-4">
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
                                        <Button className="bg-pink-500 text-white hover:bg-pink-600" onClick={handleSignIn}>Sign In</Button>
                                        <Button variant="ghost" asChild>
                                            <Link to={'#'} onClick={handleSignUp}>Sign Up</Link>
                                        </Button>
                                    </div>
                                </header>
                                <div className="text-center space-y-2">
                                    <h1 className="text-3xl font-bold tracking-tight">Login to your Raffily account to
                                        enter the magic!</h1>
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
                                {/* <div className='mt-6'>
                                    <h3 className='text-center text-md lg:text-lg font-bold tracking-wider text-black '>Login to your Raffily account to</h3>
                                    <h3 className='text-center text-md lg:text-lg font-bold tracking-wider text-black '>enter the magic!</h3>
                                </div> */}
                                <div className='mt-4'>
                                    <div className='flex items-center gap-4 rounded-md p-2 border-[1px] mt-2'>
                                        <input onChange={handleChange} value={userLoginData.emailOrUsername} className='w-[100%] border-none outline-none text-black' type="text" placeholder='Email' name="emailOrUsername" id="emailOrUsername" />
                                    </div>
                                    <div className='flex items-center justify-between gap-4 rounded-md p-2 border-[1px] mt-2'>
                                        <input onChange={handleChange} value={userLoginData.password} className='border-none outline-none w-[100%] text-black' type={passwordVisible ? "text" : "password"} placeholder='Password' name="password" id="password" />
                                        {
                                            passwordVisible ?
                                                <svg onClick={() => { setPasswordVisible(false) }} width="24" height="21" viewBox="0 0 29 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M0 12C1.26055 5.17301 7.27301 0 14.5 0C21.727 0 27.7395 5.17301 29 12C27.7395 18.8269 21.727 24 14.5 24C7.27301 24 1.26055 18.8269 0 12ZM14.5 18.6667C18.2011 18.6667 21.2014 15.6819 21.2014 12C21.2014 8.31811 18.2011 5.33333 14.5 5.33333C10.7989 5.33333 7.79858 8.31811 7.79858 12C7.79858 15.6819 10.7989 18.6667 14.5 18.6667ZM14.5 16C12.2793 16 10.4791 14.2092 10.4791 12C10.4791 9.7908 12.2793 8 14.5 8C16.7206 8 18.5209 9.7908 18.5209 12C18.5209 14.2092 16.7206 16 14.5 16Z" fill="black" fill-opacity="0.5" />
                                                </svg>
                                                :
                                                <svg onClick={() => { setPasswordVisible(true) }} width="24" height="21" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M4.47497 5.99383L0.284166 1.86667L2.17962 0L28.7159 26.1332L26.8204 28L22.3841 23.631C20.1039 25.0548 17.3997 25.8794 14.5 25.8794C7.27301 25.8794 1.26055 20.7583 0 14C0.585274 10.8621 2.19495 8.07711 4.47497 5.99383ZM18.1957 19.5063L16.2336 17.5739C15.7086 17.8212 15.1207 17.9598 14.5 17.9598C12.2793 17.9598 10.4791 16.1869 10.4791 14C10.4791 13.3886 10.6198 12.8097 10.871 12.2927L8.90887 10.3604C8.20721 11.4037 7.79858 12.6549 7.79858 14C7.79858 17.6449 10.7989 20.5997 14.5 20.5997C15.8658 20.5997 17.1362 20.1972 18.1957 19.5063ZM9.10429 3.12375C10.7754 2.47624 12.5955 2.12061 14.5 2.12061C21.727 2.12061 27.7395 7.24162 29 14C28.5816 16.2434 27.6395 18.3064 26.3032 20.0615L21.13 14.9669C21.1771 14.6513 21.2014 14.3284 21.2014 14C21.2014 10.3551 18.2011 7.40033 14.5 7.40033C14.1664 7.40033 13.8386 7.42432 13.5182 7.47064L9.10429 3.12375Z" fill="black" fill-opacity="0.5" />
                                                </svg>
                                        }
                                    </div>
                                </div>
                                <p onClick={handleForgotPassword} style={{ cursor: "pointer" }} className='text-right mt-2 text-purple-600 hover:underline font-medium'>Forgotten your Password?</p>
                                {/* <div onClick={handleSubmit} className='text-center bg-[#20124C] p-4 rounded-md flex items-center text-white gap-4 font-bold mt-4 cursor-pointer'>
                                    <p className='text-center w-full text-xl font-medium'>Login</p>
                                </div> */}
                                <Button
                                    className="w-full h-12 text-lg font-bold bg-purple-700 hover:bg-purple-800 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-150 text-white"
                                    onClick={handleSubmit}
                                >
                                    Sign In
                                </Button>
                                <div className="relative py-3">
                                    <div className="absolute inset-0 flex items-center">
                                        <span className="w-full border-t border-gray-300" />
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-2 bg-white text-gray-500">Or continue with</span>
                                    </div>
                                </div>
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
                                    {/* <GoogleOAuthProvider clientId={clientId}>
                                        <GoogleLoginButton setAuthenticationModal={setAuthenticationModal} userLoginData={userLoginData} setUserLoginData={setUserLoginData} onFailure={onFailure} onSuccess={onSuccess} authenticationModal={authenticationModal} />
                                    </GoogleOAuthProvider> */}
                                </div>
                                {/* <div className='flex items-center justify-around mt-4'>
                                    <GoogleOAuthProvider clientId={clientId}>
                                        <GoogleLogin
                                            onSuccess={handleGoogleSignUpSuccess}
                                            onError={handleGoogleLoginFailure}
                                        />
                                    </GoogleOAuthProvider>
                                </div> */}
                                <div className='flex items-center gap-1 justify-center mt-4'>
                                    <p className='text-black'>Dont' have an account?</p>
                                    <span onClick={handleSignUp} className='cursor-pointer text-purple-600 hover:underline text-lg'>Sign Up</span>
                                </div>
                                <div className='flex flex-col justify-center items-center mt-4 pb-4 w-fit m-auto text-center'>
                                    <p className='text-xs lg:text-md text-black'>By creating an account, you agree to Raffily's </p>
                                    <p><span className='text-purple-600 hover:underline text-xs lg:text-md'><a href="/terms-and-conditions">Terms and Conditions</a>, <a href="/privacy-policy">Privacy Policy</a></span>
                                        &nbsp;<span className='text-xs lg:text-md text-black'>and</span>&nbsp;
                                        <span className='text-purple-600 hover:underline text-xs lg:text-md'><a href="/cookies">Cookie Policy</a></span></p>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </Modal>
        </div>
    )
}

export default SignIn