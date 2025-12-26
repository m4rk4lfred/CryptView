import { IoMdArrowDropup } from "react-icons/io";

function summaryBox(){
    return(
        <>
          <div data-aos={"fade-right"} className="flex font-poppins h-auto w-full text-primary flex-col bg-[#ad0000b9]  rounded-xl px-5 py-2.5  justify-start items-start md:rounded-md">

             <div>
                <p className="text-[0.80em] ">Fear & Greed Index</p>
             </div>

             <div className="flex flex-row justify-center items-center gap-2 ">
                <h3 className="text-2xl font-bold">68.000000</h3>
                <div className="flex flex-row justify-center px-1 rounded-xl gap-1 items-center bg-[#ad0000c0] ">
                    <IoMdArrowDropup className="text-[#FF0707]"/>
                    <p className="text-[#FF0707] text-[0.70em]">2%</p>
                </div>
             </div>


          </div>
        </>
    )
}
export default summaryBox