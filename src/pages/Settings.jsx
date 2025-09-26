// src/pages/Settings.jsx
import React from 'react';

// Dummy data to show how a routing rule would look
const DUMMY_ROUTING_RULES = [
    { issueType: 'Pothole', department: 'Roads & Pavements', slaTarget: 24, status: 'Active' },
    { issueType: 'Broken Streetlight', department: 'Public Lighting', slaTarget: 48, status: 'Active' },
    { issueType: 'Water Leak', department: 'Sanitation', slaTarget: 72, status: 'Active' },
    { issueType: 'Illegal Dumping', department: 'Sanitation', slaTarget: 48, status: 'Active' },
    { issueType: 'Litter/Garbage', department: 'Sanitation', slaTarget: 24, status: 'Active' },
];

// Utility to get status color
const getRuleStatusColor = (status) => {
    return status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
};

function Settings() {
    return (
        <div className="p-6 bg-gray-100 min-h-[85vh]">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-6 border-b pb-2">
                System Settings
            </h2>
            
            {/* --- Severity Escalation Policy (NEW CRITICAL SECTION) --- */}
            <div className="bg-red-50 border-2 border-red-300 p-6 rounded-lg shadow mb-8">
                <h3 className="text-xl font-semibold mb-4 text-red-800 flex items-center">
                    Escalation Policy & Alerts
                </h3>
                <p className="text-red-700 mb-4 text-sm">
                    Configure the platform's automatic response to high-urgency issues.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-3 rounded border">
                        <span className="font-bold text-lg text-yellow-600">Medium Severity:</span>
                        <p className="text-xs mt-1">SLA Target only.</p>
                    </div>
                    <div className="bg-white p-3 rounded border">
                        <span className="font-bold text-lg text-red-600">High Severity:</span>
                        <p className="text-xs mt-1">SLA Target + Email alert to Supervisor.</p>
                    </div>
                    <div className="bg-white p-3 rounded border">
                        <span className="font-bold text-lg text-red-900">Urgent Severity:</span>
                        <p className="text-xs mt-1">SLA Target + SMS/Call alert to Department Head.</p>
                    </div>
                </div>
            </div>

            {/* User Management Section */}
            <div className="bg-white p-6 rounded-lg shadow mb-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">User Management</h3>
                <p className="text-gray-600 mb-4">
                    Manage municipal staff accounts, assign roles, and grant permissions.
                </p>
                <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg border">
                    <span className="text-gray-800">Admin Accounts: 3</span>
                    <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                        Add New User
                    </button>
                </div>
            </div>

            {/* Departmental Routing Rules Section */}
            <div className="bg-white p-6 rounded-lg shadow mb-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Automated Routing & SLA Rules</h3>
                <p className="text-gray-600 mb-4">
                    Configure which issue types are automatically assigned to which department.
                </p>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue Type</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned Department</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SLA Target (Hours)</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {DUMMY_ROUTING_RULES.map((rule) => (
                                <tr key={rule.issueType}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{rule.issueType}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rule.department}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rule.slaTarget} hrs</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRuleStatusColor(rule.status)}`}>
                                            {rule.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            
            {/* Integration & API Section (Optional but good for a tech-focused project) */}
            <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Platform Integrations</h3>
                <p className="text-gray-600 mb-4">
                    Manage API keys and connect to external services like a notification gateway or GIS data providers.
                </p>
                <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg border">
                    <span className="text-gray-800">API Key Status: <span className="text-green-600 font-semibold">Active</span></span>
                    <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                        Generate New API Key
                    </button>
                </div>
            </div>

        </div>
    );
}

export default Settings;