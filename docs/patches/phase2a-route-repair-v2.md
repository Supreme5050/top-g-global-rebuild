# Top G Global — Phase 2A Next.js 16 Route Repair v2

## Problem

Next.js 16 with `cacheComponents` enabled rejects these exports inside the Supabase health route:

- `export const dynamic = "force-dynamic";`
- `export const runtime = "nodejs";`

The earlier ZIP replacement did not take effect on the local machine. This repair script edits the route **in place** instead of relying on archive overwrite behavior. It preserves the existing GET handler and makes a backup outside the project in the operating system temporary directory.

## Installation on Windows (VS Code integrated CMD)

From the project root (`C:\Users\USER\Desktop\top-g-global-rebuild`):

```cmd
tar -xf "%USERPROFILE%\Downloads\Top_G_Global_Phase2A_Route_Repair_v2.zip" -C "%USERPROFILE%\Desktop\top-g-global-rebuild"
node scripts\maintenance\fix-next16-supabase-health-route.cjs
npm run build
```

Expected: the script prints PASS and the build no longer reports `dynamic` or `runtime` route segment errors. Once passing, run `npx vitest run && npx tsc --noEmit && npm run lint`.

**Safety:** Only the existing `src/app/api/health/supabase/route.ts` is edited by the script. The ZIP extraction itself only adds new files in `scripts/maintenance` and `docs/patches`. The script refuses to change unfamiliar route configurations.
