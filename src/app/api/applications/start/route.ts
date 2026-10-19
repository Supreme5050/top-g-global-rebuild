import { NextRequest, NextResponse } from "next/server";
import { createSupabaseRouteSession } from "@/lib/supabase/route-session";
import { isSameOriginMutation } from "@/lib/security/request-origin";

/** Creates applicant and application UUID records atomically via authenticated RLS. */
export async function POST(request: NextRequest) {
  if (!isSameOriginMutation(request.headers.get("origin"), request.nextUrl.origin)) {
    return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  }
  const session = createSupabaseRouteSession(request);
  if (!session) return NextResponse.json({ error: "SERVICE_UNAVAILABLE" }, { status: 503 });
  try {
    const { data: auth, error: authError } = await session.supabase.auth.getUser();
    if (authError || !auth.user) return session.json({ error: "UNAUTHENTICATED" }, 401);

    const { data, error } = await session.supabase.rpc("tgg_begin_membership_application");
    if (error || !Array.isArray(data) || data.length !== 1) {
      return session.json({ error: "APPLICATION_UNAVAILABLE" }, 503);
    }
    const result = data[0] as { applicant_id?: unknown; application_id?: unknown };
    if (typeof result.applicant_id !== "string" || typeof result.application_id !== "string") {
      return session.json({ error: "APPLICATION_UNAVAILABLE" }, 503);
    }
    // These are only institutional records, NOT a submitted/approved membership.
    return session.json({ applicantId: result.applicant_id, applicationId: result.application_id }, 201);
  } catch {
    return session.json({ error: "SERVICE_UNAVAILABLE" }, 503);
  }
}
