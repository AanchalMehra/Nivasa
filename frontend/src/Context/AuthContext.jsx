import React, { useState,createContext } from 'react'

export const AuthDataContext = createContext()

function AuthContext({ children }) {
  const [loading, setLoading] = useState(false)
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  const serverUrl = import.meta.env.VITE_SERVER_URL
  const value = { serverUrl,
    loading, setLoading,
    showLoginPrompt, setShowLoginPrompt
   }
  return (
    <div>
      <AuthDataContext.Provider value={value}>
        {children}
      </AuthDataContext.Provider>
    </div>
  )
}

export default AuthContext
