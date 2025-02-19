import { Button } from "@/Components/ui/button";

import imageOne from "@/assets/about_us/image_one.jpg";
import imageTwo from "@/assets/about_us/image_two.jpg";
import imageThree from "@/assets/about_us/image_three.jpg";
import Trophy from "@/assets/about_us/Trophy_white.svg";
import Handshake from "@/assets/about_us/Handshake.svg";
import Scales from "@/assets/about_us/Scales.svg";
import Cheers from "@/assets/about_us/Cheers_rgb.svg";

const dataOfImages = [
  {
    id: 1,
    image: "https://raffily.com/services/raffles/1731603231005-583209095.png",
    date: "November 2024 Winner",
  },
  {
    id: 2,
    image: "https://raffily.com/services/raffles/1732716822878-782490218.png",
    date: "December 2024 Winner",
  },
  {
    id: 3,
    image: "https://raffily.com/services/raffles/1733920050942-818475565.png",
    date: "December 2024 Winner",
  },
  {
    id: 4,
    image: "https://raffily.com/services/raffles/1733918105560-656346440.png",
    date: "December 2024 Winner",
  },
];
const WhyChoose = ({ setAuthenticationModal, authenticationModal }: any) => {
  return (
    <div className="w-full bg-raffles-blue py-11 relative">
      <div className="w-full mx-auto text-center md:pb-16 pb-6">
        <div className="overflow-x-auto scrollbar-hide">
          {/* Horizontal Scroll Container */}
          <div className="flex space-x-8">
            {/* Two Rows with Staggered Starts */}
            <div className="flex flex-col space-y-6">
              {/* Row 1 */}
              <div className="flex space-x-6">
                {dataOfImages.map((data) => (
                  <div
                    key={data.id}
                    className="md:min-w-[660px] md:w-[660px] md:min-h-[402px] md:h-[402px] min-w-[283px] w-[283px] min-h-[172px] h-[172px] overflow-hidden rounded-[16px] relative"
                  >
                    <img
                      src={data.image}
                      alt="image"
                      className="w-full h-full"
                    />
                    <div className="absolute left-1 bottom-2 flex items-center "></div>
                    <div className="absolute left-1 bottom-2 bg-white flex items-center p-1 w-fit sm:gap-4 gap-2 sm:rounded-[12px] rounded-[4px]">
                      <div className="sm:size-[42px] size-5 flex items-center justify-center bg-[#FF7485] rounded-[6px]">
                        <img
                          src={Trophy}
                          alt="Trophy"
                          className="sm:size-[22px] size-[12px]"
                        />
                      </div>
                      <p className="sm:text-[16px] text-[10px] sm:leading-[16px] leading-[16px] text-raffles-blue font-modernBold sm:pr-4 pr-2">
                        {data.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:px-24 sm:px-10 px-4 w-full md:mb-14">
        <div className="flex lg:flex-row flex-col w-full gap-8 sm:gap-4 items-center justify-between mb-6">
          <h4 className="sm:text-[40px] text-[28px] sm:leading-[40px] leading-[28px] text-white font-modernBold sm:text-start text-center">
            Why Choose Raffily?{" "}
          </h4>
          <Button
            className="bg-white text-black font-bold font-modernBold lg:block hidden"
            variant="secondary"
            size="lg"
            onClick={() => {
              setAuthenticationModal({
                ...authenticationModal,
                isSignUpOpen: true,
              });
            }}
          >
            Join now
          </Button>
        </div>
        <hr className="h-px my-2 bg-[rgba(255, 255, 255, 1] opacity-[20%] w-full"></hr>
        <div className="flex lg:flex-row flex-col lg:items-start items-center lg:gap-12 gap-4 justify-between mt-6">
          <div className="flex flex-col lg:items-start items-center sm:gap-4 gap-2 text-white">
            <div className="inset-0 bg-gradient-to-r from-[#AD6FFF] via-[#FD98E8] to-[#FF7385] rounded-full p-[2.5px] w-20 h-20">
              {/* Inner content */}
              <div className="bg-[#280E51] w-full h-full rounded-full flex items-center justify-center">
                <img src={Scales} alt="User" className="sm:size-9 size-7" />
              </div>
            </div>
            <h5
              className="text-[16px] leading-[19.2px] sm:text-[20px] sm:leading-[24px] sm:text-start text-center font-modernBold"
            >
              Fair and Transparent
            </h5>
            <p className="text-[12px] leading-[16.8px] sm:text-[14px] sm:leading-[19.6px] max-w-[355px] lg:text-start text-center font-modernRegular -tracking-2">
              We believe in fair play. Raffily uses a secure, random draw system
              to ensure that every raffle is completely fair and transparent.
              All participants have an equal chance to win, with no hidden
              tricks or biases.
            </p>
          </div>
          <div className="flex flex-col lg:items-start items-center sm:gap-4 gap-2 text-white">
            <div className="inset-0 bg-gradient-to-r from-[#AD6FFF] via-[#FD98E8] to-[#FF7385] rounded-full p-[2.5px] w-20 h-20">
              {/* Inner content */}
              <div className="bg-[#280E51] w-full h-full rounded-full flex items-center justify-center">
                <img
                  src={Handshake}
                  alt="Handshake"
                  className="sm:size-9 size-7"
                />
              </div>
            </div>
            <h5
              className="text-[16px] leading-[19.2px] sm:text-[20px] sm:leading-[24px] sm:text-start text-center font-modernBold"
            >
              Trusted by Top Brands
            </h5>
            <p className="text-[12px] leading-[16.8px] sm:text-[14px] sm:leading-[19.6px] max-w-[355px] lg:text-start text-center font-modernRegular -tracking-2">
              We’ve partnered with a variety of trusted brands to bring you
              exciting and valuable raffle experiences. Businesses large and
              small use Raffily to engage with their customers in a new,
              interactive way.
            </p>
          </div>
          <div className="flex flex-col lg:items-start items-center sm:gap-4 gap-2 text-white">
            <div className="inset-0 bg-gradient-to-r from-[#AD6FFF] via-[#FD98E8] to-[#FF7385] rounded-full p-[2.5px] w-20 h-20">
              {/* Inner content */}
              <div className="bg-[#280E51] w-full h-full rounded-full flex items-center justify-center">
                <img src={Cheers} alt="Cheers" className="sm:size-9 size-7" />
              </div>
            </div>
            <h5
              className="text-[16px] leading-[19.2px] sm:text-[20px] sm:leading-[24px] sm:text-start text-center font-modernBold"
            >
              Fun and Engaging
            </h5>
            <p className="text-[12px] leading-[16.8px] sm:text-[14px] sm:leading-[19.6px] max-w-[355px] lg:text-start text-center font-modernRegular -tracking-2">
              Raffles are all about excitement! Whether you’re entering for a
              chance to win or running a promotion for your business, Raffily
              adds an element of fun that creates memorable experiences.
            </p>
          </div>
        </div>
        <div className="w-full mt-6  flex items-center lg:hidden justify-center">
          <Button
            className="bg-white text-black font-bold font-modernBold"
            variant="secondary"
            size="lg"
            onClick={() => {
              setAuthenticationModal({
                ...authenticationModal,
                isSignUpOpen: true,
              });
            }}
          >
            Join now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WhyChoose;
