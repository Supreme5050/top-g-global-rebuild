# TOP G GLOBAL — MASTER COMPLIANCE AUDIT & IMPLEMENTATION REGISTER

**Baseline:** 17 October 2026 · **Version:** 1.0 · **Disposition:** Provisional source-package audit; live source/database verification required.

## Executive finding

The established Next.js/Supabase foundations are **directionally consistent** with the frozen institutional architecture. However, **full institutional and visual compliance is NOT VERIFIED**, and the production-security and applicant-lifecycle gaps listed below must be closed before release. We inspected the delivered Phase 1A–3A ZIPs, the Phase 3A test correction, the authoritative Blueprint/Handoff, the frozen Design System, the Batch 1–7 master archive, and user-provided terminal/SQL screenshots. We did **not** receive a checkout of the latest live GitHub branch or privileged access to the live Supabase database; we make no claim of having inspected either.

## Source-of-truth precedence

1. **Master Organizational & Digital Blueprint v2** and formal Founder decisions for constitutional/institutional policy.
2. **Design System v1** for tokens and components, plus frozen **Batches 1–7** for screen behavior/appearance.
3. **Batch 7 final QA corrected assets** supersede earlier matching designs (not a Batch 8).
4. **Master Development Handoff** for interpretation and continuity, without overruling the Blueprint or approved assets.
5. **This compliance register and the current Git repository** are engineering tracking/evidence, NOT new constitutional authorities. Any conflict must be escalated, not resolved by assumption.

The Handoff's statement that production development had not begun was historically true at its writing; current Phase 1A–3A development has since occurred. Do not mistake the old snapshot for current status.

## Audit coverage

- **40 institutional/compliance requirements** mapped to requirements, package evidence, gaps, and required verification.
- **181 frozen conceptual screens/states** with nested ZIP asset pointers, including combined image `PUBLIC-24/25`.
- **14 actionable findings** (6 P0, 8 P1).
- **28 unresolved Founder/policy decisions** explicitly preserved as unresolved.
- **10 source files** SHA-256 catalogued.
- The independent Design System v1 ZIP is **byte-for-byte identical** to the nested copy inside the frozen UI/UX master archive.

### Frozen inventory by zone

| Zone | Conceptual IDs |
|---|---:|
| ADMIN | 51 |
| AUTH | 6 |
| JOIN | 19 |
| MEMBER | 26 |
| Mobile | 21 |
| Mobile-STATE | 5 |
| PUBLIC | 25 |
| STATE | 22 |
| Tablet | 6 |
| **Total** | **181** |

**Critical supersessions:** `MEMBER-24`, `MOBILE-09`, `MOBILE-10`, `MOBILE-15`, `MOBILE-20` must use their **Batch 7** corrected images. The final screen inventory summary enumerates only four in its closing notes; the Batch 7 release README, manifest and changelog identify all five. There is no additional screen ID for a correction.

## Verified evidence vs unresolved state

### Verified by source-code/package inspection

- Phase 1A: branded domain identifier types and a guard against ordinary use of `G-1`.
- Phase 1B: exact-match role + permission + scope **pure evaluator** and unit tests.
- Phase 2A: publishable-key Supabase health check helper and SQL function source.
- Phase 2B: separate account-holder/applicant/application/member tables, RLS-first migrations, metadata audit table and four SQL audit triggers **in source**.
- Phase 3A: Supabase Auth JSON endpoints, cookie-aware SSR request session, conservative Origin check, applicant/application creation RPC, six self-service RLS policy declarations **in source**, and static source tests. The corrected Phase 3A test uses relative imports.
- All frozen design archive assets index successfully; full per-screen visual implementation is not in the reviewed engineering ZIPs.

### Reported/shown by the user; not independently re-run here

- GitHub `origin/main` is synchronized, with `.env.local` ignored in earlier terminal evidence.
- Supabase health endpoint returned `{"service":"top-g-global","database":"connected","status":"ok"}`.
- The build completed successfully; Vitest results at a previous point showed the earlier 22 tests passing. The latest full test count and live data policy effects should still be captured for this baseline.
- Phase 3A live SQL assertions **previously failed** with `missing enabled auth account-holder trigger`. The user subsequently reported completion; a confirmed `PHASE 3A PASS` output has not been supplied. **Do not infer it passed.**

### Not established by this audit

