# Portfolio v2

Second take on my portfolio, built next to [the original](https://github.com/PauLopNun/portfolio). Same content and the same neo-brutalist look (cream paper, ink outlines, hard shadows, light and dark themes), with a different hero: my portrait is made of pixels that dissolve and rebuild themselves as the GitHub mark while you scroll.

- React 19, TypeScript, Vite
- Three.js for the hero: one shader-driven particle system (portrait pixels ⇄ GitHub mark), lazy-loaded, paused off screen
- GSAP ScrollTrigger + SplitText and Lenis: pinned hero and horizontal project scroll, line-by-line headings, panel transitions, scroll-reactive marquees
- Light/dark switch (remembered), pixel-art or fine-dot portrait (`PIXEL` in `src/components/Graph.tsx`)
- Respects `prefers-reduced-motion` (static portrait, no pinned scroll); layout follows the aspect ratio (phones, tablets, landscape)

```bash
npm install
npm run dev
npm run build   # BASE_PATH=/portfolio-v2/ npm run build for GitHub Pages
```

## Deploy

`.github/workflows/pages.yml` builds with `BASE_PATH=/portfolio-v2/` and publishes `dist` to GitHub Pages on push to `main`. In the repo settings, Pages source must be "GitHub Actions". The canonical and Open Graph URLs in `index.html` assume `https://paulopnun.github.io/portfolio-v2/`.
