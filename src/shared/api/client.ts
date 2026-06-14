import { BASE_URL } from "@/shared/config/env";

/**
 * 이소모픽 API 클라이언트.
 * - 서버: NestJS를 직접 호출(Supabase 세션 토큰 주입)
 * - 클라이언트: `/api/proxy`(BFF)를 거쳐 호출 — 실 백엔드 URL/토큰을 노출하지 않음
 * NestJS는 raw JSON을 반환하므로 별도 envelope 언랩 없음.
 */
function isServer(): boolean {
  return typeof window === "undefined";
}

export async function apiClient<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  if (isServer()) {
    // 서버 전용 모듈은 동적 import — 클라이언트 번들 오염 방지
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const token = session?.access_token;

    const res = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options?.headers,
      },
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`API ${res.status}: ${endpoint}`);
    return res.json() as Promise<T>;
  }

  const res = await fetch(`/api/proxy${endpoint}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...options?.headers },
  });
  if (!res.ok) throw new Error(`API ${res.status}: ${endpoint}`);
  return res.json() as Promise<T>;
}
