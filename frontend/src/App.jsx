import { useState } from "react";
import "./App.css";

const candidates = [
  {
    id: 1,
    name: "Aarav Sharma",
    education: "B.Tech Computer Science",
    experience: 1,
    skills: ["React", "JavaScript", "HTML", "CSS", "AWS"],
  },
  {
    id: 2,
    name: "Meera Singh",
    education: "B.Tech Information Technology",
    experience: 2,
    skills: ["Python", "SQL", "AWS", "Docker", "Git"],
  },
  {
    id: 3,
    name: "Kabir Verma",
    education: "BCA",
    experience: 1,
    skills: ["React", "JavaScript", "Python", "HTML", "CSS", "Git"],
  },
  {
    id: 4,
    name: "Ananya Gupta",
    education: "B.Tech Computer Science",
    experience: 3,
    skills: ["Azure", "Python", "Docker", "SQL", "Git"],
  },
  {
    id: 5,
    name: "Rohan Mishra",
    education: "B.Tech Computer Science",
    experience: 0,
    skills: ["HTML", "CSS", "JavaScript", "Git"],
  },
];

const initialWeights = {
  React: 5,
  JavaScript: 5,
  HTML: 3,
  CSS: 3,
  Python: 4,
  SQL: 3,
  AWS: 5,
  Azure: 5,
  Docker: 4,
  Git: 2,
};

function calculateScore(candidate, weights) {
  const totalWeight = Object.values(weights).reduce(
    (sum, weight) => sum + weight,
    0
  );

  if (totalWeight === 0) return 0;

  const earnedWeight = candidate.skills.reduce(
    (sum, skill) => sum + (weights[skill] || 0),
    0
  );

  return Math.round((earnedWeight / totalWeight) * 100);
}

function App() {
  const [weights, setWeights] = useState(initialWeights);
  const [selectedId, setSelectedId] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

 const rankedCandidates = candidates
  .map((candidate) => ({
    ...candidate,
    score: calculateScore(candidate, weights),
  }))
  .filter((candidate) =>
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase())
  )
  .sort((a, b) => b.score - a.score);

  const selectedCandidate =
    rankedCandidates.find((candidate) => candidate.id === selectedId) ||
    rankedCandidates[0];

  function changeWeight(skill, value) {
    setWeights((previous) => ({
      ...previous,
      [skill]: Number(value),
    }));
  }

  return (
    <main className="dashboard">
      <header className="topbar">
        <div className="brand">
          <div className="brand-icon">HR</div>
          <div>
            <h1>Talent<span>Lens</span></h1>
            <p>Resume Screening Dashboard</p>
          </div>
        </div>

        <span className="status">● Demo Mode</span>
      </header>

      <section className="welcome">
        <div>
          <p className="eyebrow">RECRUITER WORKSPACE</p>
          <h2>Candidate Screening</h2>
          <p>
            Compare candidates using transparent, adjustable skill weights.
          </p>
        </div>
        <div className="welcome-icon">✦</div>
      </section>

      <section className="stats">
        <article className="stat-card">
          <span>Total Candidates</span>
          <strong>{candidates.length}</strong>
          <small>Profiles in demo dataset</small>
        </article>

        <article className="stat-card">
          <span>Skills Evaluated</span>
          <strong>{Object.keys(weights).length}</strong>
          <small>Adjustable screening criteria</small>
        </article>

        <article className="stat-card">
          <span>Top Match</span>
          <strong>{rankedCandidates[0]?.score ?? 0}%</strong>
          <small>{rankedCandidates[0]?.name ?? "No candidates"}</small>
        </article>
      </section>

      <section className="content-grid">
        <article className="panel weights-panel">
          <div className="panel-heading">
            <div>
              <h3>Skill Weight Settings</h3>
              <p>Adjust the importance of each skill.</p>
            </div>
            <button
              className="reset-button"
              onClick={() => setWeights(initialWeights)}
            >
              Reset
            </button>
          </div>

          {Object.entries(weights).map(([skill, weight]) => (
            <div className="weight-row" key={skill}>
              <label htmlFor={`weight-${skill}`}>{skill}</label>

              <input
                id={`weight-${skill}`}
                type="range"
                min="0"
                max="10"
                value={weight}
                onChange={(event) =>
                  changeWeight(skill, event.target.value)
                }
              />

              <strong>{weight}</strong>
            </div>
          ))}

          <p className="helper-text">
            Higher weight means a skill contributes more to the match score.
          </p>
        </article>

        <article className="panel ranking-panel">
          <div className="panel-heading">
            <div>
              <h3>Live Candidate Ranking</h3>
              <p>Ranking updates when skill weights change.</p>
            </div>
            <span className="candidate-count">
              {rankedCandidates.length} profiles
            </span>
          </div>
          <input
  type="text"
  placeholder="Search candidate by name..."
  value={searchTerm}
  onChange={(event) => setSearchTerm(event.target.value)}
  className="search-input"
/>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Candidate</th>
                  <th>Skills</th>
                  <th>Score</th>
                </tr>
              </thead>

              <tbody>
                {rankedCandidates.map((candidate, index) => (
                  <tr
                    key={candidate.id}
                    className={
                      selectedCandidate?.id === candidate.id
                        ? "selected-row"
                        : ""
                    }
                  >
                    <td>{index + 1}</td>

                    <td>
                      <button
                        className="candidate-button"
                        onClick={() => setSelectedId(candidate.id)}
                      >
                        {candidate.name}
                      </button>
                      <small>{candidate.education}</small>
                    </td>

                    <td>{candidate.skills.length}</td>

                    <td>
                      <strong>{candidate.score}%</strong>
                      <div className="progress-track">
                        <div
                          className="progress-fill"
                          style={{ width: `${candidate.score}%` }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="helper-text">
            Select a candidate to view their skill breakdown below.
          </p>
        </article>
      </section>

      {selectedCandidate && (
        <section className="panel breakdown-panel">
          <div className="panel-heading">
            <div>
              <h3>Score Breakdown</h3>
              <p>
                {selectedCandidate.name} · {selectedCandidate.score}% match
              </p>
            </div>

            <span className="match-badge">
              {selectedCandidate.skills.length} listed skills
            </span>
          </div>

          <div className="breakdown-grid">
            {Object.entries(weights).map(([skill, weight]) => {
              const matched = selectedCandidate.skills.includes(skill);

              return (
                <div className="breakdown-item" key={skill}>
                  <div className="breakdown-label">
                    <span>{skill}</span>
                    <strong>
                      {matched ? weight : 0} / {weight}
                    </strong>
                  </div>

                  <div className="progress-track">
                    <div
                      className={`progress-fill ${
                        matched ? "matched" : ""
                      }`}
                      style={{
                        width: matched && weight > 0 ? "100%" : "0%",
                      }}
                    />
                  </div>

                  <small>
                    {matched ? "✓ Skill matched" : "Not matched"}
                  </small>
                </div>
              );
            })}
          </div>

          <p className="disclaimer">
            This is a rule-based demonstration score, not an automated hiring
            decision. Recruiters should review candidates fairly.
          </p>
        </section>
      )}

      <footer>
        HR Resume Screening Dashboard · Explainable Skill Matching
      </footer>
    </main>
  );
}

export default App;