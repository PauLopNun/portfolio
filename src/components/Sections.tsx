import { useState, type ReactNode } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight, Check, Copy, Github, Linkedin, Mail } from "lucide-react"
import { asset, certificates, educationLinks, moreProjects, profile, projectLinks, projectNames, projectStacks, stack } from "../data"
import { useLang, useMotionPref } from "../theme"

const ease = [0.2, 0.8, 0.2, 1] as const

function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const { motion: m } = useMotionPref()
  return (
    <motion.div
      initial={m === "on" ? { opacity: 0, y: 24 } : false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay, duration: 0.55, ease }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function SectionHead({ num, kicker, title }: { num: string; kicker: string; title: string }) {
  return (
    <Reveal className="mb-6 sm:mb-8">
      <p className="font-mono text-sm text-accent-ink">
        {num} <span className="text-dim">/ {kicker}</span>
      </p>
      <h2 className="mt-1 font-display text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-[0.98] tracking-[-0.035em] text-ink">
        {title}
        {!title.endsWith(".") && <span className="text-accent-ink">.</span>}
      </h2>
    </Reveal>
  )
}

function Pill({ children }: { children: ReactNode }) {
  return <li className="rounded-full border-2 border-line/70 px-2.5 py-0.5 font-mono text-[0.7rem] font-semibold text-ink">{children}</li>
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 space-y-1.5 text-[0.88rem] leading-snug">
      {items.map((p) => (
        <li key={p} className="relative pl-5 before:absolute before:left-0 before:top-[0.5em] before:h-2 before:w-2 before:rotate-45 before:border-2 before:border-line before:bg-accent">
          {p}
        </li>
      ))}
    </ul>
  )
}

const shell = "relative px-4 py-12 sm:px-8 sm:py-16"
const inner = "mx-auto max-w-6xl"

/* Experience */

