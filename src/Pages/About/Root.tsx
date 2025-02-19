import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import useWindowSize from "react-use/lib/useWindowSize";
// import Banner from "./Components/Banner";
import Mission from "./Components/Mission";
import HowItWorks from "./Components/how-it-works";
import Draw from "./Components/draw";
import WhyChoose from "./Components/why-choose";
import Commitment from "./Components/Commitment";
import JoinRaffily from "./Components/join-raffily";
import ContactUs from "./Components/contact-us";
import AboutBanner from "./Components/AboutBanner";

const Root = ({ authenticationModal, setAuthenticationModal }: any) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const { width, height } = useWindowSize();

  return (
    <>
      <AboutBanner authenticationModal={authenticationModal}
        setAuthenticationModal={setAuthenticationModal} />
      <Mission />
      <HowItWorks />
      <Draw />
      <WhyChoose authenticationModal={authenticationModal}
        setAuthenticationModal={setAuthenticationModal} />
      <Commitment />
      <JoinRaffily authenticationModal={authenticationModal}
        setAuthenticationModal={setAuthenticationModal} />
      <ContactUs />
    </>
  );
};

export default Root;
