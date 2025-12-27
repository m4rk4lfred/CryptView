// Import the dark version of the brand logo from assets
import darkLogo from '../../assets/Brand_logo_Dark.svg'

// Import useState hook for handling form state
import { useState } from 'react'

// Account modal component (Signup / Login UI)
function Accountmodal() {

    // State for storing the signup username input
    const [usernameSignup, setUsernameSignup] = useState('')

    // State for storing the signup password input
    const [passwordSignup, setPasswordSignup] = useState('')

    return (
        <>
          {/* Full-screen modal overlay */}
          <div className="flex items-center justify-center w-screen h-screen bg-transparent z-1000 fixed font-poppins">
            
            {/* Modal container */}
            <div className="bg-primary h-7/10 w-7/10 rounded-3xl p-6 shadow-2xl max-w-90 md:max-w-1/4 md:min-w-80 ">
              
              {/* Header section: Signup/Login tabs and logo */}
              <div className="flex flex-row justify-between">
                  
                  {/* Signup and Login labels */}
                  <div className='flex relative justify-center items-center bg-blue-100 gap-5 text-primary-text font-bold
                  before:content-[""] before:absolute before:w-full before:h-[0.20em] before:rounded-2xl before:bg-branding before:bottom-0 before:left-0
                  '>
                    <p>Signup</p>
                    <p>Login</p>
                  </div>

                  {/* Brand logo */}
                  <img src={darkLogo} alt="logo" />
               </div>

               {/* Form section */}
               <div className='flex flex-col w-full h-auto mt-8'>
                   
                   {/* Username input field */}
                   <div className='flex flex-col gap-3'>
                    <p className='text-sm text-primary-text'>Username</p>
                    <input
                     type="text"
                     value={usernameSignup}
                     onChange={(e) => setUsernameSignup(e.target.value)}
                     className='border-b-2 p-2 text-sm border-branding focus:outline-none animate-pulse'
                    />
                   </div>

                   {/* Password input field */}
                   <div className='flex flex-col gap-3 mt-10'>
                     <p className='text-sm text-primary-text'>Password</p>
                     
                     <input
                      type="password"
                      value={passwordSignup}
                      onChange={(e) => setPasswordSignup(e.target.value)}
                      className='border-b-2 p-2 text-sm border-branding focus:outline-none animate-pulse'
                     />
                   </div>
                   <button className='w-full py-2 mt-10 border-2 border-branding rounded-xl text-primary bg-branding hover:bg-transparent hover:border-branding hover:border-2 cursor-pointer hover:text-branding duration-75 '>Signup</button>

               </div>
            </div>
          </div>
        </>
    )
}

// Export the Accountmodal component
export default Accountmodal
