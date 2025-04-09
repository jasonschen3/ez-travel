"use client";

import { useSearchParams } from "next/navigation";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import BookingFormA from "../components/BookingFormA";
import BookingFormB from "../components/BookingFormB";

export default function BookTrip() {
  const searchParams = useSearchParams();
  const variant = searchParams.get("variant");

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1 items-center justify-center bg-gray-50 p-6">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
          <h1 className="mb-6 text-2xl font-bold text-gray-900">
            Book Your Journey
          </h1>
          {variant === "B" ? <BookingFormB /> : <BookingFormA />}
        </div>
      </div>
      <Footer />
    </div>
  );
}
