# Viva Preparation — Charts & Analytics

## 1. What is your role?
My role is Charts & Analytics. I develop visual summaries for candidate scores, skill-level match values, score distribution, and job-role comparisons. I also connect the visual components to filtered candidate data.

## 2. Why did you use React?
React lets us create reusable UI components and update the screen when filter or selection state changes.

## 3. Why Chart.js?
Chart.js supports common visualizations such as bar, doughnut, and radar charts and integrates with React through `react-chartjs-2`.

## 4. What is a KPI?
A Key Performance Indicator is a summarized metric. In this dashboard, examples include visible candidate count, average score, shortlisted count, and highest score.

## 5. What is score distribution?
It groups candidates into score bands so the user can understand how the visible candidate scores are spread.

## 6. Why separate analytics.js from components?
It keeps calculations separate from presentation, improves reuse, and makes the logic easier to test and maintain.

## 7. What does useMemo do here?
It memoizes derived values so filters, sorting, and analytics are recalculated when their dependencies change rather than on every unrelated render.

## 8. How do filters work?
The hook stores filter state. A utility filters candidate records by search text, role, status, and minimum score, then sorts the remaining records.

## 9. What is CSV export?
CSV is a plain-text table format that can be opened in spreadsheet software. The export function converts the current filtered records into rows and triggers a browser download.

## 10. Is this a real AI resume screener?
No. This module uses fictional candidate data and predefined demonstration scores. It does not parse uploaded resumes or call an AI model.

## 11. How will this integrate with teammates' modules?
The team should agree on a stable candidate object shape. The scoring module can provide scores and skill match values, while the data module provides candidate profile fields. This analytics module consumes those values and displays them.

## 12. What are the limitations?
No backend, database, file parser, authentication, or external AI model is included. The sample data is for educational demonstration only.
