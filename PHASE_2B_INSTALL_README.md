# TOP G GLOBAL — PHASE 2B THREE-MODULE BUNDLE

1. Download Top_G_Global_Phase2B_Three_Module_Bundle.zip into Windows Downloads.
2. VS Code integrated CMD, from project root:
   `tar -xf "%USERPROFILE%\Downloads\Top_G_Global_Phase2B_Three_Module_Bundle.zip" -C "%USERPROFILE%\Desktop\top-g-global-rebuild"`
3. Make a safe local environment file WITHOUT overwriting existing .env.local:
   `node scripts\setup\prepare-rebuild-env.mjs`
4. Run all offline validation:
   `npx vitest run && npx tsc --noEmit && npm run lint && npm run build`
5. Read `docs/setup/phase-2b-three-module-foundation.md` BEFORE connecting to the NEW Supabase project or applying SQL.

Do not paste passwords or project secret keys into chat. This ZIP does not execute any migrations automatically.
