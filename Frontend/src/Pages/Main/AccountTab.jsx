import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { IoIosAdd } from "react-icons/io";
import {useState} from 'react'
import { div, p } from 'motion/react-client';
function AccountTab(){
   const [transactionModalVisible,setTransactionModal] = useState(true)
   return(
    <>
       <div className="flex flex-col  w-full h-full mt-5 px-10">

           <div className='flex w-full h-auto justify-end items-center'>
            <IoIosAdd className='size-7 cursor-pointer dark:text-primary'/>
           </div>

           { transactionModalVisible &&(
             <div className='w-screen h-screen fixed bg-blue-500 opacity-50 top-0 left-0'>
                <div>
                    
                </div>
             </div>
           )}
       </div>
    </>
   )
}
export default AccountTab