// const ContactSection = () => {
//   return (
//     <main className="bg-white">
//       <section className="container-fluid mx-auto px-4 lg:px-10 lg:py-10">
//         <div className="bg-[#FFFAFD] py-2 px-2 md:py-6 md:px-6">
//           {/* Desktop and Mobile View with Centered Content */}
//           <div className="grid grid-cols-12 gap-8 justify-items-center items-center">
//             {/* Title Section */}
//             <div className="col-span-12 lg:col-span-2 text-center lg:text-left">
//               <h2 className="text-3xl font-modernExtraBold text-raffles-blue" style={{ fontFamily: 'ModernEraBold' }}>
//                 Contact Us
//               </h2>
//             </div>

import { useNavigate } from "react-router-dom";

//             {/* Horizontal Line for Mobile View */}
//             <hr className="lg:hidden col-span-12 w-full bg-gray-300 h-[1px] my-4"></hr>

//             {/* Vertical Line for Desktop View */}
//             <div className="hidden lg:block lg:w-[1px] lg:h-16 bg-gray-300 mx-4"></div>

//             {/* Content Section */}
//             <div className="col-span-12 lg:col-span-7 text-center lg:text-left">
//               <p className="text-lg text-raffles-light-blue" >
//                 Explore the FAQs to get started, and if you need further
//                 assistance, feel free to reach out to our support team. We’re
//                 here to help you make the most of your experience with Raffily!
//               </p>
//             </div>

//             {/* Button Section */}
//             <div className="col-span-12 lg:col-span-2 flex justify-center lg:justify-end">
//               <button className="w-full border bg-raffles-blue text-white text-base sm:text-lg px-[22px] py-[17px] font-bold rounded-lg shadow-lg hover:bg-blue-100" style={{ fontFamily: 'ModernEraBold' }}>
//                 Contact Page
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// };

// export default ContactSection;

const ContactSection = () => {


  const navigate = useNavigate(); // Initialize the navigate function

  const handleNavigate = () => {
    navigate("/contact-us"); // Replace with the path you want to navigate to
  };
  return (
    <main className="bg-white">
      <section className="container-fluid mx-auto px-4 lg:px-10 lg:py-10 py-10">
        <div className="bg-[#FFFAFD] py-2 px-2 md:py-6 md:px-6">
          {/* Desktop and Mobile View with Centered Content */}
          <div className="lg:grid grid-cols-12 gap-8 justify-items-center items-center">
            {/* Title Section */}
            <div className="col-span-12 lg:col-span-2 text-center lg:text-left">
              <h2
                className="text-lg sm:text-[22px] font-modernExtraBold text-raffles-blue"
                style={{ fontFamily: "ModernEraBold" }}
              >
                Contact Us
              </h2>
            </div>

            {/* Horizontal Line for Mobile View */}
            <hr className="lg:hidden col-span-12 w-full bg-gray-300 h-[1px] my-4"></hr>

            {/* Vertical Line for Desktop View */}
            <div className="hidden lg:block lg:w-[1px] lg:h-16 bg-gray-300 mx-4"></div>

            {/* Content Section */}
            <div className="col-span-12 lg:col-span-6 text-center lg:text-left">
              <p className="text-sm sm:text-base text-raffles-light-blue">
                Explore the FAQs to get started, and if you need further
                assistance, feel free to reach out to our support team. We’re
                here to help you make the most of your experience with Raffily!
              </p>
            </div>

            {/* Button Section */}
            <div className="col-span-12 lg:col-span-3 flex justify-center lg:justify-end lg:mt-0 mt-4">
              <button
                className="w-full border bg-raffles-blue text-white text-sm sm:text-base px-[84px] lg:px-[18px] py-[10px] font-bold rounded-lg shadow-lg hover:bg-purple-700"
                style={{ fontFamily: "ModernEraBold" }}
                onClick={handleNavigate}
              >
                Contact Page
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactSection;
