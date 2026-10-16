import { describe, expect, it } from "vitest";
import { readSupabaseHealthConfig } from "../../src/lib/supabase/config";

const valid = {
  SUPABASE_URL: "https://top-g-demo.supabase.co",
  SUPABASE_PUBLISHABLE_KEY: "sb_publishable_example_key",
};

describe("Supabase health configuration", () => {
  it("requires a URL and publishable key", () => {
    expect(readSupabaseHealthConfig({})).toEqual({ ok: false, reason: "NOT_CONFIGURED" });
    expect(readSupabaseHealthConfig({ SUPABASE_URL: valid.SUPABASE_URL })).toEqual({ ok: false, reason: "NOT_CONFIGURED" });
  });

  it("accepts a valid hosted Supabase URL and public key", () => {
    expect(readSupabaseHealthConfig(valid)).toEqual({
      ok: true,
      config: { url: valid.SUPABASE_URL, key: valid.SUPABASE_PUBLISHABLE_KEY },
    });
  });

  it("supports a legacy anon key without requiring a service-role secret", () => {
    expect(readSupabaseHealthConfig({
      SUPABASE_URL: valid.SUPABASE_URL,
      SUPABASE_ANON_KEY: "legacy-anon-key",
    }).ok).toBe(true);
  });

  it("denies insecure remote endpoints", () => {
    expect(readSupabaseHealthConfig({ ...valid, SUPABASE_URL: "http://example.com" }).ok).toBe(false);
  });

  it("permits local Supabase for developer tests", () => {
    expect(readSupabaseHealthConfig({ ...valid, SUPABASE_URL: "http://127.0.0.1:54321" }).ok).toBe(true);
  });

  it("denies embedded credentials or query parameters", () => {
    expect(readSupabaseHealthConfig({ ...valid, SUPABASE_URL: "https://user:pass@example.com" }).ok).toBe(false);
    expect(readSupabaseHealthConfig({ ...valid, SUPABASE_URL: "https://example.com/?key=x" }).ok).toBe(false);
  });

  it("denies modern elevated secret keys", () => {
    expect(readSupabaseHealthConfig({ ...valid, SUPABASE_PUBLISHABLE_KEY: "sb_secret_do-not-use" }).ok).toBe(false);
  });
});
