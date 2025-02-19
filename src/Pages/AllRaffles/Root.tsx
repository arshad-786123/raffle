import React, { useEffect, useRef, useState } from "react";
import Banner from "./Components/Banner";
import ExploreCategory from "./Components/ExploreCategory";
import BigGalleyContainer from "./Components/BigGalleyContainer";
import LiveRaffles from "./Components/LiveRaffles";
import PaymentCard from "./Components/PaymentCard";
import WinningTickets from "./Components/WinningTickets";
import Footer from "../../Components/Footer/Footer";
import { useSelector } from "react-redux";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import Root1 from "../../Pages/Home/Components/Root";
import Winners from "./Components/Winners";
import JoinRaffles from "./Components/JoinRaffles";
import LiveRafflesNew from "../Home/Components/LiveRafflesNew";
import BrowseRafflesbyCategory from "../Home/Components/BrowseRafflesbyCategory";

const Root = ({ authenticationModal, setAuthenticationModal }: any) => {
  const [messages, setMessages] = useState<string[]>();
  const [isWinner, setIsWinner] = useState(false);
  const [winnerDescription, setWinnerDescription] = useState("");
  const userData = useSelector((state: any) => state.reducer.user.user);

  const userId = userData?.id;
  const liveRafflesRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const eventSource = new EventSource(
  //     `http://localhost:3000/events/${userId}`
  //   );

  //   eventSource.onmessage = (event) => {
  //     const data = JSON.parse(event.data);
  //     setMessages(data);
  //     console.log(data.userId, userId);

  //     if (data.userId === userId) {
  //       setIsWinner(true);
  //       setWinnerDescription(data.description);
  //     }

  //     setTimeout(() => {
  //       setIsWinner(false);
  //     }, 10000);
  //   };

  //   return () => {
  //     eventSource.close();
  //   };
  // }, [userId]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const { width, height } = useWindowSize();

  return (
    <>
      <Banner />
      <LiveRafflesNew />
      <ExploreCategory />
      <BrowseRafflesbyCategory />
      <JoinRaffles authenticationModal={authenticationModal}
        setAuthenticationModal={setAuthenticationModal} />
      <Footer authenticationModal={authenticationModal}
        setAuthenticationModal={setAuthenticationModal} />
    </>
  );
};

export default Root;