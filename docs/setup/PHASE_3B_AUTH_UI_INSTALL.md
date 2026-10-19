# Top G Global — Phase 3B/Part 1: Frozen Auth UI and working account flows

## Status

First implementation of **AUTH-01**, **AUTH-02**, and **AUTH-03**, based on the actual frozen Batch 3 PNG files, using an account-holder-only post-login page. **Visual QA is outstanding**; this release is not a declaration of frozen UI/UX completion or of production security compliance.

No new Supabase SQL migration is included. Do not re-run previous migrations. **G-1** and all ordinary Member IDs are unchanged. An authenticated account is not an approved member.

## Source-of-truth mapping

| Frozen reference | Application path | Implementation |
| --- | --- | --- |
| Batch3 `AUTH-01_Login.png` | `/auth/sign-in` | Sign-in form calls existing `/api/auth/sign-in` |
| Batch3 `AUTH-02_Create_Account.png` | `/auth/sign-up` | Account form submits name, email, password to amended `/api/auth/sign-up` |
| Batch3 `AUTH-03_Verify_Email.png` | `/auth/verify-email` | Confirmation guidance, resend request, continue session check |
| Supporting infrastructure | `/auth/callback` | PKCE email confirmation code exchange; cookies scoped via Supabase SSR |
| Temporary **not frozen** | `/auth/account` | Signed-in account-holder diagnostic (NOT a member portal) |

The cropped logo image in `public/brand/` is taken directly from the approved `AUTH-01_Login.png` reference, **not an independently obtained official production logo**. Replace with the original production logo asset before brand sign-off. No synthesized official logo is used.

## Deployment dependencies and Supabase dashboard configuration

- Requires previously working Phase 3A auth API, Phase 3A SQL, `@supabase/ssr`, `server-only` and environment configuration. Previous cookie helper is used unchanged.
- In the **new rebuild Supabase project only**, set Authentication > URL Configuration > Site URL to `http://localhost:3000` for local testing, and add `http://localhost:3000/auth/callback` under Redirect URLs. For production replace/add the actual HTTPS domain callback, do not rely on localhost.
- Existing Supabase email-confirmation settings control whether a verification email is required; never treat new accounts as approved members.
- Before public release, formal **Terms of Use**, **Privacy Notice**, password recovery (`AUTH-04/05`), account abuse/rate limiting, consent handling and end-to-end tests remain required.
- The signup screen visually follows the frozen checkbox, but it is a UI acknowledgement; this iteration does NOT store a legal-policy version/consent proof, and must NOT be presented as sufficient for public launch.
- The application start function is deliberately NOT called by these UI screens, pending the approved duplicate/retry policy.

## Files

**Added:** `src/app/auth/layout.tsx`, `src/app/auth/auth.module.css`, `src/app/auth/sign-in/page.tsx`, `src/app/auth/sign-up/page.tsx`, `src/app/auth/verify-email/page.tsx`, `src/app/auth/account/page.tsx`, `src/app/auth/callback/route.ts`, `src/app/api/auth/resend-verification/route.ts`, `src/lib/security/sign-up-input.ts`, `tests/unit/phase3b-sign-up.test.ts`, `public/brand/top-g-lockup-frozen-auth-reference.png`, this document.

**Replaced (1):** `src/app/api/auth/sign-up/route.ts` — previously dropped the frozen full-name input. Now validates/stores it in **untrusted** Supabase Auth user metadata and sets the confirmation redirect. It does not grant roles, membership or member IDs.

**Database operations:** none. **Dependencies:** none added. **Environment variables:** none added.

## Installation — VS Code CMD

1. Confirm the root is `%USERPROFILE%\Desktop\top-g-global-rebuild` and review `git status --short`. Commit or stash unexpected local changes first.
2. Download `Top_G_Global_Phase3B_Frozen_Auth_Starter.zip` into Downloads.
3. Extract: `tar -xf "%USERPROFILE%\Downloads\Top_G_Global_Phase3B_Frozen_Auth_Starter.zip" -C "%USERPROFILE%\Desktop\top-g-global-rebuild"`
4. Run: `npx vitest run && npx tsc --noEmit && npm run lint && npm run build`
5. Run: `npm run dev`; open `http://localhost:3000/auth/sign-in` and `/auth/sign-up`.
6. Verify signup using a **new dedicated test email** and check the callback URL configuration. Never send passwords/session cookies.
7. Review `git --no-pager diff -- src/app/api/auth/sign-up/route.ts` before committing.
8. `git add src/app/auth src/app/api/auth/sign-up/route.ts src/app/api/auth/resend-verification/route.ts src/lib/security/sign-up-input.ts tests/unit/phase3b-sign-up.test.ts public/brand/top-g-lockup-frozen-auth-reference.png docs/setup/PHASE_3B_AUTH_UI_INSTALL.md`
9. Review staged filenames and secret exclusions, then `git commit -m "feat: implement frozen Batch 3 account entry screens"` and `git push origin main`.

## Important verification gates

- Do not claim full AUTH-01/02/03 pixel fidelity until screenshots are compared at desktop/mobile sizes.
- Do not claim production readiness: two-user RLS tests, real auth lifecycle, token safety, email templates, rate limits and approved legal/policy copy remain open from the compliance register.
- If compilation fails, send the full terminal error; do not extract older ZIPs over this implementation.
- Rollback source changes using Git after confirming your current changes. If there are uncommitted edits, copy them to a safe location first; do **not** run `git reset --hard`.
