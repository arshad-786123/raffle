import BannerImage from "@/assets/merchant/merchant_banner.png";
import BannerImageMobile from "@/assets/merchant/merchant_banner_mb.png";
import HeroImage from "@/assets/GroupBanner.png";

const MerchantBanner = ({ setAuthenticationModal, authenticationModal }: any) => {
  return (
    <>
      <div className="relative z-10 bg-[#110044] text-white min-h-[541px] lg:h-[541px] flex flex-wrap lg:flex-nowrap justify-between items-center overflow-hidden pl-0 lg:pl-24"
        style={{
          backgroundImage: `url(${HeroImage})`,
        }}>
        {/* Left Section */}
        <div className="w-full lg:w-[587px] max-w-full order-2 lg:order-1">
          <div className="lg:p-0 p-4 text-startlg:mb-0 mb-6">
            <h1 className="lg:text-[64px] text-[32px] font-modernBold font-bold lg:leading-[67.2px] leading-[33.6px] tracking-[-2%]">
              Create a&nbsp;
              <span className="bg-gradient-to-b from-[#FF7385] via-[#FD98E8] to-[#AD6FFF] bg-clip-text text-transparent">
                winning <br className="block lg:hidden" /> connection
              </span>{" "}
              with your <br className="block lg:hidden" />
              customers
            </h1>
            <p className="mt-4 lg:text-[14px] text-[12px] font-modernRegular md:pr-4 p-0 lg:leading-[19.6px] leading-[16.8px]">
              Grow your business with exciting raffles on{" "}
              <span className="text-red-400">Raffily's platform</span>. Discover
              how you reach new audiences, enhance loyalty and gain valuable
              customer insight effortlessly and without the complexities.
            </p>
            <button
              className="bg-white text-black font-bold py-2 px-4 rounded lg:w-fit w-full md:w-[250px] lg:mb-0 mb-4 mt-6"
              style={{ fontFamily: "ModernEraBold" }}
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
        </div>

        {/* Right Section */}
        {/* <div className="w-full lg:flex-1 order-1 lg:order-2 lg:ml-0">
          <img
            className="hidden lg:block w-full h-auto md:h-[463px] object-cover object-left-center lg:clip-path-desktopPath clip-path-mobilePath"
            src={BannerImage}
            alt="Banner"
          />
          <img
            className="lg:hidden block w-full h-auto md:h-[541px] object-cover object-left-center lg:clip-path-desktopPath clip-path-mobilePath"
            src={BannerImageMobile}
            alt="Banner"
          />
        </div> */}
      </div>
    </>
  );
};

export default MerchantBanner;
