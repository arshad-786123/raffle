import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Dropdown } from 'flowbite-react'
import * as XLSX from 'xlsx';
import axios from 'axios'
import { CONSTANT_DATA } from '../../constants';
import noimage from '../../assets/no-image.png';
import moment from 'moment'

interface Order {
    userID: {
        firstname: string;
        image?: string;
    };
    _id: string;
    createdAt: string;
    orderStatus: string;
}

interface OrderListingTableProps {
    merchantsData: Order[];
}


const OrderListingTable: React.FC<OrderListingTableProps> = ({ merchantsData }) => {


    const navigate = useNavigate()
    const persistedData = localStorage.getItem('persist:root');
    if (persistedData) {
        const parsedData = JSON.parse(persistedData);
        const userData = JSON.parse(parsedData?.user);
        var role = userData?.user?.role;

    }
    // Define the style type for the status style
    interface StatusStyle {
        backgroundColor: string;
        color: string;
        textTransform: 'capitalize' | 'uppercase' | 'lowercase' | 'none';
        padding: string
    }

    // Function to format a date from UTC for display in Europe/London timezone
    const formatDateForDisplay = (date: any) => {
        return moment.utc(date).tz('Europe/London').format('YYYY-MM-DD');
    };



    // Function to get status style
    const getStatusStyle = (status: string): StatusStyle => {
        switch (status) {
            case 'pending':
                return { backgroundColor: 'rgba(0, 0, 255, 0.2)', color: 'blue', textTransform: 'capitalize', padding: "2px 10px " };
            case 'completed':
                return { backgroundColor: 'rgba(0, 255, 0, 0.2)', color: 'green', textTransform: 'capitalize', padding: "2px 10px " };
            case 'failed':
                return { backgroundColor: 'rgb(220 38 38 / 16%)', color: 'red', textTransform: 'capitalize', padding: "2px 10px " };
            case 'capture-pending':
                return { backgroundColor: 'rgba(0, 0, 255, 0.2)', color: 'blue', textTransform: 'capitalize', padding: "2px 10px " };
            default:
                return { textTransform: 'capitalize', backgroundColor: 'transparent', color: 'black', padding: "2px 10px " };
        }
    };
    return (

        <div>

            {
                merchantsData?.map((item: any, i: number) => {
                    const statusStyle = getStatusStyle(item?.orderStatus);
                    return (
                        <>
                            <div className='hidden lg:block lg:flex items-center justify-between bg-white p-2 rounded-md mt-4'>
                                {/* {
                                    item?.userID?.image ? <img src={item ? CONSTANT_DATA.BASE_URL + item?.userID?.image : noimage} alt={item?.businessName} style={{ height: "50px", width: "50px", borderRadius: "50%" }}
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.onerror = null;
                                            target.src = noimage;
                                        }}
                                    />
                                        :
                                        <svg className='rounded-[50px] bg-[#F2DAE9] p-3' width="44" height="43" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clip-path="url(#clip0_174_416)">
                                                <path d="M7.01632 6.44307C7.86056 6.44307 8.59161 6.14942 9.18892 5.57005C9.78624 4.99077 10.089 4.28198 10.089 3.46314C10.089 2.64458 9.78624 1.9357 9.18883 1.35623C8.59141 0.77705 7.86046 0.483398 7.01632 0.483398C6.17198 0.483398 5.44113 0.77705 4.84381 1.35633C4.2465 1.93561 3.9436 2.64449 3.9436 3.46314C3.9436 4.28198 4.2465 4.99086 4.84391 5.57014C5.44132 6.14933 6.17227 6.44307 7.01632 6.44307Z" fill="#232463" />
                                                <path d="M12.393 9.99629C12.3758 9.75522 12.341 9.49225 12.2897 9.21455C12.2379 8.93477 12.1712 8.67029 12.0914 8.42855C12.009 8.1787 11.8969 7.93196 11.7583 7.69551C11.6144 7.45009 11.4454 7.23639 11.2558 7.06054C11.0576 6.87657 10.8148 6.72866 10.5341 6.62077C10.2544 6.51345 9.94441 6.45908 9.61281 6.45908C9.48258 6.45908 9.35664 6.5109 9.11341 6.66447C8.96371 6.75915 8.78862 6.86864 8.59318 6.98975C8.42606 7.09301 8.19967 7.18976 7.92004 7.27736C7.64723 7.36297 7.37022 7.40639 7.09682 7.40639C6.82342 7.40639 6.54652 7.36297 6.27341 7.27736C5.99407 7.18986 5.76768 7.0931 5.60076 6.98984C5.40717 6.86987 5.23198 6.76038 5.08004 6.66438C4.83711 6.51081 4.71106 6.45898 4.58084 6.45898C4.24914 6.45898 3.93924 6.51345 3.65961 6.62087C3.3791 6.72857 3.13626 6.87648 2.93781 7.06063C2.7483 7.23658 2.57924 7.45019 2.43558 7.69551C2.29708 7.93196 2.18496 8.1786 2.10242 8.42865C2.02271 8.67038 1.95604 8.93477 1.90426 9.21455C1.85296 9.49187 1.81812 9.75494 1.80089 9.99658C1.78396 10.2333 1.77539 10.479 1.77539 10.7272C1.77539 11.373 1.98708 11.8958 2.40453 12.2814C2.81682 12.6619 3.36236 12.8549 4.02576 12.8549H10.1685C10.8319 12.8549 11.3772 12.662 11.7896 12.2814C12.2071 11.8961 12.4188 11.3732 12.4188 10.7271C12.4187 10.4778 12.4101 10.2319 12.393 9.99629Z" fill="#232463" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_174_416">
                                                    <rect width="12.7573" height="12.3721" fill="white" transform="translate(0.728516 0.483398)" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                } */}
                                <div className='w-[95%]'>
                                    <table className='w-[100%]' >
                                        <thead className='border-b-[2px] grid grid-cols-8 gap-4'>
                                            <th className='font-[400] text-[15px]'>Customer</th>

                                            <th className='font-[400] text-[15px]  ' >Order ID</th>


                                            <th className='font-[400] text-[15px] ml-5'>Number of tickets</th>
                                            <th className='font-[400] text-[15px]'>PaymentMethod</th>
                                            <th className='font-[400] text-[15px]'>Discount</th>
                                            <th className='font-[400] text-[15px]'>Total</th>
                                            <th className='font-[400] text-[15px]'>Order Date</th>
                                            <th className='font-[400] text-[15px]'>Payment Status</th>
                                        </thead>
                                        <tbody>
                                            <tr className='grid grid-cols-8 gap-4'>
                                                <td className='text-center'>{`${item?.userID?.firstname || ''} ${item?.userID?.lastname || ''}`.trim()}</td>

                                                <td className='text-center ' style={{ maxWidth: "150px", wordBreak: "break-word" }}>{item?._id}</td>


                                                <td className='text-center ml-5'>{item?.totalRaffles || 0}</td>
                                                <td className='text-center'>
                                                    <span>
                                                        {item?.paymentMethod
                                                            ? item.paymentMethod.charAt(0).toUpperCase() + item.paymentMethod.slice(1).toLowerCase()
                                                            : "N/A"}
                                                    </span>
                                                </td>

                                                <td className='text-center'>£{item?.couponAmount || 0}</td>
                                                <td className='text-center'>£{item?.totalPrice}</td>

                                                <td className='text-center' > {formatDateForDisplay(item?.createdAt)}</td>
                                                <td className='text-center mt-1'  >
                                                    <span style={statusStyle} className='rounded' >{item?.orderStatus}</span>
                                                </td>
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
                                    {
                                        role == "Customer" ? <Dropdown.Item
                                            onClick={() => navigate(`/user/orders/detail/${item._id}`, {
                                                state: {
                                                    item: item
                                                }
                                            })}
                                        >View order</Dropdown.Item>
                                            : <Dropdown.Item
                                                onClick={() => navigate(`/admin/orders/detail/${item._id}`, {
                                                    state: {
                                                        item: item
                                                    }
                                                })}
                                            >View order</Dropdown.Item>
                                    }

                                </Dropdown>

                            </div>
                            <div className='block lg:hidden flex lg:items-center justify-between bg-white p-2 rounded-md mt-4'>
                                {
                                    item?.userID?.image ? <img src={item ? CONSTANT_DATA.BASE_URL + item?.userID?.image : noimage} alt={item?.businessName} style={{ height: "50px", width: "50px", borderRadius: "50%" }}
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.onerror = null;
                                            target.src = noimage;
                                        }}
                                    />
                                        :
                                        <svg className='rounded-[50px] bg-[#F2DAE9] p-3' width="44" height="43" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clip-path="url(#clip0_174_416)">
                                                <path d="M7.01632 6.44307C7.86056 6.44307 8.59161 6.14942 9.18892 5.57005C9.78624 4.99077 10.089 4.28198 10.089 3.46314C10.089 2.64458 9.78624 1.9357 9.18883 1.35623C8.59141 0.77705 7.86046 0.483398 7.01632 0.483398C6.17198 0.483398 5.44113 0.77705 4.84381 1.35633C4.2465 1.93561 3.9436 2.64449 3.9436 3.46314C3.9436 4.28198 4.2465 4.99086 4.84391 5.57014C5.44132 6.14933 6.17227 6.44307 7.01632 6.44307Z" fill="#232463" />
                                                <path d="M12.393 9.99629C12.3758 9.75522 12.341 9.49225 12.2897 9.21455C12.2379 8.93477 12.1712 8.67029 12.0914 8.42855C12.009 8.1787 11.8969 7.93196 11.7583 7.69551C11.6144 7.45009 11.4454 7.23639 11.2558 7.06054C11.0576 6.87657 10.8148 6.72866 10.5341 6.62077C10.2544 6.51345 9.94441 6.45908 9.61281 6.45908C9.48258 6.45908 9.35664 6.5109 9.11341 6.66447C8.96371 6.75915 8.78862 6.86864 8.59318 6.98975C8.42606 7.09301 8.19967 7.18976 7.92004 7.27736C7.64723 7.36297 7.37022 7.40639 7.09682 7.40639C6.82342 7.40639 6.54652 7.36297 6.27341 7.27736C5.99407 7.18986 5.76768 7.0931 5.60076 6.98984C5.40717 6.86987 5.23198 6.76038 5.08004 6.66438C4.83711 6.51081 4.71106 6.45898 4.58084 6.45898C4.24914 6.45898 3.93924 6.51345 3.65961 6.62087C3.3791 6.72857 3.13626 6.87648 2.93781 7.06063C2.7483 7.23658 2.57924 7.45019 2.43558 7.69551C2.29708 7.93196 2.18496 8.1786 2.10242 8.42865C2.02271 8.67038 1.95604 8.93477 1.90426 9.21455C1.85296 9.49187 1.81812 9.75494 1.80089 9.99658C1.78396 10.2333 1.77539 10.479 1.77539 10.7272C1.77539 11.373 1.98708 11.8958 2.40453 12.2814C2.81682 12.6619 3.36236 12.8549 4.02576 12.8549H10.1685C10.8319 12.8549 11.3772 12.662 11.7896 12.2814C12.2071 11.8961 12.4188 11.3732 12.4188 10.7271C12.4187 10.4778 12.4101 10.2319 12.393 9.99629Z" fill="#232463" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_174_416">
                                                    <rect width="12.7573" height="12.3721" fill="white" transform="translate(0.728516 0.483398)" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                }
                                <div className='w-[100%]'>
                                    <table className='w-[100%]' >
                                        <thead className='border-b-[2px]'>
                                            <th className='font-[400] text-[10px]'>Customer</th>

                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className='text-center text-[10px]'>{`${item?.userID?.firstname} ${item?.userID?.lastname}`}</td>

                                            </tr>
                                        </tbody>
                                    </table>

                                    <br />
                                    <table className='w-[100%]' >
                                        <thead className='border-b-[2px]'>
                                            <th className='font-[400] text-[10px]'>Order ID</th>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className='text-center text-[10px]'>{item?._id}</td>
                                            </tr>
                                        </tbody>
                                    </table><br />
                                    <table className='w-[100%]' >
                                        <thead className='border-b-[2px]'>
                                            <th className='font-[400] text-[10px]'>PaymentMethod</th>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className='text-center text-[10px]'> <span> {item?.paymentMethod
                                                    ? item.paymentMethod.charAt(0).toUpperCase() + item.paymentMethod.slice(1).toLowerCase()
                                                    : "N/A"}</span></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <br />
                                    <table className='w-[100%]' >
                                        <thead className='border-b-[2px]'>
                                            <th className='font-[400] text-[10px]'>Total</th>
                                            <th className='font-[400] text-[10px]'>Discount</th>

                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className='text-center text-[10px]'>£{item?.totalPrice}</td>
                                                <td className='text-center  text-[10px]'> £{item?.couponAmount || 0}</td>

                                            </tr>
                                        </tbody>
                                    </table>
                                    <br />

                                    <table className='w-[100%]' >
                                        <thead className='border-b-[2px]'>
                                            <th className='font-[400] text-[10px]'>Order Date</th>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className='text-center  text-[10px]'> {formatDateForDisplay(item?.createdAt)}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <br />
                                    <table className='w-[100%]' >
                                        <thead className='border-b-[2px]'>
                                            <th className='font-[400] text-[10px]'>Payment Status</th>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className='text-center  text-[10px]'>
                                                    <span style={statusStyle} className='rounded' >{item?.orderStatus}</span>
                                                </td>
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
                                    {
                                        role == "Customer" ? <Dropdown.Item
                                            onClick={() => navigate(`/user/orders/detail/${item._id}`, {
                                                state: {
                                                    item: item
                                                }
                                            })}
                                        >View order</Dropdown.Item>
                                            : <Dropdown.Item
                                                onClick={() => navigate(`/admin/orders/detail/${item._id}`, {
                                                    state: {
                                                        item: item
                                                    }
                                                })}
                                            >View order</Dropdown.Item>
                                    }

                                </Dropdown>
                            </div>
                        </>
                    )
                })
            }
        </div>



    )
}

export default OrderListingTable;