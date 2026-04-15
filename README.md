# Johan Suarez — Portfolio

A personal portfolio built to feel like a mission control interface.  
3D moon, aerospace HUD, AI-powered terminal, and three real projects.

**Come see it live** → _deploying soon_

---

Built with Next.js 15 · React Three Fiber · Tailwind CSS · Gemini AI

---

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
