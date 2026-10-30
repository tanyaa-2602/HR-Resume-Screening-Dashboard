# HR Resume Screening Dashboard — Charts & Analytics
**College Major Project Module | Owner: Sohit Sharma**

A professional React dashboard for visualizing resume-screening results. This module focuses on the Charts & Analytics responsibility: candidate ranking, skill-level match breakdowns, score distribution, candidate comparison, filters, profile inspection, and CSV export.

## Main features
- Responsive HR dashboard layout with sidebar and KPI cards
- Search and filter candidate records by job role, status, and minimum score
- Sortable candidate ranking table
- Score distribution doughnut chart
- Candidate match ranking bar chart
- Skill match bar chart and radar chart for a selected candidate
- Compare up to three candidates
- Candidate detail modal with skill breakdown
- CSV export for filtered candidate results
- Demo data and transparent, rule-based sample scores
- Modular source structure and documentation

## Requirements
- Node.js 18 or newer
- npm
- A modern browser

## Run locally
```bash
npm install
npm run dev
```
Open the local URL printed by Vite (usually `http://localhost:5173`).

## Production build
```bash
npm run build
npm run preview
```

## Project structure
```text
sohit-hr-resume-analytics-major-project/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── AppHeader.jsx
│   │   ├── CandidateDetailsModal.jsx
│   │   ├── CandidateTable.jsx
│   │   ├── ChartCard.jsx
│   │   ├── FilterBar.jsx
│   │   ├── KpiCards.jsx
│   │   ├── Sidebar.jsx
│   │   └── Toast.jsx
│   ├── data/
│   │   ├── candidates.js
│   │   └── jobRoles.js
│   ├── hooks/
│   │   └── useCandidateAnalytics.js
│   ├── utils/
│   │   ├── analytics.js
│   │   ├── csvExport.js
│   │   └── formatters.js
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
├── docs/
│   ├── MODULE-OVERVIEW.md
│   ├── VIVA-QUESTIONS.md
│   └── TEST-PLAN.md
├── index.html
├── package.json
└── vite.config.js
```

## Data and scoring disclaimer
All included candidates are fictional demo records. Scores are illustrative and are supplied as sample screening results for analytics demonstration. This frontend module does not parse actual uploaded resumes, call an AI model, or make hiring decisions. In a full team application, connect it to the scoring module and candidate dataset using a shared data contract.

## Integration data contract
Each candidate should contain:
- `id`, `name`, `email`, `role`, `experienceYears`
- `skills`: array of `{ name, match }` where match is 0–100
- `score`: overall sample match score from 0–100
- `status`: `Shortlisted`, `Review`, or `Not Matched`
- `appliedDate`, `education`, `location`, `summary`

The analytics utilities are intentionally kept separate from UI components so they can later consume props or API results.
