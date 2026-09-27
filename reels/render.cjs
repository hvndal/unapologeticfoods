#!/usr/bin/env node
/* Renders the reels in reels/src/*.html to 1080×1920 30 fps silent MP4s.
 *
 *   NODE_PATH=$(npm root -g) node reels/render.cjs            # every reel
 *   NODE_PATH=$(npm root -g) node reels/render.cjs 01 03      # reels whose file name starts with 01 / 03
 *   ... --stills=0.5,2,4.25 [--out=dir]                       # PNG stills instead of video
 *
 * Needs Playwright (Chromium) and ffmpeg (FFMPEG=/path/to/ffmpeg, else `ffmpeg` on PATH).
 * The hero fire clip is split into frames once, into reels/.cache/fire/.
 * Reel 04 also needs the site screenshots from capture-site.cjs (reels/.cache/site/).
 */
'use strict';
const { chromium } = require('playwright');
const { spawn, execFileSync } = require('child_process');
const fs = require('fs');
const http = require('http');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(__dirname, 'src');
const CACHE = path.join(__dirname, '.cache');
const FFMPEG = process.env.FFMPEG || 'ffmpeg';
const FPS = 30;

const args = process.argv.slice(2);
const opt = k => (args.find(a => a.startsWith(`--${k}=`)) || '').split('=')[1];
const picks = args.filter(a => !a.startsWith('--'));
const stills = opt('stills') ? opt('stills').split(',').map(Number) : null;
const outDir = opt('out') || __dirname;

function fireFrames() {
  const dir = path.join(CACHE, 'fire');
  if (fs.existsSync(path.join(dir, 'f0360.jpg'))) return;
  fs.mkdirSync(dir, { recursive: true });
  // 12 s hero clip at 25 fps → 30 fps frames, a 900×1080 window around the flame
  execFileSync(FFMPEG, ['-hide_banner', '-loglevel', 'error', '-y', '-i', path.join(ROOT, 'assets/video/fire.mp4'),
    '-vf', 'fps=30,crop=900:1080:560:0', '-q:v', '2', '-frames:v', '360', path.join(dir, 'f%04d.jpg')]);
}

const TYPES = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.webp': 'image/webp', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.json': 'application/json', '.mp4': 'video/mp4' };
function serve() {
  const server = http.createServer((req, res) => {
    const file = path.join(ROOT, decodeURIComponent(req.url.split('?')[0]));
    if (!file.startsWith(ROOT)) { res.writeHead(403); return res.end(); }
    fs.readFile(file, (err, buf) => {
      if (err) { res.writeHead(404); return res.end(); }
      res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' });
      res.end(buf);
    });
  });
  return new Promise(r => server.listen(0, '127.0.0.1', () => r(server)));
}

async function renderReel(browser, port, file) {
  const name = path.basename(file, '.html');
  const page = await browser.newPage({ viewport: { width: 540, height: 960 }, deviceScaleFactor: 2 });
  page.on('pageerror', e => console.error(`[${name}]`, e.message));
  await page.goto(`http://127.0.0.1:${port}/reels/src/${name}.html`);
  await page.evaluate(() => window.READY);
  const duration = await page.evaluate(() => window.DURATION);
  const stage = await page.$('.stage');

  if (stills) {
    fs.mkdirSync(outDir, { recursive: true });
    for (const t of stills) {
      await page.evaluate(t => window.render(t), t);
      await stage.screenshot({ path: path.join(outDir, `${name}@${t.toFixed(2)}.png`) });
    }
    console.log(`${name}: ${stills.length} stills → ${outDir}`);
    return page.close();
  }

  const out = path.join(outDir, `${name}.mp4`);
  const ff = spawn(FFMPEG, ['-hide_banner', '-loglevel', 'error', '-y',
    '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '21', '-maxrate', '14M', '-bufsize', '28M',
    '-pix_fmt', 'yuv420p', '-profile:v', 'high', '-level', '4.2', '-r', String(FPS),
    '-color_primaries', 'bt709', '-color_trc', 'bt709', '-colorspace', 'bt709',
    '-movflags', '+faststart', '-an', out], { stdio: ['pipe', 'inherit', 'inherit'] });
  const done = new Promise((res, rej) => ff.on('close', c => (c ? rej(new Error(`ffmpeg exited ${c}`)) : res())));

  const frames = Math.round(duration * FPS);
  const t0 = Date.now();
  for (let f = 0; f < frames; f++) {
    await page.evaluate(t => window.render(t), f / FPS);
    const buf = await stage.screenshot({ type: 'jpeg', quality: 95 });
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
    if (f % 60 === 0) process.stdout.write(`\r${name}: ${f}/${frames}`);
  }
  ff.stdin.end();
  await done;
  console.log(`\r${name}: ${frames} frames, ${duration}s → ${path.relative(ROOT, out)} (${((Date.now() - t0) / 1000).toFixed(0)}s)`);
  await page.close();
}

(async () => {
  fireFrames();
  const all = fs.readdirSync(SRC).filter(f => /^\d\d-.*\.html$/.test(f)).sort();
  const files = picks.length ? all.filter(f => picks.some(p => f.startsWith(p))) : all;
  const server = await serve();
  const browser = await chromium.launch();
  try {
    for (const f of files) await renderReel(browser, server.address().port, f);
  } finally {
    await browser.close();
    server.close();
  }
})().catch(e => { console.error(e); process.exit(1); });
