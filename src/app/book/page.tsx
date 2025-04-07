"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import BlueButton from "../components/BlueButton";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function BookTrip() {
  const router = useRouter();
  const [bookingData, setBookingData] = useState({
    source: "",
    destination: "",
    dateTime: "",
    email: "",
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Get and decode the destination from URL query
    const searchParams = new URLSearchParams(window.location.search);
    const destination = searchParams.get("destination");
    if (destination) {
      try {
        const decodedDestination = decodeURIComponent(destination);
        setBookingData((prev) => ({
          ...prev,
          destination: decodedDestination,
        }));
      } catch (error) {
        console.error("Error decoding destination:", error);
      }
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear errors when user starts typing
    setErrors([]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors([]);
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      source: formData.get("source") as string,
      destination: formData.get("destination") as string,
      dateTime: formData.get("dateTime") as string,
      email: formData.get("email") as string,
    };

    try {
      const response = await fetch("/api/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        setErrors(result.errors || ["Failed to submit booking"]);
        return;
      }

      router.push("/load");
    } catch (error) {
      setErrors(["An error occurred while submitting your booking"]);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1 items-center justify-center bg-gray-50 p-6">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
          <h1 className="mb-6 text-2xl font-bold text-gray-900">
            Book Your Journey
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="source"
                  className="block text-sm font-medium text-gray-700"
                >
                  From
                </label>
                <input
                  type="text"
                  id="source"
                  name="source"
                  value={bookingData.source}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="destination"
                  className="block text-sm font-medium text-gray-700"
                >
                  To
                </label>
                <input
                  type="text"
                  id="destination"
                  name="destination"
                  value={bookingData.destination}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="dateTime"
                  className="block text-sm font-medium text-gray-700"
                >
                  Departure Date & Time
                </label>
                <input
                  type="datetime-local"
                  id="dateTime"
                  name="dateTime"
                  value={bookingData.dateTime}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={bookingData.email}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            {errors.length > 0 && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="text-sm text-red-700">
                  <ul className="list-disc space-y-1 pl-5">
                    {errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            <BlueButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : "Find Routes"}
            </BlueButton>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
