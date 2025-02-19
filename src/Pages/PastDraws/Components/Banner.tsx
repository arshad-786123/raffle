import CompanyCarousel from "@/Components/newDesign/CompanyCarousel/CompanyCarousel"
import Mobile_Banner from "@/assets/homepage/new_banner.png"
import BannerImage from "@/assets/past_draws/banner.png"
import ticket from "@/assets/past_draws/ticket.png"
import Frame10 from "@/assets/winner/Frame10.svg"
import { useNavigate } from "react-router-dom"
import HeroImage from "@/assets/pastDrow.jpg";
import mobileImage from "@/assets/pastdrawbgmob.jpg";
import HeroSection from "@/Components/HeroSection/HeroSection"
import image from "@/assets/racategale.png";

const AboutBanner = () => {

  const navigate = useNavigate(); // Initialize the navigate function

  const handleNavigate = () => {
    navigate("/winners"); // Replace with the path you want to navigate to
  };
  return (
    <>

      <HeroSection
        leftImage={image}
        rightImage={HeroImage}
        mobileImage={HeroImage}>
        <div className="flex flex-col w-full lg:w-[40%] md:w-[74%] h-auto lg:h-full lg:justify-center ">

          <div className="flex items-start gap-2 lg:mb-0 mb-2">
            <img src={ticket} alt="ticket" />
            <p className="lg:text-[12px] text-[8px] lg:leading-[16.8px] leading-[12px] tracking-[1px] font-modernRegular uppercase">
              Past draws
            </p>
          </div>
          <h1 className="lg:text-[64px] text-[24px] font-modernBold font-bold lg:leading-[67.2px] leading-[28px] tracking-[-2%] mb-4 banner-text-small">
            Discover the results of{" "}
            <span className="bg-gradient-to-b from-[#FF7385] via-[#FD98E8] to-[#AD6FFF] bg-clip-text text-transparent">
              Raffily’s Draws!
            </span>
          </h1>
          <p className="lg:text-[14px] text-[10px] lg:leading-[19.6px] leading-[14px] tracking-[-2%] lg:mb-0 mb-4 !text-start">
            Check out the results of past raffles, see who won, and get
            inspired to enter the next exciting draw. Your chance to win
            could be next!
            <br className="xl:block hidden" />
          </p>
          <div className="border-b border-white opacity-[20%] my-4"></div>
          <p className="lg:text-[18px] text-[10px] lg:leading-[20px] leading-[14px] font-modernBold bg-custom-gradient bg-clip-text text-transparent mb-4">
            Visit our Raffily Winners’ Club page to discover the inspiring
            success stories of our recent winners
          </p>
          <button
            className="bg-white text-black font-bold py-2 px-4 rounded lg:w-fit w-full lg:mb-0 font-modernBold hover:bg-gray-200"
            onClick={handleNavigate}
          >
            See winners
          </button>
        </div>
      </HeroSection>
      {/* <div className="fixed-mobile-view past-drow">
        <div
          className="relative z-10 bg-[#110044] text-white flex flex-wrap lg:flex-nowrap justify-between items-center overflow-hidden pl-0"

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
            <div className="absolute bottom-[43px] lg:bottom-auto lg:top-1/2 lg:transform lg:-translate-y-1/2 lg:text-left pastdrow-banner">
             
            </div>
          </div>
        </div>
      </div> */}

    </>
  );
}

export default AboutBanner
