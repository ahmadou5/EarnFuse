import { useEffect, useState } from "react";
import { GlobalContext } from "@/context/AppContext";
import { Supabase } from "@/utils/supabasedb";
export const UseGetRefferals = () => {
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
          .select(`
             *,
             referral (
              *
             )
           `);

          if (data) {
            console.log('reffss',data)
            console.log(id,'is it')
            const filterone = data.filter((item) => item.id === id )
            console.log('fil', filterone)
            setReff(filterone[0].referral)
            console.log('filtered', filterone[0].referral)
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
  }, [userBalance]);
};
