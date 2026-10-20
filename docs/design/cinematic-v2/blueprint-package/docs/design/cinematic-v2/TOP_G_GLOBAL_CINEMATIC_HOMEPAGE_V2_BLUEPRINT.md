# TOP G GLOBAL — CINEMATIC HOMEPAGE V2
## Creative direction, experience architecture & implementation specification

**Document ID:** TGG-CIN-V2-001  
**Version:** 1.0 — Implementation blueprint / proposed visual specifications  
**Date:** 20 October 2026  
**Scope:** Public homepage and its shared public navigation/footer only  
**Approval context:** Founder explicitly authorized moving beyond the previous frozen public visual direction to achieve a more premium and cinematic experience. This document specifies the V2 direction; its individual layouts, media assets and final motion are **not yet visually signed off**.  
**Current development context:** Next.js 16 / React / TypeScript / Tailwind, Supabase-backed institutional platform; current V1 cinematic homepage is a replaceable presentation layer.

---

## 1. Executive creative directive

**The site must feel like an authored short film that the visitor can navigate—not a dashboard rearranged into a marketing site.**

Top G Global is a global Christian leadership, development and impact institution. V2 must express confidence, depth, character, legacy and service without appearing like a generic luxury template, financial speculation brand, nightclub site or technology demo.

### The standard

- **Cinematic:** Sequence, lighting, transition and movement are part of the storytelling.
- **Premium:** A restrained visual language, deliberate whitespace, excellent typography, authentic materials and precise interaction.
- **Institutional:** The content remains accurate, credible and clear. The design serves formation, leadership and impact.
- **Human:** Real people, real work and real purpose, where suitable footage is available and cleared for use.
- **Performant and accessible:** A slow visual mood must never mean a slow-loading, motion-heavy or unusable website.

**Do not reproduce the old city-at-sunset image with the anonymous man facing away.** Do not reuse the oversized *GIANTS* italic serif headline treatment, dense boxes, tiny informational labels or generic stock-photo collage from V1.

### Film-reference interpretation — not copying

**User reference video 1:** Dark, warm lighting around a carefully staged luxury grooming subject. The website shown cycles through distinct compositions, focal photography, editorial headlines and product/service sequences. **Transferable principle:** tight art direction, purposeful reveals, one focal subject at a time, premium gold/amber lighting.

**User reference video 2:** Creative-technology website with atmospheric particles, strong spatial depth, layered artwork and dimensional transitions. **Transferable principle:** selective depth, scene-to-scene morphing and tactile interaction—not copying the video or surrounding site.

**Original combination for Top G:** A warm, monumental, dark editorial experience, with cinematic light and imagery carrying the emotion and quiet spatial motion adding sophistication. Motion should never obscure navigation or information.

---

## 2. Source of truth and change control

### Preserved institutional truth

The Top G Global **Master Organizational & Digital Blueprint v2** and development handoff continue to govern institutional content and architecture. In particular:

- Official name: **Top G Global**.
- Canonical public line: **“Transforming Ordinary People into Giants.”**
- Supporting expression: **“Built in Spirit. Strong in Mind. Wealthy in Purpose.”**
- Top G is a Christian leadership, development and impact organization—not simply a membership club.
- **Founder: Priest Samuel; permanent Founder identity G-1.** The official logo is never redrawn or substituted.
- The Seven Realms are **Refining, Alpha, Eagle, Dominion, Priesthood, Realm of Legends, Realm of Elites**—a formation framework, **not system permissions or governance ranks**.
- **Account Holder ≠ Applicant ≠ Approved Member**. Joining must not suggest automatic admission.
- **Realm ≠ Sector ≠ Department ≠ Operational Role ≠ Governance Appointment ≠ Geography ≠ Membership Status**.

### Visual-authority update

The Founder has expressly superseded the **previous public homepage visual presentation**. This is a *controlled design change*, not permission to rewrite membership rules, branding facts, authentication security, public verification privacy, or approved backend models. Previous frozen visual batches remain useful as **functional-content inventories and behavior references** until an updated public visual package is formally approved. **Do not assume this V2 automatically restyles the member or admin platform.**

