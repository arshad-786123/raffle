import React, { useState } from 'react'
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

interface SignUpProps {
    authenticationModal: any;
    setAuthenticationModal: React.Dispatch<React.SetStateAction<any>>;
    userRegisterData: UserRegister;
    setUserRegisterData: React.Dispatch<React.SetStateAction<UserRegister>>;
    onSuccess?: (response: any) => void;
    onFailure?: (error: any) => void;
}


const SignUp: React.FC<SignUpProps> = ({ authenticationModal, setAuthenticationModal, setUserRegisterData, userRegisterData, onSuccess, onFailure }: any) => {

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
        } else {
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

    // const handleFacebookResponse = async (response: any) => {
    //     try {
    //         const { accessToken, userID, name, email } = response;
    //         const payload = {
    //             userId: userID,
    //             email: email,
    //             name: name,
    //             role: userRegisterData.role,
    //             loginType: 'Facebook',
    //         };
    //         const apiResponse = await socialLogin(payload);

    //         if (apiResponse.success) {
    //             const { accessToken, refreshToken, user } = apiResponse.result;
    //             Cookies.set('accessToken', accessToken);
    //             Cookies.set('refreshToken', refreshToken);
    //             dispatch(storeUser(user));
    //             successToast('Successfully logged in with Facebook');
    //             onClose();
    //         } else {
    //             errorToast(apiResponse.message || 'Failed to log in with Facebook');
    //         }
    //     } catch (error) {
    //         errorToast('An error occurred while logging in with Facebook');
    //     }
    // };



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
        <div >
            <Toaster position="top-right"
                reverseOrder={false} />
            <Modal
                className='bg-[#160B3A]'
                dismissible
                position="center"
                show={authenticationModal.isSignUpOpen}
                onClose={onClose}
                popup
            >
                <div className='rounded-md'>
                    <Modal.Header className='bg-white  rounded-t-md' />

                    <Modal.Body className="bg-white text-secondary  h-full xs:h-auto rounded-b-md" style={{ fontFamily: "poppins, sans-serif" }}>

                        <div className='cursor-pointer  m-auto rounded-md flex items-center justify-between  w-[250px] border-[1px] border-black'>
                            <div onClick={handleSignIn} className={`${authenticationModal.isSignInOpen && " cursor-pointer bg-[#FF6A78]"} py-3 px-8 text-black`}>
                                Sign in
                            </div>
                            <div onClick={handleSignUp} className={`${authenticationModal.isSignUpOpen && "cursor-pointer  bg-[#FF6A78]"} py-3 px-8 text-black`}>
                                Sign up
                            </div>
                        </div>
                        <div className='mt-6'>
                            <h3 className='text-center text-md lg:text-lg font-bold tracking-wider text-black  '>Create your Raffily account and</h3>
                            <h3 className='text-center text-md lg:text-lg font-bold tracking-wider text-black'>join the action!</h3>
                        </div>
                        <div className='mt-4'>
                            <div className='flex items-center gap-4 rounded-md p-2 border-[1px] mt-2'>
                                <input onChange={handleChange} value={userRegisterData.email} className='border-none outline-none w-[100%] text-black' type="email" placeholder='Email' name="email" id="email" />
                            </div>
                            {/* <div className='flex items-center justify-between gap-4 rounded-md p-4 border-[1px] mt-2'> */}
                            {/* <input className='border-none outline-none' type="text" placeholder='Business or Customer' name="email" id="email" />
                                <svg width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.404281 0.457407C0.736295 -0.0535613 1.3419 -0.136404 1.75694 0.272371L7.57145 5.99929L13.386 0.272371C13.8011 -0.136404 14.4066 -0.0535613 14.7387 0.457407C15.0707 0.968359 15.0034 1.71392 14.5883 2.12276L8.17261 8.44173C7.82115 8.78785 7.32175 8.78785 6.9703 8.44173L0.554576 2.12276C0.139542 1.71392 0.0722541 0.968359 0.404281 0.457407Z" fill="#28303F" fill-opacity="0.41" />
                                </svg> */}
                            <div className='w-full'>
                                {/* <Select
                                    onChange={handleChange}
                                    value={userRegisterData.role}
                                    name="role"
                                    aria-placeholder='Business or Customer'
                                    className='rounded-md mt-2'
                                    id="countries"
                                    required
                                    style={{ backgroundColor: 'white', color: 'gray', padding: '10px', height: '55px', border: '1px solid lightgray', outline: 'none', fontSize: '16px', letterSpacing: '.5px', fontWeight: '400', cursor: 'pointer' }}
                                >
                                    <option >Business
                                    </option>
                                    <option>Customer</option>
                                </Select> */}
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
                        <div onClick={handleSignUp1Step} className='text-center bg-[#20124C] p-4 rounded-md flex items-center text-white gap-4 font-bold mt-4 cursor-pointer'>
                            <p className='text-center w-full text-xl font-medium'>Get Started!</p>
                        </div>
                        <div className='flex items-center gap-6 justify-center mt-4'>
                            <svg className='w-20 lg:w-fit' width="182" height="2" viewBox="0 0 182 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <line x1="0.196289" y1="0.969971" x2="181.527" y2="0.969971" stroke="#ACACAC" stroke-width="0.5" />
                            </svg>
                            <p className='text-gray-400 text-xs lg:text-md'>or continue with</p>
                            <svg className='w-20 lg:w-fit' width="182" height="2" viewBox="0 0 182 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <line x1="0.196289" y1="0.969971" x2="181.527" y2="0.969971" stroke="#ACACAC" stroke-width="0.5" />
                            </svg>
                        </div>
                        {userRegisterData.role && (
                            <div className='flex items-center justify-around mt-4'>
                                <GoogleOAuthProvider clientId={clientId}>
                                    <GoogleLogin
                                        onSuccess={handleGoogleSignUpSuccess}
                                        onError={handleGoogleLoginFailure}
                                        useOneTap
                                    />
                                </GoogleOAuthProvider>
                                {/* <div className="border-[1px] rounded-md px-6 lg:px-12 py-2">
                                    <FacebookLogin
                                        appId="8985913114770801"
                                        fields="name,email,picture"
                                        callback={handleFacebookResponse}
                                        cssClass="my-facebook-button-class"
                                        icon="fa-facebook"
                                        textButton=""
                                    />
                                </div> */}
                                {/* <div className='border-[1px] rounded-md px-6 lg:px-12 py-2'>
                                    <img className='w-6' src={apple} alt="apple" />
                                </div> */}
                            </div>
                        )}
                        <div className='flex items-center gap-1 justify-center mt-4 text-black'>
                            <p>Already have an account?</p>
                            <span onClick={handleSignIn} className='cursor-pointer text-[#EB4C60] text-lg font-bold'>Sign In</span>
                        </div>
                        <div className='flex flex-col justify-center items-center mt-4 w-fit m-auto text-center'>
                            <p className='text-xs lg:text-md text-black'>By creating an account, you agree to Raffily's</p>
                            <p><span className='text-[#EB4C60] text-xs lg:text-md'><a href="/terms-and-conditions"> Terms and Conditions</a>, <a href="/privacy-policy">Privacy Policy</a></span>
                                &nbsp;<span className='text-xs lg:text-md text-black'>and</span>&nbsp;
                                <span className='text-[#EB4C60] text-xs lg:text-md'><a href="/cookies">Cookie Policy</a></span></p>
                        </div>
                    </Modal.Body>
                </div>
            </Modal>
        </div>
    )
}

export default SignUp