import { CreditCard, ShoppingCart } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { API_INSTANCE } from "../../API/Instance";
import leftarrow from "../../assets/Arrow_Forward.svg";
import cart from "../../assets/cart/_cart.png";
import noimage from "../../assets/no-image.png";
import { API_ENDPOINTS, CONSTANT_DATA } from "../../constants";
import { clearCart, removeItemFromCart } from "../../Redux/Cart/cartSlice";
import { capturePaypalOrder, confirmPaypalOrder, createOrder } from "../../Services/Authentication/purchase";
import { errorToast } from "../../Utils/Toast/error.toast";
import { successToast } from "../../Utils/Toast/success.toast";
import { updateRaffleStatus } from "@/Services/Admin/getDashboardData";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import FreeRaffleEntryForm from "../Authentication/Components/FreeRaffleEntryForm";
import { storeGuestUser } from "@/Redux/User/userSlice";


const UserCart = ({ authenticationModal, setAuthenticationModal }: any) => {
  const [couponName, setCouponName] = useState<string>("");
  const [discount, setDiscount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("acquired");
  const [isAgreed, setIsAgreed] = useState(false);
  const [isFreeModalOpen, setIsFreeModalOpen] = useState<boolean>(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(
    null
  );

  const [formData, setFormData] = useState({
    firstname: "",
    Role: "Customer",
    lastname: "",
    dialCode: '+44',
    password: "Anthem#11",
    email: "",
    phone: "",
  });

  const userData = useSelector((state: any) => state.reducer.user);

  const { state, pathname } = useLocation();
  console.log("state", state);

  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  const cartData = [
    {
      title:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer fringilla neque eu rutrum commodo.",
      description: "En stock",
      isCertified: true,
      guaranteeTime: "12 months",
      price: "£5.00",
      image: cart,
    },
    {
      title:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer fringilla neque eu rutrum commodo.",
      description: "En stock",
      isCertified: true,
      guaranteeTime: "12 months",
      price: "£5.00",
      image: cart,
    },
  ];

  const navigate = useNavigate();

  const userCart = useSelector((state: any) => state.reducer?.cart?.cartItems);
  const dispatch = useDispatch();
  console.log(userCart);

  const handleRemoveCart = (item: any, i: any) => {
    dispatch(removeItemFromCart(item));
  };
  console.log("userCart", userCart);

  const totalPrice = userCart.reduce((total: any, item: any) => {
    const itemTotal = parseFloat(item.ticket_price) * item.qty;
    return total + itemTotal;
  }, 0);
  const [isThankYou, setIsThankYou] = useState(false);
  const [dataSet, setDataSet] = useState<{ result: any[]; raffleData: any[] }>({
    result: [],
    raffleData: [],
  });
  const [isTableReady, setIsTableReady] = useState(false);
  const [isPayPalReady, setIsPayPalReady] = useState(false);
  const [payPalOrderId, setPayPalOrderId] = useState<string | null>(null);
  const [clientId, setClientId] = useState<string>("");
  const payPalOrderIdRef = useRef(null);
  const raffleOrderId = useRef(null);
  const paypalRequestIdRef = useRef(null);


  const selectPaymentMethod = async () => {
    setPaymentMethod("paypal");
  };

  const handlePaymentNavigate = async () => {
    debugger;
    try {
      if (!userData?.guestuser?.role && userCart[0].isFreeRaffle) {
        setIsFreeModalOpen(true);
        return;
      }
      else if (!userData?.user?.role && !userCart[0].isFreeRaffle) {
        return setAuthenticationModal({
          ...authenticationModal,
          isSignInOpen: true,
        });
      }
      else {

        if (userCart.length === 0) {
          return errorToast("Your cart is empty. Please add items before checkout.");
        }
        setIsLoading(true);
        console.log(">>>>>", discount);

        let coupon;
        if (couponName) {
          coupon = couponName;  // Pass coupon name instead of discount
        }

        const paymentData = {
          raffleData: userCart,
          paymentMethod,
          paymentInfo: {},
          totalPrice,
          coupon,
        };

        const response = await createOrder(paymentData);
        console.log("response", response);
        // const a = await purchaseRaffle(paymentData)

        if (response?.result?.redirectTo) {
          window.location.href = response?.result?.redirectTo; // Redirect to Acquired for payment approval
        }

        if (paymentMethod === "acquired" && response?.result?.result?.paymentLink) {
          console.log("a.result.result.paymentLink", response.result.result.paymentLink)
          window.location.href = response.result.result.paymentLink; // Redirect to Acquired for payment approval
        }

        if (paymentMethod === "paypal") {
          setPayPalOrderId(response?.result?.result?.orderId);
          console.log("PayPal Order ID Set:", response?.result?.result?.orderId);
          setIsPayPalReady(true);
          setClientId(response?.result?.result?.paypalClientId)
          console.log("isPayPalReady Set to True");
        }

        if (Array.isArray(response?.result?.raffleData)) {
          for (const raffle of response.result?.raffleData) {
            if (raffle?.ticket_set_prize == raffle?.totalPurchasedTicket) {
              console.log("UPDATE STATUS", raffle);
              await updateRaffleStatus(raffle?._id, 2);
            }
          }
        }

        setIsLoading(false);
        if (!response.success){
          dispatch(storeGuestUser(""))
          return errorToast(response.message);
        } 
        else{
        // setIsPaymentDone(true);
        // successToast('Payment Successful!');
        // successToast('success', 'Payment Successful!', 'Get 1 more free ticket by simply sharing this link!', 'Share', '#FF6A78');
        // paymentSuccessToast();
        setDataSet(response.result);
        setIsTableReady(true);
        setIsThankYou(true);
        dispatch(storeGuestUser(""))
        // // Clear raffle from cart
        // dispatch(clearCart());
        return response.result;
        }
      }

      // setIsPaymentDone(true)
    } catch (error: any) {
      console.log("error", error);
      errorToast(error.message);
    }
  };


  useEffect(() => {
    console.log(userCart);
    // Make sure PayPal script is loaded
    const loadPayPalScript = async () => {
      try {
        const script = document.createElement("script");
        script.src = `https://www.paypal.com/sdk/js?client-id=${CONSTANT_DATA.CLIENT_ID}&currency=GBP`;

        script.async = true;
        script.onload = () => setIsPayPalReady(true);
        document.body.appendChild(script);
      } catch (error) {
        console.error("Error loading PayPal script: ", error);
      }
    };

    loadPayPalScript();
  }, []);


  const handleCouponSubmit = async () => {
    try {
      // Step 1: Validate coupon
      const email = userData?.user?.email;
      const raffleData = userCart.map((item: any) => ({
        raffleId: item._id,
        quantity: item.qty, // Include quantity
      }));

      const couponResult = await API_INSTANCE.post(
        API_ENDPOINTS.VALIDATE_COUPON,
        { couponCode: couponName, email, raffleData },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (couponResult.data.isValid) {
        const couponData = couponResult.data.coupon;

        // Step 2: Get values directly from backend response
        const matchingTotalPrice = couponResult.data.matchingTotalPrice;
        const discountTotal = couponResult.data.discountTotal;
        const discountedPrice = couponResult.data.discountedPrice;

        // Step 3: Update user data with coupon
        const updateResult = await API_INSTANCE.post(
          API_ENDPOINTS.UPDATE_USER_DATA,
          { coupon: couponData },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (updateResult.data.success) {
          // Step 4: Set the discount values based on backend response

          setDiscount(discountTotal); // Set the discount amount

          successToast("You get a discount");
          console.log("Updated user data:", updateResult.data.result);
        } else {
          errorToast("Failed to update user data");
        }
      } else {
        errorToast(couponResult.data.message || "Invalid Coupon Code");
      }
    } catch (error: any) {
      console.error("Error:", error);
      errorToast(error.response?.data?.message || "Something went wrong, please try again.");
    }
  };


  const handleSubmit = (e: any) => {
    // Prevent the default form submission
    e.preventDefault();

    // You can add your form submission logic here, e.g., validation, API call, etc.
    console.log("Form Submitted!");
  };

  return (
    <div className="bg-[#F9F0F0] lg:bg-white pb-12 lg:pb-0 footer-manage" style={{ fontFamily: "poppins, sans-serif" }}>
      <div
        className={`block lg:flex h-fit items-start justify-between w-[90%] gap-6 m-auto pt-12 lg:mt-12`}
      >
        <div className="w-full lg:w-[68%] ">
          <div
            className="flex items-center font-poppins text-lg font-light text-left mb-4 cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <img src={leftarrow} alt="Back arrow" className="h-4 ml-2 mr-2" />
            <span className="text-semi-black">Back</span>
          </div>
          {userCart.length > 0 ? (
            userCart.map((item: any, i: any) => (
              <div>
                <div className="bg-white lg:bg-[#F9F0F0]   p-8">
                  <div className="">
                    <div className="flex flex-wrap">
                      <div className="cartimage">
                        <img
                          className="w-full"
                          src={
                            item
                              ? CONSTANT_DATA.IMAGE_BASE_URL + item.images[0]
                              : noimage
                          }
                          alt={item.title}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = noimage;
                          }}
                        />

                      </div>

                      <div className="cartdesc">
                        <h1 className="font-medium tracking-wide text-sm lg:text-lg mt-5 lg:mt-0">
                          {item.raffle_name}
                        </h1>
                        <div className="max-w-xl">
                          {/* <p className="  tracking-wide hidden lg:block break-words mt-2">
                            {item.raffle_description}
                          </p> */}
                          <div className="tracking-wide hidden lg:block break-words mt-2">
                            <div
                              dangerouslySetInnerHTML={{
                                __html: item.raffle_description,
                              }}
                              className="raffle-details-description"
                            />
                          </div>
                        </div>
                        <p className="tracking-wide break-words mt-2">
                          <b>Qunatity : </b>{item.qty}
                        </p>
                        <p className="block lg:hidden font-bold text-sm lg:text-lg mt-5 lg:mt-0">
                          £{item.ticket_price}
                        </p>

                      </div>
                      <div className="cartprice">
                        <p
                          className="hidden lg:block font-bold text-xl text-right text-[#background: #3C3C3C] tracking-wide font-poppins"
                          style={{ lineHeight: "26.7px" }}
                        >
                          £{item.ticket_price}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    onClick={() => {
                      handleRemoveCart(item, i);
                    }}
                    className="flex justify-end items-center gap-2 cursor-pointer"
                  >
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 17 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.2261 2.352H12.8936V1.62658C12.8939 1.53086 12.8768 1.43601 12.8434 1.34751C12.81 1.259 12.7608 1.17859 12.6988 1.11091C12.6367 1.04322 12.563 0.989599 12.4819 0.953135C12.4008 0.91667 12.3138 0.898082 12.2261 0.898443H5.56105C5.4733 0.898082 5.38636 0.91667 5.30522 0.953135C5.22409 0.989599 5.15037 1.04322 5.08832 1.11091C5.02628 1.17859 4.97712 1.259 4.94369 1.34751C4.91026 1.43601 4.89322 1.53086 4.89355 1.62658V2.352H1.56105C1.38402 2.352 1.21424 2.42871 1.08906 2.56526C0.96388 2.70182 0.893555 2.88702 0.893555 3.08014C0.893555 3.27325 0.96388 3.45846 1.08906 3.59501C1.21424 3.73156 1.38402 3.80828 1.56105 3.80828H2.89355V14.7167C2.89355 15.2954 3.10427 15.8503 3.47934 16.2594C3.85441 16.6686 4.36312 16.8984 4.89355 16.8984H12.8936C13.424 16.8984 13.9327 16.6686 14.3078 16.2594C14.6828 15.8503 14.8936 15.2954 14.8936 14.7167V3.80828H16.2261C16.4031 3.80828 16.5729 3.73156 16.698 3.59501C16.8232 3.45846 16.8936 3.27325 16.8936 3.08014C16.8936 2.88702 16.8232 2.70182 16.698 2.56526C16.5729 2.42871 16.4031 2.352 16.2261 2.352ZM13.5611 14.7167C13.5604 14.9094 13.4898 15.0939 13.3647 15.2299C13.2396 15.3658 13.0702 15.4422 12.8936 15.4422H4.89355C4.71695 15.4422 4.54755 15.3658 4.42244 15.2299C4.29733 15.0939 4.22672 14.9094 4.22605 14.7167V3.80828H13.5611V14.7167Z"
                        fill="#FF6A78"
                      />
                      <path
                        d="M6.89309 13.2605C7.06969 13.2605 7.23909 13.1842 7.3642 13.0482C7.48931 12.9123 7.55992 12.7278 7.56059 12.5351V6.71545C7.56059 6.52233 7.49026 6.33712 7.36508 6.20057C7.2399 6.06402 7.07012 5.9873 6.89309 5.9873C6.71605 5.9873 6.54627 6.06402 6.42109 6.20057C6.29591 6.33712 6.22559 6.52233 6.22559 6.71545V12.5351C6.22625 12.7278 6.29686 12.9123 6.42197 13.0482C6.54708 13.1842 6.71649 13.2605 6.89309 13.2605Z"
                        fill="#FF6A78"
                      />
                      <path
                        d="M10.8931 13.2605C11.0697 13.2605 11.2391 13.1842 11.3642 13.0482C11.4893 12.9123 11.5599 12.7278 11.5606 12.5351V6.71545C11.5606 6.52233 11.4903 6.33712 11.3651 6.20057C11.2399 6.06402 11.0701 5.9873 10.8931 5.9873C10.7161 5.9873 10.5463 6.06402 10.4211 6.20057C10.2959 6.33712 10.2256 6.52233 10.2256 6.71545V12.5351C10.2262 12.7278 10.2969 12.9123 10.422 13.0482C10.5471 13.1842 10.7165 13.2605 10.8931 13.2605Z"
                        fill="#FF6A78"
                      />
                    </svg>
                    <p className=" text-[#FF6A78]">DELETE</p>
                  </div>
                </div>
                <br />
              </div>
            ))
          ) : (
            <>
              <div>
                <h3 className="text-center text-xl font-medium tracking-wide">
                  No Cart Items Found
                </h3>
              </div>
            </>
          )}
        </div>

        <div className=" w-full lg:w-[30%]  h-fit">
          {totalPrice > 0 && (
            <div className="w-[100%] m-auto my-4 relative">

              <input
                type="text"
                value={couponName}
                onChange={(e) => setCouponName(e.target.value)}
                placeholder="Enter coupon code"
                className="w-full p-3 border border-gray-300 pr-10"
              />

              {discount > 0 && (
                <svg
                  onClick={() => {
                    setCouponName('');
                    setDiscount(0);
                    localStorage.removeItem('couponName');
                    localStorage.removeItem('discount');
                    successToast("Coupon removed successfully!");
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="text-blue-500"  // Blue color
                  className="absolute right-3 top-[22%] transform -translate-y-1/2 cursor-pointer text-xl w-10 h-10 hover:fill-red-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.225 4.811a.75.75 0 0 1 1.06 0L12 9.525l4.715-4.714a.75.75 0 1 1 1.06 1.06L13.06 10.586l4.715 4.715a.75.75 0 0 1-1.06 1.06L12 11.646l-4.715 4.715a.75.75 0 0 1-1.06-1.06l4.715-4.715-4.715-4.715a.75.75 0 0 1 0-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              )}

              <button
                onClick={handleCouponSubmit}
                className="font-bold text-md lg:text-2xl text-white bg-[#2D234A] w-[100%] p-4 m-auto mt-2"
              >
                APPLY COUPON
              </button>

            </div>
          )}
          <div className="bg-white  border-[#FF6A78] border-2 py-8 px-6 h-fit">
            <h2 className="font-bold text-md lg:text-xl tracking-wider">
              SUMMARY
            </h2>
            <div className="w-[100%] m-auto h-[0.5px] bg-[#A1A1A1] mt-6"></div>
            <div className="mt-8">
              <h5 className="text-md lg:text-xl font-bold">Sub Total</h5>
              <p className="text-sm lg:text-lg font-medium mt-1">
                £{totalPrice.toFixed(2)}
              </p>
              <h5 className="text-md lg:text-xl font-bold mt-4">Discount</h5>
              <p className="text-sm lg:text-lg font-medium mt-1">
                £{discount.toFixed(2)}
              </p>
              <h5 className="text-md lg:text-xl font-bold mt-4">
                Grand Total :
              </h5>

              <h5 className="text-md lg:text-xl font-bold text-[#F66E6A] mt-2">
                £{(totalPrice - discount).toFixed(2)}
              </h5>
              <br />
{/*            
              <div className="w-full mt-6 bg-white md:py-4 rounded-3xl text-raffles-light-blue block">
                    <p className="text-base sm:text-lg font-modernBold">
                      Question
                    </p>
                    <p className="text-[12px] sm:text-[14px] leading-[16.8px] sm:leading-[19.6px] text-raffles-light-blue font-modernRegular mt-1">
                      {userCart[0].question}
                    </p>
                    <select
                      value={selectedAnswerIndex ?? ""}
                      onChange={(e) =>
                        setSelectedAnswerIndex(Number(e.target.value))
                      }
                      className="w-full mt-3 p-3 border border-gray-300 rounded-md text-gray-500"
                    >
                      <option value="" disabled>
                        Select your answer
                      </option>
                      {userCart[0].answers?.map(
                        (answer: string, index: number) => (
                          <option key={index} value={index}>
                            {answer}
                          </option>
                        )
                      )}
                    </select>
                  </div> */}
              <form
                onSubmit={(e) => {
                  handleSubmit(e);
                  handlePaymentNavigate();
                }}
              >
                <div className="mt-3">
                  <label>
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      required
                      className="mr-2"
                      onChange={(e) => setIsAgreed(e.target.checked)}
                    />
                    I am over 18 years of age and agree to the terms and
                    conditions.
                  </label>
                </div>

                {/* Second Checkbox (Optional) */}
                {/* <div className="mt-3">
                  <label>
                    <input
                      type="checkbox"
                      name="contactForOffers"
                      className="mr-2"
                    />
                    Contact me about prizes & competitions, offers, and services
                    from 3rd parties.
                  </label>
                </div> */}

                {/* Divider */}
                <div className="w-[100%] m-auto h-[0.5px] bg-[#A1A1A1] mt-4"></div>


                <div className="my-4">
                  <div className="flex rounded-lg border px-6 py-4 flex-col">
                    {totalPrice > 0 ? (
                      <>
                        <h2 className="text-lg font-modernBold text-raffles-light-blue mb-2">
                          Choose Payment Method
                        </h2>
                        <p className="text-sm text-gray-600 mb-6">
                          Select your preferred payment option
                        </p>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          {/* Credit / Debit Card */}
                          <button
                            type="button"
                            className={`flex flex-col items-center justify-center p-4 border rounded-lg focus:outline-none hover:bg-gray-50 hover:border-raffles-pink ${paymentMethod === "acquired" ? "bg-gray-50 border-raffles-pink" : ""}`}
                            onClick={() => setPaymentMethod("acquired")}
                          >
                            <CreditCard className={`w-6 h-6 mb-2 ${paymentMethod === "acquired" ? "text-raffles-pink" : "text-gray-700"}`} />
                            <span className={`text-sm ${paymentMethod === "acquired" ? "text-raffles-pink font-modernBold" : "text-gray-800"}`}>
                              Credit / Debit Card
                            </span>
                          </button>

                          {/* PayPal */}
                          <button
                            type="button"
                            className={`flex flex-col items-center justify-center p-4 border rounded-lg focus:outline-none hover:bg-gray-50 hover:border-raffles-pink ${paymentMethod === "paypal" ? "bg-gray-50 border-raffles-pink" : ""}`}
                            onClick={async () => {
                              if (!isAgreed) {
                                errorToast("Please agree to the terms and conditions before proceeding with PayPal.");
                                return; // Stop further execution if the checkbox is not checked
                              }

                              await selectPaymentMethod(); // Trigger createOrder when PayPal option is selected
                            }}
                          >
                            <ShoppingCart className={`w-6 h-6 mb-2 ${paymentMethod === "paypal" ? "text-raffles-pink" : "text-gray-700"}`} />
                            <span className={`text-sm ${paymentMethod === "paypal" ? "text-raffles-pink font-modernBold" : "text-gray-800"}`}>
                              PayPal
                            </span>
                          </button>
                        </div>  </>
                    ) : null}

                    {/* PayPal Button */}
                    {paymentMethod === "paypal" ? (

                      <PayPalScriptProvider options={{ clientId: CONSTANT_DATA.CLIENT_ID, currency: 'GBP' }}>
                        <PayPalButtons
                          style={{
                            shape: "rect",
                            layout: "vertical",
                            color: "gold",
                            label: "paypal",
                          }}
                          createOrder={async (data, actions) => {
                            try {
                              if (!userData?.user?.role) {
                                return setAuthenticationModal({
                                  ...authenticationModal,
                                  isSignInOpen: true,
                                });
                              }
                              // Await the network call to fetch the order data
                              const orderResponse = await handlePaymentNavigate(); // Make sure this returns a promise

                              // Check if the orderResponse contains the expected data
                              console.log('orderResponse', orderResponse);

                              // Extract the order ID from the response (ensure this path is correct)
                              const paypalOrderId = orderResponse?.result?.paypalOrder?.id;
                              const paypalRequestId = orderResponse?.result?.paypalRequestId;
                              console.log('paypalOrderId>>>>>', paypalOrderId);
                              console.log('paypalRequestId:', paypalRequestId);

                              // Check if we successfully received an order ID
                              if (!paypalOrderId) {
                                throw new Error("Order ID not returned from server");
                              }
                              payPalOrderIdRef.current = paypalOrderId;
                              paypalRequestIdRef.current = paypalRequestId;
                              raffleOrderId.current = orderResponse?.result?.orderId;
                              // Set the PayPal order ID for later use
                              setPayPalOrderId(paypalOrderId);


                              // Return the order ID to PayPal Buttons
                              return paypalOrderId;
                            } catch (error) {
                              console.error("Error in createOrder:", error);
                              errorToast("Failed to create PayPal order. Please try again.");
                              return ""; // Return an empty string in case of an error
                            }

                          }}
                          onApprove={async (data, actions) => {
                            try {
                              const orderId = payPalOrderIdRef.current;
                              const paypalRequestId = paypalRequestIdRef.current;

                              console.log("PayPal Order ID in onApprove:", orderId);
                              console.log("PayPal Request ID in onApprove:", paypalRequestId);
                              if (!orderId) {
                                throw new Error("Order ID is missing in PayPal order approval.");

                              }
                              const capture = await actions.order?.capture();
                              if (!capture) {

                                throw new Error("Payment capture failed.");

                              }
                              successToast("Payment successful!");
                              const captureResponse = await capturePaypalOrder(capture.id!, paypalRequestId!);
                              if (captureResponse.status == "INSTRUMENT_DECLINED") {
                                return actions.restart();
                              }
                              else if (captureResponse.status == "ORDER_ALREADY_CAPTURED" || captureResponse.status == "COMPLETED") {
                                const confirmResponse = await confirmPaypalOrder(
                                  raffleOrderId.current!, // PayPal Order ID
                                  capture.id! // Transaction ID
                                );
                                console.log('confirmResponse', confirmResponse)

                                window.location.href = confirmResponse.redirect;
                              } else {
                                errorToast("Payment failed, please try again.");
                              }

                            } catch (error) {
                              console.error("Payment approval error:", error);
                              errorToast("Payment failed, please try again.");
                            }
                          }}
                          onError={(error) => {
                            console.error("PayPal Buttons Error:", error);
                            if (!userData?.user?.role) {

                            } else {
                              errorToast("Payment failed, please try again.");
                            }

                          }}
                        />
                      </PayPalScriptProvider>
                    ) : (
                      <button
                        type="submit"
                        className={`w-full py-2 h-[45px] rounded font-medium ${paymentMethod
                          ? "bg-raffles-light-blue text-white hover:bg-[#2D234A]"
                          : "bg-gray-300 text-gray-600 cursor-not-allowed"
                          }`}
                        disabled={!paymentMethod || isLoading}
                      >
                        {isLoading ? "Processing..." : "Continue to Payment"}
                      </button>
                    )}
                  </div>
                </div>

                {/* Checkout Button */}
                <div className="w-[100%] my-4"></div>
              </form>
            </div>
            {
              isFreeModalOpen && <FreeRaffleEntryForm userRegisterData={formData} raffleId={'uniqueId'} setUserRegisterData={setFormData} isFreeModalOpen={isFreeModalOpen} setIsFreeModalOpen={setIsFreeModalOpen} />
            }
          </div>
        </div>
      </div >
    </div >
  );
};

export default UserCart;
