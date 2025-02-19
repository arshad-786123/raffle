import CustomeCard from "@/Components/CustomeCard/CustomeCard";
import RaffleCardNew from "@/Pages/Home/Components/RaffleCardNew";
import { listRaffle, IRaffle } from "@/Services/Raffle/listRaffle";
import { errorToast } from "@/Utils/Toast/error.toast";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RafflesCards = () => {
  const navigate = useNavigate();
  const [raffleData, setRaffleData] = useState([]);

  useEffect(() => {
    getRaffles();
  }, []);

  const getRaffles = async () => {
    try {
      const raffData: any = await listRaffle(1, 4);
      setRaffleData(raffData);
    } catch (error) {
      errorToast("Something went wrong");
    }
  };
  return (
    <>
      <main className="bg-white py-8">
        <section className="container-fluid mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between mb-8 space-y-4 lg:space-y-0">
            <h3
              className="text-[24px] sm:text-[32px] leading-[24px] sm:leading-[32px] text-[#110044] font-modernBold"
            >
              We think you’ll love these raffles
            </h3>

            <div
              className="flex items-center justify-center cursor-pointer py-2 px-6"
              onClick={() => navigate("/ending-soon")}
            >
              <div
                className="w-4 h-4 rounded-full mr-2 bg-ending-soon"
                onClick={() => navigate("/ending-soon")}
              ></div>
              <h4 className="font-modernBold sm:text-[16px] sm:leading-[19.2px] text-[14px] leading-[16.8px] text-raffles-light-blue">
                Ending soon
              </h4>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {raffleData?.slice(0, 8)?.map((item: IRaffle, i: number) => (
              <RaffleCardNew key={i} item={item} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default RafflesCards;
