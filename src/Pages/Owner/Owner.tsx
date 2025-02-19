
import OwnerSidebar from '../../Components/Navbar/OwnerSidebar';
import { Tabs } from "flowbite-react";
import LiveCards from './Components/LiveCards';
import HelpCard from './Components/HelpCard';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getRaffle } from '../../Services/Owner/getRaffle';
import LiveRaffles from '../Home/Components/LiveRaffles';
import { errorToast } from '../../Utils/Toast/error.toast';

const Owner = () => {
  const navigate = useNavigate();
  const location = useLocation();



  const handleNavigate = () => {
    const userDetails = localStorage.getItem('userdetails');
    if (userDetails && JSON.parse(userDetails) === true) {
      navigate('/owner/create');
    } else {
      errorToast("Please complete your profile first!");
    }
  };

  const userData = useSelector((state: any) => state.reducer.user);

  const [raffleData, setRaffleData] = useState({
    expiredRaffles: [],
    liveRaffles: [],
    dueRaffles: [],
    draftRaffles: [],
    declineRaffles: []
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const a = await getRaffle();
    if (a.result) {
      setRaffleData(a.result);
    } else {
      setRaffleData({
        expiredRaffles: [],
        liveRaffles: [],
        dueRaffles: [],
        draftRaffles: [],
        declineRaffles: [],
      });
    }
  };

  return (
    <div className='flex footer-manage' style={{ fontFamily: "poppins, sans-serif" }}>
      <div className='hidden lg:block'>
        <OwnerSidebar />
      </div>

      <div className={`w-[100%] lg:w-[90%] mx-auto z-10 p-4 lg:p-10 duration-500`}>
        <div className='block lg:flex items-center justify-between w-full'>
          <h2 className='text-lg font-bold tracking-wide'>Hi {userData?.user?.firstname} {" "}! Welcome back!</h2>
          <button onClick={handleNavigate} className='mt-4 lg:mt-0 w-full lg:w-fit font-medium text-md border-[2px] border-[#000000] border-opacity-40 rounded-md py-2 px-6'>
            + Start Raffle
          </button>
        </div>

        <div className='rounded-md bg-[#F9F0F0] mt-4 flex'>
          <Tabs className='w-[95%] m-auto' aria-label="Tabs with underline" style="underline">
            <Tabs.Item title="Live">
              <LiveCards raffleData={raffleData?.liveRaffles} raffleType="LIVE" />
            </Tabs.Item>
            <Tabs.Item title="Expired">
              <LiveCards raffleData={raffleData?.expiredRaffles} raffleType="EXPIRED" />
            </Tabs.Item>
            <Tabs.Item active={location.state?.pendingTab} title="Pending">
              <LiveCards raffleData={raffleData?.dueRaffles} raffleType="DUE" />
            </Tabs.Item>
            <Tabs.Item active={location.state?.draftTab} title="Draft">
              <LiveCards raffleData={raffleData?.draftRaffles} raffleType="DRAFT" />
            </Tabs.Item>
            <Tabs.Item title="Decline">
              <LiveCards raffleData={raffleData?.declineRaffles} raffleType="DECLINE" />
            </Tabs.Item>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Owner;


