import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa'; // Import icons for the toggle

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed top-0 left-0 w-64 bg-gray-800 text-white h-full transition-all transform duration-300`}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold">Tractor Sales</h2>
          <ul className="mt-8 space-y-4">
            <li>
              <a href="/dashboard" className="block py-2 px-4 hover:bg-gray-700">
                Dashboard
              </a>
            </li>
            <li>
              <a href="/normal-sale-form" className="block py-2 px-4 hover:bg-gray-700">
                Normal Sale Form
              </a>
            </li>
            <li>
              <a href="/exchange-sale-form" className="block py-2 px-4 hover:bg-gray-700">
                Exchange Sale Form
              </a>
            </li>
            <li>
              <a href="/logout" className="block py-2 px-4 hover:bg-gray-700">
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-4">
        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden text-2xl text-white bg-gray-800 p-2 rounded-md"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Your main content here */}
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-gray-900">Welcome to Tractor Sales PWA</h1>
          {/* Rest of the content */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