export function Experience() {
  const { t } = useLang()
  return (
    <section id="experience" className={`${shell} bg-bg-2/60`}>
      <div className={inner}>
        <SectionHead num="01" kicker={t.sections.experience[0]} title={t.sections.experience[1]} />
        <ol className="grid gap-5 lg:grid-cols-3">
          {t.jobs.map((job, i) => (
            <li key={job.company}>
              <Reveal delay={i * 0.07} className="h-full">
                <article className="sticker flex h-full flex-col rounded-2xl p-5">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <p className="font-mono text-xs font-semibold text-accent-ink">{job.period}</p>
                    {i === 0 && (
                      <span className="rounded-full border-2 border-line bg-mint px-2 py-px font-mono text-[0.65rem] font-bold text-[#17182c]">{t.current}</span>
                    )}
                  </div>
                  <h3 className="mt-1.5 font-display text-2xl font-extrabold tracking-tight text-ink">{job.company}</h3>
                  <p className="text-sm font-medium text-ink">
                    {job.role} <span className="font-normal text-dim">· {job.place}</span>
                  </p>
                  <p className="mt-2 text-sm leading-snug">{job.summary}</p>
                  <Bullets items={job.points} />
                  <ul className="mt-auto flex flex-wrap gap-1.5 pt-4">
                    {job.stack.map((s) => (
                      <Pill key={s}>{s}</Pill>
                    ))}
                  </ul>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
        <Reveal className="mt-6">
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn">
            {t.linkedin} <ArrowUpRight className="h-4 w-4" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}

/* Projects. Cover = the GitHub social preview of the repo, refreshed at build time by scripts/fetch-previews.mjs */

export function Projects() {
  const { t } = useLang()
  return (
    <section id="projects" className={shell}>
      <div className={inner}>
        <SectionHead num="02" kicker={t.sections.projects[0]} title={t.sections.projects[1]} />
        <div className="grid gap-5 lg:grid-cols-3">
          {t.projects.map((p, i) => {
            const { repo, links } = projectLinks[i]
            return (
              <Reveal key={repo} delay={i * 0.07} className="h-full">
                <article className="sticker flex h-full flex-col overflow-hidden rounded-2xl">
                  <a href={`${profile.github}/${repo}`} target="_blank" rel="noopener noreferrer" aria-label={`${projectNames[i]} on GitHub`} className="block border-b-2 border-line bg-white">
                    <img
                      src={asset(`/images/project-${repo.toLowerCase()}.png`)}
                      alt=""
                      width={1280}
                      height={640}
                      loading="lazy"
                      className="aspect-[2/1] w-full object-cover"
                    />
                  </a>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="font-mono text-xs text-dim">{p.context}</p>
                    <h3 className="mt-1 font-display text-2xl font-extrabold tracking-tight text-ink">
                      {projectNames[i]}
                      <span className="text-accent-ink">.</span>
                    </h3>
                    <p className="mt-2 text-sm leading-snug">{p.summary}</p>
                    <Bullets items={p.points} />
                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {projectStacks[i].map((s) => (
                        <Pill key={s}>{s}</Pill>
                      ))}
                    </ul>
                    <div className="mt-auto flex flex-wrap gap-2 pt-5">
                      {p.links.map((label, k) => (
                        <a key={label} href={links[k]} target="_blank" rel="noopener noreferrer" className={`btn !px-4 !py-1.5 !text-sm ${k === 0 ? "btn-accent" : ""}`}>
                          {label} <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>

        <Reveal className="mt-10">
          <h3 className="font-display text-2xl font-extrabold tracking-tight text-ink">{t.moreTitle}</h3>
        </Reveal>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {moreProjects.map((p, i) => (
            <li key={p.name}>
              <Reveal delay={(i % 3) * 0.05} className="h-full">
                <a href={p.href} target="_blank" rel="noopener noreferrer" className="group sticker sticker-hover flex h-full gap-3 rounded-xl !shadow-[4px_4px_0_0_var(--shadow)] p-4">
                  <Github className="mt-0.5 h-5 w-5 shrink-0 text-ink" aria-hidden />
                  <span>
                    <span className="flex items-center gap-1 font-display text-base font-bold text-ink">
                      {p.name}
                      <ArrowUpRight className="h-4 w-4 text-dim transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-ink" aria-hidden />
                    </span>
                    <span className="mt-0.5 block text-[0.82rem] leading-snug">{t.more[i]}</span>
                  </span>
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

function ToolChip({ name, icon }: { name: string; icon?: string }) {
  return (
    <li className="flex items-center gap-1.5 rounded-lg border-2 border-line bg-chip px-2.5 py-1 text-sm font-semibold text-[#17182c] shadow-[2px_2px_0_0_var(--shadow)]">
      {icon ? (
        <img src={asset(`/icons/${icon}.svg`)} alt="" width={18} height={18} className="h-[18px] w-[18px] object-contain" />
      ) : (
        <span className="flex h-[18px] w-[18px] items-center justify-center rounded bg-sun font-mono text-[0.55rem] font-bold">{name.slice(0, 2)}</span>
      )}
      {name}
    </li>
  )
}

export function Stack() {
  const { t } = useLang()
  return (
    <section id="stack" className={`${shell} bg-bg-2/60`}>
      <div className={inner}>
        <SectionHead num="03" kicker={t.sections.stack[0]} title={t.sections.stack[1]} />
        <div className="grid gap-x-10 gap-y-6 md:grid-cols-2">
          {stack.map((g, i) => (
            <Reveal key={i} delay={(i % 2) * 0.06}>
              <h3 className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent-ink">{t.stackAreas[i]}</h3>
              <ul className="flex flex-wrap gap-2">
                {g.tools.map((tool) => (
                  <ToolChip key={tool.name} name={tool.name} icon={tool.icon} />
                ))}
              </ul>
            </Reveal>
          ))}
          <Reveal>
            <h3 className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent-ink">{t.practicesTitle}</h3>
            <ul className="flex flex-wrap gap-2">
              {t.practices.map((p) => (
                <li key={p} className="rounded-lg border-2 border-line bg-sun px-2.5 py-1 text-sm font-semibold text-[#17182c]">
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* Education */

export function Education() {
  const { t } = useLang()
  return (
    <section id="education" className={shell}>
      <div className={inner}>
        <SectionHead num="04" kicker={t.sections.education[0]} title={t.sections.education[1]} />
        <div className="grid gap-5 lg:grid-cols-3">
          {t.education.map((e, i) => (
            <Reveal key={e.title} delay={i * 0.07} className="h-full">
              <div className="sticker flex h-full flex-col rounded-2xl p-5">
                <p className="font-mono text-xs font-semibold text-accent-ink">{e.period}</p>
                <h3 className="mt-1.5 font-display text-xl font-extrabold leading-tight tracking-tight text-ink">{e.title}</h3>
                <p className="text-sm font-medium text-ink">{e.place}</p>
                <p className="mt-2 text-sm leading-snug">{e.note}</p>
                {educationLinks[i] && (
                  <a href={educationLinks[i]} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex items-center gap-1 pt-3 text-sm font-semibold text-ink underline decoration-accent decoration-2 underline-offset-4 hover:text-accent-ink">
                    {e.linkLabel} <ArrowUpRight className="h-4 w-4" />
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <h3 className="font-display text-2xl font-extrabold tracking-tight text-ink">{t.certsTitle}</h3>
        </Reveal>
        <div className="mt-4 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
          {certificates.map((g, gi) => (
            <Reveal key={gi} delay={gi * 0.05}>
              <h4 className="border-b-2 border-line pb-1.5 font-mono text-xs font-bold uppercase tracking-[0.18em] text-accent-ink">{t.certGroups[gi]}</h4>
              <ul className="mt-3 space-y-2.5">
                {g.items.map((c) => (
                  // certificate titles are proper names, some in Spanish: they stay as issued
                  <li key={c.name} className="text-[0.82rem] leading-snug">
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
  const { t } = useLang()
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard can be blocked; the address is visible anyway */
    }
  }

  return (
    <section id="contact" className="relative bg-bg-2/60 px-4 pb-8 pt-12 sm:px-8 sm:pt-16">
      <div className={inner}>
        <Reveal>
          <p className="font-mono text-sm text-accent-ink">
            05 <span className="text-dim">/ {t.sections.contact[0]}</span>
          </p>
          <h2 className="mt-1 font-display text-[clamp(2.2rem,5.5vw,4rem)] font-extrabold leading-[0.95] tracking-[-0.04em] text-ink">
            <span className="display-shadow">{t.sections.contact[1]}</span>
          </h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed">{t.contact.text}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a href={`mailto:${profile.email}`} className="btn btn-accent max-w-full !text-sm sm:!text-base">
              <Mail className="h-5 w-5" /> {profile.email}
            </a>
            <button type="button" onClick={copy} className="btn" aria-live="polite">
              {copied ? <Check className="h-4 w-4 text-mint-ink" /> : <Copy className="h-4 w-4" />}
              {copied ? t.contact.copied : t.contact.copy}
            </button>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn !p-3" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn !p-3" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </a>
          </div>
        </Reveal>

        <footer className="mt-12 flex flex-col justify-between gap-3 border-t-2 border-line pt-5 font-mono text-xs text-dim sm:flex-row">
          <p>{t.footer}</p>
          <a href="#top" className="font-semibold text-ink hover:text-accent-ink">
            {t.top}
          </a>
        </footer>
      </div>
    </section>
  )
}
