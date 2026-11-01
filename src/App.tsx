import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Contact, Education, Experience, Projects, Stack } from './components/Sections'
import { useLang } from './theme'

export default function App() {
  const { t } = useLang()
  return (
    <div className="relative overflow-x-clip">
      <a
        href="#experience"
        className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[60] focus:rounded focus:bg-card focus:px-4 focus:py-2 focus:text-ink"
      >
        {t.skip}
      </a>
      <Header />
      <main>
        <Hero />
        <Experience />
        <Projects />
        <Stack />
        <Education />
        <Contact />
      </main>
    </div>
  )
}
