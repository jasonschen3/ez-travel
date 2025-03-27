import Link from "next/link";
import FeatureCard from "@/components/FeatureCard";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center">
        <h1 className="text-4xl font-bold text-center">EZ Travel</h1>
        <p className="text-xl text-center max-w-md">
          Plan your trip easily with our AI-powered booking assistant
        </p>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white gap-2 font-medium text-lg h-14 px-8"
            href="/api/auth/google"
          >
            Book Now with Google
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-4xl">
          <FeatureCard
            title="Simple Booking"
            description="Enter your destination, date, and time - we'll handle the rest"
            icon="/globe.svg"
          />
          <FeatureCard
            title="AI Trip Planning"
            description="Our AI builds the perfect itinerary based on your preferences"
            icon="/file.svg"
          />
          <FeatureCard
            title="Secure Payment"
            description="One-time payment with Stripe and email confirmation"
            icon="/vercel.svg"
          />
        </div>
      </main>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} EZ Travel. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
