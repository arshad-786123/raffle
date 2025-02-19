import React, { useState } from "react";
import { Modal, Radio, Label } from "flowbite-react";
import facebook from "../../../../assets/facebook.svg";
import paypal from "../../../../assets/payment/paypal.png";
import google_pay from "../../../../assets/payment/google_pay.png";
import apple_pay from "../../../../assets/payment/apple_pay.png";
import visa from "../../../../assets/payment/visa.png";

const Boost = ({ isBoostModalOpen, setIsBoostModalOpen }: any) => {
  const onClose = (): void => {
    setIsBoostModalOpen(false);
  };

  const [isPaymentGatewayOpen, setIsPaymentGatewayOpen] = useState(false);

  return (
    <div>
      <Modal
        className="bg-[#160B3A]"
        dismissible
        position="center"
        show={isBoostModalOpen}
        onClose={onClose}
        popup
      >
        <div className="rounded-md">
          <Modal.Header className="bg-white  rounded-t-md" />
          {isPaymentGatewayOpen ? (
            <Modal.Body className="bg-white text-secondary  h-full xs:h-auto rounded-b-md">
              <div className="mt-0 block lg:flex items-center justify-center">
                <h3 className="text-center text-lg font-bold tracking-wider">
                  Increase sales with Facebook Ads
                </h3>
                <div>
                  <img
                    src={facebook}
                    alt="facebook"
                    className="hidden ml-2.5 lg:block"
                  />
                  <img
                    src={facebook}
                    alt="facebook"
                    className="block m-auto lg:hidden mt-4 "
                  />
                </div>
              </div>
              <div className="mt-3 flex items-center justify-center">
                <h3 className="text-center text-sm font-semibold font-medium tracking-wider">
                  How would you like to proceed with the payment
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-12 lg:flex items-center justify-between mt-6">
                <div className="flex items-center gap-2 text-black cursor-pointer">
                  <Radio
                    id="paypal"
                    name="payment"
                    value="paypal"
                    defaultChecked
                  />
                  <Label
                    htmlFor="paypal"
                    style={{ color: "black", cursor: "pointer" }}
                  >
                    <div>
                      <div className="flex items-center gap-4">
                        <img src={paypal} alt="paypal" />
                        <p className="font-bold">Paypal</p>
                      </div>
                      <p className="mt-1">Pay with PayPal</p>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center gap-2 text-black cursor-pointer">
                  <Radio id="applepay" name="payment" value="applepay" />
                  <Label
                    htmlFor="applepay"
                    style={{ color: "black", cursor: "pointer" }}
                  >
                    <div>
                      <div className="flex items-center gap-4">
                        <img src={apple_pay} alt="apple_pay" />
                        <p className="font-bold">Apple Pay</p>
                      </div>
                      <p className="-mt-1">Pay with apple pay</p>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center gap-2 text-black ">
                  <Radio id="googlepay" name="payment" value="googlepay" />
                  <Label
                    htmlFor="googlepay"
                    style={{ color: "black", cursor: "pointer" }}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <img src={google_pay} alt="google_pay" />
                        <p className="font-bold">Google Pay</p>
                      </div>
                      <p className="mt-2">Pay with google pay</p>
                    </div>
                  </Label>
                </div>
              </div>
              <div className="h-[.1px] w-full bg-[#A1A1A1] my-6"></div>

              <div>
                <div className="flex items-center gap-2 text-black ">
                  <Radio id="visa" name="payment" value="visa" />
                  <Label
                    htmlFor="visa"
                    style={{ color: "black", cursor: "pointer" }}
                  >
                    <div>
                      <div className="flex items-center gap-4">
                        <img src={visa} alt="visa" />
                        <p className="font-bold">Payment by credit card</p>
                      </div>
                      <p className="mt-1">Secured Payment</p>
                    </div>
                  </Label>
                </div>
                <div className="mt-6">
                  <div className="border-[1px] border-[#D7D7D7] rounded-md p-3 relative">
                    <p className="absolute top-[-10px] bg-[#D7D7D7] px-1 text-xs">
                      Card Number
                      <span className="text-[red]"> *</span>
                    </p>
                    <input
                      className="border-none outline-none"
                      type="text"
                      maxLength={16}
                      placeholder="1234 1234 1234 1234"
                      name=""
                      id=""
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
                <div className="block lg:flex items-center w-[100%] gap-[2%] mt-8">
                  <div className="border-[1px] border-[#D7D7D7] rounded-md p-3 relative  w-[100%] lg:w-[58%]">
                    <p className="absolute top-[-10px] bg-[#D7D7D7] px-1 text-xs">
                      Expiration Date
                      <span className="text-[red]"> *</span>
                    </p>
                    <input
                      className="border-none outline-none"
                      type="text"
                      placeholder="MM/YYYY"
                      name=""
                      id=""
                    />
                  </div>
                  <div className="border-[1px] border-[#D7D7D7] rounded-md p-3 relative mt-8 lg:mt-0 w-[100%] lg:w-[40%] ">
                    <p className="absolute top-[-10px] bg-[#D7D7D7] px-1 text-xs">
                      Security Code
                      <span className="text-[red]"> *</span>
                    </p>
                    <input
                      className="border-none outline-none"
                      type="text"
                      placeholder="123"
                      name=""
                      id=""
                    />
                  </div>
                </div>
                <div className="h-[.1px] w-full bg-[#A1A1A1] my-6"></div>
                <div className="text-center bg-[#F66E6A] p-3 rounded-md flex items-center text-white gap-4 font-bold mt-4 cursor-pointer">
                  <p className="text-center w-full text-xl font-medium tracking-wider">
                    Pay Now
                  </p>
                </div>
              </div>
            </Modal.Body>
          ) : (
            <Modal.Body className="bg-white text-secondary  h-full xs:h-auto rounded-b-md">
              <div className="mt-0 block lg:flex items-center justify-center">
                <h3 className="text-center text-lg font-bold tracking-wider">
                  Increase sales with Facebook Ads
                </h3>
                <div>
                  <img
                    src={facebook}
                    alt="facebook"
                    className="hidden ml-2.5 lg:block "
                  />
                  <img
                    src={facebook}
                    alt="facebook"
                    className="block m-auto lg:hidden mt-4 "
                  />
                </div>
              </div>
              <div className="w-[90%] lg:w-[70%] m-auto relative">
                <div className="grid grid-cols-1 lg:flex justify-between gap-8 mt-8">
                  <button className="border-[1px] rounded-md py-2 px-8 text-lg font-bold text-[#F66E6A]">
                    £99
                  </button>
                  <button className="border-[1px] rounded-md py-2 px-8 text-lg font-bold text-[#F66E6A]">
                    £249
                  </button>
                  <button className="border-[1px] rounded-md py-2 px-8 text-lg font-bold text-[#F66E6A]">
                    £499
                  </button>
                </div>
                <div
                  onClick={() => setIsPaymentGatewayOpen(true)}
                  className="text-center bg-[#F66E6A] p-3 rounded-md flex items-center text-white gap-4 font-bold mt-12 lg:mt-4 cursor-pointer"
                >
                  <p className="text-center w-full text-xl font-medium tracking-wider">
                    Boost now
                  </p>
                </div>
              </div>
            </Modal.Body>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Boost;
