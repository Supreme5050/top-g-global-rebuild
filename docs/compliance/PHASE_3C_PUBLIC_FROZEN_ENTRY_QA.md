# Top G Global — Phase 3C public entry QA / source mapping

## Scope
- **PUBLIC-01** Homepage: the Batch 1 frozen homepage reference.
- **PUBLIC-02** About Top G Global: the Batch 2 frozen screenshot.
- **JOIN-01** Join introduction: the Batch 1 frozen screenshot.
- **MOBILE-01 / MOBILE-02** Mobile homepage / navigation: the Batch 6 frozen screenshots.
- **Design System v1** black `#050607`, deep charcoal `#0E1114`, gold `#D9A82E`, gold-light `#F4BF38`, warm white `#F8F6F1`. Enterprise spacing/components per the frozen design.

## Intentional boundaries
- Actual React/Next components, semantic labels and accessible links are used. This is **not a screenshot disguised as a webpage**.
- Images are **cropped out of user-supplied approved composite reference images** because isolated originals were not in the frozen archives. These are provisional screenshot-derived image assets, **not** source photography or a replacement for any original brand assets. Before production release, substitute the original approved logo/photography with the same visual composition and verify pixel fidelity.
- The small lockup PNG is the existing reference asset from the Phase 3B package; an isolated original official logo needs asset-level approval before final production.
- The newsletter subscribe control remains disabled; no unapproved consent/data capture or fictitious API calls were added.
- Approved policy pages, program/event/news detail pages, submission workflows, and public verification pages are separate deliverables, not silently improvised here.
- Join routes to `/auth/sign-up`. Account creation is never automatic membership.
- No Supabase schema, RLS, auth endpoints, or `.env.local` files are changed by this package.

## Acceptance check (manual)
1. `npm run dev -- -p 3001`: verify `/`, `/about`, `/join` on desktop and mobile widths (390, 768, 1366).
2. Verify header Join, Login, Home, About buttons and mobile menu, and test `/#realms`, `/#programs` anchors.
3. Click Join → Start Your Application → `/auth/sign-up`.
4. Confirm Next.js server terminal has no date-prerender errors after running the idempotent repair script.
5. Run `npx vitest run && npx tsc --noEmit && npm run lint && npm run build`.
6. Compare visually with PUBLIC-01, PUBLIC-02, JOIN-01, MOBILE-01, MOBILE-02 before approval. Responsive screenshots and image asset review remain pending until observed on the user's actual device.

## Source limitations
The entire Batch 2 public site is *not* implemented by these three routes. Navigation items for other frozen screens currently lead to relevant sections of the homepage or About page to avoid broken URLs, not to fake placeholder pages. Program, event, policy, and news backend integrations still remain to be built.
