"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IoFlash, IoHome, IoSettings, IoWallet } from "react-icons/io5";
import { GiTwoCoins } from "react-icons/gi";
import { MdSwapHoriz } from "react-icons/md";
import { RiCoinsLine } from "react-icons/ri";
import { BsCoin } from "react-icons/bs";
import { GlobalContext } from "@/context/AppContext";




export const Menu = () => {
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
          className=" w-[93%] ml-auto mr-auto rounded-3xl py-1 px-1.5 z-100 bg-black/45 mb-2  fixed inset-x-0 bottom-1 flex justify-center items-center"
        >
          <div className="lg:py-2.5 py-1.5 lg:px-2.5 px-1.5  mt-auto mb-auto ml-auto mr-auto w-[98%] flex flex-row  h-[90%]">
            <div onClick={() => {
              setIsHistory(false)
              setIsSwap(false)
              setIsTokens(false)
              setIsWallet(true)
            }} className={`h-12 ml-auto mr-auto w-[30%] bg-white/0 flex flex-col items-center justify-center`}>
                 <p size={28} className={`${ isHistory ? 'text-[#448cff]' : 'text-gothic-600/85'} text-2xl`} >📝</p>
                <p className={`font-light mt-1 text-white text-[12px]`}>Tasks</p>
            </div>
            
            <div onClick={() => {
              setIsHistory(false)
              setIsSwap(true)
              setIsWallet(false)
              setIsTokens(false)
            }} className={`h-12 ml-auto mr-auto w-[30%] bg-white/0 flex flex-col items-center justify-center`}>
                <p size={28} className={`${ isHistory ? 'text-[#448cff]' : 'text-gothic-600/85'} text-2xl`} >🚀</p>
                <p className={`font-light mt-1 text-white text-[12px]`}>Boosts</p>
            </div>
            <div onClick={() => {
              setIsHistory(true)
              setIsSwap(false)
              setIsWallet(false)
              setIsTokens(false)
            }}
             className={`h-12 ml-auto mr-auto w-[30%] bg-white/0 flex flex-col items-center justify-center`}>
                <p size={28} className={`${ isHistory ? 'text-[#448cff]' : 'text-gothic-600/85'} text-2xl`} >👩🏽‍🚀</p>
                 <p className={`ffont-light mt-1 text-white text-[12px]`}>Plugs</p>
            </div>
          </div>          
        </div>
      </>
    );
  };