/**
 * API 클라이언트 — 항상 BFF 프록시(`/api/proxy`)를 경유한다.
 * 프록시 route handler(서버)가 Supabase 세션 토큰을 주입하므로
 * 이 모듈은 토큰·실 백엔드 URL을 다루지 않는다 → 클라이언트 번들 안전
 * (next/headers 의존을 클라이언트 그래프로 끌어오지 않음).
 * NestJS는 raw JSON을 반환하므로 별도 envelope 언랩 없음.
 *
 * 서버 컴포넌트에서 백엔드를 직접 호출해야 하면 별도 server 유틸을 둔다(현재 불필요).
 */
export async function apiClient<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(`/api/proxy${endpoint}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...options?.headers },
  });
  if (!res.ok) throw new Error(`API ${res.status}: ${endpoint}`);
  return res.json() as Promise<T>;
}
