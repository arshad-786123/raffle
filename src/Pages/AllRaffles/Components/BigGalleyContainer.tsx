import React, { useEffect, useState } from "react";
import zaraBackground from "../../../assets/homepage/featured/zara_back.png";
import ikeaBackground from "../../../assets/homepage/featured/ikea_back.png";
import zara from "../../../assets/homepage/featured/zara.png";
import ikea from "../../../assets/homepage/featured/ikea.png";

import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import BigGalleryCard from "./BigGalleryCard";
import { listRaffle } from "../../../Services/Raffle/listRaffle";
import { errorToast } from "../../../Utils/Toast/error.toast";

const data = [
  {
    image: zaraBackground,
    logo: zara,
    totalRatings: 4,
    title: "$20k Valentines Day Instant Win!",
    totalTicketSold: "552",
    percentage: 50,
    price: "1.99",
    currency: "£",
    brand: "Zara",
  },
  {
    image: ikeaBackground,
    logo: ikea,
    totalRatings: 4,
    title: "$20k Valentines Day Instant Win!",
    totalTicketSold: "552",
    percentage: 50,
    price: "1.99",
    currency: "£",
    brand: "IKEA",
  },
  {
    image: zaraBackground,
    logo: zara,
    totalRatings: 4,
    title: "$20k Valentines Day Instant Win!",
    totalTicketSold: "552",
    percentage: 50,
    price: "1.99",
    currency: "£",
    brand: "Zara",
  },
  {
    image: ikeaBackground,
    logo: ikea,
    totalRatings: 4,
    title: "$20k Valentines Day Instant Win!",
    totalTicketSold: "552",
    percentage: 50,
    price: "1.99",
    currency: "£",
    brand: "IKEA",
  },
  {
    image: zaraBackground,
    logo: zara,
    totalRatings: 4,
    title: "$20k Valentines Day Instant Win!",
    totalTicketSold: "552",
    percentage: 50,
    price: "1.99",
    currency: "£",
    brand: "Zara",
  },
  {
    image: ikeaBackground,
    logo: ikea,
    totalRatings: 4,
    title: "$20k Valentines Day Instant Win!",
    totalTicketSold: "552",
    percentage: 50,
    price: "1.99",
    currency: "£",
    brand: "IKEA",
  },
];

const BigGalleyContainer = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [ref2, instanceRef2] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "free-snap",
    slides: {
      perView: 2,
      spacing: 10,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  const [mobileRef2, mobileInstanceRef2] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "free-snap",
    slides: {
      perView: 1,
      spacing: 10,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  const [raffleData, setRaffleData] = useState([]);

  useEffect(() => {
    getRaffles();
  }, []);

  const getRaffles = async () => {
    try {
      const raffData: any = await listRaffle(1, 8);
      setRaffleData(raffData);
    } catch (error) {
      errorToast("Something went wrong");
    }
  };
  return (
    <div>
      <div className="hidden lg:block">
        <div className="flex items-center justify-center">
          <MdArrowBackIosNew
            className="text-5xl font-light  rounded-[100%] bg-[#FFFAFA] text-black drop-shadow-lg p-4 cursor-pointer leftarrowFeatures"
            onClick={(e: React.MouseEvent<SVGSVGElement, MouseEvent>) =>
              instanceRef2.current?.prev()
            }
          />
          <div ref={ref2} className=" keen-slider mt-8 ">
            {/* {true && ( // Render the slider only when loaded is true */}
            <div ref={ref2} className="keen-slider mt-8">
              {/* Render only 2 slides at a time */}
              {raffleData
                ?.filter((item: any) => item?.raffle_status === 1)
                ?.slice(0, 2)
                ?.map((item, i) => (
                  <BigGalleryCard key={i} item={item} i={i} />
                ))}
            </div>
            {/* )} */}
          </div>
          <MdArrowForwardIos
            className="text-5xl font-light  rounded-[100%] bg-[#FFFAFA] text-black drop-shadow-lg p-4 cursor-pointer rightarrowFeatures"
            onClick={(e: React.MouseEvent<SVGSVGElement, MouseEvent>) =>
              instanceRef2.current?.next()
            }
          />
        </div>
      </div>

      <div className="block lg:hidden w-[95%]" style={{ marginLeft: "10px" }}>
        <div className="flex items-center justify-center relative">
          <MdArrowBackIosNew
            className="absolute  -left-2 z-20 top-[50%] text-5xl font-light  rounded-[100%] bg-[#FFFAFA] text-black drop-shadow-lg p-4 cursor-pointer"
            onClick={(e: React.MouseEvent<SVGSVGElement, MouseEvent>) =>
              mobileInstanceRef2.current?.prev()
            }
          />
          <section ref={mobileRef2} className=" keen-slider mt-8 ">
            {raffleData?.slice(0, 2)?.map((item, i) => (
              <BigGalleryCard key={i} item={item} i={i} />
            ))}
          </section>
          <div className="flex items-center justify-center relative">
            <MdArrowForwardIos
              className="absolute  -right-2 z-20 top-[50%] text-5xl font-light  rounded-[100%] bg-[#FFFAFA] text-black drop-shadow-lg p-4 cursor-pointer"
              onClick={(e: React.MouseEvent<SVGSVGElement, MouseEvent>) =>
                mobileInstanceRef2.current?.next()
              }
            />
          </div>
        </div>
      </div>
      {/* <div className="w-full mt-6 m-auto">
        <div className="border-[2px] border-black rounded-md w-[90%] lg:w-[70%] p-4 m-auto font-medium tracking-wider text-lg text-center cursor-pointer">
          Claim free ticket
        </div>
      </div> */}
    </div>
  );
};

export default BigGalleyContainer;
