import Summarybox from '../../Components/summaryBox'
function Summary(){
   return(
    <>
       <div data-aos={"fade-right"} className="flex flex-col w-screen h-full px-10 py-15 text-center mt-65 justify-center items-center ">
          <div >
             <h1 className="text-primary-dark dark:text-primary mb-6 font-poppins text-xl font-extrabold tracking-widest ">Today’s Crypto Prices by Crypt <span className="text-branding">View</span></h1>
             <p className="leading-8 dark:text-[#D9D9D9] text-primary-text tracking-wider md:px-50 md:mt-8">Stay ahead with a high-precision pulse on the digital economy. CryptView tracks 24-hour volume, Bitcoin dominance, and aggregate liquidity in real time, giving you an instant snapshot of capital shifts across thousands of protocols.</p>
          </div>

          <div className='flex flex-col w-full h-full gap-12  px-6 mt-16 md:flex-row md:px-28'>
            <Summarybox></Summarybox>
            <Summarybox></Summarybox>
            <Summarybox></Summarybox>
          </div>
       </div>
    </>
   )
}
export default Summary