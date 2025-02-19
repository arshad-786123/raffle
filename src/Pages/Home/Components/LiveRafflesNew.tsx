import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IRaffle, listRaffle } from "@/Services/Raffle/listRaffle";
import { errorToast } from "@/Utils/Toast/error.toast";
import RaffleCardNew from "./RaffleCardNew";
import { Button } from "@/Components/ui/button";

const LiveRafflesNew = () => {
  const navigate = useNavigate();
  const [raffleData, setRaffleData] = useState<IRaffle[]>([]);
  const [page, setPage] = useState<number>(1); // Track the current page
  const [loading, setLoading] = useState<boolean>(false); // Track loading state
  const [hasMore, setHasMore] = useState<boolean>(true); // Flag to check if there are more winners to load

  useEffect(() => {
    getRaffles(page); // Call the function to fetch data on page change
  }, [page]);

  const getRaffles = async (page: number): Promise<void> => {
    if (loading) return; // Prevent additional requests while loading
    setLoading(true); // Set loading to true while fetching data

    try {
      const raffData = await listRaffle(page, 8);
      console.log("API Response:", raffData);

      if (!raffData || raffData.length === 0) {
        if (page === 1) {
          errorToast("No live raffles available");
        }
        setHasMore(false); // No more raffles to load
        return;
      }

      // Append new data to the existing raffleData state
      setRaffleData((prevData) => [...prevData, ...raffData]);

      // If the length of the returned data is less than the limit, no more data is available
      if (raffData.length < 8) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching live raffles:", error);
      errorToast("Something went wrong while fetching live raffles.");
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };


  // const getRaffles = async (page: number): Promise<void> => {
  //   if (loading) return;
  //   setLoading(true);

  //   try {
  //     const raffData = await listRaffle(page, 4); // Make sure this returns an array of IRaffle
  //     console.log("API Response:", raffData);

  //     if (!raffData || raffData.length === 0) {
  //       if (page === 1) {
  //         errorToast("No live raffles available");
  //       }
  //       setHasMore(false); // No more raffles to load
  //       return;
  //     }

  //     // Append new data to the existing raffleData state
  //     setRaffleData((prevData) => [...prevData, ...raffData]);

  //     // If the length of the returned data is less than the limit, no more data is available
  //     if (raffData.length < 4) {
  //       setHasMore(false);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching live raffles:", error);
  //     errorToast("Something went wrong while fetching live raffles.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };



  return (
    <>
      <main className="lg:px-24 sm:px-10 px-4 py-14 w-full">
        <div className="flex flex-row items-center justify-between mb-8">
          <h3 className="sm:text-raffles-light-blue sm:text-[32px] sm:leading-[32px] text-[24px] leading-[24px] font-modernBold text-black">
            Live raffles
          </h3>

          <div
            className="flex items-center justify-center cursor-pointer"
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
        {/* Added new Raffle Cards Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {raffleData.length > 0 ? (
            raffleData.map((item: IRaffle, i: number) => (
              <RaffleCardNew key={i} item={item} />
            ))
          ) : (
            <div>No live raffles found.</div>
          )}

        </div>
        <div className="w-full flex justify-center mt-10">
          {hasMore ?
            <Button
              className="bg-raffles-blue hover:bg-purple-700"
              onClick={() => setPage((prevPage) => prevPage + 1)} // Increment page on click
              disabled={loading} // Disable button while loading
            >
              {loading ? "Loading..." : "See More Raffles"}
            </Button>
            : ''}
        </div>
      </main>
    </>
  );
};

export default LiveRafflesNew;
