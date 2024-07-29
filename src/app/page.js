'use client'
import { Home2 } from "@/components/Home";
import { Loading } from "@/components/Loading";
import { GlobalContext } from "@/context/AppContext";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const {isAuth,setIsAuth} = GlobalContext()
  const createUser = async() => {
    try {
        const username = tgUser?.initDataUnsafe?.user?.username
        const userId = tgUser?.initDataUnsafe?.user?.id

        const { data,error } = supabase
        .from('Users')
        .insert([
            {id:userId, username:username, pointsAdd: 1}
        ])
        .select()

        if(data) {
            console.log(data)
            alert(data, 'done')
        } 
        if (error) {
            throw error
        }
       } catch (error) {
        console.log(error)
       }
}

  useEffect(() => {
    createUser()
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
