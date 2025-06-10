"use client"

import React, { createContext, useContext, useState } from "react"

interface EventContextType {
  selectedEvent: any
  setSelectedEvent: (event: any) => void
}

const EventContext = createContext<EventContextType | undefined>(undefined)

export const EventProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedEvent, setSelectedEvent] = useState(null)

  return <EventContext.Provider value={{ selectedEvent, setSelectedEvent }}>{children}</EventContext.Provider>
}

export const useEventContext = () => {
  const context = useContext(EventContext)
  if (!context) {
    throw new Error("useEventContext must be used within EventProvider")
  }
  return context
}
