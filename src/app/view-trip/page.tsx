"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TicketView from "../components/TicketView";
import { encode } from "punycode";

interface Step {
  title: string;
  details: string[];
}

interface Itinerary {
  steps: Step[];
  totalCost: string;
  totalTime: string;
}

export default function ViewTrip() {
  const searchParams = useSearchParams();
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);

  useEffect(() => {
    const source = searchParams.get("source");
    const destination = searchParams.get("destination");
    const dateTime = searchParams.get("dateTime");

    async function planTrip() {
      console.log("planning");
      try {
        const response = await fetch("/api/plan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            source: source,
            destination: destination,
            dateTime: dateTime,
          }),
        });
        const data = await response.json();
        console.log(data);
        setItinerary(data.itinerary);
      } catch (e) {
        console.error("Failed to parse itinerary", e);
      }
    }
    planTrip();
  }, [searchParams]);

  if (!itinerary) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-lg font-semibold">Loading itinerary...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1 items-center justify-center bg-gray-50 p-6">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
          <h1 className="mb-6 text-2xl font-bold text-gray-900">
            Your Trip Details
          </h1>

          <div className="space-y-6">
            {itinerary.steps.map((step: any, index: number) => (
              <div key={index} className="flex flex-col">
                <div className="font-bold text-gray-900">
                  {step.from} → {step.to}
                </div>
                <div className="ml-2 border-l-2 border-gray-300 py-1 pl-4 text-gray-700 space-y-1">
                  <div>Mode: {step.mode}</div>
                  <div>
                    {/* Format departure date and time separately */}
                    <div>
                      Departure Date:{" "}
                      {new Date(step.departure).toLocaleDateString()}
                    </div>
                    <div>
                      Departure Time:{" "}
                      {new Date(step.departure).toLocaleTimeString()}
                    </div>
                  </div>
                  <div>Arrival: {new Date(step.arrival).toLocaleString()}</div>
                  <div>Duration: {step.duration} </div>
                  <div>Cost: €{step.cost}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-gray-200 pt-4 space-y-1 text-sm text-gray-700">
            <div>
              <strong>Total Cost:</strong> {itinerary.totalCost}
            </div>
            <div>
              <strong>Total Time:</strong> {itinerary.totalTime}
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Reply to the original email with any questions
          </div>
        </div>
      </div>
      <Footer />

      <TicketView
        isOpen={selectedTicket !== null}
        onClose={() => setSelectedTicket(null)}
        ticketImage={selectedTicket?.image || ""}
        ticketType={selectedTicket?.type || ""}
        from={selectedTicket?.from || ""}
        to={selectedTicket?.to || ""}
      />
    </div>
  );
}
