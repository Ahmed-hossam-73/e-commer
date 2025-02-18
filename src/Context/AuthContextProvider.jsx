import { createContext, useEffect, useState } from 'react'
import { jwtDecode } from "jwt-decode";
export let AuthContext = createContext()
export default function AuthContextProvider({children}) {
    let [token,setToken]= useState(null)
    let [userData,setUserData]=useState(null);
    useEffect(()=>{
      let TokenStorage = localStorage.getItem('token')
      if(TokenStorage){
        setToken(TokenStorage)
        decodeData(TokenStorage)
      }
    },[])

    function decodeData(token){
      let data = jwtDecode(token)
      setUserData(data)
    }
  return (
    <AuthContext.Provider value={{token,setToken , decodeData,userData}}>
        {children}
    </AuthContext.Provider>
    )
}
