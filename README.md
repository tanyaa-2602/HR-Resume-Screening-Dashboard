# HR Resume Screening Dashboard

A frontend-only React mini-project based on the project synopsis. It uses a bundled JSON dataset of fictional sample candidates; there is no backend, database, resume upload, or external AI/API scoring.

## Run on your Mac

1. Install [Node.js](https://nodejs.org/) if it is not already installed.
2. Open Terminal and move into this project folder:

   ```bash
   cd ~/Documents/Codex/2026-10-11/referenced-chatgpt-conversation-this-is-an/outputs/hr-resume-screening-dashboard
   ```

   If your Codex folder is elsewhere, drag the project folder into Terminal after typing `cd `.

3. Install the project packages (first run only):

   ```bash
   npm install
   ```

4. Start the app:

   ```bash
   npm run dev
   ```

5. Open the local address printed by Vite, usually `http://localhost:5173`.

Press Control+C in Terminal to stop the app.

## What to try

- Drag a scoring slider. The score, chart, match breakdown, and candidate order recalculate immediately.
- Select a candidate row to inspect that candidate's transparent breakdown and profile summary.
- Search by name or skill, or switch the filter to strong matches.
- Select **Export** to download the current ranking as a CSV file.
- Resize the browser to see the responsive mobile layout.

## Scoring model

For each candidate, the app sums the weights of criteria found in their bundled skills/keywords, divides by the current total weight, and converts that ratio to a percentage. Every criterion is listed in the candidate breakdown, including misses. The controls are normalized by the current total, so a score remains between 0 and 100 even if the weights do not add to 100. This is an educational rule-based demo, not an automated hiring recommendation.

## Build for static hosting

Run `npm run build`. The static site is written to `dist/`, ready for a static host such as Vercel or GitHub Pages.