Keep a change-log entry documenting **which V1 public design rules were superseded, what V2 replaces them with, and the date of Founder approval**. If the final implementation differs from this blueprint, record the variance explicitly before calling it approved.

---

## 3. Art direction — the actual visual system

### 3.1 Composition

- One dominant focal point per scene; use **cinematic negative space**, not an excessive number of cards.
- Main layout grid: 12 columns on desktop, content max width **1,440px**, horizontal gutters `clamp(24px, 5vw, 84px)`; usable headline region about 7–9 columns depending on imagery.
- Let the hero occupy the initial viewport, but keep navigation and the first action visible at **1366 × 768**. Avoid a hero that forces the important CTA below the fold.
- Alternate **full-bleed cinematic scenes** with short, quiet editorial sections. Never string seven similarly sized dark panels together.
- Use wide 16:9 or 2.39:1 photography/video compositions where practical. Human faces must be framed intentionally; avoid accidental crops.
- Limited polished linework, selective borders and glows. A gold border on every container is explicitly prohibited.

### 3.2 Provisional V2 color tokens

These are implementation targets for V2 review, **not claims that they are the original frozen DS v1 codes**.

| Purpose | Token | Target |
|---|---|---|
| True stage black | `--cinema-ink` | `#080908` |
| Charcoal surface | `--cinema-surface` | `#141410` |
| Warm ivory headline | `--cinema-ivory` | `#F4F0E7` |
| Secondary copy | `--cinema-muted` | `#B9B3A8` |
| Restrained institutional gold | `--cinema-gold` | `#C6A05D` |
| Gold light / glint | `--cinema-gold-light` | `#E7C986` |
| Fine line | `--cinema-rule` | `rgba(198,160,93,.24)` |
| Cinematic atmospheric wash | `--cinema-atmosphere` | `rgba(113,72,34,.26)` |

Never use gold as a generic success/warning indicator; keep semantic status colors in functional interfaces. Target text contrast of **4.5:1** for normal text and **3:1** for large text/UI graphics where applicable.

### 3.3 Typography — chosen direction

**Primary:** `Manrope` variable (or a legally licensed equivalent grotesk) for navigation, editorial body, forms, data and confident displays.  
**Optional accent:** `Instrument Serif` *only in a short, deliberately composed phrase*; never in the dominant Hero headline, never oversized, never used as decoration on every section.

- Hero: sentence case or disciplined uppercase where the composition supports it; **no wall of shouting text**.
- Hero display scale: `clamp(3.4rem, 7.2vw, 7.4rem)`; line height `0.99–1.07`; tracking adjusted optically, not excessive.
- Intro/section headline: `clamp(2.5rem, 4.6vw, 5.5rem)`; line height `1.08–1.13`.
- Body size: **16–19px**, line-height 1.55–1.7, max line width ~60–70 characters.
- Navigation: **13–15px**, semibold; plenty of target area, no tiny unreadable menus.
- Eyebrows: rare, short and descriptive; **not** stacked small labels across every scene.
- Use responsive line breaks intentionally. Avoid line wrapping that creates orphans at 1366px or on phones.

### 3.4 Brand and photography

- Use the **official Top G Global lockup** without redrawing, re-coloring or adding invented crown marks.
- Use high-quality **original/licensed footage** showing real leadership, education, technology, service, and community impact. Images from Instagram references are *inspiration only*, not licensed production assets.
- Founder scene requires an **approved high-resolution real portrait**. Do not upscale the low-resolution old cropped reference to fill a huge portrait panel. If this asset is unavailable, launch with a typography-led Founder scene and an approved smaller picture—never invent a likeness.
- Avoid empty aspirational skyline shots, stock handshakes, anonymous silhouettes staring over a city, random luxury cars, gold dust clouds and exaggerated church stock visuals.

---

## 4. The film structure — six scenes, one narrative

Build one deliberate journey, not disconnected sections. Homepage headings and microcopy proposed below are **creative options**; institutional facts and canonical wording must be retained. Final copy receives Founder review before release.

### SCENE 00 — THE OPENING / HERO

**Goal:** Immediate stature, unmistakable Top G identity, a clear next action.

**Visual:** Full-bleed dark moving film: a sequence of warm architectural light moving over a crafted environment, then authentic moments of people learning, leading and serving (when cleared footage exists). Movement is camera-led and natural, not a fake revolving golden sphere. Overlay controlled near-black gradients so text remains readable. If video unavailable, use an original abstract light composition with restrained CSS animation and a strong poster.

**Composition:** Transparent-to-solid header, unchanged official logo upper left; reduced navigation; hero statement on the left with significant air. Small scene marker and animated hairline near the bottom.

**Hero content (preferred):**

> **Transforming ordinary people**  
> **into giants.**

A simple supporting sentence: “Building character, leadership, enterprise and service across generations.” The tagline must be readable and not trapped in an animation. Primary CTA **Discover Top G** → `/about`; secondary CTA **Begin your journey** → `/join`.

**Motion:** Headline lines rise through a masked reveal with stagger; gold light softly crosses one element; background footage continues independently. CTAs rise in after the headline. Avoid typing-effect letter-by-letter text, large bouncing words, and automatic carousel-style copy replacement.

**Avoid:** Old anonymous man overlooking the world, huge italic “GIANTS,” 5-line oversized copy, intense flashes, autoplay audio.

### SCENE 01 — THE MANIFESTO / WHY WE EXIST

**Goal:** Convince the visitor this is an institution with a purpose, not a gimmick.

**Visual:** Mostly black, quiet editorial text occupying ~65% of the width; faint dimensional linework referencing a global movement, without a literal stock globe.

**Headline option:** **“Character first. Impact follows.”**  
**Content:** One authoritative, concise paragraph built from the approved institutional definition. A short three-beat typographic motif drawn from **Built in Spirit. Strong in Mind. Wealthy in Purpose.**

**Motion:** As the scene enters view, the statement reveals in 2–3 lines; a fine gold rule grows from 0→100% while the lower line appears. Keep the statement readable while stationary for enough time.

### SCENE 02 — THE SEVEN REALMS / FORMATION

**Goal:** Present an intentional formation journey; do not imply advancement automatically grants rank.

**Visual:** A single full-width horizontal cinematic strip with **seven distinct chapter stops**, each numbered 01–07, using restrained iconography (or typography), a lit progressing line and short official meanings. Desktop: a sequential scroll-linked visual progression *without forced scroll-jacking*. Mobile: accessible stacked accordions or snap carousel with explicit controls.

**Copy:** Official seven Realm names in order. One short accurate line each; never reduce to fictional tests, rank or privileges.

**Motion:** Progress line advances with scroll, active Realm settles forward 8–12px, adjacent cards soften. All seven items remain available by keyboard and screen readers. Do not animate seven huge empty black rectangles.

### SCENE 03 — THE FOUNDER / HUMAN LEADERSHIP

**Goal:** Bring authenticity, leadership and stewardship into view.

**Visual:** Properly art-directed approved portrait (once supplied) with warm side light, half-page editorial narrative and room to breathe. No grainy enlargement. Alternative without suitable photo: typography, small approved portrait and a subtle abstract architectural moving light panel.

**Content:** **Priest Samuel**, **Founder of Top G Global**, permanent identity **G-1**. Use approved biography and leadership language; do not add invented quotations or achievements.

**Motion:** Portrait is revealed by a smooth vertical mask; Founder name rises once; a quiet light pass occurs on the border. No artificial talking-photo effects or AI impersonation.

### SCENE 04 — PURPOSE IN ACTION / THE REAL WORLD

**Goal:** Shift from aspiration to tangible leadership, enterprise, formation and service.

**Visual:** Three clear large editorial story frames: **Formation & Leadership**, **Innovation & Enterprise**, **Service & Impact**. Each frame may use a muted short documentary clip, with strong static cover image fallback. Do not claim specific completed projects or statistics unless documented.

**Motion:** Soft scene cross-dissolve as the active story takes focus; headlines move horizontally 16–24px into place. Optional short, continuously moving **institutional phrase band** between scenes—but not an endless ticker of critical information.

**Navigation:** Each frame links only to an implemented, valid destination or stays clearly informational until that route exists. No dead CTA buttons.

### SCENE 05 — THE INVITATION / FINAL CRESCENDO

**Goal:** End with confidence and a clear, honest next step.

**Visual:** A simplified wide black stage with a slowly strengthening gold horizon/light sweep. A strong, restrained single statement and a genuine CTA. No giant empty glowing orb.

**Headline option:** **“Purpose deserves a beginning.”**  
**Primary CTA:** **Explore membership** → `/join`.  
**Clarification:** “Creating an account does not constitute membership; applications are subject to review and approval.”

**Motion:** Statement reveals with one deliberate timing beat; CTA appears; the light gently recedes. This is the emotional end, not another busy sales section.

### FOOTER — THE CREDIBLE CLOSE

Quiet, clean, high-contrast official brand mark and canonical tagline, navigation only to live destinations, contact/legal links only when real documents/routes exist. Do **not** render fake newsletter signup or non-functional social buttons. No decorative giant text block. No oversized empty black padding.

---

## 5. Motion architecture — precise choreography

Motion system should use a shared motion provider, central tokens and accessible interactions.

### 5.1 Entrance storyboard (desktop; illustrative target timings)

| Time | Sequence | Motion |
|---|---|---|
| 0.00–0.25s | Poster/ambient film loads; logo visible | Fade black overlay, avoid blank screen |
| 0.20–0.65s | Header resolves | Opacity + translate Y from 8px |
| 0.35–1.15s | Hero line 1 | Masked reveal; translate Y 24px → 0; ease out |
| 0.58–1.35s | Hero line 2 | Same movement; delayed 0.23s |
| 1.00–1.65s | Supporting copy | Opacity + translate Y 14px |
| 1.20–1.90s | CTAs and scroll cue | Opacity/translation; gold line settles |
| 1.90s onward | Ambient background | Smooth unobtrusive film or 12–20s visual loop |

**Do not delay usability:** nav and primary CTA must remain clickable throughout the entrance.

### 5.2 Scroll choreography

| Element | Default motion | Constraints |
|---|---|---|
| Editorial heading | Reveal by line/group; 500–800ms | Trigger once, no random text scrambling |
| Body paragraph | Fade + translate Y 16–24px; 450–650ms | Reading order preserved |
| Photography | Clip-path/mask reveal; 700–1,100ms | No strobing or jerky zoom |
| Background depth | Slow translate/scale, scroll-linked | Respect motion preference; never obscure copy |
| Gold rule | ScaleX 0→1; 450–700ms | Decorative only |
| Realm sequence | Active state + progress line | No mandatory horizontal-wheel hijack |
| Impact frame | Dissolve/focus change | Keep content stable/readable |
| CTA hover | 180–260ms background/light shift | Include keyboard focus visual |

**Principle:** Text moves *into* place, then stays legible. The page moves cinematically, but reading does not require chasing text.

### 5.3 Interaction and accessibility rules

- Use `prefers-reduced-motion` to suppress parallax, text choreography, particles, persistent marquee and spatial transitions; show complete static content.
- Never require motion to discover content or complete tasks. All key messages remain in the DOM and accessible to screen readers.
- No autoplay sound. If audio is ever introduced, it requires user initiation and visible controls.
- Stop/pause ambient video when off-screen or tab is hidden. Offer a visible **Pause motion** control if motion is continuous.
- No scroll-locking/scroll-jacking or blocking intro that the user must watch.
- No flashes above accessibility thresholds; avoid full-page repeated flashes.
- Mobile animation is intentionally shorter, with no costly 3D canvas by default.

---

## 6. Responsive behavior

| Width | Layout | Animation policy |
|---|---|---|
| ≥1440px | Full cinematic canvas; precise two-column scenes | Enhanced ambient motion allowed |
| 1024–1439px | Hero and Founder scale down; CTA remains visible | Standard choreography |
| 768–1023px | Compressed nav or menu; scenes stack as needed | Simplified parallax |
| 390–767px | One-column design; 2-line restrained headings; full-size buttons | Reduced effects; smaller media |
| 320–389px | Legibility-first composition; no overflow | Critical motion only |

At laptop **1366 × 768**, hero logo, headline, description and at least one CTA must be visible without awkward clipping. At **390 × 844**, content must not overlap the browser viewport edges; the menu and interactive elements should be easy to tap. Use `100svh`/safe viewport handling rather than assuming `100vh` equals visible height on mobile.

---

## 7. Implementation architecture (Next.js)

**Recommended architecture:** Route `/` remains the homepage. Create components under a contained public feature module, for example:

```text
src/
  app/
    page.tsx                    # route composition only
  features/
    public/
      home-v2/
        CinematicHome.tsx
        scenes/
          HeroScene.tsx
          ManifestoScene.tsx
          RealmsScene.tsx
          FounderScene.tsx
          ImpactScene.tsx
          InvitationScene.tsx
        motion/
          MotionProvider.tsx
          MotionReveal.tsx
          useReducedMotion.ts
        styles/
          home-v2.module.css
        content/
          homepage-copy.ts
  components/
    public-shell/
      PublicHeader.tsx
      PublicFooter.tsx
public/
  cinema/
    hero-poster.avif
    hero-loop.webm
    hero-loop.mp4
    ... approved assets only
```

Use **Motion for React** (`motion/react`) for text and UI choreography. Only consider **GSAP ScrollTrigger** for a specific approved editorial sequence that cannot be achieved cleanly otherwise, and avoid competing animation engines on the same element. Use CSS for simple transitions. Keep layout/content server-rendered where practical; client components should be limited to interactions, video control and motion.

**Next.js 16 considerations:** Do not introduce current-time calls in prerendered layouts, fragile hydration-dependent geometry, or unnecessary `dynamic`/`runtime` exports under Cache Components. Animate DOM elements only after hydration; retain stable server-rendered markup. Keep existing authentication/Supabase routes untouched.

### Video asset pipeline

- Produce original or appropriately licensed **8–14 second loop** and a high-quality poster; ensure the first/last frames blend naturally.
- Deliver optimized H.264 MP4 + WebM alternatives; mobile-specific version if needed.
- Load poster as high-priority image for the hero, but **defer actual video playback** so it does not block LCP.
- Start video `muted`, `playsInline`, `loop`, `autoplay` only when permitted; use poster on failed autoplay, low bandwidth, reduced motion or unsupported browser.
- Target initial media transfer deliberately (e.g. video ≤ ~3–5 MB for a usable short clip where footage allows), verify on slow mobile networks, and adjust based on real measurements.
- Never bundle the provided Instagram recordings or screenshots as homepage background media; they are third-party reference content, not cleared production assets.

---

## 8. Asset brief and required material

| Asset | Required qualities | Readiness |
|---|---|---|
| Official Top G logo | Existing approved high-quality transparent vector/PNG | Existing asset; verify suitable production resolution |
| Hero film | Original/licensed footage, warm directional light, subtle movement, no anonymous skyline silhouette | **To source or commission** |
| Hero poster | Exact framing/lighting compatible with film | **To create from licensed footage** |
| Founder portrait | Approved, authentic, sharp, properly lit; suitable large crop | **Founder-supplied/approved high-resolution original required** |
| Formation visual | Elegant conceptual line/journey animation, not fake rank symbols | **To design** |
| Impact documentary clips | Real/cleared leadership, learning, enterprise and service | **To source and approve** |
| Fonts | Licensed, subset and self-hosted/optimized through `next/font` | **To confirm** |
| Mobile video/poster | Purposeful crop and low-transfer variant | **To produce** |

**Do not block the layout design waiting for footage.** Build a technically valid, visually art-directed *motion prototype* with temporary **clearly labelled placeholders**, then approve final media separately before production.

---

## 9. Quality gates — what counts as a professional result

### Gate A — Design acceptance

- Hero is unmistakably original to Top G, and the old figure/city hero is gone.
- Headline has appropriate weight, spacing, composition and no awkward wrapping across all target sizes.
- Imagery is cohesive, high-resolution and authentic; no stretched old screenshots or blurry Founder photos.
- All scenes form one cinematic story, with changes in tempo and visual scale.
- Compared against the two reference videos for **quality of motion and composition**, not copied content.
- Founder signs off on desktop and mobile visual walkthrough **before** calling V2 approved.

### Gate B — Motion acceptance

