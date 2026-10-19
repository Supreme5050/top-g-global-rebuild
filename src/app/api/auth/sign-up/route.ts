import { NextRequest, NextResponse } from "next/server";
import { createSupabaseRouteSession } from "@/lib/supabase/route-session";
import { isSameOriginMutation } from "@/lib/security/request-origin";
import { readSmallJson } from "@/lib/security/auth-input";
import { parseSignUpInput } from "@/lib/security/sign-up-input";

export async function POST(request: NextRequest) {
  if (!isSameOriginMutation(request.headers.get("origin"), request.nextUrl.origin)) {
    return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  }
  const input = parseSignUpInput(await readSmallJson(request));
  if (!input) return NextResponse.json({ error: "INVALID_INPUT" }, { status: 400 });

  const session = createSupabaseRouteSession(request);
  if (!session) return NextResponse.json({ error: "SERVICE_UNAVAILABLE" }, { status: 503 });

  try {
    const { data, error } = await session.supabase.auth.signUp({
      email: input.email,
      password: input.password,
      options: {
        // Unverified user-supplied metadata; this DOES NOT create official membership.
        data: { full_name: input.fullName },
        emailRedirectTo: new URL("/auth/callback", request.nextUrl.origin).toString(),
      },
    });
    if (error) return session.json({ error: "SIGN_UP_UNAVAILABLE" }, 400);
    return session.json({ ok: true, verificationRequired: !data.session }, 202);
  } catch {
    return session.json({ error: "SERVICE_UNAVAILABLE" }, 503);
  }
}
