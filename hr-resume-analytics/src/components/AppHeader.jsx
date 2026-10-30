import React from 'react';

export default function AppHeader({ activeView, onExport, resultCount }) {
  const titles = {
    overview: ['Recruitment overview', 'Monitor candidate matching results and screening trends.'],
    candidates: ['Candidate directory', 'Search, filter, compare, and inspect candidate profiles.'],
    analytics: ['Charts & analytics', 'Explore score distribution, skill coverage, and role-level summaries.'],
    about: ['Project information', 'Scope, technology choices, and implementation notes for the college project.']
  };
  const [title, subtitle] = titles[activeView] || titles.overview;
  return <header className="app-header">
    <div className="breadcrumb">PROJECT <span>/</span> HR RESUME SCREENING <span>/</span> {activeView.toUpperCase()}</div>
    <div className="header-main"><div><h1>{title}</h1><p>{subtitle}</p></div>
      <div className="header-actions"><span className="demo-pill"><i /> DEMO DATA</span><button className="button button--primary" onClick={onExport} disabled={resultCount === 0}>↓ <span>Export CSV</span></button></div>
    </div>
  </header>;
}
