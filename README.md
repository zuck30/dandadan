<p align="center">
    <a href="https://github.com/zuck30">
        <img src="/public/logo.png" alt="dandadan logo" width="200">
    </a>
</p>

<h3 align="center">pick a mood. get an anime that fits.</h3>

<p align="center">
    a cinematic, single-page anime recommendation engine powered by deepseek, supabase edge functions, and the jikan api.
</p>

<p align="center">
    <a href="https://nextjs.org"><img src="https://img.shields.io/badge/next.js-16-000000?style=flat-square&logo=nextdotjs&logoColor=white" alt="next.js 16"></a>
    <a href="https://react.dev"><img src="https://img.shields.io/badge/react-19-20232a?style=flat-square&logo=react&logoColor=61dafb" alt="react 19"></a>
    <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/typescript-5-3178c6?style=flat-square&logo=typescript&logoColor=white" alt="typescript 5"></a>
    <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/tailwind%20css-4-06b6d4?style=flat-square&logo=tailwindcss&logoColor=white" alt="tailwind css 4"></a>
    <a href="https://supabase.com"><img src="https://img.shields.io/badge/supabase-edge%20functions-3ecf8e?style=flat-square&logo=supabase&logoColor=white" alt="supabase edge functions"></a>
    <a href="https://www.framer.com/motion"><img src="https://img.shields.io/badge/framer%20motion-14-0055ff?style=flat-square&logo=framer&logoColor=white" alt="framer motion 14"></a>
    <a href="/LICENSE"><img src="https://img.shields.io/github/license/zuck30/dandadan?style=flat-square&color=3da639&logo=opensourceinitiative&logoColor=white" alt="license mit"></a>
</p>

<p align="center">
    <a href="/public/shot.png"><img src="/public/shot.png" alt="dandadan screenshot" width="820"></a>
</p>

# features

- **cinematic background:** six looping videos crossfade with `framer-motion` based on the mood of the recommendation, with a blurred color bleed from the poster.
- **one-input interaction:** press `/` or click to open the vibe prompt, `escape` to dismiss.
- **mood menu:** pick a preset: `SOULMATE`, `SHIFT`, `MIRROR`, `TEARS`, `HYPE`, `PEACE`.
- **deepseek oracle:** returns one anime plus a short cinematic justification as json.
- **poster lookup:** the title is resolved against the jikan api for real cover art.
- **graceful degradation:** themed fallback message if supabase or the oracle is unavailable.

# quick start

```bash
git clone https://github.com/zuck30/dandadan.git
cd dandadan
npm install
cp .env.example .env.local
# fill in .env.local with your supabase keys
npm run dev
```

set `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `DEEPSEEK_API_KEY` (supabase secret) before running.

# scripts

<div align="center">

| command | description |
| --- | --- |
| `npm run dev` | start the dev server with turbopack |
| `npm run build` | create a production build |
| `npm run start` | serve the production build |
| `npm run lint` | run eslint |

</div>

# credits

built by **shadrackovsky** ([zuck30.github.io](https://zuck30.github.io/zuck30/)).

# license

released under the [mit license](LICENSE) © 2026 timothy zucker.