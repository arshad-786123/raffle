import { Button } from "@/Components/ui/button";
import React from "react";
import { useNavigate } from "react-router-dom";

interface JoinRafflesProps {
  imagePath?: string;
  heading: string;
  buttonLabel: string;
  setAuthenticationModal: any
  authenticationModal: any
}

const JoinRaffles: React.FC<JoinRafflesProps> = ({
  imagePath,
  heading,
  buttonLabel,
  setAuthenticationModal, authenticationModal
}) => {

  const navigate = useNavigate(); // Initialize the navigate function

  const handleNavigate = () => {
    navigate("/all-raffles"); // Replace with the path you want to navigate to
  };
  return (
    <div className="w-full lg:px-24 sm:px-10 px-6 lg:h-[307px] h-[169px] relative">
      <div className="w-full lg:rounded-[24px] rounded-[9px] h-full flex items-center bg-custom-gradient">
        {imagePath && (
          <img
            src={imagePath}
            alt="Join Raffles"
            className="absolute bottom-1 left-15 lg:block hidden lg:h-[385px] h-[200px]"
          />
        )}

        <div className="lg:w-1/2 w-full lg:pl-10 pl-4 pr-4 lg:pr-0 ml-auto flex flex-col lg:items-start items-center lg:text-left text-center font-modernBold">
          <h1 className="text-white text-[24px] sm:text-[32px] lg:text-[40px] leading-[28px] sm:leading-[36px] lg:leading-[40px] mb-6 font-modernBold">
            {heading}
          </h1>
          <Button className="bg-white text-black px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm lg:text-base w-full lg:w-auto font-modernBold text-[14px] sm:text-[16px] leading-[14px] sm:leading-[16px] hover:bg-gray-200" onClick={handleNavigate}>
            {buttonLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JoinRaffles;
