/* Adda Philly — pitch concept. Menu data, modals and presenter controls. */
(function () {
  'use strict';

  document.documentElement.classList.add('js');
  const params = new URLSearchParams(location.search);
  if (params.has('embed')) document.documentElement.classList.add('is-embed');

  const C = {
    oxblood: '#3b1a16', ebony: '#1e0f0c', peach: '#f3d6bb', paper: '#f7eedd',
    rani: '#e3157f', vermilion: '#e9432b', marigold: '#f4a81d',
    mint: '#a6d4bb', teal: '#2fa39b', rose: '#f0a7ad', indigo: '#243a73', jamun: '#5c1f4a'
  };

  const SECTIONS = { chhote: 'Chhote · small plates', tandoor: 'Tandoor', handi: 'Handi & Dum', meetha: 'Meetha · sweet' };

  // shape: rect | arch | fan ; size: '' | wide | tall
  const MENU = [
    { id: 'bheja', cat: 'chhote', hi: 'भेजा', en: 'Bheja Fry', region: 'Mumbai',
      line: 'Goat brains, onion-tomato masala, buttered pav',
      note: 'Adda’s most notorious plate. Soft, rich and properly spiced. Ordered on a dare, reordered on purpose.',
      bg: C.rani, ink: C.ebony, acc: C.paper, shape: 'rect', size: 'tall', tag: 'Cult' },
    { id: 'lukmi', cat: 'chhote', hi: 'लुकमी', en: 'Lukmi', region: 'Hyderabad',
      line: 'Square, flaky pastry, spiced minced goat',
      note: 'The Hyderabadi wedding snack: crisp, layered and gone in two bites.',
      bg: C.mint, ink: C.oxblood, acc: C.rani, shape: 'arch' },
    { id: 'kharda', cat: 'chhote', hi: 'खर्डा', en: 'Kharda Scallop', region: 'Maharashtra',
      line: 'Seared scallop, pounded green chilli and garlic',
      note: 'Kharda is the fierce Maharashtrian relish farmers eat with bhakri. Here it meets a sweet, seared scallop.',
      bg: C.paper, ink: C.oxblood, acc: C.teal, shape: 'rect' },
    { id: 'kaleji', cat: 'chhote', hi: 'कलेजी', en: 'Tawa Kaleji', region: 'Old Delhi',
      line: 'Goat liver on the flat iron, onion, lemon',
      note: 'Straight off the tawa, the way the lanes of Old Delhi do it late at night.',
      bg: C.marigold, ink: C.oxblood, acc: C.vermilion, shape: 'fan' },
    { id: 'macchi', cat: 'tandoor', hi: 'मच्छी', en: 'Tandoori Macchi', region: 'Amritsar',
      line: 'Fish, ajwain, mustard oil, charred in the tandoor',
      note: 'Carom seed and mustard oil, then the heat of the clay oven. Punjab’s riverside classic.',
      bg: C.teal, ink: C.paper, acc: C.marigold, shape: 'arch' },
    { id: 'poussin', cat: 'tandoor', hi: 'मुर्ग़', en: 'Tandoori Poussin', region: 'Punjab',
      line: 'Whole young chicken, yoghurt, Kashmiri chilli',
      note: 'A whole small bird, marinated overnight and blistered in the tandoor.',
      bg: C.vermilion, ink: C.paper, acc: C.marigold, shape: 'rect' },
    { id: 'butter', cat: 'handi', hi: 'मक्खन', en: 'Butter Chicken Experience', region: 'Delhi · preorder',
      line: 'Cold-smoked chicken, house-churned butters, tableside',
      note: 'The signature. Cold-smoked chicken, a flight of butters churned in the kitchen, wood chips you choose, finished at your table. Preorder when you book.',
      bg: C.marigold, ink: C.oxblood, acc: C.vermilion, shape: 'rect', size: 'wide', tag: 'Signature' },
    { id: 'biryani', cat: 'handi', hi: 'बिरयानी', en: 'Baby Goat Biryani', region: 'Dum · sealed pot',
      line: 'Young goat, aged rice, cooked sealed under dough',
      note: 'Sealed and slow-cooked so the rice and the goat steam in each other. Broken open at the table.',
      bg: C.indigo, ink: C.peach, acc: C.marigold, shape: 'arch', size: 'tall' },
    { id: 'rara', cat: 'handi', hi: 'रारा', en: 'Rara Gosht', region: 'Punjab',
      line: 'Goat two ways: pieces and mince, one thick masala',
      note: 'Chunks and keema cooked together until the masala clings. A dhaba favourite.',
      bg: C.rose, ink: C.oxblood, acc: C.teal, shape: 'rect' },
    { id: 'junglee', cat: 'handi', hi: 'जंगली', en: 'Junglee Maas', region: 'Rajasthan',
      line: 'Goat, ghee, dried red chilli, salt. That’s it.',
      note: 'The hunter’s curry of the Rajput kitchens. Almost nothing in it, which is exactly why it hits so hard.',
      bg: C.jamun, ink: C.marigold, acc: C.rose, shape: 'fan' },
    { id: 'doi', cat: 'meetha', hi: 'मिष्टि', en: 'Mishti Doi', region: 'Kolkata',
      line: 'Set sweet yoghurt, caramelised jaggery, clay pot',
      note: 'Kolkata’s sweet yoghurt, set in clay. Roni’s hometown gets the last word.',
      bg: C.paper, ink: C.rani, acc: C.marigold, shape: 'arch' },
    { id: 'kulfi', cat: 'meetha', hi: 'कुल्फ़ी', en: 'Kulfi', region: 'Chandni Chowk',
      line: 'Slow-reduced milk, pistachio, saffron',
      note: 'Dense, frozen and slow to melt. Milk reduced for hours, the old way.',
      bg: C.mint, ink: C.oxblood, acc: C.rani, shape: 'rect' }
  ];

  // ---------- render labels ----------
  const labelsEl = document.getElementById('labels');
  labelsEl.innerHTML = MENU.map((d, i) => `
    <button class="label label--${d.shape}${d.size ? ' label--' + d.size : ''}" data-dish="${d.id}" data-cat="${d.cat}"
      style="--bg:${d.bg};--ink:${d.ink};--acc:${d.acc}" aria-label="${d.en}. ${d.line}">
      ${d.tag ? `<span class="label__tag">${d.tag}</span>` : ''}
      <span class="label__band" aria-hidden="true"></span>
      <span class="label__num">No. ${String(i + 1).padStart(2, '0')} · ${SECTIONS[d.cat].split(' · ')[0]}</span>
      <span class="label__hi" lang="hi" aria-hidden="true">${d.hi}</span>
      <span class="label__en">${d.en}</span>
      <span class="label__rule" aria-hidden="true"></span>
      <span class="label__region">${d.region}</span>
      <span class="label__line">${d.line}</span>
    </button>`).join('');

  // ---------- menu filter ----------
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => tab.addEventListener('click', () => {
    tabs.forEach(t => { t.classList.toggle('is-active', t === tab); t.setAttribute('aria-selected', t === tab); });
    const f = tab.dataset.filter;
    labelsEl.querySelectorAll('.label').forEach(l => l.classList.toggle('is-hidden', f !== 'all' && l.dataset.cat !== f));
  }));

  // ---------- modals ----------
  let lastFocus = null;
  function openModal(el) {
    closeAll();
    lastFocus = document.activeElement;
    el.classList.add('is-open');
    el.setAttribute('aria-hidden', 'false');
    const x = el.querySelector('.modal__x');
    if (x) x.focus({ preventScroll: true });
  }
  function closeModal(el) {
    el.classList.remove('is-open');
    el.setAttribute('aria-hidden', 'true');
  }
  function closeAll() {
    document.querySelectorAll('.modal.is-open').forEach(closeModal);
  }
  document.querySelectorAll('.modal').forEach(m => {
    m.addEventListener('click', e => {
      if (e.target.closest('[data-close]')) { closeModal(m); if (lastFocus) lastFocus.focus({ preventScroll: true }); }
    });
  });

  const dishModal = document.getElementById('dish-modal');
  const dishCard = dishModal.querySelector('.dish');
  function openDish(id) {
    const i = MENU.findIndex(d => d.id === id);
    const d = MENU[i];
    if (!d) return;
    dishCard.style.setProperty('--bg', d.bg);
    dishCard.style.setProperty('--ink', d.ink);
    dishCard.style.setProperty('--acc', d.acc);
    document.getElementById('dish-num').textContent = 'No. ' + String(i + 1).padStart(2, '0');
    document.getElementById('dish-hi').textContent = d.hi;
    document.getElementById('dish-region').textContent = d.region;
    document.getElementById('dish-section').textContent = SECTIONS[d.cat];
    document.getElementById('dish-en').textContent = d.en;
    document.getElementById('dish-line').textContent = d.line;
    document.getElementById('dish-note').textContent = d.note;
    openModal(dishModal);
  }
  labelsEl.addEventListener('click', e => {
    const l = e.target.closest('.label');
    if (l) openDish(l.dataset.dish);
  });

  const reserveModal = document.getElementById('reserve-modal');
  const form = document.getElementById('reserve-form');
  const dateInput = document.getElementById('res-date');
  const today = new Date();
  const iso = d => d.toISOString().slice(0, 10);
  dateInput.min = iso(today);
  dateInput.value = iso(new Date(today.getTime() + 3 * 864e5));

  function openReserve(withExperience) {
    form.classList.remove('is-done');
    if (withExperience) document.getElementById('res-bc').checked = true;
    openModal(reserveModal);
  }
  document.addEventListener('click', e => {
    const t = e.target.closest('[data-open="reserve"]');
    if (!t) return;
    e.preventDefault();
    closeDrawer();
    openReserve(t.dataset.experience === '1');
  });
  form.addEventListener('submit', e => {
    e.preventDefault();
    const g = document.getElementById('res-guests').value;
    const t = document.getElementById('res-time').value;
    const d = new Date(dateInput.value + 'T12:00:00');
    const extras = [];
    if (document.getElementById('res-bc').checked) extras.push('the Butter Chicken Experience is on order');
    if (document.getElementById('res-down').checked) extras.push('we’ll tell you what’s happening downstairs');
    document.getElementById('res-summary').textContent =
      `${g} ${g === '1' ? 'guest' : 'guests'}, ${d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} at ${t}.` +
      (extras.length ? ' And ' + extras.join(', and ') + '.' : '');
    form.classList.add('is-done');
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeAll(); closeDrawer(); closePhone(); }
  });

  // ---------- nav ----------
  const nav = document.getElementById('nav');
  let forceScrolled = false;
  const onScroll = () => nav.classList.toggle('is-scrolled', forceScrolled || window.scrollY > 80);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const drawer = document.getElementById('drawer');
  const burger = document.getElementById('burger');
  function closeDrawer() {
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    burger.setAttribute('aria-expanded', 'false');
  }
  burger.addEventListener('click', () => {
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    burger.setAttribute('aria-expanded', 'true');
  });
  document.getElementById('drawer-close').addEventListener('click', closeDrawer);
  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', closeDrawer));

  // ---------- arches open once in view ----------
  const down = document.querySelector('.down');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      if (entries.some(en => en.isIntersecting)) { down.classList.add('is-in'); io.disconnect(); }
    }, { threshold: 0.25 });
    io.observe(down);
  } else {
    down.classList.add('is-in');
  }

  // ---------- phone preview ----------
  const phone = document.getElementById('phone');
  const phoneFrame = document.getElementById('phone-frame');
  function openPhone(hash) {
    closeAll();
    phoneFrame.src = location.pathname + '?embed=1' + (hash || '');
    phone.classList.add('is-open');
    phone.setAttribute('aria-hidden', 'false');
  }
  function closePhone() {
    phone.classList.remove('is-open');
    phone.setAttribute('aria-hidden', 'true');
  }
  phone.addEventListener('click', e => { if (e.target.closest('[data-phone-close]')) closePhone(); });

  // ---------- pitch bar: 12 screens ----------
  const pitch = document.getElementById('pitch');
  const pitchToggle = document.getElementById('pitch-toggle');
  const pitchBtns = pitch.querySelectorAll('[data-screen]');
  function togglePitch() {
    const collapsed = pitch.classList.toggle('is-collapsed');
    pitchToggle.setAttribute('aria-expanded', String(!collapsed));
  }
  pitchToggle.addEventListener('click', togglePitch);
  document.addEventListener('keydown', e => {
    if ((e.key === 'p' || e.key === 'P') && !e.target.closest('input, select, textarea')) togglePitch();
  });

  const jump = id => document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  const SCREENS = {
    'hero': () => window.scrollTo({ top: 0, behavior: 'smooth' }),
    'nav': () => { forceScrolled = true; onScroll(); window.scrollTo({ top: 0, behavior: 'smooth' }); },
    'manifesto': () => jump('manifesto'),
    'butter-chicken': () => jump('butter-chicken'),
    'menu': () => jump('menu'),
    'dish': () => { jump('menu'); openDish('butter'); },
    'downstairs': () => jump('downstairs'),
    'founders': () => jump('founders'),
    'visit': () => jump('visit'),
    'reserve': () => openReserve(false),
    'm-home': () => openPhone(''),
    'm-menu': () => openPhone('#menu')
  };
  pitchBtns.forEach(btn => btn.addEventListener('click', () => {
    pitchBtns.forEach(b => b.classList.toggle('is-active', b === btn));
    const s = btn.dataset.screen;
    if (s !== 'nav') { forceScrolled = false; onScroll(); }
    closeAll(); closePhone();
    SCREENS[s]();
  }));

  // deep link for screenshots / sharing: ?screen=dish
  if (params.get('screen') && SCREENS[params.get('screen')]) {
    const b = pitch.querySelector(`[data-screen="${params.get('screen')}"]`);
    if (b) b.click();
  }
})();
