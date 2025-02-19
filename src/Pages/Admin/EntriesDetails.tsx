import React, { useEffect, useState } from 'react'
import AdminSidebar from '../../Components/Navbar/AdminSidebar'
import { getDBData, getDBDetailData } from '../../Services/Admin/getDashboardData'
import { Link, useNavigate, useParams } from 'react-router-dom'
// getDBData
const EntriesDetails = () => {
    const [usersData, setUsersData] = useState<any>([])

    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();


    useEffect(() => {
        if (id) {
            getUserDetail(id);
        }
    }, [id]);

    const getUserDetail = async (userId: string) => {
        try {
            const res = await getDBDetailData('users', userId);
            setUsersData(res.result);
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className='flex  footer-manage' style={{ fontFamily: "poppins, sans-serif" }}>
            <div className='hidden lg:block'>
                <AdminSidebar />
            </div>

            <div className='w-[100%] lg:w-[95%] mx-auto z-10 p-3 lg:p-10 duration-500'>
                <div className='m-auto w-[100%] lg:w-[90%]'>
                    <nav aria-label="breadcrumb" className="breadcrumb-container ">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/admin/reports" className="breadcrumb-link">Dashboard</Link>
                            </li>
                            <li className='px-2'>{">"}</li>
                            <li className="breadcrumb-item">
                                <Link to="/admin/merchants" className="breadcrumb-link">Merchants</Link>
                            </li>
                            <li className='px-2'>{">"}</li>
                            <li className="breadcrumb-item active" aria-current="page">
                                {usersData?.firstname || "Details"} {" "}{usersData?.lastname}
                            </li>
                        </ol>
                    </nav>
                </div>
                <div className='w-[100%] lg:w-[90%] m-auto bg-[#F9F0F0] mt-4 p-4 rounded-md'>
                    <h3>{usersData?.firstname || "General information"} {" "}{usersData?.lastname}</h3>
                    <div className='bg-[#F9F0F0]'>
                        <div className=''>
                            <h2 className='font-bold text-xl mb-4'>{usersData?.firstname} {" "} {usersData?.lastname}</h2>
                            <div className=' block lg:flex  justify-between gap-4' >
                                <div className=' w-[100%] lg:w-[50%] bg-white w-full p-8 rounded-md'>
                                    <h6 className='font-bold text-md'>Email : </h6>
                                    <h3 className=' text-sx'>{usersData?.email}</h3>
                                    {/* <h6 className='text-xs mt-3 font-normal'>your Revenue since joining.</h6> */}
                                    <div className='h-[1px] w-full bg-[#9A9A9A] my-4'></div>
                                    <h6 className='font-bold text-md'>Phone : </h6>
                                    <h3 className=' text-sx'>{usersData?.dialCode?.dial_code}{" "}{usersData?.phone}</h3>
                                    <div className='h-[1px] w-full bg-[#9A9A9A] my-4'></div>
                                    <h6 className='font-bold text-md'>Company Name : </h6>
                                    <h3 className=' text-sx'>{usersData?.businessName}</h3>
                                </div>
                                <div className='w-[100%] lg:w-[50%] '>
                                    <div className='bg-white w-full p-8 rounded-md h-full'>
                                        <h6 className='font-bold text-md'>Country : </h6>
                                        <h3 className=' text-sx'>{usersData?.country || " - "} </h3>
                                        {/* <h6 className='text-xs mt-3 font-normal'>Code : {usersData?.dialCode?.code} / ( {usersData?.dialCode?.dial_code} )</h6> */}
                                        {/* <div className='h-[1px] w-full bg-[#9A9A9A] my-4'></div> */}
                                        <div className='my-4'></div>
                                        <h6 className='font-bold text-md'>City : </h6>
                                        <h3 className=' text-sx'>{usersData?.city || " - "}</h3>
                                        <div className='my-4'></div>
                                        <h6 className='font-bold text-md'>Address : </h6>
                                        <h3 className=' text-sx'>{usersData?.businessAddress || " - "}</h3>
                                        {/* <h6 className='text-xs mt-3 font-normal'>Revenue spent on purchase since joining.</h6> */}
                                        <div className='h-[1px] w-full bg-[#9A9A9A] my-4'></div>
                                        <h6 className='font-bold text-md'>Region : </h6>
                                        <h3 className=' text-sx'>{usersData?.region || " - "}</h3>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>



                </div>
            </div>
        </div>

    )
}

export default EntriesDetails;