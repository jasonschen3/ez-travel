import React from 'react';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
      <div className="flex items-center">
        <span className="text-2xl font-bold text-blue-600">EzTravels</span>
      </div>
      <div className="hidden md:flex items-center space-x-8">
        <a href="#" className="text-gray-600 hover:text-blue-600">How It Works</a>
        <a href="#" className="text-gray-600 hover:text-blue-600">Destinations</a>
        <a href="#" className="text-gray-600 hover:text-blue-600">Pricing</a>
        <a href="#" className="text-gray-600 hover:text-blue-600">About Us</a>
      </div>
      <div className="flex items-center space-x-4">
        <button className="px-4 py-2 text-blue-600 hover:text-blue-800">Login</button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Sign Up</button>
      </div>
    </nav>
  );
};

export default Navbar; 