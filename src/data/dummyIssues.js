// src/data/dummyIssues.js (Streamlined for Admin Dashboard focus)

const DUMMY_ISSUES = [
  {
    id: '1',
    title: 'Large Pothole on Main Str.',
    description: 'Huge pothole causing traffic jam and damage to bikes.',
    imageUrl: 'https://placehold.co/400x200/ef4444/FFFFFF?text=POTHOLE', 
    location: [23.7788, 86.4382], 
    reportedOn: '12 hours ago',
    currentStatus: 'in-progress', 
    category: 'Roads & Pavements' 
  },
  {
    id: '2',
    title: 'Sewer Leakage',
    description: 'Major leakage near the bus stop causing a bad smell.',
    imageUrl: 'https://placehold.co/400x200/535456/FFFFFF?text=SEWER+LEAK',
    location: [23.7795, 86.4395],
    reportedOn: '12 hours ago',
    currentStatus: 'pending',
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
    category: 'Public Lighting'
  },
  {
    id: '4',
    title: 'Illegal Garbage Dumping',
    description: 'Large pile of garbage dumped next to school boundary wall.',
    imageUrl: 'https://placehold.co/400x200/10b981/FFFFFF?text=GARBAGE',
    location: [23.7790, 86.4370],
    reportedOn: '8 hours ago',
    currentStatus: 'pending',
    category: 'Waste Management'
  },
];

export default DUMMY_ISSUES;