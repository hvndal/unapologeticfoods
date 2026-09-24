/**
 * ANGAAR — The Unapologetic Indian Monograph
 * Interactive Application Controller & State Engine
 */

(function () {
  'use strict';

  // --- 01. CULINARY ARCHIVE DATABASE (14 TASTING COURSES) ---
  const CULINARY_ARCHIVE = {
    '01': {
      num: '01',
      hindi: 'प्रवेश',
      title: 'PAPAD / BLACK GARLIC / RAW MANGO',
      subtitle: 'lentil wafer crisp • fermented garlic • unripe mango acid',
      region: 'GUJARAT COAST & KUTCH',
      technique: 'SUN-CURED FERMENTATION & INVERTED TAWA',
      season: 'SPRING / SUMMER (VASANTA)',
      vessel: 'MORADABAD RAW BRASS MEDALLION',
      note: '”Street-cart vendors across Ahmedabad crisp fresh-roasted papad with bracing black garlic preparations. We age whole peeled black garlic for forty days at 60°C until it yields molasses sweetness, balanced against the vivid acidity of wild green Rajapuri mangoes.”',
      pairing: '2021 Champagne Bérêche & Fils Brut Réserve • Ludes, France (Brioche and crisp acidity lifting the fermented garlic).',
      photoDesc: 'Macro view: Ultra-thin translucent papad shard dusted with sun-dried raw mango powder, glossy dots of black garlic reduction, and cold-pressed mustard oil beads.'
    },
    '02': {
      num: '02',
      hindi: 'रोटी',
      title: 'MINI KULCHA / CULTURED BUTTER / CHARRED SHALLOT',
      subtitle: 'wild-fermented sourdough • hickory ash butter • charred shallot',
      region: 'PUNJAB HIGHWAY (GRAND TRUNK ROAD)',
      technique: 'CLAY TANDOOR • DUNG ASH SMOKING',
      season: 'YEAR-ROUND HEARTH RITUAL',
      vessel: 'HAND-FIRED FISHTOWN RED STONEWARE',
      note: '”Roadside dhabas along the Grand Trunk Road teach a singular discipline: butter churned daily, bread blistered against live clay. We smoke cultured Pennsylvanian cream over smoldering cow-dung ash, then temper it with Himalayan rock salt.”',
      pairing: 'NV Domaine Huet Vouvray Pétillant Brut • Loire Valley, France (Dry, honeyed Chenin Blanc cutting through rich cultured butter).',
      photoDesc: 'Macro view: Flaky, golden-brown blistered sourdough pocket oozing melted white butter, charred blackened shallot petals, and toasted nigella seeds.'
    },
    '03': {
      num: '03',
      hindi: 'अरण्य',
      title: 'TANDOORI MOREL / CASHEW CURD / TELLICHERRY',
      subtitle: 'wild himalayan mushroom • roasted cashew curd • tellicherry pepper',
      region: 'PIR PANJAL RANGE • KASHMIR',
      technique: 'IRON SKEWER LIVE CHARCOAL ROASTING',
      season: 'SPRING EMERGENCE (GRISHMA)',
      vessel: 'CARVED BASALT STONE TRAY',
      note: '“Guchhi mushrooms are gathered by nomadic Gujjars in high Himalayan pine forests after lightning storms. Stuffed with crushed cashews and wild mint, they absorb the pine-charcoal smoke while retaining their porous woodland sponge texture.”',
      pairing: '2019 Domaine Dujac Morey-Saint-Denis • Burgundy, France (Earthy forest floor and silky tannins echoing wild morel notes).',
      photoDesc: 'Macro view: Charred honeycomb crevices of Himalayan morel mushroom glistening with tellicherry pepper glaze and creamy cashew puree pools.'
    },
    '04': {
      num: '04',
      hindi: 'समुद्र',
      title: 'DAY-BOAT SCALLOP / FRESH COCONUT / CURRY LEAF',
      subtitle: 'barnegat light scallop • fresh coconut acid • tempered mustard brittle',
      region: 'MALABAR COAST & BARNEGAT LIGHT, NJ',
      technique: 'RAW ACID CURING & INSTANT CRACKLE TEMPERING',
      season: 'AUTUMN / WINTER (HEMANTA)',
      vessel: 'GLAZED SEA-GREEN PORCELAIN BOWL',
      note: '“Connecting the cold waters of New Jersey to the spice ports of Kerala. Live day-boat scallops sliced razor-thin, bathed in freshly pressed raw coconut cream, tempered with blistering hot mustard seeds and flash-fried curry leaves.”',
      pairing: '2022 Keller Riesling Trocken • Rheinhessen, Germany (Electric limestone acidity piercing through the lush coastal coconut milk).',
      photoDesc: 'Macro view: Pearlescent translucent scallop slices surrounded by ivory coconut milk foam, emerald curry leaf oil swirl, and crisp black mustard crackle.'
    },
    '05': {
      num: '05',
      hindi: 'शाक',
      title: 'KASHMIRI HEIRLOOM TURNIP / SAFFRON / ROAST WALNUT',
      subtitle: 'slow-braised winter shalgam • kishtwar saffron • roasted walnut jus',
      region: 'KASHMIR VALLEY',
      technique: 'SLOW CLAY POT BRAISING (DUM)',
      season: 'DEEP WINTER (SHISHIRA)',
      vessel: 'CHISELED DHOLPUR SANDSTONE DISH',
      note: '“The Kashmiri waza knows how to turn a humble winter turnip into sheer nobility. Simmered until velvety in browned shallot fat, kissed with hand-picked Pampore saffron, and crowned with bitter mountain walnut crunch.”',
      pairing: '2020 Domaine Tempier Bandol Blanc • Provence, France (Waxy texture, wild garrigue herbs, and almond bitter finish).',
      photoDesc: 'Macro view: Caramelized golden turnip medallion gleaming with deep yellow saffron syrup, roasted walnut nibs, and micro turnip greens.'
    },
    '06': {
      num: '06',
      hindi: 'अग्नि',
      title: 'TANDOOR KOKUM LOBSTER / COASTAL SPICE',
      subtitle: 'maine lobster tail • wild kokum butter • byadgi chilli',
      region: 'KONKAN COAST & MANGALORE',
      technique: 'TANDOOR SEARING OVER COCONUT HUSKS',
      season: 'AUTUMN HARVEST',
      vessel: 'HAND-HAMMERED MORADABAD BRASS THALI',
      note: '”Western Indian seafood is routinely masked beneath cream sauces. We draw from Konkan fishing villages: live embers, tart kokum rind piercing the richness of lobster meat, and pure coconut oil infused with fresh curry leaves.”',
      pairing: '2022 Domaine Tempier Bandol Rosé • Provence, France (Mineral salinity and wild dried herb aromatics that harmonize with the kokum sourness).',
      photoDesc: 'Extreme close-up: Glistening red kokum butter glaze, caramelized tandoor blisters on lobster meat, golden ghee droplets, and crystalline sea salt.'
    },
    '07': {
      num: '07',
      hindi: 'शिकार',
      title: 'LANCASTER LAMB / SMOKED BAINGAN / DRIED PLUM JUS',
      subtitle: 'wood-charred lamb saddle • eggplant bharta • sour aloo bukhara',
      region: 'AWADH & KASHMIR WAZWAN',
      technique: 'HEARTH SEARING & DUM PUKHT REDUCTION',
      season: 'WINTER SOLSTICE',
      vessel: 'PATINATED BLACK CAST IRON CASSEROLE',
      note: '“We partner with an Amish heritage farm in Lancaster County for grass-fed lamb. Basted with roasted mace, cardamom, and charred eggplant, finished with an ancient reduction of sun-dried sour Kashmiri plums.”',
      pairing: '2017 Château Musar Red • Bekaa Valley, Lebanon (Spicy, leather, dried fruit, and cedar wood that stands up to deep wood smoke).',
      photoDesc: 'Macro view: Ruby-red lamb loin carved cleanly against silky charcoal-smoked aubergine paste, drizzled with deep burgundy plum glaze.'
    },
    '08': {
      num: '08',
      hindi: 'धान्य',
      title: 'THREE-YEAR AGED BASMATI / YAKNI STOCK / CRISP SHALLOT',
      subtitle: 'aged taraori basmati • clarified bone broth • fried pink shallots',
      region: 'DEHRADUN FOOTHILLS',
      technique: 'SEALED DUM POT STEAMING',
      season: 'AUTUMN HARVEST RICE',
      vessel: 'POLISHED HEIRLOOM BELL-METAL (KANSA) VESSEL',
      note: '“Real basmati must age in jute sacks across three monsoons until every moisture drop leaves the grain. When steamed in rich lamb bone broth with whole green cardamom and mace, each grain stands separate, fragrant, and elongated.”',
      pairing: '2019 Viña Tondonia Reserva Blanco • Rioja, Spain (Oxidative elegance, nutty depth, and wax notes embracing aged basmati grains).',
      photoDesc: 'Macro view: Individual impossibly long basmati grains standing proud, glistening with clarified ghee, studded with gossamer fried shallot curls.'
    },
    '09': {
      num: '09',
      hindi: 'अन्न',
      title: 'SOURDOUGH ROTI / CHURNED BUFFALO MAKHAN',
      subtitle: 'emmer wheat • 24hr ferment • inverted cast-iron tawa',
      region: 'HARYANA & ROHTAK',
      technique: 'INVERTED CAST-IRON TAWA OVER LIVE EMBERS',
      season: 'DAILY RITUAL',
      vessel: 'WOVEN PALM LEAF BASKET',
      note: '“Ancient emmer wheat stone-milled on site, naturally fermented overnight. Cooked on an upside-down curved tawa until ballooning with aromatic steam, then torn hot and smeared with fresh white buffalo butter.”',
      pairing: 'Served alongside the 36-Hour Black Dal.',
      photoDesc: 'Macro view: Blistered char spots across rustic folded flatbread, a melting orb of snow-white buffalo butter pooling into golden rivulets.'
    },
    '10': {
      num: '10',
      hindi: 'रस',
      title: 'ANGAAR BLACK DAL / 36-HOUR REDUCTION / SMOKED CHILLI',
      subtitle: 'urad dal • dying hickory ash • cultured cream • mathania chilli',
      region: 'UNAPOLOGETIC SIGNATURE ARCHIVE',
      technique: '36-HOUR SUB-SIMMER OVER ASHES',
      season: 'PERPETUAL MOTHER HEARTH',
      vessel: 'HAND-THROWN HEARTH CLAY HANDI',
      note: '”Patience is the founding principle. Urad lentils rest over glowing hickory ash for 36 hours, their starches dissolving into silk. Enriched with unpasteurized farm butter, fresh ginger julienne, and sun-dried Mathania chillies.”',
      pairing: '2018 Paolo Bea San Valentino Rosso • Umbria, Italy (Rustic, deep, unfiltered wild red wine with earthy iron grit).',
      photoDesc: 'Macro view: Luxurious, velvet-black dal simmering gently with streaks of ivory cream, bright orange chili oil swirl, and fresh ginger julienne.'
    },
    '11': {
      num: '11',
      hindi: 'क्षीर',
      title: 'HOUSE-CURD CHENNA / CHARRED TOMATO / KASOORI METHI',
      subtitle: 'fresh cow milk curd • blistered plum tomato • nagaur fenugreek',
      region: 'BENGAL DELTA & ORISSA',
      technique: 'GENTLE ACID SPLITTING & CHARRED EMULSION',
      season: 'SUMMER INTO RAIN',
      vessel: 'RAW UNGLAZED TERRACOTTA KULLHAD',
      note: '”Industrial paneer lacks delicacy. We split organic Pennsylvania whole milk thirty minutes before service with whey acid. Warm, pillowed curds immerse in a gravy of charred plum tomatoes and wild-dried fenugreek.”',
      pairing: '2021 COS Frappato di Vittoria • Sicily, Italy (Vibrant red cherries, wild acidity, and Mediterranean herbal spice).',
      photoDesc: 'Macro view: Soft, cloud-like curd pillows nestled in vibrant vermilion roasted tomato coulis, dusted with crushed aromatic fenugreek.'
    },
    '12': {
      num: '12',
      hindi: 'मधु',
      title: 'ALPHONSO MANGO / CULTURED YOGHURT / BRONTE PISTACHIO',
      subtitle: 'ratnagiri mango pulp • hung goat curd • blossom honey praline',
      region: 'RATNAGIRI & DEVGAD COAST',
      technique: 'COLD HANGING & NITRO EMULSION',
      season: 'SUMMER MONSOON CELEBRATION',
      vessel: 'FROSTED CRYSTAL COUPE',
      note: '”Alphonso reigns supreme among fruits. Pristine specimens from Devgad orchards yield their pulp to tart hung goat yoghurt, crowned with crushed Sicilian Bronte pistachios roasted in wild honey.”',
      pairing: '2018 Château d’Yquem Sauternes (Half Bottle) • Bordeaux, France (Liquid gold with candied citrus and apricot nuance).',
      photoDesc: 'Macro view: Intense saffron-orange mango velvet quenelle set against stark white yoghurt snow, scattered with emerald green pistachio shards.'
    },
    '13': {
      num: '13',
      hindi: 'कोको',
      title: 'INDIAN ESTATE CACAO / GREEN CARDAMOM / PALM JAGGERY',
      subtitle: '72% idukki cacao • roasted cardamom pod • wild date palm syrup',
      region: 'IDUKKI HILLS • KERALA',
      technique: 'SINGLE-ORIGIN BEAN TEMPERING & HEARTH CARAMEL',
      season: 'AUTUMN / WINTER HARVEST',
      vessel: 'SMOKED OAK WOOD PEDESTAL',
      note: '“Indian cacao from the Western Ghats has astonishing fruit acidity. We pair 72% dark chocolate with freshly crushed green cardamom and unrefined date palm jaggery tapped by village artisans in Bengal.”',
      pairing: 'Rare 20-Year Old Amrut Greedy Angels Chairman’s Reserve Peated Indian Single Malt Whisky.',
      photoDesc: 'Macro view: Glossy dark chocolate dome with molten cardamom core, glistening dark molasses jaggery drizzle, and edible gold leaf flake.'
    },
    '14': {
      num: '14',
      hindi: 'विदा',
      title: 'CALCUTTA MEETHA PAAN / DAMASK ROSE / DARK CHOCOLATE',
      subtitle: 'maghai betel leaf • house gulkand • chocolate micro pearl',
      region: 'COLLEGE STREET & CHITPUR • KOLKATA',
      technique: 'HERBAL INFUSION & MICRO CONFECTIONERY',
      season: 'FINAL DIGESTIVE ACCORD',
      vessel: 'ANTIQUE BRASS LEAF TRAY',
      note: '”The ceremonial finale. Fresh Maghai betel leaf embraces sun-cured Damask rose jam (gulkand), menthol, and candied fennel, sealed within a dark chocolate pearl that dissolves on the tongue.”',
      pairing: 'House-infused digestive tisane of roasted coriander, green cardamom, and Kashmir saffron threads.',
      photoDesc: 'Macro view: Shimmering dark chocolate sphere resting on a fresh green betel leaf, lightly dusted with crushed dried pink rose petals.'
    }
  };

  // --- 02. DOM ELEMENT REFERENCES ---
  const stateDirectorButtons = document.querySelectorAll('.director-btn');
  const stickyNav = document.getElementById('sticky-scroll-nav');
  const openReserveBtn = document.getElementById('open-reserve-btn');
  const stickyReserveTrigger = document.getElementById('sticky-reserve-trigger');
  const mobileReserveTrigger = document.getElementById('mobile-open-reserve');
  const reservationModal = document.getElementById('reservation-modal');
  const closeReserveModalBtn = document.getElementById('close-reserve-modal-btn');
  const closeReserveModalBg = document.getElementById('close-reserve-modal-bg');

  const expandedDishModal = document.getElementById('expanded-dish-modal');
  const closeDishModalBtn = document.getElementById('close-dish-modal-btn');
  const closeDishModalBg = document.getElementById('close-dish-modal-bg');

  const desktopCanvas = document.getElementById('desktop-canvas');
  const mobileMockupWrapper = document.getElementById('mobile-mockup-wrapper');
  const toggleDeviceViewBtn = document.getElementById('toggle-device-view');

  const mobileBurgerToggle = document.getElementById('mobile-burger-toggle');
  const mobileNavDrawer = document.getElementById('mobile-nav-drawer');
  const mobileCloseNavBtn = document.getElementById('mobile-close-nav-btn');

  // Modal Dish Detail fields
  const dishNumEl = document.getElementById('dish-modal-num');
  const dishHindiEl = document.getElementById('dish-modal-hindi');
  const dishTitleEl = document.getElementById('dish-modal-title');
  const dishSubEl = document.getElementById('dish-modal-sub');
  const dishRegionEl = document.getElementById('dish-modal-region');
  const dishTechniqueEl = document.getElementById('dish-modal-technique');
  const dishSeasonEl = document.getElementById('dish-modal-season');
  const dishVesselEl = document.getElementById('dish-modal-vessel');
  const dishNoteEl = document.getElementById('dish-modal-note');
  const dishPairingEl = document.getElementById('dish-modal-pairing');
  const dishPhotoDescEl = document.getElementById('dish-modal-photo-desc');

  // --- 03. DISH INSPECTOR TRIGGER LOGIC ---
  function openDishModal(dishId) {
    const data = CULINARY_ARCHIVE[dishId] || CULINARY_ARCHIVE['06'];
    dishNumEl.textContent = data.num;
    dishHindiEl.textContent = data.hindi;
    dishTitleEl.textContent = data.title;
    dishSubEl.textContent = data.subtitle;
    dishRegionEl.textContent = data.region;
    dishTechniqueEl.textContent = data.technique;
    dishSeasonEl.textContent = data.season;
    dishVesselEl.textContent = data.vessel;
    dishNoteEl.textContent = data.note;
    dishPairingEl.textContent = data.pairing;
    dishPhotoDescEl.textContent = data.photoDesc;

    expandedDishModal.classList.add('active');
  }

  function closeDishModal() {
    expandedDishModal.classList.remove('active');
  }

  // Attach click listeners to all menu course items and signature cards
  document.querySelectorAll('[data-dish-id]').forEach(el => {
    el.addEventListener('click', (e) => {
      const dishId = el.getAttribute('data-dish-id');
      openDishModal(dishId);
    });
  });

  closeDishModalBtn.addEventListener('click', closeDishModal);
  closeDishModalBg.addEventListener('click', closeDishModal);

  // --- 04. RESERVATION MODAL CONTROLLER ---
  function openReservationModal() {
    reservationModal.classList.add('active');
  }

  function closeReservationModal() {
    reservationModal.classList.remove('active');
  }

  openReserveBtn.addEventListener('click', openReservationModal);
  stickyReserveTrigger.addEventListener('click', openReservationModal);
  mobileReserveTrigger.addEventListener('click', openReservationModal);
  closeReserveModalBtn.addEventListener('click', closeReservationModal);
  closeReserveModalBg.addEventListener('click', closeReservationModal);

  window.confirmReservation = function () {
    const guests = document.getElementById('res-guest-select').value;
    const date = document.getElementById('res-date-select').value;
    const time = document.getElementById('res-time-select').value;
    alert(`TABLE COMMISSION CONFIRMED:\n\nExperience: 14-Course Monograph\nParty: ${guests} Guest(s)\nDate: ${date}\nSeating: ${time}\n\nOur Maître D' will reach out 48 hours prior to arrange your personal cellar preferences.`);
    closeReservationModal();
  };

  // --- 05. SCROLL BEHAVIOR & CHAPTER TRACKER ---
  window.addEventListener('scroll', () => {
    if (window.scrollY > 180) {
      stickyNav.classList.add('is-scrolled');
    } else {
      stickyNav.classList.remove('is-scrolled');
    }

    // Update chapter title based on scroll position
    const chapterEl = document.getElementById('current-chapter-title');
    const scrollPos = window.scrollY;

    if (scrollPos > 3200) {
      chapterEl.textContent = 'V. DISPATCHES // SUBCONTINENTAL MONOGRAPH';
    } else if (scrollPos > 2400) {
      chapterEl.textContent = 'IV. PRIVATE HEARTH // THE FOUNDRY SALON';
    } else if (scrollPos > 1700) {
      chapterEl.textContent = 'III. CANON // 14-COURSE TASTING PUBLICATION';
    } else if (scrollPos > 800) {
      chapterEl.textContent = 'II. MANIFESTO // INDIA IS NOT ONE CUISINE';
    } else {
      chapterEl.textContent = 'I. PROLOGUE // INDIA REMEMBERED DIFFERENTLY';
    }
  });

  // --- 06. MENU CATEGORY TAB SWITCHING ---
  const menuTabs = document.querySelectorAll('.menu-tab-btn');
  menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      menuTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.getAttribute('data-category');
      
      const sheet = document.getElementById('tasting-menu-sheet');
      if (cat === 'tasting') {
        sheet.style.opacity = '0.5';
        setTimeout(() => { sheet.style.opacity = '1'; }, 150);
      } else {
        sheet.style.opacity = '0.5';
        setTimeout(() => {
          sheet.style.opacity = '1';
        }, 150);
      }
    });
  });

  // --- 07. DEVICE VIEW TOGGLE (DESKTOP VS MOBILE PHONE MOCKUP) ---
  function setDeviceMode(isMobile) {
    if (isMobile) {
      desktopCanvas.classList.remove('active');
      desktopCanvas.style.display = 'none';
      mobileMockupWrapper.classList.add('active');
      toggleDeviceViewBtn.classList.add('active');
    } else {
      mobileMockupWrapper.classList.remove('active');
      desktopCanvas.classList.add('active');
      desktopCanvas.style.display = 'block';
      toggleDeviceViewBtn.classList.remove('active');
    }
  }

  toggleDeviceViewBtn.addEventListener('click', () => {
    const isCurrentlyMobile = mobileMockupWrapper.classList.contains('active');
    setDeviceMode(!isCurrentlyMobile);
  });

  // --- 08. MOBILE NAVIGATION DRAWER & SCREEN JUMP ---
  mobileBurgerToggle.addEventListener('click', () => {
    mobileNavDrawer.classList.add('active');
  });

  mobileCloseNavBtn.addEventListener('click', () => {
    mobileNavDrawer.classList.remove('active');
  });

  function switchMobileView(viewId) {
    document.querySelectorAll('.mobile-view').forEach(v => v.classList.remove('active'));
    const target = document.getElementById(viewId);
    if (target) {
      target.classList.add('active');
      document.getElementById('mobile-scroll-container').scrollTop = 0;
    }
    mobileNavDrawer.classList.remove('active');
  }

  document.querySelectorAll('[data-mobile-jump]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetView = link.getAttribute('data-mobile-jump');
      switchMobileView(targetView);
    });
  });

  document.getElementById('mob-to-menu').addEventListener('click', () => {
    switchMobileView('mob-screen-menu');
  });

  document.getElementById('mob-dish-card-trigger').addEventListener('click', () => {
    switchMobileView('mob-screen-dish');
  });

  document.getElementById('mob-item-6').addEventListener('click', () => {
    switchMobileView('mob-screen-dish');
  });

  document.getElementById('mob-back-to-menu').addEventListener('click', () => {
    switchMobileView('mob-screen-menu');
  });

  // --- 09. 12 SCREENS / STATES DIRECTOR BAR CONTROLLER ---
  stateDirectorButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      stateDirectorButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const target = btn.getAttribute('data-target');

      // Close any open modals first
      closeDishModal();
      closeReservationModal();

      // Handle Desktop vs Mobile transitions
      if (target.startsWith('screen-mobile')) {
        setDeviceMode(true);
        if (target === 'screen-mobile-home') switchMobileView('mob-screen-home');
        if (target === 'screen-mobile-menu') switchMobileView('mob-screen-menu');
        if (target === 'screen-mobile-dish') switchMobileView('mob-screen-dish');
      } else {
        setDeviceMode(false);

        if (target === 'screen-homepage') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          stickyNav.classList.remove('is-scrolled');
        } else if (target === 'state-homepage-scrolled') {
          stickyNav.classList.add('is-scrolled');
          window.scrollTo({ top: 400, behavior: 'smooth' });
        } else if (target === 'state-menu-expanded') {
          document.getElementById('screen-menu').scrollIntoView({ behavior: 'smooth' });
          openDishModal('06'); // Open signature Kokum Lobster
        } else if (target === 'state-reservation') {
          openReservationModal();
        } else {
          const targetEl = document.getElementById(target);
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    });
  });

  // Smooth scroll links from internal data-screen-jump
  document.querySelectorAll('[data-screen-jump]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = el.getAttribute('data-screen-jump');
      
      if (targetId === 'state-menu-expanded') {
        const dishId = el.getAttribute('data-dish-id') || '06';
        openDishModal(dishId);
        return;
      }
      
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  console.log('ANGAAR // UI/UX Architecture Engine Initialized. All 12 States & Shaders Active.');
})();
