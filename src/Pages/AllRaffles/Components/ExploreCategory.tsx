import React, { useState } from "react"
import "keen-slider/keen-slider.min.css"
import { useKeenSlider } from "keen-slider/react"
import lifestyle from "../../../assets/homepage/explore/lifestyle.png"
import home from "../../../assets/homepage/explore/home.png"
import furniture from "../../../assets/homepage/explore/furniture.png"
import kitchen from "../../../assets/homepage/explore/kitchen.png"
import GalleryCard from "./GalleryCard"
import { MdArrowBackIosNew } from "react-icons/md"
import { MdArrowForwardIos } from "react-icons/md"
import { Badge } from "@/Components/ui/badge"
import { Button } from "@/Components/ui/button"
import HorizontalCard from "@/Components/Cards/HorizontalCard/HorizontalCard"

const data = [
  {
    image: lifestyle,
    name: "Lifestyle"
  },
  {
    image: home,
    name: "Home Appliances"
  },
  {
    image: furniture,
    name: "Furniture"
  },
  {
    image: kitchen,
    name: "Kitchen"
  },
  {
    image: home,
    name: "Home Appliances"
  },
  {
    image: lifestyle,
    name: "Lifestyle"
  },
  {
    image: home,
    name: "Home Appliances"
  },
  {
    image: furniture,
    name: "Furniture"
  },
  {
    image: kitchen,
    name: "Kitchen"
  },
  {
    image: home,
    name: "Home Appliances"
  }
]

