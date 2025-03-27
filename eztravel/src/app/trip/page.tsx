"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Mock trip data (in a real app, this would come from your API)
const mockTripData = {
  destination: "Paris, France",
  date: "2023-12-15",
  time: "10:30",
  itinerary: [
    {
      day: 1,
      activities: [
        { time: "10:30", activity: "Arrive at Charles de Gaulle Airport" },
        { time: "12:00", activity: "Check in at Hotel Le Grand" },
        { time: "14:00", activity: "Visit the Eiffel Tower" },
        { time: "19:00", activity: "Dinner at Le Petit Chef" },
      ],
    },
    {
      day: 2,
      activities: [
        { time: "09:00", activity: "Breakfast at hotel" },
        { time: "10:30", activity: "Louvre Museum tour" },
        { time: "13:00", activity: "Lunch at Café Marly" },
        { time: "15:00", activity: "Seine River cruise" },
        { time: "19:30", activity: "Dinner and show at Moulin Rouge" },
      ],
    },
  ],
  price: 1299,
  currency: "USD",
};

export default function TripDetails() {
  const [tripData, setTripData] = useState(null);

  useEffect(() => {
    // In a real app, you would fetch the trip data from your API
    // For now, we'll use the mock data
    setTimeout(() => {
      setTripData(mockTripData);
    }, 500);
  }, []);

  if (!tripData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading trip details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">
            Your Trip to {tripData.destination}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            {new Date(tripData.date).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            at {tripData.time}
          </p>
        </header>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Itinerary Overview</h2>

          {tripData.itinerary.map((day) => (
            <div key={day.day} className="mb-8">
              <h3 className="text-lg font-medium mb-4 pb-2 border-b">
                Day {day.day}
              </h3>
              <ul className="space-y-3">
                {day.activities.map((item, index) => (
                  <li key={index} className="flex">
                    <span className="font-mono w-16 text-gray-500">
                      {item.time}
                    </span>
                    <span>{item.activity}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Price Details</h2>
          <p className="text-2xl font-bold">
            ${tripData.price.toLocaleString()} {tripData.currency}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
            All taxes and fees included
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/edit-trip"
            className="py-3 px-6 border border-gray-300 dark:border-gray-600 rounded-md text-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            Edit Trip
          </Link>

          <Link
            href="/payment"
            className="py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-center transition-colors"
          >
            Continue to Payment
          </Link>
        </div>
      </div>
    </div>
  );
}
