import BannerImage from "@/assets/about_us/aboutimage.png";
import bannerHeading from "@/assets/about_us/bannerHeading.png";
import HeroImage from "@/assets/aboutBanner.jpg";
import welcomeraffily from "@/assets/Group1707478599.png";
import mobileImage from "@/assets/about-bg-mob.jpg";
import image from "@/assets/racategale.png";
import HeroSection from "@/Components/HeroSection/HeroSection";


const AboutBanner = ({ setAuthenticationModal, authenticationModal }: any) => {
  return (
    <>
      <HeroSection
        leftImage={image}
        rightImage={HeroImage}
        mobileImage={HeroImage}>
        <div className="flex flex-col w-full lg:w-[40%] h-auto lg:h-full lg:justify-center ">
          <div className="text-white text-sm font-bold uppercase flex items-center mb-5">
            <img src={welcomeraffily} alt="Raffily logo" className="w-[20px] h-[20px] mr-2" />
            Welcome to Raffily
          </div>
          <h1 className="lg:text-[64px] text-[24px] sm:text-[28px] font-modernBold font-bold lg:leading-[67.2px] leading-[28px] tracking-[-2%]  mb-5">
            Where{" "}
            <span className="bg-gradient-to-b from-[#FF7385] via-[#FD98E8] to-[#AD6FFF] bg-clip-text text-transparent">
              winning{" "}
            </span>
            is just the beginning
          </h1>
          <p className="mt-4 lg:text-[14px] text-[10px] sm:text-[12px] font-modernRegular lg:leading-[22.6px] leading-[14px] mb-4 -tracking-2  mb-5">
            Raffily was born from a passion for creating memorable experiences that connect people and businesses in a unique way, by transforming the raffle experience. From a simple idea to a full-fledged platform, our trusted platform combines fun, fairness, and fantastic rewards, making it easier than ever for entrants to win amazing prizes and for businesses to engage with their customers.
          </p>

          <button
            className="bg-white text-black font-bold py-2 px-4 rounded lg:w-fit w-full lg:mb-0 font-modernBold hover:bg-gray-200"
            onClick={() => {
              setAuthenticationModal({
                ...authenticationModal,
                isSignUpOpen: true,
              });
            }}
          >
            Join Raffily
          </button>
        </div>
      </HeroSection>

    </>
  );
};

export default AboutBanner;
