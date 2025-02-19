import { useNavigate } from "react-router-dom";
import winnerClub from "../../../assets/pdp/winnersClub.jpg"

import { Button } from "@/Components/ui/button"

const JoinWinnerClub = ({ setAuthenticationModal, authenticationModal }: any) => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleNavigate = () => {
    navigate("/all-raffles"); // Replace with the path you want to navigate to
  };

  return (
    <main className="relative bg-white pt-8">
      <div
        className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] bg-cover bg-center"
        style={{ backgroundImage: `url(${winnerClub})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

        {/* Content Section */}
        <section className="container mx-auto h-full flex flex-col justify-center items-start px-4 sm:px-6 lg:px-12 font-modernBold">
          {/* Text Content */}
          <div className="z-10 text-left max-w-lg">
            <h2 className="md:text-[40px] text-[24px] md:leading-[42px] leading-[25.2px] font-modernBold text-[#110044] ">
              Could you be the <br />
              next members of the
            </h2>
            <h2 className="md:text-[40px] text-[24px] md:leading-[42px] leading-[25.2px] font-modernBold bg-gradient-to-r from-[#AD6FFF] via-[#FD98E8] to-[#FF7385] bg-clip-text text-transparent">
              Raffily Winners’ Club?
            </h2>
            {/* Button */}

            <button className="px-[22px] py-[17px] font-modernBold md:text-[16px] text-[14px] md:leading-[16px] leading-[14px] bg-white rounded-[5px] mt-4 hover:bg-gray-200" onClick={handleNavigate}

            >
              Go to raffles
            </button>
          </div>
        </section>
      </div>
    </main>
  )
}

export default JoinWinnerClub
