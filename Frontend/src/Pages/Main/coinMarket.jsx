import { td, tr } from "motion/react-client";
import { useEffect, useState } from "react"
import { FaStar , FaRegStar } from "react-icons/fa";

import ReactPaginate from 'react-paginate';
function coinMarket(){
   const [isFavorite,setFavorite] = useState([])
   const [currentPage, setPage] = useState(1)
   const selectedWallet = localStorage.getItem('selectedWallet')
   const handlePagination = (data) =>{
      setPage(data.selected + 1)
   }

   const handleFavorites = (data) =>{
      const isCurrentlyFavorited = isFavorite.includes(data.id)
      setFavorite((prev => prev.includes(data.id) ? prev.filter((f) => f!==data.id ): [...prev, data.id ]))
            
      if(!isCurrentlyFavorited){
        addFavorite(data)
      }
   }

   const addFavorite = async (data) => {
      try{
       const response = await fetch('/backend/addFavorite', {
         method:'POST',
         headers:{
            'Content-Type':'application/json'
         },
         body: JSON.stringify({
            wallet_id: selectedWallet,
            crypto_name : data.name,
            crypto_symbol : data.symbol,
            crypto_logo: data.image,
            price_per_coin: data.current_price,
            total_value: data.market_cap
         })
       })
       if(!response.ok){
         console.log(response.status)
       }

       const fetched = await response.json()
       console.log(fetched.message)
      }
      catch(error){
         console.log(data['wallet_id'])
      }
   }
   const [marketData , setMarketData] = useState([])
   useEffect(() => {
    const fetchMarketData = async () =>{
        try {
          const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=9&page=${currentPage}`,{
            method:'GET',
            headers:{
             'x-cg-demo-api-key': 'CG-7a1Ju6uoaAhZbKGq1tPJvehN',
            }
          })
          const data = await response.json()
          console.log(`Fetched coin from the market: ${data}`)
          setMarketData(data)
        } catch (error) {
            console.log('Failed to fetch data')
        }
    }
    fetchMarketData()

   },[currentPage])
   
   return(
    <>
    <div className="w-full h-full px-4">
      <table className=" w-full h-auto text-sm mt-4 px-4 font-light ">
        <thead>
         <tr className=" w-full h-auto">
            <th className='text-left p-2'><FaStar className="text-transparent text-stroke"/></th>
            <th className='text-left p-2'>#</th>
            <th className='text-left p-2'>Name</th>
            <th className='text-right p-2'>Price</th>
            <th className='text-right p-2'>Market Cap</th>
            <th className='text-right p-2'>24H</th>
         </tr>
         </thead>
<tbody>
{marketData.map((data , index)=>(
   <tr key={data.id}>
      <td onClick={(e) => handleFavorites(data)} className="p-2 text-center">{isFavorite.includes(data.id)? <FaStar/>:<FaRegStar/> }</td>
      <td className="p-2 text-left">{data.market_cap_rank}</td>
      <td className="p-2 text-left flex flex-row justify-start items-center gap-2">
         {data.name}  <span className="text-xl hidden md:flex">|</span>  ({data.symbol.toUpperCase()})
         <img src={data.image} alt={data.name} className="size-5" />
      </td>
      <td className="p-2 text-right">${data.current_price?.toLocaleString()}</td>
      <td className="p-2 text-right">${data.market_cap?.toLocaleString()}</td>
      <td className="p-2 text-right">{data.price_change_24h?.toFixed(2)}%</td>
      
   </tr>
))}
</tbody>
      </table>
      <ReactPaginate 
      className=" flex flex-row cursor-pointer justify-center items-center mt-7 gap-4"
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={handlePagination}
      pageCount={250} 
      previousLabel="<"
      nextLabel=">"
      />
      </div>
    </>
   )
}
export default coinMarket