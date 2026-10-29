import { Frame } from './components/Frame'
import { Hero } from './components/Hero'
import { About, Contact, Education, Experience, Marquee, Projects, Stack } from './components/Sections'

export default function App() {
  return (
    <div className="relative overflow-x-clip">
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[60] focus:rounded focus:bg-card focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <Frame />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Experience />
        <Projects />
        <Stack />
        <Education />
        <Contact />
      </main>
    </div>
  )
}
