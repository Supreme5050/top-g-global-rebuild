import { NextRequest, NextResponse } from "next/server";
import { createSupabaseRouteSession } from "@/lib/supabase/route-session";
import { isSameOriginMutation } from "@/lib/security/request-origin";
import { readSmallJson } from "@/lib/security/auth-input";
import { parseEmailOnly } from "@/lib/security/sign-up-input";

/** Supabase enforces its own email resend limits; production abuse controls remain pending. */
export async function POST(request: NextRequest) {
  if (!isSameOriginMutation(request.headers.get("origin"), request.nextUrl.origin)) {
    return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  }
  const email = parseEmailOnly(await readSmallJson(request));
  if (!email) return NextResponse.json({ error: "INVALID_INPUT" }, { status: 400 });
  const session = createSupabaseRouteSession(request);
  if (!session) return NextResponse.json({ error: "SERVICE_UNAVAILABLE" }, { status: 503 });
  try {
    const { error } = await session.supabase.auth.resend({
      type: "signup",
      email,
      options: { emailRedirectTo: new URL("/auth/callback", request.nextUrl.origin).toString() },
    });
    if (error) return session.json({ error: "RESEND_UNAVAILABLE" }, 429);
    return session.json({ ok: true });
  } catch { return session.json({ error: "RESEND_UNAVAILABLE" }, 503); }
}
