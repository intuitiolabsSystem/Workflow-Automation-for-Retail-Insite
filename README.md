# 🧯 Retail Insite — AI Proposal Assistant

A client-facing chatbot built by **Intuitio Labs** for **Retail Insite**, allowing Karolyn Dale and the Retail Insite team to explore and ask questions about the AI Workflow Automation proposal at their own pace.

---

## What It Does

This chatbot acts as an always-available guide to the Intuitio Labs proposal. It answers questions about the three automation modules, investment figures, timelines, system integrations, and next steps — without requiring a call with the Intuitio Labs team.

---

## Project Structure

```
/
├── src/
│   └── App.js          # Main chatbot UI + PROJECT_CONTEXT knowledge base
├── public/
│   └── intuitio_logo_white.svg
├── package.json
└── README.md
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Create React App or Vite) |
| AI Model | Anthropic Claude (`claude-sonnet-4-20250514`) |
| API | Anthropic Messages API (`/v1/messages`) |
| Styling | Inline CSS (no external UI library) |

---

## Getting Started

### 1. Clone the repo

```bash
git clone <your-repo-url>
cd retail-insite-chatbot
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up your Anthropic API key

This app calls the Anthropic API directly from the client. You have two options:

**Option A — Environment variable via a proxy (recommended for production):**

Set up a lightweight backend proxy that injects the API key server-side, then update the fetch URL in `App.js`:

```js
const res = await fetch("/api/chat", { ... });
```

**Option B — Direct client call (development only):**

Add your API key to a `.env` file:

```
REACT_APP_ANTHROPIC_API_KEY=sk-ant-...
```

Then update the fetch headers in `App.js`:

```js
headers: {
  "Content-Type": "application/json",
  "x-api-key": process.env.REACT_APP_ANTHROPIC_API_KEY,
  "anthropic-version": "2023-06-01",
},
```

> ⚠️ Never expose your API key in a public-facing production build. Use a server-side proxy for any live deployment.

### 4. Run the app

```bash
npm start
```

The app runs at `http://localhost:3000`.

---

## Knowledge Base

All proposal knowledge lives in the `PROJECT_CONTEXT` constant at the top of `App.js`. It is passed as the `system` prompt to the Claude API on every request.

The context covers:

- **Who is Intuitio Labs** — studio background, delivery model, tools
- **Who is Retail Insite** — company overview, current systems, Karolyn's role
- **The three problems** — inquiry drafting, invoicing, LOI/lease drafting
- **Module 1: AI Inquiry Response** — how it works, guardrails, cost ($18,292 / 269h)
- **Module 2: Invoice Automation** — how it works, status (pending vendor), cost ($22,508 / 331h)
- **Module 3: LOI Draft Assistant** — how it works, broker adoption insight, cost ($16,660 / 245h)
- **Shared architecture** — the common platform all modules run on
- **Implementation options** — Embedded vs. Operations Console
- **Investment summary** — ~$73K total
- **Timeline & delivery** — Weeks 1–3 foundation, then parallel or sequential options
- **AI framework** — ATA (AI Tolerance Architecture) and the Intelligence Continuum
- **Next steps** — vendor confirmation, NDA, contract
- **FAQ** — 9 pre-written answers to common questions

To update the knowledge base, edit the `PROJECT_CONTEXT` string in `App.js`.

---

## Customisation

### Suggested Questions
Edit the `SUGGESTED_QUESTIONS` array in `App.js` to change the quick-access pills shown on first load.

### Branding
- Logo: Replace `public/intuitio_logo_white.svg` with your logo file
- Colors: The gold accent color is `#c9a84c` — search and replace to update
- Header title: Edit the `"Retail Insite Proposal Assistant"` string in the header JSX

### Model
The model is set to `claude-sonnet-4-20250514`. To change it, update the `model` field in the API call inside `sendMessage()`.

---

## Deployment

This is a standard React app and can be deployed to:

- **Vercel** — `vercel deploy`
- **Netlify** — drag-and-drop the `build/` folder
- **AWS S3 + CloudFront** — upload the `build/` folder and set up a distribution

For any production deployment, use a backend proxy to protect your Anthropic API key.

---

## Contact

For questions about the proposal or the build, contact:

**Deep Kalina** — deep.kalina@intuitiolabs.com  
**Intuitio Labs** — [intuitiolabs.com](https://intuitiolabs.com)
