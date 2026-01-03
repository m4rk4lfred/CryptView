// Import the dark version of the brand logo from assets (currently unused in this component)
import darkLogo from '../../assets/Brand_logo_Dark.svg'

// Import tab components for Signup/Login switching
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'

// React hook for managing component state
import { useState } from 'react'

// Close icon for modal
import { IoIosClose } from "react-icons/io"

// Animation utilities for modal transitions
import { AnimatePresence, motion } from 'motion/react'

// Notification popup component
import Notification from '../../Components/notificationPop'

// Navigation hook for redirecting after login
import { Navigate, useNavigate } from 'react-router-dom'

function Accountmodal({ showState, changeState }) {

  /* ===================== SIGNUP STATE ===================== */
  const [usernameSignup, setUsernameSignup] = useState('')
  const [emailSignup, setEmailSignup] = useState('')
  const [passwordSignup, setPasswordSignup] = useState('')
  const [confirmPasswordSignup, setConfirmPasswordSignup] = useState('')

  /* ===================== LOGIN STATE ===================== */
  const [emailLogin, setEmailLogin] = useState('')
  const [passwordLogin, setPasswordLogin] = useState('')

  /* ===================== NOTIFICATION STATE ===================== */
  const [notificationInfo, setNotification] = useState(null)
  const [showNotification, setNotificationVisibility] = useState(false)
  const [notifId, setnotifId] = useState(0)

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  // React Router navigation
  const navigate = useNavigate()

  /* ===================== HANDLE REGISTRATION ===================== */
  const handleRegistration = async (e) => {

      // Validate email format
      if (!emailRegex.test(emailSignup)) {
        setNotification({
          type: 'error',
          header: 'Invalid email',
          message: 'Please input a valid email'
        })
        setNotificationVisibility(true)
        setnotifId(id => id + 1)
        return
      }

      // Check if passwords match
      if (passwordSignup !== confirmPasswordSignup) {
        setNotification({
          type: 'error',
          header: 'Incorrect Password',
          message: 'Passwords do not match.'
        })
        setNotificationVisibility(true)
        setnotifId(id => id + 1)
        return
      }

      // Check minimum password length
      if (passwordSignup.length < 8) {
        setNotification({
          type: 'error',
          header: 'Invalid input',
          message: 'Please input atleast 8 characters'
        })
        setNotificationVisibility(true)
        setnotifId(id => id + 1)
        return
      }

      try {
        // Send signup request to backend
        const response = await fetch('/backend/register', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: usernameSignup,
            email: emailSignup,
            userPassword: passwordSignup
          })
        })

        // Handle server error
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`)
        }

        // Parse server response
        const data = await response.json()

        // Show notification from backend response
        setNotification({
          type: data.notificationType,
          header: data.notificationHeader,
          message: data.message
        })

        console.log(data.returnedValue)

        // Trigger notification
        setNotificationVisibility(true)
        setnotifId(id => id + 1)

        // Reset signup fields
        setUsernameSignup('')
        setEmailSignup('')
        setConfirmPasswordSignup('')
        setPasswordSignup('')

      } catch (error) {
        // Handle fetch or server errors
        setNotification({
          type: 'error',
          header: 'Error Connecting to database',
          message: error.message
        })
        setNotificationVisibility(true)
        setnotifId(id => id + 1)
      }
  }

  /* ===================== HANDLE LOGIN ===================== */
  const handleLogin = async (e) => {
    try {
      // Send login request to backend
      const response = await fetch('/backend/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: emailLogin,
          user_password: passwordLogin
        })
      })

      // Handle server error
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`)
      }

      // Parse server response
      const data = await response.json()

      // Show notification from backend
      setNotification({
        type: data.notificationType,
        header: data.notificationHeader,
        message: data.message
      })
      const token = data.token
      // Store dummy auth token
      localStorage.setItem('token', token)
      const storedToken = localStorage.getItem('token')
      console.log(`Generated Token: ${token['user_id']}` )
      // Trigger notification
      setNotificationVisibility(true)
      setnotifId(id => id + 1)

      // Redirect to dashboard
      navigate('/dashboard/account', { replace: true })

    } catch (error) {
      // Handle fetch or server errors
      setNotification({
        type: 'error',
        header: 'Invalid Credentials',
        message: 'Input a correct Email or password'
      })
      setNotificationVisibility(true)
      setnotifId(id => id + 1)
    }
  }

  return (
    <>
      {/* Notification popup */}
      {showNotification && (
        <Notification
          key={notifId}
          notificationVisibility={showNotification}
          notificationType={notificationInfo.type}
          notificationHeader={notificationInfo.header}
          notificationMessage={notificationInfo.message}
        />
      )}

      {/* Animated modal presence */}
      <AnimatePresence>
        {showState && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-center w-screen h-full bg-transparent z-20 fixed font-poppins"
          >

            {/* Modal container */}
            <div className="bg-primary h-8/10 w-7/10 rounded-3xl px-4 py-2 shadow-2xl max-w-90 md:max-w-1/4 md:min-w-80">
              <Tabs defaultIndex={0} className="w-full">

                {/* Header: Tabs and close button */}
                <div className="flex flex-row justify-between items-center mb-6 py-3">
                  <TabList className="flex gap-6 text-primary-text font-bold">
                    <Tab
                      className="cursor-pointer focus:outline-none px-2 py-1 rounded"
                      selectedClassName="text-branding"
                    >
                      Signup
                    </Tab>
                    <Tab
                      className="cursor-pointer focus:outline-none px-2 py-1 rounded"
                      selectedClassName="text-branding"
                    >
                      Login
                    </Tab>
                  </TabList>

                  {/* Close modal button */}
                  <IoIosClose
                    size={'2em'}
                    className='hover:text-red-500 duration-150 cursor-pointer'
                    onClick={() => changeState(false)}
                  />
                </div>

                {/* Tab panels */}
                <div className="flex flex-col w-full h-auto">

                  {/* ===================== SIGNUP PANEL ===================== */}
                  <TabPanel className="outline-none">

                    {/* Username input */}
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

                    {/* Email input */}
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

                    {/* Password input */}
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

                    {/* Confirm password input */}
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

                    {/* Signup button */}
                    <button
                      onClick={handleRegistration}
                      className="w-full py-2 mt-5 border-2 border-branding rounded-xl text-primary bg-branding hover:bg-transparent hover:border-branding cursor-pointer hover:text-branding duration-75"
                    >
                      Signup
                    </button>
                  </TabPanel>

                  {/* ===================== LOGIN PANEL ===================== */}
                  <TabPanel className="outline-none">

                    {/* Email input */}
                    <div className="flex flex-col gap-3">
                      <p className="text-sm text-primary-text">Email</p>
                      <input
                        type="text"
                        value={emailLogin}
                        onChange={(e) => setEmailLogin(e.target.value)}
                        className="border-b-2 p-2 text-sm border-branding focus:outline-none"
                      />
                    </div>

                    {/* Password input */}
                    <div className="flex flex-col gap-3 mt-10">
                      <p className="text-sm text-primary-text">Password</p>
                      <input
                        type="password"
                        value={passwordLogin}
                        onChange={(e) => setPasswordLogin(e.target.value)}
                        className="border-b-2 p-2 text-sm border-branding focus:outline-none"
                      />
                    </div>

                    {/* Login button */}
                    <button
                      onClick={handleLogin}
                      className="w-full py-2 mt-2 border-2 border-branding rounded-xl text-primary bg-branding hover:bg-transparent hover:border-branding cursor-pointer hover:text-branding duration-75"
                    >
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
