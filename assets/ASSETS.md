# Media Assets — Unapologetic Foods demo site

All files below were generated in this session. Tools used: Pillow 12.3.0 and a static
ffmpeg 7.0.2 (via `imageio-ffmpeg`, built with libx264, libvpx-vp9 and libwebp).

Total footprint: `assets/img` 1.8 MB · `assets/video` 8.1 MB · `assets/brand` 28 KB.

---

## 1. Food photography — `assets/img/`

Source: **Foodish** (`github.com/surhud004/Foodish`, branch `main`/`master` — both exist and
are identical). Images live at `public/assets/images/<category>/<category>N.jpg` (not
`public/images/...` as the API doc implies). Cloned via the anonymous git-read proxy
(`GIT_LFS_SKIP_SMUDGE=1 git clone --depth 1 https://github.com/surhud004/foodish`).

Selection method: for each of the 7 requested categories, the 8–10 highest-resolution
files were pulled into labelled contact sheets and viewed. Any image carrying a visible
recipe-site watermark or text overlay (e.g. "yourhungerstop", "Cafe Delites",
"Currytrail.in", "soya biryani", "masala dosa" captions, a Dreamstime stock-photo mark, or
a "Merry Christmas" holiday prop shot) was rejected even when otherwise higher-resolution.
13 clean, unwatermarked, high-resolution photos were kept, converted to WebP (quality 78,
method 6), resized to a max of 1600 px on the long side, original aspect ratio preserved.

| File | Size (px) | File size | Description | Source (Foodish path) |
|---|---|---|---|---|
| `biryani-close.webp` | 1600×1600 | 138 KB | Chicken biryani close-up in a steel kadai, lemon wedge and cilantro garnish, dark tabletop | `biryani/biryani57.jpg` (orig. 4000×4000) |
| `biryani-overhead.webp` | 1067×1600 | 151 KB | Biryani in a hammered-copper handi with brass spoon, orange napkin, warm wood background | `biryani/biryani19.jpg` (orig. 1290×1934) |
| `butter-chicken-close.webp` | 1000×1395 | 99 KB | Butter chicken over basmati rice, cilantro, on a white plate against a near-black background | `butter-chicken/butter-chicken13.jpg` (orig. 1000×1395) |
| `butter-chicken-overhead.webp` | 1188×1600 | 116 KB | Overhead shot: butter chicken + brown rice + torn naan in a steel kadai, bright white table | `butter-chicken/butter-chicken16.jpg` (orig. 1200×1616) |
| `samosa-plate.webp` | 1600×1525 | 190 KB | Three golden samosas on a white rectangular plate, mint/cilantro garnish, dark slate background — most "editorial" of the set | `samosa/samosa8.jpg` (orig. 1801×1717) |
| `samosa-close.webp` | 1600×889 | 127 KB | Samosas on a copper plate/parchment, one torn open showing the pea-and-potato filling | `samosa/samosa19.jpg` (orig. 2880×1600) |
| `dosa-overhead.webp` | 1600×1064 | 70 KB | Minimalist top-down shot of a single dosa browning in a dark cast-iron pan | `dosa/dosa71.jpg` (orig. 6016×4000) |
| `dosa-long.webp` | 1600×1201 | 174 KB | Classic folded dosa on a white plate with chutney and a mound of chili powder, woven-mat background | `dosa/dosa17.jpg` (orig. 3264×2450) |
| `dosa-thali.webp` | 1600×1200 | 150 KB | Overhead dosa thali: rolled dosa, sambar, potato masala, coconut chutney on a white plate | `dosa/dosa2.jpg` (orig. 3264×2448) |
| `idly-plate.webp` | 1600×1067 | 72 KB | Steamed idlies on a banana leaf with red-chili/curry-leaf garnish, sambar and chutney bowls, woven-mat background | `idly/idly29.jpg` (orig. 2122×1415) |
| `idly-thali.webp` | 1531×1600 | 121 KB | Overhead idly platter on a banana leaf with 4 chutneys/sides (green, orange, dark, white) | `idly/idly6.jpg` (orig. 2033×2124) |
| `rice-plate.webp` | 1280×1280 | 216 KB | Fried rice with a sriracha-style red sauce and sesame seeds in a dark cast-iron skillet on a wood board | `rice/rice25.jpg` (orig. 2880×1600) |
| `dessert-plate.webp` | 1280×911 | 156 KB | Chocolate bundt cake dusted with powdered sugar, raspberries and blackberries, on a wood board | `dessert/dessert5.jpg` (orig. 1280×911) |

