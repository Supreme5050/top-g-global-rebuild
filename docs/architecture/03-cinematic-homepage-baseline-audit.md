# Cinematic Homepage — Protected Baseline Audit

Date: 2026-10-30

## Baseline
- Repository: `Supreme5050/top-g-global-rebuild`
- Protected starting commit: `895ae9fe64a478124e590a629dd8acd0cbc45678` on `main`.
- Existing framework: Next.js 16.4.0, React 19.3.0, TypeScript, Tailwind 4 and Supabase.
- `src/app/page.tsx` is currently a platform-foundation placeholder, **not** a finished website.
- Authentication, applications, identity/authorization, Supabase integrations, SQL migrations and tests are present and must remain intact.
- Historical cinematic preview branches exist, but must not be merged into this clean baseline automatically.
- GitHub Actions reported no completed workflow runs; main's runtime/test status is unverified.
- The repository's `public/brand/top-g-lockup-frozen-auth-reference.png` is not yet confirmed to be the exact approved metallic logo.

## Implementation boundary
Only update the public homepage route, new isolated cinematic-home components, their scoped styles, and approved public assets once the visual foundation is accepted. Do not alter the existing authentication, application, authorization or database code to implement a hero.

## Required quality gates
1. Run existing lint, TypeScript, unit tests and production build locally on the preserved baseline, with actual environment configuration where necessary.
2. Obtain or create professionally sculpted, licensed 3D geometry; approve silhouette and materials before morph development.
3. Implement one continuous Three.js/React Three Fiber 3D world, responsive to pointer and camera controls, with real spatial panels.
4. Verify actual GPU/WebGL output in Chrome/Edge: idle motion, deformation, morph stages, camera focus/return, keyboard/touch access, reduced-motion behaviour, and resource cleanup.
5. Capture genuine browser screenshots and interaction recordings before calling the experience ready.

## Constraints
- Preserve the founder-approved official TOP G GLOBAL logo unaltered.
- Do not reuse failed prototype engines or claim a fallback screenshot proves WebGL quality.
- Respect the repository's `AGENTS.md` guidance and frozen design registry.
- No feature code has been introduced as part of this audit.
