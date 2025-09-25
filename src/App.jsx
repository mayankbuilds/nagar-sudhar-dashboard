// src/App.jsx
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // In a real app, you'd fetch issue data here or use state management
  const [issuesData, setIssuesData] = useState([]); // Empty for now, as data was JS-injected
  
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar 
        isSidebarOpen={isSidebarOpen} 
        setIsSidebarOpen={setIsSidebarOpen} 
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex justify-between items-center p-4 bg-white border-b shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Welcome, Admin</span>
            <img src="https://placehold.co/40x40/3b82f6/FFFFFF?text=A" alt="Admin" className="w-10 h-10 rounded-full"/>
            {/* Toggle button for small screens */}
            <button 
              className="md:hidden text-gray-500 hover:text-gray-900" 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"/>
              </svg>
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {/* Dashboard is rendered here */}
          <Dashboard issuesData={issuesData} />
        </main>
      </div>
    </div>
  );
}

export default App;