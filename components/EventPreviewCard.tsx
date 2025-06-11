import React, { useState } from "react"
import { FaHeart, FaTag } from "react-icons/fa"

interface UserEventPreviewCardProps {
  event: any
  handleCardClick: () => void // Optional handler for the "Edit" button
}

const EventPreviewCard: React.FC<UserEventPreviewCardProps> = ({ event, handleCardClick }) => {
  const [like, setLike] = useState<boolean>(false)
  const eventDate = new Date(event.date)

  // Format date like "November 10, 2025"
  const formattedDate = eventDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  })

  // Format time like "9:00 AM"
  const formattedTime = eventDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit"
  })

  return (
    <div
      onClick={handleCardClick}
      className="h-64 w-60 cursor-pointer rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800"
    >
      <div className="flex h-full flex-col">
        <div className="relative h-2/5 flex-shrink-0">
          <a href="#">
            <img className="h-full w-full rounded-lg object-cover" src={event.mainImage} alt={event.Title} />
          </a>
          <div
            onClick={(e) => {
              e.stopPropagation()
              setLike(!like)
            }}
            className="absolute -bottom-4 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white p-0 shadow-inner hover:bg-gray-300"
          >
            {like ? <FaHeart className="h-1/2 w-1/2 text-red-500" /> : <FaHeart className="h-1/2 w-1/2 text-black" />}
          </div>
        </div>

        <div className="flex flex-grow flex-col justify-between p-3">
          <h5 className="line-clamp-2 text-base font-bold text-gray-900 dark:text-white">{event.Title}</h5>
          <div className="space-y-1">
            <p className="text-xs font-medium text-gray-700 dark:text-gray-400">
              Time: <span className="font-semibold">{formattedTime}</span>
            </p>
            <p className="text-xs font-medium text-gray-700 dark:text-gray-400">
              Date: <span className="font-semibold">{formattedDate}</span>
            </p>
            <p className="text-xs font-medium text-gray-700 dark:text-gray-400">
              Venue: <span className="font-semibold">{event.Venue}</span>
            </p>
          </div>
          {event.Price == 0 ? (
            <div className="mt-1 flex items-center space-x-2 text-green-500 dark:text-green-500">
              <FaTag className="h-4 w-4" />
              <span className="text-xs font-medium">Free</span>
            </div>
          ) : (
            <div className="mt-1 flex items-center space-x-2 text-gray-700 dark:text-gray-400">
              <FaTag className="h-4 w-4" />
              <span className="text-xs font-medium">Rs. {event.Price}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default EventPreviewCard
