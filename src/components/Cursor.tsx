import { useEffect, useRef } from 'react'

export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const el = ref.current!
    document.documentElement.classList.add('has-cursor')
    let x = 0, y = 0, cx = 0, cy = 0, raf = 0
    const move = (e: PointerEvent) => {
      x = e.clientX
      y = e.clientY
      const t = e.target as HTMLElement
      el.classList.toggle('is-hover', !!t.closest('a, button, [data-hover]'))
    }
    const loop = () => {
      cx += (x - cx) * 0.2
      cy += (y - cy) * 0.2
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener('pointermove', move)
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('pointermove', move)
      cancelAnimationFrame(raf)
      document.documentElement.classList.remove('has-cursor')
    }
  }, [])

  return <div ref={ref} className="cursor" aria-hidden="true" />
}
