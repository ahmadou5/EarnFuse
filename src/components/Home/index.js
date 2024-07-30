
import { IoSettings, IoWallet } from "react-icons/io5"
import { BackMenu, Menu } from "../Menu"
import { GlobalContext } from "@/context/AppContext"
import { useEffect, useState } from "react"
import { UseGetTgData } from "@/hooks/useGetUserData"
import Confetti from "react-confetti"
import { ClaimModal } from "../Modals/ClaimModal"
import useWindowSize from "react-use/lib/useWindowSize";
import { Supabase } from "@/utils/supabasedb"
import { BoostModal } from "../Modals/BoostModal"

export const Home2 = () => {
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
    const { width, height } = useWindowSize();
    const {isHome, isFrens, isTask, taskName,
        taskAmount,
        isConfe,
        setIsConfe,
        isBoostModal,
        setIsBoostModal,
        setTaskAmount,
        taskButton,
        setTaskButton,
        taskURL,setTaskURL,
        setTaskName, isBoost, tgUser, setTgUser, isClaimModal,setIsClaimModal} = GlobalContext()
    const [taskDone,setTaskDone] = useState(false)
    const [points,setPoints] = useState(0)
    const [energy,setEnergy] = useState(2000)
    const [clicks,setClicks] = useState([])

    const pointsAdd = 1
    const EnergyRemove = 1
    const user = UseGetTgData()
    console.log(user?.initDataUnsafe?.user?.username)
    const handleClick = (e) => {
        if(energy - EnergyRemove < 0) {
            return;
        }
        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setPoints(points + pointsAdd);
        setEnergy(energy - EnergyRemove < 0 ? 0 : energy - EnergyRemove)
        setClicks([...clicks, {id: Date.now(),x,y}])
        createUser()
    }

    const handleAnimationEnd = (id) => {
        setClicks((prevClick) => prevClick.filter(click => click.id !== id));
    }

    useEffect(() => {
        
        const interval = setInterval(() => {
            setEnergy((prevEnergy) => Math.min(prevEnergy + 1,100000));
        },100000)
        return () => clearInterval(interval)
    },[])
    const boost = [
        {
            boostName: 'Multi Tap',
            amount: 100000,
            boostType: 'booster'
        },
        {
            boostName: 'Robot',
            amount: 100000,
            boostType: 'booster'
        },
        {
            boostName: 'Tap',
            amount: 100000,
            boostType: 'daily'
        },
    ]
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
                <div className="mt-7 py-2 flex flex-col items-center justify-center">
                    <p className="text-[18px] text-white font-light">Your Fuse Point:</p>
                    <div className="flex items-center justify-center">
                        <img className="h-16 w-16 ml-auto mr-1 " src="./assets/show.png" />
                        <p className="text-4xl ml-1 text-white mr-auto font-bold ">{points.toLocaleString()}</p>
                    </div>
                </div>
                <div className="mt-4 flex flex-grow items-center justify-center">
                    <div  className=" rounded-full">
                        <img src="./assets/sol.png" onClick={handleClick} className="w-[270px] bg-black/0 rounded-full h-[270px]" />
                        {clicks.map((click) => (
                            <>
                            <div key={click.id}
                            className="absolute text-5xl text-white/70 font-light opacity-0"
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
                </div>
                <div className="w-[100%] mt-10 flex flex-col items-center justify-center">
                    <div className="mb-2 text-white">
                        {`${energy}/2000`}
                    </div>
                    <div className="bg-white/90 rounded-xl h-3 w-[80%]">
                        <div className="bg-blue-500/50 rounded-full h-[100%]" style={{width:`${energy/2000 * 100}%`}}>

                        </div>
                    </div>
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
                    <div className="">
                      <p className="text-[32px] font-bold  text-white/75">frens 👩🏽‍🚀</p>
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
                            <p className="text-3xl font-bold text-white">1</p>
                            <p className="text-sm mt-0.5 font-bold text-white">Level</p>
                        </div>
                    </div>
                </div>
                <div className="w-[100%] h-[150px] bg-blue-700/0 px-2 mt-20 p-4 flex">
                    <div className="w-[100%] flex h-[100%] text-white bg-white/5 rounded-xl">
                     <div className="w-[60%] py-3 px-3 ">
                        <div className='flex'>
                            <div className="flex ml-2 py-2 mr-" >
                                <div className="w-[80px] h-[80px]  text-3xl flex items-center justify-center mr-4 bg-black/25 rounded-2xl">
                                  <p>🔌</p>
                                </div>
                                <p className="text-2xl mt-5 text-white font-extrabold">Level 1</p>
                            </div>
                        </div>
                     </div>
                     <div className="w-[40%] py-3 px-3 ">
                        <div className="p-4 w-[100%]">
                            <button className="h-9 w-[100%]  mb-1.5 text-white rounded-xl bg-black/30">Claim</button>
                            <p className="text-xl font-light text-white text-center">10000</p>
                        </div>
                     </div>
                    </div>
                    
                </div>
                <div className="w-[100%] mt-8 ">
                        <div className="h-20 w-[98%] rounded-2xl flex items-center justify-center bg-black/25">
                            <p className="text-[16px] flex items-center justify-center ml-auto mr-auto text-center text-white font-light">{`https://t.me/InFuseTapbot?start=${tgUser?.initDataUnsafe?.user?.id}`}</p>
                        </div>
                    </div>
                <div className="w-[100%] h-[150px] bg-blue-700/0 px-2 mt-8 p-4 flex">
                    <div className="w-[100%] p-4 flex h-[100%] text-white bg-white/0 rounded-xl">
                     <div className="w-[45%] flex mr-auto items-center justify-center h-14  border-white/70 border-2 bg-black/0 rounded-3xl" >
                      <p className="text-[18px] font-bold">Invite Plug</p>
                     </div>
                     <div className="w-[45%] ml-auto flex items-center justify-center h-14 border-2 border-white/70 bg-black/0 rounded-3xl" >
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
                    <div className="">
                      <p className="text-[39px] font-bold  text-white/75">Tasks 📝</p>
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
                    <div className="">
                      <p className="text-[39px] font-bold  text-white/75">Boost 🚀</p>
                    </div>
                </div>
                <div className="mt-7 py-2 flex flex-col items-center justify-center">
                    <p className="text-[18px] text-white font-light">Your Fuse Point:</p>
                    <div className="flex items-center justify-center">
                        <img className="h-16 w-16 ml-auto mr-1 " src="./assets/show.png" />
                        <p className="text-4xl ml-1 text-white mr-auto font-bold ">{points.toLocaleString()}</p>
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
                       boost && boost.filter((boos) => boos.boostType == 'booster').map((item,i) => (
                        <>
                        <div onClick={() => {
                            setIsBoostModal(true)
                        }} key={i} className="w-[100%] mt-2 mb-2 h-auto flex rounded-xl py-3 px-3 bg-black/15">
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