const ExploreCategory = () => {
  let total = 20
  let visible = 3
  let step = 3

  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [desktopRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "free-snap",
    slides: {
      perView: 4,
      spacing: 10
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    }
  })

  const [tabRef1, tabInstanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "free-snap",
    slides: {
      perView: 3,
      spacing: 1
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    }
  })

  const [tabRef2, tabInstanceRef2] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "free-snap",
    slides: {
      perView: 2,
      spacing: 1
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    }
  })

  const [mobileRef1, mobileInstanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "free-snap",
    slides: {
      perView: 2,
      spacing: 10
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    }
  })

  const [mobileRef2, mobileInstanceRef2] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "free-snap",
    slides: {
      perView: 1,
      spacing: 1
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    }
  })

  return (
    <div>
      {/* <div className="hidden sm:hidden md:hidden lg:hidden xl:block w-[90%] mt-0 sm:mt-20 m-auto">
        <h1 className="text-[#47207B] text-2xl font-bold tracking-wide">
          Categories Coming Soon
        </h1>

        <div className="flex items-center justify-center relative  mt-8 ">
          <MdArrowBackIosNew
            className="text-5xl font-light  rounded-[100%] bg-[#FFFAFA] text-black drop-shadow-lg p-4 cursor-pointer leftarrow"
            onClick={(e: React.MouseEvent<SVGSVGElement, MouseEvent>) =>
              instanceRef.current?.prev()
            }
          />
          <section ref={desktopRef} className="keen-slider">
            {data.map((item) => (
              <GalleryCard image={item.image} name={item.name} />
            ))}
          </section>

          <MdArrowForwardIos
            className="text-5xl font-light  rounded-[100%] bg-[#FFFAFA] text-black drop-shadow-lg p-4 cursor-pointer rightarrow"
            onClick={(e: React.MouseEvent<SVGSVGElement, MouseEvent>) =>
              instanceRef.current?.next()
            }
          />
        </div>
      </div>
      <div className="hidden sm:hidden md:hidden  xl:hidden lg:block w-[100%] pl-6 pt-20 m-auto">
        <h1 className="text-[#47207B] text-2xl font-bold tracking-wide">
          Explore Categories
        </h1>

        <div className="flex items-center justify-between">
          <MdArrowBackIosNew
            className="text-5xl font-light  rounded-[100%] bg-[#FFFAFA] text-black drop-shadow-lg p-4 cursor-pointer"
            onClick={(e: React.MouseEvent<SVGSVGElement, MouseEvent>) =>
              tabInstanceRef.current?.prev()
            }
          />
          <section
            ref={tabRef1}
            className="relative multiple-items flex items-center keen-slider mt-8 justify-center"
          >
            {data.map((item) => (
              <GalleryCard image={item.image} name={item.name} />
            ))}
          </section>

          <MdArrowForwardIos
            className="text-5xl font-light  rounded-[100%] bg-[#FFFAFA] text-black drop-shadow-lg p-4 cursor-pointer"
            onClick={(e: React.MouseEvent<SVGSVGElement, MouseEvent>) =>
              tabInstanceRef.current?.next()
            }
          />
        </div>
      </div>
      <div className="hidden sm:hidden lg:hidden xl:hidden md:block w-[100%] pl-6 pt-20 m-auto">
        <h1 className="text-[#47207B] text-2xl font-bold tracking-wide">
          Explore Categories
        </h1>

        <div className="flex items-center justify-between">
          <MdArrowBackIosNew
            className="text-5xl font-light  rounded-[100%] bg-[#FFFAFA] text-black drop-shadow-lg p-4 cursor-pointer"
            onClick={(e: React.MouseEvent<SVGSVGElement, MouseEvent>) =>
              tabInstanceRef2.current?.prev()
            }
          />
          <section
            ref={tabRef2}
            className="relative multiple-items flex items-center keen-slider mt-8 justify-center"
          >
            {data.map((item) => (
              <GalleryCard image={item.image} name={item.name} />
            ))}
          </section>

          <MdArrowForwardIos
            className="text-5xl font-light  rounded-[100%] bg-[#FFFAFA] text-black drop-shadow-lg p-4 cursor-pointer"
            onClick={(e: React.MouseEvent<SVGSVGElement, MouseEvent>) =>
              tabInstanceRef2.current?.next()
            }
          />
        </div>
      </div>
      <div className="hidden md:hidden lg:hidden xl:hidden sm:block w-[100%] pl-6 pt-20 m-auto">
        <h1 className="text-[#47207B] text-2xl font-bold tracking-wide">
          Explore Categories
        </h1>

        <div className="flex items-center justify-between">
          <MdArrowBackIosNew
            className="text-5xl font-light  rounded-[100%] bg-[#FFFAFA] text-black drop-shadow-lg p-4 cursor-pointer"
            onClick={(e: React.MouseEvent<SVGSVGElement, MouseEvent>) =>
              mobileInstanceRef.current?.prev()
            }
          />
          <section
            ref={mobileRef1}
            className="relative multiple-items flex items-center keen-slider mt-8 justify-center"
          >
            {data.map((item) => (
              <GalleryCard image={item.image} name={item.name} />
            ))}
          </section>

          <MdArrowForwardIos
            className="text-5xl font-light  rounded-[100%] bg-[#FFFAFA] text-black drop-shadow-lg p-4 cursor-pointer"
            onClick={(e: React.MouseEvent<SVGSVGElement, MouseEvent>) =>
              mobileInstanceRef.current?.next()
            }
          />
        </div>
      </div>
      <div className="block sm:hidden md:hidden lg:hidden xl:hidden w-[100%] pl-6 pt-10 m-auto">
        <h1 className="text-[#47207B] text-2xl font-bold tracking-wide">
          Categories Coming Soon
        </h1>

        <div className="flex items-center justify-between">
          <MdArrowBackIosNew
            className="text-5xl font-light  rounded-[100%] bg-[#FFFAFA] text-black drop-shadow-lg p-4 cursor-pointer"
            onClick={(e: React.MouseEvent<SVGSVGElement, MouseEvent>) =>
              mobileInstanceRef2.current?.prev()
            }
          />
          <section ref={mobileRef2} className=" keen-slider mt-8 ">
            {data.map((item) => (
              <GalleryCard image={item.image} name={item.name} />
            ))}
          </section>

          <MdArrowForwardIos
            className="text-5xl font-light  rounded-[100%] bg-[#FFFAFA] text-black drop-shadow-lg p-4 cursor-pointer"
            onClick={(e: React.MouseEvent<SVGSVGElement, MouseEvent>) =>
              mobileInstanceRef2.current?.next()
            }
          />
        </div>
      </div> */}
      <div className="lg:px-24 sm:px-10 px-4 py-14 w-full bg-[#FFFAFD] custom-scrollbar">
        <h3 className="sm:text-[32px] sm:leading-[32px] text-[24px] leading-[24px] font-modernBold text-black mb-8 custom-scrollbar">
          Featured raffles
        </h3>
        <div className="flex gap-5 overflow-x-auto overflow-y-hidden">
          <HorizontalCard />
        </div>
      </div>
    </div>
  )
}

export default ExploreCategory
