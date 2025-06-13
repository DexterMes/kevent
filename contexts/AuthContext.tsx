"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

interface AuthContextType {
  token: string | null
  user: any | null
  loading: boolean
  setToken: (token: string | null) => void
  setUser: (user: any | null) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(null)
  const [user, setUser] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken")
    if (storedToken) {
      setTokenState(storedToken)
      fetchUserProfile(storedToken)
    } else {
      setLoading(false)
    }
  }, [])

  const setToken = (newToken: string | null) => {
    if (newToken) {
      localStorage.setItem("authToken", newToken)
      setTokenState(newToken)
      fetchUserProfile(newToken)
    } else {
      localStorage.removeItem("authToken")
      setTokenState(null)
      setUser(null)
    }
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    setLoading(false)
  }

  const fetchUserProfile = async (token: string) => {
    try {
      const res = await fetch("http://localhost:5000/users/profile", {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (!res.ok) throw new Error("Failed to fetch user")
      const userData = await res.json()
      setUser(userData.user)
    } catch (err) {
      console.error("Invalid token or user fetch failed")
      logout()
    } finally {
      setLoading(false)
    }
  }

  return <AuthContext.Provider value={{ token, user, loading, setToken, setUser, logout }}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuthContext must be used within AuthProvider")
  return context
}
