# DESIGN_ANALYSIS.md — Portfolio v2 design study

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
