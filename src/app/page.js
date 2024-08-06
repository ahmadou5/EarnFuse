'use client'
import { Home2 } from "@/components/Home";
import { Loading } from "@/components/Loading";
import { GlobalContext } from "@/context/AppContext";
import { UseGetTgData } from "@/hooks/useGetUserData";
import { UseGetBalance } from "@/hooks/useGetBalance";
import { UseGetRefferals } from "@/hooks/useGetRefs";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const {isAuth,setIsAuth, tgUser, setTgUser} = GlobalContext()
  const user = UseGetTgData()
  const balance = UseGetBalance()
  const refs =UseGetRefferals()
  //const user = UseGetTgData()
  useEffect(() => {
    const initTg = () => {
      if (
        typeof window !== "undefined" &&
        window.Telegram &&
        window.Telegram.WebApp
      ) {
        console.log("Telegram WebApp is set");
        const tgData = window.Telegram.WebApp;
        console.log('data id',tgData?.initDataUnsafe?.user?.id)
        //setUser(tgData);
        setTgUser(tgData)
      }
    }
    initTg()
    console.log(user,balance,refs)
    const interval = setInterval(() => {
       setIsAuth(true)
    },6000)
    return () => clearInterval(interval)
},[])
  
  return (
    <main className="flex min-h-screen flex-col ">
     {isAuth ? <Home2/> :  <Loading/> }
    </main>
  );
}
