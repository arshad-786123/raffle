const JoinSection = ({ setAuthenticationModal, authenticationModal }: any) => {
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
                Join Raffily
              </h2>
            </div>

            {/* Horizontal Line for Mobile View */}
            <hr className="lg:hidden col-span-12 w-full bg-gray-300 h-[1px] my-4"></hr>

            {/* Vertical Line for Desktop View */}
            <div className="hidden lg:block lg:w-[1px] lg:h-16 bg-gray-300 mx-4"></div>

            {/* Content Section */}
            <div className="col-span-12 lg:col-span-7 text-center lg:text-left">
              <p className="text-sm sm:text-base text-raffles-light-blue">
                Create interactive raffles that captivate your audience, drive
                traffic, and increase brand loyalty. Start engaging your
                customers in a fun and rewarding way!
              </p>
            </div>

            {/* Button Section */}
            <div className="col-span-12 lg:col-span-2 flex justify-center lg:justify-end lg:mt-0 mt-4">
              <button
                className="w-full border bg-raffles-blue text-white text-sm sm:text-base px-[84px] lg:px-[18px] py-[10px] font-bold rounded-lg shadow-lg hover:bg-purple-700"
                style={{ fontFamily: "ModernEraBold" }}
                onClick={() => {
                  setAuthenticationModal({
                    ...authenticationModal,
                    isSignUpOpen: true,
                  });
                }}
              >
                Join Raffily
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default JoinSection;
