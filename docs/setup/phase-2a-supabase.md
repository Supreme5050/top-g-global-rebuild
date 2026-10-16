# Phase 2A — Supabase connection & database readiness

This patch provides a **real database RPC connectivity check** without altering
application pages, identity rules, membership workflows, or the frozen UI/UX.

## Important security boundaries

- Use a NEW Supabase project for the fresh rebuild. Do not modify the previous platform database by mistake.
- Use only the publishable key (or old anon key), **never** the service-role or `sb_secret_*` key.
- Secrets belong in `.env.local` (gitignored), never ZIPs, screenshots, chat messages, Git or public pages.
- A healthy response proves that a database RPC executes. It does NOT verify RLS,
  authentication, members, governance rules, migrations for other tables or production readiness.

## Installation

1. Extract the ZIP at the root of `Desktop\\top-g-global-rebuild` using CMD.
2. Run `npm install @supabase/supabase-js` from the project root.
3. Run `npx vitest run && npx tsc --noEmit && npm run lint && npm run build`.
4. Without environment variables, the new endpoint returns `503 NOT_CONFIGURED`.
   This is expected and fails closed.

## Connect a NEW Supabase project

1. Create a separate project in the Supabase dashboard.
2. In the new project's SQL Editor, review and execute:
   `supabase/migrations/20261014010000_database_healthcheck.sql`
3. In the local project root, create or update `.env.local` with the real values
   corresponding to `.env.supabase.example`.
4. Stop and restart `npm run dev` after editing `.env.local`.
5. Visit `http://localhost:3000/api/health/supabase` and expect HTTP 200:
   `{"service":"top-g-global","database":"connected","status":"ok"}`.
6. If database setup is absent or unreachable, expect HTTP 503 with a generic error.

## Next step

Ground the actual table schemas, foreign keys, data life-cycle, RLS policies and
internal audit log in the approved Blueprint and frozen handoff. No membership
approval rules or ordinary public-ID format may be invented from this patch.
