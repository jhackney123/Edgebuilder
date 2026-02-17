"use client";

const STEPS = ["Sport", "Features", "Model", "Config", "Results"];

export default function StepIndicator({ currentStep, onStepClick }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0",
        marginBottom: "36px",
        animation: "fadeInUp 0.5s ease 0.1s both",
      }}
    >
      {STEPS.map((s, i) => (
        <div
          key={s}
          style={{
            display: "flex",
            alignItems: "center",
            flex: i < STEPS.length - 1 ? 1 : "none",
          }}
        >
          <div
            onClick={() => {
              if (i < currentStep) onStepClick(i);
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: i < currentStep ? "pointer" : "default",
              opacity: i <= currentStep ? 1 : 0.3,
              transition: "opacity 0.3s ease",
            }}
          >
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                fontWeight: 600,
                fontFamily: "'JetBrains Mono', monospace",
                background:
                  i < currentStep
                    ? "#10b981"
                    : i === currentStep
                      ? "#3b82f6"
                      : "#1e293b",
                color: i <= currentStep ? "white" : "#475569",
                transition: "all 0.3s ease",
                border:
                  i === currentStep
                    ? "2px solid rgba(59,130,246,0.4)"
                    : "2px solid transparent",
              }}
            >
              {i < currentStep ? "✓" : i + 1}
            </div>
            <span
              style={{
                fontSize: "12px",
                fontWeight: 500,
                color: i <= currentStep ? "#e2e8f0" : "#475569",
                fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: "0.5px",
              }}
            >
              {s}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div
              style={{
                flex: 1,
                height: "1px",
                margin: "0 12px",
                background: i < currentStep ? "#10b981" : "#1e293b",
                transition: "background 0.3s ease",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
