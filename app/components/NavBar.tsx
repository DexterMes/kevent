import { DarkThemeToggle } from "flowbite-react/components/DarkThemeToggle";
import React from "react";

const NavBar = () => {
  return (
    <nav className="h-14 border-b-1 border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
      <div className="flex w-full items-center justify-between px-4 py-2">
        <a
          href="https://flowbite.com/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src="icons/Logo.svg" className="h-8" alt="Flowbite Logo" />
          <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
            Kevent
          </span>
        </a>
        <div className="relative mx-4 w-full max-w-md px-4 md:block">
          <div className="pointer-events-none absolute inset-y-0 start-4 flex items-center ps-3">
            <svg
              className="h-4 w-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="search-navbar"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="Search..."
          />
        </div>

        <div className="flex-1"></div>

        <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800">
          Sign In
        </button>
        <DarkThemeToggle />
      </div>
    </nav>
  );
};

export default NavBar;
