"use client"

import React, { useEffect, useState } from "react"

import { useAuthContext } from "../contexts/AuthContext" // update the path as needed

const EditProfile: React.FC = () => {
  const { user, token, setUser } = useAuthContext()

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    department: "",
    year: "",
    batch: ""
  })

  const [initialData, setInitialData] = useState(formData)
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [isChanged, setIsChanged] = useState(false)

  useEffect(() => {
    if (user) {
      const { firstName = "", lastName = "", department = "", year = "", batch = "", avatarURL = "" } = user

      const filled = {
        firstName,
        lastName,
        department,
        year,
        batch
      }
      setFormData(filled)
      setInitialData(filled)
      setProfileImage(avatarURL || null)
    }
  }, [user])

  useEffect(() => {
    setIsChanged(JSON.stringify(formData) !== JSON.stringify(initialData))
  }, [formData, initialData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleProfileImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && token) {
      const file = e.target.files[0]
      const form = new FormData()
      form.append("avatar", file)

      try {
        const res = await fetch("http://localhost:5000/users/upload-profileImage", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: form
        })

        if (!res.ok) throw new Error("Upload failed")
        const updated = await res.json()
        setUser((prev: any) => ({ ...prev, avatarURL: updated.avatarURL }))
        setProfileImage(updated.avatarURL)
      } catch (err) {
        console.error(err)
        alert("Image upload failed")
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!token) return

    try {
      const res = await fetch("http://localhost:5000/users/update-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      if (!res.ok) throw new Error("Update failed")
      const updatedUser = await res.json()
      setUser(updatedUser.user)
      setInitialData(formData)
      setIsChanged(false)
      alert("Profile updated")
    } catch (err) {
      console.error(err)
      alert("Failed to update profile")
    }
  }

  return (
    <div className="w-full px-60">
      <div className="mb-6 flex flex-col items-center">
        <div className="relative">
          <div className="h-32 w-32 overflow-hidden rounded-full border border-gray-300 bg-gray-100 dark:border-gray-600 dark:bg-gray-700">
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center text-gray-400">No Image</div>
            )}
          </div>
          <label
            htmlFor="profileImage"
            className="absolute bottom-0 right-3 h-7 w-7 cursor-pointer rounded-full bg-blue-600 text-center text-2xl leading-none text-white hover:bg-blue-700"
          >
            +
          </label>
          <input type="file" id="profileImage" accept="image/*" onChange={handleProfileImageChange} className="hidden" />
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="firstName" className="mb-1 block text-sm font-medium text-gray-900 dark:text-white">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="lastName" className="mb-1 block text-sm font-medium text-gray-900 dark:text-white">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-900 dark:text-white">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={user.email}
            readOnly
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div className="mt-4">
          <label htmlFor="department" className="mb-1 block text-sm font-medium text-gray-900 dark:text-white">
            Department
          </label>
          <select
            id="department"
            value={formData.department}
            onChange={handleChange}
            required
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm dark:bg-gray-700 dark:text-white"
          >
            <option value="">Select Department</option>
            <option value="DoCSE">Computer Science</option>
            <option value="DoECE">Electronics</option>
            <option value="DoME">Mechanical</option>
            <option value="DoCE">Civil</option>
          </select>
        </div>

        <div className="mt-4 grid gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="year" className="mb-1 block text-sm font-medium text-gray-900 dark:text-white">
              Batch
            </label>
            <input
              type="text"
              id="batch"
              value={formData.batch}
              onChange={handleChange}
              required
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="year" className="mb-1 block text-sm font-medium text-gray-900 dark:text-white">
              Year
            </label>
            <select
              id="year"
              value={formData.year}
              onChange={handleChange}
              required
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select Year</option>
              <option value="1">1st</option>
              <option value="2">2nd</option>
              <option value="3">3rd</option>
              <option value="4">4th</option>
            </select>
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-900 dark:text-white">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm dark:bg-gray-700 dark:text-white"
          />
        </div>

        <button
          type="submit"
          disabled={!isChanged}
          className={`mt-6 w-full rounded-lg px-5 py-2.5 font-medium text-white focus:outline-none focus:ring-4 
            ${isChanged ? "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500" : "cursor-not-allowed bg-gray-400"}`}
        >
          Save Changes
        </button>
      </form>
    </div>
  )
}

export default EditProfile
