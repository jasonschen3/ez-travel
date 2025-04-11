"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import BookingFormA from "../components/BookingFormA";
import BookingFormB from "../components/BookingFormB";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function BookingFormSelector() {
  const searchParams = useSearchParams();
  const variant = searchParams.get("variant");

  return variant === "B" ? <BookingFormB /> : <BookingFormA />;
}

function LoadingState() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1 items-center justify-center bg-gray-50 p-6">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
          <div className="animate-pulse">
            <div className="h-8 w-3/4 bg-gray-200 rounded mb-6"></div>
            <div className="space-y-4">
              <div className="h-10 w-full bg-gray-200 rounded"></div>
              <div className="h-10 w-full bg-gray-200 rounded"></div>
              <div className="h-10 w-full bg-gray-200 rounded"></div>
              <div className="h-10 w-full bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default function BookTrip() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1 items-center justify-center bg-gray-50 p-6">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
          <h1 className="mb-6 text-2xl font-bold text-gray-900">
            Book Your Journey
          </h1>
          <Suspense fallback={<LoadingState />}>
            <BookingFormSelector />
          </Suspense>
        </div>
      </div>
      <Footer />
    </div>
  );
}
