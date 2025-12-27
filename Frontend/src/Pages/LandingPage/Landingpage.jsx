import Header from '../LandingPage/Header'
import Hero from '../LandingPage/Hero'
import Features from '../LandingPage/Features' 
import Features2 from '../LandingPage/Features2'
import Summary from '../LandingPage/Summary'
import StartTracking from '../LandingPage/StartTracking'
function Landingpage({showState}){
   return(
     <>
     <div className='w-auto h-auto inset-0'>
       <Header showModal={showState}></Header>
       <Hero></Hero>
       <Features></Features>
       <Features2></Features2>
       <Summary></Summary>
       <StartTracking></StartTracking>

      </div>
     </>
    
   )
}
export default Landingpage