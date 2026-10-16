/** Server-only Supabase connectivity configuration.
 *
 * The service-role / secret key MUST NEVER be used here. This connection uses
 * only a publishable (or legacy anon) key and therefore grants no elevated
 * database privileges. Authenticated, user-scoped requests need a separate,
 * cookie-aware server client in a later phase.
 */
export interface SupabaseHealthConfig {
  readonly url: string;
  readonly key: string;
}

export type SupabaseHealthConfigResult =
  | { readonly ok: true; readonly config: SupabaseHealthConfig }
  | { readonly ok: false; readonly reason: "NOT_CONFIGURED" | "INVALID_CONFIGURATION" };

export function readSupabaseHealthConfig(
  env: Readonly<Record<string, string | undefined>>,
): SupabaseHealthConfigResult {
  const url = env.SUPABASE_URL?.trim();
  const key = (env.SUPABASE_PUBLISHABLE_KEY ?? env.SUPABASE_ANON_KEY)?.trim();

  if (!url || !key) {
    return { ok: false, reason: "NOT_CONFIGURED" };
  }

  try {
    const parsed = new URL(url);
    const isLocal = ["localhost", "127.0.0.1", "::1", "[::1]"].includes(parsed.hostname);
    if (!((parsed.protocol === "https:") || (isLocal && parsed.protocol === "http:"))) {
      return { ok: false, reason: "INVALID_CONFIGURATION" };
    }
    if (parsed.username || parsed.password || parsed.search || parsed.hash || parsed.pathname !== "/") {
      return { ok: false, reason: "INVALID_CONFIGURATION" };
    }
    if (key.startsWith("sb_secret_") || key.startsWith("sb_service_role_")) {
      return { ok: false, reason: "INVALID_CONFIGURATION" };
    }
    return { ok: true, config: { url: parsed.origin, key } };
  } catch {
    return { ok: false, reason: "INVALID_CONFIGURATION" };
  }
}
