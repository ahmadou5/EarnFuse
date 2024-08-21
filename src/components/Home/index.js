'use client'
import { IoSettings, IoWallet } from "react-icons/io5";
import { BackMenu, Menu } from "../Menu";
import { GlobalContext } from "@/context/AppContext";
import { useEffect, useState, useCallback } from "react";
import { handleCopy } from "@/utils/use";
import { useUtils, useViewport, useInitData } from "@telegram-apps/sdk-react";
import { UseGetTgData } from "@/hooks/useGetUserData";
import { keyframes } from "@emotion/react";
import Confetti from "react-confetti";
import { ClaimModal } from "../Modals/ClaimModal";
import useWindowSize from "react-use/lib/useWindowSize";
import { Supabase } from "@/utils/supabasedb";
import { BoostModal } from "../Modals/BoostModal";
import { retrieveLaunchParams } from "@telegram-apps/sdk";
import Image from "next/image";

export const Home2 = () => {
  //const utils = useUtils()
  const [canClaim, setCanClaim] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [time2, setTime2] = useState("");
  const [claimVal, setClaimVal] = useState(500);
  
  const utils = useUtils();
 
  const { width, height } = useWindowSize();
  const {
    isHome,
    isFrens,
    isTask,
    taskName,
    isGame,
    setIsGame,
    taskType,
    setTaskType,
    taskAmount,
    isConfe,
    reffs,
    setReff,
    userData,
    setIsConfe,
    isBoostModal,
    setUserBalance,
    lastClaim,
    leads,
    userRank,
    userBoard,
    isFirst, 
    setIsFirst,
    setLastClaim,
    setIsBoostModal,
    setTaskAmount,
    setLeads,
    taskButton,
    setUserRank,
    setUserBoad,
    setTaskButton,
    taskURL,
    taskId,
    setTaskId,
    setTaskURL,
    setTaskName,
    isBoost,
    tgUser,
    setUserData,
    tasks, 
    setTask,
    setTgUser,
    isClaimModal,
    claimedTask, 
    setClaimedTask,
    setIsClaimModal,
    userBalance,
  } = GlobalContext();
  const [countDown, setCountDown] = useState(false);
  const [claimMode, setClaimMode] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const [points, setPoints] = useState(0);
  const [energy, setEnergy] = useState(20);
  const [clicks, setClicks] = useState([]);
  //const [tasks, setTask] = useState([]);
  //const [claimedTask, setClaimedTask] = useState([]);
  const date = new Date();
  const pointsAdd = 1;
  const EnergyRemove = 1;

  const handleClick = (e) => {
    if (energy - EnergyRemove < 0 && points >= 20) {
      setClaimMode(true);
      setCountDown(true);
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPoints(points + pointsAdd);
    setEnergy(energy - EnergyRemove < 0 ? 0 : energy - EnergyRemove);
    setClicks([...clicks, { id: Date.now(), x, y }]);
  };
  console.log('userData',userData);
  console.log('tgUser',tgUser)
  //console.log(lastClaim,'last')
  const handleAnimationEnd = (id) => {
    setClicks((prevClick) => prevClick.filter((click) => click.id !== id));
  };
  const sharelink = () => {
    utils.shareURL(
      refLink,
      "Its Fuse Earning Time! Join and Start Farming Fuse Points now!🎁"
    );
  };

  const refLink = `https://t.me/InFuseTapbot?start=${tgUser?.initDataUnsafe?.user?.id}`;
  const updateTimestamp = async () => {
    try {
      const currentTime = date.getTime();
      const { data, error } = await Supabase.from("users")
        .update({ lastRewardClaim: currentTime })
        .eq("id", tgUser?.initDataUnsafe?.user?.id);

      if (data) {
        //console.log("updated time", data);
      }
      if (error) {
        throw error;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getLastClaim = async () => {
    const { data, error } = await Supabase.from("users")
      .select("*")
      .eq("id", userData[0].id);

    if (data) {
      //const sele = JSON.stringify(data);
      setLastClaim(data[0].lastRewardClaim);
    }
    if (error) {
      console.log("error", error);
    }
  };
  const updateClaimBalance = async () => {
    try {
      const { data, error } = await Supabase.from("users")
        .update({ balance: accumulative(userBalance, claimVal) })
        .eq("id", tgUser?.initDataUnsafe?.user?.id);

      if (data) {
     //   console.log("updated", data);
      }
      if (error) {
        throw error;
      }
    } catch (error) {
      console.log(error);
    }
  };


 
  function formatTimeRemaining(milliseconds) {
    if (milliseconds <= 0) {
      return "";
    }

    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    const remainingSeconds = seconds % 60;
    const remainingMinutes = minutes % 60;
    const remainingHours = hours % 24;

    const timeString = [];
    if (days > 0) {
      timeString.push(`${days}d`);
    }
    if (remainingHours > 0) {
      timeString.push(`${remainingHours}h`);
    }
    if (remainingMinutes > 0) {
      timeString.push(`${remainingMinutes}m`);
    }
    //timeString.push(`${remainingSeconds}s`);
    //setTimeString(timeString.join(' '))
    return timeString.join(" ");
  }

  const getTime = async () => {
    const currentTime = date.getTime();
    const cooldownTime = 24 * 60 * 60 * 1000; //
    console.log("korrent", currentTime);
    const timeDiff = currentTime - lastClaim;
    if (timeDiff >= cooldownTime) {
      setCanClaim(true);
    } else {
      setTimeRemaining(cooldownTime - timeDiff);
    }
    //const twelveHoursInMs = 12 * 60 * 60 * 1000;
    const converted = date.getUTCHours(timeDiff);

    return converted;
  };

  const handleUpdatedBalance = async () => {
   // console.log('balance updateee')
    try {
      if (
        typeof window !== "undefined" &&
        window.Telegram &&
        window.Telegram.WebApp
      ) {
       // console.log("Telegram WebApp is set");
        const tgData = window.Telegram.WebApp;
        //console.log("data the first id", tgData?.initDataUnsafe?.user?.id);
        const id = tgData?.initDataUnsafe?.user?.id;

      //  console.log("task dlllll id", id);

        const { data, error } = await Supabase.from("users")
        .select("*")
        .eq("id", id);

        if (data) {
       // const sele = JSON.stringify(data);
        //console.log(sele, "cele ne");
        console.log("hey balance data", data[0]);
        console.log(data[0].id, "aeki");
        setUserData(data);
        //setLastClaim(data[0].lastRewardClaim)
        setUserBalance(data[0].balance)
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
      console.log(error);
    }
   
  };
  const customHandleDone = async () => {
    try {
      if (
        typeof window !== "undefined" &&
        window.Telegram &&
        window.Telegram.WebApp
      ) {
      //  console.log("Telegram WebApp is set");
        const tgData = window.Telegram.WebApp;
     //   console.log("data the first id", tgData?.initDataUnsafe?.user?.id);
        const id = tgData?.initDataUnsafe?.user?.id.toString();

       // console.log("task id", id);

        const { data, error } = await Supabase.rpc("get_claimed_tasks", {
          userid: id,
        });

        if (data) {
          console.log("wahala Claimed task", data);
          setClaimedTask(data);
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
      console.log(error);
    }
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
       // console.log("data the first id", tgData?.initDataUnsafe?.user?.id);
        const id = tgData?.initDataUnsafe?.user?.id.toString();

       // console.log("task id", id);

        const { data, error } = await Supabase.rpc("get_unclaimed_tasks", {
          userid: id,
        });

        if (data) {
          console.log("wahala task", data);
          setTask(data);
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
      console.log(error);
    }
  };
  

  const handleUpdateBoard = async () => {
    try {
      const id = tgUser?.initDataUnsafe?.user?.id;
      console.log("boarddddddddd");
      if (
        typeof window !== "undefined" &&
        window.Telegram &&
        window.Telegram.WebApp
      ) {
       // console.log("Telegram WebApp is set");
        const tgData = window.Telegram.WebApp;
      //  console.log("data the first id", tgData?.initDataUnsafe?.user?.id);
        const id = tgData?.initDataUnsafe?.user?.id.toString();

       // console.log("tg user refferalss   ", id);

        const { data, error } = await Supabase.from("users")
          .select("*")
          .order("balance", { ascending: false, nullsFirst: false });

        if (data) {
          console.log("leaders here", data);
          setLeads(data);
          console.log('data set')
      //    console.log(id, "is it here");
          const filterone = data?.find((item) => item.id === id);
          setUserBoad(filterone);
          const filterNumb = data.findIndex((item) => item.id === id);
          setUserRank(filterNumb + 1);
          console.log("user details", filterone);
          console.log("user Rank", filterNumb + 1);
          
          // console.log('filtered balance', filterone[0].balance)
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
       
        
     
  };

  const getLevel = (referralCount) => {
    if (referralCount >= 50) {
      return 5;
    } else if (referralCount >= 15) {
      return 4;
    } else if (referralCount >= 10) {
      return 3;
    } else if (referralCount >= 7) {
      return 2;
    } else if (referralCount >= 5) {
      return 1;
    } else {
      return 0; // Or handle users with less than 5 referrals as needed
    }
  }

  const getPoints = (length) => {
    if (length < 5) {
      return 100000;
    } else if (length >= 5) {
      return 100000;
    } else if (length >= 10) {
      return 200000;
    }
  };
  const handleClaim = async () => {
    updateClaimBalance();
    updateTimestamp();
    getLastClaim();
    setCanClaim(false);
    handleUpdatedBalance();
    handleUpdateBoard();
    getTime();
  };
  const boost = [
    {
      boostName: "Multi Tap",
      amount: 100000,
      boostType: "booster",
    },
    {
      boostName: "Robot222",
      amount: 100000,
      boostType: "booster",
    },
    {
      boostName: "Tap",
      amount: 100000,
      boostType: "daily",
    },
  ];
  const accumulative = (a, b) => {
    return a + b;
  };

  useEffect(() => {
    getTime();
    customHandle();
    customHandleDone();
  }, []);
  

  function getTaskUrl(typeImg) {
    if (typeImg === 'TG') {
      return './assets/tg.svg'
    } else if (typeImg === 'X') {
      return './assets/x.png';
    } else if (typeImg === 'YT') {
      return './assets/yt.svg';
    }
     return
  }

  const todo1 = [];
  return (
    <div>
      {isGame && (
        <>
          <div className="bg-gothic-950/0 mt-0 flex bg-slate-600/0 flex-col w-[100%] h-auto">
            <div className="w-[100%] bg-black/0">
              <div className="flex flex-col items-center mt-2 justify-center">
                <img src="./assets/pad.svg" className="w-16 h-16 mt-0.5" />
                <p className="text-white/70 font-extrabold">Games</p>
              </div>
              <div className="mt-5 py-2 flex flex-col items-center justify-center">
                <div className="flex items-center justify-center">
                  <img
                    className="h-16 w-16 ml-auto mr-1 "
                    src="./assets/show.png"
                  />
                  <p className="text-4xl ml-1 text-white mr-auto font-bold ">
                    {accumulative(userBalance, points)?.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex flex-grow items-center justify-center">
                {countDown ? (
                  <div className=" rounded-full">
                    <img
                      src="./assets/sol.png"
                      onClick={() => alert("wait for the Countedown")}
                      className="w-[270px] bg-black/0 rounded-full h-[270px]"
                    />
                    {clicks.map((click) => (
                      <>
                        <div
                          key={click.id}
                          className="absolute text-5xl text-white/70 font-light opacity-0 float-start ease-out"
                          style={{
                            top: `${click.y + 150}px`,
                            left: `${click.x + 20}px`,
                            animation: `float 1s ease-out`,
                          }}
                          onAnimationEnd={() => handleAnimationEnd(click.id)}
                        >
                          {`+${pointsAdd}`}
                        </div>
                      </>
                    ))}
                  </div>
                ) : (
                  <div className=" rounded-full">
                    <img
                      src="./assets/sol.png"
                      onClick={handleClick}
                      className="w-[270px] bg-black/0 rounded-full h-[270px]"
                    />
                    {clicks.map((click) => (
                      <>
                        <div
                          key={click.id}
                          className="absolute text-5xl text-white/70 font-light opacity-0 float-start ease-out"
                          style={{
                            top: `${click.y + 150}px`,
                            left: `${click.x + 20}px`,
                            animation: `float 1s ease-out`,
                          }}
                          onAnimationEnd={() => handleAnimationEnd(click.id)}
                        >
                          {`+${pointsAdd}`}
                        </div>
                      </>
                    ))}
                  </div>
                )}
              </div>
              <div className="w-[100%] mt-5 mb-16 flex flex-col items-center justify-center">
                <div className="mb-2 text-white">{`${energy}/20`}</div>
                <div className="bg-white/90 rounded-xl h-3 w-[80%]">
                  <div
                    className="bg-blue-500/50 rounded-full h-[100%]"
                    style={{ width: `${(energy / 20) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <BackMenu />
            {claimMode && (
              <div className="inset-0 fixed bg-white/0 bg-opacity-100 w-[100%] z-[99999999] min-h-screen h-auto backdrop-blur-sm flex ">
                <div className="w-[100%] flex items-center px-3 justify-center">
                  <div className="h-[220px] ml-auto mr-auto py-2 px-2 w-[89%] bg-white/75  border-[#448cff]/90 border rounded-xl">
                    {
                      <div className="mt-5 ml-auto mr-auto flex flex-col items-center justify-center text-center">
                        <div className="w-[80%] mb-2 ml-auto mr-auto py-1 px-3 flex  items-center justify-center rounded-full mt-8 h-9">
                          <p className="text-black/85 text-[18px] font-light ml-auto mr-auto ">{`Claim Your ${points} Fuse Points`}</p>
                        </div>
                        <div
                          onClick={() => {
                            setClaimMode(false);
                            //handleUpdatedBalance()
                            handleUpdateBoard();
                            updateBalance();
                          }}
                          className="w-[175px] mt-6  ml-auto mr-auto py-1 px-3 text-white border  border-[#448cff]/60 flex  items-center justify-center bg-black/90 rounded-full h-9"
                        >
                          <p>{"Claim"}</p>
                        </div>
                      </div>
                    }
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
      {isHome && (
        <>
          
          <div className="bg-gothic-950/0 mt-0 flex bg-slate-600/0 flex-col w-[100%] h-auto">
            <div className="w-[100%] bg-black/0">
              <div className="w-[100%] h-12 px-2 mt-2 py-3 flex">
                <div className="ml-2 mr-auto">
                  <p className="text-[18px] font-bold  text-white/75">
                    EarnFuse
                  </p>
                </div>
                <div className="ml-auto py-0 mr-2 flex">
                  
                  <Image src={'./assets/setting.svg'} className="ml-4 w-[30px] h-[30px] mb-2.5  text-white/75 mr-2 text-[20px]" />
                </div>
              </div>
              <div className="w-[100%] mt-3 flex  text-white/75 items-center justify-center flex-col h-auto">
                {/** <div className="mb-2 mt-0.5 rounded-lg p-2 bg-white/15 w-[95%] h-[80px]">
                  <button></button>
                </div>  */}
                <div className="w-[100%] flex  text-white/75 items-center  flex-col justify-center mt-7">
                  <div className="flex items-center text-2xl justify-center text-white/80 font-extrabold w-[130px] h-[130px] bg-black/70 rounded-full">
                    {`${tgUser?.initDataUnsafe?.user?.username[0]}${
                      tgUser?.initDataUnsafe?.user?.username[
                        Math.floor(
                          tgUser?.initDataUnsafe?.user?.username?.length / 3
                        )
                      ]
                    }`}
                  </div>
                  <div>
                    <p className="font-bold text-[23px] mt-7">{`Hi ${tgUser?.initDataUnsafe?.user?.username}`}</p>
                  </div>
                </div>
              </div>
              <div className="mt-3 py-2 flex flex-col items-center justify-center">
                <div className="flex items-center justify-center">
                 {/** <img
                    className="h-16 w-16 ml-auto mr-1 "
                    src="./assets/show.png"
                  />  */}
                  <p className="text-4xl ml-1 text-white mr-auto font-bold ">
                    {`${accumulative(userBalance, points)?.toLocaleString()} FUSE`}
                  </p>
                </div>
              </div>
              <div className="w-[100%] mt-[30px] mb-[80px] flex items-center justify-center">
                {canClaim ? (
                  <>
                    <div
                      onClick={() => {
                        handleClaim();
                        setCanClaim(false);
                        setClaimed(true);
                        getTime()
                      }}
                      className="bg-[#046ae2]  w-[90%] rounded-2xl text-white flex items-center justify-center h-[52px]"
                    >
                      <div className="text-xl">Claim now</div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bg-black/30 w-[90%] rounded-2xl text-white py-2 flex items-center justify-center h-[52px]">
                      <div className="text-[17px] mt-1 ml-auto mr-3 font-light text-white/70">
                        {"Claim Available in"}
                      </div>
                      <div className="text-[21px] ml-3 mr-auto flex text-blue-500/70 font-extrabold">
                        {" "}
                        {`${
                          timeRemaining === 0
                            ? "23h 59m"
                            : formatTimeRemaining(timeRemaining)
                        }`}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            {isFirst && (
                 <div className="inset-0 fixed bg-black/5 bg-opacity-100 w-[100%] z-[99999999] min-h-screen h-auto backdrop-blur-sm flex ">
                 <div className="w-[100%] py-4 px-4 bg-black/95 rounded-t-2xl h-auto mt-[55%]">
                   <div className="">
                    
                   </div>
                         <div className="mt-5 ml-auto mr-auto flex flex-col items-center justify-center text-center">
                           <div className="mt-[20%] mb-4 flex items-center justify-center">
                             <p className="text-white font-bold text-[21px]">Welcome to EarnFuse</p>
                           </div>
                           <div className="w-[80%] mb-[40%] ml-auto mr-auto py-1 px-3 flex  items-center justify-center rounded-full mt-[20%] h-9">
                             <p className="text-white/85 text-[28px] font-light ml-auto mr-auto ">{`Welcome Bonus ${800} FUSE`}</p>
                           </div>
                           <div
                              onClick={() => {
                              setIsFirst(false)
                              handleUpdateBoard()
                              handleUpdatedBalance()
                             }}
                             className="w-[290px] mt-auto mb-[10%]  ml-auto mr-auto py-1 px-3 text-white  flex  items-center justify-center bg-[#046ae2]  rounded-2xl h-11"
                           >
                             <p>{"Close"}</p>
                           </div>
                         </div>
                 </div>
               </div>
                   
              )}
            <Menu />
          </div>
          {claimed && (
          <div className="inset-0 fixed bg-black/5 bg-opacity-100 w-[100%] z-[99999999] min-h-screen h-auto backdrop-blur-sm flex ">
          <div className="w-[100%] py-4 px-4 bg-black/95 rounded-t-2xl h-auto mt-[55%]">
            <div className="">
             
            </div>
                  <div className="mt-5 ml-auto mr-auto flex flex-col items-center justify-center text-center">
                    <div className="mt-[20%] mb-4 flex items-center justify-center">
                      <p className="text-white font-bold text-[21px]">You claim your daily reward</p>
                    </div>
                    <div className="w-[80%] mb-[40%] ml-auto mr-auto py-1 px-3 flex  items-center justify-center rounded-full mt-[20%] h-9">
                      <p className="text-white/85 text-[28px] font-light ml-auto mr-auto ">{`${claimVal} FUSE`}</p>
                    </div>
                    <div
                       onClick={() => {
                        handleUpdateBoard();
                        handleUpdatedBalance();
                        setCanClaim(false)
                        setClaimed(false);
                      }}
                      className="w-[290px] mt-auto mb-[10%]  ml-auto mr-auto py-1 px-3 text-white  flex  items-center justify-center bg-[#046ae2]  rounded-2xl h-11"
                    >
                      <p>{"Close"}</p>
                    </div>
                  </div>
          </div>
        </div>
            
          )}
        </>
      )}
      {isFrens && (
        <>
          <div className="bg-gothic-950/0 mt-0 flex p-3 bg-slate-600/0 flex-col w-[100%] h-auto">
            <div className="w-[100%] h-12 px-2 mt-5 mb-4 py-3 flex justify-center items-center">
              <div className="flex flex-col items-center mt-2 justify-center">
                <img
                  src="./assets/community.svg"
                  className="w-16 h-16 mt-0.5"
                />
                <p className="text-white/70 font-extrabold">Frens</p>
              </div>
            </div>
            <div className="w-[100%] h-[70px] px-2 mt-4 py-3 flex">
              <div className="w-[100%] flex items-center justify-center">
                <p className="text-[25px] mb-2 mt-7 font-extrabold  text-white/75">
                  invite frens, earn points!
                </p>
              </div>
            </div>
            <div className="w-[100%] h-[150px] bg-blue-700/0 px-2 mt-8 p-4 flex">
              <div className="w-[100%] flex h-[100%] text-white bg-white/5 rounded-xl">
                <div className="w-[100%] py-3 px-3 ">
                  <div className="flex w-[100%] ">
                    <div className="flex w-[100%] ml-2 py-2 mr-">
                      <div className="bg-black/15 h-[74px] flex items-center flex-col justify-center mt-0 w-[74px] rounded-xl">
                        <div className="text-3xl font-bold text-white">
                          {reffs && getLevel(reffs.length)}
                        </div>
                        <p className="text-sm mt-0.5 font-bold text-white">
                          Level
                        </p>
                      </div>
                      <div className="flex ml-auto mr-auto w-[80%] bg-white/0 items-center justify-center">
                        <p className="text-2xl mt-2 ml-4 mr-auto text-white font-extrabold">{`Frens`}</p>
                        <p className="text-4xl mt-1 ml-auto mr-8 text-white font-extrabold">{`${
                          reffs && reffs.length
                        }`}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[100%] mt-4 ">
              <div className="h-20 w-[98%] px-2 rounded-2xl flex items-center justify-center bg-black/25">
                <p className="text-[16px] flex items-center justify-center ml-auto mr-auto text-center text-white font-light">
                  {refLink}
                </p>
              </div>
            </div>
            <div className="w-[100%] h-[150px] bg-blue-700/0 px-2 mt-8 p-4 flex">
              <div className="w-[100%] p-4 flex h-[100%] text-white bg-white/0 rounded-xl">
                <div
                  onClick={() => sharelink()}
                  className="w-[45%] flex mr-auto items-center justify-center h-14 bg-[#046ae2]  border-white/70 border-2 bg-black/0 rounded-3xl"
                >
                  <p className="text-[18px] font-bold">Invite Frens</p>
                </div>
                <div
                  onClick={() =>
                    handleCopy(
                      `${refLink} Its Fuse Earning Time! Join and Start Farming Fuse Points now!🎁`
                    )
                  }
                  className="w-[45%] ml-auto flex items-center justify-center h-14 border-2 border-white/70 bg-black/0 rounded-3xl"
                >
                  <p className="text-[18px] font-bold">Copy Link</p>
                </div>
              </div>
            </div>
            <BackMenu />
          </div>
        </>
      )}

      {isTask && (
        <>
          {isConfe && <Confetti width={width} height={height} recycle={true} />}
          <div className="bg-gothic-950/0 mt-0 flex p-3 bg-slate-600/0 flex-col w-[100%] h-auto">
            <div className="w-[100%] h-12 px-2 mt-5 mb-4 py-3 flex justify-center items-center">
              <div className="flex flex-col items-center justify-center">
                <img src="./assets/task.svg" className="w-16 h-16 mt-0.5" />
                <p className="text-white/70 font-extrabold">Tasks</p>
              </div>
            </div>
            <div className="mt-4 py-2 mb-2 flex flex-col ">
              <p className="text-[30px] ml-2 text-start text-white font-semibold">
                Earn More Points
              </p>
              <div className="flex px-1 py-2">
                <p className="text-[20px] ml-1 text-white mr-auto font-light ">{`Complete daily tasks to earn more Fuse Points and level up quickly!`}</p>
              </div>
            </div>

            <div className="w-[100%] h-auto px-2 mt-4 mb-4 py-5 flex flex-col justify-center items-center">
              
              <div className="w-[100%] h-auto mb-3 rounded-xl text-white/70 bg-black/0 p-0 mt-2">
                {tasks ? (
                  tasks.map((item, i) => (
                    <>
                      <div
                        key={i}
                        className="w-[100%] mt-2 mb-2 h-auto flex rounded-xl py-3 px-3 bg-white/15"
                      >
                        <div className="ml-1 mr-3">
                          <img src={getTaskUrl(item.type)} className="w-12 h-12" />
                        </div>
                        <div className="mt-1 text-sm">
                          <p>{item.title}</p>
                          <div>{item.points.toLocaleString()}</div>
                        </div>
                        <div className="ml-auto mr-2 mt-2">
                          <div
                            onClick={() => {
                              setTaskName(item.title);
                              setTaskId(item.id)
                              setTaskAmount(item.points);
                              setTaskURL(item.url);
                              setTaskButton(item.btn_name);
                              setTaskType(item.type)
                              setIsClaimModal(true);
                            }}
                            className="bg-[#046ae2]/75 rounded-3xl text-sm flex items-center justify-center w-[78px] h-8"
                          >
                            {item.btn_name}
                          </div>
                        </div>
                        {isClaimModal && <ClaimModal />}
                      </div>
                    </>
                  ))
                ) : (
                  <>
                    <p>No task Added Yet</p>
                  </>
                )}
              </div>
             
              <div className="w-[100%] h-auto mt-3 rounded-xl text-white/70 bg-black/0 p-0 ">
                {claimedTask ? (
                  claimedTask.map((item, i) => (
                    <>
                      <div
                        key={i}
                        className="w-[100%] mt-2 mb-2 h-auto flex rounded-xl py-3 px-3 bg-white/15"
                      >
                        <div className="ml-1 mr-3">
                          <img src={getTaskUrl(item.type)} className="w-12 h-12" />
                        </div>
                        <div className="mt-1 text-sm">
                          <p>{item.title}</p>
                          <div>{item.points.toLocaleString()}</div>
                        </div>
                        <div className="ml-auto mr-2 mt-2">
                          <div className="bg-black/75 rounded-3xl text-sm flex items-center justify-center w-[58px] h-8">
                            {"Done"}
                          </div>
                        </div>
                        {isClaimModal && <ClaimModal />}
                      </div>
                    </>
                  ))
                ) : (
                  <>
                    <p>No task Added Yet</p>
                  </>
                )}
              </div>
            </div>
            <BackMenu />
          </div>
        </>
      )}
      {isBoost && (
        <>
          <div className="bg-gothic-950/0 mt-0 flex p-3 bg-slate-600/0 flex-col w-[100%] h-auto">
            <div className="w-[100%] h-12 px-2 mt-5 mb-4 py-3 flex justify-center items-center">
              <div className="flex flex-col items-center justify-center">
                <img src="./assets/board.svg" className="w-16 h-16 mt-0.5" />
                <p className="text-white/70 font-extrabold">Leaderboard</p>
              </div>
            </div>
            <div className="w-[100%] h-auto px-2 mt-5 mb-2 py-5 flex flex-col justify-center items-center">
              <div className="w-[100%] h-auto rounded-xl text-white/70 bg-black/0 p-0 mt-2">
                <div className="w-[100%] mt-2 mb-2 h-auto flex rounded-xl py-4 px-3 bg-black/15">
                  <div className="ml-1 mr-3 w-[15%]">
                    <div className="bg-black/50 flex items-center justify-center rounded-full w-12 h-12">
                      {`${
                        userBoard?.username === null
                          ? "U"
                          : userBoard?.username?.substring(0, 1)
                      }`}
                    </div>
                  </div>
                  <div className="mt-1 w-[85%] text-sm flex ">
                    <div className="ml-1 mr-auto">
                      <p className="mt-0.5 mb-0.5 font-bold text-[13px]">
                        {userBoard.username === null
                          ? "User"
                          : userBoard?.username}
                      </p>
                      <div className="mt-0.5 font-bold text-white/40 text-[13px] mb-0.5">{`${userBoard?.balance?.toLocaleString()} FUSE`}</div>
                    </div>
                    <p className="mr-3 ml-auto font-bold mt-1.5 text-xl">{`#${userRank}`}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-[100%] h-auto px-2 mt-4 mb-2 py-3 flex flex-col justify-center items-center">
              <p className="ml-3 mr-auto text-xl font-bold text-white/50">{`${leads?.length} Fuse Earners`}</p>

              <div className="w-[100%] h-auto rounded-xl text-white/70 bg-black/0 p-0 mt-2">
                {leads &&
                  leads.map((item, i) => (
                    <>
                      <div
                        key={i}
                        className="w-[100%] mt-2 mb-2 h-auto flex rounded-xl py-3 px-3 bg-white/10"
                      >
                        <div className="ml-1 mr-3 w-[15%]">
                          <div className="bg-black/50 flex items-center justify-center rounded-full w-12 h-12">
                            {`${
                              item?.username === null
                                ? "U"
                                : item?.username?.substring(0, 1)
                            }`}
                          </div>
                        </div>
                        <div className="mt-1 w-[85%] text-sm flex ">
                          <div className="ml-2 mr-auto">
                            <p className="mt-0.5 mb-0.5 font-bold text-[13px]">
                              {item?.username === null
                                ? "User"
                                : item?.username}
                            </p>
                            <div className="mt-0.5 font-bold text-white/25 text-[13px] mb-0.5">{`${
                              item?.balance === null
                                ? 0
                                : item?.balance?.toLocaleString()
                            } FUSE`}</div>
                          </div>
                          <p className="mr-3 ml-auto font-bold mt-1.5 text-xl">{`#${
                            i + 1
                          }`}</p>
                        </div>
                      </div>
                    </>
                  ))}
              </div>
              {isBoostModal && <BoostModal />}
             
            </div>
            <BackMenu />
          </div>
        </>
      )}
    </div>
  );
};
