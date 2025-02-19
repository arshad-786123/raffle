import React, { useEffect, useState } from 'react'
import AdminSidebar from '../../Components/Navbar/AdminSidebar'
import { Link, useNavigate } from 'react-router-dom'
import { Dropdown } from 'flowbite-react'
import * as XLSX from 'xlsx';
import { useSearchParams } from "react-router-dom";
import { deleteContact, deleteContactsByIds, getContactListData } from '@/Services/Admin/getDashboardData';

const ContactUs: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    let page = parseInt(searchParams.get("page") || "1", 10);

    const [contactsData, setContactsData] = useState<any>([]); // Holds contact data
    const [currentPage, setCurrentPage] = useState(page);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 10;
    const [searchTerm, setSearchTerm] = useState<string>(""); // For customer name search
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [isDownload, setIsDownload] = useState(false);
    const [selectedContacts, setSelectedContacts] = useState<Set<string>>(new Set());
    const navigate = useNavigate();

    // Read page from query params on load
    useEffect(() => {
        const page = parseInt(searchParams.get("page") || "1", 10);
        setCurrentPage(page);
    }, [searchParams]);

    useEffect(() => {
        getContactListData(currentPage, itemsPerPage, searchTerm, isDownload, startDate, endDate)
            .then(res => {
                setContactsData(res.contacts);
                setCurrentPage(res.page);
                setTotalPages(res.totalPages);
            })
            .catch(err => console.error("Error fetching contacts:", err));
    }, [currentPage, searchTerm, startDate, endDate, isDownload]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to the first page when searching
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
        let allData: any[] = [];
        let currentPage = 1;
        const limit = 10;

        try {
            // Loop to fetch all pages
            while (true) {
                const res = await getContactListData(currentPage, limit, searchTerm, true, startDate, endDate);
                allData = [...allData, ...res.contacts];

                if (currentPage >= res.totalPages) {
                    break;
                }

                currentPage++;
            }

            const data = allData.map((contact: any) => ({
                Email: contact.email,
                CustomerName: `${contact.firstName} ${contact.lastName}`,
                Message: contact.message,
                Subject: contact.subject
            }));

            const ws = XLSX.utils.json_to_sheet(data);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Contact Us");
            XLSX.writeFile(wb, "contacts.xlsx");

        } catch (error) {
            console.error("Download Error:", error);
        } finally {
            setIsDownload(false);
        }
    };

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        setSearchParams({ page: newPage.toString() });
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

    const handleDelete = async (contactId: string) => {
        try {
            // Call the DELETE API to delete the contact
            const response = await deleteContact(contactId);

            if (response) {
                // Filter out the deleted contact from the contacts data
                setContactsData(contactsData.filter((contact: any) => contact._id !== contactId));
                console.log('Contact deleted successfully');
            }
        } catch (error) {
            console.error('Error deleting contact:', error);
        }
    };

    const handleSelectContact = (contactId: string) => {
        const updatedSelectedContacts = new Set(selectedContacts);
        if (updatedSelectedContacts.has(contactId)) {
            updatedSelectedContacts.delete(contactId);
        } else {
            updatedSelectedContacts.add(contactId);
        }
        setSelectedContacts(updatedSelectedContacts);
    };

    const handleBulkDelete = async () => {
        const idsToDelete = Array.from(selectedContacts);  // Assuming selectedContacts is a Set of IDs
        try {
            const response = await deleteContactsByIds(idsToDelete);  // Pass the array of IDs
            if (response) {
                // Filter out the deleted contacts from the contacts data
                setContactsData(contactsData.filter((contact: any) => !selectedContacts.has(contact._id)));
                setSelectedContacts(new Set()); // Clear selected contacts
                console.log('Contacts deleted successfully');
            }
        } catch (error) {
            console.error('Error deleting contacts:', error);
        }
    };

    return (
        <div className='flex footer-manage' style={{ fontFamily: "poppins, sans-serif" }}>
            <div className='hidden lg:block'>
                <AdminSidebar />
            </div>

            <div className='w-[100%] lg:w-[95%] mx-auto z-10 p-3 lg:p-10 duration-500'>
                <div className='m-auto w-[100%] lg:w-[90%]'>
                    <nav aria-label="breadcrumb" className="breadcrumb-container">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/admin/reports" className="breadcrumb-link">Dashboard</Link>
                            </li>
                            <li className='px-2'>{">"}</li>
                            <li className="breadcrumb-item active" aria-current="page">
                                Contact Us
                            </li>
                        </ol>
                    </nav>
                </div>
                <div className='w-[100%] lg:w-[90%] m-auto bg-[#F9F0F0] mt-4 p-4 rounded-md'>
                    <div className="flex items-center gap-4 w-full">
                        <h4 className="text-lg font-semibold w-full md:w-1/6">Contact Us</h4>

                        {/* Search and Filter Controls */}
                        <div className="flex items-center gap-4 flex-wrap w-full">
                            <input
                                type="text"
                                className="border p-2 rounded-md outline-none w-full md:w-48"
                                placeholder="Search"
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                            <input
                                className="border p-2 rounded-md outline-none cursor-pointer w-full md:w-48"
                                type="date"
                                value={startDate}
                                onChange={handleStartDateChange}
                                placeholder="From date"
                            />
                            <input
                                className="border p-2 rounded-md outline-none cursor-pointer w-full md:w-48"
                                type="date"
                                value={endDate}
                                onChange={handleEndDateChange}
                                placeholder="To date"
                            />
                            {/* Bulk Delete Button */}
                            {selectedContacts.size > 0 && (
                                <button
                                    className="px-4 py-2 bg-raffles-blue text-destructive-foreground border-raffles-blue rounded-[5px] w-full md:w-1/4"
                                    onClick={handleBulkDelete}
                                >
                                    Delete Selected Contacts
                                </button>
                            )}

                            {/* Download Button */}
                            <div
                                className="p-3 bg-white rounded-full w-fit flex items-center justify-center cursor-pointer lg:ml-4"
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
                    </div>



                    {
                        contactsData?.map((contact: any, i: number) => (
                            <>
                                <div className='hidden lg:block lg:flex items-center justify-between bg-white p-2 rounded-md mt-4'>

                                    <div className='w-[90%]'>
                                        <table className='w-full table-auto border-collapse' >
                                            <thead className='border-b-[2px] grid grid-cols-4 gap-4'>



                                                <th className='font-[400] text-[15px]' >Customer Name</th>
                                                <th className='font-[400] text-[15px]' >Email</th>
                                                <th className='font-[400] text-[15px]' >Subject</th>
                                                <th className='font-[400] text-[15px]' >Message</th>


                                            </thead>
                                            <tbody>
                                                <tr className='grid grid-cols-4'>
                                                    <td className='text-left flex items-center gap-3 px-4'>
                                                        <input
                                                            type='checkbox'
                                                            checked={selectedContacts.has(contact._id)}
                                                            onChange={() => handleSelectContact(contact._id)}
                                                        />
                                                        <span>{contact.firstName} {contact.lastName}</span>
                                                    </td>
                                                    {/* <td className='text-center'>{contact.firstName} {contact.lastName}</td> */}
                                                    <td className='text-center'>{contact.email}</td>

                                                    <td className='text-center'>{contact.subject}</td>
                                                    <td className='text-center'>{contact.message}</td>


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

                                        <Dropdown.Item onClick={() => handleDelete(contact._id)}>Delete Contact</Dropdown.Item>

                                    </Dropdown>
                                </div>
                                <div className='block lg:hidden flex lg:items-center justify-between bg-white p-2 rounded-md mt-4'>

                                    <div className='w-[100%]'>
                                        {/* <table className='w-[100%]' >
                                            <thead className='border-b-[2px]'>
                                                <th className='font-[400] text-[10px]'></th>
                                                <th className='font-[400] text-[10px]'>Contact ID</th>

                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className='text-center text-[10px]'><input
                                                        type='checkbox'
                                                        checked={selectedContacts.has(contact._id)}
                                                        onChange={() => handleSelectContact(contact._id)}
                                                    /></td>
                                                    <td className='text-center text-[10px]'>{contact._id}</td>
                                                    
                                                </tr>
                                            </tbody>
                                        </table>
                                        <br /> */}
                                        <table className='w-[100%]' >
                                            <thead className='border-b-[2px]'>
                                                <th className='font-[400] text-[10px]'>Customer Name</th>
                                                {/* <th className='font-[400] text-[10px]'>Email</th> */}
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className='text-center  text-[10px]'>{contact.firstName} {contact.lastName}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <br />
                                        <table className='w-[100%]' >
                                            <thead className='border-b-[2px]'>
                                                <th className='font-[400] text-[10px]'>Email</th>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className='text-center text-[10px]'>{contact.email}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <br />
                                        <table className='w-[100%]' >
                                            <thead className='border-b-[2px]'>
                                                <th className='font-[400] text-[10px]'>Message</th>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className='text-center text-[10px]'>{contact.message}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <br />
                                        <table className='w-[100%]' >
                                            <thead className='border-b-[2px]'>
                                                <th className='font-[400] text-[10px]'>Subject</th>

                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className='text-center  text-[10px]'>{contact.subject}</td>

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
                                        <Dropdown.Item onClick={() => handleDelete(contact._id)}>Delete Contact</Dropdown.Item>
                                    </Dropdown>

                                </div>

                            </>
                        ))
                    }

                    {/* Pagination */}
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

export default ContactUs;
