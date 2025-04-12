"use client";

import { Suspense, useRef } from "react";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TicketView from "../components/TicketView";

import BlueButton from "../components/BlueButton";

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

function ViewTrip() {
  const searchParams = useSearchParams();
  const email = searchParams!.get("email");
  const source = searchParams!.get("source");
  const destination = searchParams!.get("destination");
  const dateTime = searchParams!.get("dateTime");

  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [bookingId, setBookingId] = useState<string>("");
  const bookingIdRef = useRef<string | null>(null);

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

  function generateBookingId() {
    const timestamp = Date.now().toString(36); // Convert current timestamp to base-36
    const randomString = Math.random().toString(36).substring(2, 8); // Generate a random string
    return `booking_${timestamp}_${randomString}`;
  }

  useEffect(() => {
    const initializeTrip = async () => {
      if (!bookingIdRef.current) {
        const newBookingId = generateBookingId();
        bookingIdRef.current = newBookingId;
        setBookingId(newBookingId);
        console.log(newBookingId);
      }

      await planTrip();
    };

    initializeTrip();
  }, [searchParams]);

  const handleRegenerate = () => {
    setItinerary(null);
    planTrip();
  };

  const handleCancel = () => {
    window.location.href = "/book";
  };

  // Total cost without Uber
  const findTotalCost = () => {
    if (!itinerary || !itinerary.steps) {
      console.error("Itinerary is not available.");
      return 0;
    }

    let totalCost = 0;

    // Iterate through the steps and sum up the costs, excluding Uber
    for (const step of itinerary.steps) {
      if (step.mode.trim().toLowerCase() !== "uber") {
        totalCost += step.cost;
      }
    }

    return totalCost;
  };

  // Right now takes the total cost, doesn't factor out Uber or profits
  const handleCheckout = async () => {
    if (!itinerary) {
      console.error("Itinerary is not available.");
      return;
    }

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingId: bookingId,
          amount: findTotalCost(),
          itinerary: itinerary,
          email: email,
          source: source,
          destination: destination,
          dateTime: dateTime,
        }),
      });

      if (!response.ok) {
        console.error("Failed to create checkout session.");
        return;
      }

      const data = await response.json();
      if (data.checkoutUrl) {
        // Redirect to Stripe Checkout
        window.location.href = data.checkoutUrl;
      } else {
        console.error("Checkout URL not found in response.");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

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
              <strong>Total Cost (including Uber):</strong>{" "}
              {itinerary.totalCost}
            </div>
            <div>
              <strong>Total Time:</strong> {itinerary.totalTime}
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            Above will be the approximation of your ideal itinerary
          </div>
          <div className="mt-6 flex space-x-4">
            <BlueButton onClick={handleCheckout}>Confirm and Pay</BlueButton>
            <button
              onClick={handleRegenerate}
              className="flex-1 rounded-lg px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white"
            >
              Regenerate
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 rounded-lg px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white"
            >
              Cancel
            </button>
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

export default function ViewPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          Loading...
        </div>
      }
    >
      <ViewTrip />
    </Suspense>
  );
}
