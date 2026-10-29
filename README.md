# Portfolio v2

Second take on my portfolio, built as a design experiment next to [the original](https://github.com/PauLopNun/portfolio). Same content, new concept: the hero is a live graph of services passing events between them, the way my backends work.

- React 19, TypeScript, Vite
- Three.js for the hero graph, GSAP ScrollTrigger and Lenis for scroll
- Pinned horizontal scroll for projects, magnetic buttons, custom cursor
- Respects `prefers-reduced-motion`; vertical layout on mobile

```bash
npm install
npm run dev
npm run build   # BASE_PATH=/portfolio-v2/ npm run build for GitHub Pages
```
