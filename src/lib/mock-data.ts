// 프로토타입용 목업 데이터 — Supabase 연동 전 화면 셸/랜딩 구동용
// 실제 데이터 레이어는 추후 b/[brandId] 스코프 + RLS로 교체

export type Workspace = {
  id: string;
  name: string;
  plan: "Beta" | "Pro" | "Agency";
};

export type Brand = {
  id: string;
  name: string;
  // 브랜드 컬러 칩 (사이드바/카드에서 브랜드 시각 각인)
  color: string;
  initial: string;
  // 브랜드 룸 셋업 진척 (0~100)
  roomReady: number;
  contentCount: number;
  voiceProfile: string;
};

export const workspaces: Workspace[] = [
  { id: "ws_woojung", name: "우아한연구소", plan: "Beta" },
  { id: "ws_demo", name: "Demo Agency", plan: "Agency" },
];

export const brands: Brand[] = [
  {
    id: "lumea",
    name: "Lumea Skincare",
    color: "oklch(0.62 0.19 293)",
    initial: "L",
    roomReady: 100,
    contentCount: 48,
    voiceProfile: "Clinical but Warm",
  },
  {
    id: "fleur",
    name: "Fleur Beauty",
    color: "oklch(0.66 0.2 12)",
    initial: "F",
    roomReady: 70,
    contentCount: 23,
    voiceProfile: "Playful · Gen-Z",
  },
  {
    id: "noir",
    name: "Maison Noir",
    color: "oklch(0.45 0.04 285)",
    initial: "N",
    roomReady: 40,
    contentCount: 9,
    voiceProfile: "Luxury · Minimal",
  },
  {
    id: "verde",
    name: "Verde Wellness",
    color: "oklch(0.7 0.14 160)",
    initial: "V",
    roomReady: 0,
    contentCount: 0,
    voiceProfile: "미설정",
  },
];

export function getBrand(brandId: string): Brand | undefined {
  return brands.find((b) => b.id === brandId);
}

// ============================================================================
// 가격 · 사용량 계측 (제안 모델 — 2026-06, 베타 가격 가설 $50~200/seat 기반)
// 실제 청구는 P1. 베타는 무료지만 사용량 가시화로 한도 인지 + 향후 과금 설계.
// ============================================================================

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
  copy: 1, // 카피 생성 1회
  visual: 5, // 비주얼 생성 1회 (P1)
  tone_extract: 2, // 레퍼런스 톤 추출 1회
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

// 현재 워크스페이스(우아한연구소 · Beta) 이번 주기 사용량
export const currentUsage: WorkspaceUsage = {
  workspaceId: "ws_woojung",
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

// ============================================================================
// 브랜드 룸 — 레퍼런스 & 톤 프로필 (자동 추출 모델, F2)
// ============================================================================

export type RefPlatform = "instagram" | "youtube" | "threads" | "tiktok" | "manual";
export type RefStatus = "extracted" | "pending" | "failed";

export type ReferenceItem = {
  id: string;
  brandId: string;
  platform: RefPlatform;
  /** 채널/포맷 태그 (예: 인스타 캡션, 유튜브 자막) */
  channel: string;
  sourceUrl?: string;
  /** 추출된 텍스트 (톤 추출 입력) */
  text: string;
  status: RefStatus;
};

export const PLATFORM_LABEL: Record<RefPlatform, string> = {
  instagram: "Instagram",
  youtube: "YouTube",
  threads: "Threads",
  tiktok: "TikTok",
  manual: "직접 입력",
};

export const references: ReferenceItem[] = [
  {
    id: "ref_1",
    brandId: "lumea",
    platform: "instagram",
    channel: "인스타 캡션",
    sourceUrl: "https://instagram.com/p/example1",
    text: "민감한 피부에도 부담 없이. 임상으로 검증된 진정 케어, 매일의 루틴으로.",
    status: "extracted",
  },
  {
    id: "ref_2",
    brandId: "lumea",
    platform: "youtube",
    channel: "유튜브 자막",
    sourceUrl: "https://youtube.com/watch?v=example",
    text: "오늘은 저희 비건 세럼의 임상 데이터를 따뜻하게 풀어드릴게요. 어렵지 않아요.",
    status: "extracted",
  },
  {
    id: "ref_3",
    brandId: "lumea",
    platform: "manual",
    channel: "직접 입력",
    text: "피부 장벽을 지키는 똑똑한 보습. 과장 없이, 데이터로 말합니다.",
    status: "extracted",
  },
];

export function getReferences(brandId: string): ReferenceItem[] {
  return references.filter((r) => r.brandId === brandId);
}

export type ToneAttribute = { label: string; left: string; right: string; value: number };

export type ToneProfile = {
  brandId: string;
  summary: string;
  /** 보이스 축 (value 0~100, 50=중립) */
  attributes: ToneAttribute[];
  lexicon: { preferred: string[]; avoid: string[] };
  /** 추출 신뢰도 0~100 */
  confidence: number;
};

export const toneProfiles: ToneProfile[] = [
  {
    brandId: "lumea",
    summary: "임상적 근거를 따뜻한 어조로 전달. 과장 없이 신뢰를 주되 차갑지 않게.",
    attributes: [
      { label: "어조", left: "캐주얼", right: "격식", value: 58 },
      { label: "온도", left: "임상적", right: "따뜻함", value: 62 },
      { label: "문장", left: "짧게", right: "길게", value: 40 },
      { label: "이모지", left: "없음", right: "많이", value: 20 },
    ],
    lexicon: {
      preferred: ["임상", "진정", "피부 장벽", "데이터", "루틴"],
      avoid: ["기적", "즉효", "100%", "완벽"],
    },
    confidence: 86,
  },
];

export function getToneProfile(brandId: string): ToneProfile | undefined {
  return toneProfiles.find((t) => t.brandId === brandId);
}
