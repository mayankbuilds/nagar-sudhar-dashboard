// src/components/Dashboard.jsx
import React, { useState } from 'react';
import IssueDetailsModal from './IssueDetailsModal';
import MapView from './MapView'; // We'll create this for the Map View component

// Dummy Data for demonstration (you'd fetch this from a backend)
const DUMMY_ISSUES = [
  { id: 101, category: 'Road Pothole', location: 'Sector 15, Near Park', reportedOn: '2025-09-24', status: 'pending', description: 'A massive pothole causing traffic issues.', imageUrl: 'https://placehold.co/400x200/ef4444/FFFFFF?text=Pothole', coords: [22.5726, 88.3639] }, // Kolkata-ish coords
  { id: 102, category: 'Street Light Out', location: 'Main Street, Cross Road', reportedOn: '2025-09-22', status: 'in-progress', description: 'Street light not working for 3 days.', imageUrl: 'https://placehold.co/400x200/3b82f6/FFFFFF?text=Light+Out', coords: [22.58, 88.35] },
  { id: 103, category: 'Garbage Dump', location: 'Behind Mall Road', reportedOn: '2025-09-20', status: 'resolved', description: 'Illegal dumping of construction waste.', imageUrl: 'https://placehold.co/400x200/10b981/FFFFFF?text=Garbage', coords: [22.56, 88.37] },
];

// Utility to get status color
const getStatusColor = (status) => {
  switch (status) {
    case 'pending': return 'text-orange-500 bg-orange-100';
    case 'in-progress': return 'text-blue-500 bg-blue-100';
    case 'resolved': return 'text-green-500 bg-green-100';
    default: return 'text-gray-500 bg-gray-100';
  }
};

function Dashboard({ issuesData = DUMMY_ISSUES }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);

  // Stats calculation
  const totalReports = issuesData.length;
  const pendingReports = issuesData.filter(i => i.status === 'pending').length;
  const progressReports = issuesData.filter(i => i.status === 'in-progress').length;
  const resolvedReports = issuesData.filter(i => i.status === 'resolved').length;
  
  const statCards = [
    { title: 'Total Reports', value: totalReports, color: 'text-gray-800' },
    { title: 'Pending Approval', value: pendingReports, color: 'text-orange-500' },
    { title: 'In Progress', value: progressReports, color: 'text-blue-500' },
    { title: 'Resolved', value: resolvedReports, color: 'text-green-500' },
  ];

  const handleViewDetails = (issue) => {
    setSelectedIssue(issue);
    setModalOpen(true);
  };
  
  // Note: For 'Map View' to work, you'd need to switch the rendered component 
  // based on the active sidebar link (e.g., in App.jsx). 
  // For now, it shows the dashboard.

  return (
    <>
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {statCards.map((card) => (
          <div key={card.title} className="bg-white p-5 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">{card.title}</h3>
            <p className={`text-3xl font-bold ${card.color}`}>{card.value}</p>
          </div>
        ))}
      </div>

      {/* Issues Table */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Issues</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">Issue ID</th>
                <th scope="col" className="px-6 py-3">Category</th>
                <th scope="col" className="px-6 py-3">Location</th>
                <th scope="col" className="px-6 py-3">Reported On</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody id="issues-table-body">
              {issuesData.map((issue) => (
                <tr key={issue.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{issue.id}</td>
                  <td className="px-6 py-4">{issue.category}</td>
                  <td className="px-6 py-4">{issue.location}</td>
                  <td className="px-6 py-4">{issue.reportedOn}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(issue.status)} capitalize`}>
                      {issue.status.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => handleViewDetails(issue)}
                      className="text-blue-600 hover:text-blue-900 font-semibold"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
              {issuesData.length === 0 && (
                <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                        No recent issues found. Time to relax! 😌
                    </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Map View Section (Optional - uncomment when you implement the switch) */}
      {/* <div className="mt-6 bg-white p-6 rounded-lg shadow h-96">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Issues Map</h2>
        <MapView issues={issuesData} /> 
      </div>
      */}

      {/* Modal is a separate component */}
      {selectedIssue && (
        <IssueDetailsModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          issue={selectedIssue}
          // In a real app, you'd pass an update function here: 
          // onSave={(updatedIssue) => updateIssue(updatedIssue)} 
        />
      )}
    </>
  );
}

export default Dashboard;