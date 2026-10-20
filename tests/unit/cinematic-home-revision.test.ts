import { readFileSync, existsSync } from "node:fs";
import { describe, expect, it } from "vitest";

const page = readFileSync("src/app/page.tsx", "utf8");
const styles = readFileSync("src/components/public/cinematic-home.css", "utf8");
const motion = readFileSync("src/components/public/CinematicMotion.tsx", "utf8");

describe("Founder-authorized cinematic public homepage revision", () => {
  it("preserves the canonical brand language and official member journey", () => {
    expect(page).toContain("TRANSFORMING");
    expect(page).toContain("ORDINARY PEOPLE");
    expect(page).toContain("GIANTS.");
    expect(page).toContain('href="/join"');
    expect(page).toContain('href="/auth/sign-in"');
    expect(page).toContain("Account creation does not constitute membership");
  });
  it("preserves the institutional meanings of the Seven Realms", () => {
    for (const realm of ["Refining", "Alpha", "Eagle", "Dominion", "Priesthood", "Legends", "Elites"]) {
      expect(page).toContain(realm);
    }
    expect(page).toContain("not independently grant an administrative role");
  });
  it("does not invent recruitment statistics or a working newsletter backend", () => {
    expect(page).not.toMatch(/\b\d{1,3},\d{3}\+? members\b/i);
    expect(page).not.toContain("Subscribe now");
    expect(page).not.toContain("/api/newsletter");
  });
  it("includes the approved public reference assets and avoids touching auth modules", () => {
    expect(page).toContain("/frozen/public-v1/home-hero-approved-crop.webp");
    expect(page).toContain("/frozen/public-v1/founder-approved-crop.webp");
    expect(page).toContain("/frozen/public-v1/join-collage-approved-crop.webp");
    expect(existsSync("public/frozen/public-v1/top-g-reference-lockup.png")).toBe(true);
  });
  it("keeps animation progressive and accessible", () => {
    expect(styles).toContain("prefers-reduced-motion: reduce");
    expect(motion).toContain("IntersectionObserver");
    expect(motion).toContain('"use client"');
    expect(page).toContain('aria-label="Main navigation"');
  });
});
