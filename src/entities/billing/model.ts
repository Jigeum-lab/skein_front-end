// 가격 · 사용량 계측 (제안 모델 — 베타 가격 가설 $50~200/seat 기반)
// 실제 청구는 P1. 베타는 무료지만 사용량 가시화로 한도 인지 + 향후 과금 설계.

export type PlanId = "beta" | "pro" | "agency";

export type Plan = {
  id: PlanId;
  name: string;
  /** 월 구독료 (USD/seat). null = 베타(무료) */
  priceMonthly: number | null;
  /** 월 포함 크레딧 */
  creditsIncluded: number;
  /** 브랜드 상한. null = 무제한 */
  brandLimit: number | null;
  seats: string;
  features: string[];
  highlight?: boolean;
};

export const plans: Plan[] = [
  {
    id: "beta",
    name: "Beta",
    priceMonthly: null,
    creditsIncluded: 100,
    brandLimit: 3,
    seats: "1인",
    features: ["월 100 크레딧", "브랜드 3개", "브랜드 룸 · 카피 생성", "라이브러리 · KPI 계측"],
  },
  {
    id: "pro",
    name: "Pro",
    priceMonthly: 49,
    creditsIncluded: 1000,
    brandLimit: 10,
    seats: "팀 최대 5인",
    features: ["월 1,000 크레딧", "브랜드 10개", "팀 초대 · 역할", "레퍼런스 자동 추출", "우선 큐"],
    highlight: true,
  },
  {
    id: "agency",
    name: "Agency",
    priceMonthly: 149,
    creditsIncluded: 5000,
    brandLimit: null,
    seats: "무제한",
    features: ["월 5,000 크레딧", "무제한 브랜드", "무제한 팀 · 역할 관리", "비주얼 생성", "우선 지원 · SSO"],
  },
];

export function getPlan(id: PlanId): Plan {
  return plans.find((p) => p.id === id) ?? plans[0];
}

/** 액션별 크레딧 단가 — 원가(AI 호출 비용) 대비 마진 반영한 제안값 */
export type UsageType = "copy" | "visual" | "tone_extract";

export const CREDIT_COST: Record<UsageType, number> = {
  copy: 1,
  visual: 5,
  tone_extract: 2,
};

export const USAGE_LABEL: Record<UsageType, string> = {
  copy: "카피 생성",
  visual: "비주얼 생성",
  tone_extract: "톤 추출",
};

export type WorkspaceUsage = {
  workspaceId: string;
  planId: PlanId;
  /** 청구 주기 (ISO 날짜) */
  cycleStart: string;
  cycleEnd: string;
  creditsUsed: number;
  /** 액션 유형별 크레딧 */
  byType: Record<UsageType, number>;
  /** 브랜드별 크레딧 */
  byBrand: { brandId: string; credits: number }[];
};

// 현재 워크스페이스(지금.lab · Beta) 이번 주기 사용량
export const currentUsage: WorkspaceUsage = {
  workspaceId: "ws_jigeum",
  planId: "beta",
  cycleStart: "2026-06-01",
  cycleEnd: "2026-06-30",
  creditsUsed: 64,
  byType: { copy: 52, visual: 0, tone_extract: 12 },
  byBrand: [
    { brandId: "lumea", credits: 40 },
    { brandId: "fleur", credits: 16 },
    { brandId: "noir", credits: 8 },
    { brandId: "verde", credits: 0 },
  ],
};
