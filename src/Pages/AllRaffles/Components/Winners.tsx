import { Button } from "@/Components/ui/button";

import WinnerCard from "@/Components/Cards/WinnerCard/WinnerCard";
import { useEffect, useState } from "react";
import { getWinnersList } from "@/Services/Owner/getPrize";
import { useNavigate } from "react-router-dom";

const Winners = () => {

  const [winners, setWinners] = useState<any[]>([]); // Array to hold winners
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
        <h2 className="text-[40px] leading-[40px] font-bold">Hear from</h2>
        <h2 className="text-[40px] leading-[40px] bg-gradient-to-l from-[#FF7385] via-[#FD98E8] to-[#AD6FFF] bg-clip-text text-transparent font-bold">
          Raffily’s winners
        </h2>

        <Button className="bg-raffles-blue w-fit hidden lg:block mt-20">
          See Winners
        </Button>
      </div>
      <div className="lg:w-3/4 w-full flex gap-5 overflow-x-auto overflow-y-hidden">
        {winners.map((winner, index) => (
          <WinnerCard key={index} winner={winner} />
        ))}
      </div>
      <Button className="bg-raffles-blue w-full lg:hidden block mt-10" onClick={handleSeeWinnersClick}>
        See Winners
      </Button>
    </div>
  );
};

export default Winners;
