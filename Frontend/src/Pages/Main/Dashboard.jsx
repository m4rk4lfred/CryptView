{/* imports */}
import Header from './mainHeader'
import '../../index.css'
import AccountTab from '../Main/AccountTab'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useState } from 'react';

{/* dashboard component */}
function Dashboard(){

  {/* get theme from localStorage */}
  const darkTheme = localStorage.getItem('theme')
  const [tabLocation , setTabLocation] = useState('Accounts')

  return(
    <>
      {/* background wrapper */}
      <div className={`${darkTheme === 'dark' ? 'dark' : ''} bg-primary w-screen h-screen dark:bg-primary-dark fixed z-0 `}>

        {/* Dark mode grid */}
        <div
          className={`${darkTheme ? 'hidden' : ''}  fixed inset-0 z-0 mask-b-from-0% mask-b-to-96%`}
          style={{
            backgroundImage:
              'linear-gradient(to right, #D2D2D2 1px, transparent 1px), linear-gradient(to bottom, #D2D2D2 1px, transparent 1px)',
               backgroundSize: '20px 20px',
          }}
        />

      </div>


      {/* Light mode grid */}
      {darkTheme && (
        <div
          className="fixed inset-0 z-0 mask-b-from-0% mask-b-to-80%"
          style={{
            backgroundImage:
              'linear-gradient(to right, #575757 1px, transparent 1px), linear-gradient(to bottom, #575757 1px, transparent 1px)',
            backgroundSize: '20px 20px',
            opacity:0.3,
          }}
        />
      )}


      {/* main content container */}
      <div className="relative z-10 font-poppins">
          <Header theme={darkTheme}></Header>
         
           <div className='w-full h-full mt-8'>
           <div>
                <h1 className="text-2xl px-10 mb-5 font-bold ">{tabLocation}</h1>
            </div>
                   <Tabs>
                    <TabList className={' w-full flex flex-row justify-center items-center h-auto text-[0.7em] '}>
                        <Tab onClick={() => setTabLocation('Accounts')} selectedClassName='text-branding'>Accounts</Tab>
                        <Tab onClick={() => setTabLocation('Coins')} selectedClassName='text-branding'>Coins</Tab>
                        <Tab onClick={() => setTabLocation('Favorites')} selectedClassName='text-branding'>Favorites</Tab>
                        <Tab onClick={() => setTabLocation('Transactions')} selectedClassName='text-branding'>Transactions</Tab>
                        <Tab onClick={() => setTabLocation('History')} selectedClassName='text-branding'>History</Tab>
                    </TabList>
                    
                    <TabPanel>
                      <AccountTab></AccountTab>
                    </TabPanel>
                </Tabs>
            </div>
      </div>

    </>
  )
}


{/* export */}
export default Dashboard
