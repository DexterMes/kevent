"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useState } from "react"

import { useAuthContext } from "../contexts/AuthContext"

const SignInForm = () => {
  const router = useRouter()
  const { setToken, setUser } = useAuthContext()

  const [formData, setFormData] = useState({ email: "", password: "" })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
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
      console.log(result)
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

  return (
    <div className="w-full max-w-sm rounded-lg border border-gray-200 bg-white p-4 shadow dark:border-gray-700 dark:bg-gray-800 sm:p-6 md:p-8">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">Welcome to Kevent</h5>
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
        <div>
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
        </div>
        <a href="#" className="text-sm text-blue-700 hover:underline dark:text-blue-500">
          Forgot Password?
        </a>
        <button
          type="submit"
          className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Login to your account
        </button>
        <button
          type="button"
          className="flex w-full items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200"
        >
          <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google Logo" className="mr-2 h-5 w-5" />
          Sign in with Google
        </button>

        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
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
