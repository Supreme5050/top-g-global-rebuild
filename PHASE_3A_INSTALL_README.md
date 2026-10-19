# TOP G GLOBAL — PHASE 3A, THREE-MODULE IMPLEMENTATION

This is an additive development package for the existing fresh rebuild:
`C:\Users\USER\Desktop\top-g-global-rebuild`

## Modules
1. Supabase Auth routes: sign-up, sign-in, sign-out, verified session lookup.
2. Applicant/application record creation and self-service reading.
3. Auth account-holder trigger, restrictive user-owned RLS policies, auditing retained.

NO member approval, public/member number issuance, application status machine, privileged roles, or frozen UI designs are introduced. This is backend-only.

## Install from VS Code CMD (current laptop)

Before extracting: `git status --short` should show no unexpected changes. Do NOT run `git pull` while you have uncommitted changes.

1. Place ZIP in `%USERPROFILE%\Downloads`.
2. Extract it:
   `tar -xf "%USERPROFILE%\Downloads\Top_G_Global_Phase3A_Auth_Applications_Security.zip" -C "%USERPROFILE%\Desktop\top-g-global-rebuild"`
3. Install the *two* needed packages:
   `npm install @supabase/ssr server-only`
4. Run the combined verification:
   `npx vitest run && npx tsc --noEmit && npm run lint && npm run build`
5. Read `docs/setup/phase-3a-auth-applications-security.md` before any SQL execution.
6. Confirm Phase 2B verification passed **before** Phase 3A migration. Supabase SQL Editor must target the rebuild project, NOT the old project.
7. Apply `supabase/migrations/20261016010000_authenticated_application_foundations.sql` **ONCE** in Supabase SQL Editor.
8. Run `supabase/verification/phase3a_assertions.sql` and confirm the PASS NOTICE.
9. After completion, commit/push only after checking staged file names and secrets:
   `git status --short`
   `git check-ignore -v .env.local`
   `git add .`
   `git --no-pager diff --cached --name-only`
   `git commit -m "feat: add Supabase authentication and scoped application foundations"`
   `git push origin main`

## Testing endpoints
- `GET /api/auth/me` returns 401 when no authenticated session exists.
- `POST /api/auth/sign-up` accepts `{ "email": "...", "password": "..." }` from SAME ORIGIN only.
- `POST /api/auth/sign-in` issues cookies if Supabase accepts credentials.
- `POST /api/auth/sign-out` clears local Supabase session cookies.
- `POST /api/applications/start` requires a verified signed-in user. It atomically creates an applicant and application record, **not a submission or a member**.
- `GET /api/applications/mine` lists just the caller's applicant/application records.

These are backend endpoints; no replacement UX is designed. Rate-limiting, CAPTCHA, session confirmation screens, application fields and lifecycle remain production follow-up tasks.

Never share `.env.local`, passwords, cookie values or private Supabase keys. Never run this migration against the old project. Since the repository is synchronized across two laptops, `git push` when finished and `git pull --ff-only origin main` before resuming on the other laptop.
