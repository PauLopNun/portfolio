
import { useEffect, useState } from "react"
import { flushSync } from "react-dom"
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion"
import { useMotionPref, useTheme } from "../theme"
import { Github, Linkedin, Mail, Moon, Sun } from "lucide-react"
import { profile } from "../data"

export const nav = [
  { id: "about", label: "About", note: "Who I am and what I do." },
  { id: "experience", label: "Experience", note: "Where I've shipped code." },
  { id: "projects", label: "Projects", note: "Things I've built end to end." },
  { id: "stack", label: "Stack", note: "The tools I reach for." },
  { id: "education", label: "Education", note: "Degrees and certificates." },
  { id: "contact", label: "Contact", note: "Email, LinkedIn and GitHub." },
]

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const { motion: m } = useMotionPref()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const dark = mounted && resolvedTheme === "dark"

  return (
    <button
      type="button"
      onClick={(e) => {
        const next = dark ? "light" : "dark"
        const doc = document as Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } }
        if (!doc.startViewTransition || m === "off") return setTheme(next)
        const x = e.clientX
        const y = e.clientY
        const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
        doc.startViewTransition(() => flushSync(() => setTheme(next))).ready.then(() => {
          document.documentElement.animate(
            { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
            { duration: 650, easing: "cubic-bezier(0.76, 0, 0.24, 1)", pseudoElement: "::view-transition-new(root)" },
          )
        })
      }}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative flex h-10 w-[4.25rem] items-center rounded-full border-2 border-line bg-card px-1"
    >
      <span className="hatch absolute inset-0 rounded-full opacity-15" aria-hidden />
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
        className={`relative z-10 flex h-7 w-7 items-center justify-center rounded-full border-2 border-line ${
          dark ? "ml-auto bg-ink text-bg" : "bg-sun text-ink"
        }`}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={dark ? "moon" : "sun"}
            initial={{ rotate: -90, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            exit={{ rotate: 90, scale: 0 }}
            transition={{ duration: 0.2 }}
          >
            {dark ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </button>
  )
}

function MotionToggle() {
  const { motion: m, toggle } = useMotionPref()
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={m === "on"}
      className="hidden items-center gap-2 font-mono text-[0.7rem] uppercase tracking-widest text-dim transition-colors hover:text-ink md:flex"
    >
      <span className={`h-2 w-2 rounded-full border border-line ${m === "on" ? "bg-mint" : "bg-transparent"}`} />
      Motion {m}
    </button>
  )
}

