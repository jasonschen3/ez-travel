import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between pb-8 border-b border-gray-200">
          <div className="mb-6 md:mb-0">
            <span className="text-xl font-bold text-blue-600">EzTravel</span>
            <p className="mt-2 text-gray-600 max-w-xs">Making complex travel simple with intelligent multi-modal connections.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-blue-600">About Us</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600">Careers</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-blue-600">Help Center</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600">Contact Us</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600">Privacy Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Travel Types</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-blue-600">Business Travel</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600">Vacation Packages</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600">City Hopping</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">© 2025 EzTravel. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-blue-600">Terms</a>
            <a href="#" className="text-gray-400 hover:text-blue-600">Privacy</a>
            <a href="#" className="text-gray-400 hover:text-blue-600">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 