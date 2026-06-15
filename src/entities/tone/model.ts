// 브랜드 톤 프로필 (레퍼런스에서 자동 추출)

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
