"use client";
import React, { useState } from "react";
import { IoMdDownload } from "react-icons/io";

interface EventDetailsProps {
  event: {
    mainImage: string;
    title: string;
    description: string;
    organizedBy: string;
    contactNumber: string;
    venue: string;
    date: string;
    time: string;
    additionalFiles: { name: string; url: string; type: string }[];
  };
}

const EventDetails: React.FC<EventDetailsProps> = ({ event }) => {
  const [numTickets, setNumTickets] = useState(1); // Default to 1 ticket
  const pricePerTicket = 500; // Static price per ticket
  const totalPrice = numTickets * pricePerTicket; // Calculate the total price

  return (
    <>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        {/* Main Image (Banner) */}
        <div className="w-full">
          <img
            src={event.mainImage}
            alt="Event Banner"
            className="h-80 w-full object-cover"
          />
        </div>

        <div className="p-12">
          {/* Event Title */}
          <h1 className="mt-4 text-4xl font-bold text-gray-900 dark:text-white">
            {event.title}
          </h1>

          {/* Event Description */}
          <p className="mt-2 text-gray-700 dark:text-gray-300">
            {event.description}
          </p>

          {/* Event Details */}
          <div className="mt-6 flex gap-x-96">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Event Details
              </h2>
              <div className="mt-4 space-y-3">
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-medium text-gray-900 dark:text-white">
                    Organized By:
                  </span>{" "}
                  {event.organizedBy}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-medium text-gray-900 dark:text-white">
                    Contact Number:
                  </span>{" "}
                  {event.contactNumber}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-medium text-gray-900 dark:text-white">
                    Venue:
                  </span>{" "}
                  {event.venue}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-medium text-gray-900 dark:text-white">
                    Date:
                  </span>{" "}
                  {event.date}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-medium text-gray-900 dark:text-white">
                    Time:
                  </span>{" "}
                  {event.time}
                </p>
              </div>
            </div>
            <div className="max-w-sm rounded-lg border border-gray-300 bg-white p-4 shadow-md dark:border-gray-700 dark:bg-gray-800">
              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Book Ticket
              </h3>

              {/* Ticket Pricing */}
              <div className="mt-2">
                <p className="text-gray-700 dark:text-gray-300">
                  Rs. 500 x{" "}
                  <input
                    type="number"
                    value={numTickets}
                    onChange={(e) =>
                      setNumTickets(Math.max(1, parseInt(e.target.value) || 1))
                    } // Minimum 1 ticket
                    min={1}
                    className="w-16 rounded-md border border-gray-300 p-1 text-center text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />{" "}
                  = Rs. {totalPrice}
                </p>
                <hr className="my-2 border-gray-300 dark:border-gray-700" />
              </div>

              {/* Summary */}
              <div className="space-y-2">
                <p className="text-gray-900 dark:text-white">
                  <span className="font-medium">
                    No. of Tickets: {numTickets}
                  </span>
                </p>
                <p className="text-gray-900 dark:text-white">
                  <span className="font-medium">Total Price:</span> Rs.{" "}
                  {totalPrice}
                </p>
              </div>

              {/* Book Button */}
              <button
                onClick={() =>
                  alert(
                    `You have booked ${numTickets} tickets for Rs. ${totalPrice}`,
                  )
                }
                className="mt-4 w-full rounded-lg bg-blue-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Book
              </button>
            </div>
          </div>

          {/* Additional Documents */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Additional Documents
            </h2>
            <div className="mt-4 flex flex-row gap-4">
              {event.additionalFiles.map((file, index) => (
                <div
                  key={index}
                  className="relative flex h-36 w-36 items-center justify-center overflow-hidden rounded-lg bg-gray-200 shadow-md hover:bg-gray-300"
                >
                  {/* File Preview or PDF Icon */}
                  {file.type === "pdf" ? (
                    <div className="flex h-full w-full flex-col items-center justify-center bg-red-100 text-red-600">
                      <img
                        src="/icons/pdf.svg"
                        className="h-1/2 w-1/2"
                        alt="Icon"
                      />
                    </div>
                  ) : (
                    <img
                      src={file.url} // Preview URL for image files
                      alt={file.name}
                      className="h-full w-full object-cover"
                    />
                  )}

                  {/* Hover Effect */}
                  <div className="absolute inset-0 flex flex-col items-center justify-between bg-black bg-opacity-50 p-4 opacity-0 transition-opacity hover:opacity-100">
                    {/* File Name */}
                    <p className="self-start text-sm font-medium text-white">
                      {file.name}
                    </p>

                    {/* Download Button */}
                    <a
                      href={file.url}
                      download
                      className="absolute bottom-4 right-4 h-8 w-8 rounded bg-gray-600 text-white transition hover:bg-gray-500"
                    >
                      {/* React Icons Download Icon */}
                      <i className="flex h-full w-full items-center justify-center">
                        <IoMdDownload />
                      </i>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDetails;
