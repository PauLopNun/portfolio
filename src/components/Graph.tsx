import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { heroState } from '../heroState'

// Services named in the Transport Service project (src/data.ts).
const LABELS = ['RabbitMQ', 'Transport', 'Time', 'Warehouse', 'Shipment']
const FOV = 50
const TAN = Math.tan((FOV / 2) * (Math.PI / 180))

function rng(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const smooth = (x: number, a: number, b: number) => {
  const t = Math.min(Math.max((x - a) / (b - a), 0), 1)
  return t * t * (3 - 2 * t)
}

const VERT = /* glsl */ `
  uniform float uProg, uTime, uPR, uScale, uStrength, uGraphSize;
  uniform vec2 uMouse;
  attribute vec3 aA;
  attribute vec3 aEA;
  attribute vec3 aEB;
  attribute vec4 aP; // x: start along edge, y: speed, z: seed, w: size
  attribute float aLum;
  varying float vLum, vAcc, vMix, vNode;

  void main() {
    float seed = aP.z;
    vec3 A = aA;
    A.z += sin(uTime * 0.8 + seed * 40.0) * 0.03;

    float t = fract(aP.x + uTime * aP.y);
    vec3 B = mix(aEA, aEB, t);
    float ang = sin(uTime * 0.12) * 0.45;
    float ca = cos(ang), sa = sin(ang);
    B = vec3(B.x * ca + B.z * sa, B.y, -B.x * sa + B.z * ca);

    float lt = clamp(uProg * 1.7 - seed * 0.7, 0.0, 1.0);
    float e = lt * lt * (3.0 - 2.0 * lt);
    vec3 p = mix(A, B, e);
    p += sin(3.14159 * e) * vec3(cos(seed * 60.0 + uTime), sin(seed * 47.0 + uTime), cos(seed * 31.0)) * 1.1;

    vec2 d = p.xy - uMouse;
    float f = smoothstep(0.95, 0.0, length(d));
    p.xy += normalize(d + vec2(1e-4)) * f * 0.38 * uStrength;
    p.z += f * 0.45 * uStrength;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    vNode = step(length(aEB - aEA), 0.0001);
    gl_PointSize = max(mix(aP.w, uGraphSize, e) * (1.0 + vNode * e * 0.9) * uScale * uPR / -mv.z, 1.4);
    vLum = aLum;
    vAcc = step(0.9, fract(seed * 7.13));
    vMix = e;
  }
`

const FRAG = /* glsl */ `
  varying float vLum, vAcc, vMix, vNode;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.36, d);
    vec3 skin = vec3(0.953, 0.933, 0.894) * (0.2 + pow(vLum, 0.75) * 1.1);
    vec3 graph = vec3(0.953, 0.933, 0.894) * 0.55;
    vec3 accent = vec3(1.0, 0.42, 0.24);
    vec3 col = mix(skin, graph, vMix);
    col = mix(col, accent, vAcc * (0.12 + 0.88 * vMix) * (1.0 - vNode));
    col = mix(col, vec3(0.953, 0.933, 0.894), vNode * vMix);
    gl_FragColor = vec4(col, a);
  }
`

export default function Graph() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const canvas = canvasRef.current!
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const small = window.innerWidth < 700
    const N = small ? 170 : 280 // sampling grid of the portrait
    const PORTRAIT = small ? 5.4 : 6.2
    const GRAPH_SCALE = small ? 0.5 : 1
    const rand = rng(7)

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: 'low-power' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 100)
    camera.position.z = small ? 13 : 9
    const group = new THREE.Group()
    scene.add(group)
    const home = small ? { x: 0, y: 2.6 } : { x: 3.0, y: -0.1 }

    // ---- service graph: a RabbitMQ broker in the middle and one small cluster per service around it
    // (the Transport service talks to the other services only through RabbitMQ events)
    const S = GRAPH_SCALE
    const end = small ? { x: 0, y: 1.0 } : { x: 1.5, y: 0.3 }
    type GNode = { p: THREE.Vector3; w: number; label?: string }
    const nodes: GNode[] = []
    const edges: { a: number; b: number; bus: boolean }[] = []
    const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z)
    const add = (p: THREE.Vector3, w: number, label?: string) => nodes.push({ p: p.multiplyScalar(S), w, label }) - 1
    const link = (x: number, y: number, bus = false) => edges.push({ a: x, b: y, bus })

    const hub = add(V(0, 0, 0), 90, 'RabbitMQ')
    const ring: number[] = []
    for (let k = 0; k < 6; k++) {
      const t = (k / 6) * Math.PI * 2
      ring.push(add(V(Math.cos(t) * 0.8, Math.sin(t) * 0.5, Math.sin(t) * 0.7), 10))
      link(hub, ring[k])
    }
    ring.forEach((n, k) => link(n, ring[(k + 1) % 6]))

    const services: { name?: string; pos: THREE.Vector3 }[] = [
      { name: 'Transport', pos: V(-4.3, -0.5, 0.8) },
      { name: 'Time', pos: V(-1.8, 2.2, -1.0) },
      { name: 'Warehouse', pos: V(3.7, 1.8, 0.5) },
      { name: 'Shipment', pos: V(4.5, -1.8, -0.6) },
      { pos: V(0.6, -2.6, 1.0) },
    ]
    services.forEach(({ name, pos }) => {
      const c = add(pos.clone(), 70, name)
      const sats: number[] = []
      for (let k = 0; k < 5; k++) {
        const t = (k / 5) * Math.PI * 2 + 0.4
        sats.push(add(pos.clone().add(V(Math.cos(t) * 0.7, Math.sin(t) * 0.7, Math.sin(t * 2) * 0.35)), 10))
        link(c, sats[k])
      }
      sats.forEach((n, k) => link(n, sats[(k + 1) % 5]))
      link(hub, c, true)
      // second bus line: nearest broker node ↔ nearest satellite
      let best: [number, number, number] = [ring[0], sats[0], Infinity]
      for (const rn of ring) for (const sn of sats) {
        const d = nodes[rn].p.distanceTo(nodes[sn].p)
        if (d < best[2]) best = [rn, sn, d]
      }
      link(best[0], best[1], true)
    })

    const elen = edges.map((e) => nodes[e.a].p.distanceTo(nodes[e.b].p))
    const picker = (w: number[]) => {
      const cum: number[] = []
      w.reduce((sum, x, i) => (cum[i] = sum + x), 0)
      const tot = cum[cum.length - 1]
      return () => {
        const x = rand() * tot
        let lo = 0
        let hi = cum.length - 1
        while (lo < hi) {
          const m = (lo + hi) >> 1
          if (cum[m] < x) lo = m + 1
          else hi = m
        }
        return lo
      }
    }
    const pickEdge = picker(edges.map((e, i) => elen[i] * (e.bus ? 2.5 : 1)))
    const busIdx = edges.flatMap((e, i) => (e.bus ? [i] : []))
    const pickBusAt = picker(busIdx.map((i) => elen[i]))
    const pickBus = () => busIdx[pickBusAt()]
    const pickNode = picker(nodes.map((n) => n.w))
    const labelNodes = LABELS.slice(0, small ? 3 : LABELS.length).map((l) => nodes.findIndex((n) => n.label === l))

    const uniforms = {
      uProg: { value: 0 },
      uTime: { value: 0 },
      uPR: { value: renderer.getPixelRatio() },
      uScale: { value: 600 },
      uStrength: { value: 1 },
      uGraphSize: { value: small ? 0.045 : 0.034 },
      uMouse: { value: new THREE.Vector2(999, 999) },
    }
    const material = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms,
      transparent: true,
      depthWrite: false,
    })
    const geo = new THREE.BufferGeometry()
    let points: THREE.Points | null = null

    // ---- frame
    let prog = 0
    let time = 0
    const world = new THREE.Vector3()
    const mouse = { x: 999, y: 999, active: false }
    const frame = (dt: number) => {
      time += dt
      prog += (heroState.progress - prog) * Math.min(1, dt * 6)
      const e = smooth(prog, 0, 1)
      uniforms.uTime.value = time
      uniforms.uProg.value = prog
      uniforms.uStrength.value = 1 - 0.65 * smooth(prog, 0.2, 0.8)
      const halfH = camera.position.z * TAN
      const halfW = halfH * camera.aspect
      group.position.set(
        home.x * (1 - e) + end.x * e + (mouse.active ? mouse.x * 0.12 : 0),
        home.y * (1 - e) + end.y * e + (mouse.active ? mouse.y * 0.08 : 0),
        0,
      )
      if (mouse.active) uniforms.uMouse.value.set(mouse.x * halfW - group.position.x, mouse.y * halfH - group.position.y)

      const { clientWidth: w, clientHeight: h } = canvas
      const ca = Math.cos(Math.sin(time * 0.12) * 0.45)
      const sa = Math.sin(Math.sin(time * 0.12) * 0.45)
      labelNodes.forEach((n, k) => {
        const el = labelRefs.current[k]
        if (!el) return
        const show = smooth(prog, 0.7, 0.95)
        el.style.opacity = String(show)
        if (show <= 0) return
        const p = nodes[n].p
        world.set(p.x * ca + p.z * sa, p.y, -p.x * sa + p.z * ca).add(group.position).project(camera)
        const sx = (world.x * 0.5 + 0.5) * w
        const sy = (-world.y * 0.5 + 0.5) * h
        // keep labels off the closing sentence at the bottom left
        if (sy > h * 0.6 && (small || sx < w * 0.65)) el.style.opacity = '0'
        el.style.transform = `translate(${sx + 20}px, ${sy - 12}px)`
      })
      renderer.render(scene, camera)
    }

    // ---- portrait → particles (luminance picks brightness, distance from the backdrop picks the silhouette)
    let cancelled = false
    const img = new Image()
    img.onload = () => {
      if (cancelled) return
      const c = document.createElement('canvas')
      c.width = c.height = N
      const g = c.getContext('2d', { willReadFrequently: true })!
      g.drawImage(img, 0, 0, N, N)
      const px = g.getImageData(0, 0, N, N).data
      const at = (x: number, y: number, k: number) => px[(y * N + x) * 4 + k] / 255

      const A: number[] = []
      const lum: number[] = []
      for (let y = 0; y < N; y++)
        for (let x = 0; x < N; x++) {
          const i = (y * N + x) * 4
          const r = px[i] / 255
          const gg = px[i + 1] / 255
          const b = px[i + 2] / 255
          const u = x / N
          const v = y / N
          const dist = Math.hypot(
            r - (at(2, y, 0) * (1 - u) + at(N - 3, y, 0) * u),
            gg - (at(2, y, 1) * (1 - u) + at(N - 3, y, 1) * u),
            b - (at(2, y, 2) * (1 - u) + at(N - 3, y, 2) * u),
          )
          const radial = Math.hypot((u - 0.5) / 0.5, (v - 0.46) / 0.56)
          if (dist < 0.15 || rand() < smooth(radial, 0.7, 1.02)) continue
          const l = 0.2126 * r + 0.7152 * gg + 0.0722 * b
          const cell = PORTRAIT / N
          A.push((u - 0.5) * PORTRAIT + (rand() - 0.5) * cell * 0.8, (0.5 - v) * PORTRAIT + (rand() - 0.5) * cell * 0.8, (l - 0.3) * 0.9)
          lum.push(l)
        }
      const M = lum.length
      const aEA = new Float32Array(M * 3)
      const aEB = new Float32Array(M * 3)
      const aP = new Float32Array(M * 4)
      const jit = () => (rand() - 0.5) * 0.03
      for (let i = 0; i < M; i++) {
        const v = 0.5 - A[i * 3 + 1] / PORTRAIT
        const seed = Math.min(Math.max(0.62 * v + 0.38 * rand(), 0), 0.999)
        const accent = (seed * 7.13) % 1 > 0.9 // orange particles = events travelling along the bus lines
        let ea: THREE.Vector3
        let eb: THREE.Vector3
        let speed = 0
        if (!accent && rand() < 0.04) {
          // a few particles rest on the nodes so the services read as dots
          const j = V(rand() - 0.5, rand() - 0.5, rand() - 0.5).multiplyScalar(0.2 * S)
          ea = eb = nodes[pickNode()].p.clone().add(j)
        } else {
          const ei = accent ? pickBus() : pickEdge()
          let { a: na, b: nb } = edges[ei]
          if (accent && rand() < 0.5) [na, nb] = [nb, na]
          const j = V(jit(), jit(), jit())
          ea = nodes[na].p.clone().add(j)
          eb = nodes[nb].p.clone().add(j)
          speed = ((accent ? 0.75 : 0.28) * (0.6 + rand() * 0.8)) / elen[ei]
        }
        aEA.set(ea.toArray(), i * 3)
        aEB.set(eb.toArray(), i * 3)
        aP.set([rand(), speed, seed, (PORTRAIT / N) * (0.75 + Math.pow(lum[i], 0.9) * 1.25)], i * 4)
      }
      geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(M * 3), 3))
      geo.setAttribute('aA', new THREE.BufferAttribute(new Float32Array(A), 3))
      geo.setAttribute('aEA', new THREE.BufferAttribute(aEA, 3))
      geo.setAttribute('aEB', new THREE.BufferAttribute(aEB, 3))
      geo.setAttribute('aP', new THREE.BufferAttribute(aP, 4))
      geo.setAttribute('aLum', new THREE.BufferAttribute(new Float32Array(lum), 1))
      points = new THREE.Points(geo, material)
      points.frustumCulled = false
      group.add(points)
      if (reduced) frame(0)
    }
    img.src = `${import.meta.env.BASE_URL}images/portrait-dark.webp`

    // ---- viewport + pointer
    const resize = () => {
      const { clientWidth: w, clientHeight: h } = canvas
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      uniforms.uScale.value = h / (2 * TAN)
      if (reduced && points) frame(0)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      mouse.x = ((e.clientX - r.left) / r.width) * 2 - 1
      mouse.y = -(((e.clientY - r.top) / r.height) * 2 - 1)
      mouse.active = true
    }
    if (!reduced) window.addEventListener('pointermove', onMove)

    let running = !reduced
    let raf = 0
    let last = performance.now()
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick)
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      if (running) frame(dt)
    }
    const io = new IntersectionObserver(([en]) => (running = en.isIntersecting && !reduced && !document.hidden))
    io.observe(canvas)
    const onVis = () => document.hidden && (running = false)
    document.addEventListener('visibilitychange', onVis)
    if (!reduced) raf = requestAnimationFrame(tick)

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('visibilitychange', onVis)
      geo.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div className="graph" role="img" aria-label="Portrait of Pau López Núñez that dissolves into a graph of services passing events">
      <canvas ref={canvasRef} />
      {LABELS.slice(0, window.innerWidth < 700 ? 3 : LABELS.length).map((l, i) => (
        <span key={l} className="glabel" aria-hidden="true" ref={(el) => { labelRefs.current[i] = el }}>
          {l}
        </span>
      ))}
    </div>
  )
}
