import BannerImage from "@/assets/merchant/merchant_banner.png";
import BannerImageMobile from "@/assets/merchant/merchant_banner_mb.png";
import HeroImage from "@/assets/merchantBanner.jpg";
import mobileImage from "@/assets/about-bg-mob.jpg";
import image from "@/assets/racategale.png";
import HeroSection from "@/Components/HeroSection/HeroSection";


const MerchantBanner = ({ setAuthenticationModal, authenticationModal }: any) => {
  return (
    <>

      <HeroSection
        leftImage={image}
        rightImage={HeroImage}
        mobileImage={HeroImage}>
        <div className="flex flex-col w-full lg:w-[40%] h-auto lg:h-full lg:justify-center  md:w-[58%]">

          <h1 className="lg:text-[64px] text-[24px] sm:text-[28px] font-modernBold font-bold lg:leading-[67.2px] leading-[28px] tracking-[-2%] banner-text-small">
            Create a{" "}
            <span className="bg-gradient-to-b from-[#FF7385] via-[#FD98E8] to-[#AD6FFF] bg-clip-text text-transparent">
              winning connection{" "}
            </span>
            with your customers
          </h1>
          <p className="mt-4 lg:text-[14px] text-[10px] sm:text-[12px] font-modernRegular lg:leading-[19.6px] leading-[14px] mb-4 -tracking-2">
            Grow your business with exciting raffles on{" "}
            <span className="text-[#FF7385]">Raffily's platform</span>.
            Discover how you reach new audiences, enhance loyalty and gain
            valuable customer insight effortlessly and without the
            complexities.
          </p>

          <button
            className="bg-white text-black font-bold py-2 px-4 rounded lg:w-fit w-full  lg:mb-0 font-modernBold hover:bg-gray-200"
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

export default MerchantBanner;
