import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AdminSidebar from '../../Components/Navbar/AdminSidebar';
import { API_INSTANCE } from '../../API/Instance';
import { API_ENDPOINTS } from '../../constants';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { successToast } from '../../Utils/Toast/success.toast';
import { errorToast } from '../../Utils/Toast/error.toast';
import { getApprovedPaidRaffles, listRaffle } from '@/Services/Raffle/listRaffle';
import Select from 'react-select';

const Coupon = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [raffles, setRaffles] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const formik = useFormik({
        initialValues: {
            couponName: '',
            type: '',
            email: '',
            expiryAt: '',
            amount: '',
            forAllRaffles: false,
            raffleIds: [],
            usageLimit: '',
        },
        validationSchema: Yup.object({
            couponName: Yup.string().required('Coupon name is required'),
            type: Yup.string().oneOf(['fixed', 'percentage'], 'Invalid type').required('Type is required'),
            email: Yup.string().email('Invalid email address'),
            expiryAt: Yup.date()
                .nullable()
                .min(new Date(), 'Expiry date must be greater than today')
                .required('Expiry date is required'),
            amount: Yup.number()
                .when('type', {
                    is: (type: string) => type === 'fixed' || type === 'percentage',
                    then: (schema) =>
                        schema
                            .required('Amount is required')
                            .positive('Amount must be a positive number')
                            .test('max-percentage', 'Percentage cannot exceed 100%', (value, context) => {
                                return context.parent.type === 'percentage' ? value <= 100 : true;
                            }),
                }),

            raffleIds: Yup.array().of(Yup.string()).when('forAllRaffles', {
                is: false,
                then: (schema) => schema.min(1, 'Please select at least one raffle')
            }),
            usageLimit: Yup.number()
                .nullable()
                .positive('Usage limit must be a positive number')
                .integer('Usage limit must be an integer')
                .required('Usage limit  is required'),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                let response;

                // Ensure raffleIds is always an array
                const valuesToSend = {
                    ...values,
                    raffleIds: values.forAllRaffles ? [] : Array.isArray(values.raffleIds) ? values.raffleIds : [],
                };

                if (state && state.item) {
                    // Edit existing coupon
                    response = await API_INSTANCE.put(
                        `${API_ENDPOINTS.UPDATE_COUPON}/${state.item._id}`,
                        valuesToSend,
                        {
                            headers: {
                                "Content-Type": "application/json",
                            }
                        }
                    );
                } else {
                    // Create new coupon
                    response = await API_INSTANCE.post(
                        API_ENDPOINTS.CREATE_COUPON,
                        valuesToSend,
                        {
                            headers: {
                                "Content-Type": "application/json",
                            }
                        }
                    );
                }

                console.log("Response:", response);

                if (response.data.success) {
                    successToast('Successfully submitted!');
                    resetForm();
                    navigate('/admin/coupon'); // Redirect to coupon list after successful submission
                } else {
                    errorToast('Something went wrong!');
                }
            } catch (error: any) {
                const errorMessage = error.response?.data?.message || "Something went wrong!";
                errorToast(errorMessage);
                console.error("Error submitting form:", error);
            }
        },
    });

    useEffect(() => {
        const fetchRaffles = async () => {
            try {
                const rafflesData = await getApprovedPaidRaffles() // Default page 1, limit 10
                setRaffles(rafflesData || []);
            } catch (error) {
                console.error('Error fetching raffles:', error);
            }
        };

        fetchRaffles();
    }, []);

    const raffleOptions = raffles.map((raffle: any) => ({
        label: raffle.raffle_name, // Display text in the dropdown
        value: raffle._id, // Value of the option
    }));
    useEffect(() => {
        if (state?.item) {
            formik.setValues({
                couponName: state.item.couponName || '',
                type: state.item.type || '',
                email: state.item.email || '',
                expiryAt: state.item.expiryAt ? new Date(state.item.expiryAt).toISOString().split('T')[0] : '',
                amount: state.item.amount || '',
                forAllRaffles: state.item.forAllRaffles || false,
                raffleIds: state.item.raffleIds || '',
                usageLimit: state.item.usageLimit || '',
            });
        }
    }, [state]);

    return (
        <div className='flex footer-manage' >
            <Toaster position="top-right" />
            <div className='hidden lg:block'>
                <AdminSidebar />
            </div>

            <div className='w-[100%] lg:w-[95%] mx-auto z-10 p-3 lg:p-10 duration-500' style={{ fontFamily: "poppins, sans-serif" }}>
                <div className='m-auto w-[100%] lg:w-[90%]'>
                    <nav aria-label="breadcrumb" className="breadcrumb-container flex justify-between">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/admin/reports" className="breadcrumb-link">Dashboard</Link>
                            </li>
                            <li className='px-2'>{">"}</li>
                            <li className="breadcrumb-item">
                                <Link to="/admin/coupon" className="breadcrumb-link">Coupon</Link>
                            </li>
                            <li className='px-2'>{">"}</li>
                            <li className="breadcrumb-item active" aria-current="page">
                                {state && state.item ? 'Edit Coupon' : 'Create Coupon'}
                            </li>
                        </ol>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/admin/coupon" className="breadcrumb-link">List</Link>
                            </li>
                            <li className='px-2'>{">"}</li>
                        </ol>
                    </nav>
                </div>

                <div className='w-[100%] lg:w-[90%] m-auto bg-[#F9F0F0] mt-4 p-4 rounded-md'>
                    <div className='w-[100%] m-auto'>
                        <form onSubmit={formik.handleSubmit} className='rounded-md bg-[#F9F0F0]'>
                            <h4>{state && state.item ? 'Edit Coupon' : 'Create Coupon'}</h4>
                            <div className='grid lg:flex items-start gap-2 w-[100%] lg:w-[100%] mt-4 lg:mt-4'>
                                <div className='w-[100%] mt-4'>
                                    <h4 className='text-md font-medium tracking-wide'>Coupon Name</h4>
                                    <input
                                        className='p-3 outline-none rounded-md border-none w-[100%]'
                                        type="text"
                                        placeholder='Coupon name'
                                        name="couponName"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.couponName}
                                    />
                                    {formik.touched.couponName && formik.errors.couponName ? (
                                        <div className="text-red-500">{formik.errors.couponName}</div>
                                    ) : null}
                                </div>

                                <div className='w-[100%] mt-4'>
                                    <h4 className='text-md font-medium tracking-wide'>Type</h4>
                                    <select
                                        className='p-3 outline-none rounded-md border-none w-[100%]'
                                        name="type"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.type}
                                    >
                                        <option value="" label="Select type" />
                                        <option value="fixed" label="Fixed amount" />
                                        <option value="percentage" label="Percentage" />
                                    </select>
                                    {formik.touched.type && formik.errors.type ? (
                                        <div className="text-red-500">{formik.errors.type}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className='grid lg:flex items-start gap-2 w-[100%] lg:w-[100%] mt-4 '>
                                {formik.values.type && (
                                    <div className='w-[100%] mt-4'>
                                        <h4 className='text-md font-medium tracking-wide'>{formik.values.type === 'fixed' ? 'Amount' : 'Percentage'}</h4>
                                        <input
                                            className='p-3 outline-none rounded-md border-none w-[100%]'
                                            type="number"
                                            placeholder={formik.values.type === 'fixed' ? 'Enter amount' : 'Enter percentage'}
                                            name="amount"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.amount}
                                        />
                                        {formik.touched.amount && formik.errors.amount ? (
                                            <div className="text-red-500">{formik.errors.amount}</div>
                                        ) : null}
                                    </div>
                                )}
                                <div className='w-[100%]'></div>
                            </div>

                            <div className='grid lg:flex items-start gap-2 w-[100%] lg:w-[100%] mt-4 '>

                                <div className='w-[100%] mt-4'>
                                    <h4 className='text-md font-medium tracking-wide'>Email (Optional)</h4>
                                    <input
                                        className='p-3 rounded-md outline-none border-none w-[100%]'
                                        type="email"
                                        placeholder='Email'
                                        name="email"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.email}
                                    />
                                    {formik.touched.email && formik.errors.email ? (
                                        <div className="text-red-500">{formik.errors.email}</div>
                                    ) : null}
                                </div>

                                <div className='w-[100%] mt-4'>
                                    <h4 className='text-md font-medium tracking-wide'>Expiry Date</h4>
                                    <input
                                        className='p-3 rounded-md outline-none border-none w-[100%]'
                                        type="date"
                                        name="expiryAt"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.expiryAt}
                                    />
                                    {formik.touched.expiryAt && formik.errors.expiryAt ? (
                                        <div className="text-red-500">{formik.errors.expiryAt}</div>
                                    ) : null}
                                </div>

                            </div>

                            <div className='grid lg:flex items-end gap-2 w-[100%] lg:w-[100%] mt-4'>
                                {/* Usage Limit Field */}
                                <div className='w-[100%]  mt-4'>
                                    <h4 className='text-md font-medium tracking-wide'>Usage Limit</h4>
                                    <input
                                        className='p-3 outline-none rounded-md border-none w-[100%]'
                                        type="number"
                                        placeholder='Enter usage limit'
                                        name="usageLimit"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.usageLimit}
                                    />
                                    {formik.touched.usageLimit && formik.errors.usageLimit ? (
                                        <div className="text-red-500">{formik.errors.usageLimit}</div>
                                    ) : null}
                                </div>

                                {/* For All Raffles Checkbox */}
                                <div className='w-[100%]  mt-4 pb-5 ms-3' >

                                    <input
                                        type="checkbox"
                                        name="forAllRaffles"
                                        checked={formik.values.forAllRaffles}
                                        onChange={(e) => {
                                            formik.setFieldValue("forAllRaffles", e.target.checked);
                                            if (e.target.checked) {
                                                formik.setFieldValue("raffleIds", []);
                                            }
                                        }}
                                        className="mr-2 p-3 outline-none rounded-md border-none "
                                    />
                                    <span className='text-md font-medium tracking-wide'>Apply to all raffles</span>

                                </div>
                            </div>



                            {/* Raffle Selection (Only If forAllRaffles is False) */}
                            {!formik.values.forAllRaffles && (
                                // <div className='mt-4'>
                                //     <h4 className='text-md font-medium'>Select Raffle</h4>
                                //     <select
                                //         className='p-3 outline-none rounded-md border-none w-[100%]'
                                //         name="raffleIds"
                                //         onChange={(e) => {
                                //             const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
                                //             formik.setFieldValue("raffleIds", selectedOptions);
                                //         }}
                                //         onBlur={formik.handleBlur}
                                //         value={formik.values.raffleIds}
                                //     >
                                //         <option value="">Select a raffle</option>
                                //         {raffles.map((raffle: any) => (
                                //             <option key={raffle._id} value={raffle._id}>{raffle.raffle_name}</option>
                                //         ))}
                                //     </select>
                                //     {formik.touched.raffleIds && formik.errors.raffleIds && (
                                //         <div className="text-red-500">{formik.errors.raffleIds}</div>
                                //     )}
                                // </div>

                                <div className="mt-4">
                                    <h4 className="text-md font-medium">Select Raffle</h4>
                                    <Select
                                        options={raffleOptions}
                                        onChange={(selectedOption) => {
                                            formik.setFieldValue("raffleIds", selectedOption ? [selectedOption.value] : []);
                                        }}
                                        onBlur={formik.handleBlur}
                                        value={raffleOptions.find(option => option.value === formik.values.raffleIds[0])} // This ensures the value is set correctly
                                        placeholder="Search for a raffle..."
                                        isSearchable
                                        noOptionsMessage={() => "No raffles found"} // Custom message when no option matches
                                    />
                                    {formik.touched.raffleIds && formik.errors.raffleIds && (
                                        <div className="text-red-500">{formik.errors.raffleIds}</div>
                                    )}
                                </div>
                            )}

                            <br />
                            <div className='h-[1px] bg-gray-400'></div>
                            <br />

                            <button type='submit' className='bg-[#FF6A78] w-[100%] mx-auto p-2 lg:p-3 text-white rounded-md'>
                                {
                                    state?.item ? "Update" : "Submit"
                                }
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Coupon;
