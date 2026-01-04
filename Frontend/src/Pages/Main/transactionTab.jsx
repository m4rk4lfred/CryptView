import { useEffect, useState } from "react"

function transactionTab(){
   const [transactionData,setTransaction] = useState([])
   useEffect(() => {
      const selectedWallet = localStorage.getItem('selectedWallet')
      const fetchTransaction = async () =>{
        try {
            const transactionDataFetch = await fetch('/backend/fetchTransaction',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    walletId : selectedWallet
                })
            }  )

        const data = await transactionDataFetch.json()
        setTransaction(data.transactionData)
        console.log(data.transactionData)
        } catch (error) {
           console.error(error)
        }
      }
     fetchTransaction()
   },[transactionData])

function deleteTransaction(currentId){

  const deleteData = async () => {
    try {
      const response = await fetch('/backend/deleteTransaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
         transaction_id:currentId
        })
      })

      if (!response.ok) {
  console.error('Response status:', response.status)
  const text = await response.text()
  console.error('Response body:', text)
  return
}
      const data = await response.json()
      console.log(data.message)
    } catch (error) {
      
      console.error('Error dito', error)
    }
  }
  deleteData()  

}
   return(
   <>
     <div className="w-full h-screen ">
         <table className="w-full h-auto">
            <thead>
                <tr className="gap-4 text-[0.7em] ">
                    <td>Date</td>
                    <td>Asset</td>
                    <td>Amount</td>
                    <td>Price</td>
                    <td>Total Value</td>
                    <td>Action</td>
                </tr>
            </thead>
            <tbody className="text-[0.7em]">
                 {transactionData.map((transaction,index) => (
                    <tr key={index} >
                       <td className="py-2">{new Date(transaction.transaction_date).toLocaleDateString()}</td>
                       <td className="py-2"><img className={'w-8'} src={transaction.crypto_logo} alt="logo" /></td>
                       <td className="py-2">{transaction.quantity}</td>
                       <td className="py-2">{transaction.price_per_coin}</td>
                       <td className="py-2">{transaction.total_value}</td>
                       <td className="py-2"><button onClick={()=>deleteTransaction(transaction.transaction_id)} className="rounded-xl p-2 border bg-red-300 text-red-500 hover:bg-transparent hover:border hover:border-red-500 duration-500 cursor-pointer">Close</button></td>
                    </tr>
))}
            </tbody>
         </table>
     </div>
   </>
   )
}
export default transactionTab