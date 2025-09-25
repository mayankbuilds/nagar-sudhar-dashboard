// src/components/MapView.jsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'; // Import Leaflet for icon fixes

// Fix default marker icon issues in Webpack/React environments
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});


// Note: Issues must have a 'coords' property: [latitude, longitude]
function MapView({ issues }) {
  // Center map on the first issue or a default city center (e.g., Kolkata)
  const defaultCenter = issues.length > 0 ? issues[0].coords : [22.5726, 88.3639]; 
  const defaultZoom = 13;

  return (
    <div className="h-full w-full rounded-lg overflow-hidden">
        <MapContainer 
            center={defaultCenter} 
            zoom={defaultZoom} 
            scrollWheelZoom={true}
            className="h-full w-full" // Ensure map takes up container space
        >
            {/* Base map tiles */}
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {/* Markers for each issue */}
            {issues.map((issue) => (
                <Marker key={issue.id} position={issue.coords}>
                    <Popup>
                        <strong className="block text-lg">Issue #{issue.id}</strong>
                        <p className="font-semibold">{issue.category}</p>
                        <p>{issue.location}</p>
                        <span className={`text-xs capitalize font-medium rounded-full p-1 ${
                            issue.status === 'resolved' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                        }`}>
                            {issue.status.replace('-', ' ')}
                        </span>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    </div>
  );
}

export default MapView;