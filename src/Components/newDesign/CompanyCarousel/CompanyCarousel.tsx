import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/Components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import ClearWater from "@/assets/clearWater.png";
import ClearStaries from "@/assets/clearStaries.png";
import Cast from "@/assets/cast.png";
import Team from "@/assets/team.png";
import Efferma from "@/assets/efferma.png";
import BMW from "@/assets/homepage/companies/bmw-7.png";
import Boodles from "@/assets/homepage/companies/boodles.png";
import JohnLewis from "@/assets/homepage/companies/john_lewis.png";
import LeightonHall from "@/assets/homepage/companies/3fd3be183ed7209b3f33ca60ea19b3b9.png";
import Harrods from "@/assets/homepage/companies/Vector.png";
import CardenPark from "@/assets/homepage/companies/image-Photoroom (50).png";

const companies = [
  {
    name: "ClearStaries",
    path: ClearStaries,
    id: 1,
    width: "200px",
    height: "200px",
  },
  {
    name: "Cast",
    path: Cast,
    id: 2,
    width: "150px",
    height: "150px",
  },
  {
    name: "ClearWater",
    path: ClearWater,
    id: 3,
    width: "120px",
    height: "120px",
  },
  {
    name: "Team",
    path: Team,
    id: 4,
    width: "130px",
    height: "130px",
  },
  {
    name: "Efferma",
    path: Efferma,
    id: 5,
    width: "130px",
    height: "130px",
  },
  {
    name: "ClearStaries",
    path: ClearStaries,
    id: 6,
    width: "200px",
    height: "200px",
  },
  {
    name: "Cast",
    path: Cast,
    id: 7,
    width: "150px",
    height: "150px",
  },
  {
    name: "ClearWater",
    path: ClearWater,
    id: 8,
    width: "120px",
    height: "120px",
  },
  {
    name: "Team",
    path: Team,
    id: 9,
    width: "130px",
    height: "130px",
  },
  {
    name: "Efferma",
    path: Efferma,
    id: 10,
    width: "130px",
    height: "130px",
  },
  {
    name: "ClearStaries",
    path: ClearStaries,
    id: 11,
    width: "200px",
    height: "200px",
  },
  {
    name: "Cast",
    path: Cast,
    id: 12,
    width: "150px",
    height: "150px",
  },
  {
    name: "ClearWater",
    path: ClearWater,
    id: 13,
    width: "120px",
    height: "120px",
  },
  {
    name: "Team",
    path: Team,
    id: 14,
    width: "130px",
    height: "130px",
  },
  {
    name: "Efferma",
    path: Efferma,
    id: 15,
    width: "130px",
    height: "130px",
  },
  // {
  //   name: "BMW",
  //   path: BMW,
  //   id: 3,
  //   width: "45px",
  //   height: "45px",
  // },
  // {
  //   name: "Boodles",
  //   path: Boodles,
  //   id: 4,
  //   width: "148px",
  //   height: "40px",
  // },
  // {
  //   name: "JohnLewis",
  //   path: JohnLewis,
  //   id: 6,
  //   width: "102px",
  //   height: "24px",
  // },
  // {
  //   name: "LeightonHall",
  //   path: LeightonHall,
  //   id: 7,
  //   width: "148px",
  //   height: "48px",
  // },
  // {
  //   name: "CardenPark",
  //   path: CardenPark,
  //   id: 8,
  //   width: "90px",
  //   height: "49px",
  // },
];


const CompanyCarousel = () => {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
      opts={{
        loop: true,
      }}
      className="w-full flex items-center justify-center h-full bg-[#F6F6F8]"
    >
      <CarouselContent className="flex gap-16 items-center">
        {companies.map(({ name, id, path, width, height }) => (
          <CarouselItem key={id} className="basis-1/3 lg:basis-1/6">
            <img
              src={path}
              alt={name}
              style={{ width, height }}
              className={`object-cover`}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default CompanyCarousel;
