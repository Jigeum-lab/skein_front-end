import { ImageIcon } from "lucide-react";
import { PagePlaceholder } from "@/shared/ui/page-placeholder";

export default function VisualPage() {
  return (
    <PagePlaceholder
      stage="F3 · AI 비주얼 생성"
      icon={ImageIcon}
      title="비주얼 생성"
      description="상단 프롬프트바에서 브랜드 톤에 맞는 이미지를 생성하고 그리드로 받아 라이브러리에 저장합니다. (FLUX/fal.ai 연동 — 다음 단계에서 구현)"
      cta="비주얼 생성하기"
    />
  );
}
