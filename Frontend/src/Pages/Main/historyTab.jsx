import { useEffect,useState } from "react";


function historyTab(){
  const [transactionHistory, setTransactionHistory] = useState([])
  useEffect(()=>{
    const fetchTransactions = async () =>{
        const selectedWallet = localStorage.getItem('selectedWallet')
        try{
        const transactions = await fetch('/backend/getTransactionHistory', {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                wallet_id : selectedWallet
            })
        })

        if(!transactions.ok){
            console.log(transactions.status)
        }

        const data = await transactions.json()
        setTransactionHistory(data.fetched_history)
        console.log(`Transaction History: ${data.fetched_history}`) 
    } catch(error){
        console.log(error)
    }
   

    }
    fetchTransactions()
  },[transactionHistory])
  return(
    <>
       <div className=" w-full h-full p-4">
         {transactionHistory.map((history,index) => (
            <div key={index} className="w-full p-2 h-full border-b-2 rounded-3xl flex flex-row justify-start gap-2 items-center mb-4">
            <img className='w-10' src={history?.['crypto_logo'] } alt="crypto.svg" />
            <p className="font-normal mr-2">{history?.['crypto_name']}</p>
            <div>
                <h4 className={`${history?.['transaction_type'] == 'SELL'? 'text-red-600':'text-green-300' } text-xl font-bold tracking-[0.075em] `}>{history?.['transaction_type']}</h4>
                <p className="text-[0.6em] tracking-widest">{new Date(history?.['created_at']).toLocaleDateString()}</p>
            </div>
        </div>
         ))}
       </div>
    </>
  )
}
export default historyTab;