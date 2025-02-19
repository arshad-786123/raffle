import TwoMen from "@/assets/winner/twoMen.png"
import { Button } from "@/Components/ui/button"
import { ArrowRight, Gift } from "lucide-react"
import lifestyle from "../../assets/homepage/explore/lifestyle.png"
// import ShieldIcon from "@/assets/homepage/ShieldCheck.svg";
import GiftImage from "@/assets/homepage/winningTickets/Gift.svg"
import Command from "@/assets/winner/Command.svg"
import Medal from "@/assets/winner/Medal.svg"
import Confetti from "@/assets/winner/Confetti.svg"
import UsersThree from "@/assets/winner/UsersThree.svg"
import RaffleTick from "@/assets/winner/ShieldCheck.svg"
import { useEffect, useState } from "react"
import { getWinnersUserList } from "@/Services/Owner/getPrize"
import { CONSTANT_DATA } from "@/constants"
import { useNavigate } from "react-router-dom"

const details = [
  {
    icon: GiftImage,
    title: "Exciting Prizes",
    description:
      "From luxurious getaways to the latest gadgets, our prizes are designed to thrill!"
  },
  {
    icon: Medal,
    title: "Trusted Brands",
    description:
      "Assurance of quality from Raffily with the opportunity to win prizes from trusted brands that you know & love!"
  },
  {
    icon: Confetti,
    title: "Simple and Fun",
    description:
      "Participating in Raffily is easy and a fun way to try your luck!"
  },

  {
    icon: UsersThree,
    title: "Real Winners",
    description:
      "Join a vibrant community that celebrates success and be a part of the excitement!"
  },
  {
    icon: Command,
    title: "Fair Raffle Process",
    description:
      "Raffily operates a fair raffle process to give everyone a level playing field when it comes to winning exciting prizes!"
  }
]

