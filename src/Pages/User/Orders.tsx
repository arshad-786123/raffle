import React, { useEffect, useState } from 'react'
import AdminSidebar from '../../Components/Navbar/AdminSidebar'
import { getDBData, getOrdersListingData, getWinnersListingData } from '../../Services/Admin/getDashboardData'
import { Link, useNavigate } from 'react-router-dom'
import { Dropdown } from 'flowbite-react'
import * as XLSX from 'xlsx';
import axios from 'axios'
import { CONSTANT_DATA } from '../../constants';
import noimage from '../../assets/no-image.png';
import UserSidebar from '../../Components/Navbar/UserSidebar'
import OrderListingTable from '../../Common/OrderListing/OrderListingTable'

const UserOrders: React.FC = () => {
    const [orderData, setOrderData] = useState<any>([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState<string>(""); // For customer name search
    const [filterStatus, setFilterStatus] = useState<string | undefined>(undefined); // For status filter
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [isDownload, setIsDownload] = useState(false);
    const itemsPerPage = 10;
    const navigate = useNavigate()



    useEffect(() => {
        getDashboardData(currentPage, { customerName: searchTerm, status: filterStatus, startDate, endDate, isDownload: isDownload ? "true" : "false" });
    }, [currentPage, searchTerm, filterStatus, startDate, endDate, isDownload]);

    const getDashboardData = async (page: number, filters: {
        customerName?: string; status?: string; startDate?: string;
        endDate?: string;
        isDownload?: string;
    }) => {
        try {
            const persistedData = localStorage.getItem('persist:root');

            // Check if persistedData is null or not
            if (persistedData) {
                const parsedData = JSON.parse(persistedData);
                const userData = JSON.parse(parsedData.user);
                const userId = userData?.user?.id;

                const res = await getOrdersListingData("customer", userId, page, itemsPerPage, filters);
                console.log("API Response:", res.result);
                setOrderData(res.result);
                setCurrentPage(res.currentPage);
                setTotalPages(res.totalPages);
            } else {
                console.warn("No persisted data found in localStorage.");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };


    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to the first page when searching
    };

    const handleStatusFilter = (status: string) => {
        setFilterStatus(status);
        setCurrentPage(1); // Reset to the first page when filtering
    };

    // Handling start date filter change
    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStartDate(e.target.value);
        setCurrentPage(1); // Reset to the first page when filtering
    };

    // Handling end date filter change
    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEndDate(e.target.value);
        setCurrentPage(1); // Reset to the first page when filtering
    };

    const handleDownloadClick = async () => {
        setIsDownload(true);
        let allData: any[] = []; // To store all data from API
        let currentPage = 1;
        const limit = 10; // Set the items per page (consistent with API)
        const persistedData = localStorage.getItem("persist:root");
        let userId: string | undefined;

        try {
            // Retrieve user ID from persisted data
            if (persistedData) {
                const parsedData = JSON.parse(persistedData);
                const userData = JSON.parse(parsedData.user);
                userId = userData?.user?.id;

                if (!userId) {
                    console.warn("User ID not found in persisted data.");
                    return; // Exit function if userId is undefined
                }
            } else {
                console.warn("No persisted data found in localStorage.");
                return; // Exit function if persisted data is not available
            }

            console.log("Starting download process...");

            // Loop to fetch all pages
            while (true) {
                console.log(`Fetching page ${currentPage} with limit ${limit}...`);

                const res = await getOrdersListingData("customer", userId, currentPage, limit, {
                    customerName: searchTerm,
                    status: filterStatus,
                    startDate,
                    endDate,
                    isDownload: "true",
                });

                console.log(`API response for page ${currentPage}:`, res);

                // Combine results from the current page
                allData = [...allData, ...res.result];

                // Break the loop if all pages are fetched
                if (currentPage >= res.totalPages) {
                    console.log("Fetched all pages. Stopping loop.");
                    break;
                }

                currentPage++;
            }

            console.log("All data fetched:", allData);

            // Map the data to the desired format for Excel export
            const data = allData.map((merchant: any) => ({
                OrderId: merchant._id,
                CustomerName: `${merchant.userID?.firstname || ''} ${merchant.userID?.lastname || ''}`.trim() || "N/A",
                PaymentMethod: merchant.paymentMethod || "",
                Status: merchant.orderStatus,
                NumberOfTickets: merchant.totalRaffles || 0,
                Discount: merchant.couponAmount || 0,
                Total: merchant.totalPrice,
            }));

            console.log("Data to export:", data);

            // Create a worksheet and workbook for the Excel file
            const ws = XLSX.utils.json_to_sheet(data);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Merchants");

            // Trigger the download
            XLSX.writeFile(wb, "orders.xlsx");
            console.log("File download triggered.");

        } catch (error) {
            console.error("Error during download process:", error);
        } finally {
            setIsDownload(false); // Reset the download flag
            console.log("Download process completed.");
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

    return (
        <div className='flex footer-manage ' style={{ fontFamily: "poppins, sans-serif" }} >
            <div className='hidden lg:block'>
                <UserSidebar />
            </div>

            <div className='w-[100%] lg:w-[95%] mx-auto z-10 p-3 lg:p-10 duration-500'>

                <div className='w-[100%] lg:w-[90%] m-auto bg-[#F9F0F0] mt-4 p-4 rounded-md'>
                    <div className="flex flex-wrap items-center gap-2 md:gap-5">
                        <h4>Orders</h4>

                        <div className="flex flex-col lg:flex-row items-center gap-2 w-full lg:w-auto">
                            <div className="hidden lg:flex items-center gap-5 bg-white border rounded-md px-2 w-full lg:w-auto">
                                <svg
                                    width="21"
                                    height="21"
                                    viewBox="0 0 21 21"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M16.031 14.6168L20.3137 18.8995L18.8995 20.3137L14.6168 16.031C13.0769 17.263 11.124 18 9 18C4.032 18 0 13.968 0 9C0 4.032 4.032 0 9 0C13.968 0 18 4.032 18 9C18 11.124 17.263 13.0769 16.031 14.6168ZM14.0247 13.8748C15.2475 12.6146 16 10.8956 16 9C16 5.1325 12.8675 2 9 2C5.1325 2 2 5.1325 2 9C2 12.8675 5.1325 16 9 16C10.8956 16 12.6146 15.2475 13.8748 14.0247L14.0247 13.8748Z"
                                        fill="black"
                                    />
                                </svg>
                                <input
                                    type="text"
                                    className="border-none outline-none w-full"
                                    placeholder="Search"
                                    value={searchTerm}
                                    onChange={handleSearch}
                                />
                            </div>

                            <div className="block lg:hidden p-2 flex items-center gap-5 bg-white border rounded-md w-full">
                                <svg
                                    width="21"
                                    height="21"
                                    viewBox="0 0 21 21"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M16.031 14.6168L20.3137 18.8995L18.8995 20.3137L14.6168 16.031C13.0769 17.263 11.124 18 9 18C4.032 18 0 13.968 0 9C0 4.032 4.032 0 9 0C13.968 0 18 4.032 18 9C18 11.124 17.263 13.0769 16.031 14.6168ZM14.0247 13.8748C15.2475 12.6146 16 10.8956 16 9C16 5.1325 12.8675 2 9 2C5.1325 2 2 5.1325 2 9C2 12.8675 5.1325 16 9 16C10.8956 16 12.6146 15.2475 13.8748 14.0247L14.0247 13.8748Z"
                                        fill="black"
                                    />
                                </svg>
                                <input
                                    type="text"
                                    className="w-full border-none outline-none"
                                    placeholder="Search"
                                    value={searchTerm}
                                    onChange={handleSearch}
                                />
                            </div>
                        </div>

                        {/* Date Filters */}
                        <div className="flex flex-col lg:flex-row items-center gap-2 w-full lg:w-auto">
                            <input
                                className="border p-2 rounded-md outline-none cursor-pointer w-full lg:w-auto"
                                type={startDate ? "date" : "text"}
                                name="start_date"
                                id="start_date"
                                value={startDate}
                                onChange={handleStartDateChange}
                                placeholder="From date"
                                onFocus={(e) => (e.target.type = "date")}
                                onBlur={(e) => {
                                    if (!startDate) e.target.type = "text";
                                }}
                            />
                            <input
                                className="border p-2 rounded-md outline-none cursor-pointer w-full lg:w-auto"
                                type={endDate ? "date" : "text"}
                                name="end_date"
                                id="end_date"
                                value={endDate}
                                onChange={handleEndDateChange}
                                placeholder="To date"
                                onFocus={(e) => (e.target.type = "date")}
                                onBlur={(e) => {
                                    if (!endDate) e.target.type = "text";
                                }}
                            />
                        </div>

                        {/* Status Filter */}
                        <select
                            onChange={(e) => handleStatusFilter(e.target.value)}
                            value={filterStatus || ""}
                            className="border p-2 rounded-md outline-none cursor-pointer w-full sm:w-auto "
                        >
                            <option value="">Status</option>
                            <option value="pending">Pending</option>
                            <option value="capture-pending">Capture-Pending</option>
                            <option value="completed">Completed</option>
                            <option value="failed">Failed</option>
                        </select>
                        {/* Download Button */}
                        <div
                            className="p-3 bg-white rounded-full w-fit flex items-center justify-center cursor-pointer"
                            onClick={handleDownloadClick}
                        >
                            <svg
                                width="20"
                                height="18"
                                viewBox="0 0 20 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M2 16H18V9H20V17C20 17.5523 19.5523 18 19 18H1C0.44772 18 0 17.5523 0 17V9H2V16ZM12 6H17L10 13L3 6H8V0H12V6Z"
                                    fill="black"
                                />
                            </svg>
                        </div>
                    </div>
                    <OrderListingTable merchantsData={orderData} />
                    {/* <div className='text-xs lg
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

export default UserOrders