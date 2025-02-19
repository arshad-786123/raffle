import React, { useEffect, useState } from "react";
import AdminSidebar from "../../Components/Navbar/AdminSidebar";
import {
  getMerchantRaffles,
  updateRaffleStatus,
} from "../../Services/Admin/getDashboardData";
import { Link, useParams } from "react-router-dom";
import { CONSTANT_DATA } from "../../constants";

const ViewRaffles = () => {
  const [rafflesData, setRafflesData] = useState<any[]>([]);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      getUserDetail(id);
    }
  }, [id]);

  const getUserDetail = async (ownerId: string) => {
    try {
      const res = await getMerchantRaffles(ownerId);
      setRafflesData(res.result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatusUpdate = async (_id: string, status: number) => {
    try {
      await updateRaffleStatus(_id, status);
      // Update the state to reflect the change
      setRafflesData((prevRafflesData) =>
        prevRafflesData.map((raffle) =>
          raffle._id === _id ? { ...raffle, raffle_status: status } : raffle
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex footer-manage" style={{ fontFamily: "poppins, sans-serif" }}>
      <div className="hidden lg:block">
        <AdminSidebar />
      </div>
      <div className="w-[100%] lg:w-[95%] mx-auto z-10 p-3 lg:p-10">
        <div className="m-auto w-[100%] lg:w-[90%]">
          <nav aria-label="breadcrumb" className="breadcrumb-container ">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/admin/reports" className="breadcrumb-link">
                  Dashboard
                </Link>
              </li>
              <li className="px-2">{">"}</li>
              <li className="breadcrumb-item">
                <Link to="/admin/merchants" className="breadcrumb-link">
                  Merchants
                </Link>
              </li>
              <li className="px-2">{">"}</li>
              <li className="breadcrumb-item active" aria-current="page">
                Raffles
              </li>
            </ol>
          </nav>
        </div>
        <div className="w-[100%] lg:w-[90%] mx-auto z-10 p-4 duration-500 rounded-md bg-[#F9F0F0] mt-4">
          <div className="flex items-center justify-between mb-4">
            <h4>View Raffles</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rafflesData?.map((item: any) => (
              <div
                key={item?._id}
                className="bg-[#20124C] relative rounded-md shadow-md"
              >
                <img
                  src={CONSTANT_DATA.IMAGE_BASE_URL + item.images[0]}
                  alt={item.raffle_name}
                  className="cursor-pointer w-[100%] h-[250px] rounded-t-md object-cover"
                />
                {/* Pending status */}
                {item?.raffle_status === 0 && (
                  <>
                    <div
                      className="absolute top-3 left-3 bg-[#FFFFFF] w-fit px-4 py-1 rounded-3xl flex items-center gap-2 cursor-pointer"
                      onClick={() => handleStatusUpdate(item._id, 1)}
                    >
                      APPROVE
                    </div>
                    <div
                      className="absolute top-3 right-3 text-white bg-[#FF6A78] w-fit px-4 py-1 rounded-3xl flex items-center gap-2 cursor-pointer"
                      onClick={() => handleStatusUpdate(item._id, 3)}
                    >
                      DECLINE
                    </div>
                  </>
                )}

                {item?.raffle_status === 1 && (
                  <>
                    <svg
                      className="absolute top-3 right-3 bg-[#FFFFFF] w-fit  rounded-3xl flex items-center gap-2 cursor-pointer"
                      xmlns="http://www.w3.org/2000/svg"
                      version="1.1"
                      width="40"
                      height="40"
                      x="0"
                      y="0"
                      viewBox="0 0 512 512"
                      style={{ background: "new 0 0 512 512" }}
                    >
                      <g>
                        <path
                          d="M240.039 19.896c8.791 5.829 23.176 5.829 31.954 0l23.214-15.424c8.786-5.837 20.593-3.318 26.243 5.591l14.932 23.549c5.65 8.904 18.783 14.751 29.181 12.992l27.484-4.657c10.401-1.761 20.175 5.332 21.706 15.767l4.076 27.533c1.546 10.437 11.156 21.138 21.376 23.77l26.97 6.956c10.222 2.642 16.256 13.117 13.417 23.276l-7.47 26.767c-2.836 10.158 1.6 23.841 9.866 30.4l21.893 17.367c8.264 6.559 9.518 18.568 2.793 26.701L489.9 261.939c-6.723 8.125-8.225 22.426-3.343 31.775l12.908 24.676c4.884 9.354 1.16 20.844-8.289 25.533l-24.968 12.393c-9.449 4.692-16.632 17.149-15.974 27.676l1.725 27.794c.668 10.522-7.424 19.51-17.969 19.96l-27.832 1.178c-10.537.451-22.167 8.909-25.851 18.801l-9.682 26.084c-3.684 9.894-14.717 14.815-24.525 10.934l-25.93-10.25c-9.802-3.884-23.869-.896-31.252 6.643l-19.474 19.891c-7.386 7.534-19.461 7.534-26.852.01l-19.505-19.904c-7.388-7.532-21.455-10.519-31.263-6.638l-25.917 10.25c-9.807 3.884-20.841-1.037-24.517-10.934l-9.705-26.084c-3.679-9.889-15.309-18.35-25.851-18.801l-27.822-1.178c-10.545-.451-18.627-9.439-17.969-19.96l1.741-27.794c.655-10.524-6.538-22.984-15.985-27.676l-24.96-12.393c-9.446-4.69-13.181-16.177-8.294-25.533l12.908-24.676c4.884-9.349 3.382-23.649-3.351-31.767L4.327 240.466c-6.728-8.12-5.468-20.129 2.793-26.688l21.898-17.367c8.261-6.559 12.703-20.234 9.869-30.397l-7.488-26.778c-2.836-10.158 3.2-20.626 13.412-23.252l26.99-6.971c10.212-2.629 19.835-13.33 21.376-23.767l4.073-27.533c1.544-10.435 11.313-17.528 21.711-15.767l27.487 4.657c10.401 1.759 23.532-4.088 29.174-12.992l14.925-23.549c5.642-8.909 17.457-11.428 26.25-5.591l23.242 15.425z"
                          fill="#90dea9"
                          data-original="#90dea9"
                        ></path>
                        <path
                          d="M421.65 256.279c0 91.487-74.171 165.65-165.65 165.65-91.474 0-165.645-74.163-165.645-165.65 0-91.459 74.168-165.624 165.645-165.624 91.479 0 165.65 74.165 165.65 165.624z"
                          fill="#71bf8c"
                          data-original="#71bf8c"
                        ></path>
                        <path
                          d="m228.383 333.66-66.304-66.307 22.09-22.1 44.214 44.206 99.451-99.464 22.09 22.108z"
                          fill="#ffffff"
                          data-original="#ffffff"
                        ></path>
                      </g>
                    </svg>
                  </>
                )}
                {item?.raffle_status === 3 && (
                  <>
                    <svg
                      className="absolute top-3 right-3 bg-[#FFFFFF] w-fit  rounded-3xl flex items-center gap-2 cursor-pointer"
                      xmlns="http://www.w3.org/2000/svg"
                      version="1.1"
                      width="40"
                      height="40"
                      x="0"
                      y="0"
                      viewBox="0 0 512 512"
                      style={{ background: "new 0 0 512 512" }}
                    >
                      <g>
                        <g data-name="2.Rejected">
                          <path
                            fill="#f17b89"
                            d="M303.31 44.39a50.21 50.21 0 0 0 68.87 28.52c42.67-20.28 87.19 24.24 66.91 66.91a50.21 50.21 0 0 0 28.52 68.87c44.52 15.83 44.52 78.79 0 94.62a50.21 50.21 0 0 0-28.52 68.87c20.28 42.67-24.24 87.19-66.91 66.91a50.21 50.21 0 0 0-68.87 28.52c-15.83 44.52-78.79 44.52-94.62 0a50.21 50.21 0 0 0-68.87-28.52c-42.67 20.28-87.19-24.24-66.91-66.91a50.21 50.21 0 0 0-28.52-68.87c-44.52-15.83-44.52-78.79 0-94.62a50.21 50.21 0 0 0 28.52-68.87c-20.28-42.67 24.24-87.19 66.91-66.91a50.21 50.21 0 0 0 68.87-28.52c15.83-44.52 78.79-44.52 94.62 0z"
                            opacity="1"
                            data-original="#f17b89"
                          ></path>
                          <circle
                            cx="256"
                            cy="256"
                            r="151.47"
                            fill="#f7f5fb"
                            opacity="1"
                            data-original="#f7f5fb"
                          ></circle>
                          <path
                            fill="#f17b89"
                            d="m303.44 256 26.73-26.73a33.55 33.55 0 0 0 0-47.44 33.55 33.55 0 0 0-47.44 0L256 208.56l-26.73-26.73a33.55 33.55 0 0 0-47.44 0 33.55 33.55 0 0 0 0 47.44L208.56 256l-26.73 26.73a33.55 33.55 0 0 0 0 47.44 33.55 33.55 0 0 0 47.44 0L256 303.44l26.73 26.73a33.55 33.55 0 0 0 47.44 0 33.55 33.55 0 0 0 0-47.44z"
                            opacity="1"
                            data-original="#f17b89"
                          ></path>
                          <path
                            fill="#f17b89"
                            d="M314.16 449.9a49.75 49.75 0 0 0-10.85 17.71C295.39 489.87 275.69 501 256 501s-39.4-11.13-47.31-33.39a50.17 50.17 0 0 0-68.87-28.53 50.63 50.63 0 0 1-21.82 5.06c-34.24 0-61.9-36.62-45.1-72a50.16 50.16 0 0 0-28.53-68.86C22.12 295.4 11 275.7 11 256s11.12-39.4 33.38-47.31a50.23 50.23 0 0 0 33.41-47.35 50 50 0 0 0-4.88-21.52 50.6 50.6 0 0 1-5-21.8c0-31.32 30.62-57.13 62.89-48.46 1.97 153.31 72.99 289.97 183.36 380.34z"
                            opacity="1"
                            data-original="#d36e7f"
                          ></path>
                          <path
                            fill="#f7f5fb"
                            d="M268 407q-5.94.47-12 .47a151.48 151.48 0 0 1-116.11-248.76A498.66 498.66 0 0 0 268 407z"
                            opacity="1"
                            data-original="#e4e3e8"
                          ></path>
                          <path
                            fill="#f17b89"
                            d="M213.81 339a33.06 33.06 0 0 1-8.27 1 33.55 33.55 0 0 1-23.91-57.07A495.39 495.39 0 0 0 213.81 339z"
                            opacity="1"
                            data-original="#d36e7f"
                          ></path>
                        </g>
                      </g>
                    </svg>
                  </>
                )}

                <div className="p-4 text-white mb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <h3 className="font-medium text-md tracking-wider">
                        {item.raffle_name}
                      </h3>
                    </div>
                    <div>
                      <h1 className="text-[#FFBA01] font-bold text-sm tracking-wider m-0">
                        {item?.currency || "$"} {item.ticket_price}
                      </h1>
                    </div>
                  </div>
                  <div className="mt-6">
                    <p className="text-sm tracking-wider font-light">
                      {item.raffle_description}
                    </p>
                  </div>
                  <p className="-mb-3 mt-4 text-sm tracking-wider font-light">
                    Category: {item.category}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {rafflesData?.length == 0 && (
            <p className="text-center my-6 h-[400px]">No Data Found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewRaffles;
