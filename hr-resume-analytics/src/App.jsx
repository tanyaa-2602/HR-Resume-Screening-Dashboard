import React, { useCallback, useMemo, useState } from 'react';
import { Bar, Doughnut, Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement,
  RadialLinearScale, PointElement, LineElement, Tooltip, Legend, Filler
} from 'chart.js';
import Sidebar from './components/Sidebar.jsx';
import AppHeader from './components/AppHeader.jsx';
import KpiCards from './components/KpiCards.jsx';
import FilterBar from './components/FilterBar.jsx';
import ChartCard from './components/ChartCard.jsx';
import CandidateTable from './components/CandidateTable.jsx';
import CandidateDetailsModal from './components/CandidateDetailsModal.jsx';
import Toast from './components/Toast.jsx';
import { candidates } from './data/candidates.js';
import { useCandidateAnalytics } from './hooks/useCandidateAnalytics.js';
import { exportCandidatesToCsv } from './utils/csvExport.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, RadialLinearScale, PointElement, LineElement, Tooltip, Legend, Filler);

const chartOptions = {
  responsive: true, maintainAspectRatio: false,
  plugins: { legend: { display: false }, tooltip: { callbacks: { label: context => `${context.dataset.label || 'Score'}: ${context.parsed.y ?? context.parsed}%` } } },
  scales: { y: { beginAtZero: true, max: 100, grid: { color: '#edf0f6' }, ticks: { callback: value => `${value}%`, color: '#858ca0' } }, x: { grid: { display: false }, ticks: { color: '#858ca0' } } }
};

