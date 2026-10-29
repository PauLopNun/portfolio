import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { heroState } from '../heroState'

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

// Every particle has two homes: a pixel of the portrait (aA) and a point inside the GitHub mark (aB).
const VERT = /* glsl */ `
  uniform float uProg, uTime, uPR, uScale, uStrength, uLogoSize;
  uniform vec2 uMouse;
  attribute vec3 aA;
  attribute vec3 aB;
  attribute vec2 aP; // x: seed, y: size in the portrait
  attribute vec3 aCol;
  varying vec3 vCol;
  varying float vAcc, vMix, vNoise;

  void main() {
    float seed = aP.x;
    vec3 A = aA;
    A.z += sin(uTime * 0.8 + seed * 40.0) * 0.015;
    vec3 B = aB + 0.022 * vec3(sin(uTime * 0.9 + seed * 50.0), cos(uTime * 0.7 + seed * 70.0), sin(uTime * 0.8 + seed * 30.0));

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
    gl_PointSize = max(mix(aP.y, uLogoSize, e) * uScale * uPR / -mv.z, 1.4);
    vCol = aCol;
    vNoise = fract(seed * 91.7);
    vAcc = step(0.93, fract(seed * 7.13));
    vMix = e;
  }
`

const FRAG = /* glsl */ `
  varying vec3 vCol;
  varying float vAcc, vMix, vNoise;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.36, d);
    vec3 skin = (vCol * 1.1 + 0.01) * (0.9 + 0.2 * vNoise);
    vec3 logo = vec3(0.953, 0.933, 0.894) * (0.8 + 0.2 * vNoise);
    vec3 accent = vec3(1.0, 0.42, 0.24);
    vec3 col = mix(skin, logo, vMix);
    col = mix(col, accent, vAcc * (0.1 + 0.9 * vMix));
    gl_FragColor = vec4(col, a);
  }
`

