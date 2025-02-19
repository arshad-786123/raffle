import React, { useEffect, useState } from "react";
import UserSidebar from "../../Components/Navbar/UserSidebar";
import UserPrizeCards from "./Components/PrizeCard";
import { Tabs } from "flowbite-react";
import { errorToast } from "../../Utils/Toast/error.toast";
import { getUserPrizes } from "../../Services/Authentication/getUserPrizes";

const UserPrizes = () => {
  const [prizeData, setPrizeData] = useState<RafflesResponse>({
    instant_prizes: [],
    main_prizes: [],
  });

  useEffect(() => {
    getPrize();
  }, []);

  const getPrize = async () => {
    try {
      const a = await getUserPrizes();

      if (a.success) {
        setPrizeData(a.result);
      } else {
        errorToast(a.message);
      }
    } catch (error: any) {
      errorToast(error.message);
    }
  };

  return (
    <div className="flex  footer-manage" style={{ fontFamily: "poppins, sans-serif" }}>
      <div className="hidden lg:block">
        <UserSidebar />
      </div>

      <div
        className={`w-[98%] lg:w-[90%]   mx-auto z-10 p-4 lg:p-10 duration-500`}
      >
        <h3>My Prizes</h3>
        <div className="border-[#FF6A78] border-[1px]"></div>
        <div className="bg-[#F9F0F0] p-2 ">
          <Tabs
            className="w-[98%] m-auto text-red-900 border-red-900 tabItem"
            aria-label="Tabs with underline"
            style="underline"
          >
            <Tabs.Item active title="Main Winnings" className="tabItem">
              <UserPrizeCards prizeData={prizeData.main_prizes} />
            </Tabs.Item>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default UserPrizes;
