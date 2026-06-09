import { Library } from "lucide-react";
import { PagePlaceholder } from "@/components/page-placeholder";

export default function LibraryPage() {
  return (
    <PagePlaceholder
      stage="F4 · 콘텐츠 라이브러리"
      icon={Library}
      title="라이브러리"
      description="생성된 카피·비주얼을 저장·검색·정렬하고 승인 워크플로(Draft → Review → Approved)로 관리합니다. (다음 단계에서 구현)"
      cta="콘텐츠 보기"
    />
  );
}
