import { useEffect } from "react";
import { GlobalContext } from "@/context/AppContext";
export const UseCreateUSer = () => {
    const { tgUser, setTgUser } = GlobalContext()
    useEffect(() => {
        const createUser = async() => {
            try {
                const username = tgUser?.initDataUnsafe?.user?.username
                const userId = tgUser?.initDataUnsafe?.user?.id
                console.log(username,'name')
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
        createUser();
    },[])
}