import axieLogo from '../assets/CryptoLogo/axieLogo.svg'
import bitcoinLogo from '../assets/CryptoLogo/bitcoinLogo.svg'
import bnbLogo from '../assets/CryptoLogo/bnbLogo.svg'
import cardanoLogo from '../assets/CryptoLogo/cardanoLogo.svg'
import dogeLogo from '../assets/CryptoLogo/dogeLogo.svg'
import etheriumLogo from '../assets/CryptoLogo/etheriumLogo.svg'
import shibaLogo from '../assets/CryptoLogo/shibaLogo.svg'
import solanaLogo from '../assets/CryptoLogo/solanaLogo.svg'
import tetherLogo from '../assets/CryptoLogo/tetherLogo.svg'
import trxLogo from '../assets/CryptoLogo/trxLogo.svg'
import usdcLogo from '../assets/CryptoLogo/usdcLogo.svg'
import xrpLogo from '../assets/CryptoLogo/xrpLogo.svg'
import CryptoLabel from '../Components/cryptoLabelBox'
import { motion } from "motion/react"

function scrollingIcons(){
   const cryptoData = [
   {logo: bitcoinLogo, iconText: "Bitcoin"},
   {logo: etheriumLogo, iconText: "Ethereum"},
   {logo: bnbLogo, iconText: "BNB"},
   {logo: cardanoLogo, iconText: "Cardano"},
   {logo: dogeLogo, iconText: "Dogecoin"},
   {logo: shibaLogo, iconText: "Shiba Inu"},
   {logo: solanaLogo, iconText: "Solana"},
   {logo: tetherLogo, iconText: "Tether"},
   {logo: trxLogo, iconText: "TRON"},
   {logo: usdcLogo, iconText: "USDC"},
   {logo: xrpLogo, iconText: "XRP"},
   {logo: axieLogo, iconText: "Axie Infinity"}
]
    return(
        <>
          <motion.div 
          className="flex flex-row w-screen h-full  space-x-4"
          animate={{
            x:['0%', '-100%']
          }}
          transition={
            {
                repeat:Infinity,
                repeatType:'loop',
                duration:'25',
                ease:'linear'
            }
          }
          >
             {cryptoData.map((data) => (
          <div  className={`flex min-w-55 min-h-5  my-5 mx-2 justify-center items-center font-poppins`}>
            <div className="  w-full h-13 flex p-4 justify-center items-center gap-2 rounded-xl ">
              <img className='w-5' src={data.logo} alt="logo.png" />
              <p className="text-sm text-[#737373]">{data.iconText}</p>
            </div>

        </div>
             ))}
          </motion.div>


           <motion.div 
          className="flex flex-row w-screen h-full  space-x-4"
          animate={{
            x:['-100%', '20%']
          }}
          transition={
            {
                repeat:Infinity,
                repeatType:'loop',
                duration:'25',
                ease:'linear'
            }
          }
          >
             {cryptoData.map((data) => (
          <div  className={`flex min-w-55 min-h-5 my-5 mx-2 justify-center items-center font-poppins`}>
            <div className="  w-full h-13 flex p-4 justify-center items-center gap-2 rounded-xl ">
              <img className='w-5' src={data.logo} alt="logo.png" />
              <p className="text-sm text-[#737373]">{data.iconText}</p>
            </div>

        </div>
             ))}
          </motion.div>
        </>
    )
}
export default scrollingIcons