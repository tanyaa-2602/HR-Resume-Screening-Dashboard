import React from 'react';

export default function ChartCard({ title, subtitle, children, className = '', action }) {
  return <section className={`chart-card ${className}`}>
    <div className="chart-card-header"><div><h2>{title}</h2><p>{subtitle}</p></div>{action || null}</div>
    <div className="chart-body">{children}</div>
  </section>;
}
