# welcome to Dandadan. Dandadan is my personal favorite anime.

<p align="center">
    <a href="https://github.com/zuck30">
        <img src="/public/logo.png" alt="header banner" width="800">
    </a>
</p>
This project is a cinematic, single-page anime recommendation engine. Type your vibe, pick a mood, and the oracle recommends an anime.

# Features

- **Backend:** Supabase Edge Function (`supabase/functions/recommend/index.ts`) — a Deno function that:
  - Accepts `POST { vibe, mood }` with CORS.
  - Calls DeepSeek (`deepseek-chat`) with a cinematic-oracle system prompt to get `anime_name`, `cinematic_text`, and `video_mood`.
  - Looks up the poster via the Jikan API (`api.jikan.moe/v4/anime`).
  - Returns `{ cinematic_text, anime_name, poster_url, video_mood }`.
- **Frontend:**
  - `VideoBackground` — `framer-motion` crossfade between the 6 videos based on `video_mood` (`calm→video-1`, `hype→video-2`, `action→video-3`, `mystery→video-4`, `sad→video-5`, default `video-6`), plus a heavily blurred poster color-bleed layer.
  - `HeroText` — fade/blur transitions for the cinematic line and loading state.
  - `Navbar` / `Menu` — minimal menu with mood items: `SOULMATE`, `SHIFT`, `MIRROR`, `TEARS`, `HYPE`, `PEACE`.
  - `page.tsx` — hidden vibe input opened with `/` or a click anywhere; triggers the Supabase function and wires the response to the background, text, and poster.

# Tech Stack

- **Next.js 16** (App Router, Turbopack, Tailwind CSS v4)
- **React 19**, **framer-motion**
- **Supabase** (client + Edge Functions)
- **DeepSeek** (chat completions) and **Jikan** (for anime metadata)

# Getting Started

```bash
npm install
cp env.example .env.local
# edit .env.local with your Supabase and DeepSeek keys
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

# Environment variables

| Variable | Required | Where used |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | yes | `src/lib/supabase.ts` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | yes | `src/lib/supabase.ts` |
| `DEEPSEEK_API_KEY` | yes | `supabase/functions/recommend/index.ts` (Deno env) |

Deploy the edge function to Supabase:

```bash
supabase functions deploy recommend
supabase secrets set DEEPSEEK_API_KEY=your-key
```

# Project Structure

```
dandadan/
├── public/
│   ├── logo.png            # favicon + wordmark
│   └── videos/video-1..6.mp4
├── src/
│   ├── app/
│   │   ├── layout.tsx      # fonts, metadata, favicon
│   │   ├── page.tsx        # state, API wiring, hidden vibe input
│   │   └── globals.css     # dark base, grain overlay, overflow hidden
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Menu.tsx
│   │   ├── HeroText.tsx
│   │   └── VideoBackground.tsx
│   └── lib/supabase.ts
├── supabase/functions/recommend/index.ts
└── env.example
```

# Build & Lint

```bash
npm run build
npm run lint
```

<p align="center">
    <a href="https://github.com/zuck30">
        <img src="/public/shot.png" alt="header banner" width="800">
    </a>
</p>

# Credits

- Creator: **Shadrackovsky** — [GitHub](https://zuck30.github.io/zuck30/)