# Top G Global — Institutional core contracts

Status: **implemented as typed foundations; NOT a completed database/authorization system**.

## Frozen institutional distinctions

- Account Holder ≠ Applicant ≠ Approved Member.
- Realm ≠ Sector ≠ Department ≠ Operational Role ≠ Governance Appointment ≠ Geography ≠ Membership Status.
- Operational Roles and Governance Appointments are not administrative Access Roles.
- Administrator authority must be evaluated through role, permission **and** scope, not an `isAdmin` Boolean.
- Internal immutable identifiers are UUIDs; public member IDs are a separate namespace.
- Public identifier `G-1` is reserved for the Founder.
- The ordinary member public-ID format remains unresolved; no generator is implemented.

## What this package actually does

1. Defines TypeScript-branded IDs so different domains cannot be mixed accidentally.
2. Validates the syntax of internal UUID strings at an application boundary.
3. Exposes a Founder-ID reservation guard for **future** issuance services.
4. Includes compile-time regression checks (`tests/types/institutional-separation.ts`).

## What it intentionally does NOT do

- Define the membership approval workflow, application statuses, Seven Realms data, geography hierarchy or governance rules.
- Issue public IDs or assert ownership of G-1 based only on a user-supplied value.
- Establish database tables, migrations, Supabase RLS policies or role assignments.
- Implement the frozen UI/UX; the source artwork/specifications must be inspected first.

These outstanding items must follow Blueprint v2 and frozen Design System v1/Batches 1–7. None may be inferred from these TypeScript contracts alone.
