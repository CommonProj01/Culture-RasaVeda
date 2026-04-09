import React, { useState } from "react";
import { Link } from "react-router-dom";
import { chefs } from "../../data/chefs";
import "./styles.css";

export default function ChefSpotlights() {

  // STEP 2: State
  const [activeRegion, setActiveRegion] = useState("All");
  const [selected, setSelected] = useState(null);

  // STEP 3: Filtering
  const regions = ["All", ...new Set(chefs.map(c => c.region))];
  const filtered = chefs.filter(c =>
    activeRegion === "All" || c.region === activeRegion
  );

  const featured = chefs.filter(c => c.featured);

  return (
    <div className="cs-page">
      <Link to="/" className="cs-back">← Back to Home</Link>

      {/* ── Header ── */}
      <div className="cs-header">
        <h1 className="cs-title">Chef &amp; Cook Spotlights</h1>
        <p className="cs-sub">Celebrating home cooks &amp; heritage cooks keeping India's culinary soul alive.</p>
      </div>

      {/* ── Featured Banner Row ── */}
      <div className="cs-featured-row">
        <p className="cs-featured-label">⭐ Featured This Month</p>
        <div className="cs-featured-strip">
          {featured.map(chef => (
            <div
              key={chef.id}
              className="cs-featured-chip"
              style={{ background: `linear-gradient(135deg, ${chef.avatarColor[0]}, ${chef.avatarColor[1]})` }}
              onClick={() => setSelected(chef)}
            >
              <span className="cs-featured-ini">{chef.initials}</span>
              <span className="cs-featured-name">{chef.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Region Filter ── */}
      <div className="cs-filters">
        {regions.map(r => (
          <button
            key={r}
            className={`cs-chip ${activeRegion === r ? "active" : ""}`}
            onClick={() => setActiveRegion(r)}
          >{r}</button>
        ))}
        <span className="cs-count">{filtered.length} cooks</span>
      </div>

      {/* ── Cards Grid ── */}
      <div className="cs-grid">
        {filtered.map(chef => (
          <div key={chef.id} className="cs-card" onClick={() => setSelected(chef)}>
            {chef.featured && <div className="cs-card-badge">⭐ Featured</div>}

            {/* Avatar */}
            <div
              className="cs-avatar"
              style={{ background: `linear-gradient(135deg, ${chef.avatarColor[0]}, ${chef.avatarColor[1]})` }}
            >
              <span className="cs-avatar-initials">{chef.initials}</span>
              <div className="cs-avatar-ring" />
            </div>

            <div className="cs-card-body">
              <h3 className="cs-card-name">{chef.name}</h3>
              <p className="cs-card-specialty">{chef.specialty}</p>
              <p className="cs-card-region">📍 {chef.region}</p>
              <p className="cs-card-bio">{chef.bio}</p>

              {/* Recipes + Years stats */}
              <div className="cs-card-stats">
                <div className="cs-stat">
                  <span className="cs-stat-val">{chef.recipes}</span>
                  <span className="cs-stat-label">Recipes</span>
                </div>
                <div className="cs-stat-divider" />
                <div className="cs-stat">
                  <span className="cs-stat-val">{chef.years}y</span>
                  <span className="cs-stat-label">Experience</span>
                </div>
              </div>

              {/* Top recipes chips */}
              <div className="cs-card-recipes">
                {chef.topRecipes.slice(0, 3).map(r => (
                  <span key={r} className="cs-recipe-chip">{r}</span>
                ))}
              </div>

              <div className="cs-card-cta">View profile →</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Detail Modal ── */}
      {selected && (
        <div className="cs-overlay" onClick={() => setSelected(null)}>
          <div className="cs-modal" onClick={e => e.stopPropagation()}>

            {/* Modal header */}
            <div
              className="cs-modal-banner"
              style={{ background: `linear-gradient(135deg, ${selected.avatarColor[0]}, ${selected.avatarColor[1]})` }}
            >
              <div className="cs-modal-avatar">{selected.initials}</div>
              <button className="cs-modal-close" onClick={() => setSelected(null)}>×</button>
            </div>

            <div className="cs-modal-body">
              <div className="cs-modal-head">
                <div>
                  <h2 className="cs-modal-name">{selected.name}</h2>
                  <p className="cs-modal-specialty">{selected.specialty}</p>
                  <p className="cs-modal-region">📍 {selected.region} · {selected.years} years of experience</p>
                </div>
              </div>

              {selected.award && (
                <div className="cs-award">
                  🏆 {selected.award}
                </div>
              )}

              <p className="cs-modal-bio">{selected.bio}</p>

              <div className="cs-modal-section">
                <h3>🍽️ Contributed Recipes ({selected.recipes} total)</h3>
                <div className="cs-modal-recipes">
                  {selected.topRecipes.map(r => (
                    <span key={r} className="cs-recipe-chip lg">{r}</span>
                  ))}
                </div>
              </div>

              <div className="cs-modal-stats">
                <div className="cs-modal-stat">
                  <span className="cs-modal-stat-val">{selected.recipes}</span>
                  <span className="cs-modal-stat-label">Recipes Contributed</span>
                </div>
                <div className="cs-modal-stat">
                  <span className="cs-modal-stat-val">{selected.years}</span>
                  <span className="cs-modal-stat-label">Years Cooking</span>
                </div>
                <div className="cs-modal-stat">
                  <span className="cs-modal-stat-val">{selected.featured ? "Yes" : "—"}</span>
                  <span className="cs-modal-stat-label">Featured Cook</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}