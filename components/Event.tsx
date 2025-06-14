"use client"

import { Download } from "lucide-react"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import React, { useEffect, useState } from "react"

import { Event } from "../app/page"
import { useAuthContext } from "../contexts/AuthContext"

const EventDetails: React.FC = () => {
  const [event, setEvent] = useState<Event | null>(null)
  const [ticketPrice, setTicketPrice] = useState(0)
  const [numTickets, setNumTickets] = useState(1)
  const [isAllowed, setIsAllowed] = useState(true)

  const router = useRouter()
  const { token } = useAuthContext()

  const searchParams = useSearchParams()
  const query = searchParams.get("query")?.toLowerCase() || ""

  const totalPrice = numTickets * ticketPrice

  useEffect(() => {
    const fetchEvent = async () => {
      const res = await fetch(`http://localhost:5000/events/viewevent/${query}`)
      const data = await res.json()
      setEvent(data.event)
      setTicketPrice(data.event.Price ? parseInt(data.event.Price) : 0)
    }
    fetchEvent()
  }, [query])

  async function createBooking() {
    setIsAllowed(false)
    try {
      if (!event || !event._id) return
      const res = await fetch(`http://localhost:5000/tickets/booktickets/${event._id}`, {
        method: "POST",
        body: JSON.stringify({ ticket: numTickets }),
        headers: { Authorization: `Bearer ${token}` }
      })

      if (!res.ok) setIsAllowed(true)
      else {
        setIsAllowed(true)
        router.push("/")
      }
    } catch (err) {
      console.error("Error booking tickets:", err)
    }
  }

  if (!event) return <div className="p-12 text-white">Loading...</div>

  const eventDate = new Date(event.date)
  const formattedDate = eventDate.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
  const formattedTime = eventDate.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })

  const additionalFiles = event.Files.map((url: string) => {
    const name = url.split("/").pop() || "file"
    const ext = name.split(".").pop()
    return { url, name, type: ext === "pdf" ? "pdf" : "image" }
  })

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="relative h-80 w-full">
        <Image src={event.mainImage} alt="Event Banner" fill className="object-cover" />
      </div>

      <div className="px-20 py-12">
        <h1 className="mt-4 text-4xl font-bold text-gray-900 dark:text-white">{event.Title}</h1>
        <p className="mt-2 text-gray-700 dark:text-gray-300">{event.Description}</p>
        <div className="mt-6 flex flex-row items-center gap-x-96">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Event Details</h2>
            <div className="mt-4 space-y-3">
              {event.club && (
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-medium text-gray-900 dark:text-white">Organized By:</span> {event.club.toUpperCase()}
                </p>
              )}
              {event.department && (
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-medium text-gray-900 dark:text-white">Department:</span> {event.department.toUpperCase()}
                </p>
              )}
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-medium text-gray-900 dark:text-white">Contact Number:</span> {event.contactNumber}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-medium text-gray-900 dark:text-white">Venue:</span> {event.Venue}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-medium text-gray-900 dark:text-white">Date:</span> {formattedDate}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-medium text-gray-900 dark:text-white">Time:</span> {formattedTime}
              </p>
            </div>
          </div>

          {/* Ticket Box */}
          <div className="max-w-sm rounded-lg border border-gray-300 bg-white p-4 shadow-md dark:border-gray-700 dark:bg-gray-800">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Book Ticket</h3>
            <div className="mt-2">
              <p className="text-gray-700 dark:text-gray-300">
                Rs. {ticketPrice} x{" "}
                <input
                  type="number"
                  value={numTickets}
                  onChange={(e) => setNumTickets(Math.max(1, parseInt(e.target.value) || 1))}
                  min={1}
                  className="w-16 rounded-md border border-gray-300 p-1 text-center text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />{" "}
                = Rs. {totalPrice}
              </p>
              <hr className="my-2 border-gray-300 dark:border-gray-700" />
            </div>
            <div className="space-y-2">
              <p className="text-gray-900 dark:text-white">
                <span className="font-medium">No. of Tickets: {numTickets}</span>
              </p>
              <p className="text-gray-900 dark:text-white">
                <span className="font-medium">Total Price:</span> Rs. {totalPrice}
              </p>
            </div>
            <button
              onClick={createBooking}
              disabled={!isAllowed}
              className={`mt-4 w-full rounded-lg px-4 py-2 text-center text-sm font-medium ${
                isAllowed
                  ? "bg-blue-700 text-white hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700"
                  : "cursor-not-allowed bg-gray-400 text-gray-200"
              } focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800`}
            >
              Book
            </button>
          </div>
        </div>

        {/* Additional Documents */}
        {additionalFiles.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Additional Documents</h2>
            <div className="mt-4 flex flex-row flex-wrap gap-4">
              {additionalFiles.map((file: { url: string; name: string; type: string }, index: number) => (
                <div
                  key={index}
                  className="relative flex h-36 w-36 items-center justify-center overflow-hidden rounded-lg bg-gray-200 shadow-md hover:bg-gray-300"
                >
                  <div className="flex h-full w-full flex-col items-center justify-center bg-red-100 text-red-600">
                    <Image src="/icons/pdf.svg" alt="PDF Icon" width={48} height={48} className="h-1/2 w-1/2" />
                  </div>

                  <div className="bg-opacity-50 absolute inset-0 flex flex-col items-center justify-between bg-black p-4 opacity-0 transition-opacity hover:opacity-100">
                    <p className="self-start text-sm font-medium text-white">{file.name}</p>
                    <a
                      href={file.url}
                      download
                      className="absolute right-4 bottom-4 h-8 w-8 rounded bg-gray-600 text-white transition hover:bg-gray-500"
                    >
                      <i className="flex h-full w-full items-center justify-center">
                        <Download />
                      </i>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default EventDetails
