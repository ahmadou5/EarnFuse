'use client'
import { GlobalContext } from "@/context/AppContext"
import { UseCreateUSer } from "@/hooks/useCreateAccounts"
import { UseGetTgData } from "@/hooks/useGetUserData"
import { Supabase } from "@/utils/supabasedb"
import { useEffect } from "react"

export const Loading = () => {
    const { tgUser, setTgUser } = GlobalContext()
    const create = UseCreateUSer()
    console.log(create)
    const checkUser =  async() => {
        const username = 'Ahmadou'
        const userId = '0000000000'
        const { data } = await Supabase
        .from('Users')
        .select('*')
        .eq('id',userId)
        .single()
    }
    const createUser = async() => {
        try {
            const username = tgUser?.initDataUnsafe?.user?.username
            const userId = tgUser?.initDataUnsafe?.user?.id
            console.log('creatingggg.................user')
            const { data, error } = await Supabase
            .from('Users')
            .insert([
                {id:'0000000', username:'676767', pointsAdd: 1}
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
    useEffect(() => {
        function initTg() {
            if (
              typeof window !== "undefined" &&
              window.Telegram &&
              window.Telegram.WebApp
            ) {
              console.log("Telegram WebApp is set");
              const tgData = window.Telegram.WebApp;
              console.log('data id',tgData?.initDataUnsafe?.user?.id)
              setTgUser(tgData);
              return tgData
             // setTgUser(tgData);
            } else {
              console.log("Telegram WebApp is undefined, retrying…");
              //console.log(user);
              setTimeout(initTg, 500);
            }
          }
          initTg();
          createUser();
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