import React from "react";
import GiftImage from "@/assets/homepage/winningTickets/Gift.jpg";

const WinningTickets = () => {
  return (
    <div className="w-full bg-raffles-blue sm:py-20 py-10">
      <div className="sm:px-0 px-6 sm:mb-16 mb-10">
        <h1 className="text-white text-3xl font-bold text-center ">
          Why Raffily is your winning ticket
        </h1>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-y-[70px] sm:gap-x-[80px] gap-x-[40px] mx-auto max-w-[1200px] px-4">
        {Array(6)
          .fill("")
          .map((_, index) => (
            <div
              key={index}
              className="text-white flex flex-col items-center justify-center"
            >
              <div className="inset-0 bg-gradient-to-r from-[#AD6FFF] via-[#FD98E8] to-[#FF7385] rounded-full p-[2.5px] w-20 h-20 mb-4">
                {/* Inner content */}
                <div className="bg-[#280E51] w-full h-full rounded-full flex items-center justify-center">
                  <img src={GiftImage} alt="" className="size-9" />
                </div>
              </div>
              <h5 className="text-[20px] leading-[24px] text-center font-extrabold font-modernExtraBold mb-4">
                Exciting Prizes
              </h5>
              <p className="text-[14px] leading-[19.6px] font-[500] text-center">
                From luxury items to once-in-a-lifetime experiences, our raffles
                feature a wide range of prizes
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default WinningTickets;
