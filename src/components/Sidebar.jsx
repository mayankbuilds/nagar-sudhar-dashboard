// src/components/Sidebar.jsx
import React from 'react';

// Define the navigation links with a unique 'key' that matches the state value
const navLinks = [
  { name: 'Dashboard', key: 'dashboard' },
  { name: 'All Issues', key: 'all-issues' },
  { name: 'Map View', key: 'map-view' },
  { name: 'Reports', key: 'reports' },
  { name: 'Settings', key: 'settings' },
];

/**
 * Sidebar Component for the Nagar Sudhar Dashboard.
 * Handles navigation state and mobile toggle.
 * * @param {object} props
 * @param {boolean} props.isSidebarOpen - Controls mobile visibility.
 * @param {function} props.setIsSidebarOpen - Function to close the sidebar on mobile.
 * @param {string} props.currentView - The currently active view/page key.
 * @param {function} props.setCurrentView - Function to switch the active view in App.jsx.
 */
function Sidebar({ isSidebarOpen, setIsSidebarOpen, currentView, setCurrentView }) {
  // Tailwind classes for active/inactive state
  const activeClass = "bg-blue-500 text-white";
  const inactiveClass = "text-gray-300 hover:bg-blue-500 hover:text-white";

  return (
    // Conditional classes for mobile hide/show + added shadow-2xl for depth (UX polish)
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
        <svg className="h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
        </svg>
        <span className="text-2xl font-extrabold">Nagar Sudhar</span>
      </a>

      {/* Navigation Links */}
      <nav>
        {navLinks.map((link) => (
          <a 
            key={link.key}
            href="#" // We use JS for routing, so href="#" is fine
            onClick={(e) => {
              e.preventDefault(); // Stop the browser from scrolling/reloading
              setCurrentView(link.key); // Update the active view
              setIsSidebarOpen(false); // Close sidebar on mobile after selection
            }}
            // Apply the active or inactive class based on the currentView prop
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