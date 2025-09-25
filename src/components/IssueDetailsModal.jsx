// src/components/IssueDetailsModal.jsx
import React, { useState, useEffect } from 'react';

function IssueDetailsModal({ isOpen, onClose, issue, onSave }) {
    // Local state to manage changes before saving
    const [currentStatus, setCurrentStatus] = useState(issue?.status || 'pending');
    const [afterImagePreview, setAfterImagePreview] = useState(null);
    const [afterImageFile, setAfterImageFile] = useState(null);

    // Sync local state with prop when a new issue is selected
    useEffect(() => {
        if (issue) {
            setCurrentStatus(issue.status);
            setAfterImagePreview(null); // Clear previous image
            setAfterImageFile(null);
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
        if (afterImageFile) {
            console.log("New After Image uploaded:", afterImageFile.name);
            // In a real app: upload the file, get the URL, then call onSave
        }
        
        // Mocking the update call
        // onSave({ ...issue, status: currentStatus, afterImage: afterImageUrl }); 
        
        alert(`Changes for Issue #${issue.id} updated to: ${currentStatus} (Image upload simulated)`);
        onClose(); // Close after saving
    };

    return (
        // Modal Backdrop
        <div id="issue-modal" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 modal">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
                    <h2 className="text-2xl font-bold text-gray-800">Issue Details: #<span id="modal-issue-id">{issue.id}</span></h2>
                    <button onClick={onClose} id="close-modal-btn" className="text-3xl text-gray-500 hover:text-gray-800 leading-none">&times;</button>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left side */}
                        <div>
                            <h3 className="font-bold text-lg mb-2">Citizen Report</h3>
                            <p><strong>Category:</strong> <span id="modal-category">{issue.category}</span></p>
                            <p><strong>Location:</strong> <span id="modal-location">{issue.location}</span></p>
                            <p className="mt-2"><strong>Description:</strong> <span id="modal-description" className="text-gray-600 italic">{issue.description}</span></p>
                            <h4 className="font-semibold mt-4 mb-2">Before Image</h4>
                            <img id="modal-before-image" src={issue.imageUrl} alt="Before" className="rounded-lg w-full h-48 object-cover"/>
                        </div>
                        {/* Right side */}
                        <div>
                            <h3 className="font-bold text-lg mb-2">Municipality Action</h3>
                            <div className="space-y-4">
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
                                <div>
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