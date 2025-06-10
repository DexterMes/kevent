import React, { ChangeEvent, useState } from "react"

interface CreateEventModalProps {
  isOpen: boolean
  onClose: () => void
}

interface FileType {
  url: string
  name: string
}

const CreateEventModal: React.FC<CreateEventModalProps> = ({ isOpen, onClose }) => {
  const [mainImage, setMainImage] = useState<string | null>(null)
  const [additionalFiles, setAdditionalFiles] = useState<FileType[]>([])

  const handleMainImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setMainImage(URL.createObjectURL(file))
    }
  }

  const handleAdditionalFilesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const newFiles = files.map((file) => ({
      url: URL.createObjectURL(file),
      name: file.name
    }))
    setAdditionalFiles([...additionalFiles, ...newFiles])
  }

  const handleRemoveFile = (index: number) => {
    setAdditionalFiles(additionalFiles.filter((_, i) => i !== index))
  }

  const handleCreateEvent = () => {
    onClose() // Close the modal when "Create Event" is pressed
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative h-full w-full max-w-3xl overflow-y-auto rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800 dark:text-white">
        {/* Close Button */}
        <button type="button" onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Modal Content */}
        <h3 className="mb-4 text-xl font-semibold">Create Event</h3>

        <form className="space-y-6">
          {/* Main Image */}
          <div className="relative">
            {/* Image Container */}
            <div className="flex h-48 w-full items-center justify-center overflow-hidden rounded-lg bg-gray-200">
              {mainImage ? (
                <img src={mainImage} alt="Main Preview" className="h-full w-full object-cover" />
              ) : (
                <span className="text-gray-500">Main Image</span>
              )}
            </div>

            {/* Overlay Add Image Button */}
            <button
              type="button"
              className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 text-white hover:bg-opacity-70"
              onClick={() => document.getElementById("mainImageInput")?.click()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-10 w-10">
                <path d="M21 19V7c0-1.103-.897-2-2-2H5C3.897 5 3 5.897 3 7v12c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2zM5 7h14l.001 12H5V7z" />
                <path d="M10 14l-1-1-3 4h12l-5-7z" />
                <circle cx="13.5" cy="11.5" r="1.5" />
              </svg>
            </button>

            {/* Hidden File Input */}
            <input type="file" id="mainImageInput" accept="image/*" onChange={handleMainImageChange} className="hidden" />
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
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
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
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            ></textarea>
          </div>

          {/* Event Details */}
          <fieldset className="rounded-lg border border-gray-300 p-4 dark:border-gray-600">
            <legend className="text-sm font-medium text-gray-900 dark:text-white">Event Details</legend>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {/* Contact Number */}
              <div>
                <label htmlFor="contact_number" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Contact Number
                </label>
                <input
                  type="tel"
                  id="contact_number"
                  placeholder="Enter contact number"
                  required
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Venue */}
              <div>
                <label htmlFor="venue" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Venue
                </label>
                <input
                  type="text"
                  id="venue"
                  placeholder="Enter venue"
                  required
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            {/* Event Date, Start Time, and End Time */}
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {/* Event Date */}
              <div>
                <label htmlFor="event_date" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Event Date
                </label>
                <input
                  type="date"
                  id="event_date"
                  required
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Start Time */}
              <div>
                <label htmlFor="start_time" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Start Time
                </label>
                <input
                  type="time"
                  id="start_time"
                  required
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* End Time */}
              <div>
                <label htmlFor="end_time" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  End Time
                </label>
                <input
                  type="time"
                  id="end_time"
                  required
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {/* Price */}
              <div>
                <label htmlFor="price" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Price
                </label>
                <input
                  type="string"
                  id="price"
                  placeholder="Enter price"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          </fieldset>

          {/* Additional Files */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Additional Files</label>
            <input
              type="file"
              multiple
              onChange={handleAdditionalFilesChange}
              className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400"
            />
            <div className="mt-4 grid grid-cols-3 gap-4">
              {additionalFiles.map((file, index) => (
                <div key={index} className="w-30 relative h-36 overflow-hidden rounded-lg bg-gray-200">
                  <img src={file.url} alt={file.name} className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemoveFile(index)}
                    className="absolute right-1 top-1 rounded-full bg-red-800 px-0.5 py-0.5 text-xs text-white"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <button type="button" onClick={handleCreateEvent} className="rounded-lg bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-700">
            Create Event
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateEventModal
