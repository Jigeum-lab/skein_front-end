import { Users } from "lucide-react";
import { PagePlaceholder } from "@/components/page-placeholder";

export default function MembersPage() {
  return (
    <PagePlaceholder
      stage="F5 · 멤버 / 권한"
      icon={Users}
      title="멤버 관리"
      description="팀원을 초대하고 역할(관리자·편집자·뷰어)을 부여합니다. 브랜드별 접근 권한을 분리합니다. (다음 단계에서 구현)"
      cta="멤버 초대"
    />
  );
}
