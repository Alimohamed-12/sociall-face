import React, { createContext, useState } from 'react'
export const CounterContext=createContext()

export default function CountContextprovider({children}) {

    const [counter , setCounter]=useState()
  return (
   <CounterContext.Provider value={{counter,setCounter}}>
         {children}
   </CounterContext.Provider>
  )
}

