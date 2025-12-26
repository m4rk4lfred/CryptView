import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Landingpage from '../src/Pages/LandingPage/Landingpage'
import AOS from 'aos';
import 'aos/dist/aos.css';


function App() {
  const [time, setTime] = useState()
  const [darkMode, setDarkMode] = useState('')

  useEffect(()=>{
    setTime(new Date().getHours())
    console.log(`data ${new Date().getHours()}`)
    {/*new Date().getHours() */}
 
  },[])
  useEffect(()=>{
    if(time <= 6 || time >= 18){
       localStorage.setItem('theme','dark')
       setDarkMode(localStorage.getItem('theme'))
    }
    else{
       localStorage.setItem('theme','')
       setDarkMode(localStorage.getItem('theme'))
    }
  },[])

  useEffect(() => {
      AOS.init({
        duration:500,
        easing:'ease-in-out',
       
      });
  }, []);

  return (
    <div  className={`min-h-screen ${darkMode} w-screen bg-[#f8fafc] dark:bg-primary-dark `}>
      {/*Grid setting up*/}
      <div
        className={`${darkMode === 'dark' ? 'hidden' :''} fixed inset-0 z-0 mask-b-from-0% mask-b-to-96%`}
        style={{
          backgroundImage: 'linear-gradient(to right, #D2D2D2 1px, transparent 1px), linear-gradient(to bottom, #D2D2D2 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />

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