# CINEMATIC HOMEPAGE V2 — ASSET & ACCEPTANCE CHECKLIST

## Source assets

- [ ] Official logo available at sufficient resolution
- [ ] Original/licensed 8–14-second cinematic hero loop, H.264 + WebM
- [ ] Matching responsive hero poster and mobile alternative
- [ ] Approved high-resolution Founder portrait or typography-led placeholder
- [ ] Authentic, cleared formation/leadership, innovation/enterprise and service/impact visual material
- [ ] Approved final public copy and CTA destinations
- [ ] Font licensing and self-host/next-font configuration resolved

## Desktop + mobile visual

- [ ] No skyline figure, no blurry Founder portrait, no stock collage
- [ ] 1440x900 — composition stable, text proportionate
- [ ] 1366x768 — visible hero CTA and balanced type
- [ ] 1024x768 — nav and scene transitions usable
- [ ] 768x1024 — tablet layout verified
- [ ] 390x844 — no horizontal overflow, readable text
- [ ] 320x568 — small-screen fallback verified

## Motion + accessibility

- [ ] Headline plays line-masked staggered entrance
- [ ] Scrolled editorial text reveals without disappearing content
- [ ] Realms progression interactive and keyboard accessible
- [ ] Impact scene contains meaningful transition, not fake metrics
- [ ] Reduced motion shows all content statically
- [ ] Ambient video can pause, and fails back to image
- [ ] No autoplay sound / scroll locking / severe flashing
- [ ] Contrast, focus, targets, alt text and headings verified

## Engineering + Git

- [ ] No API, RLS, Supabase, membership or governance regressions
- [ ] `npx vitest run` passes
- [ ] `npx tsc --noEmit` passes
- [ ] `npm run lint` passes
- [ ] `npm run build` passes
- [ ] Real browser tests and console checks pass on `localhost:3001`
- [ ] Hero poster LCP and video transfer measured
- [ ] Failing links and fabricated newsletter/stat elements removed
- [ ] Founder reviews both desktop and mobile video demonstration
- [ ] Change control document updated with approval
- [ ] Approved feature branch merged and pushed; second laptop pull verified
