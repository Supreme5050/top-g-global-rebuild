import { describe, expect, it } from "vitest";
import { assertNotFounderPublicId, isFounderPublicId, RESERVED_FOUNDER_PUBLIC_ID } from "../../src/domain/identity/founder";
import { parseEntityId } from "../../src/domain/identity/ids";

describe("public vs internal identity boundaries", () => {
  it("reserves G-1", () => {
    expect(RESERVED_FOUNDER_PUBLIC_ID).toBe("G-1");
    expect(isFounderPublicId("G-1")).toBe(true);
    expect(() => assertNotFounderPublicId("G-1")).toThrow(/reserved/);
  });

  it("does not generate or assume a format for ordinary public IDs", () => {
    expect(isFounderPublicId("G-2")).toBe(false);
    expect(() => assertNotFounderPublicId("G-2")).not.toThrow();
  });

  it("rejects unstructured internal IDs", () => {
    expect(() => parseEntityId("G-1")).toThrow(TypeError);
    expect(() => parseEntityId("1234")).toThrow(TypeError);
  });

  it("accepts a syntactically valid UUID", () => {
    expect(parseEntityId("00000000-0000-4000-8000-000000000001")).toBe("00000000-0000-4000-8000-000000000001");
  });
});
