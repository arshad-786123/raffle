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
import OrderListingTable from "../../Common/OrderListing/OrderListingTable"
import UserSidebar from '../../Components/Navbar/UserSidebar'
import OrderDetails from '../../Common/OrderListing/OrderDetails'

const ViewCustomerOrder: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    let page = parseInt(searchParams.get("page") || "1", 10);
    const [merchantsData, setMerchantsData] = useState<any>([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 10;
    const navigate = useNavigate()
    const { id } = useParams();
    console.log("IDDDD", id);


    return (
        <div className='flex footer-manage ' style={{ fontFamily: "poppins, sans-serif" }} >
            <div className='hidden lg:block'>
                <UserSidebar />
            </div>

            <div className='w-[100%] lg:w-[95%] mx-auto z-10 p-3 lg:p-10 duration-500'>

                <div className='w-[100%] lg:w-[90%] m-auto bg-[#F9F0F0] mt-4 p-4 rounded-md'>
                    <div className='flex items-center justify-between '>
                        <h4>Details</h4>

                    </div>
                    <div>

                        <OrderDetails />

                    </div>

                </div>
            </div>
        </div>

    )
}

export default ViewCustomerOrder