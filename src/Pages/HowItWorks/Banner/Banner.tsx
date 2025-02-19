import BannerImage from "@/assets/HowItWorks/banner.png"
const Banner = () => {
  return (
    <>
      <div className="sm:mt-12 mt-8 flex flex-col items-center justify-center mb-8">
        <h1 className="font-modernBold md:text-[64px] text-[32px] md:leading-[67.2px] leading-[33.6px] text-raffles-light-blue md:mb-6 mb-5 -tracking-2">
          How it{" "}
          <span className="bg-gradient-to-b from-[#FF7385] via-[#FD98E8] to-[#AD6FFF] bg-clip-text text-transparent">
            works
          </span>
        </h1>
        <p className="max-w-[800px] text-[#170449] font-modernRegular text-center md:text-[16px] text-[12px] md:leading-[22.4px] leading-[16.8px] px-2 -tracking-2">
        Raffily’s automated draw process is designed for complete fairness, using secure, random selection algorithms to ensure each entrant has an equal chance of winning. Rigorous testing, compliance with industry standards, and transparent oversight make the process both reliable and trustworthy for businesses and entrants alike. Here's how they work
        </p>
      </div>
      <div className="w-full md:px-12 px-2">
        <div className="w-full sm:h-[424px] h-[287px]">
          <img
            src={BannerImage}
            alt="banner"
            className="w-full h-full rounded-2xl !object-cover"
          />
        </div>
        <div className="flex md:flex-row flex-col items-center justify-around md:-my-7 my-7 flex-wrap">
          <div className="flex flex-col items-center text-center justify-center md:mb-0 mb-8">
            <div className="sm:size-14 size-12 bg-[#FF7385] rounded-full flex items-center justify-center md:border-[6px] border-0 border-white mb-3">
              <span className="font-modernBold sm:text-[22px] text-[18px] sm:leading-[22px] leading-[18px] text-center text-white" >
                01
              </span>
            </div>
            <h5 className="font-modernBold sm:text-[20px] text-[16px] sm:leading-[24px] leading-[19.2px] text-center text-raffles-light-blue mb-3">
              Automated Draws
            </h5>
            <p className="sm:text-[14px] text-[12px] sm:leading-[19.6px] leading-[16.8px] text-center text-[#170449] font-modernRegular opacity-[60%] max-w-[330px] h-[72px]">
            Depending on the day's schedule, Automated Draws might happen sooner or later, usually within a range of a few minutes.
            </p>
          </div>
          <div className="flex flex-col items-center text-center justify-center md:mb-0 mb-8">
            <div className="sm:size-14 size-12 bg-[#FF7385] rounded-full flex items-center justify-center md:border-[6px] border-0 border-white mb-3">
              <span className="font-modernBold sm:text-[22px] text-[18px] sm:leading-[22px] leading-[18px] text-center text-white">
                02
              </span>
            </div>
            <h5 className="font-modernBold sm:text-[20px] text-[16px] sm:leading-[24px] leading-[19.2px] text-center text-raffles-light-blue mb-3">
              Mersenne Twister Algorithm
            </h5>
            <p className="sm:text-[14px] text-[12px] sm:leading-[19.6px] leading-[16.8px] text-center text-[#170449] font-modernRegular opacity-[60%] max-w-[330px] h-[72px]">
              Raffily applies the Mersenne Twister algorithm to select a random
              number. This method is similar to picking a number from a hat.
            </p>
          </div>
          <div className="flex flex-col items-center text-center justify-center md:mb-0 mb-8">
            <div className="sm:size-14 size-12 bg-[#FF7385] rounded-full flex items-center justify-center md:border-[6px] border-0 border-white mb-3">
              <span className="font-modernBold sm:text-[22px] text-[18px] sm:leading-[22px] leading-[18px] text-center text-white">
                03
              </span>
            </div>
            <h5 className="font-modernBold sm:text-[20px] text-[16px] sm:leading-[24px] leading-[19.2px] text-center text-raffles-light-blue mb-3">
              3 Inputs are applied
            </h5>
            <ul className="text-left list-none ml-4 text-raffles-blue h-[72px]">
              <li className="sm:text-[14px] text-[12px] sm:leading-[30.8pxpx] leading-[26.4px] flex gap-1 items-center">
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
                <span className="opacity-[60%]">
                  The smallest possible number
                </span>
              </li>
              <li className="sm:text-[14px] text-[12px] sm:leading-[30.8pxpx] leading-[26.4px] flex gap-1 items-center">
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
                <span className="opacity-[60%]">
                  he largest possible number
                </span>
              </li>
              <li className="sm:text-[14px] text-[12px] sm:leading-[30.8pxpx] leading-[26.4px] flex gap-1 items-center">
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
                <span className="opacity-[60%]">
                  a starting value called the "seed"
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default Banner
