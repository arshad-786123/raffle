import { Button } from "@/Components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { listRaffle } from "@/Services/Raffle/listRaffle";
import { errorToast } from "@/Utils/Toast/error.toast";
import { useEffect, useState } from "react";
import RaffleCardNew from "./RaffleCardNew";
import { getCategories } from "@/Services/Raffle/categories";

const BrowseRafflesbyCategory = () => {
  const [raffleData, setRaffleData] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>("All");
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [categoriesFetched, setCategoriesFetched] = useState<boolean>(false); // Track if categories have been fetched

  // Fetch categories once when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryData = await getCategories();
        setCategories(["All", ...categoryData.map((cat: any) => cat.category_name)]);
        setCategoriesFetched(true); // Mark categories as fetched
        console.log("Categories fetched:", categoryData);
      } catch (error) {
        errorToast("Error fetching categories");
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (categoriesFetched && selectedCategory) {
      console.log("Category changed:", selectedCategory);
      setRaffleData([]); // Clear raffle data on category change
      setCurrentPage(1); // Reset to first page
      setHasMore(true); // Ensure there are more items to load
      getRaffles(1, 4); // Fetch new raffles for the first page
    }
  }, [selectedCategory, categoriesFetched]); // Trigger only after categories are fetched

  const getRaffles = async (page: number, limit: number) => {
    console.log("Fetching raffles for page:", page, "category:", selectedCategory);
    setLoading(true);
    try {
      const raffData: any = await listRaffle(page, limit, selectedCategory);
      console.log("Raffles data fetched:", raffData);

      if (raffData.length < limit) {
        setHasMore(false);
      }

      setRaffleData((prevData) => [...prevData, ...raffData]); // Append new data
    } catch (error) {
      errorToast("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value); // Update category on selection
  };

  const loadMoreRaffles = () => {
    if (hasMore && !loading) {
      const nextPage = currentPage + 1; // Calculate the next page
      setCurrentPage(nextPage); // Update state with the new page
      getRaffles(nextPage, 4); // Fetch the raffles for the next page
    }
  };

  return (
    <main className="lg:px-24 sm:px-10 px-4 py-20 w-full">
      <div className="flex md:flex-row flex-col justify-between items-center mb-6 md:gap-0 gap-8">
        <div className="flex items-center justify-center">
          <h3 className="sm:text-raffles-light-blue sm:text-[40px] sm:leading-[42px] text-[28px] leading-[29.4px] font-modernBold text-black">
            Browse raffles{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AD6FFF] via-[#FD98E8] to-[#FF7385]">
              by category
            </span>
          </h3>
        </div>

        <div className="flex items-center sm:gap-2 gap-4 justify-center">
          <div className="md:hidden block">
            <Select onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-[158px] border-[#110044]">
                <SelectValue placeholder="Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categories</SelectLabel>
                  {categories.map((category, index) => (
                    <SelectItem value={category} key={index}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex-wrap gap-4 mb-8 md:flex hidden">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`rounded-[5px] border text-[16px] leading-[16px] flex items-center justify-center font-modernBold transition-all duration-300 h-[45px] px-[22px] py-[17px] ${selectedCategory === category
              ? "bg-[#110044] text-white border-[#110044]"
              : "text-gray-700 border-[#110044] hover:bg-gray-100 opacity-[60%]"}`}
          >
            <span>{category}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {raffleData.map((item: any, i: number) => (
          <RaffleCardNew key={i} item={item} />
        ))}
      </div>

      <div className="flex items-center justify-center mt-10">
        {raffleData.length > 0 && hasMore && (
          <Button
            variant="outline"
            className={`border-[#110044] rounded-[5px] font-modernBold text-[16px] leading-[16px] text-[#110044] ${loading || !hasMore ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={loadMoreRaffles}
            disabled={loading || !hasMore} // Disable when loading or no more data
          >
            {loading ? "Loading..." : "Load more"}
          </Button>
        )}
      </div>

    </main>
  );
};

export default BrowseRafflesbyCategory;
