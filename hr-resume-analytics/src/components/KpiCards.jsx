import React from 'react';

const cards = [
  { key: 'total', label: 'Candidates reviewed', icon: '♙', note: 'In current filtered view', color: 'violet' },
  { key: 'average', label: 'Average match score', icon: '◉', note: 'Across visible candidates', color: 'teal', suffix: '%' },
  { key: 'shortlisted', label: 'Shortlisted', icon: '✓', note: 'Score-ready demo profiles', color: 'green' },
  { key: 'topScore', label: 'Highest match', icon: '↗', note: 'Best score in this view', color: 'orange', suffix: '%' }
];

export default function KpiCards({ summary }) {
  return <section className="kpi-grid">{cards.map(card => <article className="kpi-card" key={card.key}>
    <div className={`kpi-icon kpi-icon--${card.color}`}>{card.icon}</div>
    <div className="kpi-copy"><span>{card.label}</span><strong>{summary[card.key]}{card.suffix || ''}</strong><small>{card.note}</small></div>
  </article>)}</section>;
}
