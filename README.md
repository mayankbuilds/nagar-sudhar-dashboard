# Nagar Sudhar — Admin Dashboard

A web-based municipal administration dashboard for managing crowdsourced civic issues. Developed as a college project for **Smart India Hackathon (SIH) 2025** under Problem Statement **SIH25031** (*Clean & Green Technology*).

The dashboard serves as the administrative interface for the Nagar Sudhar ecosystem, allowing municipal authorities to review geotagged citizen reports, manage resolution workflows, and track departmental performance metrics.

> **Note:** The current prototype implementation uses mock civic issue datasets and simulated asynchronous service responses to demonstrate municipal triage and reporting workflows.

---

## Key Features

- **Interactive Geospatial Map:** Visualizes geotagged civic reports on OpenStreetMap via Leaflet, featuring custom color-coded pins based on severity (Low, Medium, High, Urgent) and a toggle to filter out resolved issues.
- **Executive Overview & KPI Cards:** Summary counters tracking total, pending, in-progress, and resolved reports, with instant category-based filtering (Potholes, Sanitation, Water Leaks, etc.).
- **Master Issue Directory:** Searchable and filterable issue database supporting client-side text search (by ID or title), status filters, and severity level filters.
- **Incident Triage & Resolution Modal:** Detailed ticket view displaying citizen statements, coordinates, and "Before" images, with controls to update ticket status, attach resolution notes, and preview "After" verification photos.
- **Departmental Analytics & SLA Reports:** Visual performance charts powered by Recharts illustrating average resolution times against SLA targets and monthly report volume trends, based on demo data rather than live municipal feeds.
- **System & Routing Rules:** Static reference views demonstrating municipal routing policies, departmental SLA targets, and severity escalation tiers.

---

## Tech Stack

| Category | Technologies |
| :--- | :--- |
| **Frontend Framework** | React 18, Vite |
| **Styling** | Tailwind CSS, PostCSS |
| **Maps & GIS** | Leaflet, React-Leaflet, OpenStreetMap |
| **Data Visualization** | Recharts |
| **Code Quality** | ESLint |

---

## Project Structure

```text
nagar-sudhar-dashboard/
├── src/
│   ├── assets/          # Static branding assets
│   ├── components/      # Shared UI (Sidebar, IssueDetailsModal)
│   ├── data/            # Mock civic issue datasets
│   ├── pages/           # Application views (Dashboard, MapView, AllIssues, Reports, Settings)
│   ├── services/        # Asynchronous API service layer
│   ├── App.jsx          # Root component and view routing state
│   ├── index.css        # Tailwind directives and base styles
│   └── main.jsx         # Application entry point
├── package.json
└── vite.config.js
```

---

## Getting Started

### Prerequisites

- **Node.js** `v18.0.0` or higher
- **npm** `v9.0.0` or higher

### Installation & Run

1. Clone the repository:
   ```bash
   git clone https://github.com/mayankbuilds/nagar-sudhar-dashboard.git
   cd nagar-sudhar-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

### Available Scripts

- `npm run dev` — Starts the local Vite development server with HMR.
- `npm run build` — Bundles production-ready assets into the `dist/` directory.
- `npm run preview` — Serves the production build locally.
- `npm run lint` — Runs ESLint across all JavaScript/JSX files.

---

## Related Project

- **Citizen Application:** [mayankbuilds/Nagar-Sudhar](https://github.com/mayankbuilds/Nagar-Sudhar) — The citizen-facing application for reporting local civic issues and tracking resolution progress.

---

## Author

- **Mayank Kumar** — [GitHub Profile](https://github.com/mayankbuilds)
