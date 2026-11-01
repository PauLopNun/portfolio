import { motion } from "framer-motion"
import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail, MapPin } from "lucide-react"
import { asset, profile } from "../data"
import { useLang, useMotionPref, useTheme } from "../theme"

const ease = [0.2, 0.8, 0.2, 1] as const

const links = [
  { href: profile.github, label: "GitHub", Icon: Github },
  { href: profile.linkedin, label: "LinkedIn", Icon: Linkedin },
]

export function Hero() {
  const { t } = useLang()
  const { resolvedTheme } = useTheme()
  const { motion: m } = useMotionPref()
  const h = t.hero

  return (
    <section id="top" className="px-4 pb-12 pt-6 sm:px-8 sm:pb-20 sm:pt-12">
      <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[1fr_auto] lg:gap-20">
        <div className="flex flex-col justify-center">
          <h1 className="font-display text-[clamp(2.6rem,6.2vw,5.25rem)] font-extrabold leading-[0.92] tracking-[-0.04em] text-ink">
            <motion.span initial={m === "on" ? { opacity: 0, y: 24 } : false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease, delay: 0.05 }} className="block">
              {h.hi}
            </motion.span>
            <motion.span initial={m === "on" ? { opacity: 0, y: 24 } : false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease, delay: 0.15 }} className="display-shadow block">
              Pau López.
            </motion.span>
          </h1>

          <motion.div initial={m === "on" ? { opacity: 0, y: 16 } : false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease, delay: 0.3 }}>
            <p className="mt-5 max-w-xl text-lg leading-relaxed sm:text-xl">
              <span className="font-display text-xl font-extrabold text-ink sm:text-2xl">{h.role}.</span> {h.pitch[0]}
              <span className="inline-block -rotate-1 rounded-md bg-sun px-1.5 font-semibold text-[#1b1d36]">{h.pitch[1]}</span>
              {h.pitch[2]}
            </p>
            <ul className="mt-4 space-y-1 font-mono text-sm text-dim">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0" aria-hidden /> {h.place}
              </li>
            </ul>

            <div className="mt-6 flex flex-wrap items-center gap-2.5 sm:gap-3">
              <a href={`mailto:${profile.email}`} className="btn btn-accent !px-4 !py-2 !text-sm sm:!px-[1.3rem] sm:!py-[0.7rem] sm:!text-[0.95rem]">
                <Mail className="h-4 w-4" /> {h.email}
              </a>
              <a href="#projects" className="btn !px-4 !py-2 !text-sm sm:!px-[1.3rem] sm:!py-[0.7rem] sm:!text-[0.95rem]">
                {h.projects} <ArrowDown className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={m === "on" ? { opacity: 0, y: 24 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.2 }}
          className="order-first flex flex-col items-center gap-6 lg:order-none lg:mr-6 lg:gap-8"
        >
          <div className="relative h-40 w-40 sm:h-56 sm:w-56">
            <div aria-hidden className="anim-orbit absolute -inset-3 rounded-full border-2 border-dashed border-accent" />
            <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-line [background:var(--portrait-bg)]">
              <img
                src={asset(`/images/portrait-cut-${resolvedTheme}.webp`)}
                alt="Pau López"
                width={864}
                height={864}
                fetchPriority="high"
                className="absolute bottom-0 left-1/2 h-[112%] w-auto max-w-none -translate-x-1/2 translate-y-[6%] select-none"
                draggable={false}
              />
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3">
            {links.map(({ href, label, Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="btn !px-4 !py-2 !text-sm sm:!px-[1.3rem] sm:!py-[0.7rem] sm:!text-[0.95rem]">
                <Icon className="h-4 w-4" aria-hidden /> {label} <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
            ))}
          </div>
        </motion.div>
      </div>

    </section>
  )
}
