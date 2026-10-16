import { copyFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import process from "node:process";

const root = process.cwd();
const destination = join(root, ".env.local");
const template = join(root, ".env.supabase.rebuild.example");
const marker = join(root, "package.json");

if (!existsSync(marker) || !existsSync(template)) {
  console.error("ERROR: Run from the top-g-global-rebuild project root after extracting the ZIP.");
  process.exitCode = 1;
} else if (existsSync(destination)) {
  console.log("SAFE: .env.local already exists and was NOT modified.");
  console.log("Confirm that SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY refer to the NEW project.");
} else {
  try {
    copyFileSync(template, destination, 1); // COPYFILE_EXCL: never overwrite an existing .env.local
    console.log("CREATED: .env.local from the safe, placeholder-only template.");
    console.log("NEXT: Set the NEW Supabase project URL and publishable key in .env.local using VS Code.");
  } catch (error) {
    console.error("ERROR: .env.local was not written:", error instanceof Error ? error.code ?? "unknown" : "unknown");
    process.exitCode = 1;
  }
}
