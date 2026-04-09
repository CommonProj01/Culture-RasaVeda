import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import api from "../../api"; // Commented out to use local mock data
import "./styles.css";

// --- EXPANDED MOCK DATA FOR DIETARY FILTERS ---
const mockDietaryRecipes = [
  {
    id: 1,
    name: "Sattvic Lauki Sabzi",
    region: "North India",
    community: "Traditional",
    dietaryTag: "Sattvic",
    description:
      "A simple, easily digestible bottle gourd curry made without onion or garlic.",
    jainFriendly: true,
    vegan: true,
    sattvic: true,
    glutenFree: true,
    keto: false,
    lowCarb: true,
    dairyFree: true,
    nutFree: true,
  },
  {
    id: 2,
    name: "Palak Paneer",
    region: "Punjab",
    community: "Punjabi",
    dietaryTag: "Veg",
    description:
      "Fresh spinach puree cooked with cubes of cottage cheese and mild spices.",
    jainFriendly: false,
    vegan: false,
    sattvic: false,
    glutenFree: true,
    keto: true,
    lowCarb: true,
    dairyFree: false,
    nutFree: true,
  },
  {
    id: 3,
    name: "Jain Undhiyu",
    region: "Gujarat",
    community: "Gujarati",
    dietaryTag: "Jain",
    description:
      "A seasonal vegetable medley slow-cooked without any root vegetables.",
    jainFriendly: true,
    vegan: true,
    sattvic: false,
    glutenFree: true,
    keto: false,
    lowCarb: false,
    dairyFree: true,
    nutFree: false,
  },
  {
    id: 4,
    name: "Cauliflower Rice Biryani",
    region: "Modern Indian",
    community: "Fusion",
    dietaryTag: "Keto",
    description:
      "A low-carb take on biryani using grated cauliflower instead of rice.",
    jainFriendly: false,
    vegan: true,
    sattvic: false,
    glutenFree: true,
    keto: true,
    lowCarb: true,
    dairyFree: true,
    nutFree: true,
  },
  {
    id: 5,
    name: "Moong Dal Chilla",
    region: "North India",
    community: "Traditional",
    dietaryTag: "Veg",
    description:
      "Savory lentil pancakes packed with protein and finely chopped herbs.",
    jainFriendly: true,
    vegan: true,
    sattvic: true,
    glutenFree: true,
    keto: false,
    lowCarb: true,
    dairyFree: true,
    nutFree: true,
  },
  {
    id: 6,
    name: "Almond Flour Roti",
    region: "Modern Indian",
    community: "Fusion",
    dietaryTag: "Low-Carb",
    description:
      "Soft flatbreads made completely from almond flour for a keto-friendly diet.",
    jainFriendly: true,
    vegan: true,
    sattvic: false,
    glutenFree: true,
    keto: true,
    lowCarb: true,
    dairyFree: true,
    nutFree: false,
  },
  {
    id: 7,
    name: "Coconut Chia Pudding",
    region: "Global",
    community: "Fusion",
    dietaryTag: "Vegan",
    description:
      "Overnight chia seeds soaked in fresh coconut milk with cardamom.",
    jainFriendly: true,
    vegan: true,
    sattvic: true,
    glutenFree: true,
    keto: true,
    lowCarb: true,
    dairyFree: true,
    nutFree: true,
  },
  {
    id: 8,
    name: "Sabudana Khichdi",
    region: "Maharashtra",
    community: "Marathi",
    dietaryTag: "Veg",
    description:
      "Tapioca pearls cooked with roasted peanuts and mild spices, often eaten while fasting.",
    jainFriendly: false,
    vegan: true,
    sattvic: true,
    glutenFree: true,
    keto: false,
    lowCarb: false,
    dairyFree: true,
    nutFree: false,
  },
  {
    id: 9,
    name: "Tandoori Chicken",
    region: "Punjab",
    community: "Punjabi",
    dietaryTag: "Non-Veg",
    description:
      "Chicken marinated in yogurt and spices, roasted in a clay oven.",
    jainFriendly: false,
    vegan: false,
    sattvic: false,
    glutenFree: true,
    keto: true,
    lowCarb: true,
    dairyFree: false,
    nutFree: true,
  },
  {
    id: 10,
    name: "Idli Sambar",
    region: "Tamil Nadu",
    community: "Tamil",
    dietaryTag: "Vegan",
    description:
      "Steamed rice and lentil cakes served with a hearty vegetable stew.",
    jainFriendly: false,
    vegan: true,
    sattvic: false,
    glutenFree: true,
    keto: false,
    lowCarb: false,
    dairyFree: true,
    nutFree: true,
  },
  {
    id: 11,
    name: "Baingan Bharta",
    region: "North India",
    community: "Punjabi",
    dietaryTag: "Vegan",
    description:
      "Smoky roasted eggplant mashed with tomatoes, onions, and spices.",
    jainFriendly: false,
    vegan: true,
    sattvic: false,
    glutenFree: true,
    keto: false,
    lowCarb: true,
    dairyFree: true,
    nutFree: true,
  },
  {
    id: 12,
    name: "Paneer Tikka",
    region: "North India",
    community: "Traditional",
    dietaryTag: "Veg",
    description:
      "Chunks of paneer marinated in spices and grilled in a tandoor.",
    jainFriendly: false,
    vegan: false,
    sattvic: false,
    glutenFree: true,
    keto: true,
    lowCarb: true,
    dairyFree: false,
    nutFree: true,
  },
  {
    id: 13,
    name: "Kerala Fish Curry",
    region: "Kerala",
    community: "Malayali",
    dietaryTag: "Non-Veg",
    description: "Tangy and spicy fish cooked in a rich coconut milk gravy.",
    jainFriendly: false,
    vegan: false,
    sattvic: false,
    glutenFree: true,
    keto: true,
    lowCarb: true,
    dairyFree: true,
    nutFree: true,
  },
  {
    id: 14,
    name: "Khandvi",
    region: "Gujarat",
    community: "Gujarati",
    dietaryTag: "Sattvic",
    description:
      "Delicate, tightly rolled bite-sized snacks made from gram flour and yogurt.",
    jainFriendly: true,
    vegan: false,
    sattvic: true,
    glutenFree: true,
    keto: false,
    lowCarb: false,
    dairyFree: false,
    nutFree: true,
  },
  {
    id: 15,
    name: "Masala Omelette",
    region: "Street Food",
    community: "Urban",
    dietaryTag: "Eggetarian",
    description:
      "Eggs beaten with onions, green chilies, tomatoes, and cilantro.",
    jainFriendly: false,
    vegan: false,
    sattvic: false,
    glutenFree: true,
    keto: true,
    lowCarb: true,
    dairyFree: true,
    nutFree: true,
  },
  {
    id: 16,
    name: "Poha",
    region: "Maharashtra",
    community: "Marathi",
    dietaryTag: "Veg",
    description:
      "Flattened rice sautéed with turmeric, mustard seeds, and peanuts.",
    jainFriendly: false,
    vegan: true,
    sattvic: false,
    glutenFree: true,
    keto: false,
    lowCarb: false,
    dairyFree: true,
    nutFree: false,
  },
  {
    id: 17,
    name: "Lemon Rice",
    region: "South India",
    community: "Traditional",
    dietaryTag: "Sattvic",
    description:
      "Tangy rice flavored with lemon juice, curry leaves, and mustard seeds.",
    jainFriendly: true,
    vegan: true,
    sattvic: true,
    glutenFree: true,
    keto: false,
    lowCarb: false,
    dairyFree: true,
    nutFree: false,
  },
  {
    id: 18,
    name: "Gajar Ka Halwa (Keto)",
    region: "North India",
    community: "Fusion",
    dietaryTag: "Keto",
    description:
      "A sugar-free version of the classic carrot dessert made with almond milk and stevia.",
    jainFriendly: true,
    vegan: true,
    sattvic: false,
    glutenFree: true,
    keto: true,
    lowCarb: true,
    dairyFree: true,
    nutFree: false,
  },
  {
    id: 19,
    name: "Kadhi Pakora",
    region: "Rajasthan",
    community: "Rajasthani",
    dietaryTag: "Veg",
    description:
      "Gram flour fritters simmered in a spiced, tangy yogurt sauce.",
    jainFriendly: false,
    vegan: false,
    sattvic: false,
    glutenFree: true,
    keto: false,
    lowCarb: false,
    dairyFree: false,
    nutFree: true,
  },
  {
    id: 20,
    name: "Cabbage Poriyal",
    region: "Tamil Nadu",
    community: "Tamil",
    dietaryTag: "Vegan",
    description:
      "Stir-fried cabbage with fresh grated coconut and mild spices.",
    jainFriendly: true,
    vegan: true,
    sattvic: true,
    glutenFree: true,
    keto: true,
    lowCarb: true,
    dairyFree: true,
    nutFree: true,
  },
];

