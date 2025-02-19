import GiftImage from "@/assets/homepage/winningTickets/Gift.svg";
import SecureTransactions from "@/assets/homepage/winningTickets/Coins.svg";
import Handshake from "@/assets/homepage/winningTickets/Handshake.svg";
import Ticket from "@/assets/homepage/winningTickets/Ticket.svg";
import PictureInPicture from "@/assets/homepage/winningTickets/PictureInPicture.svg";
import SealPercent from "@/assets/homepage/winningTickets/SealPercent.svg";

const winningTicketsData = [
  {
    icon: GiftImage,
    title: "Exciting Prizes",
    description: "From luxury items to once-in-a-lifetime experiences, our raffles feature a wide range of prizes"
  },
  {
    icon: SecureTransactions,
    title: "Secure Transactions",
    description: "We use industry-leading encryption to ensure all payments are fully protected."
  },
  {
    icon: Handshake,
    title: "Trusted Brands",
    description: "We only work with trusted and reputable brands that you love."
  },
  {
    icon: Ticket,
    title: "Limited Tickets",
    description: "Our limited ticket availibility gives you a better chance of winning."
  },
  {
    icon: PictureInPicture,
    title: "Your Unique Dashboard",
    description: "See your raffle entries on your dashboard"
  },
  {
    icon: SealPercent,
    title: "Unique Offers and Updates",
    description: "We’ll let you know when a raffle you have entered is ending, plus update you with raffles that we think you’ll love"
  }
];

const WinningTickets = () => {
  return (
    <div className="w-full bg-raffles-blue sm:py-20 py-10">
      <div className="sm:px-0 px-6 sm:mb-16 mb-10">
        <h1 className="text-white text-3xl font-bold text-center ">
          Why Raffily is your winning ticket
        </h1>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-y-[70px] sm:gap-x-[80px] gap-x-[40px] mx-auto max-w-[1200px] px-4">
        {winningTicketsData.map((item, index) => (
          <div
            key={index}
            className="text-white flex flex-col items-center lg:justify-center"
          >
            <div className="inset-0 bg-gradient-to-r from-[#AD6FFF] via-[#FD98E8] to-[#FF7385] rounded-full p-[2.5px] w-20 h-20 mb-4">
              <div className="bg-[#280E51] w-full h-full rounded-full flex items-center justify-center">
                <img
                  src={item.icon}
                  alt={item.title}
                  className="size-9 object-cover rounded-full"
                />
              </div>
            </div>
            <div className=" flex items-center justify-center">
              {/* Set fixed height for the title */}
              <h5 className="text-[20px] leading-[24px] text-center font-extrabold font-modernExtraBold mb-4">
                {item.title}
              </h5>
            </div>
            <div className="flex items-center justify-center">
              {/* Set fixed height for the description */}
              <p className="text-[14px] leading-[19.6px] font-[500] text-center">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WinningTickets;



