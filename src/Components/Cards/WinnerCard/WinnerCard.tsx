import { Badge } from "@/Components/ui/badge"

import lifestyle from "../../../assets/homepage/explore/lifestyle.png"
import home from "../../../assets/homepage/explore/home.png"
import { CONSTANT_DATA } from "@/constants"
import noimage from "../../../assets/no-image.png";
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
const WinnerCard = ({ winner }: { winner: any }) => {
  console.log("winner", winner)


  const formatDate = (cronTime: string) => {
    const date = new Date(cronTime);
    return format(date, "d'th' MMMM, yyyy"); // Formats to "24th September, 2024"
  };

  return (
    <Link to={`/raffle/details/${winner.uniqueID}`}>
      <div className="w-full h-full min-h-[480px] border rounded-[16px] relative">
        <div className="flex items-center justify-between p-4 flex-wrap">
          <div className="flex items-center gap-2">
            {/* <img

              src={winner.user?.image ? `${CONSTANT_DATA.BASE_URL}${winner.user.image}` : noimage}
              alt="logo"
              className="rounded-full w-[40px] h-[40px] object-contain"
            /> */}
            <div className="flex items-center gap-2">
              <span className="text-[16px] leading-[19.2px] text-raffles-blue font-modernBold font-bold">
                {winner.user?.firstname} {winner.user?.lastname}
              </span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.21241 8.79947L5.99516 7.59365C5.89129 7.48978 5.76266 7.43665 5.60929 7.43428C5.45591 7.4319 5.32104 7.48884 5.20466 7.60509C5.09604 7.71384 5.04173 7.84559 5.04173 8.00034C5.04173 8.15509 5.09604 8.28684 5.20466 8.39559L6.73785 9.92878C6.87348 10.0643 7.03166 10.132 7.21241 10.132C7.39316 10.132 7.55135 10.0643 7.68698 9.92878L10.7952 6.82059C10.9067 6.70897 10.9617 6.5784 10.9602 6.4289C10.9588 6.2794 10.9038 6.14647 10.7952 6.03009C10.6788 5.91384 10.5451 5.85378 10.3941 5.8499C10.2432 5.84603 10.1096 5.90228 9.99323 6.01865L7.21241 8.79947ZM5.30723 14.8874L4.27016 13.1437L2.30854 12.7223C2.14029 12.6897 2.00591 12.6013 1.90541 12.457C1.80491 12.3128 1.76479 12.1565 1.78504 11.9883L1.97685 9.97059L0.642789 8.44453C0.527414 8.32153 0.469727 8.17347 0.469727 8.00034C0.469727 7.82722 0.527414 7.67915 0.642789 7.55615L1.97685 6.03009L1.78504 4.0124C1.76479 3.84415 1.80491 3.6879 1.90541 3.54365C2.00591 3.3994 2.14029 3.31097 2.30854 3.27834L4.27016 2.85703L5.30723 1.11328C5.3976 0.965279 5.52066 0.864341 5.67641 0.810466C5.83216 0.756591 5.99035 0.764779 6.15098 0.835029L7.99991 1.61672L9.84885 0.835029C10.0095 0.764779 10.1677 0.756591 10.3234 0.810466C10.4792 0.864341 10.6022 0.965279 10.6926 1.11328L11.7297 2.85703L13.6913 3.27834C13.8595 3.31097 13.9939 3.3994 14.0944 3.54365C14.1949 3.6879 14.235 3.84415 14.2148 4.0124L14.023 6.03009L15.357 7.55615C15.4724 7.67915 15.5301 7.82722 15.5301 8.00034C15.5301 8.17347 15.4724 8.32153 15.357 8.44453L14.023 9.97059L14.2148 11.9883C14.235 12.1565 14.1949 12.3128 14.0944 12.457C13.9939 12.6013 13.8595 12.6897 13.6913 12.7223L11.7297 13.1437L10.6926 14.8874C10.6022 15.0354 10.4792 15.1363 10.3234 15.1902C10.1677 15.2441 10.0095 15.2359 9.84885 15.1657L7.99991 14.384L6.15098 15.1657C5.99035 15.2359 5.83216 15.2441 5.67641 15.1902C5.52066 15.1363 5.3976 15.0354 5.30723 14.8874Z"
                  fill="#110044"
                />
              </svg>
            </div>
          </div>
          <div className="">
            <Badge variant="outline" className="border-pink-600">
              <span className="text-[12px] text-[#FF7385] leading-[16.8px]">WINNER</span>
            </Badge>
          </div>
        </div>
        <div className="w-full my-1 h-[238px] relative">
          <img src={winner?.images ? `${CONSTANT_DATA.BASE_URL}${winner.images}` : noimage} className="w-full h-full" />
          <Badge className="bg-raffles-blue absolute top-2 left-2">
            {formatDate(winner.cronTime)}
          </Badge>
          {/* <img
            src={winner.user?.image ? `${CONSTANT_DATA.BASE_URL}${winner.user.image}` : noimage}
            alt="tailwind logo"
            className="rounded-full w-[56px] h-[56px] absolute bottom-2 left-2 border-[2px] !object-cover"
          /> */}
        </div>
        <div className="w-full mt-3 px-4 mb-4">
          <h5 className="font-modernExtraBold font-bold text-[20px] leading-[24px] tracking-[-4%] text-raffles-blue mb-1">
            {winner.raffle_name}
          </h5>

          <p
            className="text-[14px] leading-[19.6px] font-modernExtraBold line-clamp-2">
            {winner.prize_name}
          </p>

        </div>
        <div className="absolute bottom-2 left-4">
          <span className="font-modernBold font-bold text-[14px] leading-[19.6px] text-raffles-light-blue">
            Winning Ticket No: {winner.ticketID ? `xxxx${winner.ticketID.slice(-4)}` : 'N/A'}
          </span>
        </div>

      </div></Link>
  )
}

export default WinnerCard
