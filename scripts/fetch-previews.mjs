// Downloads the current GitHub social preview of every featured repository into public/images,
// so the project covers always show what the repo shows. Runs before `vite build` in the Pages workflow.
// If a download fails (rate limit, offline), the image already in the repo is kept.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const data = fs.readFileSync(path.join(root, 'src/data.ts'), 'utf8')
const owner = /github\.com\/(PauLopNun)\//.exec(data)?.[1] ?? 'PauLopNun'
const repos = [...data.matchAll(/repo:\s*"([^"]+)"/g)].map((m) => m[1])
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function get(url, tries = 5) {
  for (let i = 0; i < tries; i++) {
    const res = await fetch(url, { redirect: 'follow' })
    if (res.ok) return res
    if (res.status !== 429 && res.status < 500) return res
    await sleep(4000 * (i + 1))
  }
  return null
}

for (const repo of repos) {
  const file = path.join(root, 'public/images', `project-${repo.toLowerCase()}.png`)
  try {
    const page = await get(`https://github.com/${owner}/${repo}`)
    const html = page?.ok ? await page.text() : ''
    const url = /<meta property="og:image" content="([^"]+)"/.exec(html)?.[1]
    if (!url) throw new Error('no og:image found')
    const img = await get(url)
    if (!img?.ok || !(img.headers.get('content-type') ?? '').startsWith('image/')) throw new Error(`image request failed (${img?.status})`)
    const buf = Buffer.from(await img.arrayBuffer())
    fs.mkdirSync(path.dirname(file), { recursive: true })
    const changed = !fs.existsSync(file) || !fs.readFileSync(file).equals(buf)
    fs.writeFileSync(file, buf)
    console.log(`${repo}: ${changed ? 'updated' : 'unchanged'} (${buf.length} bytes)`)
  } catch (e) {
    console.warn(`${repo}: kept the existing image (${e.message})`)
  }
}
