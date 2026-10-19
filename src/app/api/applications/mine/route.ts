import { NextRequest, NextResponse } from "next/server";
import { createSupabaseRouteSession } from "@/lib/supabase/route-session";

/** Authenticated, row-scoped lookups; does not expose other applicants or members. */
export async function GET(request: NextRequest) {
  const session = createSupabaseRouteSession(request);
  if (!session) return NextResponse.json({ error: "SERVICE_UNAVAILABLE" }, { status: 503 });
  try {
    const { data: auth, error: authError } = await session.supabase.auth.getUser();
    if (authError || !auth.user) return session.json({ error: "UNAUTHENTICATED" }, 401);

    const { data: applicants, error: applicantError } = await session.supabase
      .from("tgg_applicants")
      .select("id,created_at")
      .eq("account_holder_id", auth.user.id);
    if (applicantError) return session.json({ error: "APPLICATION_UNAVAILABLE" }, 503);
    const owned = applicants ?? [];
    if (owned.length === 0) return session.json({ applicants: [], applications: [] });

    const { data: applications, error: applicationError } = await session.supabase
      .from("tgg_membership_applications")
      .select("id,applicant_id,created_at")
      .in("applicant_id", owned.map((item) => item.id));
    if (applicationError) return session.json({ error: "APPLICATION_UNAVAILABLE" }, 503);
    return session.json({ applicants: owned, applications: applications ?? [] });
  } catch {
    return session.json({ error: "SERVICE_UNAVAILABLE" }, 503);
  }
}
