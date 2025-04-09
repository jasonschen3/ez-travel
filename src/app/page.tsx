"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import LandingPage1 from "./components/LandingPage1";
import LandingPage2 from "./components/LandingPage2";

function LandingPageSelector() {
  const searchParams = useSearchParams();
  const tag = searchParams.get("tag");

  return tag === "2" ? <LandingPage2 /> : <LandingPage1 />;
}

function LoadingState() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="animate-pulse">
        <div className="h-16 bg-white shadow-sm mb-8"></div>
        <div className="mx-auto max-w-6xl px-6">
          <div className="h-12 w-3/4 bg-gray-200 rounded mb-4"></div>
          <div className="h-6 w-1/2 bg-gray-200 rounded mb-8"></div>
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function IndexPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <LandingPageSelector />
    </Suspense>
  );
}
