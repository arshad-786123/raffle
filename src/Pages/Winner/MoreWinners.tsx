import { Button } from "@/Components/ui/button";
import WinnerCard from "@/Components/Cards/WinnerCard/WinnerCard";
import { useEffect, useState } from "react";
import { getWinnersList } from "@/Services/Owner/getPrize";

const MoreWinners = () => {
  const [winners, setWinners] = useState<any[]>([]); // Array to hold winners
  const [page, setPage] = useState<number>(1); // Track the current page
  const [loading, setLoading] = useState<boolean>(false); // Track loading state
  const [hasMore, setHasMore] = useState<boolean>(true); // Flag to check if there are more winners to load

  const fetchWinners = async (page: number) => {
    setLoading(true); // Set loading to true while fetching
    const response = await getWinnersList(page, 4); // Fetch winners based on current page
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
      setWinners((prevWinners) => [...prevWinners, ...mainPrizes]); // Append new winners to existing ones

      // Check if the number of winners fetched is less than the requested amount
      if (mainPrizes.length < 4) {
        setHasMore(false); // No more winners to fetch
      }
    }
    setLoading(false); // Set loading to false after fetching
  };

  useEffect(() => {
    fetchWinners(page); // Fetch winners when page is loaded
  }, [page]);

  return (
    <div className="w-full my-20 lg:px-24 px-2">
      {/* Winners grid section */}
      <div className="w-full my-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {winners.map((winner, index) => (
            <WinnerCard key={index} winner={winner} />
          ))}
        </div>
        <div className="w-full flex justify-center mt-10">
          {hasMore && (
            <Button
              className="bg-raffles-blue hover:bg-purple-700"
              onClick={() => setPage((prevPage) => prevPage + 1)} // Increment page on click
              disabled={loading} // Disable button while loading
            >
              {loading ? "Loading..." : "See More Winners"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoreWinners;
