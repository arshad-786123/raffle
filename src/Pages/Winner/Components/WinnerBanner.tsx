import CompanyCarousel from "@/Components/newDesign/CompanyCarousel/CompanyCarousel"
import Mobile_Banner from "@/assets/homepage/new_banner.png"
import BannerImage from "@/assets/winner/Banner.png"
import Frame10 from "@/assets/winner/Frame10.svg"
import lifestyle from "@/assets/homepage/explore/lifestyle.png"
import { useEffect, useState } from "react"
import { getWinnersUserList } from "@/Services/Owner/getPrize"
import { CONSTANT_DATA } from "@/constants"
import noimage from "../../../assets/no-image.png";
import { useNavigate } from "react-router-dom"
import HeroImage from "@/assets/winnerBanner.jpg";
import mobileImage from "@/assets/winnerspagemobilebanner.jpg";
import HeroSection from "@/Components/HeroSection/HeroSection"
import image from "@/assets/racategale.png";

const WinnerBanner = () => {
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
    <>

      <HeroSection
        leftImage={image}
        rightImage={HeroImage}
        mobileImage={HeroImage}>
        <div className="flex flex-col w-full lg:w-[49%] md:w-[74%] h-auto lg:h-full lg:justify-center ">


          <p className="lg:text-[12px] text-[8px] lg:leading-[16.8px] leading-[14px] tracking-[10%] font-modernRegular uppercase">
            🎉 Big Wins, Big Smiles
          </p>
          <h1 className="lg:text-[64px] text-[28px] font-modernBold font-bold lg:leading-[67.2px] leading-[33.6px] tracking-[-2%] mb-4 banner-text-small">
            Raffily{" "}
            <span className="bg-gradient-to-b from-[#FF7385] via-[#FD98E8] to-[#AD6FFF] bg-clip-text text-transparent">
              Winners’ Club
            </span>
          </h1>
          <p className="lg:text-[16px] text-[12px] lg:leading-[20px] leading-[22.4px] tracking-[-2%] lg:mb-0 mb-4 !text-start">
            Welcome to our Raffily Winners’ Club, where we celebrate the
            amazing individuals who have turned their dreams into reality!
            Each winner here started with a simple decision: to take a
            chance and enter. Now, they are enjoying incredible rewards from
            trusted brands, and you can too!
            <br className="xl:block hidden" />
          </p>
          <div className="border-b border-gray-300 my-4"></div>
          <p className="text-[16px] font-modernBold max-w-[471px] bg-custom-gradient bg-clip-text text-transparent mb-2">
            Your name could be here soon!
          </p>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex -space-x-4 rtl:space-x-reverse">
              {userImages.length > 0 &&
                userImages
                  .flat()
                  .filter((image) => image && image.trim() !== "")
                  .slice(0, 4)
                  .map((image, index) => (
                    <img
                      key={index}
                      className="md:w-10 w-7 md:h-10 h-7 border-2 border-[#110044] rounded-full dark:border-gray-800"
                      src={`${CONSTANT_DATA.IMAGE_BASE_URL}${image}`}
                      alt={`Winner ${index}`}
                    />
                  ))}
            </div>
            <p className="lg:text-[14px] text-[10px] lg:leading-[19.6px] leading-[16.8px] tracking-[-2%] text-white opacity-[60%]">
              See what our winners have to say
            </p>
          </div>
          <p className="text-[16px] font-modernBold max-w-[471px] bg-custom-gradient bg-clip-text text-transparent mb-4">
            Change your story…
          </p>
          <button
            className="bg-white text-black font-bold py-2 px-4 rounded lg:w-fit w-full  lg:mb-0 font-modernBold hover:bg-gray-200"
            onClick={handleNavigate}
          >
            Enter now
          </button>
        </div>

      </HeroSection>
      {/* <div className="fixed-mobile-view winner">
        <div
          className="relative z-10 bg-[#110044] text-white flex flex-wrap lg:flex-nowrap justify-between items-center overflow-hidden pl-0 "
        >
          <img
            src={HeroImage}
            alt="Hero"
            className="w-full object-cover z-0 hidden lg:block md:block"
          />

          <div
            className=" bg-cover bg-no-repeat w-full h-[750px] lg:hidden"
            style={{
              backgroundImage: `url(${mobileImage})`, // Dynamically setting mobile background
            }}
          />

          <div className="absolute top-0 lg:px-24 w-full lg:w-[587px] max-w-full order-2 lg:order-1 lg:clip-path-none lg:clip-path-mobile   bottom-0  flex items-center justify-start p-4 h-auto">
            <div className="absolute bottom-[9px] lg:bottom-auto lg:top-1/2 lg:transform lg:-translate-y-1/2 text-center lg:text-left winner-banner">
            
            </div>
          </div>
        </div>
        <div className="w-full h-[114px]">
          <CompanyCarousel />
        </div>
      </div> */}
    </>
  );
}

export default WinnerBanner
