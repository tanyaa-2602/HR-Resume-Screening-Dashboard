# Module Overview — Charts & Analytics

## 1. Purpose
This module turns candidate screening results into visual information that a recruiter can inspect. It supports the HR Resume Screening Dashboard project by displaying match scores, skill-level values, and group-level summaries.

## 2. Objectives
- Present candidate results in a clear dashboard.
- Visualize the relative score of candidates.
- Show how candidate scores are distributed across score bands.
- Summarize average skill match values and job-role averages.
- Allow recruiters to filter and inspect candidate records.
- Support CSV export of the currently filtered results.
- Keep the analytics calculations in utility functions separate from the UI.

## 3. Functional modules
| Module | Responsibility |
|---|---|
| `data/candidates.js` | Supplies fictional demo candidate records. |
| `utils/analytics.js` | Calculates averages, score distribution, skill summaries, role summaries, filtering, and sorting. |
| `hooks/useCandidateAnalytics.js` | Manages filters and exposes derived analytics to React components. |
| `components/KpiCards.jsx` | Displays top-level KPI cards. |
| `components/FilterBar.jsx` | Provides search, job role, status, minimum score, and sort controls. |
| `components/CandidateTable.jsx` | Displays ranking table and comparison selection. |
| `components/CandidateDetailsModal.jsx` | Shows profile information and skill match breakdown. |
| `App.jsx` | Connects the dashboard components and charts. |
| `utils/csvExport.js` | Exports filtered candidate data to a CSV file. |

## 4. Charts
1. Candidate match ranking — compares overall demo scores.
2. Score distribution — counts candidates in score bands.
3. Average skill match — summarizes available skill values.
4. Average score by role — compares average score for each role in the filtered data.
5. Candidate skill profile — radar chart for the selected profile.

## 5. Data flow
Candidate demo data → filter and sort utilities → analytics hook → KPI cards, charts, candidate table, and candidate profile modal.

In team integration, replace the local demo source with candidate records from the scoring/data modules. Keep the candidate object shape stable.

## 6. Limitations
- This is a frontend module and does not contain an API or database.
- Included records and scores are fictional.
- The module does not read PDF/DOCX resumes or infer skills from uploaded files.
- The score bands are for visualization only.
- The application must not be used to make real hiring decisions without validation, privacy safeguards, and human review.
