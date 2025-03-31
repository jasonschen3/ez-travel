"use client";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BlueButton from "../components/BlueButton";

export default function TripDetails() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1 items-center justify-center bg-gray-50 p-6">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
          <h1 className="mb-6 text-2xl font-bold text-gray-900">
            Your Trip Details
          </h1>

          <div className="space-y-6">
            <div>
              {/* Metz Stop */}
              <div className="flex flex-col">
                <div className="font-bold text-gray-900">Metz 10:00 am</div>
                <div className="ml-2 border-l-2 border-gray-300 py-1 pl-4">
                  <div className="text-gray-700">Train on TGV</div>
                  <div className="text-gray-600">1 hr 15 min</div>
                  <div className="text-gray-900">$15.12</div>
                </div>
              </div>

              {/* Paris Stop */}
              <div className="flex flex-col">
                <div className="font-bold text-gray-900">
                  Paris CDG 11:15 am
                </div>
                <div className="ml-2 border-l-2 border-gray-300 py-1 pl-4">
                  <div className="text-gray-700">Flight on Ryanair</div>
                  <div className="text-gray-600">2 hr</div>
                  <div className="text-gray-900">$35.12</div>
                </div>
              </div>

              {/* Madrid Airport Stop */}
              <div className="flex flex-col">
                <div className="font-bold text-gray-900">
                  Madrid Airport 12:15 pm
                </div>
                <div className="ml-2 border-l-2 border-gray-300 py-1 pl-4">
                  <div className="text-gray-700">Uber</div>
                  <div className="text-gray-600">15 min</div>
                  <div className="text-gray-900">$8.12</div>
                </div>
              </div>

              {/* Madrid Hotel Stop */}
              <div className="flex flex-col">
                <div className="font-bold text-gray-900">
                  Madrid Hotel 12:30 pm
                </div>
              </div>
            </div>

            {/* Trip Summary */}
            <div className="space-y-2 border-t border-gray-200 pt-6">
              <div className="font-bold text-gray-900">Total Cost: $91</div>
              <div className="font-bold text-gray-900">
                Total Time: 2hr 30min
              </div>
            </div>

            {/* Change Trip Text */}
            <div className="mt-4 text-sm text-gray-600">
              Reply to the original email to make trip changes
            </div>

            <BlueButton
              onClick={() =>
                (window.location.href =
                  "https://buy.stripe.com/test_aEU6qe9J50xba9a5kk")
              }
            >
              Continue to Payment
            </BlueButton>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
