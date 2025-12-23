import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Landingpage from '../src/Pages/LandingPage/Landingpage'

function App() {
  const [time, setTime] = useState()
  const [darkMode, setDarkMode] = useState('')

  useEffect(()=>{
    setTime(18 )
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
  })

  return (
    <div className={`min-h-screen ${darkMode}  w-full bg-[#f8fafc] dark:bg-primary-dark relative `}>
      {/*Grid setting up*/}
      <div
        className={`${darkMode === 'dark' ? 'hidden' :''} absolute inset-0 z-0 mask-b-from-0% mask-b-to-96%`}
        style={{
          backgroundImage: 'linear-gradient(to right, #D2D2D2 1px, transparent 1px), linear-gradient(to bottom, #D2D2D2 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />

      {darkMode && 
       (   
       <div
        className="absolute inset-0 z-0 mask-b-from-0% mask-b-to-80%"
        style={{
          backgroundImage: 'linear-gradient(to right, #575757 1px, transparent 1px), linear-gradient(to bottom, #575757 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />


    )
      }

      <div className="relative z-10">
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