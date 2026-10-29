# Portfolio v2

The same portfolio as [the original](https://github.com/PauLopNun/portfolio) (same design, same content, same menu), with a new hero: my photo is made of particles that dissolve and rebuild themselves as the GitHub logo while you scroll.

- React 19, TypeScript, Vite, Tailwind CSS 4, Framer Motion (sections ported from the original)
- Three.js for the hero only: one shader-driven particle system (portrait ⇄ GitHub mark), lazy-loaded, paused off screen, up to 3× pixel density
- Light/dark themes (circle reveal), "Motion on/off" switch, `prefers-reduced-motion` respected (static portrait, no pinned scroll)
- Layout follows the aspect ratio (phones, tablets, landscape)

```bash
npm install
npm run dev
npm run build   # BASE_PATH=/portfolio-v2/ npm run build for GitHub Pages
```

## Deploy

`.github/workflows/pages.yml` builds with `BASE_PATH=/portfolio-v2/` and publishes `dist` to GitHub Pages on push to `main`. Pages source must be "GitHub Actions".
