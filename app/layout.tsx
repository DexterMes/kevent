import type { Metadata } from "next"
import { Inter } from "next/font/google"

import "./globals.css"

import AppProviders from "../contexts/AppProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Kevent",
  description: "Event Management For Kathmandu University",
  icons: { icon: "icons/Logo.svg" }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}
