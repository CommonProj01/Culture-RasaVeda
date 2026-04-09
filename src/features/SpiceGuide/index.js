import React, { useState } from "react";
import { Link } from "react-router-dom";
import { spices, spicePairings } from "../../data/spices";
import "./styles.css";

const FLAVORS = ["All", "Earthy", "Warming", "Cooling", "Pungent", "Sweet"];

const FLAVOR_META = {
  Earthy:   { color: "#a07830", bg: "rgba(160,120,48,0.12)",  icon: "🌱" },
  Warming:  { color: "#e06c2b", bg: "rgba(224,108,43,0.12)", icon: "🔥" },
  Cooling:  { color: "#3db870", bg: "rgba(61,184,112,0.12)", icon: "❄️" },
  Pungent:  { color: "#e03030", bg: "rgba(224,48,48,0.12)",  icon: "⚡" },
  Sweet:    { color: "#c97a2e", bg: "rgba(201,122,46,0.12)", icon: "🍯" },
};

export default function SpiceGuide() {
  const [activeFlavor, setActiveFlavor] = useState("All");
  const [selected, setSelected]         = useState(null);
  const [activePairing, setActivePairing] = useState(null);

  const filtered = spices.filter(s =>
    activeFlavor === "All" || s.flavor === activeFlavor
  );

  const highlightedPairs = activePairing
    ? spicePairings.find(p => p.base === activePairing)?.pairs || []
    : [];

  return (
    <div className="sg-page">
      <Link to="/" className="sg-back">← Back to Home</Link>

      {/* ── Header ── */}
      <div className="sg-header">
        <h1 className="sg-title">Spice Explorer</h1>
        <p className="sg-sub">Discover 12 essential Indian spices — flavor profiles, health benefits &amp; pairing wisdom.</p>
      </div>

      {/* ── Flavor Filter ── */}
      <div className="sg-filter-row">
        {FLAVORS.map(f => {
          const meta = FLAVOR_META[f];
          return (
            <button
              key={f}
              className={`sg-filter-btn ${activeFlavor === f ? "active" : ""}`}
              style={activeFlavor === f && meta ? {
                background: meta.bg,
                borderColor: meta.color,
                color: meta.color,
              } : {}}
              onClick={() => setActiveFlavor(f)}
            >
              {meta ? `${meta.icon} ` : ""}{f}
            </button>
          );
        })}
        <span className="sg-count">{filtered.length} spices</span>
      </div>

      {/* ── Cards Grid ── */}
      <div className="sg-grid">
        {filtered.map(spice => {
          const meta = FLAVOR_META[spice.flavor];
          const isPaired = highlightedPairs.includes(spice.name);
          return (
            <div
              key={spice.id}
              className={`sg-card ${isPaired ? "highlighted" : ""}`}
              onClick={() => setSelected(spice)}
            >
              {/* Top banner with gradient */}
              <div
                className="sg-card-banner"
                style={{ background: `linear-gradient(135deg, ${spice.color[0]}, ${spice.color[1]})` }}
              >
                <span className="sg-card-emoji">{spice.emoji}</span>
                {/* Intensity bar */}
                <div className="sg-intensity">
                  <span className="sg-intensity-label">Intensity</span>
                  <div className="sg-intensity-track">
                    <div
                      className="sg-intensity-fill"
                      style={{ width: `${spice.intensity * 10}%` }}
                    />
                  </div>
                  <span className="sg-intensity-val">{spice.intensity}/10</span>
                </div>
              </div>

              <div className="sg-card-body">
                <div className="sg-card-top">
                  <h3 className="sg-card-name">{spice.name}</h3>
                  <span
                    className="sg-flavor-tag"
                    style={{ background: meta?.bg, color: meta?.color, borderColor: meta?.color }}
                  >
                    {meta?.icon} {spice.flavor}
                  </span>
                </div>
                <p className="sg-card-region">📍 {spice.region}</p>
                <p className="sg-card-desc">{spice.description}</p>
                <div className="sg-card-recipes">
                  {spice.recipes.slice(0, 3).map(r => (
                    <span key={r} className="sg-recipe-chip">{r}</span>
                  ))}
                </div>
                <div className="sg-card-cta">Tap for details →</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Pairing Guide Section ── */}
      <div className="sg-pairing-section">
        <h2 className="sg-section-title">🤝 Spice Pairing Guide</h2>
        <p className="sg-section-sub">Select a base spice to see its best companions.</p>
        <div className="sg-pairing-chips">
          {spicePairings.map(p => (
            <button
              key={p.base}
              className={`sg-pair-btn ${activePairing === p.base ? "active" : ""}`}
              onClick={() => setActivePairing(activePairing === p.base ? null : p.base)}
            >
              {spices.find(s => s.name === p.base)?.emoji} {p.base}
            </button>
          ))}
        </div>
        {activePairing && (
          <div className="sg-pairing-result">
            <span className="sg-pairing-base">
              {spices.find(s => s.name === activePairing)?.emoji} {activePairing}
            </span>
            <span className="sg-pairing-arrow">pairs beautifully with</span>
            <div className="sg-pairing-targets">
              {spicePairings.find(p => p.base === activePairing)?.pairs.map(pair => (
                <span key={pair} className="sg-pair-target">
                  {spices.find(s => s.name === pair)?.emoji || "🌿"} {pair}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Detail Modal ── */}
      {selected && (
        <div className="sg-overlay" onClick={() => setSelected(null)}>
          <div className="sg-modal" onClick={e => e.stopPropagation()}>
            <div
              className="sg-modal-banner"
              style={{ background: `linear-gradient(135deg, ${selected.color[0]}, ${selected.color[1]})` }}
            >
              <span className="sg-modal-emoji">{selected.emoji}</span>

              {/* Intensity slider visual */}
              <div className="sg-modal-intensity">
                <span>Flavor Intensity</span>
                <div className="sg-modal-track">
                  <div className="sg-modal-fill" style={{ width: `${selected.intensity * 10}%` }} />
                  <span className="sg-modal-thumb" style={{ left: `${selected.intensity * 10}%` }} />
                </div>
                <div className="sg-modal-scale">
                  {[1,2,3,4,5,6,7,8,9,10].map(n => (
                    <span key={n} style={{ opacity: n <= selected.intensity ? 1 : 0.25 }}>|</span>
                  ))}
                </div>
              </div>

              <button className="sg-modal-close" onClick={() => setSelected(null)}>×</button>
            </div>

            <div className="sg-modal-body">
              <div className="sg-modal-head">
                <h2 className="sg-modal-title">{selected.name}</h2>
                <span
                  className="sg-flavor-tag"
                  style={{
                    background: FLAVOR_META[selected.flavor]?.bg,
                    color:      FLAVOR_META[selected.flavor]?.color,
                    borderColor: FLAVOR_META[selected.flavor]?.color,
                  }}
                >
                  {FLAVOR_META[selected.flavor]?.icon} {selected.flavor}
                </span>
              </div>
              <p className="sg-modal-region">📍 {selected.region}</p>
              <p className="sg-modal-desc">{selected.description}</p>

              <div className="sg-modal-section">
                <h3>💊 Health Properties</h3>
                <div className="sg-health-pills">
                  {selected.health.map(h => (
                    <span key={h} className="sg-health-pill">{h}</span>
                  ))}
                </div>
              </div>

              <div className="sg-modal-section">
                <h3>🍽️ Common Recipes</h3>
                <div className="sg-recipe-pills">
                  {selected.recipes.map(r => (
                    <span key={r} className="sg-recipe-chip">{r}</span>
                  ))}
                </div>
              </div>

              <div className="sg-modal-section">
                <h3>🤝 Pairs Well With</h3>
                <div className="sg-pairs-pills">
                  {selected.pairs.map(p => (
                    <span key={p} className="sg-pair-chip">
                      {spices.find(s => s.name === p)?.emoji || "🌿"} {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}