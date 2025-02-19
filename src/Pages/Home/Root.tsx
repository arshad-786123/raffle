import React, { useEffect, useRef, useState } from "react";
import Banner from "./Components/Banner";
import ExploreCategory from "./Components/ExploreCategory";
import BigGalleyContainer from "./Components/BigGalleyContainer";
import LiveRaffles from "./Components/LiveRaffles";
import PaymentCard from "./Components/PaymentCard";
import Footer from "../../Components/Footer/Footer";
import { useSelector } from "react-redux";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import LiveRafflesNew from "./Components/LiveRafflesNew";
import WinningTickets from "./Components/WinningTickets";
import Winners from "./Components/Winners";
import RaffilyInfo from "./Components/RaffilyInfo";
import JoinRaffles from "./Components/JoinRaffles";
import group from "@/assets/homepage/group.png";

const Root = ({ authenticationModal, setAuthenticationModal }: any) => {
  const [messages, setMessages] = useState<string[]>();
  const [isWinner, setIsWinner] = useState(false);
  const [winnerDescription, setWinnerDescription] = useState("");
  const userData = useSelector((state: any) => state.reducer.user.user);

  const userId = userData?.id;
  const liveRafflesRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   // const eventSource = new EventSource(
  //   //   `http://localhost:3000/events/${userId}`
  //   // );

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
    <div>
      {isWinner && (
        <div className="w-[100vw] h-[100vh] bg-black z-50 relative zHigh">
          <h1 className="text-white text-center">Congratulations!</h1>
          <p className="text-white text-center">{winnerDescription}</p>
          <Confetti width={width} height={height} />
        </div>
      )}

      <Banner
        authenticationModal={authenticationModal}
        setAuthenticationModal={setAuthenticationModal}
        liveRafflesRef={liveRafflesRef}
      />
      <ExploreCategory />
      {/* <BigGalleyContainer /> */}
      {/* <LiveRaffles /> */}
      <div ref={liveRafflesRef}>
        <LiveRafflesNew />
      </div>
      <WinningTickets />
      {/* <PaymentCard /> */}
      <Winners />
      <RaffilyInfo />


      <JoinRaffles
        authenticationModal={authenticationModal}
        setAuthenticationModal={setAuthenticationModal}
        imagePath={group}
        heading="Explore Raffily’s categories and join the action!"
        buttonLabel="Go to raffles" />
      <br />
      <br />
      <br />
      <Footer authenticationModal={authenticationModal}
        setAuthenticationModal={setAuthenticationModal} />
    </div>
  );
};

export default Root;
