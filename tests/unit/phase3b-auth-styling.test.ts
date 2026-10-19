import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { authCss, styles } from "../../src/app/auth/auth.styles";

const root = process.cwd();
const screens = [
  "src/app/auth/sign-in/page.tsx",
  "src/app/auth/sign-up/page.tsx",
  "src/app/auth/verify-email/page.tsx",
  "src/app/auth/account/page.tsx",
] as const;

describe("Phase 3B frozen auth stylesheet fallback", () => {
  it("provides stable styles for every referenced class", () => {
    for (const file of ["src/app/auth/layout.tsx", ...screens]) {
      const content = readFileSync(join(root, file), "utf8");
      for (const [, key] of content.matchAll(/styles\.([A-Za-z][A-Za-z0-9_]*)/g)) {
        expect(Object.hasOwn(styles, key), `${file}: ${key}`).toBe(true);
        expect(authCss).toContain(`.${styles[key as keyof typeof styles]}`);
      }
    }
  });

  it("injects the CSS from the shared auth layout", () => {
    const layout = readFileSync(join(root, "src/app/auth/layout.tsx"), "utf8");
    expect(layout).toContain("<style data-top-g-auth-styles=");
    expect(layout).toContain("{authCss}");
  });

  it("sets the institutional background and scoped form styling", () => {
    expect(authCss).toContain("background: #050607");
    expect(authCss).toContain(".tgg-auth-panel");
    expect(authCss).toContain(".tgg-auth-goldButton");
    expect(authCss).toContain("@media (max-width: 840px)");
    expect(authCss).toContain("@media (max-width: 480px)");
  });

  it("does not rely on the previous CSS-module import", () => {
    for (const file of ["src/app/auth/layout.tsx", ...screens]) {
      expect(readFileSync(join(root, file), "utf8")).not.toContain("auth.module.css");
    }
  });
});
