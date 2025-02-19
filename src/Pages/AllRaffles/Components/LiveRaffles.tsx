import RaffleCard from "./RaffleCard";
import { useKeenSlider } from "keen-slider/react";
import { useEffect, useState } from "react";
import { IRaffle, listRaffle } from "../../../Services/Raffle/listRaffle";
import { errorToast } from "../../../Utils/Toast/error.toast";
import { useNavigate } from "react-router-dom";

const LiveRaffles = () => {
  const [raffleData, setRaffleData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getRaffles();
  }, []);

  const getRaffles = async () => {
    try {
      const raffData: any = await listRaffle(1, 8);
      setRaffleData(raffData);
    } catch (error) {
      errorToast("Something went wrong");
    }
  };

  const activeRaffles =
    raffleData?.filter((raffle: any) => raffle?.raffle_status === 1) || [];

  return (
    <div>
      <div className="bg-[#ffffff] relative h-52 lg:h-24">
        {/* <div className=" mt-12 relative w-full ">
          <svg
            width="147"
            height="78"
            viewBox="0 0 147 78"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.1421 53.4519C22.8446 67.8086 36.241 77.5173 51.3483 77.5173C75.277 77.5173 92.126 54.0084 84.4377 31.3484L74.0347 0.686699H0.858887L18.1421 53.4519Z"
              fill="#332366"
            />
            <path
              d="M97.8556 38.5303C101.228 48.827 110.836 55.7903 121.671 55.7903C138.833 55.7903 150.918 38.9294 145.404 22.6774L137.942 0.686562H85.46L97.8556 38.5303Z"
              fill="#332366"
            />
          </svg>
        </div> */}
        <div className="block lg:flex items-center justify-between absolute top-[20%] w-full">
          <div>
            <h3 className="text-black text-xl font-bold tracking-wider ml-12">
              LIVE RAFFLES
            </h3>
          </div>
          <div className="flex items-center justify-center gap-6 lg:justife-left mt-6 lg:mt-0 gap-2 mr-0 lg:mr-12 mb-5">
            <div className="bg-[#F2DAE9] w-fit py-3 px-4 rounded-3xl">
              <h4 className="text-md font-medium">
                {activeRaffles.length} active raffles
              </h4>
            </div>
            <div
              className="bg-[#FFFAFA] w-fit py-3 px-6 rounded-3xl"
              onClick={() => navigate("/ending-soon")}
              style={{ cursor: "pointer" }}
            >
              <h4 className="text-md font-medium"> ending soon</h4>
            </div>
            <div
              className="bg-[#FFFAFA] w-fit py-3 px-6 rounded-3xl"
              onClick={() => navigate("/expired-raffles")}
              style={{ cursor: "pointer" }}
            >
              <h4 className="text-md font-medium"> Ended raffles</h4>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-[95%] mt-10 m-auto">
        {raffleData?.slice(0, 8)?.map((item: IRaffle, i: number) => (
          <RaffleCard key={i} item={item} />
        ))}
      </div>

      <br />
    </div>
  );
};

export default LiveRaffles;
