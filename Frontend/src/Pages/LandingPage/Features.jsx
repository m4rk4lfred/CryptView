import analysisIcon from '../../assets/LiveMarket.svg'
import walletIcon from '../../assets/Wallet.svg'
import privacyIcon from '../../assets/Privacy.svg'
function Features(){
  
    return(
        <>
          <div className="grid h-screen w-screen grid-cols-1 grid-rows-3 font-poppins mt-55 px-6 gap-35 md:gap-2 md:px-15 text-primary-text dark:text-[#F5F5F5] md:grid-cols-3 md:grid-row-1" >
             <div data-aos={"zoom-in-up"} className="flex flex-col  justify-center items-center px-13 ">
                <div className='flex flex-row justify-center items-center gap-2'>
                    <img src={analysisIcon} alt="analysis.svg" className='size-7' />
                    <h3 className='font-semibold  tracking-[0.150em]'>Live Market Intelligence</h3>
                </div>
                <p className='text-justify mt-8 leading-[2.7em]'>Access real-time price data for over 19,000+ cryptocurrencies with comprehensive market indicators to stay ahead of volatility.</p>
             </div>


              <div data-aos={"zoom-in-up"} className="flex flex-col  justify-center items-center px-13 ">
                <div className='flex flex-row justify-center items-center gap-2'>
                    <img src={walletIcon} alt="analysis.svg" className='size-7' />
                    <h3 className='font-semibold  tracking-[0.150em]'>Unified Wallet Syncing</h3>
                </div>
                <p className='text-justify mt-8 leading-[2.7em]'>Effortlessly track your wallet balances, NFT collections, and DeFi positions across 120+ blockchains in one centralized dashboard.</p>
             </div>


            <div data-aos={"zoom-in-up"} className="flex flex-col  justify-center items-center px-13 ">
                <div className='flex flex-row justify-center items-center gap-2'>
                    <img src={privacyIcon} alt="analysis.svg" className='size-7' />
                    <h3 className='font-semibold text-primary-text tracking-[0.150em]'>Privacy-First Security</h3>
                </div>
                <p className='text-justify mt-8 leading-[2.7em]'>Your data remains secure with read-only access. There is no need to share private keys or passwords—just provide your public address to start.</p>
             </div>

             <div></div>
          </div>
        </>
    )
}
export default Features