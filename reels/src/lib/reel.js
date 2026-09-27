/* Reel runtime: a deterministic timeline for render.cjs.
   Each page registers scenes with R.scene(el, from, to, fn); render(t) draws frame t (seconds).
   No CSS transitions or timers, so the renderer can step frame by frame. */
(function () {
  'use strict';
  const R = (window.R = {});
  R.FPS = 30;

  // ---------- maths ----------
  R.clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
  R.lerp = (a, b, p) => a + (b - a) * p;
  R.p = (t, a, d) => R.clamp((t - a) / d);

  function bezier(x1, y1, x2, y2) {
    const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx;
    const cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
    const sx = u => ((ax * u + bx) * u + cx) * u;
    const sy = u => ((ay * u + by) * u + cy) * u;
    const dx = u => (3 * ax * u + 2 * bx) * u + cx;
    return x => {
      if (x <= 0) return 0;
      if (x >= 1) return 1;
      let u = x;
      for (let i = 0; i < 8; i++) {
        const e = sx(u) - x, d = dx(u);
        if (Math.abs(e) < 1e-6 || Math.abs(d) < 1e-6) break;
        u -= e / d;
      }
      return sy(R.clamp(u));
    };
  }
  R.ease = {
    lin: p => p,
    out: p => 1 - Math.pow(1 - p, 3),
    in: p => p * p * p,
    inOut: p => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2),
    expo: p => (p >= 1 ? 1 : 1 - Math.pow(2, -10 * p)),
    site: bezier(0.2, 0.7, 0.1, 1) // the site's --ease
  };

  // seeded random (mulberry32)
  R.rng = seed => () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let r = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
  // smooth firelight flicker, 0..1
  R.flicker = (t, s = 0) =>
    0.5 + 0.22 * Math.sin(t * 7.3 + s) + 0.16 * Math.sin(t * 13.1 + s * 2.1) + 0.12 * Math.sin(t * 23.7 + s * 3.7);
  // decaying hit after each time in `times`
  R.pulse = (t, times, decay = 0.18) => {
    let v = 0;
    for (const ti of times) if (t >= ti) v = Math.max(v, Math.exp(-(t - ti) / decay));
    return v;
  };

  // ---------- DOM ----------
  R.$ = (s, el = document) => el.querySelector(s);
  R.$$ = (s, el = document) => [...el.querySelectorAll(s)];
  R.html = s => {
    const d = document.createElement('div');
    d.innerHTML = s.trim();
    return d.firstElementChild;
  };
  R.show = (el, on) => { el.style.visibility = on ? 'visible' : 'hidden'; };
  R.op = (el, v) => { el.style.opacity = R.clamp(v).toFixed(4); };

  // text rises out of its .line mask, like the site's reveal
  R.rise = (el, t, start, dur = 0.9, ease = R.ease.site, dist = 110) => {
    const e = ease(R.p(t, start, dur));
    el.style.transform = `translateY(${((1 - e) * dist).toFixed(3)}%)`;
    return e;
  };
  R.riseAll = (els, t, start, stagger = 0.08, dur = 0.9) => els.forEach((el, i) => R.rise(el, t, start + i * stagger, dur));
  // hairline draws out from its middle (symmetric), by stroke dash
  R.drawMid = (path, p) => {
    const L = path._len || (path._len = path.getTotalLength());
    const s = (L / 2) * R.clamp(p);
    path.style.strokeDasharray = `0 ${(L / 2 - s).toFixed(2)} ${(2 * s).toFixed(2)} ${L.toFixed(2)}`;
  };
  R.draw = (path, p) => {
    const L = path._len || (path._len = path.getTotalLength());
    path.style.strokeDasharray = `${L.toFixed(2)} ${L.toFixed(2)}`;
    path.style.strokeDashoffset = (L * (1 - R.clamp(p))).toFixed(2);
  };

  // ---------- images ----------
  const pending = [];
  R.setImg = (img, src) => {
    if (img.dataset.cur === src) return;
    img.dataset.cur = src;
    img.src = src;
    pending.push(img.decode().catch(() => {}));
  };
  R.FIRE = { dir: '../.cache/fire/', n: 360, fps: 30 };
  // frame of the hero fire clip at source time st (loops, or ping-pongs when bounce)
  R.fire = (img, st, bounce = false) => {
    const n = R.FIRE.n;
    let i = Math.floor(st * R.FIRE.fps);
    if (bounce) { const m = i % (2 * n - 2); i = m < n ? m : 2 * n - 2 - m; } else i = ((i % n) + n) % n;
    R.setImg(img, `${R.FIRE.dir}f${String(i + 1).padStart(4, '0')}.jpg`);
  };

  // ---------- embers ----------
  R.embers = (canvas, count = 70, seed = 7) => {
    canvas.width = 1080; canvas.height = 1920;
    const ctx = canvas.getContext('2d');
    const rnd = R.rng(seed);
    const ps = Array.from({ length: count }, () => ({
      x: rnd() * 560 - 10, life: 2.4 + rnd() * 3.6, off: rnd(), rise: 700 + rnd() * 600,
      sway: 6 + rnd() * 22, w: 0.6 + rnd() * 1.8, ph: rnd() * 6.3, r: 0.7 + rnd() * 2.1, hot: rnd()
    }));
    return (t, amount = 1, originY = 1010) => {
      ctx.setTransform(2, 0, 0, 2, 0, 0);
      ctx.clearRect(0, 0, 540, 960);
      if (amount <= 0) return;
      ctx.globalCompositeOperation = 'lighter';
      for (const p of ps) {
        const ph = (t / p.life + p.off) % 1;
        const y = originY - ph * p.rise;
        const x = p.x + Math.sin(t * p.w + p.ph) * p.sway + ph * 30;
        const a = Math.sin(ph * Math.PI) * (0.55 + 0.45 * Math.sin(t * 9 + p.ph * 4)) * amount;
        if (a <= 0.01) continue;
        const r = p.r * (1 - ph * 0.5);
        const g = ctx.createRadialGradient(x, y, 0, x, y, r * 4);
        const core = p.hot > 0.6 ? '255,236,190' : '255,196,120';
        g.addColorStop(0, `rgba(${core},${a})`);
        g.addColorStop(0.25, `rgba(255,140,50,${a * 0.6})`);
        g.addColorStop(1, 'rgba(255,90,20,0)');
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(x, y, r * 4, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalCompositeOperation = 'source-over';
    };
  };

  // ---------- timeline ----------
  const scenes = [];
  const every = [];
  R.scene = (el, from, to, fn) => scenes.push({ el, from, to, fn });
  R.every = fn => every.push(fn);

  window.render = async t => {
    for (const s of scenes) {
      const on = t >= s.from && t < s.to;
      s.el.style.display = on ? 'block' : 'none';
      if (on && s.fn) s.fn(t - s.from, t);
    }
    for (const fn of every) fn(t);
    const grain = R.$('.grain');
    if (grain) {
      const r = R.rng(Math.floor(t * R.FPS) + 11);
      grain.style.transform = `translate(${Math.round(r() * 80 - 40)}px, ${Math.round(r() * 80 - 40)}px)`;
    }
    if (pending.length) await Promise.all(pending.splice(0));
  };

  // ---------- shared pieces ----------
  const ARCH = 'M0 300 L0 128 A28 28 0 0 1 15 84 A28 28 0 0 1 42 46 A26 26 0 0 1 72 18 A22 22 0 0 1 100 0 A22 22 0 0 1 128 18 A26 26 0 0 1 158 46 A28 28 0 0 1 185 84 A28 28 0 0 1 200 128 L200 300';
  R.ARCH = ARCH;
  R.BADGE = '../../assets/brand/adda-philly-badge.png';

  document.body.insertAdjacentHTML('afterbegin', `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
    <symbol id="lotus" viewBox="0 0 120 24">
      <path d="M0 12 H44 M76 12 H120" stroke="currentColor" stroke-width="1" fill="none"/>
      <path d="M60 3 C55 8 55 15 60 21 C65 15 65 8 60 3Z M60 21 C54 20 49 16 47 10 C53 11 57 15 60 21Z M60 21 C66 20 71 16 73 10 C67 11 63 15 60 21Z" stroke="currentColor" stroke-width="1" fill="none"/>
    </symbol></defs></svg>`);

  // "Built by Mander Studio": a cusped arch draws itself, the name rises inside it.
  R.opener = (stage, { start = 0, dur = 2, fire = false, cut = false } = {}) => {
    const el = R.html(`<div class="scene opener">
      <div class="opener__glow"></div>
      <svg class="opener__arch" viewBox="-24 -24 248 348"><path class="outer" d="${ARCH}" transform="translate(-16 -16) scale(1.16 1.1)"/><path class="inner" d="${ARCH}"/></svg>
      <div class="opener__txt">
        <p class="cap opener__by"><span class="line"><span>Built by</span></span></p>
        <p class="display opener__name"><span class="line"><span>Mander</span></span><span class="line"><span><em>Studio</em></span></span></p>
        <svg class="lotus opener__lotus" viewBox="0 0 120 24"><use href="#lotus"/></svg>
      </div>
      <canvas class="embers"></canvas>
    </div>`);
    stage.appendChild(el);
    const [outer, inner] = R.$$('path', el);
    const lines = R.$$('.line > span', el);
    const lotus = R.$('.opener__lotus', el);
    const glow = R.$('.opener__glow', el);
    const txt = R.$('.opener__txt', el);
    const arch = R.$('.opener__arch', el);
    const embers = fire ? R.embers(R.$('canvas', el), 46, 3) : null;
    R.scene(el, start, start + dur, (lt, t) => {
      R.drawMid(inner, R.ease.inOut(R.p(lt, 0.05, 0.95)));
      R.drawMid(outer, R.ease.inOut(R.p(lt, 0.22, 1.0)));
      R.rise(lines[0], lt, 0.3, 0.8);
      R.rise(lines[1], lt, 0.42, 0.9);
      R.rise(lines[2], lt, 0.52, 0.9);
      const lp = R.ease.site(R.p(lt, 0.7, 0.8));
      R.op(lotus, lp);
      lotus.style.transform = `scaleX(${0.6 + 0.4 * lp})`;
      const fl = fire ? R.flicker(t, 1) : 0.5;
      R.op(glow, R.p(lt, 0, 0.8) * (fire ? 0.55 + 0.6 * fl : 0.5));
      if (embers) embers(t, R.p(lt, 0.2, 0.8));
      const out = cut ? 0 : R.ease.in(R.p(lt, dur - 0.38, 0.38));
      txt.style.opacity = arch.style.opacity = (1 - out).toFixed(3);
      txt.style.transform = `translateY(${(-14 * out).toFixed(2)}px)`;
    });
    return el;
  };

  // Closing card: badge, name, credit to Mander Studio.
  R.endcard = (stage, { start, dur = 2.5, line = 'Indian cooking, <em>without compromise.</em>', fadeOut = 0 } = {}) => {
    const el = R.html(`<div class="scene endcard">
      <div class="endcard__pattern"></div>
      <img class="endcard__badge" src="${R.BADGE}" alt="">
      <p class="display endcard__word"><span class="line"><span>Adda <em>Philly</em></span></span></p>
      <p class="cap endcard__place"><span class="hair"></span>Philadelphia · Fishtown<span class="hair"></span></p>
      <p class="endcard__line"><span class="line"><span>${line}</span></span></p>
      <svg class="lotus endcard__lotus" viewBox="0 0 120 24"><use href="#lotus"/></svg>
      <div class="endcard__credit"><span class="cap">Website concept by</span><span class="display"><span class="line"><span>Mander <em>Studio</em></span></span></span></div>
      <p class="cap endcard__mail">sales@mander.com</p>
      <div class="endcard__fade"></div>
    </div>`);
    stage.appendChild(el);
    const badge = R.$('.endcard__badge', el);
    const [word, line1, credit] = R.$$('.line > span', el);
    const place = R.$('.endcard__place', el);
    const lotus = R.$('.endcard__lotus', el);
    const capc = R.$('.endcard__credit .cap', el);
    const mail = R.$('.endcard__mail', el);
    const fade = R.$('.endcard__fade', el);
    const pat = R.$('.endcard__pattern', el);
    R.scene(el, start, start + dur, lt => {
      const b = R.ease.site(R.p(lt, 0, 0.9));
      R.op(badge, b);
      badge.style.transform = `translateY(${(18 * (1 - b)).toFixed(2)}px) scale(${(0.88 + 0.12 * b).toFixed(4)})`;
      R.rise(word, lt, 0.12);
      R.op(place, R.ease.site(R.p(lt, 0.35, 0.7)));
      R.rise(line1, lt, 0.4);
      const lp = R.ease.site(R.p(lt, 0.55, 0.8));
      R.op(lotus, lp);
      lotus.style.transform = `scaleX(${0.6 + 0.4 * lp})`;
      R.op(capc, R.p(lt, 0.7, 0.6));
      R.rise(credit, lt, 0.75);
      R.op(mail, R.p(lt, 0.95, 0.6));
      R.op(pat, R.p(lt, 0, 1.4));
      if (fadeOut) R.op(fade, R.ease.inOut(R.p(lt, dur - fadeOut, fadeOut)));
    });
    return el;
  };

  // ---------- readiness ----------
  const deferred = [];
  R.defer = p => { deferred.push(p); return p; };
  async function prepare() {
    await Promise.all(deferred);
    await Promise.all([
      document.fonts.load('300 40px "Fraunces"'),
      document.fonts.load('italic 300 40px "Fraunces"'),
      document.fonts.load('300 16px "Jost"'),
      document.fonts.load('500 16px "Jost"'),
      document.fonts.load('400 20px "Tiro Devanagari Hindi"', 'अड्डा जिगर बड़ी आग')
    ]);
    await new Promise(r => requestAnimationFrame(r));
    await Promise.all(R.$$('img').filter(i => i.getAttribute('src')).map(i => i.decode().catch(() => {})));
    await document.fonts.ready;
    return true;
  }
  window.READY = new Promise(res => {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => res(prepare()));
    else setTimeout(() => res(prepare()));
  });
})();
