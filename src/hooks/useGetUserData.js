import { useEffect } from "react";
import { GlobalContext } from "@/context/AppContext";
export const UseGetTgData = () => {
    const { tgUser, setTgUser } = GlobalContext()
    useEffect(() => {
        function initTg() {
            if (
              typeof window !== "undefined" &&
              window.Telegram &&
              window.Telegram.WebApp
            ) {
              console.log("Telegram WebApp is set");
              const tgData = window.Telegram.WebApp;
              console.log('data id',tgData?.initDataUnsafe?.user?.id)
              setTgUser(tgData);
              return tgData
              setTgUser(tgData);
            } else {
              console.log("Telegram WebApp is undefined, retrying…");
              console.log(user);
              setTimeout(initTg, 500);
            }
          }
          initTg();
    },[])
}