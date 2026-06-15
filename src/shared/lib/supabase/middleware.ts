import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

import { SUPABASE_URL, SUPABASE_KEY } from "@/shared/config/env";

// 매 요청마다 Supabase 세션 토큰을 갱신해 쿠키에 반영
export async function updateSession(request: NextRequest) {
  const url = SUPABASE_URL;
  const key = SUPABASE_KEY;

  // 키가 아직 없으면(연동 전) 그냥 통과 — 앱이 깨지지 않게
  if (!url || !key) {
    return NextResponse.next({ request });
  }

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options),
        );
      },
    },
  });

  // 세션 갱신 (getUser 호출이 토큰 리프레시를 트리거)
  await supabase.auth.getUser();

  return supabaseResponse;
}
