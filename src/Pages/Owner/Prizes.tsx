import React, { useEffect, useState } from "react";
import OwnerSidebar from "../../Components/Navbar/OwnerSidebar";
import { getRaffle } from "../../Services/Owner/getRaffle";
import {
  getOwnerWinners,
  getSpecificRafflePrize,
} from "../../Services/Owner/getPrize";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { Tabs } from "flowbite-react";
import { CONSTANT_DATA } from "../../constants";
import * as XLSX from "xlsx";
import noimage from "../../assets/no-image-user.png";
import { Link } from "react-router-dom";

const Prizes = () => {
  const data = [1, 2, 3, 43, 4, 56, 34, 232, 5456, 232, 45];

  const [raffleData, setRaffleData] = useState([]);
  const [ownerPrizeDetails, setOwnerPrizeDetails] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [ref2, instanceRef2] = useKeenSlider<HTMLDivElement>({
    loop: false,
    mode: "free-snap",
    slides: {
      // perView: 5,
      perView: "auto",
      spacing: 5,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (loaded) {
      instanceRef2.current?.update();
    }
  }, [loaded, raffleData]);

  const [selectedRaffle, setSelectedRaffle] = useState<any>({});
  const getData = async () => {
    const a = await getOwnerWinners();
    if (a.result.length !== 0) {
      setOwnerPrizeDetails(a.result);
      setSelectedRaffle(a.result[0]);
    }
    setRaffleData(a.result);
  };

  const handleSelectedRaffle = (item: any) => {
    setSelectedRaffle(item);
  };

  // const downloadXLS = (data: any[], filename: string) => {
  //   const worksheet = XLSX.utils.json_to_sheet(data);
  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  //   XLSX.writeFile(workbook, filename);
  // };
  // console.log("Main Winners", raffleData);

  // Function to handle download
  const handleDownloadClick = () => {
    // Use the merchantsData you fetched
    const data = selectedRaffle?.main_prizes?.map((item: any) => {
      return {
        UserName: `${item?.user?.firstname || ''} ${item?.user?.lastname || ''}`.trim() || "N/A",
        Email: item?.user?.email,
        RaffleName: selectedRaffle?.raffle_name, // Check if this logs correctly
        PhoneNumber: item?.user?.phone,
        PrizeName: item?.prize_name,
        PrizeValue: item?.prize_value,
      };
    });
    // Create a worksheet from the merchant data
    const ws = XLSX.utils.json_to_sheet(data);
    // Create a workbook with the worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Winners');

    // Trigger download
    XLSX.writeFile(wb, 'winners.xlsx');
  };

  return (
    <>
      <div className="flex footer-manage" style={{ fontFamily: "poppins, sans-serif" }}>
        <div className="hidden lg:block">
          <OwnerSidebar />
        </div>

        <div
          className={`w-[100%] lg:w-[75%] mx-auto z-10 p-3 lg:p-10 duration-500  `}
        >
          <div className="w-[90%] m-auto">
            {/* <div className="flex justify-center items-center mb-4"> */}
            <div className="flex justify-center items-center mb-4 overflow-hidden">
              <button
                className="mr-2 p-2 border rounded"
                onClick={() => instanceRef2.current?.prev()}
                disabled={currentSlide === 0}
              >
                &lt;
              </button>
              <div ref={ref2} className="keen-slider">

                {raffleData.length > 0 ? (
                  raffleData.map((item: any, i: any) => (
                    <button
                      key={item.uniqueID}
                      onClick={() => handleSelectedRaffle(item)}
                      style={{ minWidth: "300px", minHeight: "120px" }}
                      className={`keen-slider__slide text-sm font-medium  px-12 rounded-md border-2 ${selectedRaffle?.uniqueID === item.uniqueID
                        ? "bg-[#F66E6A] text-white border-black"
                        : "bg-transparent text-[#808080] border-[#808080]"
                        }`}
                    >
                      Raffle {i + 1} ({item.raffle_name})
                    </button>
                  ))
                ) : (
                  <p>No Raffle Found</p>
                )}

              </div>
              <button
                className="ml-2 p-2 border rounded"
                onClick={() => instanceRef2.current?.next()}
              >
                &gt;
              </button>
            </div>

            <div className=" bg-[#F9F0F0] mt-4 rounded-md">
              <Tabs
                className=""
                aria-label="Tabs with underline"
                style="underline"
              >
                <Tabs.Item active title="Main Winners">
                  <div className="lg:flex items-center justify-between px-4">
                    <h4>Winners({selectedRaffle?.main_prizes?.length})</h4>
                    <div>
                      <button
                        onClick={handleDownloadClick} style={{ cursor: "pointer" }}>
                        {" "}
                        <svg
                          className="p-1 bg-white rounded-[100px]"
                          width="45"
                          height="45"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 16L8 12H11V8H13V12H16L12 16Z"
                            fill="black"
                          />
                          <path d="M4 18H20V20H4V18Z" fill="black" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  {selectedRaffle?.main_prizes?.length > 0 ? (
                    selectedRaffle?.main_prizes?.map(
                      (item: any, i: any) => (
                        item.user.firstname ? (<>
                          <div className="hidden lg:block lg:flex items-center justify-between bg-white p-2 rounded-md mt-4">
                            {item?.user?.image ? (
                              <img
                                src={
                                  item
                                    ? CONSTANT_DATA.IMAGE_BASE_URL + item?.user?.image
                                    : noimage
                                }
                                alt={item?.user?.firstname}
                                className="w-12 h-12 rounded-[100%] "
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.onerror = null;
                                  target.src = noimage;
                                }}
                              />
                            ) : (
                              <svg
                                className="rounded-[50px] bg-[#F2DAE9] p-3"
                                width="44"
                                height="43"
                                viewBox="0 0 14 13"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clip-path="url(#clip0_174_416)">
                                  <path
                                    d="M7.01632 6.44307C7.86056 6.44307 8.59161 6.14942 9.18892 5.57005C9.78624 4.99077 10.089 4.28198 10.089 3.46314C10.089 2.64458 9.78624 1.9357 9.18883 1.35623C8.59141 0.77705 7.86046 0.483398 7.01632 0.483398C6.17198 0.483398 5.44113 0.77705 4.84381 1.35633C4.2465 1.93561 3.9436 2.64449 3.9436 3.46314C3.9436 4.28198 4.2465 4.99086 4.84391 5.57014C5.44132 6.14933 6.17227 6.44307 7.01632 6.44307Z"
                                    fill="#232463"
                                  />
                                  <path
                                    d="M12.393 9.99629C12.3758 9.75522 12.341 9.49225 12.2897 9.21455C12.2379 8.93477 12.1712 8.67029 12.0914 8.42855C12.009 8.1787 11.8969 7.93196 11.7583 7.69551C11.6144 7.45009 11.4454 7.23639 11.2558 7.06054C11.0576 6.87657 10.8148 6.72866 10.5341 6.62077C10.2544 6.51345 9.94441 6.45908 9.61281 6.45908C9.48258 6.45908 9.35664 6.5109 9.11341 6.66447C8.96371 6.75915 8.78862 6.86864 8.59318 6.98975C8.42606 7.09301 8.19967 7.18976 7.92004 7.27736C7.64723 7.36297 7.37022 7.40639 7.09682 7.40639C6.82342 7.40639 6.54652 7.36297 6.27341 7.27736C5.99407 7.18986 5.76768 7.0931 5.60076 6.98984C5.40717 6.86987 5.23198 6.76038 5.08004 6.66438C4.83711 6.51081 4.71106 6.45898 4.58084 6.45898C4.24914 6.45898 3.93924 6.51345 3.65961 6.62087C3.3791 6.72857 3.13626 6.87648 2.93781 7.06063C2.7483 7.23658 2.57924 7.45019 2.43558 7.69551C2.29708 7.93196 2.18496 8.1786 2.10242 8.42865C2.02271 8.67038 1.95604 8.93477 1.90426 9.21455C1.85296 9.49187 1.81812 9.75494 1.80089 9.99658C1.78396 10.2333 1.77539 10.479 1.77539 10.7272C1.77539 11.373 1.98708 11.8958 2.40453 12.2814C2.81682 12.6619 3.36236 12.8549 4.02576 12.8549H10.1685C10.8319 12.8549 11.3772 12.662 11.7896 12.2814C12.2071 11.8961 12.4188 11.3732 12.4188 10.7271C12.4187 10.4778 12.4101 10.2319 12.393 9.99629Z"
                                    fill="#232463"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_174_416">
                                    <rect
                                      width="12.7573"
                                      height="12.3721"
                                      fill="white"
                                      transform="translate(0.728516 0.483398)"
                                    />
                                  </clipPath>
                                </defs>
                              </svg>
                            )}

                            <div className="w-[80%]">
                              <table className="w-[100%]">
                                <thead className="border-b-[2px]">
                                  <th className="font-[400] text-[15px]">
                                    Name
                                  </th>
                                  <th className="font-[400] text-[15px]">
                                    Email
                                  </th>

                                  <th className="font-[400] text-[15px]">
                                    Phone number
                                  </th>
                                  <th className="font-[400] text-[15px]">Prize Name</th>
                                  <th className="font-[400] text-[15px]">Prize Value</th>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td className="text-center">
                                      {item?.user?.firstname} {item?.user?.lastname}
                                    </td>
                                    <td className="text-center">
                                      {item?.user?.email}
                                    </td>

                                    <td className="text-center">
                                      {item?.user?.phone}
                                    </td>
                                    <td className="text-center">{item?.prize_name}</td>
                                    <td className="text-center">£{item?.prize_value}</td>

                                  </tr>
                                </tbody>
                              </table>
                            </div>


                            <Link to={`/owner/user/detail/${item.userId}`} className="user-link">
                              <svg
                                className="p-2 bg-white"
                                width="39"
                                height="33"
                                viewBox="0 0 19 13"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clip-path="url(#clip0_174_422)">
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M9.33217 0.693359C5.32099 0.693359 1.89544 3.06225 0.507568 6.40612C1.89544 9.74999 5.32099 12.1189 9.33217 12.1189C13.3434 12.1189 16.7689 9.74999 18.1568 6.40612C16.7689 3.06225 13.3434 0.693359 9.33217 0.693359ZM9.33217 10.2146C7.118 10.2146 5.32099 8.50842 5.32099 6.40612C5.32099 4.30383 7.118 2.59761 9.33217 2.59761C11.5463 2.59761 13.3434 4.30383 13.3434 6.40612C13.3434 8.50842 11.5463 10.2146 9.33217 10.2146ZM9.33217 4.12102C8.00046 4.12102 6.92546 5.1417 6.92546 6.40612C6.92546 7.67055 8.00046 8.69123 9.33217 8.69123C10.6639 8.69123 11.7389 7.67055 11.7389 6.40612C11.7389 5.1417 10.6639 4.12102 9.33217 4.12102Z"
                                    fill="#A4A4A4"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_174_422">
                                    <rect
                                      width="17.6492"
                                      height="12.1872"
                                      fill="white"
                                      transform="translate(0.507568 0.3125)"
                                    />
                                  </clipPath>
                                </defs>
                              </svg>
                            </Link>
                          </div>
                          <div className="block lg:hidden flex items-center justify-between bg-white p-2 rounded-md mt-4">
                            <svg
                              className="rounded-[50px] bg-[#F2DAE9] p-3"
                              width="44"
                              height="43"
                              viewBox="0 0 14 13"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clip-path="url(#clip0_174_416)">
                                <path
                                  d="M7.01632 6.44307C7.86056 6.44307 8.59161 6.14942 9.18892 5.57005C9.78624 4.99077 10.089 4.28198 10.089 3.46314C10.089 2.64458 9.78624 1.9357 9.18883 1.35623C8.59141 0.77705 7.86046 0.483398 7.01632 0.483398C6.17198 0.483398 5.44113 0.77705 4.84381 1.35633C4.2465 1.93561 3.9436 2.64449 3.9436 3.46314C3.9436 4.28198 4.2465 4.99086 4.84391 5.57014C5.44132 6.14933 6.17227 6.44307 7.01632 6.44307Z"
                                  fill="#232463"
                                />
                                <path
                                  d="M12.393 9.99629C12.3758 9.75522 12.341 9.49225 12.2897 9.21455C12.2379 8.93477 12.1712 8.67029 12.0914 8.42855C12.009 8.1787 11.8969 7.93196 11.7583 7.69551C11.6144 7.45009 11.4454 7.23639 11.2558 7.06054C11.0576 6.87657 10.8148 6.72866 10.5341 6.62077C10.2544 6.51345 9.94441 6.45908 9.61281 6.45908C9.48258 6.45908 9.35664 6.5109 9.11341 6.66447C8.96371 6.75915 8.78862 6.86864 8.59318 6.98975C8.42606 7.09301 8.19967 7.18976 7.92004 7.27736C7.64723 7.36297 7.37022 7.40639 7.09682 7.40639C6.82342 7.40639 6.54652 7.36297 6.27341 7.27736C5.99407 7.18986 5.76768 7.0931 5.60076 6.98984C5.40717 6.86987 5.23198 6.76038 5.08004 6.66438C4.83711 6.51081 4.71106 6.45898 4.58084 6.45898C4.24914 6.45898 3.93924 6.51345 3.65961 6.62087C3.3791 6.72857 3.13626 6.87648 2.93781 7.06063C2.7483 7.23658 2.57924 7.45019 2.43558 7.69551C2.29708 7.93196 2.18496 8.1786 2.10242 8.42865C2.02271 8.67038 1.95604 8.93477 1.90426 9.21455C1.85296 9.49187 1.81812 9.75494 1.80089 9.99658C1.78396 10.2333 1.77539 10.479 1.77539 10.7272C1.77539 11.373 1.98708 11.8958 2.40453 12.2814C2.81682 12.6619 3.36236 12.8549 4.02576 12.8549H10.1685C10.8319 12.8549 11.3772 12.662 11.7896 12.2814C12.2071 11.8961 12.4188 11.3732 12.4188 10.7271C12.4187 10.4778 12.4101 10.2319 12.393 9.99629Z"
                                  fill="#232463"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_174_416">
                                  <rect
                                    width="12.7573"
                                    height="12.3721"
                                    fill="white"
                                    transform="translate(0.728516 0.483398)"
                                  />
                                </clipPath>
                              </defs>
                            </svg>
                            <div className="w-[100%]">
                              <table className="w-[100%]">
                                <thead className="border-b-[2px]">
                                  <th className="font-[400] text-[10px]">
                                    Name
                                  </th>
                                  <th className="font-[400] text-[10px]">
                                    Email
                                  </th>
                                  <th className="font-[400] text-[15px]">Prize Name</th>
                                  <th className="font-[400] text-[15px]">Prize Value</th>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td className="text-center text-[10px]">
                                      {item?.user?.firstname} {item?.user?.lastname}
                                    </td>
                                    <td className="text-center text-[10px]">
                                      {item?.user?.email}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <br />
                              <table className="w-[100%]">
                                <thead className="border-b-[2px]">

                                  <th className="font-[400] text-[10px]">
                                    Phone number
                                  </th>
                                </thead>
                                <tbody>
                                  <tr>

                                    <td className="text-center text-[10px]">
                                      {item?.user?.phone}
                                    </td>
                                    <td className="text-center">{item?.prize_name}</td>
                                    <td className="text-center">£{item?.prize_value}</td>

                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            <a href={`/owner/user/detail/${item.userId}`} className="user-link">
                              <svg
                                className="p-2 bg-white"
                                width="39"
                                height="33"
                                viewBox="0 0 19 13"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clip-path="url(#clip0_174_422)">
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M9.33217 0.693359C5.32099 0.693359 1.89544 3.06225 0.507568 6.40612C1.89544 9.74999 5.32099 12.1189 9.33217 12.1189C13.3434 12.1189 16.7689 9.74999 18.1568 6.40612C16.7689 3.06225 13.3434 0.693359 9.33217 0.693359ZM9.33217 10.2146C7.118 10.2146 5.32099 8.50842 5.32099 6.40612C5.32099 4.30383 7.118 2.59761 9.33217 2.59761C11.5463 2.59761 13.3434 4.30383 13.3434 6.40612C13.3434 8.50842 11.5463 10.2146 9.33217 10.2146ZM9.33217 4.12102C8.00046 4.12102 6.92546 5.1417 6.92546 6.40612C6.92546 7.67055 8.00046 8.69123 9.33217 8.69123C10.6639 8.69123 11.7389 7.67055 11.7389 6.40612C11.7389 5.1417 10.6639 4.12102 9.33217 4.12102Z"
                                    fill="#A4A4A4"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_174_422">
                                    <rect
                                      width="17.6492"
                                      height="12.1872"
                                      fill="white"
                                      transform="translate(0.507568 0.3125)"
                                    />
                                  </clipPath>
                                </defs>
                              </svg>
                            </a>
                          </div>
                        </>) : (<></>)
                      )
                    )
                  ) : (
                    <p className="text-center my-12">No Data Found !</p>
                  )}
                </Tabs.Item>
              </Tabs>
            </div>
          </div>
        </div>
      </div >
    </>
  );
};

export default Prizes;
