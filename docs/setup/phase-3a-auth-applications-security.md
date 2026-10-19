# Top G Global — Phase 3A: Authentication + Application Records + Scoped RLS

## Precondition

Phase 2A health endpoint passed. Phase 2B migrations were executed in the **new rebuild** Supabase database. Confirm the read-only `supabase/verification/phase2b_assertions.sql` was run and returned `PHASE 2B PASS` **before** executing the Phase 3A migration. Phase 2B's verification intentionally expects zero policies; it is *not* appropriate after Phase 3A.

## What is implemented

1. `POST /api/auth/sign-up`, `POST /api/auth/sign-in`, `POST /api/auth/sign-out`, `GET /api/auth/me` using only the existing Supabase project URL and publishable key. Sessions use HTTP cookies; requests verify identity via Supabase `auth.getUser()` rather than trusting unverified cookie contents. Mutation routes require a matching Origin header to reduce CSRF exposure. Credentials are validated without logging. Email verification behavior depends on the Auth settings of the rebuild Supabase project.
2. `POST /api/applications/start` invokes `tgg_begin_membership_application()` as the caller's authenticated user, in a single database transaction. It creates exactly one new applicant UUID and one new application UUID per successful explicit call. Repeated successful calls currently create additional independent application records; **no one-application-only policy is assumed**. No application answers, review status, official submission, approval, or conversion to member is performed.
3. `GET /api/applications/mine` uses RLS to select only the signed-in person's own applicant/application records. No grant is added to `tgg_members` or `tgg_audit_events`. All existing audit triggers remain in force.
4. An Auth trigger inserts an **account holder** record on signup, *not* an applicant or approved member. The application function can also register account holders that existed before the trigger.

## One new SQL migration (apply ONCE)

`supabase/migrations/20261016010000_authenticated_application_foundations.sql`

After executing it, run `supabase/verification/phase3a_assertions.sql`, which checks the signup trigger, six self-scoped policies, RPC grants, and absence of elevated access to member/audit data. It is read-only. SQL Editor running as an administrator is NOT proof of authenticated RLS functioning: proper integration tests with two ordinary accounts will be needed before deployment.

## Safety and unfinished work

- `Account Holder != Applicant != Approved Member`; role/permission/scope and Realm/Sector/Appointment/Geography remain independent.
- This package does not implement a member-ID generator. `G-1` stays reserved to the Founder.
- This package adds only record creation, not a membership application form, status lifecycle, review workflow or official approval. Those require frozen Batch 3 and approved requirements.
- No replacement screens or design assets are created. Frozen Design System v1 and Batches 1–7 remain authoritative.
- Production requires rate limiting, brute-force/abuse protections, email deliverability checks, end-to-end auth and cross-account isolation tests, and a migration-history workflow.
- RLS is the server-enforced access boundary for database reads/writes; no client-provided user ID is accepted by these routes.
- .env.local stays ignored and never goes to GitHub; the other laptop needs its own copy of approved publishable-key settings.
- The old project's database and GitHub repository are not changed by this package.

## Checks after installation

From VS Code CMD at the project root:

```
npm install @supabase/ssr server-only
npx vitest run && npx tsc --noEmit && npm run lint && npm run build
```

After migration, verify the SQL read-only assertion in the Supabase SQL Editor. With the dev server running, `GET http://localhost:3000/api/auth/me` should return `{"authenticated":false}` and HTTP 401 before sign-in. Do NOT paste live cookies, email/password or tokens into ChatGPT.
