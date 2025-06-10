"use client"

import { DarkThemeToggle } from "flowbite-react/components/DarkThemeToggle"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"

import { useAuthContext } from "../contexts/AuthContext"

const NavBar = () => {
  const [searchText, setSearchText] = useState("")
  const { user } = useAuthContext()
  const router = useRouter()

  const [isDark, setIsDark] = useState(false)

  const handleSearch = () => {
    if (searchText.trim()) router.push(`/?query=${encodeURIComponent(searchText.trim())}`)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch()
  }

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    setIsDark(prefersDark)
    document.documentElement.classList.toggle("dark", prefersDark)
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle("dark", !isDark)
  }

  return (
    <nav className="flex h-14 w-full items-center justify-between border-b-1 border-gray-200 bg-white px-4 py-2 dark:border-gray-700 dark:bg-gray-900">
      <div className="flex flex-row space-x-10">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="icons/Logo.svg" className="h-8" alt="Flowbite Logo" />
          <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">Kevent</span>
        </Link>
        <div className="relative mx-4 w-full max-w-md px-4 md:block">
          <div className="pointer-events-none absolute inset-y-0 start-4 flex items-center ps-3">
            <svg
              className="h-4 w-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search..."
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
          />
        </div>
      </div>

      <div className="flex h-full flex-row space-x-5">
        {user && user.avatarURL ? (
          <Link href="/profile" className="aspect-square h-full overflow-hidden rounded-full border-2">
            <Image src={user.avatarURL} alt="Profile Avatar" width={40} height={40} className="cursor-pointer  rounded-full transition-transform" />
          </Link>
        ) : (
          <Link
            href="/login"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
          >
            Sign In
          </Link>
        )}
        <DarkThemeToggle onClick={toggleTheme} />
      </div>
    </nav>
  )
}

export default NavBar
