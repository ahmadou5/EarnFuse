import { IoSettings, IoWallet } from "react-icons/io5"
import { Menu } from "../Menu"

export const Home2 = () => {
    const home = false
    const frens = true
    return(
    <div>
        {
            home && (
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
                        <p className="text-4xl ml-1 text-white mr-auto font-bold ">{`12`}</p>
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
            frens && (
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
                       Bring friend, earn more!
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
                    <div className="w-[100%] flex h-[100%] bg-white/5 rounded-xl">
                     <div className="w-[60%] py-3 px-3 ">
                        <div className='flex'>
                            <div className="flex ml-2 py-2 mr-" >
                                <div className="w-[80px] h-[80px]  text-3xl flex items-center justify-center mr-4 bg-black/25 rounded-xl">
                                  <p>🔌</p>
                                </div>
                                <p className="text-2xl mt-5 font-extrabold">Level 1</p>
                            </div>
                        </div>
                     </div>
                     <div className="w-[40%] py-3 px-3 ">
                        <div className="p-4 w-[100%]">
                            <button className="h-9 w-[98%]  mb-3 rounded-xl bg-black/50">Claim</button>
                            <p className="text-xl font-light text-center">10000</p>
                        </div>
                     </div>
                    </div>
                    
                </div>
            </div>
            
            </>
        )
        }
        
    </div>
)
}