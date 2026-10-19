import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";
import { readSupabaseHealthConfig } from "@/lib/supabase/config";

/** PKCE code exchange: no arbitrary redirect destination, no token in URL. */
export async function GET(request: NextRequest) {
  const config = readSupabaseHealthConfig(process.env);
  const code = request.nextUrl.searchParams.get("code");
  const failure = new URL("/auth/sign-in", request.nextUrl.origin);
  failure.searchParams.set("message", "verify");
  if (!config.ok || !code) return NextResponse.redirect(failure);

  const response = NextResponse.redirect(new URL("/auth/account", request.nextUrl.origin));
  const supabase = createServerClient(config.config.url, config.config.key, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (items) => {
        for (const { name, value, options } of items) response.cookies.set(name, value, options);
      },
    },
  });
  try {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    return error ? NextResponse.redirect(failure) : response;
  } catch { return NextResponse.redirect(failure); }
}
