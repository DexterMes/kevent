"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

import CreateEvent from "../../../components/CreateEvent"
import NavBar from "../../../components/NavBar"
import { useAuthContext } from "../../../contexts/AuthContext"

export default function Event() {
  const router = useRouter()
  const { user, token, loading } = useAuthContext()

  useEffect(() => {
    if (!loading && (!user || !token)) {
      router.push("/login")
    }
  }, [user, token, router, loading])

  if (!loading && (!user || !token)) return null

  return (
    <main>
      <NavBar />
      <CreateEvent token={token!} />
    </main>
  )
}
