import { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import Cursor from './components/Cursor'
import { heroState } from './heroState'
import { profile, jobs, education, featured, moreProjects, stack, practices, certificates } from './data'

gsap.registerPlugin(ScrollTrigger)

const Graph = lazy(() => import('./components/Graph'))

const base = import.meta.env.BASE_URL
const icon = (n: string) => `${base}icons/${n}.svg`

const STATEMENT =
  'I build backends that talk through events. Enterprise Java, Spring Boot, Angular and Oracle PL/SQL by day, hexagonal architecture, DDD and RabbitMQ in the services I design, and AWS in the evenings.'

const FIRST_SENTENCE = STATEMENT.split('. ')[0] + '.'

function Clock() {
  const [t, setT] = useState('')
  useEffect(() => {
    const f = () =>
      setT(new Date().toLocaleTimeString('en-GB', { timeZone: 'Europe/Madrid', hour: '2-digit', minute: '2-digit' }))
    f()
    const id = setInterval(f, 15000)
    return () => clearInterval(id)
  }, [])
  return <span className="mono">Valencia {t}</span>
}

function Magnetic({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const el = ref.current!
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - (r.left + r.width / 2)) * 0.25
      const y = (e.clientY - (r.top + r.height / 2)) * 0.25
      gsap.to(el, { x, y, duration: 0.4, ease: 'power3.out' })
    }
    const leave = () => gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1,0.4)' })
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    }
  }, [])
  return (
    <span ref={ref} className={className} style={{ display: 'inline-block' }}>
      {children}
    </span>
  )
}

