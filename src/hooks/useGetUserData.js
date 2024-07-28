import { useEffect } from "react";

export const UseGetTgData = () => {
    useEffect(() => {
        function initTg() {
            if (
              typeof window !== "undefined" &&
              window.Telegram &&
              window.Telegram.WebApp
            ) {
              console.log("Telegram WebApp is set");
              const tgData = window.Telegram.WebApp;
              console.log(tgData)
              return tgDatas
              //setUser(tgData);
            } else {
              console.log("Telegram WebApp is undefined, retrying…");
              console.log(user);
              setTimeout(initTg, 500);
            }
          }
          initTg();
    },[])
}