import { readFileSync, existsSync } from "node:fs";
import { describe, it, expect } from "vitest";

function file(path: string) { return readFileSync(path, "utf8"); }
describe("Public frozen Batch 1, Batch 2, and responsive entry points", () => {
  it("includes the actual public homepage, About and Join routes", () => {
    for (const path of ["src/app/page.tsx", "src/app/about/page.tsx", "src/app/join/page.tsx"]) expect(existsSync(path)).toBe(true);
  });
  it("preserves the approved institutional identity and no automatic membership", () => {
    expect(file("src/app/page.tsx")).toContain("TRANSFORMING");
    expect(file("src/app/about/page.tsx")).toContain("Christian leadership");
    expect(file("src/app/join/page.tsx")).toContain("does not automatically grant membership");
  });
  it("does not present a fabricated subscription integration", () => {
    expect(file("src/components/public/PublicSiteShell.tsx")).toContain("Newsletter enrollment will be enabled once approved");
    expect(file("src/components/public/PublicSiteShell.tsx")).toMatch(/<button disabled/);
  });
  it("routes Join and Login to real authentication paths", () => {
    expect(file("src/app/join/page.tsx")).toContain('href="/auth/sign-up"');
    expect(file("src/components/public/PublicSiteShell.tsx")).toContain('href="/auth/sign-in"');
  });
  it("ships approved reference-derived photographic assets", () => {
    for (const name of ["home-hero-approved-crop.webp", "founder-approved-crop.webp", "join-collage-approved-crop.webp"]) expect(existsSync(`public/frozen/public-v1/${name}`)).toBe(true);
  });
});
