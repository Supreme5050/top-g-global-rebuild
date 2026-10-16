import { checkSupabaseDatabaseHealth } from "@/lib/supabase/health";


/** Unauthenticated, non-disclosing readiness check for the Supabase database. */
export async function GET() {
  const result = await checkSupabaseDatabaseHealth();

  return Response.json(
    result.ok
      ? { service: "top-g-global", database: "connected", status: "ok" }
      : { service: "top-g-global", database: "unavailable", status: "error", code: result.code },
    {
      status: result.ok ? 200 : 503,
      headers: { "Cache-Control": "no-store" },
    },
  );
}
