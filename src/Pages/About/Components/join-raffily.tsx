import { Button } from "@/Components/ui/button";
import { useNavigate } from "react-router-dom";

const JoinRaffily = ({ setAuthenticationModal, authenticationModal }: any) => {
  const navigate = useNavigate();

  const seeliveraffles = () => {
    navigate('/all-raffles');
  };

  return (
    <div className="w-full lg:px-24 sm:px-10 px-4 pb-20">
      <div className="w-full flex lg:flex-row flex-col sm:items-start items-center justify-center gap-5 relative  bg-custom-gradient lg:rounded-[24px] rounded-[9px] lg:p-10 p-5">
        <div className="lg:w-1/2 w-full">
          <div className="lg:w-3/4 w-full">
            <h1 className="font-modernBold sm:text-[40px] text-[20px] sm:leading-[40px] leading-[20px] text-white mb-4 -tracking-2">
              Join the Raffily <br className=" lg:block hidden" /> Community
            </h1>
            <h4 className="font-modernBold sm:text-[22px] text-[16px] sm:leading-[30.8px] leading-[22.4px] text-white mb-4 -tracking-2">
            Are you ready to win?
            </h4>
            <p className="font-modernRegular sm:text-[16px] text-[12px] sm:leading-[22.4px] leading-[16.8px] text-white -tracking-2">
              Whether you’re looking to win amazing prizes or create raffles for
              your customers, Raffily has something for everyone. Join our happy
              entrants and businesses today!
            </p>
          </div>
        </div>
        <div className="lg:w-1/2 w-full flex flex-col gap-6">
          <div className="w-full bg-[#FFFFFF33] rounded-[14px] flex flex-col gap-4 text-white py-4 px-6">
            <h2 className="font-modernBold sm:text-[20px] text-[16px] sm:leading-[24px] leading-[19.2px]">
              Participants
            </h2>
            <hr className="h-px my-2 bg-#FFFFFF33 w-full"></hr>
            <div className="flex sm:flex-row flex-col sm:items-center items-start justify-between sm:gap-6 gap-4">
              <div className="w-1/2">
                <p className="sm:text-[14px] text-[10px] sm:leading-[19.6px] leading-[14px] -tracking-2">
                  Discover exciting raffles and enter for a chance to win big!
                </p>
              </div>
              <div className="w-1/2 flex sm:items-end items-end sm:justify-end justify-start">
                <Button
                  className="bg-white text-raffles-light-blue sm:text-[16px] text-[14px] sm:leading-[16px] leading-[14px] font-modernBold"
                  variant="secondary"
                  size="lg"
                  onClick={seeliveraffles}
                
                >
                  See live raffles
                </Button>
              </div>
            </div>
          </div>
          <div className="w-full bg-[#FFFFFF33] rounded-[14px] flex flex-col gap-4 text-white py-4 px-6">
            <h2 className="font-modernBold sm:text-[20px] text-[16px] sm:leading-[24px] leading-[19.2px]">
              Businesses
            </h2>
            <hr className="h-px my-2 bg-#FFFFFF33 w-full"></hr>
            <div className="flex sm:flex-row flex-col sm:items-center items-start justify-between sm:gap-6 gap-4">
              <div className="w-1/2">
                <p className="sm:text-[14px] text-[10px] sm:leading-[19.6px] leading-[14px] -tracking-2">
                  Partner with Raffily to engage customers and boost sales.
                </p>
              </div>
              <div className="w-1/2 flex sm:items-end items-end sm:justify-end justify-start">
                <Button
                  className="bg-white text-raffles-light-blue sm:text-[16px] text-[14px] sm:leading-[16px] leading-[14px] font-modernBold"
                  variant="secondary"
                  size="lg"
                  onClick={() => {
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
      </div>
    </div>
  );
};

export default JoinRaffily;
