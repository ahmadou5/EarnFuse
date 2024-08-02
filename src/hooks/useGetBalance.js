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
                console.log(sele,'cele ne')
                console.log('hey balance data',data[0].balance)
                console.log(data[0].Tasks,'aeki')
                console.log(data[0].isClick,'counter')
                console.log(data[0].refferals[0].user,'ref')
               
                setUserBalance(data[0].balance)
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