import { NextRequest, NextResponse } from "next/server";
import { createSupabaseRouteSession } from "@/lib/supabase/route-session";

export async function GET(request: NextRequest) {
  const session = createSupabaseRouteSession(request);
  if (!session) return NextResponse.json({ error: "SERVICE_UNAVAILABLE" }, { status: 503 });
  try {
    const { data, error } = await session.supabase.auth.getUser();
    if (error || !data.user) return session.json({ authenticated: false }, 401);
    return session.json({ authenticated: true, userId: data.user.id });
  } catch {
    return session.json({ error: "SERVICE_UNAVAILABLE" }, 503);
  }
}
