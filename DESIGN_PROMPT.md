# Design prompt — Unapologetic Foods · Fishtown demo

Redesign this site (index.html, style.css, luxury-components.css, app.js) from scratch visually.
Keep every dish, the copy, the Devanagari, the Director Bar screen switching and every id/class
app.js queries. Everything else about the look is open.

## Who it's for
A pitch demo for Unapologetic Foods (Chintan Pandya & Roni Mazumdar — Dhamaka, Semma, Adda,
Masalawala & Sons; Michelin star, James Beard awards). Their whole stance: Indian food with no
compromise, no dilution for Western palates, regional and specific. The site has to carry that
same attitude: loud, proud, specific, and expensive. Location: Fishtown, Philadelphia.

## The idea in one line
**A Jaipur palace printed like a 1970s bazaar matchbox.**
Indian maximalism — colour on colour, pattern on pattern, type the size of a wall — held together
by the discipline of a great print designer. It should feel like walking through an art object,
not scrolling a restaurant template. Maximal in colour, pattern and type; strict in grid, spacing
and craft. That strictness is what makes it luxury rather than kitsch.

## Reference identity (take the feeling, never copy)
1. **1970s Indian Coca-Cola print ad** — faded offset print, heavy tight grotesk headline, halftone
   dots, film grain, warm human photography, product shown at monumental scale.
2. **Maximalist haveli bedroom** — carved ebony, brass lanterns, painted coffered ceilings,
   encaustic tile floors, magenta / marigold / jamun textiles layered on each other. Dark wood
   frames the colour.
3. **Vogue India record-sleeve cover** — Devanagari set enormous, condensed and architectural,
   filling the frame edge to edge; chocolate-oxblood ground, peach-cream type, hot magenta and
   vermilion accents; pixel / cross-stitch border motifs; one vintage photo with soft corners.
4. **Illustrated bazaar ephemera** — Boroline, Mysore Sandal soap, desi daru labels, handbills,
   a printed hand-fan: gouache-painted everyday packaging, loved and specific.
5. **Patrika Gate, Jaipur** — cusped and scalloped arches nested inside each other, frame inside
   frame inside frame, border bands of diamonds and dots, rose / mint / turquoise / saffron.

## Visual system
- **Colour:** saturated and flat, never gradients. Oxblood-chocolate (#3B1D1A-ish) as the ground
  for most of the site, peach-cream for type, then hot rani pink, vermilion, marigold, Patrika mint
  and turquoise as accents. Every section can own a different colour combination, like the pages
  of a magazine, but each section uses at most 3–4 colours.
- **Type:** one huge condensed display face with a matching Devanagari (e.g. Tiro Devanagari,
  Mukta/Yatra One, Rozha One, or a condensed grotesk + Devanagari pairing) — Devanagari used as
  image, not decoration, at 30–60vw scale. A tight heavy grotesk for English headlines (70s ad
  energy). A good serif for body text. Small caps for labels. Kill Bodoni/Cormorant "luxury serif"
  defaults.
- **Frames & borders:** the cusped arch is the signature shape — use it as image masks, section
  openings, the reservation modal outline, and nested 2–3 deep. Border bands (diamond, dot, stitch
  pixel) edge sections the way they edge the Patrika Gate. Pure CSS/SVG, crisp, 1px-accurate.
- **Texture:** offset print — halftone, slight misregistration on big type, paper grain. Subtle,
  always on the image or type, never a haze over the whole page.
- **Imagery:** food photographed like the Coke ad — monumental, warm, grainy, cropped hard. Dishes
  can also appear as gouache-style illustrated objects, like the bazaar ephemera sheet, laid out
  as a collection.
- **Layout:** poster-scale sections, each one a composition, not a stack of centred blocks.
  Edge-to-edge type, deliberate overlaps, objects breaking the frame. Alternate dense maximal
  spreads with one quiet spread so it breathes.
- **Menu:** not a list and not cards. Each course is a spread or a "label" — like a matchbox or
  soap wrapper designed for that one dish: its own colour pair, its name in Devanagari and
  English, region, one line of ingredients.
- **Motion:** confident and sparse: big type sliding in once, arches opening like doors, a slow
  print-registration shimmer on hover. No bouncy fades on every element, no parallax soup.
- **Copy voice:** Unapologetic's own — direct, proud, a little funny. No "culinary journey",
  "elevated", "experience", no apologising.

## Banned (the "AI template" look)
Gradient text, glowing blobs, glassmorphism, pill badges over the hero, centred hero + two
buttons + three feature cards, rounded-2xl cards with soft shadows, icon-in-circle grids, emoji,
gold gradients, same width and spacing for every section, generic stock food photos.

## Done means
- All 12 Director Bar screens, both modals and the mobile frame work and look designed at 1440,
  768 and 390px. No horizontal scroll, no orphaned words in headlines.
- Someone at Unapologetic scrolls it and says "that's us, but more".
