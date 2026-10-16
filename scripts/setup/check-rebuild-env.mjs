import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import process from "node:process";

const path = join(process.cwd(), ".env.local");
if (!existsSync(path)) {
  console.error("NOT CONFIGURED: .env.local does not exist. Run node scripts/setup/prepare-rebuild-env.mjs");
  process.exit(1);
}
const values = new Map();
for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
  const match = line.match(/^\s*(?:export\s+)?([A-Z][A-Z0-9_]*)\s*=\s*(.*)\s*$/);
  if (match) {
    let value = match[2].trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    values.set(match[1], value);
  }
}
const urlText = values.get("SUPABASE_URL") ?? "";
const key = values.get("SUPABASE_PUBLISHABLE_KEY") ?? values.get("SUPABASE_ANON_KEY") ?? "";
if (!urlText || !key || /REPLACE|YOUR_PROJECT|YOUR_PUBLISHABLE|PLACEHOLDER/i.test(urlText + key)) {
  console.error("NOT CONFIGURED: Replace placeholders with the NEW Supabase project URL and publishable key in .env.local.");
  process.exit(1);
}
if (/sb_secret_|service_role|sb_service_role_/i.test(key)) {
  console.error("UNSAFE CONFIG: Elevated Supabase credentials must not be used by this application.");
  process.exit(1);
}
try {
  const url = new URL(urlText);
  const local = ["localhost", "127.0.0.1", "[::1]", "::1"].includes(url.hostname);
  if (!((url.protocol === "https:") || (local && url.protocol === "http:")) || url.username || url.password || url.search || url.hash || url.pathname !== "/") {
    throw new Error("invalid URL");
  }
} catch {
  console.error("INVALID CONFIG: SUPABASE_URL must be the base https://<project>.supabase.co URL (not a dashboard URL).");
  process.exit(1);
}
console.log("PASS: Local Supabase URL and publishable-key formats look valid.");
console.log("NOTE: This checks local configuration only; the database connection is verified by /api/health/supabase.");
console.log("SECURITY: Project URLs and keys are deliberately not printed.");
