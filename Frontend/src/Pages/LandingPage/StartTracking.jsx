import { BsArrowRightCircle } from "react-icons/bs";

function StartTracking(){
   return(
    <>
      <div className="flex flex-col px-12 items-center font-poppins gap-8 font-bold tracking-widest min-h-screen w-full mt-35 ">
         <h1 className="text-xl text-primary-text md:text-3xl dark:text-primary"><span className="text-branding">Your Portfolio,</span> Levelled Up.</h1>
         <p className="text-primary-text text-center text-sm leading-7 font-normal md:px-35 dark:text-[#D9D9D9]">Most traders lose money because they lack a clear view of their data. Don't be one of them. Create your free CryptView account to access the tools used by the top 1% of the market.</p>

         <div className="border-2 text-branding gap-4 rounded-xl border-branding p-2.5 w-full flex flex-row items-center justify-center hover:bg-branding hover:text-primary duration-250 ease-in-out cursor-pointer md:max-w-80">
            <p className="font-light">Start Tracking</p>
            <BsArrowRightCircle className="block justify-self-end" />
         </div>
      </div>
    </>
   )
}
export default StartTracking