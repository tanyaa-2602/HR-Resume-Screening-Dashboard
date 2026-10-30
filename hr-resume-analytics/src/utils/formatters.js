export function formatPercent(value) {
  return `${Math.round(Number(value) || 0)}%`;
}

export function initials(name = '') {
  return name.trim().split(/\s+/).slice(0, 2).map(part => part[0] || '').join('').toUpperCase();
}

export function formatDate(dateString) {
  if (!dateString) return '—';
  const date = new Date(`${dateString}T00:00:00`);
  return Number.isNaN(date.getTime()) ? '—' : new Intl.DateTimeFormat('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric'
  }).format(date);
}

export function statusClass(status) {
  if (status === 'Shortlisted') return 'status status--success';
  if (status === 'Not Matched') return 'status status--danger';
  return 'status status--warning';
}
