import React from "react";
import { Search, ArrowRight } from "lucide-react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Main Landing Page Component
const EzTravelLanding = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />

      {/* Hero Section */}
      <section className="px-6 py-16 md:py-24 max-w-6xl mx-auto">
        <div className="flex flex-col items-center">
          <div className="w-full max-w-lg text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Your Journey, <span className="text-blue-600">Simplified</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Book multi-modal travel in one place. All transportation options
              connected seamlessly for your perfect trip.
            </p>

            {/* Search Box - Main CTA */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-2">
                  <Search className="text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Where are you going?"
                    className="w-full py-2 focus:outline-none"
                  />
                </div>
                <button className="w-full py-3 bg-blue-600 cursor-pointer text-white rounded-md font-medium text-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                  Plan My Journey
                  <ArrowRight size={18} className="ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose EzTravel
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Search className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">All-in-One Search</h3>
              <p className="text-gray-600">
                Find and compare all travel options in seconds with our powerful
                search engine.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <ArrowRight className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Seamless Connections
              </h3>
              <p className="text-gray-600">
                We optimize your journey by connecting different transportation
                modes perfectly.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Search className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">
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
