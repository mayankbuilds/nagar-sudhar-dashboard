// src/components/IssueDetailsModal.jsx
import React, { useState, useEffect } from 'react';

// Utility to match the mobile app's status color logic
const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
        case 'pending':
            return 'bg-red-100 text-red-600';
        case 'in-progress':
            return 'bg-orange-100 text-orange-600';
        case 'resolved':
            return 'bg-green-100 text-green-600';
        default:
            return 'bg-gray-100 text-gray-600';
    }
};

// Utility to get severity color (matches your All Issues and MapView logic)
const getSeverityColor = (severity) => {
    switch (severity) {
        case 'Low':
            return 'bg-green-100 text-green-800';
        case 'Medium':
            return 'bg-yellow-100 text-yellow-800';
        case 'High':
            return 'bg-red-100 text-red-800';
        case 'Urgent':
            return 'bg-red-700 text-white'; // Dark red for max urgency
        default:
            return 'bg-gray-100 text-gray-800';
    }
};


function IssueDetailsModal({ isOpen, onClose, issue, onSave }) {
    const [currentStatus, setCurrentStatus] = useState(issue?.currentStatus || 'pending');
    const [afterImagePreview, setAfterImagePreview] = useState(null);
    const [afterImageFile, setAfterImageFile] = useState(null);
    const [resolutionNotes, setResolutionNotes] = useState(''); // NEW STATE for notes

    useEffect(() => {
        if (issue) {
            setCurrentStatus(issue.currentStatus);
            setAfterImagePreview(null);
            setAfterImageFile(null);
            setResolutionNotes(''); // Reset notes when a new issue loads
        }
    }, [issue]);

    if (!isOpen || !issue) return null;

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAfterImageFile(file);
            setAfterImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSaveChanges = () => {
        console.log(`Saving changes for Issue #${issue.id}: Status: ${currentStatus}`);
        console.log(`Resolution Notes: ${resolutionNotes}`);
        
        // You would add validation here: if status is 'resolved', notes must be present
        
        alert(`Status for Issue #${issue.id} updated to: ${currentStatus}`);
        onClose(); // Close after saving
    };
    
    // Convert location array to a readable string
    const locationString = Array.isArray(issue.location) 
        ? `${issue.location[0].toFixed(4)}, ${issue.location[1].toFixed(4)}` 
        : 'N/A';

    return (
        <div id="issue-modal" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 modal">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
                    <h2 className="text-2xl font-bold text-gray-800">{issue.title} #<span id="modal-issue-id">{issue.id}</span></h2>
                    <button onClick={onClose} id="close-modal-btn" className="text-3xl text-gray-500 hover:text-gray-800 leading-none">&times;</button>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left side: Citizen Report Details */}
                        <div>
                            <h3 className="font-bold text-lg mb-4 text-blue-600">Citizen Report Details</h3>
                            <div className="space-y-3 text-sm">
                                <p><strong>Category:</strong> <span id="modal-category" className="font-medium">{issue.category}</span></p>
                                
                                {/* Severity Display - CRITICAL FOR TRIAGE */}
                                <p>
                                    <strong>Severity:</strong> 
                                    <span className={`font-bold ml-1 px-2 py-0.5 rounded ${getSeverityColor(issue.severity)}`}>
                                        {issue.severity || 'N/A'}
                                    </span>
                                </p>
                                
                                <p><strong>Location (Lat, Lon):</strong> <span id="modal-location" className="font-mono text-xs">{locationString}</span></p>
                                <p><strong>Reported On:</strong> <span className="text-gray-600">{issue.reportedOn}</span></p>
                            </div>
                            
                            <h4 className="font-semibold mt-6 mb-2">Report Statement</h4>
                            <p id="modal-description" className="text-gray-700 italic border-l-4 border-gray-200 pl-3">
                                {issue.description}
                            </p>

                            <h4 className="font-semibold mt-6 mb-2">Before Image</h4>
                            <img id="modal-before-image" src={issue.imageUrl} alt="Before" className="rounded-lg w-full h-48 object-cover"/>
                        </div>
                        
                        {/* Right side: Municipality Action */}
                        <div>
                            <h3 className="font-bold text-lg mb-4 text-gray-800">Municipality Action</h3>
                            <div className="space-y-4">
                                {/* Current Status Display */}
                                <div className="p-3 rounded-lg flex justify-between items-center text-lg font-bold border-2 border-dashed border-gray-300">
                                    Current Status: 
                                    <span className={`px-3 py-1 text-sm font-bold rounded-full capitalize ${getStatusColor(issue.currentStatus)}`}>
                                        {issue.currentStatus.replace('-', ' ')}
                                    </span>
                                </div>
                                {/* Status Update Control */}
                                <div>
                                    <label htmlFor="status-update" className="block text-sm font-medium text-gray-700">Update Status</label>
                                    <select 
                                        id="status-update" 
                                        value={currentStatus}
                                        onChange={(e) => setCurrentStatus(e.target.value)}
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="in-progress">In Progress</option>
                                        <option value="resolved">Resolved</option>
                                    </select>
                                </div>
                                
                                {/* NEW: Resolution Notes Area */}
                                <div>
                                    <label htmlFor="resolution-notes" className="block text-sm font-medium text-gray-700">Resolution Notes (Required for 'Resolved')</label>
                                    <textarea
                                        id="resolution-notes"
                                        rows="3"
                                        value={issue.resolutionNotes || ''} // Use existing notes if available
                                        placeholder="Describe the action taken and date resolved..."
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    ></textarea>
                                </div>
                                {/* END NEW SECTION */}
                                
                                <h4 className="font-semibold mb-2">After Image (Upload when resolved)</h4>
                                <div id="after-image-container" className="w-full h-48 bg-gray-100 rounded-lg border-2 border-dashed flex items-center justify-center relative">
                                    {(afterImagePreview || issue.afterImage) ? (
                                        <img 
                                            id="modal-after-image" 
                                            src={afterImagePreview || issue.afterImage} 
                                            alt="After" 
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                    ) : (
                                        <label htmlFor="after-image-upload" id="after-image-label" className="cursor-pointer text-center text-gray-500">
                                            <svg className="mx-auto h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                                            Upload Photo
                                        </label>
                                    )}
                                    <input type="file" id="after-image-upload" className="hidden" accept="image/*" onChange={handleImageChange} />
                                </div>
                                <button 
                                    id="save-changes-btn" 
                                    onClick={handleSaveChanges}
                                    className="w-full py-2 px-4 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition duration-150"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default IssueDetailsModal;