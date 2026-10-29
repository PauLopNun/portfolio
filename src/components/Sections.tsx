
import { createRef, useEffect, useMemo, useRef, useState, type PointerEvent, type ReactNode, type RefObject } from "react"
import { motion, useAnimationFrame, useInView, useMotionValue, useScroll, useSpring, useTransform, useVelocity } from "framer-motion"
import { ArrowUpRight, Check, Copy, Github, Linkedin, Mail } from "lucide-react"
import { asset, certificates, education, featured, jobs, moreProjects, practices, profile, stack } from "../data"
import { useMotionPref } from "../theme"

const ease = [0.2, 0.8, 0.2, 1] as const

function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay, duration: 0.7, ease }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function SectionHead({ num, kicker, title }: { num: string; kicker: string; title: string }) {
  return (
    <Reveal className="mb-10 sm:mb-20">
      <p className="font-mono text-sm text-accent-ink">
        {num} <span className="text-dim">/ {kicker}</span>
      </p>
      <h2 className="mt-3 font-display text-[clamp(2.6rem,7vw,5.5rem)] font-extrabold leading-[0.95] tracking-[-0.035em] text-ink">
        {title}
        <span className="text-accent-ink">.</span>
      </h2>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.8, ease }}
        className="mt-6 h-[3px] w-24 origin-left rounded-full bg-mint"
      />
    </Reveal>
  )
}

function Pill({ children }: { children: ReactNode }) {
  return (
    <li className="rounded-full border-2 border-line/80 px-3 py-0.5 font-mono text-[0.72rem] font-semibold text-ink">{children}</li>
  )
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-2 text-[0.95rem] leading-relaxed">
      {items.map((p) => (
        <li key={p} className="relative pl-6 before:absolute before:left-0 before:top-[0.55em] before:h-2.5 before:w-2.5 before:rotate-45 before:border-2 before:border-line before:bg-accent">
          {p}
        </li>
      ))}
    </ul>
  )
}

const shell = "relative px-6 py-20 sm:px-12 sm:py-36 lg:px-20"
const inner = "mx-auto max-w-7xl"

/* Marquee */

export function Marquee() {
  const words = ["Java", "Spring Boot", "AWS", "Docker", "PostgreSQL", "Angular", "Oracle PL/SQL", "RabbitMQ", "Testcontainers", "Hexagonal", "DDD"]
  const row = (
    <div className="flex shrink-0 items-center">
      {words.map((w) => (
        <span key={w} className="flex items-center font-display text-3xl font-extrabold tracking-tight sm:text-5xl">
          <span className="px-6 sm:px-8">{w}</span>
          <span className="text-2xl sm:text-3xl" aria-hidden>
            ✱
          </span>
        </span>
      ))}
    </div>
  )
  return (
    <div className="relative z-10 -my-4 overflow-hidden py-10" aria-hidden>
      <div className="mx-2.5 overflow-hidden border-y-2 border-line bg-accent py-4 text-on-accent sm:mx-3.5">
        <div className="anim-marquee flex w-max">
          {row}
          {row}
        </div>
      </div>
    </div>
  )
}

/* About */

const profileJson = `{
  "name": "Pau López Núñez",
  "role": "Backend developer",
  "based_in": "València, ES",
  "loves": [
    "clear business rules",
    "intentional persistence",
    "tests that matter"
  ],
  "status": "open_to_work"
}`

