# Top G Global — Phase 3C Public Entry Implementation (first frozen pass)

Target: `C:\Users\USER\Desktop\top-g-global-rebuild` on Windows; VS Code integrated **CMD**.

1. Ensure your work is safely committed/synced; run `git status --short` and resolve unexpected edits before extraction.
2. Extract this ZIP at the project **root** using `tar -xf "%USERPROFILE%\Downloads\Top_G_Global_Phase3C_Frozen_Public_Entry.zip" -C "%USERPROFILE%\Desktop\top-g-global-rebuild"`.
3. Run `node scripts\maintenance\fix-auth-layout-date.mjs` once. It edits ONLY the known dynamic copyright year in the existing auth layout, is idempotent, and aborts if code is unexpected.
4. Run `npx vitest run && npx tsc --noEmit && npm run lint && npm run build`.
5. Start on Laptop 2 using `npm run dev -- -p 3001`.
6. Browse: `http://localhost:3001/`, `http://localhost:3001/about`, `http://localhost:3001/join`, then `http://localhost:3001/auth/sign-in`.

Intentional overwrite: **`src/app/page.tsx` only.** This replaces the Phase 0 placeholder homepage. `scripts/maintenance/fix-auth-layout-date.mjs` may also be replaced with the same known idempotent repair script if already installed. All other paths are new additions.

No secrets, database migrations, or auth endpoint replacements. See `docs/compliance/PHASE_3C_PUBLIC_FROZEN_ENTRY_QA.md` for source fidelity and limitations.
