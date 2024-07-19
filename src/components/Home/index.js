import { IoSettings, IoWallet } from "react-icons/io5"
import { Menu } from "../Menu"

export const Home2 = () => {
    const home = true
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
                <div className="mt-10 py-2 flex flex-col items-center justify-center">
                    <p className="text-[18px] font-light">Your Fuse Point:</p>
                    <div className="flex items-center justify-center">
                        <img className="h-16 w-16 ml-auto mr-1 " src="./assets/show.png" />
                        <p className="text-4xl ml-1 mr-auto font-bold ">{`123665543`}</p>
                    </div>
                </div>
                <div className="mt-10 flex items-center justify-center">
                    <div>
                        <img src="./assets/sol.png" className="w-[270px] h-[270px]" />
                    </div>
                </div>
            </div>
            <Menu />
            </div>
            </>
        )
        }
        
    </div>
)
}