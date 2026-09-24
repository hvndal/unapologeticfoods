# Adda Philadelphia — pitch concept

A design demo for Unapologetic Foods’ Adda at 1700 Frankford Ave, Fishtown. **Not an official site**: menu, hours and photography are illustrative.

## View it
Open `index.html` in a browser, or run a local server (`python3 -m http.server`) and go to http://localhost:8000.

- **Presenter** (bottom-left, or press **P**): jumps between the 12 pitch screens, including the reservation panel, dish detail and a phone-frame mobile demo.
- Deep links: `?screen=reserve`, `?screen=dish`, `?screen=mobile`, `?screen=menu` …
- `?static` turns off animations (for screenshots).

## Files
- `index.html`, `style.css`, `app.js` — the site (no build step, no dependencies).
- `fonts.css`, `assets/fonts/` — self-hosted Fraunces, Jost, Tiro Devanagari Hindi (SIL OFL).
- `assets/video/` — hero fire loop (mp4/webm/mobile + poster).
- `assets/img/` — placeholder food photography from the open-source Foodish project; see `assets/ASSETS.md` for sources and the licence caveat. Replace with a real shoot before any public use.
- `assets/brand/` — Unapologetic Foods wordmark (transparent PNGs from the supplied logo).
- `DESIGN_PROMPT.md` — the design brief.

## Pitch kit (`pitch/`)
- `pitch/index.html` — one-link pitch page: walkthrough film, live-site button, PDF download, QR code.
- `pitch/Adda-Philadelphia-Proposal-Mander-Studio.pdf` — 21-page proposal (rendered from `pitch/proposal.html`).
- `pitch/adda-walkthrough.mp4` — silent walkthrough film (desktop + mobile).
- `pitch/EMAIL.md` — email and DM reply drafts, plus the pre-send checklist.

## Hosting on GitHub Pages
Settings → Pages → Deploy from a branch → `main` / `(root)`. The site then lives at
https://hvndal.github.io/unapologeticfoods/ and the pitch page at https://hvndal.github.io/unapologeticfoods/pitch/.
Pages are marked `noindex` so the concept stays out of search results.
