"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const options = {
  autoConfig: true,
  debug: false,
};

export default function MetaPixel() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Dynamically import react-facebook-pixel only on client side
    const ReactPixel = require("react-facebook-pixel");
    
    // Initialize the pixel
    ReactPixel.default.init("1849807412223921", undefined, options);
  }, []);

  useEffect(() => {
    // Dynamically import react-facebook-pixel only on client side
    const ReactPixel = require("react-facebook-pixel");
    
    // Track page views
    ReactPixel.default.pageView();
  }, [pathname, searchParams]);

  return null;
}

// Helper function to track custom events
export const trackEvent = (eventName: string, eventData?: any) => {
  // Dynamically import react-facebook-pixel only on client side
  const ReactPixel = require("react-facebook-pixel");
  ReactPixel.default.track(eventName, eventData);
}; 