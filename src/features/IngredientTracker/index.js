import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./styles.css";

export default function IngredientTracker() {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();
  const INGREDIENTS = [
  {
    icon: "🌶️",
    name: "Red Chilli",
    origin: "Andhra Pradesh",
    type: "Spice",
    health: [
      "Boosts metabolism",
      "Rich in Vitamin C",
      "Improves blood circulation"
    ],
    timeline: [
      "16th century: Introduced to India by Portuguese traders",
      "Became staple in South Indian cuisine",
      "Now widely cultivated across India"
    ],
    recipes: ["Chilli Paneer", "Andhra Chicken Curry", "Mirchi Bajji"],
    flavor: ["Hot", "Pungent", "Smoky"],
    related: ["Black Pepper", "Paprika", "Cayenne"]
  },
  {
    icon: "🟡",
    name: "Turmeric",
    origin: "Kerala",
    type: "Spice",
    health: [
      "Anti-inflammatory",
      "Boosts immunity",
      "Improves skin health",
      "Natural antiseptic"
    ],
    timeline: [
      "2000 BC: Used in Ayurveda and traditional medicine",
      "Ancient India: Used in rituals and ceremonies",
      "Modern times: Recognized globally as superfood"
    ],
    recipes: ["Haldi Milk", "Vegetable Curry", "Khichdi"],
    flavor: ["Earthy", "Bitter", "Warm"],
    related: ["Ginger", "Cumin", "Mustard Seeds"]
  },
  {
    icon: "🌿",
    name: "Curry Leaf",
    origin: "Tamil Nadu & Karnataka",
    type: "Herb",
    health: [
      "Improves digestion",
      "Rich in iron",
      "Supports hair health",
      "Controls blood sugar"
    ],
    timeline: [
      "Ancient South India: Used in traditional cooking",
      "Ayurvedic medicine: Used for digestive remedies",
      "Still essential in South Indian tempering"
    ],
    recipes: ["Sambar", "Rasam", "Upma"],
    flavor: ["Citrusy", "Aromatic", "Slightly Bitter"],
    related: ["Coriander", "Mint", "Basil"]
  },
  {
    icon: "⚫",
    name: "Black Pepper",
    origin: "Kerala (Malabar Coast)",
    type: "Spice",
    health: [
      "Improves digestion",
      "Enhances nutrient absorption",
      "Rich in antioxidants"
    ],
    timeline: [
      "Ancient times: Known as 'Black Gold'",
      "Traded with Romans and Europeans",
      "Major driver of global spice trade"
    ],
    recipes: ["Pepper Chicken", "Rasam", "Pepper Soup"],
    flavor: ["Sharp", "Spicy", "Woody"],
    related: ["Clove", "Cinnamon", "Nutmeg"]
  },
  {
    icon: "🟤",
    name: "Cardamom",
    origin: "Kerala (Western Ghats)",
    type: "Spice",
    health: [
      "Aids digestion",
      "Freshens breath",
      "Supports heart health"
    ],
    timeline: [
      "Ancient India: Used in sweets and medicine",
      "Exported via spice routes",
      "Now widely used in desserts and tea"
    ],
    recipes: ["Kheer", "Biryani", "Masala Chai"],
    flavor: ["Sweet", "Aromatic", "Floral"],
    related: ["Clove", "Nutmeg", "Cinnamon"]
  },
  {
    icon: "🟠",
    name: "Saffron",
    origin: "Kashmir (Pampore)",
    type: "Spice",
    health: [
      "Improves mood",
      "Rich in antioxidants",
      "Enhances memory"
    ],
    timeline: [
      "Introduced via Persian influence",
      "Cultivated in Kashmir for centuries",
      "One of the most expensive spices in the world"
    ],
    recipes: ["Kesar Milk", "Pulao", "Kheer"],
    flavor: ["Sweet", "Floral", "Luxurious"],
    related: ["Cardamom", "Rose", "Almond"]
  },
  {
    icon: "🌾",
    name: "Basmati Rice",
    origin: "Punjab & Haryana",
    type: "Grain",
    health: [
      "Low in fat",
      "Good source of carbohydrates",
      "Gluten-free"
    ],
    timeline: [
      "Ancient India: Cultivated in Himalayan foothills",
      "Exported globally as premium rice",
      "Used in royal Mughlai cuisine"
    ],
    recipes: ["Biryani", "Pulao", "Jeera Rice"],
    flavor: ["Nutty", "Fragrant"],
    related: ["Brown Rice", "Jasmine Rice"]
  },
  {
    icon: "🥛",
    name: "Ghee",
    origin: "North India",
    type: "Dairy",
    health: [
      "Rich in healthy fats",
      "Improves digestion",
      "Boosts energy"
    ],
    timeline: [
      "Used in Vedic rituals",
      "Staple in Indian households for centuries",
      "Widely used in Ayurveda"
    ],
    recipes: ["Dal Tadka", "Halwa", "Paratha"],
    flavor: ["Rich", "Buttery", "Nutty"],
    related: ["Butter", "Paneer", "Milk"]
  }
];

const filteredData =
  filter === "All"
    ? INGREDIENTS
    : INGREDIENTS.filter(i =>
        i.type.toLowerCase() ===
        (filter === "Spices" ? "spice" :
         filter === "Grains" ? "grain" :
         filter === "Herbs" ? "herb" :
         filter === "Dairy" ? "dairy" :
         filter.toLowerCase())
      );
  /*
=========================================================
 FEATURE: Ingredient Origins Tracker
=========================================================

 GOAL:
Display ingredients and show their origin + historical timeline when clicked.

---------------------------------------------------------
 REQUIREMENTS:
1. Create a static dataset of ingredients
2. Show ingredient list/cards
3. On click → show:
   - Origin
   - Timeline of events
4. Highlight selected ingredient

---------------------------------------------------------
 IMPLEMENTATION STEPS:

STEP 1 — Create state:
  - selectedIngredient

STEP 2 — Create static dataset:
  - name, origin, timeline[]

STEP 3 — Render ingredient list

STEP 4 — On click → update selectedIngredient

STEP 5 — Render timeline view

---------------------------------------------------------
 EXPECTED OUTPUT:

✔ List of ingredients visible
✔ Clicking shows origin + timeline
✔ Selected item highlighted

---------------------------------------------------------
DO NOT:
- Use complex maps or D3
- Add backend
=========================================================
*/
  return (
    <div className="page">
      <div className="page-header">
        <Link to="/" className="page-back">← Back to Home</Link>
        <h1 className="page-title">Ingredient Origins Tracker</h1>
        <p className="page-sub">Explore where each Indian ingredient comes from, its health properties and which recipes it appears in.</p>
      </div>
      <div className="todo-banner">
        <strong>TODO — Your task</strong>
        Design an ingredient listing page and a detail page. The detail page should show origin region, health properties, spice type and link to recipes containing that ingredient.
      </div>
      <div className="filter-bar">
  {["All","Spices","Grains","Herbs","Dairy"].map(t => (
  <button
    key={t}
    className={`filter-btn ${filter === t ? "active" : ""}`}
    onClick={() => setFilter(t)}
  >
    {t}
  </button>
))}
</div>
  
<div className="grid">
  {filteredData.map(i => (
    <div
  key={i.name}
  className="card"
style={{ cursor: "pointer" }}
  onClick={() => setSelected(i)}
>
      <div className="card-img">{i.icon}</div>
      <div className="card-body">
        <div className="card-title">{i.name}</div>
        <div className="card-sub">{i.origin}</div>
        <span className="tag">{i.type}</span>
      </div>
    </div>
  ))}
</div>
{selected && (
  <div className="detail-panel">
    <h2>{selected.icon} {selected.name}</h2>

    <p>
  <strong>📍 Origin:</strong>{" "}
  <span
    className="clickable"
    onClick={() =>
      navigate("/map", { state: { region: selected.origin } })
    }
  >
    {selected.origin}
  </span>
</p>
    
    <p><strong>🏷️ Type:</strong> {selected.type}</p>

    <div>
      <strong>💊 Health Benefits:</strong>
      <ul>
        {selected.health.map(h => (
          <li key={h}>{h}</li>
        ))}
      </ul>
    </div>

    <div>
      <strong>⏳ Timeline:</strong>
      <ul>
        {selected.timeline.map(t => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </div>

    <div>
      <strong>🍛 Used In Recipes:</strong>
      <div className="recipe-tags">
        {selected.recipes.map(r => (
  <span
    key={r}
    className="tag"
    style={{ cursor: "pointer" }}
    onClick={() => navigate("/recipes")}
  >
    {r}
  </span>
))}
      </div>
    </div>

    <div>
      <strong>🎨 Flavor Profile:</strong>
      <div className="flavor-wheel">
  {selected.flavor.map((f, index) => (
    <span
      key={f}
      className="flavor"
      style={{
        transform: `rotate(${index * (360 / selected.flavor.length)}deg)
                    translate(70px)
                    rotate(-${index * (360 / selected.flavor.length)}deg)`
      }}
    >
      {f}
    </span>
  ))}
</div>
    </div>

    <div>
      <strong>🔗 Related Ingredients:</strong>
      <div className="recipe-tags">
        {selected.related.map(r => (
          <span key={r} className="tag">{r}</span>
        ))}
      </div>
    </div>
  </div>
)}
    </div>
  );
}
