import React from "react"

const SeeAction = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center mt-20 lg:px-24 sm:px-10 px-4">
      <h1 className="font-modernBold md:text-[40px] text-[28px] md:leading-[42px] leading-[29.4px] text-raffles-light-blue md:mb-6 mb-5">
        See it{" "}
        <span className="bg-gradient-to-b from-[#FF7385] via-[#FD98E8] to-[#AD6FFF] bg-clip-text text-transparent">
          in action
        </span>
      </h1>
      <div className="max-w-[867px] w-full border-[1px] border-[#EAEBED] md:rounded-2xl rounded-[10px]">
        <div className="bg-[#FF7385] md:rounded-t-[16px] rounded-t-[10px] sm:p-8 p-4 w-full">
          <h4 className="sm:text-[24px] text-[20px] sm:leading-[31.2px] leading-[26px] text-white font-modernBold">
            Follow these steps
          </h4>
        </div>
        <div className="sm:p-8 p-4 flex flex-col items-start gap-6">
          <p className="sm:text-[16px] text-[12px] sm:leading-[22.4px] leading-[16.8px] font-modernRegular text-black -tracking-2">
            If we set the range from 1 to 100 and the seed as 1234560987123, it
            will give us a random number like 55.
          </p>
          <div className="flex items-center gap-2">
            <div className="sm:size-[31px] size-[24px] rounded-full flex items-center justify-center border-[1px] border-[#FF7385]">
              <p className="text-[#FF7385] sm:text-[16px] text-[12px] sm:leading-[22.4px] leading-[16.8px] font-modernRegular">
                1
              </p>
            </div>
            <p className="sm:text-[16px] text-[12px] sm:leading-[22.4px] leading-[16.8px] font-modernRegular">
              Go to this website:{" "}
              <span className="text-[#FF7385] font-modernRegular" >
                https://onlinephp.io/
              </span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="sm:size-[31px] size-[24px] rounded-full flex items-center justify-center border-[1px] border-[#FF7385]">
              <p className="text-[#FF7385] sm:text-[16px] text-[12px] sm:leading-[22.4px] leading-[16.8px] font-modernRegular">
                2
              </p>
            </div>
            <p className="sm:text-[16px] text-[12px] sm:leading-[22.4px] leading-[16.8px] font-modernRegular">
              Clear the first text box
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="sm:size-[31px] size-[24px] rounded-full flex items-center justify-center border-[1px] border-[#FF7385]">
              <p className="text-[#FF7385] sm:text-[16px] text-[12px] sm:leading-[22.4px] leading-[16.8px] font-modernRegular">
                3
              </p>
            </div>
            <div className="flex flex-col">
              <p className="sm:text-[16px] text-[12px] sm:leading-[22.4px] leading-[16.8px] font-modernRegular">
                Paste this code on the first line:
              </p>
              <p className="sm:text-[14px] text-[10px] sm:leading-[19.6px] leading-[14px] font-modernRegular opacity-[60%]" >
                &lt;?php mt_srand(1234560987123); echo mt_rand(1, 100); ?&gt;
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="sm:size-[31px] size-[24px] rounded-full flex items-center justify-center border-[1px] border-[#FF7385]">
              <p className="text-[#FF7385] sm:text-[16px] text-[12px] sm:leading-[22.4px] leading-[16.8px] font-modernRegular">
                4
              </p>
            </div>
            <p className="sm:text-[16px] text-[12px] sm:leading-[22.4px] leading-[16.8px] font-modernRegular">
              Click on “Execute Code”
            </p>
          </div>
          <div className="flex items-center justify-center p-4 bg-[#FF73851A] rounded-[5px] w-full">
            <p className="text-[#FF7385] sm:text-[16px] text-[12px] sm:leading-[22.4px] leading-[16.8px] font-modernRegular">
              You'll get "55" as the result. Changing the seed or the range will
              give you different numbers
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SeeAction
