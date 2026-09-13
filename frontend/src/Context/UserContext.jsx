import React from 'react'
import { createContext, useContext, useEffect } from 'react'
import { AuthDataContext } from './AuthContext'
import {useState} from 'react'
import axios from 'axios'
export const UserDataContext=createContext()

function UserContext({children}) {
 const {serverUrl}=useContext(AuthDataContext)
 const [userData,setUserData]=useState(null)
 const [loading,setLoading]=useState(true)

 const getCurrentUserData=async()=>{
    try {
        const result=await axios.get(`${serverUrl}/api/user/currentuser`,{
            withCredentials: true
        })
        setUserData(result.data)
    } catch (error) {
        setUserData(null)
        console.error('Error fetching user data:', error)
    } finally {
        setLoading(false)
    }
 }

 useEffect(()=>{
    getCurrentUserData()
 },[])

 const value={
    userData,
    setUserData,
    loading,
    getCurrentUserData,
 }

  return (
    <UserDataContext.Provider value={value}>
        {children}
    </UserDataContext.Provider>
  )
}

export default UserContext