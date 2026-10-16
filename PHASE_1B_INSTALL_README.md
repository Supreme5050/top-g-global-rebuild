# Top G Global — Phase 1B Authorization Core

This patch adds production-oriented, fail-closed authorization decision logic and automated tests. **It does not create real sessions, role assignments, Supabase RLS policies or UI screens.**

## Before you extract

- Project folder: `%USERPROFILE%\Desktop\top-g-global-rebuild`
- Use **CMD inside VS Code**.
- No existing application files are overwritten by this patch.
- You should have already installed Phase 1A (the institutional domain types).

## Install and verify

1. Download this ZIP to Windows Downloads.
2. Run in VS Code CMD:

   `tar -xf "%USERPROFILE%\Downloads\Top_G_Global_Phase1B_Authorization_Core.zip" -C "%USERPROFILE%\Desktop\top-g-global-rebuild"`

3. Install the test runner once:

   `npm install --save-dev vitest`

4. Verify all tests and the production build:

   `npx vitest run && npx tsc --noEmit && npm run lint && npm run build`

5. Review before saving a Git checkpoint:

   `git status`

   `git add src/domain/authorization/evaluate.ts tests/unit docs/architecture/02-authorization-evaluator.md PHASE_1B_INSTALL_README.md package.json package-lock.json`

   `git commit -m "feat: add scoped authorization evaluator and regression tests"`

Do not run `git push` (there is no remote configured for the new rebuild yet).

## Blocker for next visual step

Batch 1 and Design System v1 are approved, but the referenced earlier ZIPs are
not currently readable by the build environment. UI reproduction waits for
inspectable frozen source assets; do not invent colors or layouts.
