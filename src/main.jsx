import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Activity, ArrowDownUp, ArrowRight, Bell, BriefcaseBusiness, Check, ChevronDown, CircleHelp, Download, FileText, Filter, LayoutDashboard, MoreHorizontal, Plus, Search, Settings2, SlidersHorizontal, Sparkles, Users, X } from 'lucide-react';
import candidates from './data/candidates.json';
import './styles.css';

const criteria = [
  { key: 'SQL', type: 'Skill', weight: 25 }, { key: 'Python', type: 'Skill', weight: 20 },
  { key: 'Tableau', type: 'Skill', weight: 15 }, { key: 'A/B Testing', type: 'Skill', weight: 15 },
  { key: 'Statistics', type: 'Skill', weight: 10 }, { key: 'data storytelling', type: 'Keyword', weight: 10 },
  { key: 'experimentation', type: 'Keyword', weight: 5 }
];
const roleLabel = 'Senior Data Analyst';
const fmt = (s) => s.toLowerCase();
function scoreOne(candidate, weights) {
  const total = Object.values(weights).reduce((a, b) => a + b, 0) || 1;
  const breakdown = criteria.map((c) => ({ ...c, weight: weights[c.key], matched: (c.type === 'Skill' ? candidate.skills : candidate.keywords).some(v => fmt(v) === fmt(c.key)) }));
  const score = Math.round(breakdown.reduce((sum, c) => sum + (c.matched ? c.weight : 0), 0) / total * 100);
  return { ...candidate, score, breakdown };
}
function App() {
  const [weights, setWeights] = useState(Object.fromEntries(criteria.map(c => [c.key, c.weight])));
  const [selectedId, setSelectedId] = useState(candidates[0].id);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All candidates');
  const [showWeights, setShowWeights] = useState(true);
  const [toast, setToast] = useState('');
  const scored = useMemo(() => candidates.map(c => scoreOne(c, weights)).sort((a,b) => b.score-a.score), [weights]);
  const filtered = scored.filter(c => (c.name + c.title + c.skills.join(' ')).toLowerCase().includes(query.toLowerCase()) && (filter === 'All candidates' || c.score >= 70));
  const selected = scored.find(c => c.id === selectedId) || scored[0];
  const avg = Math.round(scored.reduce((a,c) => a+c.score,0)/scored.length);
  const notify = (msg) => { setToast(msg); window.setTimeout(() => setToast(''), 2300); };
  const updateWeight = (key, value) => setWeights(prev => ({ ...prev, [key]: Number(value) }));
  const resetWeights = () => setWeights(Object.fromEntries(criteria.map(c => [c.key,c.weight])));
  const exportCsv = () => {
    const rows = [['Rank','Candidate','Role','Experience (years)','Score','Matched criteria'], ...scored.map((c,i)=>[i+1,c.name,c.title,c.experience,c.score,c.breakdown.filter(b=>b.matched).map(b=>b.key).join('; ')])];
    const csv = rows.map(row=>row.map(cell=>`"${String(cell).replaceAll('"','""')}"`).join(',')).join('\n');
    const url = URL.createObjectURL(new Blob([csv],{type:'text/csv'})); const a=document.createElement('a'); a.href=url; a.download='candidate-screening-results.csv'; a.click(); URL.revokeObjectURL(url);
  };
  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand"><div className="brand-mark"><Sparkles size={17}/></div><span>talent<span className="brand-light">OS</span></span></div>
      <div className="workspace-label">WORKSPACE <ChevronDown size={13}/></div>
      <div className="workspace-card"><div className="workspace-icon">N</div><div><b>Northstar Labs</b><small>Recruiting team</small></div><MoreHorizontal size={17} className="muted"/></div>
      <div className="nav-label">WORKSPACE</div>
      <nav><button className="nav-item"><LayoutDashboard size={17}/> Overview</button><button className="nav-item active"><Users size={17}/> Candidates <span className="nav-count">{candidates.length}</span></button><button className="nav-item"><BriefcaseBusiness size={17}/> Job openings <span className="tiny-dot"/></button><button className="nav-item"><Activity size={17}/> Analytics</button></nav>
      <div className="nav-label tools-label">TOOLS</div><nav><button className="nav-item"><Settings2 size={17}/> Settings</button><button className="nav-item"><CircleHelp size={17}/> Help center</button></nav>
      <div className="sidebar-bottom"><div className="upgrade"><div className="upgrade-icon"><Sparkles size={16}/></div><b>Make better hires, faster.</b><p>Explore more tools for your hiring workflow.</p><button onClick={()=>notify('You’re all set — this demo runs locally.')}>Explore tools <ArrowRight size={14}/></button></div><div className="profile"><div className="avatar user-avatar">VY</div><div><b>Vishal Yadav</b><small>Recruiter</small></div><MoreHorizontal size={17} className="muted"/></div></div>
    </aside>
    <main className="main-content">
      <header className="topbar"><div className="breadcrumb">Hiring <span>/</span> <b>Candidates</b></div><div className="top-actions"><span className="saved-indicator"><i/> All changes saved</span><button className="icon-button" aria-label="Notifications" onClick={()=>notify('You’re all caught up.')}><Bell size={18}/><i/></button><div className="avatar user-avatar top-avatar">VY</div></div></header>
      <div className="page-wrap">
        <div className="page-heading"><div><div className="eyebrow">HIRING PIPELINE <span>·</span> OCTOBER 2026</div><h1>Candidate screening</h1><p>Find your next great hire with transparent, explainable scoring.</p></div><button className="button button-primary" onClick={()=>notify('This demo uses a bundled sample dataset.')}><Plus size={16}/> Add candidate</button></div>
        <div className="role-banner"><div className="role-icon"><BriefcaseBusiness size={17}/></div><div className="role-meta"><small>SCREENING FOR</small><b>{roleLabel}</b></div><span className="banner-divider"/><div className="role-stat"><small>Applicants</small><b>{candidates.length} candidates</b></div><div className="role-stat"><small>Applicants in review</small><b>Today <span className="green-dot"/></b></div><button className="button button-quiet" onClick={()=>notify('Role details are part of the local demo.')}><FileText size={15}/> View job <ArrowRight size={14}/></button></div>
        <section className="metric-grid"><Metric label="Total candidates" value={candidates.length} note="Across all applications" icon={<Users size={17}/>} tint="purple"/><Metric label="Average match score" value={`${avg}%`} note="Across all candidates" icon={<Activity size={17}/>} tint="green"/><Metric label="Strong matches" value={scored.filter(c=>c.score>=70).length} note="Score of 70% or higher" icon={<Sparkles size={17}/>} tint="orange"/><Metric label="Criteria selected" value={criteria.length} note="Skills & keywords" icon={<Filter size={17}/>} tint="blue"/></section>
        <div className="content-grid">
          <section className="panel candidate-panel"><div className="panel-heading"><div><h2>Candidate rankings</h2><p>Scored against your role requirements</p></div><button className="button button-outline export-button" onClick={exportCsv}><Download size={15}/> Export</button></div>
            <div className="table-toolbar"><div className="searchbox"><Search size={15}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search candidates..."/><kbd>⌘ K</kbd></div><button className={'button button-outline filter-button '+(filter==='Strong matches'?'filter-on':'')} onClick={()=>setFilter(filter==='All candidates'?'Strong matches':'All candidates')}><SlidersHorizontal size={15}/> {filter==='All candidates'?'All candidates':'Strong matches'} <ChevronDown size={14}/></button><button className="icon-button sort-button" title="Sorted by match score"><ArrowDownUp size={16}/></button></div>
            <div className="table-scroll"><table><thead><tr><th className="rank-col">RANK</th><th>CANDIDATE</th><th>EXPERIENCE</th><th>SKILL MATCH</th><th>MATCH SCORE</th><th></th></tr></thead><tbody>{filtered.map((c)=>{const rank=scored.findIndex(x=>x.id===c.id)+1;return <tr key={c.id} onClick={()=>setSelectedId(c.id)} className={selectedId===c.id?'selected-row':''}><td><span className={'rank-number '+(rank===1?'rank-first':'')}>{String(rank).padStart(2,'0')}</span></td><td><div className="candidate-cell"><div className="avatar candidate-avatar" style={{background:c.color}}>{c.initials}</div><div><b>{c.name}</b><small>{c.title}</small></div></div></td><td>{c.experience} years</td><td><div className="skill-track"><i style={{width:`${Math.round(c.breakdown.filter(x=>x.matched).length/criteria.length*100)}%`}}/></div><small className="skill-count">{c.breakdown.filter(x=>x.matched).length}/{criteria.length} skills</small></td><td><span className={'score-pill '+(c.score>=75?'score-high':c.score>=55?'score-mid':'score-low')}>{c.score}%</span></td><td><button className="row-more" aria-label={`Open ${c.name}`}><ArrowRight size={15}/></button></td></tr>})}{filtered.length===0&&<tr><td colSpan="6" className="empty-state">No candidates match your search.</td></tr>}</tbody></table></div>
            <div className="table-footer"><span>Showing <b>{filtered.length}</b> of <b>{candidates.length}</b> candidates</span><div><button disabled>‹</button><button className="page-current">1</button><button disabled>›</button></div></div>
          </section>
          <aside className="right-column">
            <section className="panel weights-panel"><div className="panel-heading compact"><div className="title-with-icon"><div className="small-panel-icon"><SlidersHorizontal size={15}/></div><div><h2>Scoring criteria</h2><p>Adjust weights to refine rankings</p></div></div><button className="icon-button subtle" aria-label="Collapse scoring criteria" onClick={()=>setShowWeights(!showWeights)}><ChevronDown className={showWeights?'':'rotate'} size={16}/></button></div>
              {showWeights&&<><div className="weight-list">{criteria.map((c)=> <label className="weight-item" key={c.key}><span><b>{c.key}</b><small>{c.type}</small></span><div className="weight-control"><input aria-label={`${c.key} weight`} type="range" min="0" max="40" value={weights[c.key]} style={{'--range':`${weights[c.key]/40*100}%`}} onChange={e=>updateWeight(c.key,e.target.value)}/><b>{weights[c.key]}<small>%</small></b></div></label>)}</div><div className="weight-total"><span>Total weight</span><b>{Object.values(weights).reduce((a,b)=>a+b,0)}%</b></div><div className="weight-actions"><button onClick={resetWeights}>Reset defaults</button><span><i/> Live updates on</span></div></>}
            </section>
            <section className="panel detail-panel"><div className="detail-top"><div><span className="detail-label">TOP MATCH</span><div className="detail-person"><div className="avatar detail-avatar" style={{background:selected.color}}>{selected.initials}</div><div><h2>{selected.name}</h2><p>{selected.title}</p></div></div></div><button className="icon-button subtle" aria-label="More candidate actions" onClick={()=>notify('Candidate actions are available in this demo view.')}><MoreHorizontal size={17}/></button></div><div className="detail-subline"><span><BriefcaseBusiness size={13}/>{selected.experience} years experience</span><span>·</span><span>{selected.location}</span></div>
              <div className="score-summary"><div><small>OVERALL MATCH</small><b>{selected.score}<em>%</em></b><span><i/> {selected.score>=70?'Strong match':selected.score>=50?'Potential match':'Low match'}</span></div><div className="donut" style={{'--score':`${selected.score*3.6}deg`}}><div><b>{selected.score}%</b><small>match</small></div></div></div>
              <div className="breakdown-title"><b>Score breakdown</b><button onClick={()=>notify('Every score is based only on the visible criteria and weights.')}><CircleHelp size={13}/> How it works</button></div>
              <div className="breakdown-list">{selected.breakdown.map((item)=><div className="breakdown-item" key={item.key}><span className={'match-check '+(item.matched?'matched':'')}>{item.matched?<Check size={11}/>:<X size={10}/>}</span><span className="breakdown-name">{item.key}</span><span className="breakdown-weight">{item.weight}%</span><span className="breakdown-points">{item.matched?`+${item.weight}`:'—'}</span></div>)}</div>
              <div className="summary-box"><b>About {selected.name.split(' ')[0]}</b><p>{selected.summary}</p><div><span><FileText size={13}/>{selected.education}</span><a href={`mailto:${selected.email}`}>Contact <ArrowRight size={12}/></a></div></div>
              <button className="button button-outline full-button" onClick={()=>notify(`Opened candidate profile for ${selected.name}.`)}>View full profile <ArrowRight size={14}/></button>
            </section>
          </aside>
        </div>
        <footer className="page-footer"><span><Sparkles size={13}/> Transparent scoring, better hiring.</span><span>Demo dataset · No candidate data leaves this device</span></footer>
      </div>
    </main>
    {toast&&<div className="toast"><Check size={16}/>{toast}</div>}
  </div>;
}
function Metric({label,value,note,icon,tint}){return <div className="metric-card"><div className="metric-top"><span>{label}</span><i className={`metric-icon ${tint}`}>{icon}</i></div><b className="metric-value">{value}</b><small>{note}</small></div>}

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
