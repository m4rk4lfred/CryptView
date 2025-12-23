import brandLogoDark from '../../assets/Brand_logo_Dark.svg'
import brandLogoLight from '../../assets/Brand_logo_Light.svg'
import { IoPersonOutline } from "react-icons/io5";
function Header(){
  const theme = localStorage.getItem('theme')
   return(
     <> 
       <div className="grid grid-cols-2 font-poppins py-8">
         <div className="flex gap-1 ml-8 justify-start items-center md:mx-20 md:my-6">
           <img src={theme === 'dark'? brandLogoLight:brandLogoDark} alt="brandLogo" />
           <h1 className='font-bold text-lg text-primary-dark dark:text-primary'>CRYPT<span className='text-branding'>VIEW</span></h1>
         </div>
         <div className="flex justify-end items-center mr-8 md:hidden">
           <IoPersonOutline className='text-2xl text-primary-dark dark:text-primary'/>
         </div>
         
          <div className="md:flex hidden justify-end items-center mr-24">
           <p className='dark:text-primary font-semibold tracking-[0.200em]'>Portfolio</p>
         </div>
       </div>
     </>
   )
}
export default Header;