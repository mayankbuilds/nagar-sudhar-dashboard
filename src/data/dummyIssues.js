// src/data/dummyIssues.js (Updated to match mobile app data points)

const DUMMY_ISSUES = [
  {
    id: '1',
    title: 'Large Pothole on Main Str.',
    description: 'Huge pothole causing traffic jam and damage to bikes.',
    imageUrl: 'https://images.timesnownews.com/thumb/msid-152878542,thumbsize-2072535,width-1280,height-720,resizemode-75/152878542.jpg',
    location: [23.7788, 86.4382],
    reportedOn: '12 hours ago',
    currentStatus: 'in-progress',
    category: 'Pothole', // <-- Using the new Issue Type
    severity: 'High',    // <-- NEW FIELD!
  },
  {
    id: '2',
    title: 'Sewer Leakage',
    description: 'Major leakage near the bus stop causing a bad smell.',
    imageUrl: 'https://alamoplumbingsolutions.com/wp-content/uploads/2019/03/Sewer-Leak.jpg',
    location: [23.7795, 86.4395],
    reportedOn: '12 hours ago',
    currentStatus: 'pending',
    category: 'Water Leak', // <-- Using the new Issue Type
    severity: 'Urgent',    // <-- NEW FIELD! (High priority)
  },
  // ... (Update all other existing issues similarly)
  {
    id: '4',
    title: 'Illegal Garbage Dumping',
    description: 'Large pile of garbage dumped next to school boundary wall.',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQolvpqCCshPaM6gzJln0Ueln-CCMz7CeJoeA&s',
    location: [23.7790, 86.4370],
    reportedOn: '8 hours ago',
    currentStatus: 'pending',
    category: 'Illegal Dumping',
    severity: 'Medium',
  },
];

export default DUMMY_ISSUES;