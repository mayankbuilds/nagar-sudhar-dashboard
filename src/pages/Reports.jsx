// src/components/Reports.jsx
import React from 'react';
import { 
    BarChart, Bar, LineChart, Line, 
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
    ResponsiveContainer 
} from 'recharts';

// NOTE: The data definition and fetching is handled in src/services/reportService.js
// We now explicitly receive the data from App.jsx via the reportData prop.

// Set up fallback data structure for safe rendering (if props are empty)
const DEFAULT_REPORT_DATA = {
    resolutionData: [],
    trendData: [],
    kpiData: {
        resolutionRate: 'N/A',
        avgResolveTime: 'N/A',
        highPriorityBacklog: 'N/A',
        reportsThisMonth: 'N/A'
    }
};

// ⬅️ FIX: Officially accept the reportData prop with a default value
function Reports({ reportData = DEFAULT_REPORT_DATA }) {
    
    // Safely destructure properties from the prop
    const { 
        resolutionData = [], 
        trendData = [], 
        kpiData = {} 
    } = reportData;
    
    // Safely pull KPI values
    const { 
        resolutionRate = 'N/A', 
        avgResolveTime = 'N/A', 
        highPriorityBacklog = 'N/A', 
        reportsThisMonth = 'N/A' 
    } = kpiData; 

    return (
        <div className="p-6 bg-gray-100 min-h-[85vh]">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-6 border-b pb-2">
                Analytics and Performance Reports
            </h2>
            
            {/* 1. KEY PERFORMANCE INDICATORS (KPIs) */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {/* Resolution Rate */}
                <div className="bg-white p-5 rounded-lg shadow-lg border-l-4 border-green-500">
                    <p className="text-sm font-medium text-gray-500">Resolution Rate</p>
                    <p className="text-4xl font-bold text-green-600">{resolutionRate}</p>
                    <p className="text-xs text-gray-400 mt-1">Goal: 90%</p>
                </div>

                {/* Avg Resolution Time (Total) */}
                <div className="bg-white p-5 rounded-lg shadow-lg border-l-4 border-blue-500">
                    <p className="text-sm font-medium text-gray-500">Avg. Time to Resolve</p>
                    <p className="text-4xl font-bold text-blue-600">{avgResolveTime}</p>
                    <p className="text-xs text-gray-400 mt-1">Last Quarter: 42 hrs</p>
                </div>

                {/* High Priority Backlog */}
                <div className="bg-white p-5 rounded-lg shadow-lg border-l-4 border-red-500">
                    <p className="text-sm font-medium text-gray-500">High Priority Backlog</p>
                    <p className="text-4xl font-bold text-red-600">{highPriorityBacklog}</p>
                    <p className="text-xs text-gray-400 mt-1">Immediate Action Required</p>
                </div>
                
                {/* Total Reports Month */}
                <div className="bg-white p-5 rounded-lg shadow-lg border-l-4 border-purple-500">
                    <p className="text-sm font-medium text-gray-500">Reports This Month</p>
                    <p className="text-4xl font-bold text-purple-600">{reportsThisMonth}</p>
                    <p className="text-xs text-gray-400 mt-1">+15% from last month</p>
                </div>
            </div>

            {/* 2. CHARTS SECTION */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                
                {/* Chart 1: Departmental Performance - Bar Chart */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">
                        Departmental Resolution Time (Hours)
                    </h3>
                    <div className="h-72 w-full"> 
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={resolutionData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis dataKey="name" stroke="#6b7280" />
                                <YAxis stroke="#6b7280" unit="hrs" />
                                <Tooltip cursor={{ fill: 'rgba(200, 200, 200, 0.2)' }} />
                                <Legend />
                                <Bar dataKey="AvgTime" fill="#3b82f6" name="Actual Avg. Time" /> 
                                <Bar dataKey="Target" fill="#d1d5db" name="SLA Target Time" /> 
                                <Bar dataKey="Overdue" fill="#ef4444" name="Overdue Time" /> 
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Chart 2: Reporting Trends Over Time - Line Chart */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">
                        Monthly Report Volume Trend
                    </h3>
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={trendData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis dataKey="name" stroke="#6b7280" />
                                <YAxis stroke="#6b7280" />
                                <Tooltip />
                                <Legend />
                                <Line 
                                    type="monotone" 
                                    dataKey="Reports Submitted" 
                                    stroke="#8b5cf6" 
                                    strokeWidth={2} 
                                    dot={{ fill: '#8b5cf6' }} 
                                    activeDot={{ r: 8 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
            
            {/* 3. Detailed Data Table */}
            <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">
                    Resolution Time vs. Target (Table View)
                </h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg. Time (Hours)</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SLA Target (Hours)</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {resolutionData.map((data) => (
                                <tr key={data.name}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{data.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.AvgTime} hrs</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.Target} hrs</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            data.AvgTime <= data.Target ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                        }`}>
                                            {data.AvgTime <= data.Target ? 'On Target' : 'Behind Schedule'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Reports;