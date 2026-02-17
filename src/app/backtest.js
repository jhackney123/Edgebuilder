/**
 * Generates simulated backtest results based on user selections.
 * In production this would call the Python ML backend.
 */
export function generateBacktestResults(features, model, seasons) {
  const seed =
    features.length * 17 + model.charCodeAt(0) * 31 + seasons.length * 7;

  const pseudoRandom = (n) => {
    const x = Math.sin(seed + n) * 10000;
    return x - Math.floor(x);
  };

  // Model quality scales with feature count and model complexity
  const baseWinRate =
    0.48 +
    features.length * 0.012 +
    (model === "xgboost"
      ? 0.03
      : model === "random_forest"
        ? 0.02
        : model === "neural_net"
          ? 0.025
          : 0);

  const winRate = Math.min(
    0.62,
    baseWinRate + (pseudoRandom(1) - 0.5) * 0.04
  );
  const roi = (
    (winRate - 0.5) *
    2 *
    100 *
    (0.8 + pseudoRandom(2) * 0.4)
  ).toFixed(1);
  const totalBets =
    seasons.length * (140 + Math.floor(pseudoRandom(3) * 80));
  const wins = Math.floor(totalBets * winRate);
  const clv = (pseudoRandom(4) * 3 + features.length * 0.2).toFixed(1);
  const sharpe = (
    (parseFloat(roi) / 10) *
    (0.6 + pseudoRandom(5) * 0.8)
  ).toFixed(2);

  // Equity curve
  let bankroll = 1000;
  const curve = [{ game: 0, bankroll: 1000 }];
  const betSize = 10;

  for (let i = 1; i <= totalBets; i++) {
    const won = pseudoRandom(i * 7 + seed) < winRate;
    bankroll += won ? betSize * 0.91 : -betSize;
    if (i % Math.max(1, Math.floor(totalBets / 60)) === 0) {
      curve.push({ game: i, bankroll: Math.round(bankroll) });
    }
  }

  // Monthly breakdown
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  const months = monthNames.map((month, i) => {
    const mBets =
      Math.floor(totalBets / 12) +
      Math.floor((pseudoRandom(i * 3 + 10) - 0.5) * 10);
    const mWinRate = winRate + (pseudoRandom(i * 5 + 20) - 0.5) * 0.08;
    const mRoi = (
      (mWinRate - 0.5) *
      2 *
      100 *
      (0.7 + pseudoRandom(i * 2 + 30) * 0.6)
    ).toFixed(1);
    return { month, bets: mBets, winRate: (mWinRate * 100).toFixed(1), roi: mRoi };
  });

  return {
    winRate: (winRate * 100).toFixed(1),
    roi,
    totalBets,
    wins,
    losses: totalBets - wins,
    clv,
    sharpe,
    curve,
    months,
  };
}
