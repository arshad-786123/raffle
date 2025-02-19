import { useEffect, useState } from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route, Outlet, ScrollRestoration, Navigate, useLocation } from "react-router-dom";
import Root from './Pages/Home/Root';
import Navbar from './Components/Navbar/Navbar';
import Index from './Pages/Authentication/Components/Index';
import Owner from './Pages/Owner/Owner';
import OwnerNavbar from './Components/Navbar/OwnerNavbar';
import Account from './Pages/Owner/Account';
import Footer from './Components/Footer/Footer';
import Details from './Pages/Owner/Details';
import Create from './Pages/Owner/Create';
import Prizes from './Pages/Owner/Prizes';
import Balance from './Pages/Owner/Balance';
import UserDetails from './Pages/User/Details';
import UserCart from './Pages/User/Cart';
import UserPayment from './Pages/User/Payment';
import UserDashboard from './Pages/User/Dashboard';
import UserNavbar from './Components/Navbar/UserNavbar';
import UserAccount from './Pages/User/Account';
import UserPrizes from './Pages/User/Prizes';
import AdminUsers from './Pages/Admin/Users';
import AdminMerchants from './Pages/Admin/Merchants';
import AdminRaffles from './Pages/Admin/Raffles';
import AdminWinners from './Pages/Admin/Winners';
import AllRafflesRoot from "./Pages/AllRaffles/Root.js";
import AdminSettings from './Pages/Admin/Settings';
import AdminNavbar from './Components/Navbar/AdminNavbar';
import AdminEntries from './Pages/Admin/Entries';
import AdminReports from './Pages/Admin/Reports.jsx';
import Notification from './Pages/Notification/Notification';
import Faq from './Pages/FAQ/Faq';
import Cookies from 'js-cookie';
import { fetchAccessToken } from './Services/Middleware/fetchAccessToken.js';
import CheckIfOwnerRoute from './Components/Middleware/CheckIfOwnerRoute.js';
import CheckIfUserRoute from './Components/Middleware/CheckIfUserRoute.js';
import CheckIfOwnerDetail from './Components/Middleware/Owner/CheckIfOwnerDetail.js';
import DummyNavbar from './Components/Navbar/DummyNavbar.js';
import ComingSoon from './Pages/ComingSoon/ComingSoon.js';
import UserBalance from './Pages/User/Balance.js';
import Categories from './Pages/Category/Category.js';
import Userdetail from './Pages/Admin/UserDetail.js';
import MerchantDetail from './Pages/Admin/MerchantDetail.js';
import ResetPassword from './Pages/Admin/ResetPassword.js';
import ViewRaffles from './Pages/Admin/ViewRaffles.js';
import ViewSalse from './Pages/Admin/ViewSalse.js';
import MerchantRoot from "./Pages/Merchant/Root.js";
import ViewTransactions from './Pages/Admin/ViewTransactions.js';
import AdminCreate from './Pages/Admin/Create.js';
import CategoriesListing from './Pages/User/CategoriesListing.js';
import Contact from "./Pages/Contact/Contact.js";
import Coupon from './Pages/Coupon/Coupon.js';
import AboutRoot from "./Pages/About/Root.js";
import CouponListing from './Pages/Admin/CouponListing.js';
import TermsConditionListing from './Pages/Admin/TermsConditionListing.js';
import HowItWorksRoot from "./Pages/HowItWorks/Root.js";
import TermsConditions from './Pages/TermsConditions/TermsConditions.js';
import PDPRoot from "./Pages/PDP/Root";
import TermsConditionDetails from './Pages/Owner/TermsConditionDetails.js';
import PastDrawsBanner from "./Pages/PastDraws/Components/Banner.js";
import PastDrawsRoot from "./Pages/PastDraws/Root.js";
import OwnerNotification from './Components/NotificationsListing/Owner/OwnerNotification.js';
import AdminNotification from './Components/NotificationsListing/Admin/AdminNotification.js';
import PrivacyPolicy from './Pages/FooterPages/PrivacyPolicy.js';
import CookiesSetting from './Pages/FooterPages/Cookies.js';
import LegalInfo from './Pages/FooterPages/LegalInfo.js';
import HelpAccessibility from './Pages/FooterPages/HelpAccssibility.js';
import TermsUse from './Pages/FooterPages/TermsUse.js';
import EntriesDetails from './Pages/Admin/EntriesDetails.js';
import AcceptableUse from './Pages/FooterPages/AcceptableUse.js';
import Sucess from './Pages/User/Components/Sucess.js';
import AdminOrders from './Pages/Admin/Orders.js';
import UserOrders from './Pages/User/Orders.js';
import EndingSoon from './Pages/User/EndingSoon.js';
import ViewOrder from './Pages/Admin/ViewOrder.js';
import ViewCustomerOrder from './Pages/User/ViewCustomerOrder.js';
import Loading from './Pages/Loading/Loading.js'
import Support from './Pages/Owner/Support.js';
import UserSupport from './Pages/User/Support.js';
import ExpiredRaffles from './Pages/User/Components/ExpiredRaffles.js';
import WinnerUserDetail from './Pages/Owner/WinnerUserDetail.js';
import WinnerBanner from './Pages/Winner/Components/WinnerBanner.js';
import Winner from './Pages/Winner/Winner.js';
// import Sucess from './Pages/User/Components/Sucess.js';
import HomePage from "./Pages/newDesign/HomePage/HomePage.js";
import EntrantFaq from './Pages/FAQ/EntrantFaq.js';
import MerchantFaq from './Pages/FAQ/MerchantFaq.js';
import BusinessFaq from './Pages/FAQ/MerchantFaq.js';
import RaffilyGreenPolicy from './Pages/RaffilyGreenPolicy/RaffilyGreenPolicy.js';
import MarketingCommunicationPolicy from './Pages/TermsConditions/MarketingCommunicationPolicy.js';
import MerchantTermscondtion from './Pages/TermsConditions/MerchantTermscondtion.js';
import ContactUs from './Pages/Admin/ContactUs.js';
import AdminFooter from './Components/Footer/AdminFooter.js';




