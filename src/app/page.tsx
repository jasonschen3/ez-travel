"use client";

import React, { useState } from "react";
import { Search, Sparkles, Wallet, Route } from "lucide-react";
import { useRouter } from "next/navigation";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BlueButton from "./components/BlueButton";

// Main Landing Page Component
const EzTravelLanding = () => {
  const [destination, setDestination] = useState("");
  const router = useRouter();

  const handlePlanJourney = () => {
    if (destination.trim()) {
      router.push(
        `/book?destination=${encodeURIComponent(destination.trim())}`,
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />

      {/* Hero Section */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="flex flex-col items-center">
          <div className="mb-10 w-full max-w-lg text-center">
            <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
              <span className="text-blue-600">AI-Powered</span> Travel Itineraries
            </h1>
            <p className="mb-8 text-xl text-gray-600">
              Get the most cost-effective travel plans combining flights, trains, ferries, and more. Our AI ensures you get the best experience at the best price.
            </p>

            {/* Search Box - Main CTA */}
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-2">
                  <Search className="text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Where do you want to go?"
                    className="w-full py-2 focus:outline-none"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handlePlanJourney();
                      }
                    }}
                  />
                </div>
                <BlueButton onClick={handlePlanJourney}>
                  Generate My Itinerary
                </BlueButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Why Choose EzTravels
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-lg border border-gray-100 p-6 transition-shadow hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <Sparkles className="text-blue-600" size={24} />
              </div>
              <h3 className="mb-2 text-xl font-semibold">AI-Powered Planning</h3>
              <p className="text-gray-600">
                Our advanced AI analyzes millions of options to create the perfect itinerary for your journey.
              </p>
            </div>

            <div className="rounded-lg border border-gray-100 p-6 transition-shadow hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <Wallet className="text-blue-600" size={24} />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Best Price Guaranteed</h3>
              <p className="text-gray-600">
                We combine all transportation modes to find the most cost-effective options for your trip.
              </p>
            </div>

            <div className="rounded-lg border border-gray-100 p-6 transition-shadow hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <Route className="text-blue-600" size={24} />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Multi-Modal Travel</h3>
              <p className="text-gray-600">
                Seamlessly combine flights, trains, ferries, and more for the most efficient journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EzTravelLanding;
