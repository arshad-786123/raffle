import React, { useEffect, useState } from 'react'
import AdminSidebar from '../../Components/Navbar/AdminSidebar'
import { getDBData, updateSuspendUser, updateUnSuspendUser } from '../../Services/Admin/getDashboardData'
import { Link, useNavigate } from 'react-router-dom'
import { Dropdown, Tabs, } from 'flowbite-react'
import * as XLSX from 'xlsx';
import axios from 'axios'
import { CONSTANT_DATA } from '../../constants';
import noimage from '../../assets/no-image.png';
import { deleteUser } from '../../Services/Authentication/updateUser'
import ConfirmationModal from './ConfirmationModal'
import { successToast } from '../../Utils/Toast/success.toast'
import { Toaster } from 'react-hot-toast'
import { useSearchParams } from "react-router-dom";


const AdminMerchants = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const page = parseInt(searchParams.get("page") || "1", 10);
    const [merchantsData, setMerchantsData] = useState<any>([])
    const [merchantsDataSuspend, setMerchantsDataSuspend] = useState<any>([])
    const [currentPage, setCurrentPage] = useState(page);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState<string | null>(null);
    const [selectedTab, setSelectedTab] = useState<number>(0);

    const [currentPageActive, setCurrentPageActive] = useState(page);
    const [totalPagesActive, setTotalPagesActive] = useState(1);

    const [currentPageSuspended, setCurrentPageSuspended] = useState(page);
    const [totalPagesSuspended, setTotalPagesSuspended] = useState(1);

    const itemsPerPage = 10;
    const navigate = useNavigate()

    // useEffect(() => {
    //     getDashboardData(currentPage, searchQuery);
    //     getDashboardDatas(currentPage, searchQuery)
    // }, [currentPage, searchQuery]);

    // Read page from query params on load
    useEffect(() => {
        const pageFromParams = parseInt(searchParams.get("page") || "1", 10); // Use base 10 parsing
        setCurrentPage(pageFromParams);

        if (selectedTab === 0) {
            setCurrentPageActive(pageFromParams); // Sync active tab's page
        } else {
            setCurrentPageSuspended(pageFromParams); // Sync suspended tab's page
        }
    }, [searchParams, selectedTab]);

    // Fetch data when `currentPageActive`, `currentPageSuspended`, or `searchQuery` changes
    useEffect(() => {
        const timer = setTimeout(() => {
            if (selectedTab === 0) {
                getDashboardData(currentPageActive, searchQuery);
            } else {
                getDashboardDatas(currentPageSuspended, searchQuery);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [currentPageActive, currentPageSuspended, searchQuery, selectedTab]);
    const handleDeleteClick = (userId: string) => {
        setUserIdToDelete(userId);
        setIsConfirmationOpen(true);
    };

    const handleTabChange = (tabIndex: number) => {
        setSelectedTab(tabIndex);
        getDashboardData(currentPage, searchQuery);
        getDashboardDatas(currentPage, searchQuery)
    };

    const suspendUser = async (userId: string) => {

        try {
            await updateSuspendUser(userId);
            //window.location.reload();
            getDashboardData(currentPage, searchQuery);
            successToast("User suspended successfully");
        } catch (error) {
            console.error('Error suspending user:', error);
            // Handle error, show error toast, etc.
        }
    };
    const ConfirmDelete = async () => {
        if (userIdToDelete) {
            try {
                await deleteUser(userIdToDelete);
                await getDashboardData(currentPage, searchQuery);
                setIsConfirmationOpen(false);
                setUserIdToDelete(null);
            } catch (error) {
                console.error("Error deleting user:", error);
            }
        }
    };


    const getDashboardData = async (page: number, search: string, isDownload: boolean = false) => {
        try {
            const res = await getDBData('merchants', page, itemsPerPage, search, false, isDownload);
            setMerchantsData(res.result);
            setCurrentPageActive(page);
            setTotalPagesActive(res.totalPages);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const getDashboardDatas = async (page: number, search: string, isDownload: boolean = false) => {
        try {
            const res = await getDBData('merchants', page, itemsPerPage, search, true, isDownload);
            setMerchantsDataSuspend(res.result);
            setCurrentPageSuspended(page);
            setTotalPagesSuspended(res.totalPages);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const unsuspendUser = async (userId: string) => {
        try {
            await updateUnSuspendUser(userId);
            getDashboardDatas(currentPage, searchQuery);
            successToast("User unsuspended successfully");
        } catch (error) {
            console.error('Error suspending user:', error);
            // Handle error, show error toast, etc.
        }
    };


    // Function to handle page change
    const handlePageChange = (newPage: number) => {
        setSearchParams({ page: newPage.toString() }); // Update query params
        if (selectedTab === 0) {
            setCurrentPageActive(newPage);
        } else {
            setCurrentPageSuspended(newPage);
        }
    };


    const handlePrevPage = () => {
        if (selectedTab === 0 && currentPageActive > 1) {
            handlePageChange(currentPageActive - 1);
        } else if (selectedTab === 1 && currentPageSuspended > 1) {
            handlePageChange(currentPageSuspended - 1);
        }
    };

    const handleNextPage = () => {
        if (selectedTab === 0 && currentPageActive < totalPagesActive) {
            handlePageChange(currentPageActive + 1);
        } else if (selectedTab === 1 && currentPageSuspended < totalPagesSuspended) {
            handlePageChange(currentPageSuspended + 1);
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const handleDownload = async () => {
        try {
            const isSuspended = selectedTab === 1;
            const res = await getDBData('merchants', 1, totalPages * itemsPerPage, searchQuery, isSuspended, true); // Fetch all data in one call
            const dataToDownload = res.result.map((item: any) => ({
                Name: `${item.businessName}`,
                Email: item?.email,
                Raffles: item.raffleCount || 0,
                'Phone Number': `${item.dialCode?.dial_code} ${item.phone}`,
                'Company Name': item.companyName || "N/A"
            }));

            // Create a new workbook
            const workbook = XLSX.utils.book_new();
            // Convert data array to worksheet
            const worksheet = XLSX.utils.json_to_sheet(dataToDownload);
            // Add worksheet to workbook
            XLSX.utils.book_append_sheet(workbook, worksheet, 'MerchantsData');
            // Generate a download link
            const wbout = XLSX.write(workbook, { type: 'array', bookType: 'xlsx' });

            // Convert ArrayBuffer to Blob
            const blob = new Blob([wbout], { type: 'application/octet-stream' });

            // Trigger download using Blob and URL.createObjectURL
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'merchants_data.xlsx');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };
    return (
        <div className='flex footer-manage '>
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
                                Merchants
                            </li>
                        </ol>
                    </nav>
                </div>
                <div className='w-[100%] lg:w-[90%] m-auto bg-[#F9F0F0] mt-4 p-4 rounded-md'>
                    <div className='flex items-center justify-between '>
                        <h4>Merchants</h4>
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
                            <div className='p-3 bg-white rounded-[100px] w-fit' onClick={handleDownload} style={{ cursor: 'pointer' }}>
                                <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 16H18V9H20V17C20 17.5523 19.5523 18 19 18H1C0.44772 18 0 17.5523 0 17V9H2V16ZM12 6H17L10 13L3 6H8V0H12V6Z" fill="black" />
                                </svg>
                            </div>

                        </div>
                    </div>
                    <Tabs onActiveTabChange={handleTabChange}>
                        <Tabs.Item title='Live'>
                            <div>
                                {
                                    merchantsData?.map((item: any, i: number) => (
                                        <>
                                            <div className='hidden lg:block lg:flex items-center justify-between bg-white p-2 rounded-md mt-4'>
                                                {
                                                    item?.image ? <img src={item ? CONSTANT_DATA.BASE_URL + item?.image : noimage} alt={item?.businessName} style={{ height: "50px", width: "50px", borderRadius: "50%" }}
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
                                                <div className='w-[80%]'>
                                                    <table className='w-[100%]' >
                                                        <thead className='border-b-[2px] grid grid-cols-5 gap-4'>
                                                            {/* <th className='font-[400] text-[15px] '>Name</th> */}
                                                            <th className='font-[400] text-[15px]'>Email</th>
                                                            <th className='font-[400] text-[15px]'>Raffles</th>
                                                            <th className='font-[400] text-[15px]'>Phone number</th>
                                                            <th className='font-[400] text-[15px]'>Landline number</th>
                                                            <th className='font-[400] text-[15px]'>Company Name</th>
                                                        </thead>
                                                        <tbody>
                                                            <tr className='grid grid-cols-5 gap-4'>
                                                                {/* <td className='text-center'>{item?.firstname}{" "}{item?.lastName}</td> */}
                                                                <td className='text-center'>{item?.email}</td>
                                                                <td className='text-center'>{item?.raffleCount || 0}</td>
                                                                <td className='text-center'>{item?.dialCode?.dial_code}{" "}{item.phone}</td>
                                                                <td className='text-center'>{item?.landline || "N/A"}</td>
                                                                <td className='text-center'>{item?.companyName || "N/A"}</td>
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
                                                    <Dropdown.Item onClick={() => navigate(`/admin/merchants/detail/${item._id}`, {
                                                        state: {
                                                            item: item
                                                        }
                                                    })}>View details</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => navigate(`/admin/merchants/raffles/${item._id}`, {
                                                        state: {
                                                            item: item
                                                        }
                                                    })}>View raffles</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => navigate(`/admin/merchants/raffles/salse/${item._id}`, {
                                                        state: {
                                                            item: item
                                                        }
                                                    })}>View sales</Dropdown.Item>

                                                    <Dropdown.Item onClick={() => suspendUser(item._id)}>Archive Merchant</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => handleDeleteClick(item._id)}>
                                                        Delete merchant
                                                    </Dropdown.Item>
                                                </Dropdown>
                                                <ConfirmationModal
                                                    isOpen={isConfirmationOpen}
                                                    onClose={() => setIsConfirmationOpen(false)}
                                                    onConfirm={ConfirmDelete}
                                                />
                                            </div>
                                            <div className='block lg:hidden flex lg:items-center justify-between bg-white p-2 rounded-md mt-4'>
                                                {
                                                    item?.image ? <img src={CONSTANT_DATA.BASE_URL + item?.image} alt={item?.businessName} style={{ height: "50px", width: "50px", borderRadius: "50%" }} />
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
                                                            {/* <th className='font-[400] text-[10px]'>Name</th> */}
                                                            <th className='font-[400] text-[10px]'>Email</th>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                {/* <td className='text-center text-[10px]'>{item?.firstname}{" "}{item?.lastName}</td> */}
                                                                <td className='text-center text-[10px]'>{item?.email}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <br />
                                                    <table className='w-[100%]' >
                                                        <thead className='border-b-[2px]'>
                                                            <th className='font-[400] text-[10px]'>Raffles</th>
                                                            <th className='font-[400] text-[10px]'>Phone number</th>
                                                            <th className='font-[400] text-[10px]'>Landline number</th>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td className='text-center'>{item?.raffleCount || 0}</td>
                                                                <td className='text-center text-[10px]'>{item?.dialCode?.dial_code}{" "}{item.phone}</td>
                                                                <td className='text-center text-[10px]'>{item?.landline || "N/A"}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <br />
                                                    <table className='w-[100%]' >
                                                        <thead className='border-b-[2px]'>
                                                            <th className='font-[400] text-[10px]'>Company Name</th>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td className='text-center text-[10px]'>{item?.companyName || "N/A"}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <Dropdown inline label="" placement="left" dismissOnClick={true} renderTrigger={() =>
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
                                                    <Dropdown.Item onClick={() => navigate(`/admin/merchants/detail/${item._id}`, {
                                                        state: {
                                                            item: item
                                                        }
                                                    })}>View details</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => navigate(`/admin/merchants/raffles/${item._id}`, {
                                                        state: {
                                                            item: item
                                                        }
                                                    })}>View raffles</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => navigate(`/admin/merchants/raffles/salse/${item._id}`, {
                                                        state: {
                                                            item: item
                                                        }
                                                    })}>View sales</Dropdown.Item>

                                                    <Dropdown.Item onClick={() => suspendUser(item._id)}>Archive Merchant</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => handleDeleteClick(item._id)}>
                                                        Delete merchant
                                                    </Dropdown.Item>
                                                </Dropdown>
                                                <ConfirmationModal
                                                    isOpen={isConfirmationOpen}
                                                    onClose={() => setIsConfirmationOpen(false)}
                                                    onConfirm={ConfirmDelete}
                                                />
                                            </div>
                                        </>
                                    ))
                                }
                            </div>
                        </Tabs.Item>


                        <Tabs.Item title='Archive'>
                            <div>
                                {
                                    merchantsDataSuspend?.map((item: any, i: number) => (
                                        <>
                                            <div className='hidden lg:block lg:flex items-center justify-between bg-white p-2 rounded-md mt-4'>
                                                {
                                                    item?.image ? <img src={item ? CONSTANT_DATA.BASE_URL + item?.image : noimage} alt={item?.businessName} style={{ height: "50px", width: "50px", borderRadius: "50%" }}
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
                                                <div className='w-[80%]'>
                                                    <table className='w-[100%]' >
                                                        <thead className='border-b-[2px] grid grid-cols-4 gap-4'>
                                                            {/* <th className='font-[400] text-[15px] '>Name</th> */}
                                                            <th className='font-[400] text-[15px]'>Email</th>
                                                            <th className='font-[400] text-[15px]'>Raffles</th>
                                                            <th className='font-[400] text-[15px]'>Phone number</th>
                                                            <th className='font-[400] text-[15px]'>Landline number</th>
                                                            <th className='font-[400] text-[15px]'>Company Name</th>
                                                        </thead>
                                                        <tbody>
                                                            <tr className='grid grid-cols-4 gap-4'>
                                                                {/* <td className='text-center'>{item?.firstname}{" "}{item?.lastName}</td> */}
                                                                <td className='text-center'>{item?.email}</td>
                                                                <td className='text-center'>{item?.raffleCount || 0}</td>
                                                                <td className='text-center'>{item?.dialCode?.dial_code}{" "}{item.phone}</td>
                                                                <td className='text-center'>{item?.landline || 'N/A'}</td>
                                                                <td className='text-center'>{item?.companyName || "N/A"}</td>
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
                                                    <Dropdown.Item onClick={() => navigate(`/admin/merchants/detail/${item._id}`, {
                                                        state: {
                                                            item: item
                                                        }
                                                    })}>View details</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => navigate(`/admin/merchants/raffles/${item._id}`, {
                                                        state: {
                                                            item: item
                                                        }
                                                    })}>View raffles</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => navigate(`/admin/merchants/raffles/salse/${item._id}`, {
                                                        state: {
                                                            item: item
                                                        }
                                                    })}>View sales</Dropdown.Item>

                                                    <Dropdown.Item onClick={() => unsuspendUser(item._id)}>Restore Merchant</Dropdown.Item>
                                                </Dropdown>

                                            </div>
                                            <div className='block lg:hidden flex lg:items-center justify-between bg-white p-2 rounded-md mt-4'>
                                                {
                                                    item?.image ? <img src={CONSTANT_DATA.BASE_URL + item?.image} alt={item?.businessName} style={{ height: "50px", width: "50px", borderRadius: "50%" }} />
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
                                                            {/* <th className='font-[400] text-[10px]'>Name</th> */}
                                                            <th className='font-[400] text-[10px]'>Email</th>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                {/* <td className='text-center text-[10px]'>{item?.firstname}{" "}{item?.lastName}</td> */}
                                                                <td className='text-center text-[10px]'>{item?.email}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <br />
                                                    <table className='w-[100%]' >
                                                        <thead className='border-b-[2px]'>
                                                            <th className='font-[400] text-[10px]'>Raffles</th>
                                                            <th className='font-[400] text-[10px]'>Phone number</th>
                                                            <th className='font-[400] text-[10px]'>Landline number</th>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td className='text-center'>{item?.raffleCount || 0}</td>
                                                                <td className='text-center text-[10px]'>{item?.dialCode?.dial_code}{" "}{item.phone}</td>
                                                                <td className='text-center text-[10px]'>{item?.landline || "N/A"}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <br />
                                                    <table className='w-[100%]' >
                                                        <thead className='border-b-[2px]'>
                                                            <th className='font-[400] text-[10px]'>Company Name</th>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td className='text-center text-[10px]'>{item?.companyName || "N/A"}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <Dropdown inline label="" placement="left" dismissOnClick={true} renderTrigger={() =>
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
                                                    <Dropdown.Item onClick={() => navigate(`/admin/merchants/detail/${item._id}`, {
                                                        state: {
                                                            item: item
                                                        }
                                                    })}>View details</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => navigate(`/admin/merchants/raffles/${item._id}`, {
                                                        state: {
                                                            item: item
                                                        }
                                                    })}>View raffles</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => navigate(`/admin/merchants/raffles/salse/${item._id}`, {
                                                        state: {
                                                            item: item
                                                        }
                                                    })}>View sales</Dropdown.Item>

                                                    <Dropdown.Item onClick={() => unsuspendUser(item._id)}>Restore Merchant</Dropdown.Item>
                                                </Dropdown>

                                            </div>
                                        </>
                                    ))
                                }
                            </div>
                        </Tabs.Item>
                    </Tabs>

                    {/* <div className='text-xs lg:text-md text-right mt-4 flex  items-center justify-end gap-2 cursor-pointer'>
                        <span>
                            1-5 of 10
                        </span>
                        <svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.5415 9.79541L5.78052 5.5564L1.5415 1.31738" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>

                    </div> */}

                    {/* <div className='text-xs lg:text-md text-right mt-4 flex items-center justify-end gap-2 cursor-pointer'>
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
                    </div> */}

                    <div className='text-xs lg:text-md text-right mt-4 flex items-center justify-end gap-2 cursor-pointer'>
                        <button onClick={handlePrevPage}
                            disabled={selectedTab === 0 ? currentPageActive === 1 : currentPageSuspended === 1}>
                            <svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5415 9.79541L5.78052 5.5564L1.5415 1.31738" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <span>
                            {selectedTab === 0
                                ? `${currentPageActive} of ${totalPagesActive}`
                                : `${currentPageSuspended} of ${totalPagesSuspended}`}
                        </span>
                        <button onClick={handleNextPage}
                            disabled={selectedTab === 0 ? currentPageActive === totalPagesActive : currentPageSuspended === totalPagesSuspended}>
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

export default AdminMerchants