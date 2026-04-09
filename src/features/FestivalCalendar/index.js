import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export default function FestivalCalendar() {
  // STEP 2: Events dataset
  const festivalData = {
    13: {
      name: "Dussehra",
      foods: [["🍎", "Apta Leaves (Symbolic)", "Ritual"], ["🍬", "Shrikhand", "Sweet"], ["🍛", "Kadhibari", "Main Course"]]
    },
    20: {
      name: "Diwali",
      foods: [["🍬", "Kaju Katli", "Sweet"], ["🥛", "Kheer", "Dessert"], ["🧆", "Besan Ladoo", "Sweet"]]
    },
    10: {
      name: "Gudi Padwa",
      foods: [["🍃", "Neem Leaves", "Ritual"], ["🥯", "Puran Poli", "Sweet"], ["🥤", "Aam Panna", "Drink"]]
    }
  };

  // STEP 1 & 4: State for handling date click
  const [selectedDate, setSelectedDate] = useState(20); // Default to Diwali for preview

  return (
    <div className="page">
      <div className="page-header">
        <Link to="/" className="page-back">← Back to Home</Link>
        <h1 className="page-title">Festival Food Calendar</h1>
        <p className="page-sub">Click on highlighted dates to explore traditional festival dishes.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginTop: "20px" }}>
        
        {/* STEP 3: Render Calendar */}
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,153,51,0.1)", borderRadius: 14, overflow: "hidden" }}>
          <div style={{ background: "#c0392b", padding: "12px 16px", display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "#fff", fontWeight: 500 }}>October 2026</span>
            <span style={{ color: "rgba(255,255,255,0.6)" }}>‹ April ›</span>
          </div>
          <div style={{ padding: 20, display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 8 }}>
            {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
              <div key={i} style={{ textAlign: "center", fontSize: "0.8rem", color: "rgba(240,230,211,0.5)", fontWeight: "bold" }}>{d}</div>
            ))}
            {Array.from({ length: 31 }, (_, i) => {
              const day = i + 1;
              const isFestival = festivalData[day];
              return (
                <div
                  key={i}
                  onClick={() => isFestival && setSelectedDate(day)}
                  style={{
                    textAlign: "center",
                    cursor: isFestival ? "pointer" : "default",
                    padding: "10px 0",
                    borderRadius: 8,
                    transition: "0.3s",
                    background: day === selectedDate ? "#FF9933" : isFestival ? "rgba(255,153,51,0.2)" : "transparent",
                    color: day === selectedDate ? "#000" : isFestival ? "#FF9933" : "rgba(240,230,211,0.5)",
                    fontWeight: isFestival ? "bold" : "normal",
                    border: day === selectedDate ? "1px solid #FF9933" : "none"
                  }}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>

        {/* STEP 5: Display Foods List */}
        <div>
          <div style={{ fontSize: "0.9rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#FF9933", marginBottom: 15, fontWeight: "bold" }}>
            {festivalData[selectedDate]?.name || "Select a festival date"} — Traditional Dishes
          </div>
          
          {festivalData[selectedDate] ? (
            festivalData[selectedDate].foods.map(([emoji, name, type]) => (
              <div key={name} style={{ display: "flex", alignItems: "center", gap: 15, padding: "12px 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,153,51,0.2)", borderRadius: 12, marginBottom: 10 }}>
                <span style={{ fontSize: "1.8rem" }}>{emoji}</span>
                <div>
                  <div style={{ fontSize: "1rem", color: "#f5e6cc", fontWeight: 500 }}>{name}</div>
                  <span style={{ fontSize: "0.7rem", color: "#FF9933", border: "1px solid #FF9933", padding: "2px 6px", borderRadius: 4, marginTop: 4, display: "inline-block" }}>{type}</span>
                </div>
              </div>
            ))
          ) : (
            <p style={{ color: "rgba(240,230,211,0.5)" }}>Click a highlighted date on the calendar to see the menu.</p>
          )}
        </div>
      </div>
    </div>
  );
}