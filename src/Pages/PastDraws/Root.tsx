import JoinRaffles from "../Home/Components/JoinRaffles";
import liveRaffles from "@/assets/past_draws/liveRaffles.png";
// import BrowseDraws from "./BrowseDraws";
import FutureDraws from "./Components/FutureDraws";
import ExpiredRaffles from "./Components/ExpiredRaffles";

const Root = ({ setAuthenticationModal, authenticationModal }: any) => {
  return (
    <>
      {/* <BrowseDraws /> */}
      <ExpiredRaffles />
      <FutureDraws />

      <div className="mt-10 md:mt-[110px] mb-12">
        <JoinRaffles
          authenticationModal={authenticationModal}
          setAuthenticationModal={setAuthenticationModal}
          imagePath={liveRaffles}
          heading="Join the fun - Enter a raffle now!"
          buttonLabel="See Live Raffles"
        />
      </div>
    </>
  );
};

export default Root;
