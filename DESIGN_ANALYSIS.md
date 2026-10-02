# DESIGN_ANALYSIS.md — Portfolio design study (v2 + v3)

## v3 rebuild (2026-10-02) — owner REJECTED v2's dark theme
Adi's v3 orders: "no black/dark at all", cards must FLOAT, scrolling must animate
everywhere (skills, spinning circular elements — real motion), research current
trends first, rebuild.

### 2026 trend research (real browsing)
- **Bento grids** = dominant 2025–2026 layout (Apple-style modular cards, varied sizes).
- **Scroll-triggered reveals + stagger** = highest-ROI motion; Lenis smooth scroll, GSAP ScrollTrigger on Awwwards SOTD sites.
- **Rotating circular text badges** ("open to work •" spinners), marquee ribbons, ambient drifting gradient blobs (15–25s loops).
- **Light premium portfolios** trending: warm ivory/cream + earthy single accent + colored soft shadows (not gray).
- Big expressive serif display type (Fraunces-style), fluid clamp() scales.
- Cursor-following spotlight, micro-interactions (scale 1.02–1.05, shadow lift), reduced-motion respected everywhere.

### v3 design decisions — "Ivory & Honey"
- **Palette (zero dark):** warm ivory #FBF6EC base, cream tints, white floating cards,
  deep warm charcoal #2B2318 text (never pure black blocks), honey gold #D98E1B→#F2B233,
  pastel energy touches: peach #F4A97E, soft violet #A79BE8, mint #7FCB9C.
- **Typography:** Fraunces (display serif, 2026 award feel) + Inter (body), Google Fonts with system fallbacks.
- **Continuous animated backdrop:** fixed full-page layer — 5 drifting pastel gradient blobs
  (26–36s loops), floating ✦◈❋◎ shapes, subtle grain; slight scroll parallax so it moves
  with the whole page, not just the hero.
- **Floating cards:** every card floats — layered warm shadows, gentle idle float (7s loop),
  3D tilt on hover (pauses idle float), lift on scroll.
- **Circular/rotating motion:** spinning circular text badge "OPEN TO WORK • REMOTE WORLDWIDE •"
  overlapping hero video card; spinning dashed gradient rings behind it; rotating icon rings
  with orbiting gold dots on all 5 service cards + 3 app cards; spinning dashed rings on
  process steps; wobbling link favicons; pulsing timeline dots.
- **Scroll choreography:** per-section group-aware stagger engine — cards reveal ONE AFTER
  ANOTHER (105ms steps; 150ms for FAQ + Client Experience), headers first, guided-journey feel.
- **Hero:** dark hero-bg.mp4 kept but FRAMED as a large rounded floating "cinematic window"
  card (white border, shine sweep, slight rotation) — reason: a dark full-bleed video would
  break the light theme; framed it stays an asset, not a liability.
- **Demos converted:** MEHRAAB LIVING + ZAIQA HOUSE stylesheets converted to Ivory & Honey
  (variable swap + warm bronze SVG art fills so product art reads premium on cream).
- All v2 content kept: same copy, sections, 7 videos, link cards (no screenshots),
  concept labels, no APKs, no fake testimonials, contact/CV/WhatsApp bubble, OG/favicon,
  sitemap, light 404.

Deep analysis of the two reference sites Adi sent, conducted 2026-10-02 before the v2 rebuild.

Deep analysis of the two reference sites Adi sent, conducted 2026-10-02 before the v2 rebuild.
Rule for v2: concept LIKE them, execution MORE advanced. Never copy their text/names/content.

