import DiceFive from "@/assets/about_us/DiceFive_rgb.svg";
import Lock from "@/assets/about_us/Lock.svg";
import Scroll from "@/assets/about_us/Scroll_rgb.svg";

const Commitment = () => {
  return (
    <div className="w-full md:mt-20 mt-10 lg:px-24 sm:px-10 px-4 flex lg:flex-row flex-col sm:items-start items-center justify-center gap-5 relative pb-20">
      <div className="lg:w-1/2 w-full lg:mt-8 mt-0">
        <div className="lg:w-3/4 w-full">
          <h1 className="font-modernBold sm:text-[40px] text-[28px] sm:leading-[42px] leading-[29.4px] text-raffles-light-blue mb-4 -tracking-2">
            Our Commitment <br className=" lg:block hidden" /> to Fairness
          </h1>
          <p className="font-modernRegular sm:text-[18px] text-[14px] sm:leading-[25.2px] leading-[19.6px] text-raffles-light-blue -tracking-2">
            At Raffily, fairness is at the heart of everything we do. Our
            platform is built on transparency, and we’re committed to providing
            a safe, secure, and fun experience for all.
          </p>
        </div>
      </div>
      <div className="lg:w-1/2 w-full">
        <div className="w-full shadow-[0px_4px_30px_0px_#0000000F] rounded-[20px] bg-white flex flex-col items-start justify-start lg:p-6 p-4 lg:gap-6 gap-4">
          <div className="flex items-center gap-6">
            <div className="sm:w-20 w-12 sm:h-20 h-12">
              <div className="inset-0 bg-gradient-to-r from-[#AD6FFF] via-[#FD98E8] to-[#FF7385] rounded-full p-[2.5px] sm:w-20 w-12 sm:h-20 h-12">
                <div className="bg-[#FEF2F7] w-full h-full rounded-full flex items-center justify-center">
                  <img src={DiceFive} alt="User" className="sm:size-9 size-5" />
                </div>
              </div>
            </div>
            <div className="fle flex-col items-start justify-start gap-4">
              <h1 className="font-modernBold sm:text-[20px] text-[16px] sm:leading-[24px] leading-[19.2px] text-raffles-light-blue mb-2">
                Randomised Draws
              </h1>
              <p className="font-modernRegular sm:text-[14px] text-[12px] sm:leading-[19.6px] leading-[16.8px] text-raffles-light-blue -tracking-2">
                All raffle winners are selected using a secure random number
                generator, ensuring fairness in every draw.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="sm:w-20 w-12 sm:h-20 h-12">
              <div className="inset-0 bg-gradient-to-r from-[#AD6FFF] via-[#FD98E8] to-[#FF7385] rounded-full p-[2.5px] sm:w-20 w-12 sm:h-20 h-12">
                <div className="bg-[#FEF2F7] w-full h-full rounded-full flex items-center justify-center">
                  <img src={Lock} alt="Lock" className="sm:size-9 size-5" />
                </div>
              </div>
            </div>
            <div className="fle flex-col items-start justify-start gap-4">
              <h1 className="font-modernBold sm:text-[20px] text-[16px] sm:leading-[24px] leading-[19.2px] text-raffles-light-blue mb-2">
                Safe & Secure
              </h1>
              <p className="font-modernRegular sm:text-[14px] text-[12px] sm:leading-[19.6px] leading-[16.8px] text-raffles-light-blue -tracking-2">
                We prioritise the security of transactions and personal data,
                using trusted payment gateways and encryption.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="sm:w-20 w-12 sm:h-20 h-12">
              <div className="inset-0 bg-gradient-to-r from-[#AD6FFF] via-[#FD98E8] to-[#FF7385] rounded-full p-[2.5px] sm:w-20 w-12 sm:h-20 h-12">
                <div className="bg-[#FEF2F7] w-full h-full rounded-full flex items-center justify-center">
                  <img src={Scroll} alt="Scroll" className="sm:size-9 size-5" />
                </div>
              </div>
            </div>
            <div className="fle flex-col items-start justify-start gap-4">
              <h1 className="font-modernBold sm:text-[20px] text-[16px] sm:leading-[24px] leading-[19.2px] text-raffles-light-blue mb-2">
                Randomised Draws
              </h1>
              <p className="font-modernRegular sm:text-[14px] text-[12px] sm:leading-[19.6px] leading-[16.8px] text-raffles-light-blue -tracking-2">
                All raffle winners are selected using a secure random number
                generator, ensuring fairness in every draw.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Commitment;
