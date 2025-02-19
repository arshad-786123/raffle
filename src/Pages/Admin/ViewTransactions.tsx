// ViewTransactions.tsx
import React, { useEffect, useState } from 'react';
import AdminSidebar from '../../Components/Navbar/AdminSidebar';
import { getTransactionsList } from '../../Services/Admin/getDashboardData';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CONSTANT_DATA } from '../../constants';
import { Toaster } from 'react-hot-toast';
import { Dropdown } from 'flowbite-react';
import moment from 'moment';

const ViewTransactions = () => {
    const [transactionsData, setTransactionsData] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const itemsPerPage = 10;

    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) {
            getTransactions(id, currentPage, itemsPerPage, searchQuery, startDate, endDate);
        }
    }, [id, currentPage, searchQuery, startDate, endDate]);

    const getTransactions = async (userId: string, page: number, limit: number, search: string, startDate: string, endDate: string) => {
        try {
            const res = await getTransactionsList(userId, page, limit, search, startDate, endDate);
            setTransactionsData(res.result);
            setTotalPages(res.totalPages);
        } catch (error) {
            console.log(error);
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
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("Search input changed:", e.target.value);
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };


    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStartDate(e.target.value);
        setCurrentPage(1);
    };

    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEndDate(e.target.value);
        setCurrentPage(1);
    };



    return (
        <div className='flex footer-manage' >
            <Toaster position='top-right' />
            <div className='hidden lg:block'>
                <AdminSidebar />
            </div>


            <div className='w-[100%] lg:w-[95%] mx-auto z-10 p-3 lg:p-10 duration-500' style={{ fontFamily: "poppins, sans-serif" }}>
                <div className='m-auto w-[100%] lg:w-[90%]'>
                    <nav aria-label="breadcrumb" className="breadcrumb-container ">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/admin/reports" className="breadcrumb-link">Dashboard</Link>
                            </li>
                            <li className='px-2'>{">"}</li>
                            <li className="breadcrumb-item">
                                <Link to="/admin/users" className="breadcrumb-link">Customers</Link>
                            </li>
                            <li className='px-2'>{">"}</li>
                            <li className="breadcrumb-item active" aria-current="page">
                                Transactions
                            </li>
                        </ol>
                    </nav>
                </div>
                <div className='w-[100%] lg:w-[90%] m-auto bg-[#F9F0F0] mt-4 p-4 rounded-md'>
                    <div className='block lg:flex items-center justify-between '>
                        <h4>Transactions</h4>
                        <div className='block lg:flex items-center gap-2'>
                            <div className='block lg:flex items-center gap-2'>
                                <input
                                    className='border-[1px] p-2 border-none outline-none cursor-pointer'
                                    type="date"
                                    placeholder='From'
                                    name="start_date"
                                    id="start_date"
                                    value={startDate}
                                    onChange={handleStartDateChange}
                                />
                                <input
                                    className='border-[1px] p-2 border-none outline-none cursor-pointer my-3 lg:my-0'
                                    type="date"
                                    placeholder='To'
                                    name="end_date"
                                    id="end_date"
                                    value={endDate}
                                    onChange={handleEndDateChange}
                                />
                            </div>
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
                            transactionsData?.map((item: any, i: number) => (
                                <>
                                    <div className='hidden lg:block lg:flex items-center justify-between bg-white p-2 rounded-md mt-4'>
                                        {/* <svg className='rounded-[50px] bg-[#F2DAE9] p-3' width="44" height="43" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clip-path="url(#clip0_174_416)">
                                                <path d="M7.01632 6.44307C7.86056 6.44307 8.59161 6.14942 9.18892 5.57005C9.78624 4.99077 10.089 4.28198 10.089 3.46314C10.089 2.64458 9.78624 1.9357 9.18883 1.35623C8.59141 0.77705 7.86046 0.483398 7.01632 0.483398C6.17198 0.483398 5.44113 0.77705 4.84381 1.35633C4.2465 1.93561 3.9436 2.64449 3.9436 3.46314C3.9436 4.28198 4.2465 4.99086 4.84391 5.57014C5.44132 6.14933 6.17227 6.44307 7.01632 6.44307Z" fill="#232463" />
                                                <path d="M12.393 9.99629C12.3758 9.75522 12.341 9.49225 12.2897 9.21455C12.2379 8.93477 12.1712 8.67029 12.0914 8.42855C12.009 8.1787 11.8969 7.93196 11.7583 7.69551C11.6144 7.45009 11.4454 7.23639 11.2558 7.06054C11.0576 6.87657 10.8148 6.72866 10.5341 6.62077C10.2544 6.51345 9.94441 6.45908 9.61281 6.45908C9.48258 6.45908 9.35664 6.5109 9.11341 6.66447C8.96371 6.75915 8.78862 6.86864 8.59318 6.98975C8.42606 7.09301 8.19967 7.18976 7.92004 7.27736C7.64723 7.36297 7.37022 7.40639 7.09682 7.40639C6.82342 7.40639 6.54652 7.36297 6.27341 7.27736C5.99407 7.18986 5.76768 7.0931 5.60076 6.98984C5.40717 6.86987 5.23198 6.76038 5.08004 6.66438C4.83711 6.51081 4.71106 6.45898 4.58084 6.45898C4.24914 6.45898 3.93924 6.51345 3.65961 6.62087C3.3791 6.72857 3.13626 6.87648 2.93781 7.06063C2.7483 7.23658 2.57924 7.45019 2.43558 7.69551C2.29708 7.93196 2.18496 8.1786 2.10242 8.42865C2.02271 8.67038 1.95604 8.93477 1.90426 9.21455C1.85296 9.49187 1.81812 9.75494 1.80089 9.99658C1.78396 10.2333 1.77539 10.479 1.77539 10.7272C1.77539 11.373 1.98708 11.8958 2.40453 12.2814C2.81682 12.6619 3.36236 12.8549 4.02576 12.8549H10.1685C10.8319 12.8549 11.3772 12.662 11.7896 12.2814C12.2071 11.8961 12.4188 11.3732 12.4188 10.7271C12.4187 10.4778 12.4101 10.2319 12.393 9.99629Z" fill="#232463" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_174_416">
                                                    <rect width="12.7573" height="12.3721" fill="white" transform="translate(0.728516 0.483398)" />
                                                </clipPath>
                                            </defs>
                                        </svg> */}
                                        <div className='w-[100%]'>
                                            <table className='w-[100%]' >
                                                <thead className='border-b-[2px] grid grid-cols-5 gap-4'>
                                                    <th className='font-[400] text-[15px]'>Raffle Name</th>
                                                    <th className='font-[400] text-[15px]'>Purchase Id</th>
                                                    <th className='font-[400] text-[15px]'>Quantity</th>
                                                    <th className='font-[400] text-[15px]'>Created Date</th>
                                                    <th className='font-[400] text-[15px]'>Total Paid</th>
                                                </thead>
                                                <tbody>
                                                    <tr className='grid grid-cols-5 gap-4'>
                                                        <td className='text-center'>{item?.raffleID?.raffle_name}</td>
                                                        <td className='text-center'>{item?.purchaseId}</td>
                                                        <td className='text-center'>{item?.quantity}</td>
                                                        <td className='text-center'>{moment(item?.createdAt).format('YYYY-MM-DD HH:mm')}</td>
                                                        <td className='text-center'>{item?.quantity * item?.raffleID?.ticket_price || 0}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>


                                    </div>
                                    <div className='block lg:hidden flex  justify-between bg-white p-2 rounded-md mt-4'>
                                        {/* <svg className='rounded-[50px] bg-[#F2DAE9] p-3' width="44" height="43" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clip-path="url(#clip0_174_416)">
                                                <path d="M7.01632 6.44307C7.86056 6.44307 8.59161 6.14942 9.18892 5.57005C9.78624 4.99077 10.089 4.28198 10.089 3.46314C10.089 2.64458 9.78624 1.9357 9.18883 1.35623C8.59141 0.77705 7.86046 0.483398 7.01632 0.483398C6.17198 0.483398 5.44113 0.77705 4.84381 1.35633C4.2465 1.93561 3.9436 2.64449 3.9436 3.46314C3.9436 4.28198 4.2465 4.99086 4.84391 5.57014C5.44132 6.14933 6.17227 6.44307 7.01632 6.44307Z" fill="#232463" />
                                                <path d="M12.393 9.99629C12.3758 9.75522 12.341 9.49225 12.2897 9.21455C12.2379 8.93477 12.1712 8.67029 12.0914 8.42855C12.009 8.1787 11.8969 7.93196 11.7583 7.69551C11.6144 7.45009 11.4454 7.23639 11.2558 7.06054C11.0576 6.87657 10.8148 6.72866 10.5341 6.62077C10.2544 6.51345 9.94441 6.45908 9.61281 6.45908C9.48258 6.45908 9.35664 6.5109 9.11341 6.66447C8.96371 6.75915 8.78862 6.86864 8.59318 6.98975C8.42606 7.09301 8.19967 7.18976 7.92004 7.27736C7.64723 7.36297 7.37022 7.40639 7.09682 7.40639C6.82342 7.40639 6.54652 7.36297 6.27341 7.27736C5.99407 7.18986 5.76768 7.0931 5.60076 6.98984C5.40717 6.86987 5.23198 6.76038 5.08004 6.66438C4.83711 6.51081 4.71106 6.45898 4.58084 6.45898C4.24914 6.45898 3.93924 6.51345 3.65961 6.62087C3.3791 6.72857 3.13626 6.87648 2.93781 7.06063C2.7483 7.23658 2.57924 7.45019 2.43558 7.69551C2.29708 7.93196 2.18496 8.1786 2.10242 8.42865C2.02271 8.67038 1.95604 8.93477 1.90426 9.21455C1.85296 9.49187 1.81812 9.75494 1.80089 9.99658C1.78396 10.2333 1.77539 10.479 1.77539 10.7272C1.77539 11.373 1.98708 11.8958 2.40453 12.2814C2.81682 12.6619 3.36236 12.8549 4.02576 12.8549H10.1685C10.8319 12.8549 11.3772 12.662 11.7896 12.2814C12.2071 11.8961 12.4188 11.3732 12.4188 10.7271C12.4187 10.4778 12.4101 10.2319 12.393 9.99629Z" fill="#232463" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_174_416">
                                                    <rect width="12.7573" height="12.3721" fill="white" transform="translate(0.728516 0.483398)" />
                                                </clipPath>
                                            </defs>
                                        </svg> */}
                                        <div className='w-[100%]'>
                                            <table className='w-[100%]' >
                                                <thead className='border-b-[2px]'>
                                                    <th className='font-[400] text-[10px]'>Raffle Name</th>
                                                    {/* <th className='font-[400] text-[10px]'>Tickets</th> */}
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className='text-center text-[10px]'>{item?.raffleID?.raffle_name}</td>
                                                        {/* <td className='text-center text-[10px]'>{item?.quantity}</td> */}
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <br />
                                            <table className='w-[100%]' >
                                                <thead className='border-b-[2px]'>
                                                    <th className='font-[400] text-[10px]'>Quantity</th>
                                                    <th className='font-[400] text-[10px]'>Prize</th>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className='text-center text-[10px]'>{item?.quantity}</td>
                                                        <td className='text-center text-[10px]'>{item?.raffleID?.ticket_price}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <br />
                                            <table className='w-[100%]' >
                                                <thead className='border-b-[2px]'>
                                                    <th className='font-[400] text-[10px]'>Purchase Id</th>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className='text-center text-[10px]'>{item?.purchaseId}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <br />
                                            <table className='w-[100%]' >
                                                <thead className='border-b-[2px]'>
                                                    <th className='font-[400] text-[10px]'>Total Paid</th>
                                                </thead>
                                                <tbody>
                                                    <tr>

                                                        <td className='text-center text-[10px]'>{item?.quantity * item?.raffleID?.ticket_price}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                    </div>
                                </>
                            ))
                        }

                        {
                            transactionsData?.length == 0 && <p className='text-center my-6 h-[400px]'>No Data Found</p>
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
    );
};

export default ViewTransactions;
