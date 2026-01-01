// Import tab components from react-tabs (currently not used inside this component)
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

// Import icons for add and close actions
import { IoIosAdd } from "react-icons/io"
import { IoIosClose } from "react-icons/io"

// Import useState hook for local state management
import { useState } from 'react'

function AccountTab({ coinsDetails, coinPrice }) {

   // Controls visibility of the "Add Transaction" modal
   const [transactionModalVisible, setTransactionModal] = useState(false)

   // Controls visibility of the custom dropdown
   const [isDropdownOpen, setDropdownOpen] = useState(false)

   // Stores the currently selected coin from the dropdown
   const [selectedCoin, setSelectedCoin] = useState(null)

   // Stores transaction type: 'buy' or 'sell'
   const [transactionState, setTransactionState] = useState('')

   return (
    <>
         {/* Add wallet s*/}
           <div className='flex justify-center items-center w-screen h-screen absolute left-0 top-0 z-20' 
           style={{backgroundColor: 'rgba(107, 114, 128, 0.3)'}}>
              <div className='w-1/4 rounded-xl h-1/2 bg-primary min-w-90 shadow-2xl p-6'>
                   <h1 className='text-2xl font-bold mb-5'>Create Wallet</h1>
                   <div>
                      <form action="">
                      <div className='flex flex-col gap-8'>
                         <div>
                           <label htmlFor="user_name">Name</label>
                           <input type="text" name='user_name' className='w-full h-10 border rounded-xl border-branding px-5' />
                         </div>

                         <div>
                           <label htmlFor="">Amount</label>
                           <input type="number  " placeholder='$' className='w-full h-10 border rounded-xl border-branding px-5' />
                         </div>
                         <button className='w-full h-10 border border-branding rounded-xl text-branding hover:bg-branding hover:text-primary duration-150 cursor-pointer'> Create Wallet </button>
                         </div>
                      </form>
                   </div>
                   
              </div>
           </div>

       {/* Main container */}
       <div className="flex flex-col w-full h-full mt-5 px-10">
           
           {/* Top action bar */}
           <div className='flex w-full h-auto justify-end items-center'>
              
              {/* Left side add icon */}
              <div className='flex flex-row w-1/2'>
                <IoIosAdd className='size-6 cursor-pointer'/>
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
               className='flex justify-center p-6 items-center w-screen h-screen fixed bg-gray-400 top-0 left-0'
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
                           onClick={() => setTransactionState('buy')} 
                           className='w-full h-8 flex justify-center rounded-xl items-center bg-[#8DDDBA] cursor-pointer'
                         >
                           Buy
                         </div>
                         <div 
                           onClick={() => setTransactionState('sell')} 
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
                                  required
                                />
                            </div>

                            <div>
                                <p>Price per Coin</p>
                                <input 
                                  type="text" 
                                  value={coinPrice[selectedCoin?.coinTitle] || ''} 
                                  className='w-full px-2 h-12 mt-3 rounded-lg border' 
                                  readOnly 
                                />
                            </div>
                        </div>

                        {/* Date input */}
                        <div>
                            <input 
                              type="date" 
                              className='w-full px-2 h-12 mt-3 rounded-lg border' 
                            />
                        </div>

                        {/* Submit button */}
                        <div>
                            <button className='w-full text-branding h-12 border border-branding mt-5 rounded-lg'>
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
            <div className='w-full min-h-screen py-6'>
               <div 
                 className='w-full h-auto bg-gray-100 rounded-2xl py-2 px-4'
                 style={{ backgroundColor: 'rgba(107, 114, 128, 0.2)' }}
               >
                  <h1 className='font-semibold text-primary-dark'>
                    Mark Alfred Cabungan
                  </h1>
                  <p className='text-2xl font-bold text-primary-text'>
                    30 $
                  </p>
               </div>
            </div>

            
            
       </div>

      
    </>
   )
}

export default AccountTab
