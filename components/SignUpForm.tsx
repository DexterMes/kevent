"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"

import { useAuthContext } from "../contexts/AuthContext"

const SignUpForm = () => {
  const router = useRouter()
  const { setToken } = useAuthContext()

  const [isAllowed, setIsAllowed] = useState(true)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    batch: "",
    department: "",
    year: "",
    semester: "",
    termsAccepted: false
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value, type } = e.target
    const newValue = type === "checkbox" && e.target instanceof HTMLInputElement ? e.target.checked : value
    setFormData((prev) => ({ ...prev, [id]: newValue }))
  }

  const handleGoogleAuth = () => {
    window.open("http://localhost:5000/auth/google", "_blank", "width=500,height=600")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.termsAccepted) {
      alert("Please accept the terms and conditions.")
      return
    }

    setIsAllowed(false)

    try {
      const response = await fetch("http://localhost:5000/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          batch: Number(formData.batch),
          department: formData.department,
          year: Number(formData.year)
        })
      })

      if (!response.ok) {
        setIsAllowed(true)
        alert("Registration failed!")
      } else {
        setIsAllowed(true)
        router.push("/login")
      }
    } catch (err) {
      console.error(err)
      alert("Something went wrong!")
    }
  }

  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      if (event.origin !== "https://kevent-server.onrender.com") return

      const { access_token } = event.data
      if (!access_token) return

      try {
        const response = await fetch("http://localhost:5000/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ access_token })
        })
        const data = await response.json()

        if (!response.ok) {
          alert(data.message || "Google signup failed")
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
    <div className="w-full max-w-lg rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
      <form className="flex flex-col space-y-4">
        <h5 className="self-center text-2xl font-medium text-gray-900 dark:text-white">Create your account</h5>

        {/* First Name and Last Name */}
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="firstName" className="mb-1 block text-sm font-medium text-gray-900 dark:text-white">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="John"
              required
              value={formData.firstName}
              onChange={handleChange}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="mb-1 block text-sm font-medium text-gray-900 dark:text-white">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              placeholder="Doe"
              required
              value={formData.lastName}
              onChange={handleChange}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-900 dark:text-white">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="john.doe@company.com"
            required
            value={formData.email}
            onChange={handleChange}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
          />
        </div>

        {/* Department Dropdown */}
        <div>
          <label htmlFor="department" className="mb-1 block text-sm font-medium text-gray-900 dark:text-white">
            Department
          </label>
          <select
            id="department"
            required
            value={formData.department}
            onChange={handleChange}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            <option value="">Select Department</option>
            <option value="cse">Computer Science</option>
            <option value="ece">Electronics and Communication</option>
            <option value="mech">Mechanical</option>
            <option value="civil">Civil</option>
          </select>
        </div>

        {/* Batch Section */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Year */}
          <div>
            <label htmlFor="batch" className="mb-1 block text-sm font-medium text-gray-900 dark:text-white">
              Batch
            </label>
            <input
              type="text"
              id="batch"
              placeholder="2025"
              required
              value={formData.batch}
              onChange={handleChange}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            />
          </div>

          {/* Year Dropdown */}
          <div>
            <label htmlFor="year" className="mb-1 block text-sm font-medium text-gray-900 dark:text-white">
              Year
            </label>
            <select
              id="year"
              required
              value={formData.year}
              onChange={handleChange}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select Semester</option>
              <option value="1">1st</option>
              <option value="2">2nd</option>
              <option value="3">3rd</option>
              <option value="4">4th</option>
            </select>
          </div>
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-900 dark:text-white">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="•••••••••"
            required
            value={formData.password}
            onChange={handleChange}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
          />
        </div>

        {/* Terms and Conditions */}
        <div className="flex items-start">
          <div className="flex h-5 items-center">
            <input
              id="termsAccepted"
              type="checkbox"
              required
              checked={formData.termsAccepted}
              onChange={handleChange}
              className="h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
            />
          </div>
          <label htmlFor="termsAccepted" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            I agree with the{" "}
            <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">
              terms and conditions
            </a>
            .
          </label>
        </div>

        {/* Create Account Button */}
        <button
          type="submit"
          disabled={!isAllowed}
          onClick={handleSubmit}
          className={`mt-4 w-full rounded-lg px-4 py-2 text-center text-sm font-medium ${
            isAllowed
              ? "bg-blue-700 text-white hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700"
              : "cursor-not-allowed bg-gray-400 text-gray-200"
          } focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800`}
        >
          Create Account
        </button>

        <button
          type="button"
          onClick={handleGoogleAuth}
          className="flex w-full items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 focus:outline-none"
        >
          <Image src="https://developers.google.com/identity/images/g-logo.png" alt="Google Logo" width={20} height={20} className="mr-2 h-5 w-5" />
          Sign up with Google
        </button>

        {/* Sign In Link */}
        <div className="self-center text-sm font-medium text-gray-500 dark:text-gray-300">
          Already have an account?{" "}
          <Link className="text-blue-700 hover:underline dark:text-blue-500" href="/login">
            Sign-in
          </Link>
        </div>
      </form>
    </div>
  )
}

export default SignUpForm
