import { useMemo, useState } from 'react';
import { candidates as defaultCandidates } from '../data/candidates.js';
import { filterCandidates, sortCandidates, getAverageScore, getScoreDistribution, getTopSkills, getRoleSummary } from '../utils/analytics.js';

const initialFilters = { query: '', role: 'all', status: 'all', minScore: 0 };

export function useCandidateAnalytics(sourceCandidates = defaultCandidates) {
  const [filters, setFilters] = useState(initialFilters);
  const [sortBy, setSortBy] = useState('score-desc');
  const filteredCandidates = useMemo(
    () => sortCandidates(filterCandidates(sourceCandidates, filters), sortBy),
    [sourceCandidates, filters, sortBy]
  );
  const summary = useMemo(() => ({
    total: filteredCandidates.length,
    average: getAverageScore(filteredCandidates),
    shortlisted: filteredCandidates.filter(c => c.status === 'Shortlisted').length,
    needsReview: filteredCandidates.filter(c => c.status === 'Review').length,
    topScore: filteredCandidates.length ? Math.max(...filteredCandidates.map(c => c.score)) : 0
  }), [filteredCandidates]);
  const distribution = useMemo(() => getScoreDistribution(filteredCandidates), [filteredCandidates]);
  const topSkills = useMemo(() => getTopSkills(filteredCandidates), [filteredCandidates]);
  const roleSummary = useMemo(() => getRoleSummary(filteredCandidates), [filteredCandidates]);

  function updateFilter(key, value) {
    setFilters(current => ({ ...current, [key]: value }));
  }
  function resetFilters() {
    setFilters(initialFilters);
    setSortBy('score-desc');
  }

  return { filters, updateFilter, resetFilters, sortBy, setSortBy, filteredCandidates, summary, distribution, topSkills, roleSummary };
}