function App() {
  const [loading, setLoading] = useState(true);





  useEffect(() => {
    // Simulate a loading time (e.g., fetching data)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer); // Cleanup on component unmount
  }, []);
  const [authenticationModal, setAuthenticationModal] = useState({
    isSignUpOpen: false,
    isSignInOpen: false,
    isSignUp1Step: false,
    isBusinessSignUp1Step: false,
    isSignUp2Step: false,
    isForgotPassOpen: false
  });

  const [selectedImageForNavbar, setSelectedImageForNavbar] = useState<string | null>(null);


  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="/"
          element={
            <>
              <ScrollRestoration />
              <Index
                authenticationModal={authenticationModal}
                setAuthenticationModal={setAuthenticationModal}
              />
              <div className="w-full h-screen">
                <Navbar
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
                <Root
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
              </div>
            </>
          }
        />
        <Route
          path="/merchant"
          element={
            <>
              <ScrollRestoration />
              <Index
                authenticationModal={authenticationModal}
                setAuthenticationModal={setAuthenticationModal}
              />
              <div className="w-full h-screen">
                <Navbar
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
                <MerchantRoot
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
                <Footer
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
              </div>
            </>
          }
        />
        <Route
          path="newDesign/HomePage"
          element={
            <>
              <ScrollRestoration />
              <HomePage />
            </>
          }
        />
        <Route
          path="/raffle/details/:uniqueID"
          element={
            <>
              <ScrollRestoration />
              <Index
                authenticationModal={authenticationModal}
                setAuthenticationModal={setAuthenticationModal}
              />
              <div className="w-full h-screen">
                <Navbar
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
                <PDPRoot
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
              </div>
            </>
          }
        />
        <Route
          path="/contact-us"
          element={
            <>
              <ScrollRestoration />
              <Index
                authenticationModal={authenticationModal}
                setAuthenticationModal={setAuthenticationModal}
              />
              <div className="w-full h-screen">
                <Navbar
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
                <Contact />
                <Footer
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
              </div>
            </>
          }
        />
        <Route
          path="/winners"
          element={
            <>
              <ScrollRestoration />
              <Index
                authenticationModal={authenticationModal}
                setAuthenticationModal={setAuthenticationModal}
              />
              <div className="w-full h-screen">
                <Navbar
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
                <WinnerBanner />
                <Winner
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
                <Footer
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
              </div>
            </>
          }
        />
        <Route
          path="/how-it-work"
          element={
            <>
              <ScrollRestoration />
              <Index
                authenticationModal={authenticationModal}
                setAuthenticationModal={setAuthenticationModal}
              />
              <div className="w-full h-screen">
                <Navbar
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
                <HowItWorksRoot
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
                <Footer
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
              </div>
            </>
          }
        />
        <Route
          path="/all-raffles"
          element={
            <>
              <ScrollRestoration />
              <Index
                authenticationModal={authenticationModal}
                setAuthenticationModal={setAuthenticationModal}
              />
              <div className="w-full h-screen">
                <Navbar
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
                <AllRafflesRoot
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
              </div>
            </>
          }
        />
        <Route
          path="/past-draws"
          element={
            <>
              <ScrollRestoration />
              <Index
                authenticationModal={authenticationModal}
                setAuthenticationModal={setAuthenticationModal}
              />
              <div className="w-full h-screen">
                <Navbar
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
                <PastDrawsBanner />
                <PastDrawsRoot
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
                <Footer
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
              </div>
            </>
          }
        />
        <Route
          path="/about-page"
          element={
            <>
              <ScrollRestoration />
              <Index
                authenticationModal={authenticationModal}
                setAuthenticationModal={setAuthenticationModal}
              />
              <div className="w-full h-screen">
                <Navbar
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
                <AboutRoot
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
                <Footer
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
              </div>
            </>
          }
        />
        <Route
          path="/business-faqs"
          element={
            <>
              <ScrollRestoration />
              <Index
                authenticationModal={authenticationModal}
                setAuthenticationModal={setAuthenticationModal}
              />
              <div className="w-full h-screen">
                <Navbar
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
                <MerchantFaq />
                <Footer />
              </div>
            </>
          }
        />
        <Route
          path="/entrant-faqs"
          element={
            <>
              <ScrollRestoration />
              <Index
                authenticationModal={authenticationModal}
                setAuthenticationModal={setAuthenticationModal}
              />
              <div className="w-full h-screen">
                <Navbar
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
                <EntrantFaq />
                <Footer />
              </div>
            </>
          }
        />
        <Route
          path="/raffily-green-policy"
          element={
            <>
              <ScrollRestoration />
              <Index
                authenticationModal={authenticationModal}
                setAuthenticationModal={setAuthenticationModal}
              />
              <div className="w-full h-screen">
                <Navbar
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />

                <RaffilyGreenPolicy />
                <Footer />
              </div>
            </>
          }
        />
        <Route
          path="/marketing-communication-policy"
          element={
            <>
              <ScrollRestoration />
              <Index
                authenticationModal={authenticationModal}
                setAuthenticationModal={setAuthenticationModal}
              />
              <div className="w-full h-screen">
                <Navbar
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />

                <MarketingCommunicationPolicy />
                <Footer />
              </div>
            </>
          }
        />
        <Route
          path="/merchant-terms-and-condition"
          element={
            <>
              <ScrollRestoration />
              <Index
                authenticationModal={authenticationModal}
                setAuthenticationModal={setAuthenticationModal}
              />
              <div className="w-full h-screen">
                <Navbar
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />

                <MerchantTermscondtion />
                <Footer />
              </div>
            </>
          }
        />
        <Route path="owner" element={<CheckIfOwnerRoute />}>
          <Route
            path=""
            element={
              <>
                <ScrollRestoration />
                <Index
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
                <OwnerNavbar
                  selectedImageForNavbar={selectedImageForNavbar}
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
                <Owner />
                <AdminFooter
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
              </>
            }
          />

          <Route
            path="user/detail/:id"
            element={
              <>
                <ScrollRestoration />
                <Index
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
                <OwnerNavbar
                  selectedImageForNavbar={selectedImageForNavbar}
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
                <WinnerUserDetail />
                <br />
                <br />
                <AdminFooter
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
              </>
            }
          />
          <Route
            path="edit/:id"
            element={
              <>
                <ScrollRestoration />
                <OwnerNavbar
                  selectedImageForNavbar={selectedImageForNavbar}
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
                <Create />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <AdminFooter
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
              </>
            }
          />
          <Route path="live" element={<Owner />} />
          <Route path="details/:id" element={<CheckIfOwnerDetail />}>
            <Route
              path=""
              element={
                <>
                  <ScrollRestoration />
                  <OwnerNavbar
                    selectedImageForNavbar={selectedImageForNavbar}
                    authenticationModal={authenticationModal}
                    setAuthenticationModal={setAuthenticationModal}
                  />
                  <Details />
                  <AdminFooter
                    authenticationModal={authenticationModal}
                    setAuthenticationModal={setAuthenticationModal}
                  />
                </>
              }
            ></Route>
          </Route>
          <Route
            path="create"
            element={
              <>
                <ScrollRestoration />
                <OwnerNavbar
                  selectedImageForNavbar={selectedImageForNavbar}
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
                <Create />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <AdminFooter
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
              </>
            }
          />
          <Route
            path="edit"
            element={
              <>
                <ScrollRestoration />
                <OwnerNavbar
                  selectedImageForNavbar={selectedImageForNavbar}
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
                <Create />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <AdminFooter
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
              </>
            }
          />
          <Route
            path="prizes"
            element={
              <>
                <ScrollRestoration />
                <OwnerNavbar
                  selectedImageForNavbar={selectedImageForNavbar}
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
                <Prizes />
                <br />
                <br />
                <AdminFooter
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
              </>
            }
          />
          {/* <Route path="terms" element={
            <>
              <OwnerNavbar selectedImageForNavbar={selectedImageForNavbar} authenticationModal={authenticationModal} setAuthenticationModal={setAuthenticationModal} />
              <TermsConditionDetails />
              <br />
              <br />
              <Footer />
            </>
          } /> */}
          <Route
            path="notification-nav"
            element={
              <>
                <ScrollRestoration />
                <OwnerNavbar
                  selectedImageForNavbar={selectedImageForNavbar}
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
                <OwnerNotification />
                <br />
                <br />
                <AdminFooter
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
              </>
            }
          />
          <Route
            path="account"
            element={
              <>
                <ScrollRestoration />
                <OwnerNavbar
                  selectedImageForNavbar={selectedImageForNavbar}
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
                <Account
                  setSelectedImageForNavbar={setSelectedImageForNavbar}
                />
                <br />
                <br />
                <AdminFooter
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
              </>
            }
          />
          <Route
            path="balance"
            element={
              <>
                <ScrollRestoration />
                <OwnerNavbar
                  selectedImageForNavbar={selectedImageForNavbar}
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
                <Balance />
                <br />
                <br />
                <AdminFooter
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
              </>
            }
          />
          <Route
            path="balance"
            element={
              <>
                <ScrollRestoration />
                <OwnerNavbar
                  selectedImageForNavbar={selectedImageForNavbar}
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
                <br />
                <br />

                <Balance />
                <br />
                <br />
                <AdminFooter
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
              </>
            }
          />

          <Route
            path="support"
            element={
              <>
                <ScrollRestoration />
                <OwnerNavbar
                  selectedImageForNavbar={selectedImageForNavbar}
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
                <Support />
                <br />
                <br />
                <br />
                <br />
                <AdminFooter
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
              </>
            }
          />
        </Route>
        <Route
          path="raffle/details/:id"
          element={
            <>
              <ScrollRestoration />
              <Index
                authenticationModal={authenticationModal}
                setAuthenticationModal={setAuthenticationModal}
              />
              <Navbar
                authenticationModal={authenticationModal}
                setAuthenticationModal={setAuthenticationModal}
              />
              <UserDetails />
              <div className="hidden lg:block">
                <br />
                <br />
              </div>
              <Footer
                authenticationModal={authenticationModal}
                setAuthenticationModal={setAuthenticationModal}
              />
            </>
          }
        />
        <Route path="/" element={<ComingSoon />} />
        <Route path="/" element={<Outlet />}>
          <Route
            path="cookies"
            element={
              <>
                <ScrollRestoration />
                <Index
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
                <Navbar
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
                <CookiesSetting />
                <br />
                <br />
                <Footer
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
              </>
            }
          />
          <Route
            path="privacy-policy"
            element={
              <>
                <ScrollRestoration />
                <Index
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
                <Navbar
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
                <PrivacyPolicy />
                <br />
                <br />
                <Footer
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
              </>
            }
          />
          <Route
            path="terms-and-conditions"
            element={
              <>
                <ScrollRestoration />
                <Index
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
                <Navbar
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
                <TermsConditionDetails />
                <br />
                <br />
                <Footer
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
              </>
            }
          />
          {/* <Route path="faqs" element={
            <>
              <ScrollRestoration />
              <Index authenticationModal={authenticationModal} setAuthenticationModal={setAuthenticationModal} />
              <Navbar authenticationModal={authenticationModal} setAuthenticationModal={setAuthenticationModal} />
              <LegalInfo />
              <br />
              <br />
              <Footer authenticationModal={authenticationModal}
                setAuthenticationModal={setAuthenticationModal} />
            </>
          } /> */}
          <Route
            path="help-accessibility"
            element={
              <>
                <ScrollRestoration />
                <Index
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
                <Navbar
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
                <HelpAccessibility />
                <br />
                <br />
                <Footer
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
              </>
            }
          />
          <Route
            path="terms-of-use"
            element={
              <>
                <ScrollRestoration />
                <Index
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
                <Navbar
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
                <TermsUse />
                <br />
                <br />
                <Footer
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
              </>
            }
          />
          <Route
            path="acceptable-use"
            element={
              <>
                <ScrollRestoration />
                <Index
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
                <Navbar
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
                <AcceptableUse />
                <br />
                <br />
                <Footer
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
              </>
            }
          />

          <Route
            path="payment/status"
            element={
              <>
                <ScrollRestoration />
                <Index
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
                <Navbar
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
                <Sucess />
                <br />
                <br />
                <Footer
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
              </>
            }
          />

          <Route
            path="ending-soon"
            element={
              <>
                <ScrollRestoration />
                <Index
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
                <Navbar
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
                <EndingSoon />
                <br />
                <br />
                <Footer
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
              </>
            }
          />

          <Route
            path="expired-raffles"
            element={
              <>
                <ScrollRestoration />
                <Index
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
                <Navbar
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
                <ExpiredRaffles />
                <br />
                <br />
                <Footer
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
              </>
            }
          />
        </Route>
        {/* <Route path="payment/response" element={
          <>
            <Index authenticationModal={authenticationModal} setAuthenticationModal={setAuthenticationModal} />
            <Navbar authenticationModal={authenticationModal} setAuthenticationModal={setAuthenticationModal} />
            <Sucess />
            <br />
            <br />
            <Footer />
          </>
        } /> */}
        <Route
          path="user"
          element={
            <Outlet />
            // <CheckIfUserRoute/>
          }
        >
          <Route
            path=""
            element={
              <CheckIfUserRoute>
                <UserNavbar
                  selectedImageForNavbar={selectedImageForNavbar}
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
                <UserDashboard />
                {/* <UserSupport /> */}
                <br />
                <br />
                <AdminFooter
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
              </CheckIfUserRoute>
            }
          />
          <Route
            path="cart"
            element={
              <>
                <ScrollRestoration />
                <Index
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
                <Navbar
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
                <UserCart
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
                <div className="hidden lg:block">
                  <br />
                  <br />
                </div>
                <AdminFooter
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
              </>
            }
          />
          <Route
            path="payment"
            element={
              // <CheckIfUserRoute>
              <>
                <ScrollRestoration />
                <Index
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
                <Navbar
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
                <UserPayment />
                <br />
                <br />
                <AdminFooter
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
              </>
              // </CheckIfUserRoute>
            }
          />

          <Route
            path="account"
            element={
              <CheckIfUserRoute>
                <UserNavbar
                  selectedImageForNavbar={selectedImageForNavbar}
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
                <UserAccount
                  setSelectedImageForNavbar={setSelectedImageForNavbar}
                />
                <br />
                <br />
                <AdminFooter
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
              </CheckIfUserRoute>
            }
          />
          <Route
            path="orders"
            element={
              <CheckIfUserRoute>
                <UserNavbar
                  selectedImageForNavbar={selectedImageForNavbar}
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
                <UserOrders />
                <br />
                <br />
                <AdminFooter
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
              </CheckIfUserRoute>
            }
          />
          <Route
            path="orders/detail/:id"
            element={
              <CheckIfUserRoute>
                <UserNavbar
                  selectedImageForNavbar={selectedImageForNavbar}
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
                <ViewCustomerOrder />
                <br />
                <br />
                <AdminFooter
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
              </CheckIfUserRoute>
            }
          />
          <Route
            path="category"
            element={
              <>
                {/* // <CheckIfUserRoute> */}
                <ScrollRestoration />
                <Index
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
                <Navbar
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
                <CategoriesListing
                  setSelectedImageForNavbar={setSelectedImageForNavbar}
                />
                <br />
                <br />
                <AdminFooter
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
                {/* </CheckIfUserRoute> */}
              </>
            }
          />
          <Route
            path="prizes"
            element={
              <CheckIfUserRoute>
                <UserNavbar
                  selectedImageForNavbar={selectedImageForNavbar}
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
                <UserPrizes />
                <br />
                <br />
                <AdminFooter
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
              </CheckIfUserRoute>
            }
          />
          <Route
            path="balance"
            element={
              <CheckIfUserRoute>
                <UserNavbar
                  selectedImageForNavbar={selectedImageForNavbar}
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
                <UserBalance />
                <br />
                <br />
                <AdminFooter
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
              </CheckIfUserRoute>
            }
          />

          <Route
            path="support"
            element={
              <CheckIfUserRoute>
                <UserNavbar
                  selectedImageForNavbar={selectedImageForNavbar}
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
                <UserSupport />
                <br />
                <br />
                <AdminFooter
                  authenticationModal={authenticationModal}
                  setAuthenticationModal={setAuthenticationModal}
                />
              </CheckIfUserRoute>
            }
          />
        </Route>
        <Route
          path="admin/users"
          element={
            <>
              <ScrollRestoration />
              <AdminNavbar
                authenticationModal={authenticationModal}
                setAuthenticationModal={setAuthenticationModal}
              />
              <AdminUsers />
              <br />
              <br />
              <AdminFooter
                authenticationModal={authenticationModal}
                setAuthenticationModal={setAuthenticationModal}
              />
            </>
          }
        />
        <Route
          path="admin/user/detail/:id"
          element={
            <>
              <ScrollRestoration />
              <AdminNavbar
                authenticationModal={authenticationModal}
                setAuthenticationModal={setAuthenticationModal}
              />
              <Userdetail />
              <br />
              <br />
              <AdminFooter
                authenticationModal={authenticationModal}
                setAuthenticationModal={setAuthenticationModal}
              />
            </>
          }
        />
        <Route
          path="admin/user/reset-password/:id"
          element={
            <>
              <ScrollRestoration />
              <AdminNavbar
                authenticationModal={authenticationModal}
                setAuthenticationModal={setAuthenticationModal}
              />
              <ResetPassword />
              <br />
              <br />
              <AdminFooter
                authenticationModal={authenticationModal}
                setAuthenticationModal={setAuthenticationModal}
              />
            </>
          }
        />
        <Route
          path="admin/user/transactions/:id"
          element={
            <>
              <ScrollRestoration />
              <AdminNavbar
                authenticationModal={authenticationModal}
                setAuthenticationModal={setAuthenticationModal}
              />
              <ViewTransactions />
              <br />
              <br />
              <AdminFooter
                authenticationModal={authenticationModal}
                setAuthenticationModal={setAuthenticationModal}
              />
            </>
          }
        />
        <Route
          path="admin/merchants"
          element={
            <>
              <ScrollRestoration />
              <AdminNavbar
                authenticationModal={authenticationModal}
                setAuthenticationModal={setAuthenticationModal}
              />
              <AdminMerchants />
              <br />
              <br />
              <AdminFooter
                authenticationModal={authenticationModal}
                setAuthenticationModal={setAuthenticationModal}
              />
            </>
          }
        />
        <Route
          path="admin/merchants/detail/:id"
          element={
            <>
              <ScrollRestoration />
              <AdminNavbar
                authenticationModal={authenticationModal}
                setAuthenticationModal={setAuthenticationModal}
              />
              <MerchantDetail />
              <br />
              <br />
              <AdminFooter
                authenticationModal={authenticationModal}
                setAuthenticationModal={setAuthenticationModal}
              />
            </>
          }
        />
        <Route
          path="admin/merchants/raffles/:id"
          element={
            <>
              <ScrollRestoration />
              <AdminNavbar
                authenticationModal={authenticationModal}
                setAuthenticationModal={setAuthenticationModal}
              />
              <ViewRaffles />
              <br />
              <br />
              <AdminFooter
                authenticationModal={authenticationModal}
                setAuthenticationModal={setAuthenticationModal}
              />
            </>
          }
        />
        <Route
          path="admin/merchants/raffles/salse/:id"
          element={
            <>
              <ScrollRestoration />
              <AdminNavbar
                authenticationModal={authenticationModal}
                setAuthenticationModal={setAuthenticationModal}
              />
              <ViewSalse />
              <br />
              <br />
              <AdminFooter
                authenticationModal={authenticationModal}
                setAuthenticationModal={setAuthenticationModal}
              />
            </>
          }
        />
        <Route
          path="admin/raffles"
          element={
            <>
              <ScrollRestoration />
              <AdminNavbar
                authenticationModal={authenticationModal}
                setAuthenticationModal={setAuthenticationModal}
              />
              <AdminRaffles />
              <br />
              <br />
              <AdminFooter
                authenticationModal={authenticationModal}
                setAuthenticationModal={setAuthenticationModal}
              />
            </>
          }
        />
        <Route
          path="admin/edit/:id"
          element={
            <>
              <ScrollRestoration />
              <AdminNavbar
                authenticationModal={authenticationModal}
                setAuthenticationModal={setAuthenticationModal}
              />
              <AdminCreate />
              <br />
              <br />
              <AdminFooter
                authenticationModal={authenticationModal}
                setAuthenticationModal={setAuthenticationModal}
              />
            </>
          }
        />
        <Route
          path="admin/winners"
          element={
            <>
              <ScrollRestoration />
              <AdminNavbar
                authenticationModal={authenticationModal}
                setAuthenticationModal={setAuthenticationModal}
              />
              <AdminWinners />
              <br />
              <br />
              <AdminFooter
                authenticationModal={authenticationModal}
                setAuthenticationModal={setAuthenticationModal}
              />
            </>
          }
        />
        <Route
          path="admin/orders"
          element={
            <>
              <ScrollRestoration />
              <AdminNavbar
                authenticationModal={authenticationModal}
                setAuthenticationModal={setAuthenticationModal}
              />
              <AdminOrders />
              <br />
              <br />
              <AdminFooter
                authenticationModal={authenticationModal}
                setAuthenticationModal={setAuthenticationModal}
              />
            </>
          }
        />
        <Route
          path="admin/orders/detail/:id"
          element={
            <>
              <ScrollRestoration />
              <AdminNavbar
                authenticationModal={authenticationModal}
                setAuthenticationModal={setAuthenticationModal}
              />
              <ViewOrder />
              <br />
              <br />
              <AdminFooter
                authenticationModal={authenticationModal}
                setAuthenticationModal={setAuthenticationModal}
              />
            </>
          }
        />
        <Route
          path="admin/entries/detail/:id"
          element={
            <>
              <ScrollRestoration />
              <AdminNavbar
                authenticationModal={authenticationModal}
                setAuthenticationModal={setAuthenticationModal}
              />
              <EntriesDetails />
              <br />
              <br />
              <AdminFooter
                authenticationModal={authenticationModal}
                setAuthenticationModal={setAuthenticationModal}
              />
            </>
          }
        />
        <Route
          path="admin/contact-us"
          element={
            <>
              <ScrollRestoration />
              <AdminNavbar
                authenticationModal={authenticationModal}
                setAuthenticationModal={setAuthenticationModal}
              />
              <ContactUs />
              <br />
              <br />
              <AdminFooter
                authenticationModal={authenticationModal}
                setAuthenticationModal={setAuthenticationModal}
              />
            </>
          }
        />
        <Route
          path="admin/settings"
          element={
            <>
              <ScrollRestoration />
              <AdminNavbar
                authenticationModal={authenticationModal}
                setAuthenticationModal={setAuthenticationModal}
              />
              <AdminSettings />
              <br />
              <br />
              <AdminFooter
                authenticationModal={authenticationModal}
                setAuthenticationModal={setAuthenticationModal}
              />
            </>
          }
        />
        <Route
          path="admin/categories"
          element={
            <>
              <ScrollRestoration />
              <AdminNavbar
                authenticationModal={authenticationModal}
                setAuthenticationModal={setAuthenticationModal}
              />
              <Categories />
              <br />
              <br />
              <AdminFooter
                authenticationModal={authenticationModal}
                setAuthenticationModal={setAuthenticationModal}
              />
            </>
          }
        />
        <Route
          path="admin/coupon"
          element={
            <>
              <ScrollRestoration />
              <AdminNavbar
                authenticationModal={authenticationModal}
                setAuthenticationModal={setAuthenticationModal}
              />
              <CouponListing />
              {/* <Coupon /> */}
              <br />
              <br />
              <AdminFooter
                authenticationModal={authenticationModal}
                setAuthenticationModal={setAuthenticationModal}
              />
            </>
          }
        />
        <Route
          path="admin/coupon/:id"
          element={
            <>
              <ScrollRestoration />
              <AdminNavbar
                authenticationModal={authenticationModal}
                setAuthenticationModal={setAuthenticationModal}
              />
              {/* <CouponListing /> */}
              <Coupon />
              <br />
              <br />
              <AdminFooter
                authenticationModal={authenticationModal}
                setAuthenticationModal={setAuthenticationModal}
              />
            </>
          }
        />
        <Route
          path="admin/coupon/create"
          element={
            <>
              <ScrollRestoration />
              <AdminNavbar
                authenticationModal={authenticationModal}
                setAuthenticationModal={setAuthenticationModal}
              />
              {/* <CouponListing /> */}
              <Coupon />
              <br />
              <br />
              <AdminFooter
                authenticationModal={authenticationModal}
                setAuthenticationModal={setAuthenticationModal}
              />
            </>
          }
        />
        <Route
          path="admin/terms-condition"
          element={
            <>
              <ScrollRestoration />
              <AdminNavbar
                authenticationModal={authenticationModal}
                setAuthenticationModal={setAuthenticationModal}
              />
              {/* <TermsConditionListing /> */}
              <TermsConditions />

              <br />
              <br />
              <AdminFooter
                authenticationModal={authenticationModal}
                setAuthenticationModal={setAuthenticationModal}
              />
            </>
          }
        />
        <Route
          path="admin/terms-condition/create"
          element={
            <>
              <ScrollRestoration />
              <AdminNavbar
                authenticationModal={authenticationModal}
                setAuthenticationModal={setAuthenticationModal}
              />
              <TermsConditions />

              <br />
              <br />
              <AdminFooter
                authenticationModal={authenticationModal}
                setAuthenticationModal={setAuthenticationModal}
              />
            </>
          }
        />
        <Route
          path="admin/entries"
          element={
            <>
              <ScrollRestoration />
              <AdminNavbar
                authenticationModal={authenticationModal}
                setAuthenticationModal={setAuthenticationModal}
              />
              <AdminEntries />
              <br />
              <br />
              <AdminFooter
                authenticationModal={authenticationModal}
                setAuthenticationModal={setAuthenticationModal}
              />
            </>
          }
        />
        <Route
          path="admin/reports"
          element={
            <>
              <ScrollRestoration />
              <AdminNavbar
                authenticationModal={authenticationModal}
                setAuthenticationModal={setAuthenticationModal}
              />
              <AdminReports />
              <br />
              <br />
              <AdminFooter
                authenticationModal={authenticationModal}
                setAuthenticationModal={setAuthenticationModal}
              />
            </>
          }
        />
        {/* <Route path="notification" element={
          <>
            <Navbar authenticationModal={authenticationModal} setAuthenticationModal={setAuthenticationModal} />
            <Notification />
            <br />
            <br />
            <Footer />
          </>
        } /> */}
        <Route
          path="admin/notification-nav"
          element={
            <>
              <ScrollRestoration />
              <AdminNavbar
                authenticationModal={authenticationModal}
                setAuthenticationModal={setAuthenticationModal}
              />
              <AdminNotification />
              <br />
              <br />
              <AdminFooter
                authenticationModal={authenticationModal}
                setAuthenticationModal={setAuthenticationModal}
              />
            </>
          }
        />
        {/* <Route path="faq" element={
          <>
            <ScrollRestoration />
            <DummyNavbar />
            <Faq />
            <br />
            <br />
            <DummyNavbar />
          </>
        } /> */}
      </>
      // <Route path="/" element={<ComingSoon />} />
    )
  );

  const accessToken = Cookies.get('accessToken');


  const handleClickAnywhere = () => {
    getAccessToken()
  };

  // Add event listener when the component mounts
  useEffect(() => {
    // getAccessToken()
    // document.body.addEventListener('click', handleClickAnywhere);

    // // Cleanup the event listener when the component unmounts
    // return () => {
    //   document.body.removeEventListener('click', handleClickAnywhere);
    // };
  }, [document.body]);



  const getAccessToken = async () => {

    setTimeout(async () => {
      if (!accessToken) {
        await fetchAccessToken();
      }
    }, 100)


  }

  useEffect(() => {
    if (!accessToken) {
      setTimeout(async () => {
        await fetchAccessToken();
      }, 100)
    }
  }, [])


  setInterval(async () => {
    if (!accessToken) {
      await fetchAccessToken();
    }
  }, 300000)


  return (


    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <RouterProvider router={router} />
        </div>
      )}
    </>
  );
}

export default App;