export default function App() {
  const root = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState('')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ;['work', 'experience', 'stack', 'contact'].forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => {
      window.removeEventListener('scroll', onScroll)
      io.disconnect()
    }
  }, [])

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    const lenis = new Lenis({ lerp: 0.1 })
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (t: number) => lenis.raf(t * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [])

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set('.word', { opacity: 1 })
        return
      }

      gsap.from('.hero-char', { yPercent: 110, duration: 1.1, ease: 'power4.out', stagger: 0.025, delay: 0.15 })
      gsap.from('.hero-rise', { y: 24, duration: 0.8, ease: 'power3.out', delay: 0.35 })
      gsap.from('.hero-fade', { opacity: 0, y: 24, duration: 0.8, ease: 'power3.out', stagger: 0.1, delay: 0.35 })

      // the hero stays pinned while the portrait dissolves into the service graph
      gsap
        .timeline({
          scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: '+=130%',
            pin: true,
            scrub: true,
            onUpdate: (self) => {
              heroState.progress = self.progress
            },
          },
        })
        .to('.hero-inner', { opacity: 0, y: -50, ease: 'none', duration: 0.35 }, 0)
        .fromTo('.hero-after', { opacity: 0, y: 40 }, { opacity: 1, y: 0, ease: 'none', duration: 0.28 }, 0.72)

      gsap.utils.toArray<HTMLElement>('.word').forEach((w) => {
        gsap.fromTo(
          w,
          { opacity: 0.4 },
          {
            opacity: 1,
            ease: 'none',
            scrollTrigger: { trigger: w, start: 'top 85%', end: 'top 55%', scrub: true },
          },
        )
      })

      gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        })
      })

      gsap.utils.toArray<HTMLElement>('.row-line').forEach((el) => {
        gsap.from(el, {
          scaleX: 0,
          transformOrigin: 'left',
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 92%' },
        })
      })

      gsap.utils.toArray<HTMLElement>('.marquee-track').forEach((el, i) => {
        gsap.to(el, {
          xPercent: i % 2 ? 6 : -6,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
        })
      })

      const mm = gsap.matchMedia()
      mm.add('(min-width: 900px)', () => {
        const t = track.current!
        const dist = () => t.scrollWidth - window.innerWidth
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: '.work-pin',
            start: 'top top',
            end: () => `+=${dist()}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        })
        tl.to(t, { x: () => -dist(), ease: 'none' }, 0).to('.work-bar', { scaleX: 1, ease: 'none' }, 0)

        // keyboard focus on an off-screen card moves the pinned scroll to it
        const onFocus = (e: FocusEvent) => {
          const card = (e.target as HTMLElement).closest<HTMLElement>('.card')
          const st = tl.scrollTrigger
          if (!card || !st) return
          const gutter = parseFloat(getComputedStyle(t).paddingLeft)
          const p = Math.min(Math.max((card.offsetLeft - gutter) / dist(), 0), 1)
          requestAnimationFrame(() => window.scrollTo({ top: st.start + p * (st.end - st.start) }))
        }
        t.addEventListener('focusin', onFocus)
        return () => t.removeEventListener('focusin', onFocus)
      })
    }, root)
    return () => ctx.revert()
  }, [])

  const split = (s: string) =>
    s.split('').map((c, i) => (
      <span className="hero-mask" key={i}>
        <span className="hero-char">{c === ' ' ? ' ' : c}</span>
      </span>
    ))

  return (
    <div ref={root}>
      <a className="skip" href="#about">Skip to content</a>
      <Cursor />
      <header className={`top${scrolled ? ' scrolled' : ''}`}>
        <a href="#top" className="logo" aria-label="PLN, Pau López Núñez, top of page">PLN</a>
        <nav aria-label="Sections">
          {['work', 'experience', 'stack', 'contact'].map((id) => (
            <a key={id} href={`#${id}`} aria-current={active === id ? 'true' : undefined}>
              {id[0].toUpperCase() + id.slice(1)}
            </a>
          ))}
        </nav>
        <Clock />
      </header>

      <main id="top">
        <section className="hero">
          <Suspense fallback={null}><Graph /></Suspense>
          <div className="hero-inner">
            <p className="kicker hero-fade">{profile.role}</p>
            <h1 aria-label={profile.name}>
              <span className="line" aria-hidden="true">{split('Pau López')}</span>
              <span className="line" aria-hidden="true">{split('Núñez')}</span>
            </h1>
            <p className="lede hero-rise">
              Event-driven services in Java and Spring Boot, enterprise Oracle and Angular at work, and AWS on the way.
            </p>
            <div className="hero-cta hero-fade">
              <Magnetic><a className="btn" href="#work">See the work</a></Magnetic>
              <Magnetic><a className="btn ghost" href={`mailto:${profile.email}`}>Say hello</a></Magnetic>
            </div>
          </div>
          <div className="scroll mono"><span className="hero-fade">Scroll</span></div>
          <p className="hero-after" aria-hidden="true">{FIRST_SENTENCE}</p>
        </section>

        <section className="statement" id="about">
          <p>
            {STATEMENT.split(' ').map((w, i) => (
              <span className="word" key={i}>{w} </span>
            ))}
          </p>
          <div className="practices reveal">
            {practices.map((p) => (
              <span className="chip" key={p}>{p}</span>
            ))}
          </div>
        </section>

        <section className="work" id="work">
          <div className="work-pin">
            <div className="work-head">
              <h2>Three projects, built end to end.</h2>
              <div className="work-progress" aria-hidden="true"><i className="work-bar" /></div>
            </div>
            <div className="work-track" ref={track}>
              {featured.map((p) => (
                <article className="card" key={p.name} data-hover>
                  <p className="ctx">{p.context}</p>
                  <h3>{p.name}</h3>
                  <p className="sum">{p.summary}</p>
                  <ul>
                    {p.points.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                  <div className="chips">
                    {p.stack.map((s) => (
                      <span className="chip" key={s}>{s}</span>
                    ))}
                  </div>
                  <div className="links">
                    {p.links.map((l) => (
                      <a key={l.href} href={l.href} target="_blank" rel="noreferrer">{l.label} ↗</a>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="more">
          <h2 className="label reveal">More on GitHub</h2>
          <ul>
            {moreProjects.map((p) => (
              <li key={p.name} className="reveal">
                <a href={p.href} target="_blank" rel="noreferrer">
                  <span className="more-name">{p.name}</span>
                  <span className="more-text">{p.text}</span>
                  <span className="more-arrow">↗</span>
                </a>
                <i className="row-line" />
              </li>
            ))}
          </ul>
        </section>

        <section className="exp" id="experience">
          <h2 className="reveal">Where I have worked.</h2>
          {jobs.map((j) => (
            <article className="job reveal" key={j.company}>
              <i className="row-line" />
              <div className="job-meta mono">
                <span>{j.period}</span>
                <span>{j.place}</span>
              </div>
              <div className="job-body">
                <h3>{j.company}</h3>
                <p className="role">{j.role}</p>
                <p className="sum">{j.summary}</p>
                <ul>
                  {j.points.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
                <div className="chips">
                  {j.stack.map((s) => (
                    <span className="chip" key={s}>{s}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="stack" id="stack">
          <h2 className="label reveal">Stack</h2>
          {stack.map((g, i) => (
            <div className="marquee" key={g.area}>
              <p className="mono area">{g.area}</p>
              <div className="marquee-track" style={{ flexDirection: i % 2 ? 'row-reverse' : 'row' }}>
                {[...g.tools, ...g.tools].map((t, k) => (
                  <span className="tool" key={t.name + k}>
                    {t.icon && <img src={icon(t.icon)} alt="" style={t.invert ? { filter: 'invert(1)' } : undefined} />}
                    {t.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="cred">
          <div className="cred-col reveal">
            <h2 className="label">Education</h2>
            {education.map((e) => (
              <div className="edu" key={e.title}>
                <span className="mono">{e.period}</span>
                <h3>{e.title}</h3>
                <p>{e.place}. {e.note}</p>
                {e.href && <a href={e.href} target="_blank" rel="noreferrer">{e.linkLabel} ↗</a>}
              </div>
            ))}
          </div>
          <div className="cred-col reveal">
            <h2 className="label">Certifications</h2>
            {certificates.map((g) => (
              <div className="cert-group" key={g.group}>
                <h3>{g.group}</h3>
                <ul>
                  {g.items.map((c) => (
                    <li key={c.name}>
                      {c.href ? <a href={c.href} target="_blank" rel="noreferrer">{c.name}</a> : c.name}
                      <span className="mono"> {c.issuer}{c.date ? ` · ${c.date}` : ''}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="contact" id="contact">
          <h2 className="reveal">Let's build something.</h2>
          <Magnetic className="reveal">
            <a className="mail" href={`mailto:${profile.email}`}>{profile.email}</a>
          </Magnetic>
          <div className="social reveal">
            <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a>
          </div>
        </section>
      </main>

      <footer>
        <span className="mono">© {new Date().getFullYear()} Pau López Núñez</span>
        <span className="mono">Built with React, Three.js and GSAP</span>
      </footer>
    </div>
  )
}
