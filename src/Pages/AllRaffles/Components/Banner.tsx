import BannerImage from "@/assets/about_us/banner.png";
import HeroImage from "@/assets/allRaffleBanner.jpg";
import HeroSection from "@/Components/HeroSection/HeroSection";
import mobileImage from "@/assets/all-raffle-bg-mob.jpg";
import image from "@/assets/racategale.png";


const AboutBanner = () => {
  return (
    <>


      <HeroSection
        leftImage={image}
        rightImage={HeroImage}
        mobileImage={HeroImage}>
        <div className="flex flex-col w-full lg:w-[40%] h-auto lg:h-full lg:justify-center  md:w-[58%]">

          <h1 className="lg:text-[64px] text-[32px] font-modernBold font-bold lg:leading-[67.2px] leading-[33.6px] tracking-[-2%] ">
            Explore <br className="hidden lg:block" />
            <span className="bg-gradient-to-b from-[#FF7385] via-[#FD98E8] to-[#AD6FFF] bg-clip-text text-transparent">
              all <br className="block lg:hidden" /> raffles
            </span>
          </h1>
          <p className="mt-4 lg:text-[14px] text-[12px] font-modernRegular lg:leading-[19.6px] leading-[16.8px]">
            Discover raffles across various categories and find amazing prizes from trusted brands.
          </p>
        </div>
      </HeroSection>

      {/* <div className="fixed-mobile-view all-raffle">
        <div
          className="relative z-10 bg-[#110044] text-white flex flex-wrap lg:flex-nowrap justify-between items-center overflow-hidden pl-0  "
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
            <div className="absolute bottom-[130px] lg:bottom-auto lg:top-1/2 lg:transform lg:-translate-y-1/2 text-center lg:text-left about-banner">
             
            </div>
          </div>
        </div>
      </div> */}


    </>
  );
};

export default AboutBanner;
