import brandLogoDark from '../../assets/Brand_logo_Dark.svg'
import brandLogoLight from '../../assets/Brand_logo_Light.svg'
import { IoMenu } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";
import {useState} from 'react'
import {motion , AnimatePresence, easeIn, easeInOut} from 'motion/react'
function mainHeader({theme}){
  const [isVisible,setNavigationVisibility] = useState(false)
  return(
    <>
       <div className={`flex  justify-between w-screen h-auto px-10 pt-8 md:px-[8em] ${theme === 'dark' ? 'dark' : ''}`}>
           <div className="flex gap-1 w-full justify-start items-start  ">
             <img src={theme === 'dark'? brandLogoLight:brandLogoDark} alt="brandLogo" />
             <h1 className='font-bold text-lg text-primary-dark dark:text-primary'>CRYPT<span className='text-branding'>VIEW</span></h1>
           </div>
           

           <div className='flex justify-end items-center w-full md:hidden '>
              <IoMenu onClick={()=>setNavigationVisibility(true)} className='text-primary-dark cursor-pointer dark:text-primary size-8'/>
           </div>
           
           <div className='hidden md:flex   flex-row w-full justify-end items-center '>
             <ul className='w-full  h-auto flex flex-row justify-end items-center gap-9'>
               <li className='cursor-pointer   text-primary-dark dark:text-primary'>Accounts</li>
               <li className='cursor-pointer   text-primary-dark dark:text-primary'>Market</li>
               <li className='cursor-pointer   text-primary-dark dark:text-primary'>Profile</li>
              </ul>
           </div>
            <AnimatePresence>
           {isVisible &&(<motion.div 
           initial={{x:350}}
           animate={{x:0}}
           transition={{duration:0.7, ease:easeInOut}}
           exit={{x:350}}
           
           className="fixed flex z-20 bg-primary flex-col justify-start p-25 items-center text-center w-full h-full dark:bg-primary-dark right-0 bottom-0">
               <IoIosClose onClick={()=> setNavigationVisibility(false)} className='size-10 absolute cursor-pointer right-0 top-0 m-6 text-primary-dark dark:text-white'></IoIosClose>
              <ul className='w-screen h-auto'>
               <li className='my-20 cursor-pointer p-2  text-primary-dark dark:text-primary'>Accounts</li>
               <li className='my-20 cursor-pointer p-2  text-primary-dark dark:text-primary'>Market</li>
               <li className='my-20 cursor-pointer p-2  text-primary-dark dark:text-primary'>Profile</li>
              </ul>
           </motion.div>)}
           </AnimatePresence>
       </div>
    </>
  )
}
export default mainHeader