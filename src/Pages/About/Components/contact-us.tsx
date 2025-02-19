import { Button } from "@/Components/ui/button";
import { useNavigate } from "react-router-dom";

const ContactUs = () => {
  const navigate = useNavigate();
  const contactpage = () => {
    navigate('/contact-us');
  };
  const handleBusinessFaq = () => {
    navigate("/business-faqs");
  };

  return (
    <div className="w-full lg:px-24 sm:px-10 px-4 lg:h-[107px] flex lg:flex-row flex-col items-center justify-between mb-8 lg:gap-8 gap-2">
      <div className="flex flex-col lg:flex-row items-center lg:gap-8 gap-2 lg:mb-0 mb-8 w-3/4">
        <div className="max-w-fit min-w-fit w-fit">
          <h2 className="text-[22px] font-modernBold leading-[30.8px] text-raffles-light-blue lg:text-start text-center w-full -tracking-2">
            Contact Us
          </h2>
        </div>
        <div className="lg:w-px w-full bg-[#1100441A] lg:h-16 h-px"></div>
        <p
          className="text-[14px] lg:text-[16px] lg:leading-[22.4px] leading-[19.6px] text-raffles-blue flex-grow lg:text-start text-center lg:px-0 px-12 font-modernRegular -tracking-2"
        >
          Have questions or need assistance? We’re here to help! Reach out to
          our support team, and we’ll get back to you as soon as possible.
        </p>
      </div>
      <div className="w/14">
        <Button className="bg-raffles-blue text-white font-bold font-modernBold leading-[16px] text-[16px] lg:w-[141px] h-[45px] w-full hover:bg-purple-700"
          onClick={contactpage}
        >
          Contact Page
        </Button>
      </div>
    </div>
  );
};

export default ContactUs;
