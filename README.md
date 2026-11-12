<p align="center">
    <a href="https://github.com/zuck30">
        <img src="/public/logo.png" alt="header banner" width="400">
    </a>
</p>
this project is a cinematic, single-page anime recommendation engine. type your vibe, pick a mood, and the engine recommends an anime.

# features

- **backend:** supabase edge function (`supabase/functions/recommend/index.ts`) — a deno function that:
  - accepts `POST { vibe, mood }` with CORS.
  - calls deepseek (`deepseek-chat`) with a cinematic-oracle system prompt to get `anime_name`, `cinematic_text`, and `video_mood`.
  - looks up the poster via the jikan api (`api.jikan.moe/v4/anime`).
  - returns `{ cinematic_text, anime_name, poster_url, video_mood }`.
- **frontend:**
  - `VideoBackground` — `framer-motion` crossfade between the 6 videos based on `video_mood` (`calm→video-1`, `hype→video-2`, `action→video-3`, `mystery→video-4`, `sad→video-5`, default `video-6`), plus a heavily blurred poster color-bleed layer.
  - `HeroText` — fade/blur transitions for the cinematic line and loading state.
  - `Navbar` / `Menu` — minimal menu with mood items: `SOULMATE`, `SHIFT`, `MIRROR`, `TEARS`, `HYPE`, `PEACE`.
  - `page.tsx` — hidden vibe input opened with `/` or a click anywhere; triggers the supabase function and wires the response to the background, text, and poster.

# tech stack

- **next.js 16** (app router, turbopack, tailwind css v4)
- **react 19**, **framer-motion**
- **supabase** (client + edge functions)
- **deepseek** (chat completions) and **jikan** (for anime metadata)

# getting started

```bash
npm install
cp .env.example .env.local
# edit .env.local with your supabase and deepseek keys
npm run dev
```

open [http://localhost:3000](http://localhost:3000).

# environment variables

| variable | required | where used |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | yes | `src/lib/supabase.ts` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | yes | `src/lib/supabase.ts` |
| `DEEPSEEK_API_KEY` | yes | `supabase/functions/recommend/index.ts` (deno env) |

deploy the edge function to supabase:

```bash
supabase login
supabase link --project-ref <your-project-ref>
supabase functions deploy recommend
supabase secrets set DEEPSEEK_API_KEY=your-key
```

# deploy to vercel

the repo is ready for Vercel: `vercel.json` pins the Next.js preset, `.nvmrc` pins Node 22, and `.vercelignore` keeps local secrets and the Supabase function out of the upload.

1. **Set the environment variables** in Vercel → Project → Settings → Environment Variables (for Production, Preview and Development):

   | name | value |
   | --- | --- |
   | `NEXT_PUBLIC_SUPABASE_URL` | `https://<project-ref>.supabase.co` |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | your Supabase anon/publishable key |

   `DEEPSEEK_API_KEY` belongs to the Supabase Edge Function, not Vercel.

2. **Deploy** one of these ways:

   ```bash
   # with the Vercel CLI
   npx vercel login
   npx vercel link          # link this folder to the project
   npx vercel --prod        # create a Production deployment
   ```

   or push to `main` if the project is connected to GitHub under Settings → Git.

3. **Confirm the domain** under Project → Settings → Domains. The production domain only serves traffic after a successful Production deployment.

### troubleshooting "No Production Deployment / Your Production Domain is not serving traffic"

- Check `https://<your-domain>` headers. `x-vercel-error: DEPLOYMENT_DISABLED` with HTTP `402 Payment required` means Vercel has disabled deployments for the account/project for billing reasons — fix the payment method, spend limit or account status in the Vercel dashboard first. No code change can bypass this.
- If there is no deployment at all, the repository is probably not connected under Settings → Git (or you have only ever made preview/CLI deploys). Run `npx vercel --prod`, or connect the repo and push to `main`.
- Re-run locally to confirm the code itself is healthy:

  ```bash
  npm ci && npm run build
  ```

# project structure

```
dandadan/
├── public/
│   ├── logo.png            # favicon + wordmark
│   └── videos/video-1..6.mp4
├── src/
│   ├── app/
│   │   ├── layout.tsx      # fonts, metadata, favicon
│   │   ├── page.tsx        # state, api wiring, hidden vibe input
│   │   └── globals.css     # dark base, grain overlay, overflow hidden
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Menu.tsx
│   │   ├── HeroText.tsx
│   │   └── VideoBackground.tsx
│   └── lib/supabase.ts
├── supabase/functions/recommend/index.ts
├── .env.example
├── vercel.json
└── .nvmrc
```

# build & lint

```bash
npm run build
npm run lint
```

<p align="center">
    <a href="https://github.com/zuck30">
        <img src="/public/shot.png" alt="header banner" width="800">
    </a>
</p>

# credits

- creator: **shadrackovsky** :[github](https://zuck30.github.io/zuck30/)