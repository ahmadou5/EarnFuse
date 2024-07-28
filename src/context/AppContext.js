'use client'
import { createContext, useContext, useState } from "react";


const TapContext = createContext()



export const TapContextProvider = ({children}) => {
  const [isConfe, setIsConfe] = useState(false)
  const [isAuth,setIsAuth] = useState(false)
  const [taskURL,setTaskURL] = useState('')
  const [taskButton,setTaskButton] = useState('')
  const [taskName,setTaskName] = useState('')
  const [taskAmount,setTaskAmount] = useState(0)
  const [isHome,setIsHome] = useState(true)
  const [tgUser, setTgUser] = useState(null);
  const [isFrens,setIsFrens] = useState(false)
  const [isTask,setIsTask] = useState(false)
  const [isBoost,setIsBoost] = useState(false)
  const [isClaimModal,setIsClaimModal] = useState(false)
  const value = {
    isHome,
    isFrens,
    isTask,
    isBoost,
    isAuth,
    tgUser,
    isClaimModal,
    taskName,
    taskAmount,
    taskURL,
    taskButton,
    setTaskButton,
    setTaskURL,
    setTaskAmount,
    setTaskName,
    setIsClaimModal,
    setTgUser,
    setIsAuth,
    setIsBoost,
    setIsTask,
    setIsFrens,
    setIsHome
  }
  return(
  <TapContext.Provider value={value} >
    {children}
  </TapContext.Provider>
)
}

export const GlobalContext = () => useContext(TapContext)