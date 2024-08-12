import { useEffect, useState } from "react";
import { GlobalContext } from "@/context/AppContext";
import { Supabase } from "@/utils/supabasedb";
export const UseGetBoard = () => {
  const { leads,
    userRank,
    userBoard,
    setUserBoad,
    setUserRank,
    setLeads,} = GlobalContext();

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
          .order('balance',{ascending:false ,nullsFirst: false})

          if (data) {
            console.log('leaders',data)
            setLeads(data)
            console.log(id,'is it')
            const filterone = data.find((item) => item.id === id )
            setUserBoad(filterone)
            const filterNumb = data.findIndex((item) => item.id === id )
            setUserRank(filterNumb + 1)
            console.log('user details', filterone)
            console.log('user Rank', filterNumb + 1)
            
            console.log('filtered balance', filterone[0].balance)
            //console.log(reffs,'it is')
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
