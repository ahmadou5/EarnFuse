import { GlobalContext } from "@/context/AppContext"
import { useState } from "react"
import Confetti from "react-confetti"
//import { useGetUserId } from "@/hooks/useGetUserId"

export const ClaimModal = () => {
    const [claim,setClaim] = useState(false)
    const { isClaimModal,setIsClaimModal,taskURL,setTaskURL,taskName, taskButton,setTaskButton, taskAmount } = GlobalContext()
    return(
    <div className="inset-0 fixed bg-white/0 bg-opacity-100 w-[100%] z-[99999999] min-h-screen h-auto backdrop-blur-sm flex ">
        <div className="w-[100%] flex items-center px-3 justify-center">
            <div className="h-[290px] ml-auto mr-auto py-2 px-2 w-[89%] bg-white/75  border-[#448cff]/90 border rounded-xl">
            {
                claim ? <div className="mt-5 ml-auto mr-auto flex flex-col items-center justify-center text-center">
                <Confetti className='w-[100%] h-[100%]' wind={true} /> 
                <p className="text-center text-black font-light text-[20px] mb-6">{`${'Claim'}`} </p>
                <div className="w-[80%] mb-2 ml-auto mr-auto py-1 px-3 flex  items-center justify-center rounded-full h-9">
                  <p className="text-black/85 text-[18px] font-light ml-auto mr-auto ">{'You Just Created a Solana Wallet'}</p>
                </div>
                <div onClick={() => {
                    window.open(taskURL)
                    }} className="w-[175px] mt-6  ml-auto mr-auto py-1 px-3 text-white border  border-[#448cff]/60 flex  items-center justify-center bg-[#448cff]/90 rounded-full h-9">
                  <p>Claim</p>
                </div>
            </div> : <div className="mt-5 ml-auto mr-auto flex flex-col items-center justify-center text-center">
                <p className="text-center text-black font-light text-[20px] mb-6">{`${taskName}`} </p>
                <div className="w-[80%] mb-2 ml-auto mr-auto py-1 px-3 flex  items-center justify-center rounded-full h-9">
                  <p className="text-black/85 text-[18px] font-light ml-auto mr-auto ">{'You Just Created a Solana Wallet'}</p>
                </div>
                <div onClick={() => {
                    window.open(taskURL)
                    setTimeout(() => {
                        setClaim(true)
                      }, 1000);
                    
                    }} className="w-[175px] mt-6  ml-auto mr-auto py-1 px-3 text-white border  border-[#448cff]/60 flex  items-center justify-center bg-[#448cff]/90 rounded-full h-9">
                  <p>{taskButton}</p>
                </div>
            </div>
            }
            
            </div>
        </div>
    </div>
    )
}