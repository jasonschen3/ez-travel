"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function BookTrip() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    date: "",
    time: "",
    preferences: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Store the form data in localStorage or session for the next page
    sessionStorage.setItem("tripDetails", JSON.stringify(formData));
    // Navigate to the processing page
    router.push("/processing");
  };

  return (
    <div className="min-h-screen p-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8 mt-8">Book Your Trip</h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md"
      >
        <div className="mb-6">
          <label htmlFor="origin" className="block mb-2 text-sm font-medium">
            Origin
          </label>
          <input
            id="origin"
            name="origin"
            type="text"
            value={formData.origin}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md dark:bg-gray-700"
            placeholder="Where are you starting from?"
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="destination"
            className="block mb-2 text-sm font-medium"
          >
            Destination
          </label>
          <input
            id="destination"
            name="destination"
            type="text"
            value={formData.destination}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md dark:bg-gray-700"
            placeholder="Where do you want to go?"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="date" className="block mb-2 text-sm font-medium">
              Date
            </label>
            <input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md dark:bg-gray-700"
              required
            />
          </div>
          <div>
            <label htmlFor="time" className="block mb-2 text-sm font-medium">
              Time
            </label>
            <input
              id="time"
              name="time"
              type="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md dark:bg-gray-700"
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <label
            htmlFor="preferences"
            className="block mb-2 text-sm font-medium"
          >
            Preferences
          </label>
          <textarea
            id="preferences"
            name="preferences"
            value={formData.preferences}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md dark:bg-gray-700"
            placeholder="Any special preferences? (e.g., budget constraints, activities, accessibility needs)"
            rows={4}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-medium"
        >
          Find My Trip
        </button>
      </form>
    </div>
  );
}