const RaffilyStandard = () => {


  const [userImages, setUserImages] = useState<string[][]>([]);
  const [totalRaffles, setTotalRaffles] = useState<number>(8); // State to store totalRaffles
  console.log("Total", totalRaffles)

  useEffect(() => {
    // Fetch user images dynamically
    const fetchUserImages = async () => {
      const response = await getWinnersUserList(1, totalRaffles); // Fetch data with page 1 and dynamic limit based on totalRaffles
      console.log("response", response)
      if (response?.result) {
        setUserImages(response.result); // Update state with the fetched images
        setTotalRaffles(response.totalRaffles); // Update totalRaffles state
      }
    };

    fetchUserImages(); // Call the function to fetch images
  }, [totalRaffles]); // Trigger re-fetch if totalRaffles changes

  const navigate = useNavigate(); // Initialize the navigate function

  const handleNavigate = () => {
    navigate("/all-raffles"); // Replace with the path you want to navigate to
  };


  return (
    // <div className="w-100 min-h-[700px] bg-raffles-blue mb-4 flex lg:flex-row flex-col lg:justify-normal justify-between">
    //   <div className="lg:w-1/2 w-full pb-14">
    //     <div className="lg:pl-[112px] pl-8 lg:pr-0 pr-8 pt-16 w-full">
    //       <div className="flex">
    //         <img src={RaffleTick} className="md:size-9 size-8 mr-2" alt="" />
    //         <h1 className="md:text-[40px] text-[28px] md:leading-[42px] leading-[29.4px] font-modernBold bg-gradient-to-l from-[#FF7385] to-[#FD98E8]  bg-clip-text text-transparent" style={{ fontFamily: 'ModernEraBold' }}>
    //           The Raffily Standard
    //         </h1>
    //       </div>
    //       <h1 className="md:text-[40px] text-[28px] md:leading-[42px] leading-[29.4px] font-modernBold text-white mb-4">
    //         - Raffles you can trust
    //       </h1>
    //       <h4 className="md:text-[22px] text-[18px] md:leading-[30.8px] leading-[25.2px] text-white mb-8 md:text-start text-center">
    //         With every raffle, there's a chance to win something amazing!{" "}
    //       </h4>
    //       <div className="flex items-center md:justify-start justify-center gap-y-2 md:gap-x-8 gap-x-4 flex-wrap w-full md:mb-0 mb-8">
    //         {Array(5)
    //           .fill("")
    //           .map((_, index) => (
    //             <div
    //             key={index}
    //             className="text-white flex flex-col md:items-start items-center justify-center md:size-[200px] size-[170px]"
    //           >
    //             <div className="inset-0 bg-gradient-to-r from-[#AD6FFF] via-[#FD98E8] to-[#FF7385] rounded-full p-[2.5px] md:size-14 size-12 mb-4">
    //               {/* Inner content */}
    //               <div className="bg-[#280E51] w-full h-full rounded-full flex items-center justify-center">
    //                 <img src={GiftImage} alt="" className="md:size-6 size-5" />
    //               </div>
    //             </div>
    //             <h5 className="text-[16px] leading-[19.2px] font-extrabold font-modernExtraBold mb-2 md:text-start text-center">
    //               Exciting Prizes
    //             </h5>
    //             <p className="text-[12px] leading-[16.8px] font-[500] md:text-start text-center">
    //               From luxury items to once-in-a-lifetime experiences, our raffles
    //               feature a wide range of prizes
    //             </p>
    //           </div>
    //           ))}
    //       </div>
    //       <Button size="lg" variant="secondary" className="bg-white text-black md:w-fit w-full">
    //         Enter
    //       </Button>
    //     </div>
    //   </div>
    //   <div className="lg:w-1/2 w-full relative flex items-end justify-end">
    //     <div className="flex w-full lg:items-end items-center lg:justify-end justify-center">
    //       <div className="lg:w-[700px] w-full lg:h-[606px] h-full relative">
    //         <img src={TwoMen} alt="" className="w-full h-full" />
    //         <div className="absolute flex flex-col bottom-8 px-10 w-full">
    //           <div className="md:w-[163px] w-[109px] md:h-[70px] h-[41px] flex items-center justify-between bg-white border-2 border-white md:rounded-[12px] rounded-[6px] p-4 self-end mb-8">
    //             <p className="md:text-[16px] text-[10px] leading-[10px] md:leading-[18px]  font-bold font-modernBold">
    //               Enter a raffle
    //             </p>
    //             <div className="md:w-11 w-6 md:h-11 h-6">
    //               <Button
    //                 size="icon"
    //                 className="bg-custom-gradient md:w-11 w-6 md:h-11 h-6"
    //               >
    //                 <ArrowRight className="md:!w-6 md:!h-6 !w-3 !h-3" />
    //               </Button>
    //             </div>
    //           </div>
    //           <div className="md:w-[190px] w-[127px] md:h-[54px] h-[36px] flex items-center justify-between bg-white border-white border-2 md:rounded-[12px] rounded-[6px] p-2 mb-8">
    //             <div className="md:w-11 w-6 md:h-11 h-6">
    //               <Button
    //                 size="icon"
    //                 className="bg-custom-gradient md:w-11 w-5 md:h-11 h-5"
    //               >
    //                 <Gift className="md:!w-6 md:!h-6 !w-3 !h-3" />
    //               </Button>
    //             </div>
    //             <p className="md:text-[16px] text-[10px] leading-[10px] md:leading-[18px]  font-bold font-modernBold">
    //               Exciting Prizes
    //             </p>
    //           </div>
    //           <div className="md:w-[342px] w-[212px] md:h-[82px] h-[49px] flex items-center justify-around bg-white border-white border-2 md:rounded-[12px] rounded-[6px] p-2 self-center">
    //             <div className="">
    //               <div className="flex -space-x-4 rtl:space-x-reverse">
    //                 <img
    //                   className="md:w-10 w-7 md:h-10 h-7 border-2 border-white rounded-full dark:border-gray-800"
    //                   src={lifestyle}
    //                   alt=""
    //                 />
    //                 <img
    //                   className="md:w-10 w-7 md:h-10 h-7 border-2 border-white rounded-full dark:border-gray-800"
    //                   src={lifestyle}
    //                   alt=""
    //                 />
    //                 <img
    //                   className="md:w-10 w-7 md:h-10 h-7 border-2 border-white rounded-full dark:border-gray-800"
    //                   src={lifestyle}
    //                   alt=""
    //                 />
    //                 <img
    //                   className="md:w-10 w-7 md:h-10 h-7 border-2 border-white rounded-full dark:border-gray-800"
    //                   src={lifestyle}
    //                   alt=""
    //                 />
    //                 <img
    //                   className="md:w-10 w-7 md:h-10 h-7 border-2 border-white rounded-full dark:border-gray-800"
    //                   src={lifestyle}
    //                   alt=""
    //                 />
    //               </div>
    //             </div>
    //             <div className="w-px bg-[#00000033] h-full"></div>
    //             <div className="">
    //               <h5 className="md:text-[22px] text-[12px] leading-[14.4px] md:leading-[26.4px] font-bold font-modernBold text-[#2C1155]">
    //                 10K+
    //               </h5>
    //               <p className="md:text-[16px] text-[10px] leading-[10px] md:leading-[16px] font-bold font-modernBold">
    //                 Prize Winners
    //               </p>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="w-full bg-raffles-blue mb-4 flex lg:flex-row flex-col lg:justify-normal justify-between">
      <div className="lg:w-1/2 w-full pb-14">
        <div className="lg:pl-16 pl-8 lg:pr-0 pr-8 pt-16 w-full">
          <div className="flex md:items-start items-center md:justify-start justify-center">
            <img src={RaffleTick} className="md:size-9 size-8 mr-2" alt="" />
            <h1
              className="md:text-[40px] text-[28px] md:leading-[42px] leading-[29.4px] font-modernBold bg-gradient-to-l from-[#FF7385] to-[#FD98E8] bg-clip-text text-transparent"
              style={{ fontFamily: "ModernEraBold" }}
            >
              The Raffily Standard
            </h1>
          </div>
          <h1 className="md:text-[40px] text-[28px] md:leading-[42px] leading-[29.4px] font-modernBold text-white mb-4 md:text-start text-center">
            - Raffles you can trust
          </h1>
          <h4 className="md:text-[22px] text-[18px] md:leading-[30.8px] leading-[25.2px] text-white mb-8 md:text-start text-center">
            With every raffle, there's a chance to win something amazing!{" "}
          </h4>
          <div className="grid md:grid-cols-3 grid-cols-2 gap-8 w-full mb-8 place-items-center justify-items-center items-center">
            {[
              ...details.map((item, index) => (
                <div
                  key={`first-row-${index}`}
                  className={`text-white flex flex-col md:items-start items-center justify-center w-full ${index === details.length - 1
                    ? "md:col-span-1 col-span-2"
                    : ""
                    }`}
                >
                  <div className="inset-0 bg-gradient-to-r from-[#AD6FFF] via-[#FD98E8] to-[#FF7385] rounded-full p-[2.5px] md:size-14 size-12 mb-4">
                    <div className="bg-[#280E51] w-full h-full rounded-full flex items-center justify-center">
                      <img
                        src={item.icon}
                        alt=""
                        className="md:size-6 size-5"
                      />
                    </div>
                  </div>
                  <h5 className="text-[16px] leading-[19.2px] font-extrabold font-modernExtraBold mb-2 md:text-start text-center">
                    {item.title}
                  </h5>
                  <p className="text-[12px] leading-[16.8px] font-[500] md:text-start text-center md:max-w-full max-w-[175px]">
                    {item.description}
                  </p>
                </div>
              ))
            ]}
          </div>
          <Button
            size="lg"
            variant="secondary"
            className="bg-white text-black w-full px-[22px] py-[17px] md:w-[114px] h-[45px] md:text-[16px] text-[14px] md:leading-[16px] leading-[14px] font-modernBold" onClick={handleNavigate}
          >
            Enter
          </Button>
        </div>
      </div>
      <div className="lg:w-1/2 w-full relative flex items-end justify-end">
        <div className="flex w-full lg:items-end items-center lg:justify-end justify-center">
          <div className="lg:max-w-[700px] lg:w-[700px] max-w-[500px] w-full lg:max-h-[606px] max-h-[486px] h-full relative">
            <img src={TwoMen} alt="" className="w-full h-full" />
            <div className="absolute flex flex-col bottom-8 px-10 w-full">
              <div className="md:w-[163px] w-[109px] md:h-[70px] h-[41px] flex items-center justify-between bg-white border-2 border-white md:rounded-[12px] rounded-[6px] p-4 self-end mb-8">
                <p className="md:text-[16px] text-[10px] leading-[10px] md:leading-[18px] font-bold font-modernBold">
                  Enter a raffle
                </p>
                <div className="md:w-11 w-6 md:h-11 h-6">
                  <Button
                    size="icon"
                    className="bg-custom-gradient md:w-11 w-6 md:h-11 h-6"
                  >
                    <ArrowRight className="md:!w-6 md:!h-6 !w-3 !h-3" />
                  </Button>
                </div>
              </div>
              <div className="md:w-[190px] w-[127px] md:h-[54px] h-[36px] flex items-center justify-between bg-white border-white border-2 md:rounded-[12px] rounded-[6px] p-2 mb-8">
                <div className="md:w-11 w-6 md:h-11 h-6">
                  <Button
                    size="icon"
                    className="bg-custom-gradient md:w-11 w-5 md:h-11 h-5"
                  >
                    <Gift className="md:!w-6 md:!h-6 !w-3 !h-3" />
                  </Button>
                </div>
                <p className="md:text-[16px] text-[10px] leading-[10px] md:leading-[18px] font-bold font-modernBold">
                  Exciting Prizes
                </p>
              </div>
              <div className="md:w-[342px] w-[212px] md:h-[82px] h-[49px] flex items-center justify-around bg-white border-white border-2 md:rounded-[12px] rounded-[6px] p-2 self-center">
                <div className="">
                  <div className="flex -space-x-4 rtl:space-x-reverse">
                    {userImages.length > 0 &&
                      userImages
                        .flat() // Flatten the array to get a single list of images
                        .filter((image) => image && image.trim() !== "") // Filter out invalid images (null, empty strings, etc.)
                        .slice(0, 4) // Get only the first 4 valid images
                        .map((image, index) => (
                          <img
                            key={index}
                            className="md:w-10 w-7 md:h-10 h-7 border-2 border-[#110044] rounded-full dark:border-gray-800"
                            src={`${CONSTANT_DATA.BASE_URL}${image}`}
                            alt={`Winner ${index}`}
                          />
                        ))}
                  </div>
                </div>
                <div className="w-px bg-[#00000033] h-full"></div>
                <div className="">
                  <h5 className="md:text-[22px] text-[12px] leading-[14.4px] md:leading-[26.4px] font-bold font-modernBold text-[#2C1155]">
                    10K+
                  </h5>
                  <p className="md:text-[16px] text-[10px] leading-[10px] md:leading-[16px] font-bold font-modernBold">
                    Prize Winners
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default RaffilyStandard
