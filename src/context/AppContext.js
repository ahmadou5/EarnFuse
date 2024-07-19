'use client'
import { createContext, useContext, useState } from "react";


const TapContext = createContext()



export const TapContextProvider = ({children}) => {
  const value = {}
  return(
  <TapContext.Provider value={value} >
    {children}
  </TapContext.Provider>
)
}

export const GlobalContext = () => useContext(TapContext)