import React, { useEffect, useState } from 'react'
import AdminSidebar from '../../Components/Navbar/AdminSidebar'
import { getDBData, getOrderById, getOrdersListingData, getWinnersListingData } from '../../Services/Admin/getDashboardData'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
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


const OrderDetails: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    let page = parseInt(searchParams.get("page") || "1", 10);
    const [merchantsData, setMerchantsData] = useState<any>([])
    const [currentPage, setCurrentPage] = useState(page);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 10;
    const navigate = useNavigate()
    const { id } = useParams();

    useEffect(() => {
        const page = parseInt(searchParams.get("page") || "1", 10);
        setCurrentPage(page);
    }, [searchParams]);


    useEffect(() => {
        getDashboardData(currentPage);
    }, [currentPage]);

    const getDashboardData = async (page: number) => {
        try {
            const res = await getOrderById(id, page, itemsPerPage);
            setMerchantsData(res?.result);
            setCurrentPage(res.currentPage);
            setTotalPages(res.totalPages);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        setSearchParams({ page: newPage.toString() }); // Convert to string since searchParams expects strings
    };


    const handlePrevPage = () => {
        if (currentPage > 1) {
            handlePageChange(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            handlePageChange(currentPage + 1);
        }
    };

    return (

        <div>
            {
                merchantsData?.purchases?.map((prize: any, index: any) => (
                    <div key={index} className='hidden lg:block lg:flex items-center justify-between bg-white p-2 rounded-md mt-4'>
                        {
                            prize?.image ? <img src={prize?.image ? CONSTANT_DATA.BASE_URL + prize?.image : noimage} alt={merchantsData?.userID?.firstname} style={{ height: "50px", width: "50px", borderRadius: "50%" }}
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.onerror = null;
                                    target.src = noimage;
                                }}
                            />
                                :
                                <svg className='rounded-[50px] bg-[#F2DAE9] p-3' width="44" height="43" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_174_416)">
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_174_416">
                                            <rect width="12.7573" height="12.3721" fill="white" transform="translate(0.728516 0.483398)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                        }
                        <div className='w-[95%]'>
                            <table className='w-[100%]'>
                                <thead className='border-b-[2px] grid grid-cols-5 gap-4'>
                                    <th className='font-[400] text-[15px]'>Ticket ID</th>
                                    <th className='font-[400] text-[15px]'>Raffle</th>
                                    <th className='font-[400] text-[15px]'>Prize</th>
                                    <th className='font-[400] text-[15px]'>Win Prize</th>
                                    <th className='font-[400] text-[15px]'>Raffle Status</th>
                                </thead>
                                <tbody>
                                    <tr className='grid grid-cols-5 gap-4'>
                                        <td className='text-center'>{prize?.ticketNo}</td>
                                        <td className='text-center'>{prize?.raffleName}</td>
                                        <td className='text-center'>£{prize?.rafflePrice}</td>
                                        <td className='text-center'>£{prize?.winPrice}</td>

                                        <td className='text-center'>
                                            {(prize?.userID && prize?.winPrice > 0) && "Winner"}
                                            {(prize?.userID && prize?.winPrice <= 0) && "Better luck next time"}
                                            {!prize?.userID && "Draw soon"}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))
            }


            {
                merchantsData?.purchases?.map((prize: any, index: any) => (
                    <div key={index} className='block lg:hidden flex lg:items-center justify-between bg-white p-2 rounded-md mt-4'>
                        {
                            prize?.image ? <img src={prize?.image ? CONSTANT_DATA.BASE_URL + prize?.image : noimage} alt={merchantsData?.userID?.firstname} style={{ height: "50px", width: "50px", borderRadius: "50%" }}
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.onerror = null;
                                    target.src = noimage;
                                }}
                            />
                                :
                                <svg className='rounded-[50px] bg-[#F2DAE9] p-3' width="44" height="43" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_174_416)">
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_174_416">
                                            <rect width="12.7573" height="12.3721" fill="white" transform="translate(0.728516 0.483398)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                        }
                        <div className='w-[100%]'>
                            <table className='w-[100%]'>
                                <thead className='border-b-[2px]'>
                                    <th className='font-[400] text-[10px]'>Ticket ID</th>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className='text-center text-[10px]'>{prize?.ticketNo}</td>
                                    </tr>
                                </tbody>
                            </table>

                            <br />

                            <table className='w-[100%]'>
                                <thead className='border-b-[2px]'>
                                    <th className='font-[400] text-[10px]'>Raffle</th>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className='text-center text-[10px]'>{prize?.raffleName}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <br />

                            <table className='w-[100%]'>
                                <thead className='border-b-[2px]'>
                                    <th className='font-[400] text-[10px]'>Prize</th>
                                    <th className='font-[400] text-[10px]'>Win Prize</th>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className='text-center text-[10px]'>£{prize?.rafflePrice}</td>
                                        <td className='text-center text-[10px]'>£{prize?.winPrice}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <br />

                            <table className='w-[100%]'>
                                <thead className='border-b-[2px]'>
                                    <th className='font-[400] text-[10px]'>Raffle Status</th>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className='text-center text-[10px]'>
                                            {(prize?.userID && prize?.winPrice > 0) && "Winner"}
                                            {(prize?.userID && prize?.winPrice <= 0) && "Better luck next time"}
                                            {!prize?.userID && "Draw soon"}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))
            }

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



    )
}

export default OrderDetails;