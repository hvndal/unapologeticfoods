/* Adda · Philadelphia — pitch concept for Unapologetic Foods.
   Menu data, rendering, reservation panel, reveals and presenter controls. */
(function () {
  'use strict';

  const root = document.documentElement;
  const params = new URLSearchParams(location.search);
  const embed = params.has('embed');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  root.classList.add('js');
  if (embed) root.classList.add('is-embed');
  if (params.has('static')) root.classList.add('is-static');

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  // ---------- imagery (filled from assets/ASSETS.md) ----------
  const IMG = {
    house: 'assets/img/biryani-overhead.webp',
    signature: 'assets/img/butter-chicken-close.webp',
    biryani: 'assets/img/biryani-close.webp',
    butter: 'assets/img/butter-chicken-overhead.webp',
    samosa: 'assets/img/samosa-close.webp'
  };
  // intrinsic widths; every photo also has an 800px "-800.webp" variant for phones
  const IMG_W = {
    'assets/img/biryani-overhead.webp': 1067, 'assets/img/butter-chicken-close.webp': 1000,
    'assets/img/biryani-close.webp': 1600, 'assets/img/butter-chicken-overhead.webp': 1188,
    'assets/img/samosa-close.webp': 1600
  };
  const srcset = src => `${src.replace('.webp', '-800.webp')} 800w, ${src} ${IMG_W[src] || 1600}w`;
  function setImg(img, src, sizes) {
    img.srcset = srcset(src);
    img.sizes = sizes;
    img.src = src;
  }

  // ---------- menu ----------
  const COURSES = [
    { id: 'chhote', name: 'Chhote', hi: 'छोटे', note: 'Small plates' },
    { id: 'tandoor', name: 'Tandoor', hi: 'तंदूर', note: 'From the clay oven' },
    { id: 'handi', name: 'Handi & Dum', hi: 'हांडी', note: 'Curries and sealed pots' },
    { id: 'meetha', name: 'Meetha', hi: 'मीठा', note: 'Sweet' }
  ];

  const MENU = [
    { id: 'bheja', course: 'chhote', name: 'Bheja Fry', hi: 'भेजा फ्राई', region: 'Mumbai',
      line: 'Goat brains, onion and tomato masala, griddled pav',
      note: 'Adda’s most talked-about plate. Rich, soft and properly spiced: a Mumbai late-night classic, served exactly as it should be.',
      tag: 'House classic' },
    { id: 'lukmi', course: 'chhote', name: 'Lukmi', hi: 'लुकमी', region: 'Hyderabad',
      line: 'Flaky square pastry, minced goat, green chilli',
      note: 'The Hyderabadi wedding snack: crisp, layered, and gone in two bites.' },
    { id: 'samosa', course: 'chhote', name: 'Samosa', hi: 'समोसा', region: 'Punjab',
      line: 'Hand-folded pastry, spiced potato and peas, tamarind',
      note: 'Folded by hand every afternoon, fried to order and sent out with a sharp, dark tamarind chutney.' },
    { id: 'kharda', course: 'chhote', name: 'Kharda Scallop', hi: 'खर्डा', region: 'Vidarbha, Maharashtra',
      line: 'Seared scallop, pounded green chilli and garlic',
      note: 'Kharda is the fierce relish Maharashtrian farmers eat with bhakri. Here it meets the sweetness of a seared scallop.' },
    { id: 'kaleji', course: 'chhote', name: 'Tawa Kaleji', hi: 'तवा कलेजी', region: 'Old Delhi',
      line: 'Goat liver seared on the iron, onion, lime',
      note: 'Straight off the tawa, the way the lanes around Jama Masjid do it late at night.' },
    { id: 'macchi', course: 'tandoor', name: 'Tandoori Macchi', hi: 'तंदूरी मच्छी', region: 'Amritsar',
      line: 'River fish, carom seed, mustard oil',
      note: 'Carom seed and mustard oil, then the heat of the clay oven. Amritsar’s riverside classic.' },
    { id: 'poussin', course: 'tandoor', name: 'Tandoori Poussin', hi: 'तंदूरी मुर्ग़', region: 'Punjab',
      line: 'Whole young chicken, hung yoghurt, Kashmiri chilli',
      note: 'A whole small bird, marinated overnight and blistered in the tandoor.' },
    { id: 'butter', course: 'handi', name: 'The Butter Chicken Experience', hi: 'मक्खन मुर्ग़', region: 'Delhi · by preorder',
      line: 'Cold-smoked chicken, house-churned butters, finished tableside',
      note: 'The signature. Cold-smoked chicken, a flight of butters churned that morning, wood chips of your choosing, finished at your table. Preorder when you book.',
      tag: 'Signature' },
    { id: 'biryani', course: 'handi', name: 'Baby Goat Biryani', hi: 'बिरयानी', region: 'Awadh',
      line: 'Young goat, aged basmati, sealed and cooked dum',
      note: 'Sealed under dough and slow-cooked, so the rice and the goat steam in each other. The seal is broken at the table.' },
    { id: 'rara', course: 'handi', name: 'Rara Gosht', hi: 'रारा गोश्त', region: 'Punjab',
      line: 'Goat two ways, pieces and mince, in one deep masala',
      note: 'Chunks and keema cooked together until the masala clings. A dhaba favourite from the Grand Trunk Road.' },
    { id: 'junglee', course: 'handi', name: 'Junglee Maas', hi: 'जंगली मांस', region: 'Rajasthan',
      line: 'Goat, ghee, dried red chilli. Almost nothing else.',
      note: 'The hunter’s curry of the Rajput kitchens. So few ingredients that there is nowhere to hide.' },
    { id: 'dal', course: 'handi', name: 'Dal & Rice', hi: 'दाल चावल', region: 'Everywhere',
      line: 'Slow-cooked black lentils, butter, steamed basmati',
      note: 'The dish every Indian kitchen is judged by. Cooked overnight and finished with butter.' },
    { id: 'doi', course: 'meetha', name: 'Mishti Doi', hi: 'मिष्टि दोई', region: 'Kolkata',
      line: 'Set sweet yoghurt, date-palm jaggery, clay pot',
      note: 'Kolkata’s sweet yoghurt, set in clay. Roni’s hometown gets the last word.' },
    { id: 'kulfi', course: 'meetha', name: 'Kulfi', hi: 'कुल्फ़ी', region: 'Old Delhi',
      line: 'Slow-reduced milk, pistachio, saffron',
      note: 'Dense, frozen and slow to melt. Milk reduced for hours, the old way.' }
  ];
  const FEATURED = ['biryani', 'butter', 'samosa'];

  const courseOf = id => COURSES.find(c => c.id === id);
  const num = i => String(i + 1).padStart(2, '0');
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  // static image slots
  $$('[data-img]').forEach(img => {
    const src = IMG[img.dataset.img];
    if (src) { setImg(img, src, img.dataset.sizes || '(max-width: 900px) 100vw, 50vw'); return; }
    if (img.closest('.archframe')) {
      const fill = document.createElement('div');
      fill.className = 'fill';
      fill.setAttribute('role', 'img');
      fill.setAttribute('aria-label', img.alt || '');
      img.replaceWith(fill);
    } else {
      img.remove();
    }
  });

  // featured plates
  const plates = $('#plates');
  const featured = FEATURED.map(id => MENU.find(d => d.id === id)).filter(d => d && IMG[d.id]).slice(0, 4);
  plates.innerHTML = featured.map(d => {
    const i = MENU.indexOf(d);
    return `<button class="plate" data-dish="${d.id}" data-reveal>
      <div class="plate__img"><img src="${IMG[d.id]}" srcset="${srcset(IMG[d.id])}" sizes="(max-width: 760px) 100vw, (max-width: 900px) 50vw, 58vw" alt="${esc(d.name)}" loading="lazy" decoding="async" class="graded"></div>
      <div class="plate__cap">
        <span class="plate__num">No. ${num(i)}</span>
        <span class="plate__name">${esc(d.name)}</span>
        <span class="plate__meta">${esc(d.region)}</span>
        <p class="plate__line">${esc(d.line)}</p>
      </div>
    </button>`;
  }).join('');
  if (!featured.length) plates.remove();
  plates.classList.add('plates--' + featured.length);

  // full carte
  const carte = $('#carte');
  carte.innerHTML = COURSES.map(c => `
    <section class="course" data-course="${c.id}" aria-label="${esc(c.name)}">
      <header class="course__head"><h3>${esc(c.name)}</h3><span lang="hi">${c.hi}</span></header>
      ${MENU.filter(d => d.course === c.id).map(d => `
        <button class="item" data-dish="${d.id}">
          <span class="item__name">${esc(d.name)}<small lang="hi">${d.hi}</small></span>
          <span class="item__region">${esc(d.region)}</span>
          <span class="item__line">${esc(d.line)}</span>
          ${d.tag ? `<span class="item__tag">${esc(d.tag)}</span>` : ''}
        </button>`).join('')}
    </section>`).join('');

  const tabs = $$('.tab');
  tabs.forEach(tab => tab.addEventListener('click', () => {
    const f = tab.dataset.filter;
    tabs.forEach(t => { const on = t === tab; t.classList.toggle('is-active', on); t.setAttribute('aria-selected', String(on)); });
    $$('.course', carte).forEach(c => c.classList.toggle('is-hidden', f !== 'all' && c.dataset.course !== f));
    carte.classList.toggle('is-single', f !== 'all');
  }));

  // cursor-following preview on the carte
  const peek = $('#peek');
  const peekImg = $('img', peek);
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    carte.addEventListener('pointermove', e => {
      peek.style.left = (e.clientX + 150) + 'px';
      peek.style.top = e.clientY + 'px';
      const item = e.target.closest('.item');
      const src = item && IMG[item.dataset.dish];
      if (src) {
        const small = src.replace('.webp', '-800.webp');
        if (peekImg.getAttribute('src') !== small) peekImg.src = small;
        peek.classList.add('is-on');
      } else {
        peek.classList.remove('is-on');
      }
    });
    carte.addEventListener('pointerleave', () => peek.classList.remove('is-on'));
  }

  // ---------- modal plumbing ----------
  let lastFocus = null;
  function openModal(m) {
    closeModals();
    lastFocus = document.activeElement;
    m.classList.add('is-open');
    m.setAttribute('aria-hidden', 'false');
    root.style.overflow = 'hidden';
    const x = $('.modal__x', m);
    if (x) setTimeout(() => x.focus({ preventScroll: true }), 60);
  }
  function closeModals() {
    $$('.modal.is-open').forEach(m => { m.classList.remove('is-open'); m.setAttribute('aria-hidden', 'true'); });
    root.style.overflow = '';
  }
  function closeAndRestore() {
    closeModals();
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }
  $$('.modal').forEach(m => m.addEventListener('click', e => { if (e.target.closest('[data-close]')) closeAndRestore(); }));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeAndRestore(); closeDrawer(); closePhone(); }
    const open = $('.modal.is-open');
    if (e.key === 'Tab' && open) {
      const f = $$('button, [href], input, select, textarea', open).filter(el => !el.disabled && el.offsetParent !== null);
      if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    }
    if (open && open.id === 'dish-modal' && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) stepDish(e.key === 'ArrowRight' ? 1 : -1);
  });

  // ---------- dish modal ----------
  const dishModal = $('#dish-modal');
  const dishCard = $('.dish', dishModal);
  let dishIndex = 0;
  function openDish(id) {
    const i = MENU.findIndex(d => d.id === id);
    if (i < 0) return;
    renderDish(i);
    if (!dishModal.classList.contains('is-open')) openModal(dishModal);
  }
  function renderDish(i) {
    dishIndex = i;
    const d = MENU[i];
    const src = IMG[d.id];
    dishCard.classList.toggle('is-plain', !src);
    const img = $('#dish-img');
    if (src) { setImg(img, src, '(max-width: 900px) 100vw, 55vw'); img.alt = d.name; img.classList.add('graded'); } else { img.removeAttribute('src'); img.removeAttribute('srcset'); img.alt = ''; }
    $('#dish-plain-hi').textContent = d.hi;
    $('#dish-num').textContent = 'No. ' + num(i);
    $('#dish-section').textContent = courseOf(d.course).name + ' · ' + courseOf(d.course).note;
    $('#dish-name').textContent = d.name;
    $('#dish-hi').textContent = d.hi;
    $('#dish-region').textContent = d.region;
    $('#dish-line').textContent = d.line;
    $('#dish-note').textContent = d.note;
  }
  function stepDish(dir) { renderDish((dishIndex + dir + MENU.length) % MENU.length); }
  $('#dish-prev').addEventListener('click', () => stepDish(-1));
  $('#dish-next').addEventListener('click', () => stepDish(1));
  document.addEventListener('click', e => {
    const t = e.target.closest('[data-dish]');
    if (t) openDish(t.dataset.dish);
  });

  // ---------- reservation panel ----------
  const reserveModal = $('#reserve-modal');
  const form = $('#reserve-form');
  const state = { party: 2, date: null, time: null };
  const TIMES = ['5:00', '5:30', '6:00', '6:30', '7:00', '7:30', '8:00', '8:30', '9:00', '9:30', '10:00', '10:30'];
  const today = new Date(); today.setHours(12, 0, 0, 0);
  const DAYS = Array.from({ length: 14 }, (_, k) => new Date(today.getTime() + k * 864e5));

  const partyEl = $('#res-party');
  partyEl.innerHTML = [1, 2, 3, 4, 5, 6, 7, 8].map(n => `<button type="button" class="chip" data-party="${n}" aria-pressed="false" aria-label="${n}${n === 8 ? ' or more' : ''} guests">${n === 8 ? '8+' : n}</button>`).join('');
  const datesEl = $('#res-dates');
  datesEl.innerHTML = DAYS.map((d, k) => `<button type="button" class="date" data-date="${k}" aria-pressed="false" aria-label="${d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}">
      <small>${k === 0 ? 'Today' : d.toLocaleDateString('en-US', { weekday: 'short' })}</small><b>${d.getDate()}</b><small>${d.toLocaleDateString('en-US', { month: 'short' })}</small></button>`).join('');
  const timesEl = $('#res-times');

  const taken = (dateIdx, slot) => ((dateIdx * 7 + slot * 5 + state.party * 3) % 11) < 3;
  function renderTimes() {
    timesEl.innerHTML = TIMES.map((t, s) => {
      const off = taken(state.date, s);
      return `<button type="button" class="chip" data-time="${s}" aria-pressed="${state.time === s}" ${off ? 'disabled aria-label="' + t + ' pm, unavailable"' : ''}>${t} pm</button>`;
    }).join('');
  }
  function pickDefaults() {
    if (state.time === null || taken(state.date, state.time)) {
      const pref = [4, 5, 3, 6, 2, 7, 1, 8, 0, 9, 10, 11];
      state.time = pref.find(s => !taken(state.date, s));
    }
  }
  function syncRes() {
    pickDefaults();
    renderTimes();
    $$('[data-party]', partyEl).forEach(b => b.setAttribute('aria-pressed', String(+b.dataset.party === state.party)));
    $$('[data-date]', datesEl).forEach(b => b.setAttribute('aria-pressed', String(+b.dataset.date === state.date)));
    $('#res-month').textContent = DAYS[state.date].toLocaleDateString('en-US', { month: 'long' });
    $('#res-summary').textContent = summary();
  }
  function summary() {
    const d = DAYS[state.date];
    const p = state.party === 8 ? '8 or more' : state.party;
    return `Dinner for ${p} · ${d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} · ${TIMES[state.time]} pm`;
  }
  partyEl.addEventListener('click', e => { const b = e.target.closest('[data-party]'); if (b) { state.party = +b.dataset.party; syncRes(); } });
  datesEl.addEventListener('click', e => { const b = e.target.closest('[data-date]'); if (b) { state.date = +b.dataset.date; syncRes(); } });
  timesEl.addEventListener('click', e => { const b = e.target.closest('[data-time]'); if (b && !b.disabled) { state.time = +b.dataset.time; syncRes(); } });

  function openReserve(opts = {}) {
    form.classList.remove('is-done');
    if (state.date === null) state.date = 2;
    if (opts.experience) $('#res-bc').checked = true;
    if (opts.down) $('#res-down').checked = true;
    syncRes();
    closeDrawer();
    openModal(reserveModal);
  }
  document.addEventListener('click', e => {
    const t = e.target.closest('[data-open="reserve"]');
    if (!t) return;
    e.preventDefault();
    openReserve({ experience: t.dataset.experience === '1', down: t.dataset.down === '1' });
  });
  form.addEventListener('submit', e => {
    e.preventDefault();
    const extras = [];
    if ($('#res-bc').checked) extras.push('the Butter Chicken Experience will be ready for your table');
    if ($('#res-down').checked) extras.push('we’ll send word about what’s happening downstairs');
    const occ = $('#res-occasion').value;
    $('#res-confirm').textContent = summary() + '.' + (occ ? ` Noted: ${occ.toLowerCase()}.` : '') + (extras.length ? ' And ' + extras.join(', and ') + '.' : '') + ' A confirmation would arrive by email.';
    form.classList.add('is-done');
    $('.reserve__done .btn', form).focus({ preventScroll: true });
  });
  $('#res-ics').addEventListener('click', () => {
    const d = DAYS[state.date];
    const [h, m] = TIMES[state.time].split(':').map(Number);
    const start = new Date(d); start.setHours(h + 12, m, 0, 0);
    const end = new Date(start.getTime() + 2 * 36e5);
    const f = x => `${x.getFullYear()}${String(x.getMonth() + 1).padStart(2, '0')}${String(x.getDate()).padStart(2, '0')}T${String(x.getHours()).padStart(2, '0')}${String(x.getMinutes()).padStart(2, '0')}00`;
    const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Adda Philadelphia//Demo//EN', 'BEGIN:VEVENT',
      `UID:${Date.now()}@adda-demo`, `DTSTAMP:${f(new Date())}`, `DTSTART:${f(start)}`, `DTEND:${f(end)}`,
      `SUMMARY:Dinner at Adda (party of ${state.party})`, 'LOCATION:1700 Frankford Ave\\, Philadelphia\\, PA',
      'DESCRIPTION:Demo reservation from the Adda Philadelphia pitch site.', 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
    a.download = 'adda-reservation.ics';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  });

  // ---------- newsletter ----------
  $('#letters').addEventListener('submit', e => {
    e.preventDefault();
    const input = $('#letters-email');
    const done = $('.letters__done');
    if (!input.checkValidity()) { done.textContent = 'That email doesn’t look right yet.'; input.focus(); return; }
    done.textContent = 'Thank you. The first letter goes out before opening night. (Demo: nothing was sent.)';
    input.value = '';
  });

  // ---------- nav, drawer, dock ----------
  const nav = $('#nav');
  const dock = $('#dock');
  const hero = $('.hero');
  let forceNav = false;
  function onScroll() {
    const y = window.scrollY;
    nav.classList.toggle('is-scrolled', forceNav || y > 60);
    dock.classList.toggle('is-on', y > hero.offsetHeight * .7);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const drawer = $('#drawer');
  const burger = $('#burger');
  function closeDrawer() {
    if (!drawer.classList.contains('is-open')) return;
    drawer.classList.remove('is-open'); drawer.setAttribute('aria-hidden', 'true');
    burger.setAttribute('aria-expanded', 'false');
    root.style.overflow = '';
  }
  burger.addEventListener('click', () => {
    drawer.classList.add('is-open'); drawer.setAttribute('aria-hidden', 'false');
    burger.setAttribute('aria-expanded', 'true');
    root.style.overflow = 'hidden';
    $('#drawer-close').focus({ preventScroll: true });
  });
  $('#drawer-close').addEventListener('click', closeDrawer);
  $$('a', drawer).forEach(a => a.addEventListener('click', closeDrawer));

  // ---------- reveals ----------
  $$('[data-reveal="lines"]').forEach(el => {
    let i = 0;
    const walk = node => {
      [...node.childNodes].forEach(n => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(part => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
            const w = document.createElement('span'); w.className = 'w';
            const inner = document.createElement('span'); inner.style.setProperty('--i', i++); inner.textContent = part;
            w.appendChild(inner); frag.appendChild(w);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1 && n.tagName !== 'BR') {
          walk(n);
        }
      });
    };
    walk(el);
  });
  const revealEls = $$('[data-reveal]');
  if ('IntersectionObserver' in window && !root.classList.contains('is-static')) {
    const io = new IntersectionObserver(entries => entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
    }), { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-in'));
  }

  // ---------- hero video + curtain ----------
  const video = $('#hero-video');
  if (!reduceMotion) {
    if (window.innerWidth < 760) {
      video.innerHTML = '<source src="assets/video/fire-mobile.mp4" type="video/mp4">';
      video.load();
    }
    video.play().catch(() => { /* autoplay blocked: the poster stays */ });
  }
  const curtain = $('#curtain');
  const skipCurtain = embed || reduceMotion || params.has('screen') || params.has('static') || sessionStorageGet('adda-seen');
  function ready() {
    curtain.classList.add('is-done');
    hero.classList.add('is-ready');
    try { sessionStorage.setItem('adda-seen', '1'); } catch (e) { /* private mode */ }
  }
  function sessionStorageGet(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } }
  if (skipCurtain) {
    root.classList.add('no-curtain');
    hero.classList.add('is-ready');
  } else {
    const t = setTimeout(ready, 1600);
    (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => setTimeout(() => { clearTimeout(t); ready(); }, 700));
  }

  // ---------- phone preview ----------
  const phone = $('#phone');
  const phoneFrame = $('#phone-frame');
  function fitPhone() {
    const s = Math.min(1, (window.innerHeight - 48) / 868, (window.innerWidth - 48) / 414);
    phone.style.setProperty('--phone-scale', s.toFixed(3));
  }
  function phoneGo(where) {
    const base = location.pathname + '?embed=1';
    let src = base;
    if (where === 'dish') src = base + '&screen=dish';
    else if (where === 'reserve') src = base + '&screen=reserve';
    else if (where) src = base + where;
    phoneFrame.src = src;
    $$('[data-phone-go]').forEach(b => b.classList.toggle('is-active', b.dataset.phoneGo === where));
  }
  function openPhone(where = '') {
    closeModals();
    fitPhone();
    phoneGo(where);
    phone.classList.add('is-open');
    phone.setAttribute('aria-hidden', 'false');
  }
  function closePhone() {
    if (!phone.classList.contains('is-open')) return;
    phone.classList.remove('is-open');
    phone.setAttribute('aria-hidden', 'true');
  }
  window.addEventListener('resize', fitPhone);
  phone.addEventListener('click', e => {
    if (e.target.closest('[data-phone-close]')) closePhone();
    const go = e.target.closest('[data-phone-go]');
    if (go) phoneGo(go.dataset.phoneGo);
  });

  // ---------- presenter: 12 screens ----------
  const pitch = $('#pitch');
  const pitchToggle = $('#pitch-toggle');
  function togglePitch(force) {
    const collapsed = pitch.classList.toggle('is-collapsed', force);
    pitchToggle.setAttribute('aria-expanded', String(!collapsed));
  }
  pitchToggle.addEventListener('click', () => togglePitch());
  $('#pitch-mobile').addEventListener('click', () => { closeModals(); openPhone(''); });
  document.addEventListener('keydown', e => {
    if ((e.key === 'p' || e.key === 'P') && !e.target.closest('input, select, textarea') && !e.metaKey && !e.ctrlKey) togglePitch();
  });
  const go = id => { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' }); };
  const SCREENS = {
    hero: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
    nav: () => { forceNav = true; onScroll(); window.scrollTo({ top: 0, behavior: 'smooth' }); },
    house: () => go('house'),
    signature: () => go('signature'),
    menu: () => go('menu'),
    dish: () => { go('menu'); setTimeout(() => openDish('biryani'), embed ? 0 : 500); },
    hearth: () => go('hearth'),
    downstairs: () => go('downstairs'),
    unapologetic: () => go('unapologetic'),
    visit: () => go('visit'),
    reserve: () => openReserve(),
    mobile: () => openPhone('')
  };
  $$('[data-screen]', pitch).forEach(btn => btn.addEventListener('click', () => {
    const s = btn.dataset.screen;
    $$('[data-screen]', pitch).forEach(b => b.classList.toggle('is-active', b === btn));
    if (s !== 'nav') { forceNav = false; onScroll(); }
    closeModals(); closePhone();
    SCREENS[s]();
  }));

  // deep links: ?screen=dish | reserve | menu | …
  const screen = params.get('screen');
  if (screen && SCREENS[screen]) {
    if (screen === 'dish') { go('menu'); openDish('biryani'); }
    else SCREENS[screen]();
  }
})();
