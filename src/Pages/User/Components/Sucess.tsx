import { FunctionComponent, useEffect, useState } from "react";
import mainimage from "../../../assets/sucess/Group66424.png";
import check from "../../../assets/sucess/62check.png";
import calender from "../../../assets/sucess/14648129651608672862.png";
import usericon from "../../../assets/sucess/Group66420.png";
import { CONSTANT_DATA } from "../../../constants";
import noimage from "../../../assets/no-image.png";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  createOrder,
  getDataByOrderId,
} from "../../../Services/Authentication/purchase";
import { User } from "../../../Utils/Interface/Customer";
import { clearCart } from "@/Redux/Cart/cartSlice";

export type SucessType = {
  className?: string;

  // result?: any;
  discount?: any;
};

const Sucess: FunctionComponent<SucessType> = ({
  className = "",

  // result,
  discount,
}) => {
  const location = useLocation(); // Get access to the query string
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("acquired");
  const [dataSet, setDataSet] = useState<{ result: any[]; raffleData: any[] }>({
    result: [],
    raffleData: [],
  });

  const userCart = useSelector((state: any) => state.reducer?.cart?.cartItems);

  const totalPrice = userCart.reduce((total: any, item: any) => {
    const itemTotal = parseFloat(item.ticket_price) * item.qty;
    return total + itemTotal;
  }, 0);

  const dispatch = useDispatch();

  useEffect(() => {
    if (orderDetails?.orderDetails?.orderStatus === "completed") {
      dispatch(clearCart());
    }
  }, [orderDetails?.orderDetails?.orderStatus, dispatch]);


  useEffect(() => {
    // Extract orderId from the query string
    const params = new URLSearchParams(location.search);
    let extractedOrderId = params.get("orderId"); // Get orderId from the query params

    if (extractedOrderId) {
      // Clean the orderId by removing unwanted characters like %7D (or '}')
      extractedOrderId = extractedOrderId.replace(/%7D|}/g, ""); // Remove %7D or }
      setOrderId(extractedOrderId); // Set cleaned orderId in state
      thankYouPageData(extractedOrderId); // Call API with the cleaned orderId
    }
  }, [location.search]); // Re-run the effect when query string changes

  const [userDetails, setUserDetails] = useState<User>({
    _id: "",
    firstname: "",
    lastname: "",
    email: "",
    role: "",
    dialCode: {
      country: "",
      code: "",
      dial_code: "",
    },
    phone: "",
    landline: '',
    referralCode: "",
    businessName: "",
    businessAddress: "",
    businessEmailNote: "",
    businessEmailVerify: "",
    description: "",
    VATNumber: "",
    companyNumber: "",
    image: null,
    websites: "",
    companyName: "",
    createdAt: "",
    wallet: {
      _id: "",
      cardDetails: [],
      balance: "",
      revenue: [],
      profits: "",
      userID: "",
      createdAt: "",
      updatedAt: "",
    },
    country: "",
    city: "",
    address: "",
    region: "",
    postcode: "",
  });

  const paymentData = {
    raffleData: userCart,
    paymentMethod,
    paymentInfo: {},
    totalPrice,
  };

  const thankYouPageData = async (orderId: string) => {
    try {
      const details = await getDataByOrderId(orderId); // Call the API function with the cleaned orderId
      setOrderDetails(details);
      // const a = await createOrder(paymentData);
      // console.log("A...", a);

      //setDataSet(a?.result);
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  return (
    <section style={{ fontFamily: "poppins, sans-serif" }}
      className={`w-full max-w-[1428px] mx-auto my-8 px-4 sm:px-8 md:px-16 lg:px-[63px] text-left text-xl text-black font-poppins`}
    >
      <div className="flex flex-col lg:flex-row items-start justify-center gap-8 shadow-lg rounded-xl p-4 sm:p-8">
        <div className="w-full lg:w-1/2 flex flex-col items-start justify-start">
          <div className="w-full relative">
            <img
              className="top-0 left-0 w-full rounded-xl"
              style={{ maxHeight: "300px" }}
              loading="lazy"
              alt=""
              src={
                orderDetails?.raffleDetails?.length > 0 &&
                  orderDetails?.raffleDetails[0]?.images?.length > 0
                  ? CONSTANT_DATA.IMAGE_BASE_URL +
                  orderDetails?.raffleDetails[0]?.images[0]
                  : noimage
              }
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = noimage;
              }}
            />
          </div>
          <div className="w-full mt-4 lg:mt-20 flex justify-center">
            <h3 className="inline-block max-w-full text-white tracking-[-0.01em] font-medium text-base sm:text-xl px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer rounded-lg">
              Order Id: [{orderDetails?.orderDetails?._id}]
            </h3>
          </div>
        </div>
        <div className="w-full lg:w-1/2 flex flex-col items-start justify-start gap-6 text-salmon-200">
          <div className="w-full">
            <div className="flex flex-col items-start justify-start gap-2">
              <div className="flex items-center gap-4 text-black">
                {/* <img
                                    className="w-12 h-12 object-cover"
                                    loading="lazy"
                                    alt=""
                                    src={orderDetails?.userDetails?.image ? CONSTANT_DATA.IMAGE_BASE_URL + orderDetails?.userDetails.image : noimage}
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.onerror = null;
                                        target.src = noimage;
                                    }}
                                /> */}
                <h3 className="text-xl font-bold tracking-[-0.01em]">
                  {orderDetails?.userDetails?.firstname}{" "}
                  {orderDetails?.userDetails?.lastname}
                </h3>
              </div>
              <div className="flex items-center gap-2 text-base-7">
                <img
                  className="w-4 h-4 object-contain"
                  loading="lazy"
                  alt=""
                  src={calender}
                />
                <span className="text-[#F66E6A] text-sm sm:text-base font-medium">
                  {moment(orderDetails?.orderDetails?.createdAt)
                    .tz("Europe/London")
                    .format("ddd DD MMM h:mm A")}
                </span>
              </div>
            </div>
          </div>

          <div className="w-full border-t border-darkgray pt-4">
            <div className=" justify-between items-center">
              {/* <span className="text-sm font-semibold">Paid (inc VAT @ 20%):</span>
                            <span className="text-[#FF6A78] text-sm font-bold">£10.00</span> */}
              {orderDetails?.orderDetails?.orderStatus === "completed" && (
                <p className="alert" style={{ borderColor: "green" }}>
                  Congratulations! You are now in the draw!
                </p>
              )}
              {orderDetails?.orderDetails?.orderStatus === "failed" && (
                <p className="alert" style={{ borderColor: "red" }}>
                  You payment is cancelled.
                </p>
              )}
              {orderDetails?.orderDetails?.orderStatus === "pending" && (
                <p className="alert" style={{ borderColor: "blue" }}>
                  You payment is pending. please check after sometime.
                </p>
              )}

              {/* {orderDetails?.raffleDetails?.map((raffleItem: any) => ( */}
              <div>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    marginTop: "10px",
                  }}
                >
                  <thead>
                    <tr>
                      <th>
                        {" "}
                        <span className="text-sm font-semibold"> SI. No</span>
                      </th>
                      <th>
                        {" "}
                        <span className="text-sm font-semibold">
                          {" "}
                          Raffle Name
                        </span>
                      </th>
                      <th>
                        {" "}
                        <span className="text-sm font-semibold"> Qty</span>
                      </th>
                      <th>
                        {" "}
                        <span className="text-sm font-semibold"> Price</span>
                      </th>
                      <th>
                        {" "}
                        <span className="text-sm font-semibold">Draw Date</span>
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {orderDetails?.raffleDetails?.map(
                      (raffleItem: any, index: any) => (
                        // raffleItem._id?.toString() === raffleItem.raffleID?.toString() && (
                        <tr key={raffleItem._id}>
                          <td className="text-[#FF6A78] text-sm font-bold">
                            {index + 1}
                          </td>
                          <td className="text-[#FF6A78] text-sm font-bold">
                            {raffleItem?.raffle_name}
                          </td>
                          <td className="text-[#FF6A78] text-sm font-bold">
                            {orderDetails?.orderDetails?.quantity[index]}
                          </td>
                          <td className="text-[#FF6A78] text-sm font-bold">
                            £{raffleItem?.ticket_price}
                          </td>
                          <td className="text-[#FF6A78] text-sm font-bold">
                            {moment(raffleItem?.cronTime)
                              .tz("Europe/London")
                              .format("ddd DD MMM h:mm A")}
                          </td>
                        </tr>
                        // )
                      )
                    )}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={3} className="text-sm font-bold">
                        Sub Total:
                      </td>
                      <td className="text-sm font-bold">
                        £
                        {parseFloat(
                          orderDetails?.raffleDetails?.reduce(
                            (acc: number, raffleItem: any, index: number) => {
                              const ticketPrice = parseFloat(
                                raffleItem?.ticket_price || "0"
                              );
                              const quantity =
                                orderDetails?.orderDetails?.quantity &&
                                  orderDetails?.orderDetails?.quantity[index]
                                  ? orderDetails?.orderDetails?.quantity[index]
                                  : 0;

                              return acc + ticketPrice * quantity;
                            },
                            0
                          )
                        ).toFixed(2)}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3} className="text-sm font-bold">
                        Discount:
                      </td>
                      <td className="text-sm font-bold">
                        £
                        {parseFloat(
                          orderDetails?.orderDetails?.couponAmount || "0"
                        ).toFixed(2)}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3} className="text-sm font-bold">
                        Total:
                      </td>
                      <td className="text-sm font-bold">
                        £
                        {Math.max(
                          0,
                          parseFloat(
                            orderDetails?.raffleDetails?.reduce(
                              (acc: number, raffleItem: any, index: number) => {
                                const ticketPrice = parseFloat(raffleItem?.ticket_price || "0");
                                const quantity =
                                  orderDetails?.orderDetails?.quantity &&
                                    orderDetails?.orderDetails?.quantity[index]
                                    ? orderDetails?.orderDetails?.quantity[index]
                                    : 0;

                                return acc + ticketPrice * quantity;
                              },
                              0
                            )
                          ) - parseFloat(orderDetails?.orderDetails?.couponAmount || "0")
                        ).toFixed(2)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              {/* ))} */}
            </div>
          </div>

          {orderDetails?.orderDetails?.orderStatus === "completed" && (
            <div className="w-full border-t border-darkgray pt-4">
              <div className="flex-1 relative inline-block max-w-full z-[2] text-base">
                Your order confirmation with the raffles codes has been sent to
                the following contact information:
              </div>
            </div>
          )}

          {/* {orderDetails?.orderDetails?.orderStatus === "completed" && (
            <div className="w-full flex flex-col gap-2">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-sm font-light">
                <div className="flex items-center gap-2">
                  <img className="w-4 h-4" alt="" src={check} />
                  <span className="text-sm font-light">
                    {orderDetails?.userDetails?.email}
                  </span>
                </div>
              </div>
            </div>
          )} */}


          <div className="w-full flex flex-col gap-2">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-sm font-light">
              <div className="flex items-center gap-2">
                <img className="w-4 h-4" alt="" src={check} />
                <span className="text-sm font-light">
                  {orderDetails?.userDetails?.email}
                </span>
              </div>
              {/* <div className="flex items-center gap-2">
                                <img className="w-4 h-4" alt="" src={check} />
                                <span className="text-sm font-light">{orderDetails?.userDetails?.phone}</span>
                            </div> */}
            </div>
          </div>

          {/* <div className="w-full flex flex-col gap-2">
                        <div className="flex items-center gap-4 text-sm font-light text-xs">
                            <span>Need help?</span>
                            <span>Contact us</span>
                        </div>
                    </div> */}

          <button
            onClick={() => navigate(`/`)}
            className="w-full sm:w-auto px-6 py-3 bg-[#FF6A78] text-white text-sm font-medium rounded hover:bg-opacity-90 transition-all duration-300"
          >
            See All Raffles!
          </button>
        </div>
      </div>
    </section>
  );
};

export default Sucess;
