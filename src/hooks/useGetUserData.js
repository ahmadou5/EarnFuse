import { useEffect } from "react";
import { GlobalContext } from "@/context/AppContext";
import { Supabase } from "@/utils/supabasedb";
export const UseGetTgData = () => {
    const { tgUser, setTgUser } = GlobalContext()
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
              setTgUser(tgData);
              try {
                const username = tgData?.initDataUnsafe?.user?.username
                const userId = tgData?.initDataUnsafe?.user?.id
                console.log('starting...........................')
                console.log('id',userId)
                console.log('name',username)
                const { data,error } = await Supabase
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
            } else {
              console.log("Telegram WebApp is undefined, retrying…");
              //console.log(user);
              setTimeout(initTg, 500);
            }
          }
          initTg();
          
    },[])
}