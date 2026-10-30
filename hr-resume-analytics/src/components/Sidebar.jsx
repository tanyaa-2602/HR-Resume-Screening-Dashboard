import React from 'react';

const items = [
  { id: 'overview', label: 'Overview', icon: '▦' },
  { id: 'candidates', label: 'Candidates', icon: '♙' },
  { id: 'analytics', label: 'Analytics', icon: '▥' },
  { id: 'about', label: 'Project info', icon: 'ⓘ' }
];

export default function Sidebar({ activeView, onChange }) {
  return <aside className="sidebar">
    <div className="brand"><span className="brand-mark">H</span><span className="brand-name">HireScope<small>RESUME INTELLIGENCE</small></span></div>
    <p className="side-label">WORKSPACE</p>
    <nav>{items.map(item => <button key={item.id} className={`nav-link ${activeView === item.id ? 'is-active' : ''}`} onClick={() => onChange(item.id)}><span className="nav-icon">{item.icon}</span><span>{item.label}</span>{item.id === 'candidates' && <span className="nav-count">12</span>}</button>)}</nav>
    <div className="sidebar-note"><span className="note-icon">✦</span><b>Analytics module</b><p>Candidate data is demo-only and scores are illustrative.</p></div>
    <div className="profile-mini"><div className="avatar avatar--small">SS</div><div><b>Sohit Sharma</b><small>Charts & Analytics</small></div></div>
  </aside>;
}
