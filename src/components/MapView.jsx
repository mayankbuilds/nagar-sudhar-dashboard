// src/components/MapView.jsx
import React, { useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default marker icon issues (mandatory for React-Leaflet in many setups)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Utility to get status color for popup text
const getStatusColor = (status) => {
    switch (status) {
        case 'pending': return 'text-orange-600';
        case 'in-progress': return 'text-blue-600';
        case 'resolved': return 'text-green-600';
        default: return 'text-gray-500';
    }
};

// Default center near your dummy data coordinates (Dhanbad area)
const DEFAULT_CENTER = [23.7788, 86.4382]; 
const DEFAULT_ZOOM = 14;

function MapView({ issuesData = [] }) {
    
    // Determine map center based on first issue, or use a default
    const mapCenter = useMemo(() => {
        return issuesData.length > 0 ? issuesData[0].location : DEFAULT_CENTER;
    }, [issuesData]);

    return (
        <div className="bg-white p-6 rounded-lg shadow h-[70vh] w-full"> {/* Increased height for better map view */}
            <h2 className="text-xl font-bold text-gray-800 mb-4">Live Issue Map</h2>
            <MapContainer 
                center={mapCenter} 
                zoom={DEFAULT_ZOOM} 
                scrollWheelZoom={true}
                className="h-full w-full rounded-lg" // Must have a defined height!
            >
                {/* Base map tiles (OpenStreetMap) */}
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                {/* Markers for each issue */}
                {issuesData.map((issue) => (
                    <Marker key={issue.id} position={issue.location}>
                        <Popup>
                            <div className="font-sans">
                                <strong className="block text-base">{issue.title} (#{issue.id})</strong>
                                <p className="text-sm my-1">Category: {issue.category}</p>
                                <p className={`text-sm font-semibold capitalize ${getStatusColor(issue.currentStatus)}`}>
                                    Status: {issue.currentStatus.replace('-', ' ')}
                                </p>
                                <p className="text-xs italic text-gray-500 mt-2">Reported {issue.reportedOn}</p>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}

export default MapView;