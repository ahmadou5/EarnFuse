import { useEffect, useState } from "react";
import { GlobalContext } from "@/context/AppContext";
import { Supabase } from "@/utils/supabasedb";
export const UseGetTgData = () => {
    const { tgUser, setTgUser, lastClaim,setLastClaim } = GlobalContext()
    const [user,setUser] = useState(null)
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
              setUser(tgData);
              setTgUser(tgData)
              try {
                const username = tgData?.initDataUnsafe?.user?.username
                const userId = tgData?.initDataUnsafe?.user?.id
                console.log('starting.........................1111111.')
                console.log('id',userId)
                console.log(tgData,'DATAAA')
                console.log('name',username)
                const { data,error } = await Supabase
                .from('Users')
                .insert([
                    {id:userId, username:username, pointsAdd: 1,lastRewardClaim: 1723071600}
                ])
                .select()
    
                if(data) {
                    console.log(data)
                    //alert(data, 'done')
                } 
                if (error) {
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
          const getUserBalance = async () => {

              console.log(tgUser, 'tg user')
              const { data, error } = await Supabase
              .from('Users')
              .select('*')
              .eq('id',tgUser?.initDataUnsafe?.user?.id)

              if(data) {
                console.log('hey',data)
              }
              if(error) {
                console.log('error',error)
                throw error
              }
             
            }
          getUserBalance()
    },[])
}