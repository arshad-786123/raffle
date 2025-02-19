import Footer from "@/Components/Footer/Footer";
import AboutRaffles from "./Components/AboutRaffles";
import JoinWinnerClub from "./Components/JoinWinnerClub";
import RafflesCards from "./Components/RafflesCards";
import WinnerList from "./Components/WinnerList";

const Root = ({ setAuthenticationModal, authenticationModal }: any) => {
  return (
    <>
      <AboutRaffles />
      <WinnerList />
      <RafflesCards />
      <JoinWinnerClub />
      <Footer authenticationModal={authenticationModal}
        setAuthenticationModal={setAuthenticationModal} />
    </>
  );
};

export default Root;
