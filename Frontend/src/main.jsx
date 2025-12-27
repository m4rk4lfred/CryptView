import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Landingpage from '../src/Pages/LandingPage/Landingpage'
import AOS from 'aos';
import 'aos/dist/aos.css';
import RegisterAccount from '../src/Pages/AccountAuthentication/Accountmodal'

function App() {
 
  const [darkMode, setDarkMode] = useState(false)
  const [isShow, changeShow] = useState(true)
  
  useEffect(() => {
    const checkTheme = () => {
    const currentTime = new Date().getHours()
    const isDarkMode = currentTime <= 6 || currentTime >= 18

    if(isDarkMode){
       localStorage.setItem('theme', 'dark')
       setDarkMode(true)
    }
    else{
      localStorage.setItem('theme','light')
      setDarkMode(false)
    }
    }

    checkTheme()
    const interval = setInterval(checkTheme, 60000)
    return() => clearInterval(interval)
  },[])
 

  useEffect(() => {
      AOS.init({
        duration:500,
        easing:'ease-in-out',
       
      });
  }, []);

  return (

 
    <div  className={`min-h-screen ${darkMode ? 'dark':''} w-screen bg-[#f8fafc] dark:bg-primary-dark `}>
      {/*Grid setting up*/}
      <div
        className={`${darkMode ? 'hidden' :''} fixed inset-0 z-0 mask-b-from-0% mask-b-to-96%`}
        style={{
          backgroundImage: 'linear-gradient(to right, #D2D2D2 1px, transparent 1px), linear-gradient(to bottom, #D2D2D2 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />
      {isShow && <RegisterAccount></RegisterAccount>}
      {darkMode && 
       (   
       <div
        className="fixed inset-0 z-0 mask-b-from-0% mask-b-to-80%"
        style={{
          backgroundImage: 'linear-gradient(to right, #575757 1px, transparent 1px), linear-gradient(to bottom, #575757 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />


    )
      }

    
      
      <div  className="relative z-10">
        <Landingpage />
      </div>

    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>

      <App />


  </StrictMode>,
)