export default function Graph() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const small = window.innerWidth < 700
    const N = small ? 210 : 360 // sampling grid of the portrait
    const PORTRAIT = small ? 5.4 : 6.2
    const LOGO = small ? 3.9 : 5.2
    const rand = rng(7)
    const base = import.meta.env.BASE_URL

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: 'low-power' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 100)
    camera.position.z = small ? 13 : 9
    const group = new THREE.Group()
    scene.add(group)
    const home = small ? { x: 0, y: 2.6 } : { x: 3.0, y: -0.1 }
    const end = small ? { x: 0, y: 1.7 } : { x: 2.8, y: 0.5 }

    const uniforms = {
      uProg: { value: 0 },
      uTime: { value: 0 },
      uPR: { value: renderer.getPixelRatio() },
      uScale: { value: 600 },
      uStrength: { value: 1 },
      uLogoSize: { value: small ? 0.034 : 0.028 },
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
    let underTex: THREE.CanvasTexture | null = null
    let underMat: THREE.ShaderMaterial | null = null
    let underGeo: THREE.PlaneGeometry | null = null

    // ---- frame
    let prog = 0
    let time = 0
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
      renderer.render(scene, camera)
    }

    const build = () => {
      if (cancelled) return
      const c = document.createElement('canvas')
      c.width = c.height = N
      const g = c.getContext('2d', { willReadFrequently: true })!
      g.drawImage(img, 0, 0, N, N)
      const px = g.getImageData(0, 0, N, N).data
      const at = (x: number, y: number, k: number) => px[(y * N + x) * 4 + k] / 255

      // Backdrop = pixels close to the backdrop colour that connect to the image border. Anything enclosed
      // by the subject (the shadow under the jaw, gaps between curls) stays part of the portrait.
      const looksLikeBackdrop = (x: number, y: number) => {
        const yb = Math.min(y, Math.floor(N * 0.45)) // backdrop is read from the upper rows, below them the border is the shirt
        const u = x / N
        const i = (y * N + x) * 4
        const pr = px[i] / 255
        const pg = px[i + 1] / 255
        const pb = px[i + 2] / 255
        // the backdrop is a neutral grey; warm skin shadows are not, so the fill cannot leak into the neck
        const neutral = Math.abs(pr - pb) < 0.04 && Math.abs(pg - (pr + pb) / 2) < 0.04
        return (
          neutral &&
          Math.hypot(
            pr - (at(2, yb, 0) * (1 - u) + at(N - 3, yb, 0) * u),
            pg - (at(2, yb, 1) * (1 - u) + at(N - 3, yb, 1) * u),
            pb - (at(2, yb, 2) * (1 - u) + at(N - 3, yb, 2) * u),
          ) < 0.15
        )
      }
      const backdrop = new Uint8Array(N * N)
      const stack: number[] = []
      const flood = (x: number, y: number) => {
        const k = y * N + x
        if (!backdrop[k] && looksLikeBackdrop(x, y)) {
          backdrop[k] = 1
          stack.push(k)
        }
      }
      for (let t = 0; t < N; t++) {
        flood(t, 0)
        flood(t, N - 1)
        flood(0, t)
        flood(N - 1, t)
      }
      while (stack.length) {
        const k = stack.pop()!
        const x = k % N
        const y = (k - x) / N
        if (x > 0) flood(x - 1, y)
        if (x < N - 1) flood(x + 1, y)
        if (y > 0) flood(x, y - 1)
        if (y < N - 1) flood(x, y + 1)
      }

      const mask = new ImageData(N, N) // silhouette of the portrait, used to cut out the photo underneath
      const A: number[] = []
      const col: number[] = []
      const lum: number[] = []
      for (let y = 0; y < N; y++)
        for (let x = 0; x < N; x++) {
          const i = (y * N + x) * 4
          const r = px[i] / 255
          const gg = px[i + 1] / 255
          const b = px[i + 2] / 255
          const u = x / N
          const v = y / N
          const radial = Math.hypot((u - 0.5) / 0.5, (v - 0.46) / 0.56)
          const fade = 1 - smooth(radial, 0.7, 1.02)
          const isBackdrop = backdrop[y * N + x] === 1
          mask.data[i + 3] = isBackdrop ? 0 : 255 * fade
          if (isBackdrop || rand() < 1 - fade) continue
          const cell = PORTRAIT / N
          A.push((u - 0.5) * PORTRAIT + (rand() - 0.5) * cell * 0.5, (0.5 - v) * PORTRAIT + (rand() - 0.5) * cell * 0.5, 0)
          col.push(r, gg, b)
          lum.push(0.2126 * r + 0.7152 * gg + 0.0722 * b)
        }
      const M = lum.length

      // ---- the GitHub mark: every particle gets a random point inside its silhouette
      const LS = 512
      const lc = document.createElement('canvas')
      lc.width = lc.height = LS
      const lg = lc.getContext('2d', { willReadFrequently: true })!
      lg.drawImage(logo, 0, 0, LS, LS)
      const ld = lg.getImageData(0, 0, LS, LS).data
      const filled: number[] = []
      for (let k = 0; k < LS * LS; k++) if (ld[k * 4 + 3] > 128) filled.push(k)

      const aB = new Float32Array(M * 3)
      const aP = new Float32Array(M * 2)
      for (let i = 0; i < M; i++) {
        if (filled.length) {
          const k = filled[(rand() * filled.length) | 0]
          aB[i * 3] = ((k % LS) + rand()) / LS - 0.5
          aB[i * 3 + 1] = 0.5 - (Math.floor(k / LS) + rand()) / LS
          aB[i * 3 + 2] = (rand() - 0.5) * 0.04
          aB[i * 3] *= LOGO
          aB[i * 3 + 1] *= LOGO
        } else {
          aB.set([A[i * 3], A[i * 3 + 1], 0], i * 3) // icon failed to load: stay a portrait
        }
        const v = 0.5 - A[i * 3 + 1] / PORTRAIT
        const seed = Math.min(Math.max(0.62 * v + 0.38 * rand(), 0), 0.999) // dissolves from the top down
        aP[i * 2] = seed
        aP[i * 2 + 1] = (PORTRAIT / N) * (1.7 + lum[i] * 0.4)
      }
      geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(M * 3), 3))
      geo.setAttribute('aA', new THREE.BufferAttribute(new Float32Array(A), 3))
      geo.setAttribute('aB', new THREE.BufferAttribute(aB, 3))
      geo.setAttribute('aP', new THREE.BufferAttribute(aP, 2))
      geo.setAttribute('aCol', new THREE.BufferAttribute(new Float32Array(col), 3))

      // the photo itself, cut out and sitting just behind the particles: it fills the gaps between dots
      const T = 720
      const pc = document.createElement('canvas')
      pc.width = pc.height = T
      const pg = pc.getContext('2d')!
      pg.drawImage(img, 0, 0, T, T)
      const mc = document.createElement('canvas')
      mc.width = mc.height = N
      mc.getContext('2d')!.putImageData(mask, 0, 0)
      pg.globalCompositeOperation = 'destination-in'
      pg.imageSmoothingQuality = 'high'
      pg.drawImage(mc, 0, 0, T, T)
      underTex = new THREE.CanvasTexture(pc)
      underTex.colorSpace = THREE.SRGBColorSpace
      underMat = new THREE.ShaderMaterial({
        uniforms: { uMap: { value: underTex }, uProg: uniforms.uProg, uMouse: uniforms.uMouse, uStrength: uniforms.uStrength },
        vertexShader: `varying vec2 vUv; varying vec2 vP; void main() { vUv = uv; vP = position.xy; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
        fragmentShader: `uniform sampler2D uMap; uniform float uProg, uStrength; uniform vec2 uMouse; varying vec2 vUv; varying vec2 vP;
          void main() {
            vec4 t = texture2D(uMap, vUv);
            float hole = smoothstep(0.0, 0.95, length(vP - uMouse));
            float a = t.a * (1.0 - smoothstep(0.0, 0.22, uProg)) * 0.9 * mix(1.0, hole, uStrength);
            gl_FragColor = vec4(pow(t.rgb, vec3(1.0 / 2.2)), a);
          }`,
        transparent: true,
        depthWrite: false,
      })
      underGeo = new THREE.PlaneGeometry(PORTRAIT, PORTRAIT)
      const under = new THREE.Mesh(underGeo, underMat)
      under.position.z = -0.08
      group.add(under)

      points = new THREE.Points(geo, material)
      points.frustumCulled = false
      group.add(points)
      if (reduced) frame(0)
    }

    let cancelled = false
    const img = new Image()
    const logo = new Image()
    logo.width = logo.height = 512 // the SVG only has a viewBox; give it a size so it can be drawn to a canvas
    let pending = 2
    const loaded = () => {
      if (--pending === 0) build()
    }
    img.onload = loaded
    logo.onload = loaded
    logo.onerror = loaded
    img.src = `${base}images/portrait.webp`
    logo.src = `${base}icons/github.svg`

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
      underTex?.dispose()
      underMat?.dispose()
      underGeo?.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div className="graph" role="img" aria-label="Portrait of Pau López Núñez that dissolves and rebuilds itself as the GitHub logo">
      <canvas ref={canvasRef} />
    </div>
  )
}
