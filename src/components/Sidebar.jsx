// src/components/Sidebar.jsx
import React from 'react';
// IMPORT the icon.png file here!
import NagarSudharLogo from '../assets/icon.png';

// Define the navigation links with a unique 'key' that matches the state value
const navLinks = [
  { name: 'Dashboard', key: 'dashboard' },
  { name: 'All Issues', key: 'all-issues' },
  { name: 'Map View', key: 'map-view' },
  { name: 'Reports', key: 'reports' }, 
  { name: 'Settings', key: 'settings' },
];

function Sidebar({ isSidebarOpen, setIsSidebarOpen, currentView, setCurrentView }) {
  const activeClass = "bg-blue-500 text-white";
  const inactiveClass = "text-gray-300 hover:bg-blue-500 hover:text-white";

  return (
    <aside 
      className={`sidebar bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 
        transform transition duration-200 ease-in-out z-40 shadow-2xl
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:relative md:translate-x-0`}
    >
      {/* Sidebar Close Button for Mobile (when open) */}
      {isSidebarOpen && (
          <button
              onClick={() => setIsSidebarOpen(false)}
              className="absolute top-2 right-2 text-white text-3xl leading-none md:hidden"
          >
              &times;
          </button>
      )}

      {/* Logo/Title - Nagar Sudhar */}
      <a href="#" className="text-white flex items-center space-x-2 px-4">
        {/* REPLACED THE SVG WITH AN IMAGE TAG */}
        <img 
            src={NagarSudharLogo} 
            alt="Nagar Sudhar Logo" 
            className="h-8 w-8 object-contain bg-white rounded-full p-1" // Added styling to display it cleanly
        />
        <span className="text-2xl font-extrabold">Nagar Sudhar</span>
      </a>

      {/* Navigation Links */}
      <nav>
        {navLinks.map((link) => (
          <a 
            key={link.key}
            href="#" 
            onClick={(e) => {
              e.preventDefault(); 
              setCurrentView(link.key); 
              setIsSidebarOpen(false); 
            }}
            className={`block py-2.5 px-4 rounded transition duration-200 ${
              link.key === currentView ? activeClass : inactiveClass
            }`}
          >
            {link.name}
          </a>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;