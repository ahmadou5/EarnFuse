'use client'
import { createContext, useContext, useState } from "react";


const TapContext = createContext()



export const TapContextProvider = ({children}) => {
  const [userRank,setUserRank] = useState(0)
  const [taskId,setTaskId] = useState('')
  const [userBoard,setUserBoad] = useState(null)
  const [reffs,setReff] = useState([])
  const [leads,setLeads] = useState([])
  const [lastClaim,setLastClaim] = useState('')
  const [userData,setUserData] = useState([])
  const [isConfe, setIsConfe] = useState(false)
  const [isAuth,setIsAuth] = useState(false)
  const [taskURL,setTaskURL] = useState('')
  const [taskButton,setTaskButton] = useState('')
  const [taskName,setTaskName] = useState('')
  const [taskAmount,setTaskAmount] = useState(0)
  const [isHome,setIsHome] = useState(true)
  const [isGame,setIsGame] = useState(false)
  const [tgUser, setTgUser] = useState(null);
  const [isFrens,setIsFrens] = useState(false)
  const [isTask,setIsTask] = useState(false)
  const [isBoost,setIsBoost] = useState(false)
  const [user,setUser] = useState(null)
  const [userBalance,setUserBalance] = useState(0)
  const [isClaimModal,setIsClaimModal] = useState(false)
  const [isBoostModal,setIsBoostModal] = useState(false)
  const [tasks, setTask] = useState([])
  const [claimedTask, setClaimedTask] = useState([]);
  const [taskType,setTaskType] = useState('')
  const [isFirst, setIsFirst] = useState(false)
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
    isConfe, 
    isBoostModal,
    user,
    userBalance,
    reffs,
    userData,
    isGame,
    lastClaim,
    leads,
    userRank,
    userBoard,
    taskId,
    tasks,
    claimedTask, 
    taskType,
    isFirst, 
    setIsFirst,
    setTaskType,
    setClaimedTask,
    setTask,
    setTaskId,
    setUserBoad,
    setUserRank,
    setLeads,
    setLastClaim,
    setIsGame,
    setUserData,
    setReff,
    setUserBalance,
    setUser,
    setIsBoostModal,
    setIsConfe,
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