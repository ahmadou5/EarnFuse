'use client'
import { Home2 } from "@/components/Home";
import { Loading } from "@/components/Loading";
import { GlobalContext } from "@/context/AppContext";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const {isAuth,setIsAuth ,setUser} = GlobalContext()
  useEffect(() => { 
      console.log('useTelegram')
      function initTg() {
      if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
      console.log('Telegram WebApp is set');
      const tgData = window.Telegram.WebApp
      setUser(tgData);
      } else {
      console.log('Telegram WebApp is undefined, retrying…');
      console.log(user)
      setTimeout(initTg, 500);
      }
      }
      initTg();
    
 
    const interval = setInterval(() => {
       setIsAuth(true)
    },2000)
    return () => clearInterval(interval)
},[])
  
  return (
    <main className="flex min-h-screen flex-col ">
     {isAuth ? <Home2/> :  <Loading/> }
    </main>
  );
}
