// src/services/reportService.js

// DUMMY DATA FOR REPORT VISUALIZATION (Aggregated Stats)
const DUMMY_RESOLUTION_DATA = [
    { name: 'Roads', AvgTime: 48, Target: 24, Overdue: 24 },
    { name: 'Sanitation', AvgTime: 30, Target: 48, Overdue: 0 },
    { name: 'Lighting', AvgTime: 12, Target: 18, Overdue: 0 },
    { name: 'Waste', AvgTime: 72, Target: 72, Overdue: 0 },
];

const DUMMY_TREND_DATA = [
    { name: 'Jan', 'Reports Submitted': 150 },
    { name: 'Feb', 'Reports Submitted': 120 },
    { name: 'Mar', 'Reports Submitted': 180 },
    { name: 'Apr', 'Reports Submitted': 250 },
    { name: 'May', 'Reports Submitted': 210 },
    { name: 'Jun', 'Reports Submitted': 300 },
];

const DUMMY_KPI_DATA = {
    resolutionRate: '85%',
    avgResolveTime: '36 hrs',
    highPriorityBacklog: 12,
    reportsThisMonth: 784
};

// Function to fetch all report data (mimics an API endpoint)
export const fetchReportData = async () => {
    return new Promise(resolve => {
        // Simulating network delay
        setTimeout(() => {
            resolve({
                resolutionData: DUMMY_RESOLUTION_DATA,
                trendData: DUMMY_TREND_DATA,
                kpiData: DUMMY_KPI_DATA,
            });
        }, 400); 
    });
};

// NOTE: When you build your backend, the fetch logic in App.jsx will call this service.
// This service will then make a real API call to your server and return the data.