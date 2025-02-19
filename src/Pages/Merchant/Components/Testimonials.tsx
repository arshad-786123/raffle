import lifestyle from "@/assets/homepage/explore/lifestyle.png";
import GiftImage from "@/assets/homepage/winningTickets/Gift.jpg";
import { title } from "process";
import ClearWater from "@/assets/clearWaters.png";
import ClearStaries from "@/assets/clearStariess.png";
import Cast from "@/assets/casts.png";
import Team from "@/assets/team.png";
const testimonials = [
  {
    id: 1,
    title: 'A Smart Investment',
    text: "As a business, we were looking for creative ways to promote our fisheries. The raffle system at Raffily gave us the perfect opportunity. We reached a larger audience and increased our brand visibility!",
    name: "Michael Pennington",
    handle: "Manager at Clearwater Fisheries",
    image: ClearWater,
  },
  {
    id: 2,
    title: 'Raffily is my secret superpower! ',
    text: "Raffily has really helped me launch my brand and build my following! Engaging with entrants is so much fun and I cannot wait to launch my next raffle!",
    name: "Emily Wright",
    handle: "Owner at Clearwater Stables",
    image: ClearStaries,
  },
  {
    id: 3,
    title: 'A brilliant addition to your marketing strategy',
    text: "Raffily is a brilliant addition to our suite of marketing tools. Its innovative platform allows me to easily and quickly upload my raffles!",
    name: "Debbie Waterman",
    handle: "Owner at Time To Breathe Limited",
    image: Team,
  },
  {
    id: 4,
    title: 'The boost we needed',
    text: "Raffily has allowed us to learn so much more about our customers, enabling us to tailor our future raffles to our customers based on what they really want.",
    name: "Ben Govier",
    handle: "Manager at Cast Competitions",
    image: Cast,
  },
];

