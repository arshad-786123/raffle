import group from "@/assets/homepage/group-contact.png"
import Group from "@/assets/contactUs/Group.png"
import { Button } from "@/Components/ui/button"

const JoinRaffles = ({ setAuthenticationModal, authenticationModal }: any) => {
  return (
    <div className="w-full lg:px-12 px-6 md:h-[307px] h-[503px] mb-12">
      <div
        className="w-full rounded-[24px] h-full flex md:flex-row flex-col gap-5 justify-between items-center"
        style={{
          background:
            "linear-gradient(55.21deg, #AD6FFF 9.69%, #FD98E8 47.47%, #FF7385 83.78%)"
        }}
      >
        <div className="md:w-1/2 w-full flex md:items-start items-center flex-col md:justify-start justify-center md:pl-20 py-8 md:px-0 px-4">
          <h1 className="text-white md:text-[40px] text-[32px] md:text-left text-center font-bold font-modernBold md:leading-[40px] leading-[32px] mb-5">
            Join in!
          </h1>
          <h4 className="text-white md:text-[22px] text-[16px] md:text-left text-center font-bold font-modernBold md:leading-[30.8px] leading-[22.4px] mb-5">
            Don’t miss your chance to win incredible prizes
          </h4>
          <p className="text-white md:text-[18px] text-[12px] md:text-left text-center font-bold font-modernBold md:leading-[23.4px] leading-[16.8px] mb-5">
            Whether you're looking for the latest gadgets, a luxurious vacation,
            or a unique experience, Raffily offers it all.
          </p>
          <Button className="bg-white text-black font-modernBold md:text-[16px] text-[14px] md:leading-[16px] leading-[14px] md:w-[98px] w-[140px] h-[45px] px-[22px] py-[17px] hover:bg-gray-200" onClick={() => {
            setAuthenticationModal({
              ...authenticationModal,
              isSignUpOpen: true,
            });
          }}>
            Sign up
          </Button>
        </div>
        <div className="md:w-1/2 w-full h-full relative flex items-end justify-end md:pt-0">
          <img
            src={group}
            className="md:h-[385px] h-full md:w-full right-0 w-fit absolute bottom-0 md:!object-none !object-contain ml-1 z-10"
          />
          <img src={Group} className="!object-cover w-1/2 h-full ml-1" />
        </div>
      </div>
    </div>
  )
}

export default JoinRaffles
