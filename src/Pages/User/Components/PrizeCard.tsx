import { useKeenSlider } from "keen-slider/react";
import UserPrizeRaffleCard from "./PrizeRaffleCard";

const UserPrizeCards = ({ prizeData }: { prizeData: any[] }) => {
  const [ref2] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "free-snap",
    slides: {
      perView: 1,
      spacing: 15,
    },
  });

  if (prizeData.length === 0) {
    return (
      <div>
        <h3 className="text-center mt-12">No Data Found</h3>
      </div>
    );
  }

  return (
    <div className="h-fit">
      <div className="hidden lg:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-[100%] mt-10 m-auto">
        {prizeData.map((item, i) => (
          <UserPrizeRaffleCard key={i} item={item} i={i} />
        ))}
      </div>
      <div className="block md:hidden lg:hidden xl:hidden w-[100%] m-auto">
        <div ref={ref2} className="keen-slider mt-10 m-auto">
          {prizeData.map((item, i) => (
            <UserPrizeRaffleCard key={i} item={item} i={i} />
            
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserPrizeCards;
