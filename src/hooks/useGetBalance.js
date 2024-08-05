import { useEffect, useState } from "react";
import { GlobalContext } from "@/context/AppContext";
import { Supabase } from "@/utils/supabasedb";
export const UseGetBalance = () => {
    const { tgUser, setTgUser,userBalance,setUserBalance } = GlobalContext()
   
    useEffect(() => {
      const test = async() => {
          try {
            const {data, error} = await SupabaseClient
            .from('refferal')
            .insert([{ refkey : `${refID}-${message.from.username}`, refId:`${refID}`, referId: `${message.from.id}` }])
            .select('*')

            if(data) {
              console.log(data)
            }
            if(error) {
              throw error
            }
          } catch (error) {
            console.log(error)
          }
         
      }
      test()
      async function inittest() {
        if (
          typeof window !== "undefined" &&
          window.Telegram &&
          window.Telegram.WebApp
        ) {
          console.log("Telegram WebApp is set");
          const tgData = window.Telegram.WebApp;
          console.log('data id',tgData?.initDataUnsafe?.user?.id)
          
         // setTgUser(tgData)
          try {
            console.log('Testingggg.....................')
            const refID = tgData?.initDataUnsafe?.user?.id
            const ref = tgData?.initDataUnsafe?.user?.username
            const {data, error} = await SupabaseClient
            .from('refferal')
            .insert([{ refkey : `${refID}-${ref}`, refId:`${refID}`, referId: `${ref}` }])
            .select('*')

            if(data) {
              console.log(data)
            }
            if(error) {
              throw error
            }
          } catch (error) {
            console.log(error,'testing error')
          }
        } else {
          console.log("Telegram WebApp is undefined, retrying…");
          //console.log(user);
          setTimeout(initTg, 500);
        }
      }
      inittest()
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
                console.log(data[0].refferals,'ref')
               
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