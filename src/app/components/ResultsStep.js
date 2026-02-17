"use client";

import { MODELS } from "../constants";
import { SparkChart, MonthlyChart } from "./Charts";

export default function ResultsStep({
  results,
  selectedModel,
  featureCount,
  seasonCount,
  visible,
  onReset,
}) {
  if (!results) return null;

  const metrics = [
    { label: "Win Rate", value: `${results.winRate}%`, color: parseFloat(results.winRate) > 52 ? "#10b981" : "#f59e0b" },
    { label: "ROI", value: `${results.roi > 0 ? "+" : ""}${results.roi}%`, color: parseFloat(results.roi) > 0 ? "#10b981" : "#ef4444" },
    { label: "Total Bets", value: results.totalBets.toLocaleString(), color: "#60a5fa" },
    { label: "CLV", value: `+${results.clv}¢`, color: "#a78bfa" },
    { label: "Sharpe", value: results.sharpe, color: parseFloat(results.sharpe) > 0.5 ? "#10b981" : "#f59e0b" },
    { label: "Record", value: `${results.wins}W-${results.losses}L`, color: "#e2e8f0" },
  ];

  const modelLabel = MODELS.find((m) => m.id === selectedModel)?.label;

  return (
    <div style={{ animation: "fadeInUp 0.4s ease" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
        <div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px", fontWeight: 700, marginBottom: "4px", color: "#f1f5f9" }}>
            Backtest Results
          </h2>
          <p style={{ color: "#64748b", fontSize: "13px", margin: 0, fontFamily: "'JetBrains Mono', monospace" }}>
            {modelLabel} · {featureCount} features · {seasonCount} seasons
          </p>
        </div>
        <button
          onClick={onReset}
          className="step-btn"
          style={{
            padding: "8px 18px", borderRadius: "10px",
            border: "1.5px solid rgba(51,65,85,0.5)",
            background: "rgba(15,23,42,0.6)", color: "#94a3b8",
            fontSize: "13px", fontWeight: 500, cursor: "pointer",
          }}
        >
          New Model
        </button>
      </div>

      {/* Key metrics */}
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "12px",
        marginBottom: "24px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transition: "all 0.5s ease",
      }}>
        {metrics.map((m, i) => (
          <div key={i} style={{
            padding: "18px 16px", borderRadius: "14px",
            background: "rgba(15,23,42,0.6)",
            border: "1.5px solid rgba(51,65,85,0.5)",
            textAlign: "center",
          }}>
            <div style={{
              fontSize: "11px", color: "#475569",
              textTransform: "uppercase", letterSpacing: "1px",
              marginBottom: "8px", fontFamily: "'JetBrains Mono', monospace",
            }}>{m.label}</div>
            <div style={{
              fontSize: "22px", fontWeight: 700, color: m.color,
              fontFamily: "'JetBrains Mono', monospace",
            }}>{m.value}</div>
          </div>
        ))}
      </div>

      {/* Equity curve */}
      <div style={{
        padding: "24px", borderRadius: "14px",
        background: "rgba(15,23,42,0.6)",
        border: "1.5px solid rgba(51,65,85,0.5)",
        marginBottom: "24px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transition: "all 0.5s ease 0.15s",
      }}>
        <div style={{
          fontSize: "11px", fontWeight: 600, color: "#475569",
          textTransform: "uppercase", letterSpacing: "1.5px",
          marginBottom: "16px", fontFamily: "'JetBrains Mono', monospace",
        }}>
          Equity Curve — $1,000 starting bankroll, flat $10 bets
        </div>
        <div style={{ height: "180px" }}>
          <SparkChart data={results.curve} />
        </div>
      </div>

      {/* Monthly breakdown */}
      <div style={{
        padding: "24px", borderRadius: "14px",
        background: "rgba(15,23,42,0.6)",
        border: "1.5px solid rgba(51,65,85,0.5)",
        marginBottom: "24px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transition: "all 0.5s ease 0.3s",
      }}>
        <div style={{
          fontSize: "11px", fontWeight: 600, color: "#475569",
          textTransform: "uppercase", letterSpacing: "1.5px",
          marginBottom: "16px", fontFamily: "'JetBrains Mono', monospace",
        }}>
          Monthly ROI Breakdown
        </div>
        <MonthlyChart months={results.months} />
      </div>

      {/* Overfitting warning */}
      <div style={{
        padding: "16px 20px", borderRadius: "12px",
        background: "rgba(245,158,11,0.08)",
        border: "1px solid rgba(245,158,11,0.2)",
        fontSize: "13px", color: "#fbbf24",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.5s ease 0.45s",
      }}>
        ⚠️ <strong>Overfitting Warning:</strong> Past performance ≠ future results.
        This backtest uses historical data that the model has been optimized against.
        Always validate with out-of-sample data before risking real capital.
      </div>
    </div>
  );
}