export default function DietaryFilter() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDiets, setSelectedDiets] = useState({
    jain: false,
    vegan: false,
    sattvic: false,
    glutenFree: false,
    keto: false,
    lowCarb: false,
    dairyFree: false,
    nutFree: false,
  });
  const [savedPreferences, setSavedPreferences] = useState(null);
  const [showSavedToast, setShowSavedToast] = useState(false);

  // Load saved preferences from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("dietaryPreferences");
    if (saved) {
      setSelectedDiets(JSON.parse(saved));
      setSavedPreferences(JSON.parse(saved));
    }
  }, []);

  // Fetch recipes (using mock data)
  useEffect(() => {
    const fetchRecipes = () => {
      // Simulating network delay
      setTimeout(() => {
        setRecipes(mockDietaryRecipes);
        setLoading(false);
      }, 700);
    };
    fetchRecipes();
  }, []);

  // Filter recipes based on selected diets
  const filteredRecipes = recipes.filter((recipe) => {
    if (!Object.values(selectedDiets).some((v) => v === true)) return true;

    let matches = true;

    if (
      selectedDiets.jain &&
      recipe.dietaryTag !== "Jain" &&
      !recipe.jainFriendly
    )
      matches = false;
    if (selectedDiets.vegan && recipe.dietaryTag !== "Vegan" && !recipe.vegan)
      matches = false;
    if (
      selectedDiets.sattvic &&
      recipe.dietaryTag !== "Sattvic" &&
      !recipe.sattvic
    )
      matches = false;
    if (
      selectedDiets.glutenFree &&
      recipe.dietaryTag !== "Gluten-Free" &&
      !recipe.glutenFree
    )
      matches = false;
    if (selectedDiets.keto && recipe.dietaryTag !== "Keto" && !recipe.keto)
      matches = false;
    if (
      selectedDiets.lowCarb &&
      recipe.dietaryTag !== "Low-Carb" &&
      !recipe.lowCarb
    )
      matches = false;
    if (
      selectedDiets.dairyFree &&
      recipe.dietaryTag !== "Dairy-Free" &&
      !recipe.dairyFree
    )
      matches = false;
    if (
      selectedDiets.nutFree &&
      recipe.dietaryTag !== "Nut-Free" &&
      !recipe.nutFree
    )
      matches = false;

    return matches;
  });

  const activeFiltersCount =
    Object.values(selectedDiets).filter(Boolean).length;

  // Toggle individual diet filter
  const toggleDiet = (diet) => {
    setSelectedDiets((prev) => ({
      ...prev,
      [diet]: !prev[diet],
    }));
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedDiets({
      jain: false,
      vegan: false,
      sattvic: false,
      glutenFree: false,
      keto: false,
      lowCarb: false,
      dairyFree: false,
      nutFree: false,
    });
  };

  // Save preferences to localStorage
  const savePreferences = () => {
    localStorage.setItem("dietaryPreferences", JSON.stringify(selectedDiets));
    setSavedPreferences(selectedDiets);
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 3000);
  };

  // Load saved preferences
  const loadSavedPreferences = () => {
    const saved = localStorage.getItem("dietaryPreferences");
    if (saved) {
      setSelectedDiets(JSON.parse(saved));
    }
  };

  // Check if current filters match saved preferences
  const isSaved =
    JSON.stringify(selectedDiets) === JSON.stringify(savedPreferences);

  return (
    <div className="dietary-page">
      <Link to="/" className="back-btn">
        ← Back to Home
      </Link>

      <div className="dietary-header">
        <span className="header-icon">🥗</span>
        <h1 className="title">
          Dietary Filter <span className="highlight">Explorer</span>
        </h1>
        <p className="subtitle">
          Find recipes that match your dietary preferences - Jain, Vegan,
          Sattvic, Gluten-Free & more
        </p>
      </div>

      {/* Main Filter Bar */}
      <div className="filter-bar-container">
        <div className="filter-bar-header">
          <div className="filter-title">
            <span className="filter-icon">🔍</span>
            <h3>Dietary Filters</h3>
            {activeFiltersCount > 0 && (
              <span className="active-badge">{activeFiltersCount} active</span>
            )}
          </div>
          <div className="filter-actions">
            <button onClick={clearAllFilters} className="clear-btn">
              ✕ Clear all
            </button>
            <button
              onClick={savePreferences}
              className={`save-btn ${isSaved ? "saved" : ""}`}
              disabled={isSaved}
            >
              💾 {isSaved ? "Preferences Saved" : "Save Preferences"}
            </button>
            {savedPreferences && !isSaved && (
              <button onClick={loadSavedPreferences} className="load-btn">
                ↺ Load saved
              </button>
            )}
          </div>
        </div>

        {/* Multi-select Filter Grid */}
        <div className="filters-grid">
          <div
            className={`filter-card ${selectedDiets.jain ? "active" : ""}`}
            onClick={() => toggleDiet("jain")}
          >
            <div className="filter-emoji">🕉️</div>
            <div className="filter-info">
              <h4>Jain</h4>
              <p>No root vegetables, strict vegetarian</p>
            </div>
            <div className="filter-check">{selectedDiets.jain && "✓"}</div>
          </div>

          <div
            className={`filter-card ${selectedDiets.vegan ? "active" : ""}`}
            onClick={() => toggleDiet("vegan")}
          >
            <div className="filter-emoji">🌱</div>
            <div className="filter-info">
              <h4>Vegan</h4>
              <p>No animal products</p>
            </div>
            <div className="filter-check">{selectedDiets.vegan && "✓"}</div>
          </div>

          <div
            className={`filter-card ${selectedDiets.sattvic ? "active" : ""}`}
            onClick={() => toggleDiet("sattvic")}
          >
            <div className="filter-emoji">🧘</div>
            <div className="filter-info">
              <h4>Sattvic</h4>
              <p>Pure, light, yogic diet</p>
            </div>
            <div className="filter-check">{selectedDiets.sattvic && "✓"}</div>
          </div>

          <div
            className={`filter-card ${selectedDiets.glutenFree ? "active" : ""}`}
            onClick={() => toggleDiet("glutenFree")}
          >
            <div className="filter-emoji">🌾❌</div>
            <div className="filter-info">
              <h4>Gluten-Free</h4>
              <p>No wheat, barley, rye</p>
            </div>
            <div className="filter-check">
              {selectedDiets.glutenFree && "✓"}
            </div>
          </div>

          <div
            className={`filter-card ${selectedDiets.keto ? "active" : ""}`}
            onClick={() => toggleDiet("keto")}
          >
            <div className="filter-emoji">🥑</div>
            <div className="filter-info">
              <h4>Keto</h4>
              <p>Low carb, high fat</p>
            </div>
            <div className="filter-check">{selectedDiets.keto && "✓"}</div>
          </div>

          <div
            className={`filter-card ${selectedDiets.lowCarb ? "active" : ""}`}
            onClick={() => toggleDiet("lowCarb")}
          >
            <div className="filter-emoji">📉</div>
            <div className="filter-info">
              <h4>Low-Carb</h4>
              <p>Reduced carbohydrates</p>
            </div>
            <div className="filter-check">{selectedDiets.lowCarb && "✓"}</div>
          </div>

          <div
            className={`filter-card ${selectedDiets.dairyFree ? "active" : ""}`}
            onClick={() => toggleDiet("dairyFree")}
          >
            <div className="filter-emoji">🥛❌</div>
            <div className="filter-info">
              <h4>Dairy-Free</h4>
              <p>No milk, cheese, yogurt</p>
            </div>
            <div className="filter-check">{selectedDiets.dairyFree && "✓"}</div>
          </div>

          <div
            className={`filter-card ${selectedDiets.nutFree ? "active" : ""}`}
            onClick={() => toggleDiet("nutFree")}
          >
            <div className="filter-emoji">🥜❌</div>
            <div className="filter-info">
              <h4>Nut-Free</h4>
              <p>No nuts or nut products</p>
            </div>
            <div className="filter-check">{selectedDiets.nutFree && "✓"}</div>
          </div>
        </div>

        {/* Live Count Display */}
        <div className="live-count-container">
          <div className="count-stats">
            <div className="total-recipes">
              <span className="count-number">{filteredRecipes.length}</span>
              <span className="count-text">
                {filteredRecipes.length === 1
                  ? "recipe matches"
                  : "recipes match"}{" "}
                your preferences
              </span>
            </div>
            {activeFiltersCount > 0 && (
              <div className="active-filters-list">
                {Object.entries(selectedDiets)
                  .filter(([_, v]) => v)
                  .map(([key]) => (
                    <span key={key} className="active-filter-tag">
                      {key === "jain" && "🕉️ Jain"}
                      {key === "vegan" && "🌱 Vegan"}
                      {key === "sattvic" && "🧘 Sattvic"}
                      {key === "glutenFree" && "🌾 Gluten-Free"}
                      {key === "keto" && "🥑 Keto"}
                      {key === "lowCarb" && "📉 Low-Carb"}
                      {key === "dairyFree" && "🥛 Dairy-Free"}
                      {key === "nutFree" && "🥜 Nut-Free"}
                      <button onClick={() => toggleDiet(key)}>✕</button>
                    </span>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recipe Results - Live Updates without reload */}
      <div className="results-section">
        <div className="results-header">
          <h3>🍽️ Recipe Results</h3>
          <p>Click any recipe to view details</p>
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading recipes...</p>
          </div>
        ) : filteredRecipes.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">😢</span>
            <h4>No recipes found</h4>
            <p>Try clearing some filters to see more options</p>
            <button onClick={clearAllFilters} className="empty-clear-btn">
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="recipes-grid">
            {filteredRecipes.map((recipe) => (
              <div key={recipe.id} className="recipe-card">
                <div className="recipe-badge">
                  {recipe.dietaryTag === "Non-Veg" ||
                  recipe.dietaryTag === "Eggetarian"
                    ? "🍖"
                    : "🌱"}
                </div>
                <div className="recipe-content">
                  <h3>{recipe.name}</h3>
                  <p className="recipe-meta">
                    📍 {recipe.region} • 👥 {recipe.community || "Traditional"}
                  </p>
                  <div className="recipe-dietary-tags">
                    {recipe.dietaryTag && (
                      <span className="diet-tag">{recipe.dietaryTag}</span>
                    )}
                    {recipe.jainFriendly && (
                      <span className="diet-tag jain">Jain-Friendly</span>
                    )}
                    {recipe.vegan && (
                      <span className="diet-tag vegan">Vegan</span>
                    )}
                    {recipe.sattvic && (
                      <span className="diet-tag sattvic">Sattvic</span>
                    )}
                    {recipe.glutenFree && (
                      <span className="diet-tag gluten">Gluten-Free</span>
                    )}
                    {recipe.keto && <span className="diet-tag keto">Keto</span>}
                  </div>
                  <p className="recipe-desc">
                    {recipe.description?.substring(0, 100)}...
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Save Preferences Toast */}
      {showSavedToast && (
        <div className="toast-notification">
          <span>💾</span>
          <p>Your dietary preferences have been saved!</p>
        </div>
      )}

      {/* Dietary Info Panel */}
      <div className="dietary-info-panel">
        <h4>📚 About Dietary Categories</h4>
        <div className="info-grid">
          <div className="info-item">
            <strong>🕉️ Jain</strong>
            <p>
              No root vegetables (potatoes, onions, garlic), strict vegetarian,
              no harm to any living being
            </p>
          </div>
          <div className="info-item">
            <strong>🌱 Vegan</strong>
            <p>No animal products including dairy, eggs, honey, or gelatin</p>
          </div>
          <div className="info-item">
            <strong>🧘 Sattvic</strong>
            <p>
              Pure, light, freshly prepared foods that promote clarity and
              calmness
            </p>
          </div>
          <div className="info-item">
            <strong>🌾 Gluten-Free</strong>
            <p>
              No wheat, barley, rye, or triticale - suitable for celiac disease
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
