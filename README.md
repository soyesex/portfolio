# Johan Suarez — Portfolio

Personal site and engineering portfolio. Aerospace-inspired HUD interface with a 3D moon, an AI-powered terminal, and three production-grade projects.

**Live site** — deploying soon

![Portfolio screenshot — coming soon](screenshot-placeholder)

---

## What's inside

- Real-time 3D moon rendered with React Three Fiber and NASA textures, parallax-tracked to the cursor
- Interactive terminal powered by Gemini 2.5 Flash with conversation history and automatic lite-model fallback
- Three featured projects spanning full-stack web, QA automation, and desktop ERP
- Bilingual UI with automatic browser-language detection and manual ES/EN toggle
- Live COT clock in the hero section
- Aerospace mission-control aesthetic: dark background, Geist + Space Grotesk typography, HUD-style layout

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 |
| Language | TypeScript |
| 3D | React Three Fiber, Three.js |
| Styling | Tailwind CSS v4 |
| AI | Gemini 2.5 Flash (with lite fallback) |
| Fonts | Geist, Space Grotesk |
| Deploy | Vercel |

## Projects showcased

| Project | Stack | Repo |
|---|---|---|
| GYM-AI | Next.js 15, Supabase, Gemini, RAG, PWA, i18n | [soyesex/gym-ai](https://github.com/soyesex/gym-ai) |
| Playwright QA Suite | Playwright, TypeScript, GitHub Actions, Supabase local | [soyesex/playwright-qa-suite](https://github.com/soyesex/playwright-qa-suite) |
| Deluxe Cars | C#, WPF, SQL Server | [soyesex/deluxe-cars](https://github.com/soyesex/deluxe-cars) |

## Local development

```bash
cp .env.example .env.local
# fill in values in .env.local
npm install
npm run dev
```

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `GEMINI_API_KEY` | Yes | Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey) |
| `GEMINI_SYSTEM_PROMPT` | No | Full system prompt for the terminal assistant. Falls back to a generic message if not set. |

Both variables are server-side only — they are never exposed to the browser.

## Deploying to Vercel

1. Push the repo to GitHub.
2. Import the project in Vercel.
3. Go to **Settings → Environment Variables** and add:
   - `GEMINI_API_KEY` — your Gemini API key.
   - `GEMINI_SYSTEM_PROMPT` — paste the full system prompt as a single value. Vercel handles multiline values correctly in the dashboard editor, so you can paste the prompt across multiple lines directly.
4. Deploy.

> `.env.local` is gitignored. Never commit real API keys or your system prompt to the repository.
