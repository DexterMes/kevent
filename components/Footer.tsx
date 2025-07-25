import Image from "next/image"
import React from "react"

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-200 dark:bg-gray-950">
      <div className="w-full max-w-screen-2xl p-4 py-6 lg:py-8">
        {/* Footer Top */}
        <div className="md:flex md:justify-between">
          {/* Logo Section */}
          <div className="mb-6 md:mb-0">
            <a href="https://flowbite.com/" className="flex items-center">
              <Image src="/icons/Logo.svg" alt="Kevent Logo" width={32} height={32} className="me-3 h-8 w-8" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Kevent</span>
            </a>
          </div>

          {/* Link Groups */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-6">
            {/* Resources */}
            <div>
              <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase dark:text-white">Resources</h2>
              <ul className="font-medium text-gray-500 dark:text-gray-400">
                <li className="mb-2">
                  <a href="https://flowbite.com/" className="hover:underline">
                    Flowbite
                  </a>
                </li>
                <li>
                  <a href="https://tailwindcss.com/" className="hover:underline">
                    Tailwind CSS
                  </a>
                </li>
              </ul>
            </div>

            {/* Follow Us */}
            <div>
              <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase dark:text-white">Follow us</h2>
              <ul className="font-medium text-gray-500 dark:text-gray-400">
                <li className="mb-2">
                  <a href="https://github.com/dextermes" className="hover:underline">
                    Github
                  </a>
                </li>
                <li>
                  <a href="https://discord.gg/4eeurUVvTy" className="hover:underline">
                    Discord
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
              <ul className="font-medium text-gray-500 dark:text-gray-400">
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Terms &amp; Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Divider */}
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8 dark:border-gray-700" />

        {/* Footer Bottom */}
        <div className="sm:flex sm:items-center sm:justify-between">
          {/* Copyright */}
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2023{" "}
            <a href="https://kabinbhandari.com.np/" className="hover:underline">
              Kabin Bhandari™
            </a>
            . All Rights Reserved.
          </span>

          {/* Social Media Icons */}
          <div className="mt-4 flex sm:mt-0 sm:justify-center">
            {/* Facebook */}
            <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
              <svg className="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
                <path
                  fillRule="evenodd"
                  d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Facebook page</span>
            </a>

            {/* Discord */}
            <a href="#" className="ms-5 text-gray-500 hover:text-gray-900 dark:hover:text-white">
              <svg className="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 21 16">
                <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z" />
              </svg>
              <span className="sr-only">Discord community</span>
            </a>

            {/* Add other social icons here */}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
