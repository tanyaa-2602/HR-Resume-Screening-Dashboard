export function getAverageScore(records) {
  if (!records.length) return 0;
  return Math.round(records.reduce((sum, candidate) => sum + candidate.score, 0) / records.length);
}

export function getScoreDistribution(records) {
  const buckets = [
    { label: 'Excellent (85–100)', min: 85, max: 100, color: '#6558e8' },
    { label: 'Good (70–84)', min: 70, max: 84, color: '#16a085' },
    { label: 'Needs review (50–69)', min: 50, max: 69, color: '#f0a33a' },
    { label: 'Low (0–49)', min: 0, max: 49, color: '#e56b78' }
  ];
  return buckets.map(bucket => ({
    ...bucket,
    count: records.filter(candidate => candidate.score >= bucket.min && candidate.score <= bucket.max).length
  }));
}

export function getTopSkills(records, limit = 8) {
  const totals = new Map();
  records.forEach(candidate => candidate.skills.forEach(skill => {
    const current = totals.get(skill.name) || { name: skill.name, total: 0, count: 0 };
    current.total += skill.match;
    current.count += 1;
    totals.set(skill.name, current);
  }));
  return [...totals.values()]
    .map(skill => ({ name: skill.name, average: Math.round(skill.total / skill.count), count: skill.count }))
    .sort((a, b) => b.average - a.average)
    .slice(0, limit);
}

export function getRoleSummary(records) {
  const roles = new Map();
  records.forEach(candidate => {
    const current = roles.get(candidate.role) || { role: candidate.role, count: 0, totalScore: 0 };
    current.count += 1;
    current.totalScore += candidate.score;
    roles.set(candidate.role, current);
  });
  return [...roles.values()].map(role => ({
    ...role,
    average: Math.round(role.totalScore / role.count)
  })).sort((a, b) => b.count - a.count);
}

export function filterCandidates(records, filters) {
  const query = filters.query.trim().toLowerCase();
  return records.filter(candidate => {
    const matchesQuery = !query || [
      candidate.name, candidate.id, candidate.role, candidate.education,
      candidate.location, candidate.skills.map(skill => skill.name).join(' ')
    ].join(' ').toLowerCase().includes(query);
    const matchesRole = filters.role === 'all' || candidate.roleId === filters.role;
    const matchesStatus = filters.status === 'all' || candidate.status === filters.status;
    const matchesScore = candidate.score >= Number(filters.minScore || 0);
    return matchesQuery && matchesRole && matchesStatus && matchesScore;
  });
}

export function sortCandidates(records, sortBy) {
  const copy = [...records];
  if (sortBy === 'score-asc') return copy.sort((a, b) => a.score - b.score);
  if (sortBy === 'name-asc') return copy.sort((a, b) => a.name.localeCompare(b.name));
  if (sortBy === 'experience-desc') return copy.sort((a, b) => b.experienceYears - a.experienceYears);
  return copy.sort((a, b) => b.score - a.score);
}
