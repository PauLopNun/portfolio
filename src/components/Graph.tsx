import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const NODES = 54
const PULSES = 70
const ACCENT = 0xc6ff3d

function dot() {
  const c = document.createElement('canvas')
  c.width = c.height = 64
  const g = c.getContext('2d')!
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32)
  grad.addColorStop(0, 'rgba(255,255,255,1)')
  grad.addColorStop(0.35, 'rgba(255,255,255,0.8)')
  grad.addColorStop(1, 'rgba(255,255,255,0)')
  g.fillStyle = grad
  g.fillRect(0, 0, 64, 64)
  return new THREE.CanvasTexture(c)
}

export default function Graph() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current!
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100)
    camera.position.z = 9

    const group = new THREE.Group()
    scene.add(group)

    const pts: THREE.Vector3[] = []
    for (let i = 0; i < NODES; i++) {
      const u = Math.random() * Math.PI * 2
      const v = Math.acos(2 * Math.random() - 1)
      const r = 2.2 + Math.random() * 2.6
      pts.push(new THREE.Vector3(r * Math.sin(v) * Math.cos(u) * 1.35, r * Math.sin(v) * Math.sin(u) * 0.85, r * Math.cos(v)))
    }

    const edges: [number, number][] = []
    const degree = new Array(NODES).fill(0)
    const pairs: [number, number, number][] = []
    for (let i = 0; i < NODES; i++)
      for (let j = i + 1; j < NODES; j++) pairs.push([i, j, pts[i].distanceTo(pts[j])])
    pairs.sort((a, b) => a[2] - b[2])
    for (const [i, j, d] of pairs) {
      if (d > 3.1) break
      if (degree[i] < 4 && degree[j] < 4) {
        edges.push([i, j])
        degree[i]++
        degree[j]++
      }
    }

    const linePos = new Float32Array(edges.length * 6)
    edges.forEach(([a, b], k) => {
      pts[a].toArray(linePos, k * 6)
      pts[b].toArray(linePos, k * 6 + 3)
    })
    const lineGeo = new THREE.BufferGeometry()
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePos, 3))
    const lines = new THREE.LineSegments(
      lineGeo,
      new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.13 }),
    )
    group.add(lines)

    const tex = dot()
    const nodeGeo = new THREE.BufferGeometry().setFromPoints(pts)
    const nodes = new THREE.Points(
      nodeGeo,
      new THREE.PointsMaterial({ map: tex, size: 0.2, transparent: true, depthWrite: false, color: 0xffffff, opacity: 0.9 }),
    )
    group.add(nodes)

    const pulse = Array.from({ length: PULSES }, () => ({
      e: Math.floor(Math.random() * edges.length),
      t: Math.random(),
      s: 0.15 + Math.random() * 0.35,
      dir: Math.random() > 0.5 ? 1 : -1,
    }))
    const pulsePos = new Float32Array(PULSES * 3)
    const pulseGeo = new THREE.BufferGeometry()
    pulseGeo.setAttribute('position', new THREE.BufferAttribute(pulsePos, 3))
    const pulses = new THREE.Points(
      pulseGeo,
      new THREE.PointsMaterial({
        map: tex,
        size: 0.42,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        color: ACCENT,
      }),
    )
    group.add(pulses)

    const tmp = new THREE.Vector3()
    const place = () => {
      pulse.forEach((p, i) => {
        const [a, b] = edges[p.e]
        tmp.lerpVectors(pts[a], pts[b], p.dir > 0 ? p.t : 1 - p.t)
        tmp.toArray(pulsePos, i * 3)
      })
      pulseGeo.attributes.position.needsUpdate = true
    }

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = canvas
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.position.z = w < 700 ? 13 : 9
      camera.updateProjectionMatrix()
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const mouse = { x: 0, y: 0 }
    const onMove = (e: PointerEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('pointermove', onMove)

    let raf = 0
    let last = performance.now()
    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      group.rotation.y += dt * 0.07
      group.rotation.x += (mouse.y * 0.25 - group.rotation.x) * 0.04
      group.position.x += (mouse.x * 0.35 - group.position.x) * 0.04
      pulse.forEach((p) => {
        p.t += p.s * dt
        if (p.t >= 1) {
          const [a, b] = edges[p.e]
          const head = p.dir > 0 ? b : a
          const next = edges
            .map((e, idx) => [e, idx] as const)
            .filter(([e]) => e[0] === head || e[1] === head)
          const [pick, idx] = next[Math.floor(Math.random() * next.length)]
          p.e = idx
          p.dir = pick[0] === head ? 1 : -1
          p.t = 0
        }
      })
      place()
      renderer.render(scene, camera)
      raf = requestAnimationFrame(tick)
    }

    place()
    if (reduced) renderer.render(scene, camera)
    else raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('pointermove', onMove)
      ;[lineGeo, nodeGeo, pulseGeo].forEach((g) => g.dispose())
      tex.dispose()
      renderer.dispose()
    }
  }, [])

  return <canvas ref={ref} className="graph" aria-hidden="true" />
}
