#!/usr/bin/env node
/* Screenshots the site at phone size for the phone shots in the reels.
 *   NODE_PATH=$(npm root -g) node reels/capture-site.cjs
 * Writes reels/.cache/site/: hero-overlay.png (hero with the video area left transparent, so the
 * reel can play the fire underneath), page-NN.png (the whole page in 2000px slices, fixed bars
 * hidden), nav.png, dock.png, res-*.png (reservation panel states) and site.json (offsets, taps).
 */
'use strict';
const { chromium } = require('playwright');
const fs = require('fs');
const http = require('http');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(__dirname, '.cache', 'site');
const W = 390, H = 844, SLICE = 2000;
const TYPES = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.webp': 'image/webp', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.mp4': 'video/mp4', '.webm': 'video/webm' };

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const server = http.createServer((req, res) => {
    const file = path.join(ROOT, decodeURIComponent(req.url.split('?')[0]));
    fs.readFile(file, (err, buf) => {
      if (err) { res.writeHead(404); return res.end(); }
      res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' });
      res.end(buf);
    });
  });
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await page.goto(`http://127.0.0.1:${server.address().port}/index.html?static`);
  await page.addStyleTag({ content: 'html { scroll-behavior: auto !important; } *, *::before, *::after { transition: none !important; animation: none !important; } body::after { display: none !important; } .curtain, .pitch { display: none !important; }' });
  // walk the page so lazy images load, then settle at the top
  await page.evaluate(async () => {
    await document.fonts.ready;
    for (let y = 0; y < document.documentElement.scrollHeight; y += 500) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 40)); }
    await Promise.all([...document.images].map(i => (i.complete ? 0 : new Promise(r => { i.onload = i.onerror = r; }))));
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(300);
  const info = {};

  // 1. hero, video area transparent
  let tag = await page.addStyleTag({ content: 'html, body, .hero, .hero__media { background: transparent !important; } .hero__video { visibility: hidden !important; }' });
  await page.screenshot({ path: path.join(OUT, 'hero-overlay.png'), omitBackground: true });
  await tag.evaluate(t => t.remove());
  info.heroCta = await page.evaluate(() => { const r = document.querySelector('.hero__foot a, .hero__foot button, .hero [data-open="reserve"]'); if (!r) return null; const b = r.getBoundingClientRect(); return { x: b.x + b.width / 2, y: b.y + b.height / 2 }; });

  // 2. whole page in slices, without the fixed bars
  tag = await page.addStyleTag({ content: `.nav, .dock { visibility: hidden !important; } .hero { min-height: ${H}px !important; height: ${H}px !important; }` });
  const total = await page.evaluate(() => document.documentElement.scrollHeight);
  info.height = total;
  info.slices = [];
  for (let y = 0, i = 0; y < total; y += SLICE, i++) {
    const h = Math.min(SLICE, total - y);
    const file = `page-${String(i).padStart(2, '0')}.png`;
    await page.screenshot({ path: path.join(OUT, file), fullPage: true, clip: { x: 0, y, width: W, height: h } });
    info.slices.push({ file, y, h });
  }
  info.sections = await page.evaluate(() => {
    const o = {};
    const sel = { house: '#house', signature: '#signature', rite: '.rite', menu: '#menu', plates: '#plates', carte: '.carte', hearth: '#hearth',
      downstairs: '#downstairs', unapologetic: '#unapologetic', visit: '#visit', letters: '#letters', foot: '.foot' };
    for (const [k, s] of Object.entries(sel)) { const el = document.querySelector(s); if (el) { const r = el.getBoundingClientRect(); o[k] = { y: Math.round(r.top + scrollY), h: Math.round(r.height) }; } }
    return o;
  });
  await tag.evaluate(t => t.remove());

  // 3. fixed bars as they look once scrolled
  await page.evaluate(() => { window.scrollTo(0, 1400); document.querySelector('#nav').classList.add('is-scrolled'); document.querySelector('#dock').classList.add('is-on'); });
  await page.waitForTimeout(100);
  const navBox = await page.evaluate(() => { const b = document.querySelector('#nav').getBoundingClientRect(); return { x: 0, y: 0, width: b.width, height: Math.ceil(b.height) }; });
  await page.screenshot({ path: path.join(OUT, 'nav.png'), clip: navBox });
  const dockBox = await page.evaluate(() => { const b = document.querySelector('#dock').getBoundingClientRect(); return { x: 0, y: Math.floor(b.y), width: b.width, height: Math.min(Math.ceil(b.height), innerHeight - Math.floor(b.y)) }; });
  await page.screenshot({ path: path.join(OUT, 'dock.png'), clip: dockBox });
  info.nav = navBox;
  info.dock = dockBox;
  info.dockCta = await page.evaluate(() => { const b = document.querySelector('#dock .btn').getBoundingClientRect(); return { x: b.x + b.width / 2, y: b.y + b.height / 2 }; });

  // 4. reservation panel states (panel only, page hidden; the reel lays it over the page)
  await page.click('#dock .btn');
  await page.waitForTimeout(150);
  tag = await page.addStyleTag({ content: 'html, body { background: transparent !important; } main, .nav, .dock, .modal__scrim { visibility: hidden !important; }' });
  const center = sel => page.evaluate(s => { const b = document.querySelector(s).getBoundingClientRect(); return { x: b.x + b.width / 2, y: b.y + b.height / 2 }; }, sel);
  const shot = async name => { await page.mouse.move(1, 1); await page.screenshot({ path: path.join(OUT, `res-${name}.png`), omitBackground: true }); };
  info.res = {};
  info.res.panelTop = await page.evaluate(() => Math.round(document.querySelector('#reserve-form').getBoundingClientRect().top));
  await shot('a');
  info.res.party = await center('[data-party="4"]');
  await page.click('[data-party="4"]');
  await shot('b');
  info.res.date = await center('[data-date="4"]');
  await page.click('[data-date="4"]');
  await shot('c');
  const timeSel = await page.evaluate(() => {
    const want = ['4', '5', '6', '3'].map(s => document.querySelector(`[data-time="${s}"]`)).find(b => b && !b.disabled && b.getAttribute('aria-pressed') !== 'true');
    return want ? `[data-time="${want.dataset.time}"]` : null;
  });
  info.res.time = await center(timeSel);
  await page.click(timeSel);
  await shot('d');
  info.res.submit = await center('.reserve__submit .btn');
  await page.click('.reserve__submit .btn');
  await page.waitForTimeout(100);
  await shot('e');

  // 5. the Butter Chicken preorder: opened from the signature section, scrolled to the options
  await page.keyboard.press('Escape');
  info.sigCta = await page.evaluate(() => { const b = document.querySelector('.sig__cta .btn').getBoundingClientRect(); return { x: b.x + b.width / 2, y: b.y + b.height / 2 + scrollY }; });
  await page.evaluate(() => document.querySelector('.sig__cta .btn').click());
  await page.waitForTimeout(100);
  info.res.optsScroll = await page.evaluate(() => {
    const f = document.querySelector('#reserve-form');
    const o = document.querySelector('.field--opts');
    f.scrollTop = o.getBoundingClientRect().top - f.getBoundingClientRect().top + f.scrollTop - 250;
    return f.scrollTop;
  });
  await shot('x');
  await tag.evaluate(t => t.remove());

  fs.writeFileSync(path.join(OUT, 'site.json'), JSON.stringify(info, null, 2));
  console.log(`site captured → ${path.relative(ROOT, OUT)} (page ${total}px, ${info.slices.length} slices)`);
  await browser.close();
  server.close();
})().catch(e => { console.error(e); process.exit(1); });
