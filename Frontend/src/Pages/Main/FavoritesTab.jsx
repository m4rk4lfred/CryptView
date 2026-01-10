import { useEffect, useState } from "react"

function FavoritesTab(){
    const selectedWallet = localStorage.getItem('selectedWallet')
    const [favoritedItem, setFavoritedItem] = useState([])

 
    useEffect(() => {
      const fetchData = async () =>{
        try {
        const response = await fetch('/backend/fetchFavorites', {
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({
            selected_wallet:selectedWallet
          })
        })
        const data = await response.json()
        setFavoritedItem(data.items)

       
        } catch(error){
           console.log(error)
        }
      }
      fetchData()
    }, favoritedItem)
    return(
        <>
          <div className="w-full h-full  mt-6">
            <table className=" w-full h-full ">
                <thead >
                   <tr >
                     <td className="p-2">#</td>
                     <td className="p-2">Name</td>
                     <td className="p-2">Price</td>
                     <td className="p-2">Total Value</td>
                   </tr>
                </thead>
                <tbody>
                    {favoritedItem.map((items, index) => (
                    
                    <tr key={index+1}>
                     <td className="p-2">{index+1}</td>
                     <td className="p-2">
                       <div className="flex flex-row gap-5">
                          <img className=' w-7' src={items.crypto_logo} alt="logo" />
                          <p className="text-sm">{items.crypto_name}</p>
                          <p>|</p>
                          <p className="text-sm uppercase font-semibold">{items.crypto_symbol}</p>
                       </div>
                     </td>
                     <td className="p-2">{items.price_per_coin}</td>
                     <td className="p-2">${items.total_value}</td>
                   </tr>
                    ))}
                </tbody>
            </table>
          </div>
        </>
    )
}
export default FavoritesTab