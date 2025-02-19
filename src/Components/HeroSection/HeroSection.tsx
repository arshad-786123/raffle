import React from "react";

const HeroSection = ({
    leftImage,
    rightImage,
    mobileImage,
    children,
}: {
    leftImage: string;
    rightImage: string;
    mobileImage: string;
    children?: React.ReactNode;
}) => {
    return (
        <div className="relative z-10 text-white flex flex-wrap lg:flex-nowrap justify-between items-center pl-0 w-full banner-with-layer">
            {/* Right Image */}
            <div className="w-full h-full right-0 hidden lg:block">
                <img src={rightImage} alt="Right Image" className="right-image" />
            </div>

            {/* Mobile Image */}
            <div className="w-full h-full lg:hidden">
                <img src={mobileImage} alt="Mobile Image" className="w-full h-full object-cover mobile-image" />
            </div>

            {/* Left Image */}
            <div className="left-image flex justify-center items-center hidden lg:block">
                <img src={leftImage} alt="Left Side Image" className="" />
            </div>

            {/* Content Section */}
            <div className="absolute lg:clip-path-none lg:left-0 lg:top-0 overflow-hidden lg:h-full bottom-0 text-white z-10 w-full h-auto lg:px-24 lg:py-14 left-0 banner-mobile banner-img">
                <span>{children}</span>
            </div>
        </div>
    );
};

export default HeroSection;