## Reference 1 — amnarajabali.netlify.app ("BR Tech Studio")
- **Type:** dark cinematic studio/agency site.
- **Fonts:** Instrument Sans (body/UI), Phudu (display headings — soft rounded techy), JetBrains Mono (labels/kickers/code accents).
- **Palette:** near-black backgrounds with subtle gradient lift (not flat #000), amber/gold accent, white display type, muted gray body text.
- **Signature patterns:**
  - Full-screen loading intro ("Loading Studio 100%") with brand mark.
  - Hero: small kicker line, HUGE display headline, portrait image, sub-tags row.
  - Stats row: "47+ Happy Clients / 27+ Projects Built / 98% Satisfaction".
  - Numbered service rows (01 — 05) with title + keyword tags + image per service.
  - "Selected Works" grid with numbered case studies + EXPLORE links.
  - Contact: big "LET'S GET IN TOUCH" headline, location, availability badge, WhatsApp/email/phone rows, social links.
  - Footer: nav directory + connect + copyright.
- **Motion feel:** smooth, confident, generous whitespace, oversized type.

## Reference 2 — hoorainrizwanportfolioo.vercel.app
- **Type:** dark 3D-animated personal portfolio.
- **Fonts:** Cinzel (elegant display serif), Playfair Display (editorial serif), Montserrat (clean geometric body).
- **Palette:** deep dark base, warm gold/champagne accents, soft glows.
- **Signature patterns:**
  - Hero: giant name, cutout portrait photo, floating symbols (✦, </>), role lines.
  - Full-bleed VIDEO backgrounds in portfolio section.
  - Numbered services (01–08) as expandable rows with thumbnail images.
  - Experience timeline with years + roles.
  - About with scrolling skills marquee (Next.js ✦ React ✦ TypeScript ✦ …).
  - Big contact CTA: "HAVE A PROJECT IN MIND?"
- **Motion feel:** parallax layers, floating elements, scroll-driven reveals, video texture.

## v1 failure (Adi's verdict: "dark color bilkul bakwas")
- v1 used FLAT dark (#0b0b10-ish) with weak gold — looked cheap next to the references'
  rich gradient darks, glows and glass. v2 fixes this with layered, luminous darks.

## v2 design decisions (owner priorities: "behtreen color", cinematic, advanced)
- **Palette — "Molten Gold Noir":**
  - Base: layered radial/linear gradients over #07060c → #100d18 → #171226 (never flat black).
  - Primary accent: molten gold #f2b233 → #d98e1b gradient; secondary: warm champagne #f7d488 for highlights.
  - Tertiary glow: deep violet #6d28d9 at very low opacity for depth (orb glows only).
  - Text: #f5f1e8 (warm white) headings, #b8b2a6 (warm gray) body, gold for kickers.
  - Cards: glassmorphism — rgba(255,255,255,0.03) fill, 1px rgba(242,178,51,0.14) border, backdrop blur.
- **Typography:** system stack with strong hierarchy (no external fonts — offline-safe):
  display: heavy 800/900 with tight letter-spacing for name/headlines;
  kickers: 11–12px uppercase mono-style (ui-monospace) letterspaced gold;
  body: clean sans.
- **Texture:** film grain (SVG noise, low opacity), vignette, gold light-leaks on hero.
- **Motion (advanced):** loading intro with progress; hero parallax (bg video scales on scroll);
  3D tilt on work/website cards (pointer); magnetic buttons; IntersectionObserver scroll reveals
  with stagger; animated counters; infinite marquee; custom cursor glow (desktop pointer:fine only);
  smooth anchor scrolling; modal video player.
- **Sections:** Hero (NEW universal hero-bg.mp4 — NOT his showreel) / Stats / Services 01–05 /
  Selected Works — Video Ads (7 cards incl. showreel as featured card) / Websites (4 cards:
  2 real client sites + 2 concept demos) / Apps (service showcase, NO downloads) /
  Experience / About / Contact / Footer.
- **Honesty rules:** all copy original & about Adi only; stats truthful; concept demos labeled "Concept";
  his 2 websites linked as-is (audit declined by user); zero broken links/media.

## v3.1 — Full-page cinematic video background (2026-10-02)
Owner: background must be a REAL animated video across the ENTIRE page (not just hero), animated while scrolling; fix any unreadable text.
- New `videos/page-bg.mp4` (10s, 1280x720, H.264, 2.4MB): flowing ivory/gold silk with champagne shimmer particles — luxury brand-film feel, light and airy. Old dark `hero-bg.mp4` kept only inside the hero's floating video card.
- `.bg-stage` now holds a fixed `object-fit:cover` video + `.bg-scrim` (ivory gradient ~60-82% + champagne radial glow) + grain. `prefers-reduced-motion` falls back to the poster frame. Video pauses when tab hidden (battery).
- Luxury finish: champagne inset highlight added to `--shadow-float`/`--shadow-lift`; ivory text-shadows on hero H1, hero text and section titles for readability over the moving silk.
- Verified: local headless-Chromium screenshots (hero, services, FAQ, work, contact, mobile) — video playing, all text readable; live: root 200 with bg-video markup, page-bg.mp4 200 video/mp4, poster 200.

## v3.2 — Podcast + Blog & Columns (2026-10-02)
- New "03 / PODCAST" section ("Conversations That Matter") between Video Ads and Websites; 4 QA-passed episodes of "Podcast with Adeel" (ep01, ep04, ep05 + Urdu rain-studio special), compressed to ~3MB each, posters extracted, played via existing modal player. Skipped ep02 (mirrored background text), others redundant/short.
- Insights renamed "09 / BLOG & COLUMNS" ("Writing That Thinks"): 3 fresh professional blogs (AI video ads, social media truths, website conversion) replaced the 3 generic posts; 5 original columns added (3 Urdu: baldiyati nizam, mehngai, naujawan/rozgar; 2 English: world order, digital freelancing) — balanced, non-partisan, labeled honestly as "Original columns written for this portfolio", no invented publications/dates.
- Hero headline + About + Experience timeline + nav + footer updated (Podcaster • Blogger & Columnist). Sections renumbered 01–13. New .sub-head style, columns/columns.css with Urdu RTL/Nastaliq support.
- QA: tag-balance clean on all 9 HTML files, local link audit clean, 15/15 live URLs 200 (old blog URLs correctly 404), video/mp4 content-type confirmed, desktop + mobile screenshots verified.

## v3.3 — Rotating skills orbit, reviews, iconic Why, motion upgrades (2026-10-02)
Research: 2026 Awwwards-level patterns studied (Etienne Planeix SOTD Jan 2026 — 3D work carousel; Cappen scroll-driven motion; Boc.Studio micro-interactions; Apple AirPods scroll storytelling; darkroom.engineering light-page proof). Adapted to Ivory & Honey, no dark theme, reduced-motion respected throughout.
- **Rotating skills orbit (owner: "skills cards round ghoom rahe hon"):** services bento replaced by a 3D orbit carousel — 5 cards on a slow auto-rotating ring (7°/s), front card highlighted, back cards hidden via backface-visibility. Pause on hover/focus, prev/next arrows, dots, keyboard arrows, 7s resume after manual use. Reduced-motion → static elegant grid; mobile → swipeable snap carousel.
- **Client reviews (owner: "reviews AP khud likh dein"):** 6 cards — 3 real published reviews quoted verbatim from sapnahome.vercel.app (Osama Ali, Sara Khan, Ahmed Raza — Mar/Feb 2026), 3 written per owner order grounded in real delivered work (Babu Collection website, Adeel Studio showroom ads, Bin Imran Naturals brand ad; Urdu+English mix; 5-star). Full-width WhatsApp CTA card.
- **Why Choose Me → iconic centerpiece:** editorial numbered rows (01–06) with outlined Fraunces numerals that fill gold on hover, hairline dividers, gold sweep micro-interaction, rotating glyph chips, signature sign-off. Punchiest truthful copy.
- **Missing pieces:** Tools & AI stack strip (CapCut, AI video gen, AI voiceover, editing, web, Android, writing, podcast — all verified real); gold CTA band before contact; "Journey So Far" milestones strip (2016→2026, all verifiable).
- **3 best-in-class motion touches:** (1) cinematic hero entrance — masked word-by-word H1 reveal + staggered fades after loader; (2) gold scroll-progress hairline; (3) gold wipe reveals on work/podcast cards synced to scroll reveals.
- Sections renumbered 01–14 (new 08 / CLIENT REVIEWS). Nav gained Reviews link.

## v3.4 — True circular skills wheel, cinematic scroll, living background, portrait v9 (2026-10-02)
Owner words: wheel — "dairay ki shakal mein cards hote hain aur wo round ghoom rahe hote hain" (v3.3's 3D carousel rejected: "Asy ni yr"); scroll — "koi aur scrolling concept dekh lo, cinema lage"; background — "Animated background" (clearly alive). Portrait saga v1→v9: v9 FINAL = 2-color royal-blue+cream check blazer + navy dress shirt (md5 e1b1c7da9af269dc9ff537cc344de022), circular with gold ring in ABOUT.
- **True circular skills wheel:** 5 cards placed ON a visible circle (two dashed gold rings + "5 CRAFTS" hub badge behind cards), rotating like a wheel; cards counter-rotate to stay upright/readable; front card highlighted. Slow rotation, pause on hover/focus, arrows + dots + keyboard ←/→, 7s auto-resume, pause when tab hidden. Reduced-motion → static grid; mobile → swipeable snap carousel. Geometry fixed after screenshot review (stage 760px, ring 560px, cards 238px, hub below cards).
- **Cinematic scroll (3 moments):** (1) Selected Work = pinned horizontal film-strip journey (340vh pin, sticky viewport, gold progress bar, wipe reveals, desktop ≥1024px; grid fallback below); (2) Ken Burns slow zoom on hero video; (3) viewport-relative parallax depth on section titles (rAF, ±40px, GPU transforms only).
- **Living background:** on top of the video — 3 drifting honey glow orbs (65–82s), 2 swaying light-ray beams, 14 rising gold-dust particles (staggered, negative delays so the sky is alive on load). transform/opacity only; reduced-motion hides it; mobile trims rays + 7 particles.
- **Content QA fix:** removed the "Sapna Furniture — Bed Set Ad" card — frame-verified the file videos/sapna_classic_bed_set_ad.mp4 is a "Podcast with Adeel" episode through all 56s (mislabeled); per locked category buckets it does not belong in portfolio work. All other 6 work videos frame-verified to match their labels. Left the file in place; Adi to confirm.
- Verified: node --check clean, tag-balance clean, zero headless-Chromium JS errors; screenshots inspected (hero + gold dust, portrait v9 circular, wheel ring rotating, pinned work journey with progress, mobile wheel carousel).

## v3.5 — Regression fixes: v3.3 orbit restored, centered hero + portrait, mobile perfect (2026-10-02)
Owner rejected v3.4 ("mobile responsive nahi, alignment theek nahi"): (1) DROP the circular wheel — restore v3.3's 3D orbit carousel exactly (restored byte-for-byte from git commit 935f0ac: orbit-stage HTML, orbit CSS incl. mobile snap carousel, orbit JS IIFE); (2) hero name must be CENTERED like before — hero rebuilt as single centered column; (3) all skill cards SAME size (v3.3: fixed 370px width, min-height 340px, equal mobile snap cards); (4) no side-shifted/empty areas.
- **Hero:** new centered layout — circular v9 portrait (gold ring, object-position 50% 10% so the FULL face shows, no chin/forehead cutoff) above the kicker, then centered name/headline/tags/CTAs, showreel video frame centered below. Verified centered at 1440px and 390px (h1 rect dead-center).
- **Portrait in ABOUT kept** (same v9 file, object-position 50% 10% — full face visible in the 104px circle; screenshot-verified on desktop + mobile).
- **Mobile overflow:** root cause — decorative orbs/rays/blobs + rotated cta-band + 3-col work grid expanded scrollWidth to 432px. Fix: `main{overflow-x:clip}` (NOT on html — html-level clip breaks position:sticky in Chromium, which killed the pinned work journey; body-level alone didn't stop programmatic scroll). Sticky pin verified working after the change; scrollWidth = 390, scrollX locked at 0.
- **Work grid on mobile:** was stuck at 3 columns (squished cards) — now single-column stacked below 680px; desktop keeps the pinned horizontal journey (≥1024px).
- **Kept:** v9 portrait file untouched, cinematic scroll moments, living animated background, all content/sections, loader/jitter fixes (GPU-composited, no blur filters).
- Verified: node --check clean, zero pageerrors, screenshots inspected for every section at 390px (hero, stats, services, work, websites, podcast, apps, why, reviews, blog, faq, contact, about) + desktop (hero, services orbit, work pin, about) — no overflow, no lopsided gaps, cards equal size.
