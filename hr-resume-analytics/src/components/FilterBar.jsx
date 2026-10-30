import React from 'react';
import { jobRoles } from '../data/jobRoles.js';

export default function FilterBar({ filters, updateFilter, resetFilters, sortBy, setSortBy }) {
  return <section className="filter-panel">
    <div className="filter-title"><div><h2>Candidate results</h2><p>Use filters to explore the demo dataset.</p></div><button className="button button--quiet" onClick={resetFilters}>↺ Reset filters</button></div>
    <div className="filter-controls">
      <label className="search-control"><span>⌕</span><input value={filters.query} onChange={e => updateFilter('query', e.target.value)} placeholder="Search name, skill, role, ID..." aria-label="Search candidates" /></label>
      <label className="select-control"><span>Job role</span><select value={filters.role} onChange={e => updateFilter('role', e.target.value)}>{jobRoles.map(role => <option key={role.id} value={role.id}>{role.label}</option>)}</select></label>
      <label className="select-control"><span>Status</span><select value={filters.status} onChange={e => updateFilter('status', e.target.value)}><option value="all">All statuses</option><option value="Shortlisted">Shortlisted</option><option value="Review">Needs review</option><option value="Not Matched">Not matched</option></select></label>
      <label className="select-control"><span>Minimum score: {filters.minScore}%</span><input className="range-control" type="range" min="0" max="100" step="5" value={filters.minScore} onChange={e => updateFilter('minScore', e.target.value)} /></label>
      <label className="select-control"><span>Sort by</span><select value={sortBy} onChange={e => setSortBy(e.target.value)}><option value="score-desc">Highest score</option><option value="score-asc">Lowest score</option><option value="name-asc">Candidate name</option><option value="experience-desc">Most experience</option></select></label>
    </div>
  </section>;
}
