import ShieldIcon from "@/assets/homepage/ShieldCheck.svg";
import MedalIcon from "@/assets/homepage/Medal.svg";
import UsersThree from "@/assets/homepage/UsersThree.svg";
import { Button } from "@/Components/ui/button";
import { useNavigate } from "react-router-dom";

const RaffilyInfo = () => {
  const data = [
    {
      title: "Fairness",
      description:
        "We operate our raffle process with clarity and transparency",
      icon: ShieldIcon,
      gradient: "bg-gradient-to-r from-[#AD6FFF] via-[#FD98E8] to-[#FF7385]",
    },
    {
      title: "Authenticity",
      description:
        "We work to high standards - aligning credibility with success and loyalty",
      icon: MedalIcon,
      gradient: "bg-gradient-to-r from-[#AD6FFF] via-[#FD98E8] to-[#FF7385]",
    },
    {
      title: "Integrity",
      description:
        "We maintain high ethical standards to upload a trusted reputation",
      icon: MedalIcon,
      gradient: "bg-gradient-to-r from-[#AD6FFF] via-[#FD98E8] to-[#FF7385]",
    },
    {
      title: "Responsibility",
      description:
        "We maintain high ethical standards to upload a trusted reputation",
      icon: UsersThree,
      gradient: "bg-gradient-to-r from-[#AD6FFF] via-[#FD98E8] to-[#FF7385]",
    },
  ];
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/about-page"); // Replace with the path you want to navigate to
  };

  return (
    <div className="w-full bg-raffles-blue md:gap-28 gap-8 flex md:flex-row flex-col-reverse md:items-center items-start md:justify-between justify-start lg:px-12 px-6 mb-24">
      <div className="md:w-1/2 w-full md:py-[84px] md:pb-84px pb-8">
        <div className="bg-white md:rounded-[20px] rounded-[6px] flex items-center flex-col justify-center p-8">
          {data.map((item, index) => (
            <div
              className="flex w-full items-center justify-start gap-8 mb-4"
              key={index}
            >
              <div
                className={`${item.gradient} rounded-full p-[2.5px] md:w-[70px] md:h-[70px] md:min-w-[70px] md:min-h-[70px] w-[56px] h-[56px] min-w-[56px] min-h-[56px] mb-4`}
              >
                <div className="bg-[#FFF4FB] w-full h-full rounded-full flex items-center justify-center">
                  <img
                    src={item.icon}
                    alt="Shield Icon"
                    className="md:w-[40px] md:h-[40px] w-[24px] h-[24px]"
                  />
                </div>
              </div>

              <div>
                <h5 className="sm:text-[20px] sm:leading-[24px] text-[16px] leading-[19.2px] text-raffles-light-blue font-modernBold">
                  {item.title}
                </h5>

                <p className="sm:text-[14px] sm:leading-[19.6px] text-[12px] leading-[15.6px] text-raffles-light-blue font-modernRegular">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="md:w-1/2 w-full pt-4 md:mt-0 mt-4">
        <div className="flex flex-col justify-start items-start">
          <h4 className="md:text-[40px] text-[28px] text-white md:leading-[40px] leading-[28px] font-modernBold md:mb-12 mb-8">
            Raffily’s{" "}
            <span className="bg-gradient-to-b from-[#FF7385] via-[#FD98E8] to-[#AD6FFF] bg-clip-text text-transparent">
              Values
            </span>
          </h4>
          <div className="text-white md:mb-16 mb-8 max-w-[550px]">
            <p className="md:text-[14px] md:leading-[19.6px] text-[12px] leading-[16.8px] -tracking-2 font-modernRegular mb-5">
              Take your raffle game to the next level with strategies and tools
              designed to maximise your ticket sales. At Raffily, we provide
              everything you need to boost your raffle success and reach more
              participants than ever before.
            </p>
            <p className="md:text-[14px] md:leading-[19.6px] text-[12px] leading-[16.8px] -tracking-2 font-modernRegular">
              Maximise your exposure, increase participation, and watch your
              sales soar. With the right approach, dominating your raffle ticket
              sales has never been easier!
            </p>
          </div>
          {/* <Button className="bg-white text-black md:w-fit w-[154px]">About</Button> */}
          <Button
            className="bg-white h-[45px] sm:w-[89px] w-[154px] font-modernBold text-[16px] leading-[16px]"
            variant="secondary"
            onClick={handleNavigate}
          >
            About
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RaffilyInfo;
