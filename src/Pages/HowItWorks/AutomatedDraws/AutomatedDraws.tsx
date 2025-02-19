import Timer from "@/assets/HowItWorks/Timer.svg";

const AutomatedDraws = () => {
  return (
    <div className="w-full bg-raffles-blue mt-20 lg:px-24 sm:px-10 px-4 flex sm:items-start items-center justify-center flex-col gap-5 py-11 relative">
      <div className="absolute top-1/2 left-1 transform -translate-x-1 -translate-y-1/2 bg-gradient-to-r from-[#AD6FFF] via-[#FD98E8] to-[#FF7385] z-0 blur-[150px] md:w-50 md:h-50 w-[25px] h-[25px] rounded-full"></div>
      <div className="absolute top-1 right-1 transform -translate-x-1 translate-y-1 bg-gradient-to-r from-[#AD6FFF] via-[#FD98E8] to-[#FF7385] z-0 blur-[150px] md:w-50 md:h-50 w-[229px] h-[229px] rounded-full"></div>
      <h4 className="sm:text-[40px] text-[28px] sm:leading-[40px] leading-[28px] text-white font-modernBold sm:text-start text-center -tracking-2">
        Our automated draws
      </h4>
      <hr className="h-px my-2 bg-[rgba(255, 255, 255, 1] opacity-[20%] w-full"></hr>
      <div className="flex lg:flex-row flex-col items-start flex-wrap justify-between text-white w-full lg:gap-0 gap-8">
        <div className="flex sm:flex-row flex-col sm:items-start items-center sm:justify-between justify-center gap-16 lg:w-1/2 w-full lg:pr-8 pr-0">
          <div className="flex flex-col sm:items-start items-center w-full">
            <div className="inset-0 bg-gradient-to-r from-[#AD6FFF] via-[#FD98E8] to-[#FF7385] rounded-full p-[2.5px] w-20 h-20 mb-4">
              {/* Inner content */}
              <div className="bg-[#280E51] w-full h-full rounded-full flex items-center justify-center">
                <img src={Timer} alt="Timer" className="sm:size-9 size-7" />
              </div>
            </div>
            <h5 className="sm:text-[20px] sm:leading-[24px] text-[18px] leading-[21.6px] sm:text-start text-center font-modernBold mb-4">
              The seed
            </h5>
            <p className="text-[12px] leading-[16.8px] sm:text-[14px] sm:leading-[19.6px] font-[500] sm:text-start text-center max-w-[284px] -tracking-2">
              This is calculated from the current time, which is a way of making
              it unpredictable as it’s triggered by random within a range of
              time.
            </p>
          </div>
          <div className="flex flex-col sm:items-start items-center w-full">
            <div className="inset-0 bg-gradient-to-r from-[#AD6FFF] via-[#FD98E8] to-[#FF7385] rounded-full p-[2.5px] w-20 h-20 mb-4">
              {/* Inner content */}
              <div className="bg-[#280E51] w-full h-full rounded-full flex items-center justify-center">
                <img src={Timer} alt="Timer" className="sm:size-9 size-7" />
              </div>
            </div>
            <h5 className="sm:text-[20px] sm:leading-[24px] text-[18px] leading-[21.6px] sm:text-start text-center font-modernBold mb-4">
              The range
            </h5>
            <p className="text-[12px] leading-[16.8px] sm:text-[14px] sm:leading-[19.6px] font-[500] sm:text-start text-center max-w-[284px] -tracking-2">
              This depends on the number of tickets, for example, 1 to 9999.
            </p>
          </div>
        </div>
        <div className="flex items-end justify-center lg:w-1/2 w-full lg:pl-14 pl-0">
          <div className="p-8 w-full border-[1px] border-[#FFFFFF33] rounded-[16px] flex flex-col text-white items-start justify-start bg-[#280E51]">
            <h4 className="sm:text-[24px] text-[20px] sm:leading-[31.2px] leading-[26px] text-white font-modernBold mb-4">
              At the time of the draw:
            </h4>
            <ul className="text-left list-none text-white">
              <li className="mb-2 sm:text-[14px] text-[12px] sm:leading-[19.6px] leading-[16.8px] flex gap-1 items-center -tracking-2">
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
                <span className="font-modernRegular">
                  All ticket numbers are sorted by when they were issued
                </span>
              </li>
              <li className="mb-2 sm:text-[14px] text-[12px] sm:leading-[19.6px] leading-[16.8px] flex gap-1 items-center -tracking-2">
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
                <span className="font-modernRegular">
                  The list of sorted ticket numbers is available on our [past
                  draws] page
                </span>
              </li>
              <li className="mb-2 sm:text-[14px] text-[12px] sm:leading-[19.6px] leading-[16.8px] flex gap-1 items-center -tracking-2">
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
                <span className="font-modernRegular">
                  The output from Mersenne Twister (like "5921" in our example)
                  corresponds to a specific line in the list.
                </span>
              </li>
              <li className="mb-2 sm:text-[14px] text-[12px] sm:leading-[19.6px] leading-[16.8px] flex gap-1 items-center -tracking-2">
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
                <span className="font-modernRegular">
                  The winning ticket number is found on that line
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutomatedDraws;