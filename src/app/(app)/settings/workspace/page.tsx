import { Settings } from "lucide-react";
import { PagePlaceholder } from "@/components/page-placeholder";

export default function WorkspaceSettingsPage() {
  return (
    <PagePlaceholder
      stage="설정 · 워크스페이스"
      icon={Settings}
      title="워크스페이스 설정"
      description="워크스페이스 이름·플랜·청구·기본 권한을 관리합니다. (다음 단계에서 구현)"
    />
  );
}
