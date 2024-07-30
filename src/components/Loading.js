'use client'
import { GlobalContext } from "@/context/AppContext"
import { UseCreateUSer } from "@/hooks/useCreateAccounts"
import { UseGetTgData } from "@/hooks/useGetUserData"
import { Supabase } from "@/utils/supabasedb"
import { useEffect, useState } from "react"

export const Loading = () => {
    const [username, setUsername] = useState('')
    const [userId, setUserId] = useState('')
    const { tgUser, setTgUser } = GlobalContext()
    const create = UseCreateUSer()
    console.log(create)
    const checkUser =  async() => {
       
        const { data } = await Supabase
        .from('Users')
        .select('*')
        .eq('id',userId)
        .single()
    }
    
    useEffect(() => {
        async function initTg() {
            if (
              typeof window !== "undefined" &&
              window.Telegram &&
              window.Telegram.WebApp
            ) {
              console.log("Telegram WebApp is set");
              const tgData = window.Telegram.WebApp;
              setUsername(tgData?.initDataUnsafe?.user?.username)
              setUserId(tgData?.initDataUnsafe?.user?.id)
              console.log('data id',tgData?.initDataUnsafe?.user?.id)
              setTgUser(tgData);
            } else {
              console.log("Telegram WebApp is undefined, retrying…");
              //console.log(user);
              setTimeout(initTg, 100);
            }
          }
          initTg();
          const createUser = async() => {
            try {
                //const username = tgUser?.initDataUnsafe?.user?.username
                //const userId = tgUser?.initDataUnsafe?.user?.id
                console.log('creatingggg.................user')
                console.log(userId,'id')
                console.log(username,'username')
                const { data, error } = await Supabase
                .from('Users')
                .insert([
                    {id:userId, username:username, pointsAdd: 1}
                ])
                .select()
    
                if(data) {
                    console.log(data,'doneeeeee')
                    alert(data, 'done')
                } 
                if (error) {
                    throw error
                }
               } catch (error) {
                console.log(error)
               }
        }
        const interval = setInterval(() => {
            createUser()
         },2000)
        // Your function here
        alert('Component mounted');
      }, []);
    return(
    <div className="inset-0 fixed bg-black/60 bg-opacity-100 w-[100%] z-[99999999] min-h-screen h-auto backdrop-blur-sm flex ">
        <div className="w-[100%] h-[auto] flex flex-col items-center justify-center">
           <div className="w-auto h-auto mt-1">
            <img src='./assets/show.png' className="w-[250px] h-[250px]" />
           </div>
           <div class="loader"></div> 
        </div>
    </div>
    )
}