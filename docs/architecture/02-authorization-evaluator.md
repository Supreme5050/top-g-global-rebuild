# Phase 1B — Role / Permission / Scope Evaluator

Status: **Pure TypeScript policy evaluator + unit tests completed**; NOT a live authorization system.

## Scope

This package introduces `src/domain/authorization/evaluate.ts`, an exact-match,
fail-closed evaluator. It checks that a principal is present, holds the required
access role, and has a matching grant for *that same role*, permission and scope.

- No authenticated principal -> `UNAUTHENTICATED`.
- Missing role, missing grant, incorrect permission, or incorrect scope -> `DENIED`.
- Exact-match role + permission + scope -> `GRANTED`.

It also adds regression tests for the Founder `G-1` reservation and UUID syntax.

## Important boundaries

- This is **not** Supabase authentication, server authorization, or Row Level Security (RLS).
- The evaluator's input is **trusted server-side data only**. Calling it on the client or
  feeding it user-supplied roles/grants creates no security boundary.
- `AccessRole` is not an operational role or governance appointment.
- Does not implement geographic hierarchy, role inheritance, public-ID issuance, approvals,
  membership statuses, governance powers, or unapproved institutional policy.
- At future integration points, data must be loaded from the authoritative database, with
  RLS as independent defense-in-depth, and tested with real security boundaries.
- There are no new UI designs or changes to the frozen visual system.

## Test commands

1. `npm install --save-dev vitest` (first-time test-runner installation).
2. `npx vitest run`
3. `npx tsc --noEmit && npm run lint && npm run build`

No existing Next.js page, route, `.env.local`, package file, or Git remote is overwritten.
