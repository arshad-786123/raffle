import { Link, useNavigate } from "react-router-dom";
import mainLogo from "../../assets/main_logo.png";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { storeGuestUser, storeUser } from "../../Redux/User/userSlice";
import Cookies from "js-cookie";
import { AlignJustify, ArrowRight } from "lucide-react";
import { clearCart, selectCartCount } from "../../Redux/Cart/cartSlice";
import Loading from "../../Pages/Loading/Loading";

import { Button } from "@/Components/ui/button";

import Logo from "/static-images/logo.svg";
import menu from "/static-images/menu.svg";
import LogoGooglePay from "/static-images/logoGooglePay.svg";
import logoApplePay from "/static-images/logoApplePay.svg";
import LogoMasterCard from "/static-images/logoMasterCard.svg";
import LogoPayPal from "/static-images/logoPayPal.svg";
import LogoTapReview from "/static-images/logoTapReview.png";
import LogoTrustpilot from "/static-images/logoTrustpilot.png";
import LogoVisa from "/static-images/logoVisa.svg";
import LogoWinGenuine from "/static-images/logoWinGenuine.svg";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = ({ setAuthenticationModal, authenticationModal }: any) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleLogoClick = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.preventDefault();
    navigate("/");
  };
  const userData = useSelector((state: any) => state.reducer.user);

  const handleCartNavigate = () => {
    navigate("/user/cart");
  };

  const handleMainNavigate = () => {
    navigate("/");
  };

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeNavbar = () => {
    setIsDrawerOpen(false);
  };


  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node)
      ) {
        setIsDrawerOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleNavigate = () => {
    if (userData.user.role === "Business") {
      window.location.href = "/owner";
    } else if (userData.user.role === "Customer") {
      window.location.href = "/user";
    } else {
      window.location.href = "/admin/reports";
    }
  };

  const userCart = useSelector((state: any) => state.reducer?.cart?.cartItems);

  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    dispatch(storeUser(""));
    dispatch(storeGuestUser(""));
    dispatch(clearCart());
    navigate("/");
  };

  const raffilyForBusiness = () => {
    navigate('/merchant');
  };

  const cartCount = useSelector(selectCartCount);
  console.log("cartCount", cartCount)

  const handleAddToCart = () => {
    navigate("/user/cart");
  }

  const renderCategories = () => {
    return (
      <>
        {loading ? (
          <Loading />
        ) : (
          <>
            {/* <div className="flex w-full">
              <button
                onClick={() => navigate("/user/category")}
                className="text-white rounded-md border-2 py-1 px-6 font-normal text-md whitespace-nowrap text-center w-full md:w-auto"
              >
                View all Raffles
              </button>
            </div> */}


            <div className="flex w-full flex-wrap gap-y-4 gap-x-4 items-center justify-between">

              <button
                onClick={() => {
                  navigate("/merchant");
                  closeNavbar();
                }}
                className="bg-[#FF7385] text-white rounded-md py-2 px-6 font-normal text-md  flex items-center justify-center w-full md:w-auto"
              >
                Raffily for Business
              </button>



              <button
                onClick={() => {
                  navigate("/all-raffles");
                  closeNavbar();
                }}
                className="text-white bg-transparent rounded-md border-2 border-white py-1 px-6 font-normal text-md whitespace-nowrap text-center w-full md:w-auto"
              >
                All Raffles
              </button>
              <button
                onClick={() => {
                  navigate("/winners");
                  closeNavbar();
                }}
                className="text-white bg-transparent rounded-md border-2 border-white py-1 px-6 font-normal text-md whitespace-nowrap text-center w-full md:w-auto"
              >
                Winners
              </button>
              <button
                onClick={() => {
                  navigate("/past-draws");
                  closeNavbar();
                }}
                className="text-white bg-transparent rounded-md border-2 border-white py-1 px-6 font-normal text-md whitespace-nowrap text-center w-full md:w-auto"
              >
                Past Draws
              </button>
              <button
                onClick={() => {
                  navigate("/about-page");
                  closeNavbar();
                }}
                className="text-white bg-transparent rounded-md border-2 border-white py-1 px-6 font-normal text-md whitespace-nowrap text-center w-full md:w-auto"
              >
                About
              </button>
            </div>


          </>
        )}
      </>
    );
  };

  return (
    <>
      {/* Top Header */}
      <div className="h-[40px] w-full bg-raffles-blue flex items-center justify-between py-2 sm:px-12 px-1 pr-5 ">
        <div className="flex items-center gap-2">
          {/* Tap Review Logo */}
          <div className="cursor-pointer">
            <img
              className="w-full"
              style={{ height: "20px", width: "auto" }}
              src={LogoTapReview}
              alt="Logo Tap Review"
            />
          </div>

          {/* Trustpilot Logo */}
          <div className="cursor-pointer">
            <img
              className="w-full"
              style={{ height: "20px", width: "auto" }}
              // style={{ height: "7vh" }}
              src={LogoTrustpilot}
              alt="Logo Trustpilot"
            />
          </div>

        </div>

        {/* Central Text */}
        <div className="flex-1 text-center mx-2">
          <p className="text-[10px] sm:text-[14px] text-white leading-tight">
            Trusted Brands, Big Prizes, Real Winners
          </p>
        </div>

        {/* Win Genuine Logo */}
        <div className="cursor-pointer w-12 sm:w-24">
          <img
            className="w-full"
            src={LogoWinGenuine}
            alt="Logo Win Genuine"
          />
        </div>
      </div>


      {/* Logo Header */}
      <div className="lg:h-[78px]@@@@ h-[60px]@@@@ w-full bg-white grid grid-cols-3 sm:px-12 px-1 pr-5 sm:pt-[13px] pt-[12px] sm:pb-[13px] pb-[12px]">
        <div className="justify-self-start">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDrawer}
            // onClick={toggleSidebar}
            className="lg:hidden block w-8 h-8"
          >
            <AlignJustify className="!h-8 !w-8" />
          </Button>
        </div>
        <div className="sm:w-40@@@@ w-28@@@@ sm:h-9@@@@ h-6@@@@ space-x-2 justify-self-center lg:mt-[7px] mt-[5px]">
          <Link to="/" className="inline-block">
            <img src={Logo} className="w-full h-full cursor-pointer" alt="Raffily" />
          </Link>
        </div>
        <div className="justify-self-end items-center flex lg:hidden">
          <div className="relative flex items-center cursor-pointer" onClick={handleAddToCart} style={{ marginRight: "5px" }}>
            <FaShoppingCart size={24} className="text-black" /> {/* Cart icon */}
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount || 0} {/* Dynamic cart count */}
            </span>
          </div>
        </div>
        <div className="justify-self-end">
          <div className="hidden lg:block">
            <p className="font-plusjakartasans font-bold text-raffles-blue mb-3@@@@ mb-[7.5px] text-[12px] leading-[1.261]" style={{ fontFamily: 'ModernEraBold' }}>
              Payments we accept
            </p>
            <div className="flex space-x-[6px] justify-center items-center">
              {/* Apple Pay */}
              <div className="border rounded-full shadow-md flex items-center justify-center w-11@@@@ w-[42px] h-7 cursor-pointer">
                <img
                  src={logoApplePay}
                  alt="logoApplePay"
                  className="block h-3 w-6 !object-fill"
                />
              </div>

              {/* Google Pay */}
              <div className="border rounded-full shadow-md flex items-center justify-center w-11@@@@ w-[42px] h-7 cursor-pointer">
                <img
                  src={LogoGooglePay}
                  alt="Google Pay"
                  className="block h-3 w-6 !object-fill"
                />
              </div>

              {/* Mastercard */}
              <div className="border rounded-full shadow-md flex items-center justify-center w-11@@@@ w-[42px] h-7 cursor-pointer">
                <img
                  src={LogoMasterCard}
                  alt="Mastercard"
                  className="block h-3 w-6 !object-fill"
                />
              </div>

              {/* Visa */}
              <div className="border rounded-full shadow-md flex items-center justify-center w-11@@@@ w-[42px] h-7 cursor-pointer">
                <img
                  src={LogoVisa}
                  alt="Visa"
                  className="block h-3 w-6 !object-fill"
                />
              </div>

              {/* PayPal */}
              <div className="border rounded-full shadow-md flex items-center justify-center w-11@@@@ w-[42px] h-7 cursor-pointer">
                <img
                  src={LogoPayPal}
                  alt="PayPal"
                  className="block h-3 w-6 !object-fill"
                />
              </div>
            </div>
          </div>
          {/* <div className="block lg:hidden">
            <Button
              variant="default"
              className="bg-raffles-blue w-8 h-8"
              size="icon"
            >
              <ArrowRight />
            </Button>
          </div> */}
        </div>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <div>
          <div className="bg-[#FE93DB0D] min-h-[80px] hidden w-full lg:flex flex-wrap items-center justify-between py-2 sm:px-12 px-2 ">
            <div className="flex flex-wrap items-center gap-x-9 w-full lg:w-auto order-2 lg:order-1">
              <Button
                variant="default"
                className="inline-block bg-[#FF7385] rounded px-4 py-2 font-[ModernEraBold]"
                style={{
                  fontSize: '16px',
                  fontWeight: 700,
                }}
                onClick={raffilyForBusiness}
              >
                Raffily for business
              </Button>

              <div className="flex flex-wrap items-center gap-x-14" style={{ fontFamily: 'ModernEraBold' }}>
                <Link to="/all-raffles" className="inline-block font-modernEraBold font-bold text-[16px] leading-4 flex items-center tracking-[-2%]">
                  {/* <img className="inline-block mr-[12px]" src={menu} alt="Apple Pay" />  */}
                  All Raffles
                </Link>
                {/* <Link to="/ending-soon" className="inline-block font-modernEraBold font-bold@@@@ text-[16px] leading-4">
                  Ending Soonest
                </Link> */}
                <Link to="/winners" className="inline-block font-modernEraBold font-bold@@@@ text-[16px] leading-4">
                  Winners
                </Link>
                <Link to="/past-draws" className="inline-block font-modernEraBold font-bold@@@@ text-[16px] leading-4">
                  Past Draws
                </Link>
                <Link to="/about-page" className="inline-block font-modernEraBold font-bold@@@@ text-[16px] leading-4">
                  About
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-2 w-full lg:w-auto justify-end order-1 lg:order-2 font-modernEraBold text-base leading-4 tracking-[-2%]">
              <div className="relative flex items-center cursor-pointer" onClick={handleAddToCart} style={{ marginRight: "10px" }}>
                <FaShoppingCart size={24} className="text-black" /> {/* Cart icon */}
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount || 0} {/* Dynamic cart count */}
                </span>
              </div>
              {userData.user ? (
                <>
                  <Button
                    variant="outline"
                    onClick={handleNavigate}
                    className="text-raffles-blue border-raffles-blue rounded-[5px]"
                  >
                    My Account
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleLogout}
                    className=" rounded-[5px] hover:bg-purple-700"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setAuthenticationModal({
                        ...authenticationModal,
                        isSignInOpen: true,
                      });
                    }}
                    className="text-raffles-blue border-raffles-blue rounded-[5px] px-[25px] py-[11.5px] h-auto" style={{ fontFamily: 'ModernEraBold' }}
                  >
                    Login
                  </Button>
                  <Button
                    variant="default"
                    className="bg-raffles-blue border-raffles-blue !border rounded-[5px] px-[25px] py-[11.5px] h-auto hover:bg-purple-700" style={{ fontFamily: 'ModernEraBold' }}
                    onClick={() => {
                      setAuthenticationModal({
                        ...authenticationModal,
                        isSignUpOpen: true,
                      });
                    }}
                  >
                    Join Raffily
                  </Button>
                </>
              )}
            </div>
          </div>
          <main
            className={
              "fixed hiddenSidebar  z-50 bg-gray-900 bg-opacity-50 inset-0 transform ease-in-out " +
              (isDrawerOpen
                ? "transition-opacity opacity-100 duration-500 translate-x-0"
                : "transition-all opacity-0 duration-500 -translate-x-full")
            }
          >
            <section
              className={
                "w-screen hiddenSidebar overflow-hidden max-w-lg left-0 absolute bg-[#20124C] h-full shadow-xl duration-500 ease-in-out transform " +
                (isDrawerOpen ? "translate-x-0" : "-translate-x-full")
              }
              style={{ width: "50%" }}
            >
              <article className="relative w-full max-w-lg pb-10 flex flex-col space-y-6 overflow-y-scroll h-full">
                <div className="mx-auto pt-4">
                  <img
                    className="w-36"
                    src={mainLogo}
                    alt="raffly"
                    onClick={handleLogoClick}
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <div className="text-white flex flex-col items-start w-[80%] m-auto gap-10 font-normal text-md">
                  {renderCategories()}
                </div>


                {userData?.user ? (
                  <div className="px-5 md:px-0">
                    <button
                      onClick={handleNavigate}
                      className="text-white rounded-md border-2 py-1 px-6 font-normal text-md hidden md:block"
                    >
                      My Account
                    </button>
                    <button
                      onClick={handleNavigate}
                      className="text-white rounded-md border-2 py-1 px-6 font-normal text-md md:hidden w-full"
                    >
                      My Account
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4 w-[80%] m-auto">
                    <button
                      onClick={() => {
                        setAuthenticationModal({
                          ...authenticationModal,
                          isSignInOpen: true,
                        });
                      }}
                      className="text-white rounded-md border-[2px] py-1 px-6 font-normal text-md"
                    >

                      Login
                    </button>
                    <button
                      onClick={() => {
                        setAuthenticationModal({
                          ...authenticationModal,
                          isSignUpOpen: true,
                        });
                      }}
                      className="text-white bg-[#FF7385] rounded-md border-[2px] border-[transparent]  py-1 px-6 font-normal text-md"
                    >
                      {/* Sign up */}
                      Join Raffily
                    </button>
                  </div>
                )}
              </article>
            </section>
            <section
              className="w-screen h-full cursor-pointer"
              onClick={() => {
                setIsDrawerOpen(false);
              }}
            ></section>
          </main>
        </div>
      )}
    </>
  );
};

export default Navbar;
