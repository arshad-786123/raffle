import React, { useEffect, useState } from 'react'
import logo from "../../assets/main_logo.png"
import commingSoon from "../../assets/comming_soon.jpg"
import left_side_bar from "../../assets/left_side_cs.png"
import mobile_left_sidebar from '../../assets/mobile_left_sidebar.png';
import video_img from "../../assets/video_cs.jpg"
import leftRectangle from '../../assets/left_rectange.png'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { API_INSTANCE } from '../../API/Instance'
import { API_ENDPOINTS } from '../../constants'
import toast, { Toaster } from 'react-hot-toast'
import RaffilyAds from '../../assets/loadingVideo.mp4'
import { UserRegister } from '../../Utils/Interface/register.interface';
// import { Country, getCountries } from '../../Services/General/countries';
import uk from '../../assets/uk.png'
import { useNavigate } from 'react-router';

const ComingSoon = () => {
    const [isBusinessSelected, setIsBusinessSelected] = useState(true)



    const navigate = useNavigate();

    const handleLogoClick = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        e.preventDefault();
        navigate('/');
    };

    const formik = useFormik({
        initialValues: {
            fullname: '',
            businessName: '',
            userType: isBusinessSelected ? "BUSINESS" : "USER",
            email: '',
            phone: '',
            countryCode: "+44",
        },
        validationSchema: Yup.object({
            fullname: Yup.string()
                .required('Full Name is required'),
            businessName: Yup.string()
                .required('Business Name is required'),
            email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
            phone: Yup.string()
                .required('Phone Number is required'),
        }),
        onSubmit: async (values: any, { resetForm }: any) => {
            try {
                const response = await API_INSTANCE.post(API_ENDPOINTS.CSFORM_REGISTER, { ...values }, {
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                if (response.data.success) {
                    toast.success('Successfully added!')
                    resetForm();
                } else {
                    toast.error(response.data.message)

                }
                // const countries = response.data; // Assuming response.data is an array of Country objects
                // return countries;
            } catch (error) {
                toast.error('Something went wrong!')
                throw error; // Propagate the error for handling upstream
            }

        },
    });
    const customerFormik = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            userType: isBusinessSelected ? "USER" : "BUSINESS",
            email: '',
            phone: '',
            countryCode: "+44",
        },
        validationSchema: Yup.object({
            firstname: Yup.string()
                .required('First Name is required'),
            lastname: Yup.string()
                .required('Last Name is required'),
            email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
            phone: Yup.string()
                // .matches(/^\d{10}$/, 'Phone number must be 10 digits')
                .required('Phone Number is required'),
        }),
        onSubmit: async (values: any, { resetForm }: any) => {
            try {
                const response = await API_INSTANCE.post(API_ENDPOINTS.CSFORM_REGISTER, { ...values }, {
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                if (response.data.success) {
                    toast.success('Successfully added!')
                    resetForm();
                } else {
                    toast.error(response.data.message)

                }
                // const countries = response.data; // Assuming response.data is an array of Country objects
                // return countries;
            } catch (error) {
                toast.error('Something went wrong!')
                throw error; // Propagate the error for handling upstream
            }

        },
    });

    //const [countriesData, setCountriesData] = useState<Country[]>([])

    // useEffect(() => {
    //     const countries = async () => {
    //         const result = await getCountries();
    //         formik.setFieldValue('countryCode', result[0].dial_code);
    //         customerFormik.setFieldValue('countryCode', result[0].dial_code);
    //         setCountriesData(result)
    //     }
    //     countries()
    // }, [])



    // const handleSelectDialCode = (e: any): void => {
    //     const selectedOption = e.target.selectedOptions[0];
    //     const name = selectedOption.getAttribute('data-name');
    //     const dialCode = selectedOption.getAttribute('data-dialcode');
    //     formik.setFieldValue('countryCode', dialCode);
    //     customerFormik.setFieldValue('countryCode', dialCode);
    // }


    const CountdownTimer = () => {
        const endDate = new Date('2024-07-25T00:00:00Z'); // Replace with your desired end date in UTC

        const calculateTimeRemaining = () => {
            const now = new Date();

            // Convert both endDate and current time to GMT+1
            const offsetGMT1 = 60; // GMT+1 in minutes
            const nowInGMT1 = new Date(now.getTime() + now.getTimezoneOffset() * 60000 + offsetGMT1 * 60000);
            const endInGMT1 = new Date(endDate.getTime() + offsetGMT1 * 60000);

            const difference = endInGMT1.getTime() - nowInGMT1.getTime();

            let timeRemaining = {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
            };

            if (difference > 0) {
                timeRemaining = {
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                };
            }

            return timeRemaining;
        };

        const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

        useEffect(() => {
            const timer = setInterval(() => {
                setTimeRemaining(calculateTimeRemaining());
            }, 1000);

            return () => clearInterval(timer);
        }, []);

        const formatTime = (time: number) => {
            return String(time).padStart(2, '0');
        };

        return (
            <div>
                {timeRemaining.days}D : {formatTime(timeRemaining.hours)}H : {formatTime(timeRemaining.minutes)}M : {formatTime(timeRemaining.seconds)}S
            </div>
        );
    };
    // const CountdownTimer = () => {
    //     const calculateTimeLeft = () => {
    //         const difference = +new Date('2024-07-03T00:00:00') - +new Date();
    //         let timeLeft = {};

    //         if (difference > 0) {
    //             timeLeft = {
    //                 days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    //                 hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    //                 minutes: Math.floor((difference / 1000 / 60) % 60),
    //                 seconds: Math.floor((difference / 1000) % 60)
    //             };
    //         } else {
    //             timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    //         }

    //         return timeLeft;
    //     };

    //     const [timeLeft, setTimeLeft] = useState<any>(calculateTimeLeft());

    //     useEffect(() => {
    //         const timer = setTimeout(() => {
    //             setTimeLeft(calculateTimeLeft());
    //         }, 1000);

    //         return () => clearTimeout(timer);
    //     }, [timeLeft]);

    //     const formatTime = (time: any) => {
    //         return String(time).padStart(2, '0');
    //     };

    //     return (
    //         <div>
    //             {timeLeft.days}D : {formatTime(timeLeft.hours)}H : {formatTime(timeLeft.minutes)}M
    //             {/* :{formatTime(timeLeft.seconds)} */}
    //         </div>
    //     );
    // };


    return (
        <>
            <div className='zHigh22'>
                <Toaster position="top-right"
                    reverseOrder={false} />
            </div>
            <div className="min-h-screen  text-white flex flex-col  p-4" style={{ background: "#20124C" }}>
                <header className="px-10 mt-10 w-full">
                    <img src={logo} className='w-40 ' alt="logo"
                        onClick={handleLogoClick}
                        style={{ cursor: 'pointer' }} />
                </header>

                <section className="mt-10  py-6 flex  lg:flex-row flex-col justify-between gap-10  rounded-lg w-full m-auto text-center">
                    <div className='flex items-center comming-soon-1 flex-col justify-center  lg:ml-[50px] xl:ml-[100px] w-[100%] lg:w-[30%]'>
                        <img src={commingSoon} className='w-[300px] md:w-[300px] lg:w-[350px] xl:w-[400px] 2xl:w-[500px]' alt="comming_soon" />
                        <p className="text-4xl mb-4 text-rose-400 tracking-[15px] lg:tracking-[20px]" >STAY TUNED</p>
                        <div className="flex items-center gap-4 comming_soon_timer w-2/4 p-4 px-10 rounded-full inline-block">
                            <svg width="29" height="34" viewBox="0 0 29 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18.4044 7.63437C18.8276 6.88772 19.0541 6.04573 19.0625 5.1875C19.0625 3.84484 18.5292 2.55717 17.5798 1.60777C16.6304 0.658369 15.3427 0.125 14 0.125C12.6574 0.125 11.3697 0.658369 10.4203 1.60777C9.4709 2.55717 8.93753 3.84484 8.93753 5.1875C8.94594 6.04573 9.17241 6.88772 9.59565 7.63437C6.57708 8.67619 4.02554 10.7543 2.39431 13.4995C0.763084 16.2447 0.157796 19.4793 0.685977 22.6286C1.21416 25.778 2.84161 28.6381 5.27921 30.7009C7.71681 32.7637 10.8067 33.8957 14 33.8957C17.1933 33.8957 20.2832 32.7637 22.7208 30.7009C25.1584 28.6381 26.7859 25.778 27.3141 22.6286C27.8423 19.4793 27.237 16.2447 25.6057 13.4995C23.9745 10.7543 21.423 8.67619 18.4044 7.63437ZM12.3125 5.1875C12.3125 4.85374 12.4115 4.52748 12.5969 4.24997C12.7823 3.97247 13.0459 3.75618 13.3542 3.62845C13.6626 3.50073 14.0019 3.46731 14.3292 3.53242C14.6566 3.59754 14.9573 3.75826 15.1933 3.99426C15.4293 4.23026 15.59 4.53094 15.6551 4.85828C15.7202 5.18563 15.6868 5.52493 15.5591 5.83328C15.4314 6.14163 15.2151 6.40518 14.9376 6.5906C14.66 6.77603 14.3338 6.875 14 6.875C13.5525 6.875 13.1233 6.69721 12.8068 6.38074C12.4903 6.06427 12.3125 5.63505 12.3125 5.1875ZM14 30.5C11.9975 30.5 10.0399 29.9062 8.37488 28.7936C6.70983 27.6811 5.41209 26.0998 4.64575 24.2497C3.87941 22.3996 3.6789 20.3638 4.06958 18.3997C4.46025 16.4357 5.42457 14.6316 6.84057 13.2155C8.25658 11.7995 10.0607 10.8352 12.0247 10.4445C13.9888 10.0539 16.0246 10.2544 17.8747 11.0207C19.7248 11.7871 21.3061 13.0848 22.4187 14.7499C23.5312 16.4149 24.125 18.3725 24.125 20.375C24.125 23.0603 23.0583 25.6357 21.1595 27.5345C19.2607 29.4333 16.6853 30.5 14 30.5Z" fill="white" />
                                <path d="M28.1919 8.56249L25.8125 6.18312C25.4897 5.90666 25.0744 5.7622 24.6497 5.7786C24.225 5.79501 23.8221 5.97107 23.5216 6.2716C23.2211 6.57214 23.045 6.97501 23.0286 7.39971C23.0122 7.82442 23.1567 8.23967 23.4331 8.56249L25.8125 10.9419C25.9688 11.1013 26.1552 11.2282 26.3608 11.3151C26.5665 11.402 26.7873 11.4472 27.0106 11.4481C27.4557 11.4418 27.8803 11.2598 28.1919 10.9419C28.5062 10.6257 28.6826 10.198 28.6826 9.75218C28.6826 9.30636 28.5062 8.87866 28.1919 8.56249Z" fill="white" />
                                <path d="M14 13.625C13.5524 13.625 13.1232 13.8028 12.8068 14.1193C12.4903 14.4357 12.3125 14.8649 12.3125 15.3125V22.0625C12.3125 22.5101 12.4903 22.9393 12.8068 23.2557C13.1232 23.5722 13.5524 23.75 14 23.75C14.4476 23.75 14.8768 23.5722 15.1932 23.2557C15.5097 22.9393 15.6875 22.5101 15.6875 22.0625V15.3125C15.6875 14.8649 15.5097 14.4357 15.1932 14.1193C14.8768 13.8028 14.4476 13.625 14 13.625Z" fill="white" />
                            </svg>
                            <p className="text-2xl tracking-widest mt-[4px]"><CountdownTimer /></p>

                        </div>
                    </div>
                    <div className='flex justify-between w-[100%] md:w-[100%] lg:w-[70%]  xl:w-[60%] 2xl:w-[50%]'>
                        <div className='left-sidebar flex justify-between zHigh w-[100%] lg:w-[100%] xl:w-[50%]'>
                            <div className="bg-pink-100 comming-soon-2  rounded-lg shadow-lg max-w-md w-full m-auto z-50 ">
                                <div className='flex w-[100%] items-center justify-around   border-b-[1px] border-slate-300 '>
                                    <div onClick={() => setIsBusinessSelected(true)} className={`cursor-pointer w-[50%] h-full ${isBusinessSelected ? "bg-[#20124C] border-[1px] border-white" : ""} py-4 rounded-lg`}>
                                        <h3 className={`${isBusinessSelected ? "text-white" : "text-black"}`}>Business</h3>
                                    </div>
                                    <div className=' w-[1px] bg-slate-400'></div>
                                    <div onClick={() => setIsBusinessSelected(false)} className={`cursor-pointer w-[50%] h-full ${isBusinessSelected ? "" : "bg-[#20124C] border-[1px] border-white"} py-4 rounded-lg`}>
                                        <h3 className={`${isBusinessSelected ? "text-black" : "text-white"}`}>Customer</h3>
                                    </div>
                                </div>
                                {
                                    isBusinessSelected ?
                                        <div className='p-6'>
                                            <h2 className="text-2xl font-bold text-center text-purple-900 mb-4">I want to run a raffle!</h2>
                                            <form onSubmit={formik.handleSubmit} className="space-y-4 csform">
                                                <div className='text-start'>
                                                    <label className="block text-sm text-gray-700" htmlFor="fullName">Full Name</label>
                                                    <input
                                                        id="fullname"
                                                        name="fullname"
                                                        type="text"
                                                        className="w-full p-2 border rounded mt-1"
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.fullname}
                                                    />
                                                    {formik.touched.fullname && formik.errors.fullname ? (
                                                        <div className="text-red-500 text-sm">{formik.errors.fullname}</div>
                                                    ) : null}
                                                </div>
                                                <div className='text-start'>
                                                    <label className="block text-sm text-gray-700" htmlFor="businessName">Business Name</label>
                                                    <input
                                                        id="businessName"
                                                        name="businessName"
                                                        type="text"
                                                        className="w-full p-2 border rounded mt-1"
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.businessName}
                                                    />
                                                    {formik.touched.businessName && formik.errors.businessName ? (
                                                        <div className="text-red-500 text-sm">{formik.errors.businessName}</div>
                                                    ) : null}
                                                </div>
                                                <div className='text-start'>
                                                    <label className="block text-sm text-gray-700" htmlFor="email">Email address</label>
                                                    <input
                                                        id="email"
                                                        name="email"
                                                        type="email"
                                                        className="w-full p-2 border rounded mt-1"
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.email}
                                                    />
                                                    {formik.touched.email && formik.errors.email ? (
                                                        <div className="text-red-500 text-sm">{formik.errors.email}</div>
                                                    ) : null}
                                                </div>
                                                <div className='text-start'>
                                                    <label className="block text-sm text-gray-700" htmlFor="phoneNumber">Phone Number</label>
                                                    <div className="flex items-center justify-between">

                                                        {/* <div className='w-[28%] '>
                                                          
                                                            <select onChange={(e) => handleSelectDialCode(e)} id="countrySelect" className='border-none text-black outline-none rounded-md  cursor-pointer py-2'>
                                                                {
                                                                    countriesData?.map((item, i) => (
                                                                        <>
                                                                            <option data-name={item.name} data-dialcode={item.dial_code} value={formik.values.countryCode} className='text-start text-black'>{item.code} &nbsp; {item.dial_code}
                                                                                <img src={`https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/${item.code}.svg`} />
                                                                            </option>
                                                                        </>
                                                                    ))
                                                                }
                                                            </select>
                                                        </div> */}
                                                        {/* <div className='w-[28%] flex items-center gap-4 bg-white text-black outline-none rounded-md  cursor-pointer py-2'>
                                                            <img src={uk} className='w-8 ml-2' />
                                                            <label className="block text-md text-black" htmlFor="phoneNumber">+44</label>
                                                        </div> */}
                                                        <input
                                                            id="phone"
                                                            name="phone"
                                                            type="tel"
                                                            className=" p-2 border rounded-md  -ml-1 w-[100%]"
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            value={formik.values.phone}
                                                        />
                                                    </div>
                                                    {formik.touched.phone && formik.errors.phone ? (
                                                        <div className="text-red-500 text-sm">{formik.errors.phone}</div>
                                                    ) : null}
                                                </div>


                                                <button type="submit" className="w-full py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded mt-4">Register</button>
                                            </form>
                                            <p className="text-xs text-center text-gray-500 mt-4">By creating an account you agree that you are at least 18 years of age, and accept and agree to the <span className="text-red-500">Terms and Conditions</span> and <span className="text-red-500">Privacy Policy</span>.</p>
                                        </div>
                                        :
                                        <div className='p-6'>
                                            <h2 className="text-2xl font-bold text-center text-purple-900 mb-4">I want to participate in Raffle!</h2>
                                            <form onSubmit={customerFormik.handleSubmit} className="space-y-4 csform">
                                                <div className='text-start'>
                                                    <label className="block text-sm text-gray-700" htmlFor="fullName">First Name</label>
                                                    <input
                                                        id="firstname"
                                                        name="firstname"
                                                        type="text"
                                                        className="w-full p-2 border rounded mt-1"
                                                        onChange={customerFormik.handleChange}
                                                        onBlur={customerFormik.handleBlur}
                                                        value={customerFormik.values.firstname}
                                                    />
                                                    {customerFormik.touched.firstname && customerFormik.errors.firstname ? (
                                                        <div className="text-red-500 text-sm">{customerFormik.errors.firstname}</div>
                                                    ) : null}
                                                </div>
                                                <div className='text-start'>
                                                    <label className="block text-sm text-gray-700" htmlFor="businessName">Last Name</label>
                                                    <input
                                                        id="lastname"
                                                        name="lastname"
                                                        type="text"
                                                        className="w-full p-2 border rounded mt-1"
                                                        onChange={customerFormik.handleChange}
                                                        onBlur={customerFormik.handleBlur}
                                                        value={customerFormik.values.lastname}
                                                    />
                                                    {customerFormik.touched.lastname && customerFormik.errors.lastname ? (
                                                        <div className="text-red-500 text-sm">{customerFormik.errors.lastname}</div>
                                                    ) : null}
                                                </div>
                                                <div className='text-start'>
                                                    <label className="block text-sm text-gray-700" htmlFor="email">Email address</label>
                                                    <input
                                                        id="email"
                                                        name="email"
                                                        type="email"
                                                        className="w-full p-2 border rounded mt-1"
                                                        onChange={customerFormik.handleChange}
                                                        onBlur={customerFormik.handleBlur}
                                                        value={customerFormik.values.email}
                                                    />
                                                    {customerFormik.touched.email && customerFormik.errors.email ? (
                                                        <div className="text-red-500 text-sm">{customerFormik.errors.email}</div>
                                                    ) : null}
                                                </div>
                                                <div className='text-start'>
                                                    <label className="block text-sm text-gray-700" htmlFor="phoneNumber">Phone Number</label>
                                                    <div className="flex items-center justify-between">
                                                        {/* <div className='w-[28%] '>
                                                            <select onChange={(e) => handleSelectDialCode(e)} id="countrySelect" className='border-none text-black outline-none rounded-md  cursor-pointer py-2'>
                                                                {
                                                                    countriesData?.map((item, i) => (
                                                                        <>
                                                                            <option data-name={item.name} data-dialcode={item.dial_code} value={customerFormik.values.countryCode} className='text-start text-black'>{item.code} &nbsp; {item.dial_code}
                                                                                <img src={`https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/${item.code}.svg`} />
                                                                            </option>
                                                                        </>
                                                                    ))
                                                                }
                                                            </select>
                                                        </div> */}
                                                        {/* <div className='w-[28%] flex items-center gap-4 bg-white text-black outline-none rounded-md  cursor-pointer py-2'>
                                                            <img src={uk} className='w-8 ml-2' />
                                                            <label className="block text-md text-black" htmlFor="phoneNumber">+44</label>
                                                        </div> */}

                                                        <input
                                                            id="phone"
                                                            name="phone"
                                                            type="tel"
                                                            className=" p-2 border rounded-md  -ml-1 w-[100%]"
                                                            onChange={customerFormik.handleChange}
                                                            onBlur={customerFormik.handleBlur}
                                                            value={customerFormik.values.phone}
                                                        />
                                                    </div>
                                                    {customerFormik.touched.phone && customerFormik.errors.phone ? (
                                                        <div className="text-red-500 text-sm">{customerFormik.errors.phone}</div>
                                                    ) : null}
                                                </div>
                                                <button type="submit" className="w-full py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded mt-4">Register</button>
                                            </form>
                                            <p className="text-xs text-center text-gray-500 mt-4">By creating an account you agree that you are at least 18 years of age, and accept and agree to the <span className="text-red-500">Terms and Conditions</span> and <span className="text-red-500">Privacy Policy</span>.</p>
                                        </div>
                                }
                            </div>



                            {/* <p className="mt-4 text-xs">By creating an account, you agree that you are at least 13 years old and you agree to the Terms and Conditions and Privacy Policy.</p> */}
                        </div>
                        <div className='relative zHigh w-[30%] md:w-[60%] lg:w-[70%] xl:w-[50%] hidden lg:block'>
                            <img src={left_side_bar} className='absolute top-10 right-0 w-[100%]  lg:h-[90vh] xl:h-[90vh] lg:-top-32 lg:-right-24 hidden lg:block' />
                        </div>
                    </div>
                </section>
                <div>
                    <img src={mobile_left_sidebar} className='w-full md:w-[500px] float-right block lg:hidden' />
                </div>
                <img src={leftRectangle} className='w-[50%] h-[90vh] absolute top-0 right-0 hidden lg:block' />
                <section className="mt-0 lg:mt-52 p-10  flex flex-col lg:flex-row justify-between gap-12 items-center w-[100%] lg:w-[80%] m-auto">
                    <div className='w-full lg:w-4/4 xl:w-2/4 text-start'>
                        <h2 className="text-3xl mb-4 font-bold tracking-wider">WHAT IS Raffily?</h2>
                        <video controls width="100%" className="videoPlayer rounded-lg" src={RaffilyAds} controlsList="nodownload noremoteplayback " disablePictureInPicture></video>
                    </div>
                    <div className='w-full lg:w-3/4 mt-12 lg:mt-0 text-start flex justify-center'>
                        <div className="w-full">
                            <p className="text-2xl  font-bold mb-4 text-rose-400" style={{ letterSpacing: '10px' }}>COMING SOON:</p>
                            <p className="text-xl font-semibold mb-5">Raffily – Transform Your Marketing with Every Raffle!</p>
                            <p className="text-md mb-5">Unlock a powerful new channel to boost your brand’s visibility and drive sales with Raffily.</p>
                            <p className="text-md mb-5">Our platform is designed for businesses seeking innovative ways to engage with their audience. Create and manage raffles effortlessly, offering exciting prizes that attract and retain customers. Enhance your marketing strategy and drive higher ROI.</p>
                            <p className="text-md ">Watch our brief video to see how Raffily can transform your marketing efforts. Stay tuned for our launch in July 2024.</p>
                        </div>
                    </div>
                </section>

            </div>
        </>
    )
}

export default ComingSoon