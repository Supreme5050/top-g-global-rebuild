# Top G Global — Next.js 16 authentication layout date repair

## Reason
With `cacheComponents` enabled, accessing `new Date()` during server prerender in `src/app/auth/layout.tsx` triggers the Next.js `blocking-prerender-current-time` error.

## Scope
The included ESM maintenance script replaces **only** the known copyright-year expression with static `2026`, the approved project's current branding year. No authentication, database, design-token, or homepage files are replaced. The script is idempotent and refuses unexpected source text.

## VS Code CMD
Stop the dev server with Ctrl+C, then run from the project root:

```cmd
node scripts\maintenance\fix-auth-layout-date.mjs
npx vitest run && npx tsc --noEmit && npm run lint && npm run build
npm run dev -- -p 3001
```

Open `http://localhost:3001/auth/sign-in` and `http://localhost:3001/auth/sign-up`.

The homepage at `/` is still a Phase 0 placeholder; the frozen Batch 2 public homepage remains unimplemented. This repair intentionally does not replace it.
