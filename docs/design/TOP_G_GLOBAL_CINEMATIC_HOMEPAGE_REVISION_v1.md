# Top G Global — Cinematic Homepage Revision v1

**Decision:** The Founder approved cinematic presentation, drawing primarily on premium luxury styling from the first provided video and restrained immersive motion/depth from the second.

**Change scope:** The public homepage only. This is a formally approved VISUAL revision to the earlier frozen PUBLIC-01 screen. It does **not** amend the institution's rules, member lifecycle, seven-Realm meanings, reserved G-1, authorization or Supabase policies.

## Authority and source map

- Institutional truth: Master Organizational & Digital Blueprint v2.
- Brand: Design System v1; retain supplied Top G official lockup.
- Baseline page: Frozen Batch 2 PUBLIC-01; mobile: Batch 6 MOBILE-01 / MOBILE-02.
- Motion inspiration: user-provided two Instagram screen recordings. No copied imagery or page code from those Reels.
- Founder change authorization: explicit approval for premium + cinematic public presentation in this development conversation.

## Implementation

- New editorial, fullscreen opening section, approved baseline hero asset with optical layers and subtle cinematic scale animation.
- Preserve canonical tagline, public positioning and Join/Sign In routes.
- Replace homepage-specific compact feature cards with editorial Manifesto, Realms, Founder and Impact sections.
- Accessible mobile navigation and `prefers-reduced-motion` support; content never depends on JavaScript to appear.
- Remove nonfunctional newsletter form from revised homepage only; existing About/Join remain unchanged.
- Founder profile display uses an **approved-reference crop**. Obtain licensed high-resolution original brand photographs before final visual signoff.

## Engineering scope

**Overwrites:** `src/app/page.tsx` (intentional homepage change only).

**Adds:** `src/components/public/cinematic-home.css`, `src/components/public/CinematicMotion.tsx`, `tests/unit/cinematic-home-revision.test.ts`, this document.

**Does not overwrite:** authentication routes/layout, About/Join, Supabase, `.env.local`, RBAC, existing shared styles, repository configuration.

## Acceptance checkpoints

1. Vitest + TypeScript + ESLint + Next.js production build succeed in local repo.
2. Verify homepage at desktop 1440px, laptop 1366px, tablet 768px and mobile 390px; no cut-off content or horizontal scrolling.
3. Real navigation works: `/`, `/about`, `/#realms`, `/#founder`, `/#impact`, `/join`, `/auth/sign-in`.
4. Verify reduced-motion setting disables movement; keyboard focus is visible.
5. Compare against newly Founder-approved cinematic direction and get visual signoff before pushing to `main`.
6. Confirm images/logos are appropriate; standalone high-resolution licensed originals still needed for final production polish.

## Known limitations

- No video backdrop: video-driven treatment would require an approved licensed source and performance controls. Current hero uses the existing reference-based image plus CSS atmosphere.
- Baseline approved-reference cropped imagery is low-resolution. It is a visual placeholder pending true source originals.
- This package is public-homepage presentation only. It does not validate live Supabase Auth/RLS, the applicant workflow or other 180 conceptual screens/states.
