import { Button } from "@/Components/ui/button";

import WinnerCard from "@/Components/Cards/WinnerCard/WinnerCard";
import { getWinnersList } from "@/Services/Owner/getPrize";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Winners = () => {
  const [winners, setWinners] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWinners = async () => {
      const response = await getWinnersList(1, 8);
      if (response?.result) {
        const mainPrizes = response.result.flatMap((raffle: any) =>
          raffle.main_prizes.map((prize: any) => ({
            ...prize,
            raffle_name: raffle.raffle_name,
            raffle_description: raffle.raffle_description,
            images: raffle.images[0],
            cronTime: raffle.cronTime,
            uniqueID: raffle.uniqueID
          }))
        );
        setWinners(mainPrizes);
      }
    };
    fetchWinners();
  }, []);

  // Function to handle button click
  const handleSeeWinnersClick = () => {
    navigate("/winners"); // Replace with the actual URL or dynamic route
  };


  return (
    <div className="w-full my-20 lg:px-24 px-2 flex flex-col lg:flex-row items-center justify-between gap-8">
      <div className="lg:w-1/4 w-full flex flex-col justify-center">
        <h2
          className="text-[40px] leading-[40px] font-bold text-[#110044]"
          style={{ fontFamily: "ModernEraBold" }}
        >
          Hear from
        </h2>

        <h2
          className="text-[40px] leading-[45px] bg-gradient-to-l from-[#FF7385] via-[#FD98E8] to-[#AD6FFF] bg-clip-text text-transparent font-bold"
          style={{ fontFamily: "ModernEraBold" }}
        >
          Raffily’s winners
        </h2>

        <Button className="bg-raffles-light-blue h-[45px] hidden lg:block mt-20 w-[145px] font-modernBold text-[16px] leading-[16px] hover:bg-purple-700" onClick={handleSeeWinnersClick} >
          See Winners
        </Button>
      </div>
      <div className="lg:w-3/4 w-full flex gap-5 overflow-x-auto overflow-y-hidden">
        {winners.map((winner, index) => (
          <div className="w-[312px] min-w-[312px] max-w-[312px]">
            <WinnerCard key={index} winner={winner} />

          </div>
        ))}
      </div>
      <Button className="bg-raffles-blue w-full lg:hidden block mt-10 hover:bg-purple-700" onClick={handleSeeWinnersClick} >
        See Winners
      </Button>
    </div>
  );
};

export default Winners;
