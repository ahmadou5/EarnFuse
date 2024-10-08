'use client'
import { GlobalContext } from "@/context/AppContext"
import { UseGetBalance } from "@/hooks/useGetBalance"
import { UseGetRefferals } from "@/hooks/useGetRefs"
import { UseGetTgData } from "@/hooks/useGetUserData"
import { Supabase } from "@/utils/supabasedb"
import { useEffect } from "react"

export const Loading = () => {
    

    const {tgUser,} = GlobalContext()
    const createUser = async() => {
        try {
            const username = tgUser?.initDataUnsafe?.user?.username
            const userId = tgUser?.initDataUnsafe?.user?.id
            console.log('starting...........................')
            console.log(tgUser,'user ne')
            console.log('id',userId)
            console.log('name',username)
            const { data,error } = await Supabase
            .from('users')
            .insert([
                {id:userId, username:username, pointsAdd: 1}
            ])
            .select()

            if(data) {
                console.log(data,'DATA')
                //alert(data, 'done')
            } 
            if (error) {
                throw error
            }
           } catch (error) {
            console.log(error)
           }
    }
    useEffect(() => {
        
    },[])
    return(
    <div className="inset-0 fixed bg-black/60 bg-opacity-100 w-[100%] z-[99999999] min-h-screen h-auto backdrop-blur-sm flex ">
        <div className="w-[100%] h-[auto] flex flex-col items-center justify-center">
           <div className="w-auto h-auto mt-1">
            <img src='./assets/show.png' className="w-[250px] h-[250px]" />
           </div>
           <div className="loader"></div> 
        </div>
    </div>
    )
}