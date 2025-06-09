"use client";
import { useState } from "react";
import EditProfile from "../../components/EditProfile";
import NavBar from "../../components/NavBar";
import Sidebar from "../../components/Sidebar";
import UserEventCard from "../../components/UserEventCard";

export default function Profile() {
  // State to manage the selected sidebar menu item
  const [selectedOption, setSelectedOption] = useState("profile");

  return (
    <main>
      <NavBar />
      <div className="flex flex-row">
        {/* Sidebar */}
        <Sidebar
          setSelectedOption={setSelectedOption}
          selectedOption={selectedOption}
        />

        {/* Main Content */}
        <div className="flex h-[calc(100vh-3.5rem)] w-full bg-white dark:bg-gray-900">
          {selectedOption === "profile" && <EditProfile />}
          {selectedOption === "tickets" && (
            <UserEventCard
              image="https://photographylife.com/wp-content/uploads/2014/08/Nikon-D810.jpg"
              title="Tech Conference 2025"
              location="Tech Park, NY"
              date="January 20, 2025"
              timeFrom="10:00 AM"
              timeTo="2:00 PM"
              variant="event"
            />
          )}
          {selectedOption === "events" && (
            <UserEventCard
              image="https://photographylife.com/wp-content/uploads/2014/08/Nikon-D810.jpg"
              title="Tech Conference 2025"
              location="Tech Park, NY"
              date="January 20, 2025"
              timeFrom="10:00 AM"
              timeTo="2:00 PM"
              variant="edit"
            />
          )}
          {selectedOption === "history" && (
            <UserEventCard
              image="https://photographylife.com/wp-content/uploads/2014/08/Nikon-D810.jpg"
              title="Tech Conference 2025"
              location="Tech Park, NY"
              date="January 20, 2025"
              timeFrom="10:00 AM"
              timeTo="2:00 PM"
              variant="history"
            />
          )}
        </div>
      </div>
    </main>
  );
}
