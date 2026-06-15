// 콘텐츠 라이브러리 (Draft → Review → Approved + KPI)

export type ContentStatus = "draft" | "review" | "approved";

export const CONTENT_STATUS_LABEL: Record<ContentStatus, string> = {
  draft: "Draft",
  review: "Review",
  approved: "Approved",
};

export type ContentItem = {
  id: string;
  brandId: string;
  channel: string;
  format: string;
  text: string;
  generatedText: string;
  status: ContentStatus;
  edited: boolean;
  revisionCount: number;
  createdAt: string;
};

export const contents: ContentItem[] = [
  {
    id: "c_1", brandId: "lumea", channel: "인스타그램", format: "캡션",
    text: "피부 장벽이 무너지는 계절, 진정 세럼으로 매일의 회복 루틴을. 임상으로 검증된 따뜻한 케어.",
    generatedText: "피부 장벽이 무너지는 계절, 진정 세럼으로 매일의 회복 루틴을. 임상으로 검증된 따뜻한 케어.",
    status: "approved", edited: false, revisionCount: 0, createdAt: "2026-06-12",
  },
  {
    id: "c_2", brandId: "lumea", channel: "이메일", format: "헤드라인",
    text: "데이터로 증명한 진정 케어, 오늘 만나보세요",
    generatedText: "기적의 진정 케어, 오늘 만나보세요",
    status: "approved", edited: true, revisionCount: 1, createdAt: "2026-06-11",
  },
  {
    id: "c_3", brandId: "lumea", channel: "광고", format: "본문",
    text: "민감한 피부에도 부담 없이. 피부 장벽을 지키는 똑똑한 보습, 과장 없이 데이터로 말합니다.",
    generatedText: "민감한 피부에도 부담 없이. 피부 장벽을 지키는 똑똑한 보습, 과장 없이 데이터로 말합니다.",
    status: "review", edited: false, revisionCount: 0, createdAt: "2026-06-13",
  },
  {
    id: "c_4", brandId: "lumea", channel: "인스타그램", format: "캡션",
    text: "오늘의 루틴 한 컷. 진정과 보습, 하나로.",
    generatedText: "오늘의 루틴 한 컷. 진정과 보습, 하나로.",
    status: "draft", edited: false, revisionCount: 0, createdAt: "2026-06-14",
  },
  {
    id: "c_5", brandId: "fleur", channel: "인스타그램", format: "캡션",
    text: "오늘도 반짝, 플레르와 함께 ✨ 너만의 무드를 칠해봐",
    generatedText: "오늘도 반짝, 플레르와 함께 ✨ 너만의 무드를 칠해봐",
    status: "draft", edited: false, revisionCount: 0, createdAt: "2026-06-14",
  },
];

export function getContents(brandId: string): ContentItem[] {
  return contents.filter((c) => c.brandId === brandId);
}

// 카피 생성 옵션 (write 페이지)
export const CHANNELS = ["인스타그램", "이메일", "광고", "블로그", "스레드"];
export const FORMATS = ["캡션", "헤드라인", "본문", "해시태그"];
