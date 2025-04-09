"use client";

import { useSearchParams } from "next/navigation";
import LandingPage1 from "./components/LandingPage1";
import LandingPage2 from "./components/LandingPage2";

const IndexPage = () => {
  const searchParams = useSearchParams();
  const tag = searchParams.get("tag");

  return tag === "2" ? <LandingPage2 /> : <LandingPage1 />;
};

export default IndexPage;
