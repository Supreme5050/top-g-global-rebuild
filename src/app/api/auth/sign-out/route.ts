import { NextRequest, NextResponse } from "next/server";
import { createSupabaseRouteSession } from "@/lib/supabase/route-session";
import { isSameOriginMutation } from "@/lib/security/request-origin";

export async function POST(request: NextRequest) {
  if (!isSameOriginMutation(request.headers.get("origin"), request.nextUrl.origin)) {
    return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  }
  const session = createSupabaseRouteSession(request);
  if (!session) return NextResponse.json({ error: "SERVICE_UNAVAILABLE" }, { status: 503 });
  try {
    const { error } = await session.supabase.auth.signOut({ scope: "local" });
    return error ? session.json({ error: "SIGN_OUT_UNAVAILABLE" }, 503) : session.json({ ok: true });
  } catch {
    return session.json({ error: "SERVICE_UNAVAILABLE" }, 503);
  }
}
