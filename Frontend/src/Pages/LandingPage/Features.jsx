import analysisIcon from '../../assets/LiveMarket.svg'
function Features(){
  
    return(
        <>
          <div className="grid grid-cols-1 grid-rows-3 font-poppins mt-75 px-6 gap-35 text-primary-text dark:text-[#F5F5F5] md:grid-cols-3 md:grid-row-1" >
             <div className="flex flex-col  justify-center items-center px-13">
                <div className='flex flex-row justify-center items-center gap-2'>
                    <img src={analysisIcon} alt="analysis.svg" className='size-7' />
                    <h3 className='font-semibold  tracking-[0.150em]'>Live Market Intelligence</h3>
                </div>
                <p className='text-justify mt-8 leading-[2.7em]'>Access real-time price data for over 19,000+ cryptocurrencies with comprehensive market indicators to stay ahead of volatility.</p>
             </div>


              <div className="flex flex-col  justify-center items-center px-13 ">
                <div className='flex flex-row justify-center items-center gap-2'>
                    <img src={analysisIcon} alt="analysis.svg" className='size-7' />
                    <h3 className='font-semibold  tracking-[0.150em]'>Live Market Intelligence</h3>
                </div>
                <p className='text-justify mt-8 leading-[2.7em]'>Access real-time price data for over 19,000+ cryptocurrencies with comprehensive market indicators to stay ahead of volatility.</p>
             </div>


            <div className="flex flex-col  justify-center items-center px-13 ">
                <div className='flex flex-row justify-center items-center gap-2'>
                    <img src={analysisIcon} alt="analysis.svg" className='size-7' />
                    <h3 className='font-semibold text-primary-text tracking-[0.150em]'>Live Market Intelligence</h3>
                </div>
                <p className='text-justify mt-8 leading-[2.7em]'>Access real-time price data for over 19,000+ cryptocurrencies with comprehensive market indicators to stay ahead of volatility.</p>
             </div>

             <div></div>
          </div>
        </>
    )
}
export default Features