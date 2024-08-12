import { useEffect, useState } from "react";
import { GlobalContext } from "@/context/AppContext";
import { Supabase } from "@/utils/supabasedb";
export const UseGetBoard = () => {
  const { tgUser, setTgUser, userBalance,userData,setUserData, setUserBalance ,reffs,
    setReff, } = GlobalContext();

  useEffect(() => {
    async function initTg() {
      if (
        typeof window !== "undefined" &&
        window.Telegram &&
        window.Telegram.WebApp
      ) {
        console.log("Telegram WebApp is set");
        const tgData = window.Telegram.WebApp;
        console.log("data the first id", tgData?.initDataUnsafe?.user?.id);
        const id = tgData?.initDataUnsafe?.user?.id.toString()

        console.log( "tg user refferalss",id);

         const { data, error } = await Supabase
          .from("Users")
          .select('*')
          .order('balance',{ascending:false, nullsFirst: false})

          if (data) {
            console.log('leaders',data)
           
          }
          if (error) {
            //console.log("error", error);
            throw error;
          }
       
      } else {
        //console.log("Telegram WebApp is undefined, retrying…");
        //console.log(user);
        setTimeout(initTg, 500);
      }
    }
    initTg();
  }, []);
};
