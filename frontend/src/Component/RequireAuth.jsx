import React, { useContext, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthDataContext } from '../Context/AuthContext'
import { UserDataContext } from '../Context/UserContext'

function RequireAuth({ children }) {
  const { userData } = useContext(UserDataContext)
  const { setShowLoginPrompt } = useContext(AuthDataContext)

  useEffect(() => {
    if (!userData) {
      setShowLoginPrompt(true)
    }
  }, [userData])

  if (!userData) {
    return <Navigate to="/" replace />
  }

  return children
}

export default RequireAuth
