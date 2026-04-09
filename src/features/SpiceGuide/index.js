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
  const [selectedSpice, setSelectedSpice] = useState(null);
  const [intensityFilter, setIntensityFilter] = useState(0);
  const [flavorFilter, setFlavorFilter] = useState("");

  const spices = [
    {
      id: 1,
      name: "Turmeric",
      nameLocal: "Haldi",
      flavorProfile: "Earthy",
      flavorTag: "earthy",
      intensity: 3,
      healthProps: [
        "Anti-inflammatory",
        "Antioxidant",
        "Boosts immunity",
        "Good for skin",
      ],
      regions: ["North India", "South India", "Everywhere"],
      recipes: ["Turmeric Milk", "Chicken Curry", "Dal Tadka", "Golden Latte"],
      pairsWith: ["Cumin", "Coriander", "Black Pepper", "Ginger"],
      description:
        "Golden spice with powerful medicinal properties, essential in almost every Indian dish.",
      color: "#FFA500",
    },
    {
      id: 2,
      name: "Cumin",
      nameLocal: "Jeera",
      flavorProfile: "Warm & Earthy",
      flavorTag: "earthy",
      intensity: 4,
      healthProps: [
        "Aids digestion",
        "Rich in iron",
        "Boosts metabolism",
        "Antimicrobial",
      ],
      regions: ["Rajasthan", "Gujarat", "Punjab", "North India"],
      recipes: ["Jeera Rice", "Cumin Potatoes", "Tadka", "Chana Masala"],
      pairsWith: ["Coriander", "Turmeric", "Fennel", "Mustard"],
      description:
        "Aromatic seed that adds warmth and depth to curries, rice, and breads.",
      color: "#8B4513",
    },
    {
      id: 3,
      name: "Coriander",
      nameLocal: "Dhania",
      flavorProfile: "Citrus & Floral",
      flavorTag: "sweet",
      intensity: 2,
      healthProps: [
        "Lowers blood sugar",
        "Rich in antioxidants",
        "Good for heart",
        "Anti-fungal",
      ],
      regions: ["Pan-India", "Maharashtra", "Tamil Nadu"],
      recipes: ["Dhania Chutney", "Sambar", "Rasam", "Vegetable Curry"],
      pairsWith: ["Cumin", "Turmeric", "Garam Masala", "Mint"],
      description:
        "Fresh, lemony seeds that brighten up any dish with subtle floral notes.",
      color: "#90EE90",
    },
    {
      id: 4,
      name: "Cardamom",
      nameLocal: "Elaichi",
      flavorProfile: "Sweet & Aromatic",
      flavorTag: "sweet",
      intensity: 5,
      healthProps: [
        "Detoxifies body",
        "Improves digestion",
        "Bad breath cure",
        "Lowers BP",
      ],
      regions: ["Kerala", "Karnataka", "North East", "Hyderabad"],
      recipes: ["Chai", "Biryani", "Kheer", "Gajar Ka Halwa"],
      pairsWith: ["Cinnamon", "Clove", "Saffron", "Nutmeg"],
      description:
        "Queen of spices with intense sweet aroma, used in both sweet and savory dishes.",
      color: "#2E8B57",
    },
    {
      id: 5,
      name: "Red Chili",
      nameLocal: "Lal Mirch",
      flavorProfile: "Spicy & Pungent",
      flavorTag: "pungent",
      intensity: 5,
      healthProps: [
        "Boosts metabolism",
        "Pain relief",
        "Vitamin C rich",
        "Heart health",
      ],
      regions: ["Andhra", "Kashmir", "Rajasthan", "Maharashtra"],
      recipes: ["Vindaloo", "Chicken 65", "Spicy Curry", "Pickle"],
      pairsWith: ["Garlic", "Cumin", "Coriander", "Tamarind"],
      description:
        "Fiery spice that adds heat and vibrant red color to dishes.",
      color: "#DC143C",
    },
    {
      id: 6,
      name: "Cinnamon",
      nameLocal: "Dalchini",
      flavorProfile: "Sweet & Woody",
      flavorTag: "sweet",
      intensity: 3,
      healthProps: [
        "Anti-diabetic",
        "Anti-inflammatory",
        "Good for heart",
        "Brain booster",
      ],
      regions: ["Kerala", "Karnataka", "Mughlai cuisine"],
      recipes: ["Biryani", "Chai", "Pulao", "Desserts"],
      pairsWith: ["Cardamom", "Clove", "Nutmeg", "Star Anise"],
      description:
        "Sweet woody bark that adds warmth to rice dishes, curries, and beverages.",
      color: "#CD853F",
    },
    {
      id: 7,
      name: "Mustard",
      nameLocal: "Rai/Sarson",
      flavorProfile: "Sharp & Nutty",
      flavorTag: "pungent",
      intensity: 4,
      healthProps: [
        "Relieves pain",
        "Good for hair",
        "Boosts immunity",
        "Anti-inflammatory",
      ],
      regions: ["Bengal", "Punjab", "Rajasthan", "Gujarat"],
      recipes: ["Mustard Fish", "Sarson Ka Saag", "Pickle", "Tadka"],
      pairsWith: ["Curry Leaves", "Fenugreek", "Cumin", "Garlic"],
      description:
        "Nutty, pungent seeds that crackle in hot oil to release amazing aroma.",
      color: "#DAA520",
    },
    {
      id: 8,
      name: "Fenugreek",
      nameLocal: "Methi",
      flavorProfile: "Bitter & Sweet",
      flavorTag: "bitter",
      intensity: 3,
      healthProps: [
        "Lowers cholesterol",
        "Controls diabetes",
        "Milk production",
        "Hair growth",
      ],
      regions: ["Rajasthan", "Punjab", "Gujarat", "Kashmir"],
      recipes: ["Methi Paratha", "Methi Malai", "Pickle", "Dal"],
      pairsWith: ["Mustard", "Cumin", "Turmeric", "Asafoetida"],
      description:
        "Distinctive bitter-sweet spice, used fresh or dried in curries and breads.",
      color: "#556B2F",
    },
    {
      id: 9,
      name: "Saffron",
      nameLocal: "Kesar",
      flavorProfile: "Floral & Honey",
      flavorTag: "sweet",
      intensity: 2,
      healthProps: [
        "Mood enhancer",
        "Antioxidant",
        "Improves memory",
        "Skin health",
      ],
      regions: ["Kashmir", "Mughlai", "Hyderabadi"],
      recipes: ["Biryani", "Kesar Kheer", "Saffron Tea", "Risotto"],
      pairsWith: ["Cardamom", "Cinnamon", "Milk", "Rose"],
      description:
        "Most expensive spice with golden color and delicate floral-honey aroma.",
      color: "#FFD700",
    },
    {
      id: 10,
      name: "Ginger",
      nameLocal: "Adrak",
      flavorProfile: "Pungent & Spicy",
      flavorTag: "pungent",
      intensity: 4,
      healthProps: [
        "Nausea relief",
        "Anti-inflammatory",
        "Immune booster",
        "Digestion aid",
      ],
      regions: ["Pan-India", "Kerala", "Northeast"],
      recipes: ["Ginger Tea", "Ginger Garlic Paste", "Curries", "Pickle"],
      pairsWith: ["Garlic", "Turmeric", "Cumin", "Honey"],
      description:
        "Versatile rhizome adding warmth and zing to everything from tea to curries.",
      color: "#D2691E",
    },
    {
      id: 11,
      name: "Garlic",
      nameLocal: "Lehsun",
      flavorProfile: "Pungent & Strong",
      flavorTag: "pungent",
      intensity: 5,
      healthProps: [
        "Lowers BP",
        "Boosts immunity",
        "Anti-bacterial",
        "Heart health",
      ],
      regions: ["Pan-India", "Punjab", "Garlic-heavy cuisines"],
      recipes: ["Garlic Naan", "Garlic Curry", "Pickle", "Chutney"],
      pairsWith: ["Ginger", "Cumin", "Coriander", "Chili"],
      description:
        "Pungent bulb that forms the base of countless Indian dishes.",
      color: "#F5F5DC",
    },
    {
      id: 12,
      name: "Asafoetida",
      nameLocal: "Hing",
      flavorProfile: "Sulfuric & Umami",
      flavorTag: "pungent",
      intensity: 5,
      healthProps: [
        "Digestion aid",
        "Anti-flatulent",
        "Respiratory relief",
        "Anti-spasmodic",
      ],
      regions: ["Gujarat", "Rajasthan", "South India", "Jain cuisine"],
      recipes: ["Dal Tadka", "Sambar", "Rasam", "Vegetable Curries"],
      pairsWith: ["Turmeric", "Cumin", "Mustard", "Curry Leaves"],
      description:
        "Powerful resin with strong aroma that transforms into garlic-onion flavor when cooked.",
      color: "#A0522D",
    },
  ];

  const flavorTags = ["all", "earthy", "sweet", "pungent", "bitter"];
  const intensityLevels = [1, 2, 3, 4, 5];

  const filteredSpices = spices.filter(
    (spice) =>
      (intensityFilter === 0 || spice.intensity === intensityFilter) &&
      (flavorFilter === "" ||
        flavorFilter === "all" ||
        spice.flavorTag === flavorFilter),
  );

  const intensityLabels = {
    1: "Mild",
    2: "Gentle",
    3: "Moderate",
    4: "Strong",
    5: "Intense",
  };

  return (
    <div className="spice-page">
      <Link to="/" className="back-btn">
        ← Back to Home
      </Link>

      <div className="spice-header">
        <span className="header-icon">🌶️</span>
        <h1 className="title">
          Spice Guide & Flavor <span className="highlight">Profiles</span>
        </h1>
        <p className="subtitle">
          Explore the aromatic world of Indian spices - from earthy turmeric to
          pungent asafoetida
        </p>
      </div>

      {/* Filters Section */}
      <div className="spice-filters">
        <div className="filter-group">
          <label>🎨 Flavor Profile</label>
          <div className="flavor-tags">
            {flavorTags.map((tag) => (
              <button
                key={tag}
                className={`flavor-btn ${flavorFilter === tag ? "active" : ""}`}
                onClick={() => setFlavorFilter(tag)}
              >
                {tag === "all"
                  ? "All"
                  : tag.charAt(0).toUpperCase() + tag.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <label>🔥 Flavor Intensity Slider</label>
          <div className="intensity-slider">
            <input
              type="range"
              min="0"
              max="5"
              value={intensityFilter}
              onChange={(e) => setIntensityFilter(parseInt(e.target.value))}
              className="slider"
            />
            <div className="intensity-labels">
              <span>Any</span>
              {intensityLevels.map((level) => (
                <span key={level}>{intensityLabels[level]}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="filter-stats">
          <span className="spice-count">
            🌿 {filteredSpices.length} spices found
          </span>
          {(intensityFilter !== 0 || flavorFilter !== "") && (
            <button
              onClick={() => {
                setIntensityFilter(0);
                setFlavorFilter("");
              }}
              className="clear-filters"
            >
              Clear filters ✕
            </button>
          )}
        </div>
      </div>

      {/* Spice Cards Grid */}
      <div className="spice-grid">
        {filteredSpices.map((spice) => (
          <div
            key={spice.id}
            className="spice-card"
            onClick={() => setSelectedSpice(spice)}
          >
            <div
              className="spice-card-header"
              style={{
                background: `linear-gradient(135deg, ${spice.color}40, ${spice.color}20)`,
              }}
            >
              <div className="spice-icon">
                {spice.name === "Red Chili"
                  ? "🌶️"
                  : spice.name === "Saffron"
                    ? "🌸"
                    : "🌿"}
              </div>
              <div className="spice-intensity">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`intensity-dot ${i < spice.intensity ? "filled" : ""}`}
                    style={{
                      backgroundColor:
                        i < spice.intensity ? spice.color : "#333",
                    }}
                  ></span>
                ))}
              </div>
            </div>
            <div className="spice-card-body">
              <h3>
                {spice.name}{" "}
                <span className="local-name">{spice.nameLocal}</span>
              </h3>
              <div
                className="flavor-tag"
                style={{
                  backgroundColor: `${spice.color}20`,
                  color: spice.color,
                }}
              >
                {spice.flavorProfile}
              </div>
              <p className="spice-desc">
                {spice.description.substring(0, 80)}...
              </p>
              <div className="spice-health">
                {spice.healthProps.slice(0, 2).map((prop, i) => (
                  <span key={i} className="health-badge">
                    ✓ {prop}
                  </span>
                ))}
              </div>
              <div className="card-footer">Explore Details →</div>
            </div>
          </div>
        ))}
      </div>

      {/* Spice Detail Modal */}
      {selectedSpice && (
        <div
          className="spice-modal-overlay"
          onClick={() => setSelectedSpice(null)}
        >
          <div className="spice-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setSelectedSpice(null)}
            >
              ✕
            </button>

            <div
              className="spice-modal-header"
              style={{
                background: `linear-gradient(135deg, ${selectedSpice.color}30, ${selectedSpice.color}10)`,
              }}
            >
              <div className="spice-modal-icon">
                {selectedSpice.name === "Red Chili"
                  ? "🌶️"
                  : selectedSpice.name === "Saffron"
                    ? "🌸"
                    : "🌿"}
              </div>
              <h2>
                {selectedSpice.name}{" "}
                <span className="local-name">{selectedSpice.nameLocal}</span>
              </h2>
              <div className="intensity-bar">
                <span>Flavor Intensity: </span>
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`intensity-dot ${i < selectedSpice.intensity ? "filled" : ""}`}
                    style={{
                      backgroundColor:
                        i < selectedSpice.intensity
                          ? selectedSpice.color
                          : "#555",
                    }}
                  ></span>
                ))}
                <span className="intensity-label">
                  {intensityLabels[selectedSpice.intensity]}
                </span>
              </div>
            </div>

            <div className="spice-modal-body">
              <div className="info-section">
                <h4>📖 Flavor Profile</h4>
                <p>
                  {selectedSpice.flavorProfile} • {selectedSpice.description}
                </p>
              </div>

              <div className="info-section">
                <h4>💚 Health Properties</h4>
                <div className="health-grid">
                  {selectedSpice.healthProps.map((prop, i) => (
                    <div key={i} className="health-item">
                      ✨ {prop}
                    </div>
                  ))}
                </div>
              </div>

              <div className="sg-modal-section">
                <h3>🍽️ Common Recipes</h3>
                <div className="sg-recipe-pills">
                  {selected.recipes.map(r => (
                    <span key={r} className="sg-recipe-chip">{r}</span>
              <div className="info-section">
                <h4>📍 Regional Usage</h4>
                <div className="region-tags">
                  {selectedSpice.regions.map((region) => (
                    <span key={region} className="region-tag">
                      📍 {region}
                    </span>
                  ))}
                </div>
              </div>

              <div className="sg-modal-section">
                <h3>🤝 Pairs Well With</h3>
                <div className="sg-pairs-pills">
                  {selected.pairs.map(p => (
                    <span key={p} className="sg-pair-chip">
                      {spices.find(s => s.name === p)?.emoji || "🌿"} {p}
              <div className="info-section">
                <h4>🍽️ Common Recipes</h4>
                <div className="recipe-links">
                  {selectedSpice.recipes.map((recipe) => (
                    <span key={recipe} className="recipe-link">
                      🍲 {recipe}
                    </span>
                  ))}
                </div>
              </div>

              <div className="info-section pairing-guide">
                <h4>🤝 Pairing Guide - Best Complements</h4>
                <div className="pairing-grid">
                  {selectedSpice.pairsWith.map((pair) => (
                    <div key={pair} className="pairing-item">
                      <span className="pair-icon">➕</span>
                      <span>{pair}</span>
                    </div>
                  ))}
                </div>
                <p className="pairing-note">
                  💡 Pro tip: {selectedSpice.name} pairs beautifully with{" "}
                  {selectedSpice.pairsWith.slice(0, 2).join(" and ")} for
                  authentic Indian flavors
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
