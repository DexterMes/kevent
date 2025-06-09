import React from "react";
import { FaTag, FaHeart } from "react-icons/fa";

const EventPreviewCard = ({ event }: { event: any }) => {
  return (
    <div className="h-64 w-60 cursor-pointer rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
      <div className="flex h-full flex-col">
        <div className="relative h-2/5 flex-shrink-0">
          <a href="#">
            <img
              className="h-full w-full rounded-lg object-cover"
              src={event.mainImage}
              alt={event.title}
            />
          </a>
          <div className="absolute -bottom-4 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-inner">
            <FaHeart className="h-4 w-4 text-red-500" />
          </div>
        </div>

        <div className="flex flex-grow flex-col justify-between p-3">
          <h5 className="text-base font-bold text-gray-900 dark:text-white">
            {event.title}
          </h5>
          <div className="space-y-1">
            <p className="text-xs font-medium text-gray-700 dark:text-gray-400">
              Time: <span className="font-semibold">{event.time}</span>
            </p>
            <p className="text-xs font-medium text-gray-700 dark:text-gray-400">
              Date: <span className="font-semibold">{event.date}</span>
            </p>
          </div>
          <div className="mt-1 flex items-center space-x-2">
            <FaTag className="h-4 w-4 text-gray-700 dark:text-gray-400" />
            <span className="text-xs font-medium text-gray-700 dark:text-gray-400">
              Organizer:{" "}
              <span className="font-semibold">{event.organizedBy}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPreviewCard;
