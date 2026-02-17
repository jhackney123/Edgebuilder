"use client";

import { SPORTS, FEATURES, FEATURE_CATEGORIES, MODELS, SEASONS } from "../constants";

/* ------------------------------------------------------------------ */
/*  Step 0 — Sport Selection                                          */
/* ------------------------------------------------------------------ */
export function SportStep({ selected, onSelect }) {
  return (
    <div style={{ animation: "fadeInUp 0.4s ease" }}>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px", fontWeight: 700, marginBottom: "8px", color: "#f1f5f9" }}>
        Choose your sport
      </h2>
      <p style={{ color: "#64748b", marginBottom: "28px", fontSize: "14px" }}>
        Select the league you want to build a prediction model for.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "14px" }}>
        {SPORTS.map((sport) => (
          <div
            key={sport.id}
            className="card-hover"
            onClick={() => onSelect(sport.id)}
            style={{
              padding: "24px 20px",
              borderRadius: "14px",
              background: selected === sport.id
                ? "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(59,130,246,0.05))"
                : "rgba(15,23,42,0.6)",
              border: selected === sport.id
                ? "1.5px solid rgba(59,130,246,0.5)"
                : "1.5px solid rgba(51,65,85,0.5)",
              backdropFilter: "blur(8px)",
            }}
          >
            <div style={{ fontSize: "32px", marginBottom: "12px" }}>{sport.icon}</div>
            <div style={{ fontWeight: 600, fontSize: "17px", marginBottom: "2px" }}>{sport.label}</div>
            <div style={{ color: "#64748b", fontSize: "12px", fontFamily: "'JetBrains Mono', monospace" }}>
              {sport.games}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Step 1 — Feature Selection                                        */
/* ------------------------------------------------------------------ */
export function FeatureStep({ selected, onToggle }) {
  return (
    <div style={{ animation: "fadeInUp 0.4s ease" }}>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px", fontWeight: 700, marginBottom: "8px", color: "#f1f5f9" }}>
        Select features
      </h2>
      <p style={{ color: "#64748b", marginBottom: "28px", fontSize: "14px" }}>
        Pick the data points your model will use to make predictions.
        <span style={{
          display: "inline-block", marginLeft: "10px", padding: "2px 10px",
          background: "rgba(59,130,246,0.15)", borderRadius: "20px",
          fontSize: "12px", color: "#60a5fa",
          fontFamily: "'JetBrains Mono', monospace",
        }}>
          {selected.length} selected
        </span>
      </p>

      {FEATURE_CATEGORIES.map((cat) => (
        <div key={cat} style={{ marginBottom: "24px" }}>
          <div style={{
            fontSize: "11px", fontWeight: 600, color: "#475569",
            textTransform: "uppercase", letterSpacing: "1.5px",
            marginBottom: "10px", fontFamily: "'JetBrains Mono', monospace",
          }}>
            {cat}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {FEATURES.filter((f) => f.category === cat).map((f) => {
              const active = selected.includes(f.id);
              return (
                <div
                  key={f.id}
                  className="feature-chip"
                  onClick={() => onToggle(f.id)}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "10px",
                    fontSize: "13px",
                    fontWeight: 500,
                    background: active
                      ? "linear-gradient(135deg, rgba(59,130,246,0.2), rgba(16,185,129,0.1))"
                      : "rgba(15,23,42,0.6)",
                    border: active
                      ? "1.5px solid rgba(59,130,246,0.5)"
                      : "1.5px solid rgba(51,65,85,0.4)",
                    color: active ? "#93c5fd" : "#94a3b8",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  {active && <span style={{ color: "#10b981", fontSize: "14px" }}>✓</span>}
                  {f.label}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {selected.length > 0 && (
        <div style={{
          marginTop: "20px", padding: "16px 20px",
          background: "rgba(59,130,246,0.06)",
          borderRadius: "12px",
          border: "1px solid rgba(59,130,246,0.15)",
          fontSize: "13px", color: "#94a3b8",
        }}>
          💡 <strong style={{ color: "#cbd5e1" }}>Tip:</strong> Start with 3–6 features to avoid overfitting. You can always iterate.
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Step 2 — Model Selection                                          */
/* ------------------------------------------------------------------ */
export function ModelStep({ selected, onSelect }) {
  return (
    <div style={{ animation: "fadeInUp 0.4s ease" }}>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px", fontWeight: 700, marginBottom: "8px", color: "#f1f5f9" }}>
        Choose a model
      </h2>
      <p style={{ color: "#64748b", marginBottom: "28px", fontSize: "14px" }}>
        Select the machine learning algorithm to power your predictions.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "14px" }}>
        {MODELS.map((m) => (
          <div
            key={m.id}
            className="card-hover"
            onClick={() => onSelect(m.id)}
            style={{
              padding: "24px 20px",
              borderRadius: "14px",
              background: selected === m.id
                ? "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(59,130,246,0.05))"
                : "rgba(15,23,42,0.6)",
              border: selected === m.id
                ? "1.5px solid rgba(59,130,246,0.5)"
                : "1.5px solid rgba(51,65,85,0.5)",
              backdropFilter: "blur(8px)",
            }}
          >
            <div style={{ fontSize: "28px", marginBottom: "12px" }}>{m.icon}</div>
            <div style={{ fontWeight: 600, fontSize: "16px", marginBottom: "4px" }}>{m.label}</div>
            <div style={{ color: "#64748b", fontSize: "13px", marginBottom: "12px", lineHeight: 1.4 }}>{m.desc}</div>
            <span style={{
              padding: "3px 10px", borderRadius: "20px", fontSize: "11px",
              fontFamily: "'JetBrains Mono', monospace", fontWeight: 500,
              background:
                m.difficulty === "Beginner" ? "rgba(16,185,129,0.15)" :
                  m.difficulty === "Intermediate" ? "rgba(245,158,11,0.15)" : "rgba(239,68,68,0.15)",
              color:
                m.difficulty === "Beginner" ? "#34d399" :
                  m.difficulty === "Intermediate" ? "#fbbf24" : "#f87171",
            }}>
              {m.difficulty}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Step 3 — Backtest Configuration                                   */
/* ------------------------------------------------------------------ */
export function ConfigStep({
  selectedSeasons, onToggleSeason,
  testSplit, onTestSplitChange,
  selectedSport, selectedModel, featureCount,
}) {
  return (
    <div style={{ animation: "fadeInUp 0.4s ease" }}>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px", fontWeight: 700, marginBottom: "8px", color: "#f1f5f9" }}>
        Configure backtest
      </h2>
      <p style={{ color: "#64748b", marginBottom: "28px", fontSize: "14px" }}>
        Select the historical data to train and test your model against.
      </p>

      {/* Season selection */}
      <div style={{ marginBottom: "32px" }}>
        <div style={{
          fontSize: "11px", fontWeight: 600, color: "#475569",
          textTransform: "uppercase", letterSpacing: "1.5px",
          marginBottom: "12px", fontFamily: "'JetBrains Mono', monospace",
        }}>
          Training Seasons
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {SEASONS.map((s) => {
            const active = selectedSeasons.includes(s);
            return (
              <div
                key={s}
                className="feature-chip"
                onClick={() => onToggleSeason(s)}
                style={{
                  padding: "10px 20px",
                  borderRadius: "10px",
                  fontSize: "14px",
                  fontWeight: 500,
                  fontFamily: "'JetBrains Mono', monospace",
                  background: active
                    ? "linear-gradient(135deg, rgba(59,130,246,0.2), rgba(16,185,129,0.1))"
                    : "rgba(15,23,42,0.6)",
                  border: active
                    ? "1.5px solid rgba(59,130,246,0.5)"
                    : "1.5px solid rgba(51,65,85,0.4)",
                  color: active ? "#93c5fd" : "#94a3b8",
                  cursor: "pointer",
                }}
              >
                {s}
              </div>
            );
          })}
        </div>
      </div>

      {/* Test split slider */}
      <div style={{ marginBottom: "32px" }}>
        <div style={{
          fontSize: "11px", fontWeight: 600, color: "#475569",
          textTransform: "uppercase", letterSpacing: "1.5px",
          marginBottom: "12px", fontFamily: "'JetBrains Mono', monospace",
        }}>
          Test / Train Split
        </div>
        <div style={{
          padding: "20px 24px",
          background: "rgba(15,23,42,0.6)",
          borderRadius: "14px",
          border: "1.5px solid rgba(51,65,85,0.5)",
        }}>
          <input
            type="range" min="10" max="40" value={testSplit}
            onChange={(e) => onTestSplitChange(parseInt(e.target.value))}
            style={{ width: "100%", marginBottom: "12px" }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", fontFamily: "'JetBrains Mono', monospace" }}>
            <span style={{ color: "#3b82f6" }}>Train: {100 - testSplit}%</span>
            <span style={{ color: "#f59e0b" }}>Test: {testSplit}%</span>
          </div>
          <div style={{ display: "flex", marginTop: "10px", borderRadius: "6px", overflow: "hidden", height: "8px" }}>
            <div style={{ width: `${100 - testSplit}%`, background: "linear-gradient(90deg, #3b82f6, #6366f1)", transition: "width 0.3s ease" }} />
            <div style={{ width: `${testSplit}%`, background: "linear-gradient(90deg, #f59e0b, #ef4444)", transition: "width 0.3s ease" }} />
          </div>
        </div>
      </div>

      {/* Summary */}
      <div style={{
        padding: "20px 24px",
        background: "rgba(15,23,42,0.6)",
        borderRadius: "14px",
        border: "1.5px solid rgba(51,65,85,0.5)",
      }}>
        <div style={{
          fontSize: "11px", fontWeight: 600, color: "#475569",
          textTransform: "uppercase", letterSpacing: "1.5px",
          marginBottom: "14px", fontFamily: "'JetBrains Mono', monospace",
        }}>
          Model Summary
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", fontSize: "13px" }}>
          <div><span style={{ color: "#64748b" }}>Sport:</span>{" "}<span style={{ color: "#e2e8f0", fontWeight: 500 }}>{selectedSport?.toUpperCase()}</span></div>
          <div><span style={{ color: "#64748b" }}>Model:</span>{" "}<span style={{ color: "#e2e8f0", fontWeight: 500 }}>{MODELS.find((m) => m.id === selectedModel)?.label}</span></div>
          <div><span style={{ color: "#64748b" }}>Features:</span>{" "}<span style={{ color: "#e2e8f0", fontWeight: 500 }}>{featureCount} selected</span></div>
          <div><span style={{ color: "#64748b" }}>Seasons:</span>{" "}<span style={{ color: "#e2e8f0", fontWeight: 500 }}>{selectedSeasons.length} seasons</span></div>
        </div>
      </div>
    </div>
  );
}