function OverviewCharts({ records, distribution, topSkills, roleSummary, selectedCandidate, onSelectCandidate }) {
  const scoreData = useMemo(() => ({
    labels: [...records].sort((a,b)=>b.score-a.score).slice(0,8).map(c=>c.name.split(' ')[0]),
    datasets: [{ label:'Match score', data:[...records].sort((a,b)=>b.score-a.score).slice(0,8).map(c=>c.score), backgroundColor:'#6558e8', hoverBackgroundColor:'#4f42d0', borderRadius:7, barThickness:24 }]
  }), [records]);
  const distributionData = useMemo(() => ({
    labels: distribution.map(item=>item.label),
    datasets: [{ data:distribution.map(item=>item.count), backgroundColor:distribution.map(item=>item.color), borderWidth:0, hoverOffset:5 }]
  }), [distribution]);
  const skillsData = useMemo(() => ({
    labels:topSkills.map(skill=>skill.name),
    datasets:[{label:'Average skill match',data:topSkills.map(skill=>skill.average),backgroundColor:'rgba(20,160,133,.78)',borderRadius:5,barThickness:17}]
  }), [topSkills]);
  const roleData = useMemo(() => ({
    labels:roleSummary.map(role=>role.role.replace(' Developer','')),
    datasets:[{label:'Average score',data:roleSummary.map(role=>role.average),backgroundColor:'#9b91f5',borderRadius:6}]
  }), [roleSummary]);
  const selectedSkills = selectedCandidate?.skills || [];
  const radarData = {
    labels:selectedSkills.map(skill=>skill.name),
    datasets:[{label:selectedCandidate?.name || 'Candidate',data:selectedSkills.map(skill=>skill.match),backgroundColor:'rgba(101,88,232,.18)',borderColor:'#6558e8',pointBackgroundColor:'#6558e8',borderWidth:2}]
  };
  const radarOptions = {responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{r:{min:0,max:100,ticks:{stepSize:20,backdropColor:'transparent',color:'#858ca0'},grid:{color:'#e9ecf3'},angleLines:{color:'#e9ecf3'},pointLabels:{color:'#626b80',font:{size:11}}}}};
  const doughnutOptions = {responsive:true,maintainAspectRatio:false,cutout:'70%',plugins:{legend:{display:false}}};
  return <>
    <div className="main-chart-grid">
      <ChartCard title="Candidate match ranking" subtitle="Top-scoring candidates in the current filtered view" className="chart-card--wide"><div className="chart-container chart-container--ranking"><Bar data={scoreData} options={chartOptions}/></div></ChartCard>
      <ChartCard title="Score distribution" subtitle="How candidates are grouped by match score"><div className="distribution-layout"><div className="chart-container chart-container--donut"><Doughnut data={distributionData} options={doughnutOptions}/><div className="donut-center"><strong>{records.length}</strong><span>Candidates</span></div></div><div className="legend-list">{distribution.map(item=><div className="legend-item" key={item.label}><i style={{background:item.color}}/><span>{item.label}</span><b>{item.count}</b></div>)}</div></div></ChartCard>
    </div>
    <div className="secondary-chart-grid">
      <ChartCard title="Average skill match" subtitle="Average skill score across visible candidate profiles"><div className="chart-container chart-container--skills"><Bar data={skillsData} options={{...chartOptions,scales:{...chartOptions.scales,x:{...chartOptions.scales.x,ticks:{...chartOptions.scales.x.ticks,maxRotation:35,minRotation:0}}}}}/></div></ChartCard>
      <ChartCard title="Average score by role" subtitle="Compare role-level match score averages"><div className="chart-container chart-container--role"><Bar data={roleData} options={chartOptions}/></div></ChartCard>
    </div>
    <div className="secondary-chart-grid">
      <ChartCard title="Candidate skill profile" subtitle="Choose a candidate to inspect their skill match pattern" action={<select className="compact-select" value={selectedCandidate?.id || ''} onChange={e=>onSelectCandidate(records.find(c=>c.id===e.target.value) || records[0] || null)}>{records.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select>}>
        {selectedCandidate ? <div className="chart-container chart-container--radar"><Radar data={radarData} options={radarOptions}/></div> : <div className="empty-state">No candidate data for this filter.</div>}
      </ChartCard>
      <ChartCard title="Analytics interpretation" subtitle="Quick summary generated from the currently visible data"><div className="insight-list">
        <div className="insight"><span className="insight-icon insight-icon--purple">↗</span><div><b>Top score</b><p>{records.length ? `${[...records].sort((a,b)=>b.score-a.score)[0].name} has the highest demo match at ${Math.max(...records.map(c=>c.score))}%.` : 'No records available under these filters.'}</p></div></div>
        <div className="insight"><span className="insight-icon insight-icon--green">✓</span><div><b>Shortlisted profiles</b><p>{records.filter(c=>c.status==='Shortlisted').length} of {records.length} visible candidates are marked shortlisted in the sample data.</p></div></div>
        <div className="insight"><span className="insight-icon insight-icon--orange">◎</span><div><b>Average score</b><p>The current filtered group has an average demo match of {records.length ? Math.round(records.reduce((s,c)=>s+c.score,0)/records.length) : 0}%.</p></div></div>
        <p className="insight-disclaimer">These observations summarize predefined demo scores; they are not AI-generated hiring recommendations.</p>
      </div></ChartCard>
    </div>
  </>;
}

function ProjectInfo() {
  return <section className="info-grid">
    <article className="info-card info-card--hero"><span className="eyebrow">COLLEGE PROJECT MODULE</span><h2>HR Resume Screening Dashboard</h2><p>This module focuses on Charts & Analytics: presenting candidate match results in a readable, interactive, and transparent way.</p><div className="info-tags"><span>React</span><span>Chart.js</span><span>JavaScript</span><span>Vite</span></div></article>
    <article className="info-card"><h3>My assigned role</h3><p><b>Sohit Sharma — Charts & Analytics</b></p><ul><li>Build candidate ranking visualizations.</li><li>Display skill-wise score breakdowns.</li><li>Summarize score distributions and role trends.</li><li>Connect analytics views to shared candidate data.</li><li>Support filtering, candidate comparison, and CSV export.</li></ul></article>
    <article className="info-card"><h3>Technology stack</h3><ul><li><b>React:</b> reusable UI components and state.</li><li><b>Chart.js:</b> bar, doughnut, and radar visualizations.</li><li><b>JavaScript:</b> filters, sorting, analytics utilities.</li><li><b>CSS:</b> responsive dashboard styling.</li><li><b>Vite:</b> local development and production build.</li></ul></article>
    <article className="info-card"><h3>Scope and limitations</h3><ul><li>Uses fictional, bundled sample candidate data.</li><li>Scores are predefined demonstration values.</li><li>No resume file parsing or external AI model is included.</li><li>No backend/database is connected in this module.</li><li>Recruitment decisions require human review and broader criteria.</li></ul></article>
    <article className="info-card"><h3>Integration contract</h3><p>For team integration, the scoring and data modules should provide candidates with a stable ID, name, role, score, status, and an array of skill match values. Keep calculations separate from presentation so charts can consume real results later.</p></article>
  </section>;
}

export default function App() {
  const [activeView, setActiveView] = useState('overview');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [toast, setToast] = useState('');
  const analytics = useCandidateAnalytics(candidates);
  const records = analytics.filteredCandidates;
  const selectedForRadar = selectedCandidate && records.some(c=>c.id===selectedCandidate.id) ? selectedCandidate : records[0] || null;

  const dismissToast = useCallback(() => setToast(''), []);
  const handleExport = useCallback(() => {
    if (!records.length) { setToast('No candidate rows to export.'); return; }
    exportCandidatesToCsv(records);
    setToast(`Exported ${records.length} candidate records to CSV.`);
  }, [records]);

  function toggleCompare(id) {
    setSelectedIds(current => {
      if (current.includes(id)) return current.filter(item=>item!==id);
      if (current.length >= 3) { setToast('You can compare up to 3 candidates at a time.'); return current; }
      return [...current,id];
    });
  }

  const comparedCandidates = candidates.filter(c=>selectedIds.includes(c.id));

  return <div className="app-shell">
    <Sidebar activeView={activeView} onChange={setActiveView}/>
    <main className="main-content">
      <AppHeader activeView={activeView} onExport={handleExport} resultCount={records.length}/>
      {activeView !== 'about' && <KpiCards summary={analytics.summary}/>}
      {activeView === 'overview' && <>
        <FilterBar filters={analytics.filters} updateFilter={analytics.updateFilter} resetFilters={analytics.resetFilters} sortBy={analytics.sortBy} setSortBy={analytics.setSortBy}/>
        <OverviewCharts records={records} distribution={analytics.distribution} topSkills={analytics.topSkills} roleSummary={analytics.roleSummary} selectedCandidate={selectedForRadar} onSelectCandidate={setSelectedCandidate}/>
        <section className="table-section"><div className="section-heading"><div><h2>Candidate directory</h2><p>Ranked results for the active filters.</p></div><button className="button button--quiet" onClick={()=>setActiveView('candidates')}>View all candidates →</button></div><CandidateTable candidates={records.slice(0,6)} onView={setSelectedCandidate} selectedIds={selectedIds} onToggleCompare={toggleCompare}/></section>
      </>}
      {activeView === 'candidates' && <>
        <FilterBar filters={analytics.filters} updateFilter={analytics.updateFilter} resetFilters={analytics.resetFilters} sortBy={analytics.sortBy} setSortBy={analytics.setSortBy}/>
        <section className="table-section"><div className="section-heading"><div><h2>All candidate records</h2><p>{records.length} matching profiles · select up to three to compare</p></div><span className="comparison-count">{selectedIds.length}/3 selected</span></div><CandidateTable candidates={records} onView={setSelectedCandidate} selectedIds={selectedIds} onToggleCompare={toggleCompare}/></section>
        {comparedCandidates.length > 0 && <section className="comparison-panel"><div className="section-heading"><div><h2>Candidate comparison</h2><p>Side-by-side view of selected demo records.</p></div><button className="button button--quiet" onClick={()=>setSelectedIds([])}>Clear selection</button></div><div className="comparison-grid">{comparedCandidates.map(c=><article key={c.id} className="comparison-card"><span>{c.role}</span><h3>{c.name}</h3><strong>{c.score}%</strong><div className="mini-track"><i style={{width:`${c.score}%`}}/></div><p>{c.experienceYears} years experience</p><p>{c.skills.map(s=>s.name).join(' · ')}</p><button className="view-button" onClick={()=>setSelectedCandidate(c)}>View profile ↗</button></article>)}</div></section>}
      </>}
      {activeView === 'analytics' && <OverviewCharts records={records} distribution={analytics.distribution} topSkills={analytics.topSkills} roleSummary={analytics.roleSummary} selectedCandidate={selectedForRadar} onSelectCandidate={setSelectedCandidate}/>}
      {activeView === 'about' && <ProjectInfo/>}
      <footer className="app-footer"><span>HireScope · HR Resume Screening Dashboard</span><span>Charts & Analytics module · College project prototype</span><span>Sample data only</span></footer>
    </main>
    <CandidateDetailsModal candidate={selectedCandidate} onClose={()=>setSelectedCandidate(null)}/>
    <Toast message={toast} onDismiss={dismissToast}/>
  </div>;
}
