# Top G Global — Phase 2A Secure Supabase Database Readiness

**Install using VS Code's integrated Windows CMD terminal**.

1. Download `Top_G_Global_Phase2A_Supabase_Connection.zip` to Windows Downloads.
2. Extract without touching your existing homepage, layout, auth domain or Git files:

   `tar -xf "%USERPROFILE%\Downloads\Top_G_Global_Phase2A_Supabase_Connection.zip" -C "%USERPROFILE%\Desktop\top-g-global-rebuild"`

3. Install the normal (public-key client) Supabase SDK:

   `npm install @supabase/supabase-js`

4. Verify all prior and new tests, TypeScript, lint and build:

   `npx vitest run && npx tsc --noEmit && npm run lint && npm run build`

5. Later, configure a **new** Supabase project following `docs/setup/phase-2a-supabase.md`.

This package does NOT need secret keys to build. If not yet configured,
`/api/health/supabase` should intentionally return HTTP 503 `NOT_CONFIGURED`.

No previously existing application source paths or old Supabase data are overwritten.
