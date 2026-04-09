import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export default function EndangeredArchive() {
  /*
=========================================================
 FEATURE: Endangered Recipes Archive
=========================================================
*/

  // ✅ STEP 1 — Static data
  const recipes = [
    { id: 1, name: "Siddu", region: "Himachal Pradesh", isEndangered: true },
    { id: 2, name: "Bamboo Shoot Curry", region: "Northeast India", isEndangered: true },
    { id: 3, name: "Khar", region: "Assam", isEndangered: true },
    { id: 4, name: "Dal Baati", region: "Rajasthan", isEndangered: false },
    { id: 5, name: "Patrode", region: "Karnataka", isEndangered: true },
  ];

  // ✅ STEP 2 — Filter endangered
  const endangered = recipes.filter(r => r.isEndangered);

  return (
    <div className="page">
      {/* Header */}
      <div className="page-header">
        <Link to="/" className="page-back">← Back</Link>
        <h1 className="page-title">Endangered Recipes Archive</h1>
        <p className="page-sub">
          Preserving rare and disappearing traditional recipes from across India.
        </p>
      </div>

      {/* ✅ STEP 3 — Warning Banner */}
      <div className="todo-banner">
        ⚠️ These traditional recipes are at risk of disappearing. Help preserve them by contributing!
      </div>

      {/* ✅ STEP 4 — Cards */}
      <div className="grid">
        {endangered.map((r) => (
          <div key={r.id} className="card">
            <div className="card-img">🍲</div>

            <div className="card-body">
              <div className="card-title">{r.name}</div>
              <div className="card-sub">{r.region}</div>

              <button className="filter-btn">Contribute</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}