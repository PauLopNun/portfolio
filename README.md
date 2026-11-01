# Portfolio

Personal portfolio of Pau López Núñez, live at https://paulopnun.github.io/portfolio/. A compact, recruiter-friendly one-pager: who I am, quick links to GitHub and LinkedIn, experience, projects, stack and contact within a couple of screens. The earlier particle-portrait version is archived as [portfolio-v1](https://github.com/PauLopNun/portfolio-v1).

- React 19, TypeScript, Vite, Tailwind CSS 4, Framer Motion
- English and Spanish (`src/content.ts`), chosen from the browser language and switchable in the header
- Browser auto-translation is disabled (`translate="no"`): it rewrites text nodes React owns and breaks the page
- Light/dark themes (circle reveal) and an Animations on/off switch

```bash
npm install
npm run dev
npm run build   # BASE_PATH=/portfolio/ npm run build for GitHub Pages
```

## Deploy

`.github/workflows/pages.yml` builds with `BASE_PATH=/portfolio/` and publishes `dist` to GitHub Pages on push to `main`. Pages source must be "GitHub Actions".
