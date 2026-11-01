import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { MotionConfig } from 'framer-motion'
import { content, type Content, type Lang } from './content'

type Theme = 'light' | 'dark' | 'system'
type Motion = 'on' | 'off'

const ThemeContext = createContext<{ resolvedTheme: 'light' | 'dark'; setTheme: (t: Theme) => void }>({
  resolvedTheme: 'light',
  setTheme: () => {},
})
const MotionContext = createContext<{ motion: Motion; toggle: () => void }>({ motion: 'on', toggle: () => {} })

const LangContext = createContext<{ lang: Lang; t: Content; setLang: (l: Lang) => void }>({ lang: 'en', t: content.en, setLang: () => {} })

export const useLang = () => useContext(LangContext)
export const useTheme = () => useContext(ThemeContext)
export const useMotionPref = () => useContext(MotionContext)

const systemDark = () => window.matchMedia('(prefers-color-scheme: dark)').matches
const stored = (key: string) => {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

export function Providers({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => (stored('theme') as Theme) || 'system')
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = stored('lang')
    if (saved === 'en' || saved === 'es') return saved
    return navigator.language.toLowerCase().startsWith('es') ? 'es' : 'en'
  })
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))
  const [motion, setMotion] = useState<Motion>(() => (document.documentElement.dataset.motion === 'off' ? 'off' : 'on'))

  // follow the chosen theme, or the system one while it is "system"
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const apply = () => {
      const next = theme === 'dark' || (theme === 'system' && systemDark())
      setDark(next)
      document.documentElement.classList.toggle('dark', next)
    }
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [theme])

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t)
    try {
      localStorage.setItem('theme', t)
    } catch {
      /* storage can be blocked; the choice just will not persist */
    }
  }, [])

  // keep <html lang>, the tab title and the description in step with the chosen language
  useEffect(() => {
    const t = content[lang]
    document.documentElement.lang = lang
    document.title = t.htmlTitle
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.htmlDescription)
  }, [lang])

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    try {
      localStorage.setItem('lang', l)
    } catch {
      /* the choice just will not persist */
    }
  }, [])

  const toggle = () => {
    const next = motion === 'on' ? 'off' : 'on'
    setMotion(next)
    document.documentElement.dataset.motion = next
    try {
      localStorage.setItem('motion', next)
    } catch {
      /* same as above */
    }
  }

  return (
    <ThemeContext.Provider value={{ resolvedTheme: dark ? 'dark' : 'light', setTheme }}>
      <MotionContext.Provider value={{ motion, toggle }}>
        <LangContext.Provider value={{ lang, t: content[lang], setLang }}>
          <MotionConfig reducedMotion={motion === 'off' ? 'always' : 'never'}>{children}</MotionConfig>
        </LangContext.Provider>
      </MotionContext.Provider>
    </ThemeContext.Provider>
  )
}
