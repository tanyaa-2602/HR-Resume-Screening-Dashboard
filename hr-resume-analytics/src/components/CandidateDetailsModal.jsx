import React from 'react';
import { initials, statusClass } from '../utils/formatters.js';

export default function CandidateDetailsModal({ candidate, onClose }) {
  if (!candidate) return null;
  const sortedSkills = [...candidate.skills].sort((a, b) => b.match - a.match);
  return <div className="modal-backdrop" role="presentation" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}>
    <section className="detail-modal" role="dialog" aria-modal="true" aria-labelledby="candidate-modal-title">
      <div className="modal-top"><span className="eyebrow">CANDIDATE PROFILE · {candidate.id}</span><button className="icon-button" onClick={onClose} aria-label="Close candidate details">×</button></div>
      <div className="modal-person"><div className="avatar avatar--large">{initials(candidate.name)}</div><div><h2 id="candidate-modal-title">{candidate.name}</h2><p>{candidate.role} · {candidate.location}</p><span className={statusClass(candidate.status)}>{candidate.status}</span></div><div className="modal-score"><strong>{candidate.score}%</strong><small>Overall demo match</small></div></div>
      <p className="candidate-summary">{candidate.summary}</p>
      <div className="detail-facts"><div><span>Education</span><b>{candidate.education}</b></div><div><span>Experience</span><b>{candidate.experienceYears} year{candidate.experienceYears === 1 ? '' : 's'}</b></div><div><span>Email</span><b>{candidate.email}</b></div></div>
      <div className="skill-section"><h3>Skill match breakdown</h3><p>Individual skill values are illustrative demo values.</p>{sortedSkills.map(skill => <div className="skill-line" key={skill.name}><span>{skill.name}</span><div className="skill-track"><i style={{width: `${skill.match}%`}} /></div><b>{skill.match}%</b></div>)}</div>
      <div className="modal-footer"><span>Demo data only · Human review required</span><button className="button button--primary" onClick={onClose}>Close profile</button></div>
    </section>
  </div>;
}
