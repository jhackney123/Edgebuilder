# EdgeBuilder — Sports Betting ML Platform

Build, train & backtest sports betting machine learning models. No code required.

## Quick Start (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Open http://localhost:3000
```

## Deploy to Vercel (Recommended — Free)

### Option A: One-Click Deploy (Fastest)

1. Push this folder to a new GitHub repo:

   ```bash
   cd edgebuilder
   git init
   git add .
   git commit -m "Initial commit"
   gh repo create edgebuilder --public --push
   ```

   (Or create the repo manually on github.com and push to it.)

2. Go to [vercel.com](https://vercel.com) and sign up with your GitHub account.

3. Click **"Add New Project"** → Import your `edgebuilder` repo.

4. Vercel auto-detects Next.js. Click **Deploy**. Done.

5. You'll get a live URL like `edgebuilder.vercel.app` in ~60 seconds.

### Option B: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy (follow the prompts)
vercel

# Deploy to production
vercel --prod
```

## Deploy to Netlify (Alternative — Also Free)

1. Push to GitHub (same as above).
2. Go to [netlify.com](https://netlify.com) → **"Add new site"** → Import from Git.
3. Build command: `npm run build`
4. Publish directory: `.next`
5. Deploy.

## Project Structure

```
edgebuilder/
├── src/
│   └── app/
│       ├── layout.js            # Root layout, fonts, metadata
│       ├── page.js              # Main page — wizard orchestrator
│       ├── globals.css          # Global styles & animations
│       ├── constants.js         # Features, models, seasons data
│       ├── backtest.js          # Simulated backtest engine
│       └── components/
│           ├── StepIndicator.js # Progress bar
│           ├── Steps.js         # Sport, Feature, Model, Config steps
│           ├── ResultsStep.js   # Results dashboard
│           └── Charts.js        # Equity curve & monthly charts
├── package.json
├── next.config.js
└── README.md
```

## What's Included (MVP)

- **Sport selection** — NBA, NFL, MLB, NHL
- **Feature picker** — 16 features across Game, Offense, Defense, Advanced
- **Model selection** — Logistic Regression, Random Forest, XGBoost, Neural Net
- **Backtest configuration** — Season selection, train/test split slider
- **Results dashboard** — Win rate, ROI, Sharpe ratio, CLV, equity curve, monthly breakdown
- **Overfitting warning** — Responsible defaults

## Next Steps (Post-MVP Roadmap)

### Phase 1: Real Data
- Connect to sports data APIs (The Odds API, nba_api, nfl_data_py)
- Build a Python/FastAPI backend for actual model training
- Store user models in a database

### Phase 2: Core Platform
- User accounts & authentication
- Save and compare multiple models
- Walk-forward validation
- More granular feature engineering

### Phase 3: Growth
- Model marketplace (share/sell models)
- Premium data feeds (line movements, player props)
- Community features & leaderboards
- Mobile app

## Tech Stack

- **Frontend**: Next.js 14, React 18
- **Styling**: Vanilla CSS (no Tailwind dependency for simplicity)
- **Fonts**: DM Sans, Playfair Display, JetBrains Mono
- **Charts**: Custom SVG components
- **Backend (future)**: Python, FastAPI, scikit-learn, XGBoost
