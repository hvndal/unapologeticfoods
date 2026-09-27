/* A phone playing the real site, built from capture-site.cjs screenshots.
   The hero keeps its fire: the clip plays under a capture whose video area is transparent. */
(function () {
  'use strict';
  const R = window.R;
  const SITE = '../.cache/site/';
  const VW = 390, VH = 844;
  const info = R.defer(fetch(SITE + 'site.json').then(r => r.json()));

  R.phone = (parent, { width = 300 } = {}) => {
    const sw = width - 20, s = sw / VW, sh = Math.round(VH * s);
    const el = R.html(`<div class="phone" style="width:${width}px;height:${sh + 20}px">
      <div class="phone__screen" style="width:${sw}px;height:${sh}px"><div class="ph-view"></div><div class="phone__notch"></div></div></div>`);
    parent.appendChild(el);
    const view = R.$('.ph-view', el);
    Object.assign(view.style, { position: 'absolute', left: 0, top: 0, width: VW + 'px', height: VH + 'px', overflow: 'hidden',
      background: 'var(--ink)', transform: `scale(${s})`, transformOrigin: '0 0' });
    const api = { el, scale: s, info: null };
    let page, fireImg, nav, dock, scrim, panel, tap;

    R.defer(info.then(d => {
      api.info = d;
      view.innerHTML = `<div class="ph-page" style="position:absolute;left:0;top:0;width:${VW}px;height:${d.height}px">
          ${d.slices.map(x => `<img src="${SITE + x.file}" alt="" style="position:absolute;left:0;top:${x.y}px;width:${VW}px;height:${x.h}px">`).join('')}
          <div style="position:absolute;left:0;top:0;width:${VW}px;height:${VH}px;background:var(--ink);overflow:hidden">
            <img class="ph-fire" alt="" style="width:100%;height:100%;object-fit:cover;opacity:.5;filter:saturate(.8) contrast(1.1) brightness(.82);transform:scale(1.06)">
            <img src="${SITE}hero-overlay.png" alt="" style="position:absolute;inset:0;width:100%;height:100%">
          </div>
        </div>
        <img class="ph-nav" src="${SITE}nav.png" alt="" style="position:absolute;left:0;top:0;width:${VW}px;height:${d.nav.height}px;opacity:0">
        <img class="ph-dock" src="${SITE}dock.png" alt="" style="position:absolute;left:0;top:${d.dock.y}px;width:${VW}px;height:${d.dock.height}px">
        <div class="ph-scrim" style="position:absolute;inset:0;background:rgba(21,16,14,.78);opacity:0"></div>
        <img class="ph-panel" alt="" style="position:absolute;left:0;top:0;width:${VW}px;height:${VH}px;visibility:hidden">
        <div class="tap"></div>`;
      page = R.$('.ph-page', view); fireImg = R.$('.ph-fire', view); nav = R.$('.ph-nav', view); dock = R.$('.ph-dock', view);
      scrim = R.$('.ph-scrim', view); panel = R.$('.ph-panel', view); tap = R.$('.tap', view);
      tap.style.transform = `scale(${1 / s})`;
      ['a', 'b', 'c', 'd', 'e'].forEach(k => { const i = new Image(); i.src = `${SITE}res-${k}.png`; R.defer(i.decode().catch(() => {})); });
    }));

    // scroll in site px; panel: 'a'..'e' reservation state; panelP 0..1 slide; tap {x, y, p} in site px
    api.set = ({ scroll = 0, fireT = 0, panel: pk = null, panelP = 0, tap: tp = null } = {}) => {
      page.style.transform = `translateY(${(-scroll).toFixed(2)}px)`;
      if (scroll < VH) R.fire(fireImg, fireT);
      R.op(nav, R.p(scroll, 30, 40));
      const on = R.ease.site(R.p(scroll, VH * 0.62, 160));
      dock.style.transform = `translateY(${((1 - on) * 110).toFixed(2)}%)`;
      R.show(panel, !!pk);
      if (pk) {
        R.setImg(panel, `${SITE}res-${pk}.png`);
        panel.style.transform = `translateY(${((1 - panelP) * VH).toFixed(2)}px)`;
      }
      R.op(scrim, pk ? panelP : 0);
      if (tp && tp.p > 0 && tp.p < 1) {
        const k = tp.p;
        tap.style.left = tp.x + 'px'; tap.style.top = tp.y + 'px';
        tap.style.transform = `scale(${((0.55 + 0.75 * R.ease.out(k)) / s).toFixed(3)})`;
        R.op(tap, k < 0.2 ? k / 0.2 : 1 - (k - 0.2) / 0.8);
      } else R.op(tap, 0);
    };
    return api;
  };
})();
