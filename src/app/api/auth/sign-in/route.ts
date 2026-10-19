import { NextRequest, NextResponse } from "next/server";
import { createSupabaseRouteSession } from "@/lib/supabase/route-session";
import { isSameOriginMutation } from "@/lib/security/request-origin";
import { parseCredentials, readSmallJson } from "@/lib/security/auth-input";

export async function POST(request: NextRequest) {
  if (!isSameOriginMutation(request.headers.get("origin"), request.nextUrl.origin)) {
    return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  }
  const credentials = parseCredentials(await readSmallJson(request));
  if (!credentials) return NextResponse.json({ error: "INVALID_INPUT" }, { status: 400 });

  const session = createSupabaseRouteSession(request);
  if (!session) return NextResponse.json({ error: "SERVICE_UNAVAILABLE" }, { status: 503 });
  try {
    const { error } = await session.supabase.auth.signInWithPassword(credentials);
    if (error) return session.json({ error: "INVALID_CREDENTIALS" }, 401);
    return session.json({ ok: true });
  } catch {
    return session.json({ error: "SERVICE_UNAVAILABLE" }, 503);
  }
}
