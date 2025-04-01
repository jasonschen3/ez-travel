"use client";

import ReactPixel from "react-facebook-pixel";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const options = {
  autoConfig: true,
  debug: false,
};

// Initialize the pixel
ReactPixel.init("1849807412223921", undefined, options);

export default function MetaPixel() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Track page views
    ReactPixel.pageView();
  }, [pathname, searchParams]);

  return null;
}

// Helper function to track custom events
export const trackEvent = (eventName: string, eventData?: any) => {
  ReactPixel.track(eventName, eventData);
}; 