function escapeCsv(value) {
  const text = String(value ?? '');
  return /[",\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

export function exportCandidatesToCsv(candidates) {
  const headers = ['Candidate ID', 'Name', 'Email', 'Job Role', 'Experience Years', 'Education', 'Location', 'Score', 'Status', 'Skills'];
  const rows = candidates.map(candidate => [
    candidate.id, candidate.name, candidate.email, candidate.role, candidate.experienceYears,
    candidate.education, candidate.location, candidate.score, candidate.status,
    candidate.skills.map(skill => `${skill.name} (${skill.match}%)`).join('; ')
  ]);
  const csv = [headers, ...rows].map(row => row.map(escapeCsv).join(',')).join('\r\n');
  const blob = new Blob(['\uFEFF', csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'hr-candidate-analytics.csv';
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}
