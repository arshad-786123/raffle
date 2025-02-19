import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Dropdown } from 'flowbite-react'
import * as XLSX from 'xlsx';
import axios from 'axios'
import noimage from '../../assets/no-image.png';
import moment from 'moment';
import { Toaster } from 'react-hot-toast'
import { adminNotificationListing, deleteCouponList, getCouponListingData } from '../../../Services/Admin/getDashboardData';
import { successToast } from '../../../Utils/Toast/success.toast';
import { errorToast } from '../../../Utils/Toast/error.toast';
import OwnerSidebar from '../../Navbar/OwnerSidebar';
import AdminSidebar from '../../Navbar/AdminSidebar';

const AdminNotification = () => {
    const [couponData, setCouponData] = useState<any>([])
    const [notificationData, setNotificationData] = useState<any>([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const itemsPerPage = 10;
    const navigate = useNavigate()

    useEffect(() => {

        getDashboardData(currentPage);

    }, [currentPage]);

    // const getDashboardData = async (page: any) => {

    //     try {
    //         const persistedData = localStorage.getItem('persist:root');
    //         if (persistedData) {
    //             const parsedData = JSON.parse(persistedData);
    //             const userData = JSON.parse(parsedData?.user);
    //             const ownerId = userData?.user?.id

    //             const res = await adminNotificationListing(ownerId, page, itemsPerPage);
    //             setNotificationData(res?.notifications)
    //             // setCouponData(res.coupons);
    //             setCurrentPage(res?.currentPage);
    //             setTotalPages(res?.totalPages);
    //         }
    //     } catch (error) {
    //         console.error("Error fetching data:", error);
    //     }
    // }

    const getDashboardData = async (page: any) => {
        try {
            const persistedData = localStorage.getItem('persist:root');
            if (persistedData) {
                const parsedData = JSON.parse(persistedData);
                const userData = JSON.parse(parsedData?.user);
                const ownerId = userData?.user?.id;

                const res = await adminNotificationListing(ownerId, page, itemsPerPage);
                setNotificationData(res?.notifications);
                setCurrentPage(res?.currentPage);
                setTotalPages(res?.totalPages);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };
    const deleteCoupon = async (id: any) => {
        try {
            await deleteCouponList(id);
            setCouponData(couponData?.filter((coupon: any) => coupon._id !== id));
            successToast("Coupon Deleted!");
        } catch (error) {
            errorToast("Something went wrong");
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const handleCopy = (couponName: any) => {
        if (couponName) {
            navigator.clipboard.writeText(couponName);
            successToast('Coupon name copied!');
        }
    }


    const handleBack = () => {
        window.history.back();
    }

    return (
        <div className='flex footer-manage ' >
            <Toaster position='top-right' />
            <div className='hidden lg:block'>
                <AdminSidebar />
            </div>

            <div className='w-[100%] lg:w-[95%] mx-auto z-10 p-3 lg:p-10 duration-500' style={{ fontFamily: "poppins, sans-serif" }}>
                <div onClick={handleBack} className='flex items-center gap-2' style={{ cursor: "pointer" }}>
                    <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.0871582 6.50472C0.0871582 6.36287 0.145596 6.2274 0.242813 6.1254L5.50166 0.813434C5.70938 0.60359 6.04566 0.604121 6.25285 0.813434C6.46056 1.02275 6.46056 1.36275 6.25285 1.57206L1.90031 5.96815H16.5559C16.8492 5.96815 17.0872 6.20828 17.0872 6.50472C17.0872 6.80115 16.8492 7.04128 16.5559 7.04128H1.90085L6.25285 11.4374C6.46056 11.6467 6.46003 11.9867 6.25285 12.196C6.04513 12.4053 5.70885 12.4053 5.50166 12.196L0.242813 6.88403C0.143471 6.78362 0.0887527 6.6455 0.0871582 6.50472Z" fill="black" fill-opacity="0.74" />
                    </svg>
                    <p className='text-gray-500 text-[14px]'>
                        Back
                    </p>
                </div>
                <div className='w-[100%] lg:w-[100%] m-auto bg-[#F9F0F0] mt-4 p-4 rounded-md'>
                    <div className='flex items-center justify-between '>
                        <h4>Notifications</h4>

                    </div>
                    <div>
                        {
                            notificationData?.map((item: any, i: number) => (
                                <>
                                    <div className='hidden lg:block lg:flex items-center justify-between bg-white p-2 rounded-md mt-4'>

                                        <div className='w-[100%]'>
                                            <table className='w-[100%]' >
                                                <thead className='border-b-[2px] grid grid-cols-2 gap-4'>
                                                    <th className='font-[400] text-[15px]'>Details</th>
                                                    <th className='font-[400] text-[15px]'>Date Added</th>
                                                </thead>
                                                <tbody>
                                                    <tr className='grid grid-cols-2 gap-4'>
                                                        <td className='text-center flex justify-center items-center'>
                                                            <span> {item?.description}</span>

                                                        </td>

                                                        <td className='text-center'>{moment(item?.
                                                            createdAt).format("YYYY-MM-DD hh:mm:ss")}</td>

                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>



                                    </div>
                                    <div className='block lg:hidden flex lg:items-center justify-between bg-white p-2 rounded-md mt-4'>

                                        <div className='w-[100%]'>
                                            <br />
                                            <table className='w-[100%]' >
                                                <thead className='border-b-[2px]'>
                                                    <th className='font-[400] text-[10px]'>Details</th>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className='text-center text-[10px]'>{item?.description}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <br />
                                            <table className='w-[100%]' >
                                                <thead className='border-b-[2px]'>
                                                    <th className='font-[400] text-[10px]'>Date Added</th>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className='text-center text-[10px]'>{moment(item?.
                                                            createdAt).format("YYYY-MM-DD hh:mm:ss")}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                    </div>
                                </>
                            ))
                        }
                    </div>
                    <div className='text-xs lg:text-md text-right mt-4 flex items-center justify-end gap-2 cursor-pointer'>
                        <button onClick={handlePrevPage} disabled={currentPage === 1}>
                            <svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5415 9.79541L5.78052 5.5564L1.5415 1.31738" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <span>{currentPage} of {totalPages}</span>
                        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                            <svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.78052 9.79541L1.5415 5.5564L5.78052 1.31738" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default AdminNotification;