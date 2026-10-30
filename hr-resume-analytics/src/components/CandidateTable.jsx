import React from 'react';
import { formatDate, initials, statusClass } from '../utils/formatters.js';

export default function CandidateTable({ candidates, onView, selectedIds, onToggleCompare }) {
  return <div className="table-scroll"><table className="candidate-table">
    <thead><tr><th>Compare</th><th>Candidate</th><th>Job role</th><th>Experience</th><th>Applied date</th><th>Match score</th><th>Status</th><th>Action</th></tr></thead>
    <tbody>{candidates.map((candidate, index) => <tr key={candidate.id}>
      <td><input type="checkbox" aria-label={`Compare ${candidate.name}`} checked={selectedIds.includes(candidate.id)} onChange={() => onToggleCompare(candidate.id)} disabled={!selectedIds.includes(candidate.id) && selectedIds.length >= 3} /></td>
      <td><div className="candidate-identity"><div className={`avatar avatar--${index % 4}`}>{initials(candidate.name)}</div><div><b>{candidate.name}</b><small>{candidate.id}</small></div></div></td>
      <td>{candidate.role}</td><td>{candidate.experienceYears} yr{candidate.experienceYears === 1 ? '' : 's'}</td><td>{formatDate(candidate.appliedDate)}</td>
      <td><div className="score-cell"><b>{candidate.score}%</b><span className="mini-track"><i style={{width: `${candidate.score}%`}} /></span></div></td>
      <td><span className={statusClass(candidate.status)}>{candidate.status}</span></td>
      <td><button className="view-button" onClick={() => onView(candidate)}>View details ↗</button></td>
    </tr>)}</tbody>
  </table>{candidates.length === 0 && <div className="empty-state"><span>⌕</span><b>No candidates found</b><p>Try changing your search or filters.</p></div>}</div>;
}