**Note on the `rice` and `dessert` categories**: Foodish's `rice` folder is Chinese-American
fried rice (not Indian rice) and `dessert` is Western bakes (cake/crepes/cookies) — there
is no Indian-rice or Indian-sweet category in this dataset. The single best (watermark-free,
dark-background, non-holiday-themed) image from each was used as instructed by the task.

### Licensing — exact wording found

From the Foodish `README.md` (identical on `main` and `master`):

> "Please note that I do not own any of the Foodish dataset images. All Foodish images and
> their ownership belong to their original creators mentioned below... Foodish would not be
> possible without the work of: **Rajaraman Ekambaram** for providing the initial Foodish
> image database via **Kaggle**; **RitaE** for providing some additional Foodish images via
> **Pixabay**. This project is licensed under **MIT**. Please read the LICENSE for details."

The repo's `LICENSE` file is a standard MIT license (Copyright Surhud Bhagali), which by its
own text covers "this software and associated documentation files" — MIT is a code license
and the README explicitly disclaims image ownership separately from that grant.
`CONTRIBUTING.md` adds that contributed images must be "either your own creation or free to
use, for example, image(s) published under the Creative Commons CC0 License."

**Licence finding: unclear.** The repository *bundles* the images and its maintainer
describes them as free to use / sourced from Kaggle and Pixabay (both of which host
permissively-licensed and CC0 content), but no per-image licence or attribution is provided,
and MIT technically applies to the code, not demonstrably to each image. This is fine for a
placeholder/demo site (which is exactly the stated use-case in the Foodish README's own
"Usage" section: *"You are designing a restaurant website and you want to add random food
pictures as placeholders"*), but the images should **not** be treated as clearly-licensed for
a real commercial launch without sourcing individual permissions.

---

## 2. Hero video — `assets/video/`

Source: `c82a890d-fire1.mp4` (20.3 MB upload) — a 27.6 s, 1920×1080, 25 fps H.264 clip (with
audio) of a chef flambéing a wok over a gas burner in a dark kitchen. Trimmed to the 12 s
window `t=2.0s`–`t=14.0s`, which covers the biggest, most continuous flame bursts and skips
the near-black first 1.5 s of the source.

| File | Size (px) | Duration | File size | Codec / notes |
|---|---|---|---|---|
| `fire.mp4` | 1920×1080 | 12.0 s | 3.4 MB | H.264 (libx264), CRF 28→34 tuned for <4 MB, yuv420p, no audio, `+faststart`, 25 fps |
| `fire.webm` | 1920×1080 | 12.0 s | 3.5 MB | VP9 (libvpx-vp9), CRF 42, `-b:v 0`, row-mt, yuv420p, no audio |
| `fire-mobile.mp4` | 720×406 | 12.0 s | 1.4 MB | H.264, CRF 28, yuv420p, no audio, `+faststart` |
| `fire-poster.jpg` | 1600×900 | — | 64 KB | Frame at source t=8.5s: dramatic orange flame plume erupting from a dark wok, mostly-black background, chef's hand and spatula visible at right — quality 70 |

All three video files have audio stripped and are visually dark/moody (near-black
background, orange-gold flame as the only bright element) as requested.

---

## 3. Logo — `assets/brand/`

Source: `8.jpg` (300×300 px JPEG, black wordmark "unapologetic" with a red dot over the "i"
and a small rotated "FOODS" in black, on white). Processing: cropped to the artwork's
bounding box (whiteness threshold on the min-RGB channel), upscaled 2× with LANCZOS
resampling *before* alpha thresholding (to keep edges smooth rather than upscaling a hard
binary mask), then converted to alpha via a smoothstep curve on "distance from white"
(min channel value), with red pixels (R noticeably greater than G and B) detected on the
upscaled image and forced to `#c8102e`-ish red in both outputs.

| File | Size (px) | File size | Description |
|---|---|---|---|
| `unapologetic-white.png` | 600×112 | 11.0 KB | Wordmark in white with the red dot on the "i", fully transparent background — checked composited on a dark swatch, reads cleanly |
| `unapologetic-black.png` | 600×112 | 10.7 KB | Wordmark in black with the red dot on the "i", fully transparent background — checked composited on a light swatch, reads cleanly |

Both were visually verified by compositing onto a dark (#141210) and a light (#faf8f4)
background and reading back the result; edges are anti-aliased (soft, not jagged), and the
red dot survives in both colourways. Given the tiny 300 px source, some softness at extreme
zoom is inherent to the original artwork's resolution, not an artifact of this processing.
