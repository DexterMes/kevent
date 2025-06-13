import { Trash2 } from "lucide-react"
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
  token?: string
  onDelete?: () => void
}

const UserEventCard: React.FC<UserEventCardProps> = ({ event, variant, token, onDelete }) => {
  if (!event.date) return

  const dateObj = new Date(event.date)
  const formattedDate = dateObj.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })
  const formattedTime = dateObj.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })

  const getTimeRemaining = () => {
    const now = new Date().getTime()
    const eventTime = dateObj.getTime()
    const diff = eventTime - now

    if (diff <= 0) return "Started"

    const seconds = Math.floor(diff / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    const remainingHours = hours % 24
    const remainingMinutes = minutes % 60

    return `${days}d ${remainingHours}h`
  }

  async function deleteEvent() {
    try {
      const res = await fetch(`http://localhost:5000/events/deleteevent/${event._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      })
      const data = await res.json()
      if (onDelete) onDelete()
      console.log(data)
    } catch (err) {
      console.error("Error fetching tickets:", err)
    }
  }

  return (
    <div className="flex h-44 w-full flex-row justify-between rounded-lg border border-gray-200 bg-white p-5 shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 md:flex-row">
      <div className="flex w-[50%] flex-row gap-5">
        <img src={event.mainImage} alt={event.Title} className="h-full w-[45%] rounded-lg object-cover" />

        <div className="flex w-[50%] flex-col leading-none">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{event.Title}</h5>
          <p className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-400">Location: {event.Venue}</p>
          <p className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-400">Date: {formattedDate}</p>
          <p className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-400">Time: {formattedTime}</p>
        </div>
      </div>

      <div className="">
        {variant === "history" && <div className="w-20 text-gray-500 dark:text-gray-400">Completed</div>}

        {variant === "edit" && (
          <button
            onClick={deleteEvent}
            className="cursor-pointer items-center rounded-lg bg-red-600 p-2 text-sm font-medium text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 "
          >
            <Trash2 className="h-5 w-5" />
          </button>
        )}

        {variant === "event" && <div className="w-20 text-gray-700 dark:text-gray-300">{getTimeRemaining()}</div>}
      </div>
    </div>
  )
}

export default UserEventCard
