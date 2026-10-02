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
