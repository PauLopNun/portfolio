import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, ArrowUpRight, MapPin } from 'lucide-react'
import { profile } from '../data'
import { heroState } from '../heroState'
import { useMotionPref, useTheme } from '../theme'

// Three.js is only needed for the portrait scene, so it loads after the first paint.
const Graph = lazy(() => import('./Graph'))

const ease = [0.2, 0.8, 0.2, 1] as const

function Line({ text, delay }: { text: string; delay: number }) {
  const { motion: m } = useMotionPref()
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        className="block"
        initial={m === 'on' ? { y: '110%', rotate: 4 } : false}
        animate={{ y: 0, rotate: 0 }}
        transition={{ delay, duration: 0.9, ease }}
      >
        {[...text].map((c, i) => (
          <span key={i} className="inline-block transition-transform duration-200 ease-out hover:-translate-y-[0.06em] hover:-rotate-6">
            {c === ' ' ? ' ' : c}
          </span>
        ))}
      </motion.span>
    </span>
  )
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const on = () => setMatches(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [query])
  return matches
}

export function Hero() {
  const wrap = useRef<HTMLElement>(null)
  const { motion: m } = useMotionPref()
  const { resolvedTheme } = useTheme()
  const short = useMediaQuery('(max-height: 640px)') // phones held sideways or very small ones: no pinned scroll, the hero just scrolls
  const tiny = useMediaQuery('(max-height: 640px) and (max-aspect-ratio: 1/1)') // small portrait phones: the portrait gets its own room above the text
  const pinned = m === 'on' && !short

  // While the hero is pinned, scroll progress (0 → 1) drives the portrait → GitHub mark morph.
  const { scrollYProgress } = useScroll({ target: wrap, offset: ['start start', 'end end'] })
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    heroState.progress = pinned ? v : 0
  })
  useEffect(() => {
    if (!pinned) heroState.progress = 0
  }, [pinned])

  const textOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 0.1], [0, -40])
  const afterOpacity = useTransform(scrollYProgress, [0.7, 0.98], [0, 1])
  const afterY = useTransform(scrollYProgress, [0.7, 0.98], [40, 0])
  const afterVisibility = useTransform(scrollYProgress, (v) => (v > 0.7 ? 'visible' : 'hidden'))

  return (
    <section id="top" ref={wrap} className={pinned ? 'relative h-[230svh]' : 'relative'}>
      <div className={pinned ? 'sticky top-0 h-svh overflow-hidden' : 'relative min-h-svh overflow-hidden'}>
        <Suspense fallback={null}>
          <Graph key={`${resolvedTheme}-${m}`} dark={resolvedTheme === 'dark'} still={m === 'off'} />
        </Suspense>

        <motion.div
          style={pinned ? { opacity: textOpacity, y: textY } : undefined}
          className={`relative z-10 flex items-end px-6 pb-14 sm:px-12 landscape:items-center lg:px-20 landscape:pb-0 ${pinned ? 'h-full' : 'min-h-svh'} ${tiny ? 'pt-[360px]' : 'pt-28'}`}
        >
          <div className="mx-auto grid w-full max-w-7xl items-center landscape:grid-cols-[1.05fr_1fr]">
            <div className="relative" data-hero-block>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease }}
                className="inline-flex items-center gap-2 rounded-full border-2 border-line bg-card px-3 py-1 font-mono text-xs font-semibold text-ink"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
                </span>
                Open to new opportunities
              </motion.p>

              <h1 className="mt-6 [@media(max-height:720px)]:mt-4 font-display text-[clamp(2.9rem,7.4vw,7.75rem)] [@media(max-height:720px)]:text-[2.5rem] font-extrabold leading-[0.88] tracking-[-0.04em] text-ink">
                <Line text="Hi, I'm" delay={0.1} />
                <span className="display-shadow block">
                  <span className="whitespace-nowrap">
                    <Line text="Pau López." delay={0.22} />
                  </span>
                </span>
              </h1>

              <motion.div initial={{ y: 20 }} animate={{ y: 0 }} transition={{ delay: 0.3, duration: 0.7, ease }}>
                <p className="mt-8 [@media(max-height:720px)]:mt-5 max-w-lg text-lg leading-relaxed [@media(max-height:720px)]:text-base sm:text-xl [@media(max-height:720px)]:sm:text-lg">
                  A{' '}
                  <span className="inline-block -rotate-1 rounded-md bg-sun px-1.5 font-semibold text-[#17182c]">backend developer</span>{' '}
                  who builds Java and Spring Boot services, wires them together with events and ships them to the cloud.
                </p>
                <p className="mt-4 [@media(max-height:720px)]:mt-2 flex items-center gap-2 font-mono text-sm text-dim">
                  <MapPin className="h-4 w-4" aria-hidden /> València, Spain
                </p>
                <div className="mt-10 [@media(max-height:720px)]:mt-6 flex flex-wrap items-center gap-4">
                  <a href="#projects" className="btn btn-accent">
                    See my work <ArrowDown className="h-4 w-4" />
                  </a>
                  <a href="#contact" className="btn">
                    Get in touch <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {pinned && (
          <div className="pointer-events-none absolute inset-0 z-10 flex items-start px-6 pt-[60svh] sm:px-12 landscape:items-center lg:px-20 landscape:pt-0">
            <motion.div style={{ opacity: afterOpacity, y: afterY, visibility: afterVisibility }} className="pointer-events-auto mx-auto w-full max-w-7xl">
              <p className="display-shadow max-w-[14ch] font-display text-[clamp(2.4rem,6vw,5.75rem)] font-extrabold leading-[0.95] tracking-[-0.04em] text-ink">
                See the code on GitHub.
              </p>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn btn-accent mt-8">
                {profile.github.replace('https://', '')} <ArrowUpRight className="h-4 w-4" />
              </a>
            </motion.div>
          </div>
        )}

        <motion.a
          href="#about"
          style={pinned ? { opacity: textOpacity } : undefined}
          className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 font-mono text-[0.65rem] uppercase tracking-[0.35em] text-dim lg:flex"
        >
          Scroll
          <span className="relative h-12 w-px overflow-hidden bg-line/20">
            <span className="anim-scroll absolute inset-x-0 top-0 h-1/2 bg-accent" />
          </span>
        </motion.a>
      </div>
    </section>
  )
}
