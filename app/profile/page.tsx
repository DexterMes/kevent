"use client"

import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"

import EditProfile from "../../components/EditProfile"
import NavBar from "../../components/NavBar"
import Sidebar from "../../components/Sidebar"
import UserEventCard from "../../components/UserEventCard"
import { useAuthContext } from "../../contexts/AuthContext"

export interface Event {
  _id: string
  Title: string
  Venue: string
  date: string
  mainImage: string
}

interface Ticket {
  _id: string
  userId: string
  eventId: Event
  ticketCount: number
  __v: number
}

export default function Profile() {
  const [selectedOption, setSelectedOption] = useState("profile")
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [events, setEvents] = useState<Event[]>([])
  const [history, setHistory] = useState<Ticket[]>([])

  const { token, user, loading } = useAuthContext()

  const router = useRouter()

  const fetchEvents = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:5000/users/viewevents", {
        headers: { Authorization: `Bearer ${token}` }
      })

      const data = await res.json()

      if (data.events && data.events.length) setEvents([...data.events])
      else setEvents([])
    } catch (err) {
      console.error("Error fetching tickets:", err)
    }
  }, [token])

  useEffect(() => {
    if (!loading && (!user || !token)) router.push("/login")

    const fetchTickets = async () => {
      try {
        const res = await fetch("http://localhost:5000/users/viewtickets", {
          headers: { Authorization: `Bearer ${token}` }
        })

        const data = await res.json()
        const currentDate = new Date()

        const futureEvents: Ticket[] = []
        const pastEvents: Ticket[] = []

        if (data.tickets && data.tickets.length)
          data.tickets.forEach((ticket: Ticket) => {
            const eventDate = new Date(ticket.eventId.date)
            if (eventDate >= currentDate) futureEvents.push(ticket)
            else pastEvents.push(ticket)
          })

        setTickets(futureEvents)
        setHistory(pastEvents)
      } catch (err) {
        console.error("Error fetching tickets:", err)
      }
    }

    if (token) fetchEvents()
    if (token) fetchTickets()
  }, [user, token, router, loading, fetchEvents])

  if (loading) {
    return (
      <main className="flex h-screen w-full items-center justify-center bg-white dark:bg-gray-900">
        <p className="text-lg text-gray-700 dark:text-gray-300">Loading profile...</p>
      </main>
    )
  }

  if (!loading && (!user || !token)) return null

  return (
    <main>
      <NavBar />
      <div className="flex h-full w-full flex-row">
        {/* Sidebar */}
        <Sidebar setSelectedOption={setSelectedOption} selectedOption={selectedOption} />

        {/* Main Content */}
        <div className="flex w-[85%] flex-col gap-5 bg-white p-10 dark:bg-gray-900">
          {selectedOption === "profile" && <EditProfile />}
          {selectedOption === "tickets" && tickets.map((ticket) => <UserEventCard key={ticket._id} event={ticket.eventId} variant="event" />)}
          {selectedOption === "events" &&
            events.map((event) => <UserEventCard key={event._id} event={event} token={token!} onDelete={fetchEvents} variant="edit" />)}
          {selectedOption === "history" && history.map((ticket) => <UserEventCard key={ticket._id} event={ticket.eventId} variant="history" />)}
        </div>
      </div>
    </main>
  )
}
