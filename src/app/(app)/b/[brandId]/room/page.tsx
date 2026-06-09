import { Sparkles } from "lucide-react";
import { PagePlaceholder } from "@/components/page-placeholder";

export default function BrandRoomPage() {
  return (
    <PagePlaceholder
      stage="F1 · 브랜드 룸 — 제품의 심장"
      icon={Sparkles}
      title="브랜드 룸"
      description="브랜드별 톤 가이드·잘된 콘텐츠 샘플·금지어를 등록해 모든 생성의 컨텍스트를 만듭니다. 텍스트/파일/URL 3종 입력으로 보이스 프로필을 학습합니다. (다음 단계에서 구현)"
      cta="브랜드 룸 채우기"
    />
  );
}
