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
