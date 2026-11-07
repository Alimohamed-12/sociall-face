import React, { createContext, useEffect, useState } from 'react'
import { jwtDecode } from "jwt-decode";
 export const authContext=createContext()

export default function AuthContextProvider({children}) {

    const [userLogin , setuserLogin]=useState(null)
    const [userId,setuserId]=useState(null)
   
    useEffect(()=>{
        if(localStorage.getItem('token')){
          setuserLogin(localStorage.getItem('token'))
        }   
    },[])

    useEffect(()=>{
        if(localStorage.getItem('token')){
            const {user}= jwtDecode(localStorage.getItem('token'))
            setuserId(user)  
        }
    },[userLogin])

    console.log(userId, 'user in auth');
    console.log(userLogin,'userlogin');
    
    

  return (
    <authContext.Provider value={{userLogin,setuserLogin,userId}}>
      {children}
    </authContext.Provider>
  )
}


