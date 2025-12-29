// Import the dark version of the brand logo from assets
import darkLogo from '../../assets/Brand_logo_Dark.svg'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import { useState } from 'react'
import { IoIosClose } from "react-icons/io";
import {AnimatePresence, motion} from 'motion/react'
import Notification from '../../Components/notificationPop'
import { header } from 'motion/react-client';


function Accountmodal( {showState,changeState} ) {
  // Signup state
  const [usernameSignup, setUsernameSignup] = useState('')
  const [emailSignup, setEmailSignup] = useState('')
  const [passwordSignup, setPasswordSignup] = useState('')
  const [confirmPasswordSignup, setConfirmPasswordSignup] = useState('')

  // Login state
  const [emailLogin, setEmailLogin] = useState('')
  const [passwordLogin, setPasswordLogin] = useState('')

  const [notificationInfo, setNotification] = useState(null)
  const [showNotification,setNotificationVisibility] = useState(false)
  const [notifId, setnotifId] = useState(0)

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  const handleRegistration = async (e) => {

      if(!emailRegex.test(emailSignup)){
          setNotification({
          type: 'error',
          header: 'Invalid email',
          message: 'Please input a valid email'
        })
        setNotificationVisibility(true)
        setnotifId(id => id + 1)
        return;
      }
      if(passwordSignup!==confirmPasswordSignup){
        setNotification({
          type: 'error',
          header: 'Incorrect Password',
          message: 'Passwords do not match.'
        })
        setNotificationVisibility(true)
        setnotifId(id => id + 1)
        return;
      }

      if(passwordSignup.length < 8){
          setNotification({
          type: 'error',
          header: 'Invalid input',
          message: 'Please input atleast 8 characters'
        })
        setNotificationVisibility(true)
        setnotifId(id => id + 1)
        return;
      }
      
      try {
       const response = await fetch('/backend/register',{
        method: "POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username : usernameSignup,
          email : emailSignup,
          userPassword: passwordSignup
        }) 
       })    
       
       if (!response.ok) {
         throw new Error(`Response status: ${response.status}`)
       }
       
        const data = await response.json()
        setNotification(
          {
            type:data.notificationType,
            header:data.notificationHeader,
            message:data.message
          }
        )
        console.log(data.returnedValue)
        setNotificationVisibility(true);  
        setnotifId(id => id + 1); 
        setUsernameSignup('')
        setEmailSignup('')
        setConfirmPasswordSignup('')
        setPasswordSignup('')


      } catch (error) {
            setNotification(
          {
            type:'error',
            header:'Error Connecting to database',
            message:error.message
          }
        )
        setNotificationVisibility(true);  
        setnotifId(id => id + 1); 
      }
  }

  const handleLogin = async (e) => {
     
    try {
      const response = await fetch('/backend/login',{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
           email: emailLogin,
           user_password: passwordLogin
        })
      })
       
      if(!response.ok){
         throw new Error(`Response status: ${response.status}`)
      }

      const data = await response.json()
      setNotification(
          {
            type:data.notificationType,
            header:data.notificationHeader,
            message:data.message
          }
        )
        setNotificationVisibility(true);  
        setnotifId(id => id + 1); 

    } catch (error) {
          setNotification(
          {
            type:'error',
            header:'Error Connecting to database',
            message:error.message
          }
        )
        setNotificationVisibility(true);  
        setnotifId(id => id + 1); 
    }
  } 
  return (
    <>
      {showNotification&&(
        <Notification key={notifId} notificationVisibility={showNotification} notificationType={notificationInfo.type}
        notificationHeader={notificationInfo.header} notificationMessage={notificationInfo.message}
        ></Notification>
      )}
     <AnimatePresence>
      {showState &&(
      
      <motion.div 
      initial={{scale: 0}}
      animate={{scale: 1}}
      exit={{opacity: 0}}
      transition={{duration:0.4}}
      className="flex items-center justify-center w-screen h-full bg-transparent z-20 fixed font-poppins">
        <div className="bg-primary  h-8/10 w-7/10 rounded-3xl px-4 py-2 shadow-2xl max-w-90 md:max-w-1/4 md:min-w-80">
          <Tabs defaultIndex={0} className="w-full">
            {/* Header: Tabs + Logo */}
            <div className="flex flex-row justify-between items-center mb-6 py-3">
              <TabList className="flex gap-6 text-primary-text font-bold">
                <Tab className="cursor-pointer focus:outline-none px-2 py-1 rounded"
                     selectedClassName="text-branding">
                  Signup
                </Tab>
                <Tab className="cursor-pointer focus:outline-none px-2 py-1 rounded"
                     selectedClassName="text-branding">
                  Login
                </Tab>
              </TabList>

              <IoIosClose size={'2em'} className='hover:text-red-500 duration-150 cursor-pointer' onClick={()=> changeState(false)}/>
            </div>

            {/* Panels */}
            <div className="flex flex-col w-full h-auto ">
              <TabPanel className="outline-none ">
                {/* Signup form */}
                <div className="flex flex-col gap-3">
                  <p className="text-sm text-primary-text">Username</p>
                  <input
                    type="text"
                    required
                    value={usernameSignup}
                    onChange={(e) => setUsernameSignup(e.target.value)}
                    className="border-b-2 p-2 text-sm border-branding focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-3 mb-0">
                  <p className="text-sm text-primary-text">Email</p>
                  <input
                    type="email"
                    value={emailSignup}
                    required
                    onChange={(e) => setEmailSignup(e.target.value)}
                    className="border-b-2 p-2 text-sm border-branding focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-3 mb-1">
                  <p className="text-sm text-primary-text">Password</p>
                  <input
                    type="password"
                    required
                    value={passwordSignup}
                    onChange={(e) => setPasswordSignup(e.target.value)}
                    className="border-b-2 p-2 text-sm border-branding focus:outline-none"
                    
                  />
      
                </div>

                  <div className="flex flex-col gap-3 mb-1">
                  <p className="text-sm text-primary-text">Confirm Password</p>
                  <input
                    type="password"
                    required
                    value={confirmPasswordSignup}
                    onChange={(e) => setConfirmPasswordSignup(e.target.value)}
                    className="border-b-2 p-2 text-sm border-branding focus:outline-none"
                     
                  />

                  
                </div>

                <button onClick={handleRegistration} className="w-full py-2 mt-5 border-2 border-branding rounded-xl text-primary bg-branding hover:bg-transparent hover:border-branding cursor-pointer hover:text-branding duration-75">
                  Signup
                </button>
              </TabPanel>

              <TabPanel className="outline-none">
                {/* Login form */}
                <div className="flex flex-col gap-3">
                  <p className="text-sm text-primary-text">Email</p>
                  <input
                    type="text"
                    value={emailLogin}
                    onChange={(e) => setEmailLogin(e.target.value)}
                    className="border-b-2 p-2 text-sm border-branding focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-3 mt-10">
                  <p className="text-sm text-primary-text">Password</p>
                  <input
                    type="password"
                    value={passwordLogin}
                    onChange={(e) => setPasswordLogin(e.target.value)}
                    className="border-b-2 p-2 text-sm border-branding focus:outline-none"
                  />
                </div>

                <button onClick={handleLogin} className="w-full py-2 mt-2 border-2 border-branding rounded-xl text-primary bg-branding hover:bg-transparent hover:border-branding cursor-pointer hover:text-branding duration-75">
                  Login
                </button>
              </TabPanel>
            </div>
          </Tabs>
        </div>
      </motion.div>
      )}
        </AnimatePresence>
    </>
  )
}

export default Accountmodal