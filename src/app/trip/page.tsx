"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface Step {
  from: string;
  to: string;
  mode: string;
  departure: string;
  arrival: string;
  duration: string;
  cost: number;
}

interface Itinerary {
  steps: Step[];
  totalCost: string;
  totalTime: string;
}

export default function TripDetails() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchItinerary() {
      if (!bookingId) return;

      try {
        const response = await fetch(`/api/book/${bookingId}`);
        const data = await response.json();

        if (response.ok) {
          setItinerary(data.itinerary);
        } else {
          console.error("Failed to fetch itinerary:", data.error);
        }
      } catch (error) {
        console.error("Error fetching itinerary:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchItinerary();
  }, [bookingId]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-lg font-semibold">Loading your trip details...</p>
      </div>
    );
  }

  if (!itinerary) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-lg font-semibold text-red-500">
          Failed to load trip details. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1 flex-col items-center justify-center bg-gray-50 p-6">
        <div className="w-full max-w-2xl rounded-lg bg-white p-8 shadow-md">
          <h1 className="mb-6 text-2xl font-bold text-gray-900">
            Trip Confirmed!
          </h1>

          {/* Render the steps */}
          <div className="space-y-6">
            {itinerary.steps.map((step, index) => (
              <div key={index} className="flex flex-col">
                <div className="font-bold text-gray-900">
                  {step.from} → {step.to}
                </div>
                <div className="ml-2 border-l-2 border-gray-300 py-1 pl-4">
                  <div className="text-gray-700">Mode: {step.mode}</div>
                  <div className="text-gray-600">
                    Departure: {new Date(step.departure).toLocaleString()}
                  </div>
                  <div className="text-gray-600">
                    Arrival: {new Date(step.arrival).toLocaleString()}
                  </div>
                  <div className="text-gray-600">Duration: {step.duration}</div>
                  <div className="text-gray-900">Cost: €{step.cost}</div>
                </div>
              </div>
            ))}

            {/* Trip Summary */}
            <div className="space-y-2 border-t border-gray-200 pt-6">
              <div className="font-bold text-gray-900">
                Email confirmation has been sent. Tickets will be sent to same
                email as soon as they're available.
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
