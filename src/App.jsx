// src/App.jsx (Updated)
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import MapView from './components/MapView'; // <-- Import your MapView component
import DUMMY_ISSUES from './data/dummyIssues';

// Define constants for your views
const VIEWS = {
  DASHBOARD: 'dashboard',
  MAP_VIEW: 'map-view',
  // Add others later: ALL_ISSUES: 'all-issues', REPORTS: 'reports', etc.
};

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState(VIEWS.DASHBOARD); // <-- New State!
  const [issuesData, setIssuesData] = useState(DUMMY_ISSUES); 
  const [currentView, setCurrentView] = useState(VIEWS.DASHBOARD);

  // Renders the correct component based on state
  const renderContent = () => {
    switch (currentView) {
      case VIEWS.DASHBOARD:
        // Pass a dummy issuesData array for now (Dashboard.jsx already has DUMMY_ISSUES)
        return <Dashboard issuesData={issuesData} />; 
      case VIEWS.MAP_VIEW:
        // Pass the issues data to the map component
        // NOTE: You need to lift your DUMMY_ISSUES from Dashboard.jsx to App.jsx later!
        return <MapView issuesData={issuesData} />; 
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Pass the current view and the setter function to the Sidebar */}
      <Sidebar 
        isSidebarOpen={isSidebarOpen} 
        setIsSidebarOpen={setIsSidebarOpen} 
        currentView={currentView} // New prop
        setCurrentView={setCurrentView} // New prop
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* ... Header remains the same ... */}

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {renderContent()} {/* <-- Render the selected view */}
        </main>
      </div>
    </div>
  );
}

export default App;