import { Button } from "@/Components/ui/button";
import FeaturePrizeWinnerCard from "@/Components/Cards/FeaturePrizeWinnerCard/FeaturePrizeWinnerCard";

const FeaturePrizeWinner = () => {
  return (

<div className="w-full my-20 lg:px-24 px-2">
  {/* "More winners" text */}
  <h2 className="font-modern-era text-2xl font-bold leading-8 tracking-tight text-left ">
  Featured Prize Winners
  </h2>

  {/* Winners grid section */}
  <div className="w-full my-10 flex flex-col lg:flex-row items-center justify-between gap-8">
    <div className="lg:w-3/4 w-full flex gap-5">
      {Array(18)
        .fill("")
        .map((_, index) => (
          <FeaturePrizeWinnerCard key={index} />
        ))}
    </div>
    <Button className="bg-raffles-blue w-full lg:hidden block mt-10">
      See Winners
    </Button>
  </div>
</div>


  );
};

export default FeaturePrizeWinner;
