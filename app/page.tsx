"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

import EventPreviewCard from "../components/EventPreviewCard"
import Filter from "../components/Filters"
import Footer from "../components/Footer"
import NavBar from "../components/NavBar"

type Event = {
  _id: string
  Title: string
  Description: string
  contactNumber: number
  Venue: string
  date: string
  Price: string
  Files: string[]
  Images: string[]
  mainImage: string
  department?: string
  club?: string
  userId: string
}

export default function Home() {
  const [events, setEvents] = useState<Event[]>([])
  const router = useRouter()
  const searchParams = useSearchParams()
  const query = searchParams.get("query")?.toLowerCase() || ""

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:5000/events/viewevents", {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        })

        const data = await res.json()

        setEvents(data.events || [])
      } catch (error) {
        console.error("Failed to fetch events:", error)
      }
    }

    fetchEvents()
  }, [])

  const filteredEvents = events
    .map((event) => {
      const titleMatch = event.Title.toLowerCase().includes(query)
      const descriptionMatch = event.Description.toLowerCase().includes(query)
      const rank = titleMatch ? 1 : descriptionMatch ? 2 : 3
      return { ...event, rank, titleMatch, descriptionMatch }
    })
    .filter((e) => e.rank < 3)
    .sort((a, b) => a.rank - b.rank)

  const handleCardClick = (event: any) => {
    router.push(`/event?query=${encodeURIComponent(event._id)}`)
  }

  return (
    <main>
      <NavBar />
      <div className="flex flex-row">
        <Filter />
        <div className="p-10 dark:bg-gray-900">
          {query ? (
            <>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                You Searched For: <span className="text-blue-600 dark:text-blue-400">"{query}"</span>
                <div className="mb-6 mt-2 h-1 w-full max-w-xs bg-blue-500"></div>
              </h2>
              <div className="flex flex-wrap gap-10 ">
                {filteredEvents.map((event, index) => (
                  <EventPreviewCard key={index} handleCardClick={() => handleCardClick(event)} event={event} />
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-wrap gap-10 ">
              {events.map((event, index) => (
                <EventPreviewCard key={index} handleCardClick={() => handleCardClick(event)} event={event} />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  )
}
