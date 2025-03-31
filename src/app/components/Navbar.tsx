"use client";
import React from "react";
import { MapPin } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
      <div className="flex items-center">
        <Link href="/" className="flex items-center">
          <MapPin className="w-6 h-6 text-orange-600 mr-2" />
          <span className="text-2xl font-bold">
            <span className="text-orange-600">Ez</span>
            <span className="text-blue-600">Travels</span>
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
