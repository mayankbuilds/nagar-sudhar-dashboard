// src/App.jsx
import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import MapView from "./pages/MapView";
import AllIssues from "./pages/AllIssues";
import Settings from "./pages/Settings";
import Reports from "./pages/Reports";
import { fetchAllIssues } from "./services/issueService";
import { fetchReportData } from "./services/reportService";

// Import the icon file for branding
import AdminAvatar from "./assets/icon.png";

// Define constants for your views
const VIEWS = {
  DASHBOARD: "dashboard",
  MAP_VIEW: "map-view",
  ALL_ISSUES: "all-issues",
  REPORTS: "reports",
  SETTINGS: "settings",
};

function App() {
  const [issuesData, setIssuesData] = useState([]);
  const [reportData, setReportData] = useState({});
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState(VIEWS.DASHBOARD);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // Fetch both sets of data simultaneously
        const [issues, reports] = await Promise.all([
          fetchAllIssues(),
          fetchReportData(),
        ]);
        setIssuesData(issues);
        setReportData(reports); // <-- This sets the report data!
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="text-center p-12 text-gray-500 text-lg">
          Loading Nagar Sudhar data... ⏳
        </div>
      );
    }

    switch (currentView) {
      case VIEWS.DASHBOARD:
        return <Dashboard issuesData={issuesData} />;
      case VIEWS.MAP_VIEW:
        return <MapView issuesData={issuesData} />;
      case VIEWS.ALL_ISSUES:
        return <AllIssues issuesData={issuesData} />;
      case VIEWS.REPORTS:
        return <Reports reportData={reportData} />;
      case VIEWS.SETTINGS:
        return <Settings />;
      default:
        return <Dashboard issuesData={issuesData} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        currentView={currentView}
        setCurrentView={setCurrentView}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex justify-between items-center p-4 bg-white border-b">
          <h1 className="text-2xl font-bold text-gray-800">
            {currentView
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}{" "}
            Overview
          </h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Welcome, Admin</span>
            <img
              src={AdminAvatar}
              alt="Admin"
              className="w-10 h-10 rounded-full bg-blue-500 p-1"
            />
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;