import raffle1 from "../../../assets/homepage/liveRaffles/raffle_1.png";
import raffle2 from "../../../assets/homepage/liveRaffles/raffle_2.png";
import raffle3 from "../../../assets/homepage/liveRaffles/raffle_3.png";
import raffle4 from "../../../assets/homepage/liveRaffles/raffle_4.png";
import raffle5 from "../../../assets/homepage/liveRaffles/raffle_5.png";
import raffle6 from "../../../assets/homepage/liveRaffles/raffle_6.png";
import raffle7 from "../../../assets/homepage/liveRaffles/raffle_7.png";
import raffle8 from "../../../assets/homepage/liveRaffles/raffle_8.png";
import ikeaLogo from "../../../assets/homepage/featured/ikea.png";
import UserRaffleCard from "./RaffleCard";
import { useKeenSlider } from "keen-slider/react";
import { IRaffle } from "../../../Utils/Interface/raffle.interface";

const UserLiveCards = ({ raffleData }: any) => {
  const data = [
    {
      time: "22:15:05",
      image: raffle1,
      logo: ikeaLogo,
      title: "IKEA",
      name: "$20k Valentines Day Instant Win!",
      sold: "32%",
      price: "£1.99",
      cashAlternate: "$89",
    },
    {
      time: "22:15:05",
      image: raffle2,
      logo: ikeaLogo,
      title: "IKEA",
      name: "$20k Valentines Day Instant Win!",
      sold: "32%",
      price: "£1.99",
      cashAlternate: "$89",
    },
    {
      time: "22:15:05",
      image: raffle3,
      logo: ikeaLogo,
      title: "IKEA",
      name: "$20k Valentines Day Instant Win!",
      sold: "32%",
      price: "£1.99",
      cashAlternate: "$89",
    },
    {
      time: "22:15:05",
      image: raffle4,
      logo: ikeaLogo,
      title: "IKEA",
      name: "$20k Valentines Day Instant Win!",
      sold: "32%",
      price: "£1.99",
      cashAlternate: "$89",
    },
    {
      time: "22:15:05",
      image: raffle5,
      logo: ikeaLogo,
      title: "IKEA",
      name: "$20k Valentines Day Instant Win!",
      sold: "32%",
      price: "£1.99",
      cashAlternate: "$89",
    },
    {
      time: "22:15:05",
      image: raffle6,
      logo: ikeaLogo,
      title: "IKEA",
      name: "$20k Valentines Day Instant Win!",
      sold: "32%",
      price: "£1.99",
      cashAlternate: "$89",
    },
    {
      time: "22:15:05",
      image: raffle7,
      logo: ikeaLogo,
      title: "IKEA",
      name: "$20k Valentines Day Instant Win!",
      sold: "32%",
      price: "£1.99",
      cashAlternate: "$89",
    },
    {
      time: "22:15:05",
      image: raffle8,
      logo: ikeaLogo,
      title: "IKEA",
      name: "$20k Valentines Day Instant Win!",
      sold: "32%",
      price: "£1.99",
      cashAlternate: "$89",
    },
    {
      time: "22:15:05",
      image: raffle1,
      logo: ikeaLogo,
      title: "IKEA",
      name: "$20k Valentines Day Instant Win!",
      sold: "32%",
      price: "£1.99",
      cashAlternate: "$89",
    },
    {
      time: "22:15:05",
      image: raffle2,
      logo: ikeaLogo,
      title: "IKEA",
      name: "$20k Valentines Day Instant Win!",
      sold: "32%",
      price: "£1.99",
      cashAlternate: "$89",
    },
    {
      time: "22:15:05",
      image: raffle3,
      logo: ikeaLogo,
      title: "IKEA",
      name: "$20k Valentines Day Instant Win!",
      sold: "32%",
      price: "£1.99",
      cashAlternate: "$89",
    },
    {
      time: "22:15:05",
      image: raffle4,
      logo: ikeaLogo,
      title: "IKEA",
      name: "$20k Valentines Day Instant Win!",
      sold: "32%",
      price: "£1.99",
      cashAlternate: "$89",
    },
  ];

  const [ref2] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "free-snap",
    slides: {
      perView: 1,
      spacing: 15,
    },
  });

  return (
    <div>
      {raffleData?.result?.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3  gap-4 w-[95%] mt-10 m-auto">
          {raffleData.result.map((item: IRaffle, i: any) => (
            <UserRaffleCard item={item} i={i} />
          ))}
        </div>
      ) : (
        <p className="text-center my-6 h-[400px]">No Data Found</p>
      )}
    </div>
  );
};

export default UserLiveCards;
