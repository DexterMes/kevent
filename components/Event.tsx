"use client"

import { useSearchParams } from "next/navigation"
import React, { useEffect, useState } from "react"
import { IoMdDownload } from "react-icons/io"

const EventDetails: React.FC = () => {
  const [event, setEvent] = useState<any>(null)
  const [numTickets, setNumTickets] = useState(1)

  const searchParams = useSearchParams()
  const query = searchParams.get("query")?.toLowerCase() || ""

  const pricePerTicket = event?.Price ? parseInt(event.Price) : 0
  const totalPrice = numTickets * pricePerTicket

  useEffect(() => {
    const fetchEvent = async () => {
      const res = await fetch(`http://localhost:5000/events/viewevent/${query}`)
      const data = await res.json()
      console.log(data)
      setEvent(data.event)
    }

    fetchEvent()
  }, [])

  if (!event) {
    return <div className="p-12 text-white">Loading...</div>
  }

  const eventDate = new Date(event.date)
  const formattedDate = eventDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  })
  const formattedTime = eventDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit"
  })

  const additionalFiles = event.Files.map((url: string) => {
    const name = url.split("/").pop() || "file"
    const ext = name.split(".").pop()
    return {
      url,
      name,
      type: ext === "pdf" ? "pdf" : "image"
    }
  })

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Main Image (Banner) */}
      <div className="w-full">
        <img src={event.mainImage} alt="Event Banner" className="h-80 w-full object-cover" />
      </div>

      <div className="px-20 py-12">
        {/* Event Title */}
        <h1 className="mt-4 text-4xl font-bold text-gray-900 dark:text-white">{event.Title}</h1>

        {/* Event Description */}
        <p className="mt-2 text-gray-700 dark:text-gray-300">{event.Description}</p>

        {/* Event Details */}
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
                Rs. {pricePerTicket} x{" "}
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
              onClick={() => alert(`You have booked ${numTickets} tickets for Rs. ${totalPrice}`)}
              className="mt-4 w-full rounded-lg bg-blue-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
                  {file.type === "pdf" ? (
                    <div className="flex h-full w-full flex-col items-center justify-center bg-red-100 text-red-600">
                      <img src="/icons/pdf.svg" className="h-1/2 w-1/2" alt="PDF Icon" />
                    </div>
                  ) : (
                    <img src={file.url} alt={file.name} className="h-full w-full object-cover" />
                  )}
                  <div className="absolute inset-0 flex flex-col items-center justify-between bg-black bg-opacity-50 p-4 opacity-0 transition-opacity hover:opacity-100">
                    <p className="self-start text-sm font-medium text-white">{file.name}</p>
                    <a
                      href={file.url}
                      download
                      className="absolute bottom-4 right-4 h-8 w-8 rounded bg-gray-600 text-white transition hover:bg-gray-500"
                    >
                      <i className="flex h-full w-full items-center justify-center">
                        <IoMdDownload />
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
