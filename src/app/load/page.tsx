"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Load() {
  const router = useRouter();

  return (
    <>
      <div>Loading</div>
      <button onClick={() => router.push("/trip")}>Payment</button>
    </>
  );
}
