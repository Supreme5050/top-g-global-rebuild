import { createClient } from "@supabase/supabase-js";
import { readSupabaseHealthConfig } from "./config";

export type DatabaseHealthResult =
  | { readonly ok: true }
  | { readonly ok: false; readonly code: "NOT_CONFIGURED" | "INVALID_CONFIGURATION" | "DATABASE_UNAVAILABLE" };

/**
 * Runs a minimal SQL function through PostgREST. Success proves the configured
 * Supabase API can execute this database function, not that other migrations,
 * tables, auth policies or application workflows are ready.
 */
export async function checkSupabaseDatabaseHealth(): Promise<DatabaseHealthResult> {
  const configuration = readSupabaseHealthConfig(process.env);
  if (!configuration.ok) {
    return { ok: false, code: configuration.reason };
  }

  try {
    const client = createClient(configuration.config.url, configuration.config.key, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false,
      },
      global: {
        fetch: (input, init) =>
          fetch(input, {
            ...init,
            cache: "no-store",
            signal: AbortSignal.timeout(8000),
          }),
      },
    });
    const { data, error } = await client.rpc("tgg_healthcheck");
    return !error && data === true
      ? { ok: true }
      : { ok: false, code: "DATABASE_UNAVAILABLE" };
  } catch {
    // Never disclose project URLs, SQL errors, keys or headers to public callers.
    return { ok: false, code: "DATABASE_UNAVAILABLE" };
  }
}
