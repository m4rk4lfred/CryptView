
function cryptoLabelBox({logo , text}){

   return(
    <>
    
        <div  className={`flex min-w-25 min-h-25 my-5 mx-2 justify-center items-center `}>
            <div className="bg-[#d9d9d97e]  w-full h-13 flex p-4 justify-center items-center gap-2 rounded-xl ">
              <img className='w-5' src={logo} alt="logo.png" />
              <p className="text-[0.5em] font-normal text-[#737373] dark:text-primary">{text}</p>
            </div>

        </div>
    </>
   )
}
export default cryptoLabelBox