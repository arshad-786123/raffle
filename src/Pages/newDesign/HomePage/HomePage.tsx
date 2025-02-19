import { FC } from "react";
import Header from "../../../Components/newDesign/Header/Header";
import { SidebarProvider } from "@/Components/ui/sidebar";
import { AppSidebar } from "@/Components/AppSidebar/AppSidebar";

import Mobile_Banner from "@/assets/homepage/new_banner.png";
import Banner from "@/assets/homepage/image(1).png";
import Brand from "@/assets/homepage/brand.png";
import CompanyCarousel from "@/Components/newDesign/CompanyCarousel/CompanyCarousel";
const HomePage: FC = () => {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <div className="w-full h-screen">
        <Header />
        <div className="relative w-full lg:h-[calc(100%-314px)] h-[calc(100%-200px)] flex items-center">
          <div className="absolute lg:clip-path-none clip-path-mobile lg:left-0 lg:top-0 overflow-hidden lg:h-full bottom-0 bg-gradient-to-tr from-purple-900 to-raffles-blue text-white z-10 w-full h-1/2 lg:px-24 px-2 lg:py-14 py-12">
            <div className="flex flex-col w-full lg:max-h-[450px] lg:w-[53%] h-full lg:justify-between w">
              <h1 className="lg:text-[64px] text-3xl font-modernExtraBold font-bold lg:leading-[67.2px] leading-[33.6px] tracking-[-2%] lg:mb-0 mb-4">
                Raffily{" "}
                <span className="bg-gradient-to-b from-[#FF7385] via-[#FD98E8] to-[#AD6FFF] bg-clip-text text-transparent">
                  Exclusive
                </span>
              </h1>
              <p className="lg:text-[22px] text-[16px] lg:leading-[30.8px] leading-[22.4px] tracking-[-2%] lg:mb-0 mb-4">
                Win a Prestige Package for 8 in a Private Box at{" "}
                <br className="xl:block hidden" />
                <span className="text-red-400">Chester Racecourse</span> on
                Ladies Day.
              </p>
              <p className="lg:text-lg text-[16px] font-semibold lg:mb-0 mb-4 ">
                Worth over £10,000
              </p>
              <button className="bg-white text-purple-800 font-bold py-2 px-4 rounded lg:w-fit w-full lg:mb-0 mb-4">
                Enter
              </button>
              <div className="flex flex-col lg:items-start items-center justify-start lg:justify-start w-full">
                <p className="text-[12px] font-modernLight leading-[16.8px] text-[#FFFFFF] uppercase mb-3">
                  In association with
                </p>

                <img src={Brand} alt="brand" width={287} height={35} />
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 h-full lg:z-10 z-9 w-full lg:w-[55%]">
            <img
              src={Mobile_Banner}
              className="h-full !object-fill w-full block lg:hidden"
              alt="Background Image"
            />
            <img
              src={Banner}
              className="h-full !object-fill w-full lg:block hidden"
              alt="Background Image"
            />
          </div>
        </div>
        <div className="w-full h-[114px]">
          <CompanyCarousel />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default HomePage;
