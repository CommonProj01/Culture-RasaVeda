import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import { mapStates } from "./mapData";

const dishImage = (dishName, stateName) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 220">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#4f2114"/>
          <stop offset="55%" stop-color="#9b4725"/>
          <stop offset="100%" stop-color="#f0a14b"/>
        </linearGradient>
        <radialGradient id="plate" cx="50%" cy="48%" r="48%">
          <stop offset="0%" stop-color="#fff1d6"/>
          <stop offset="100%" stop-color="#f3d7ad"/>
        </radialGradient>
      </defs>
      <rect width="320" height="220" rx="28" fill="url(#bg)"/>
      <circle cx="162" cy="112" r="72" fill="url(#plate)" opacity="0.96"/>
      <circle cx="162" cy="112" r="50" fill="#c55a25"/>
      <circle cx="140" cy="98" r="14" fill="#f3c76f" opacity="0.85"/>
      <circle cx="183" cy="125" r="16" fill="#7f9b3e" opacity="0.85"/>
      <circle cx="171" cy="91" r="10" fill="#ffe4a3" opacity="0.9"/>
      <text x="24" y="184" fill="#fff7e6" font-size="24" font-family="DM Sans, Arial, sans-serif" font-weight="700">${dishName}</text>
      <text x="24" y="206" fill="#ffe0b7" font-size="14" font-family="DM Sans, Arial, sans-serif">${stateName}</text>
    </svg>
  `;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export default function FoodMap() {
  const [activeStateId, setActiveStateId] = useState("tn");
  const [hoveredStateId, setHoveredStateId] = useState(null);
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, label: "" });

  const activeState = useMemo(
    () => mapStates.find((state) => state.id === activeStateId) || null,
    [activeStateId]
  );

  const updateTooltip = (event, label) => {
    const bounds = event.currentTarget.ownerSVGElement.getBoundingClientRect();
    setTooltip({
      visible: true,
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
      label,
    });
  };

  const hideTooltip = () => {
    setTooltip((current) => ({ ...current, visible: false }));
  };

  return (
    <div className="food-map-page">
      <div className="food-map-shell">
        <div className="food-map-header">
          <Link to="/" className="page-back">Back to home</Link>
          <p className="food-map-kicker">Regional Discovery</p>
          <h1 className="food-map-title">Interactive Food Map of India</h1>
          <p className="food-map-intro">
            Hover over a state to preview it and click to open a recipe panel with regional
            signatures, story snippets, and a direct route into the recipe collection.
          </p>
        </div>

        <div className="food-map-layout">
          <section className="india-map-card">
            <div className="india-map-copy">
              <div>
                <p className="map-overline">SVG Atlas</p>
                <h2>Hover to glow, click to explore</h2>
              </div>
              <p>
                This stylized India map keeps every state interactive and easy to scan on both
                desktop and mobile.
              </p>
            </div>

            <div className="india-map-stage">
              <svg
                className="india-map-svg"
                viewBox="0 0 620 760"
                role="img"
                aria-label="Interactive SVG map of India with selectable states"
              >
                <defs>
                  <filter id="stateGlow" x="-60%" y="-60%" width="220%" height="220%">
                    <feDropShadow dx="0" dy="0" stdDeviation="7" floodColor="#ffd089" floodOpacity="0.75" />
                  </filter>
                </defs>

                <path
                  className="india-map-backdrop"
                  d="M122 34 L212 58 L256 118 L332 158 L424 190 L520 230 L582 322 L548 450 L478 570 L414 708 L274 732 L182 658 L126 564 L74 420 L58 284 L84 162 Z"
                />

                {mapStates.map((state) => {
                  const isActive = state.id === activeStateId;
                  const isHovered = state.id === hoveredStateId;

                  return (
                    <g
                      key={state.id}
                      className={`india-state ${isActive ? "is-active" : ""} ${isHovered ? "is-hovered" : ""}`}
                      transform={`translate(${state.x} ${state.y}) rotate(${state.rotate || 0})`}
                      onClick={() => setActiveStateId(state.id)}
                      onMouseEnter={(event) => {
                        setHoveredStateId(state.id);
                        updateTooltip(event, state.name);
                      }}
                      onMouseMove={(event) => updateTooltip(event, state.name)}
                      onMouseLeave={() => {
                        setHoveredStateId(null);
                        hideTooltip();
                      }}
                      onFocus={() => {
                        setHoveredStateId(state.id);
                        setTooltip({
                          visible: true,
                          x: state.x + state.width / 2,
                          y: state.y - 14,
                          label: state.name,
                        });
                      }}
                      onBlur={() => {
                        setHoveredStateId(null);
                        hideTooltip();
                      }}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          setActiveStateId(state.id);
                        }
                      }}
                      role="button"
                      tabIndex={0}
                      aria-label={`Select ${state.name}`}
                      aria-pressed={isActive}
                    >
                      <rect
                        width={state.width}
                        height={state.height}
                        rx="15"
                        ry="15"
                        filter={isHovered ? "url(#stateGlow)" : undefined}
                      />
                      <text x={state.width / 2} y={state.height / 2 + 4}>
                        {state.name
                          .split(" ")
                          .map((word) => word[0])
                          .join("")
                          .slice(0, 3)}
                      </text>
                    </g>
                  );
                })}
              </svg>

              <div
                className={`map-tooltip ${tooltip.visible ? "visible" : ""}`}
                style={{ left: tooltip.x, top: tooltip.y }}
              >
                {tooltip.label}
              </div>
            </div>
          </section>

          <aside className={`dish-panel ${activeState ? "is-open" : ""}`}>
            <div className="dish-panel-header">
              <div>
                <p className="panel-overline">Selected State</p>
                <h2>{activeState ? activeState.name : "Choose a state"}</h2>
              </div>
              <button
                type="button"
                className="panel-close"
                onClick={() => setActiveStateId(null)}
                aria-label="Close dish panel"
              >
                ×
              </button>
            </div>

            {activeState ? (
              <>
                <p className="dish-panel-copy">
                  Signature dishes from {activeState.name}, presented as quick recipe cards you can
                  extend into full cooking pages later.
                </p>
                <div className="dish-card-stack">
                  {activeState.dishes.map((dish) => (
                    <article key={dish.name} className="dish-card">
                      <img
                        src={dishImage(dish.name, activeState.name)}
                        alt={`${dish.name} from ${activeState.name}`}
                        className="dish-card-image"
                      />
                      <div className="dish-card-body">
                        <h3>{dish.name}</h3>
                        <p>{dish.description}</p>
                        <Link to={dish.recipeUrl} className="dish-card-link">
                          View full recipe
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </>
            ) : (
              <div className="dish-panel-empty">
                <p>Select any state on the map to open its recipe panel.</p>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
