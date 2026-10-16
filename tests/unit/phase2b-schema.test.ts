import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const migration = readFileSync("supabase/migrations/20261014020000_identity_foundations.sql", "utf8");
const audit = readFileSync("supabase/migrations/20261014021000_security_audit.sql", "utf8");

// These are static package safeguards, NOT live PostgreSQL/RLS integration tests.
describe("Phase 2B migration source safeguards", () => {
  it("keeps account holders, applicants, applications and members separate", () => {
    for (const name of ["tgg_account_holders", "tgg_applicants", "tgg_membership_applications", "tgg_members"]) {
      expect(migration).toContain(`CREATE TABLE public.${name}`);
      expect(migration).toContain(`ALTER TABLE public.${name} ENABLE ROW LEVEL SECURITY`);
      expect(migration).toContain(`REVOKE ALL ON TABLE public.${name} FROM PUBLIC, anon, authenticated`);
    }
  });
  it("enforces RLS and restricts exposure of audit metadata", () => {
    expect(audit).toContain("ALTER TABLE public.tgg_audit_events ENABLE ROW LEVEL SECURITY");
    expect(audit).toContain("REVOKE ALL ON TABLE public.tgg_audit_events FROM PUBLIC, anon, authenticated");
    expect(audit.match(/CREATE TRIGGER tgg_/g)).toHaveLength(4);
  });
  it("does not invent public member IDs or an auto approval rule", () => {
    expect(migration).not.toMatch(/public_member_id|automatic_approval|is_admin/i);
  });
});
