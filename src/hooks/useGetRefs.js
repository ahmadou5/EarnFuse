import { useEffect, useState } from "react";
import { GlobalContext } from "@/context/AppContext";
import { Supabase } from "@/utils/supabasedb";
export const UseGetRefferals = () => {
  const { tgUser, setTgUser, userBalance, setUserBalance } = GlobalContext();

  useEffect(() => {
    async function initTg() {
      if (
        typeof window !== "undefined" &&
        window.Telegram &&
        window.Telegram.WebApp
      ) {
        console.log("Telegram WebApp is set");
        const tgData = window.Telegram.WebApp;
        console.log("data id", tgData?.initDataUnsafe?.user?.id);

        setTgUser(tgData);
        try {
          console.log( "tg user refferalss");

          const { data, error } = await Supabase
          .from("Users")
          .select(`
             *,
             referral (
              *
             )
           `);

          if (data) {
            console.log(data)
          }
          if (error) {
            console.log("error", error);
            throw error;
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("Telegram WebApp is undefined, retrying…");
        //console.log(user);
        setTimeout(initTg, 500);
      }
    }
    initTg();
  }, []);
};