function colorize(src: string) {
  return src.split("\n").map((line, i) => {
    const parts = line.split(/("[^"]*")(\s*:)?/g).filter((p) => p !== undefined && p !== "")
    return (
      <div key={i}>
        {parts.map((p, k) =>
          p.startsWith('"') ? (
            <span key={k} className={parts[k + 1]?.trim() === ":" ? "text-mint-ink" : "text-accent-ink"}>
              {p}
            </span>
          ) : (
            <span key={k}>{p}</span>
          ),
        )}
        {"​"}
      </div>
    )
  })
}

function Terminal() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-120px" })
  const { motion: m } = useMotionPref()
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (m === "off") {
      setN(profileJson.length)
      return
    }
    const id = setInterval(() => setN((v) => (v >= profileJson.length ? (clearInterval(id), v) : v + 3)), 16)
    return () => clearInterval(id)
  }, [inView, m])

  const done = n >= profileJson.length

  return (
    <div ref={ref} className="relative">
      <div aria-hidden className="hatch absolute inset-0 translate-x-4 translate-y-4 rounded-2xl opacity-25" />
      <div className="sticker relative overflow-hidden rounded-2xl !shadow-none">
        <div className="flex items-center gap-2 border-b-2 border-line bg-bg-2 px-4 py-3">
          <span className="h-3 w-3 rounded-full border-2 border-line bg-accent" />
          <span className="h-3 w-3 rounded-full border-2 border-line bg-sun" />
          <span className="h-3 w-3 rounded-full border-2 border-line bg-mint" />
          <span className="ml-3 font-mono text-xs text-dim">~/pau — zsh</span>
        </div>
        <div className="p-5 font-mono text-[0.8rem] leading-relaxed text-ink sm:p-6 sm:text-sm">
          <p>
            <span className="text-mint-ink">$</span> cat pau.json
          </p>
          <pre className="mt-3 min-h-[17rem] whitespace-pre-wrap" aria-label={profileJson}>
            {colorize(profileJson.slice(0, n))}
            {!done && <span className="anim-blink inline-block h-4 w-2 translate-y-0.5 bg-accent" />}
          </pre>
          {done && (
            <p className="text-ink">
              <span className="text-mint-ink">$</span> <span className="anim-blink inline-block h-4 w-2 translate-y-0.5 bg-ink" />
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export function About() {
  const stats = [
    { big: "3", small: "jobs and internships since 2025", tone: "bg-sun" },
    { big: "AWS", small: "GameDay national phase, Jan 2026", tone: "bg-mint" },
    { big: "14★", small: "GitHub stars on the supply chain simulator", tone: "bg-accent" },
  ]
  return (
    <section id="about" className={shell}>
      <div className={inner}>
        <SectionHead num="01" kicker="About" title="Backends with clear rules" />
        <div className="grid items-start gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <Terminal />
          </Reveal>
          <div className="space-y-6 text-lg leading-relaxed">
            <Reveal delay={0.05}>
              <p>
                I&apos;m a backend developer from Valencia who likes systems where the{" "}
                <span className="font-semibold text-ink">business rules are clear</span>, persistence is intentional and tests
                protect the behaviour that matters.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                Right now I work on <span className="font-semibold text-ink">enterprise applications for the insurance sector</span>,
                moving legacy Oracle PL/SQL and Struts features to <span className="font-semibold text-ink">Spring Boot REST APIs</span>{" "}
                and Angular. Before that I built event-driven microservices with RabbitMQ at{" "}
                <span className="font-semibold text-ink">GFT Technologies</span> and an email campaign system at Feria Valencia.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p>
                In the evenings I&apos;m studying a <span className="font-semibold text-ink">Cloud Computing specialization</span> focused
                on AWS, and last January my team reached the national phase of the AWS GameDay championship.
              </p>
            </Reveal>
            <div className="grid gap-4 pt-4 sm:grid-cols-3">
              {stats.map((s, i) => (
                <Reveal key={s.small} delay={0.2 + i * 0.08}>
                  <div className="sticker sticker-hover h-full rounded-2xl p-4">
                    <span className={`inline-block rounded-lg border-2 border-line px-2 font-display text-2xl font-extrabold text-[#17182c] ${s.tone}`}>
                      {s.big}
                    </span>
                    <p className="mt-2 text-sm leading-snug text-body">{s.small}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* Experience */

// the pinned stack needs room: wide and tall enough for three cards with their tabs
const STACK_QUERY = "(min-width: 768px) and (min-height: 720px)"

function useWide() {
  const [wide, setWide] = useState(() => window.matchMedia(STACK_QUERY).matches)
  useEffect(() => {
    const mq = window.matchMedia(STACK_QUERY)
    const on = () => setWide(mq.matches)
    mq.addEventListener("change", on)
    return () => mq.removeEventListener("change", on)
  }, [])
  return wide
}

function ExperienceCard({
  job,
  i,
  self,
  next,
}: {
  job: (typeof jobs)[number]
  i: number
  self: RefObject<HTMLLIElement | null>
  next?: RefObject<HTMLLIElement | null>
}) {
  const { motion: m } = useMotionPref()
  const wide = useWide()
  // progress of the NEXT card travelling up to its pinned spot (stays at 1 once pinned)
  const { scrollYProgress } = useScroll({ target: next ?? self, offset: ["start end", "start 220px"] })
  const scale = useTransform(scrollYProgress, [0, 1], [1, next ? 0.96 : 1])
  const dim = useTransform(scrollYProgress, [0, 1], [0, next ? 0.1 : 0])
  const animate = m === "on" && wide && !!next

  return (
    <li ref={self} className="exp-card" style={{ top: `calc(6.5rem + ${i * 4.5}rem)` }}>
      <Reveal>
        <motion.article
          style={animate ? { scale, transformOrigin: "50% 0%" } : undefined}
          className="sticker relative grid gap-6 rounded-3xl p-6 sm:p-8 md:grid-cols-[13rem_1fr]"
        >
          {animate && <motion.div aria-hidden style={{ opacity: dim }} className="pointer-events-none absolute inset-0 rounded-[1.4rem] bg-ink" />}
          <div>
            <p className="mb-3 font-display text-5xl font-extrabold leading-none tracking-[0.06em] text-card [-webkit-text-stroke:4px_var(--ink)] [paint-order:stroke_fill]">
              0{i + 1}
            </p>
            <p className="font-mono text-sm font-semibold text-accent-ink">{job.period}</p>
            <p className="mt-1 font-mono text-xs text-dim">{job.place}</p>
            {i === 0 && (
              <span className="mt-3 inline-block rounded-full border-2 border-line bg-mint px-2.5 py-0.5 font-mono text-[0.68rem] font-bold text-[#17182c]">
                current
              </span>
            )}
          </div>
          <div>
            <h3 className="font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">{job.company}</h3>
            <p className="font-medium text-ink">{job.role}</p>
            <p className="mt-3 leading-relaxed">{job.summary}</p>
            <Bullets items={job.points} />
            <ul className="mt-5 flex flex-wrap gap-2">
              {job.stack.map((s) => (
                <Pill key={s}>{s}</Pill>
              ))}
            </ul>
          </div>
        </motion.article>
      </Reveal>
    </li>
  )
}

export function Experience() {
  const refs = useMemo(() => jobs.map(() => createRef<HTMLLIElement>()), [])
  return (
    <section id="experience" className={`${shell} bg-bg-2/60`}>
      <div className={inner}>
        <SectionHead num="02" kicker="Experience" title="Where I've shipped" />
        {/* Cards pin under the header and stack on top of each other while scrolling */}
        <ol className="space-y-8">
          {jobs.map((job, i) => (
            <ExperienceCard key={job.company} job={job} i={i} self={refs[i]} next={refs[i + 1]} />
          ))}
        </ol>
        <Reveal className="mt-12">
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn">
            Full profile on LinkedIn <ArrowUpRight className="h-4 w-4" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}

/* Projects */

// Cover = the GitHub social preview of the repo, refreshed at build time by scripts/fetch-previews.mjs

function Tilt({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  const rx = useSpring(0, { stiffness: 200, damping: 18 })
  const ry = useSpring(0, { stiffness: 200, damping: 18 })
  const { motion: m } = useMotionPref()
  const onMove = (e: PointerEvent<HTMLAnchorElement>) => {
    if (m === "off") return
    const r = e.currentTarget.getBoundingClientRect()
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 14)
    rx.set(((e.clientY - r.top) / r.height - 0.5) * -14)
  }
  return (
    <div style={{ perspective: 1000 }}>
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        onPointerMove={onMove}
        onPointerLeave={() => {
          rx.set(0)
          ry.set(0)
        }}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="block rounded-3xl"
      >
        {children}
      </motion.a>
    </div>
  )
}

function Cover({ repo }: { repo: string }) {
  return (
    <div className="group relative aspect-[2/1] overflow-hidden rounded-3xl border-2 border-line bg-white shadow-[6px_6px_0_0_var(--shadow)]">
      <img
        src={asset(`/images/project-${repo.toLowerCase()}.png`)}
        alt=""
        width={1280}
        height={640}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
      />
    </div>
  )
}

export function Projects() {
  return (
    <section id="projects" className={shell}>
      <div className={inner}>
        <SectionHead num="03" kicker="Projects" title="Things I've built" />
        <div className="space-y-24 sm:space-y-32">
          {featured.map((p, i) => (
            <article key={p.name} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
              <Reveal className={i % 2 ? "lg:order-2" : ""}>
                <Tilt href={p.links[0].href} label={`${p.name} on GitHub`}>
                  <Cover repo={p.repo} />
                </Tilt>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="font-mono text-sm text-dim">{p.context}</p>
                <h3 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
                  {p.name}
                  <span className="text-accent-ink">.</span>
                </h3>
                <p className="mt-4 text-lg leading-relaxed">{p.summary}</p>
                <Bullets items={p.points} />
                <ul className="mt-5 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <Pill key={s}>{s}</Pill>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap gap-4">
                  {p.links.map((l, k) => (
                    <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className={`btn ${k === 0 ? "btn-accent" : ""}`}>
                      {l.label} <ArrowUpRight className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </Reveal>
            </article>
          ))}
        </div>

        <Reveal className="mt-32">
          <h3 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">More on GitHub</h3>
        </Reveal>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {moreProjects.map((p, i) => (
            <li key={p.name}>
              <Reveal delay={(i % 3) * 0.07} className="h-full">
                <a href={p.href} target="_blank" rel="noopener noreferrer" className="group sticker sticker-hover flex h-full flex-col rounded-2xl p-5">
                  <div className="flex items-start justify-between gap-3">
                    <Github className="h-6 w-6 text-ink" aria-hidden />
                    <ArrowUpRight className="h-5 w-5 text-dim transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-ink" aria-hidden />
                  </div>
                  <span className="mt-4 font-display text-xl font-bold text-ink">{p.name}</span>
                  <span className="mt-1 text-sm leading-relaxed">{p.text}</span>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* Stack */

function ToolChip({ t, plain }: { t: { name: string; icon?: string }; plain?: boolean }) {
  return (
    <span className="flex shrink-0 items-center gap-2 rounded-xl border-2 border-line bg-chip px-3.5 py-2 text-base font-semibold text-[#17182c] shadow-[3px_3px_0_0_var(--shadow)]">
      {plain ? null : t.icon ? (
        <img src={asset(`/icons/${t.icon}.svg`)} alt="" width={22} height={22} className="h-[22px] w-[22px] object-contain" />
      ) : (
        <span className="flex h-[22px] w-[22px] items-center justify-center rounded-md bg-sun font-mono text-[0.6rem] font-bold">{t.name.slice(0, 2)}</span>
      )}
      {t.name}
    </span>
  )
}

/* An endless row: drifts on its own, speeds up while you scroll, stops under the cursor. */
function MarqueeRow({ area, tools, reverse, plain }: { area: string; tools: { name: string; icon?: string }[]; reverse: boolean; plain?: boolean }) {
  const x = useMotionValue(0)
  const half = useRef<HTMLDivElement>(null)
  const box = useRef<HTMLDivElement>(null)
  const visible = useInView(box) // off screen rows do not animate
  const hold = useRef(false)
  const boost = useRef(0)
  const { motion: m } = useMotionPref()
  const { scrollY } = useScroll()
  const velocity = useVelocity(scrollY)

  useAnimationFrame((_, delta) => {
    if (m === 'off' || !visible || !half.current) return
    const w = half.current.offsetWidth
    if (!w) return
    boost.current += (Math.min(Math.abs(velocity.get()) / 40, 18) - boost.current) * 0.08
    const speed = hold.current ? 0 : 0.035 + boost.current * 0.006
    let next = x.get() + (reverse ? 1 : -1) * speed * delta
    if (next <= -w) next += w
    if (next > 0) next -= w
    x.set(next)
  })

  const row = (ref?: React.Ref<HTMLDivElement>) => (
    <div ref={ref} className="flex shrink-0 gap-4 pr-4">
      {tools.map((t) => (
        <ToolChip key={t.name} t={t} plain={plain} />
      ))}
    </div>
  )

  // Same left edge for the title and the first chip; each category is one straight line.
  const title = <h3 className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent-ink">{area}</h3>

  if (m === 'off')
    return (
      <div>
        {title}
        <ul className="flex gap-4 overflow-x-auto pb-4 pr-1 pt-1">
          {tools.map((t) => (
            <li key={t.name} className="shrink-0">
              <ToolChip t={t} plain={plain} />
            </li>
          ))}
        </ul>
      </div>
    )

  return (
    <div ref={box} onPointerEnter={() => (hold.current = true)} onPointerLeave={() => (hold.current = false)}>
      {title}
      <div className="overflow-hidden pb-4 pt-1 [mask-image:linear-gradient(to_right,transparent,#000_3%,#000_97%,transparent)]">
        <motion.div style={{ x }} className="flex w-max">
          {row(half)}
          {row()}
          {row()}
        </motion.div>
      </div>
    </div>
  )
}

export function Stack() {
  return (
    <section id="stack" className="relative overflow-hidden bg-bg-2/60 px-6 py-20 sm:px-12 sm:py-36 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <SectionHead num="04" kicker="Stack" title="Tools I reach for" />
        <div className="space-y-5">
          {stack.map((g, i) => (
            <MarqueeRow key={g.area} area={g.area} tools={g.tools} reverse={i % 2 === 1} />
          ))}
          <MarqueeRow area="How I work" tools={practices.map((name) => ({ name }))} reverse={stack.length % 2 === 1} plain />
        </div>
      </div>
    </section>
  )
}

/* Education */

export function Education() {
  return (
    <section id="education" className={shell}>
      <div className={inner}>
        <SectionHead num="05" kicker="Education" title="Always learning" />
        <div className="grid gap-6 lg:grid-cols-3">
          {education.map((e, i) => (
            <Reveal key={e.title} delay={i * 0.08}>
              <div className="sticker sticker-hover flex h-full flex-col rounded-3xl p-6">
                <p className="font-mono text-sm font-semibold text-accent-ink">{e.period}</p>
                <h3 className="mt-3 font-display text-2xl font-extrabold leading-tight tracking-tight text-ink">{e.title}</h3>
                <p className="mt-1 font-medium text-ink">{e.place}</p>
                <p className="mt-3 text-[0.95rem] leading-relaxed">{e.note}</p>
                {e.href && (
                  <a href={e.href} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex items-center gap-1 pt-4 font-semibold text-ink underline decoration-accent decoration-2 underline-offset-4 hover:text-accent-ink">
                    {e.linkLabel} <ArrowUpRight className="h-4 w-4" />
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-24">
          <h3 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">Certificates</h3>
        </Reveal>
        <div className="mt-8 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {certificates.map((g, gi) => (
            <Reveal key={g.group} delay={gi * 0.06}>
              <h4 className="border-b-2 border-line pb-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent-ink">{g.group}</h4>
              <ul className="mt-4 space-y-4">
                {g.items.map((c) => (
                  <li key={c.name} className="text-sm leading-snug">
                    {c.href ? (
                      <a href={c.href} target="_blank" rel="noopener noreferrer" className="group font-semibold text-ink hover:text-accent-ink">
                        {c.name}
                        <ArrowUpRight className="ml-0.5 inline h-3.5 w-3.5 opacity-50 transition group-hover:opacity-100" aria-hidden />
                      </a>
                    ) : (
                      <span className="font-semibold text-ink">{c.name}</span>
                    )}
                    <span className="block text-dim">
                      {c.issuer}
                      {c.date && `, ${c.date}`}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* Contact */

export function Contact() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {}
  }

  return (
    <section id="contact" className="relative overflow-hidden px-6 pb-16 pt-28 sm:px-12 sm:pt-36 lg:px-20">
      <div className={`${inner} relative`}>
        <Reveal>
          <p className="font-mono text-sm text-accent-ink">
            06 <span className="text-dim">/ Contact</span>
          </p>
          <h2 className="mt-4 font-display text-[clamp(3rem,10vw,8.5rem)] font-extrabold leading-[0.9] tracking-[-0.045em] text-ink">
            Let&apos;s build
            <br />
            <span className="outline-text">something</span> <span className="display-shadow">solid.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-xl text-lg leading-relaxed">
            I&apos;m open to backend roles and interesting projects. Drop me a line.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a href={`mailto:${profile.email}`} className="btn btn-accent !px-6 !py-4 !text-base sm:!text-lg">
              <Mail className="h-5 w-5" /> {profile.email}
            </a>
            <button type="button" onClick={copy} className="btn !py-4" aria-live="polite">
              {copied ? <Check className="h-4 w-4 text-mint-ink" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied" : "Copy"}
            </button>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn !p-4" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn !p-4" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </a>
          </div>
        </Reveal>

        <footer className="mt-32 flex flex-col justify-between gap-4 border-t-2 border-line pt-6 font-mono text-xs text-dim sm:flex-row">
          <p>Designed and built by Pau López Núñez · React, Three.js, Tailwind CSS and Framer Motion.</p>
          <a href="#top" className="font-semibold text-ink hover:text-accent-ink">
            Back to top ↑
          </a>
        </footer>
      </div>
    </section>
  )
}
