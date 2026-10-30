# Step-by-step setup on Ubuntu

## Step 1 — Extract the project
Download the ZIP and move it to the folder where you keep college projects. If it is in Downloads:
```bash
cd ~/Downloads
unzip sohit-hr-resume-analytics-major-project.zip
cd sohit-hr-resume-analytics-major-project
```

## Step 2 — Check Node.js and npm
```bash
node -v
npm -v
```
Use Node.js 18 or newer. If either command is not found, install Node.js before continuing.

## Step 3 — Install dependencies
```bash
npm install
```
Wait until npm finishes. This installs React, Vite, Chart.js, and the React chart wrapper.

## Step 4 — Start the development server
```bash
npm run dev
```
Open the URL Vite prints, commonly `http://localhost:5173`. Keep the terminal open while presenting the project.

## Step 5 — Demonstrate the features
1. Overview: explain KPI cards and the charts.
2. Search: type a candidate name or skill.
3. Filters: choose a role, status, and minimum score.
4. Sorting: change the sort dropdown.
5. Candidate detail: click `View details`.
6. Candidate comparison: open Candidates and tick up to three rows.
7. CSV export: click `Export CSV`.
8. Analytics: open Analytics from the sidebar.
9. Project info: explain the technology stack and limitations.

## Step 6 — Build for production
Stop the development server with `Ctrl+C`, then run:
```bash
npm run build
npm run preview
```
A successful build creates a `dist/` directory.

## Step 7 — Upload to GitHub
Create an empty GitHub repository named `sohit-hr-resume-analytics-major-project`. From this project folder:
```bash
git init
git add .
git commit -m "Build HR resume analytics dashboard"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/sohit-hr-resume-analytics-major-project.git
git push -u origin main
```
Replace `YOUR_USERNAME`. Authenticate using a supported GitHub method. GitHub does not accept account passwords for HTTPS Git operations.

## Common commands
- Leave a terminal folder: `cd ..`
- See files: `ls`
- Open the current folder in VS Code (if installed): `code .`
- Stop Vite: `Ctrl+C`

## Common issues
- `npm: command not found`: Node.js/npm are not installed or not on PATH.
- `EADDRINUSE`: port 5173 is already in use; stop the other Vite process or change the port in `vite.config.js`.
- GitHub authentication error: use a personal access token through a credential manager or configure SSH; do not use your GitHub account password.
