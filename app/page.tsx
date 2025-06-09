import { DarkThemeToggle } from "flowbite-react";
import NavBar from "../components/NavBar";
import EventPreviewCard from "../components/EventPreviewCard";
import UserEventCard from "../components/UserEventCard";
import SignInForm from "../components/SignInForm";
import SignUpForm from "../components/SignUpForm";
import CreateEvent from "../components/CreateEvent";
import EventDetails from "../components/Event";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import EditProfile from "../components/EditProfile";
import Filter from "../components/Filters";

const event = {
  mainImage:
    "https://photographylife.com/wp-content/uploads/2014/08/Nikon-D810.jpg", // URL for the banner image
  title: "Annual Tech Conference 2025",
  description:
    "Join us for a two-day event filled with engaging workshops, networking opportunities, and keynote sessions by industry leaders.",
  organizedBy: "Tech Community Group",
  contactNumber: "123-456-7890",
  venue: "Grand Hall, Tech Park",
  date: "January 20, 2025",
  time: "4:00 PM - 6:00 PM",
  additionalFiles: [
    {
      name: "Event Brochure.pdf",
      url: "https://example.com/event-brochure.pdf",
    },
    {
      name: "Speaker Details.pdf",
      url: "https://example.com/speaker-details.pdf",
    },
    {
      name: "Venue Map.pdf",
      url: "https://example.com/venue-map.pdf",
    },
  ],
};

export default function Home() {
  const handleEdit = () => {
    alert("Edit button clicked!");
  };

  return (
    // <main className="flex min-h-screen flex-col items-center justify-center gap-2 dark:bg-gray-800">
    //   <Navbar />

    //   <div className="flex flex-grow flex-col items-center justify-center gap-4">
    //     <h1 className="text-2xl dark:text-white">Flowbite React + Next.js</h1>
    //     <DarkThemeToggle />
    //   </div>
    // </main>
    <main>
      <NavBar />
      {/* <EventPreviewCard /> */}

      {/* <SignInForm /> */}
      {/* <SignUpForm /> */}

      {/* <CreateEvent /> */}
      {/* <div>
        <EventDetails event={event} />
      </div> */}
      {/* <Sidebar /> */}

      {/* <div className="space-y-6 p-4">
        <UserEventCard
          image="https://photographylife.com/wp-content/uploads/2014/08/Nikon-D810.jpg"
          title="Tech Conference 2025"
          location="Tech Park, NY"
          date="January 20, 2025"
          timeFrom="10:00 AM"
          timeTo="2:00 PM"
          variant="history"
        />
        <UserEventCard
          image="https://via.placeholder.com/150"
          title="Annual Gala"
          location="Downtown Hall"
          date="March 10, 2025"
          timeFrom="7:00 PM"
          timeTo="10:00 PM"
          variant="edit"
        />
        <UserEventCard
          image="https://via.placeholder.com/150"
          title="Music Festival"
          location="Central Park"
          date="June 15, 2025"
          timeFrom="4:00 PM"
          timeTo="10:00 PM"
          variant="event"
        />
      </div> */}
      <Filter />
      {/* <EditProfile /> */}
      <Footer />
    </main>
  );
}
