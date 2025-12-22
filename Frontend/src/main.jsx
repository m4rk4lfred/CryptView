import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Landingpage from '../src/Pages/LandingPage/Landingpage'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/*Main*/}
    <div className="min-h-screen w-full bg-[#f8fafc] dark:bg-primary-dark relative ">
      {/*Grid setting up*/}
      <div
        className="absolute inset-0 z-0 mask-b-from-15%"
        style={{
          backgroundImage: 'linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />
      <div className="relative z-10">
        <Landingpage />
      </div>
    </div>
  </StrictMode>,
)