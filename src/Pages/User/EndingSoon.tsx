import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_ENDPOINTS, CONSTANT_DATA } from "../../constants";
import moment from "moment";
import { listCategoryWiseRaffle } from "../../Services/Raffle/listRaffle";
import { successToast } from "../../Utils/Toast/success.toast";
import { errorToast } from "../../Utils/Toast/error.toast";
import noimage from "../../assets/no-image.png";
import nouserimage from "../../assets/no-image-user.png";
import { getRaffleOfEndingSoon } from "../../Services/Raffle/categories";


const EndingSoon = () => {
    const navigate = useNavigate();
    const { type } = useParams();
    const [raffleData, setRaffleData] = useState([]);
    const [indexValue, setIndexValue] = useState(null);

    useEffect(() => {
        handleCategoryNavigate(type);
    }, [type]);

    useEffect(() => {
        // getData()
        // Add event listener when component mounts
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Clean up the event listener when component unmounts
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleCategoryNavigate = async (type: any) => {
        try {
            const data = await getRaffleOfEndingSoon();
            console.log("DAYAA", data);

            setRaffleData(data?.data?.result); // Assuming the data structure from your API response
        } catch (error) {
            console.error("Error fetching raffle data:", error);
        }
    };

    const handleNavigate = (id: string) => {
        navigate(`/raffle/details/${id}`, {
            state: {
                // sold: totalSale,
                isOwner: false,
            },
        });
    };

    const menuRef = useRef<HTMLDivElement>(null);
    const handleClickOutside = (event: any) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            // Click occurred outside of the menu, so close it
            setIndexValue(null);
        }
    };

    console.log('Fetched raffle data>>>>:', raffleData);

    return (
        <>
            <div className="hidden footer-manage lg:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-[95%] mt-10 m-auto" style={{ fontFamily: "poppins, sans-serif" }}>
                {raffleData && raffleData.length > 0 ? (
                    raffleData?.map(
                        (item: any) =>
                            item?.raffle_status == 1 && (
                                <div key={item._id} className="keen-slider__slide mb-6">
                                    <div className="bg-[#20124C] rounded-xl relative">
                                        <img
                                            onClick={() => {
                                                handleNavigate(item.uniqueID);
                                            }}
                                            src={
                                                item ? CONSTANT_DATA.IMAGE_BASE_URL + item.images[0] : noimage
                                            }
                                            alt="raffle"
                                            className="cursor-pointer w-[100%] h-[250px] rounded-t-xl"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.onerror = null;
                                                target.src = noimage;
                                            }}
                                        />
                                        {/* Display Status */}
                                        {item.raffle_status === 0 && (
                                            <div className="absolute top-3 left-3 bg-[#FFFFFF] w-fit px-4 py-1 rounded-3xl flex items-center gap-2 cursor-pointer">
                                                PENDING
                                            </div>
                                        )}
                                        {item.raffle_status === 2 && (
                                            <div className="absolute top-3 left-3 bg-[#FF6A78] w-fit px-4 py-1 rounded-3xl flex items-center gap-2 cursor-pointer text-white">
                                                DECLINE
                                            </div>
                                        )}
                                        {/* Content */}
                                        <div className="cursor-pointer w-[90%] m-auto text-white mt-8 pb-6">
                                            <div
                                                onClick={() => {
                                                    handleNavigate(item.uniqueID);
                                                }}
                                                className="flex items-center justify-between"
                                            >
                                                <div className="flex gap-2" style={{ alignItems: "center" }}>
                                                    {item?.ownerImage ? (
                                                        <img
                                                            src={
                                                                item
                                                                    ? CONSTANT_DATA.IMAGE_BASE_URL + item?.ownerImage
                                                                    : nouserimage
                                                            }
                                                            alt={item?.owner?.businessName}
                                                            style={{
                                                                height: "50px",
                                                                width: "50px",
                                                                borderRadius: "50%",
                                                            }}
                                                            onError={(e) => {
                                                                const target = e.target as HTMLImageElement;
                                                                target.onerror = null;
                                                                target.src = nouserimage;
                                                            }}
                                                        />
                                                    ) : (
                                                        <svg
                                                            width="46"
                                                            height="44"
                                                            viewBox="0 0 46 44"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >

                                                        </svg>
                                                    )}
                                                    <div className="flex items-center gap-1">
                                                        <span className="text-md font-light">by</span>
                                                        <h4 className="text-md font-medium">
                                                            {item?.ownerFirstName}
                                                        </h4>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h1 className="text-[#FFBA01] font-bold text-sm tracking-wider m-0">
                                                        {item.currency}
                                                        {item?.ticket_set_prize
                                                            ? "£" + item?.ticket_price
                                                            : moment(item?.time_set_prize).format("DD-MM-YYYY")}{" "}
                                                    </h1>
                                                </div>
                                            </div>
                                            <div className="mt-6">
                                                <h3 className="font-medium text-md tracking-wider">
                                                    {item.raffle_name}
                                                </h3>
                                            </div>
                                            <div className="flex items-center justify-between mt-0">
                                                <p className="mt-2 p-1 text-sm tracking-wider font-light">
                                                    {item?.category}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                    )
                ) : (
                    <div>No raffle found</div>
                )}
            </div>

            <div className="block md:hidden lg:hidden xl:hidden w-[95%] m-auto">
                {raffleData && raffleData?.length > 0 ? (
                    raffleData?.map(
                        (item: any) =>
                            item?.raffle_status == 1 && (
                                <div key={item._id} className="keen-slider__slide mt-4 mb-4">
                                    <div className="bg-[#20124C]  rounded-xl relative">
                                        <img
                                            onClick={() => {
                                                handleNavigate(item.uniqueID);
                                            }}
                                            src={CONSTANT_DATA.IMAGE_BASE_URL + item?.images[0]}
                                            alt="asd"
                                            className="cursor-pointer w-[100%] h-[250px] rounded-t-xl"
                                        />

                                        {item?.raffle_status === 0 && (
                                            <div className="absolute top-3 left-3 bg-[#FFFFFF] w-fit px-4 py-1 rounded-3xl flex items-center gap-2 cursor-pointer">
                                                PENDING
                                            </div>
                                        )}
                                        {item?.raffle_status === 2 && (
                                            <div className="absolute top-3 left-3 bg-[#FF6A78] w-fit px-4 py-1 rounded-3xl flex items-center gap-2 cursor-pointer text-white">
                                                DECLINE
                                            </div>
                                        )}
                                        <div className="cursor-pointer w-[90%] m-auto text-white mt-8 pb-6 ">
                                            <div
                                                onClick={() => {
                                                    handleNavigate(item?.uniqueID);
                                                }}
                                                className="flex items-center justify-between"
                                            >
                                                <div
                                                    className="flex gap-2"
                                                    style={{ alignItems: "center" }}
                                                >
                                                    {item?.ownerImage ? (
                                                        <img
                                                            src={CONSTANT_DATA.IMAGE_BASE_URL + item?.ownerImage}
                                                            alt={item?.owner?.businessName}
                                                            style={{
                                                                height: "50px",
                                                                width: "50px",
                                                                borderRadius: "50%",
                                                            }}
                                                        />
                                                    ) : (
                                                        <svg
                                                            width="46"
                                                            height="44"
                                                            viewBox="0 0 46 44"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <ellipse
                                                                cx="23.1136"
                                                                cy="21.5474"
                                                                rx="22.3402"
                                                                ry="21.5"
                                                                fill="#F2DAE9"
                                                            />
                                                            <g clip-path="url(#clip0_160_72)">
                                                                <path
                                                                    d="M22.9635 21.3854C23.9561 21.3854 24.8157 21.0532 25.518 20.3975C26.2204 19.742 26.5764 18.94 26.5764 18.0134C26.5764 17.0871 26.2204 16.285 25.5179 15.6293C24.8155 14.9739 23.956 14.6416 22.9635 14.6416C21.9707 14.6416 21.1114 14.9739 20.4091 15.6294C19.7067 16.2849 19.3506 17.087 19.3506 18.0134C19.3506 18.94 19.7067 19.7422 20.4092 20.3977C21.1116 21.053 21.9711 21.3854 22.9635 21.3854Z"
                                                                    fill="#232463"
                                                                />
                                                                <path
                                                                    d="M29.285 25.4068C29.2648 25.134 29.2238 24.8364 29.1635 24.5222C29.1026 24.2056 29.0242 23.9063 28.9304 23.6328C28.8334 23.35 28.7016 23.0708 28.5386 22.8033C28.3695 22.5256 28.1708 22.2837 27.9479 22.0848C27.7148 21.8766 27.4294 21.7092 27.0993 21.5871C26.7704 21.4657 26.4059 21.4042 26.016 21.4042C25.8629 21.4042 25.7148 21.4628 25.4288 21.6366C25.2528 21.7437 25.0469 21.8676 24.8171 22.0047C24.6206 22.1215 24.3545 22.231 24.0257 22.3301C23.7049 22.427 23.3792 22.4761 23.0577 22.4761C22.7363 22.4761 22.4107 22.427 22.0896 22.3301C21.7611 22.2311 21.4949 22.1216 21.2987 22.0048C21.071 21.869 20.865 21.7451 20.6864 21.6365C20.4007 21.4627 20.2525 21.4041 20.0994 21.4041C19.7094 21.4041 19.345 21.4657 19.0162 21.5872C18.6864 21.7091 18.4009 21.8765 18.1675 22.0849C17.9447 22.284 17.7459 22.5257 17.577 22.8033C17.4142 23.0708 17.2823 23.3499 17.1853 23.6329C17.0916 23.9064 17.0132 24.2056 16.9523 24.5222C16.892 24.836 16.851 25.1337 16.8308 25.4071C16.8109 25.675 16.8008 25.953 16.8008 26.2338C16.8008 26.9646 17.0497 27.5563 17.5405 27.9926C18.0253 28.4231 18.6667 28.6416 19.4468 28.6416H26.6694C27.4494 28.6416 28.0906 28.4233 28.5755 27.9926C29.0664 27.5566 29.3154 26.9649 29.3154 26.2337C29.3152 25.9516 29.3051 25.6734 29.285 25.4068Z"
                                                                    fill="#232463"
                                                                />
                                                            </g>
                                                            <defs>
                                                                <clipPath id="clip0_160_72">
                                                                    <rect
                                                                        width="15"
                                                                        height="14"
                                                                        fill="white"
                                                                        transform="translate(15.5703 14.6416)"
                                                                    />
                                                                </clipPath>
                                                            </defs>
                                                        </svg>
                                                    )}
                                                    <div className="flex items-center gap-1">
                                                        <span className="text-md font-light">by</span>{" "}
                                                        <h4 className="text-md font-medium">
                                                            {item?.ownerFirstName}
                                                        </h4>
                                                    </div>
                                                </div>


                                                <div>
                                                    <h1 className="text-[#FFBA01] font-bold text-sm tracking-wider m-0">
                                                        {item.currency}{item?.ticket_set_prize
                                                            ? "£" + item?.ticket_price
                                                            : moment(item?.time_set_prize).format(
                                                                "DD-MM-YYYY"
                                                            )}{" "}
                                                    </h1>
                                                </div>
                                            </div>
                                            <div className="mt-6">
                                                <h3 className="font-medium text-md tracking-wider">
                                                    {item?.raffle_name}
                                                </h3>
                                            </div>
                                            <div className="flex items-center justify-between mt-0">
                                                <p className="mt-2 p-1 text-sm tracking-wider font-light">
                                                    {item?.category}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                    )
                ) : (
                    <div>No raffle found</div>
                )}
            </div>
        </>
    );
};

export default EndingSoon;
