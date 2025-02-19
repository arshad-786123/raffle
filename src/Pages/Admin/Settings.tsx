import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AdminSidebar from '../../Components/Navbar/AdminSidebar';
import { API_INSTANCE } from '../../API/Instance';
import { API_ENDPOINTS } from '../../constants';
import toast, { Toaster } from 'react-hot-toast';

const AdminSettings = () => {
    const formik = useFormik({
        initialValues: {
            name: '',
            dialCode: '+44',
            phone: '',
            email: '',
            password: '',
            country: '',
            region: '',
            city: '',
            address: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            dialCode: Yup.string().required('Phone code is required'),
            phone: Yup.string().required('Phone number is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string().required('Password is required'),
            country: Yup.string().required('Country is required'),
            region: Yup.string().required('Region is required'),
            city: Yup.string().required('City is required'),
            address: Yup.string().required('Address is required'),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                const response = await API_INSTANCE.post(API_ENDPOINTS.CREATE_ADMIN, { ...values }, {
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                if (response.data.success) {
                    toast.success('Successfully added!')
                    resetForm();
                } else {
                    toast.error('Something went wrong!')
                }
            } catch (error) {
                toast.error('Something went wrong!')
                throw error; // Propagate the error for handling upstream
            }
            // Handle form submission
            console.log(values);
        },
    });

    return (
        <div className='flex footer-manage' >
            <Toaster position="top-right" />
            <div className='hidden lg:block'>
                <AdminSidebar />
            </div>

            <div className='w-[100%] lg:w-[95%] mx-auto z-10 p-3 lg:p-10 duration-500' style={{ fontFamily: "poppins, sans-serif" }}>
                <div className='w-[100%] m-auto'>
                    <h3>My Account</h3>
                    <div className='border-[#FF6A78] border-[1px]'></div>
                    <br />
                    <form onSubmit={formik.handleSubmit} className='bg-[#F9F0F0] p-2 lg:p-8'>
                        <div className='flex items-center gap-4'>
                            <div>
                                <svg width="98" height="94" viewBox="0 0 98 94" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <ellipse cx="48.7691" cy="46.7292" rx="48.3301" ry="46.5125" fill="white" />
                                    <g clipPath="url(#clip0_235_2883)">
                                        <path d="M48.4445 46.3785C50.5919 46.3785 52.4515 45.6596 53.9709 44.2413C55.4903 42.8232 56.2605 41.0881 56.2605 39.0835C56.2605 37.0797 55.4903 35.3443 53.9706 33.9258C52.451 32.5079 50.5917 31.7891 48.4445 31.7891C46.2967 31.7891 44.4377 32.5079 42.9183 33.926C41.3989 35.3441 40.6284 37.0795 40.6284 39.0835C40.6284 41.0881 41.3989 42.8234 42.9185 44.2415C44.4381 45.6594 46.2975 46.3785 48.4445 46.3785Z" fill="#C2C2C2" />
                                        <path d="M62.1203 55.0784C62.0765 54.4882 61.9879 53.8444 61.8574 53.1646C61.7257 52.4797 61.5561 51.8323 61.3531 51.2405C61.1434 50.6288 60.8582 50.0248 60.5056 49.446C60.1397 48.8452 59.7099 48.3221 59.2276 47.8916C58.7233 47.4412 58.1059 47.0791 57.3919 46.815C56.6803 46.5523 55.8918 46.4192 55.0483 46.4192C54.717 46.4192 54.3967 46.546 53.778 46.922C53.3972 47.1538 52.9518 47.4218 52.4546 47.7183C52.0296 47.9711 51.4537 48.2079 50.7424 48.4223C50.0484 48.6319 49.3438 48.7382 48.6484 48.7382C47.9529 48.7382 47.2486 48.6319 46.5539 48.4223C45.8433 48.2081 45.2675 47.9713 44.8429 47.7185C44.3504 47.4248 43.9048 47.1568 43.5183 46.9218C42.9004 46.5458 42.5798 46.4189 42.2485 46.4189C41.4047 46.4189 40.6165 46.5523 39.9052 46.8152C39.1916 47.0789 38.5739 47.441 38.0691 47.8918C37.5871 48.3225 37.1571 48.8454 36.7916 49.446C36.4393 50.0248 36.1541 50.6286 35.9442 51.2407C35.7414 51.8325 35.5718 52.4797 35.4401 53.1646C35.3096 53.8435 35.221 54.4875 35.1772 55.0791C35.1341 55.6586 35.1123 56.2601 35.1123 56.8676C35.1123 58.4486 35.6508 59.7285 36.7126 60.6724C37.7614 61.6038 39.1491 62.0764 40.8366 62.0764H56.4617C58.1492 62.0764 59.5364 61.6041 60.5854 60.6724C61.6475 59.7292 62.186 58.449 62.186 56.8673C62.1857 56.2571 62.1637 55.6551 62.1203 55.0784Z" fill="#C2C2C2" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_235_2883">
                                            <rect width="32.4505" height="30.2872" fill="white" transform="translate(32.4502 31.7891)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                            <p className='text-[#F66E6A] border-b-[1px] border-[#F66E6A] cursor-pointer'>Add profile picture</p>
                        </div>
                        <br />
                        <div className='grid lg:flex items-center gap-2 w-[100%] lg:w-[95%] mt-4'>
                            <div className='w-[100%]'>
                                <h4 className='text-md font-medium tracking-wide'>Name</h4>
                                <input
                                    className='p-3 outline-none rounded-md border-none w-[100%]'
                                    type="text"
                                    placeholder='Admin name'
                                    name="name"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.name}
                                />
                                {formik.touched.name && formik.errors.name ? (
                                    <div className="text-red-500">{formik.errors.name}</div>
                                ) : null}
                            </div>
                            <div className='w-[100%]'>
                                <h4 className='text-md font-medium tracking-wide'>Phone Number</h4>
                                <div className='flex gap-1'>
                                    <input
                                        className='p-3 outline-none rounded-md border-none w-[15%]'
                                        type="text"
                                        placeholder='+44'
                                        name="dialCode"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.dialCode}
                                    />
                                    {formik.touched.dialCode && formik.errors.dialCode ? (
                                        <div className="text-red-500">{formik.errors.dialCode}</div>
                                    ) : null}
                                    <input
                                        className='p-3 outline-none rounded-md border-none w-[100%]'
                                        type="text"
                                        placeholder='Phone number'
                                        name="phone"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.phone}
                                    />
                                </div>
                                {formik.touched.phone && formik.errors.phone ? (
                                    <div className="text-red-500">{formik.errors.phone}</div>
                                ) : null}
                            </div>
                        </div>
                        <div className='grid lg:flex items-start gap-2 w-[100%] lg:w-[95%] mt-4 lg:mt-8'>
                            <div className='w-[100%]'>
                                <h4 className='text-md font-medium tracking-wide'>Email Address</h4>
                                <input
                                    className='p-3 rounded-md outline-none border-none w-[100%]'
                                    type="email"
                                    placeholder='raffly@gmail.com'
                                    name="email"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                />
                                {formik.touched.email && formik.errors.email ? (
                                    <div className="text-red-500">{formik.errors.email}</div>
                                ) : null}
                            </div>
                            <div className='w-[100%]'>
                                <h4 className='text-md font-medium tracking-wide'>Password</h4>
                                <input
                                    className='p-3 rounded-md outline-none border-none w-[100%]'
                                    type="password"
                                    placeholder='Password'
                                    name="password"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
                                />
                                {formik.touched.password && formik.errors.password ? (
                                    <div className="text-red-500">{formik.errors.password}</div>
                                ) : null}
                                <p className='mt-2 text-sm font-medium tracking-wide border-b-[1px] border-[#FF5F5F] w-fit text-[#FF5F5F] cursor-pointer'>Reset Password</p>
                            </div>
                        </div>
                        <div className='grid lg:flex items-center gap-2 w-[100%] lg:w-[95%] mt-4 lg:mt-8'>
                            <div className='w-[100%]'>
                                <h4 className='text-md font-medium tracking-wide'>Country*</h4>
                                <input
                                    className='p-3 rounded-md outline-none border-none w-[100%]'
                                    type="text"
                                    placeholder='United States'
                                    name="country"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.country}
                                />
                                {formik.touched.country && formik.errors.country ? (
                                    <div className="text-red-500">{formik.errors.country}</div>
                                ) : null}
                            </div>
                            <div className='w-[100%]'>
                                <h4 className='text-md font-medium tracking-wide'>Region*</h4>
                                <input
                                    className='p-3 rounded-md outline-none border-none w-[100%]'
                                    type="text"
                                    name="region"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.region}
                                />
                                {formik.touched.region && formik.errors.region ? (
                                    <div className="text-red-500">{formik.errors.region}</div>
                                ) : null}
                            </div>
                        </div>
                        <div className='grid lg:flex items-center gap-2 w-[100%] lg:w-[95%] mt-4 lg:mt-8'>
                            <div className='w-[100%]'>
                                <h4 className='text-md font-medium tracking-wide'>City*</h4>
                                <input
                                    className='p-3 rounded-md outline-none border-none w-[100%]'
                                    type="text"
                                    name="city"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.city}
                                />
                                {formik.touched.city && formik.errors.city ? (
                                    <div className="text-red-500">{formik.errors.city}</div>
                                ) : null}
                            </div>
                            <div className='w-[100%]'>
                                <h4 className='text-md font-medium tracking-wide'>Address*</h4>
                                <input
                                    className='p-3 rounded-md outline-none border-none w-[100%]'
                                    type="text"
                                    name="address"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.address}
                                />
                                {formik.touched.address && formik.errors.address ? (
                                    <div className="text-red-500">{formik.errors.address}</div>
                                ) : null}
                            </div>
                        </div>
                        <br />
                        <div className='h-[1px] bg-gray-400'></div>
                        <br />
                        <button type='submit' className='bg-[#FF6A78] w-[100%] text-white p-3 rounded-md mt-6'>
                            Save Changes
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;
