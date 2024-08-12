
import { IoSettings, IoWallet } from "react-icons/io5"
import { BackMenu, Menu } from "../Menu"
import { GlobalContext } from "@/context/AppContext"
import { useEffect, useState, useCallback } from "react"
import { handleCopy } from "@/utils/use"
import { useUtils, useViewport, useInitData } from "@telegram-apps/sdk-react"
import { UseGetTgData } from "@/hooks/useGetUserData"
import { keyframes } from '@emotion/react';
import Confetti from "react-confetti"
import { ClaimModal } from "../Modals/ClaimModal"
import useWindowSize from "react-use/lib/useWindowSize";
import { Supabase } from "@/utils/supabasedb"
import { BoostModal } from "../Modals/BoostModal"
import { retrieveLaunchParams } from '@telegram-apps/sdk';



export const Home2 = () => {
    //const utils = useUtils()
    const [canClaim,setCanClaim] = useState(false)
    const [timeRemaining,setTimeRemaining] = useState(0)
    const [time2,setTime2] = useState('')
    const createUser = async() => {
        try {
            const username = tgUser?.initDataUnsafe?.user?.username
            const userId = tgUser?.initDataUnsafe?.user?.id
    
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
    }
    const floatUpAndFadeOut = keyframes`
  0% {
    transform: translateY(0px);
    opacity: 1;
  }
  100% {
    transform: translateY(-100px);
    opacity: 0;
  }
`;
    const { width, height } = useWindowSize();
    const {isHome, isFrens, isTask, taskName,isGame,setIsGame,
        taskAmount,
        isConfe,
        reffs,
        setReff,
        setIsConfe,
        isBoostModal,
        lastClaim,
        leads,
    userRank,
    userBoard,
        setLastClaim,
        setIsBoostModal,
        setTaskAmount,
        taskButton,
        setTaskButton,
        taskURL,setTaskURL,
        setTaskName, isBoost, tgUser, setTgUser, isClaimModal,setIsClaimModal, userBalance} = GlobalContext()
    const [countDown,setCountDown] = useState(false)
    const [claimMode,setClaimMode] = useState(false);
    const [points,setPoints] = useState(0)
    const [energy,setEnergy] = useState(20)
    const [clicks,setClicks] = useState([])
    const date = new Date()
    const pointsAdd = 1
    const EnergyRemove = 1
    
    //const user = useInitData()
   // console.log(user?.initDataUnsafe?.user?.username)
    //const { initData } = retrieveLaunchParams();
    const handleClick = (e) => {
        if(energy - EnergyRemove < 0 && points >= 20) {
            setClaimMode(true)
            setCountDown(true)
            return;
        }
        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setPoints(points + pointsAdd);
        setEnergy(energy - EnergyRemove < 0 ? 0 : energy - EnergyRemove)
        setClicks([...clicks, {id: Date.now(),x,y}])
    }
    //console.log('datauserinit',user?.chat?.photoUrl)
    const handleAnimationEnd = (id) => {
        setClicks((prevClick) => prevClick.filter(click => click.id !== id));
    }
    //const sharelink = () => {
    //   utils.shareURL(
    //    refLink,
    //    'ahmadou get this'
    //   )
    //}
    const handleClaim  = async () => {
        //update balance
        //update with timestamp
    }

    console.log('Leadership', leads)
           
    const refLink = `https://t.me/InFuseTapbot?start=${tgUser?.initDataUnsafe?.user?.id}`
   
    const updateBalance =  async () => {
          try {
            const { data, error } = await Supabase
            .from('Users')
            .update({ balance: accumulative(userBalance,points) })
            .eq('id', tgUser?.initDataUnsafe?.user?.id)

            if(data) {
                console.log('updated',data)
            }
            if(error) {
                throw error
            }
          } catch (error) {
            console.log(error)
          }
    }
    const twelveHoursInMs = 12 * 60 * 60 * 1000;
    function formatTimeRemaining(milliseconds) {
        if (milliseconds <= 0) {
          return 'Claim available now';
        }
      
        const seconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
      
        const   
       remainingSeconds = seconds % 60;
        const remainingMinutes = minutes % 60;
        const remainingHours = hours % 24;
      
        const   
       timeString = [];
        if (days > 0) {
          timeString.push(`${days}d`);
        }
        if (remainingHours > 0) {
          timeString.push(`${remainingHours}h`);
        }
        if (remainingMinutes > 0) {
          timeString.push(`${remainingMinutes}m`);
        }
        timeString.push(`${remainingSeconds}s`);
        //setTimeString(timeString.join(' '))
        return timeString.join(' ');
      }
    
    const getTime = async ({last}) => {
        const lastClaimTime = 1723188918093;
        const currentTime = date.getTime();
        const cooldownTime = 12 * 60 * 60 * 1000; //

        const timeDiff = currentTime - lastClaimTime;
        if (timeDiff >= cooldownTime) {
          setCanClaim(true);
        } else {
          setTimeRemaining(cooldownTime - timeDiff);
        }
        //const twelveHoursInMs = 12 * 60 * 60 * 1000;
        const converted = date.getUTCHours(timeDiff)
        

        return converted
    }
    
    const getLevel = (length) => {
       if (length < 5) {
        return 0
       } else if (length >= 5) {
        return 1
       }  else if (length >= 10) {
        return 2
       }
    }

    const getPoints = (length) => {
        if (length < 5) {
         return 100000
        } else if (length >= 5) {
         return 100000
        }  else if (length >= 10) {
         return 200000
        }
     }
    
    
    const boost = [
        {
            boostName: 'Multi Tap',
            amount: 100000,
            boostType: 'booster'
        },
        {
            boostName: 'Robot222',
            amount: 100000,
            boostType: 'booster'
        },
        {
            boostName: 'Tap',
            amount: 100000,
            boostType: 'daily'
        },
    ]
    const accumulative = (a,b) => {
       return a+b;
    }
    const theFunct = async () => {
       await getTime(1723188918093);
       setTime2(formatTimeRemaining(timeRemaining))
    }
    useEffect(() => {
        const intervalId = setInterval(() => {
            getTime(1723188918093);
          }, 1000);
          return () => clearInterval(intervalId);
    },[])
   
    const todo =  [
        {
            taskName:'Follow InFuse Channel',
            taskPoint: 20000,
            taskUrl: 'https://t.me/InFuseChannel',
            botton: 'Follow'
        },
        {
            taskName:'Join InFuse Chat',
            taskPoint: 20000,
            taskUrl: 'https://t.me/InFuseWallet',
            botton: 'Join'
        },
        {
            taskName:'Follow InFuse on X',
            taskPoint: 20000,
            taskUrl: 'https://x.com/infusewallet',
            botton: 'Follow'
        },
        {
            taskName:'Follow Ahmad on X',
            taskPoint: 20000,
            taskUrl: 'https://x.com/4hmadou_5',
            botton: 'Follow',
        },
        {
            taskName:'Subscribe Youtube',
            taskPoint: 20000,
            taskUrl: 'https://www.youtube.com/@InFuseWallet',
            botton: 'Follow'
        },
       
     
    ]
    return(
    <div>
        {
            isGame && (
            <>
            <div className="bg-gothic-950/0 mt-0 flex bg-slate-600/0 flex-col w-[100%] h-auto">
            <div className="w-[100%] bg-black/0">
                <div className="flex flex-col items-center mt-2 justify-center">
                      <img src="./assets/pad.svg" className="w-16 h-16 mt-0.5" />
                      <p className="text-white/70 font-extrabold">Games</p>
                    </div>
                <div className="mt-5 py-2 flex flex-col items-center justify-center">
                    
                    <div className="flex items-center justify-center">
                        <img className="h-16 w-16 ml-auto mr-1 " src="./assets/show.png" />
                        <p className="text-4xl ml-1 text-white mr-auto font-bold ">{accumulative(userBalance,points)?.toLocaleString()}</p>
                    </div>
                </div>
                <div className="mt-4 flex flex-grow items-center justify-center">
                    { countDown ? 
                <div  className=" rounded-full">
                <img src="./assets/sol.png" onClick={() => alert('wait for the Countedown')} className="w-[270px] bg-black/0 rounded-full h-[270px]" />
                {clicks.map((click) => (
                    <>
                    <div key={click.id}
                    className="absolute text-5xl text-white/70 font-light opacity-0 float-start ease-out"
                    style={{
                        top:`${click.y + 150}px`,
                        left: `${click.x + 20}px`,
                        animation: `float 1s ease-out`
                    }}
                    onAnimationEnd={() => handleAnimationEnd(click.id)}
                    >
                      {`+${pointsAdd}`}
                    </div>
                    </>
                ))}
            </div> 
            :
            <div  className=" rounded-full">
            <img src="./assets/sol.png" onClick={handleClick} className="w-[270px] bg-black/0 rounded-full h-[270px]" />
            {clicks.map((click) => (
                <>
                <div key={click.id}
                className="absolute text-5xl text-white/70 font-light opacity-0 float-start ease-out"
                style={{
                    top:`${click.y + 150}px`,
                    left: `${click.x + 20}px`,
                    animation: `float 1s ease-out`
                }}
                onAnimationEnd={() => handleAnimationEnd(click.id)}
                >
                  {`+${pointsAdd}`}
                </div>
                </>
            ))}
        </div>    
                }
                </div>
                <div className="w-[100%] mt-5 mb-16 flex flex-col items-center justify-center">
                    <div className="mb-2 text-white">
                        {`${energy}/20`}
                    </div>
                    <div className="bg-white/90 rounded-xl h-3 w-[80%]">
                        <div className="bg-blue-500/50 rounded-full h-[100%]" style={{width:`${energy/20 * 100}%`}}>

                        </div>
                    </div>
                </div>
            
            </div>
            <BackMenu />
            {claimMode && <div className="inset-0 fixed bg-white/0 bg-opacity-100 w-[100%] z-[99999999] min-h-screen h-auto backdrop-blur-sm flex ">
        <div className="w-[100%] flex items-center px-3 justify-center">
            <div className="h-[220px] ml-auto mr-auto py-2 px-2 w-[89%] bg-white/75  border-[#448cff]/90 border rounded-xl">
            {
                <div className="mt-5 ml-auto mr-auto flex flex-col items-center justify-center text-center">
                <div className="w-[80%] mb-2 ml-auto mr-auto py-1 px-3 flex  items-center justify-center rounded-full mt-8 h-9">
                  <p className="text-black/85 text-[18px] font-light ml-auto mr-auto ">{`Claim Your ${points} Fuse Points`}</p>
                </div>
                <div onClick={() => {
                    setClaimMode(false)
                    updateBalance()
                    }} className="w-[175px] mt-6  ml-auto mr-auto py-1 px-3 text-white border  border-[#448cff]/60 flex  items-center justify-center bg-black/90 rounded-full h-9">
                  <p>{'Claim'}</p>
                </div>
            </div>
            }
            
            </div>
        </div>
    </div>}
            </div>
            </>
        )
        }
        {
            isHome && (
            <>
            <div className="bg-gothic-950/0 mt-0 flex bg-slate-600/0 flex-col w-[100%] h-auto">
            <div className="w-[100%] bg-black/0">
                <div className="w-[100%] h-12 px-2 mt-2 py-3 flex">
                    <div className="ml-2 mr-auto">
                    <p className="text-[18px] font-bold  text-white/75">EarnFuse</p>
                    </div>
                    <div className="ml-auto py-1 mr-2 flex">
                        <IoWallet className="ml-4 text-white/75 mr-4 text-[20px]"/>
                        <IoSettings className="ml-4  text-white/75 mr-2 text-[20px]"/>
                    </div>
                </div>
                <div className="w-[100%] mt-3 flex  text-white/75 items-center justify-center flex-col h-auto">
                    <div className="mb-2 mt-0.5 rounded-lg p-2 bg-white/0 w-[95%] h-[80px]">
                        <button>
                            
                        </button>
                    </div>
                    <div className="w-[100%] flex  text-white/75 items-center  flex-col justify-center mt-20">
                       
                        <div>
                            <p className="font-bold text-[23px]">{`Hi ${tgUser?.initDataUnsafe?.user?.username}`}</p>
                        </div>
                    </div>
                </div>
                <div className="mt-3 py-2 flex flex-col items-center justify-center">
                    
                    <div className="flex items-center justify-center">
                        <img className="h-16 w-16 ml-auto mr-1 " src="./assets/show.png" />
                        <p className="text-4xl ml-1 text-white mr-auto font-bold ">{accumulative(userBalance,points)?.toLocaleString()}</p>
                    </div>
                </div>
                <div className="w-[100%] mt-[80px] flex items-center justify-center">
                    {canClaim ? 
                    <>
                    <div className="bg-black/90 w-[90%] rounded-2xl text-white flex items-center justify-center h-12">
                        <div className="text-xl">
                            Claim now
                        </div>
                    </div>
                    </> 
                    : 
                    <>
                    <div className="bg-black/30 w-[90%] rounded-2xl text-white flex items-center justify-center h-12">
                        <div className="text-[16px]">
                            {`Available in ${formatTimeRemaining(timeRemaining)}`}
                        </div>
                    </div>
                    </>}
                    
                </div>
            
            </div>
            <Menu />
            
            </div>
            </>
        )
        }
        {
            isFrens && (
            <>
            <div className="bg-gothic-950/0 mt-0 flex p-3 bg-slate-600/0 flex-col w-[100%] h-auto">
                 <div className="w-[100%] h-12 px-2 mt-5 mb-4 py-3 flex justify-center items-center">
                 <div className="flex flex-col items-center mt-2 justify-center">
                      <img src="./assets/community.svg" className="w-16 h-16 mt-0.5" />
                      <p className="text-white/70 font-extrabold">Plugs</p>
                    </div>
                </div>
                <div className="w-[100%] h-[70px] px-2 mt-4 py-3 flex">
                    <div className="w-[75%]">
                      <p className="text-[17px] mb-2 font-bold  text-white/75">
                        invite frens, earn points!
                      </p>
                      <p className="text-sm font-bold p-0 textt-center mt-3 text-white/75">
                        Claim Level 1 Plug Reward, <br/> by inviting 5 frens.
                      </p>
                    </div>
                    <div className="w-[25%] flex items-center justify-center">
                        <div className="bg-white/10 h-[74px] flex items-center flex-col justify-center mt-12 w-[74px] rounded-xl">
                            <div className="text-3xl font-bold text-white">{
                                reffs && getLevel(reffs.length)
                                }</div>
                            <p className="text-sm mt-0.5 font-bold text-white">Level</p>
                        </div>
                    </div>
                </div>
                <div className="w-[100%] h-[150px] bg-blue-700/0 px-2 mt-20 p-4 flex">
                    <div className="w-[100%] flex h-[100%] text-white bg-white/5 rounded-xl">
                     <div className="w-[70%] py-3 px-3 ">
                        <div className='flex'>
                            <div className="flex ml-2 py-2 mr-" >
                                <div className="w-[80px] h-[80px]  text-3xl flex items-center justify-center mr-4 bg-black/25 rounded-2xl">
                                  <p>🔌</p>
                                </div>
                                <p className="text-2xl mt-5 text-white font-extrabold">{`Plugs`}</p>  
                                <p className="text-2xl mt-5 text-white font-extrabold">{`${reffs && reffs.length}`}</p>
                            </div>
                        </div>
                     </div>
                     <div className="w-[30%] py-3 px-3 ">
                        
                     </div>
                    </div>
                    
                </div>
                <div className="w-[100%] mt-8 ">
                        <div className="h-20 w-[98%] px-2 rounded-2xl flex items-center justify-center bg-black/25">
                            <p className="text-[16px] flex items-center justify-center ml-auto mr-auto text-center text-white font-light">{refLink}</p>
                        </div>
                    </div>
                <div className="w-[100%] h-[150px] bg-blue-700/0 px-2 mt-8 p-4 flex">
                    <div className="w-[100%] p-4 flex h-[100%] text-white bg-white/0 rounded-xl">
                     <div  className="w-[45%] flex mr-auto items-center justify-center h-14  border-white/70 border-2 bg-black/0 rounded-3xl" >
                      <p className="text-[18px] font-bold">Invite Plug</p>
                     </div>
                     <div onClick={() => handleCopy(refLink)} className="w-[45%] ml-auto flex items-center justify-center h-14 border-2 border-white/70 bg-black/0 rounded-3xl" >
                      <p className="text-[18px] font-bold">Copy Link</p>
                     </div>
                     
                    </div>
                    
                </div>
                <BackMenu />
            </div>
            
            </>
        )
        }

        {
            isTask && (
            <>
            {
               isConfe && <Confetti  width={width} height={height} recycle={true} /> 
            }
            <div className="bg-gothic-950/0 mt-0 flex p-3 bg-slate-600/0 flex-col w-[100%] h-auto">
                 <div className="w-[100%] h-12 px-2 mt-5 mb-4 py-3 flex justify-center items-center">
                 <div className="flex flex-col items-center justify-center">
                      <img src="./assets/task.svg" className="w-16 h-16 mt-0.5" />
                      <p className="text-white/70 font-extrabold">Tasks</p>
                    </div>
                </div>
                <div className="mt-4 py-2 mb-2 flex flex-col ">
                    <p className="text-[30px] ml-2 text-start text-white font-semibold">Earn More Points</p>
                    <div className="flex px-1 py-2">
                        <p className="text-[20px] ml-1 text-white mr-auto font-light ">{`Complete daily tasks to earn more Fuse Points and level up quickly!`}</p>
                    </div>
                </div>
                
                <div className="w-[100%] h-auto px-2 mt-4 mb-4 py-5 flex justify-center items-center">
                    <div className="w-[100%] h-auto rounded-xl text-white/70 bg-black/0 p-0 mt-2">
                     {
                       todo && todo.map((item,i) => (
                        <>
                        <div key={i} className="w-[100%] mt-2 mb-2 h-auto flex rounded-xl py-3 px-3 bg-black/15">
                            <div className="ml-1 mr-3">
                                <img src="./assets/sol.png" className="w-12 h-12"/>
                            </div>
                            <div className="mt-1 text-sm">
                                <p>{item.taskName}</p>
                                <div>{item.taskPoint.toLocaleString()}</div>
                            </div>
                            <div className="ml-auto mr-2 mt-2">
                             <div onClick={() => {
                                setTaskName(item.taskName)
                                setTaskAmount(item.taskPoint)
                                setTaskURL(item.taskUrl)
                                setTaskButton(item.botton)
                                setIsClaimModal(true)
                                }} className="bg-blue-400/20 rounded-3xl text-sm flex items-center justify-center w-[78px] h-8">{item.botton}</div>
                                
                            </div>
                            {isClaimModal && <ClaimModal />}
                        </div>
                        </>
                       ))
                     }
                    </div>
                </div>
               <BackMenu/>
               
            </div>
            
            </>
        )
        }
        {
            isBoost && (
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
                     
                        <div 
                           className="w-[100%] mt-2 mb-2 h-auto flex rounded-xl py-4 px-3 bg-black/15">
                            <div className="ml-1 mr-3">
                                <img src="./assets/sol.png" className="w-12 h-12"/>
                            </div>
                            <div className="mt-1 text-sm flex items-center justify-center">
                                <div className="ml-2 mr-auto">
                                    <p className="mt-2 mb-2 font-bold text-[13px]">{userBoard?.username}</p>
                                    <div className="mt-2 font-bold text-[13px mb-2">{`${userBoard?.balance} $FUSE`}</div>
                                </div>
                                <p className="mr-4 ml-auto font-bold text-xl">{`#${userRank}`}</p>
                            </div>
                            
                        </div>
                    </div>
                </div>
                {/**<div className="w-[100%] h-auto px-2 mt-2 mb-1 py-5 flex flex-col justify-center items-center">
                    <p>Daily Boosters</p>
                    <div className="w-[100%] h-auto rounded-xl text-white/70 bg-black/0 p-0 mt-2">
                     {
                       boost && boost.filter((boos) => boos.boostType == 'daily').map((item,i) => (
                        <>
                        <div key={i} className="w-[100%] mt-2 mb-2 h-auto flex rounded-xl py-3 px-3 bg-black/15">
                            <div className="ml-1 mr-3">
                                <img src="./assets/sol.png" className="w-12 h-12"/>
                            </div>
                            <div className="mt-1 text-sm">
                                <p>{item.boostName}</p>
                                <div>{item.amount.toLocaleString()}</div>
                            </div>
                            
                        </div>
                        </>
                       ))
                     }
                    </div>
                </div>**/}
                <div className="w-[100%] h-auto px-2 mt-5 mb-2 py-5 flex flex-col justify-center items-center">
                    <p>Booster</p>
                  
                    <div className="w-[100%] h-auto rounded-xl text-white/70 bg-black/0 p-0 mt-2">
                     {
                       leads && leads.map((item,i) => (
                        <>
                        <div 
                          key={i} className="w-[100%] mt-2 mb-2 h-auto flex rounded-xl py-3 px-3 bg-white/15">
                            <div className="ml-1 mr-3">
                                <div className="bg-black/50 w-12 h-12">
                                    {`${item?.username[0]} ${item?.username[Math.floor(item?.username.length / 2)]}`}
                                </div>
                            </div>
                            <div className="mt-1 text-sm flex items-center justify-center">
                                <div className="ml-2 mr-auto">
                                    <p className="mt-2 mb-2 font-bold text-[13px]">{item?.username}</p>
                                    <div className="mt-2 font-bold text-[13px mb-2">{`${item?.balance} $FUSE`}</div>
                                </div>
                                <p className="mr-4 ml-auto font-bold text-xl">{`#${i + 1}`}</p>
                            </div>
                            
                        </div>
                        </>
                       ))
                     }
                    </div>
                    {isBoostModal && <BoostModal />}
                </div>
               <BackMenu/>
               
            </div>
            
            </>
        )
        }
        
    </div>
)
}