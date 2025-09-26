// src/pages/MapView.jsx
import React, { useState, useMemo } from "react"; // <-- useState is needed for the toggle!
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icon issues for React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// --- UTILITY FUNCTIONS FOR MARKER IMPROVEMENT ---

/**
 * Returns a hex color code based on the issue's severity.
 */
const getSeverityColorHex = (severity) => {
    switch (severity) {
        case "Low":
            return "#22c55e"; // Green
        case "Medium":
            return "#facc15"; // Yellow
        case "High":
            return "#dc2626"; // Medium Red
        case "Urgent":
            return "#991b1b"; // Dark Red
        default:
            return "#6b7280"; // Gray
    }
};

/**
 * Creates a custom SVG pin icon with a color determined by the severity.
 */
const createSeverityIcon = (severity) => {
    const color = getSeverityColorHex(severity);
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="${color}" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-map-pin">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
            <circle cx="12" cy="9" r="3"/>
        </svg>
    `;
    return L.divIcon({
        className: "custom-div-icon",
        html: svg,
        iconSize: [24, 24],
        iconAnchor: [12, 24],
        popupAnchor: [0, -20],
    });
};

// --- END UTILITY FUNCTIONS ---

const DEFAULT_CENTER = [23.7788, 86.4382];
const DEFAULT_ZOOM = 14;

function MapView({ issuesData = [] }) {
    // 1. STATE FOR TOGGLE: Controls visibility of resolved markers
    const [showResolved, setShowResolved] = useState(true); 

    // 2. FILTERED ISSUES: Uses useMemo to filter the data array
    const visibleIssues = useMemo(() => {
        if (showResolved) {
            return issuesData;
        } else {
            return issuesData.filter(issue => issue.currentStatus !== 'resolved');
        }
    }, [issuesData, showResolved]);


    const mapCenter = useMemo(() => {
        // Use the first visible issue's location if available, otherwise use default
        const firstVisibleLocation = visibleIssues.length > 0 ? visibleIssues[0].location : DEFAULT_CENTER;
        return issuesData.length > 0 ? firstVisibleLocation : DEFAULT_CENTER;
    }, [issuesData, visibleIssues]);


    return (
        <div className="bg-white p-6 rounded-lg shadow h-[80vh] w-full flex flex-col">
            
            {/* Header and Toggle UI */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Live Issue Map</h2>
                
                {/* 3. TOGGLE CHECKBOX UI */}
                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        id="show-resolved-toggle"
                        checked={showResolved}
                        onChange={() => setShowResolved(!showResolved)}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="show-resolved-toggle" className="text-sm text-gray-700 font-medium">
                        Show Resolved Issues
                    </label>
                </div>
            </div>
            
            {/* Map wrapper with padding and overflow for clean borders */}
            <div className="flex-1 w-full overflow-hidden rounded-lg p-3 border border-gray-200">
                <MapContainer
                    center={mapCenter}
                    zoom={DEFAULT_ZOOM}
                    scrollWheelZoom={true}
                    className="h-full w-full"
                >
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {/* 4. USE THE FILTERED ARRAY */}
                    {visibleIssues.map((issue) => (
                        <Marker 
                            key={issue.id} 
                            position={issue.location} 
                            icon={createSeverityIcon(issue.severity)}
                        >
                            <Popup>
                                <div className="font-sans text-xs">
                                    <strong className="block text-sm text-gray-900">
                                        {issue.title} (#{issue.id})
                                    </strong>
                                    <p className="my-1">
                                        <span className="font-semibold">Category:</span> {issue.category}
                                    </p>
                                    <p>
                                        <span className="font-semibold">Severity:</span> {issue.severity}
                                    </p>
                                    <p className="italic text-gray-500 mt-2">
                                        Reported {issue.reportedOn}
                                    </p>
                                    <p className={`font-bold capitalize mt-1 text-blue-600`}>
                                        Status: {issue.currentStatus.replace("-", " ")}
                                    </p>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    );
}

export default MapView;