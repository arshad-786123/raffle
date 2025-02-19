import React, { useEffect, useState } from 'react'
import AdminSidebar from '../../Components/Navbar/AdminSidebar'
import { getDBDetailData } from '../../Services/Admin/getDashboardData'
import { Link, useNavigate, useParams } from 'react-router-dom'

const MerchantDetail = () => {
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
        <div className='flex footer-manage' style={{ fontFamily: "poppins, sans-serif" }}>
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
                                {"Details"}
                            </li>
                        </ol>
                    </nav>
                </div>

                <div className='w-[100%] lg:w-[90%] m-auto bg-[#F9F0F0] mt-4 p-4 rounded-md'>
                    <h3>{usersData?.companyName || "General information"}</h3>
                    <div className='bg-[#F9F0F0]'>
                        <div className=''>
                            <h2 className='font-bold text-xl mb-4'>{usersData?.businessName}</h2>
                            <div className=' block lg:flex  justify-between gap-4' >
                                <div className=' w-[100%] lg:w-[50%] bg-white w-full p-8 rounded-md'>
                                    <h6 className='font-bold text-md'>Email : </h6>
                                    <h3 className=' text-sx'>{usersData?.email}</h3>
                                    <div className='h-[1px] w-full bg-[#9A9A9A] my-4'></div>
                                    <h6 className='font-bold text-md'>Phone : </h6>
                                    <h3 className=' text-sx'>{usersData?.dialCode?.dial_code}{" "}{usersData?.phone}</h3>
                                    <div className='h-[1px] w-full bg-[#9A9A9A] my-4'></div>
                                    <h6 className='font-bold text-md'>Landline Number : </h6>
                                    <h3 className=' text-sx'>{usersData?.landline || "N/A"}</h3>
                                    <div className='h-[1px] w-full bg-[#9A9A9A] my-4'></div>
                                    <h6 className='font-bold text-md'>Company Name : </h6>
                                    <h3 className=' text-sx'>{usersData?.businessName}</h3>
                                </div>

                                <div className='w-[100%] lg:w-[50%] '>
                                    <div className='bg-white w-full p-8 rounded-md h-full'>
                                        <h6 className='font-bold text-md'>Country : </h6>
                                        <h3 className=' text-sx'>{usersData?.country || " - "} </h3>
                                        <div className='h-[1px] w-full bg-[#9A9A9A] my-4'></div>
                                        <h6 className='font-bold text-md'>City : </h6>
                                        <h3 className=' text-sx'>{usersData?.city || " - "}</h3>
                                        <div className='h-[1px] w-full bg-[#9A9A9A] my-4'></div>
                                        <h6 className='font-bold text-md'>Address : </h6>
                                        <h3 className=' text-sx'>{usersData?.businessAddress || " - "}</h3>
                                        <div className='h-[1px] w-full bg-[#9A9A9A] my-4'></div>
                                        <h6 className='font-bold text-md'>Postcode : </h6>
                                        <h3 className=' text-sx'>{usersData?.postcode || " - "}</h3>
                                    </div>
                                </div>
                            </div>

                            {/* Card Details Section */}
                            {/* <div className='mt-4'>
                                <h2 className='font-bold text-xl mb-4'>Card Details</h2>
                                {usersData?.walletBalance?.cardDetails && usersData.walletBalance.cardDetails.length > 0 ? (
                                    <div>
                                        {usersData.walletBalance.cardDetails.map((card: any, index: number) => (
                                            <div key={index} className='bg-white w-full p-8 rounded-md mb-4'>
                                                <h6 className='font-bold text-md'>Bank Name: </h6>
                                                <h3 className=' text-sx'>{card.bankName || " - "}</h3>
                                                <div className='h-[1px] w-full bg-[#9A9A9A] my-4'></div>
                                                <h6 className='font-bold text-md'>Account Name: </h6>
                                                <h3 className=' text-sx'>{card.accountName || " - "}</h3>
                                                <div className='h-[1px] w-full bg-[#9A9A9A] my-4'></div>
                                                <h6 className='font-bold text-md'>Account Number: </h6>
                                                <h3 className=' text-sx'>{card.accountNumber || " - "}</h3>
                                                <div className='h-[1px] w-full bg-[#9A9A9A] my-4'></div>
                                                <h6 className='font-bold text-md'>Sort Code: </h6>
                                                <h3 className=' text-sx'>{card.sortCode || " - "}</h3>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p>No card details available</p>
                                )}
                            </div> */}
                            <div className="w-[100%] lg:w-[90%]  mt-4  rounded-md">
                                <div className="bg-[#F9F0F0]">
                                    <h2 className="text-lg font-medium tracking-wider" style={{ fontFamily: "poppins, sans-serif" }}>Bank Details</h2>

                                    {usersData?.walletBalance?.cardDetails && usersData.walletBalance.cardDetails.length > 0 ? (
                                        <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                                            {usersData.walletBalance.cardDetails.map((card: any, index: number) => (
                                                <div key={index} className="px-8 pb-8 rounded-2xl bg-white shadow-xl">
                                                    <div className="flex items-center justify-end pt-4 gap-4">
                                                        {/* You can add any icons or buttons here */}
                                                    </div>

                                                    <h2 style={{ fontFamily: "poppins, sans-serif" }}>Bank #{index + 1}</h2>
                                                    <div className="flex items-start justify-between pt-4">
                                                        <div className="flex-1 pr-4">
                                                            <h3 className="text-xs">Bank Name</h3>
                                                            <p>{card?.bankName}</p>
                                                        </div>
                                                        <div className="flex-1">
                                                            <h3 className="text-xs">Account Name</h3>
                                                            <p>{card?.accountName}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-start justify-between pt-4">
                                                        <div className="flex-1 pr-4">
                                                            <h3 className="text-xs">Account Number</h3>
                                                            <p>{card?.accountNumber}</p>
                                                        </div>
                                                        <div className="flex-1">
                                                            <h3 className="text-xs">Sort Code</h3>
                                                            <p>{card?.sortCode}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div>No bank details available.</div>
                                    )}
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default MerchantDetail;
