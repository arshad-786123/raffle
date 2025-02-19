import React, { useEffect, useState } from "react";
import RaffleCardNew from "../../Home/Components/RaffleCardNew";
import { IRaffle } from "@/Services/Raffle/listRaffle";
import { errorToast } from "@/Utils/Toast/error.toast";
import { getExpireRaffle } from "@/Services/Raffle/categories";
import { Button } from "@/Components/ui/button";

const ExpiredRaffles = () => {
  const [raffleData, setRaffleData] = useState<IRaffle[]>([]);
  const [page, setPage] = useState<number>(1); // Track the current page
  const [loading, setLoading] = useState<boolean>(false); // Track loading state
  const [hasMore, setHasMore] = useState<boolean>(true); // Flag to check if there are more winners to load

  useEffect(() => {
    fetchRaffles(page); // Call the function to fetch data on page change
  }, [page]);

  const fetchRaffles = async (page: number): Promise<void> => {
    if (loading) return; // Prevent additional requests while loading
    setLoading(true); // Set loading to true while fetching data

    try {
      const raffData = await getExpireRaffle(page, 4);
      console.log("API Response:", raffData);

      if (!raffData || raffData.length === 0) {
        if (page === 1) {
          errorToast("No expired raffles available");
        }
        setHasMore(false); // No more raffles to load
        return;
      }

      // Append new data to the existing raffleData state
      setRaffleData((prevData) => [...prevData, ...raffData]);

      // If the length of the returned data is less than the limit, no more data is available
      if (raffData.length < 4) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching expired raffles:", error);
      errorToast("Something went wrong while fetching expired raffles.");
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  return (
    <main className="lg:px-16 px-2 py-14 w-full">
      <section className="container-fluid mx-auto px-4 lg:px-8">
        <br />
        <br />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {raffleData.length > 0 ? (
            raffleData.map((item: IRaffle, i: number) => (
              <RaffleCardNew key={i} item={item} />
            ))
          ) : (
            <div>No expired raffles found.</div>
          )}
        </div>
        <div className="w-full flex justify-center mt-10">
          {hasMore && (
            <Button
              className="bg-raffles-blue hover:bg-purple-700"
              onClick={() => setPage((prevPage) => prevPage + 1)} // Increment page on click
              disabled={loading} // Disable button while loading
            >
              {loading ? "Loading..." : "See More Raffles"}
            </Button>
          )}
        </div>
      </section>
    </main>
  );
};

export default ExpiredRaffles;
