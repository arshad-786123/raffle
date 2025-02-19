import React, { useEffect, useState } from 'react'
import { getDBData, getDBDetailData } from '../../Services/Admin/getDashboardData'
import { useNavigate, useParams } from 'react-router-dom'
import OwnerSidebar from '../../Components/Navbar/OwnerSidebar'
// getDBData
const WinnerUserDetail = () => {
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
            console.log("res", res);
            setUsersData(res.result);
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className='flex  footer-manage' style={{ fontFamily: "poppins, sans-serif" }}>
            <div className='hidden lg:block'>
                <OwnerSidebar />
            </div>

            <div className='w-[100%] lg:w-[95%] mx-auto z-10 p-3 lg:p-10 duration-500'>
                <div className='w-[100%] lg:w-[90%] m-auto bg-[#F9F0F0] mt-4 p-4 rounded-md'>
                    <div>
                        <div className='bg-[#F9F0F0] p-2 lg:p-12'>
                            <div className=''>
                                <h2 className='font-bold text-xl mb-4'>{usersData?.firstname} {" "} {usersData?.lastname}</h2>
                                <div className=' block lg:flex  justify-between gap-4' >
                                    <div className=' w-[100%] lg:w-[50%] bg-white w-full p-8 rounded-md'>
                                        <h6 className='font-bold text-md'>Email : </h6>
                                        <h3 className=' text-sx'>{usersData?.email}</h3>
                                        <div className='h-[1px] w-full bg-[#9A9A9A] my-4'></div>
                                        <h6 className='font-bold text-md'>Phone : </h6>
                                        <h3 className=' text-sx'>{usersData?.phone}</h3>
                                        <div className='h-[1px] w-full bg-[#9A9A9A] my-4'></div>
                                        <h6 className='font-bold text-md'>Postcode : </h6>
                                        <h3 className=' text-sx'>{usersData?.postcode || " - "}</h3>
                                    </div>
                                    <div className='w-[100%] lg:w-[50%] '>
                                        <div className='bg-white w-full p-8 rounded-md h-full'>
                                            {/* <h6 className='font-bold text-md'>Country : </h6>
                                            <h3 className=' text-sx'>{usersData?.country || " - "} </h3> */}
                                            <div className='my-4'></div>
                                            <h6 className='font-bold text-md'>County : </h6>
                                            <h3 className=' text-sx'>{usersData?.city || " - "}</h3>
                                            <div className='h-[1px] w-full bg-[#9A9A9A] my-4'></div>
                                            <h6 className='font-bold text-md'>Address : </h6>
                                            <h3 className=' text-sx'>{usersData?.address || " - "}</h3>
                                            <div className='h-[1px] w-full bg-[#9A9A9A] my-4'></div>
                                            <h6 className='font-bold text-md'>Town : </h6>
                                            <h3 className=' text-sx'>{usersData?.region || " - "}</h3>

                                        </div>
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

export default WinnerUserDetail;