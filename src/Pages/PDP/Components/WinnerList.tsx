import React, { useEffect, useState } from "react";
import user1 from "../../../assets/winner/Ellipse45.svg";
import user2 from "../../../assets/winner/Ellipse57.svg";
import { IRaffle } from "@/Services/Raffle/listRaffle";
import { initialFormData } from "@/Pages/Owner/Create";
import { specificRaffleNull } from "@/Services/Owner/getRaffle";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getUserPurchasedRaffle } from "@/Services/Authentication/getUserPurchasedRaffle";
import { API_ENDPOINTS, CONSTANT_DATA } from "@/constants";
import noimage from "../../../assets/no-image.png";

const WinnerList = () => {

  const [raffleData, setRaffleData] = useState<any>(initialFormData);
  const [raffleSold, setRaffleSold] = useState<any>();
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState({ data: null, index: 0 });
  type MediaItem = {
    data: string | null;
    index: number | null;
  };
  const [selectedVideo, setSelectedVideo] = useState<MediaItem>({
    data: null,
    index: null,
  });

  const { state, pathname } = useLocation();
  const { id, uniqueID } = useParams();


  useEffect(() => {
    if (uniqueID) {

      getUserType(); // Proceed if ID is valid
    } else {
      console.log("No Raffle ID found in URL!");
      // Optionally handle invalid state or navigate elsewhere
    }
  }, [uniqueID]);

  useEffect(() => {
    if (raffleData?.uniqueID) {

      getData();
    }
  }, [raffleData]);

  const winners = [
    {
      name: "Ben Govier",
      prize: "48-hours Carp Fishing at Clearwater Fisheries",
      value: "£100",
      date: "24/9/24",
      ticketNumber: "xxxx3658",
      avatar: user1,
    },
    {
      name: "Emily James",
      prize: "48-hours Carp Fishing at Clearwater Fisheries",
      value: "£46",
      date: "30/8/27",
      ticketNumber: "xxxx8493",
      avatar: user2,
    },
  ];

  const navigate = useNavigate();

  const getUserType = async () => {
    const getID = window.location.pathname;
    const ID = getID.split("/")[getID.split("/")?.length - 1];

    try {
      const type = await specificRaffleNull(ID);
      if (!type.success) {
        navigate("/");
      } else {
        if (type.result) {
          const imageItems = type.result.images.map((image: any) => ({
            original: CONSTANT_DATA.BASE_URL + image,
            thumbnail: CONSTANT_DATA.BASE_URL + image,
          }));
          setSelectedImage({ data: type.result?.images[0], index: 0 });
          setSelectedVideo({ data: type.result?.videos[0], index: 0 });

          setImages(imageItems);
          setSelectedImage({ data: type.result.images[0], index: 0 });
          setRaffleData(type.result);
        } else {
          // Handle case where type.result is null or undefined
        }
      }
    } catch (error) {
      console.error("Error fetching raffle data:", error);
      // Handle error (e.g., show error message)
    }
  };


  const getData = async () => {
    try {
      if (raffleData?._id) {
        const result = await getUserPurchasedRaffle(
          `${API_ENDPOINTS.SOLDOUT_RAFFLE}${raffleData._id}`
        );

        if (
          result &&
          result.success &&
          result.result &&
          result.result.length > 0
        ) {
          setRaffleSold(result.result[0]); // Update raffleSold with the first item in the result array
        } else {
          console.log("No purchased raffle found or API result format error.");
          // Optionally handle case where result is empty or format is unexpected
          // setRaffleSold(null);
        }
      } else {
        console.log("raffleData._id is not defined.");
        // Optionally handle case where raffleData._id is not defined
        // setRaffleSold(null);
      }
    } catch (error) {
      console.error("Error fetching purchased raffle:", error);
      // Optionally handle error (e.g., show error message, set raffleSold to null)
      // setRaffleSold(null);
    }
  };

  useEffect(() => {
    getUserType();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    getUserType();
  }, []);

  useEffect(() => {
    if (raffleData) {
      getData();
    }
  }, [raffleData]);

  const endDate = new Date(raffleData.cronTime); // Using 'cronTime' as an example

  // Format the date
  const formattedDate = endDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });


  return (
    <>
      <main className="bg-white py-8">
        <section className="container-fluid mx-auto px-4 lg:px-10">
          <div className="border border-gray-300 rounded-lg p-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[18px] sm:text-[24px] leading-[23.8px] sm:leading-[31.2px] font-modernBold">Winner</h2>
            </div>

            {/* Table Wrapper for Scroll */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="text-[14px] border-t-2 border-b-2 border-gray-300">
                  <tr className="border-b opacity-60">
                    <th className="text-left p-4 sm:p-3 font-medium">Winner Name</th>
                    <th className="text-left p-4 sm:p-3 font-medium">Prize Name</th>
                    <th className="text-left p-4 sm:p-3 font-medium">Prize Value</th>
                    <th className="text-left p-4 sm:p-3 font-medium">Date</th>
                    <th className="text-left p-4 sm:p-3 font-medium hidden sm:table-cell">
                      Ticket Number
                    </th>
                  </tr>
                </thead>
                <tbody className="text-[13px] sm:text-[16px] font-semibold">
                  {raffleData.main_prizes &&
                    raffleData.main_prizes.map((prize: any, index: any) => (
                      <React.Fragment key={index}>
                        {/* Main Row */}
                        <tr className="border-b border-gray-300">
                          <td className="p-4 sm:p-3 flex items-center">
                            <div>
                              <p className="text-[12px] sm:text-[16px] leading-5">
                                {prize.firstname} {prize.lastname}
                              </p>
                            </div>
                          </td>
                          <td className="p-4 sm:p-3">
                            <p className="truncate">{prize.prize_name}</p>
                          </td>
                          <td className="p-4 sm:p-3">£{prize.prize_value}</td>
                          <td className="p-4 sm:p-3">{formattedDate}</td>
                          <td className="p-4 sm:p-3 hidden sm:table-cell">
                            {prize.ticketID}
                          </td>
                        </tr>

                        {/* Ticket Number for Mobile */}
                        <tr className="sm:hidden border-b border-gray-300">
                          <td colSpan={4} className="p-4 text-gray-700">
                            <div className="flex justify-between">
                              <span className="font-medium text-[12px]">Ticket Number:</span>
                              <span className="text-black text-[12px]">{prize.ticketID}</span>
                            </div>
                          </td>
                        </tr>
                      </React.Fragment>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>




    </>
  );
};

export default WinnerList;
