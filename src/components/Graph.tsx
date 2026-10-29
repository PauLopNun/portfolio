import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const ACCENT = 0xc6ff3d

// Services named in the Transport Service project (src/data.ts): the node set the graph is built around.
const LABELS = ['Transport', 'RabbitMQ', 'Time', 'Warehouse', 'Shipment']

function rng(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function sprite(core: number) {
  const c = document.createElement('canvas')
  c.width = c.height = 64
  const g = c.getContext('2d')!
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32)
  grad.addColorStop(0, 'rgba(255,255,255,1)')
  grad.addColorStop(core, 'rgba(255,255,255,0.9)')
  grad.addColorStop(Math.min(core + 0.2, 1), 'rgba(255,255,255,0.18)')
  grad.addColorStop(1, 'rgba(255,255,255,0)')
  g.fillStyle = grad
  g.fillRect(0, 0, 64, 64)
  return new THREE.CanvasTexture(c)
}

export default function Graph() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const canvas = canvasRef.current!
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const small = window.innerWidth < 700
    const NODES = small ? 38 : 54
    const PULSES = small ? 30 : 64
    const labelCount = small ? 3 : LABELS.length
    const rand = rng(7)

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: !small, alpha: true, powerPreference: 'low-power' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, small ? 1.5 : 2))
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x0a0a0b, small ? 0.028 : 0.052)
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100)
    camera.position.z = 9

    const group = new THREE.Group()
    scene.add(group)

    const pts: THREE.Vector3[] = []
    for (let i = 0; i < NODES; i++) {
      const u = rand() * Math.PI * 2
      const v = Math.acos(2 * rand() - 1)
      const r = 2.2 + rand() * 2.6
      pts.push(new THREE.Vector3(r * Math.sin(v) * Math.cos(u) * 1.35, r * Math.sin(v) * Math.sin(u) * 0.85, r * Math.cos(v)))
    }

    const edges: [number, number][] = []
    const adj: number[][] = Array.from({ length: NODES }, () => [])
    const pairs: [number, number, number][] = []
    for (let i = 0; i < NODES; i++)
      for (let j = i + 1; j < NODES; j++) pairs.push([i, j, pts[i].distanceTo(pts[j])])
    pairs.sort((a, b) => a[2] - b[2])
    for (const [i, j, d] of pairs) {
      if (d > 3.1) break
      if (adj[i].length < 4 && adj[j].length < 4) {
        adj[i].push(edges.length)
        adj[j].push(edges.length)
        edges.push([i, j])
      }
    }

    // Labelled nodes: the best-connected ones, so events visibly pass through them.
    const hubs = adj
      .map((a, i) => [i, a.length] as const)
      .sort((a, b) => b[1] - a[1])
      .slice(0, labelCount)
      .map(([i]) => i)

    const linePos = new Float32Array(edges.length * 6)
    edges.forEach(([a, b], k) => {
      pts[a].toArray(linePos, k * 6)
      pts[b].toArray(linePos, k * 6 + 3)
    })
    const lineGeo = new THREE.BufferGeometry()
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePos, 3))
    group.add(new THREE.LineSegments(lineGeo, new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.16 })))

    const soft = sprite(0.3)
    const crisp = sprite(0.55)
    const nodeGeo = new THREE.BufferGeometry().setFromPoints(pts)
    group.add(
      new THREE.Points(nodeGeo, new THREE.PointsMaterial({ map: crisp, size: small ? 0.26 : 0.16, transparent: true, depthWrite: false, opacity: 0.85 })),
    )
    const hubGeo = new THREE.BufferGeometry().setFromPoints(hubs.map((i) => pts[i]))
    group.add(
      new THREE.Points(hubGeo, new THREE.PointsMaterial({ map: crisp, size: small ? 0.44 : 0.3, transparent: true, depthWrite: false, color: ACCENT })),
    )

    // Hover marker on the node closest to the cursor.
    const markPos = new Float32Array(3)
    const markGeo = new THREE.BufferGeometry()
    markGeo.setAttribute('position', new THREE.BufferAttribute(markPos, 3))
    const mark = new THREE.Points(
      markGeo,
      new THREE.PointsMaterial({ map: soft, size: 0.9, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, color: ACCENT, opacity: 0 }),
    )
    mark.frustumCulled = false
    group.add(mark)

    const pulse = Array.from({ length: PULSES }, () => ({
      e: Math.floor(rand() * edges.length),
      t: rand(),
      base: 0.15 + rand() * 0.3,
      s: 0,
      dir: rand() > 0.5 ? 1 : -1,
    }))
    pulse.forEach((p) => (p.s = p.base))
    const pulsePos = new Float32Array(PULSES * 3)
    const pulseGeo = new THREE.BufferGeometry()
    pulseGeo.setAttribute('position', new THREE.BufferAttribute(pulsePos, 3))
    group.add(
      new THREE.Points(
        pulseGeo,
        new THREE.PointsMaterial({ map: crisp, size: small ? 0.42 : 0.3, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, color: ACCENT }),
      ),
    )

    const tmp = new THREE.Vector3()
    const place = () => {
      pulse.forEach((p, i) => {
        const [a, b] = edges[p.e]
        tmp.lerpVectors(pts[a], pts[b], p.dir > 0 ? p.t : 1 - p.t)
        tmp.toArray(pulsePos, i * 3)
      })
      pulseGeo.attributes.position.needsUpdate = true
    }

    let burstCursor = 0
    const burst = (n: number) => {
      adj[n].forEach((ei) => {
        const p = pulse[burstCursor++ % PULSES]
        p.e = ei
        p.dir = edges[ei][0] === n ? 1 : -1
        p.t = 0
        p.s = 1.1
      })
    }

    // labels fade out where they would sit on top of the hero copy
    let boxes: { l: number; t: number; r: number; b: number }[] = []
    const measure = () => {
      const c = canvas.getBoundingClientRect()
      const pad = 18
      boxes = [...(canvas.closest('.hero')?.querySelectorAll('.hero-inner .line, .hero-inner .kicker, .hero-inner .lede, .hero-inner .btn') ?? [])].map((el) => {
        const range = document.createRange()
        range.selectNodeContents(el)
        const r = range.getBoundingClientRect()
        return { l: r.left - c.left - pad, t: r.top - c.top - pad, r: r.right - c.left + pad, b: r.bottom - c.top + pad }
      })
    }
    const resize = () => {
      const { clientWidth: w, clientHeight: h } = canvas
      measure()
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.position.z = w < 700 ? 13 : 9
      camera.updateProjectionMatrix()
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    const settle = window.setTimeout(measure, 2000) // after the hero intro animation

    const mouse = { x: 0, y: 0, px: -9999, py: -9999, active: false }
    const onMove = (e: PointerEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2
      mouse.px = e.clientX
      mouse.py = e.clientY
      mouse.active = true
    }
    let tap = false
    const onDown = (e: PointerEvent) => {
      onMove(e)
      tap = true
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerdown', onDown)

    const screen = new THREE.Vector3()
    let hover = -1
    let markAlpha = 0
    const project = (i: number, w: number, h: number) => {
      screen.copy(pts[i]).applyMatrix4(group.matrixWorld).project(camera)
      return { x: (screen.x * 0.5 + 0.5) * w, y: (-screen.y * 0.5 + 0.5) * h, z: screen.z }
    }

    const updateLabels = () => {
      const { clientWidth: w, clientHeight: h } = canvas
      hubs.forEach((n, k) => {
        const el = labelRefs.current[k]
        if (!el) return
        const s = project(n, w, h)
        el.style.transform = `translate(${s.x + 14}px, ${s.y - 8}px)`
        const hidden = boxes.some((q) => s.x > q.l && s.x < q.r && s.y > q.t && s.y < q.b)
        el.style.opacity = hidden ? '0' : '1'
        el.classList.toggle('on', hover === n)
      })
    }

    const find = (w: number, h: number) => {
      if (!mouse.active) return -1
      const r = canvas.getBoundingClientRect()
      const mx = mouse.px - r.left
      const my = mouse.py - r.top
      let best = -1
      let bd = 70 * 70
      for (let i = 0; i < NODES; i++) {
        const s = project(i, w, h)
        const d = (s.x - mx) ** 2 + (s.y - my) ** 2
        if (d < bd) {
          bd = d
          best = i
        }
      }
      return best
    }

    let running = !reduced
    let raf = 0
    let last = performance.now()
    let frame = 0
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick)
      if (!running) {
        last = now
        return
      }
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      group.rotation.y += dt * 0.07
      group.rotation.x += (mouse.y * 0.25 - group.rotation.x) * 0.04
      group.position.x += ((canvas.clientWidth > 900 ? 2.1 : 0) + mouse.x * 0.35 - group.position.x) * 0.04
      group.position.y = small ? 1.6 : 0
      group.updateMatrixWorld()

      if (frame++ % 3 === 0) {
        const n = find(canvas.clientWidth, canvas.clientHeight)
        if (n !== hover) {
          hover = n
          if (n >= 0) {
            burst(n)
            pts[n].toArray(markPos)
            markGeo.attributes.position.needsUpdate = true
          }
        }
      }
      if (tap) {
        tap = false
        if (hover >= 0) burst(hover)
      }
      markAlpha += ((hover >= 0 ? 0.85 : 0) - markAlpha) * 0.15
      ;(mark.material as THREE.PointsMaterial).opacity = markAlpha

      pulse.forEach((p) => {
        p.t += p.s * dt
        if (p.t >= 1) {
          const [a, b] = edges[p.e]
          const head = p.dir > 0 ? b : a
          const next = adj[head]
          const idx = next[Math.floor(Math.random() * next.length)]
          p.e = idx
          p.dir = edges[idx][0] === head ? 1 : -1
          p.t = 0
          p.s = p.base
        }
      })
      place()
      updateLabels()
      renderer.render(scene, camera)
    }

    const io = new IntersectionObserver(([en]) => (running = en.isIntersecting && !reduced && !document.hidden))
    io.observe(canvas)
    const onVis = () => {
      if (document.hidden) running = false
    }
    document.addEventListener('visibilitychange', onVis)

    place()
    group.position.x = canvas.clientWidth > 900 ? 2.1 : 0
    group.position.y = small ? 1.6 : 0
    group.updateMatrixWorld()
    updateLabels()
    renderer.render(scene, camera)
    if (!reduced) raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      clearTimeout(settle)
      io.disconnect()
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      document.removeEventListener('visibilitychange', onVis)
      ;[lineGeo, nodeGeo, hubGeo, markGeo, pulseGeo].forEach((g) => g.dispose())
      soft.dispose()
      crisp.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div className="graph" aria-hidden="true">
      <canvas ref={canvasRef} />
      {LABELS.slice(0, window.innerWidth < 700 ? 3 : LABELS.length).map((l, i) => (
        <span key={l} className="glabel" ref={(el) => { labelRefs.current[i] = el }}>
          {l}
        </span>
      ))}
    </div>
  )
}
