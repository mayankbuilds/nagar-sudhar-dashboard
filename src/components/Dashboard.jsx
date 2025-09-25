// src/components/Dashboard.jsx
import React, { useState, useMemo } from 'react';
import IssueDetailsModal from './IssueDetailsModal';
// Note: DUMMY_ISSUES import is removed here. Data is passed via props from App.jsx

// Utility to get status color for table pills
const getStatusColor = (status) => {
  switch (status) {
    case 'pending': return 'text-orange-800 bg-orange-200 rounded-full';
    case 'in-progress': return 'text-blue-800 bg-blue-200 rounded-full';
    case 'resolved': return 'text-green-800 bg-green-200 rounded-full';
    default: return 'text-gray-500 bg-gray-100 rounded-full';
  }
};

// Available categories for filtering
const CATEGORIES = ['All', 'Roads & Pavements', 'Sanitation', 'Public Lighting', 'Waste Management'];


function Dashboard({ issuesData = [] }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [filterCategory, setFilterCategory] = useState('All'); // State for filtering

  // --- Filtering Logic ---
  const filteredIssues = useMemo(() => {
      return issuesData.filter(issue => {
          if (filterCategory === 'All') return true;
          // Ensure the status checking is robust
          return issue.category === filterCategory;
      });
  }, [issuesData, filterCategory]);
  
  // --- Stats Calculation (uses filteredIssues) ---
  const totalReports = filteredIssues.length;
  const pendingReports = filteredIssues.filter(i => i.currentStatus === 'pending').length;
  const progressReports = filteredIssues.filter(i => i.currentStatus === 'in-progress').length;
  const resolvedReports = filteredIssues.filter(i => i.currentStatus === 'resolved').length;
  
  const statCards = [
    { title: 'Total Reports', value: totalReports, color: 'text-gray-800', id: 'total-reports' },
    { title: 'Pending Approval', value: pendingReports, color: 'text-orange-500', id: 'pending-reports' },
    { title: 'In Progress', value: progressReports, color: 'text-blue-500', id: 'progress-reports' },
    { title: 'Resolved', value: resolvedReports, color: 'text-green-500', id: 'resolved-reports' },
  ];

  const handleViewDetails = (issue) => {
    setSelectedIssue(issue);
    setModalOpen(true);
  };

  return (
    <>
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {statCards.map((card) => (
          <div key={card.title} className="bg-white p-5 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">{card.title}</h3>
            <p id={card.id} className={`text-3xl font-bold ${card.color}`}>{card.value}</p>
          </div>
        ))}
      </div>

      {/* Issues Table */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Recent Issues</h2>
            
            {/* Filter Dropdown UI */}
            <div className="flex items-center space-x-2">
                <label htmlFor="category-filter" className="text-sm font-medium text-gray-700">Filter by Category:</label>
                <select 
                    id="category-filter"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                >
                    {CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>
        </div>
        
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
              {/* Conditional rendering: Map rows if issues exist, show message otherwise */}
              {filteredIssues.length > 0 ? (
                filteredIssues.map((issue) => (
                <tr key={issue.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{issue.id}</td>
                  <td className="px-6 py-4">{issue.category}</td>
                  <td className="px-6 py-4">{issue.location.join(', ')}</td> {/* Display coords for now */}
                  <td className="px-6 py-4">{issue.reportedOn}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full ${getStatusColor(issue.currentStatus)} capitalize`}>
                      {issue.currentStatus.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => handleViewDetails(issue)}
                      className="px-3 py-1 text-xs font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition duration-150"
                    >
                      Manage
                    </button>
                  </td>
                </tr>
                ))
              ) : (
                <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                        No issues found for the selected filter. 🧘
                    </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Issue Details Modal */}
      {selectedIssue && (
        <IssueDetailsModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          issue={selectedIssue}
          // onSave update function would go here 
        />
      )}
    </>
  );
}

export default Dashboard;