import React, { useEffect, useState } from 'react';
import { getOwnerTransaciton, getOwnerWallet } from '../../Services/Owner/getWallet';
import { IOwnerWallet } from '../../Utils/Interface/ownerwallet.interface';
import UserSidebar from '../../Components/Navbar/UserSidebar';

const UserBalance = () => {

    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

    useEffect(() => {
        getData()
    }, [])

    const [userWalletDetails, setUserWalletDetails] = useState<IOwnerWallet>()
    const [userTransactionDetails, setUserTransactionDetails] = useState([])

    const getData = async () => {
        const a = await getOwnerWallet()
        const b = await getOwnerTransaciton()

        setUserWalletDetails(a.result)
        setUserTransactionDetails(b.result)
    }

    return (
        <div className='flex  footer-manage' style={{ fontFamily: "poppins, sans-serif" }}>
            <div className='hidden lg:block'>
                <UserSidebar />
            </div>

            <div className='w-[100%] lg:w-[95%] mx-auto z-10 p-3 lg:p-10 duration-500'>
                <div className='w-[90%] m-auto'>
                    <h3>My Balance</h3>
                    <div className='border-[#FF6A78] border-[1px]'></div>
                    <br />
                    <div>
                        <div className='bg-[#F9F0F0] p-2 lg:p-12'>
                            <div className='block lg:flex  justify-between gap-4'>
                                <div className='w-[100%] lg:w-[30%]'>
                                    <h3 className='font-medium'>Balance available for use</h3>
                                    <div className='bg-white w-full p-8 rounded-md mt-2 w-[100%] h-full'>
                                        <h6 className='font-medium text-lg'>Balance available for use</h6>
                                        <h3 className='font-bold text-xl'>£ {userWalletDetails?.balance == "" ? 0 : userWalletDetails?.balance}</h3>
                                        <h6 className='text-xs mt-3 font-normal'>Withdrawn to date:   £{userWalletDetails?.revenue.amount == undefined ? 0 : userWalletDetails?.revenue.amount}</h6>
                                        <button className='bg-[#FF6A78] text-white py-2 w-full rounded-lg mt-12'>Withdraw</button>
                                        <p className='font-normal underline text-xs text-center'>Manage payout methods</p>
                                    </div>
                                </div>
                                <div className='w-[100%] lg:w-[30%] mt-6 lg:mt-0'>
                                    <h3 className='font-medium'>Revenue & Costs</h3>
                                    <div className='bg-white w-full p-8 rounded-md h-full'>
                                        <h6 className='font-medium text-lg'>Revenue to date</h6>
                                        <h3 className='font-bold text-xl'>£ {userWalletDetails?.revenue.amount == undefined ? 0 : userWalletDetails?.revenue.amount}</h3>
                                        <h6 className='text-xs mt-3 font-normal'>your Revenue since joining.</h6>
                                        <div className='h-[1px] w-full bg-[#9A9A9A] my-4'></div>
                                        <h6 className='font-medium text-lg'>Costs to date</h6>
                                        <h3 className='font-bold text-xl'>£ {userWalletDetails?.revenue.amount == undefined ? 0 : userWalletDetails?.revenue.amount}</h3>
                                        <h6 className='text-xs mt-3 font-normal'>Revenue spent on purchase since joining.</h6>
                                    </div>
                                </div>
                                <div className='w-[100%] lg:w-[30%] mt-6 lg:mt-0'>
                                    <h3 className='font-medium'>Profits</h3>
                                    <div className='bg-white  p-8 rounded-md w-full h-full'>
                                        <h6 className='font-medium text-lg'>Profits to date</h6>
                                        <h3 className='font-bold text-xl'>£ {userWalletDetails?.profits == "" ? 0 : userWalletDetails?.profits}</h3>
                                        <h6 className='text-xs mt-3 font-normal'>your profits since joining.</h6>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <br />
                    <br />
                    <div className='bg-[#F9F0F0] p-3 lg:p-12'>
                        <div className='flex items-center gap-4 justify-between'>
                            <div className='flex items-center gap-4'>
                                <div className='flex gap-10 text-xs lg:text-md items-center border-[1px] border-black w-fit p-2'>
                                    <p>Date range</p>
                                    <svg width="13" height="8" viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.36391 4.94972L11.3137 0L12.7279 1.41421L6.36391 7.77822L0 1.41421L1.41421 0L6.36391 4.94972Z" fill="black" />
                                    </svg>
                                </div>
                                <div className='text-xs lg:text-md flex gap-10 items-center border-[1px] border-black w-fit p-2'>
                                    <p>Sort by</p>
                                    <svg width="13" height="8" viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.36391 4.94972L11.3137 0L12.7279 1.41421L6.36391 7.77822L0 1.41421L1.41421 0L6.36391 4.94972Z" fill="black" />
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <svg className='p-3 bg-white rounded-[100px]' width="45" height="45" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11 7H16L10 13L4 7H9V0H11V7ZM2 16H18V9H20V17C20 17.5523 19.5523 18 19 18H1C0.44772 18 0 17.5523 0 17V9H2V16Z" fill="black" />
                                </svg>
                            </div>
                        </div>
                        <div className='w-[100%] bg-white overflow-x-scroll mt-4 p-1 lg:p-10'>
                            <table className='w-[100%] '>
                                <thead className='border-b-2'>
                                    <th className='text-[8px] lg:text-[16px] font-normal p-4'>Start Date</th>
                                    <th className='text-[8px] lg:text-[16px] font-normal p-4'>End Date</th>
                                    <th className='text-[8px] lg:text-[16px] font-normal p-4'>Raffle</th>
                                    <th className='text-[8px] lg:text-[16px] font-normal p-4'>Revenue</th>
                                    <th className='text-[8px] lg:text-[16px] font-normal p-4'>Costs</th>
                                    <th className='text-[8px] lg:text-[16px] font-normal p-4'>Profits</th>
                                </thead>
                                {

                                    userTransactionDetails?.length > 0 ?
                                        <tbody className='mt-2'>
                                            {
                                                userTransactionDetails.map(item => (
                                                    <tr >
                                                        <td className='text-[8px] lg:text-[16px] text-center pt-3'>01 Jan</td>
                                                        <td className='text-[8px] lg:text-[16px] text-center pt-3'>10 Jan</td>
                                                        <td className='text-[8px] lg:text-[16px] text-center pt-3'>Raffle name</td>
                                                        <td className='text-[8px] lg:text-[16px] text-center pt-3'>£10,000</td>
                                                        <td className='text-[8px] lg:text-[16px] text-center pt-3'>£1,000</td>
                                                        <td className='text-[8px] lg:text-[16px] text-center pt-3'>£9,000</td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                        :
                                        <div className='absolute mt-3 text-gray-500' style={{ left: '55%' }}>No Data Found</div>}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserBalance