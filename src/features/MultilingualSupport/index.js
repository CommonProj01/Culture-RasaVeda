import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../api";
import "./styles.css";

export default function MultilingualSupport() {

  // =========================
  // STATE
  // =========================
  const [recipes, setRecipes] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("All");

  // =========================
  // FETCH DATA (API)
  // =========================
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await api.get("/recipes");
        
        // fallback language if missing
        const dataWithLang = response.data.map((r, index) => ({
          ...r,
          language: r.language || getLanguageByIndex(index)
        }));

        setRecipes(dataWithLang);
      } catch (err) {
        console.error("Error fetching recipes", err);
      }
    };

    fetchRecipes();
  }, []);

  // =========================
  // FALLBACK LANGUAGE (STATIC LOGIC)
  // =========================
  const getLanguageByIndex = (i) => {
    const langs = ["Tamil", "Bengali", "Marathi", "Hindi"];
    return langs[i % langs.length];
  };

  // =========================
  // FILTER LOGIC
  // =========================
  const filteredRecipes =
    selectedLanguage === "All"
      ? recipes
      : recipes.filter((r) => r.language === selectedLanguage);

  // =========================
  // UI
  // =========================
  const languages = ["All", "Tamil", "Bengali", "Marathi", "Hindi"];

  return (
    <div className="page">
      <Link to="/" className="page-back">← Back</Link>

      <div className="page-header">
        <div className="page-title">Multilingual Recipe Support</div>
        <div className="page-sub">
          Browse recipes based on language preference
        </div>
      </div>

      {/* ================= FILTER BUTTONS ================= */}
      <div className="filter-bar">
        {languages.map((lang) => (
          <button
            key={lang}
            className={`filter-btn ${selectedLanguage === lang ? "active" : ""}`}
            onClick={() => setSelectedLanguage(lang)}
          >
            {lang}
          </button>
        ))}
      </div>

      {/* ================= GRID ================= */}
      <div className="grid">
        {filteredRecipes.map((recipe) => (
          <div key={recipe.id} className="card">
            
            <div className="card-img">
              🍲
            </div>

            <div className="card-body">
              <div className="card-title">
                {recipe.name || recipe.title}
              </div>

              <div className="card-sub">
                {recipe.description || "Traditional dish"}
              </div>

              {/* LANGUAGE BADGE */}
              <span className="tag">
                {recipe.language}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}