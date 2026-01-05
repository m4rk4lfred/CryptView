{/* imports */}
import Header from './mainHeader'
import '../../index.css'
import AccountTab from '../Main/AccountTab'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useState,useEffect } from 'react';
import { PiExport } from "react-icons/pi";
import CoinMarket from '../Main/coinMarket'
import TransactionTab from '../Main/transactionTab'
import HistoryTab from '../Main/historyTab'
{/* dashboard component */}
function Dashboard(){
  const [fetchedCoins, setFetchedCoins] = useState([]); 
  const [isLoading, setLoading] = useState(true)
  const [currentPrice, setPrice] = useState({})
  const [currentBalance , setBalance] = useState()
  useEffect(() => {
    const ping = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250' , {
          method:'GET',
          headers:{'x-cg-demo-api-key': 'CG-7a1Ju6uoaAhZbKGq1tPJvehN',}
        }
            
          
        );
        if (!response.ok) {
          console.log(`Coingecko response status: ${response.status}`);
          return;
        }
        const data = await response.json()
        console.log('Successfully connected to Coingecko');
        const Coins = data.map((coins) => ({
          coinImage:coins.image,
          coinTitle: coins.name ,  
          coinSymbol: coins.symbol,
          
        }))
        const coinsPrice = data.reduce((acc , coins) =>{
          acc[coins.name] = coins.current_price 
          return acc
        }  
        )
        setFetchedCoins(Coins)
        setPrice(coinsPrice)
        console.log('Fetched coins:', Coins); 
        console.log('Fetched price:', coinsPrice['etherium']); 
        
      } catch (err) {
        console.log('Coingecko request failed', err);
      }
      finally{
        setLoading(false)
      }
    };

    ping();
  }, []);
  
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
{isLoading ? (
  // Loading Placeholder
  <div className="relative z-10 font-poppins">
    <Header theme={darkTheme}></Header>
    
    <div className='w-full h-full mt-8'>
      <div className='px-10 mb-5'>
        <div className='h-8 w-48 bg-gray-300 dark:bg-gray-700 animate-pulse rounded'></div>
      </div>
      
      {/* Tab skeleton */}
      <div className='w-full flex flex-row justify-center items-center gap-8 mb-5'>
        {[...Array(5)].map((_, i) => (
          <div key={i} className='h-6 w-20 bg-gray-300 dark:bg-gray-700 animate-pulse rounded'></div>
        ))}
      </div>
      
      {/* Content skeleton */}
      <div className='px-10 mt-5'>
        <div className='flex justify-end mb-4'>
          <div className='h-7 w-7 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-full'></div>
        </div>
      </div>
    </div>
  </div>
) : (
  // Actual Content
  <div className="relative z-10 font-poppins">
    <Header theme={darkTheme}></Header>
    
    <div className='grid w-full h-full mt-8  md:grid-cols-[30%_70%]'>
      <div>
        <h1 className="text-2xl px-10 mb-5 font-bold ">{tabLocation}</h1>
        <div className='hidden md:flex w-auto h-auto'>
           <AccountTab coinsDetails={fetchedCoins} coinPrice={currentPrice} walletBalance={setBalance}></AccountTab>
        </div>
      </div>
      
      <div>
       
       <div className='hidden md:flex justify-between items-center'>
           <div className='flex flex-col gap-3 text-primary-dark'>
            <h1 className='text-3xl font-bold tracking-[0.35em]'>Wallet</h1>
            <p  className='text-5xl font-bold tracking-[0.15em]'>{currentBalance}$</p>
        </div>

        <div>
           <div className='flex flex-row text-primary bg-branding rounded-2xl cursor-pointer px-4 gap-3 justify-center items-center py-2 mr-12'>
             <PiExport size={22}/>
             Export
           </div>
        </div>
       </div>
        
        <Tabs defaultIndex={0||1}>
        <TabList className={'w-full flex flex-row justify-center items-center h-auto text-[0.9em] '}>
          <Tab onClick={() => setTabLocation('Accounts')} selectedClassName='text-branding' className={`md:hidden`}>Accounts</Tab>
          <Tab onClick={() => setTabLocation('Coins')} selectedClassName='text-branding'>Coins</Tab>
          <Tab onClick={() => setTabLocation('Favorites')} selectedClassName='text-branding'>Favorites</Tab>
          <Tab onClick={() => setTabLocation('Transactions')} selectedClassName='text-branding'>Transactions</Tab>
          <Tab onClick={() => setTabLocation('History')} selectedClassName='text-branding'>History</Tab>
        </TabList>
        
        <div className='md:hidden'>
        <TabPanel className='md:hidden'>
          <AccountTab coinsDetails={fetchedCoins} coinPrice={currentPrice} walletBalance={setBalance} ></AccountTab>
        </TabPanel>
        </div>

        <TabPanel>
          <CoinMarket></CoinMarket>
        </TabPanel>
        
        <TabPanel>

        </TabPanel>


        <TabPanel className={'p-4'}>
          <TransactionTab>

          </TransactionTab>
        </TabPanel>

        <TabPanel className={'p-4'}>
             <HistoryTab>
              
             </HistoryTab>
        </TabPanel>

      </Tabs>
      </div>
    </div>
  </div>
)}

    </>
  )
}


{/* export */}
export default Dashboard
