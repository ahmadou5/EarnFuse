'use client'
import { Home2 } from "@/components/Home";
import { Loading } from "@/components/Loading";
import { GlobalContext } from "@/context/AppContext";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const {isAuth,setIsAuth} = GlobalContext()
  useEffect(() => {
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
