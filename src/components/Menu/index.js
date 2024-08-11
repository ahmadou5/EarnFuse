"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IoFlash, IoHome, IoSettings, IoWallet } from "react-icons/io5";
import { GiTwoCoins } from "react-icons/gi";
import { RiCoinsLine } from "react-icons/ri";
import { BsCoin } from "react-icons/bs";
import { GlobalContext } from "@/context/AppContext";
import { HomeSvg } from "../Svg/HomeSvg";
import { TaskSvg } from "../Svg/Task";
import { RefferalSvg } from "../Svg/Refferal";




export const Menu = () => {
   
   const {
    
   } = GlobalContext()
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
          className=" w-[93%] ml-auto mr-auto rounded-full py-1 px-1.5 z-100  fixed inset-x-0 bottom-1 flex justify-center items-center"
        >
          <div className="lg:py-2.5 py-1.5 lg:px-2.5 px-1.5  mt-auto mb-auto ml-auto mr-auto w-[98%] flex flex-row  h-[90%]">
            <div 
             className={`h-12 ml-auto mr-auto w-[30%] bg-white/0 flex flex-col items-center justify-center`}>
              <div className="bg-white h-12 w-12" onClick={() => {
               alert('Hauwa and Ahmad')
            }}>
              <HomeSvg  />
              <p className={`font-light text-black text-[12px]`}>Home</p>
              </div>
            </div>
            <div className={`h-12 ml-auto mr-auto w-[30%] bg-white/0 flex flex-col items-center justify-center`}>
               <TaskSvg  onClick={() => {
               alert('Hauwa and Ahmad')
            }}/>
                <p className={`font-light text-black text-[12px]`}>Tasks</p>
            </div>
            
            <div className={`h-12 ml-auto mr-auto w-[30%] bg-white/0 flex flex-col items-center justify-center`}>
               <RefferalSvg  onClick={() => {
               alert('Ahmad')
            }} />
                <p className={`font-light text-black text-[12px]`}>Plugs</p>
            </div>
       
          </div>          
        </div>
      </>
    );
  };