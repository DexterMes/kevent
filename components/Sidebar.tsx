"use client"

import { useAuthContext } from "../contexts/AuthContext"

const Sidebar = ({ setSelectedOption, selectedOption }: { setSelectedOption: (option: string) => void; selectedOption: string }) => {
  const { user } = useAuthContext()
  return (
    <div id="sidebar" className="z-40 h-full w-[15%] bg-gray-100 dark:bg-gray-800 sm:translate-x-0" aria-label="Sidebar">
      <div className="h-[calc(100vh-3.5rem)] overflow-y-auto px-3 py-4">
        {/* Profile Section */}
        <div className="mb-8 flex flex-col items-center">
          <img src={user.avatarURL} alt="Profile" className="h-20 w-20 rounded-full border-2 border-gray-300 object-cover dark:border-gray-600" />
          <h2 className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">{user.firstName + " " + user.lastName}</h2>
        </div>

        {/* Menu Items */}
        <ul className="space-y-2 font-medium">
          <li>
            <button
              onClick={() => setSelectedOption("profile")}
              className={`group flex w-full items-center rounded-lg p-2 ${
                selectedOption === "profile" ? "bg-gray-300 dark:bg-gray-600" : "hover:bg-gray-200 dark:hover:bg-gray-700"
              } text-gray-900 dark:text-white`}
            >
              <svg
                className={`h-5 w-5  text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white
                  ${selectedOption === "profile" && "text-gray-900 dark:text-white"}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 10a4 4 0 1 0-8 0 4 4 0 0 0 8 0zm-1 4H3a7 7 0 0 0 14 0h-6z" />
              </svg>
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
              <svg
                className={`h-5 w-5  text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white
                  ${selectedOption === "tickets" && "text-gray-900 dark:text-white"}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M4 3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H4zm1 2h10v10H5V5z" />
              </svg>
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
              <svg
                className={`h-5 w-5  text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white
                  ${selectedOption === "events" && "text-gray-900 dark:text-white"}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2 2a2 2 0 0 0-2 2v2h20V4a2 2 0 0 0-2-2H2zm0 16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-9H2v9zm10-7h4v2h-4v-2z" />
              </svg>
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
              <svg
                className={`h-5 w-5  text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white
                  ${selectedOption === "history" && "text-gray-900 dark:text-white"}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 2a8 8 0 1 0 4.446 14.688l2.517 2.517a1 1 0 0 0 1.414-1.414l-2.517-2.517A8 8 0 0 0 10 2zm1 11H9v-4h2v4zm0 4H9v-2h2v2z" />
              </svg>
              <span className="ml-3">History</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
