"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import BlueButton from "../components/BlueButton";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function EmailForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors([]);
    setIsSubmitting(true);

    try {
      // Get all the search params
      const source = searchParams!.get("source");
      const destination = searchParams!.get("destination");
      const dateTime = searchParams!.get("dateTime");

      // Create new search params for the view-trip page
      const viewTripParams = new URLSearchParams({
        source: source || "",
        destination: destination || "",
        dateTime: dateTime || "",
      });

      router.push(`/view-trip?${viewTripParams.toString()}`);
    } catch (error) {
      console.log("Error submitting form", error);
      setErrors(["An error occurred while processing your request"]);
    } finally {
      setIsSubmitting(false);
    }
  };

  // If this page is accessed without the variant B flag, redirect to main booking page
  if (searchParams!.get("variant") !== "B") {
    router.push("/book");
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1 items-center justify-center bg-gray-50 p-6">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
          <h1 className="mb-6 text-2xl font-bold text-gray-900">
            Almost There!
          </h1>
          <p className="mb-6 text-gray-600">
            Please provide your email to receive your travel itinerary.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {errors.length > 0 && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="text-sm text-red-700">
                  <ul className="list-disc space-y-1 pl-5">
                    {errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            <BlueButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : "Find Routes"}
            </BlueButton>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1 items-center justify-center bg-gray-50 p-6">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
          <div className="animate-pulse">
            <div className="h-8 w-3/4 bg-gray-200 rounded mb-6"></div>
            <div className="h-4 w-full bg-gray-200 rounded mb-6"></div>
            <div className="space-y-4">
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

export default function BookEmail() {
  return (
    <Suspense fallback={<LoadingState />}>
      <EmailForm />
    </Suspense>
  );
}
