# Top G Global — Phase 3B Auth visual repair (combined)

## Purpose

Restores the approved Batch 3 authentication layout across **AUTH-01 Sign In**, **AUTH-02 Create Account** and **AUTH-03 Verify Email**, plus the temporary `/auth/account` page. The earlier Phase 3B implementation used `auth.module.css`, but the submitted browser screenshots show *all* pages appearing as unstyled HTML. This targeted patch replaces CSS-module class-name coupling with deterministic class strings and renders the shared CSS from the authentication layout itself. It preserves the prior form logic and does not edit the Supabase schema, API routes, `.env.local`, `src/app/layout.tsx` or the rest of the UI.

## Replaced files

- `src/app/auth/layout.tsx`
- `src/app/auth/sign-in/page.tsx`
- `src/app/auth/sign-up/page.tsx`
- `src/app/auth/verify-email/page.tsx`
- `src/app/auth/account/page.tsx`

## Added files

- `src/app/auth/auth.styles.ts` — shared scoped styles and stable class strings
- `tests/unit/phase3b-auth-styling.test.ts` — four regression checks

The old `src/app/auth/auth.module.css` remains in place but is not imported; retain it for comparison until review is complete.

## Install — Windows CMD integrated in VS Code

1. Stop `npm run dev` using **Ctrl + C**.
2. Confirm you're in `%USERPROFILE%\Desktop\top-g-global-rebuild`:
   `cd /d "%USERPROFILE%\Desktop\top-g-global-rebuild"`
3. Before extraction, run `git status --short`. If you have uncommitted personal edits in the five replaced files, back them up first.
4. Download this zip to Downloads, then:
   `tar -xf "%USERPROFILE%\Downloads\Top_G_Global_Phase3B_All_Auth_Styles_Fix.zip" -C "%USERPROFILE%\Desktop\top-g-global-rebuild"`
5. Verify the new source exists:
   `dir src\app\auth\auth.styles.ts`
6. Run `npx vitest run && npx tsc --noEmit && npm run lint && npm run build`.
7. Start `npm run dev`, visit `/auth/sign-in`, `/auth/sign-up`, and `/auth/verify-email`, and press **Ctrl + Shift + R** on each page.
8. Expected: near-black page background, left institutional identity, right warm-light card, gold action buttons, correctly spaced fields. At small widths, stacked responsive layout. The browser screenshots must be reviewed against frozen AUTH-01/02/03.

### If you still see a white page

Open the **View Page Source** for `/auth/sign-in` and search for `data-top-g-auth-styles`. If it is missing, the new `auth/layout.tsx` did not load. Send the terminal and page-source details; do not keep extracting patches. Check that you are running `npm run dev` from the project folder.

### Important limits

- This patch fixes CSS delivery; it does **not** certify pixel-perfect fidelity or complete production auth security.
- The existing temporary account holder page is not an approved member portal.
- Password recovery, legal privacy/terms, full session QA and cross-account RLS remain tracked findings.
- Branding asset is the existing frozen reference crop, not a replacement official production logo.
- This package has no SQL or dependency changes.
