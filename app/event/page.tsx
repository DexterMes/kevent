import { Suspense } from "react"

import EventDetails from "../../components/Event"
import Footer from "../../components/Footer"
import NavBar from "../../components/NavBar"

export default function Event() {
  return (
    <main>
      <NavBar />
      <Suspense fallback={<div className="p-12 text-white">Loading event...</div>}>
        <EventDetails />
      </Suspense>
      <Footer />
    </main>
  )
}
