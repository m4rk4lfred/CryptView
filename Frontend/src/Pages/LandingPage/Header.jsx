import brandLogoDark from '../../assets/Brand_logo_Dark.svg'
import brandLogoLight from '../../assets/Brand_logo_Light.svg'
import { IoPersonOutline } from "react-icons/io5";
function Header(){
  const theme = localStorage.getItem('theme')
   return(
     <> 
       <div data-aos={"fade"} className="grid grid-cols-2 font-poppins px-10 pt-8 md:px-[8em]">
         <div className="flex gap-1  justify-start items-center">
           <img src={theme === 'dark'? brandLogoLight:brandLogoDark} alt="brandLogo" />
           <h1 className='font-bold text-lg text-primary-dark dark:text-primary'>CRYPT<span className='text-branding'>VIEW</span></h1>
         </div>
         <div className="flex justify-end items-center md:hidden">
           <IoPersonOutline className='text-2xl text-primary-dark dark:text-primary'/>
         </div>
         
          <div className="md:flex hidden justify-end items-center">
           <p className="dark:text-primary font-semibold tracking-[0.200em] relative before:content-[''] before:bg-black 
           before:absolute  before:w-full before:h-0.5 before:bottom-0 before:-left-0.4  before:ease-in-out
           before:origin-left
           before:scale-x-0
           hover:before:scale-x-100
           before:transition-transform before:duration-500 
           cursor-pointer
           dark:before:bg-primary
           ">Portfolio</p>
         </div>
       </div>
     </>
   )
}
export default Header;