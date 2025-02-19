import React from "react";
import visa from "../../../assets/homepage/payment/visa.png";
import gpay from "../../../assets/homepage/payment/gpay.png";
import stripe from "../../../assets/homepage/payment/stripe.png";
import paypal from "../../../assets/homepage/payment/paypal.png";

const PaymentCard = () => {
  return (
    <div className="w-[95%] m-auto border-[2px] mt-10 rounded-md border-black bg-[#F7F0F4] block lg:flex items-center justify-between">
      <div className="p-8 ml-0 lg:ml-8 ">
        <h1 className="text-[#47207B] text-2xl font-bold tracking-wide text-center lg:text-left">
          Payments accepted
        </h1>
        <div className="flex items-center justify-center lg:justify-left gap-4 mt-4">
          <img src={visa} alt="Visa" />
          <img src={gpay} alt="G Pay" />
          <img src={stripe} alt="Stripe" />
          <img src={paypal} alt="Paypal" />
        </div>
      </div>
      <div className="hidden lg:block">
        <button className="bg-gradient-to-br from-purple-700 via-purple-500 to-red-400 w-[90%]  lg:w-96 h-16 text-white rounded-md m-auto lg:mr-20 ">
          Start Raffles
        </button>
      </div>
      <div className="block lg:hidden w-[90%] m-auto mb-6">
        <button className="bg-gradient-to-br from-purple-700 via-purple-500 to-red-400  w-full  h-16 text-white rounded-md ">
          Start Raffles
        </button>
      </div>
    </div>
  );
};

export default PaymentCard;
