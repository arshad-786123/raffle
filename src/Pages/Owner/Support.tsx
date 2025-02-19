import OwnerSidebar from "../../Components/Navbar/OwnerSidebar";

const Support = () => {
  return (
    <div className="flex footer-manage" style={{ fontFamily: "poppins, sans-serif" }}>
      <div className="hidden lg:block">
        <OwnerSidebar />
      </div>
      <div className="container mx-auto px-4 mt-8 md:mt-12 lg:mt-16">
        <div className="max-w-full mx-auto">
          <div className="bg-[#F9F0F0] py-8 md:py-10 lg:py-12 px-6 md:px-8 lg:px-12 w-full text-center">
            <p className="text-gray-700 mx-4">
              For help or support, please contact{" "}
              <a
                href="mailto:hello@raffily.co.uk"
                className="text-blue-600 hover:underline"
              >
                hello@raffily.co.uk
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
