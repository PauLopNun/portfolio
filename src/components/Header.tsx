import { useEffect, useState } from "react"
import { flushSync } from "react-dom"
import { AnimatePresence, motion } from "framer-motion"
import { Moon, Sparkles, Sun } from "lucide-react"
import { useLang, useMotionPref, useTheme } from "../theme"
import { profile } from "../data"
import type { Lang } from "../content"

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const { motion: m } = useMotionPref()
  const { t } = useLang()
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
      aria-label={dark ? t.theme.light : t.theme.dark}
      className="relative flex h-10 w-[4.25rem] shrink-0 items-center rounded-full border-2 border-line bg-card px-1"
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
  const { t } = useLang()
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={m === "on"}
      aria-label={t.motion}
      title={t.motion}
      className="flex h-10 items-center gap-2 rounded-full border-2 border-line bg-card px-3 font-mono text-xs font-bold text-ink"
    >
      <Sparkles className={`h-4 w-4 ${m === "on" ? "text-accent-ink" : "text-dim"}`} aria-hidden />
      <span className="hidden lg:inline">{t.motion}</span>
      <span className={`relative hidden h-4 w-7 rounded-full sm:block border-2 border-line transition-colors ${m === "on" ? "bg-mint" : "bg-bg-2"}`} aria-hidden>
        <span className={`absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-ink transition-all ${m === "on" ? "left-[calc(100%-0.65rem)]" : "left-0.5"}`} />
      </span>
    </button>
  )
}

function LangToggle() {
  const { lang, setLang } = useLang()
  return (
    <div role="group" aria-label="Language / Idioma" className="flex h-10 items-center rounded-full border-2 border-line bg-card p-0.5 font-mono text-xs font-bold">
      {(["en", "es"] as Lang[]).map((l) => (
        <button
          key={l}
          type="button"
          lang={l}
          aria-pressed={lang === l}
          onClick={() => setLang(l)}
          className={`h-full rounded-full px-3 uppercase transition-colors ${lang === l ? "bg-accent text-on-accent" : "text-dim hover:text-ink"}`}
        >
          {l}
        </button>
      ))}
    </div>
  )
}

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState("")
  useEffect(() => {
    const on = () => {
      // the last section whose top has passed the header line wins; above the first one nothing is active
      let cur = ""
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top < 140) cur = id
      }
      // the last section can be shorter than the screen, so its top never reaches the line: at the very bottom it wins
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) cur = ids[ids.length - 1]
      setActive(cur)
    }
    on()
    window.addEventListener("scroll", on, { passive: true })
    return () => window.removeEventListener("scroll", on)
  }, [ids])
  return active
}

export function Header() {
  const { t } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const ids = t.nav.map((n) => n.id)
  const active = useActiveSection(ids)

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8)
    on()
    window.addEventListener("scroll", on, { passive: true })
    return () => window.removeEventListener("scroll", on)
  }, [])

  useEffect(() => {
    if (!open) return
    const key = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", key)
    return () => window.removeEventListener("keydown", key)
  }, [open])

  return (
    <header className={`sticky top-0 z-50 border-b-2 transition-colors ${scrolled || open ? "border-line bg-bg/90 backdrop-blur-md" : "border-transparent bg-bg"}`}>
      <div className="flex items-center justify-between gap-3 px-3 py-2.5 sm:px-5">
        <nav aria-label="Site" className="hidden items-center gap-1 md:flex">
          {t.nav.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className={`relative rounded-full px-3.5 py-1.5 font-mono text-xs font-semibold uppercase tracking-wider transition-colors ${active === n.id ? "text-on-accent" : "text-body hover:text-ink"}`}
            >
              {active === n.id && (
                <motion.span layoutId="nav-pill" transition={{ type: "spring", stiffness: 500, damping: 36 }} className="absolute inset-0 -z-10 rounded-full bg-accent" />
              )}
              {n.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="group flex items-center gap-3 py-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-ink md:hidden"
        >
          <span className="flex w-5 flex-col gap-[5px]">
            <span className={`h-[2px] bg-ink transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
            <span className={`h-[2px] bg-ink transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
          </span>
          Menu
        </button>

        <div className="flex items-center gap-2 sm:gap-3">
          <MotionToggle />
          <LangToggle />
          <ThemeToggle />
          {/* the wrapper hides it: .btn sets its own display, which beats a hidden class on the link itself */}
          <span className="hidden lg:block">
            <a href={`mailto:${profile.email}`} className="btn btn-accent !py-2">
              {t.hire}
            </a>
          </span>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Site"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
            className="overflow-hidden md:hidden"
          >
            <ul className="px-3 pb-3 sm:px-5">
              {t.nav.map((n) => (
                <li key={n.id}>
                  <a
                    href={`#${n.id}`}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between border-t-2 border-line/10 py-3 font-display text-xl font-extrabold tracking-tight ${active === n.id ? "text-accent-ink" : "text-ink"}`}
                  >
                    {n.label}
                    <span className="font-mono text-xs text-dim">→</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
