import React from "react"

interface UserEventCardProps {
  event: {
    _id: string
    Title: string
    Venue: string
    date: string
    mainImage: string
  }
  variant: "history" | "edit" | "event"
  onEdit?: () => void
}

const UserEventCard: React.FC<UserEventCardProps> = ({ event, variant, onEdit }) => {
  if (!event.date) return
  const dateObj = new Date(event.date)
  const formattedDate = dateObj.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric"
  })
  const formattedTime = dateObj.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit"
  })

  return (
    <div className="m-8 flex h-44 w-full flex-col rounded-lg border border-gray-200 bg-white shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 md:flex-row">
      <img src={event.mainImage} alt={event.Title} className="mx-5 my-auto h-full w-full rounded-lg object-cover md:h-32 md:w-80 " />

      <div className="flex w-full flex-col justify-between py-6 leading-none">
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{event.Title}</h5>
        <p className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-400">Location: {event.Venue}</p>
        <p className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-400">Date: {formattedDate}</p>
        <p className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-400">Time: {formattedTime}</p>
      </div>

      <div className="p-6">
        {variant === "history" && <div className="w-20 text-gray-500 dark:text-gray-400">Completed</div>}
        {variant === "edit" && (
          <button
            onClick={onEdit}
            className="w-20 items-center rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Edit
          </button>
        )}
        {variant === "event" && <div className="w-20 text-gray-700 dark:text-gray-300">1d 2hr</div>}
      </div>
    </div>
  )
}

export default UserEventCard
