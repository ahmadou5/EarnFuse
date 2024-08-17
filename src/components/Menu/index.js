"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Supabase } from "@/utils/supabasedb";
import { IoFlash, IoHome, IoSettings, IoWallet } from "react-icons/io5";
import { GiTwoCoins } from "react-icons/gi";
import { MdSwapHoriz } from "react-icons/md";
import { RiCoinsLine } from "react-icons/ri";
import { BsCoin } from "react-icons/bs";
import { GameSvg } from "../Svg/GameSvg";
import { TaskSvg } from "../Svg/Task";
import { GlobalContext } from "@/context/AppContext";
import { RefferalSvg } from "../Svg/Refferal";
import { HomeSvg } from "../Svg/HomeSvg";
export const BackMenu = () => {
  const {
    isHome,
    isFrens,
    isTask,
    isBoost,
    setIsBoost,
    setLeads,
    setIsTask,
    setIsGame,
    setIsFrens,
    setIsHome,
  } = GlobalContext();
  return (
    <div
      style={{ "backdrop-filter": "blur(12px)" }}
      className=" w-[60px] h-[60px] ml-5 mr-auto rounded-full px-1.5 z-100 bg-[#046ae2]/65 mb-6 text-white/75  fixed inset-x-0 bottom-1 flex justify-center items-center"
    >
      <div className="lg:py-2.5 py-0 lg:px-2.5 px-1.5  mt-auto mb-auto ml-auto mr-auto w-[98%] flex items-center justify-center  h-[90%]">
        <div
          onClick={() => {
            setIsFrens(false);
            setIsBoost(false);
            setIsHome(true);
            setIsTask(false);
            setIsGame(false);
          }}
          className={`h-11 ml-auto mr-auto w-[90%] bg-white/0 flex flex-col items-center justify-center`}
        >
          <img src="./assets/home.svg" className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

export const Menu = () => {
  const {
    isHome,
    isFrens,
    isTask,
    isBoost,
    tgUser,
    setIsBoost,
    setIsTask,
    setIsFrens,
    setLeads,
    setUserBoad,
    setUserRank,
    isGame,
    setIsGame,
    setIsHome,
  } = GlobalContext();
  const [isWallet, setIsWallet] = useState(true);
  const [isSwap, setIsSwap] = useState(true);
  const [isTokens, setIsTokens] = useState(true);
  const [isHistory, setIsHistory] = useState(true);

  const router = useRouter();
  const handleCopy = (value) => {
    navigator.clipboard.writeText(value).then(
      () => {
        // Successfully copied to clipboard
        setCopy(true);
        setTimeout(() => setCopy(false), 1000);
        alert("address copied to clip Board");
      },
      (err) => {
        // Failed to copy to clipboard
        console.error("Could not copy address: ", err);
      }
    );
  };
  const handleCopy2 = (value) => {
    navigator.clipboard.writeText(value).then(
      () => {
        // Successfully copied to clipboard
        console.log("Address copied to clipboard");
        alert("address copied to clip Board");
      },
      (err) => {
        // Failed to copy to clipboard
        console.error("Could not copy address: ", err);
      }
    );
  };

  const customHandle = async () => {
    try {
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
    } catch (error) {
      console.log(error)
    }
  }
  

  
  return (
    <>
      {/**for mobile view **/}

      {/**for desktop view **/}
      <div
        style={{ "backdrop-filter": "blur(12px)" }}
        className=" w-[100%] ml-auto mr-auto rounded-xl py-2 px-1.5 z-100 bg-black/45  fixed bottom-1 flex justify-center items-center"
      >
        <div className="lg:py-2.5 py-2 lg:px-2.5 px-1.5  mt- mb-auto ml-auto mr-auto w-[98%] flex flex-row  h-[90%]">
          <div
            className={`h-12 ml-auto mr-auto w-[25%] bg-white/0 flex items-center justify-center`}
          >
            <div
              onClick={() => {
                setIsFrens(false);
                setIsGame(false);
                setIsBoost(false);
                setIsHome(false);
                setIsTask(true);
              }}
              className="flex flex-col ml-auto mr-auto items-center justify-center"
            >
              <img src="./assets/task.svg" className="w-7 h-7" />
              <p className={`font-light mt-1 text-white text-[10px]`}>Tasks</p>
            </div>
          </div>

          <div
            className={`h-12 ml-auto mr-auto w-[25%] bg-white/0 flex items-center justify-center`}
          >
            <div
              onClick={() => {
                setIsGame(true);
                setIsFrens(false);
                setIsBoost(false);
                setIsHome(false);
                setIsTask(false);
              }}
              className="flex flex-col ml-auto mr-auto items-center justify-center"
            >
              <img src="./assets/pad.svg" className="w-7 h-7" />
              <p className={`font-light mt-1 text-white text-[10px]`}>Games</p>
            </div>
          </div>
          <div
            className={`h-12 ml-auto mr-auto w-[25%] bg-white/0 flex  items-center justify-center`}
          >
            <div
              onClick={() => {
                setIsGame(false);
                setIsFrens(false);
                setIsBoost(true);
                setIsHome(false);
                setIsTask(false);
                customHandle()
              }}
              className="flex ml-auto mr-auto flex-col items-center justify-center"
            >
              <img src="./assets/board.svg" className="w-7 h-7" />
              <p className={`font-light mt-1 text-white text-[10px]`}>
                Leaderboard
              </p>
            </div>
          </div>
          <div
            className={`h-12 ml-auto mr-auto w-[25%] bg-white/0 flex  items-center justify-center`}
          >
            <div
              onClick={() => {
                setIsFrens(true);
                setIsBoost(false);
                setIsHome(false);
                setIsTask(false);
                setIsGame(false);
              }}
              className="flex ml-auto mr-auto flex-col items-center justify-center"
            >
              <img src="./assets/community.svg" className="w-7 h-7" />
              <p className={`font-light mt-1 text-white text-[10px]`}>Plugs</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
