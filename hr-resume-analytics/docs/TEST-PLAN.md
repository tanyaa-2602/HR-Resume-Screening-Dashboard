# Manual Test Plan

| ID | Test | Expected result |
|---|---|---|
| T01 | Run `npm install` and `npm run dev` | Vite starts and the dashboard opens. |
| T02 | Load Overview | KPI cards, charts, filters, and candidate table appear. |
| T03 | Search for `Rahul` | Only matching candidate records remain visible. |
| T04 | Choose Frontend Developer | Only frontend candidates appear in filtered views. |
| T05 | Choose Shortlisted status | Only shortlisted demo records remain. |
| T06 | Set minimum score to 85 | Candidates below 85 are excluded. |
| T07 | Sort by candidate name | Results appear in ascending name order. |
| T08 | Reset filters | Default filters and descending score sort return. |
| T09 | Click View details | Profile modal shows education, experience, and skill bars. |
| T10 | Select up to three compare checkboxes | Comparison cards show selected profiles. |
| T11 | Try selecting a fourth profile | Selection stays at three and a message is displayed. |
| T12 | Export CSV | A CSV file downloads with the current filtered rows. |
| T13 | Open Analytics navigation | Charts and analytics interpretation are shown. |
| T14 | Open Project info navigation | Role, stack, integration, and limitations are shown. |
| T15 | Resize to a narrow screen | Sidebar and charts adapt to mobile layout. |
| T16 | Filter to no results | Empty-state message appears and no crash occurs. |

## Before submission
- Replace or clearly label demo values according to the supervisor's requirements.
- Confirm that the team data contract matches the scoring module.
- Test in the browser used for the demonstration.
- Do not claim that AI or resume parsing is implemented unless your team adds and tests those features.
