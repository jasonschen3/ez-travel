"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function BookTrip() {
  const router = useRouter();
  const [bookingData, setBookingData] = useState({
    source: "",
    destination: "",
    dateTime: "",
  });

  useEffect(() => {
    // Get and decode the source from URL query
    const searchParams = new URLSearchParams(window.location.search);
    const source = searchParams.get("source");
    if (source) {
      try {
        const decodedSource = decodeURIComponent(source);
        setBookingData((prev) => ({
          ...prev,
          destination: decodedSource,
        }));
      } catch (error) {
        console.error("Error decoding source:", error);
      }
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically validate the data and proceed to the payment page
    router.push("/load");
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold mb-6">Book Trip</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="source"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Source
            </label>
            <input
              type="text"
              id="source"
              name="source"
              value={bookingData.source}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="destination"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Destination
            </label>
            <input
              type="text"
              id="destination"
              name="destination"
              value={bookingData.destination}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="dateTime"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Date/Time (MM-DD-YYYY HH:MM)
            </label>
            <input
              type="datetime-local"
              id="dateTime"
              name="dateTime"
              value={bookingData.dateTime}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Find Routes
          </button>
        </form>
      </div>
    </div>
  );
}
