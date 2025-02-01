import React from "react";

interface UserEventCardProps {
  image: string; // Image URL
  title: string; // Event Title
  location: string; // Event Location
  date: string; // Event Date
  timeFrom: string; // Start Time
  timeTo: string; // End Time
  variant: "history" | "edit" | "event"; // Variant of the card
  onEdit?: () => void; // Optional handler for the "Edit" button
}

const UserEventCard: React.FC<UserEventCardProps> = ({
  image,
  title,
  location,
  date,
  timeFrom,
  timeTo,
  variant,
  onEdit,
}) => {
  return (
    <div className="m-8 flex h-44 w-full flex-col rounded-lg border border-gray-200 bg-white shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 md:flex-row">
      {/* Left: Image */}
      <img
        src={image}
        alt={title}
        className="mx-5 my-auto h-full w-full rounded-lg object-cover md:h-32 md:w-80 "
      />

      {/* Right: Event Details */}
      <div className="flex w-full flex-col justify-between py-6 leading-none">
        {/* Event Title */}
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>

        {/* Location */}
        <p className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-400">
          Location: {location}
        </p>

        {/* Date */}
        <p className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-400">
          Date: {date}
        </p>

        {/* Time */}
        <p className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-400">
          Time: {timeFrom} - {timeTo}
        </p>
      </div>

      {/* Right-most Section: Variant-based Content */}
      <div className="p-6">
        {variant === "history" && (
          <div className="w-20 text-gray-500 dark:text-gray-400">Completed</div>
        )}
        {variant === "edit" && (
          <button
            onClick={onEdit}
            className="w-20 items-center rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Edit
          </button>
        )}
        {variant === "event" && (
          <div className="w-20 text-gray-700 dark:text-gray-300">1d 2hr</div>
        )}
      </div>
    </div>
  );
};

export default UserEventCard;