export function Frame() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  useEffect(() => {
    // the header only gets its blurred backdrop once the pinned hero is over, so it never covers the portrait or the logo
    const onScroll = () => {
      const hero = document.getElementById("top")
      const end = hero ? hero.offsetHeight - window.innerHeight : 40
      setScrolled(window.scrollY > Math.max(40, end))
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", onKey)
    if (!open) return () => window.removeEventListener("keydown", onKey)

    // Freeze the page behind the menu without hiding the scrollbar: hiding it widens the viewport and shifts everything by its width.
    const y = window.scrollY
    const block = (e: Event) => {
      if (!(e.target as Element | null)?.closest?.("#site-menu")) e.preventDefault()
    }
    const hold = () => window.scrollTo(0, y)
    window.addEventListener("wheel", block, { passive: false })
    window.addEventListener("touchmove", block, { passive: false })
    window.addEventListener("scroll", hold)
    return () => {
      window.removeEventListener("keydown", onKey)
      window.removeEventListener("wheel", block)
      window.removeEventListener("touchmove", block)
      window.removeEventListener("scroll", hold)
    }
  }, [open])

  return (
    <>
      {/* Page frame: sized to the LARGE viewport (lvh) so it never opens or closes when a phone browser hides or shows its address bar. The huge shadow paints everything outside the rounded border in the page colour, corners included */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-2 top-2 z-[42] h-[calc(100lvh-1rem)] rounded-[22px] border-2 border-line shadow-[0_0_0_100vmax_var(--bg)] sm:inset-x-3 sm:top-3 sm:h-[calc(100lvh-1.5rem)]"
      />

      {/* Side rails */}
      <p className="pointer-events-none fixed bottom-10 left-6 z-40 hidden origin-bottom-left -rotate-90 translate-x-4 font-mono text-[0.68rem] uppercase tracking-[0.25em] text-dim lg:block">
        © 2026 · Made in València
      </p>
      <div aria-hidden className="fixed right-7 top-1/2 z-40 hidden h-40 w-[3px] -translate-y-1/2 overflow-hidden rounded-full bg-line/15 lg:block">
        <motion.div style={{ scaleY: progress }} className="h-full w-full origin-top rounded-full bg-accent" />
      </div>

      {/* Header */}
      <header
        className={`fixed inset-x-2.5 top-2.5 z-50 rounded-t-[20px] transition-colors duration-300 sm:inset-x-3.5 sm:top-3.5 ${
          scrolled ? "backdrop-blur-md" : ""
        } ${scrolled && !open ? "bg-bg/80" : "bg-transparent"}`}
      >
        <div className="flex items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="site-menu"
              className="group -my-3 flex items-center gap-3 py-3 pr-4 font-mono text-xs font-bold uppercase tracking-[0.25em] text-ink"
            >
              <span className="flex w-6 flex-col gap-[5px]">
                <span className={`h-[2px] bg-ink transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
                <span className={`h-[2px] bg-ink transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : "w-4 group-hover:w-6"}`} />
              </span>
              {open ? "Close" : "Menu"}
            </button>
          </div>
          <div className="flex items-center gap-4 sm:gap-6">
            <MotionToggle />
            <ThemeToggle />
            <span className="hidden sm:block">
              <a href={`mailto:${profile.email}`} className="btn btn-accent !py-2">
                Hire me
              </a>
            </span>
          </div>
        </div>
      </header>

      {/* Fullscreen menu */}
      {/* Always mounted: toggling mid-animation reverses from the current clip instead of remounting */}
      <motion.nav
        id="site-menu"
        aria-label="Site"
        aria-hidden={!open}
        inert={!open}
        initial={false}
        animate={open ? "open" : "closed"}
        variants={{
          open: { clipPath: "inset(0 0 0% 0 round 22px)", visibility: "visible" },
          closed: { clipPath: "inset(0 0 100% 0 round 22px)", transitionEnd: { visibility: "hidden" } },
        }}
        transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
        className="invisible fixed inset-2.5 z-[45] overflow-y-auto overscroll-contain rounded-[20px] bg-bg-2 sm:inset-3.5"
      >
        <div className="relative mx-auto flex min-h-full max-w-6xl flex-col justify-center px-6 pb-12 pt-28 sm:px-12">
          <ul>
            {nav.map((n, i) => (
              <motion.li
                key={n.id}
                variants={{
                  open: { opacity: 1, y: 0, transition: { delay: 0.25 + i * 0.06, duration: 0.5, ease: [0.2, 0.8, 0.2, 1] } },
                  closed: { opacity: 0, y: 40, transition: { delay: 0.55, duration: 0 } },
                }}
              >
                <a
                  href={`#${n.id}`}
                  onClick={() => setOpen(false)}
                  className="group flex items-baseline gap-4 border-b-2 border-line/10 py-3 sm:gap-8"
                >
                  <span className="w-8 font-mono text-sm text-accent-ink">0{i + 1}</span>
                  <span className="font-display text-5xl font-extrabold tracking-tight text-ink transition-transform duration-300 group-hover:translate-x-3 sm:text-7xl">
                    {n.label}
                    <span className="text-accent-ink">.</span>
                  </span>
                  <span className="ml-auto hidden text-sm text-body md:block">{n.note}</span>
                </a>
              </motion.li>
            ))}
          </ul>
          <motion.div
            variants={{
              open: { opacity: 1, transition: { delay: 0.7 } },
              closed: { opacity: 0, transition: { delay: 0.55, duration: 0 } },
            }}
            className="mt-10 flex items-center gap-4"
          >
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn !p-3" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn !p-3" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href={`mailto:${profile.email}`} className="btn !p-3" aria-label="Email">
              <Mail className="h-5 w-5" />
            </a>
          </motion.div>
        </div>
      </motion.nav>
    </>
  )
}
