"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IoFlash, IoHome, IoSettings, IoWallet } from "react-icons/io5";
import { GiTwoCoins } from "react-icons/gi";
import { MdSwapHoriz } from "react-icons/md";
import { RiCoinsLine } from "react-icons/ri";
import { BsCoin } from "react-icons/bs";
import { GameSvg } from "../Svg/GameSvg";
import { TaskSvg } from "../Svg/Task";
import { GlobalContext } from "@/context/AppContext";
import { RefferalSvg } from "../Svg/Refferal";
import { HomeSvg } from "../Svg/HomeSvg";
export const BackMenu = () => {
  const { isHome,
    isFrens,
    isTask,
    isBoost,
    setIsBoost,
    setIsTask,
    setIsFrens,
    setIsHome
  } = GlobalContext()
  return(
  <div
    style={{ "backdrop-filter": "blur(12px)" }}
    className=" w-[60px] h-[60px] ml-5 mr-auto rounded-full px-1.5 z-100 bg-black/5 mb-6 text-white/75  fixed inset-x-0 bottom-1 flex justify-center items-center"
  >
    <div className="lg:py-2.5 py-0 lg:px-2.5 px-1.5  mt-auto mb-auto ml-auto mr-auto w-[98%] flex items-center justify-center  h-[90%]">
    <div onClick={() => {
              setIsFrens(false)
              setIsBoost(false)
              setIsHome(true)
              setIsTask(false)
            }} className={`h-11 ml-auto mr-auto w-[90%] bg-white/0 flex flex-col items-center justify-center`}>
                 <IoHome size={18} className={`text-sm text-white/70`} />
                
            </div>
    </div>
  </div>
)
}


export const Menu = () => {
   const { isHome,
    isFrens,
    isTask,
    isBoost,
    setIsBoost,
    setIsTask,
    setIsFrens,
    setIsHome
  } = GlobalContext()
   const [isWallet,setIsWallet] = useState(true)
   const [isSwap,setIsSwap] = useState(true)
   const [isTokens,setIsTokens] = useState(true)
   const [isHistory,setIsHistory] = useState(true)
   
    const router = useRouter()
    const handleCopy = (value) => {
      navigator.clipboard.writeText(value).then(
        () => {
          // Successfully copied to clipboard
          setCopy(true);
          setTimeout(  () => 
            setCopy(false),
            1000)
          alert('address copied to clip Board')
        },
        (err) => {
          // Failed to copy to clipboard
          console.error('Could not copy address: ', err);
        }
      );
    }
    const handleCopy2 = (value) => {
      navigator.clipboard.writeText(value).then(
        () => {
          // Successfully copied to clipboard
          console.log('Address copied to clipboard');
          alert('address copied to clip Board')
          
        },
        (err) => {
          // Failed to copy to clipboard
          console.error('Could not copy address: ', err);
        }
      );
    }
    return (
      <>
        {/**for mobile view **/}
        
        {/**for desktop view **/}
        <div
          style={{ "backdrop-filter": "blur(12px)" }}
          className=" w-[100%] ml-auto mr-auto rounded-xl py-1 px-1.5 z-100 bg-black/45 mb-  fixed inset-x-0 bottom-1 flex justify-center items-center"
        >
          <div className="lg:py-2.5 py-1.5 lg:px-2.5 px-1.5  mt- mb-auto ml-auto mr-auto w-[98%] flex flex-row  h-[90%]">
            <div onClick={() => {
              setIsFrens(false)
              setIsBoost(false)
              setIsHome(true)
              setIsTask(false)
            }} className={`h-12 ml-auto mr-auto w-[30%] bg-white/0 flex flex-col items-center justify-center`}>
               <HomeSvg/>
                <p className={`font-light mt-1 text-white text-[10px]`}>Home</p>
            </div>
            
            <div onClick={() => {
             setIsFrens(false)
             setIsBoost(true)
             setIsHome(false)
             setIsTask(false)
            }} className={`h-12 ml-auto mr-auto w-[30%] bg-white/0 flex flex-col items-center justify-center`}>
                 <TaskSvg />
                <p className={`font-light mt-1 text-white text-[10px]`}>Tasks</p>
            </div>
            <div onClick={() => {
              setIsFrens(true)
              setIsBoost(false)
              setIsHome(false)
              setIsTask(false)
            }}
             className={`h-12 ml-auto mr-auto w-[30%] bg-white/0 flex flex-col items-center justify-center`}>
                <RefferalSvg />
                 <p className={`ffont-light mt-1 text-white text-[10px]`}>Plugs</p>
            </div>
          </div>          
        </div>
      </>
    );
  };