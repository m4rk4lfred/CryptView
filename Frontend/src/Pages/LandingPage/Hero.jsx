import { HiOutlineArrowRightCircle } from "react-icons/hi2";
function Hero(){
   return(
    <>
       <div data-aos={"fade"} className="flex flex-col justify-start items-center font-poppins w-screen min-h-135.75 px-16 mt-18 gap-6 md:px-[15em] md:my-25 lg:px-[22em] ">
          <p className="text-[#737373] tracking-[0.2em] text-center font-bold dark:text-[#F8F8F8]">The Best Tracker for Crypto Investors</p>
          <h2 className="text-primary-dark text-center font-extrabold text-3xl  leading-12 dark:text-[#F8F8F8]"><span className="text-branding">Master Your Portfolio</span>. Maximize Your Gains</h2>
          <p className="text-[#737373] tracking-[0.2em] text-center font-normal dark:text-[#F8F8F8]">The Best Tracker for Crypto Investors</p>

          <div className="font-poppins text-branding flex flex-row w-full justify-center gap-5 items-center  border border-1 py-2.5 rounded-lg max-w-120 mt-8 cursor-pointer hover:bg-branding hover:text-primary duration-550 dark:hover:text-primary-dark">
            <p>Start Tracking</p>
            <HiOutlineArrowRightCircle className="size-7" />
          </div>
       </div>
    </>
   )
}
export default Hero