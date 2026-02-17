export const FEATURES = [
  { id: "home_away", label: "Home / Away", category: "Game", desc: "Home court advantage factor" },
  { id: "win_streak", label: "Win Streak", category: "Game", desc: "Current consecutive wins" },
  { id: "rest_days", label: "Rest Days", category: "Game", desc: "Days since last game" },
  { id: "h2h_record", label: "H2H Record", category: "Game", desc: "Head-to-head history" },
  { id: "pts_avg", label: "Pts / Game", category: "Offense", desc: "Average points scored" },
  { id: "fg_pct", label: "FG %", category: "Offense", desc: "Field goal percentage" },
  { id: "three_pct", label: "3PT %", category: "Offense", desc: "Three-point percentage" },
  { id: "ast_avg", label: "Assists / Game", category: "Offense", desc: "Average assists" },
  { id: "opp_pts", label: "Opp Pts / Game", category: "Defense", desc: "Opponent scoring avg" },
  { id: "reb_avg", label: "Rebounds / Game", category: "Defense", desc: "Average rebounds" },
  { id: "stl_avg", label: "Steals / Game", category: "Defense", desc: "Average steals" },
  { id: "blk_avg", label: "Blocks / Game", category: "Defense", desc: "Average blocks" },
  { id: "elo_rating", label: "ELO Rating", category: "Advanced", desc: "Dynamic team rating" },
  { id: "off_rtg", label: "Off Rating", category: "Advanced", desc: "Points per 100 possessions" },
  { id: "def_rtg", label: "Def Rating", category: "Advanced", desc: "Opp pts per 100 poss" },
  { id: "pace", label: "Pace", category: "Advanced", desc: "Possessions per game" },
];

export const MODELS = [
  { id: "logistic", label: "Logistic Regression", desc: "Simple, interpretable baseline", difficulty: "Beginner", icon: "📈" },
  { id: "random_forest", label: "Random Forest", desc: "Ensemble of decision trees", difficulty: "Intermediate", icon: "🌲" },
  { id: "xgboost", label: "XGBoost", desc: "Gradient boosted trees", difficulty: "Advanced", icon: "⚡" },
  { id: "neural_net", label: "Neural Network", desc: "Deep learning approach", difficulty: "Advanced", icon: "🧠" },
];

export const SEASONS = ["2019-20", "2020-21", "2021-22", "2022-23", "2023-24", "2024-25"];

export const SPORTS = [
  { id: "nba", label: "NBA", icon: "🏀", sub: "Basketball", games: "1,230+ games/season" },
  { id: "nfl", label: "NFL", icon: "🏈", sub: "Football", games: "272 games/season" },
  { id: "mlb", label: "MLB", icon: "⚾", sub: "Baseball", games: "2,430 games/season" },
  { id: "nhl", label: "NHL", icon: "🏒", sub: "Hockey", games: "1,312 games/season" },
];

export const FEATURE_CATEGORIES = [...new Set(FEATURES.map((f) => f.category))];
