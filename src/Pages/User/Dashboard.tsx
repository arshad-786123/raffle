import React, { useEffect, useState } from 'react';
import UserSidebar from '../../Components/Navbar/UserSidebar';
import { Tabs } from 'flowbite-react';
import UserLiveCards from './Components/LiveCards';
import { useSelector } from 'react-redux';
import { getUserPurchasedRaffle } from '../../Services/Authentication/getUserPurchasedRaffle';
import { errorToast } from '../../Utils/Toast/error.toast';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../../constants';
import moment from 'moment';

const UserDashboard = () => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/");
    }

    const userDetails = useSelector((state: any) => state.reducer.user);
    const [raffleData, setRaffleData] = useState<any>();
    const [activeTab, setActiveTab] = useState<number>(0); // State to track the active tab index

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const a = await getUserPurchasedRaffle(API_ENDPOINTS.USER_PURCHASED_RAFFLE);
            setRaffleData(a);
        } catch (error: any) {
            errorToast(error.message);
        }
    };


    const getExpiredRaffles = () => {
        const currentTime = moment();

        return raffleData?.result?.filter((raffle: any) => {
            const isExpired = moment(raffle?.raffleDetails?.cronTime).isBefore(currentTime);
            const isActiveStatus = raffle?.raffleDetails?.raffle_status === 2; // Change 'completed' to your desired status
            return isExpired && isActiveStatus;
        }) || [];
    };

    const getLiveRaffles = () => {
        return raffleData?.result?.filter((raffle: any) => {
            return raffle?.raffleDetails?.raffle_status === 1;
        }) || [];
    };


    const liveRaffles = getLiveRaffles();
    const expiredRaffles = getExpiredRaffles();

    // Determine title based on the active tab
    let title;
    if (activeTab === 0) {
        title = `${liveRaffles.length} active raffles`;
    } else if (activeTab === 1) {
        title = `${expiredRaffles.length} expired raffles`;
    }

    return (
        <div className='flex footer-manage' style={{ fontFamily: "poppins, sans-serif" }}>
            <div className='hidden lg:block'>
                <UserSidebar />
            </div>

            <div className='w-[95%] mx-auto z-10 p-3 lg:p-10 duration-500'>
                <div className='block lg:flex items-center justify-between w-full'>
                    <h2 className='text-lg font-bold tracking-wide'>Hi {userDetails.user?.firstname}! Welcome back!</h2>
                    <button onClick={handleNavigate} className='w-full lg:w-fit my-4 lg:mt-0 font-medium text-md border-[2px] border-[#000000] border-opacity-40 rounded-md py-2 px-6'>
                        + Buy more tickets
                    </button>
                </div>

                <div className='relative rounded-md bg-[#F9F0F0] mt-4'>
                    <Tabs
                        className='w-[98%] m-auto'
                        aria-label="Tabs with underline"
                        style="underline"
                        onActiveTabChange={setActiveTab} // Correctly assigns the active tab index
                    >
                        <Tabs.Item active={activeTab === 0} title="Live">
                            {liveRaffles.length > 0 ? (
                                <UserLiveCards raffleData={{ result: liveRaffles }} />
                            ) : (
                                <p className='text-center my-6 h-[400px]'>No Live Raffles Found</p>
                            )}
                        </Tabs.Item>
                        <Tabs.Item active={activeTab === 1} title="Ended">
                            {expiredRaffles.length > 0 ? (
                                <UserLiveCards raffleData={{ result: expiredRaffles }} />
                            ) : (
                                <p className='text-center my-6 h-[400px]'>No Expired Raffles Found</p>
                            )}
                        </Tabs.Item>
                    </Tabs>
                    {title && (
                        <p className='hidden lg:block absolute top-2 right-10 bg-[#F2DAE9] p-2 px-6 rounded-3xl text-sm font-medium tracking-wide'>
                            {title}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserDashboard;
