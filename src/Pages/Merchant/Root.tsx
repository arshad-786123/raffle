import RaffleFAQ from "./Components/RaffleFAQ";
import JoinSection from "./Components/JoinSection";
import ContactSection from "./Components/ContactSection";
import HowItWorks from "./Components/HowItWorks";
import RaffilyKeyFeatures from "./Components/RaffilyKeyFeatures";
import RaffilyStandard from "./Components/RaffilyStandard";
import Testimonials from "./Components/Testimonials";
import RaffilyBussinessFAQ from "./Components/RaffilyBussinessFAQ";
import MerchantBanner from "./Components/MerchantBanner";
import MerchantJoinRaffles from "./Components/MerchantJoinRaffles";

const Root = ({ setAuthenticationModal, authenticationModal }: any) => {
  return (
    <>
      <MerchantBanner authenticationModal={authenticationModal}
        setAuthenticationModal={setAuthenticationModal} />
      <RaffleFAQ />
      <JoinSection authenticationModal={authenticationModal}
        setAuthenticationModal={setAuthenticationModal} />
      <HowItWorks authenticationModal={authenticationModal}
        setAuthenticationModal={setAuthenticationModal} />
      <RaffilyKeyFeatures />
      <Testimonials />
      <RaffilyStandard />
      <MerchantJoinRaffles authenticationModal={authenticationModal}
        setAuthenticationModal={setAuthenticationModal} />
      <RaffilyBussinessFAQ />
      <ContactSection />
    </>
  );
};

export default Root;
