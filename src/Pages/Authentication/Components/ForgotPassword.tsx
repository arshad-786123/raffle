import React, { useState } from 'react'
import { Modal } from 'flowbite-react';
import google from '../../../assets/authentication/google.png'
import apple from '../../../assets/authentication/apple.png'
import facebook from '../../../assets/authentication/facebook.png'
import OTPInput from 'react-otp-input';
import { sendOTP } from '../../../Services/Authentication/sendOTP';
import { successToast } from '../../../Utils/Toast/success.toast';
import { errorToast } from '../../../Utils/Toast/error.toast';
import { verifyUser } from '../../../Services/Authentication/verifyUser';
import { forgotPassword } from '../../../Services/Authentication/forgotPassword';

const ForgotPasword = ({ authenticationModal, setAuthenticationModal }: any) => {

    const onClose = (): void => {
        setAuthenticationModal({
            isSignUp1Step: false,
            isSignUp2Step: false,
            isForgotPassOpen: false,
            isBusinessSignUp1Step: false,
            isSignInOpen: false,
            isSignUpOpen: false
        });
    };



    const handleForgotPassword = () => {
        setAuthenticationModal({
            isSignUp1Step: false,
            isSignUp2Step: false,
            isForgotPassOpen: true,
            isBusinessSignUp1Step: false,
            isSignUpOpen: false,
            isSignInOpen: false
        });
    }

    const goBack = () => {
        setAuthenticationModal({
            isSignUp1Step: false,
            isSignUp2Step: false,
            isForgotPassOpen: false,
            isBusinessSignUp1Step: false,
            isSignUpOpen: false,
            isSignInOpen: true
        });
    }

    const [isEmailSent, setIsEmailSent] = useState(false)
    const [otp, setOtp] = useState("")

    const [userData, setUserData] = useState({
        email: "",
        code: "",
        type: "RESET_PASSWORD",
        password: "",
        confirmPassword: ""
    })

    const handleChange = (e: any) => {
        setUserData((prev) => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    const handleSendOTP = async () => {
        try {
            const a = await sendOTP(userData)
            if (a.success) {
                successToast("Mail sent successfully!")
            } else {
                errorToast(a.message)
            }
        } catch (error: any) {
            errorToast(error.message)
        }
    }

    const handleVerifyOTP = async () => {
        try {

            if (!otp) {
                return errorToast("Please fill the OTP")
            }
            setUserData({ ...userData, code: otp })
            const a = await verifyUser(userData)
            if (a.success) {
                successToast("User Verified!")
                setIsEmailSent(true)
            } else {
                errorToast(a.message)
            }
        } catch (error: any) {
            errorToast(error.message)
        }
    }

    const handleSubmit = async () => {
        try {
            if (userData.password !== userData.confirmPassword) {
                return errorToast("Password Mismatch")
            }
            const a = await forgotPassword(userData)
            if (a.success) {
                successToast("User Verified!")
                setAuthenticationModal({
                    isSignUp1Step: false,
                    isSignUp2Step: false,
                    isForgotPassOpen: false,
                    isBusinessSignUp1Step: false,
                    isSignUpOpen: false,
                    isSignInOpen: true
                });
            } else {
                errorToast(a.message)
            }

        } catch (error: any) {
            errorToast(error.message)
        }
    }

    const [visible, setVisible] = useState({
        newPassword: false,
        confirmNewPassword: false
    })

    return (
        <div >

            <Modal
                className='bg-[#160B3A]'
                dismissible
                position="center"
                show={authenticationModal.isForgotPassOpen}
                onClose={onClose}
                popup
            >
                <div className='rounded-md'>
                    <Modal.Header className='bg-white  rounded-t-md' />
                    {
                        isEmailSent ?
                            <Modal.Body className="bg-white text-secondary  h-full xs:h-auto rounded-b-md" style={{ fontFamily: "poppins, sans-serif" }}>
                                <div onClick={() => setIsEmailSent(false)} className='cursor-pointer absolute top-4'>
                                    <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.44033 14.0972C9.85557 14.5178 9.86807 15.213 9.46885 15.6503C9.26416 15.8743 8.99072 15.9872 8.71728 15.9872C8.45713 15.9872 8.19658 15.8854 7.99463 15.6806L1.21611 8.81616C1.01182 8.60964 0.895996 8.32353 0.895996 8.02529C0.895996 7.72601 1.01182 7.44052 1.21611 7.23339L7.99463 0.369592C8.40947 -0.0506281 9.06963 -0.0372585 9.46885 0.399622C9.86807 0.837531 9.85537 1.53276 9.44033 1.95256L3.44385 8.02529L9.44033 14.0972Z" fill="black" />
                                    </svg>
                                </div>
                                <div className='mt-0' >
                                    <h3 className='text-center text-lg font-bold tracking-wider' style={{ color: "black", fontFamily: "poppins, sans-serif" }}>Forgot Password</h3>
                                </div>
                                {/* <p className='my-4 text-center w-[80%] m-auto py-12'>We have sent an email to raffilytest@gmail.com with a link to reset your pasword.</p> */}
                                <div className='flex justify-between items-center gap-4 rounded-md p-4 border-[1px] mt-2' style={{ color: "black", fontFamily: "poppins, sans-serif" }}>
                                    <input onChange={handleChange} className='w-[100%] border-none outline-none' type={visible.newPassword ? "text" : "password"} placeholder='Enter your password' name="password" id="email" style={{ color: "black", fontFamily: "poppins, sans-serif" }} />
                                    {
                                        visible.newPassword ?
                                            <svg onClick={() => { setVisible({ ...visible, newPassword: false }) }} width="24" height="21" viewBox="0 0 29 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0 12C1.26055 5.17301 7.27301 0 14.5 0C21.727 0 27.7395 5.17301 29 12C27.7395 18.8269 21.727 24 14.5 24C7.27301 24 1.26055 18.8269 0 12ZM14.5 18.6667C18.2011 18.6667 21.2014 15.6819 21.2014 12C21.2014 8.31811 18.2011 5.33333 14.5 5.33333C10.7989 5.33333 7.79858 8.31811 7.79858 12C7.79858 15.6819 10.7989 18.6667 14.5 18.6667ZM14.5 16C12.2793 16 10.4791 14.2092 10.4791 12C10.4791 9.7908 12.2793 8 14.5 8C16.7206 8 18.5209 9.7908 18.5209 12C18.5209 14.2092 16.7206 16 14.5 16Z" fill="black" fill-opacity="0.5" />
                                            </svg>
                                            :
                                            <svg onClick={() => { setVisible({ ...visible, newPassword: true }) }} width="24" height="21" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M4.47497 5.99383L0.284166 1.86667L2.17962 0L28.7159 26.1332L26.8204 28L22.3841 23.631C20.1039 25.0548 17.3997 25.8794 14.5 25.8794C7.27301 25.8794 1.26055 20.7583 0 14C0.585274 10.8621 2.19495 8.07711 4.47497 5.99383ZM18.1957 19.5063L16.2336 17.5739C15.7086 17.8212 15.1207 17.9598 14.5 17.9598C12.2793 17.9598 10.4791 16.1869 10.4791 14C10.4791 13.3886 10.6198 12.8097 10.871 12.2927L8.90887 10.3604C8.20721 11.4037 7.79858 12.6549 7.79858 14C7.79858 17.6449 10.7989 20.5997 14.5 20.5997C15.8658 20.5997 17.1362 20.1972 18.1957 19.5063ZM9.10429 3.12375C10.7754 2.47624 12.5955 2.12061 14.5 2.12061C21.727 2.12061 27.7395 7.24162 29 14C28.5816 16.2434 27.6395 18.3064 26.3032 20.0615L21.13 14.9669C21.1771 14.6513 21.2014 14.3284 21.2014 14C21.2014 10.3551 18.2011 7.40033 14.5 7.40033C14.1664 7.40033 13.8386 7.42432 13.5182 7.47064L9.10429 3.12375Z" fill="black" fill-opacity="0.5" />
                                            </svg>
                                    }
                                </div>
                                <div className='flex justify-between items-center gap-4 rounded-md p-4 border-[1px] mt-2' style={{ color: "black", fontFamily: "poppins, sans-serif" }}>
                                    <input onChange={handleChange} className='w-[100%] border-none outline-none' type={visible.confirmNewPassword ? "text" : "password"} placeholder='Enter your confirm password' name="confirmPassword" id="email" style={{ color: "black", fontFamily: "poppins, sans-serif" }} />
                                    {
                                        visible.confirmNewPassword ?
                                            <svg onClick={() => { setVisible({ ...visible, confirmNewPassword: false }) }} width="24" height="21" viewBox="0 0 29 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0 12C1.26055 5.17301 7.27301 0 14.5 0C21.727 0 27.7395 5.17301 29 12C27.7395 18.8269 21.727 24 14.5 24C7.27301 24 1.26055 18.8269 0 12ZM14.5 18.6667C18.2011 18.6667 21.2014 15.6819 21.2014 12C21.2014 8.31811 18.2011 5.33333 14.5 5.33333C10.7989 5.33333 7.79858 8.31811 7.79858 12C7.79858 15.6819 10.7989 18.6667 14.5 18.6667ZM14.5 16C12.2793 16 10.4791 14.2092 10.4791 12C10.4791 9.7908 12.2793 8 14.5 8C16.7206 8 18.5209 9.7908 18.5209 12C18.5209 14.2092 16.7206 16 14.5 16Z" fill="black" fill-opacity="0.5" />
                                            </svg>
                                            :
                                            <svg onClick={() => { setVisible({ ...visible, confirmNewPassword: true }) }} width="24" height="21" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M4.47497 5.99383L0.284166 1.86667L2.17962 0L28.7159 26.1332L26.8204 28L22.3841 23.631C20.1039 25.0548 17.3997 25.8794 14.5 25.8794C7.27301 25.8794 1.26055 20.7583 0 14C0.585274 10.8621 2.19495 8.07711 4.47497 5.99383ZM18.1957 19.5063L16.2336 17.5739C15.7086 17.8212 15.1207 17.9598 14.5 17.9598C12.2793 17.9598 10.4791 16.1869 10.4791 14C10.4791 13.3886 10.6198 12.8097 10.871 12.2927L8.90887 10.3604C8.20721 11.4037 7.79858 12.6549 7.79858 14C7.79858 17.6449 10.7989 20.5997 14.5 20.5997C15.8658 20.5997 17.1362 20.1972 18.1957 19.5063ZM9.10429 3.12375C10.7754 2.47624 12.5955 2.12061 14.5 2.12061C21.727 2.12061 27.7395 7.24162 29 14C28.5816 16.2434 27.6395 18.3064 26.3032 20.0615L21.13 14.9669C21.1771 14.6513 21.2014 14.3284 21.2014 14C21.2014 10.3551 18.2011 7.40033 14.5 7.40033C14.1664 7.40033 13.8386 7.42432 13.5182 7.47064L9.10429 3.12375Z" fill="black" fill-opacity="0.5" />
                                            </svg>
                                    }
                                </div>
                                <div onClick={handleSubmit} className='text-center bg-[#20124C] p-4 rounded-md flex items-center text-white gap-4 font-bold mt-4 cursor-pointer'>
                                    <p className='text-center w-full text-xl font-medium ' style={{ fontFamily: "poppins, sans-serif" }}>Reset Password</p>
                                </div>
                            </Modal.Body> :
                            <Modal.Body className="bg-white text-secondary  h-full xs:h-auto rounded-b-md">
                                <div onClick={goBack} className='cursor-pointer absolute top-4'>
                                    <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.44033 14.0972C9.85557 14.5178 9.86807 15.213 9.46885 15.6503C9.26416 15.8743 8.99072 15.9872 8.71728 15.9872C8.45713 15.9872 8.19658 15.8854 7.99463 15.6806L1.21611 8.81616C1.01182 8.60964 0.895996 8.32353 0.895996 8.02529C0.895996 7.72601 1.01182 7.44052 1.21611 7.23339L7.99463 0.369592C8.40947 -0.0506281 9.06963 -0.0372585 9.46885 0.399622C9.86807 0.837531 9.85537 1.53276 9.44033 1.95256L3.44385 8.02529L9.44033 14.0972Z" fill="black" />
                                    </svg>
                                </div>
                                <div className='mt-0' style={{ color: "black", fontFamily: "poppins, sans-serif" }}>
                                    <h3 className='text-center text-lg font-bold tracking-wider'>Forgot Password</h3>
                                </div>
                                <p className='my-4 text-center' style={{ color: "black", fontFamily: "poppins, sans-serif" }}>Enter the email address associated with your Raffily account.</p>
                                <div className='mt-4'>
                                    <div className='flex justify-between items-center gap-4 rounded-md p-2 border-[1px] mt-2'>
                                        <input onChange={handleChange} className='w-[100%] border-none outline-none' type="text" placeholder='Enter your email address' name="email" id="email" style={{ color: "black", fontFamily: "poppins, sans-serif" }} />
                                        <button onClick={handleSendOTP} className='bg-[#20124C] text-white py-2 px-4 rounded-xl w-[30%]' style={{ fontFamily: "poppins, sans-serif" }}>Send Code</button>
                                    </div>
                                </div>

                                <p className='mt-6 text-center' style={{ color: "black", fontFamily: "poppins, sans-serif" }}>Enter Code</p>
                                <div className='hidden lg:flex justify-around mt-3 ' style={{ color: "black", fontFamily: "poppins, sans-serif" }}>
                                    <OTPInput
                                        value={otp}
                                        onChange={setOtp}
                                        numInputs={6}
                                        renderSeparator={<span></span>}
                                        renderInput={(props) => <input
                                            {...props}
                                            style={{ border: '1px solid #000', width: '60px', height: "60px", marginRight: '10px', textAlign: 'center', borderRadius: '5px', color: "black", fontFamily: "poppins, sans-serif" }}
                                        />}
                                    />
                                </div>


                                <div className='block lg:hidden flex justify-center mt-6' style={{ color: "black", fontFamily: "poppins, sans-serif" }}>
                                    <OTPInput
                                        value={otp}
                                        onChange={setOtp}
                                        numInputs={6}
                                        renderSeparator={<span></span>}
                                        renderInput={(props) => <input
                                            {...props}
                                            style={{ border: '1px solid #000', width: '40px', height: "40px", marginRight: '10px', textAlign: 'center', borderRadius: '5px', color: "black", fontFamily: "poppins, sans-serif" }}
                                        />}
                                    />
                                </div>


                                <br />
                                <div onClick={handleVerifyOTP} className='text-center bg-[#20124C] p-4 rounded-md flex items-center text-white gap-4 font-bold mt-4 cursor-pointer'>
                                    <p className='text-center w-full text-xl font-medium' style={{ fontFamily: "poppins, sans-serif" }}>Verify</p>
                                </div>
                            </Modal.Body>
                    }
                </div>
            </Modal>
        </div>
    )
}

export default ForgotPasword