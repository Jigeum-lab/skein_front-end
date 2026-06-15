/**
 * 환경 변수 중앙 정의 + 검증.
 * DATA_SOURCE로 mock/실API를 분기 — 하드코딩 데이터 제거의 단일 스위치.
 * 기본값은 `api`(실배포 기준). 로컬 개발은 `.env.development`에서 mock으로 자동 전환.
 */

export type DataSource = "mock" | "api";

interface EnvironmentVariables {
  /** NestJS 백엔드 API base (프록시가 이 주소로 포워딩) */
  BASE_URL: string;
  /** mock 데이터 vs 실 API */
  DATA_SOURCE: DataSource;
  SUPABASE_URL: string;
  /** Supabase publishable key (구 anon key) — 브라우저 노출 OK */
  SUPABASE_KEY: string;
}

// 백엔드 핸드오프는 NEXT_PUBLIC_API_BASE_URL=http://localhost:4000 (prefix 없음)을 권장.
// 프론트 관례는 /api까지 포함한 단일 BASE_URL이므로 둘 다 수용한다.
function resolveBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL;
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "");
  if (apiBase) return apiBase.endsWith("/api") ? apiBase : `${apiBase}/api`;
  return "http://localhost:4000/api";
}

const ENV: EnvironmentVariables = {
  BASE_URL: resolveBaseUrl(),
  // 명시 설정 우선 · 없으면 개발=mock, 그 외(빌드/배포)=api
  DATA_SOURCE:
    (process.env.NEXT_PUBLIC_DATA_SOURCE as DataSource) ||
    (process.env.NODE_ENV === "development" ? "mock" : "api"),
  SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  // 신규 publishable key 우선, 구 anon key 폴백
  SUPABASE_KEY:
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "",
};

// 개발 환경에서만 누락 경고
if (process.env.NODE_ENV === "development" && ENV.DATA_SOURCE === "api") {
  const required: (keyof EnvironmentVariables)[] = ["BASE_URL", "SUPABASE_URL"];
  required.forEach((k) => {
    if (!ENV[k]) console.warn(`⚠️  환경 변수 ${k} 미설정 (DATA_SOURCE=api)`);
  });
}

export const { BASE_URL, SUPABASE_URL, SUPABASE_KEY } = ENV;
export const DATA_SOURCE = ENV.DATA_SOURCE;
/** true면 mock-data 사용, false면 실 API 호출 */
export const USE_MOCK = ENV.DATA_SOURCE === "mock";

export default ENV;
