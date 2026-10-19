import "server-only";

import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";
import { readSupabaseHealthConfig } from "@/lib/supabase/config";

/**
 * A request-scoped, cookie-aware Supabase client using ONLY the publishable key.
 * Authentication is verified with auth.getUser(); no service-role bypass.
 */
export function createSupabaseRouteSession(request: NextRequest) {
  const config = readSupabaseHealthConfig(process.env);
  if (!config.ok) return null;

  const cookieValues = new Map(request.cookies.getAll().map(({ name, value }) => [name, value]));
  const cookieUpdates = NextResponse.json({});

  const supabase = createServerClient(config.config.url, config.config.key, {
    cookies: {
      getAll() {
        return Array.from(cookieValues, ([name, value]) => ({ name, value }));
      },
      setAll(cookiesToSet) {
        for (const { name, value, options } of cookiesToSet) {
          cookieValues.set(name, value);
          cookieUpdates.cookies.set(name, value, options);
        }
      },
    },
  });

  function json(body: unknown, status = 200) {
    const response = NextResponse.json(body, {
      status,
      headers: { "Cache-Control": "no-store" },
    });
    for (const cookie of cookieUpdates.cookies.getAll()) {
      response.cookies.set(cookie);
    }
    return response;
  }

  return { supabase, json };
}
