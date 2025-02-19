import React from "react";
import "./Slider.css";

const Slider = () => {
  const slideContent = (
    <>
      <h4 className="slide text-center bg-[#FFFFFF] bg-opacity-10 text-white p-4 rounded-md">
        WIN: GENUINE
      </h4>
      <h4 className="slide text-center bg-[#FFFFFF] bg-opacity-10 text-white p-4 rounded-md">
        Your home for raffles
      </h4>
      <h4 className="slide text-center bg-[#FFFFFF] bg-opacity-10 text-white p-4 rounded-md">
        Trusted Brands
      </h4>
      <h4 className="slide text-center bg-[#FFFFFF] bg-opacity-10 text-white p-4 rounded-md">
        Genuine Prizes
      </h4>
    </>
  );

  const slides = [...Array(10).fill(slideContent).flat()];

  return (
    <div>
      <div className="hidden lg:block">
        <div className="sliderContainer">
          <div className="sliderContent">
            {slides}
            {slides}
          </div>
        </div>
      </div>
      <div className="block lg:hidden">
        <div className="sliderContainer">
          <div className="sliderContent">
            {slides}
            {slides}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
