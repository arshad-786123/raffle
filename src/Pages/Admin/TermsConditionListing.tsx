import React, { useEffect, useState } from 'react'
import AdminSidebar from '../../Components/Navbar/AdminSidebar'
import { deleteCouponList, getCouponListingData, getDBData } from '../../Services/Admin/getDashboardData'
import { Link, useNavigate } from 'react-router-dom'
import { Dropdown } from 'flowbite-react'
import * as XLSX from 'xlsx';
import axios from 'axios'
import { CONSTANT_DATA } from '../../constants';
import noimage from '../../assets/no-image.png';
import moment from 'moment';
import { errorToast } from '../../Utils/Toast/error.toast'
import { successToast } from '../../Utils/Toast/success.toast'
import { Toaster } from 'react-hot-toast'

const TermsConditionListing = () => {
    const [couponData, setCouponData] = useState<any>([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const itemsPerPage = 10;
    const navigate = useNavigate()

    useEffect(() => {
        getDashboardData(currentPage, searchQuery);
    }, [currentPage, searchQuery]);

    const getDashboardData = async (page: number, search: string) => {
        try {
            const res = await getCouponListingData(page, search);
            setCouponData(res.coupons);
            setCurrentPage(res.currentPage);
            setTotalPages(res.totalPages);
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
        console.log("Search input changed:", e.target.value);
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const handleCopy = (couponName: any) => {
        if (couponName) {
            navigator.clipboard.writeText(couponName);
            successToast('Coupon name copied!');
        }
    }

    // const handleDownload = async () => {
    //     try {
    //         const res = await getCouponListingData(totalPages * itemsPerPage, searchQuery); // Fetch all data in one call
    //         console.log("res", res);
    //         const dataToDownload = res?.coupons?.map((item: any) => ({
    //             CouponName: `${item.couponName}`,
    //             Email: item?.email,
    //             Type: item.type,
    //             'Amount': `${item.amount}`,
    //             'Expiration Date': item.expiryAt
    //         }));
    //         console.log("dataToDownload", dataToDownload);


    //         // Create a new workbook
    //         const workbook = XLSX.utils.book_new();
    //         // Convert data array to worksheet
    //         const worksheet = XLSX.utils.json_to_sheet(dataToDownload);
    //         // Add worksheet to workbook
    //         XLSX.utils.book_append_sheet(workbook, worksheet, 'CouponData');
    //         // Generate a download link
    //         const wbout = XLSX.write(workbook, { type: 'array', bookType: 'xlsx' });

    //         // Convert ArrayBuffer to Blob
    //         const blob = new Blob([wbout], { type: 'application/octet-stream' });

    //         // Trigger download using Blob and URL.createObjectURL
    //         const url = URL.createObjectURL(blob);
    //         const link = document.createElement('a');
    //         link.href = url;
    //         link.setAttribute('download', 'coupon_data.xlsx');
    //         document.body.appendChild(link);
    //         link.click();
    //         document.body.removeChild(link);

    //     } catch (error) {
    //         console.error('Error downloading file:', error);
    //     }
    // };
    return (
        <div className='flex footer-manage '  >
            <Toaster position='top-right' />
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
                            <li className="breadcrumb-item active" aria-current="page">
                                Terms and Conditions
                            </li>
                        </ol>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/admin/terms-condition/create" className="breadcrumb-link">+ Create</Link>
                            </li>
                        </ol>
                    </nav>
                </div>
                <div className='w-[100%] lg:w-[90%] m-auto bg-[#F9F0F0] mt-4 p-4 rounded-md'>
                    <div className='flex items-center justify-between '>
                        <h4>Terms and Conditions</h4>
                        <div className='flex items-center gap-2'>
                            <div className='hidden  p-3 lg:flex items-center gap-5 bg-white border-[1px] rounded-[10px] w-fit'>
                                <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16.031 14.6168L20.3137 18.8995L18.8995 20.3137L14.6168 16.031C13.0769 17.263 11.124 18 9 18C4.032 18 0 13.968 0 9C0 4.032 4.032 0 9 0C13.968 0 18 4.032 18 9C18 11.124 17.263 13.0769 16.031 14.6168ZM14.0247 13.8748C15.2475 12.6146 16 10.8956 16 9C16 5.1325 12.8675 2 9 2C5.1325 2 2 5.1325 2 9C2 12.8675 5.1325 16 9 16C10.8956 16 12.6146 15.2475 13.8748 14.0247L14.0247 13.8748Z" fill="black" />
                                </svg>
                                <input type="text" className='border-none outline-none' placeholder='Search' value={searchQuery} onChange={handleSearchChange} />
                            </div>
                            <div className='block lg:hidden p-2 w-40 flex items-center gap-5 bg-white border-[1px] rounded-[10px] w-fit'>
                                <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16.031 14.6168L20.3137 18.8995L18.8995 20.3137L14.6168 16.031C13.0769 17.263 11.124 18 9 18C4.032 18 0 13.968 0 9C0 4.032 4.032 0 9 0C13.968 0 18 4.032 18 9C18 11.124 17.263 13.0769 16.031 14.6168ZM14.0247 13.8748C15.2475 12.6146 16 10.8956 16 9C16 5.1325 12.8675 2 9 2C5.1325 2 2 5.1325 2 9C2 12.8675 5.1325 16 9 16C10.8956 16 12.6146 15.2475 13.8748 14.0247L14.0247 13.8748Z" fill="black" />
                                </svg>
                                <input type="text" className='w-[100%] border-none outline-none' placeholder='Search' value={searchQuery} onChange={handleSearchChange} />
                            </div>
                            {/* <div className='p-3 bg-white rounded-[100px] w-fit' onClick={handleDownload} style={{ cursor: 'pointer' }}>
                                <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 16H18V9H20V17C20 17.5523 19.5523 18 19 18H1C0.44772 18 0 17.5523 0 17V9H2V16ZM12 6H17L10 13L3 6H8V0H12V6Z" fill="black" />
                                </svg>
                            </div> */}

                        </div>
                    </div>
                    <div>
                        {
                            couponData?.map((item: any, i: number) => (
                                <>
                                    <div className='hidden lg:block lg:flex items-center justify-between bg-white p-2 rounded-md mt-4'>

                                        <div className='w-[90%]'>
                                            <table className='w-[100%]' >
                                                <thead className='border-b-[2px] grid grid-cols-5 gap-4'>
                                                    {/* <th className='font-[400] text-[15px] '>Name</th> */}
                                                    <th className='font-[400] text-[15px]'>Coupon Name</th>
                                                    <th className='font-[400] text-[15px]'>Type</th>
                                                    <th className='font-[400] text-[15px]'>Amount/Percentage</th>
                                                    <th className='font-[400] text-[15px]'>Email</th>
                                                    <th className='font-[400] text-[15px]'>Expiration Date</th>
                                                </thead>
                                                <tbody>
                                                    <tr className='grid grid-cols-5 gap-4'>
                                                        {/* <td className='text-center'>{item?.firstname}{" "}{item?.lastName}</td> */}
                                                        <td className='text-center flex justify-center items-center'>
                                                            <span> {item?.couponName}</span>

                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                strokeWidth="2"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                className="feather feather-copy cursor-pointer ms-2"
                                                                width="16"
                                                                height="16"
                                                                onClick={() => handleCopy(item?.couponName)}
                                                            >
                                                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                                            </svg>
                                                        </td>
                                                        <td className='text-center'>{item?.type}</td>
                                                        <td className='text-center'>{item?.amount}</td>
                                                        <td className='text-center'>{item?.email ? "Yes" : "N/A"}</td>
                                                        <td className='text-center'>{moment(item?.expiryAt).format("YYYY-MM-DD")}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>


                                        <Dropdown inline label="" dismissOnClick={true} renderTrigger={() =>
                                            <div className='flex items-center gap-6'>
                                                <div className='flex items-center gap-3'>
                                                    <svg className='p-2 bg-white view-icon' width="39" height="33" viewBox="0 0 19 13" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ cursor: "pointer", boxShadow: "2px 2px 5px #ccc", borderRadius: "5px" }}
                                                    // onClick={() => navigate(`/admin/merchants/detail/${item._id}`, {
                                                    //     state: {
                                                    //         item: item
                                                    //     }
                                                    // })}
                                                    >
                                                        <g clip-path="url(#clip0_174_422)">
                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.33217 0.693359C5.32099 0.693359 1.89544 3.06225 0.507568 6.40612C1.89544 9.74999 5.32099 12.1189 9.33217 12.1189C13.3434 12.1189 16.7689 9.74999 18.1568 6.40612C16.7689 3.06225 13.3434 0.693359 9.33217 0.693359ZM9.33217 10.2146C7.118 10.2146 5.32099 8.50842 5.32099 6.40612C5.32099 4.30383 7.118 2.59761 9.33217 2.59761C11.5463 2.59761 13.3434 4.30383 13.3434 6.40612C13.3434 8.50842 11.5463 10.2146 9.33217 10.2146ZM9.33217 4.12102C8.00046 4.12102 6.92546 5.1417 6.92546 6.40612C6.92546 7.67055 8.00046 8.69123 9.33217 8.69123C10.6639 8.69123 11.7389 7.67055 11.7389 6.40612C11.7389 5.1417 10.6639 4.12102 9.33217 4.12102Z" fill="#A4A4A4" />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_174_422">
                                                                <rect width="17.6492" height="12.1872" fill="white" transform="translate(0.507568 0.3125)" />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>

                                                </div>
                                            </div>
                                        }>
                                            <Dropdown.Item onClick={() => navigate(`/admin/coupon/${item._id}`, {
                                                state: {
                                                    item: item
                                                }
                                            })}>Edit</Dropdown.Item>
                                            <Dropdown.Item onClick={() => deleteCoupon(item?._id)}>Delete</Dropdown.Item>

                                        </Dropdown>

                                    </div>
                                    <div className='block lg:hidden flex lg:items-center justify-between bg-white p-2 rounded-md mt-4'>

                                        <div className='w-[100%]'>
                                            <table className='w-[100%]' >
                                                <thead className='border-b-[2px]'>
                                                    {/* <th className='font-[400] text-[10px]'>Name</th> */}
                                                    <th className='font-[400] text-[10px]'>Coupon Name</th>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        {/* <td className='text-center text-[10px]'>{item?.firstname}{" "}{item?.lastName}</td> */}
                                                        <td className='text-center text-[10px] flex justify-center items-center'> <span> {item?.couponName}</span>

                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                strokeWidth="2"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                className="feather feather-copy cursor-pointer ms-2"
                                                                width="16"
                                                                height="16"
                                                                onClick={() => handleCopy(item?.couponName)}
                                                            >
                                                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                                            </svg></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <br />
                                            <table className='w-[100%]' >
                                                <thead className='border-b-[2px]'>
                                                    <th className='font-[400] text-[10px]'>Type</th>
                                                    <th className='font-[400] text-[10px]'>Amount/Percentage</th>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className='text-center text-[10px]'>{item?.type}</td>
                                                        <td className='text-center text-[10px]'>{item?.amount}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <br />
                                            <table className='w-[100%]' >
                                                <thead className='border-b-[2px]'>
                                                    <th className='font-[400] text-[10px]'>Email</th>
                                                    <th className='font-[400] text-[10px]'>Expiration Date</th>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className='text-center text-[10px]'>{item?.email ? "Yes" : "N/A"}</td>
                                                        <td className='text-center text-[10px]'>{moment(item?.expiryAt).format("YYYY-MM-DD")}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <Dropdown inline label="" dismissOnClick={true} renderTrigger={() =>
                                            <div className='flex items-center gap-6'>
                                                <div className='flex items-center gap-3'>
                                                    <svg className='p-2 bg-white view-icon' width="39" height="33" viewBox="0 0 19 13" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ cursor: "pointer", boxShadow: "2px 2px 5px #ccc", borderRadius: "5px" }}
                                                    // onClick={() => navigate(`/admin/merchants/detail/${item._id}`, {
                                                    //     state: {
                                                    //         item: item
                                                    //     }
                                                    // })}
                                                    >
                                                        <g clip-path="url(#clip0_174_422)">
                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.33217 0.693359C5.32099 0.693359 1.89544 3.06225 0.507568 6.40612C1.89544 9.74999 5.32099 12.1189 9.33217 12.1189C13.3434 12.1189 16.7689 9.74999 18.1568 6.40612C16.7689 3.06225 13.3434 0.693359 9.33217 0.693359ZM9.33217 10.2146C7.118 10.2146 5.32099 8.50842 5.32099 6.40612C5.32099 4.30383 7.118 2.59761 9.33217 2.59761C11.5463 2.59761 13.3434 4.30383 13.3434 6.40612C13.3434 8.50842 11.5463 10.2146 9.33217 10.2146ZM9.33217 4.12102C8.00046 4.12102 6.92546 5.1417 6.92546 6.40612C6.92546 7.67055 8.00046 8.69123 9.33217 8.69123C10.6639 8.69123 11.7389 7.67055 11.7389 6.40612C11.7389 5.1417 10.6639 4.12102 9.33217 4.12102Z" fill="#A4A4A4" />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_174_422">
                                                                <rect width="17.6492" height="12.1872" fill="white" transform="translate(0.507568 0.3125)" />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>

                                                </div>
                                            </div>
                                        }>
                                            <Dropdown.Item onClick={() => navigate(`/admin/coupon/${item._id}`, {
                                                state: {
                                                    item: item
                                                }
                                            })}>Edit</Dropdown.Item>
                                            <Dropdown.Item onClick={() => deleteCoupon(item?._id)}>Delete</Dropdown.Item>

                                        </Dropdown>
                                    </div>
                                </>
                            ))
                        }
                    </div>
                    {/* <div className='text-xs lg:text-md text-right mt-4 flex  items-center justify-end gap-2 cursor-pointer'>
                        <span>
                            1-5 of 10
                        </span>
                        <svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.5415 9.79541L5.78052 5.5564L1.5415 1.31738" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>

                    </div> */}

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

export default TermsConditionListing;