"use client";

import React, { useState } from "react";
import { Search, ArrowRight } from "lucide-react";
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
              Your Journey, <span className="text-blue-600">Simplified</span>
            </h1>
            <p className="mb-8 text-xl text-gray-600">
              Book multi-modal travel in one place. All transportation options
              connected seamlessly for your perfect trip.
            </p>

            {/* Search Box - Main CTA */}
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-2">
                  <Search className="text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Where are you going?"
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
                  Plan My Journey
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
                <Search className="text-blue-600" size={24} />
              </div>
              <h3 className="mb-2 text-xl font-semibold">All-in-One Search</h3>
              <p className="text-gray-600">
                Find and compare all travel options in seconds with our powerful
                search engine.
              </p>
            </div>

            <div className="rounded-lg border border-gray-100 p-6 transition-shadow hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <ArrowRight className="text-blue-600" size={24} />
              </div>
              <h3 className="mb-2 text-xl font-semibold">
                Seamless Connections
              </h3>
              <p className="text-gray-600">
                We optimize your journey by connecting different transportation
                modes perfectly.
              </p>
            </div>

            <div className="rounded-lg border border-gray-100 p-6 transition-shadow hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <Search className="text-blue-600" size={24} />
              </div>
              <h3 className="mb-2 text-xl font-semibold">
                One Ticket Solution
              </h3>
              <p className="text-gray-600">
                Book everything through a single platform and manage all your
                travel documents in one place.
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
