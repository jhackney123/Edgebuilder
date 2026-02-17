"use client";

export function SparkChart({ data, width = 400, height = 160 }) {
  if (!data || data.length < 2) return null;

  const maxY = Math.max(...data.map((d) => d.bankroll));
  const minY = Math.min(...data.map((d) => d.bankroll));
  const rangeY = maxY - minY || 1;
  const maxX = Math.max(...data.map((d) => d.game));

  const points = data
    .map((d) => {
      const x = (d.game / maxX) * width;
      const y = height - ((d.bankroll - minY) / rangeY) * (height - 20) - 10;
      return `${x},${y}`;
    })
    .join(" ");

  const areaPoints = points + ` ${width},${height} 0,${height}`;
  const startBankroll = data[0].bankroll;
  const endBankroll = data[data.length - 1].bankroll;
  const isPositive = endBankroll >= startBankroll;
  const color = isPositive ? "#10b981" : "#ef4444";
  const gradientId = `eq-grad-${isPositive ? "pos" : "neg"}`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      style={{ width: "100%", height: "100%" }}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill={`url(#${gradientId})`} />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <text
        x="4"
        y={height - 4}
        fill="#6b7280"
        fontSize="10"
        fontFamily="monospace"
      >
        ${startBankroll}
      </text>
      <text
        x={width - 4}
        y="12"
        fill={color}
        fontSize="11"
        fontFamily="monospace"
        textAnchor="end"
        fontWeight="bold"
      >
        ${endBankroll}
      </text>
    </svg>
  );
}

export function MonthlyChart({ months }) {
  const maxRoi = Math.max(...months.map((m) => Math.abs(parseFloat(m.roi))), 1);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: "6px",
        height: "120px",
        padding: "0 4px",
      }}
    >
      {months.map((m, i) => {
        const val = parseFloat(m.roi);
        const h = (Math.abs(val) / maxRoi) * 50;
        const isPos = val >= 0;
        return (
          <div
            key={i}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              flex: 1,
              justifyContent: "flex-end",
              height: "100%",
            }}
          >
            <span
              style={{
                fontSize: "9px",
                color: isPos ? "#10b981" : "#ef4444",
                fontFamily: "'JetBrains Mono', monospace",
                marginBottom: "2px",
              }}
            >
              {val > 0 ? "+" : ""}
              {val}%
            </span>
            <div
              style={{
                width: "100%",
                maxWidth: "28px",
                height: `${Math.max(h, 3)}px`,
                background: isPos
                  ? "linear-gradient(to top, rgba(16,185,129,0.3), rgba(16,185,129,0.7))"
                  : "linear-gradient(to top, rgba(239,68,68,0.7), rgba(239,68,68,0.3))",
                borderRadius: "3px 3px 0 0",
                transition: "height 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            />
            <span
              style={{
                fontSize: "9px",
                color: "#6b7280",
                marginTop: "4px",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {m.month}
            </span>
          </div>
        );
      })}
    </div>
  );
}
