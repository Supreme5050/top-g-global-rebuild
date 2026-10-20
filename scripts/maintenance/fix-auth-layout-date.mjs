import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const file = join(process.cwd(), "src", "app", "auth", "layout.tsx");
const before = "© {new Date().getFullYear()} Top G Global. All rights reserved.";
const after = "© 2026 Top G Global. All rights reserved.";

let source;
try {
  source = readFileSync(file, "utf8");
} catch {
  console.error("ERROR: Cannot find src/app/auth/layout.tsx. Run this script inside the top-g-global-rebuild project folder.");
  process.exitCode = 1;
}

if (source !== undefined) {
  const matches = source.split(before).length - 1;
  if (matches === 1) {
    writeFileSync(file, source.replace(before, after), "utf8");
    console.log("PASS: Replaced the prerender-unsafe copyright year in src/app/auth/layout.tsx.");
    console.log("Only the year expression was changed; the frozen authentication layout is preserved.");
  } else if (matches === 0 && source.includes(after)) {
    console.log("PASS: The authentication footer was already corrected. No changes needed.");
  } else {
    console.error("ERROR: Expected exactly one known copyright-year expression; found " + matches + ". No files changed.");
    process.exitCode = 1;
  }
}
