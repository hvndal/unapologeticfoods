# Instagram reels: Adda Philly website concept

Five vertical reels, 1080×1920, 30 fps, H.264, **silent** (add audio in the Instagram editor).
Each one opens on a "Built by Mander Studio" card and closes on the Adda Philly badge with
"Website concept by Mander Studio · sales@mander.com". They are made from the site itself:
same fonts (Fraunces, Jost, Tiro Devanagari Hindi), palette, arches, petals, lotus and line
drawings, plus real phone-size screenshots of the live build.

| File | Length | What it is |
|---|---|---|
| `01-jigar-maa-badi-aag-hai.mp4` | 18.0 s | Fire cut for "Beedi" (Omkara). Beat-locked: hook words, the three fires, dish punch-cuts, hero, the site on a phone. |
| `02-butter-chicken-experience.mp4` | 20.5 s | The signature in four steps (cold smoke, churned butters, your wood, tableside), ending on the site's real preorder panel. |
| `03-a-menu-of-places.mp4` | 21.0 s | Nine regions, one dish each (Mumbai to Kolkata), with a route line across the top. |
| `04-built-by-mander.mp4` | 23.0 s | Case-study reel: the real site on a phone, from the fire hero to a four-tap reservation. |
| `05-a-room-below-the-room.mp4` | 16.7 s | Quiet and typographic: what "adda" means, downstairs, and the Fishtown address. |

## Syncing reel 01 to "Beedi"

The cut assumes **120 BPM** (one beat = 0.5 s), taken from public BPM listings for the track.
In Instagram, pick the part of the song you want (the "Beedi jalaile… jigar maa badi aag hai"
hook works best) and slide it so a strong downbeat lands at **0:02.0**. From there:

- 0:00–0:02 · "Built by Mander Studio" (intro, quiet)
- 0:02.0 / 02.5 / 03.0 / 03.5 · "Jigar" · "maa" · "badi" · "aag hai." (one word per beat)
- 0:04 / 05 / 06 / 07 · Tandoor · Tawa · Dum · "Three fires, one kitchen"
- 0:08–0:12 · a dish or flame cut on every beat
- 0:12 · badge hits on fire, "Adda Philly" on 12.5 and 13.0
- 0:14 · the site on a phone
- 0:16 · end card

If the cuts drift against the track, nudge the song start by a few frames; the tempo is steady.

The others change on whole or half seconds, so any 60/120 BPM track fits.

## Safe zones

Headlines and captions stay between roughly 8% and 80% of the frame height, clear of
Instagram's top bar, bottom caption and right-hand buttons.

## Rebuild

Sources are in `src/` (one HTML page per reel, driven frame by frame by `src/lib/reel.js`).

```sh
# needs Playwright's Chromium and ffmpeg (FFMPEG=/path/to/ffmpeg if it isn't on PATH)
NODE_PATH=$(npm root -g) node reels/capture-site.cjs   # phone-size screenshots of the site (reels 01, 02, 04)
NODE_PATH=$(npm root -g) node reels/render.cjs         # all reels → reels/*.mp4
NODE_PATH=$(npm root -g) node reels/render.cjs 03      # one reel
NODE_PATH=$(npm root -g) node reels/render.cjs 01 --stills=2,8.5 --out=/tmp/stills   # stills to check
```

`render.cjs` also splits the hero fire clip into frames under `reels/.cache/` (git-ignored).

Photography is the site's placeholder set (see `assets/ASSETS.md`), and hours are illustrative:
fine for a concept piece, but swap in a real shoot before anything goes out as official.
