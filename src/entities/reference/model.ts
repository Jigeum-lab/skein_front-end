// 브랜드 룸 — 레퍼런스 (멀티모달 자동 추출: 텍스트/이미지/영상)

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

// 멀티모달 추출 종류
export type RefKind = "text" | "image" | "video";

export const REF_KIND_LABEL: Record<RefKind, string> = {
  text: "텍스트",
  image: "이미지",
  video: "영상",
};

export const REF_KIND_HINT: Record<RefKind, string> = {
  text: "캡션·카피·본문을 그대로 추출",
  image: "비전 모델이 무드·컬러·구도·문구를 추출",
  video: "자막(STT) + 키프레임 비전으로 톤·페이싱 추출",
};
