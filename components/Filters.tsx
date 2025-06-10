"use client"

import React, { useState } from "react"

const Filter: React.FC = () => {
  const [selectedTime, setSelectedTime] = useState("all")
  const [selectedDepartment, setSelectedDepartment] = useState("")
  const [price, setPrice] = useState(500)

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTime(e.target.value)
  }

  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDepartment(e.target.value)
  }

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(e.target.value))
  }

  return (
    <aside className="h-[100vh] w-64 bg-gray-100 p-4 dark:bg-gray-800">
      <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Filters</h2>

      {/* Time Filter */}
      <div className="mb-6">
        <h3 className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Time</h3>
        <div className="space-y-2">
          {["all", "day", "week", "month"].map((time) => (
            <label className="flex items-center" key={time}>
              <input
                type="radio"
                name="time"
                value={time}
                checked={selectedTime === time}
                onChange={handleTimeChange}
                className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              />
              <span className="ml-2 text-sm capitalize text-gray-900 dark:text-gray-300">{time == "all" ? time : "This " + time}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Department Filter */}
      <div className="mb-6">
        <h3 className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Department</h3>
        <select
          value={selectedDepartment}
          onChange={handleDepartmentChange}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        >
          <option value="">Select Department</option>
          <option value="cse">Computer Science</option>
          <option value="ece">Electronics and Communication</option>
          <option value="mech">Mechanical</option>
          <option value="civil">Civil</option>
        </select>
      </div>

      {/* Price Filter */}
      <div>
        <h3 className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</h3>
        <div className="flex items-center space-x-2">
          <input
            type="range"
            min="0"
            max="1000"
            value={price}
            onChange={handlePriceChange}
            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
          />
          <span className="text-sm font-medium text-gray-900 dark:text-white">Rs. {price}</span>
        </div>
      </div>
    </aside>
  )
}

export default Filter
