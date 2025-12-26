import CryptoLabel from '../../Components/cryptoLabelBox'
import privacy from '../../assets/Wallet.svg'
import axieLogo from '../../assets/CryptoLogo/axieLogo.svg'
import bitcoinLogo from '../../assets/CryptoLogo/bitcoinLogo.svg'
import bnbLogo from '../../assets/CryptoLogo/bnbLogo.svg'
import cardanoLogo from '../../assets/CryptoLogo/cardanoLogo.svg'
import dogeLogo from '../../assets/CryptoLogo/dogeLogo.svg'
import etheriumLogo from '../../assets/CryptoLogo/etheriumLogo.svg'
import shibaLogo from '../../assets/CryptoLogo/shibaLogo.svg'
import solanaLogo from '../../assets/CryptoLogo/solanaLogo.svg'
import tetherLogo from '../../assets/CryptoLogo/tetherLogo.svg'
import trxLogo from '../../assets/CryptoLogo/trxLogo.svg'
import usdcLogo from '../../assets/CryptoLogo/usdcLogo.svg'
import xrpLogo from '../../assets/CryptoLogo/xrpLogo.svg'
import ScrollingIcons from '../../Components/scrollingIcons'



function Features2(){
const cryptoData = [
   {logo: bitcoinLogo, iconText: "Bitcoin"},
   {logo: etheriumLogo, iconText: "Ethereum"},
   {logo: bnbLogo, iconText: "BNB"},
   {logo: cardanoLogo, iconText: "Cardano"},
   {logo: dogeLogo, iconText: "Dogecoin"},
   {logo: shibaLogo, iconText: "Shiba Inu"},
   {logo: solanaLogo, iconText: "Solana"},
   {logo: tetherLogo, iconText: "Tether"},
]
const rowDesign = [
   cryptoData.slice(0,3),
   cryptoData.slice(3,5),
   cryptoData.slice(5,8)

]
   return(
   <>
   <div data-aos={"fade-right"} className="h-auto w-full font-poppins tracking-widest text-lg font-bold mt-75 md:mt-0 md: ">
      <div  className="grid grid-cols-1 md:grid-cols-2">
         <div className="w-auto h-auto  flex flex-col items-center justify-center px-7  md:pl-25 md:items-start">
            <h1 className="text-primary-dark text-xl font-black tracking-[0.25em] md:text-5xl">Multichain Integration</h1>
            <h2 className="font-bold text-sm mt-5 tracking-[0.070em] text-branding">Track Every Asset, Across Every Chain.</h2>
            <p  className="text-center mt-5 font-normal text-sm leading-8 md:leading-10 text-[#737373] px-9 md:text-start md:px-0">Effortlessly track your wallet balances, NFT collections, and DeFi positions across 120+ blockchains in one centralized dashboard.</p>
         </div>
         
         {/* DESKTOP SIZE OR LARGER SCREENS VIEW */}
         <div data-aos={"fade-right"} className="grid  grid-cols-2 mt-15 md:grid-rows-3 md:grid-cols-1 h-3/4 ">
           {rowDesign.map((row, rowIndex) => (
            <div
             key={rowIndex}
             className={`md:grid hidden gap-4 ${row.length === 2 ? 'grid-cols-2 px-25' : 'grid-cols-3 px-15'} `}
            >
              {row.map((data, index) => (
                <CryptoLabel  key={index} logo={data.logo} text={data.iconText} />
               ))}
            </div>
           ))}
   
          {/* Mobile view */}
           <div data-aos={"fade-right"} className='grid grid-cols-2 px-6 h-auto w-screen md:hidden'>
              {cryptoData.map((data) => (
                   <CryptoLabel logo={data.logo} text={data.iconText}  />
              )
               
              )}
           </div>

           
         </div>
      </div>
   </div>

   <ScrollingIcons></ScrollingIcons>
    
   </>
)
}
export default Features2