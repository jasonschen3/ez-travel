// Cost focused

"use client";

import React, { useState } from "react";
import { Search, Sparkles, Wallet, Route } from "lucide-react";
import { useRouter } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BlueButton from "./BlueButton";

// Main Landing Page Component
const LandingPage1 = () => {
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
              <span className="text-blue-600">AI-Optimized</span> Travel Itineraries
            </h1>
            <p className="mb-8 text-xl text-gray-600">
              Experience the future of travel with our AI-optimized itineraries. Our advanced algorithms ensure you get the most efficient and enjoyable journey, tailored to your preferences.
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
            Why Choose EzTravels for Optimal Journeys
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-lg border border-gray-100 p-6 transition-shadow hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <Sparkles className="text-blue-600" size={24} />
              </div>
              <h3 className="mb-2 text-xl font-semibold">AI-Driven Optimization</h3>
              <p className="text-gray-600">
                Our AI evaluates countless options to craft the most optimal itinerary, ensuring a seamless travel experience.
              </p>
            </div>

            <div className="rounded-lg border border-gray-100 p-6 transition-shadow hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <Wallet className="text-blue-600" size={24} />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Tailored Experiences</h3>
              <p className="text-gray-600">
                Enjoy personalized travel plans that cater to your unique preferences and needs.
              </p>
            </div>

            <div className="rounded-lg border border-gray-100 p-6 transition-shadow hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <Route className="text-blue-600" size={24} />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Seamless Multi-Modal Travel</h3>
              <p className="text-gray-600">
                Effortlessly combine various modes of transport for the most efficient journey possible.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage1;