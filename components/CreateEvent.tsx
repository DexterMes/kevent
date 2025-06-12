"use client"

import React, { ChangeEvent, useState } from "react"

interface FileType {
  url: string
  name: string
}

const CreateEventPage = ({ token }: { token: string }) => {
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    contactNumber: "",
    venue: "",
    date: "",
    startTime: "",
    endTime: "",
    price: "",
    mainImage: null as File | null,
    otherImages: [] as File[]
  })

  const [mainImage, setMainImage] = useState<string | null>(null)
  const [additionalFiles, setAdditionalFiles] = useState<FileType[]>([])

  const handleMainImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setMainImage(URL.createObjectURL(file))
      setEventData({ ...eventData, mainImage: file })
    }
  }

  const handleAdditionalFilesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const previews = files.map((file) => ({
      url: URL.createObjectURL(file),
      name: file.name
    }))
    setAdditionalFiles([...additionalFiles, ...previews])
    setEventData({ ...eventData, otherImages: [...eventData.otherImages, ...files] })
  }

  const handleRemoveFile = (index: number) => {
    setAdditionalFiles(additionalFiles.filter((_, i) => i !== index))
  }

  const handleCreateEvent = async () => {
    const formData = new FormData()

    if (eventData.mainImage) formData.append("mainImage", eventData.mainImage)
    formData.append("Title", eventData.title)
    formData.append("Description", eventData.description)
    formData.append("contactNumber", eventData.contactNumber)
    formData.append("Venue", eventData.venue)
    formData.append("date", new Date(eventData.date).toISOString())
    formData.append("Price", eventData.price)

    eventData.otherImages.forEach((file) => {
      formData.append("otherImages", file)
    })

    try {
      const res = await fetch("http://localhost:5000/events/createevent", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      })

      const data = await res.json()
      console.log("Event created:", data)
    } catch (err) {
      console.error("Error:", err)
    }
  }

  return (
    <main className="w-full p-6 dark:bg-gray-900">
      <div className="mx-60 my-10">
        <form className="space-y-6">
          {/* Main Image */}
          <div className="relative">
            <div className="flex h-60 w-full items-center justify-center overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
              {mainImage && <img src={mainImage} alt="Main Preview" className="h-full w-full object-cover" />}
            </div>

            <button
              type="button"
              className="absolute left-0 top-0 flex h-full w-full cursor-pointer items-center justify-center rounded-xl bg-gray-50/25"
              onClick={() => document.getElementById("mainImageInput")?.click()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 19V7c0-1.103-.897-2-2-2H5C3.897 5 3 5.897 3 7v12c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2zM5 7h14l.001 12H5V7z" />
                <path d="M10 14l-1-1-3 4h12l-5-7z" />
                <circle cx="13.5" cy="11.5" r="1.5" />
              </svg>
            </button>
            <input type="file" id="mainImageInput" accept="image/*" required onChange={handleMainImageChange} className="hidden" />
          </div>

          {/* Event Title */}
          <div>
            <label htmlFor="event_title" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Event Title
            </label>
            <input
              type="text"
              id="event_title"
              placeholder="Enter event title"
              required
              onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
          </div>

          {/* Event Description */}
          <div>
            <label htmlFor="event_description" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Event Description
            </label>
            <textarea
              id="event_description"
              rows={4}
              placeholder="Enter event description"
              required
              onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            ></textarea>
          </div>

          {/* Event Details */}
          <fieldset className="rounded-lg border border-gray-300 p-4 dark:border-gray-600">
            <legend className="text-sm font-medium text-gray-900 dark:text-white">Event Details</legend>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="contact_number" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Contact Number
                </label>
                <input
                  type="tel"
                  id="contact_number"
                  placeholder="Enter contact number"
                  required
                  onChange={(e) => setEventData({ ...eventData, contactNumber: e.target.value })}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                />
              </div>

              <div>
                <label htmlFor="venue" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Venue
                </label>
                <input
                  type="text"
                  id="venue"
                  placeholder="Enter venue"
                  required
                  onChange={(e) => setEventData({ ...eventData, venue: e.target.value })}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                />
              </div>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <div>
                <label htmlFor="event_date" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Event Date
                </label>
                <input
                  type="date"
                  id="event_date"
                  required
                  onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                />
              </div>

              <div>
                <label htmlFor="start_time" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Start Time
                </label>
                <input
                  type="time"
                  id="start_time"
                  required
                  // onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                />
              </div>

              <div>
                <label htmlFor="end_time" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  End Time
                </label>
                <input
                  type="time"
                  id="end_time"
                  required
                  onChange={(e) => setEventData({ ...eventData, endTime: e.target.value })}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                />
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="price" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                Price
              </label>
              <input
                type="text"
                id="price"
                placeholder="Enter price"
                onChange={(e) => setEventData({ ...eventData, price: e.target.value })}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              />
            </div>
          </fieldset>

          {/* Additional Files */}
          <div className="">
            <label className="mb-2 block text-sm font-semibold text-gray-800 dark:text-white">Additional Files</label>
            <div className="flex flex-row flex-wrap items-center gap-2">
              <div>
                <label className="inline-block cursor-pointer rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-2xl leading-none text-gray-700 transition hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
                  +
                  <input type="file" multiple onChange={handleAdditionalFilesChange} className="hidden" />
                </label>
              </div>

              {/* File Previews */}
              <div className="flex flex-wrap items-center gap-2">
                {additionalFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex flex-row gap-1 rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800"
                  >
                    <div className="flex h-full w-full items-center justify-center px-1 text-center text-sm text-gray-600 dark:text-gray-300">
                      {file.name}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(index)}
                      className="cursor-pointer rounded-full bg-gray-300 px-[0.35rem] text-xs leading-none text-gray-600 hover:bg-gray-400 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 "
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleCreateEvent}
              className="cursor-pointer rounded-lg bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-700"
            >
              Create Event
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}

export default CreateEventPage
