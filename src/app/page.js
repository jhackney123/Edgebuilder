"use client";

import { useState } from "react";
import StepIndicator from "./components/StepIndicator";
import { SportStep, FeatureStep, ModelStep, ConfigStep } from "./components/Steps";
import ResultsStep from "./components/ResultsStep";
import { generateBacktestResults } from "./backtest";

export default function Home() {
  const [step, setStep] = useState(0);
  const [selectedSport, setSelectedSport] = useState(null);
  const [selectedFeatures, setSelectedFeatures] = useState(["home_away", "pts_avg", "opp_pts"]);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedSeasons, setSelectedSeasons] = useState(["2022-23", "2023-24"]);
  const [testSplit, setTestSplit] = useState(20);
  const [results, setResults] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const canProceed = () => {
    if (step === 0) return selectedSport !== null;
    if (step === 1) return selectedFeatures.length >= 2;
    if (step === 2) return selectedModel !== null;
    if (step === 3) return selectedSeasons.length >= 1;
    return true;
  };

  const toggleFeature = (id) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleSeason = (s) => {
    setSelectedSeasons((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  };

  const runBacktest = () => {
    setIsRunning(true);
    setShowResults(false);
    setTimeout(() => {
      const r = generateBacktestResults(selectedFeatures, selectedModel, selectedSeasons);
      setResults(r);
      setIsRunning(false);
      setStep(4);
      setTimeout(() => setShowResults(true), 100);
    }, 2200);
  };

  const resetAll = () => {
    setStep(0);
    setSelectedSport(null);
    setSelectedFeatures(["home_away", "pts_avg", "opp_pts"]);
    setSelectedModel(null);
    setSelectedSeasons(["2022-23", "2023-24"]);
    setResults(null);
    setShowResults(false);
  };

  return (
    <div style={{ minHeight: "100vh", position: "relative", overflow: "hidden" }}>
      {/* Background dot grid */}
      <div
        style={{
          position: "fixed", inset: 0, opacity: 0.03, zIndex: 0,
          backgroundImage: "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
      {/* Accent glows */}
      <div style={{
        position: "fixed", top: "-200px", right: "-200px", width: "600px", height: "600px",
        background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)", zIndex: 0,
      }} />
      <div style={{
        position: "fixed", bottom: "-300px", left: "-100px", width: "500px", height: "500px",
        background: "radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)", zIndex: 0,
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "960px", margin: "0 auto", padding: "32px 20px" }}>
        {/* Header / brand */}
        <div style={{ marginBottom: "40px", animation: "fadeInUp 0.5s ease" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "6px" }}>
            <div style={{
              width: "36px", height: "36px", borderRadius: "10px",
              background: "linear-gradient(135deg, #3b82f6, #10b981)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "18px", fontWeight: "bold", color: "white",
              fontFamily: "'Playfair Display', serif",
            }}>
              E
            </div>
            <span style={{
              fontFamily: "'Playfair Display', serif", fontSize: "22px", fontWeight: 800,
              background: "linear-gradient(135deg, #e2e8f0, #94a3b8)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              EdgeBuilder
            </span>
          </div>
          <p style={{ color: "#64748b", fontSize: "14px", margin: 0, letterSpacing: "0.5px" }}>
            Build, train & backtest sports betting models — no code required
          </p>
        </div>

        {/* Step indicator */}
        <StepIndicator currentStep={step} onStepClick={setStep} />

        {/* Wizard steps */}
        {step === 0 && <SportStep selected={selectedSport} onSelect={setSelectedSport} />}
        {step === 1 && <FeatureStep selected={selectedFeatures} onToggle={toggleFeature} />}
        {step === 2 && <ModelStep selected={selectedModel} onSelect={setSelectedModel} />}
        {step === 3 && (
          <ConfigStep
            selectedSeasons={selectedSeasons}
            onToggleSeason={toggleSeason}
            testSplit={testSplit}
            onTestSplitChange={setTestSplit}
            selectedSport={selectedSport}
            selectedModel={selectedModel}
            featureCount={selectedFeatures.length}
          />
        )}
        {step === 4 && (
          <ResultsStep
            results={results}
            selectedModel={selectedModel}
            featureCount={selectedFeatures.length}
            seasonCount={selectedSeasons.length}
            visible={showResults}
            onReset={resetAll}
          />
        )}

        {/* Loading spinner */}
        {isRunning && (
          <div style={{
            display: "flex", flexDirection: "column", alignItems: "center",
            justifyContent: "center", padding: "80px 20px",
            animation: "fadeInUp 0.3s ease",
          }}>
            <div style={{
              width: "48px", height: "48px", borderRadius: "50%",
              border: "3px solid rgba(59,130,246,0.2)",
              borderTopColor: "#3b82f6",
              animation: "spin 0.8s linear infinite",
              marginBottom: "20px",
            }} />
            <div style={{ fontWeight: 600, fontSize: "16px", marginBottom: "6px" }}>
              Training model...
            </div>
            <div style={{ color: "#64748b", fontSize: "13px", fontFamily: "'JetBrains Mono', monospace" }}>
              Running backtest across {selectedSeasons.length} seasons
            </div>
          </div>
        )}

        {/* Navigation */}
        {!isRunning && (
          <div style={{
            display: "flex", justifyContent: "space-between",
            marginTop: "36px", paddingTop: "20px",
            borderTop: "1px solid rgba(51,65,85,0.3)",
          }}>
            {step > 0 && step < 4 ? (
              <button
                className="step-btn"
                onClick={() => setStep(step - 1)}
                style={{
                  padding: "12px 24px", borderRadius: "12px",
                  border: "1.5px solid rgba(51,65,85,0.5)",
                  background: "rgba(15,23,42,0.6)",
                  color: "#94a3b8", fontSize: "14px", fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                ← Back
              </button>
            ) : (
              <div />
            )}

            {step < 3 && (
              <button
                className="step-btn"
                onClick={() => canProceed() && setStep(step + 1)}
                disabled={!canProceed()}
                style={{
                  padding: "12px 28px", borderRadius: "12px", border: "none",
                  background: canProceed()
                    ? "linear-gradient(135deg, #3b82f6, #2563eb)"
                    : "#1e293b",
                  color: "white", fontSize: "14px", fontWeight: 600,
                  cursor: canProceed() ? "pointer" : "not-allowed",
                }}
              >
                Continue →
              </button>
            )}

            {step === 3 && (
              <button
                className="step-btn"
                onClick={() => canProceed() && runBacktest()}
                disabled={!canProceed()}
                style={{
                  padding: "12px 32px", borderRadius: "12px", border: "none",
                  background: canProceed()
                    ? "linear-gradient(135deg, #10b981, #059669)"
                    : "#1e293b",
                  color: "white", fontSize: "14px", fontWeight: 600,
                  cursor: canProceed() ? "pointer" : "not-allowed",
                  display: "flex", alignItems: "center", gap: "8px",
                }}
              >
                ⚡ Run Backtest
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
