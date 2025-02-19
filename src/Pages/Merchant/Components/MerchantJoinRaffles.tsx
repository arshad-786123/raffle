// import group from "@/assets/homepage/group.png";
// import Group from "@/assets/contactUs/Group.png";
// import { Button } from "@/Components/ui/button";
// import joinRaffilyNowImage from "@/assets/merchant/joinRaffilyNow.png";

// const MerchantJoinRaffles = () => {
//   return (
//     <div className="w-full lg:px-12 px-3 md:h-[307px] sm:h-[503px] mb-12">
//       <div
//         className="w-full rounded-[24px] lg:h-full flex md:flex-row flex-col gap-5 justify-between items-center"
//         style={{
//           background:
//             "linear-gradient(55.21deg, #AD6FFF 9.69%, #FD98E8 47.47%, #FF7385 83.78%)",
//         }}
//       >
//         <div className="md:w-1/2 w-full h-full relative flex items-end justify-end md:pt-0 hidden md:block">
//           <img
//             src={joinRaffilyNowImage}
//             className="lg:h-[370px] h-full w-full right-0 w-fit absolute bottom-0 md:object-none !object-contain ml-1 z-10"
//           />
//           <img src={Group} className="!object-cover w-1/2 h-full ml-1" />
//         </div>
//         <div className="md:w-1/2 w-full flex md:items-start items-center flex-col md:justify-start justify-center md:pl-20 py-8 md:px-0 px-4">
//           <h1 className="text-white lg:text-[40px] text-[26px] md:text-left text-center font-bold font-modernBold md:leading-[40px] leading-[32px] mb-5">
//             Join Raffily now!<br/>
//             Your raffle, your success!
//           </h1>
//           <Button className="bg-white text-black font-modernBold md:text-[16px] text-[14px] md:leading-[16px] leading-[14px] md:w-[98px] w-[140px] h-[45px] px-[22px] py-[17px]">
//             Join Raffily
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MerchantJoinRaffles;
import group from "@/assets/homepage/group.png";
import Group from "@/assets/contactUs/Group.png";
import { Button } from "@/Components/ui/button";
import joinRaffilyNowImage from "@/assets/merchant/joinRaffilyNow.png";

const MerchantJoinRaffles = ({ setAuthenticationModal, authenticationModal }: any) => {
  return (
    <>
      <div className="lg:px-24 sm:px-10 px-6 w-full mb-12">
        <div className="max-w-[1320px] mx-auto w-full relative  text-white lg:rounded-[24px] rounded-[9px] lg:bg-banner-left flex md:justify-between md:items-end mt-[101px] bg-no-repeat bg-left-bottom after:bg-gradient-to-r from-[#AD6FFF] via-[#FD98E8] to-[#FF7385] lg:after:rounded-[24px] after:rounded-[9px] after:content-[''] after:absolute after:left-0 after:top-0 after:h-full after:w-full after:z-[-1] md:flex-row flex-col justify-center items-center lg:bg-auto bg-[100%_auto]">
          <div className="md:order-1 order-2 lg:block hidden">
            <img
              src={joinRaffilyNowImage}
              className="block max-w-full md:mt-[-101px] mt-0"
              alt="imagePath"
            />
          </div>
          <div className="max-w-full w-[528px] m-auto md:order-2 order-1 py-8 sm:px-0 px-6">
            <div className="md:text-left text-center">
              <h1 className="text-white lg:text-[40px] text-[26px] md:text-left text-center font-bold font-modernBold md:leading-[40px] leading-[32px] mb-5" >
                Join Raffily now!
                <br />
                Your raffle, your success!
              </h1>
              <Button
                variant="secondary"
                className="bg-white text-black px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm lg:text-base w-full lg:w-auto font-modernBold text-[14px] sm:text-[16px] leading-[14px] sm:leading-[16px]" onClick={() => {
                  setAuthenticationModal({
                    ...authenticationModal,
                    isSignUpOpen: true,
                  });
                }}
              >
                Join Raffily
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MerchantJoinRaffles;
