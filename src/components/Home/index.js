'use client'
import { IoSettings, IoWallet } from "react-icons/io5"
import { Menu } from "../Menu"
import { GlobalContext } from "@/context/AppContext"

export const Home2 = () => {
    const {isHome, isFrens, isTask, isBoost} = GlobalContext()
    
    
    const todo =  [
        {
            name: 'folloe'
        },
        {
            name: 'folloe'
        },
        {
            name: 'folloe'
        },
        {
            name: 'folloe'
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
                        <p className="text-4xl ml-1 text-white mr-auto font-bold ">{`12665543`}</p>
                    </div>
                </div>
                <div className="mt-4 flex items-center justify-center">
                    <div>
                        <img src="./assets/sol.png" className="w-[270px] h-[270px]" />
                    </div>
                </div>
                <div className="w-[100%] mt-10 flex flex-col items-center justify-center">
                    <div className="mb-2 text-white">
                        0/ 100000
                    </div>
                    <div className="bg-white rounded-xl h-3 w-[80%]">
h
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
                      <p className="text-[32px] font-bold  text-white/75">Plugs 👩🏽‍🚀</p>
                    </div>
                </div>
                <div className="w-[100%] h-[70px] px-2 mt-4 py-3 flex">
                    <div className="w-[75%]">
                      <p className="text-[17px] mb-2 font-bold  text-white/75">
                        invite frens, earn points!
                      </p>
                      <p className="text-sm font-bold p-0 textt-center mt-3 text-white/75">
                        Claim Level 1 Plug Reward, <br/> by inviting 5 plugs.
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
                <div className="w-[100%] h-[150px] bg-blue-700/0 px-2 mt-20 p-4 flex">
                    <div className="w-[100%] p-4 flex h-[100%] text-white bg-white/0 rounded-xl">
                     <div className="w-[45%] flex mr-auto items-center justify-center h-14  border-white/70 border-2 bg-black/0 rounded-3xl" >
                      <p className="text-[18px] font-bold">Invite Plug</p>
                     </div>
                     <div className="w-[45%] ml-auto flex items-center justify-center h-14 border-2 border-white/70 bg-black/0 rounded-3xl" >
                      <p className="text-[18px] font-bold">Copy Link</p>
                     </div>
                     
                    </div>
                    
                </div>
            </div>
            
            </>
        )
        }

{
            isTask && (
            <>
            <div className="bg-gothic-950/0 mt-0 flex p-3 bg-slate-600/0 flex-col w-[100%] h-auto">
                 <div className="w-[100%] h-12 px-2 mt-5 mb-4 py-3 flex justify-center items-center">
                    <div className="">
                      <p className="text-[39px] font-bold  text-white/75">Tasks 📝</p>
                    </div>
                </div>
                <div className="mt-4 py-2 mb-16 flex flex-col ">
                    <p className="text-[30px] ml-2 text-start text-white font-semibold">Earn More Points</p>
                    <div className="flex px-1 py-2">
                        <p className="text-[20px] ml-1 text-white mr-auto font-light ">{`Complete daily tasks to earn more Fuse Points and level up quickly!`}</p>
                    </div>
                </div>
                
                <div className="w-[100%] h-12 px-2 mt-20 mb-4 py-5 flex justify-center items-center">
                    <div className="w-[100%] h-auto rounded-xl text-white/70 bg-black/0 p-0 mt-16">
                     {
                       todo && todo.map((item,i) => (
                        <>
                        <div key={i} className="w-[100%] mt-2 mb-2 h-auto flex rounded-xl py-3 px-3 bg-black/15">
                            <div className="ml-1 mr-6">
                                <img src="./assets/sol.png" className="w-12 h-12"/>
                            </div>
                            <div className="mt-1 text-sm">
                                <p>{item.name}</p>
                                <div>{item.name}</div>
                            </div>
                            <div className="ml-auto mr-2 mt-2">
                                <div className="bg-blue-400/20 rounded-3xl text-sm flex items-center justify-center w-[70px] h-8">start</div>
                            </div>
                        </div>
                        </>
                       ))
                     }
                    </div>
                </div>
               
               
            </div>
            
            </>
        )
        }
        
    </div>
)
}