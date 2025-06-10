"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

interface AuthContextType {
  token: string | null
  user: any | null
  setToken: (token: string | null) => void
  setUser: (user: any | null) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(null)
  const [user, setUser] = useState<any | null>(null)

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken")
    if (storedToken) {
      setTokenState(storedToken)
      if (!user) fetchUserProfile(storedToken)
    }
  }, [])

  const setToken = (newToken: string | null) => {
    if (newToken) {
      localStorage.setItem("authToken", newToken)
      setTokenState(newToken)
      fetchUserProfile(newToken)
    } else {
      localStorage.removeItem("authToken")
      logout()
    }
  }

  const fetchUserProfile = async (token: string) => {
    try {
      const res = await fetch("http://localhost:5000/users/profile", {
        headers: { Authorization: `Bearer ${token}` }
      })
      const userData = await res.json()
      setUser(userData.user)
    } catch (err) {
      console.error("Invalid token or user fetch failed")
      logout()
    }
  }

  const logout = () => {
    setToken(null)
    setUser(null)
  }

  return <AuthContext.Provider value={{ token, user, setToken, setUser, logout }}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuthContext must be used within AuthProvider")

  return context
}
