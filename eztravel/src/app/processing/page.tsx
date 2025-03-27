"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Processing() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Mock AI processing time with a progress bar
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          // Navigate to trip details page when done
          router.push("/trip");
          return 100;
        }
        return prevProgress + 10;
      });
    }, 800);

    return () => clearInterval(interval);
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="text-center max-w-md">
        <h1 className="text-3xl font-bold mb-6">Planning Your Trip</h1>
        <p className="mb-8 text-lg">
          Our AI is creating the perfect itinerary for you...
        </p>

        <div className="w-full bg-gray-200 rounded-full h-4 mb-8 dark:bg-gray-700">
          <div
            className="bg-blue-600 h-4 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="flex flex-col items-center">
          <Image
            src="/globe.svg"
            alt="Processing"
            width={64}
            height={64}
            className="animate-pulse dark:invert mb-4"
          />
          <p className="text-gray-600 dark:text-gray-300">
            This will just take a moment
          </p>
        </div>
      </div>
    </div>
  );
}
