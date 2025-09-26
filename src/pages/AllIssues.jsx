// src/pages/AllIssues.jsx
import React, { useState, useMemo } from 'react';
import IssueDetailsModal from '../components/IssueDetailsModal';

// --- UTILITIES ---

// Utility to get status color for table pills
const getStatusColor = (status) => {
    switch (status) {
        case 'pending': return 'text-orange-800 bg-orange-200 rounded-full';
        case 'in-progress': return 'text-blue-800 bg-blue-200 rounded-full';
        case 'resolved': return 'text-green-800 bg-green-200 rounded-full';
        default: return 'text-gray-500 bg-gray-100 rounded-full';
    }
};

// NEW: Utility to get severity color for table pills (matches map logic)
const getSeverityColor = (severity) => {
    switch (severity) {
        case 'Low':
            return 'bg-green-100 text-green-800';
        case 'Medium':
            return 'bg-yellow-100 text-yellow-800';
        case 'High':
            return 'bg-red-100 text-red-800';
        case 'Urgent':
            // Changed to a darker red for a more distinct visual
            return 'bg-red-700 text-white'; 
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

const STATUS_FILTERS = ['All Statuses', 'pending', 'in-progress', 'resolved'];
const SEVERITY_FILTERS = ['All Severity', 'Low', 'Medium', 'High', 'Urgent']; 

// --- END UTILITIES ---

function AllIssues({ issuesData = [] }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All Statuses');
    const [severityFilter, setSeverityFilter] = useState('All Severity');
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedIssue, setSelectedIssue] = useState(null);
    
    const filteredIssues = useMemo(() => {
        let currentIssues = issuesData;
        
        if (statusFilter !== 'All Statuses') {
            currentIssues = currentIssues.filter(issue => issue.currentStatus === statusFilter);
        }

        if (severityFilter !== 'All Severity') {
            currentIssues = currentIssues.filter(issue => issue.severity && issue.severity === severityFilter);
        }

        if (searchTerm) {
            const lowerSearch = searchTerm.toLowerCase();
            currentIssues = currentIssues.filter(issue => 
                issue.title.toLowerCase().includes(lowerSearch) ||
                issue.id.includes(lowerSearch)
            );
        }

        return currentIssues;
    }, [issuesData, statusFilter, severityFilter, searchTerm]);

    const handleViewDetails = (issue) => {
        setSelectedIssue(issue);
        setModalOpen(true);
    };

    return (
        <>
            <div className="p-6 bg-white rounded-lg shadow">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
                    Master Report Database ({filteredIssues.length} results)
                </h2>

                {/* --- FILTERS AND SEARCH BAR --- */}
                <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg border">
                    
                    <div className="flex-1 min-w-[200px]">
                        <input 
                            type="text" 
                            placeholder="Search by Title or Issue ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="status-filter" className="sr-only">Filter by Status</label>
                        <select
                            id="status-filter"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="p-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                        >
                            {STATUS_FILTERS.map(status => (
                                <option key={status} value={status}>
                                    {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="severity-filter" className="sr-only">Filter by Severity</label>
                        <select
                            id="severity-filter"
                            value={severityFilter}
                            onChange={(e) => setSeverityFilter(e.target.value)}
                            className="p-2 border border-gray-300 rounded-md text-sm focus:ring-red-500 focus:border-red-500"
                        >
                            {SEVERITY_FILTERS.map(severity => (
                                <option key={severity} value={severity}>{severity}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* --- ISSUES TABLE --- */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                            <tr>
                                <th scope="col" className="px-6 py-3">Issue ID</th>
                                <th scope="col" className="px-6 py-3">Category</th>
                                <th scope="col" className="px-6 py-3">Severity</th>
                                <th scope="col" className="px-6 py-3">Reported On</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                                <th scope="col" className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody id="issues-table-body">
                            {filteredIssues.length > 0 ? (
                                filteredIssues.map((issue) => (
                                    <tr key={issue.id} className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-900">{issue.id}</td>
                                        <td className="px-6 py-4">{issue.category}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full ${getSeverityColor(issue.severity)}`}>
                                                {issue.severity || 'N/A'}
                                            </span>
                                        </td>
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
                                                View/Manage
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-8 text-center text-xl text-gray-500 italic">
                                        No reports match the current filters. Check your search terms or try "All Statuses." 🧐
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {selectedIssue && (
                <IssueDetailsModal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    issue={selectedIssue}
                />
            )}
        </>
    );
}

export default AllIssues;