- Hero text visibly animates in the real browser (not only static screenshots).
- At least one scrolled editorial section has a masked reveal; Realms progression and Impact transitions are visible and usable.
- Movement is smooth and restrained; text settles in place and remains readable.
- All essential content is available with reduced motion and JavaScript/content fallbacks where reasonable.
- No cursor-trapping, scroll hijacking or hidden information.

### Gate C — Technical acceptance

- `npx vitest run`, `npx tsc --noEmit`, `npm run lint`, `npm run build` all pass.
- No hydration errors, console errors, broken links, horizontal overflow, runtime issues or client/server inconsistencies.
- Test actual runtime at `http://localhost:3001` (second laptop) and other configured ports as appropriate.
- Device checks: 1440×900, 1366×768, 1024×768, 768×1024, 390×844 and 320×568.
- Accessibility: keyboard navigation, 44×44px touch targets when practical, visible focus, meaningful alt text and contrast, reduced-motion preference.
- Performance goals measured on production output, not guessed: **LCP ≤2.5s, CLS ≤0.1, INP ≤200ms** at 75th percentile when realistic; record any exceptions and media trade-offs.
- Navigation to `/about`, `/join`, `/auth/sign-in` works; member-only data never leaks into public pages.
- Video failure does not break hero. Layout remains credible without autoplay.

### Gate D — Change control and Git

- Implement on a dedicated feature branch (e.g. `feat/cinematic-homepage-v2`) after safeguarding uncommitted work. Do not overwrite `main` from a ZIP installation blindly.
- Record approved design change in `docs/compliance` and identify which original PUBLIC visual rules were superseded.
- Attach desktop/mobile screenshots and preferably a 15–30s screen recording of the **real running page** to the change for visual QA.
- Commit and push only after all automated checks pass; review and merge into `main` only after the Founder approves the visuals.

---

## 10. Delivery plan — no more disconnected micro-patches

**Delivery 1 — Creative prototype & V2 foundations:** Typography, color tokens, shared header/footer, new real hero and motion system. Deliver screenshot + actual browser-motion recording, not a static mockup alone.

**Delivery 2 — Full narrative homepage:** Build Manifesto, Realms, Founder, Impact, Invitation and mobile layouts in one coherent implementation. No empty placeholder sections left in the final QA candidate.

**Delivery 3 — Full QA and media integration:** Replace temporary imagery with approved/licensed media, polish timeline and responsive behavior, fix interactions, confirm accessibility/performance, update compliance registry and submit for Founder sign-off.

Then, and only then, extend this **approved public V2 visual language** to About, Join, other public pages and appropriately scoped authentication screens. The admin and member UIs require separate change-control review.

---

## 11. Decisions currently made vs still open

### Confirmed by Founder in conversation

- Premium luxury feel based chiefly on the first video.
- Selective dimensional interactions inspired by the second.
- **Genuinely cinematic experience and visible moving text/sections.**
- Remove old anonymous-man-overlooking-city hero and reject V1 typography/composition.
- Permission to depart from previously frozen public visual batches as necessary for a better result.
- Retain institutional mission/product architecture while the presentation changes.

### V2 proposals requiring visual sign-off

- Specific V2 palette values and font pair.
- Final proposed headline line breaks, supporting copy and exact motion timing.
- Final scene count/ordering and art direction of each panel.
- Media selections, Founder portrait version, licensing and realistic video performance budget.
- Final desktop/mobile implementation after hands-on visual review.

**No architectural rules, admission criteria, Realm advancement policy, Member ID issuance pattern or governance permissions are decided by this creative blueprint.**

---

## 12. Definition of done

> **V2 is done only when a real visitor can open the homepage, experience a restrained moving film with moving editorial text, understand Top G Global immediately, navigate comfortably on phone or laptop, see authentic brand imagery, and reach working institutional/Join destinations—while the page passes performance, accessibility and automated quality checks and receives Founder visual sign-off.**

**Authoritative inputs:** Master Blueprint v2, Development Handoff, previously frozen design/QA archives (historical functional reference), Founder’s feedback on the V1 screenshots, and the two user-supplied Instagram screen recordings (visual inspiration only).
