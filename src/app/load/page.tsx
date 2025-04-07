"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoadPage() {
  const router = useRouter();

  useEffect(() => {
    async function planTrip() {
      const res = await fetch("/api/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "Metz",
          destination: "Madrid",
          dateTime: "April 8, 2025 10:00 AM",
        }),
      });

      const data = await res.json();

      if (data.success) {
        // Pass to /view-trip using search param
        router.push(
          `/view-trip?data=${encodeURIComponent(
            JSON.stringify(data.itinerary)
          )}`
        );
      } else {
        console.error("Failed to plan trip", data.error);
      }
    }

    planTrip();
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <p className="text-lg font-semibold">Planning your trip...</p>
    </div>
  );
}
