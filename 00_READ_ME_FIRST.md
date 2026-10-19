# Top G Global — Phase 3B Part 1

One new ZIP containing frozen AUTH-01, AUTH-02, AUTH-03 UI implementations, email callback/resend and account-holder post-login page. The **only overwritten file** is `src/app/api/auth/sign-up/route.ts` (to preserve the form's full-name field). No SQL migrations, previous designs, membership approvals or member IDs are changed.

**VS Code CMD extraction:**

```
cd /d "%USERPROFILE%\Desktop\top-g-global-rebuild"
tar -xf "%USERPROFILE%\Downloads\Top_G_Global_Phase3B_Frozen_Auth_Starter.zip" -C "%USERPROFILE%\Desktop\top-g-global-rebuild"
npx vitest run && npx tsc --noEmit && npm run lint && npm run build
```

**Before testing email verification:** Set Supabase (new rebuild project) Authentication > URL Configuration: Site URL `http://localhost:3000`; allow Redirect URL `http://localhost:3000/auth/callback`.

Full instructions, limitations, and Git commands: `docs/setup/PHASE_3B_AUTH_UI_INSTALL.md`.
