import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { IoIosAdd } from "react-icons/io";
import {useState} from 'react'
import { IoIosClose } from "react-icons/io";
function AccountTab({coinsDetails, coinPrice}){
   const [transactionModalVisible,setTransactionModal] = useState(false)
   const [isDropdownOpen, setDropdownOpen] = useState(false)
   const [selectedCoin, setSelectedCoin] = useState(null)
   const [transactionState , setTransactionState] = useState('')
   return(
    <>
       <div className="flex flex-col  w-full h-full mt-5 px-10">

           <div className='flex w-full h-auto justify-end items-center'>
            <IoIosAdd onClick={() => setTransactionModal(true)} className='size-7 cursor-pointer dark:text-primary'/>
           </div>

           { transactionModalVisible &&(
             <div className='flex justify-center p-6 items-center w-screen h-screen fixed bg-gray-400  top-0 left-0'
              style={{backgroundColor: 'rgba(107, 114, 128, 0.3)'}}>
                <div className='w-9/10 h-auto max-w-100 flex flex-col bg-primary shadow-2xl p-8 rounded-[1.5em]  '>
                    <div className='flex flex-row justify-between items-center'>
                        <h1 className='text-lg font-bold'>Add Transaction</h1>
                        <IoIosClose onClick={()=> setTransactionModal(false)} size={30} className='cursor-pointer'></IoIosClose>
                    </div>

                    <div className='grid grid-cols-2 gap-4 mt-5'>
                         <div onClick={()=>setTransactionState('buy')} className='w-full h-8 flex justify-center rounded-xl items-center bg-[#8DDDBA] cursor-pointer'>Buy</div>
                         <div onClick={()=>setTransactionState('sell')} className='w-full h-8 flex justify-center rounded-xl items-center bg-[#E88B8B] cursor-pointer'>Sell</div>
                    </div>

                    <div className='relative mt-5'>
                        {/* Custom Dropdown Button */}
                        <div 
                            onClick={() => setDropdownOpen(!isDropdownOpen)}
                            className='w-full p-3 border rounded-lg cursor-pointer flex items-center gap-2'
                        >
                            {selectedCoin ? (
                                <>
                                    <img src={selectedCoin.coinImage} alt={selectedCoin.coinTitle} className='w-6 h-6' />
                                    <span>{selectedCoin.coinTitle}</span>
                                     
                                </>
                            ) : (
                                <span>Select a coin</span>
                            )}
                        </div>

                        <div className='grid grid-cols-2 gap-4'>
                            <div>
                                <p>Quantity</p>
                                <input type="number" className='w-full h-12 mt-3 px-2 rounded-lg border' required/>
                            </div>
                          
                             <div>
                                <p>Price per Coin</p>
                                <input type="text" value={coinPrice[selectedCoin?.coinTitle]||''} className='w-full px-2 h-12 mt-3 rounded-lg border' readOnly />
                            </div>
                        </div>

                        <div>
                            <input type="date" className='w-full px-2 h-12 mt-3 rounded-lg border' />
                        </div>

                        <div>
                            <button className='w-full text-branding h-12 border border-branding mt-5 rounded-lg'>Add transaction</button>
                        </div>

                        {/* Dropdown List */}
                        {isDropdownOpen && (
                            <div className='absolute w-full max-h-60 overflow-y-auto bg-white border-2 rounded-lg mt-1 z-10'>
                                {coinsDetails.map((coin, index) => (
                                    <div
                                        key={index}
                                        onClick={() => {
                                            setSelectedCoin(coin)
                                            setDropdownOpen(false)
                                        }}
                                        className='flex items-center gap-2 p-3 hover:bg-gray-100 cursor-pointer'
                                    >
                                        <img src={coin.coinImage} alt={coin.coinTitle} className='w-6 h-6' />
                                        <span>{coin.coinTitle}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
             </div>
           )}
       </div>
    </>
   )
}
export default AccountTab