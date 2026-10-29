import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { MotionConfig } from 'framer-motion'

type Theme = 'light' | 'dark' | 'system'
type Motion = 'on' | 'off'

const ThemeContext = createContext<{ resolvedTheme: 'light' | 'dark'; setTheme: (t: Theme) => void }>({
  resolvedTheme: 'light',
  setTheme: () => {},
})
const MotionContext = createContext<{ motion: Motion; toggle: () => void }>({ motion: 'on', toggle: () => {} })

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
        <MotionConfig reducedMotion={motion === 'off' ? 'always' : 'never'}>{children}</MotionConfig>
      </MotionContext.Provider>
    </ThemeContext.Provider>
  )
}
