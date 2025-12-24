import Header from '../LandingPage/Header'
import Hero from '../LandingPage/Hero'
import Features from '../LandingPage/Features' 
function Landingpage(){
   return(
     <>
     <div className='w-auto h-auto inset-0 '>
       <Header></Header>
       <Hero></Hero>
       <Features></Features>

      </div>
     </>
    
   )
}
export default Landingpage