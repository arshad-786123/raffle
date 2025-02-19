import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import noimage from "../../../assets/no-image.png";
import nouserimage from "../../../assets/no-image-user.png";
import { getExpireRaffle } from "../../../Services/Raffle/categories";
import { CONSTANT_DATA } from "../../../constants";

const ExpiredRaffles = () => {
    const navigate = useNavigate();
    const { type } = useParams();
    const [raffleData, setRaffleData] = useState([]);
    const [indexValue, setIndexValue] = useState(null);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; // Set items per page
    const totalPages = Math.ceil(raffleData.length / itemsPerPage);

    useEffect(() => {
        fetchExpiredRaffles(type);
    }, [type]);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const fetchExpiredRaffles = async (type: any) => {
        try {
            const data = await getExpireRaffle(1, 8);
            console.log("Expired Raffles Data:", data);
            setRaffleData(data?.data?.result);
        } catch (error) {
            console.error("Error fetching expired raffles:", error);
        }
    };

    const handleNavigate = (id: string) => {
        navigate(`/raffle/details/${id}`, {
            state: { isOwner: false },
        });
    };

    const menuRef = useRef<HTMLDivElement>(null);
    const handleClickOutside = (event: any) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setIndexValue(null);
        }
    };

    // Pagination handler functions
    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const handlePageClick = (page: number | string) => {
        if (typeof page === "number") {
            setCurrentPage(page);
        }
    };
    // Get current page data
    const currentData = raffleData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

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


    // // Generate pagination group
    // const getPaginationGroup = () => {
    //     const group = [];
    //     for (let i = 1; i <= totalPages; i++) {
    //         group.push(i);
    //     }
    //     return group;
    // };

    return (
        <>
            <div className="hidden footer-manage lg:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-[95%] mt-10 m-auto">
                {currentData.length > 0 ? (
                    currentData.map((item: any) => (
                        item?.raffle_status === 2 && (
                            <div key={item._id} className="keen-slider__slide mb-6">
                                <div className="bg-[#20124C] rounded-xl relative">
                                    <img
                                        onClick={() => handleNavigate(item.uniqueID)}
                                        src={item ? CONSTANT_DATA.BASE_URL + item.images[0] : noimage}
                                        alt="raffle"
                                        className="cursor-pointer w-[100%] h-[250px] rounded-t-xl"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.onerror = null;
                                            target.src = noimage;
                                        }}
                                    />
                                    <div className="cursor-pointer w-[90%] m-auto text-white mt-8 pb-6">
                                        <div onClick={() => handleNavigate(item.uniqueID)} className="flex items-center justify-between">
                                            <div className="flex gap-2" style={{ alignItems: "center" }}>
                                                {item?.ownerImage ? (
                                                    <img
                                                        src={CONSTANT_DATA.BASE_URL + item?.ownerImage}
                                                        alt={item?.owner?.businessName}
                                                        style={{ height: "50px", width: "50px", borderRadius: "50%" }}
                                                        onError={(e) => {
                                                            const target = e.target as HTMLImageElement;
                                                            target.onerror = null;
                                                            target.src = nouserimage;
                                                        }}
                                                    />
                                                ) : (
                                                    <svg width="46" height="44" viewBox="0 0 46 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <ellipse cx="23.1136" cy="21.5474" rx="22.3402" ry="21.5" fill="#F2DAE9" />
                                                        <g clipPath="url(#clip0_160_72)">
                                                            {/* SVG path for icon */}
                                                        </g>
                                                    </svg>
                                                )}
                                                <div className="flex items-center gap-1">
                                                    <span className="text-md font-light">by</span>
                                                    <h4 className="text-md font-medium">{item?.ownerFirstName}</h4>
                                                </div>
                                            </div>
                                            <div>
                                                <h1 className="text-[#FFBA01] font-bold text-sm tracking-wider m-0">
                                                    {item.currency}{item?.ticket_set_prize
                                                        ? "£" + item?.ticket_price
                                                        : moment(item?.time_set_prize).format("DD-MM-YYYY")}
                                                </h1>
                                            </div>
                                        </div>
                                        <div className="mt-6">
                                            <h3 className="font-medium text-md tracking-wider">{item.raffle_name}</h3>
                                        </div>
                                        <div className="flex items-center justify-between mt-0">
                                            <p className="mt-2 p-1 text-sm tracking-wider font-light">{item?.category}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    ))
                ) : (
                    <div>No expired raffle found</div>
                )}
            </div>

            {/* Pagination Controls */}
            <div className="text-xs lg:text-md text-right mt-4 flex items-center justify-center gap-2 cursor-pointer">
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

                {getPaginationGroup().map((page) => (
                    <span
                        key={page}
                        className={`px-3 py-1 rounded-md border ${page === currentPage ? "border-2 border-[#2d234a] font-bold" : "bg-white cursor-pointer border-[#2d234a] hover:border-[#2d234a]"}`}
                        onClick={() => handlePageClick(page)}
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

export default ExpiredRaffles;
