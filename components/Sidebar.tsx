import { CalendarClock, History, LogOut, Tickets, User } from "lucide-react"
import Link from "next/link"

import { useAuthContext } from "../contexts/AuthContext"

const Sidebar = ({ setSelectedOption, selectedOption }: { setSelectedOption: (option: string) => void; selectedOption: string }) => {
  const { logout } = useAuthContext()

  return (
    <div id="sidebar" className="z-40 h-full w-[15%] bg-gray-100 sm:translate-x-0 dark:bg-gray-800" aria-label="Sidebar">
      <div className="flex h-[calc(100vh-3.5rem)] flex-col justify-between overflow-y-auto px-3 py-8">
        {/* Menu Items */}
        <ul className="space-y-2 font-medium">
          <li>
            <button
              onClick={() => setSelectedOption("profile")}
              className={`group flex w-full items-center rounded-lg p-2 ${
                selectedOption === "profile" ? "bg-gray-300 dark:bg-gray-600" : "hover:bg-gray-200 dark:hover:bg-gray-700"
              } text-gray-900 dark:text-white`}
            >
              <User className="h-4 w-4" />
              <span className="ml-3">Profile</span>
            </button>
          </li>

          <li>
            <button
              onClick={() => setSelectedOption("tickets")}
              className={`group flex w-full items-center rounded-lg p-2 ${
                selectedOption === "tickets" ? "bg-gray-300 dark:bg-gray-600" : "hover:bg-gray-200 dark:hover:bg-gray-700"
              } text-gray-900 dark:text-white`}
            >
              <Tickets className="h-4 w-4" />
              <span className="ml-3">Tickets</span>
            </button>
          </li>

          <li>
            <button
              onClick={() => setSelectedOption("events")}
              className={`group flex w-full items-center rounded-lg p-2 ${
                selectedOption === "events" ? "bg-gray-300 dark:bg-gray-600" : "hover:bg-gray-200 dark:hover:bg-gray-700"
              } text-gray-900 dark:text-white`}
            >
              <CalendarClock className="h-4 w-4" />
              <span className="ml-3">Events</span>
            </button>
          </li>

          <li>
            <button
              onClick={() => setSelectedOption("history")}
              className={`group flex w-full items-center rounded-lg p-2 ${
                selectedOption === "history" ? "bg-gray-300 dark:bg-gray-600" : "hover:bg-gray-200 dark:hover:bg-gray-700"
              } text-gray-900 dark:text-white`}
            >
              <History className="h-4 w-4" />
              <span className="ml-3">History</span>
            </button>
          </li>
        </ul>
        <Link href="/login">
          <button
            onClick={() => logout()}
            className={`group flex w-full items-center rounded-lg p-2 font-medium hover:bg-gray-200 dark:hover:bg-gray-700`}
          >
            <LogOut className="h-4 w-4" />
            <span className="ml-3">Logout</span>
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Sidebar