- Current GitHub repository content equality with the historical ZIP packages.
- Live PostgreSQL RLS enforcement using two distinct ordinary users.
- Actual email verification/password reset/session expiry flows.
- Exact visual reproduction of any of the 181 conceptual screens.
- Database-backed permission grants, member approval/issuance, immutable member/public identity, status history or digital cards.
- Security of third-party dependencies beyond the user's recent `npm audit --omit=dev` showing zero production advisories at that time.

## Priority findings (safety and accuracy)

- **F-01 [P0] No live cross-account RLS assurance:** Test as two separate authenticated users; verify no cross-read, cross-insert, update/delete; require negative API tests.
- **F-02 [P0] Application start is not idempotent:** Decide allowable concurrent applications; implement safe dedup/retry strategy only after policy approval.
- **F-03 [P0] Auth not end-to-end verified:** Perform real signup, verification, login, logout, reset & session-expiry tests.
- **F-04 [P0] Privileged authorization not integrated:** Build trusted grant schema, scoped DB enforcement, denial tests.
- **F-05 [P0] Phase3A live migration verification evidence missing:** Save redacted PHASE 3A PASS result and test signup trigger as normal auth user.
- **F-06 [P0] Frozen UI/UX implementation not verified:** Map every screen to committed route/component and run visual QA.
- **F-07 [P1] Policy-dependent authentication missing:** Obtain policy; implement AUTH-03..06 per Batch3 and Batch7.
- **F-08 [P1] Abuse prevention not implemented:** Rate limiting, monitoring, email deliverability tests before public release.
- **F-09 [P1] Founder ID protected only at code-utility layer:** Approve final ordinary ID format; implement DB constraints and atomic issuer.
- **F-10 [P1] Application status & immutable decision history absent:** Approved lifecycle; status events, reviewers, scope and audit.
- **F-11 [P1] Migration drift/version tracking absent:** Adopt migration tracking; inspect production before applying edits.
- **F-12 [P1] Design QA replacements must supersede five screens:** Enforce Batch7 references for 5 IDs in design tracker.
- **F-13 [P1] Production auth origin strategy not integration-tested:** E2E behind production host; test CSRF and origin matching.
- **F-14 [P1] Source-package review is not a working-tree audit:** Run local verification then inspect tracked Git repository/PR for exact code parity.

## Implementation gates: required before next feature release

**Gate A — Live environment and repository baseline:** obtain a sanitized `git status --short`, `git log -1 --oneline`, `git remote -v`, `git ls-files .env.local` and complete test/build run. Do not print credentials. Confirm Phase 2B migrations are installed and Phase 3A verification is passing. Do not re-run completed migrations.

**Gate B — Security integration:** test signup trigger, authenticated and anonymous access, two independent users' RLS boundaries, CRUD restrictions, and applicant RPC concurrency/retry behavior. Determine the approved duplicate-application policy before changing live data rules. Record the evidence in the register.

**Gate C — UI/UX fidelity:** build foundational tokens from Design System v1, implement Batch 3 Auth+Join UI with the actual assets, and compare screenshots at desktop/mobile breakpoints. Use Batch 7 replacements for all 5 affected screens. Maintain a screen-to-route map and screenshots in reviews.

**Gate D — Git collaboration:** verify checks on a feature branch/PR before merging to protected `main`. Each new ZIP must contain a manifest of added/replaced files and a clear migration/rollback plan. Keep `.env.local` local.

## Do-not-invent list

- Final ordinary Member ID format; `G-1` is reserved.
- Realm progression thresholds, curricula and approvals.
- Membership activation/reaffirmation rules and applicant reapplication policy.
- Governance/council appointments, spiritual office criteria or inferred authority.
- Automatic admin permissions from a Realm, sector, geography, payment or profile string.
- MFA, digital wallet, public-photo visibility or privacy assumptions not formally approved.

## Evidence and maintenance

- `02_INSTITUTIONAL_REQUIREMENTS.csv`: all mapped institutional controls.
- `03_FROZEN_UIUX_SCREEN_REGISTRY.csv`: 181 screen reference paths and QA placeholders.
- `04_AUDIT_FINDINGS_AND_ACTIONS.csv`: 14 prioritized findings.
- `05_REMAINING_FOUNDER_DECISIONS.csv`: 28 explicit unresolved policy topics.
- `06_SOURCE_MANIFEST.csv`: SHA-256 provenance of files used in this source-package audit.
- `TOP_G_GLOBAL_COMPLIANCE_REGISTER.xlsx`: workbook for ongoing review and updates.

Every status transition to **VERIFIED** requires evidence: a test output, screenshot diff, documented DB assertion, reviewed PR, or approved policy decision. Merely having a file or successful compilation is not sufficient.
