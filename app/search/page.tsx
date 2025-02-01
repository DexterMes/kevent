import EventDetails from "../components/Event";
import EventPreviewCard from "../components/EventPreviewCard";
import Filter from "../components/Filters";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import UserEventCard from "../components/UserEventCard";

const event = {
  mainImage:
    "https://photographylife.com/wp-content/uploads/2014/08/Nikon-D810.jpg", // URL for the banner image
  title: "Annual Tech Conference 2025",
  description:
    "Experience the forefront of innovation and technology at the Annual Tech Conference 2025, a premier event designed for tech enthusiasts, professionals, and industry leaders. This two-day gathering promises to be an unforgettable experience, featuring an exciting lineup of activities, opportunities to network with like-minded individuals, and sessions led by some of the most respected voices in the tech world. What to Expect: - Workshops: Engage in hands-on learning sessions covering topics like AI, cloud computing, cybersecurity, and software development. Whether you're a beginner or an expert, there’s something for everyone. - Networking: Connect with industry professionals, entrepreneurs, and tech enthusiasts from around the globe. Build relationships that can spark new opportunities and collaborations. - Keynote Sessions: Be inspired by thought-provoking presentations delivered by renowned speakers sharing insights, trends, and future projections in technology. - Panel Discussions: Participate in dynamic panel discussions addressing the latest advancements and challenges in the tech sector. Highlights of the Event: - Showcasing the latest technological advancements through interactive demos. - Opportunity to interact with exhibitors showcasing cutting-edge tech products and services. - A special session on career advancement in the tech industry. Join us at the Grand Hall, Tech Park, on January 20, 2025, from 4:00 PM to 6:00 PM to be a part of this incredible journey.",
  organizedBy: "Tech Community Group",
  contactNumber: "123-456-7890",
  venue: "Grand Hall, Tech Park",
  date: "January 20, 2025",
  time: "4:00 PM - 6:00 PM",
  additionalFiles: [
    {
      name: "Event Brochure.pdf",
      url: "https://example.com/event-brochure.pdf",
      type: "pdf",
    },
    {
      name: "Speaker Details.pdf",
      url: "https://example.com/speaker-details.pdf",
      type: "pdf",
    },
    {
      name: "Venue Map.pdf",
      url: "https://example.com/venue-map.pdf",
      type: "pdf",
    },
  ],
};

export default function SearchResult() {
  const searchQuery = "herp";
  return (
    <main>
      <NavBar />
      <div className="flex flex-row">
        <Filter />
        <div className="flex h-full min-h-[calc(100vh-3.5rem)] w-full flex-col bg-white p-6 dark:bg-gray-900">
          <div className="w-full">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              You Searched For:{' "'}
              <span className="text-blue-600 dark:text-blue-400">
                {searchQuery}
              </span>
              {'"'}
            </h2>
            <div className="mb-6 mt-2 h-1 w-full max-w-xs bg-blue-500"></div>
          </div>
          <EventPreviewCard />
        </div>
      </div>
      <Footer />
    </main>
  );
}
