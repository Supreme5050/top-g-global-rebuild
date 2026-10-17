# TOP G GLOBAL — COMPLIANCE AUDIT PACKAGE v1.0

**Docs-only, non-destructive.** This package adds documentation and an Excel tracker under `docs/compliance/`. It does not overwrite source code, package dependencies, SQL migrations or `.env.local`.

## Installation in VS Code integrated CMD

1. Download the ZIP to `%USERPROFILE%\Downloads`.
2. Ensure you are at `C:\Users\USER\Desktop\top-g-global-rebuild` (adjust only if your root differs).
3. Run:

    tar -xf "%USERPROFILE%\Downloads\Top_G_Global_Compliance_Audit_v1.zip" -C "%USERPROFILE%\Desktop\top-g-global-rebuild"

4. Open `docs/compliance/01_MASTER_COMPLIANCE_AUDIT_2026-10-17.md` and `docs/compliance/TOP_G_GLOBAL_COMPLIANCE_REGISTER.xlsx`.
5. Check `git status --short` and only commit these documents after review.

## Next required evidence

Capture a redacted PHASE 3A SQL verification success output, run real two-user RLS tests, review current checked-out source vs the audit ZIP source snapshots, and reconcile every frozen UI screen route and screenshot. This is a **preliminary source audit**, not a certification of production readiness.
