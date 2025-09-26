// src/services/issueService.js
import DUMMY_ISSUES from '../data/dummyIssues';

// --- API Emulation Layer ---

// Function 1: Fetch all issues (Read)
export const fetchAllIssues = async () => {
    // In PROTOTYPE mode, return the static data instantly
    return new Promise(resolve => {
        // Simulate a network delay (makes the transition to real API smoother)
        setTimeout(() => {
            resolve(DUMMY_ISSUES);
        }, 300); 
    });
};

// Function 2: Update an issue's status (Write)
export const updateIssueStatus = async (issueId, newStatus, afterImageFile) => {
    console.log(`[Mock API] Updating Issue #${issueId} to status: ${newStatus}`);
    
    // In PRODUCTION, this is where you'd use fetch or Axios:
    /* const response = await fetch('/api/issues/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: issueId, status: newStatus })
    });
    return response.json();
    */

    // In PROTOTYPE mode, simulate a successful response
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({ 
                success: true, 
                message: `Issue ${issueId} updated successfully (Mock)` 
            });
        }, 500);
    });
};

// Add more functions here later: fetchIssueAnalytics, fetchDepartments, etc.