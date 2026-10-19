import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { isSameOriginMutation } from "../../src/lib/security/request-origin";
import { parseCredentials } from "../../src/lib/security/auth-input";

const migration = readFileSync("supabase/migrations/20261016010000_authenticated_application_foundations.sql", "utf8");

describe("Phase 3A request validation", () => {
  it("requires an exact same-origin mutation", () => {
    expect(isSameOriginMutation("https://example.com", "https://example.com")).toBe(true);
    expect(isSameOriginMutation(null, "https://example.com")).toBe(false);
    expect(isSameOriginMutation("https://example.com.evil.invalid", "https://example.com")).toBe(false);
    expect(isSameOriginMutation("http://example.com", "https://example.com")).toBe(false);
    expect(isSameOriginMutation("not-a-url", "https://example.com")).toBe(false);
  });
  it("validates credentials without logging passwords", () => {
    expect(parseCredentials({ email: " user@example.com ", password: "12345678" }))
      .toEqual({ email: "user@example.com", password: "12345678" });
    expect(parseCredentials({ email: "user@example.com", password: "bad" })).toBeNull();
    expect(parseCredentials({ email: "not an email", password: "12345678" })).toBeNull();
    expect(parseCredentials(null)).toBeNull();
    expect(parseCredentials(["user@example.com", "12345678"])).toBeNull();
  });
});

describe("Phase 3A SQL source constraints (NOT live RLS tests)", () => {
  it("creates only an account holder during auth signup", () => {
    expect(migration).toContain("AFTER INSERT ON auth.users");
    expect(migration).toContain("INSERT INTO public.tgg_account_holders");
    expect(migration).not.toMatch(/INSERT INTO public\.tgg_members\s*\(/);
  });
  it("creates applicant and application inside one invoker-rights transaction", () => {
    expect(migration).toContain("SECURITY INVOKER");
    expect(migration).toContain("INSERT INTO public.tgg_applicants");
    expect(migration).toContain("INSERT INTO public.tgg_membership_applications");
    expect(migration).toContain("GRANT EXECUTE ON FUNCTION public.tgg_begin_membership_application() TO authenticated");
  });
  it("preserves scoped access and excludes member and audit grants", () => {
    expect(migration).toContain("FOR SELECT TO authenticated USING");
    expect(migration).toContain("WITH CHECK (account_holder_id = (SELECT auth.uid()))");
    expect(migration).not.toMatch(/GRANT .*ON TABLE public\.tgg_members\s/);
    expect(migration).not.toMatch(/GRANT .*ON TABLE public\.tgg_audit_events\s/);
    expect(migration).not.toMatch(/public_member_id|automatic_approval|is_admin/i);
  });
});
