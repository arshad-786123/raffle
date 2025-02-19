import React, { useEffect, useState } from 'react';
import AdminSidebar from '../../Components/Navbar/AdminSidebar';
import { Dropdown, Tabs } from 'flowbite-react';
import { getDBData, getRaffleDBData, getRaffleDBDataList, updateRaffleStatus } from '../../Services/Admin/getDashboardData';
import { getUserPurchasedRaffle } from '../../Services/Authentication/getUserPurchasedRaffle';
import { API_ENDPOINTS, CONSTANT_DATA } from '../../constants';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { successToast } from '../../Utils/Toast/success.toast';
import { errorToast } from '../../Utils/Toast/error.toast';
import noimage from '../../assets/no-image-user.png';
import * as XLSX from 'xlsx';
import { Toaster } from 'react-hot-toast'


interface RaffleDataProps {
    item: any;
    i: any;
}

const AdminRaffles = () => {
    const [raffles, setRaffles] = useState<any[]>([]);
    const [filteredRaffles, setFilteredRaffles] = useState<any[]>([]);
    const [liveRaffles, setLiveRaffles] = useState<any[]>([]);
    const [expiredRaffles, setExpiredRaffles] = useState<any[]>([]);
    const [pendingRaffles, setPendingRaffles] = useState<any[]>([]);
    const [declinedRaffles, setDeclinedRaffles] = useState<any[]>([]);
    const [selectedTab, setSelectedTab] = useState<number>(0);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [start_date, setStartDate] = useState<string>('');
    const [end_date, setEndDate] = useState<string>('');
    const [selectedRaffle, setSelectedRaffle] = useState<any>(null);
    // const [currentPage, setCurrentPage] = useState(1);
    // const [totalPages, setTotalPages] = useState(1);
    // const itemsPerPage = 10;
    const navigate = useNavigate()

    useEffect(() => {
        getDashboardData(selectedTab, searchQuery, start_date, end_date); // Fetch initial data based on selected tab
    }, [selectedTab, searchQuery, start_date, end_date]);

    const getDashboardData = async (tab: number, search: string, start_date: string, end_date: string) => {
        try {
            const res = await getRaffleDBDataList(getRaffleStatus(tab), search, start_date, end_date);
            setRaffles(res.result);
            filterRaffles(tab, res.result);
        } catch (error) {
            console.log(error);
            // Handle error as needed
        }
    };

    const handleRaffleSelect = (raffle: any) => {
        setSelectedRaffle(raffle); // Set the selected raffle data
    };
    useEffect(() => {
        // Initialize filteredRaffles with all raffles on component mount
        setFilteredRaffles(raffles);
    }, [raffles]);

    const filterRaffles = (tab: number, data: any[]) => {
        let filteredData = data?.filter((raffle: any) => getRaffleStatus(tab) === raffle.raffle_status);
        setFilteredRaffles(filteredData);
    };

    const handleTabChange = (tabIndex: number) => {
        setSelectedTab(tabIndex);
    };

    const downloadCSV = () => {
        console.log("download");

        // Safeguard to ensure a raffle is selected
        if (!selectedRaffle) {
            console.log("No raffle selected");
            return;
        }

        // Extracting user details from the 'purchases' field of the selected raffle
        const excelData = selectedRaffle.purchases.map((purchase: any) => {
            if (!purchase) {
                console.log("No purchase details found");
                return null;
            }

            return {
                firstName: purchase.firstname,
                lastName: purchase.lastname,
                email: purchase.email,
                phone: purchase.phone,
                adress: purchase.address,
                opted: purchase.opted
            };
        }).filter(Boolean); // Filter out null values

        console.log("Extracted Excel Data:", excelData);

        // Check if data is empty
        if (excelData.length === 0) {
            // Show a toast if no data is found
            errorToast("No purchases found to download.");
            return; // Prevent further processing if no data
        }

        // Create a worksheet from the data
        const ws = XLSX.utils.json_to_sheet(excelData);

        // Create a new workbook and append the worksheet
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Participants");

        // Export the workbook to Excel file
        XLSX.writeFile(wb, "purchaseDetails.xlsx");

        console.log("Triggering Excel download...");
    };

    const approveRaffle = async (_id: any) => {
        try {
            await updateRaffleStatus(_id, 1);
            successToast("Raffle approved");
            await getDashboardData(selectedTab, searchQuery, start_date, end_date); // Refresh data after updating status
        } catch (err) {
            errorToast("Raffle not approved");
        }
    };

    const declineRaffle = async (_id: any) => {
        try {
            await updateRaffleStatus(_id, 3);
            successToast("Raffle declined");
            await getDashboardData(selectedTab, searchQuery, start_date, end_date); // Refresh data after updating status
        } catch (err) {
            errorToast("Raffle not declined");
        }
    };

    const getRaffleStatus = (tabIndex: number) => {
        switch (tabIndex) {
            case 0:
                return 1; // Pending
            case 1:
                return 3; // Live (default)
            case 2:
                return 0; // Declined
            case 3:
                return 2; // Expired
            case 4:
                return 4;
            default:
                return 1; // Default to Live status if no match (this should ideally not happen)
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        // setCurrentPage(1);
    };


    // const handlePrevPage = () => {
    //     if (currentPage > 1) {
    //         setCurrentPage(currentPage - 1);
    //     }
    // };

    // const handleNextPage = () => {
    //     if (currentPage < totalPages) {
    //         setCurrentPage(currentPage + 1);
    //     }
    // };


    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStartDate(e.target.value);
        // setCurrentPage(1);
    };

    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEndDate(e.target.value);
        // setCurrentPage(1);
    };



    return (
        <div className='flex footer-manage'>
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
                            <li className="breadcrumb-item active" aria-current="page">
                                Raffles
                            </li>
                        </ol>
                    </nav>
                </div>

                <div className='w-[100%] lg:w-[90%] m-auto bg-[#F9F0F0] mt-4 p-4 rounded-md'>
                    <div className='hidden lg:flex items-center justify-between'>
                        <div className='flex items-center gap-12'>
                            <h4>Raffles</h4>

                        </div>
                        <div className='flex items-center gap-6'>
                            <div className='flex items-center gap-2'>
                                <div className='hidden  px-3 lg:flex items-center gap-5 bg-white border-[1px] rounded-[10px] w-fit'>
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
                                <div className='p-3 bg-white rounded-[100px] w-fit'>
                                    <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2 16H18V9H20V17C20 17.5523 19.5523 18 19 18H1C0.44772 18 0 17.5523 0 17V9H2V16ZM12 6H17L10 13L3 6H8V0H12V6Z" fill="black" />
                                    </svg>
                                </div>
                            </div>
                            <div className='block lg:flex items-center gap-2'>
                                <input
                                    className='border-[1px] p-2 border-none outline-none cursor-pointer'
                                    type={start_date ? "date" : "text"}
                                    name="start_date"
                                    id="start_date"
                                    value={start_date}
                                    onChange={handleStartDateChange}
                                    placeholder='From date'
                                    onFocus={(e) => e.target.type = 'date'}
                                    onBlur={(e) => {
                                        if (!start_date) e.target.type = 'text';
                                    }}
                                />
                                <input
                                    className='border-[1px] p-2 border-none outline-none cursor-pointer my-3 lg:my-0'
                                    type={end_date ? "date" : "text"}
                                    name="end_date"
                                    id="end_date"
                                    value={end_date}
                                    onChange={handleEndDateChange}
                                    placeholder='To date'
                                    onFocus={(e) => e.target.type = 'date'}
                                    onBlur={(e) => {
                                        if (!end_date) e.target.type = 'text';
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='hidden md:block items-center gap-6'>
                        <Tabs onActiveTabChange={handleTabChange}>
                            <Tabs.Item title='Live'>
                                {filteredRaffles.map((item: any, i: number) => (

                                    <div className='hidden lg:flex items-center justify-between bg-white p-2 rounded-md mt-4'>
                                        {
                                            item?.images[0] ?
                                                <img
                                                    src={item ? CONSTANT_DATA.IMAGE_BASE_URL + item?.images[0] : noimage}
                                                    alt={item.brand}
                                                    className='w-full h-[300px] rounded-t-xl object-cover'
                                                    style={{ borderRadius: "50%", height: "50px", width: "50px" }}
                                                    onError={(e) => {
                                                        const target = e.target as HTMLImageElement;
                                                        target.onerror = null;
                                                        target.src = noimage;
                                                    }}
                                                /> :
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

                                        <div className='w-[80%]'>
                                            <table className='w-full'>
                                                <thead className='border-b-[2px]'>
                                                    <tr className='grid grid-cols-4 gap-4'>
                                                        {/* <th className='font-[400] text-[15px]'>Merchant</th> */}
                                                        <th className='font-[400] text-[15px]'>Raffle Name</th>
                                                        <th className='font-[400] text-[15px]'>Sales</th>
                                                        <th className='font-[400] text-[15px]'>Status</th>
                                                        <th className='font-[400] text-[15px]'>Entries</th>
                                                    </tr>
                                                </thead>
                                                <tbody >

                                                    <tr key={i} className=' grid grid-cols-4 gap-4'>
                                                        {/* <td className='text-center'>{item?.merchant}</td> */}
                                                        <td className='text-center'>{item?.raffle_name}</td>
                                                        <td className='text-center'>{item?.totalPurchasedTicket}</td>
                                                        <td className='text-center'>Live</td>
                                                        <td className='text-center'>{item?.ticket_set_prize || item?.time_set_prize}</td>
                                                    </tr>

                                                </tbody>
                                            </table>
                                        </div>

                                        <Dropdown inline label="" dismissOnClick={true} renderTrigger={() =>
                                            <div className='flex items-center gap-6'>
                                                <div className='flex items-center gap-3'>
                                                    <svg className='p-2 bg-white view-icon' width="39" height="33" viewBox="0 0 19 13" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ cursor: "pointer", boxShadow: "2px 2px 5px #ccc", borderRadius: "5px" }}
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
                                            <Dropdown.Item onClick={() => navigate(`/raffle/details/${item?.uniqueID}`, {
                                                state: {
                                                    isOwner: false
                                                }
                                            })}>View Raffle</Dropdown.Item>
                                            <Dropdown.Item onClick={() => navigate(`/admin/edit/${item._id}`, {
                                                state: {
                                                    item: item
                                                }
                                            })}>Edit Raffle</Dropdown.Item>
                                        </Dropdown>
                                    </div>

                                )
                                )}
                            </Tabs.Item>
                            <Tabs.Item title='Declined'>
                                {filteredRaffles.map((item: any, i: number) => (
                                    <div className='hidden lg:flex items-center justify-between bg-white p-2 rounded-md mt-4'>
                                        {
                                            item?.images[0] ?
                                                <img
                                                    src={item ? CONSTANT_DATA.IMAGE_BASE_URL + item?.images[0] : noimage}
                                                    alt={item.brand}
                                                    className='w-full h-[300px] rounded-t-xl object-cover'
                                                    style={{ borderRadius: "50%", height: "50px", width: "50px" }}
                                                    onError={(e) => {
                                                        const target = e.target as HTMLImageElement;
                                                        target.onerror = null;
                                                        target.src = noimage;
                                                    }}
                                                /> :
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

                                        <div className='w-[80%]'>
                                            <table className='w-full'>
                                                <thead className='border-b-[2px]'>
                                                    <tr className='grid grid-cols-4 gap-4'>
                                                        {/* <th className='font-[400] text-[15px]'>Merchant</th> */}
                                                        <th className='font-[400] text-[15px]'>Raffle Name</th>
                                                        <th className='font-[400] text-[15px]'>Sales</th>
                                                        <th className='font-[400] text-[15px]'>Status</th>
                                                        <th className='font-[400] text-[15px]'>Entries</th>
                                                    </tr>
                                                </thead>
                                                <tbody >

                                                    <tr key={i} className=' grid grid-cols-4 gap-4'>
                                                        {/* <td className='text-center'>{item.merchant}</td> */}
                                                        <td className='text-center'>{item.raffle_name}</td>
                                                        <td className='text-center'>{item?.totalPurchasedTicket}</td>
                                                        <td className='text-center'>Declined</td>
                                                        <td className='text-center'>{item?.ticket_set_prize || item?.time_set_prize}</td>
                                                    </tr>

                                                </tbody>
                                            </table>
                                        </div>
                                        <Dropdown inline label="" dismissOnClick={true} renderTrigger={() =>
                                            <div className='flex items-center gap-6'>
                                                <div className='flex items-center gap-3'>
                                                    <svg className='p-2 bg-white view-icon' width="39" height="33" viewBox="0 0 19 13" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ cursor: "pointer", boxShadow: "2px 2px 5px #ccc", borderRadius: "5px" }}
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
                                            <Dropdown.Item onClick={() => navigate(`/raffle/details/${item?.uniqueID}`, {
                                                state: {
                                                    isOwner: false
                                                }
                                            })}>View Raffle</Dropdown.Item>
                                            <Dropdown.Item onClick={() => navigate(`/admin/edit/${item._id}`, {
                                                state: {
                                                    item: item
                                                }
                                            })}>Edit Raffle</Dropdown.Item>
                                        </Dropdown>
                                    </div>
                                )
                                )}
                            </Tabs.Item>
                            <Tabs.Item title='Pending'>
                                {filteredRaffles?.map((item: any, i: number) => (
                                    <div className='hidden lg:flex items-center justify-between bg-white p-2 rounded-md mt-4'>
                                        {
                                            item?.images[0] ?
                                                <img
                                                    src={item ? CONSTANT_DATA.IMAGE_BASE_URL + item?.images[0] : noimage}
                                                    alt={item.brand}
                                                    className='w-full h-[300px] rounded-t-xl object-cover'
                                                    style={{ borderRadius: "50%", height: "50px", width: "50px" }}
                                                    onError={(e) => {
                                                        const target = e.target as HTMLImageElement;
                                                        target.onerror = null;
                                                        target.src = noimage;
                                                    }}
                                                /> :
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

                                        <div className='w-[80%]'>
                                            <table className='w-full'>
                                                <thead className='border-b-[2px]'>
                                                    <tr className='grid grid-cols-4 gap-4'>
                                                        {/* <th className='font-[400] text-[15px]'>Merchant</th> */}
                                                        <th className='font-[400] text-[15px]'>Raffle Name</th>
                                                        <th className='font-[400] text-[15px]'>Sales</th>
                                                        <th className='font-[400] text-[15px]'>Status</th>
                                                        <th className='font-[400] text-[15px]'>Entries</th>
                                                    </tr>
                                                </thead>
                                                <tbody >

                                                    <tr key={i} className=' grid grid-cols-4 gap-4'>
                                                        {/* <td className='text-center'>{item.merchant}</td> */}
                                                        <td className='text-center'>{item.raffle_name}</td>
                                                        <td className='text-center'>{item?.totalPurchasedTicket}</td>
                                                        <td className='text-center'>Pending</td>
                                                        <td className='text-center'>{item?.ticket_set_prize || item?.time_set_prize}</td>
                                                    </tr>

                                                </tbody>
                                            </table>
                                        </div>
                                        <Dropdown inline label="" dismissOnClick={true} renderTrigger={() =>
                                            <div className='flex items-center gap-6'>
                                                <div className='flex items-center gap-3'>
                                                    <svg className='p-2 bg-white view-icon' width="39" height="33" viewBox="0 0 19 13" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ cursor: "pointer", boxShadow: "2px 2px 5px #ccc", borderRadius: "5px" }}

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
                                            <Dropdown.Item onClick={() => navigate(`/raffle/details/${item?.uniqueID}`, {
                                                state: {
                                                    isOwner: false
                                                }
                                            })}>View Raffle</Dropdown.Item>
                                            <Dropdown.Item onClick={() => navigate(`/admin/edit/${item._id}`, {
                                                state: {
                                                    item: item
                                                }
                                            })}>Edit Raffle</Dropdown.Item>
                                            <Dropdown.Item onClick={() => approveRaffle(item?._id)}>Approve</Dropdown.Item>
                                            <Dropdown.Item onClick={() => declineRaffle(item?._id)}>Decline</Dropdown.Item>

                                        </Dropdown>

                                    </div>
                                ))}
                            </Tabs.Item>
                            <Tabs.Item title='Expired'>
                                {filteredRaffles.map((item: any, i: number) => (
                                    <div className='hidden lg:flex items-center justify-between bg-white p-2 rounded-md mt-4' onClick={() => handleRaffleSelect(item)} >
                                        {
                                            item?.images[0] ?
                                                <img
                                                    src={item ? CONSTANT_DATA.IMAGE_BASE_URL + item?.images[0] : noimage}
                                                    alt={item.brand}
                                                    className='w-full h-[300px] rounded-t-xl object-cover'
                                                    style={{ borderRadius: "50%", height: "50px", width: "50px" }}
                                                    onError={(e) => {
                                                        const target = e.target as HTMLImageElement;
                                                        target.onerror = null;
                                                        target.src = noimage;
                                                    }}
                                                /> :
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

                                        <div className='w-[80%]'>
                                            <table className='w-full'>
                                                <thead className='border-b-[2px]'>
                                                    <tr className='grid grid-cols-4 gap-4'>
                                                        {/* <th className='font-[400] text-[15px]'>Merchant</th> */}
                                                        <th className='font-[400] text-[15px]'>Raffle Name</th>
                                                        <th className='font-[400] text-[15px]'>Sales</th>
                                                        <th className='font-[400] text-[15px]'>Status</th>
                                                        <th className='font-[400] text-[15px]'>Entries</th>
                                                    </tr>
                                                </thead>
                                                <tbody >

                                                    <tr key={i} className=' grid grid-cols-4 gap-4'>
                                                        {/* <td className='text-center'>{item.merchant}</td> */}
                                                        <td className='text-center'>{item.raffle_name}</td>
                                                        <td className='text-center'>{item?.totalPurchasedTicket}</td>
                                                        <td className='text-center'>Expired</td>
                                                        <td className='text-center'>{item?.ticket_set_prize || item?.time_set_prize}</td>
                                                    </tr>

                                                </tbody>
                                            </table>
                                        </div>
                                        <Dropdown inline label="" dismissOnClick={true} renderTrigger={() =>
                                            <div className='flex items-center gap-6'>
                                                <div className='flex items-center gap-3'>
                                                    <svg className='p-2 bg-white view-icon' width="39" height="33" viewBox="0 0 19 13" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ cursor: "pointer", boxShadow: "2px 2px 5px #ccc", borderRadius: "5px" }}
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
                                            <Dropdown.Item onClick={() => navigate(`/raffle/details/${item?.uniqueID}`, {
                                                state: {
                                                    isOwner: false
                                                }
                                            })}>View Raffle</Dropdown.Item>
                                            <Dropdown.Item onClick={() => navigate(`/admin/edit/${item._id}`, {
                                                state: {
                                                    item: item
                                                }
                                            })}>Edit Raffle</Dropdown.Item>
                                            <Dropdown.Item onClick={downloadCSV}>
                                                Download CSV
                                            </Dropdown.Item>

                                        </Dropdown>

                                    </div>

                                ))}
                            </Tabs.Item>
                            <Tabs.Item title='Draft'>
                                {filteredRaffles?.map((item: any, i: number) => (
                                    <div className='hidden lg:flex items-center justify-between bg-white p-2 rounded-md mt-4'>
                                        {
                                            item?.images[0] ?
                                                <img
                                                    src={item ? CONSTANT_DATA.IMAGE_BASE_URL + item?.images[0] : noimage}
                                                    alt={item.brand}
                                                    className='w-full h-[300px] rounded-t-xl object-cover'
                                                    style={{ borderRadius: "50%", height: "50px", width: "50px" }}
                                                    onError={(e) => {
                                                        const target = e.target as HTMLImageElement;
                                                        target.onerror = null;
                                                        target.src = noimage;
                                                    }}
                                                /> :
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

                                        <div className='w-[80%]'>
                                            <table className='w-full'>
                                                <thead className='border-b-[2px]'>
                                                    <tr className='grid grid-cols-4 gap-4'>
                                                        {/* <th className='font-[400] text-[15px]'>Merchant</th> */}
                                                        <th className='font-[400] text-[15px]'>Raffle Name</th>
                                                        <th className='font-[400] text-[15px]'>Sales</th>
                                                        <th className='font-[400] text-[15px]'>Status</th>
                                                        <th className='font-[400] text-[15px]'>Entries</th>
                                                    </tr>
                                                </thead>
                                                <tbody >

                                                    <tr key={i} className=' grid grid-cols-4 gap-4'>
                                                        {/* <td className='text-center'>{item.merchant}</td> */}
                                                        <td className='text-center'>{item.raffle_name}</td>
                                                        <td className='text-center'>{item?.totalPurchasedTicket}</td>
                                                        <td className='text-center'>Draft</td>
                                                        <td className='text-center'>{item?.ticket_set_prize || item?.time_set_prize}</td>
                                                    </tr>

                                                </tbody>
                                            </table>
                                        </div>
                                        <Dropdown inline label="" dismissOnClick={true} renderTrigger={() =>
                                            <div className='flex items-center gap-6'>
                                                <div className='flex items-center gap-3'>
                                                    <svg className='p-2 bg-white view-icon' width="39" height="33" viewBox="0 0 19 13" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ cursor: "pointer", boxShadow: "2px 2px 5px #ccc", borderRadius: "5px" }}

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
                                            <Dropdown.Item onClick={() => navigate(`/raffle/details/${item?.uniqueID}`, {
                                                state: {
                                                    isOwner: false
                                                }
                                            })}>View Raffle</Dropdown.Item>
                                            <Dropdown.Item onClick={() => navigate(`/admin/edit/${item._id}`, {
                                                state: {
                                                    item: item
                                                }
                                            })}>Edit Raffle</Dropdown.Item>

                                            <Dropdown.Item onClick={() => declineRaffle(item?._id)}>Decline</Dropdown.Item>

                                        </Dropdown>

                                    </div>
                                ))}
                            </Tabs.Item>
                        </Tabs>
                    </div>
                    {/* Mobile */}
                    <div className='block lg:hidden items-center justify-between'>
                        <div className='gap-12'>
                            <div className='flex items-center justify-between'>
                                <h4 className='mr-1'>Raffles</h4>
                                <div className='flex items-center gap-6 ml-12'>
                                    <div className='flex items-center gap-2'>
                                        <div className='p-3 bg-white rounded-[100px] w-fit'>
                                            <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M2 16H18V9H20V17C20 17.5523 19.5523 18 19 18H1C0.44772 18 0 17.5523 0 17V9H2V16ZM12 6H17L10 13L3 6H8V0H12V6Z" fill="black" />
                                            </svg>
                                        </div>
                                        <div className='hidden p-3 lg:flex items-center gap-5 bg-white border-[1px] rounded-[10px] w-fit'>
                                            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M16.031 14.6168L20.3137 18.8995L18.8995 20.3137L14.6168 16.031C13.0769 17.263 11.124 18 9 18C4.032 18 0 13.968 0 9C0 4.032 4.032 0 9 0C13.968 0 18 4.032 18 9C18 11.124 17.263 13.0769 16.031 14.6168ZM14.0247 13.8748C15.2475 12.6146 16 10.8956 16 9C16 5.1325 12.8675 2 9 2C5.1325 2 2 5.1325 2 9C2 12.8675 5.1325 16 9 16C10.8956 16 12.6146 15.2475 13.8748 14.0247L14.0247 13.8748Z" fill="black" />
                                            </svg>
                                            <input type="text" className='border-none outline-none' placeholder='Search' name="" id="" />
                                        </div>
                                        <div className='block lg:hidden p-2 w-40 flex items-center gap-5 bg-white border-[1px] rounded-[10px] w-fit'>
                                            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M16.031 14.6168L20.3137 18.8995L18.8995 20.3137L14.6168 16.031C13.0769 17.263 11.124 18 9 18C4.032 18 0 13.968 0 9C0 4.032 4.032 0 9 0C13.968 0 18 4.032 18 9C18 11.124 17.263 13.0769 16.031 14.6168ZM14.0247 13.8748C15.2475 12.6146 16 10.8956 16 9C16 5.1325 12.8675 2 9 2C5.1325 2 2 5.1325 2 9C2 12.8675 5.1325 16 9 16C10.8956 16 12.6146 15.2475 13.8748 14.0247L14.0247 13.8748Z" fill="black" />
                                            </svg>
                                            <input type="text" className='w-[100%] border-none outline-none' placeholder='Search' name="" id="" />
                                        </div>

                                    </div>
                                </div>

                            </div>
                            <div>
                                <div className='block items-center justify-center gap-2 mt-6'>
                                    <input
                                        className='border-[1px] p-2 border-none outline-none cursor-pointer w-[100%]'
                                        type={start_date ? "date" : "text"}
                                        name="start_date"
                                        id="start_date"
                                        value={start_date}
                                        onChange={handleStartDateChange}
                                        placeholder='From date'
                                        onFocus={(e) => e.target.type = 'date'}
                                        onBlur={(e) => {
                                            if (!start_date) e.target.type = 'text';
                                        }}
                                    />
                                    <input
                                        className='border-[1px] p-2 border-none outline-none cursor-pointer my-3 lg:my-0 w-[100%]'
                                        type={end_date ? "date" : "text"}
                                        name="end_date"
                                        id="end_date"
                                        value={end_date}
                                        onChange={handleEndDateChange}
                                        placeholder='To date'
                                        onFocus={(e) => e.target.type = 'date'}
                                        onBlur={(e) => {
                                            if (!end_date) e.target.type = 'text';
                                        }}
                                    />
                                </div>
                                <Tabs onActiveTabChange={handleTabChange}>
                                    <Tabs.Item title='Live' >
                                        {filteredRaffles?.map((item: any, i: number) => (

                                            <div className='block lg:hidden flex lg:items-center justify-between bg-white p-2 rounded-md mt-4'>
                                                {
                                                    item?.images[0] ?
                                                        <img
                                                            src={item ? CONSTANT_DATA.IMAGE_BASE_URL + item?.images[0] : noimage}
                                                            alt={item.brand}
                                                            className='w-full h-[300px] rounded-t-xl object-cover'
                                                            style={{ borderRadius: "50%", height: "50px", width: "50px" }}
                                                            onError={(e) => {
                                                                const target = e.target as HTMLImageElement;
                                                                target.onerror = null;
                                                                target.src = noimage;
                                                            }}
                                                        /> :
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
                                                    <table className='w-full mb-2'>
                                                        <thead className='border-b-[2px]'>
                                                            <tr className='grid grid-cols-2 gap-4'>
                                                                <th className='font-[400] text-[15px]'>Raffle Name</th>
                                                                <th className='font-[400] text-[15px]'>Sales</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr key={`${i}-1`} className='grid grid-cols-2 gap-4'>
                                                                <td className='text-center text-sm font-[600]'>{item.raffle_name}</td>
                                                                <td className='text-center text-sm font-[600]'>{item?.totalPurchasedTicket}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>

                                                    <table className='w-full mb-2'>
                                                        <thead className='border-b-[2px]'>
                                                            <tr className='grid grid-cols-2 gap-4'>
                                                                <th className='font-[400] text-[15px]'>Status</th>
                                                                <th className='font-[400] text-[15px]'>Entries</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr key={`${i}-2`} className='grid grid-cols-2 gap-4'>
                                                                <td className='text-center text-sm font-[600]'>Live</td>
                                                                <td className='text-center text-sm font-[600]'>{item?.ticket_set_prize || item?.time_set_prize}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>

                                                    {/* <table className='w-full'>
                                                            <thead className='border-b-[2px]'>
                                                                <tr className='grid grid-cols-2 gap-4'>
                                                                    <th className='font-[400] text-[15px]'>Entries</th>
                                                                    <th className='font-[400] text-[15px]'>Date</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr key={`${i}-3`} className='grid grid-cols-2 gap-4'>
                                                                    <td className='text-center text-sm font-[600]'>{item?.raffle_date} </td>
                                                                    <td className='text-center text-sm font-[600]'>
                                                                        {item?.time_set_prize ?
                                                                            new Date(item.time_set_prize).toLocaleDateString('en-GB', {
                                                                                day: '2-digit',
                                                                                month: '2-digit',
                                                                                year: 'numeric'
                                                                            }).split('/').join('-')
                                                                            : ''}
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table> */}
                                                </div>

                                                <Dropdown inline label="" dismissOnClick={true} renderTrigger={() =>
                                                    <div className='flex items-center gap-6'>
                                                        <div className='flex items-center gap-3'>
                                                            <svg className='p-2 bg-white view-icon' width="39" height="33" viewBox="0 0 19 13" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ cursor: "pointer", boxShadow: "2px 2px 5px #ccc", borderRadius: "5px" }}
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
                                                    <Dropdown.Item onClick={() => navigate(`/raffle/details/${item?.uniqueID}`, {
                                                        state: {
                                                            isOwner: false
                                                        }
                                                    })}>View Raffle</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => navigate(`/admin/edit/${item._id}`, {
                                                        state: {
                                                            item: item
                                                        }
                                                    })}>Edit Raffle</Dropdown.Item>
                                                </Dropdown>
                                            </div>

                                        ))}
                                    </Tabs.Item>
                                    <Tabs.Item title='Declined' >
                                        {filteredRaffles?.map((item: any, i: number) => (

                                            <div className='block lg:hidden  flex lg:items-center justify-between bg-white p-2 rounded-md mt-4'>
                                                {
                                                    item?.images[0] ?
                                                        <img
                                                            src={item ? CONSTANT_DATA.IMAGE_BASE_URL + item?.images[0] : noimage}
                                                            alt={item.brand}
                                                            className='w-full h-[300px] rounded-t-xl object-cover'
                                                            style={{ borderRadius: "50%", height: "50px", width: "50px" }}
                                                            onError={(e) => {
                                                                const target = e.target as HTMLImageElement;
                                                                target.onerror = null;
                                                                target.src = noimage;
                                                            }}
                                                        /> :
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
                                                    <table className='w-full mb-2'>
                                                        <thead className='border-b-[2px]'>
                                                            <tr className='grid grid-cols-2 gap-4'>
                                                                <th className='font-[400] text-[15px]'>Raffle Name</th>
                                                                <th className='font-[400] text-[15px]'>Sales</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr key={`${i}-1`} className='grid grid-cols-2 gap-4'>
                                                                <td className='text-center text-sm font-[600]'>{item.raffle_name}</td>
                                                                <td className='text-center text-sm font-[600]'>{item?.totalPurchasedTicket}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>

                                                    <table className='w-full mb-2'>
                                                        <thead className='border-b-[2px]'>
                                                            <tr className='grid grid-cols-2 gap-4'>
                                                                <th className='font-[400] text-[15px]'>Status</th>
                                                                <th className='font-[400] text-[15px]'>Entries</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr key={`${i}-2`} className='grid grid-cols-2 gap-4'>
                                                                <td className='text-center text-sm font-[600]'>Declined</td>
                                                                <td className='text-center text-sm font-[600]'>{item?.ticket_set_prize || item?.time_set_prize}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>


                                                </div>
                                                <Dropdown inline label="" dismissOnClick={true} renderTrigger={() =>
                                                    <div className='flex items-center gap-6'>
                                                        <div className='flex items-center gap-3'>
                                                            <svg className='p-2 bg-white view-icon' width="39" height="33" viewBox="0 0 19 13" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ cursor: "pointer", boxShadow: "2px 2px 5px #ccc", borderRadius: "5px" }}
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
                                                    <Dropdown.Item onClick={() => navigate(`/raffle/details/${item?.uniqueID}`, {
                                                        state: {
                                                            isOwner: false
                                                        }
                                                    })}>View Raffle</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => navigate(`/admin/edit/${item._id}`, {
                                                        state: {
                                                            item: item
                                                        }
                                                    })}>Edit Raffle</Dropdown.Item>
                                                </Dropdown>
                                            </div>

                                        ))}
                                    </Tabs.Item>
                                    <Tabs.Item title='Pending' >
                                        {filteredRaffles?.map((item: any, i: number) => (

                                            <div className='block lg:hidden  flex lg:items-center justify-between bg-white p-2 rounded-md mt-4'>
                                                {
                                                    item?.images[0] ?
                                                        <img
                                                            src={item ? CONSTANT_DATA.IMAGE_BASE_URL + item?.images[0] : noimage}
                                                            alt={item.brand}
                                                            className='w-full h-[300px] rounded-t-xl object-cover'
                                                            style={{ borderRadius: "50%", height: "50px", width: "50px" }}
                                                            onError={(e) => {
                                                                const target = e.target as HTMLImageElement;
                                                                target.onerror = null;
                                                                target.src = noimage;
                                                            }}
                                                        /> :
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
                                                    <table className='w-full mb-2'>
                                                        <thead className='border-b-[2px]'>
                                                            <tr className='grid grid-cols-2 gap-4'>
                                                                <th className='font-[400] text-[15px]'>Raffle Name</th>
                                                                <th className='font-[400] text-[15px]'>Sales</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr key={`${i}-1`} className='grid grid-cols-2 gap-4'>
                                                                <td className='text-center text-sm font-[600]'>{item.raffle_name}</td>
                                                                <td className='text-center text-sm font-[600]'>{item?.totalPurchasedTicket}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>

                                                    <table className='w-full mb-2'>
                                                        <thead className='border-b-[2px]'>
                                                            <tr className='grid grid-cols-2 gap-4'>
                                                                <th className='font-[400] text-[15px]'>Status</th>
                                                                <th className='font-[400] text-[15px]'>Raffle Name</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr key={`${i}-2`} className='grid grid-cols-2 gap-4'>
                                                                <td className='text-center text-sm font-[600]'>Pending</td>
                                                                <td className='text-center text-sm font-[600]'>{item?.ticket_set_prize || item?.time_set_prize}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>


                                                </div>
                                                <Dropdown inline label="" dismissOnClick={true} renderTrigger={() =>
                                                    <div className='flex items-center gap-6'>
                                                        <div className='flex items-center gap-3'>
                                                            <svg className='p-2 bg-white view-icon' width="39" height="33" viewBox="0 0 19 13" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ cursor: "pointer", boxShadow: "2px 2px 5px #ccc", borderRadius: "5px" }}

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
                                                    <Dropdown.Item onClick={() => navigate(`/raffle/details/${item?.uniqueID}`, {
                                                        state: {
                                                            isOwner: false
                                                        }
                                                    })}>View Raffle</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => navigate(`/admin/edit/${item._id}`, {
                                                        state: {
                                                            item: item
                                                        }
                                                    })}>Edit Raffle</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => approveRaffle(item?._id)}>Approve</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => declineRaffle(item?._id)}>Decline</Dropdown.Item>

                                                </Dropdown>
                                            </div>

                                        ))}
                                    </Tabs.Item>
                                    <Tabs.Item title='Expired' >
                                        {filteredRaffles?.map((item: any, i: number) => (

                                            <div className='block lg:hidden  flex lg:items-center justify-between bg-white p-2 rounded-md mt-4'>
                                                {
                                                    item?.images[0] ?
                                                        <img
                                                            src={item ? CONSTANT_DATA.IMAGE_BASE_URL + item?.images[0] : noimage}
                                                            alt={item.brand}
                                                            className='w-full h-[300px] rounded-t-xl object-cover'
                                                            style={{ borderRadius: "50%", height: "50px", width: "50px" }}
                                                            onError={(e) => {
                                                                const target = e.target as HTMLImageElement;
                                                                target.onerror = null;
                                                                target.src = noimage;
                                                            }}
                                                        /> :
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
                                                    <table className='w-full mb-2'>
                                                        <thead className='border-b-[2px]'>
                                                            <tr className='grid grid-cols-2 gap-4'>
                                                                <th className='font-[400] text-[15px]'>Raffle Name</th>
                                                                <th className='font-[400] text-[15px]'>Sales</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr key={`${i}-1`} className='grid grid-cols-2 gap-4'>
                                                                <td className='text-center text-sm font-[600]'>{item.raffle_name}</td>
                                                                <td className='text-center text-sm font-[600]'>{item?.totalPurchasedTicket}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>

                                                    <table className='w-full mb-2'>
                                                        <thead className='border-b-[2px]'>
                                                            <tr className='grid grid-cols-2 gap-4'>
                                                                <th className='font-[400] text-[15px]'>Status</th>
                                                                <th className='font-[400] text-[15px]'>Entries</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr key={`${i}-2`} className='grid grid-cols-2 gap-4'>
                                                                <td className='text-center text-sm font-[600]'>Expired</td>
                                                                <td className='text-center text-sm font-[600]'>{item?.ticket_set_prize || item?.time_set_prize}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>


                                                </div>
                                                <Dropdown inline label="" dismissOnClick={true} renderTrigger={() =>
                                                    <div className='flex items-center gap-6'>
                                                        <div className='flex items-center gap-3'>
                                                            <svg className='p-2 bg-white view-icon' width="39" height="33" viewBox="0 0 19 13" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ cursor: "pointer", boxShadow: "2px 2px 5px #ccc", borderRadius: "5px" }}
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
                                                    <Dropdown.Item onClick={() => navigate(`/raffle/details/${item?.uniqueID}`, {
                                                        state: {
                                                            isOwner: false
                                                        }
                                                    })}>View Raffle</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => navigate(`/admin/edit/${item._id}`, {
                                                        state: {
                                                            item: item
                                                        }
                                                    })}>Edit Raffle</Dropdown.Item>
                                                    <Dropdown.Item onClick={downloadCSV}>
                                                        Download CSV
                                                    </Dropdown.Item>
                                                </Dropdown>
                                            </div>

                                        ))}
                                    </Tabs.Item>
                                    <Tabs.Item title='Draft' >
                                        {filteredRaffles?.map((item: any, i: number) => (

                                            <div className='block lg:hidden  flex lg:items-center justify-between bg-white p-2 rounded-md mt-4'>
                                                {
                                                    item?.images[0] ?
                                                        <img
                                                            src={item ? CONSTANT_DATA.IMAGE_BASE_URL + item?.images[0] : noimage}
                                                            alt={item.brand}
                                                            className='w-full h-[300px] rounded-t-xl object-cover'
                                                            style={{ borderRadius: "50%", height: "50px", width: "50px" }}
                                                            onError={(e) => {
                                                                const target = e.target as HTMLImageElement;
                                                                target.onerror = null;
                                                                target.src = noimage;
                                                            }}
                                                        /> :
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
                                                    <table className='w-full mb-2'>
                                                        <thead className='border-b-[2px]'>
                                                            <tr className='grid grid-cols-2 gap-4'>
                                                                <th className='font-[400] text-[15px]'>Raffle Name</th>
                                                                <th className='font-[400] text-[15px]'>Sales</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr key={`${i}-1`} className='grid grid-cols-2 gap-4'>
                                                                <td className='text-center text-sm font-[600]'>{item.raffle_name}</td>
                                                                <td className='text-center text-sm font-[600]'>{item?.totalPurchasedTicket}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>

                                                    <table className='w-full mb-2'>
                                                        <thead className='border-b-[2px]'>
                                                            <tr className='grid grid-cols-2 gap-4'>
                                                                <th className='font-[400] text-[15px]'>Status</th>
                                                                <th className='font-[400] text-[15px]'>Raffle Name</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr key={`${i}-2`} className='grid grid-cols-2 gap-4'>
                                                                <td className='text-center text-sm font-[600]'>Draft</td>
                                                                <td className='text-center text-sm font-[600]'>{item?.ticket_set_prize || item?.time_set_prize}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>


                                                </div>
                                                <Dropdown inline label="" dismissOnClick={true} renderTrigger={() =>
                                                    <div className='flex items-center gap-6'>
                                                        <div className='flex items-center gap-3'>
                                                            <svg className='p-2 bg-white view-icon' width="39" height="33" viewBox="0 0 19 13" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ cursor: "pointer", boxShadow: "2px 2px 5px #ccc", borderRadius: "5px" }}

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
                                                    <Dropdown.Item onClick={() => navigate(`/raffle/details/${item?.uniqueID}`, {
                                                        state: {
                                                            isOwner: false
                                                        }
                                                    })}>View Raffle</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => navigate(`/admin/edit/${item._id}`, {
                                                        state: {
                                                            item: item
                                                        }
                                                    })}>Edit Raffle</Dropdown.Item>

                                                    <Dropdown.Item onClick={() => declineRaffle(item?._id)}>Decline</Dropdown.Item>

                                                </Dropdown>
                                            </div>

                                        ))}
                                    </Tabs.Item>
                                </Tabs>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
<th className='font-[400] text-[15px]'>Merchant</th>

export default AdminRaffles;

