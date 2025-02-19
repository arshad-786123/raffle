import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { API_ENDPOINTS, CONSTANT_DATA } from "../../constants";
import moment from "moment";
import { listCategoryWiseRaffle } from "../../Services/Raffle/listRaffle";
import { successToast } from "../../Utils/Toast/success.toast";
import { errorToast } from "../../Utils/Toast/error.toast";
import noimage from "../../assets/no-image.png";
import nouserimage from "../../assets/no-image-user.png";
import RaffleCard from "../Home/Components/RaffleCard";

interface CategoryListingProps {
  setSelectedImageForNavbar: (imageUrl: string | null) => void;
}

const CategoriesListing: React.FC<CategoryListingProps> = (
  { setSelectedImageForNavbar },
  i: any
) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Access the type value passed via navigate
  const type = location.state;
  // const { type } = useParams();
  // let type = this.state;
  const [raffleData, setRaffleData] = useState([]);
  const [indexValue, setIndexValue] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  // useEffect(() => {
  //   handleCategoryNavigate(type);
  // }, [type]);

  useEffect(() => {
    handleCategoryNavigate(type, currentPage);
  }, [type, currentPage]);


  useEffect(() => {
    // getData()
    // Add event listener when component mounts
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Clean up the event listener when component unmounts
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCategoryNavigate = async (type: any, page: number) => {
    try {
      const data = await listCategoryWiseRaffle(type, page, itemsPerPage);
      console.log("data", data);

      setRaffleData(data?.result); // Assuming the data structure from your API response
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching raffle data:", error);
    }
  };

  const handleNavigate = (id: string) => {
    navigate(`/raffle/details/${id}`, {
      state: {
        // sold: totalSale,
        isOwner: false,
      },
    });
  };

  const fallbackCopyTextToClipboard = (text: any) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed"; // Avoid scrolling to bottom
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      const successful = document.execCommand("copy");
      if (successful) {
        successToast("Link copied to clipboard!");
      } else {
        throw new Error("Fallback: Copying text command was unsuccessful");
      }
    } catch (err) {
      console.error("Fallback: Oops, unable to copy", err);
      errorToast("Failed to copy the link.");
    } finally {
      document.body.removeChild(textArea);
    }
  };

  const handleMenuClick = (index: any) => {
    // Toggle the menu open/close state for the clicked card
    setIndexValue(indexValue === index ? null : index);
  };
  const menuRef = useRef<HTMLDivElement>(null);
  const handleClickOutside = (event: any) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      // Click occurred outside of the menu, so close it
      setIndexValue(null);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const getPaginationGroup = () => {
    const pageNumbers = [];
    const maxPageNumbersToShow = 5; // The number of pages we want to show

    if (totalPages <= maxPageNumbersToShow + 2) {
      // If the total number of pages is small, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always show the first page
      pageNumbers.push(1);

      // Display consecutive pages based on the current page
      let startPage = Math.max(currentPage - 2, 2);  // Start 2 pages before the current page
      let endPage = Math.min(currentPage + 2, totalPages - 1); // End 2 pages after the current page

      // Ensure that we show at least 4 pages
      if (currentPage <= 3) {
        endPage = 5;
      }

      if (currentPage >= totalPages - 2) {
        startPage = totalPages - 4;
      }

      // If there is a gap between page 1 and startPage, show ellipsis
      if (startPage > 2) {
        pageNumbers.push("...");
      }

      // Add the range of pages
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      // If there's a gap between endPage and the last page, show ellipsis
      if (endPage < totalPages - 1) {
        pageNumbers.push("...");
      }

      // Always show the last page
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };


  const handlePageClick = (page: number | string) => {
    if (typeof page === "number") {
      setCurrentPage(page);
    }
  };
  console.log('Fetched raffle data>>>>:', raffleData.length);

  return (
    <>
      <div className="footer-manage lg:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-4 w-[95%] mt-10 m-auto">

        {raffleData && raffleData.length > 0 ? (
          raffleData.map(
            (item: any) =>

              <RaffleCard item={item} />
          )
        ) : (
          <div>No raffle found</div>
        )}


      </div>


      {/* <div className='text-xs lg:text-md text-right mt-4 flex items-center justify-end gap-2 cursor-pointer '>
        <div className="pr-5">
          <div className="pr-5">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              <svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.5415 9.79541L5.78052 5.5564L1.5415 1.31738" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <span>{currentPage} of {totalPages}</span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
              <svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.78052 9.79541L1.5415 5.5564L5.78052 1.31738" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div> */}

      <div className="text-xs lg:text-md text-right mt-4 flex items-center justify-center gap-2 cursor-pointer" style={{ fontFamily: "poppins, sans-serif" }}>
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded-md border ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-[#2d234a] text-white"}`}
        >
          <svg
            width="7"
            height="11"
            viewBox="0 0 7 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.5415 9.79541L5.78052 5.5564L1.5415 1.31738"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {getPaginationGroup().map((page, index) => (
          <span
            key={index}
            className={`px-3 py-1 rounded-md border 
        ${page === currentPage ? "border-2 border-[#2d234a] font-bold" : "bg-white  cursor-pointer border-[#2d234a] hover:border-[#2d234a] "}`}
            onClick={() => typeof page === "number" && handlePageClick(page)}
          >
            {page}
          </span>
        ))}

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded-md border ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-[#2d234a] text-white"}`}
        >
          <svg
            width="7"
            height="11"
            viewBox="0 0 7 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.78052 9.79541L1.5415 5.5564L5.78052 1.31738"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

    </>
  );
};

export default CategoriesListing;
