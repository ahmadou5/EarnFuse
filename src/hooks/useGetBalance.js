import { useEffect, useState } from "react";
import { GlobalContext } from "@/context/AppContext";
import { Supabase } from "@/utils/supabasedb";
export const UseGetBalance = () => {
    const { tgUser, setTgUser,userBalance,setUserBalance } = GlobalContext()
   
    useEffect(() => {
       async function initTg() {
            if (
              typeof window !== "undefined" &&
              window.Telegram &&
              window.Telegram.WebApp
            ) {
              console.log("Telegram WebApp is set");
              const tgData = window.Telegram.WebApp;
              console.log('data id',tgData?.initDataUnsafe?.user?.id)
              
              setTgUser(tgData)
              try {
              console.log(tgUser, 'tg user')
              const { data, error } = await Supabase
              .from('Users')
              .select('*')
              .eq('id',tgData?.initDataUnsafe?.user?.id)

              if(data) {
                const sele = JSON.stringify(data)
                console.log('hey json balance data',JSON.stringify(data))
                console.log('hey balance data',sele.balance)
                setUserBalance(sele.balance)
              }
              if(error) {
                console.log('error',error)
                throw error
              }
                
               } catch (error) {
                console.log(error)
               }
            } else {
              console.log("Telegram WebApp is undefined, retrying…");
              //console.log(user);
              setTimeout(initTg, 500);
            }
          }
          initTg();
         
    },[])
}