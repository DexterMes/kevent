"use client"

import React, { useState } from "react"

import CreateEventModal from "./ui/CreateEventModal"

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="flex h-screen items-center justify-center">
      <button onClick={() => setIsModalOpen(true)} className="rounded-lg bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-700">
        Open Modal
      </button>

      <CreateEventModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}

export default App
