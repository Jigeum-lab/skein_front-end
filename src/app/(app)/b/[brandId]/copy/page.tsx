import { PenLine } from "lucide-react";
import { PagePlaceholder } from "@/components/page-placeholder";

export default function CopyPage() {
  return (
    <PagePlaceholder
      stage="F2 · AI 카피 생성"
      icon={PenLine}
      title="카피 생성"
      description="브랜드 룸 컨텍스트 기반으로 광고·SNS 카피 N안을 생성하고 카드로 비교합니다. 문장 단위 인라인 편집·재생성 지원. (다음 단계에서 구현)"
      cta="카피 생성하기"
    />
  );
}
