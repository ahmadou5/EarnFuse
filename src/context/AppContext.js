'use client'
import { createContext, useContext, useState } from "react";


const TapContext = createContext()



export const TapContextProvider = ({children}) => {
  const [isAuth,setIsAuth] = useState(false)
  const [isHome,setIsHome] = useState(true)
  const [isFrens,setIsFrens] = useState(false)
  const [isTask,setIsTask] = useState(false)
  const [isBoost,setIsBoost] = useState(false)
  const value = {
    isHome,
    isFrens,
    isTask,
    isBoost,
    isAuth,
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