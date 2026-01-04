// Import tab components from react-tabs (currently not used inside this component)
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

// Import icons for add and close actions
import { IoIosAdd } from "react-icons/io"
import { IoIosClose } from "react-icons/io"

// Import useState hook for local state management
import { useState,useEffect } from 'react'

import { IoClose } from "react-icons/io5";

function AccountTab({ coinsDetails, coinPrice, walletBalance }) {

   // Controls visibility of the "Add Transaction" modal
   const [transactionModalVisible, setTransactionModal] = useState(false)

   // Controls visibility of the custom dropdown
   const [isDropdownOpen, setDropdownOpen] = useState(false)

   // Stores the currently selected coin from the dropdown
   const [selectedCoin, setSelectedCoin] = useState(null)



   const [userWalletName , setWalletName] = useState('')
   const [userWalletBalance, setWalletBalance] = useState()

   const [showCreateAccount , setCreateAccount] = useState(false)

   const [showWallets, setWallets] = useState([])
   const [selectedWallet, setSelectedWallet] = useState()
   const [transactionType,setTransactionType] = useState('BUY')

   const [coinQuantity , setCoinQuantity] = useState()
   const [pricePerCoin,setCoinPrice] = useState()

   const[currentDate,setDate]=useState()

   
   function handleSelectedAccount(accountId,currentBalance){
      localStorage.setItem('selectedWallet', accountId)
      setSelectedWallet(accountId)
      walletBalance(currentBalance)
   }
   useEffect(()=>{
     if(showWallets.length > 0 && !selectedWallet){
        setSelectedWallet(showWallets[0].wallet_id)
        walletBalance(showWallets[0].balance)
     }
   },[showWallets])
   
   useEffect(() => {
  if (selectedCoin) {
    setCoinPrice(coinPrice[selectedCoin.coinTitle])
  }
}, [selectedCoin, coinPrice])
   const handleTransaction =async () => {
      const requestBody = {
      walletId: selectedWallet,
      cryptoName: selectedCoin.coinTitle,
      cryptoSymbol: selectedCoin.coinSymbol,
      cryptoLogo: selectedCoin.coinImage,
      transactionType: transactionType,
      quantity: coinQuantity,
      pricePerCoin: pricePerCoin,
      transactionDate: currentDate
    }

    console.log('Request Data:', requestBody)
    try {
       const transaction= await fetch('/backend/addTransaction',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          walletId: selectedWallet,
          cryptoName: selectedCoin.coinTitle ,
          cryptoSymbol:selectedCoin.coinSymbol,
          cryptoLogo: selectedCoin.coinImage,
          transactionType: transactionType,
          quantity: coinQuantity,
          pricePerCoin: pricePerCoin,
          transactionDate:currentDate
        }
      )
       }
       
      )
      console.log('Request Data:', requestBody)
      const data = await transaction.json()
      console.log(data.message)

    } catch (error) {
      console.error(`Error:${error}`)
    }
   }

   const handleAddWallet = async (e) => {
     e.preventDefault()
     setCreateAccount(false)
     try {
        const login_token = localStorage.getItem('token')
        const [account,wallets] = await Promise.all([
          fetch('/backend/createWallet', {
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body: JSON.stringify({
             walletName : userWalletName,
             walletBalance : userWalletBalance,
             token : login_token
          })
        }),
        fetch('/backend/getWallet',{
          method:'POST',
          headers:{
             'Content-Type':'application/json'
          },
          body: JSON.stringify({
            token: login_token
          })
        })
        ])
        if  (!account.ok || !wallets.ok) {
          console.error('Request failed')
         }
        const user_wallets = await wallets.json()
        setWallets(user_wallets.wallet)

        console.log(user_wallets.wallet)
       

     } catch (error) {
        console.log(error)
     }
   }
   
  useEffect(() => {
  const fetchAccount = async () => {
    try {
      const login_token = localStorage.getItem('token')
      const response = await fetch('/backend/getWallet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: login_token
        })
      })
      
      if (!response.ok) {
        console.error('Request failed')
        return
      }
      
      const data = await response.json()
      setWallets(data.wallet)
    } catch (error) {
      console.error('Error fetching wallets:', error)
    }
  }
  
  fetchAccount()
}, [])
   
   return (
    <>
         {/* Add wallet */}
           {showCreateAccount &&(<div className='flex justify-center items-center w-screen h-screen absolute left-0  top-0 z-20' 
           style={{backgroundColor: 'rgba(107, 114, 128, 0.3)'}}>
              <div className='w-1/4 rounded-xl h-1/2 bg-primary min-w-90 shadow-2xl p-6'>
                  <div className='flex flex-row justify-between  items-center mb-5'>
                     <h1 className='text-2xl font-bold '>Create Wallet</h1>
                     <IoClose onClick={()=> setCreateAccount(false)} size={25}></IoClose>
                  </div>
                   <div>
                      <form onSubmit={handleAddWallet}>
                      <div className='flex flex-col gap-8'>
                         <div>
                           <label htmlFor="user_name">Name</label>
                           <input type="text" name='user_name' className='w-full h-10 border rounded-xl border-branding px-5'
                           value={userWalletName}
                           onChange={(e)=> setWalletName(e.target.value)} />
                         </div>

                         <div>
                           <label htmlFor="">Amount</label>
                           <input type="number" placeholder='$' className='w-full h-10 border rounded-xl border-branding px-5' 
                           value={userWalletBalance}
                           onChange={(e)=> setWalletBalance(Number(e.target.value))}
                           />
                         </div>
                         <button type='submit' className='w-full h-10 border border-branding rounded-xl text-branding hover:bg-branding hover:text-primary duration-150 cursor-pointer'> Create Wallet </button>
                         </div>
                      </form>
                   </div>
                   
              </div>
           </div>)}

       {/* Main container */}
       <div className="flex flex-col w-full h-full mt-5 px-10">
           
           {/* Top action bar */}
           <div className='flex w-full h-auto justify-end items-center'>
              
              {/* Left side add icon */}
              <div className='flex flex-row w-1/2'>
                <IoIosAdd onClick={()=>setCreateAccount(true)} className='size-6 cursor-pointer hover:scale-125 duration-500'/>
              </div>

              {/* Right side add transaction button */}
              <div className='flex flex-row w-1/2 justify-end items-center'>
                <button 
                  onClick={() => setTransactionModal(true)} 
                  className='p-2 cursor-pointer h-auto text-primary-dark border text-[0.7em] border-primary-dark rounded-xl'
                >
                  Add Transaction
                </button>
              </div>
           </div>
           
         

           {/* Transaction modal overlay */}
           {transactionModalVisible && (
             <div 
               className='flex z-50 justify-center p-6 items-center w-screen h-screen fixed bg-gray-400 top-0 left-0'
               style={{ backgroundColor: 'rgba(107, 114, 128, 0.3)' }}
             >

                {/* Modal content */}
                <div className='w-9/10 h-auto max-w-100 flex flex-col bg-primary shadow-2xl p-8 rounded-[1.5em]'>

                    {/* Modal header */}
                    <div className='flex flex-row justify-between items-center'>
                        <h1 className='text-lg font-bold'>Add Transaction</h1>

                        {/* Close modal button */}
                        <IoIosClose 
                          onClick={() => setTransactionModal(false)} 
                          size={30} 
                          className='cursor-pointer'
                        />
                    </div>

                    {/* Buy / Sell selection */}
                    <div className='grid grid-cols-2 gap-4 mt-5'>
                         <div 
                           onClick={() => setTransactionType('BUY')} 
                           className='w-full h-8 flex justify-center rounded-xl items-center bg-[#8DDDBA] cursor-pointer'
                         >
                           Buy
                         </div>
                         <div 
                           onClick={() => setTransactionType('SELL')} 
                           className='w-full h-8 flex justify-center rounded-xl items-center bg-[#E88B8B] cursor-pointer'
                         >
                           Sell
                         </div>
                    </div>

                    {/* Transaction form */}
                    <div className='mt-5 relative'>

                        {/* Custom dropdown trigger */}
                        <div 
                            onClick={() => setDropdownOpen(!isDropdownOpen)}
                            className='w-full p-3 border rounded-lg cursor-pointer flex items-center gap-2 bg-blue-200 relative'
                        >
                            {/* Show selected coin or placeholder */}
                            {selectedCoin ? (
                                <>
                                    <img 
                                      src={selectedCoin.coinImage} 
                                      alt={selectedCoin.coinTitle} 
                                      className='w-6 h-6' 
                                    />
                                    <span>{selectedCoin.coinTitle}</span>
                                </>
                            ) : (
                                <span>Select a coin</span>
                            )}
                        </div>

                        {/* Quantity and price inputs */}
                        <div className='grid grid-cols-2 gap-4'>
                            <div>
                                <p>Quantity</p>
                                <input 
                                  type="number" 
                                  className='w-full h-12 mt-3 px-2 rounded-lg border' 
                                  value={coinQuantity}
                                  onChange={(e) => setCoinQuantity(e.target.value)}
                                  required
                                />
                            </div>

                            <div>
                                <p>Price per Coin</p>
                                <input 
                                  type="text" 
                                  value={pricePerCoin || ''}
                                  className='w-full px-2 h-12 mt-3 rounded-lg border' 
                                  readOnly 
                                />
                            </div>
                        </div>

                        {/* Date input */}
                        <div>
                            <input 
                              type="date" 
                              value={currentDate}
                              onChange={(e)=>setDate(e.target.value)}
                              className='w-full px-2 h-12 mt-3 rounded-lg border' 
                            />
                        </div>

                        {/* Submit button */}
                        <div>
                            <button onClick={handleTransaction} className='w-full text-branding h-12 border border-branding mt-5 rounded-lg'>
                              Add transaction
                            </button>
                        </div>

                        {/* Dropdown list of coins */}
                        {isDropdownOpen && (
                            <div className='absolute w-full -bottom-6 left-0 max-h-60 overflow-y-auto bg-white border-2 rounded-lg mt-1 z-10'>
                                {coinsDetails.map((coin, index) => (
                                    <div
                                        key={index}
                                        onClick={() => {
                                            setSelectedCoin(coin)
                                            setCoinPrice(coinPrice[coin.coinTitle])
                                            setDropdownOpen(false)
                                        }}
                                        className='flex items-center gap-2 p-3 hover:bg-gray-100 cursor-pointer'
                                    >
                                        <img 
                                          src={coin.coinImage} 
                                          alt={coin.coinTitle} 
                                          className='w-6 h-6' 
                                        />
                                        <span>{coin.coinTitle}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
             </div>
           )}

           {/* Account summary section */}
            <div  className='w-full  h-130 py-6 overflow-y-scroll'>
              {showWallets.map((wallet) => (
               <div key={wallet.wallet_id} 
                 className={`w-full h-auto ${selectedWallet==wallet.wallet_id?'bg-gray-200':'bg-gray-100'} rounded-2xl py-2 px-4 mb-5`}
                 onClick={()=>handleSelectedAccount(wallet.wallet_id,wallet.balance)}
               >
                  <h1 className='font-semibold text-primary-dark'>
                     {wallet.wallet_name}
                  </h1>
                  <p className='text-2xl font-bold text-primary-text'>
                    {wallet.balance}
                  </p>
               </div>
              ))}
            </div>

            
            
       </div>

      
    </>
   )
}

export default AccountTab
