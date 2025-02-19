import { Button } from "@/Components/ui/button";

import DiceFive from "@/assets/about_us/DiceFive.svg";
import ThumbsUp from "@/assets/about_us/ThumbsUp.svg";
import Scroll from "@/assets/about_us/Scroll.svg";
import Ranking from "@/assets/about_us/Ranking.svg";
import { useNavigate } from "react-router-dom";

const Draw = () => {

  const navigate = useNavigate();

  const howitworks = () => {
    navigate('/how-it-work');
  };

  return (
    <div className="w-full lg:px-24 sm:px-10 px-4 flex sm:items-start items-center justify-center flex-col gap-5 py-11 relative pb-20">
      <h1 className="sm:text-[40px] text-[28px] sm:leading-[42px] leading-[28px] text-raffles-light-blue font-modernBold text-start">
        Raffily’s Automated Draw Process
      </h1>
      <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-4">
        <div className="bg-[#F6F6F899] border border-[#EAEBED] rounded-[18px] p-6 flex flex-col items-start gap-4">
          <div className="md:size-20 size-16 md:rounded-[12px] rounded-[8px] bg-[#FF7385] flex items-center justify-center">
            <img src={DiceFive} alt="DiceFive" className="md:size-9 size-7" />
          </div>
          <h4 className="font-modernBold sm:text-[24px] text-[18px] sm:leading-[31.2px] leading-[18px]">
            Randomised Draw System
          </h4>
          <p className="font-modernRegular sm:text-[16px] text-raffles-light-blue text-[12px] sm:leading-[22.4px] leading-[16.8px] -tracking-2">
            Raffily selects winners using a random number generator (RNG). This
            system ensures that the selection process is entirely fair and
            unbiased. The RNG assigns a number to each ticket purchased, and
            during the draw, it randomly selects a winning number.
          </p>
          <Button
            variant="outline"
            className="border-raffles-light-blue bg-white font-modernBold text-raffles-blue sm:text-[16px] text-[14px] sm:leading-[16px] leading-[14px] mt-[26px] mb-[15px]"
            onClick={howitworks}
          >
            How it works
          </Button>
        </div>
        <div className="bg-[#F6F6F899] border border-[#EAEBED] rounded-[18px] p-6 flex flex-col items-start gap-4">
          <div className="md:size-20 size-16 md:rounded-[12px] rounded-[8px] bg-[#FF7385] flex items-center justify-center">
            <img src={ThumbsUp} alt="ThumbsUp" className="md:size-9 size-7" />
          </div>
          <h4 className="font-modernBold sm:text-[24px] text-[18px] sm:leading-[31.2px] leading-[18px] text-raffles-light-blue">
            Verified and Audited Process
          </h4>
          <h5 className="font-modernBold sm:text-[16px] text-[12px] sm:leading-[19.2px] leading-[14.4px] text-raffles-light-blue">
            The draw process is designed to be auditable and transparent:
          </h5>
          <ul className="text-left list-none text-white">
            <li className="mb-2 sm:text-[14px] text-[12px] sm:leading-[19.6px] leading-[16.8px] text-raffles-light-blue flex gap-1 items-center font-modernRegular">
              <span>
                <svg
                  className="sm:size-5 size-4"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_173_2122)">
                    <path
                      d="M10 1.875C8.39303 1.875 6.82214 2.35152 5.486 3.24431C4.14985 4.1371 3.10844 5.40605 2.49348 6.8907C1.87852 8.37535 1.71762 10.009 2.03112 11.5851C2.34463 13.1612 3.11846 14.6089 4.25476 15.7452C5.39106 16.8815 6.8388 17.6554 8.4149 17.9689C9.99099 18.2824 11.6247 18.1215 13.1093 17.5065C14.594 16.8916 15.8629 15.8502 16.7557 14.514C17.6485 13.1779 18.125 11.607 18.125 10C18.1227 7.84581 17.266 5.78051 15.7427 4.25727C14.2195 2.73403 12.1542 1.87727 10 1.875ZM13.5672 8.56719L9.19219 12.9422C9.13415 13.0003 9.06522 13.0464 8.98934 13.0779C8.91347 13.1093 8.83214 13.1255 8.75 13.1255C8.66787 13.1255 8.58654 13.1093 8.51067 13.0779C8.43479 13.0464 8.36586 13.0003 8.30782 12.9422L6.43282 11.0672C6.31554 10.9499 6.24966 10.7909 6.24966 10.625C6.24966 10.4591 6.31554 10.3001 6.43282 10.1828C6.55009 10.0655 6.70915 9.99965 6.875 9.99965C7.04086 9.99965 7.19992 10.0655 7.31719 10.1828L8.75 11.6164L12.6828 7.68281C12.7409 7.62474 12.8098 7.57868 12.8857 7.54725C12.9616 7.51583 13.0429 7.49965 13.125 7.49965C13.2071 7.49965 13.2884 7.51583 13.3643 7.54725C13.4402 7.57868 13.5091 7.62474 13.5672 7.68281C13.6253 7.74088 13.6713 7.80982 13.7027 7.88569C13.7342 7.96156 13.7504 8.04288 13.7504 8.125C13.7504 8.20712 13.7342 8.28844 13.7027 8.36431C13.6713 8.44018 13.6253 8.50912 13.5672 8.56719Z"
                      fill="#FF7385"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_173_2122">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </span>{" "}
              <span className="sm:text-[14px] text-[12px] sm:leading-[19.6px] leading-[16.8px] font-modernRegular -tracking-2 text-raffles-light-blue">
                Every draw is timestamped and can be reviewed to confirm that it
                followed the correct procedures.
              </span>
            </li>
            <li className="mb-2 sm:text-[14px] text-[12px] sm:leading-[19.6px] leading-[16.8px] text-raffles-light-blue flex gap-1 items-center font-modernRegular">
              <span>
                <svg
                  className="sm:size-5 size-4"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_173_2122)">
                    <path
                      d="M10 1.875C8.39303 1.875 6.82214 2.35152 5.486 3.24431C4.14985 4.1371 3.10844 5.40605 2.49348 6.8907C1.87852 8.37535 1.71762 10.009 2.03112 11.5851C2.34463 13.1612 3.11846 14.6089 4.25476 15.7452C5.39106 16.8815 6.8388 17.6554 8.4149 17.9689C9.99099 18.2824 11.6247 18.1215 13.1093 17.5065C14.594 16.8916 15.8629 15.8502 16.7557 14.514C17.6485 13.1779 18.125 11.607 18.125 10C18.1227 7.84581 17.266 5.78051 15.7427 4.25727C14.2195 2.73403 12.1542 1.87727 10 1.875ZM13.5672 8.56719L9.19219 12.9422C9.13415 13.0003 9.06522 13.0464 8.98934 13.0779C8.91347 13.1093 8.83214 13.1255 8.75 13.1255C8.66787 13.1255 8.58654 13.1093 8.51067 13.0779C8.43479 13.0464 8.36586 13.0003 8.30782 12.9422L6.43282 11.0672C6.31554 10.9499 6.24966 10.7909 6.24966 10.625C6.24966 10.4591 6.31554 10.3001 6.43282 10.1828C6.55009 10.0655 6.70915 9.99965 6.875 9.99965C7.04086 9.99965 7.19992 10.0655 7.31719 10.1828L8.75 11.6164L12.6828 7.68281C12.7409 7.62474 12.8098 7.57868 12.8857 7.54725C12.9616 7.51583 13.0429 7.49965 13.125 7.49965C13.2071 7.49965 13.2884 7.51583 13.3643 7.54725C13.4402 7.57868 13.5091 7.62474 13.5672 7.68281C13.6253 7.74088 13.6713 7.80982 13.7027 7.88569C13.7342 7.96156 13.7504 8.04288 13.7504 8.125C13.7504 8.20712 13.7342 8.28844 13.7027 8.36431C13.6713 8.44018 13.6253 8.50912 13.5672 8.56719Z"
                      fill="#FF7385"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_173_2122">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </span>{" "}
              <span className="sm:text-[14px] text-[12px] sm:leading-[19.6px] leading-[16.8px] font-modernRegular -tracking-2 text-raffles-light-blue">
                Raffily uses encryption and secure technology to protect the
                integrity of the draw, ensuring no tampering or manipulation
                occurs.
              </span>
            </li>
          </ul>
        </div>
        <div className="bg-[#F6F6F899] border border-[#EAEBED] rounded-[18px] p-6 flex flex-col items-start gap-4">
          <div className="md:size-20 size-16 md:rounded-[12px] rounded-[8px] bg-[#FF7385] flex items-center justify-center">
            <img src={Scroll} alt="Scroll" className="md:size-9 size-7" />
          </div>
          <h4 className="font-modernBold sm:text-[24px] text-[18px] sm:leading-[31.2px] leading-[18px]">
            Fair Participation Rules
          </h4>
          <h5 className="font-modernBold sm:text-[16px] text-[12px] sm:leading-[19.2px] leading-[14.4px] text-raffles-light-blue">
            Each raffle follows a clearly defined set of rules, which include:
          </h5>
          <ul className="text-left list-none text-white">
            <li className="mb-2 sm:text-[14px] text-[12px] sm:leading-[19.6px] leading-[16.8px] text-raffles-light-blue flex gap-1 items-center font-modernRegular">
              <span>
                <svg
                  className="sm:size-5 size-4"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_173_2122)">
                    <path
                      d="M10 1.875C8.39303 1.875 6.82214 2.35152 5.486 3.24431C4.14985 4.1371 3.10844 5.40605 2.49348 6.8907C1.87852 8.37535 1.71762 10.009 2.03112 11.5851C2.34463 13.1612 3.11846 14.6089 4.25476 15.7452C5.39106 16.8815 6.8388 17.6554 8.4149 17.9689C9.99099 18.2824 11.6247 18.1215 13.1093 17.5065C14.594 16.8916 15.8629 15.8502 16.7557 14.514C17.6485 13.1779 18.125 11.607 18.125 10C18.1227 7.84581 17.266 5.78051 15.7427 4.25727C14.2195 2.73403 12.1542 1.87727 10 1.875ZM13.5672 8.56719L9.19219 12.9422C9.13415 13.0003 9.06522 13.0464 8.98934 13.0779C8.91347 13.1093 8.83214 13.1255 8.75 13.1255C8.66787 13.1255 8.58654 13.1093 8.51067 13.0779C8.43479 13.0464 8.36586 13.0003 8.30782 12.9422L6.43282 11.0672C6.31554 10.9499 6.24966 10.7909 6.24966 10.625C6.24966 10.4591 6.31554 10.3001 6.43282 10.1828C6.55009 10.0655 6.70915 9.99965 6.875 9.99965C7.04086 9.99965 7.19992 10.0655 7.31719 10.1828L8.75 11.6164L12.6828 7.68281C12.7409 7.62474 12.8098 7.57868 12.8857 7.54725C12.9616 7.51583 13.0429 7.49965 13.125 7.49965C13.2071 7.49965 13.2884 7.51583 13.3643 7.54725C13.4402 7.57868 13.5091 7.62474 13.5672 7.68281C13.6253 7.74088 13.6713 7.80982 13.7027 7.88569C13.7342 7.96156 13.7504 8.04288 13.7504 8.125C13.7504 8.20712 13.7342 8.28844 13.7027 8.36431C13.6713 8.44018 13.6253 8.50912 13.5672 8.56719Z"
                      fill="#FF7385"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_173_2122">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </span>{" "}

              <span className="sm:text-[14px] text-[12px] sm:leading-[19.6px] leading-[16.8px] font-modernRegular -tracking-2 text-raffles-light-blue">
                <span className="font-modernBold">
                  Equal Opportunity:
                </span>{" "}
                All tickets, whether bought early or late,
                have an equal chance of winning.
              </span>
            </li>
            <li className="mb-2 sm:text-[14px] text-[12px] sm:leading-[19.6px] leading-[16.8px] text-raffles-light-blue flex gap-1 items-center font-modernRegular">
              <span>
                <svg
                  className="sm:size-5 size-4"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_173_2122)">
                    <path
                      d="M10 1.875C8.39303 1.875 6.82214 2.35152 5.486 3.24431C4.14985 4.1371 3.10844 5.40605 2.49348 6.8907C1.87852 8.37535 1.71762 10.009 2.03112 11.5851C2.34463 13.1612 3.11846 14.6089 4.25476 15.7452C5.39106 16.8815 6.8388 17.6554 8.4149 17.9689C9.99099 18.2824 11.6247 18.1215 13.1093 17.5065C14.594 16.8916 15.8629 15.8502 16.7557 14.514C17.6485 13.1779 18.125 11.607 18.125 10C18.1227 7.84581 17.266 5.78051 15.7427 4.25727C14.2195 2.73403 12.1542 1.87727 10 1.875ZM13.5672 8.56719L9.19219 12.9422C9.13415 13.0003 9.06522 13.0464 8.98934 13.0779C8.91347 13.1093 8.83214 13.1255 8.75 13.1255C8.66787 13.1255 8.58654 13.1093 8.51067 13.0779C8.43479 13.0464 8.36586 13.0003 8.30782 12.9422L6.43282 11.0672C6.31554 10.9499 6.24966 10.7909 6.24966 10.625C6.24966 10.4591 6.31554 10.3001 6.43282 10.1828C6.55009 10.0655 6.70915 9.99965 6.875 9.99965C7.04086 9.99965 7.19992 10.0655 7.31719 10.1828L8.75 11.6164L12.6828 7.68281C12.7409 7.62474 12.8098 7.57868 12.8857 7.54725C12.9616 7.51583 13.0429 7.49965 13.125 7.49965C13.2071 7.49965 13.2884 7.51583 13.3643 7.54725C13.4402 7.57868 13.5091 7.62474 13.5672 7.68281C13.6253 7.74088 13.6713 7.80982 13.7027 7.88569C13.7342 7.96156 13.7504 8.04288 13.7504 8.125C13.7504 8.20712 13.7342 8.28844 13.7027 8.36431C13.6713 8.44018 13.6253 8.50912 13.5672 8.56719Z"
                      fill="#FF7385"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_173_2122">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </span>{" "}
              <span className="sm:text-[14px] text-[12px] sm:leading-[19.6px] leading-[16.8px] font-modernRegular -tracking-2 text-raffles-light-blue">
                <span className="font-modernBold">
                  Ticket Limits (if applicable):
                </span>{" "}
                Some raffles may have a maximum number of tickets per
                participant to ensure fairness. closes.
              </span>
            </li>
            <li className="mb-2 sm:text-[14px] text-[12px] sm:leading-[19.6px] leading-[16.8px] text-raffles-light-blue flex gap-1 items-center font-modernRegular">
              <span>
                <svg
                  className="sm:size-5 size-4"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_173_2122)">
                    <path
                      d="M10 1.875C8.39303 1.875 6.82214 2.35152 5.486 3.24431C4.14985 4.1371 3.10844 5.40605 2.49348 6.8907C1.87852 8.37535 1.71762 10.009 2.03112 11.5851C2.34463 13.1612 3.11846 14.6089 4.25476 15.7452C5.39106 16.8815 6.8388 17.6554 8.4149 17.9689C9.99099 18.2824 11.6247 18.1215 13.1093 17.5065C14.594 16.8916 15.8629 15.8502 16.7557 14.514C17.6485 13.1779 18.125 11.607 18.125 10C18.1227 7.84581 17.266 5.78051 15.7427 4.25727C14.2195 2.73403 12.1542 1.87727 10 1.875ZM13.5672 8.56719L9.19219 12.9422C9.13415 13.0003 9.06522 13.0464 8.98934 13.0779C8.91347 13.1093 8.83214 13.1255 8.75 13.1255C8.66787 13.1255 8.58654 13.1093 8.51067 13.0779C8.43479 13.0464 8.36586 13.0003 8.30782 12.9422L6.43282 11.0672C6.31554 10.9499 6.24966 10.7909 6.24966 10.625C6.24966 10.4591 6.31554 10.3001 6.43282 10.1828C6.55009 10.0655 6.70915 9.99965 6.875 9.99965C7.04086 9.99965 7.19992 10.0655 7.31719 10.1828L8.75 11.6164L12.6828 7.68281C12.7409 7.62474 12.8098 7.57868 12.8857 7.54725C12.9616 7.51583 13.0429 7.49965 13.125 7.49965C13.2071 7.49965 13.2884 7.51583 13.3643 7.54725C13.4402 7.57868 13.5091 7.62474 13.5672 7.68281C13.6253 7.74088 13.6713 7.80982 13.7027 7.88569C13.7342 7.96156 13.7504 8.04288 13.7504 8.125C13.7504 8.20712 13.7342 8.28844 13.7027 8.36431C13.6713 8.44018 13.6253 8.50912 13.5672 8.56719Z"
                      fill="#FF7385"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_173_2122">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </span>{" "}
              <span className="sm:text-[14px] text-[12px] sm:leading-[19.6px] leading-[16.8px] font-modernRegular -tracking-2 text-raffles-light-blue">
                <span className="font-modernBold">Clear Draw Dates:</span>{" "}
                Raffily sets specific draw dates for each raffle, and winners
                are selected immediately after the draw closes.
              </span>
            </li>
          </ul>
        </div>
        <div className="bg-[#F6F6F899] border border-[#EAEBED] rounded-[18px] p-6 flex flex-col items-start gap-4">
          <div className="md:size-20 size-16 md:rounded-[12px] rounded-[8px] bg-[#FF7385] flex items-center justify-center">
            <img src={Ranking} alt="Ranking" className="md:size-9 size-7" />
          </div>
          <h4 className="font-modernBold sm:text-[24px] text-[18px] sm:leading-[31.2px] leading-[18px]">
            Winner Announcement and Notification
          </h4>
          <h5 className="font-modernBold sm:text-[16px] text-[12px] sm:leading-[19.2px] leading-[14.4px] text-raffles-light-blue">
            Each raffle follows a clearly defined set of rules, which include:
          </h5>
          <ul className="text-left list-none text-white">
            <li className="mb-2 sm:text-[14px] text-[12px] sm:leading-[19.6px] leading-[16.8px] text-raffles-light-blue flex gap-1 items-center font-modernRegular">
              <span>
                <svg
                  className="sm:size-5 size-4"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_173_2122)">
                    <path
                      d="M10 1.875C8.39303 1.875 6.82214 2.35152 5.486 3.24431C4.14985 4.1371 3.10844 5.40605 2.49348 6.8907C1.87852 8.37535 1.71762 10.009 2.03112 11.5851C2.34463 13.1612 3.11846 14.6089 4.25476 15.7452C5.39106 16.8815 6.8388 17.6554 8.4149 17.9689C9.99099 18.2824 11.6247 18.1215 13.1093 17.5065C14.594 16.8916 15.8629 15.8502 16.7557 14.514C17.6485 13.1779 18.125 11.607 18.125 10C18.1227 7.84581 17.266 5.78051 15.7427 4.25727C14.2195 2.73403 12.1542 1.87727 10 1.875ZM13.5672 8.56719L9.19219 12.9422C9.13415 13.0003 9.06522 13.0464 8.98934 13.0779C8.91347 13.1093 8.83214 13.1255 8.75 13.1255C8.66787 13.1255 8.58654 13.1093 8.51067 13.0779C8.43479 13.0464 8.36586 13.0003 8.30782 12.9422L6.43282 11.0672C6.31554 10.9499 6.24966 10.7909 6.24966 10.625C6.24966 10.4591 6.31554 10.3001 6.43282 10.1828C6.55009 10.0655 6.70915 9.99965 6.875 9.99965C7.04086 9.99965 7.19992 10.0655 7.31719 10.1828L8.75 11.6164L12.6828 7.68281C12.7409 7.62474 12.8098 7.57868 12.8857 7.54725C12.9616 7.51583 13.0429 7.49965 13.125 7.49965C13.2071 7.49965 13.2884 7.51583 13.3643 7.54725C13.4402 7.57868 13.5091 7.62474 13.5672 7.68281C13.6253 7.74088 13.6713 7.80982 13.7027 7.88569C13.7342 7.96156 13.7504 8.04288 13.7504 8.125C13.7504 8.20712 13.7342 8.28844 13.7027 8.36431C13.6713 8.44018 13.6253 8.50912 13.5672 8.56719Z"
                      fill="#FF7385"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_173_2122">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </span>{" "}
              <span className="sm:text-[14px] text-[12px] sm:leading-[19.6px] leading-[16.8px] font-modernRegular -tracking-2 text-raffles-light-blue">
                Immediately notified via email or text message with details of the prize and how to claim it.
              </span>
            </li>
            <li className="mb-2 sm:text-[14px] text-[12px] sm:leading-[19.6px] leading-[16.8px] text-raffles-light-blue flex gap-1 items-center font-modernRegular">
              <span>
                <svg
                  className="sm:size-5 size-4"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_173_2122)">
                    <path
                      d="M10 1.875C8.39303 1.875 6.82214 2.35152 5.486 3.24431C4.14985 4.1371 3.10844 5.40605 2.49348 6.8907C1.87852 8.37535 1.71762 10.009 2.03112 11.5851C2.34463 13.1612 3.11846 14.6089 4.25476 15.7452C5.39106 16.8815 6.8388 17.6554 8.4149 17.9689C9.99099 18.2824 11.6247 18.1215 13.1093 17.5065C14.594 16.8916 15.8629 15.8502 16.7557 14.514C17.6485 13.1779 18.125 11.607 18.125 10C18.1227 7.84581 17.266 5.78051 15.7427 4.25727C14.2195 2.73403 12.1542 1.87727 10 1.875ZM13.5672 8.56719L9.19219 12.9422C9.13415 13.0003 9.06522 13.0464 8.98934 13.0779C8.91347 13.1093 8.83214 13.1255 8.75 13.1255C8.66787 13.1255 8.58654 13.1093 8.51067 13.0779C8.43479 13.0464 8.36586 13.0003 8.30782 12.9422L6.43282 11.0672C6.31554 10.9499 6.24966 10.7909 6.24966 10.625C6.24966 10.4591 6.31554 10.3001 6.43282 10.1828C6.55009 10.0655 6.70915 9.99965 6.875 9.99965C7.04086 9.99965 7.19992 10.0655 7.31719 10.1828L8.75 11.6164L12.6828 7.68281C12.7409 7.62474 12.8098 7.57868 12.8857 7.54725C12.9616 7.51583 13.0429 7.49965 13.125 7.49965C13.2071 7.49965 13.2884 7.51583 13.3643 7.54725C13.4402 7.57868 13.5091 7.62474 13.5672 7.68281C13.6253 7.74088 13.6713 7.80982 13.7027 7.88569C13.7342 7.96156 13.7504 8.04288 13.7504 8.125C13.7504 8.20712 13.7342 8.28844 13.7027 8.36431C13.6713 8.44018 13.6253 8.50912 13.5672 8.56719Z"
                      fill="#FF7385"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_173_2122">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </span>{" "}
              <span className="sm:text-[14px] text-[12px] sm:leading-[19.6px] leading-[16.8px] font-modernRegular -tracking-2 text-raffles-light-blue">
                Announced on the Raffily platform, along with the winning raffle number (while protecting the winner’s privacy).
              </span>
            </li>
          </ul>
          <p className="font-modernRegular sm:text-[16px] text-raffles-light-blue text-[12px] sm:leading-[22.4px] leading-[16.8px]">
            This process guarantees fairness, transparency, and security, providing confidence that each draw is conducted without bias.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Draw;