const Testimonials = () => {
  const firstRow = testimonials.slice(0, 2);
  const secondRow = testimonials.slice(2);
  return (
    <div className="w-full bg-raffles-blue min-h-[850px] relative">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-[rgba(215,206,228,0.5)] via-[rgba(231,202,206,0.5)] to-[rgba(241,195,232,0.5)] z-0 blur-[250px] md:w-96 md:h-96 w-[229px] h-[229px] rounded-full"></div>
      <div className="flex items-center justify-center w-full md:pt-16 mb-12 pt-8 relative">
        <h4 className="text-white font-modernBold md:text-[40px] text-[28px] md:leading-[40px] leading-[28px] text-center" style={{ fontFamily: 'ModernEraBold' }}>
          Hear from our partner <br /> businesses
        </h4>
      </div>
      <div className="w-full mx-auto text-center md:pb-16">
        <div className="overflow-x-auto scrollbar-hide">
          {/* Horizontal Scroll Container */}
          <div className="flex space-x-8">
            {/* Two Rows with Staggered Starts */}
            <div className="flex flex-col space-y-6">
              {/* Row 1 */}
              <div className="flex space-x-6">
                {firstRow.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="md:min-w-[807px] md:w-[807px] md:min-h-[310px] md:h-[310px] min-w-[328px] w-[328px] min-h-[312px] h-[312px] md:p-8 p-4 border-[1px] border-[#FFFFFF33] rounded-[16px] flex flex-col text-white items-start justify-start bg-[#280E51]"
                  >
                    <div className="flex items-center md:mb-3 mb-2">
                      {Array(5)
                        .fill("")
                        .map((_, index) => (
                          <svg
                            className="md:w-6 md:h-6 w-4 h-4 text-[#FF7385] me-1"
                            viewBox="0 0 22 22"
                            key={index}
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clip-path="url(#clip0_41_3631)">
                              <path
                                d="M20.1347 9.86992L16.2675 13.2069L17.4457 18.1973C17.5108 18.4682 17.494 18.7523 17.3976 19.0137C17.3013 19.2751 17.1296 19.502 16.9043 19.6659C16.679 19.8298 16.4102 19.9232 16.1318 19.9344C15.8534 19.9455 15.578 19.874 15.3403 19.7287L11.0004 17.0577L6.65801 19.7287C6.42033 19.8731 6.14523 19.944 5.86734 19.9324C5.58944 19.9209 5.32119 19.8273 5.09636 19.6636C4.87153 19.4998 4.70016 19.2732 4.60385 19.0123C4.50754 18.7514 4.49059 18.4678 4.55512 18.1973L5.73762 13.2069L1.87043 9.86992C1.66014 9.68817 1.50806 9.4485 1.43317 9.18083C1.35828 8.91316 1.36391 8.62936 1.44935 8.36487C1.5348 8.10038 1.69627 7.86693 1.9136 7.69366C2.13093 7.52039 2.3945 7.41499 2.67137 7.39062L7.74168 6.98156L9.69762 2.24812C9.80349 1.99015 9.98368 1.76949 10.2153 1.61419C10.4469 1.4589 10.7194 1.37598 10.9983 1.37598C11.2771 1.37598 11.5497 1.4589 11.7813 1.61419C12.0129 1.76949 12.1931 1.99015 12.299 2.24812L14.254 6.98156L19.3243 7.39062C19.6018 7.41409 19.8661 7.5189 20.0842 7.69192C20.3023 7.86495 20.4646 8.0985 20.5505 8.36331C20.6365 8.62812 20.6424 8.91241 20.5675 9.18057C20.4927 9.44873 20.3403 9.68882 20.1296 9.87078L20.1347 9.86992Z"
                                fill="#FF7385"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_41_3631">
                                <rect width="22" height="22" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        ))}
                    </div>
                    <h5 className="font-modernBold md:text-[20px] text-[16px] md:leading-[26px] leading-[20.8px] md:mb-5 mb-3 text-start" style={{ fontFamily: 'ModernEraBold' }}>
                      {testimonial.title}
                    </h5>

                    <div className="md:mb-8 mb-8">
                      <p className="md:text-[16px] text-[14px] md:leading-[22.4px] leading-[19.6px] text-[#ffffff99] text-start md:line-clamp-3 line-clamp-6" style={{ fontFamily: 'ModernEraRegular' }}>
                        {testimonial.text}
                      </p>
                    </div>

                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-4">
                        <img
                          src={testimonial.image || lifestyle}
                          className="md:size-[64px] size-[40px] rounded-full object-contain z-10"
                          alt=""
                        />
                        <div className="text-start">
                          <h4 className="md:text-[18px] text-[14px] font-modernBold md:leading-[25.2px] leading-[19.6px]" style={{ fontFamily: 'ModernEraBold' }}>
                            {testimonial.name}
                          </h4>
                          <h5 className="md:text-[14px] text-[12px] font-modernRegular md:leading-[19.6px] leading-[16.8px]" style={{ fontFamily: 'ModernEraBold' }}>
                            {testimonial.handle}
                          </h5>
                        </div>
                      </div>
                      <div className="inset-0 bg-gradient-to-r from-[#AD6FFF] via-[#FD98E8] to-[#FF7385] rounded-full p-[2.5px] md:w-[76px] w-[46px] md:h-[76px] h-[46px] ">
                        {/* Inner content */}
                        <div className="bg-[#280E51] w-full h-full rounded-full flex items-center justify-center">
                          {/* <img src={GiftImage} alt="" className="size-9" /> */}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Row 2 (Offset) */}
              <div className="flex space-x-6">
                {secondRow.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="md:min-w-[807px] md:w-[807px] md:min-h-[310px] md:h-[310px] min-w-[328px] w-[328px] min-h-[312px] h-[312px] md:p-8 p-4 border-[1px] border-[#FFFFFF33] rounded-[16px] flex flex-col text-white items-start justify-start bg-[#280E51]"
                  >
                    <div className="flex items-center md:mb-3 mb-2">
                      {Array(5)
                        .fill("")
                        .map((_, index) => (
                          <svg
                            className="md:w-6 md:h-6 w-4 h-4 text-[#FF7385] me-1"
                            viewBox="0 0 22 22"
                            key={index}
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clip-path="url(#clip0_41_3631)">
                              <path
                                d="M20.1347 9.86992L16.2675 13.2069L17.4457 18.1973C17.5108 18.4682 17.494 18.7523 17.3976 19.0137C17.3013 19.2751 17.1296 19.502 16.9043 19.6659C16.679 19.8298 16.4102 19.9232 16.1318 19.9344C15.8534 19.9455 15.578 19.874 15.3403 19.7287L11.0004 17.0577L6.65801 19.7287C6.42033 19.8731 6.14523 19.944 5.86734 19.9324C5.58944 19.9209 5.32119 19.8273 5.09636 19.6636C4.87153 19.4998 4.70016 19.2732 4.60385 19.0123C4.50754 18.7514 4.49059 18.4678 4.55512 18.1973L5.73762 13.2069L1.87043 9.86992C1.66014 9.68817 1.50806 9.4485 1.43317 9.18083C1.35828 8.91316 1.36391 8.62936 1.44935 8.36487C1.5348 8.10038 1.69627 7.86693 1.9136 7.69366C2.13093 7.52039 2.3945 7.41499 2.67137 7.39062L7.74168 6.98156L9.69762 2.24812C9.80349 1.99015 9.98368 1.76949 10.2153 1.61419C10.4469 1.4589 10.7194 1.37598 10.9983 1.37598C11.2771 1.37598 11.5497 1.4589 11.7813 1.61419C12.0129 1.76949 12.1931 1.99015 12.299 2.24812L14.254 6.98156L19.3243 7.39062C19.6018 7.41409 19.8661 7.5189 20.0842 7.69192C20.3023 7.86495 20.4646 8.0985 20.5505 8.36331C20.6365 8.62812 20.6424 8.91241 20.5675 9.18057C20.4927 9.44873 20.3403 9.68882 20.1296 9.87078L20.1347 9.86992Z"
                                fill="#FF7385"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_41_3631">
                                <rect width="22" height="22" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        ))}
                    </div>
                    <h5 className="font-modernBold md:text-[20px] text-[16px] md:leading-[26px] leading-[20.8px] md:mb-5 mb-3 text-start">
                      {testimonial.title}
                    </h5>

                    <div className="md:mb-8 mb-8">
                      <p className="md:text-[16px] text-[14px] md:leading-[22.4px] leading-[19.6px] text-[#ffffff99] text-start md:line-clamp-3 line-clamp-6">
                        {testimonial.text}
                      </p>
                    </div>

                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-4">
                        <img
                          src={testimonial.image || lifestyle}
                          className="md:size-[64px] size-[40px] rounded-full object-contain z-10"
                          alt=""
                        />
                        <div className="text-start">
                          <h4 className="md:text-[18px] text-[14px] font-modernBold md:leading-[25.2px] leading-[19.6px]">
                            {testimonial.name}
                          </h4>
                          <h5 className="md:text-[14px] text-[12px] font-modernRegular md:leading-[19.6px] leading-[16.8px]">
                            {testimonial.handle}
                          </h5>
                        </div>
                      </div>
                      <div className="inset-0 bg-gradient-to-r from-[#AD6FFF] via-[#FD98E8] to-[#FF7385] rounded-full p-[2.5px] md:w-[76px] w-[46px] md:h-[76px] h-[46px] ">
                        {/* Inner content */}
                        <div className="bg-[#280E51] w-full h-full rounded-full flex items-center justify-center">
                          {/* <img src={GiftImage} alt="" className="size-9" /> */}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;