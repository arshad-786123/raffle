import coin from "../../../assets/merchant/Coins.svg";
import stamp from "../../../assets/merchant/Stamp.svg";
import BellSimple from "../../../assets/merchant/BellSimple.svg";
import GitDiff from "../../../assets/merchant/GitDiff.svg";
import tabs from "../../../assets/merchant/Tabs.svg";
import medal from "../../../assets/merchant/Medal.svg";
import flag from "../../../assets/merchant/FlagBannerFold.svg";
import StackSimple from "../../../assets/merchant/StackSimple.svg";
import DeviceMobile from "../../../assets/merchant/DeviceMobile.svg";
import link from "../../../assets/merchant/Link.svg";
import ChartBar from "../../../assets/merchant/ChartBar.svg";
import lock from "../../../assets/merchant/Lock.svg";
import RocketLaunch from "../../../assets/merchant/RocketLaunch.svg";
import Headset from "../../../assets/merchant/Headset.svg";
import Megaphone from "../../../assets/merchant/Megaphone.svg";


const RaffilyKeyFeatures = () => {
  const features = [
    {
      title: "No Fees",
      description: "We won’t charge you anything.",
      icon: <img src={coin} alt="End Date Icon" className="md:w-18 md:h-18" />,
    },
    {
      title: "No license required",
      description:
        "You don’t need any license to raffle your products or experiences with Raffily.",
      icon: <img src={stamp} alt="End Date Icon" className="w-18 h-18" />,
    },
    {
      title: "Automatic draws",
      description:
        "Our tailored draw process facilitates automatic draws which take place randomly and fairly.",
      icon: <img src={GitDiff} alt="End Date Icon" className="w-18 h-18" />,
    },
    {
      title: "Raffle Status Updates",
      description:
        "Both you and the entrants will receive notification updates via email at each stage of the raffle.",
      icon: <img src={BellSimple} alt="End Date Icon" className="w-18 h-18" />,
    },
    {
      title: "Paid Raffle & Free Raffle options",
      description:
        "Want to raffle a prize at no cost to the entrant? Raffle it for free!",
      icon: <img src={tabs} alt="End Date Icon" className="w-18 h-18" />,
      highlighted: true,
    },
    {
      title: "Industry Expertise",
      description:
        "Raffily’s team boasts years of high-level professional regulatory experience.",
      icon: <img src={medal} alt="End Date Icon" className="w-18 h-18" />,
    },
    {
      title: "Easy Raffle Setup",
      description:
        "Intuitive interface for setting up and managing raffles with minimal effort.",
      icon: <img src={flag} alt="End Date Icon" className="w-18 h-18" />,
    },
    {
      title: "Customisable Raffle Options",
      description:
        "You can choose the duration of your raffle along with your images and raffle prize description.",
      icon: <img src={StackSimple} alt="End Date Icon" className="w-18 h-18" />,
    },
    {
      title: "Your own Raffily Raffle Link",
      description:
        "To enable you to direct entrants directly to your raffle on the Raffily site, you'll have a custom domain that can be applied as a widget.",
      icon: <img src={link} alt="End Date Icon" className="w-18 h-18" />,
    },
    {
      title: "Sales & Entry Tracking",
      description:
        "Track ticket sales, entries, and performance and conversion rates with detailed insights.",
      icon: <img src={DeviceMobile} alt="End Date Icon" className="w-18 h-18" />,
    },
    {
      title: "Audience Demographics",
      description:
        "Get information about who’s entering, including locations, demographics, & engagement metrics.",
      icon: <img src={ChartBar} alt="End Date Icon" className="w-18 h-18" />,
    },
    {
      title: "Compliance & Fraud Protection",
      description:
        "Safe and encrypted payments for ticket purchases and anti-fraud measures to protect against fraudulent entries or manipulations.",
      icon: <img src={lock} alt="End Date Icon" className="w-18 h-18" />,
    },
    {
      title: "Quick Approvals & Launch",
      description:
        "You can quickly submit your raffle for approval and have it live within a short timeframe.",
      icon: <img src={RocketLaunch} alt="End Date Icon" className="w-18 h-18" />,
    },
    {
      title: "Support",
      description:
        "Comprehensive resource centre to help you navigate the platform with ease.",
      icon: <img src={Headset} alt="End Date Icon" className="w-18 h-18" />,
    },
    {
      title: "Two-Way Raffle Promotion",
      description:
        "Raffily will work alongside you to promote your raffle. We will also showcase our winners on the page.",
      icon: <img src={Megaphone} alt="End Date Icon" className="w-18 h-18" />,
    },
  ];

  return (
    <div className="bg-white py-10 px-4 sm:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Features Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* First Grid Item with Title */}
          <div className="col-span-full sm:col-span-2 lg:col-span-1 justify-center md:content-center flex lg:block">
            <h3 className="text-[28px] md:text-[40px] font-modernExtraBold text-raffles-blue" style={{ fontFamily: 'ModernEraBold' }}>
              Raffily
            </h3>
            <h3
              className="text-[28px] md:text-[40px] font-modernExtraBold ml-2 lg:ml-0"
              style={{
                background:
                  "linear-gradient(55.21deg, #AD6FFF 9.69%, #FD98E8 47.47%, #FF7385 83.78%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontFamily: 'ModernEraBold'
              }}
            >
              Key Features
            </h3>
          </div>

          {/* Remaining Features */}
          {features.map((feature, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl bg-white border-[1px] border-[#EAEBED] bg-[#F6F6F899]`}
            >
              {/* Icon */}

              <div className="flex">
                <div className="flex items-center justify-center rounded-full">
                  {feature.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-sm md:text-lg font-modernExtraBold text-raffles-blue mt-2" style={{ fontFamily: 'ModernEraBold' }}>
                {feature.title}
              </h3>
              {/* Description */}
              <p className="text-[10px] md:text-xs text-raffles-blue mt-2" style={{ fontFamily: 'ModernEraRegular' }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RaffilyKeyFeatures;
