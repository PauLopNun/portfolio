# Portfolio v2

Second take on my portfolio, built as a design experiment next to [the original](https://github.com/PauLopNun/portfolio). Same content, new concept: the hero is a live graph of services passing events between them, the way my backends work.

- React 19, TypeScript, Vite
- Three.js for the hero graph, GSAP ScrollTrigger and Lenis for scroll
- Hero graph lazy-loaded (Three.js in its own chunk), labelled service nodes, pulses that react to the cursor or a tap, paused when off screen
- Pinned horizontal scroll for projects, magnetic buttons, custom cursor
- Respects `prefers-reduced-motion`; vertical layout on mobile

```bash
npm install
npm run dev
npm run build   # BASE_PATH=/portfolio-v2/ npm run build for GitHub Pages
```

## Deploy

`.github/workflows/pages.yml` builds with `BASE_PATH=/portfolio-v2/` and publishes `dist` to GitHub Pages on push to main/master. In the repo settings, Pages source must be "GitHub Actions". The canonical and Open Graph URLs in `index.html` assume `https://paulopnun.github.io/portfolio-v2/`.
