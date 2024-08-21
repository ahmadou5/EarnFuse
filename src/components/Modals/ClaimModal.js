import { GlobalContext } from "@/context/AppContext"
import { useEffect, useState } from "react"
import Confetti from "react-confetti"
import { Supabase } from "@/utils/supabasedb"
import Image from "next/image"
//import { useGetUserId } from "@/hooks/useGetUserId"

export const ClaimModal = () => {
    const [claim,setClaim] = useState(false)
    const [isVerify,setIsVerify] = useState(false)
    const { isClaimModal,setIsClaimModal,taskURL, taskType,setTaskType,setTaskURL,taskName, userBalance, tgUser, taskId, claimedTask, setLeads, setUserData, setUserBalance, setUserBoad, setUserRank, setClaimedTask, tasks, setTask, isConfe, setIsConfe, taskButton,setTaskButton, taskAmount } = GlobalContext()
    

    const accumulative = (a, b) => {
      return a + b;
    };
    

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
           const id = tgData?.initDataUnsafe?.user?.id.toString();
   
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
  


    const taskClaimed = async () => {
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
         const { data, error } = await Supabase.from("claimed_task")
         .insert({ user_id: id, task_id: taskId })
         .select()
  
  
          if (data) {
            console.log("wahala task claimed", data);
            console.log(data);
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
    }
    const updateBalance = async() => {
      if (
        typeof window !== "undefined" &&
        window.Telegram &&
        window.Telegram.WebApp
      ) {
        console.log("Telegram WebApp is set");
        const tgData = window.Telegram.WebApp;
        console.log('data id',tgData?.initDataUnsafe?.user?.id)
        
        //setTgUser(tgData)
        try {
        console.log(tgUser, 'tg user')
        const { data, error } = await Supabase
        .from('users')
        .select('*')
        .eq('id',tgData?.initDataUnsafe?.user?.id)

        if(data) {
        
          console.log('hey balance data',data[0].balance)
         // console.log(data[0].id,'aeki')
         // console.log(data[0].isClick,'counter')
         // console.log(data[0].lastClaim,'claim')
        //  setUserData(data)
        //  setLastClaim(data[0].lastRewardClaim)
          setUserBalance(data[0].balance)
        }
        if(error) {
          console.log('error',error)
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
    const UpdateBalanceByTask = async () => {
      try {
        if (
          typeof window !== "undefined" &&
          window.Telegram &&
          window.Telegram.WebApp
        ) {
          console.log("Telegram WebApp is set");
          const tgData = window.Telegram.WebApp;
         // console.log("data the first id", tgData?.initDataUnsafe?.user?.id);
          //const id = tgData?.initDataUnsafe?.user?.id.toString();
  
         // console.log("task id", id);
         const { data, error } = await Supabase.from("users")
         .update({ balance: accumulative(userBalance, taskAmount) })
         .eq("id", tgUser?.initDataUnsafe?.user?.id);
  
  
          if (data) {
            console.log("wahala task paid", data);
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
    }
    const handleGetUnClaimedTasks = async () => {
      try {
        if (
          typeof window !== "undefined" &&
          window.Telegram &&
          window.Telegram.WebApp
        ) {
          console.log("Telegram WebApp is set");
          const tgData = window.Telegram.WebApp;
         // console.log("data the first id", tgData?.initDataUnsafe?.user?.id);
          const id = tgUser?.initDataUnsafe?.user?.id;
  
         console.log("task id", id);
  
          const { data, error } = await Supabase.rpc("get_unclaimed_tasks", {
            userid: id,
          });
  
          if (data) {
            console.log("wahala 22222 task", data);
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
    }

    
  
    const handleGetClaimedTasks = async () => {
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
  
          console.log("task id oneeee", id);
  
          const { data, error } = await Supabase.rpc("get_claimed_tasks", {
            userid: id,
          });
  
          if (data) {
            console.log("wahala 333 task", data);
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
    }
    const handleClaimTask = async () => {
      UpdateBalanceByTask()
      taskClaimed()
      updateBalance()
      handleUpdatedBalance()
      handleUpdateBoard()
    };
    

    return(
    <div className="inset-0 fixed bg-white/0 bg-opacity-100 w-[100%] z-[99999999] min-h-screen h-auto backdrop-blur-sm flex ">
        <div className="w-[100%] flex items-center px-3 justify-center">
            <div className="h-[290px] ml-auto mr-auto py-2 px-2 w-[95%] bg-white/90  border-[#448cff]/70 border rounded-xl">
            {
                claim ? 
            <div className=" ml-auto mr-auto flex flex-col items-center justify-center text-center">
              
            <p className="text-center text-black font-light text-[25px] mt-5 mb-4">{`${'Claim'}`} </p>
            <div className="w-[90%] mb-7 mt-5 ml-auto mr-auto py-1 px-3 flex flex-col items-center justify-center rounded-full h-9">
              <p className="text-black/85 text-[18px] font-light ml-auto mr-auto ">{`Claim your task reward `}</p>
              <p className="text-black/85 text-[18px] font-light ml-auto mr-auto ">{`${taskAmount.toLocaleString()} Fuse Points`}</p>
            </div>
            <div onClick={() => {
                  handleClaimTask()
                  setIsConfe(true)
                  setTask([])
                  //setClaimedTask([])
                  handleGetClaimedTasks()
                  setTimeout(() => {
                    handleGetUnClaimedTasks()
                  }, 2000);
                  setIsClaimModal(false)
                  setTimeout(() => {
                      setIsConfe(false)
                    }, 9000);
                 // window.open(taskURL)
                  }} className="w-[175px] mt-[30px]  ml-auto mr-auto py-1 px-3 text-white border  border-[#448cff]/60 flex  items-center justify-center bg-[#448cff]/90 rounded-2xl h-[39px]">
            <p>Claim</p>
          </div> 
            
        </div>
            : 
            <div className="mt-3 ml-auto mr-auto flex flex-col items-center justify-center text-center">
            <div className="w-[65px] bg-blue-800 rounded-full h-[65px] py-0.5 px-0.5 mt-0 mb-">
              <Image src={getTaskUrl(taskType)} className="w-[100%] h-[100%]"/>
            </div>
            <p className="text-center mt-2 text-black font-light text-[22px] mb-1">{`${taskName}`} </p>
            <div className="w-[85%] mb-2 mt-1 ml-auto mr-auto py-1 px-3 flex flex-col items-center justify-center rounded-full h-9">
              <p className="text-black/85 text-[16px] font-light ml-auto mr-auto ">{`Complete task and earn reward of `}</p>
              <p className="text-black/85 text-[16px] font-light ml-auto mr-auto ">{`${taskAmount.toLocaleString()} Fuse Points`}</p>
            </div>
            <div onClick={() => {
                    window.open(taskURL)
                    setTimeout(() => {
                        setClaim(true)
                      }, 2000);
                    }} className="w-[215px] mt-8  ml-auto mr-auto py-1 px-3 text-white border  border-[#448cff]/0 flex  items-center justify-center bg-black/90 rounded-2xl h-[39px]">
              <p>{taskButton}</p>
            </div>
        </div>
            }
            
            </div>
        </div>
    </div>
    )
}