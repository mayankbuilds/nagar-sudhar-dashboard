// src/data/dummyIssues.js (Create this new file for cleanliness!)

const DUMMY_ISSUES = [
  {
    id: '1',
    title: 'Large Pothole on Main Str.',
    description: 'Huge pothole causing traffic jam and damage to bikes.',
    // In a real app, these are paths to images hosted on Vercel/S3
    imageUrl: 'https://placehold.co/400x200/ef4444/FFFFFF?text=POTHOLE', 
    // Location is an array [latitude, longitude] for Leaflet/React
    location: [23.7788, 86.4382], 
    reportedOn: '12 hours ago',
    currentStatus: 'in-progress', // Use lowercase, hyphenated for standard state
    upvotes: 5,
    downvotes: 1,
    category: 'Roads & Pavements' // Add category for filtering (key requirement)
  },
  {
    id: '2',
    title: 'Sewer Leakage',
    description: 'Major leakage near the bus stop causing a bad smell.',
    imageUrl: 'https://placehold.co/400x200/535456/FFFFFF?text=SEWER+LEAK',
    location: [23.7795, 86.4395],
    reportedOn: '12 hours ago',
    currentStatus: 'pending',
    upvotes: 2,
    downvotes: 0,
    category: 'Sanitation'
  },
  {
    id: '3',
    title: 'Streetlight Not Working',
    description: 'Streetlight out, making the area unsafe at night.',
    imageUrl: 'https://placehold.co/400x200/3b82f6/FFFFFF?text=LIGHT+OUT',
    location: [23.7770, 86.4410],
    reportedOn: '12 hours ago',
    currentStatus: 'resolved',
    upvotes: 10,
    downvotes: 0,
    category: 'Public Lighting'
  },
  // Add more data to show variation, like a 'priority' issue
  {
    id: '4',
    title: 'Illegal Garbage Dumping',
    description: 'Large pile of garbage dumped next to school boundary wall.',
    imageUrl: 'https://placehold.co/400x200/10b981/FFFFFF?text=GARBAGE',
    location: [23.7790, 86.4370],
    reportedOn: '8 hours ago',
    currentStatus: 'pending',
    upvotes: 15,
    downvotes: 2,
    category: 'Waste Management'
  },
];

export default DUMMY_ISSUES;