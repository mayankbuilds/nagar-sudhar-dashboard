// src/components/Sidebar.jsx
import React from 'react';

const navLinks = [
  { name: 'Dashboard', href: '#', isActive: true },
  { name: 'All Issues', href: '#', isActive: false },
  { name: 'Map View', href: '#', isActive: false },
  { name: 'Reports', href: '#', isActive: false },
  { name: 'Settings', href: '#', isActive: false },
];

function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
  // The 'sidebar-link-active' class is now handled by Tailwind classes directly
  const activeClass = "bg-blue-500 text-white";
  const inactiveClass = "text-gray-300 hover:bg-blue-500 hover:text-white";

  return (
    // Conditional classes for mobile hide/show: 
    // -translate-x-full is hidden, translate-x-0 is shown
    <aside 
      className={`sidebar bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 
        transform transition duration-200 ease-in-out z-40
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:relative md:translate-x-0`}
    >
      {/* Sidebar Close Button for Mobile (when open) */}
      {isSidebarOpen && (
          <button
              onClick={() => setIsSidebarOpen(false)}
              className="absolute top-2 right-2 text-white md:hidden"
          >
              &times;
          </button>
      )}

      <a href="#" className="text-white flex items-center space-x-2 px-4">
        <svg className="h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
        </svg>
        <span className="text-2xl font-extrabold">Nagar Sudhar</span> {/* Renamed! */}
      </a>

      <nav>
        {navLinks.map((link) => (
          <a 
            key={link.name}
            href={link.href}
            className={`block py-2.5 px-4 rounded transition duration-200 ${link.isActive ? activeClass : inactiveClass}`}
          >
            {link.name}
          </a>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;