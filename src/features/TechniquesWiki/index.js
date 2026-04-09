import React, { useState } from "react";
import "./styles.css";

const techniquesData = [
  {
    name: "Dum",
    difficulty: "Medium",
    description:
      "A slow cooking technique where food is cooked in a sealed container using its own steam.",
    region: "Hyderabad, Lucknow",
    steps: ["Marinate", "Seal pot", "Cook on low flame", "Rest & serve"],
    recipes: ["Biryani", "Dum Aloo"],
  },
  {
    name: "Tadka",
    difficulty: "Easy",
    description:
      "Tempering spices in hot oil or ghee to release flavors before adding to dishes.",
    region: "All India",
    steps: ["Heat oil", "Add spices", "Let splutter", "Pour over dish"],
    recipes: ["Dal Tadka", "Sambar"],
  },
  {
    name: "Bhunao",
    difficulty: "Hard",
    description:
      "Slow frying spices and ingredients until oil separates, intensifying flavors.",
    region: "North India",
    steps: ["Heat oil", "Add masala", "Cook slowly", "Oil separates"],
    recipes: ["Chicken Curry", "Paneer Masala"],
  },
];

export default function CookingWiki() {
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  const filtered = techniquesData.filter((tech) =>
    tech.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="wiki-container">
      <h1>🍲 Traditional Cooking Techniques Wiki</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search techniques..."
        className="search-bar"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Listing */}
      <div className="list">
        {filtered.map((tech, index) => (
          <div
            key={index}
            className="card"
            onClick={() => setSelected(tech)}
          >
            <h3>{tech.name}</h3>
            <p>Difficulty: {tech.difficulty}</p>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setSelected(null)}>
              ✖
            </span>

            <h2>{selected.name}</h2>
            <p><strong>Region:</strong> {selected.region}</p>
            <p>{selected.description}</p>

            <h4>Steps:</h4>
            <div className="steps">
              {selected.steps.map((step, i) => (
                <div key={i} className="step">
                  {i + 1}
                </div>
              ))}
            </div>

            <h4>Recipes:</h4>
            <ul>
              {selected.recipes.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}