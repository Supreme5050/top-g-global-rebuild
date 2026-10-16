# Top G Global — Phase 1A Institutional Core

This package adds type-safe domain separation and documentation; it does NOT overwrite existing pages, metadata, APIs, or your git configuration.

## Installation (VS Code integrated CMD)

Expected root: `%USERPROFILE%\Desktop\top-g-global-rebuild`

1. Ensure `Top_G_Global_Phase1A_Institutional_Core.zip` is in your Windows Downloads folder.
2. In CMD, run:

   `tar -tf "%USERPROFILE%\Downloads\Top_G_Global_Phase1A_Institutional_Core.zip"`

3. Extract:

   `tar -xf "%USERPROFILE%\Downloads\Top_G_Global_Phase1A_Institutional_Core.zip" -C "%USERPROFILE%\Desktop\top-g-global-rebuild"`

4. From the project root, run:

   `npx tsc --noEmit && npm run lint && npm run build`

5. Run `git status` to review the new untracked files before committing.

## Boundaries

- Does not modify existing `src/app` pages.
- Does not add database tables or migrations.
- Does not issue member numbers or administer permissions.
- Does not pretend to implement the frozen UI/UX without its original design sources.
