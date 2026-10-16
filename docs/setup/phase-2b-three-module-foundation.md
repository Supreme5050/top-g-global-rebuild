# Top G Global — Phase 2B, 3-module bundle

Applies ONLY to the fresh `top-g-global-rebuild` workspace. Keeps the previous project, GitHub repository and Supabase project untouched.

## 1. Connection setup

- `node scripts/setup/prepare-rebuild-env.mjs` creates `.env.local` from `.env.supabase.rebuild.example` **only if it does not already exist**. It never overwrites existing credentials.
- In VS Code, replace the placeholders in `.env.local` with the **NEW** Supabase project's Project URL and publishable key from Supabase Dashboard → Project Settings → API Keys (UI labeling may differ).
- No service role or `sb_secret_*` key in browser config or chat messages.
- `node scripts/setup/check-rebuild-env.mjs` checks local values without printing them.
- Restart `npm run dev` and visit `/api/health/supabase` after the healthcheck migration is applied. HTTP 200 only confirms that the RPC executes.

## 2. Institutional identity foundations

`20261014020000_identity_foundations.sql` establishes four separate UUID-keyed entities: **account holder**, **applicant**, **membership application**, **member**. References go to `auth.users` through account holder. RLS enabled and public/client grants revoked **before** the migration commits.

Intentionally UNDECIDED: application status workflow, approval powers, public member ID format, member status and official organization/geography/Realm structures. No `G-1` is issued and no admin access is granted by default. TypeScript model definitions are in `src/lib/supabase/rebuild-database.types.ts`.

## 3. Security + audit foundation

`20261014021000_security_audit.sql` creates a restricted audit event table and four DML audit triggers with locked search path. Only table name, row UUID, operation, actor UUID (nullable for administrative database operations), and timestamp are retained—**not full PII row snapshots**.

These tables intentionally have **no anon/authenticated RLS policies**. They cannot yet be used for end-user registration or member reads/writes. Access will be implemented after the approved role/permission/scope policy is mapped, using a trusted server and separate RLS migrations.

## Local installation (VS Code CMD)

From `C:\Users\USER\Desktop\top-g-global-rebuild`:

1. `tar -xf "%USERPROFILE%\Downloads\Top_G_Global_Phase2B_Three_Module_Bundle.zip" -C "%USERPROFILE%\Desktop\top-g-global-rebuild"`
2. `node scripts\setup\prepare-rebuild-env.mjs`
3. `npx vitest run && npx tsc --noEmit && npm run lint && npm run build`

Stop here until the NEW Supabase project is created and project URL/publishable key are entered into `.env.local`.

## Apply migrations safely — AFTER confirming NEW Supabase target

Migration files to apply IN THIS EXACT ORDER to the NEW Supabase project:

1. `supabase/migrations/20261014010000_database_healthcheck.sql` (from Phase 2A)
2. `supabase/migrations/20261014020000_identity_foundations.sql`
3. `supabase/migrations/20261014021000_security_audit.sql`

You may apply using the Supabase SQL Editor for the NEW project, or link a Supabase CLI to that *verified new project*. **Never execute against the old production database**. Each file is a transaction; review before running. Do not run a migration a second time in SQL Editor after it succeeds. For production use, migration history must be managed with the CLI or other migration framework.

After all migrations, run `supabase/verification/phase2b_assertions.sql` in the NEW project's SQL Editor. It is read-only and will raise an error if expected tables, RLS or triggers are absent. It intentionally verifies DENY-BY-DEFAULT, not complete application authorization.

## Version + verification transparency

- 22 earlier Vitest tests were reported passing by the user. The bundled static SQL source tests add 3 tests, but must be confirmed on the user's actual project.
- No live Supabase database was available for execution during package creation. SQL has NOT been verified against a real Supabase instance.
- Do not interpret `npm run build` as evidence of a live database connection or operational RLS policies.
- Neither the previous existing source files nor `.env.local`, Git configuration or Next.js routes are replaced by this package.
