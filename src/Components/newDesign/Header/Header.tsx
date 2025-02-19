import { AlignJustify, ArrowRight } from "lucide-react";
import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/Components/ui/button";
import { useSidebar } from "@/Components/ui/sidebar";

//SVG Images
import Logo from "/static-images/logo.svg";
import LogoApplePay from "/static-images/menu.svg";
import LogoGooglePay from "/static-images/logoGooglePay.svg";
import LogoMasterCard from "/static-images/logoMasterCard.svg";
import LogoPayPal from "/static-images/logoPayPal.svg";
import LogoTapReview from "/static-images/logoTapReview.svg";
import LogoTrustpilot from "/static-images/logoTrustpilot.svg";
import LogoVisa from "/static-images/logoVisa.svg";
import LogoWinGenuine from "/static-images/logoWinGenuine.svg";

const Header: FC = () => {
  const navigate = useNavigate();
  const { toggleSidebar } = useSidebar();
  
  const raffilyForBusiness = () => {
    navigate('/merchant');
  };

  return (
    <>
      <header className="w-full">
        {/* Top Header */}
        <div className="h-[40px] w-full bg-raffles-blue flex items-center justify-between py-2 sm:px-12 px-2">
          <div className="flex items-center gap-2">
            <div className="cursor-pointer hidden sm:block">
              <img className="" src={LogoTapReview} alt="Logo Tap Review" />
            </div>
            <div className="cursor-pointer w-14 sm:w-20">
              <img
                className="w-full"
                src={LogoTrustpilot}
                alt="Logo Trustpilot"
              />
            </div>
          </div>
          <div className="">
            <p className="text-[14px] leading-[16.41px] text-white tracking-[-0.02em] font-[ModernEra] sm:text-[14px]">
              Trusted Brands, Big Prizes, Real Winners
            </p>

          </div>
          <div className="cursor-pointer w-16 sm:w-24 ">
            <img
              src={LogoWinGenuine}
              alt="Logo Win Genuine"
              className="w-full"
            />
          </div>
        </div>

        {/* Logo Header */}
        <div className="lg:h-[80px] h-[60px] w-full bg-white grid grid-cols-3 sm:px-12 px-2 sm:pt-[8px] pt-[12px]">
          <div className="justify-self-start">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="lg:hidden block w-8 h-8"
            >
              <AlignJustify className="!h-8 !w-8" />
            </Button>
          </div>
          <div className="sm:w-40 w-28 sm:h-9 h-6 space-x-2 justify-self-center sm:mt-[15px] mt-[5px]">
            <img src={Logo} className="w-full h-full" alt="Raffily" />
          </div>
          <div className="justify-self-end">
            <div className="hidden lg:block">
              <p className="font-bold text-raffles-blue mb-3 text-[12px]">
                Payments we accept
              </p>
              <div className="flex space-x-4 justify-center items-center">
                {/* Apple Pay */}
                {/* <div className="border rounded-full shadow-md flex items-center justify-center w-11 h-7 cursor-pointer">
                  <img
                    src={LogoApplePay}
                    alt="Apple Pay"
                    className="h-3 w-6 !object-fill"
                  />
                </div> */}

                {/* Google Pay */}
                <div className="border rounded-full shadow-md flex items-center justify-center w-11 h-7 cursor-pointer">
                  <img
                    src={LogoGooglePay}
                    alt="Google Pay"
                    className="h-3 w-6 !object-fill"
                  />
                </div>

                {/* Mastercard */}
                <div className="border rounded-full shadow-md flex items-center justify-center w-11 h-7 cursor-pointer">
                  <img
                    src={LogoMasterCard}
                    alt="Mastercard"
                    className="h-3 w-6 !object-fill"
                  />
                </div>

                {/* Visa */}
                <div className="border rounded-full shadow-md flex items-center justify-center w-11 h-7 cursor-pointer">
                  <img
                    src={LogoVisa}
                    alt="Visa"
                    className="h-3 w-6 !object-fill"
                  />
                </div>

                {/* PayPal */}
                <div className="border rounded-full shadow-md flex items-center justify-center w-11 h-7 cursor-pointer">
                  <img
                    src={LogoPayPal}
                    alt="PayPal"
                    className="h-3 w-6 !object-fill"
                  />
                </div>
              </div>
            </div>
            <div className="block lg:hidden">
              <Button
                variant="default"
                className="bg-raffles-blue w-8 h-8"
                size="icon"
              >
                <ArrowRight />
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-[#FE93DB0D] min-h-[80px] hidden w-full lg:flex flex-wrap items-center justify-between py-2 sm:px-12 px-2">
          <div className="flex flex-wrap items-center gap-9 lg:gap-5 w-full lg:w-auto order-2 lg:order-1">
            <Button variant="default" className="bg-[#FF7385] rounded" onClick={raffilyForBusiness}>              
              Raffily for business
            </Button>
            <Link to="" className="font-bold text-[16px]">
              All Raffles
            </Link>
            <Link to="" className="font-bold text-[16px]">
              Ending Soonest
            </Link>
            <Link to="" className="font-bold text-[16px]">
              Winners
            </Link>
            <Link to="" className="font-bold text-[16px]">
              Past Draws
            </Link>
            <Link to="" className="font-bold text-[16px]">
              About
            </Link>
          </div>
          <div className="flex items-center gap-4 w-full lg:w-auto justify-end order-1 lg:order-2">
            <Button
              variant="outline"
              className="text-raffles-blue border-raffles-blue rounded"
            >
              Login
            </Button>
            <Button variant="default" className="bg-raffles-blue rounded">
              Join Raffily
            </Button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
