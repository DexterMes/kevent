"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"

import { useAuthContext } from "../contexts/AuthContext"

const SignInForm = () => {
  const router = useRouter()
  const { setToken } = useAuthContext()

  const [formData, setFormData] = useState({ email: "", password: "" })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleGoogleAuth = () => {
    window.open("http://localhost:5000/auth/google", "_blank", "width=500,height=600")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch("http://localhost:5000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      })

      const result = await response.json()
      if (!response.ok) {
        alert(result.message || "Login failed")
        return
      }

      setToken(result.token)
      router.push("/")
    } catch (error) {
      console.error(error)
      alert("Something went wrong!")
    }
  }

  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      if (event.origin !== "https://kevent-server.onrender.com") return

      const { access_token } = event.data
      if (!access_token) return

      try {
        const response = await fetch("http://localhost:5000/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ access_token })
        })

        const data = await response.json()

        if (!response.ok) {
          alert(data.message || "Google login failed")
          return
        }

        setToken(data.token)
        router.push("/")
      } catch (err) {
        console.error("Google login error:", err)
        alert("Google login failed")
      }
    }

    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  }, [router, setToken])

  return (
    <div className="w-full max-w-sm rounded-lg border border-gray-200 bg-white p-4 shadow sm:p-6 md:p-8 dark:border-gray-700 dark:bg-gray-800">
      <form className="flex flex-col space-y-5" onSubmit={handleSubmit}>
        <h5 className="self-center text-2xl font-semibold text-gray-900 dark:text-white">Welcome to Kevent</h5>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
            Your email
          </label>
          <input
            type="email"
            id="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="name@company.com"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
            Your password
          </label>
          <input
            type="password"
            id="password"
            required
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
          />
          <a href="#" className="mt-1 self-end text-sm text-blue-700 hover:underline dark:text-blue-500">
            Forgot Password?
          </a>
        </div>
        <div className="space-y-2">
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login to your account
          </button>
          <button
            type="button"
            onClick={handleGoogleAuth}
            className="flex w-full items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 focus:outline-none"
          >
            <Image src="https://developers.google.com/identity/images/g-logo.png" alt="Google Logo" width={20} height={20} className="mr-2 h-5 w-5" />
            Sign in with Google
          </button>
        </div>
        <div className="self-center text-sm font-medium text-gray-500 dark:text-gray-300">
          Not registered?{" "}
          <Link className="text-blue-700 hover:underline dark:text-blue-500" href="/signup">
            Create account
          </Link>
        </div>
      </form>
    </div>
  )
}

export default SignInForm
