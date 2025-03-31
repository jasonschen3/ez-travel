"use client";

import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BlueButton from "../components/BlueButton";

export default function Load() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1 items-center justify-center bg-gray-50 p-6">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
          <h1 className="mb-6 text-2xl font-bold text-gray-900">Your Journey is Being Planned</h1>
          
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-gray-700">
                Our team is carefully analyzing the best routes for your journey. This planning process typically takes 2-3 hours.
              </p>
              <p className="text-gray-700">
                Once your personalized itinerary is ready, we'll send it directly to your email address.
              </p>
              <p className="text-sm text-gray-500 italic">
                Feel free to close this page and wait for our email notification.
              </p>
            </div>
            
            <BlueButton onClick={() => router.push("/")}>
              Return to Home
            </BlueButton>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
