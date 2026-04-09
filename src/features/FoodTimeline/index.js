import React, { useState, useRef } from "react";
import "./styles.css";

const timelineData = [
  {
    era: "Indus Valley",
    period: "3300–1300 BCE",
    emoji: "🏺",
    dish: "Ancient Grains",
    desc: "Early agriculture with wheat, barley, and sesame forming staple diets. Evidence of granaries in Mohenjo-daro suggests organised food storage.",
    tags: ["Wheat", "Barley", "Sesame", "Lentils"],
    color: "era-indus",
  },
  {
    era: "Vedic Period",
    period: "1500–500 BCE",
    emoji: "🔥",
    dish: "Milk & Ghee",
    desc: "Dairy became sacred and central to both ritual and daily life. The Rigveda references soma, yava (barley), and the importance of the cow.",
    tags: ["Ghee", "Milk", "Soma", "Curd"],
    color: "era-vedic",
  },
  {
    era: "Mauryan Empire",
    period: "322–185 BCE",
    emoji: "🦚",
    dish: "Spiced Rice & Dal",
    desc: "Arthashastra documents state kitchens, food taxes, and spice trades. Ashoka promoted vegetarianism through edicts across the subcontinent.",
    tags: ["Rice", "Dal", "Turmeric", "Pepper"],
    color: "era-maurya",
  },
  {
    era: "Gupta Golden Age",
    period: "320–550 CE",
    emoji: "✨",
    dish: "Panchamrit",
    desc: "Temple cuisine flourished alongside Sanskrit texts documenting elaborate food preparations, confections, and the science of taste — Rasa.",
    tags: ["Honey", "Curd", "Sugar", "Sweets"],
    color: "era-gupta",
  },
  {
    era: "Mughal Era",
    period: "1526–1857 CE",
    emoji: "🕌",
    dish: "Biryani & Kebabs",
    desc: "Persian and Central Asian culinary arts fused with Indian spices. Dum cooking, korma, and fragrant rice dishes were perfected in royal kitchens.",
    tags: ["Biryani", "Saffron", "Kebab", "Rosewater"],
    color: "era-mughal",
  },
  {
    era: "Colonial Period",
    period: "1757–1947 CE",
    emoji: "⚓",
    dish: "Tea & Fusion",
    desc: "British rule introduced tea culture, potatoes, and chillies (via Portuguese). Anglo-Indian dishes like mulligatawny soup emerged from this exchange.",
    tags: ["Tea", "Potato", "Chilli", "Biscuits"],
    color: "era-colonial",
  },
  {
    era: "Post Independence",
    period: "1947–Present",
    emoji: "🇮🇳",
    dish: "Modern Fusion",
    desc: "Globalisation and diaspora brought Indo-Chinese, fast food, and café culture. Traditional recipes are being rediscovered and celebrated anew.",
    tags: ["Fusion", "Street Food", "Craft", "Revival"],
    color: "era-modern",
  },
];

const HistoricalFoodTimeline = () => {
  const [selected, setSelected] = useState(null);
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 300, behavior: "smooth" });
    }
  };

  return (
    <div className="ft-page">
      {/* Header */}
      <div className="ft-header">
        <span className="ft-eyebrow">📜 Culinary History</span>
        <h1 className="ft-title">
          Historical <span className="ft-accent">Food Timeline</span>
        </h1>
        <p className="ft-sub">
          A journey through 5,000 years of Indian culinary evolution — from
          Indus Valley granaries to contemporary fusion kitchens.
        </p>
      </div>

      {/* Timeline Controls */}
      <div className="ft-controls">
        <p className="ft-hint">Scroll or use arrows to explore eras</p>
        <div className="ft-arrows">
          <button className="ft-arrow-btn" onClick={() => scroll(-1)} aria-label="Scroll left">←</button>
          <button className="ft-arrow-btn" onClick={() => scroll(1)} aria-label="Scroll right">→</button>
        </div>
      </div>

      {/* Timeline Track */}
      <div className="ft-track-wrap">
        {/* Baseline rule */}
        <div className="ft-baseline" />

        <div className="ft-timeline" ref={scrollRef}>
          {timelineData.map((item, index) => (
            <div
              key={index}
              className={`ft-item ${selected?.era === item.era ? "active" : ""}`}
              onClick={() => setSelected(selected?.era === item.era ? null : item)}
            >
              {/* Index */}
              <p className="ft-item-num">0{index + 1}</p>

              {/* Dot */}
              <div className={`ft-dot ${item.color}`}>
                <span className="ft-dot-inner" />
              </div>

              {/* Card */}
              <div className={`ft-card ${item.color}`}>
                <span className="ft-card-emoji">{item.emoji}</span>
                <p className="ft-card-period">{item.period}</p>
                <h3 className="ft-card-era">{item.era}</h3>
                <p className="ft-card-dish">✦ {item.dish}</p>
                <p className="ft-card-desc">{item.desc}</p>
                <div className="ft-card-tags">
                  {item.tags.map((t, i) => (
                    <span key={i} className="ft-tag">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile stacked view */}
      <div className="ft-mobile-list">
        {timelineData.map((item, index) => (
          <div
            key={index}
            className={`ft-mobile-item ${selected?.era === item.era ? "active" : ""}`}
            onClick={() => setSelected(selected?.era === item.era ? null : item)}
          >
            <div className="ft-mobile-left">
              <span className="ft-mobile-emoji">{item.emoji}</span>
              <div className="ft-mobile-line" />
            </div>
            <div className="ft-mobile-body">
              <p className="ft-mobile-period">{item.period}</p>
              <h3 className="ft-mobile-era">{item.era}</h3>
              <p className="ft-mobile-dish">✦ {item.dish}</p>
              <p className={`ft-mobile-desc ${selected?.era === item.era ? "show" : ""}`}>
                {item.desc}
              </p>
              <div className={`ft-card-tags ${selected?.era === item.era ? "show" : ""}`}>
                {item.tags.map((t, i) => (
                  <span key={i} className="ft-tag">{t}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoricalFoodTimeline;