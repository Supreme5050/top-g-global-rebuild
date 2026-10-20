# TOP G GLOBAL — CINEMATIC HOMEPAGE REVISION v1

Founder-approved premium + cinematic direction, inspired by the two screen recordings and grounded in Top G institutional identity.

## IMPORTANT

- This is a visual revision of the public homepage only.
- **Requires Phase 3C Public Entry assets** previously installed at `public/frozen/public-v1/`.
- It does NOT modify Supabase, auth, membership, database migrations, About, Join, or other public screens.
- The archive intentionally **replaces `src/app/page.tsx`**. Review/save work first.
- Does NOT require new npm packages.
- The reference-derived photo crops are provisional until approved high-resolution originals are available.

## Installation — VS Code terminal set to Windows CMD

1. Stop any running `npm run dev` by pressing Ctrl+C.
2. Navigate to the project root:

   cd /d "%USERPROFILE%\Desktop\top-g-global-rebuild"

3. Review current changes, and do not install over valuable uncommitted edits:

   git status --short

4. From a clean working tree, sync then create a safe feature branch:

   git pull --ff-only origin main
   git switch -c feat/cinematic-homepage

5. Extract the archive from your Downloads folder, INSIDE the project root:

   tar -xf "%USERPROFILE%\Downloads\Top_G_Global_Cinematic_Homepage_Revision_v1.zip" -C "%USERPROFILE%\Desktop\top-g-global-rebuild"

6. Verify:

   npx vitest run && npx tsc --noEmit && npm run lint && npm run build

7. Run locally on this laptop (port 3000 belongs to another project):

   npm run dev -- -p 3001

8. Check these addresses:

   http://localhost:3001/
   http://localhost:3001/#realms
   http://localhost:3001/#founder
   http://localhost:3001/#impact
   http://localhost:3001/join
   http://localhost:3001/auth/sign-in

9. Visually inspect responsive layout and reduced-motion settings; keep the feature branch unmerged until Founder approval.

## Files

Overwrites:
- src/app/page.tsx

Adds:
- src/components/public/cinematic-home.css
- src/components/public/CinematicMotion.tsx
- tests/unit/cinematic-home-revision.test.ts
- docs/design/TOP_G_GLOBAL_CINEMATIC_HOMEPAGE_REVISION_v1.md
- 00_READ_ME_FIRST.md

## Development control

- Institutional architecture remains governed by Blueprint v2.
- No invented ordinary member-ID scheme, privileges, approval rules or public stats.
- The home page is enhanced; other frozen screens are unchanged.
- Static visual preview was inspected at 1440, 1366, 768 and 390 CSS pixels, but full Next.js integration can only be certified by the user's local build.
