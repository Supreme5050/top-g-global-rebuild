import { describe, expect, it } from "vitest";
import { parseEmailOnly, parseSignUpInput } from "../../src/lib/security/sign-up-input";

describe("Phase 3B signup input validation", () => {
  it("accepts a bounded name, email, password", () => {
    expect(parseSignUpInput({ fullName: "  Ada  Okoro ", email: " ada@example.com ", password: "a-long-passphrase" }))
      .toEqual({ fullName: "Ada Okoro", email: "ada@example.com", password: "a-long-passphrase" });
  });
  it("rejects missing names or control characters", () => {
    expect(parseSignUpInput({ email: "ada@example.com", password: "a-long-passphrase" })).toBeNull();
    expect(parseSignUpInput({ fullName: "<script>", email: "ada@example.com", password: "a-long-passphrase" })).toBeNull();
    expect(parseSignUpInput({ fullName: "A\u0000B", email: "ada@example.com", password: "a-long-passphrase" })).toBeNull();
  });
  it("bounds email-only resend inputs", () => {
    expect(parseEmailOnly({ email: " ada@example.com " })).toBe("ada@example.com");
    expect(parseEmailOnly({ email: "invalid" })).toBeNull();
    expect(parseEmailOnly(null)).toBeNull();
  });
});
